import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative base ensures assets resolve identically on GitHub Pages (/myself/) and Cloudflare Pages (/).
  base: './',
});
