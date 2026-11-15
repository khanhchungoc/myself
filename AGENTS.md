# AGENTS.md — Agent Behavior & Working Rules

Read [docs/content.md](./docs/content.md), [docs/SPEC.md](./docs/SPEC.md), and [docs/DESIGN.md](./docs/DESIGN.md) before making changes to understand the confirmed CV content, product requirements, visual design system, and architecture.

## Core Candidate Positioning & Profile Directives
When writing, updating, or tailoring CV copy and structure, preserve and emphasize these core pillars of Ngoc Khanh Chu's profile:
1. **Leadership & Close, Hands-On Management Style:** Leads a 21-BA department with a close, hands-on management style—working directly alongside team members to coach, unblock, review deliverables, run annual performance assessments, mentor juniors toward independence, and coordinate training/RMO alignment.
2. **Full-Time Project Delivery (Technical Integration + Business Functionalities):** Still works full-time on project delivery as a hands-on ODC BA Lead, focusing equally on **technical integration** (B2B microservices, Policy Service API specifications, EDW/ETL, payment migrations) and **business functionalities** (insurance & finance domain logic, UK FCA compliance, product ownership).
3. **SWAT Activities (Helping Projects in Need):** Steps into high-priority or troubled projects across the organization for SWAT support—stabilizing requirements, performing BA quality check-ups, unblocking delivery bottlenecks, and helping project teams recover.
4. **Pre-Sales Leadership:** Actively leads and supports pre-sales across client opportunities—driving discovery, solution framing, domain consulting, and effort estimation.
5. **AI Transformation (BA-Specific Agent & Skill Harness):** Designed and built a BA-specific AI agent and skill harness for the BA lines, focused on **human-in-control decision-making**, **quick operation**, **token optimization**, and a **full agent monitor dashboard lifecycle**.

## Behavioral Guidelines
1. **Honesty & Grounding**
   - Never fabricate dates, metrics, certifications, company details, or contact information.
   - If a detail is not confirmed by the user, mark it explicitly as `TBD` or ask for clarification.
   - Keep copy professional, friendly, and grounded—avoid inflated buzzwords.

2. **Mobile-First & Print-Safe Changes**
   - Author CSS mobile-first (`320px+` base styles, `min-width` media queries for larger screens).
   - Ensure any new UI controls or web-only elements carry `.no-print` so they do not appear in PDF exports.
   - Ensure any new `motion` animations respect `<MotionConfig reducedMotion="user">` and remain visible in `@media print`.

3. **Design System Discipline ("Architectural Blueprint")**
   - Follow [docs/DESIGN.md](./docs/DESIGN.md) and use CSS custom properties from `src/styles/tokens.css` rather than hardcoding colors, fonts, or spacing values in components.

4. **Portability & Verification**
   - Keep asset references relative (`./`) and preserve `base: './'` in `vite.config.js`.
   - Run `npm run build` after code changes to verify there are no bundling or syntax errors.
