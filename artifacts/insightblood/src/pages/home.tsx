import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Upload, TrendingUp, Shield, BookOpen, Activity, ChevronDown, CheckCircle, Star, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  ReferenceLine,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";

const apobData = [
  { date: "Jan '23", value: 108, label: "Quest" },
  { date: "Jun '23", value: 104, label: "Quest" },
  { date: "Dec '23", value: 99, label: "Labcorp" },
  { date: "May '24", value: 95, label: "Boston Heart" },
  { date: "Nov '24", value: 89, label: "Quest" },
  { date: "Mar '25", value: 82, label: "Quest" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-border rounded-lg p-3 shadow-lg text-xs">
        <p className="font-semibold text-foreground">{label}</p>
        <p className="text-primary font-medium">ApoB: {payload[0].value} mg/dL</p>
        <p className="text-muted-foreground">{payload[0].payload.label}</p>
      </div>
    );
  }
  return null;
};

const domains = [
  { name: "Cardiovascular", markers: "ApoB · Lp(a) · hs-CRP · Homocysteine", color: "bg-rose-50 border-rose-200 text-rose-800", dot: "bg-rose-500" },
  { name: "Metabolic", markers: "HbA1c · Fasting Insulin · HOMA-IR · GGT", color: "bg-amber-50 border-amber-200 text-amber-800", dot: "bg-amber-500" },
  { name: "Inflammation", markers: "hs-CRP · N/L Ratio · Ferritin · Albumin", color: "bg-orange-50 border-orange-200 text-orange-800", dot: "bg-orange-500" },
  { name: "Thyroid & Endocrine", markers: "TSH · Free T3 · Free T4 · Reverse T3", color: "bg-violet-50 border-violet-200 text-violet-800", dot: "bg-violet-500" },
  { name: "Kidney", markers: "eGFR · Cystatin C · UACR · BUN", color: "bg-sky-50 border-sky-200 text-sky-800", dot: "bg-sky-500" },
  { name: "Liver", markers: "ALT · AST · GGT · FIB-4 Score", color: "bg-emerald-50 border-emerald-200 text-emerald-800", dot: "bg-emerald-500" },
  { name: "Sex Hormones", markers: "Testosterone · SHBG · Estradiol · FSH", color: "bg-pink-50 border-pink-200 text-pink-800", dot: "bg-pink-500" },
  { name: "Nutritional", markers: "Vitamin D · B12 · Ferritin · Magnesium", color: "bg-lime-50 border-lime-200 text-lime-800", dot: "bg-lime-500" },
  { name: "Hematology", markers: "CBC + Differential · MCV · RDW · ESR", color: "bg-blue-50 border-blue-200 text-blue-800", dot: "bg-blue-500" },
];

const testimonials = [
  {
    name: "Maya R.",
    age: "38, Marketing Director",
    quote: "I've had six years of PDFs scattered across Dropbox. InsightBlood turned them into a longitudinal record in under ten minutes. Seeing my ApoB trend against the optimal band finally gave me something real to bring to my doctor.",
    marker: "ApoB: 108 → 82 mg/dL over 26 months",
  },
  {
    name: "David K.",
    age: "54, Chemical Engineer",
    quote: "My mother's labs across two patient portals used to take me hours to reconcile. Now I can see her anemia pattern clearly, with plain-English context that actually helps me talk to her cardiologist.",
    marker: "Hgb · MCV · Ferritin — iron-deficiency pattern",
  },
  {
    name: "Patricia M.",
    age: "47, Hashimoto's patient",
    quote: "I finally have what I needed: TSH and free T3 charted together with every Synthroid dose change annotated. When my T3 didn't move with the last adjustment, InsightBlood flagged exactly what I suspected.",
    marker: "TSH · Free T3 · Reverse T3 — thyroid panel",
  },
];

const sources = [
  "PubMed E-utilities", "NEJM", "JAMA", "The Lancet", "Cochrane Reviews", "AHA Guidelines", "ADA Standards of Care", "KDIGO 2024", "USPSTF", "Endocrine Society",
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="gradient-hero min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-16">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, hsl(186 68% 40%) 0%, transparent 50%), radial-gradient(circle at 70% 60%, hsl(38 88% 52%) 0%, transparent 50%)`,
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-white/10 text-white/90 border-white/20 hover:bg-white/15 text-xs font-medium tracking-wide" data-testid="hero-badge">
            Evidence-backed · PubMed-cited · HIPAA-aligned posture
          </Badge>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Your blood work,{" "}
            <span className="text-gradient">finally intelligible</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Bring every test you've ever taken into one place. See how each marker is trending against age- and sex-adjusted optimal ranges. Get evidence-backed next steps — with citations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base font-medium w-full sm:w-auto"
                data-testid="hero-cta-primary"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/features">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white px-8 py-6 text-base font-medium w-full sm:w-auto bg-transparent"
                data-testid="hero-cta-secondary"
              >
                See how it works
              </Button>
            </Link>
          </div>

          {/* Chart demo */}
          <div className="bg-white/5 border border-white/15 rounded-2xl p-4 sm:p-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="text-left">
                <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Marker trend</p>
                <p className="text-white font-semibold text-sm">ApoB (Apolipoprotein B)</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  Medium risk
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={apobData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 120]} tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={false} tickLine={false} width={35} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceArea y1={60} y2={70} fill="rgba(34,197,94,0.12)" label={{ value: "Optimal", fill: "rgba(34,197,94,0.7)", fontSize: 10, position: "insideLeft" }} />
                <ReferenceLine y={70} stroke="rgba(34,197,94,0.5)" strokeDasharray="4 4" />
                <ReferenceLine y={90} stroke="rgba(251,146,60,0.5)" strokeDasharray="4 4" />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(186 68% 55%)"
                  strokeWidth={2.5}
                  dot={{ fill: "hsl(186 68% 55%)", strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: "hsl(38 88% 60%)" }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-white/35 text-xs text-center mt-3">
              Optimal band per Sniderman et al., JAMA Cardiology · Attia longevity framework
            </p>
          </div>

          <div className="mt-8 flex justify-center animate-bounce">
            <ChevronDown className="w-6 h-6 text-white/30" />
          </div>
        </div>
      </section>

      {/* Source bar */}
      <section className="bg-foreground py-6 overflow-hidden" data-testid="source-bar">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-background/40 text-xs uppercase tracking-widest mb-4">Citations drawn from</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {sources.map((s) => (
              <span key={s} className="text-background/50 text-sm font-medium whitespace-nowrap">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs font-medium tracking-wide">How it works</Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">From scattered PDFs to longitudinal clarity</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">In minutes, not hours.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              icon: Upload,
              title: "Upload any lab format",
              desc: "PDF, photo, or manual entry. Quest, Labcorp, Boston Heart, Epic/Cerner. We parse the markers automatically with ≥90% extraction accuracy.",
              detail: "Scanned or digital · OCR on mobile · Manual-entry fallback",
            },
            {
              step: "02",
              icon: TrendingUp,
              title: "See trends against optimal",
              desc: "Every marker plotted over time with two bands: the lab's 'normal' range and the age- and sex-adjusted optimal range from the clinical literature.",
              detail: "120+ markers · LOINC-normalized · Age-stratified ranges",
            },
            {
              step: "03",
              icon: BookOpen,
              title: "Get evidence-backed next steps",
              desc: "Per-marker and per-pattern recommendations across nutrition, exercise, sleep, supplements, and screening — each tagged A/B/C/D for evidence strength with a primary citation.",
              detail: "Editorial library · Quarterly reviewed · PubMed-cited",
            },
          ].map((item, i) => (
            <div key={i} className="relative group" data-testid={`howit-step-${i + 1}`}>
              <div className="bg-card border border-border rounded-2xl p-8 h-full hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl font-serif font-bold text-primary/20">{item.step}</span>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                <p className="text-xs text-muted-foreground/70 font-medium">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Risk classification demo */}
      <section className="bg-card border-y border-border py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs font-medium tracking-wide">Risk classification</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Every marker gets a verdict — and a reason
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Three-tier classification (Low / Medium / High) calibrated to your age and sex. Each classification includes the rule that fired, the literature behind it, and a supportive next step — never alarmist, never a prescription.
              </p>
              <div className="space-y-3">
                {[
                  { label: "Written rationale for every classification", checked: true },
                  { label: "Primary source citation (PubMed, AHA, ADA, KDIGO…)", checked: true },
                  { label: "Evidence grade A / B / C / D on every recommendation", checked: true },
                  { label: "\"Not diagnostic\" disclaimer on every risk result", checked: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground/80">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4" data-testid="risk-demo">
              {[
                {
                  marker: "ApoB",
                  value: "92 mg/dL",
                  tier: "medium" as const,
                  label: "Medium risk",
                  rationale: "ApoB 90–119 mg/dL for your age/sex (38F) is in the caution range per the Sniderman literature. Below 70 is the longevity-panel target used by Attia, Dayspring, and reflected in ESC 2021.",
                  citation: "Sniderman AD et al., JAMA Cardiology 2019",
                },
                {
                  marker: "eGFR (CKD-EPI 2021)",
                  value: "88 mL/min/1.73m²",
                  tier: "low" as const,
                  label: "Low risk",
                  rationale: "eGFR ≥60 is within expected range. Your slope over 3 tests is stable (+1.2/year) — no trajectory concern at this time.",
                  citation: "KDIGO CKD Guidelines 2024",
                },
                {
                  marker: "Fasting Insulin",
                  value: "18 µIU/mL",
                  tier: "high" as const,
                  label: "High risk",
                  rationale: "Fasting insulin >15 µIU/mL suggests emerging insulin resistance (HOMA-IR estimated at 3.9). This pattern is worth discussing with your clinician.",
                  citation: "ADA Standards of Care 2025, Petersen & Shulman 2018",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`border rounded-xl p-4 ${
                    item.tier === "low"
                      ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30"
                      : item.tier === "medium"
                      ? "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30"
                      : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30"
                  }`}
                  data-testid={`risk-card-${item.tier}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{item.marker}</p>
                      <p className="font-bold text-foreground text-lg">{item.value}</p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        item.tier === "low"
                          ? "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/40 dark:text-green-400 dark:border-green-700"
                          : item.tier === "medium"
                          ? "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-700"
                          : "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/40 dark:text-red-400 dark:border-red-700"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/70 leading-relaxed mb-2">{item.rationale}</p>
                  <p className="text-xs text-muted-foreground font-medium">
                    Cite: {item.citation}
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1 italic">
                    Not diagnostic. Not a substitute for a clinician.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Health domains */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs font-medium tracking-wide">Health domains</Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            120+ markers across 9 clinical domains
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The full longevity panel — from ApoB to thyroid axis to kidney trajectory — LOINC-normalized and organized the way clinicians think.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="domains-grid">
          {domains.map((domain, i) => (
            <div
              key={i}
              className={`border rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer ${domain.color}`}
              data-testid={`domain-card-${i}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${domain.dot}`}></span>
                <h3 className="font-semibold text-sm">{domain.name}</h3>
              </div>
              <p className="text-xs opacity-75 leading-relaxed">{domain.markers}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/features">
            <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/5" data-testid="domains-cta">
              See all 120+ markers
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Pattern detection */}
      <section className="bg-card border-y border-border py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs font-medium tracking-wide">Pattern detection</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Six pre-built clinical patterns
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Markers don't tell the full story alone. InsightBlood surfaces cross-marker patterns the way a clinician thinks, not just single-marker flags.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="patterns-grid">
            {[
              {
                name: "Cardiometabolic Risk",
                markers: "ApoB · Lp(a) · hs-CRP · Non-HDL",
                desc: "Identifies ASCVD-trajectory patterns including residual-risk discordance — when LDL-C looks normal but ApoB is elevated.",
                evidence: "AHA/ACC 2018+ · ESC 2021",
              },
              {
                name: "Insulin Resistance / MASLD",
                markers: "Fasting Insulin · HbA1c · ALT · Triglycerides/HDL",
                desc: "Pre-diabetes drift detection across multiple tests. Hepatic-fat proxy pattern (ALT > AST + GGT elevated).",
                evidence: "ADA Standards of Care 2025 · AASLD",
              },
              {
                name: "Inflammaging",
                markers: "hs-CRP · N/L Ratio · Ferritin · Albumin",
                desc: "Chronic low-grade inflammation signal associated with accelerated aging and elevated all-cause mortality risk.",
                evidence: "Franceschi 2006 · CANTOS · JUPITER",
              },
              {
                name: "Iron Deficiency / Occult GI",
                markers: "Hemoglobin · MCV · Ferritin · Platelets",
                desc: "Three-marker pattern that clinical guidelines suggest investigating with colonoscopy or GI workup in appropriate populations.",
                evidence: "USPSTF Colorectal Screening · AASLD",
              },
              {
                name: "Thyroid Dysfunction",
                markers: "TSH · Free T4 · Free T3 · Anti-TPO",
                desc: "Hashimoto's trajectory, subclinical hypothyroidism (TSH 4.5–10), and low-T3 pattern with age-adjusted geriatric ranges at 60+.",
                evidence: "ATA Guidelines · AACE · Endocrine Society",
              },
              {
                name: "Kidney Trajectory",
                markers: "eGFR · Cystatin C · UACR · Creatinine",
                desc: "eGFR slope ≥5 mL/min/1.73m²/year decline. eGFR-creatinine vs. eGFR-cystatin C discordance flagged for muscle-mass confounding.",
                evidence: "KDIGO CKD 2024 · NKF eGFR-2021",
              },
            ].map((pattern, i) => (
              <Card key={i} className="border-border hover:shadow-md transition-shadow" data-testid={`pattern-card-${i}`}>
                <CardContent className="p-6">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Activity className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{pattern.name}</h3>
                  <p className="text-xs text-primary font-medium mb-3">{pattern.markers}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{pattern.desc}</p>
                  <p className="text-xs text-muted-foreground/60 font-medium">Evidence: {pattern.evidence}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs font-medium tracking-wide">Stories</Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">Built for people who take their health seriously</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-testid="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-8 flex flex-col" data-testid={`testimonial-${i}`}>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <blockquote className="text-foreground/80 leading-relaxed text-sm flex-1 mb-6">
                "{t.quote}"
              </blockquote>
              <div>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.age}</p>
                <p className="text-primary text-xs font-medium mt-2 font-mono">{t.marker}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs font-medium tracking-wide">Trust & safety</Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Built with the humility science demands
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: "PHI encrypted", desc: "Per-user envelope keys at rest. In transit. HIPAA-aligned posture even though we're not a Covered Entity." },
            { icon: BookOpen, title: "Editorial, not algorithmic", desc: "All recommendations are editorially reviewed quarterly. Nothing is LLM-generated at runtime without human oversight." },
            { icon: Activity, title: "No diagnostic claims", desc: "Every classification ships with a disclaimer. Zero disease-diagnostic claims in shipped copy. Wellness positioning, full stop." },
            { icon: Droplets, title: "Safety never paywalled", desc: "High-risk classifications and recommendations are available to every user, free or premium. Safety is not a premium feature." },
          ].map((item, i) => (
            <div key={i} className="text-center p-6" data-testid={`trust-card-${i}`}>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-foreground py-24 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Your lab history is trying to tell you something.
          </h2>
          <p className="text-white/60 text-lg mb-10">
            Upload your first PDF and see your markers in context within minutes.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-base font-medium" data-testid="final-cta">
              Go to Dashboard
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
