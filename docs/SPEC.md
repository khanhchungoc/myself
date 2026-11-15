# SPEC.md — Project & Product Specification

## Overview
Personal CV & professional profile website for **Ngoc Khanh Chu** (Business Analyst Manager & BA Lead at NashTech, Hanoi, Vietnam), hosted at [`khanhchungoc/myself`](https://github.com/khanhchungoc/myself).

- **Primary Host:** GitHub Pages (portable to Cloudflare Pages / custom domain via relative paths `./`).
- **Dual Output:** Interactive web experience + clean, A4-printable PDF (`@media print` + automated `dist/cv.pdf` build via GitHub Actions).

## Product & UX Requirements
1. **Mobile-First & Responsive**
   - Layout starts from mobile viewports (`320px+`) and scales to tablet and desktop (`768px+`).
   - Touch-friendly controls, readable line lengths, and zero horizontal overflow.

2. **Tone & Content**
   - **Tone:** Professional, friendly, honest, and grounded—clear and confident without corporate fluff or exaggerated claims.
   - **Scope:** Close, hands-on leadership of 21 BAs (mentoring, annual assessments, fresher & QC-to-BA training, RMO alignment), ongoing full-time project delivery (hands-on ODC BA Lead focusing on both technical integration and business functionalities across B2B microservices, Policy Service API specs, UK FCA compliance, and ETL/EDW), SWAT activities (helping projects in need), pre-sales leadership, and AI transformation (a BA-specific agent & skill harness centered on human-in-control decision-making, quick operation, token optimization, and a full agent monitor dashboard lifecycle).
   - **Missing details:** Any unconfirmed dates, metrics, or credentials remain marked `TBD` until provided.

3. **Illustrated & Animated (`motion.dev`)**
   - Custom, lightweight inline SVG illustrations reflecting BA leadership, system architecture, and fintech/insurance workflows (`src/components/Illustrations.jsx`).
   - `motion` (`motion/react`) animations applied across entrances, scroll reveals (`whileInView`), SVG path drawings, and subtle hover/tap micro-interactions.
   - Accessibility: `<MotionConfig reducedMotion="user">` enabled at the root.
   - Print safety: `@media print` overrides animation states (`opacity: 1 !important; transform: none !important;`) so exported PDFs never clip or hide content.

4. **Design System: "Architectural Blueprint"**
   - Defined in [DESIGN.md](./DESIGN.md) and implemented via CSS custom properties in `src/styles/tokens.css` (Dark Navy `#2A2E3A`, Warm Cream `#FAF8F5`, Deep Charcoal `#1E2229`, Slate Gray `#5A6270`, Blueprint Blue `#2563EB`, `Plus Jakarta Sans` + `Inter` + `JetBrains Mono`, asymmetric 2-column Executive Core + full-width Experience).

## Technical Architecture
- **Stack:** Vite + React + `motion`.
- **Portability:** `vite.config.js` sets `base: './'` so assets resolve identically on `github.io/myself/` and root custom domains.
- **CI/CD & PDF Export:** `.github/workflows/deploy.yml` builds `dist/`, renders `dist/cv.pdf` in A4 via headless Chromium (Playwright), and deploys `dist/` to GitHub Pages.
