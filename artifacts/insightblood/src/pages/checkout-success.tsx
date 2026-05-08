import { Link } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Droplets, CheckCircle, ArrowRight } from "lucide-react";

const nextSteps = [
  { num: "1", label: "Upload your latest labs", href: "/dashboard/upload", action: "Upload now" },
  { num: "2", label: "Review your full marker history", href: "/dashboard/markers", action: "View markers" },
  { num: "3", label: "Chat with your AI Longevity Coach", href: "/dashboard/coach", action: "Open Coach" },
];

export default function CheckoutSuccess() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
      <div className="flex items-center gap-2 mb-12">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Droplets className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-serif font-semibold text-foreground text-lg">InsightBlood</span>
      </div>

      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
        <CheckCircle className="w-8 h-8 text-emerald-600" />
      </div>

      <h1 className="text-3xl font-serif font-bold text-foreground text-center mb-2">
        Welcome to Premium, {user?.name?.split(" ")[0]}!
      </h1>
      <p className="text-muted-foreground text-center max-w-md mb-10">
        Your account has been upgraded. You now have access to your full longitudinal history, the AI Longevity Coach, and all lab integrations.
      </p>

      <div className="w-full max-w-md space-y-3 mb-10">
        {nextSteps.map((step) => (
          <Link key={step.href} href={step.href} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-sm transition-all group">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0">
              {step.num}
            </div>
            <span className="flex-1 text-sm font-medium text-foreground">{step.label}</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>

      <Link href="/dashboard">
        <Button className="bg-primary hover:bg-primary/90 text-white px-8">
          Go to my dashboard
        </Button>
      </Link>
    </div>
  );
}
