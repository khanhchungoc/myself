# AGENTS.md — Agent Behavior & Working Rules

Read [docs/SPEC.md](./docs/SPEC.md) and [docs/DESIGN.md](./docs/DESIGN.md) before making changes to understand the product requirements, visual design system, and architecture.

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
