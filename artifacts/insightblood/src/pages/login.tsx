import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Droplets, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { DEMO_AUTH } from "@/lib/auth-mode";

export default function Login() {
  const { login } = useAuth();
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await login(email, password);
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
          <blockquote className="text-white/90 text-xl font-serif leading-relaxed mb-6">
            "Finally, I understand what my blood work actually means — not just whether I'm 'normal', but whether I'm optimized."
          </blockquote>
          <p className="text-white/60 text-sm">— Patricia M., Premium member since 2024</p>
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 80% 20%, hsl(186 68% 40% / 0.4) 0%, transparent 60%)",
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

          <h1 className="text-2xl font-serif font-bold text-foreground mb-1">Welcome back</h1>
          <p className="text-muted-foreground text-sm mb-8">Sign in to your account to view your insights.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="login-email"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-xs text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  data-testid="login-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white"
              disabled={loading}
              data-testid="login-submit"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Get started free
            </Link>
          </p>

          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="text-xs text-center text-muted-foreground">
              {DEMO_AUTH ? (
                <>
                  Demo mode: use any email and password. Nothing is sent to a server; your session stays in this
                  browser.
                </>
              ) : (
                <>
                  Sign in with the email and password from signup. The API should be running at{" "}
                  <code className="text-[0.7rem] bg-muted px-1 py-0.5 rounded">localhost:5000</code> unless
                  VITE_API_BASE_URL is set.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
