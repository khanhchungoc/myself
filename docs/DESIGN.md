# DESIGN.md — Executive Banking Design System

An institutional, single-sheet design system tailored for **Ngoc Khanh Chu** (Business Analyst Manager & Hands-On BA Lead) applying for a **BA Manager position at a bank**—prioritizing 15-second executive scannability, governance rigor, and crisp A4 print output.

---

## 1. Color Tokens (Institutional Banking Palette)

| Token | Hex | Role & Usage |
| :--- | :--- | :--- |
| **Primary Brand / Headers (`--color-navy`)** | `#182232` | Deep Institutional Navy — Name, section titles, role titles, and top sheet border. |
| **Page Backdrop (`--color-bg`)** | `#F4F5F7` | Cool Stone Gray — Web backdrop framing the single white CV sheet. |
| **Document Sheet (`--color-sheet`)** | `#FFFFFF` | Pure White — Main document surface for high-contrast reading and clean A4 print. |
| **Subtle Callout (`--color-surface-subtle`)** | `#F8F9FB` | Light Slate Tint — 4-metric scope strip, career progression bar, and credential pills. |
| **Body Text (`--color-text`)** | `#1E2530` | Charcoal — High-contrast body copy for effortless scanning. |
| **Muted Metadata (`--color-text-muted`)** | `#525D6F` | Slate Gray — Dates, locations, and secondary captions. |
| **Executive Accent (`--color-accent`)** | `#1D4ED8` | Banking Royal Blue — Role subtitle, workstream metadata, and active links. |
| **Hairline Rule (`--color-border`)** | `#E2E8F0` | Clean `1px` (`0.5pt` in print) horizontal dividers. |

---

## 2. Typography Scale & Pairing (2-Font Executive Banking System)

Selected via `ui-ux-pro-max` (**Financial Trust + Editorial Authority**) with zero monospace coding fonts:

* **Display & Section Headings — `Newsreader` (Optical-Size Serif, `opsz 6..72`, fallback `Georgia`):**
  * **Name (`h1`):** `2.35rem` desktop (`20pt` print) Bold (`700`), `font-optical-sizing: auto`, tight tracking (`-0.02em`).
  * **Section Headers (`h2`) & Company Titles (`h3`):** `1.18rem–1.28rem` Bold (`700`), lending institutional authority without decorative clutter.
* **Body Copy, UI, Dates & Tabular Metrics — `IBM Plex Sans`:**
  * **Role Subtitle & Workstream Leads:** `600–700` SemiBold/Bold.
  * **Body & Scannable Bullets:** `0.9rem–0.95rem` (`8.6pt–9pt` in print), `1.5` line-height, structured as **Bold 2–4 Word Lead + 1-Line Impact**.
  * **Numeric Alignment:** Uses `font-variant-numeric: tabular-nums` natively in `IBM Plex Sans` for metrics (`23 BAs`, `100%`, `~20 → >40`, `~100 HC`) and dates.

---

## 3. Single-Sheet Document Architecture

1. **Minimal Top Utility Bar (`.no-print`):**
   * Clean document label plus **Download PDF** and **Print A4** actions.
2. **Profile Header:**
   * Name, Role (`Business Analyst Manager & BA Lead · NashTech`), single-line Contact Bar, Framed Portrait, and grounded 2-sentence Summary—free of duplicate credential pills or repeated summary cards.
3. **Professional Experience (Left Vertical Timeline):**
   * **NashTech (`Oct 2017 – Present`):** 3 chronological/workstream entries with zero duplication:
     * `May 2024 – Present` (`BA Team Manager & BA Lead`) — Team management & coaching (23 BAs), RMO staffing/hiring/training, project health checks & recovery (SWAT), pre-sales discovery & estimation, and the BA AI Agent & Skill Harness (`01 Human-in-Control Decision-Making`, `02 Quick Operation`, `03 Token Optimization`, `04 Full Agent Monitor Dashboard Lifecycle`).
     * `Mar 2021 – Present` (`Senior BA → ODC BA Lead`) — UK Non-Life Insurtech Platform (hands-on ODC BA Lead, account growth ~20 to >40 members, Proxy PO, B2B microservices & UI Design System).
     * `Oct 2017 – Feb 2021` (`Business Analyst`) — Enterprise Reporting & Data Warehouse Migration (Oracle DW to SQL Server EDW across 5 time zones).
   * **ETC Technology Systems JSC (`Aug 2014 – Sep 2016`):** Commercial Banking Collateral & Credit Limit Management System delivery.
4. **Core Competencies & Verified Credentials:**
   * 3-row Competency Matrix (`Leadership & Operations`, `Domain & Architecture`, `Methods, Data & Tooling`) and 2-column Education, Certifications & Awards footer.
