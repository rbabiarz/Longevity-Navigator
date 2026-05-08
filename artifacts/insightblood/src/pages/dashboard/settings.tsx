import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, User, Bell, Shield, Trash2 } from "lucide-react";

type Tab = "profile" | "notifications" | "privacy";

const NOTIF_OPTIONS = [
  { id: "new_insight", label: "New insights available", desc: "When we detect a notable change in one of your markers" },
  { id: "upload_reminder", label: "Upload reminders", desc: "Quarterly reminder to add your latest labs" },
  { id: "coach_updates", label: "AI Coach updates", desc: "When the Coach has new analysis based on recent research" },
  { id: "product_news", label: "Product news", desc: "Feature releases and platform updates" },
];

export default function DashboardSettings() {
  const { user, updateProfile } = useAuth();
  const [tab, setTab] = useState<Tab>("profile");
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [dob, setDob] = useState(user?.dob ?? "");
  const [sex, setSex] = useState(user?.sex ?? "male");
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({ new_insight: true, upload_reminder: true, coach_updates: false, product_news: false });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, dob, sex: sex as "male" | "female" });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const tabs: { id: Tab; icon: React.ElementType; label: string }[] = [
    { id: "profile", icon: User, label: "Profile" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "privacy", icon: Shield, label: "Privacy & data" },
  ];

  return (
    <DashboardLayout>
      <div className="px-6 py-8 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-serif font-bold text-foreground mb-1">Settings</h1>
          <p className="text-muted-foreground text-sm">Manage your account preferences.</p>
        </div>

        <div className="flex gap-1 border-b border-border/50 mb-8">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                tab === id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {tab === "profile" && (
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="s-name">Full name</Label>
                <Input id="s-name" value={name} onChange={(e) => setName(e.target.value)} data-testid="settings-name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="s-email">Email address</Label>
                <Input id="s-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="s-dob">Date of birth</Label>
                <Input id="s-dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Biological sex</Label>
                <div className="flex gap-2">
                  {["male", "female"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSex(s)}
                      className={`flex-1 py-2 text-sm border rounded-lg font-medium transition-colors capitalize ${
                        sex === s
                          ? "bg-primary/10 border-primary text-primary"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-muted-foreground">Used for age- and sex-adjusted reference ranges.</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Current plan</Label>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                <Badge className={user?.plan === "premium" ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-muted text-muted-foreground"}>
                  {user?.plan === "premium" ? "Premium" : "Free"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {user?.plan === "premium" ? "Full longitudinal history & AI Coach" : "2 most recent tests · full analysis"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-white" data-testid="settings-save">
                Save changes
              </Button>
              {saved && (
                <span className="flex items-center gap-1.5 text-sm text-emerald-600">
                  <CheckCircle className="w-4 h-4" />
                  Saved
                </span>
              )}
            </div>
          </form>
        )}

        {tab === "notifications" && (
          <div className="space-y-4">
            {NOTIF_OPTIONS.map(({ id, label, desc }) => {
              const checked = notifs[id as keyof typeof notifs];
              return (
                <div
                  key={id}
                  className="flex items-start justify-between gap-4 p-4 rounded-xl border border-border bg-card"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotifs((n) => ({ ...n, [id]: !n[id as keyof typeof notifs] }))}
                    className={`relative shrink-0 w-10 h-5.5 rounded-full transition-colors focus:outline-none ${
                      checked ? "bg-primary" : "bg-muted"
                    }`}
                    style={{ height: 22, width: 40 }}
                    role="switch"
                    aria-checked={checked}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                        checked ? "translate-x-[18px]" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {tab === "privacy" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-5 space-y-4">
              <h3 className="font-semibold text-foreground">Your data</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                InsightBlood stores your lab data encrypted at rest. We never sell or share your health data with third parties. You can export or delete your data at any time.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" className="text-sm">
                  Export all data (JSON)
                </Button>
                <Button variant="outline" size="sm" className="text-sm">
                  Download PDF report
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
              <div className="flex items-start gap-3">
                <Trash2 className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-900 mb-1">Delete account</h3>
                  <p className="text-sm text-red-700 mb-4">
                    Permanently deletes your account and all associated lab data. This action cannot be undone.
                  </p>
                  <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-100 hover:text-red-800">
                    Delete my account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
