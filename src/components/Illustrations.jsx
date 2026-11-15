import { motion } from 'motion/react';

const drawTransition = {
  duration: 0.9,
  ease: 'easeInOut',
};

export function HeroIllustration() {
  return (
    <motion.svg
      viewBox="0 0 260 200"
      width="240"
      height="185"
      fill="none"
      aria-hidden="true"
      initial="hidden"
      animate="visible"
    >
      {/* Subtle background grid */}
      <motion.rect
        x="14"
        y="14"
        width="232"
        height="172"
        rx="14"
        stroke="var(--color-border)"
        strokeWidth="1.5"
        fill="var(--color-surface)"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Connecting flow lines: Strategy -> API / Domain -> Team */}
      <motion.path
        d="M65 62 C105 62, 105 100, 145 100"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ ...drawTransition, delay: 0.2 }}
      />
      <motion.path
        d="M65 138 C105 138, 105 100, 145 100"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ ...drawTransition, delay: 0.35 }}
      />
      <motion.path
        d="M175 100 L212 100"
        stroke="var(--color-navy)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ ...drawTransition, delay: 0.5 }}
      />

      {/* Left nodes: People & Domain */}
      <motion.circle
        cx="52"
        cy="62"
        r="14"
        fill="var(--color-accent-soft)"
        stroke="var(--color-accent)"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
      />
      <motion.circle
        cx="52"
        cy="138"
        r="14"
        fill="var(--color-accent-soft)"
        stroke="var(--color-accent)"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.25 }}
      />

      {/* Center hub: BA Lead */}
      <motion.rect
        x="140"
        y="80"
        width="40"
        height="40"
        rx="10"
        fill="var(--color-navy)"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 240, damping: 18, delay: 0.4 }}
      />
      <motion.path
        d="M153 100 L158 105 L168 94"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      />

      {/* Right node: Microservices / Delivery */}
      <motion.rect
        x="208"
        y="84"
        width="24"
        height="32"
        rx="6"
        fill="var(--color-cream)"
        stroke="var(--color-navy)"
        strokeWidth="2"
        initial={{ x: 10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      />
    </motion.svg>
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
    training: (
      <>
        <path d="M3 7l9-4 9 4-9 4-9-4z" />
        <path d="M6 10.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5" />
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
    domain: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />
        <path d="M9.5 12l2 2 3.5-4" />
      </>
    ),
  };

  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      whileHover={{ scale: 1.12, rotate: 3 }}
      transition={{ type: 'spring', stiffness: 320, damping: 16 }}
    >
      {paths[type] || paths.domain}
    </motion.svg>
  );
}
