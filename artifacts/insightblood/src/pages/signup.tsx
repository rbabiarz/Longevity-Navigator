import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Droplets, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";

const perks = [
  "Upload unlimited lab results",
  "Full analysis on your 2 most recent tests",
  "Evidence-backed insights with PubMed citations",
  "No credit card required",
];

export default function Signup() {
  const { signup } = useAuth();
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await signup(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      const isNetwork =
        err instanceof TypeError ||
        (err instanceof Error &&
          (/failed to fetch|networkerror|load failed/i.test(err.message) ||
            err.name === "NetworkError"));
      setError(
        isNetwork
          ? "Could not reach the API server. Start it (default port 5000) or set VITE_API_BASE_URL."
          : message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex lg:w-1/2 bg-[hsl(var(--color-primary))] relative overflow-hidden flex-col justify-between p-12">
        <div>
          <Link href="/" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
            <Droplets className="w-6 h-6" />
            <span className="font-serif font-semibold text-xl">InsightBlood</span>
          </Link>
        </div>
        <div>
          <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">Free forever includes</p>
          <ul className="space-y-3">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-3 text-white/90 text-sm">
                <CheckCircle className="w-4 h-4 mt-0.5 text-emerald-300 shrink-0" />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-white/50 text-xs">
            Upgrade to Premium any time for $50/year to unlock your full history, longitudinal charts, and the AI Longevity Coach.
          </p>
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 20% 80%, hsl(186 68% 40% / 0.4) 0%, transparent 60%)",
        }} />
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to home
          </Link>

          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Droplets className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-serif font-semibold text-lg text-foreground">InsightBlood</span>
          </div>

          <h1 className="text-2xl font-serif font-bold text-foreground mb-1">Create your account</h1>
          <p className="text-muted-foreground text-sm mb-8">Free forever. No credit card required.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Alex Chen"
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-testid="signup-name"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="signup-email"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  data-testid="signup-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="flex gap-1 mt-1.5">
                  {[8, 12, 16].map((len) => (
                    <div
                      key={len}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        password.length >= len ? "bg-primary" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              )}
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
              data-testid="signup-submit"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account…
                </span>
              ) : (
                "Create free account"
              )}
            </Button>

            <p className="text-[11px] text-center text-muted-foreground">
              By creating an account you agree to our{" "}
              <button type="button" className="text-primary hover:underline">Terms</button>{" "}
              and{" "}
              <button type="button" className="text-primary hover:underline">Privacy Policy</button>.
            </p>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
