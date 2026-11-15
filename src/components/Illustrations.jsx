import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const drawTransition = {
  duration: 0.85,
  ease: 'easeInOut',
};

const BLUEPRINT_NODES = [
  {
    id: 'dept',
    code: 'NODE // 01',
    short: '21 BAs & SWAT',
    title: '21-BA Line, SWAT & Pre-Sales',
    spec: 'Close, hands-on coaching · SWAT project recovery · Discovery & sizing',
    lens: 'leadership',
  },
  {
    id: 'domain',
    code: 'NODE // 02',
    short: 'FCA & Finance',
    title: 'Insurance & Finance Domain Logic',
    spec: '2nd largest UK insurer (~20→>40 HC) · Top-50 Global AUM (~100 HC)',
    lens: 'delivery',
  },
  {
    id: 'hub',
    code: 'CORE // HUB',
    short: 'BA Lead + AI',
    title: 'Hands-On BA Lead & AI Agent Harness',
    spec: '100% full-time delivery · Human-in-control AI harness · Monitor dashboard',
    lens: 'ai',
  },
  {
    id: 'systems',
    code: 'OUT // 03',
    short: 'API & EDW',
    title: 'B2B Microservices, Policy APIs & EDW',
    spec: 'Clean architecture · Policy Service APIs · Oracle DW → SQL Server EDW',
    lens: 'delivery',
  },
];

export function HeroIllustration({ onSelectLens }) {
  const [activeNodeId, setActiveNodeId] = useState('hub');
  const activeNode =
    BLUEPRINT_NODES.find((node) => node.id === activeNodeId) || BLUEPRINT_NODES[2];

  const handleNodeInteract = (node) => {
    setActiveNodeId(node.id);
    if (onSelectLens && node.lens) {
      onSelectLens(node.lens);
    }
  };

  return (
    <div className="blueprint-widget">
      <div className="blueprint-widget__bar no-print">
        <span className="blueprint-widget__code">SYS // ARCH-01</span>
        <span className="blueprint-widget__hint">Interactive — tap node</span>
      </div>

      <motion.svg
        viewBox="0 0 280 188"
        width="280"
        height="188"
        fill="none"
        role="img"
        aria-label="Interactive system architecture diagram connecting 21-BA Leadership and Insurance/Finance Domain through the Hands-On BA Lead and AI Harness Hub to B2B Microservices and EDW delivery"
        initial="hidden"
        animate="visible"
      >
        {/* Outer blueprint frame */}
        <motion.rect
          x="8"
          y="8"
          width="264"
          height="172"
          rx="10"
          stroke="var(--color-border)"
          strokeWidth="1.25"
          fill="var(--color-surface)"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Corner registration ticks */}
        <path
          d="M16 20V14H22M258 14H264V20M16 168V174H22M258 174H264V168"
          stroke="var(--color-text-muted)"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.55"
        />

        {/* Connecting flow paths */}
        <motion.path
          d="M74 56 C106 56, 106 94, 132 94"
          stroke={activeNodeId === 'dept' || activeNodeId === 'hub' ? 'var(--color-accent)' : 'var(--color-border)'}
          strokeWidth={activeNodeId === 'dept' || activeNodeId === 'hub' ? '2.6' : '1.8'}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...drawTransition, delay: 0.15 }}
        />
        <motion.path
          d="M74 132 C106 132, 106 94, 132 94"
          stroke={activeNodeId === 'domain' || activeNodeId === 'hub' ? 'var(--color-accent)' : 'var(--color-border)'}
          strokeWidth={activeNodeId === 'domain' || activeNodeId === 'hub' ? '2.6' : '1.8'}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...drawTransition, delay: 0.28 }}
        />
        <motion.path
          d="M176 94 L210 94"
          stroke={activeNodeId === 'systems' || activeNodeId === 'hub' ? 'var(--color-accent)' : 'var(--color-navy)'}
          strokeWidth="2.6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ ...drawTransition, delay: 0.42 }}
        />

        {/* Animated data packet pulse along top/bottom -> hub -> output */}
        <motion.circle
          r="3.2"
          fill="var(--color-accent)"
          className="no-print"
          animate={{
            cx: [74, 108, 154, 210],
            cy: [56, 75, 94, 94],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.circle
          r="3.2"
          fill="var(--color-accent)"
          className="no-print"
          animate={{
            cx: [74, 108, 154, 210],
            cy: [132, 113, 94, 94],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2.8,
            delay: 1.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Node 1: 21 BAs & SWAT */}
        <motion.g
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => setActiveNodeId('dept')}
          onClick={() => handleNodeInteract(BLUEPRINT_NODES[0])}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.rect
            x="22"
            y="36"
            width="52"
            height="40"
            rx="8"
            fill={activeNodeId === 'dept' ? 'var(--color-accent)' : 'var(--color-accent-soft)'}
            stroke="var(--color-accent)"
            strokeWidth="1.8"
          />
          <text
            x="48"
            y="54"
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill={activeNodeId === 'dept' ? '#ffffff' : 'var(--color-navy)'}
          >
            21 BAs
          </text>
          <text
            x="48"
            y="66"
            textAnchor="middle"
            fontSize="7.5"
            fontFamily="var(--font-mono)"
            fill={activeNodeId === 'dept' ? '#ffffff' : 'var(--color-text-muted)'}
          >
            + SWAT
          </text>
        </motion.g>

        {/* Node 2: Insurance & Finance Domain */}
        <motion.g
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => setActiveNodeId('domain')}
          onClick={() => handleNodeInteract(BLUEPRINT_NODES[1])}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.rect
            x="22"
            y="112"
            width="52"
            height="40"
            rx="8"
            fill={activeNodeId === 'domain' ? 'var(--color-accent)' : 'var(--color-accent-soft)'}
            stroke="var(--color-accent)"
            strokeWidth="1.8"
          />
          <text
            x="48"
            y="130"
            textAnchor="middle"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill={activeNodeId === 'domain' ? '#ffffff' : 'var(--color-navy)'}
          >
            DOMAIN
          </text>
          <text
            x="48"
            y="142"
            textAnchor="middle"
            fontSize="7.5"
            fontFamily="var(--font-mono)"
            fill={activeNodeId === 'domain' ? '#ffffff' : 'var(--color-text-muted)'}
          >
            FCA · AUM
          </text>
        </motion.g>

        {/* Center Hub: Hands-On BA Lead + AI Agent Harness */}
        <motion.g
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => setActiveNodeId('hub')}
          onClick={() => handleNodeInteract(BLUEPRINT_NODES[2])}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.rect
            x="128"
            y="66"
            width="52"
            height="56"
            rx="10"
            fill="var(--color-navy)"
            stroke={activeNodeId === 'hub' ? 'var(--color-accent)' : 'var(--color-navy)'}
            strokeWidth="2.2"
          />
          <text
            x="154"
            y="89"
            textAnchor="middle"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--color-bg)"
          >
            BA LEAD
          </text>
          <text
            x="154"
            y="102"
            textAnchor="middle"
            fontSize="7.5"
            fontFamily="var(--font-mono)"
            fill="var(--color-accent-soft)"
          >
            AI HARNESS
          </text>
          <circle cx="154" cy="112" r="2.5" fill="var(--color-accent)" />
        </motion.g>

        {/* Right Node: B2B Microservices & EDW */}
        <motion.g
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => setActiveNodeId('systems')}
          onClick={() => handleNodeInteract(BLUEPRINT_NODES[3])}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.rect
            x="208"
            y="68"
            width="50"
            height="52"
            rx="8"
            fill={activeNodeId === 'systems' ? 'var(--color-accent)' : 'var(--color-cream)'}
            stroke={activeNodeId === 'systems' ? 'var(--color-accent)' : 'var(--color-navy)'}
            strokeWidth="1.8"
          />
          <text
            x="233"
            y="90"
            textAnchor="middle"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill={activeNodeId === 'systems' ? '#ffffff' : 'var(--color-navy)'}
          >
            API · B2B
          </text>
          <text
            x="233"
            y="103"
            textAnchor="middle"
            fontSize="7.5"
            fontFamily="var(--font-mono)"
            fill={activeNodeId === 'systems' ? '#ffffff' : 'var(--color-text-muted)'}
          >
            ETL · EDW
          </text>
        </motion.g>
      </motion.svg>

      {/* Live interactive node readout */}
      <div className="blueprint-widget__readout no-print" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16 }}
          >
            <div className="blueprint-widget__readout-top">
              <span className="blueprint-widget__node-code">{activeNode.code}</span>
              <span className="blueprint-widget__node-title">{activeNode.title}</span>
            </div>
            <p className="blueprint-widget__node-spec">{activeNode.spec}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function PillarIcon({ type }) {
  const paths = {
    team: (
      <>
        <circle cx="9" cy="7" r="3" />
        <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
        <circle cx="16.5" cy="8.5" r="2.2" />
        <path d="M16 14c2.4.3 4.5 1.8 4.5 4.5" />
      </>
    ),
    architecture: (
      <>
        <rect x="3" y="4" width="7" height="6" rx="1.5" />
        <rect x="14" y="4" width="7" height="6" rx="1.5" />
        <rect x="8.5" y="14" width="7" height="6" rx="1.5" />
        <path d="M6.5 10v2h11v-2M12 12v2" />
      </>
    ),
    swat: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />
        <path d="M9.5 12l2 2 3.5-4" />
      </>
    ),
    presales: (
      <>
        <circle cx="12" cy="12" r="9" />
        <polygon points="14.5 9.5 9.5 11.5 7.5 16.5 12.5 14.5 14.5 9.5" />
      </>
    ),
    ai: (
      <>
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" />
      </>
    ),
    copy: (
      <>
        <rect x="9" y="9" width="11" height="11" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </>
    ),
    check: (
      <>
        <path d="M20 6L9 17l-5-5" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </>
    ),
    moon: (
      <>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </>
    ),
  };

  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      whileHover={{ scale: 1.12, rotate: 3 }}
      transition={{ type: 'spring', stiffness: 320, damping: 16 }}
    >
      {paths[type] || paths.swat}
    </motion.svg>
  );
}
