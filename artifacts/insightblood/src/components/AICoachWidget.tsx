import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { MessageSquare, Sparkles, ChevronRight, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const COACH_PROMPTS = [
  "What should I prioritize this month?",
  "Explain my highest-risk marker in plain English",
  "Suggest 2 evidence-based next steps",
];

export default function AICoachWidget() {
  const { user } = useAuth();
  const [location, navigate] = useLocation();
  const [open, setOpen] = useState(false);
  const pathname = location.split("?")[0];

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const coachHref = useMemo(() => {
    if (!user) return "/signup";
    return "/dashboard/coach";
  }, [user]);
  const navigateToCoach = (prompt?: string) => {
    const target = prompt
      ? `${coachHref}?prompt=${encodeURIComponent(prompt)}`
      : coachHref;
    setOpen(false);
    navigate(target);
  };

  const showFab =
    pathname === "/dashboard" || pathname === "/dashboard/markers";

  if (!showFab) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {open && (
        <div className="absolute bottom-full right-0 mb-3 w-[20rem] rounded-xl border border-border bg-card shadow-xl">
          <div className="flex items-start justify-between gap-2 border-b border-border/60 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                AI Coach
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Guidance is available on every page.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close AI coach panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-4 py-3 space-y-2">
            {COACH_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => navigateToCoach(prompt)}
                className="w-full rounded-lg border border-border/60 bg-muted/20 px-3 py-2 text-left text-xs text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-foreground transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="px-4 pb-4">
            <button
              type="button"
              onClick={() => navigateToCoach()}
              className="inline-flex w-full items-center justify-center gap-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Open AI Coach
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
        aria-expanded={open}
        aria-label="Toggle AI coach widget"
      >
        <MessageSquare className="w-4 h-4" />
        AI Coach
      </button>
    </div>
  );
}
