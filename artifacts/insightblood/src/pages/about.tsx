import { Link } from "wouter";
import { ArrowRight, Droplets, BookOpen, Shield, Heart, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const principles = [
  {
    icon: Users,
    title: "The user is the protagonist; we are the knowledgeable friend.",
    desc: "Every feature, every copy decision, every classification tier is designed around one question: does this help Maya, David, or Patricia understand their health better — or does it make us feel important? If it's the latter, it doesn't ship.",
  },
  {
    icon: Heart,
    title: "Empowering, personalized, supportive — never alarmist, never paternalistic.",
    desc: "We don't catastrophize. We don't condescend. We don't assume the user hasn't already read the Attia book. We meet people where they are and give them the context they need to make their own decisions.",
  },
  {
    icon: BookOpen,
    title: "Show what we see. Every classification ships with rationale and citations.",
    desc: "We never ask the user to trust a black box. If we classify a marker as high-risk, we show the rule that fired, the literature behind the optimal threshold, and the primary citation — verbatim. The user should be able to verify everything we say.",
  },
  {
    icon: Shield,
    title: "Safety information is never paywalled. The premium hook is time depth, not safety.",
    desc: "High-risk classifications, their rationale, and their recommendations are visible to every user, free or paid. This is a permanent constraint. We compete on the richness of the longitudinal experience, not by rationing safety.",
  },
  {
    icon: BookOpen,
    title: "Cite the science. Recommendations carry an evidence grade and a primary source.",
    desc: "Every recommendation — whether it's 'consider zone-2 cardio' or 'discuss statin therapy with your clinician' — is tagged A/B/C/D for evidence strength and carries a primary citation. We don't recommend things we can't support.",
  },
  {
    icon: Heart,
    title: "Honest about uncertainty. When the science is mixed, we say so.",
    desc: "The longevity literature is full of genuine uncertainty. ApoB vs. LDL-C, TRT timing, fasting insulin thresholds, reverse T3 clinical significance — where experts disagree, we say so. We never paper over ambiguity to appear more confident.",
  },
];

const notGoals = [
  { label: "No lab ordering or phlebotomy", desc: "We sit on top of existing lab work. We don't compete with Function Health or SiPhox — we work with what you already have." },
  { label: "No diagnosis or treatment recommendations", desc: "Wellness and educational positioning under FDA's General Wellness guidance. No 'you have X' language. Never." },
  { label: "No advertising on health data", desc: "This is a permanent non-goal. Not a policy that changes when we raise a Series B. Permanent." },
  { label: "No social or community features", desc: "Comparing your labs to strangers is a different product with different risks. It's not what we're building." },
  { label: "No genomic or wearable data in v1", desc: "Designed for it, not built yet. Each is a multi-quarter integration that we'll do carefully, not quickly." },
];

const roadmap = [
  { phase: "v1 (Now)", items: ["Multi-format lab ingestion", "Longitudinal trends + optimal bands", "Six clinical patterns", "Evidence-graded recommendations", "AI Longevity Coach (proactive nudges)", "Doctor-prep packet", "Freemium model", "US + Canada"] },
  { phase: "v2 (Fast follow)", items: ["Lab connector integrations (MyQuest, Labcorp Patient, Apple Health)", "AI Longevity Coach full chat", "Cancer early-signal panel (advisory-board gated)", "Signed shareable links"] },
  { phase: "Future", items: ["Wearable + CGM integration (HRV, glucose variability, sleep)", "Genomic input (MTHFR, ApoE, Lp(a) genetics)", "Family / dependents view", "Clinician collaboration mode", "Extended international lab support"] },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-8">
            <Droplets className="w-7 h-7 text-white" />
          </div>
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-xs font-medium tracking-wide">About InsightBlood</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Built for the people who already know what ApoB is — and the people who are learning.
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            InsightBlood exists because blood work is the most actionable data most people will ever have about their health — and the current system wastes almost all of it. PDFs scattered across patient portals. Single-point values shown against ranges optimized for detecting pathology, not for optimizing longevity. No longitudinal view. No connection to the evidence base.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-card border-y border-border py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">The elevator pitch</h2>
          </div>
          <div className="bg-foreground rounded-2xl p-10 text-center" data-testid="elevator-pitch">
            <p className="font-serif text-2xl sm:text-3xl text-white leading-relaxed font-medium">
              "Bring every blood test you've ever taken into one place, see how each marker is trending against age- and sex-adjusted optimal ranges, and get evidence-backed next steps — free on your two most recent tests, $50/yr for full history."
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs font-medium tracking-wide">Product principles</Badge>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-3">Six commitments that guide every trade-off</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These aren't values on a website. Every feature decision, copy decision, and scope cut gets evaluated against these.
          </p>
        </div>
        <div className="space-y-6" data-testid="principles-list">
          {principles.map((p, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-8 flex items-start gap-6" data-testid={`principle-about-${i}`}>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <p.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2 text-base italic">"{p.title}"</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Not goals */}
      <section className="bg-card border-y border-border py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs font-medium tracking-wide">Scope</Badge>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-3">What we're deliberately not building</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These are deliberate exclusions, not oversights. They keep focus and reduce regulatory and partnership exposure.
            </p>
          </div>
          <div className="space-y-4" data-testid="not-goals">
            {notGoals.map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-background border border-border rounded-xl p-5" data-testid={`not-goal-${i}`}>
                <span className="text-sm font-semibold text-primary min-w-0">{item.label}</span>
                <span className="text-muted-foreground text-sm leading-relaxed border-l border-border pl-4">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs font-medium tracking-wide">Who it's for</Badge>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-3">Three archetypes we design for</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">We ask "what would Maya do here?" — not "what would a generic user do?"</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-testid="personas">
          {[
            {
              name: "Maya, 38",
              label: "The Optimizer",
              desc: "Marketing director in Brooklyn. Listens to Peter Attia on morning runs. Six years of PDFs across three lab vendors. She knows what ApoB is. She needs a longitudinal view, not an explanation.",
              markers: "ApoB · Lp(a) · hs-CRP · Cardiometabolic pattern",
            },
            {
              name: "David, 54",
              label: "The Family Health Lead",
              desc: "Chemical engineer in Cleveland managing his own labs, his mother's labs across two patient portals, and his wife's thyroid condition. He needs plain-English explanations and a doctor-prep packet.",
              markers: "CBC anemia pattern · Hgb · MCV · Ferritin",
            },
            {
              name: "Patricia, 47",
              label: "The Chronically Managed",
              desc: "Hashimoto's patient with quarterly thyroid panels. She doesn't need an explanation of what TSH is. She needs to see whether the last Synthroid dose change moved the right markers.",
              markers: "TSH · Free T3 · Free T4 · Reverse T3 · Anti-TPO",
            },
          ].map((persona, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-7" data-testid={`persona-about-${i}`}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="font-serif font-bold text-primary text-lg">{persona.name[0]}</span>
              </div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">{persona.label}</p>
              <h3 className="font-serif font-bold text-foreground text-xl mb-3">{persona.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{persona.desc}</p>
              <p className="text-xs font-mono text-primary/70 font-medium">{persona.markers}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-card border-t border-border py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-xs font-medium tracking-wide">Roadmap</Badge>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-3">Where we're going</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We ship carefully and we scope ruthlessly. If a feature doesn't advance one of our five release-1 objectives, it doesn't ship in v1.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="roadmap">
            {roadmap.map((phase, i) => (
              <div key={i} className={`rounded-2xl p-6 border ${i === 0 ? "bg-primary/5 border-primary/20" : "bg-background border-border"}`} data-testid={`roadmap-phase-${i}`}>
                <p className={`text-xs uppercase tracking-widest font-semibold mb-4 ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>{phase.phase}</p>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${i === 0 ? "bg-primary" : "bg-muted-foreground/40"}`}></span>
                      <span className={i === 0 ? "text-foreground" : "text-muted-foreground"}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
            The knowledgeable friend your lab results deserve.
          </h2>
          <p className="text-muted-foreground mb-8">Upload your first PDF — free, no credit card required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 px-8 py-6" data-testid="about-cta">
              Start for free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Link href="/science">
              <Button size="lg" variant="outline" className="px-8 py-6" data-testid="about-science-link">
                Read our science page
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
