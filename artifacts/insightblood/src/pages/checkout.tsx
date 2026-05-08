import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Droplets, CheckCircle, ArrowLeft, Lock, Zap } from "lucide-react";

const features = [
  "Full longitudinal history — every test you've ever taken",
  "Intervention timelines & before/after analysis",
  "AI Longevity Coach with PubMed-cited guidance",
  "Direct lab connector integrations (Quest, Labcorp)",
  "Exportable PDF reports for your physician",
  "Priority support",
];

export default function Checkout() {
  const { user, upgradeToPremium } = useAuth();
  const [, navigate] = useLocation();
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState(user?.name ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNum || !expiry || !cvc || !name) {
      setError("Please fill in all card details.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    upgradeToPremium();
    navigate("/checkout/success");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Please sign in to upgrade.</p>
          <Link href="/login">
            <Button className="bg-primary text-white">Sign in</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Droplets className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-serif font-semibold text-foreground">InsightBlood</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="w-3.5 h-3.5" />
            Secure checkout
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid md:grid-cols-2 gap-12">
        <div>
          <Link href="/pricing" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to pricing
          </Link>

          <Badge className="mb-4 bg-amber-50 text-amber-800 border-amber-200 font-semibold">
            <Zap className="w-3 h-3 mr-1" />
            Premium Plan
          </Badge>

          <h1 className="text-2xl font-serif font-bold text-foreground mb-1">
            Upgrade to Premium
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            $50 / year · Cancel any time · No data loss on downgrade
          </p>

          <ul className="space-y-3 mb-8">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>

          <div className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">Our commitment</p>
            Safety information — risk flags and critical alerts — are never paywalled. Premium unlocks the analytical depth, not the safety net.
          </div>
        </div>

        <div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
              <div>
                <p className="font-semibold text-foreground">InsightBlood Premium</p>
                <p className="text-xs text-muted-foreground">Annual subscription</p>
              </div>
              <p className="text-2xl font-bold text-foreground">$50</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="card-name">Name on card</Label>
                <Input
                  id="card-name"
                  placeholder="Alex Chen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-testid="checkout-name"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="card-number">Card number</Label>
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={cardNum}
                  onChange={(e) => setCardNum(formatCard(e.target.value))}
                  inputMode="numeric"
                  data-testid="checkout-card"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    inputMode="numeric"
                    data-testid="checkout-expiry"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    inputMode="numeric"
                    data-testid="checkout-cvc"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white mt-2"
                disabled={loading}
                data-testid="checkout-submit"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing…
                  </span>
                ) : (
                  "Pay $50 — Start Premium"
                )}
              </Button>

              <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Lock className="w-3 h-3" />
                Demo mode — no real payment is taken
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
