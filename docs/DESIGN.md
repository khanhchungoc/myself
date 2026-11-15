# DESIGN.md — "Architectural Blueprint" Executive Design System

An executive, editorial design system tailored for a Business Analyst Manager & BA Lead in insurance and banking—balancing leadership authority with technical/architectural precision.

---

## 1. Color Tokens (Executive & Editorial)

| Token | Hex | Role & Usage |
| :--- | :--- | :--- |
| **Primary Brand / Headers** | `#2A2E3A` | Dark Navy — Name, section headers, and primary structural dividers to project executive authority. |
| **Surface / Callout Background** | `#FAF8F5` | Warm Cream / Parchment — Subtle top header banner and dedicated "Executive Core" callout boxes so the document feels like a bespoke specification. |
| **Page Canvas** | `#FFFFFF` | Pure White — Main page background for crisp screen reading and clean A4 print. |
| **Body Text** | `#1E2229` | Deep Charcoal — High-contrast, softer than pure black for effortless scannability on screen and print. |
| **Muted Metadata** | `#5A6270` | Slate Gray — Dates, locations (`Hanoi, Vietnam`), and company sub-descriptors. |
| **Accent / Technical Tag** | `#2563EB` | Blueprint Blue — Used sparingly for subtle metric callouts, active indicators, and hyperlink underlines. |
| **Secondary Warm Accent** | `#B45309` | Warm Amber — Optional sparing highlight for leadership/domain callouts. |
| **Hairline Rule** | `#D1D5DB` | Graphite — Thin `0.5pt` blueprint dividers separating functional domains and roles. |

---

## 2. Typography Scale & Pairing

* **Headings — `Plus Jakarta Sans` (fallback `Inter`):** Clean, geometric sans-serif with strong architectural proportions.
  * **Name:** `22pt` Bold (`#2A2E3A`), tight tracking.
  * **Section Headers:** `11pt` Bold Uppercase, `0.08em` letter-spacing (`#2A2E3A`).
* **Body Copy — `Inter`:** Optimized for dense information scannability.
  * **Size & Leading:** `9.5pt–10pt` Regular (`15px–16px` mobile-first web base), `1.4` line-height (`#1E2229`).
* **Technical & Metric Tags — `JetBrains Mono`:**
  * **Size & Weight:** `8.5pt` Medium for inline domain standards, protocols, and tooling (e.g., `UK FCA`, `Policy Service API`, `B2B Microservices`).

---

## 3. Layout & Grid Architecture

* **Mobile-First Web → Asymmetric Desktop/A4 Print:**
  * Avoid a full-page 2-column split, which cramps senior experience descriptions and confuses ATS parsers.
  * **1. Full-Width Header Banner:** Warm Cream (`#FAF8F5`) surface with portrait photo (`src/assets/profile.jpg`), name, role, motto, contact links (LinkedIn, email, phone), and an architectural blueprint SVG illustration.
  * **2. 2-Column "Executive Core" Summary Block:**
    * *Left Column:* Hands-On Department Leadership, AI Transformation & Pre-Sales Scope (21-BA team leadership, mentoring, training, RMO, BA agent harness, pre-sales).
    * *Right Column:* Domain & Architecture Stack (UK Insurtech ODC, B2B microservices, Policy Service APIs, UK FCA compliance, Global Asset Management / EDW, payment migrations).
    * *(Stacks to 1 column on mobile `< 768px`.)*
  * **3. 2D Vertical Experience Architecture (Option 1 — Spine + Full-Width Workstream Cards):**
    * Avoid horizontal swimlane grids, which cramp narrow mobile screens (`320px+`) and A4 print margins.
    * **Dimension 1 — Role Progression Spine:** A compact vertical stepper inside a multi-role company block (`NashTech`) showing promotions, dates, and a 1-line scope summary (`Business Analyst → Senior Business Analyst → BA Team Manager & BA Lead`).
    * **Dimension 2 — Full-Width Vertical Workstream Cards:** Stacked full-width cards directly below the spine (one per workstream/track), each tagged with `JetBrains Mono` metadata pills (`Role`, `Period / Continuity`, `Account Scale`). Continuous multi-year engagements (e.g., UK Insurtech `Mar 2021 – Present`, Pre-Sales `SBA → BAM`) are documented once with zero overlap across roles while keeping ATS parsing clean.
    * **Earlier Chronological Roles:** Full-width role blocks below NashTech (e.g., `ETC Technology Systems JSC`).
  * **4. Grouped Competencies & Tooling:** 5 BA-Manager-prioritized categories (*Leadership & Operations*, *Domain & Technical Skills*, *Methodologies & Frameworks*, *AI-Native BA Workflow & Tooling*, *Delivery, Data & Integration Tools*) rendered as clean `JetBrains Mono` tags.
  * **5. Credentials, Education, Honors & Languages:** Clean 2-column blueprint grid on desktop/A4 (`1fr` stacked on mobile) covering IIBA CBDA & IELTS 8.0, Master's & Bachelor's degrees, NashTech Honors & Awards, and Languages.
* **High-Scannability Density:**
  * **Print Margins:** `16mm` on A4 (`@page { size: A4; margin: 16mm; }`).
  * **Role Spacing:** `12pt` spacing between chronological roles.
  * **Blueprint Dividers:** Thin `0.5pt` graphite hairline rules (`#D1D5DB`) between functional domains.
