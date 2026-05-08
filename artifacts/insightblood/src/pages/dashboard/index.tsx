import { Link } from "wouter";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MARKERS, UPLOADS, getRiskColor, getRiskDot, getTrendColor, getTrendIcon } from "@/lib/mockData";
import {
  Upload,
  TrendingUp,
  Activity,
  AlertCircle,
  ArrowRight,
  Calendar,
  ChevronRight,
  Zap,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
} from "recharts";

const OVERVIEW_MARKERS = MARKERS.slice(0, 6);

const riskCounts = {
  optimal: MARKERS.filter((m) => m.risk === "optimal").length,
  borderline: MARKERS.filter((m) => m.risk === "borderline").length,
  elevated: MARKERS.filter((m) => m.risk === "elevated" || m.risk === "high").length,
};

function SparkLine({ data, risk }: { data: { value: number }[]; risk: string }) {
  const color =
    risk === "optimal" ? "#059669" : risk === "borderline" ? "#d97706" : "#ea580c";
  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
        />
        <Tooltip
          contentStyle={{ display: "none" }}
          cursor={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default function DashboardOverview() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] ?? "there";
  const lastUpload = UPLOADS[0];

  return (
    <DashboardLayout>
      <div className="px-6 py-8 max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-serif font-bold text-foreground mb-1">
              Good morning, {firstName}
            </h1>
            <p className="text-muted-foreground text-sm flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Last upload: {lastUpload.date} · {lastUpload.lab}
            </p>
          </div>
          <Link href="/dashboard/upload">
            <Button className="bg-primary hover:bg-primary/90 text-white shrink-0" data-testid="upload-cta">
              <Upload className="w-4 h-4 mr-2" />
              Upload latest labs
            </Button>
          </Link>
        </div>

        {user?.plan === "free" && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-center gap-3">
            <Zap className="w-4 h-4 text-amber-600 shrink-0" />
            <p className="text-sm text-amber-800 flex-1">
              You're on the Free plan — you can see your 2 most recent tests. Upgrade to unlock full history and the AI Coach.
            </p>
            <Link href="/checkout">
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white shrink-0 text-xs">
                Upgrade · $50/yr
              </Button>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Markers tracked", value: MARKERS.length, icon: Activity, color: "text-primary" },
            { label: "Optimal", value: riskCounts.optimal, icon: TrendingUp, color: "text-emerald-600" },
            { label: "Need attention", value: riskCounts.borderline, icon: AlertCircle, color: "text-amber-600" },
            { label: "Total uploads", value: UPLOADS.length, icon: Upload, color: "text-blue-600" },
          ].map(({ label, value, icon: Icon, color }) => (
            <Card key={label} className="border-border/50">
              <CardContent className="p-4">
                <div className={`w-8 h-8 rounded-lg bg-current/10 flex items-center justify-center mb-3 ${color}`} style={{ backgroundColor: "transparent" }}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <p className="text-2xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Key markers</h2>
            <Link href="/dashboard/markers" className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
              View all {MARKERS.length} <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {OVERVIEW_MARKERS.map((marker) => (
              <Link key={marker.id} href={`/dashboard/markers`} className="block rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-sm transition-all group">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{marker.shortName}</p>
                      <p className="text-xs text-muted-foreground">{marker.category}</p>
                    </div>
                    <Badge className={`text-[10px] border ${getRiskColor(marker.risk)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1 ${getRiskDot(marker.risk)}`} />
                      {marker.risk}
                    </Badge>
                  </div>
                  <SparkLine data={marker.history} risk={marker.risk} />
                  <div className="flex items-end justify-between mt-2">
                    <p className="text-xl font-bold text-foreground">
                      {marker.current}
                      <span className="text-xs font-normal text-muted-foreground ml-1">{marker.unit}</span>
                    </p>
                    <span className={`text-xs font-medium ${getTrendColor(marker.trend)}`}>
                      {getTrendIcon(marker.trend)} {marker.trend}
                    </span>
                  </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Recent uploads</h2>
          </div>
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            {UPLOADS.slice(0, 4).map((upload, i) => (
              <div
                key={upload.id}
                className={`flex items-center gap-4 px-4 py-3 ${
                  i < 3 ? "border-b border-border/50" : ""
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Upload className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{upload.lab}</p>
                  <p className="text-xs text-muted-foreground">{upload.date} · {upload.markers} markers · {upload.source}</p>
                </div>
                {i === 0 && (
                  <Badge className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">Latest</Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
