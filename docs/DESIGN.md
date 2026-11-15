# DESIGN.md — "Architectural Blueprint" Executive Design System (v2 — 4-Zone Interactive Architecture)

An executive, editorial design system tailored for a Business Analyst Manager & Hands-On BA Lead in insurance and banking—combining leadership authority with technical/architectural precision, interactive `motion/react` exploration, and crisp A4 print output.

---

## 1. Color Tokens (Parchment Light Default + CAD Night Blueprint Mode)

### Light Mode (Default & `@media print` A4 Output)
| Token | Hex | Role & Usage |
| :--- | :--- | :--- |
| **Primary Brand / Headers (`--color-navy`)** | `#2A2E3A` | Dark Navy — Name, section headers, and primary structural dividers. |
| **Surface / Callout (`--color-cream`)** | `#FAF8F5` | Warm Cream / Parchment — Hero banner, telemetry strip, and blueprint callout surfaces. |
| **Page Canvas (`--color-bg`)** | `#FFFFFF` | Pure White — Main page background for crisp screen reading and clean A4 print. |
| **Body Text (`--color-text`)** | `#1E2229` | Deep Charcoal — High-contrast (`15.9:1`), softer than pure black for effortless scannability. |
| **Muted Metadata (`--color-text-muted`)** | `#5A6270` | Slate Gray — Dates, locations, and specification coordinates. |
| **Accent / Technical Tag (`--color-accent`)** | `#2563EB` | Blueprint Blue — Active lens indicators, telemetry highlights, and technical tags. |
| **Warm Principle Accent (`--color-accent-warm`)** | `#9A3412` | Deep Amber (`6.4:1` AA contrast on cream) — Operating principle callout and SWAT/leadership accents. |
| **Hairline Rule (`--color-border`)** | `#D1D5DB` | Graphite — Thin `1px` (`0.5pt` in print) blueprint dividers. |
| **Focus Ring (`--color-ring`)** | `#2563EB` | Accessible `2px` keyboard focus ring with `2px` offset. |

### CAD Night Blueprint Mode (`[data-theme="dark"]` — Web-Only `.no-print` Toggle)
- **Canvas (`--color-bg`):** `#0B1120` (Deep CAD Navy)
- **Surface / Callout (`--color-cream` / `--color-surface`):** `#111827` / `#1E293B`
- **Primary Headers (`--color-navy`):** `#F8FAFC`
- **Body Text (`--color-text`):** `#E2E8F0`
- **Muted Metadata (`--color-text-muted`):** `#94A3B8`
- **Blueprint Accent (`--color-accent`):** `#38BDF8` (CAD Cyan)
- **Border (`--color-border`):** `#334155`

---

## 2. Typography Scale & Pairing

* **Headings — `Plus Jakarta Sans` (fallback `Inter`):**
  * **Name:** `22pt` (`2rem–2.25rem` desktop web) Bold, tight tracking (`-0.02em`), `text-wrap: balance`.
  * **Section Headers:** `11pt` Bold Uppercase, `0.08em` letter-spacing, paired with `JetBrains Mono` specification index tags (`SPEC // 01`–`04`).
* **Body Copy — `Inter`:**
  * **Size & Leading:** `15px–16px` mobile-first web base (`9.5pt` in print), `1.5` line-height, constrained to `60–72ch` measure in structured spec rows.
* **Technical & Telemetry Tags — `JetBrains Mono`:**
  * **Size & Weight:** `8.5pt` (`0.76rem–0.82rem`) Medium with `font-variant-numeric: tabular-nums` for metrics, timelines, API standards, and blueprint coordinates.

---

## 3. 4-Zone Spatial Architecture (Web & A4 Print)

1. **Zone 0 — Sticky Blueprint Command Bar (`.no-print`):**
   * Top `2px` scroll-linked progress ruler (`useScroll` + `useSpring`).
   * **5-Pillar Executive Lens Switcher** (`All Specs`, `21-BA Leadership`, `Tech + Biz Delivery`, `SWAT Recovery`, `Pre-Sales`, `AI Agent Harness`) with shared-layout spring pill (`layoutId="active-lens-pill"`).
   * Quick section jumpers, **Parchment / CAD Night** theme toggle, and **Download / Print A4 PDF** actions.

2. **Zone 1 — Asymmetric Hero Banner + 5-Metric Blueprint Telemetry Strip:**
   * **Left Column:** Company/location eyebrow, Name, Role, framed Operating Principle (`OPERATING PRINCIPLE // “Anything that can go wrong will go wrong”`), non-overlapping Executive Thesis, and tactile contact pills (with 1-click copy for Email & Phone + subtle spec metadata for DOB).
   * **Right Column:** Framed portrait photo + **Interactive System Blueprint SVG** (`HeroIllustration`) where hovering/clicking nodes inspects `21-BA Dept & SWAT`, `Finance & FCA Domain`, `BA Lead + AI Harness Hub`, and `B2B Microservices & EDW`.
   * **Bottom Full-Width Telemetry Strip:** 5 tabular metric cells (`21 BAs`, `100% Full-Time ODC`, `~20 → >40 HC`, `~100 HC`, `4-Stage AI Harness`) with spring count-up on initial viewport entry.

3. **Zone 2 — 5-Pillar Operating Model (Asymmetric Bento Grid):**
   * Replaces generic summary boxes with 5 numbered blueprint modules (`01` to `05`) mapped 1:1 to the candidate's core positioning pillars.
   * **Module 05 (BA AI Agent & Skill Harness)** features an interactive **4-Stage Harness Lifecycle Strip** (`Human-in-Control` → `Quick Operation` → `Token Optimization` → `Monitor Dashboard`).

4. **Zone 3 — Synchronized 2D Experience Matrix (Spine + Structured Workstream Cards):**
   * **Desktop (`≥ 960px`):** `Dimension 1 · Role Progression Spine` sits in a **sticky left rail (`270px`)** while `Dimension 2 · Core Workstream Tracks` occupies the main right column (`1fr`). Clicking or hovering a role era on the Spine highlights the corresponding tracks and era rows.
   * **Structured Spec Rows:** Inside each Workstream Card, each highlight renders as a 2-column specification row (`Capability Lead + Era Tag` on the left, `65ch Outcome Copy` on the right) to eliminate wall-of-text fatigue.
   * **Mobile (`< 960px`) & `@media print`:** Linearizes cleanly into a vertical stack with `break-inside: avoid`.

5. **Zone 4 — Competency Bento Matrix & Verified Credentials:**
   * **6-Column Skill Bento Grid:** Groups the 5 BA Manager competency domains; clicking any `.tech-tag` triggers an **Evidence X-Ray** that highlights where that skill was proven in Experience.
   * **2-Column Credentials Grid:** Licenses & Certifications (IIBA CBDA, IELTS 8.0), Honors & Awards, Education (Hasselt University Master's with Distinction, Banking Academy), and Languages.
