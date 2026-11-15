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
  * **Size & Weight:** `8.5pt` Medium for inline domain standards, protocols, and tooling (e.g., `SWIFT MT103`, `ISO 20022 PAIN`, `UK FCA`, `Policy Service API`, `B2B Microservices`).

---

## 3. Layout & Grid Architecture

* **Mobile-First Web → Asymmetric Desktop/A4 Print:**
  * Avoid a full-page 2-column split, which cramps senior experience descriptions and confuses ATS parsers.
  * **1. Full-Width Header Banner:** Warm Cream (`#FAF8F5`) surface with name, role, contact links, and an architectural blueprint SVG illustration.
  * **2. 2-Column "Executive Core" Summary Block:**
    * *Left Column:* Management & Pre-Sales Scope (department leadership, RMO, mentoring, training, pre-sales).
    * *Right Column:* Domain & Technical Stack (insurance/finance, API specs, regulatory compliance, payment migrations, microservices).
    * *(Stacks to 1 column on mobile `< 768px`.)*
  * **3. Full-Width Chronological Experience:** Single full-width column for work history so achievements breathe and ATS parsers read cleanly.
* **High-Scannability Density:**
  * **Print Margins:** `16mm` on A4 (`@page { size: A4; margin: 16mm; }`).
  * **Role Spacing:** `12pt` spacing between chronological roles.
  * **Blueprint Dividers:** Thin `0.5pt` graphite hairline rules (`#D1D5DB`) between functional domains.
