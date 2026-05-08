# PRD: InsightBlood — Personal Blood Work Intelligence App

**Status:** Draft v0.4 (supersedes v0.2 and the v0.3 addendum)
**Author:** rbabiarz@gmail.com (with Claude)
**Last updated:** 2026-05-06
**Brand:** InsightBlood

This version restructures the document around the four areas Cagan identifies as the heart of a good PRD — *product purpose, features, release criteria, schedule* — and adds the disciplines the prior drafts were missing: a one-sentence value proposition, named personas, rank-ordered requirements within each priority band, requirements-to-objective traceability, an explicit assumptions list, a prototype/testing plan, and an engineering reserve. A full changelog is in Appendix B.

---

## At a glance

**Elevator pitch.** *Bring every blood test you've ever taken into one place, see how each marker is trending against age- and sex-adjusted optimal ranges, and get evidence-backed next steps — free on your two most recent tests, $50/yr for full history.*

**Product principles.** These guide every trade-off the team will make.

- The user is the protagonist; we are the knowledgeable friend.
- Empowering, personalized, supportive — never alarmist, never paternalistic.
- Show what we see. Every classification ships with rationale and citations.
- Safety information is never paywalled. The premium hook is *time depth*, not safety.
- Cite the science. Recommendations carry an evidence grade and a primary source.
- Honest about uncertainty. When the science is mixed, say so.

**Release-1 objectives, in priority order.**

1. **Trustworthy classification.** Every marker gets a 3-tier risk classification with a written rationale and at least one primary source. Measured by: ≥80% of recommendations link to a primary source; <2% of classifications later removed for evidence-quality issues.
2. **Time to first trend.** Median ≤5 minutes from signup to a usable longitudinal chart; 70% of new users successfully ingest at least one report on day one.
3. **Extraction quality.** ≥90% marker-extraction accuracy on Quest and Labcorp standard panels; ≥75% on hospital-system PDFs and Boston Heart panels. Failed extractions surface a manual-correction UI — never silently dropped.
4. **Activation.** ≥40% of first-upload users return within 30 days to view or upload a second report.
5. **Trust posture.** Zero disease-specific diagnostic claims in shipped copy. Wellness-positioning audit passes pre-launch and quarterly thereafter.

These objectives are the criteria for cutting scope. If a feature does not advance one of them, it does not ship in v1.

---

## 1. Problem statement

Consumers receive blood test results as static PDFs scattered across patient portals (MyChart, MyQuest, Labcorp Patient), with each marker shown only against a generic "normal" range. They have no easy way to (a) consolidate results across labs and time, (b) see *trajectories* relative to optimal — not just normal — ranges, (c) connect markers to evidence-backed lifestyle interventions, or (d) understand age-specific risk for chronic disease and early cancer signals. Existing services either upsell their own lab tests (InsideTracker, SiPhox, Function Health) and lock data inside their walled gardens, or they are clinician-facing EHRs not designed for the curious individual. The cost of inaction is missed early intervention windows for cardiovascular disease, metabolic dysfunction, and cancers — conditions where the gap between "first abnormal labs" and "diagnosis" is often 5–15 years.

---

## 2. User profiles, goals, and tasks

The prior drafts described user *categories*. Cagan's discipline is to characterize specific archetypes — the Leon-the-Power-Seller test — so the team can ask "what would Maya do here?" instead of debating an abstraction.

### 2.1 Primary persona — Maya, 38, "the Optimizer" (P0)

Maya is a marketing director in Brooklyn with two kids under ten. She listens to Peter Attia on her morning runs, reads Outlive on the subway, and pays out of pocket for a private Boston Heart panel on top of her annual physical. She has six PDF lab reports in Dropbox going back to 2021, in three different lab formats, and she's tried to enter the values into a Notion table twice and given up both times. She is not a clinician but she has read enough to know what ApoB and Lp(a) are and what "optimal" means in the longevity literature. When she gets a new lab report she wants to know two things: did the markers I care about move in the right direction, and is there anything in here I'd have missed. She's willing to pay for software that respects her intelligence and doesn't try to sell her supplements.

**Maya's goals.** Consolidate years of PDFs into one record. See longitudinal trends against optimal — not just normal — ranges. Catch slow drifts before they become diagnoses. Have something to bring to her doctor that's better than a stack of paper. Confirm that a lifestyle change actually moved the markers it was supposed to.

**Maya's tasks.** Upload a PDF. See a marker over time. Tag a date with a life event ("started zone-2 program") and watch the response. Export a one-pager before her annual physical. Set a goal ("ApoB <70 by next test") and track against it.

### 2.2 Secondary persona — David, 54, "the Family Health Lead" (P1)

David is a chemical engineer in Cleveland whose father died of colon cancer at 64. He has a 79-year-old mother in assisted living, a wife with a thyroid condition, and a 17-year-old daughter heading to college. He's the family's de facto health quartermaster — he tracks everyone's appointments, picks up his mother's medications, and spent six hours last March trying to compare his mom's labs across two different patient portals. He is not particularly tech-forward. He's read about CAC scans in the Wall Street Journal and asked his PCP about one. He doesn't read peer-reviewed literature; he reads plain-English explanations and trusts the source if it cites somewhere he recognizes.

**David's goals.** Plain-English explanations of what each abnormal value means. Clear "what should I do next" guidance. The ability to manage his own labs and (eventually) his mother's labs from one place. Confidence that the app isn't going to alarm him or sell him something.

**David's tasks.** Upload a photo of an old paper report. Read a one-paragraph explanation of what an elevated ALT means in a 79-year-old. Print a doctor-prep packet for his mother's next geriatrician visit. Get a reminder when a marker is due for a recheck.

(P2-4 family/dependents view is what eventually makes David's mother manageable from his account; in v1, he creates a second account and accepts the friction.)

### 2.3 Tertiary persona — Patricia, 47, "the Chronically Managed" (P2)

Patricia has Hashimoto's, was diagnosed at 38, and gets a TSH/free T4/free T3/anti-TPO panel every four months along with a full CMP and CBC. Her endocrinologist makes Synthroid dose adjustments based on TSH alone; Patricia has read enough to know free T3 and reverse T3 matter and wants to track them herself. She doesn't need an explanation of what TSH is. She wants to see whether her last dose change moved the values it was supposed to, and whether any of her metabolic markers have drifted since she started lifting weights nine months ago.

**Patricia's goals.** Change-detection on a small set of markers she cares deeply about. Intervention-correlation: did changing X move the marker, by how much, on what timeline. No condescension about thyroid basics.

**Patricia's tasks.** Set up an alert when free T3 falls below 3.0. Tag the date of every Synthroid dose change. View a multi-marker thyroid panel chart with annotations.

### 2.4 Explicitly not the target

- Acute clinical decision-makers (clinicians ordering treatment).
- Pediatric users (<18) — reference ranges and consent regimes are materially different.
- Pregnant users — reference ranges differ across multiple panels and a wrong call is high-cost.
- Patients in active cancer treatment — irrelevant patterns + emotional cost.

These groups are detected via onboarding signals or self-report and the product does the appropriate thing: blocking account creation, hiding pattern detection, switching the coach into a focused supportive mode (see §10.7).

---

## 3. Product objectives — measurable, prioritized

Restated from the at-a-glance section with measurement detail. Every requirement in §6 traces back to one or more of these.

| ID | Objective | Measurement | Why this priority |
|---|---|---|---|
| **O-1** | Trustworthy classification | ≥80% of recommendations link to primary source; <2% later removed | The product's reason to exist. Without trust, the app is a worse Notion table. |
| **O-2** | Time to first trend | Median ≤5 min from signup → first chart; 70% D1 ingestion success | Maya needs to *feel* the value in her first session or she won't come back. |
| **O-3** | Extraction quality | ≥90% accuracy on Quest/Labcorp; ≥75% on long-tail | Without this, ingestion friction kills activation. |
| **O-4** | Activation | ≥40% of first-upload users return within 30 days | Confirms the product is a record, not a one-time tool. |
| **O-5** | Trust posture | Zero disease-diagnostic claims; quarterly audit pass | A single regulatory misstep can end the company. |

---

## 4. Non-goals

These are deliberate exclusions, not oversights. They keep focus and reduce regulatory and partnership exposure.

1. **No lab ordering or phlebotomy in v1.** We sit on top of existing lab work. Avoids CLIA, partner contracts, physician oversight. (Function Health, SiPhox, InsideTracker compete here; we deliberately don't.)
2. **No diagnosis, treatment, or prescription.** Wellness/educational positioning under FDA's Jan 2026 General Wellness guidance.
3. **No genomic, microbiome, or wearable data in v1.** Designed for, not built. Each is a multi-quarter integration.
4. **No clinician-facing collaboration tools in v1.** PDF export is fine; bidirectional EHR write-back is out.
5. **No social or community features.** Comparing labs to strangers is a different product and a moderation liability.
6. **No advertising on health data, ever.** This is a permanent non-goal.

---

## 5. Scenarios

Cagan asks for scenarios, not just user stories. These are intended as "did we build the right thing?" tests, not literal walkthroughs.

**Scenario 1 — Maya's first session.** Sunday morning. Maya signs up on her laptop and uploads three PDFs: her March 2026 annual-physical CMP, her February 2026 Boston Heart panel, and a December 2024 Quest lipid panel. Within ninety seconds she sees her ApoB plotted over time with a 70 mg/dL optimal-band overlay. ApoB is 92, classified medium-risk for her age and sex, with a one-paragraph explanation citing the Sniderman literature and the Attia framework. She clicks "explain why medium" and reads a hundred-and-fifty-word breakdown. She sets a goal — ApoB under 70 by her next test in October. She closes the laptop. She does *not* feel alarmed; she feels like she has a plan.

**Scenario 2 — David and his mother's anemia.** David photographs his mother's Quest CBC from her cardiology visit. The OCR pulls the values cleanly. The app surfaces a hematology pattern: hemoglobin down, MCV down, ferritin down, platelets edging up. The classification is high-risk and the copy reads: "These three values together form a pattern that primary-care doctors investigate as a possible reason to order a colonoscopy or a closer look at GI bleeding. This is not a diagnosis. The pattern doesn't tell us anything about cancer specifically — only that this combination is worth a clinician's eye." David's mother has a doctor, so the GP-finder is hidden. The app generates a doctor-prep packet that David prints and brings to her next appointment that Friday. The internist orders a colonoscopy. (We never told David what to do; we showed him what we saw.)

**Scenario 3 — Patricia's intervention.** Patricia logs a Synthroid dose increase on January 15. Her next labs come back April 18. The app shows her TSH-down/freeT4-up response in the expected pattern with a short note: "your TSH moved 1.4 → 0.9 over 13 weeks following the January 15 dose change; this is consistent with the Synthroid PK literature." Free T3 also moved up half a point, which she'd been worried about. She does not change her behavior; she just feels less anxious. (Anxiety reduction is a feature, not a bug.)

These scenarios are the bar. If the v1 product can't deliver them, we shipped the wrong thing.

---

## 6. Functional requirements

Each requirement is rank-ordered within its priority band (1, 2, 3 …). Each carries a traceability tag back to the objectives in §3. Cagan's bar for **must-have**: the product literally cannot ship without it. Cagan's bar for **high-want**: we want it, but won't delay launch for it. Cagan's bar for **nice-to-have**: future release, but architecture should anticipate.

The PRD states *what* each feature does and the user experience. *How* is left to engineering except where founder decisions in §17.2 lock a specific approach.

### 6.1 Must-have for v1 (rank-ordered)

| Rank | ID | Requirement | Traces to |
|---|---|---|---|
| 1 | **MH-1** | **Marker normalization to LOINC.** Every parsed marker maps to a LOINC code with units harmonized. Internal LOINC coverage spans ≥120 markers including the longevity-panel set in §6.4. | O-1, O-3 |
| 2 | **MH-2** | **Multi-format ingestion.** PDF upload (digital and scanned); photo capture with OCR on mobile; manual-entry fallback for any marker. ≥90% extraction accuracy on Quest/Labcorp standard panels; ≥75% on Epic/Cerner and Boston Heart. Failed extractions must surface a manual-correction UI. | O-2, O-3 |
| 3 | **MH-3** | **Three-tier risk classification per marker.** Low / Medium / High, age- and sex-adjusted, each surfacing a written rationale, the rule that fired, and the citation(s) for the chosen optimal range. High risk includes a supportive next-step CTA — never a prescription. | O-1, O-3, O-5 |
| 4 | **MH-4** | **Longitudinal store and chart.** Each marker rendered over time with the lab "normal" band, the age/sex optimal band, individual data points, a trend line, a confidence indicator below three points, and the lab vendor + assay shown per data point (different assays aren't always comparable — material for thyroid antibodies and Lp(a)). | O-2, O-3 |
| 5 | **MH-5** | **Pattern detection across markers.** Six pre-built patterns: cardiometabolic risk, insulin resistance / MASLD, inflammaging, iron-deficiency / occult-GI-bleed, thyroid dysfunction, kidney trajectory. Each pattern shows the contributing markers and the literature behind the pattern. (Cancer early-signal patterns are P1-6, not v1, per §16's clinical-advisory-board commitment.) | O-1, O-3 |
| 6 | **MH-6** | **Recommendation engine — evidence-graded.** Per-marker and per-pattern recommendations across nutrition, exercise, sleep, stress, supplements, screening, and "see a clinician." Every recommendation tagged A / B / C / D for evidence strength, with a primary citation, mechanism + effect-size, and caveats. Editorially reviewed — never LLM-generated at runtime. | O-1, O-5 |
| 7 | **MH-7** | **Source library.** Curated, versioned internal library drawn from PubMed E-utilities, Nature, NEJM, Lancet, JAMA, Cochrane, USPSTF, AHA, ADA, KDIGO. Editorially reviewed quarterly with a public changelog. | O-1, O-5 |
| 8 | **MH-8** | **Disclaimers and wellness positioning.** "Not a medical device, not diagnostic, not a substitute for a clinician" disclaimer at first run, on every risk classification, and on every recommendation. Copy reviewed against FDA Jan 2026 General Wellness guidance pre-launch and quarterly thereafter. | O-5 |
| 9 | **MH-9** | **Account, security, deletion.** Email + passkey/OTP. PHI encrypted at rest with per-user envelope keys and in transit. One-tap full data export (JSON + CSV + PDF) and one-tap full deletion with a confirmation receipt. HIPAA-aligned posture even though we are not a Covered Entity. | O-5 |
| 10 | **MH-10** | **Freemium gating.** Free tier: unlimited uploads; storage + comparison limited to the two most recent tests; risk classifications, recommendations, and citations fully unlocked on those two tests. Older results auto-archived (not deleted). Premium ($50/yr): full history, longitudinal trends across >2 tests, intervention timelines, doctor-prep packets, reminders, lab connectors. Upgrade and downgrade reversible without data loss. | O-1, O-4 |
| 11 | **MH-11** | **Resources & GP-finder.** Onboarding asks once whether the user has a regular doctor. If no, surface the finder on high-risk classifications and on relevant patterns. Finder draws on public directories (NPI Registry, state medical boards, telehealth networks) — no paid referrals. Free educational library available to all users. | O-1, O-5 |
| 12 | **MH-12** | **Internationalization.** Default markets: US + Canada. Settings → Region selector switches units (mg/dL ↔ mmol/L), reference-range sources (USPSTF, Canadian Task Force, NICE/ESC, RACGP, etc.), and GP-finder backend. Long-tail lab format support outside US/CA is best-effort in v1. | O-3 |
| 13 | **MH-13** | **Platforms.** Mobile (iOS + Android via React Native / Expo, with a native module for camera-OCR) and web (Next.js). Account and data identical across surfaces; shared design system. | O-2, O-3 |
| 14 | **MH-14** | **Health goals — basic.** Five goal classes (marker, pattern, behavioral, screening, intervention-adherence). Curated templates per domain. Goal-setting itself is free; multi-quarter goal history and deep coaching are premium. (See §8 for the framework.) | O-4 |

The rank ordering is the recommendation we cut from if we have to. Cutting from the bottom up: i18n (MH-12) becomes "US-only at launch, region selector in Phase 2" before we'd cut platforms (MH-13). We'd cut goals (MH-14) before we'd cut freemium gating (MH-10). MH-1 through MH-9 are non-negotiable.

### 6.2 High-want — fast follow

| Rank | ID | Requirement | Traces to |
|---|---|---|---|
| 1 | **HW-1** | **Lab connector integrations.** MyQuest API, Labcorp Patient, Apple Health, Google Health Connect — auto-pull instead of upload. | O-2, O-4 |
| 2 | **HW-2** | **Doctor-prep packet.** Auto-generated 1-page PDF before appointments: top 3 changes since last visit, top 3 questions to ask, current medications, family history. | O-1, O-4 |
| 3 | **HW-3** | **Intervention timeline.** Tag interventions (medication, supplement, diet change, exercise block) and visualize marker response in 8/12/26 weeks following. | O-4 |
| 4 | **HW-4** | **Reminders.** "You're due for a recheck of X" based on marker-recommended retest cadence. | O-4 |
| 5 | **HW-5** | **Composite scores.** Metabolic health, cardiovascular health, inflammation, liver, kidney. Not a single "biological age" number — too easy to over-interpret and triggers the §16 advisory-board precondition. | O-1 |
| 6 | **HW-6** | **AI Longevity Coach — chat.** Conversational surface for context-aware Q&A, goal coaching, doctor-visit prep. The proactive-nudges + doctor-visit-mode subset of coach behavior ships in v1 (see §10); the chat surface is HW. | O-1, O-4 |
| 7 | **HW-7** | **Cancer early-signal panel.** P1-6: established blood-based early-warning patterns + USPSTF age-appropriate screening alignment. Strictly framed as "patterns worth a clinician's eye." **Gating precondition:** clinical advisory board retained per §16. | O-1, O-5 |
| 8 | **HW-8** | **MCED ingestion.** Read-only ingestion of Galleri-class report PDFs. We do not run our own MCED inference. | O-1 |
| 9 | **HW-9** | **Signed shareable links.** Replaces PDF-only doctor-share with revocable, expiring, audited links. Default 7-day TTL. | O-1 |

### 6.3 Nice-to-have — design with these in mind

| ID | Requirement |
|---|---|
| **NTH-1** | Wearables / CGM integration (HRV, glucose variability, sleep). |
| **NTH-2** | Genomic input (MTHFR, ApoE, Lp(a) genetics, polygenic risk scores). |
| **NTH-3** | Microbiome / advanced lipidology / hormone panels. |
| **NTH-4** | Family / dependents view (manage labs for spouse, parent, children with explicit consent flows). |
| **NTH-5** | Clinician collaboration mode (invite a doctor to view + comment on a longitudinal view). |
| **NTH-6** | Long-tail international lab format support (UK NHS, EU systems, AU, etc.). |

### 6.4 Marker coverage spec

Independent of the above, MH-1 (LOINC normalization) requires coverage of the following ≥120 markers. This list is canonical and any new pattern detector or recommendation must reference markers from this set.

The longevity-panel core: **ApoB, Lp(a), hs-CRP, fasting insulin, HbA1c, OGTT, homocysteine, uric acid, GGT, ALT, AST, full lipid panel + particle count, AM cortisol, full thyroid panel including free T3 / free T4 / reverse T3, sex hormones, IGF-1, vitamin D, B12, ferritin, iron saturation, full CBC + differential, eGFR / cystatin C, urinalysis basics.** Beyond the core: see the per-domain markers in §7.

### 6.5 What we are deliberately not specifying

Per Cagan ("what versus how"), the following are engineering's call:

- The specific OCR/vision architecture (we say "≥90% accuracy"; engineering decides the model).
- The specific database engine, cache topology, encryption-at-rest implementation.
- The specific React Native build pipeline, OTA strategy, native-module integration.
- The specific PubMed sync mechanism for the editorial library (we say "versioned, editorially reviewed"; engineering decides the pipeline).

Where v0.2 §9 ("Build vs Buy") strayed into "how" (e.g., "Vision model fine-tuned per major lab template"), we have re-cast that as a *founder-locked decision* in §17.2 (D-3) rather than a requirement statement. The requirement is the accuracy target.

---

## 7. Health domains — detailed feature inventory

The PRD requires ≥120 markers (§6.4) and six pre-built patterns (MH-5). This section organizes those markers and patterns into product-shaped *domains* — what the user sees in navigation, what the coach can talk about, and what the goals framework attaches to. Each entry: scope, primary markers, key patterns, age emphasis, evidence anchors, intervention categories.

These domains overlap deliberately. ApoB lives in cardiovascular *and* shows up in metabolic patterns; ferritin lives in iron status *and* in inflammation patterns. The product surfaces each marker once in its primary domain and links cross-references in patterns.

### 7.1 Cardiovascular health

**Scope.** Atherosclerotic risk markers and trajectory. The dominant longevity domain by absolute mortality contribution.

**Primary markers.** ApoB (lead), Lp(a) (genetic — once unless on apheresis or PCSK9), full lipid panel (LDL-C, HDL-C, non-HDL-C, triglycerides, total), particle count where available (LDL-P, sdLDL), hs-CRP, homocysteine, NT-proBNP (>50 y.o.), troponin (only if clinically indicated), HbA1c (cardio-relevant via dysglycemia), uric acid.

**Patterns.** ASCVD-trajectory (ApoB↑ + Lp(a)↑ + hs-CRP↑ + non-HDL↑); residual-risk discordance (LDL-C "normal" but ApoB elevated); hypertriglyceridemic-waist proxy (triglycerides↑ + HDL↓ + waist↑).

**Age emphasis.** 18–29: baseline Lp(a) once, ApoB establishment. 30–49: ApoB trend + hs-CRP every 1–2 years. 50+: surface CAC-scan recommendation pathway when ApoB and Lp(a) elevated; NT-proBNP useful for occult heart failure screen.

**Evidence anchors.** AHA/ACC 2018+ cholesterol guidelines, ESC 2019/2021 dyslipidemia, USPSTF statin recs, Sniderman ApoB literature, Mendelian-randomization Lp(a) literature.

**Intervention categories.** Diet (Mediterranean, low-saturated-fat targeted at ApoB), exercise (zone 2 + zone 5), pharmacotherapy *as a discussion topic with a clinician* (statins, ezetimibe, PCSK9 — never a recommendation we make), supplements graded honestly (omega-3 EPA/DHA, bergamot, berberine).

### 7.2 Metabolic health

**Scope.** Dysglycemia, insulin resistance, MASLD/NAFLD trajectory.

**Primary markers.** Fasting glucose, HbA1c, fasting insulin, HOMA-IR (computed), C-peptide, OGTT, triglyceride/HDL ratio, ALT, AST, GGT, ALP, uric acid, ferritin (relevant in MASLD).

**Patterns.** Insulin-resistance / MASLD trajectory; pre-diabetes drift (HbA1c trending 5.5 → 5.7 across two years); hepatic-fat proxy (ALT > AST + GGT↑ + triglyceride/HDL↑).

**Evidence anchors.** ADA Standards of Care, AASLD MASLD guidance, EASL-EASD-EASO, Reaven and Petersen on insulin resistance.

**Intervention categories.** Time-restricted feeding (B), low-carb / Mediterranean (B), resistance training (A for HbA1c), aerobic exercise (A), GLP-1 / metformin *as a discussion topic*, supplements (berberine D, inositol C).

### 7.3 Inflammation & immune

**Scope.** Acute markers, chronic ("inflammaging") signal, autoimmunity when ordered.

**Primary markers.** hs-CRP, ESR, white blood cell count + differential, neutrophil/lymphocyte ratio (computed), platelet/lymphocyte ratio (computed), ferritin (acute-phase reactant), albumin (negative APR), fibrinogen, IL-6 (rare on consumer panels), ANA / RF / anti-CCP only if user supplies.

**Patterns.** Inflammaging (hs-CRP↑ + N/L ratio↑ + ferritin↑ + albumin↓); acute-on-chronic (hs-CRP spike on previously low baseline); anemia of chronic inflammation (ferritin↑ paradoxically + Hgb↓ + iron sat↓).

**Evidence anchors.** Franceschi inflammaging literature, JUPITER/CANTOS on CRP-guided risk, Cochrane reviews on omega-3.

**Intervention categories.** Sleep quality (A — CRP responds), exercise dosing (A), Mediterranean diet (A), omega-3 (B), curcumin (C), vitamin D (conditional). Always check that elevated ferritin isn't iron overload before recommending iron.

### 7.4 Liver

**Scope.** Hepatocellular and biliary trajectory; MASLD overlap with metabolic.

**Primary markers.** ALT, AST, GGT, ALP, total + direct bilirubin, albumin, total protein, INR, platelet count (low platelets in advanced fibrosis), AFP (oncologic — only if user supplies).

**Patterns.** MASLD trajectory (cross-listed with §7.2); cholestatic (ALP↑ + GGT↑ disproportionate to ALT/AST); hepatocellular (ALT↑ > AST↑); FIB-4 score (computed from age + ALT + AST + platelets) → "discuss with clinician" CTA at intermediate/high score.

**Evidence anchors.** AASLD, EASL, FIB-4 derivation literature.

**Intervention categories.** Weight reduction (A for MASLD), alcohol reduction (A), exercise (A), Mediterranean diet (B), discussion with PCP about hepatotoxic meds (always).

### 7.5 Kidney

**Scope.** Glomerular filtration trajectory and albuminuria; under-served in consumer apps.

**Primary markers.** Creatinine, eGFR (CKD-EPI 2021, race-free), cystatin C and eGFR-cystatin (more accurate longitudinally), BUN, BUN:creatinine ratio, urine albumin/creatinine ratio (UACR), urinalysis basics.

**Patterns.** Kidney trajectory (eGFR slope > 5 mL/min/1.73 m²/year decline); discordance flag (eGFR-creatinine vs eGFR-cystatin diverging suggests muscle-mass confounding); early diabetic nephropathy screen (UACR ≥ 30 mg/g + dysglycemia pattern).

**Evidence anchors.** KDIGO 2024 CKD guideline, NKF eGFR-2021 race-free equation.

**Intervention categories.** Blood-pressure management *as a discussion with clinician* (A), reduced ultra-processed food (B), sodium moderation (B), avoiding chronic NSAIDs (A), adequate hydration (B).

### 7.6 Thyroid & endocrine

**Scope.** Thyroid axis, cortisol, IGF-1, prolactin when ordered.

**Primary markers.** TSH, free T4, free T3, reverse T3, anti-TPO, anti-Tg, AM cortisol, IGF-1, prolactin, DHEA-S.

**Patterns.** Primary hypothyroidism / Hashimoto suggestion; subclinical hypothyroidism (TSH 4.5–10 with normal free T4); low-T3 pattern (often non-thyroidal — flag for clinician); adrenal-axis abnormalities (AM cortisol outside 6–18 µg/dL with morning sample timing confirmed).

**Age emphasis.** 60+: subclinical-hypothyroid criteria *loosen* (TSH up to 6 may be age-appropriate per geriatric literature) — and our optimal-range engine reflects this.

**Evidence anchors.** ATA / AACE thyroid guidelines, NICE thyroid disease guidance, Endocrine Society cortisol position statements.

### 7.7 Sex hormones — male

Surfaces only after self-reported male sex assigned at birth and ≥18.

**Primary markers.** Total testosterone (AM, fasting), free T (calculated or directly measured), SHBG, estradiol (sensitive assay), LH, FSH, PSA (≥40 y.o. with shared-decision framing).

**Patterns.** Hypogonadism trajectory; high-SHBG masking; PSA velocity (>0.75 ng/mL/year).

**Evidence anchors.** Endocrine Society, AUA PSA, USPSTF prostate cancer (Grade C, 55–69).

**Intervention categories.** Sleep (A), strength training (A), body-fat management (B), discussion with PCP/endo/uro (always for confirmed abnormalities). We never recommend TRT.

### 7.8 Sex hormones — female

Surfaces only after self-reported female sex assigned at birth.

**Primary markers.** Estradiol, progesterone, FSH, LH, prolactin, AMH, DHEA-S, testosterone (low-range, accurate assay).

**Patterns.** Perimenopausal transition (FSH variability + estradiol oscillation — framed *supportively*, not as decline); menopausal (sustained FSH↑ + estradiol↓); PCOS suggestion (elevated free T + LH:FSH ratio↑).

**Evidence anchors.** ACOG, Menopause Society, ESHRE PCOS Rotterdam, NIH Menopause guidance.

**Intervention categories.** Strength training (A for postmenopausal bone preservation), discussion with OB/GYN (always for abnormalities). HRT framed as a clinician conversation; we never recommend it.

**Trans / non-binary handling.** Sex hormones presented neutrally with the user's self-reported hormonal context and current HRT regimen. We do not auto-route based on legal sex; we route based on the hormone profile the user is in. **V1 hard requirement.**

### 7.9 Bone & musculoskeletal

**Scope.** Bone metabolism markers; DEXA results when supplied.

**Primary markers.** Calcium (corrected for albumin), phosphate, magnesium, vitamin D (25-OH), PTH, alkaline phosphatase (bone fraction when reported), CTX or P1NP, DEXA T-/Z-scores.

**Patterns.** Bone-turnover elevation (ALP-bone↑ + CTX↑ + low vitamin D); hypocalcemia / hypercalcemia red flags (any sustained excursion → high-tier classification).

**Evidence anchors.** USPSTF osteoporosis screening, Endocrine Society, ASBMR, NIH ODS vitamin D.

### 7.10 Hematology / cancer early-signal

**Scope.** CBC abnormalities, ESR persistence, calcium and ALP excursions, persistent thrombocytosis/thrombocytopenia. Strictly *not* a positive cancer prediction.

**Primary markers.** CBC + differential, MCV, MCH, MCHC, RDW, platelet count, ESR, calcium (corrected), ALP, LDH, total protein, albumin/globulin ratio. When supplied: CA-125, CA-19-9, CA-15-3, CEA, PSA (cross-listed §7.7), AFP (cross-listed §7.4).

**Patterns.** Iron-deficiency / occult-GI-bleed (Hgb↓ + MCV↓ + ferritin↓ ± platelets↑); persistent thrombocytosis (>450 × 10⁹/L for ≥2 measurements unexplained); calcium + ALP elevation; microcytic / normocytic / macrocytic anemia decision tree.

**Cancer-pattern framing.** All copy follows the §11 cancer-trajectory guardrails verbatim. "These markers form a pattern that, in the medical literature, is sometimes investigated for [GI workup / hematologic workup / hepatic workup]. This is not a diagnosis."

**Phasing.** Cancer-pattern surfaces (P1-6 / HW-7) are **gated on retaining the deferred clinical advisory board** per §16.

### 7.11 Nutritional & micronutrient status

**Primary markers.** Vitamin D 25-OH, B12, folate (serum + RBC), ferritin + iron sat + TIBC, magnesium (serum + RBC), zinc, copper (paired), homocysteine, MMA (when supplied for B12 confirmation), selenium, iodine.

**Patterns.** Functional B12 deficiency (B12 borderline + homocysteine↑ + MMA↑); iron deficiency without anemia (ferritin↓ + iron sat↓ with normal Hgb); vitamin D status with seasonal context.

**Evidence anchors.** NIH ODS fact sheets, Cochrane reviews.

**Intervention categories.** Food-first framing (A wherever possible), targeted supplementation when documented deficiency, drug-interaction caveats (e.g., vitamin K + warfarin).

### 7.12 Sleep, stress, recovery — placeholder (P2 wearables / CGM)

Today: only blood-derived stress signals (cortisol AM rhythm, hs-CRP elevations after poor-sleep periods, glucose variability proxy). Wearable + CGM integration is NTH-1.

This domain shell exists in v1 only so the coach can reference sleep and stress without dangling pointers; full feature ships post-v1.

---

## 8. Health goals framework

Five goal classes share one data model (target, baseline, deadline, measurement source, status) and render differently.

1. **Marker-level goal** — "Reduce ApoB to <70 by my next test." Single-marker chart with target band overlaid.
2. **Pattern-level goal** — "Resolve the insulin-resistance pattern." Multi-marker composite. Resolves only when all contributing markers are at or above pattern-exit thresholds.
3. **Behavioral goal** — "Get 150 minutes of zone-2 cardio per week." Self-reported; weekly target with streak.
4. **Screening goal** — "Schedule a colonoscopy by age 45." Calendar-based; resolves on user confirmation.
5. **Intervention-adherence goal** — "Take 2g EPA+DHA omega-3 daily for 12 weeks and re-measure triglycerides." Time-bounded protocol with re-measurement prompt.

### 8.1 Goal templates

Each domain in §7 ships with 4–6 curated templates. The user starts from a template, the coach personalizes it, the user approves before commit. Editorially reviewed under the same cadence as recommendations (§17.2 D-12).

### 8.2 Personalization & conflict resolution

- **Goal-marker conflict** (user picks 90 mg/dL ApoB target while we'd recommend 70): user's choice wins; recommended target shown as reference band.
- **Goal-evidence conflict** (target without strong evidence base): user keeps it; coach is honest about evidence.
- **Goal-pattern conflict** (raising ferritin while iron-overload pattern is active): confirmation dialog with citation; user can proceed.

### 8.3 Premium gating

Goal-setting itself is **free**. Multi-quarter goal history, completion analytics, and deep coach-led goal coaching (§10.3, §10.5) are **premium**.

---

## 9. Age-stratified product behavior

Onboarding, defaults, screening prompts, optimal ranges, and coach focus tilt by life stage. These bands are pragmatic; transitions are smooth, not stepwise. The product does not lock features by age — it tilts defaults.

| Band | Onboarding emphasis | Optimal posture | Coach focus |
|---|---|---|---|
| **18–29: Foundation** | "Build your baseline." | Optimal = optimal. We don't loosen ranges for being young. | Habits and infrastructure: sleep, strength training, alcohol pattern. |
| **30–39: Optimization** | "Small course corrections compound." | Tight optimal — Attia framing surfaces here. | Marker- and pattern-level goals. |
| **40–49: Vigilance** | "Highest-leverage decade for CV and cancer screening." | Tight optimal *and* "trajectory matters more than any single value." | Doctor-prep + intervention timelines. |
| **50–59: Inflection** | "Tighten what's working; stay alert to early-signal patterns." | Tight optimal *with* age-appropriate adjustments (geriatric TSH, ferritin, vitamin D). | Composite scores; cancer early-signal patterns surface (advisory-board gated). |
| **60–69: Quality** | "Healthspan, not just lifespan." | Geriatric adjustments dominate. Albumin↓ becomes a frailty signal. | Function-oriented behavioral goals; coordination with PCP. |
| **70+: Stewardship** | "Your data tells a long story now." | Geriatric throughout. | Coordination, simplification, doctor-prep. |

### 9.1 Cross-cutting handling

- **<18:** account creation blocked with redirect to age-appropriate clinical resources.
- **Pregnancy:** self-reported; pauses risk classifications with materially different reference ranges (CBC indices, thyroid, glucose, lipid). Surfaces "we don't have pregnancy-specific reference ranges yet — your OB does, talk to them."
- **Active cancer treatment:** self-reported; hides cancer early-signal patterns (irrelevant + distressing); coach switches to a supportive marker-focused mode (CBC during chemo, thyroid for radiation context). No treatment guidance.

---

## 10. AI Longevity Coach

Connective tissue. The coach reads complete user data, the goals from §8, and the age-stratified context from §9, and produces conversation, proactive nudges, and structured reviews. It is **not** an oracle, **not** a clinician, and **not** the source of safety-critical recommendations — those remain editorial (§12). It is the interface layer.

### 10.1 Scope

**Can:** explain markers, help set personalized goals, narrate progress against the user's actual data, propose evidence-graded interventions from the editorial library, surface relevant patterns, prompt screenings consistent with §9 / §7, prep for a doctor visit (top-3 changes, top-3 questions), translate clinician recommendations back into user data context after a visit, acknowledge uncertainty plainly.

**Cannot:** diagnose (banned phrasings include "you have…", "you probably have…", "the cause is…"); recommend prescription medications or dose changes; recommend supplements outside the editorial library; generate citations at runtime; override or downgrade a high-risk classification produced by the rule engine; reference content outside the user's data + the editorial library + general health literacy.

### 10.2 Modalities

- **Chat** (HW-6, Phase 2) — always-available conversation; persistent thread per topic; arrives with the surface's context loaded.
- **Proactive nudges** (v1) — event-triggered, not time-triggered. New test → "walk me through what changed." Pattern fired → "here's what this pattern is and what's known." Goal halfway → "here's where you are." Recommended retest cadence reached → "time to consider a recheck." Behavioral-goal streak broken → supportive, never shaming. Throttled at one nudge/day default.
- **Weekly brief (premium)** — short Monday summary: changes since last week, goals on track / off track, editorial-library updates relevant to user's markers.
- **Doctor-visit mode (premium, v1)** — pre-visit: builds the prep packet (HW-2) and rehearses questions. Post-visit: ingests notes the user types, translates clinician recommendations into marker context.

### 10.3 Context window

Each coach turn loads, in order: user profile (age, sex, hormonal context, declared conditions and medications, region, units, GP-status); marker history (LOINC-normalized); active patterns; active goals; logged interventions (HW-3); editorial-library snapshot; in-session conversation history. **Does not** load: raw PubMed at runtime, the open web, other users' data.

### 10.4 Personalization panel

User-editable: detail level (gist / full / max + always-cite), intervention preferences (no supplements / no fasting / exercise only / all options on table), tone (direct / encouraging / just facts), goal cadence (light-touch / active coaching / aggressive optimization). Every reply conditioned on these. Editable any time; coach picks up changes immediately.

### 10.5 Sample dialogue patterns

These are intent-shape examples; final copy passes the §12 voice rules.

- *New test ingested.* "Three things changed since your last test 14 months ago. ApoB up 12%, hs-CRP nudged from 0.8 to 1.4, fasting insulin down a point. Want to walk through them in priority order?"
- *Pattern fires.* "Three of your markers — fasting insulin, triglyceride/HDL ratio, and ALT — are trending the same direction together. Sometimes called early metabolic syndrome. None high-risk individually. Together a medium-priority signal. Here's what the evidence says about reversing this trend."
- *High-risk supportive CTA.* "Three of your CBC values together form a pattern that primary-care doctors investigate as a possible reason to order a colonoscopy or a closer look at GI bleeding. This is not a diagnosis. The pattern doesn't tell us anything about cancer specifically. You don't have a regular doctor on file; here's a finder, and here's what to bring."
- *Honest uncertainty.* "Resveratrol doesn't have an A- or B-grade evidence base for moving ApoB. There's observational signal for general CV outcomes; supplement-specific RCTs for lipids are mixed. If lowering ApoB is your goal, the evidence is much stronger for diet adjustments around saturated fat and soluble fiber."

### 10.6 Safety architecture — deterministic post-filter

Each model reply passes a post-filter before display. The filter is itself versioned and changelogged.

1. **No diagnosis.** Banned-phrase classifier; trip → reroute through templated "underlying classification + library text."
2. **No prescription.** No medication-specific dosing. Medications discussed only as "talk to your clinician."
3. **No off-library claims.** Factual claims about effect-size, mechanism, or evidence must attribute to a specific library entry. Unattributed → strip and rewrite from library.
4. **No high-risk override.** Coach reply must not de-escalate a high-risk classification.
5. **Voice rules.** §12 banned patterns (scare quotes, exclamation points in risk copy, doomscroll framing) → strip or redraft.
6. **No citation hallucination.** Citations inserted by post-filter from loaded library snapshot, not by the model.

### 10.7 Phasing

Per §17.2 D-13: **proactive nudges and doctor-visit mode ship in v1** (mostly editorial-library-driven, lower model-output surface area, safer). **Chat surface and weekly brief slip to Phase 2.** Cancer-pattern (HW-7) is gated on the clinical advisory board *regardless of which coach surface is live.*

---

## 11. Risk model — detailed spec

This is the heart of the product. Worth pulling out of the requirements list.

### 11.1 Inputs per marker

Value, units, date, lab vendor, assay (where available). User age, sex assigned at birth, optionally pregnancy and menopausal status (gates several reference ranges). Optionally: known conditions, current medications (these change interpretation — metformin lowers HbA1c; statins lower LDL).

### 11.2 Reference range layers (display all three)

1. **Lab "normal" range** (from the report itself).
2. **Population reference range** (NHANES-derived where available, age- and sex-stratified).
3. **Optimal range** (longevity/biohacking-informed: Attia frameworks for ApoB <60, fasting insulin <8, HbA1c <5.5; AHA/ADA targets where applicable; mainstream geriatric literature for ferritin, albumin, eGFR slopes in older adults).

### 11.3 Risk classification rule (per marker, age-adjusted)

| Tier | Definition |
|---|---|
| **Low** | Within optimal range AND stable or improving trajectory across last ≥2 results. |
| **Medium** | Outside optimal but inside lab-normal range; OR inside optimal but worsening trajectory ≥X% over ≥2 results; OR a single elevated value pending recheck. |
| **High** | Outside lab-normal range; OR sustained adverse trajectory across ≥3 results; OR the marker participates in a flagged multi-marker pattern (MH-5). |

Every classification carries an explanation, the rule that fired, and the citation(s) for the optimal range chosen.

### 11.4 Trajectory math

≥3 data points or a strong single-point deviation to call a "trajectory." Simple linear slope + 95% CI on the slope. CI crosses zero → label "trend not yet meaningful." For markers with high day-to-day biological variability (cortisol, ferritin in inflammation, vitamin D seasonally), require larger effect or longer span before classifying as adverse trend.

### 11.5 Cancer trajectory framing — language and guardrails matter

- We will **never** display "you may have cancer" or assign a probability of cancer.
- We **will** display: "These markers form a pattern that, in the medical literature, is sometimes investigated for [GI workup / hematologic workup / hepatic workup]. This is not a diagnosis. Here's what's known, and here's how to talk it through with a clinician."
- Sources: USPSTF, Canadian Task Force on Preventive Health Care, ACS Multi-Cancer Detection Test guidance, peer-reviewed primary-care diagnostic literature.
- Galleri/MCED is integrated only as ingestion of the user's own report — never as our prediction.

### 11.6 No risk cutoff — show the user what we see

Per founder decision (D-10), there is **no threshold** at which the app stops showing risk classifications and only says "see a doctor." If we detect it, we show it — with rationale, optimal-range source, and literature behind any pattern. High-risk classifications include a supportive next-step CTA (resources, GP-finder when applicable). They never replace, override, or pre-empt the user's classification view.

The voice on a high-risk finding: clear about what was detected, calm about what it means, specific about what to do next, explicit about uncertainty.

---

## 12. Recommendation engine — sourcing rules and voice

### 12.1 Sourcing rules

Every recommendation must satisfy *all* of:

1. **Source-grade tag (A/B/C/D)** as defined in MH-6.
2. **Primary citation** — at least one PubMed / DOI / society-guideline link.
3. **Mechanism and effect-size** — short paragraph: what does this do, how much does it move the marker (with CI if known).
4. **Caveats** — known counter-indications, populations where it doesn't apply, drug interactions.
5. **Editorially reviewed** — every recommendation reviewed by the internal medical reviewer before shipping. We do *not* let an LLM generate live recommendations from raw PubMed at runtime.

Acceptable source classes: PubMed-indexed peer-reviewed journals (preference for Nature, NEJM, Lancet, JAMA, BMJ, Cochrane), USPSTF, AHA, ADA, KDIGO, ESC, AASLD, NIH/ODS supplement fact sheets. Influencer content (Attia, Huberman, Patrick, Bryan Johnson) may inform the *shortlist of what to investigate* but cannot be the sole citation behind a recommendation.

### 12.2 Writing guardrails — empowering, personalized, supportive

Every piece of user-facing copy passes a four-point voice check before it ships:

1. **Empowering.** Frame information as something the user can act on. Lead with what's possible. "Here's what these markers are telling us, and here's what we know moves them" beats "Your liver enzymes are abnormal."
2. **Personalized.** Reference the user's own data (age, sex, prior trend, intervention they've logged). Generic copy is a tone failure.
3. **Supportive.** Never alarmist, never paternalistic, never falsely reassuring. On a high-risk finding: *I see this, here's what it means, here's what's known, you've got this — and here's how to bring it to a doctor.*
4. **Honest about evidence.** When the science is strong, say so. When it's mixed, say so. Never pretend a D-grade recommendation is an A-grade one because it sounds more confident.

**Banned patterns.** Scare quotes around medical terms; exclamation points in risk copy; doomscroll framing; "you're at war with your body" metaphors; anything that pathologizes normal aging; anything that implies the user has failed.

---

## 13. Release criteria

Cagan flags this section as the one most often hand-waved. Each criterion has a measurable threshold. The product does not ship if any criterion is unmet.

| Criterion | Threshold | Why this number |
|---|---|---|
| **Performance** | First trend chart renders in <2s p95 on a 4G connection with 5 ingested reports. Marker-detail view <1s p95. Camera-OCR end-to-end <4s on mid-tier Android. | Maya's first session must feel responsive. >2s on a chart kills the "wow." |
| **Scalability** | Sustains 10k DAU at launch, 100k DAU by month 6, with linear cost scaling. Editorial library serves at >99.95% read availability. | Conservative for a wellness consumer product launch. |
| **Reliability** | 99.9% monthly availability for the read path (charts, classifications, recommendations). 99.5% for the write path (ingestion). RPO ≤ 1 hour, RTO ≤ 4 hours. Zero incidents resulting in PHI loss. | Read failure = user can't see their data. Loss of write = retry. PHI loss = breach. |
| **Usability** | First-trend completion in ≤5 minutes for ≥80% of new users in moderated usability tests. Zero major usability issues in pre-launch testing (Cagan-style severity rubric). | Maya gives up if the first session feels harder than "I should have done this in Notion." |
| **Supportability** | Every error state surfaces a user-actionable next step (manual-correction UI, retry, contact). Internal runbook covers the top 20 expected support cases at launch. Mean time to user-facing acknowledgement on inbound issues <12h. | Health is high-anxiety; ambiguous errors are tone failures. |
| **Localizability** | All user-facing copy externalized; unit toggle (mg/dL ↔ mmol/L) tested across all marker views; region-switching reference ranges tested for US, CA, UK, AU. No date/number-format leaks at v1 launch in any of those four regions. | The Settings → Region path must not be a façade. |
| **Privacy/Security** | All PHI encrypted at rest with per-user envelope keys; pen-test pre-launch with no high-severity findings open at ship; documented breach response. SOC 2 Type 1 in flight at launch, Type 2 within 12 months. | Table stakes for the data class. |
| **Accessibility** | WCAG 2.2 AA on web; iOS/Android accessibility audits pass. VoiceOver / TalkBack on all primary surfaces. | David's mother is the test case. If she can't use the app on a phone she's been handed, the product hasn't shipped. |

---

## 14. Data sources — build vs. buy

| Need | Approach | Why |
|---|---|---|
| LOINC code dictionary | NLM's LOINC release directly. | Free, authoritative, no alternative. |
| Lab parsing (PDF/OCR) | **Build in-house** (founder decision D-3). Manual-correction fallback UI is a hard MH. Direct lab-network ingestion (Quest Quanum FHIR, Health Gorilla, Particle) is a complementary HW path. | Long-tail accuracy is the product. We absorb a longer build to control it. |
| Lab connectivity | Quest Quanum FHIR API (Observation resources, LOINC-coded). Labcorp via Health Gorilla / Particle. Apple Health and Google Health Connect for blood-glucose, blood-pressure, etc. | Standard wedge. |
| Reference ranges | NHANES public data + curated literature; manually maintained internal table. | No commercial alternative we trust. |
| Recommendation evidence | PubMed E-utilities for *discovery*; editorial team curates final library. Nature/NEJM/Lancet/JAMA via DOI links — no full-text scraping. | Hallucinated citations are the failure mode in this category. |
| MCED integration | Read-only ingestion of Galleri-style report PDFs (HW). | We do not run our own MCED inference. |

---

## 15. Success metrics

### Leading (weeks)

- **D1 activation:** % of new users who successfully ingest at least one report → target 70% (O-2).
- **First-trend time:** median minutes signup → first chart → target ≤5 (O-2).
- **Extraction accuracy:** ≥90% on Quest/Labcorp, ≥75% on long-tail (O-3).
- **Citation click-through:** ≥30% of users click ≥1 source link in first session (O-1, O-5 — proxy for "users trust and verify").

### Lagging (months)

- **30-day retention** of first-upload users → target 40% (O-4).
- **90-day re-upload rate** → target 55%.
- **Doctor-prep packet generation rate** → target 25% of MAU.
- **NPS** → target ≥40 by end of v1.
- **Net subscription retention** at month 6 → target ≥85%.

### Trust / safety counters (must stay low)

- Reports of inaccurate marker extraction.
- Reports of misleading risk classification.
- Recommendations later removed for evidence-quality issues (target <2%).

---

## 16. Compliance, privacy, and liability

- **Wellness positioning** under FDA's Jan 2026 General Wellness guidance — avoid disease-specific diagnostic and treatment claims.
- **HIPAA:** if we ever sign a BAA with a covered entity (e.g., a clinician integration), we become a Business Associate. Until then we are a consumer wellness app holding sensitive personal health information — engineer to HIPAA-equivalent standards regardless (encryption, access logs, breach response).
- **State law:** California CMIA, Washington My Health My Data Act, Texas/Connecticut/Colorado consumer health privacy regimes — all apply. Treat health data as the highest-sensitivity bucket regardless of HIPAA status. Canadian PIPEDA and provincial equivalents (PHIPA, PIPA) apply for our second launch market.
- **Clinical advisory board: deferred at v1 launch.** We will not retain a formal clinical advisory board at v1. Compensating controls:
  - Every shipped risk rule, pattern detector, and recommendation cites primary sources.
  - Editorial review by the internal product/medical-writer team, documented in a versioned content log.
  - Any rule that *changes* a user's risk classification ships behind a feature flag and a public changelog entry.
  - We commit to **retaining the board before** shipping (a) any feature that produces a numeric "biological age" or composite mortality score, (b) cancer early-signal patterns (HW-7 / P1-6), or (c) any clinician-facing surface (NTH-5).
- **No advertising on health data, ever.** Permanent.
- **Liability framing:** EULA explicit — wellness/educational, not medical advice. Doesn't excuse us from negligence in the model; it's table stakes.

---

## 17. Assumptions, decisions, and open questions

### 17.1 Assumptions to validate (Cagan Step 6)

These are the loudest implicit assumptions in the prior drafts. Each is something we believe; each could be wrong; each has a concrete validation plan tied to Phase 0.

| # | Assumption | If wrong, then… | Validation |
|---|---|---|---|
| **A-1** | In-house OCR + per-template fine-tuning can hit ≥90% accuracy on Quest/Labcorp within Phase 0 budget. | Re-evaluate buying parsing from a vendor or pivoting to direct FHIR ingestion at v1. | Phase 0 spike: 200 real Quest + 200 real Labcorp PDFs, hand-labeled, evaluation harness, 6-week deadline. |
| **A-2** | Maya's "first 5 minutes" experience drives 30-day retention (the activation metric is well-chosen). | Activation work shifts to a different surface — possibly the first pattern firing, or the doctor-prep packet. | Moderated usability tests with 12 Mayas before v1; cohort analysis at month 1 of beta. |
| **A-3** | Free tier compares-two-tests is enough to drive paid conversion at >5%. | Pricing model needs reworking — possibly different free-tier scope or a different price point. | Beta cohort tracked through 90 days; conversion rate measured. |
| **A-4** | Quest Quanum FHIR + Labcorp Patient APIs are stable and licensable on commercial terms compatible with $50/yr economics. | Connectors slip from HW-1 to Phase 3+; we lean harder on PDF/photo for v1 and beyond. | Procurement starts week 1 of Phase 0; legal review of BAAs starts in parallel. |
| **A-5** | Editorial-library + post-filter is sufficient to ship the AI coach safely without an in-house clinician on staff. | Coach chat ships behind a "research preview" flag, or slips entirely; advisory-board precondition extended to coach chat. | Quarterly external red-team; eval-suite pass rate >95% before chat ships. |
| **A-6** | The trans/non-binary hormone-routing requirement (§7.7/7.8) is buildable in v1 without lengthening the schedule >2 weeks. | Hormone-routing flag becomes a Phase 2 hard requirement; v1 ships with sex-assigned-at-birth defaults plus a manual range override. | Phase 0 design + legal review spike. |
| **A-7** | Pediatric / pregnancy / active-cancer detection via self-report is sufficient (lab-inference is not necessary). | We add lab-inference (e.g., βHCG → pregnancy) — design problem rather than a regulatory problem. | Beta-period audit of how often users self-report these states correctly. |

### 17.2 Resolved decisions

| # | Decision | Source |
|---|----------|--------|
| **D-1** | Pricing: free tier compares the two most recent tests forever; **$50/yr** unlocks full history, trends, intervention timelines, doctor-prep packets, reminders, and connectors. | v0.2 |
| **D-2** | Free tier scope: stores and compares only the two most recent tests; older results archived (not deleted) and reappear on upgrade. | v0.2 |
| **D-3** | Lab parsing: in-house OCR + per-template fine-tuning. Manual-correction UI is hard MH. | v0.2 |
| **D-4** | Clinical advisory board deferred at v1. Required before HW-5 biological-age, HW-7 cancer early-signal, or NTH-5 clinician-facing features. | v0.2 |
| **D-5** | Markets: US + Canada at launch; all other regions selectable in Settings. International long-tail lab format support is best-effort in v1. | v0.2 |
| **D-6** | Platforms: mobile (iOS + Android) **and** web ship in v1. | v0.2 |
| **D-7** | Brand name: **InsightBlood**. (Clearance ratified — see D-14.) | v0.2 |
| **D-8** | Voice & tone: empowering, personalized, supportive. Codified in §12 voice rules. | v0.2 |
| **D-9** | Doctor / GP referral: educational resources for all; GP-finder surfaces only if user has indicated they don't have a regular doctor. | v0.2 |
| **D-10** | Risk-classification cutoff: none. Every classification shown with rationale and citations. High-risk findings carry a supportive next-step CTA, never a replacement for the classification view. | v0.2 |
| **D-11** | Mobile stack: **React Native (Expo) for iOS + Android**, with a native module isolated to the camera-OCR pipeline. Web is a separate Next.js codebase sharing the design system. | v0.3 |
| **D-12** | Free-tier risk classifications + recommendations: **shown in full**. Wellness-positioning quarterly audit added. | v0.3 |
| **D-13** | Doctor sharing: **PDF-only at v1**. Signed expiring revocable links in Phase 2 (HW-9). | v0.3 |
| **D-14** | Pricing: **$50/yr globally** (USD-equivalent in local currency); revisit at month 6. | v0.3 |
| **D-15** | Editorial cadence: quarterly review of every shipped recommendation + 12-month rolling sweep of optimal-range citations + out-of-band reviews when major society guidelines update. Staffed by 0.5 FTE clinical content lead + 0.5 FTE medical writer. | v0.3 |
| **D-16** | AI coach phasing: proactive nudges + doctor-visit mode in v1; chat surface + weekly brief in Phase 2. | v0.3 |
| **D-17** | Trans/non-binary hormone routing is a v1 hard requirement (§7.7, §7.8). | v0.3 |

### 17.3 Open questions

| # | Question | Owner |
|---|----------|-------|
| **OQ-1** | Trademark/domain clearance for **InsightBlood** finalized. Backup name (Bloodline / Bloodwise) cleared in parallel? | Legal / Marketing |
| **OQ-2** | Pediatric / pregnancy / active-cancer detection paths: explicit user self-report only (recommended) or lab inference (e.g., βHCG → pregnancy)? | Product / Legal |
| **OQ-3** | Coach personalization-panel data model: separate "Coach Preferences" entity (recommended) or inside profile? | Engineering |
| **OQ-4** | Expose the post-filter trip log to users ("here's a thing the coach was about to say but didn't")? Recommend no for v1. | Product |
| **OQ-5** | Confirm staffing for 0.5 FTE clinical content lead + 0.5 FTE medical writer (D-15). | People |
| **OQ-6** | Engineering reserve allocation: at what release count do we start paying it? (Recommend: from v1 + 1 onward; v1 is the foundation, taxes start with the second release.) | Engineering |

---

## 18. Prototype and testing plan

Cagan Step 5. Three forms of testing during the requirements stage, before implementation locks in.

### 18.1 Feasibility testing (Phase 0, weeks 0–6)

- **OCR spike.** 200 Quest + 200 Labcorp + 50 Epic/Cerner + 50 Boston Heart PDFs, hand-labeled. Iterate on extraction architecture against ≥90% / ≥75% targets. Hard-stop at week 6: if not on track, escalate to founder for build-vs-buy reconsideration.
- **Camera-OCR latency on mid-tier Android.** End-to-end <4s on a representative device population. If Expo can't hit it, the React Native decision (D-11) is re-examined.
- **Quest Quanum FHIR + Health Gorilla licensing.** Non-binding terms by week 4; legal review of BAAs starts in parallel.

### 18.2 Usability testing (continuous from Phase 0 through launch)

- **Round 1, week 4:** paper/Figma prototype with 8 Mayas, 4 Davids, 2 Patricias. Focus: first-five-minutes flow, ingestion, first chart, risk-classification copy.
- **Round 2, week 12:** functional iOS + web prototype with 12 + 6 + 4 of each persona. Focus: pattern detection copy, doctor-prep packet, goals.
- **Round 3, week 20:** pre-beta build with 20 users in a closed beta, mostly Mayas. Focus: 30-day return behavior, support volume, copy edge cases.

Cagan rule honored: the product manager and designer attend most or all sessions. We pay attention to what people *do*, not what they say.

### 18.3 Concept testing

Combined with usability rounds 2 and 3. Specifically tests the value proposition: would you pay $50/yr for full history? Would you recommend this to a friend with a family cancer history? What would have to be true for you to delete this app?

### 18.4 Clinical / safety testing

Distinct from usability. Pre-launch, every shipped pattern detector and risk rule is reviewed against test cases drawn from real-but-anonymized lab data. Before HW-7 cancer-early-signal ships, the (then-retained) clinical advisory board reviews the full pattern set.

---

## 19. Schedule and phasing

Cagan: a target *window* with motivation, not a date.

### 19.1 Target window — and why

**v1 launch target: late Q4 2026 to early Q1 2027** (24–28 weeks after Phase 0 starts).

Why this window: (a) Galleri PMA submission expected H1 2026; FDA outcome reshapes how we frame MCED features and we want our wellness positioning to land before that ripple. (b) App-store health-category review adds 1–2 review cycles; a Q4/Q1 launch leaves runway for that. (c) US tax-season visibility for the $50/yr SKU starts Q1; launching into that window pays off the marketing motion. We are not chasing a calendar date — we are chasing a window where the regulatory and market context is most favorable.

### 19.2 Phasing

- **Phase 0 — Discovery (weeks 0–6).** Trademark/domain (OQ-1), legal/regulatory memo (US + Canada), design sprint defining the InsightBlood visual + voice system, in-house OCR architecture spike (A-1) against Quest/Labcorp templates, content-library v0 (top 60 markers + their evidence-graded recommendations), AI coach safety architecture design + eval-suite scaffolding.
- **Phase 1 — MVP (weeks 6–24).** MH-1 through MH-14 across mobile (iOS + Android) and web in parallel. US + Canada with Settings-based international fallback. Free + $50/yr both at launch — Stripe-backed billing, reversible archive on downgrade. Coach proactive nudges + doctor-visit mode (D-16). Goals framework (§8). Age-stratified onboarding tilts (§9).
- **Phase 2 — Connected ingestion (weeks 24–36).** HW-1 (MyQuest, Labcorp Patient, Apple Health, Google Health Connect), HW-3 intervention timeline, HW-2 doctor-prep packet maturity, HW-4 reminders, HW-9 signed shareable links, HW-6 coach chat + weekly brief, regional-pricing review trigger.
- **Phase 3 — Pattern depth (weeks 36–50).** HW-5 composites, HW-7 cancer early-signal, HW-8 MCED ingestion. **Before HW-7**, retain the deferred clinical advisory board (§16).
- **Phase 4 — Expansion (post-v1).** NTH list (wearables, genomics, family/dependents, full international long-tail, clinician collaboration mode).

### 19.3 Engineering reserve ("Pay your taxes")

Per Cagan: **15% of every release post-v1** is allocated to systems work — refactoring, scalability, security, performance, observability — with no product-manager review required unless the work has a customer-visible surface. For v1 itself, the reserve is folded into the MH scope: we are not refactoring something that doesn't exist yet.

### 19.4 Hard external dependencies

- Galleri PMA submission expected H1 2026; FDA outcome materially shapes how we frame MCED features.
- FDA wellness/CDS guidance is fluid — language audit before each major release (D-12).
- Lab partner API contracts (Quest Quanum, Health Gorilla) — start procurement in week 1 of Phase 0; legal review of BAAs adds 6–12 weeks each.
- App Store / Play Store health-category review — extra scrutiny for blood-result apps; budget 1–2 review cycles before launch.

---

## Appendix A — Sources informing this PRD

**Competitor / market context**
- [InsideTracker vs Function Health (2026 comparison)](https://healnourishgrow.com/insidetracker-vs-function-health/)
- [SiPhox Health vs InsideTracker — Nucleus](https://mynucleus.com/blog/siphox-health-vs-insidetracker)
- [13+ Best Blood Biomarker Testing Services 2026 — Outliyr](https://outliyr.com/best-blood-biomarker-testing-services)

**Optimal ranges and longevity framing**
- [Peter Attia's Outlive lab panel — Empirical Health](https://www.empirical.health/blog/peter-attia-outlive-labs/)
- [Peter Attia AMA #14: what labs can and cannot tell us](https://peterattiamd.com/ama14/)
- [Peter Attia blood tests — Nucleus](https://mynucleus.com/blog/peter-attia-recommended-blood-tests)

**Cancer early detection**
- [GRAIL PATHFINDER 2 results (multi-cancer detection)](https://grail.com/press-releases/grail-pathfinder-2-results-show-galleri-multi-cancer-early-detection-blood-test-increased-cancer-detection-more-than-seven-fold-when-added-to-uspstf-a-and-b-recommended-screenings/)
- [Emerging Multi-Cancer Early Detection Technologies — NCBI](https://www.ncbi.nlm.nih.gov/books/NBK598992/)
- [Multi-Cancer Detection Tests — American Cancer Society](https://www.cancer.org/cancer/screening/multi-cancer-early-detection-tests.html)

**Aging / inflammaging biomarker science**
- [Inflammageing: chronic inflammation in ageing, cardiovascular disease, and frailty — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC6146930/)
- [Biomarkers of Aging and Relevant Evaluation Techniques — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11081160/)
- [Ranking Biomarkers of Aging by Citation Profiling — Frontiers](https://www.frontiersin.org/journals/genetics/articles/10.3389/fgene.2021.686320/full)

**Data sources / APIs**
- [NCBI E-utilities introduction](https://www.ncbi.nlm.nih.gov/books/NBK25497/)
- [NCBI Developer APIs](https://www.ncbi.nlm.nih.gov/home/develop/api/)
- [Quest Quanum EHR FHIR API reference](https://www.questdiagnostics.com/content/dam/corporate/restricted/documents/qps_qecs/Quanum_EHR_FHIR_API_Nov22.pdf)
- [Health Gorilla diagnostic network](https://developer.healthgorilla.com/docs/diagnostic-network)

**Regulatory**
- [FDA Software as a Medical Device (SaMD) overview](https://www.fda.gov/medical-devices/digital-health-center-excellence/software-medical-device-samd)
- [Key Updates in FDA's 2026 General Wellness and CDS Software Guidance — Faegre Drinker](https://www.faegredrinker.com/en/insights/publications/2026/1/key-updates-in-fdas-2026-general-wellness-and-clinical-decision-support-software-guidance)
- [FDA 2026 Guidance on General Wellness Devices — Kendall PC](https://kendallpc.com/fdas-2026-guidance-on-general-wellness-devices-policy-for-low-risk-devices-key-compliance-and-regulatory-insights-for-digital-health-companies/)

**PRD methodology**
- Cagan, Martin. *How To Write a Good PRD.* Silicon Valley Product Group, 2005. (Structural and discipline source for v0.4.)

---

## Appendix B — Changelog

**v0.2 → v0.3.** Six open questions resolved (D-11 through D-15 of the v0.4 decisions table). Twelve health domains spec'd in detail. Goals framework added. Six-band age-stratified product behavior added. AI Longevity Coach specified with bounded scope, four modalities, deterministic post-filter, premium gating, and phasing recommendation (chat slips to Phase 2, nudges and doctor-visit mode ship in v1). Six new open questions surfaced.

**v0.3 → v0.4.** Restructure under Cagan's four-area frame (purpose / features / release criteria / schedule). Added:

- **One-sentence value proposition** at the top (elevator-pitch test).
- **Named personas** (Maya, David, Patricia) replacing demographic categories.
- **End-to-end scenarios** §5.
- **Rank ordering within each priority band** §6.1 / §6.2.
- **Requirements-to-objective traceability** in the §6 tables.
- **Distinction between "what" and "how"** §6.5 — what previously read as how-statements (vision-model architecture, etc.) is now founder-locked decisions in §17.2 rather than requirement statements.
- **Consolidated release-criteria section** §13 with measurable thresholds (performance, scalability, reliability, usability, supportability, localizability, privacy/security, accessibility).
- **Assumptions to validate** §17.1 (Cagan Step 6 — "don't specify a candle"). Seven enumerated assumptions with validation plans.
- **Prototype and testing plan** §18 (Cagan Step 5 — feasibility, usability, concept, clinical/safety).
- **Engineering reserve** §19.3 (Cagan "Pay your taxes" — 15% post-v1).
- **Schedule with target window + motivation** §19.1 (rather than week-numbered phases alone).

Six new open questions from v0.3 were absorbed: OQ-G (coach phasing) → resolved as D-16; OQ-H (staffing) → re-listed as OQ-5; OQ-I (trans/NB hormone routing) → resolved as D-17; OQ-J (pediatric/pregnancy/cancer detection) → re-listed as OQ-2; OQ-K (coach panel data model) → re-listed as OQ-3; OQ-L (post-filter trip log) → re-listed as OQ-4. New: OQ-1 (trademark clearance status), OQ-6 (engineering reserve start point).

What did *not* change v0.3 → v0.4: the §11 risk model, the §12 voice rules, the §14 build-vs-buy table, the §16 compliance posture, the §10 coach safety architecture. Those were already in the form Cagan would call "what," not "how," and required no restructuring.
