import { Link } from "wouter";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Zap, CreditCard, Download, Calendar, AlertCircle } from "lucide-react";

const FREE_FEATURES = [
  "Upload unlimited lab results",
  "Full analysis on your 2 most recent tests",
  "Evidence-backed insights with PubMed citations",
  "Risk classification on all markers",
];

const PREMIUM_FEATURES = [
  "Everything in Free",
  "Full longitudinal history — every test ever taken",
  "Intervention timelines & before/after analysis",
  "AI Longevity Coach (unlimited messages)",
  "Direct lab connector integrations",
  "Exportable PDF physician reports",
  "Priority support",
];

const INVOICES = [
  { id: "INV-2025-001", date: "Mar 1, 2025", amount: "$50.00", status: "Paid" },
  { id: "INV-2024-001", date: "Mar 1, 2024", amount: "$50.00", status: "Paid" },
];

export default function DashboardBilling() {
  const { user } = useAuth();
  const isPremium = user?.plan === "premium";

  return (
    <DashboardLayout>
      <div className="px-6 py-8 max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-serif font-bold text-foreground mb-1">Plan & Billing</h1>
          <p className="text-muted-foreground text-sm">Manage your subscription and billing history.</p>
        </div>

        <div className="mb-8">
          <div className={`rounded-2xl border p-6 ${isPremium ? "border-amber-200 bg-amber-50/50" : "border-border bg-card"}`}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={isPremium ? "bg-amber-100 text-amber-800 border-amber-200 font-semibold" : "bg-muted text-muted-foreground"}>
                    {isPremium ? "Premium" : "Free"}
                  </Badge>
                  {isPremium && <span className="text-xs text-amber-700 font-medium">Active</span>}
                </div>
                <p className="text-foreground font-semibold text-lg">
                  {isPremium ? "$50 / year" : "$0 / forever"}
                </p>
                {isPremium && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Renews Mar 1, 2026
                  </p>
                )}
              </div>
              {isPremium ? (
                <Button variant="outline" size="sm" className="text-muted-foreground">
                  Cancel subscription
                </Button>
              ) : (
                <Link href="/checkout">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    <Zap className="w-4 h-4 mr-2" />
                    Upgrade to Premium · $50/yr
                  </Button>
                </Link>
              )}
            </div>

            {isPremium && (
              <div className="mt-4 pt-4 border-t border-amber-200/60 flex items-center gap-2 text-sm text-amber-800">
                <CreditCard className="w-4 h-4 shrink-0" />
                Visa ending in 4242 · <button className="underline hover:no-underline">Update payment method</button>
              </div>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Card className={`border ${isPremium ? "border-border/50 opacity-60" : "border-border"}`}>
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Free · Always</p>
              <ul className="space-y-2">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className={`border ${isPremium ? "border-amber-200 bg-amber-50/40" : "border-primary/30 bg-primary/5"}`}>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Premium · $50/yr</p>
                {isPremium && <Badge className="text-[10px] bg-amber-100 text-amber-800 border-amber-200">Current plan</Badge>}
              </div>
              <ul className="space-y-2">
                {PREMIUM_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                    <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isPremium ? "text-amber-600" : "text-primary"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              {!isPremium && (
                <Link href="/checkout">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-white mt-4 w-full">
                    Upgrade now
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>

        {isPremium && (
          <div>
            <h2 className="font-semibold text-foreground mb-4">Billing history</h2>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="grid grid-cols-[1fr_auto_auto_auto] text-xs font-semibold uppercase tracking-wide text-muted-foreground bg-muted/50 border-b border-border">
                <div className="px-4 py-3">Invoice</div>
                <div className="px-4 py-3">Date</div>
                <div className="px-4 py-3">Amount</div>
                <div className="px-4 py-3">Action</div>
              </div>
              {INVOICES.map((inv, i) => (
                <div
                  key={inv.id}
                  className={`grid grid-cols-[1fr_auto_auto_auto] items-center ${i < INVOICES.length - 1 ? "border-b border-border/50" : ""}`}
                >
                  <div className="px-4 py-3 text-sm font-medium text-foreground">{inv.id}</div>
                  <div className="px-4 py-3 text-sm text-muted-foreground">{inv.date}</div>
                  <div className="px-4 py-3">
                    <Badge className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">{inv.status}</Badge>
                  </div>
                  <div className="px-4 py-3">
                    <button className="text-xs text-primary hover:text-primary/80 flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isPremium && (
          <div className="rounded-xl border border-border bg-muted/30 p-5 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Safety alerts — critical marker flags — are never paywalled on InsightBlood. Premium unlocks analytical depth, not safety.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
