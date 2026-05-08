import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COACH_MESSAGES } from "@/lib/mockData";
import { Send, BookOpen, Zap, Sparkles, RotateCcw } from "lucide-react";

const SUGGESTIONS = [
  "What should I focus on first?",
  "Why is my homocysteine elevated?",
  "How does my ApoB trend compare to my age group?",
  "What interventions moved my hsCRP the most?",
];

const AI_FOLLOW_UP =
  "Great question. Homocysteine elevation is common and often overlooked in standard care. The most studied cause is impaired methylation — either from MTHFR variants or nutritional deficiencies in B12, folate, and B6. In your case, the slow downward trend suggests partial response. Want me to draft a specific supplement protocol based on your current labs?";

interface Message {
  role: "user" | "assistant";
  text: string;
  citations: string[];
}

export default function DashboardCoach() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(COACH_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const isPremium = user?.plan === "premium";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || !isPremium) return;
    const userMsg: Message = { role: "user", text, citations: [] };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 600));
    const reply: Message = {
      role: "assistant",
      text: AI_FOLLOW_UP,
      citations: ["PMID 23155038", "PMID 15003610"],
    };
    setMessages((m) => [...m, reply]);
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  if (!isPremium) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-full min-h-[60vh] px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-2">AI Longevity Coach</h2>
          <p className="text-muted-foreground max-w-md mb-6 text-sm leading-relaxed">
            The Coach reads every marker you've ever tested, identifies patterns across your history, and answers questions about your biology with PubMed-cited evidence. It's available on Premium.
          </p>
          <div className="rounded-xl border border-border bg-card p-4 text-left max-w-md w-full mb-8 space-y-2">
            {["Why is my homocysteine elevated?", "What interventions moved my hsCRP?", "Draft a supplement protocol for my results"].map((q) => (
              <div key={q} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Zap className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                {q}
              </div>
            ))}
          </div>
          <Link href="/checkout">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8">
              Upgrade to Premium · $50/yr
            </Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-57px)] md:h-screen">
        <div className="border-b border-border/50 px-6 py-4 bg-card flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-foreground">AI Longevity Coach</h1>
              <Badge className="text-[10px] bg-amber-50 text-amber-700 border-amber-200">Premium</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Answers grounded in your labs · cites PubMed</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground text-xs"
            onClick={() => setMessages(COACH_MESSAGES)}
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Reset
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mr-2.5 mt-1 shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                </div>
              )}
              <div className={`max-w-[82%] ${msg.role === "user" ? "max-w-[70%]" : ""}`}>
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-card border border-border text-foreground rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.citations.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1.5 pl-1">
                    {msg.citations.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full"
                      >
                        <BookOpen className="w-2.5 h-2.5" />
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mr-2.5 mt-1 shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-border/50 bg-card px-4 py-4 shrink-0">
          {messages.length <= COACH_MESSAGES.length + 1 && (
            <div className="flex gap-2 flex-wrap mb-3">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your labs…"
              disabled={loading}
              className="flex-1 min-w-0 text-sm bg-background border border-border rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground disabled:opacity-50"
              data-testid="coach-input"
            />
            <Button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-primary hover:bg-primary/90 text-white px-4 rounded-xl"
              data-testid="coach-send"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
