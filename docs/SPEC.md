# SPEC.md — Project & Product Specification

## Overview
Personal CV & interactive architectural portfolio for **Ngoc Khanh Chu** (Business Analyst Manager & Hands-On BA Lead at NashTech, Hanoi, Vietnam), hosted at [`khanhchungoc/myself`](https://github.com/khanhchungoc/myself).

- **Primary Host:** GitHub Pages (portable to Cloudflare Pages / custom domain via relative paths `./`).
- **Dual Output:** Highly interactive web experience (`motion/react`) + clean, A4-printable executive specification (`@media print` + automated `dist/cv.pdf` build via GitHub Actions).

## Product & UX Requirements
1. **Mobile-First, Accessible & Responsive (`320px+` → `1440px+`)**
   - Mobile-first CSS with comfortable `40px–44px` touch targets, `:focus-visible` keyboard rings, `tabular-nums` data alignment, and zero horizontal overflow.
   - Constrained reading measure (`60–72ch`) via structured 2-column specification rows inside Experience tracks.

2. **Content & Executive Positioning (Zero Redundancy)**
   - **Tone:** Professional, friendly, honest, and grounded—clear and confident without corporate fluff or fabricated claims.
   - **Non-Overlapping Hierarchy:**
     - **Zone 1 (Hero + Telemetry):** Identity, Operating Principle, Executive Thesis, and 5 quantified scope anchors.
     - **Zone 2 (5-Pillar Operating Model Bento):** Dedicated modules for (1) Close, Hands-On Leadership of 21 BAs, (2) Full-Time ODC Delivery (Technical Integration + Business Functionalities), (3) SWAT Intervention for Projects in Need, (4) Pre-Sales Leadership, and (5) BA-Specific AI Agent & Skill Harness (with interactive 4-stage lifecycle explorer).
     - **Zone 3 (2D Experience Matrix):** Sticky Role Progression Spine (Dimension 1) cross-linked to Core Workstream Tracks (Dimension 2) and Earlier Banking Experience.
     - **Zone 4 (Skill Bento & Credentials):** Interactive Skill-to-Evidence X-Ray tags and verified qualifications.

3. **Interactive Motion Architecture (`motion/react` v12)**
   - **Sticky 5-Pillar Executive Lens Switcher:** Shared-layout spring pill (`layoutId="active-lens-pill"`) that filters/highlights matching Bento pillars, Experience rows, and Skill tags.
   - **Interactive System Blueprint SVG (`HeroIllustration`):** Hover/tap nodes with live SVG data-flow pulse and `AnimatePresence` specification readout.
   - **Interactive 4-Stage BA AI Harness Pipeline:** Expandable stage readout inside Pillar 05.
   - **2D Spine ↔ Workstream Synchronizer:** Clicking/hovering a role era on the Spine highlights corresponding tracks and bullets.
   - **Skill-to-Evidence X-Ray:** Clicking any skill chip highlights matching Experience rows and displays an active filter banner.
   - **Scroll Ruler & Spring Telemetry Counters:** Hardware-accelerated `useScroll` + `useSpring` progress bar and `useMotionValue` + `useTransform` numeric counters.
   - **Accessibility & Print Safety:** Root `<MotionConfig reducedMotion="user">` and `@media print` overrides (`opacity: 1 !important; transform: none !important;`) so exported PDFs never clip, dim, or hide content.

## Technical Architecture
- **Stack:** Vite + React 19 + `motion` (`motion/react` v12).
- **Portability:** `vite.config.js` sets `base: './'` so assets resolve identically on `github.io/myself/` and root custom domains.
- **CI/CD & PDF Export:** `.github/workflows/deploy.yml` builds `dist/`, renders `dist/cv.pdf` in A4 via headless Chromium (Playwright), and deploys `dist/` to GitHub Pages.
