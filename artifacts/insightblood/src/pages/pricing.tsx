import React from "react";
import { CheckCircle, X, ArrowRight, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const comparisonTable = [
  {
    category: "Lab ingestion",
    features: [
      { name: "Unlimited lab uploads (PDF, photo, manual)", free: true, premium: true },
      { name: "Multi-format parsing (Quest, Labcorp, Boston Heart, Epic/Cerner)", free: true, premium: true },
      { name: "Lab connector integrations (MyQuest, Labcorp Patient, Apple Health)", free: false, premium: true },
      { name: "OCR mobile photo capture", free: true, premium: true },
      { name: "Manual-correction UI for failed extractions", free: true, premium: true },
    ],
  },
  {
    category: "Analysis & classification",
    features: [
      { name: "Risk classification (Low / Medium / High) on 2 most recent tests", free: true, premium: true },
      { name: "Full risk classification history (all tests)", free: false, premium: true },
      { name: "Pattern detection across 6 clinical patterns", free: true, premium: true },
      { name: "Written rationale + primary citation for every classification", free: true, premium: true },
      { name: "Evidence-graded recommendations (A/B/C/D) on 2 most recent tests", free: true, premium: true },
      { name: "Full recommendation history", free: false, premium: true },
    ],
  },
  {
    category: "Longitudinal tracking",
    features: [
      { name: "Side-by-side comparison of 2 most recent tests", free: true, premium: true },
      { name: "Longitudinal trend charts (>2 tests)", free: false, premium: true },
      { name: "Age/sex-adjusted optimal band overlaid on all charts", free: false, premium: true },
      { name: "Intervention timeline with marker response", free: false, premium: true },
      { name: "eGFR slope and trajectory alerts", free: false, premium: true },
    ],
  },
  {
    category: "Goals & coaching",
    features: [
      { name: "Goal setting (marker, pattern, behavioral, screening goals)", free: true, premium: true },
      { name: "Goal history and completion analytics", free: false, premium: true },
      { name: "AI Longevity Coach — proactive nudges", free: true, premium: true },
      { name: "AI Longevity Coach — weekly brief (Monday summary)", free: false, premium: true },
      { name: "AI Longevity Coach — doctor-visit prep mode", free: false, premium: true },
      { name: "AI Longevity Coach — full chat surface", free: false, premium: true },
    ],
  },
  {
    category: "Doctor tools",
    features: [
      { name: "GP / clinician finder on high-risk classifications", free: true, premium: true },
      { name: "Auto-generated doctor-prep packet (1-page PDF)", free: false, premium: true },
      { name: "Signed shareable links (7-day TTL)", free: false, premium: true },
      { name: "Recheck reminders by marker cadence", free: false, premium: true },
    ],
  },
  {
    category: "Privacy & security",
    features: [
      { name: "PHI encrypted at rest (per-user envelope keys) and in transit", free: true, premium: true },
      { name: "One-tap full data export (JSON + CSV + PDF)", free: true, premium: true },
      { name: "One-tap full deletion with confirmation receipt", free: true, premium: true },
      { name: "No advertising on health data — ever", free: true, premium: true },
    ],
  },
];

const faq = [
  {
    q: "Does the free plan ever expire?",
    a: "No. The free plan is free forever. You can upload unlimited lab reports. We only limit the comparison view to your 2 most recent tests — older results are archived, not deleted.",
  },
  {
    q: "What happens if I downgrade from Premium?",
    a: "All your data is preserved. You return to seeing your 2 most recent tests in full. Older results remain archived and restore immediately if you re-subscribe. No data loss, ever.",
  },
  {
    q: "Are safety-critical classifications always visible?",
    a: "Yes. High-risk classifications, their rationale, and their citations are visible on all plans. Safety information is never paywalled.",
  },
  {
    q: "What formats do you support?",
    a: "PDF (digital and scanned), photos captured on mobile, and manual entry. Quest, Labcorp, Boston Heart, Epic/Cerner with ≥90% extraction accuracy on Quest/Labcorp standard panels.",
  },
  {
    q: "Is my health data sold or used for advertising?",
    a: "Never. Advertising on health data is a permanent non-goal. Your data is encrypted at rest with per-user envelope keys and in transit. You can export or delete it at any time.",
  },
  {
    q: "Do you support Canadian labs?",
    a: "Yes. US + Canada are the default markets at launch. The region selector in Settings switches units (mg/dL ↔ mmol/L) and reference-range sources (USPSTF vs. Canadian Task Force).",
  },
  {
    q: "Is InsightBlood a medical device?",
    a: "No. InsightBlood is a wellness and educational tool, not a medical device. We operate under FDA's General Wellness guidance (January 2026). Everything we surface carries a disclaimer: not diagnostic, not a substitute for a clinician.",
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-xs font-medium tracking-wide">Pricing</Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Full insight on your two most recent tests. <span className="text-primary">Free forever.</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Safety information is never paywalled. The premium hook is time depth — full history, longitudinal charts, and the AI Longevity Coach.
          </p>
        </div>
      </section>

      {/* Plan cards */}
      <section className="pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-testid="plan-cards">
          {/* Free */}
          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col" data-testid="plan-free">
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">Free</p>
              <div className="flex items-end gap-2 mb-4">
                <span className="font-serif text-5xl font-bold text-foreground">$0</span>
                <span className="text-muted-foreground mb-1.5">/ forever</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Upload unlimited labs. Full analysis and citations on your 2 most recent tests. No credit card required.
              </p>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {[
                "Unlimited uploads",
                "Your 2 most recent tests in full",
                "Risk classifications + rationale + citations",
                "Pattern detection (6 clinical patterns)",
                "Evidence-graded recommendations",
                "Basic goal tracking",
                "GP finder on high-risk results",
                "PHI encryption + full data export",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-foreground/80">{f}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" size="lg" className="w-full border-primary/30 text-primary hover:bg-primary/5" data-testid="plan-free-cta">
              Get started free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Premium */}
          <div className="gradient-teal rounded-2xl p-8 flex flex-col relative overflow-hidden" data-testid="plan-premium">
            <div className="absolute top-4 right-4">
              <Badge className="bg-accent text-accent-foreground border-0 text-xs font-semibold">
                <Zap className="w-3 h-3 mr-1" />
                Most popular
              </Badge>
            </div>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest text-white/60 font-semibold mb-2">Premium</p>
              <div className="flex items-end gap-2 mb-1">
                <span className="font-serif text-5xl font-bold text-white">$50</span>
                <span className="text-white/60 mb-1.5">/ year</span>
              </div>
              <p className="text-white/40 text-xs mb-4">~$4.17/month · Cancel any time · No data loss on downgrade</p>
              <p className="text-sm text-white/70 leading-relaxed">
                Everything in Free, plus your full longitudinal history, intervention timelines, the AI Longevity Coach, and direct lab connector integrations.
              </p>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {[
                "Everything in Free",
                "Full history across all tests",
                "Longitudinal trend charts (all time)",
                "Age/sex optimal band on all charts",
                "Intervention timelines + marker response",
                "AI Longevity Coach (chat + weekly brief + doctor-visit mode)",
                "Doctor-prep packets (1-page PDF)",
                "Lab connector integrations",
                "Recheck reminders",
                "Signed shareable links",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-white/70 flex-shrink-0" />
                  <span className="text-white/80">{f}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" className="w-full bg-white text-primary hover:bg-white/95 font-semibold" data-testid="plan-premium-cta">
              Start Premium
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Full comparison table */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Full feature comparison</h2>
          </div>
          <div className="overflow-x-auto" data-testid="comparison-table">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-4 font-semibold text-foreground">Feature</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground w-24">Free</th>
                  <th className="text-center py-3 px-4 font-semibold text-primary w-24">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((section) => (
                  <React.Fragment key={section.category}>
                    <tr>
                      <td colSpan={3} className="pt-6 pb-2">
                        <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">{section.category}</span>
                      </td>
                    </tr>
                    {section.features.map((feature, j) => (
                      <tr key={j} className="border-b border-border/50">
                        <td className="py-3 pr-4 text-foreground/80">{feature.name}</td>
                        <td className="text-center py-3 px-4">
                          {feature.free ? (
                            <CheckCircle className="w-4 h-4 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                          )}
                        </td>
                        <td className="text-center py-3 px-4">
                          {feature.premium ? (
                            <CheckCircle className="w-4 h-4 text-primary mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Frequently asked questions</h2>
        </div>
        <div className="space-y-4" data-testid="faq">
          {faq.map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6" data-testid={`faq-${i}`}>
              <h3 className="font-semibold text-foreground mb-2 text-sm">{item.q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 text-center">
        <div className="max-w-xl mx-auto px-4">
          <Button size="lg" className="bg-primary text-white hover:bg-primary/90 px-10 py-6 text-base" data-testid="pricing-final-cta">
            Start for free — no credit card required
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <p className="text-muted-foreground text-xs mt-4">Free forever on your 2 most recent tests.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
