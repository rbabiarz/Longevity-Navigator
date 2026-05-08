import { Link } from "wouter";
import { BookOpen, Shield, CheckCircle, ExternalLink, ArrowRight, RefreshCw, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const evidenceGrades = [
  {
    grade: "A",
    label: "Strong evidence",
    color: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/40 dark:text-green-400 dark:border-green-700",
    desc: "Consistent, high-quality evidence from multiple well-designed randomized controlled trials or strong systematic reviews / meta-analyses.",
    example: "Aerobic exercise reduces HbA1c (A) — Cochrane meta-analysis of 14 RCTs, pooled effect −0.67%",
  },
  {
    grade: "B",
    label: "Moderate evidence",
    color: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-700",
    desc: "Evidence from well-designed studies but limited by number, consistency, or study design. May include strong observational data.",
    example: "Omega-3 EPA/DHA lowers triglycerides (B) — multiple RCTs but effect size varies by dose and baseline",
  },
  {
    grade: "C",
    label: "Limited evidence",
    color: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-700",
    desc: "Few or methodologically weaker studies. Mechanistically plausible but not strongly demonstrated in humans at scale.",
    example: "Berberine for HbA1c (C) — mechanistic plausibility, small RCTs, limited head-to-head vs. metformin",
  },
  {
    grade: "D",
    label: "Expert opinion / consensus",
    color: "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-900/40 dark:text-gray-400 dark:border-gray-700",
    desc: "Clinical practice guidelines or expert consensus in the absence of strong RCT evidence. Still clinically meaningful.",
    example: "Recheck ferritin in 8–12 weeks after iron supplementation (D) — guideline-based, not formally RCT-validated",
  },
];

const sources = [
  {
    name: "PubMed E-utilities",
    type: "Primary research",
    desc: "Access to 36+ million biomedical citations. Source of primary evidence for all marker classifications.",
    url: "https://pubmed.ncbi.nlm.nih.gov",
    citations: ["Sniderman AD et al. (2019) JAMA Cardiology", "Ballantyne CM et al. (2022) JACC"],
  },
  {
    name: "New England Journal of Medicine",
    type: "High-impact journals",
    desc: "Landmark trials including JUPITER (rosuvastatin + CRP), ACCORD (intensive glucose control), and major CV outcome studies.",
    url: "#",
    citations: ["JUPITER Trial — Ridker PM et al. (2008)", "ORIGIN Trial — Gerstein HC et al. (2012)"],
  },
  {
    name: "JAMA & JAMA Network",
    type: "High-impact journals",
    desc: "Clinical practice guidelines, systematic reviews, and outcome data across metabolic, cardiovascular, and endocrine domains.",
    url: "#",
    citations: ["Sniderman AD et al. (2019) ApoB vs LDL-C", "CANTOS — Ridker PM et al. (2017)"],
  },
  {
    name: "The Lancet",
    type: "High-impact journals",
    desc: "Major epidemiological studies and global health data on cardiometabolic risk, cancer screening, and chronic disease trajectories.",
    url: "#",
    citations: ["GBD Collaborators (2019) cardiovascular disease", "Emerging Risk Factors Collaboration (2021)"],
  },
  {
    name: "Cochrane Reviews",
    type: "Systematic reviews",
    desc: "Gold-standard systematic reviews and meta-analyses for intervention recommendations. Primary source for evidence-grade A assignments.",
    url: "#",
    citations: ["Hayashino Y et al. (2012) exercise + HbA1c", "Hooper L et al. (2020) omega-3 + triglycerides"],
  },
  {
    name: "AHA / ACC Guidelines",
    type: "Clinical guidelines",
    desc: "American Heart Association / American College of Cardiology cholesterol, statin, and cardiovascular risk guidelines (2018+).",
    url: "#",
    citations: ["2018 AHA/ACC Cholesterol Guidelines", "2019 ESC/EAS Dyslipidemia Guidelines"],
  },
  {
    name: "ADA Standards of Care",
    type: "Clinical guidelines",
    desc: "American Diabetes Association annual Standards of Care — HbA1c targets, insulin resistance criteria, MASLD screening.",
    url: "#",
    citations: ["ADA SoC 2025 — Section 10, Cardiovascular Disease and Risk Management"],
  },
  {
    name: "KDIGO 2024",
    type: "Clinical guidelines",
    desc: "Kidney Disease Improving Global Outcomes — eGFR equations, CKD classification, and trajectory definitions.",
    url: "#",
    citations: ["KDIGO CKD Guidelines 2024 — eGFR-CKD-EPI 2021 (race-free)"],
  },
  {
    name: "USPSTF",
    type: "Preventive care guidelines",
    desc: "U.S. Preventive Services Task Force recommendations for screening cadence, statin counseling, and cancer surveillance.",
    url: "#",
    citations: ["USPSTF Statin Recommendation (2022)", "USPSTF Colorectal Cancer Screening (2021)"],
  },
  {
    name: "Endocrine Society / ATA / AACE",
    type: "Specialty guidelines",
    desc: "Thyroid, sex hormone, adrenal axis, and bone metabolism guidelines including age-adjusted reference ranges.",
    url: "#",
    citations: ["Endocrine Society Testosterone Guidelines (2018)", "ATA Hypothyroidism Guidelines (2014)"],
  },
  {
    name: "NIH Office of Dietary Supplements",
    type: "Nutritional evidence",
    desc: "Fact sheets with evidence summaries for vitamin D, B12, iron, magnesium, zinc, and omega-3 at population level.",
    url: "#",
    citations: ["NIH ODS Vitamin D Fact Sheet (2023)", "NIH ODS Iron Fact Sheet (2023)"],
  },
  {
    name: "Attia / Dayspring / Sniderman",
    type: "Longevity framework",
    desc: "Foundational ApoB-first and lipid-particle-count framework for cardiovascular longevity risk, extending beyond LDL-C.",
    url: "#",
    citations: ["Attia P. — Outlive (2023), Chapter 7", "Sniderman AD — ApoB as the definitive causal risk factor"],
  },
];

const classificationLogic = [
  {
    step: "1",
    title: "Marker extraction and LOINC normalization",
    desc: "Every parsed value is mapped to its LOINC code and units harmonized (mg/dL ↔ mmol/L, etc.) so values from Quest, Labcorp, and Boston Heart are directly comparable.",
  },
  {
    step: "2",
    title: "Age- and sex-adjusted range lookup",
    desc: "The internal range table selects the appropriate reference for your age band (18–29, 30–39, 40–49, 50–59, 60–69, 70+), sex (with trans/non-binary handling), and declared conditions. Geriatric adjustments apply at 60+ for TSH, ferritin, albumin, and vitamin D.",
  },
  {
    step: "3",
    title: "Rule-based three-tier classification",
    desc: "A deterministic rule engine fires the Low / Medium / High tier based on where your value falls relative to the optimal band and the clinical-significance threshold. The same rule fires every time — no runtime LLM inference.",
  },
  {
    step: "4",
    title: "Rationale generation from editorial templates",
    desc: "Each tier maps to an editorially reviewed rationale template. The template is populated with your actual value, the optimal threshold, and the primary citation. Nothing is generated on the fly.",
  },
  {
    step: "5",
    title: "Pattern detection (multi-marker)",
    desc: "After all single-marker classifications, the pattern engine evaluates whether your marker set crosses the thresholds that define a pre-built pattern. All six patterns are fully deterministic — no probabilistic inference.",
  },
  {
    step: "6",
    title: "Disclaimer surfacing",
    desc: "Every classification and every recommendation surfaces the mandatory disclaimer: 'Not a medical device. Not diagnostic. Not a substitute for a clinician.' This is never optional.",
  },
];

export default function Science() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-xs font-medium tracking-wide">Science & Trust</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Show what we see. Cite the science. Be honest when we're uncertain.
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            These are the principles behind every classification, every recommendation, and every citation in InsightBlood. This page is how we hold ourselves accountable.
          </p>
        </div>
      </section>

      {/* Product principles */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-3">Product principles</h2>
          <p className="text-muted-foreground">These guide every trade-off the team makes.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="principles-grid">
          {[
            { principle: "The user is the protagonist; we are the knowledgeable friend." },
            { principle: "Empowering, personalized, supportive — never alarmist, never paternalistic." },
            { principle: "Show what we see. Every classification ships with rationale and citations." },
            { principle: "Safety information is never paywalled. The premium hook is time depth, not safety." },
            { principle: "Cite the science. Recommendations carry an evidence grade and a primary source." },
            { principle: "Honest about uncertainty. When the science is mixed, we say so." },
          ].map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5 flex items-start gap-3" data-testid={`principle-${i}`}>
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
              <p className="text-sm text-foreground/80 leading-relaxed">{item.principle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Classification logic */}
      <section className="bg-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs font-medium tracking-wide">How it works</Badge>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-3">How we classify a marker</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A deterministic, editorially governed pipeline — not a language model making things up.</p>
          </div>
          <div className="space-y-4" data-testid="classification-steps">
            {classificationLogic.map((step, i) => (
              <div key={i} className="flex gap-5 items-start" data-testid={`classification-step-${i}`}>
                <div className="w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {step.step}
                </div>
                <div className="bg-background border border-border rounded-xl p-5 flex-1">
                  <h3 className="font-semibold text-foreground mb-1 text-sm">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence grades */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs font-medium tracking-wide">Evidence grading</Badge>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-3">Evidence grades A through D</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every recommendation is tagged with an evidence grade. We adapted the USPSTF/GRADE framework to be legible to a non-clinician.
          </p>
        </div>
        <div className="space-y-4" data-testid="evidence-grades">
          {evidenceGrades.map((eg, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6" data-testid={`evidence-grade-${eg.grade}`}>
              <div className="flex items-start gap-4">
                <span className={`px-3 py-1.5 rounded-lg text-base font-bold border ${eg.color} flex-shrink-0`}>
                  {eg.grade}
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{eg.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{eg.desc}</p>
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-xs text-muted-foreground font-medium">Example:</p>
                    <p className="text-xs text-foreground/70 mt-1 italic">{eg.example}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Source library */}
      <section className="bg-card border-t border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs font-medium tracking-wide">Source library</Badge>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-3">Curated, versioned, editorially reviewed</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our internal source library is reviewed quarterly by the editorial team. We maintain a public changelog of every addition, update, or removal.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="source-library">
            {sources.map((source, i) => (
              <Card key={i} className="border-border hover:shadow-md transition-shadow" data-testid={`source-${i}`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-sm">{source.name}</h3>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  </div>
                  <Badge variant="outline" className="text-xs mb-3 border-muted-foreground/30 text-muted-foreground">{source.type}</Badge>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{source.desc}</p>
                  <div className="space-y-1">
                    {source.citations.map((c) => (
                      <p key={c} className="text-xs text-primary/70 font-mono leading-relaxed">{c}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 bg-muted/50 border border-border rounded-xl p-6 flex items-start gap-4" data-testid="review-cadence">
            <RefreshCw className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-1">Quarterly editorial review</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The source library is reviewed every quarter. New publications are assessed for inclusion. Outdated or superseded recommendations are updated or removed. Every change is logged in the public changelog.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-8" data-testid="disclaimer">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 dark:text-amber-300 mb-3">Wellness disclaimer — displayed at every classification</h3>
              <p className="text-sm text-amber-800 dark:text-amber-400 leading-relaxed mb-4">
                InsightBlood is not a medical device. It is not a diagnostic tool. It is not a substitute for a licensed clinician. The risk classifications, pattern detections, and recommendations provided are for educational and wellness purposes only, consistent with FDA's January 2026 General Wellness guidance.
              </p>
              <div className="space-y-2">
                {[
                  "Zero disease-specific diagnostic claims in any shipped copy",
                  "Wellness-positioning audit completed pre-launch and quarterly",
                  "No diagnostic language: never 'you have X', 'you probably have X', 'the cause is X'",
                  "Prescription medications framed only as 'a conversation topic with your clinician'",
                  "High-risk classifications include a supportive next-step CTA — never a prescription",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                    <span className="text-xs text-amber-800 dark:text-amber-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data posture */}
      <section className="bg-card border-t border-border py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Data security posture</h2>
            <p className="text-muted-foreground text-sm">HIPAA-aligned even though we are not a Covered Entity.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" data-testid="security-grid">
            {[
              { icon: Shield, title: "PHI encrypted at rest", desc: "Per-user envelope keys. Never stored in plaintext." },
              { icon: Shield, title: "Encrypted in transit", desc: "TLS everywhere. No exceptions." },
              { icon: Shield, title: "Full data control", desc: "Export (JSON + CSV + PDF) or delete in one tap. Deletion confirmed by receipt." },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-background border border-border rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Trust built into the foundation, not bolted on.</h2>
          <p className="text-muted-foreground mb-8 text-sm">Start with your first PDF — free.</p>
          <Link href="/pricing">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90" data-testid="science-cta">
              Get started free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
