import { spawn } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
} from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');
const distPdfPath = path.join(distDir, 'cv.pdf');
const publicPdfPath = path.join(publicDir, 'cv.pdf');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.json': 'application/json; charset=utf-8',
};

function findBrowserExecutable() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);

  return candidates.find((candidate) => existsSync(candidate)) || null;
}

function startStaticServer(root) {
  const server = http.createServer((req, res) => {
    const reqPath = (req.url || '/').split('?')[0];
    const safePath = path.normalize(reqPath === '/' ? '/index.html' : reqPath);
    const targetPath = path.join(root, safePath);

    if (!targetPath.startsWith(root) || !existsSync(targetPath) || statSync(targetPath).isDirectory()) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const ext = path.extname(targetPath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(readFileSync(targetPath));
  });

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      resolve({ server, url: `http://127.0.0.1:${address.port}/` });
    });
  });
}

async function generateWithPlaywright(url, outPath) {
  try {
    const { chromium } = await import('playwright');
    const browser = await chromium.launch();
    try {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.pdf({
        path: outPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '22mm', right: '18mm', bottom: '22mm', left: '18mm' },
      });
    } finally {
      await browser.close();
    }
    return true;
  } catch {
    return false;
  }
}

async function generateWithCdp(browserPath, url, outPath) {
  const userDataDir = mkdtempSync(path.join(os.tmpdir(), 'cv-pdf-'));
  const proc = spawn(
    browserPath,
    [
      '--headless=new',
      '--disable-gpu',
      '--disable-extensions',
      '--no-first-run',
      '--no-default-browser-check',
      '--remote-debugging-port=0',
      `--user-data-dir=${userDataDir}`,
      'about:blank',
    ],
    { stdio: ['ignore', 'pipe', 'pipe'] },
  );

  try {
    const wsUrl = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Timed out starting headless browser.')), 15000);
      let stderr = '';
      const onData = (chunk) => {
        stderr += chunk.toString();
        const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
        if (match) {
          clearTimeout(timeout);
          resolve(match[1]);
        }
      };
      proc.stderr.on('data', onData);
      proc.once('exit', (code) => {
        clearTimeout(timeout);
        reject(new Error(`Headless browser exited early (code ${code}): ${stderr}`));
      });
    });

    const targetsRes = await fetch(wsUrl.replace(/^ws:/, 'http:').replace(/\/devtools\/browser\/.*/, '/json/list'));
    const targets = await targetsRes.json();
    const pageTarget = targets.find((t) => t.type === 'page') || targets[0];
    if (!pageTarget?.webSocketDebuggerUrl) {
      throw new Error('No page target found in headless browser.');
    }

    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve, { once: true });
      ws.addEventListener('error', reject, { once: true });
    });

    let nextId = 1;
    const pending = new Map();
    const eventWaiters = [];

    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      } else if (msg.method) {
        for (const waiter of eventWaiters) waiter(msg);
      }
    });

    const send = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const id = nextId++;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });

    const waitForEvent = (method, timeoutMs = 15000) =>
      new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error(`Timed out waiting for ${method}`)), timeoutMs);
        const handler = (msg) => {
          if (msg.method === method) {
            clearTimeout(timer);
            const idx = eventWaiters.indexOf(handler);
            if (idx >= 0) eventWaiters.splice(idx, 1);
            resolve(msg.params);
          }
        };
        eventWaiters.push(handler);
      });

    await send('Page.enable');
    const loadDone = waitForEvent('Page.loadEventFired');
    await send('Page.navigate', { url });
    await loadDone;

    await send('Runtime.evaluate', {
      awaitPromise: true,
      expression: `(async () => {
        await document.fonts.ready;
        const imgs = Array.from(document.images);
        await Promise.all(imgs.map((img) => img.complete ? Promise.resolve() : new Promise((r) => {
          img.addEventListener('load', r, { once: true });
          img.addEventListener('error', r, { once: true });
        })));
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      })()`,
    });

    const { data } = await send('Page.printToPDF', {
      printBackground: true,
      paperWidth: 8.27,
      paperHeight: 11.69,
      marginTop: 0.87,
      marginBottom: 0.87,
      marginLeft: 0.71,
      marginRight: 0.71,
      displayHeaderFooter: false,
    });

    ws.close();
    const { writeFileSync } = await import('node:fs');
    writeFileSync(outPath, Buffer.from(data, 'base64'));
  } finally {
    await new Promise((resolve) => {
      if (proc.exitCode !== null) {
        resolve();
        return;
      }
      proc.once('exit', resolve);
      proc.kill();
      setTimeout(resolve, 1000);
    });
    try {
      rmSync(userDataDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
    } catch {
      // Best-effort temp profile cleanup on Windows
    }
  }
}

async function main() {
  if (!existsSync(path.join(distDir, 'index.html'))) {
    throw new Error('dist/index.html not found. Run "npm run build" before generating the PDF.');
  }

  const { server, url } = await startStaticServer(distDir);
  try {
    const usedPlaywright = await generateWithPlaywright(url, distPdfPath);
    if (!usedPlaywright) {
      const browserPath = findBrowserExecutable();
      if (!browserPath) {
        throw new Error('Neither Playwright nor Chrome/Edge was found to render cv.pdf.');
      }
      await generateWithCdp(browserPath, url, distPdfPath);
    }

    const bytes = readFileSync(distPdfPath);
    if (bytes.subarray(0, 5).toString('ascii') !== '%PDF-') {
      throw new Error('Generated file is not a valid PDF.');
    }

    mkdirSync(publicDir, { recursive: true });
    copyFileSync(distPdfPath, publicPdfPath);
    console.log(`Generated cv.pdf (${bytes.length} bytes) in dist/cv.pdf and public/cv.pdf`);
  } finally {
    server.close();
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
