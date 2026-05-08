import { Link } from "wouter";
import { Upload, TrendingUp, Activity, Brain, Target, Bell, FileText, Shield, CheckCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const tshData = [
  { date: "Feb '23", tsh: 3.8, ft3: 2.9 },
  { date: "Jun '23", tsh: 4.2, ft3: 2.7 },
  { date: "Oct '23", tsh: 4.8, ft3: 2.6, event: "Synthroid dose change" },
  { date: "Feb '24", tsh: 2.1, ft3: 3.1 },
  { date: "Jun '24", tsh: 1.8, ft3: 3.3 },
  { date: "Nov '24", tsh: 2.4, ft3: 3.2 },
];

const features = [
  {
    icon: Upload,
    title: "Multi-format lab ingestion",
    tier: "Free",
    desc: "PDF upload (digital and scanned), photo capture with OCR on mobile, and manual-entry fallback. We handle Quest, Labcorp, Boston Heart, Epic/Cerner, and more.",
    details: [
      "≥90% extraction accuracy on Quest and Labcorp standard panels",
      "≥75% on hospital-system PDFs and Boston Heart panels",
      "Failed extractions surface a manual-correction UI — never silently dropped",
      "LOINC normalization across all lab vendors and assay types",
    ],
  },
  {
    icon: TrendingUp,
    title: "Longitudinal trend charting",
    tier: "Premium (>2 tests)",
    desc: "Every marker plotted over time with two reference bands: the lab's reported 'normal' range and the age/sex-adjusted optimal range from the clinical literature.",
    details: [
      "Individual data points with lab vendor and assay shown per point",
      "Trend line with confidence indicator below 3 data points",
      "Optimal band overlaid from evidence-based sources (AHA, ESC, ADA, KDIGO…)",
      "Different assays flagged for comparability warnings (thyroid antibodies, Lp(a))",
    ],
  },
  {
    icon: Activity,
    title: "Pattern detection across markers",
    tier: "Free",
    desc: "Six pre-built clinical patterns surface when your markers cross thresholds together — the way a clinician reasons, not just single-marker flags.",
    details: [
      "Cardiometabolic risk (ApoB + Lp(a) + hs-CRP + non-HDL)",
      "Insulin resistance / MASLD trajectory",
      "Inflammaging (hs-CRP + N/L ratio + ferritin + albumin)",
      "Iron-deficiency / occult-GI-bleed pattern",
      "Thyroid dysfunction (including reverse T3, anti-TPO)",
      "Kidney trajectory (eGFR slope + cystatin C discordance)",
    ],
  },
  {
    icon: FileText,
    title: "Evidence-graded recommendations",
    tier: "Free",
    desc: "Per-marker and per-pattern recommendations across nutrition, exercise, sleep, stress, supplements, and screening. Editorially reviewed — never LLM-generated at runtime.",
    details: [
      "Every recommendation tagged A / B / C / D for evidence strength",
      "Primary citation, mechanism, and effect size for each",
      "Nutrition · Exercise · Sleep · Stress · Supplements · Screening categories",
      "\"See a clinician\" recommendation when the situation warrants it",
    ],
  },
  {
    icon: Brain,
    title: "AI Longevity Coach",
    tier: "Premium",
    desc: "Conversational surface that reads your complete data — markers, goals, active patterns, logged interventions — and produces context-aware guidance and proactive nudges.",
    details: [
      "Proactive nudges on new results, pattern fires, and retest reminders",
      "Doctor-visit prep: top-3 changes, top-3 questions, current meds context",
      "Weekly brief (Monday): changes since last week, goals on track/off track",
      "Honestly acknowledges uncertainty — never generates citations at runtime",
    ],
  },
  {
    icon: Target,
    title: "Health goal tracking",
    tier: "Goal-setting free, history premium",
    desc: "Five goal classes covering everything from a single marker target to a multi-quarter behavioral protocol, with intervention-correlation built in.",
    details: [
      "Marker goals: 'Reduce ApoB to <70 by next test'",
      "Pattern goals: 'Resolve the insulin-resistance pattern'",
      "Behavioral goals with weekly targets and streaks",
      "Screening goals and intervention-adherence protocols",
    ],
  },
  {
    icon: Bell,
    title: "Reminders & lab connectors",
    tier: "Premium",
    desc: "Auto-generated recheck reminders based on marker-specific retesting cadence. Direct integrations pull labs automatically — no more manual uploads.",
    details: [
      "MyQuest API, Labcorp Patient, Apple Health, Google Health Connect",
      "Recheck reminders based on clinical retesting guidelines",
      "Overdue marker notifications calibrated by risk tier",
    ],
  },
  {
    icon: Shield,
    title: "Security & data control",
    tier: "Free",
    desc: "PHI encrypted at rest with per-user envelope keys, in transit. Your data, fully yours — export or delete in one tap.",
    details: [
      "Per-user envelope keys at rest; TLS in transit",
      "HIPAA-aligned posture even though we are not a Covered Entity",
      "One-tap full data export: JSON + CSV + PDF",
      "One-tap full deletion with a confirmation receipt",
      "No advertising on health data — ever",
    ],
  },
];

const markerSets = [
  { category: "Cardiovascular", markers: ["ApoB", "Lp(a)", "hs-CRP", "LDL-C", "HDL-C", "Non-HDL-C", "Triglycerides", "LDL-P", "sdLDL", "Homocysteine", "NT-proBNP", "HbA1c", "Uric acid"] },
  { category: "Metabolic", markers: ["Fasting glucose", "HbA1c", "Fasting insulin", "HOMA-IR", "C-peptide", "OGTT", "TG/HDL ratio", "ALT", "AST", "GGT", "ALP", "Uric acid", "Ferritin"] },
  { category: "Thyroid & Endocrine", markers: ["TSH", "Free T4", "Free T3", "Reverse T3", "Anti-TPO", "Anti-Tg", "AM Cortisol", "IGF-1", "DHEA-S", "Prolactin"] },
  { category: "Hematology", markers: ["WBC + Differential", "RBC", "Hemoglobin", "Hematocrit", "MCV", "MCH", "MCHC", "RDW", "Platelets", "ESR", "Neutrophil/Lymphocyte ratio"] },
  { category: "Kidney", markers: ["Creatinine", "eGFR (CKD-EPI 2021)", "Cystatin C", "eGFR-Cystatin", "BUN", "BUN:Creatinine", "UACR", "Urinalysis basics"] },
  { category: "Nutritional", markers: ["Vitamin D 25-OH", "B12", "Folate (serum + RBC)", "Ferritin", "Iron saturation", "TIBC", "Magnesium", "Zinc", "Copper", "Homocysteine", "Selenium"] },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 gradient-hero">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-white/10 text-white/90 border-white/20 text-xs font-medium tracking-wide">Features</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            The full intelligence stack for your blood work
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto">
            Every feature is built around the same principle: show what we see, cite the science, and be honest when we're uncertain.
          </p>
        </div>
      </section>

      {/* Thyroid chart demo */}
      <section className="py-16 bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs font-medium tracking-wide">Intervention correlation</Badge>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
                See exactly how your body responded to an intervention
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Tag a medication change, a dietary shift, or the start of a zone-2 program. InsightBlood draws the annotation on your trend chart and narrates what happened — how far markers moved, over what timeline, relative to the published PK literature.
              </p>
              <p className="text-sm text-primary font-medium italic">
                "Your TSH moved 4.8 → 1.8 over 16 weeks following the October dose change. This is consistent with the Synthroid PK literature." — AI Longevity Coach
              </p>
            </div>
            <div className="bg-background border border-border rounded-2xl p-5" data-testid="thyroid-chart">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-foreground">Thyroid panel — Patricia, 47</p>
                <Badge className="bg-violet-100 text-violet-800 border-violet-200 text-xs">Hashimoto's</Badge>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={tshData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 6]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={25} />
                  <Tooltip
                    contentStyle={{ border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                  />
                  <ReferenceArea y1={0.4} y2={2.5} fill="rgba(34,197,94,0.1)" label={{ value: "Optimal TSH", fill: "rgba(34,197,94,0.7)", fontSize: 9, position: "insideLeft" }} />
                  <ReferenceLine x="Oct '23" stroke="hsl(var(--accent))" strokeDasharray="4 4" label={{ value: "Dose change", fill: "hsl(var(--accent))", fontSize: 9, position: "top" }} />
                  <Line type="monotone" dataKey="tsh" stroke="hsl(186 68% 40%)" strokeWidth={2} dot={{ r: 3 }} name="TSH" />
                  <Line type="monotone" dataKey="ft3" stroke="hsl(262 58% 52%)" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="5 3" name="Free T3" />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-6 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-primary inline-block"></span> TSH</span>
                <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-violet-500 inline-block" style={{ backgroundImage: "repeating-linear-gradient(90deg, hsl(262 58% 52%) 0, hsl(262 58% 52%) 5px, transparent 5px, transparent 8px)" }}></span> Free T3</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features list */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-testid="features-list">
        <div className="space-y-12">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-start py-12 border-b border-border last:border-0 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-last" : ""}`}
              data-testid={`feature-${i}`}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs font-medium border-primary/30 text-primary/80">
                    {feature.tier}
                  </Badge>
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <ul className="space-y-3">
                  {feature.details.map((d, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Marker coverage */}
      <section className="bg-card border-t border-border py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs font-medium tracking-wide">Marker coverage</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">120+ markers across the full longevity panel</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              All markers normalized to LOINC codes with units harmonized across lab vendors.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="marker-coverage">
            {markerSets.map((set, i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-foreground text-sm mb-3 pb-2 border-b border-border">{set.category}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {set.markers.map((m) => (
                      <span key={m} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-md">
                        {m}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Ready to see your markers in context?</h2>
          <p className="text-muted-foreground mb-8">Upload your first PDF and get your first trend chart in minutes. Free.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90" data-testid="features-cta">
              Start for free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Link href="/pricing">
              <Button size="lg" variant="outline" data-testid="features-pricing-link">
                See pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
