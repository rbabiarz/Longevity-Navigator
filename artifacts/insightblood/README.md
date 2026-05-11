# InsightBlood

**Personal blood work intelligence — longitudinal trends, evidence-backed insights, and PubMed-cited guidance from the world's leading medical literature.**

---

## The Problem

Consumers receive blood test results as static PDFs scattered across patient portals — MyChart, MyQuest, Labcorp Patient — with each marker shown against a generic "normal" range. There is no easy way to:

- Consolidate results across labs and time
- See trajectories relative to **optimal** (not just normal) ranges
- Connect markers to evidence-backed lifestyle interventions
- Understand age-specific risk for chronic disease and early cancer signals

Existing services either upsell their own lab tests (InsideTracker, Function Health, SiPhox) and lock data inside walled gardens, or they are clinician-facing EHRs not designed for the health-curious individual. The cost of inaction is missed early intervention windows for cardiovascular disease, metabolic dysfunction, and cancer — conditions where the gap between "first abnormal labs" and "diagnosis" is often 5–15 years.

---

## What InsightBlood Does

InsightBlood is a personal health intelligence layer on top of blood work you already have. Upload any lab PDF, get longitudinal trend charts, age- and sex-adjusted risk classifications, and evidence-graded recommendations — all with primary source citations, never a blog.

**Safety information is never paywalled.** High-risk classifications and actionable next steps are available to every user.

---

## Target Users

**The Optimizer** — 30–55, college-educated, already pays for an annual physical. Listens to Peter Attia, Andrew Huberman, Rhonda Patrick. Wants years of PDFs consolidated into a longitudinal record with optimal-range context.

**The Family Health Lead** — 40–65, managing labs for a parent or spouse with a family history of cardiac disease, diabetes, or cancer. Needs plain-English explanations and clear "what should I do next" guidance.

**The Chronically Managed** — Diagnosed condition (pre-diabetes, hypothyroid, autoimmune). Gets labs every 3–6 months. Wants change-detection and intervention correlation — did changing X actually move the marker?

---

## Core Features

### Lab Ingestion
- Upload PDF, photo, or manual entry — Quest, Labcorp, Boston Heart, Epic/Cerner
- OCR extraction with ≥90% accuracy target across major lab formats
- LOINC-normalized marker names across labs and time

### Longitudinal Trend Charts
- Every marker plotted over time with three reference bands:
  1. Lab's "normal" range
  2. Age- and sex-adjusted optimal range from the clinical literature
  3. Personal trajectory (slope over last N tests)
- Risk classification: **Optimal / Borderline / Elevated / High** — calibrated to your age and sex
- Every classification includes the rule that fired, the literature behind it, and evidence grade (A/B/C/D)

### Six Pre-Built Clinical Patterns
Cross-marker patterns detected the way a clinician thinks, not just single-marker flags:

| Pattern | Key Markers |
|---|---|
| Cardiometabolic Risk | ApoB · Lp(a) · hs-CRP · Non-HDL |
| Insulin Resistance / MASLD | Fasting Insulin · HbA1c · ALT · Triglycerides/HDL |
| Inflammaging | hs-CRP · N/L Ratio · Ferritin · Albumin |
| Iron Deficiency / Occult GI | Hemoglobin · MCV · Ferritin · Platelets |
| Thyroid Dysfunction | TSH · Free T4 · Free T3 · Anti-TPO |
| Kidney Trajectory | eGFR · Cystatin C · UACR · Creatinine |

### Evidence-Backed Recommendations
- Per-marker and per-pattern recommendations across nutrition, exercise, sleep, supplements, and screening
- Every recommendation tagged A/B/C/D for evidence strength with a primary citation
- Citations drawn from PubMed, NEJM, JAMA, Lancet, Cochrane, AHA, ADA, KDIGO, USPSTF, Endocrine Society

### AI Longevity Coach
- Conversational interface grounded in your actual marker data
- Scope-limited: cannot diagnose, cannot prescribe, cannot de-escalate a high-risk classification
- All factual claims attributed to a specific library entry — no hallucinated citations
- Post-filter enforces banned patterns before display: no disease-diagnosis language, no medication dosing, no unsourced claims

### Doctor-Prep Packets
- Exportable summary of your high-risk markers, trend context, and evidence-backed talking points
- Designed to make the most of a 15-minute appointment

### Dashboard
- Overview with key marker cards, sparklines, and risk summary
- Full marker table (120+ markers across 9 clinical domains) with search, filter by category and risk level, and detailed popup per marker
- Upload history management — hide/unhide lab runs from trend calculations
- Settings with profile, preferences, and notification controls

---

## Health Domains

120+ markers organized across 9 clinical domains:

- **Cardiovascular** — ApoB, Lp(a), hs-CRP, Homocysteine, ApoA1, Non-HDL
- **Metabolic** — HbA1c, Fasting Insulin, HOMA-IR, GGT, Uric Acid
- **Inflammation** — hs-CRP, N/L Ratio, Ferritin, Albumin, ESR
- **Thyroid & Endocrine** — TSH, Free T3, Free T4, Reverse T3, Anti-TPO
- **Kidney** — eGFR, Cystatin C, UACR, BUN, Creatinine
- **Liver** — ALT, AST, GGT, ALP, FIB-4 Score, Bilirubin
- **Sex Hormones** — Testosterone, SHBG, Estradiol, FSH, LH, DHEA-S
- **Nutritional** — Vitamin D, B12, Folate, Ferritin, Magnesium, Zinc
- **Hematology** — CBC + Differential, MCV, RDW, Reticulocytes, ESR

---

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| UI framework | React 19 + TypeScript | Component model suits the complex interactive dashboard |
| Routing | Wouter | Minimal bundle footprint vs. react-router |
| Styling | Tailwind CSS v4 | HSL custom properties for theming; dark-mode ready |
| Charts | Recharts | Recharts' composable API fits per-marker sparklines and full trend views |
| State / data | TanStack Query | Server state management; cache invalidation on uploads |
| Components | Radix UI primitives | Accessible headless components; shadcn/ui layer on top |
| Build | Vite 7 | Fast HMR; static output for GitHub Pages deploy |
| Auth | Browser-only demo mode | No server required for prototype; any credentials accepted |

---

## Architecture Decisions

**Client-side only.** The prototype ships as a static bundle — no API calls required, all data is mock. This enables GitHub Pages deployment and zero-friction demos. The auth context, upload flow, and dashboard all operate entirely in the browser with localStorage persistence.

**LOINC normalization at the model layer.** Marker names from different labs are normalized to LOINC codes before any risk rule fires. This is the foundation for cross-lab deduplication and trend continuity.

**Editorial, not algorithmic, recommendations.** All risk rules and recommendations are authored and reviewed by the internal product/medical-writer team, documented in a versioned content log. Nothing is LLM-generated at runtime without human oversight. This is a deliberate product safety choice.

**Three-tier risk, not binary.** Optimal / Borderline / Elevated gives users actionable signal without the binary anxiety of "normal vs. abnormal." The classifications are calibrated to the user's age and sex, not population-average reference ranges.

**Demo auth is hardcoded `true` on this branch.** Any email and password accepted. No credentials are sent to a server.

---

## Compliance & Safety Position

- **Wellness positioning** under FDA's January 2026 General Wellness guidance — no disease-specific diagnostic or treatment claims
- **HIPAA-aligned engineering posture** — per-user envelope keys at rest, encrypted in transit, access logs, breach response — even though we are not a Covered Entity
- **California CMIA, Washington My Health My Data Act** — health data treated as highest-sensitivity bucket
- **"Not diagnostic" disclaimer** on every risk classification
- **No advertising on health data, ever**
- **Clinical advisory board** deferred at v1 but required before shipping: composite mortality scores, cancer early-signal patterns, or any clinician-facing surface

---

## Running the Demo

```bash
# Install dependencies (from workspace root)
pnpm install

# Start dev server
cd artifacts/insightblood
PORT=5000 BASE_PATH=/ pnpm dev
```

Open [http://localhost:5173](http://localhost:5173). Any email and password will sign you in.

### Build for static hosting

```bash
PORT=5000 BASE_PATH=/your-base-path pnpm build
# Output: dist/public/
```

---

## Route Map

| Path | Surface |
|---|---|
| `/` | Marketing home |
| `/features` | Feature detail |
| `/science` | Evidence library and citation sources |
| `/about` | Company |
| `/login` | Sign in (demo: any credentials) |
| `/signup` | Create account (demo: any credentials) |
| `/dashboard` | Overview — key markers, risk summary, uploads |
| `/dashboard/markers` | All 120+ markers with search and filter |
| `/dashboard/upload` | Upload lab PDF or manual entry |
| `/dashboard/coach` | AI Longevity Coach |
| `/dashboard/settings` | Profile, preferences, billing |

---

## Product Principles

These are founder-locked and non-negotiable constraints that governed every feature decision:

1. **Never upsell lab tests.** InsightBlood works on labs the user already has. We are never in the business of upselling proprietary test kits.
2. **Safety is never a premium feature.** High-risk classifications, recommendations, and red-flag patterns are available on every tier.
3. **Every claim cites primary literature.** No paraphrased blogs, no uncited assertions. If we can't point to PubMed, NEJM, AHA, ADA, KDIGO, or USPSTF, it doesn't ship.
4. **Optimal, not just normal.** Lab reference ranges are population-derived, not health-optimized. We show both — and we're explicit about the difference.
5. **Wellness, not medicine.** InsightBlood is not a medical device. Not diagnostic. Not a substitute for a clinician. Educational and wellness purposes only.

---

## Status

This is a working prototype demonstrating the full product surface — marketing site, auth flow, dashboard, marker detail, AI coach, upload flow, and settings. All data is mock. The app is deployed to GitHub Pages as a static SPA.

**Live demo:** [Robert Babiarz — InsightBlood](https://rbabiarz.github.io/Longevity-Navigator/)
