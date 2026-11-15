# SPEC.md — Project & Product Specification

## Overview
Personal CV for **Ngoc Khanh Chu** (Business Analyst Manager & Hands-On BA Lead at NashTech, Hanoi, Vietnam), tailored for a **BA Manager position at a bank** and hosted at [`khanhchungoc/myself`](https://github.com/khanhchungoc/myself).

- **Primary Host:** GitHub Pages (portable to Cloudflare Pages / custom domain via relative paths `./`).
- **Dual Output:** Clean single-sheet web experience + crisp 2-page A4-printable executive brief (`@media print` + automated `dist/cv.pdf` build via GitHub Actions).

## Product & UX Requirements
1. **Executive Scannability (15-Second Banking Hiring Manager Test)**
   - Single-sheet paper layout with generous whitespace, horizontal hairline dividers, and zero nested box clutter or confusing filter buttons.
   - Bullet-first Experience workstreams (`Bold Outcome Lead:` + concise 1-line impact statement) with zero word-for-word duplication between sections.
2. **Core Candidate Positioning (5 Pillars)**
   - **Close, Hands-On Leadership (23 BAs):** Direct coaching, deliverable reviews, annual KPI appraisals, junior-to-independent mentoring, and RMO staffing alignment.
   - **Full-Time ODC Delivery (Technical + Domain):** Active hands-on BA Lead owning Policy Service APIs, B2B microservices, and EDW/ETL migrations alongside UK FCA compliance and banking/insurance domain logic.
   - **SWAT Project Recovery:** Stepping into high-priority or troubled deliveries across the organization to stabilize requirements and clear bottlenecks.
   - **Pre-Sales Leadership:** Leading client discovery workshops, financial domain consulting, solution framing, and effort sizing.
   - **AI Transformation (BA Agent & Skill Harness):** Architected around **Human-in-Control Decision-Making**, **Quick Operation**, **Token Optimization**, and **Full Agent Monitor Dashboard Lifecycle**.
3. **Mobile-First, Accessible & Print-Safe**
   - Mobile-first CSS (`320px+` → desktop) with keyboard focus rings, `tabular-nums` alignment, and zero scroll-hidden `opacity: 0` gates.
   - Root `<MotionConfig reducedMotion="user">` and `.no-print` utility controls for clean A4 PDF export.

## Technical Architecture
- **Stack:** Vite + React 19 + `motion` (`motion/react` v12).
- **Portability:** `vite.config.js` sets `base: './'` so assets resolve identically on `github.io/myself/` and root custom domains.
- **CI/CD & PDF Export:** `.github/workflows/deploy.yml` builds `dist/`, renders `dist/cv.pdf` in A4 via headless Chromium (Playwright), and deploys `dist/` to GitHub Pages.
