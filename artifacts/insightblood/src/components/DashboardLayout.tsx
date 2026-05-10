import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Upload,
  Activity,
  MessageSquare,
  Settings,
  LogOut,
  Droplets,
  Menu,
  Lock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview", premiumOnly: false },
  { href: "/dashboard/upload", icon: Upload, label: "Upload Labs", premiumOnly: false },
  { href: "/dashboard/markers", icon: Activity, label: "All Markers", premiumOnly: false },
  { href: "/dashboard/coach", icon: MessageSquare, label: "AI Coach", premiumOnly: true },
  { href: "/dashboard/settings", icon: Settings, label: "Settings", premiumOnly: false },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [location, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() ?? "?";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-[18px] border-b border-border/50">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <Droplets className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-semibold text-foreground text-sm">InsightBlood</span>
        {user?.plan === "premium" && (
          <Badge className="ml-auto text-[10px] px-1.5 bg-amber-100 text-amber-800 border-amber-200 font-semibold">
            Premium
          </Badge>
        )}
      </div>

      <nav className="flex-1 px-2 py-4 space-y-0.5">
        {navItems.map(({ href, icon: Icon, label, premiumOnly }) => {
          const isActive =
            location === href || (href !== "/dashboard" && location.startsWith(href));
          const locked = premiumOnly && user?.plan === "free";

          return (
            <Link
              key={href}
              href={locked ? "/dashboard/settings?tab=billing" : href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {locked && <Lock className="w-3 h-3 text-amber-500 shrink-0" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-2 py-4 border-t border-border/50">
        <div className="flex items-center gap-2.5 px-3 py-2 mb-1">
          <Avatar className="w-7 h-7 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">{user?.name}</p>
            <p className="text-[11px] text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden md:flex w-56 border-r border-border/50 flex-col bg-card shrink-0 fixed top-0 bottom-0 left-0">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-56 bg-card border-r border-border/50 z-10">
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 md:ml-56">
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card sticky top-0 z-30">
          <button onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground text-sm">InsightBlood</span>
          </div>
          <Link href="/dashboard/settings?tab=profile" aria-label="Open profile settings">
            <Avatar className="w-7 h-7">
              <AvatarFallback className="bg-primary/10 text-primary text-[11px] font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Link>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
