import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MARKERS, getRiskColor, getRiskDot, getTrendColor, getTrendIcon, type RiskLevel } from "@/lib/mockData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { Search, X, BookOpen, ChevronDown, ChevronUp, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["All", "Cardiovascular", "Metabolic", "Inflammation", "Hormonal", "Nutrition"];
const RISK_FILTERS: { label: string; value: RiskLevel | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Optimal", value: "optimal" },
  { label: "Borderline", value: "borderline" },
  { label: "Elevated", value: "elevated" },
];

function MarkerDetail({ marker, onClose }: { marker: typeof MARKERS[0]; onClose: () => void }) {
  const riskLineColor =
    marker.risk === "optimal" ? "#059669" : marker.risk === "borderline" ? "#d97706" : "#ea580c";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-t-2xl sm:rounded-2xl border border-border w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-card border-b border-border/50 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h3 className="font-serif font-bold text-foreground">{marker.name}</h3>
            <p className="text-xs text-muted-foreground">{marker.category}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={`text-xs border ${getRiskColor(marker.risk)}`}>
              <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${getRiskDot(marker.risk)}`} />
              {marker.risk}
            </Badge>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-muted/50 p-3 text-center">
              <p className="text-2xl font-bold text-foreground">{marker.current}</p>
              <p className="text-xs text-muted-foreground">{marker.unit}</p>
              <p className="text-[11px] font-semibold text-muted-foreground mt-1">Current</p>
            </div>
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-center">
              <p className="text-sm font-bold text-emerald-700">
                {marker.optimal.min > 0 ? `${marker.optimal.min}–` : "< "}{marker.optimal.max === 999 ? "∞" : marker.optimal.max}
              </p>
              <p className="text-xs text-emerald-600">{marker.unit}</p>
              <p className="text-[11px] font-semibold text-emerald-700 mt-1">Optimal range</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-3 text-center">
              <p className={`text-sm font-bold ${getTrendColor(marker.trend)}`}>
                {getTrendIcon(marker.trend)} {marker.trend}
              </p>
              <p className="text-[11px] font-semibold text-muted-foreground mt-1">Trend</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Longitudinal trend</p>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={marker.history} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                  formatter={(v: number) => [`${v} ${marker.unit}`, marker.shortName]}
                />
                {marker.optimal.max < 999 && (
                  <ReferenceLine y={marker.optimal.max} stroke="#059669" strokeDasharray="4 2" label={{ value: "Optimal", position: "insideTopRight", fontSize: 10, fill: "#059669" }} />
                )}
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={riskLineColor}
                  strokeWidth={2}
                  dot={{ fill: riskLineColor, r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Interpretation</p>
            <p className="text-sm text-foreground/85 leading-relaxed">{marker.interpretation}</p>
          </div>

          {marker.pubmedIds.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Evidence</p>
              <div className="flex flex-wrap gap-2">
                {marker.pubmedIds.map((id) => (
                  <a
                    key={id}
                    href={`https://pubmed.ncbi.nlm.nih.gov/${id}/`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full hover:bg-primary/20 transition-colors"
                  >
                    <BookOpen className="w-3 h-3" />
                    PMID {id}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardMarkers() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "all">("all");
  const [selected, setSelected] = useState<typeof MARKERS[0] | null>(null);

  const filtered = MARKERS.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.shortName.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || m.category === category;
    const matchRisk = riskFilter === "all" || m.risk === riskFilter;
    return matchSearch && matchCat && matchRisk;
  });
  const desktopColumnLayout = "sm:grid-cols-[minmax(0,1fr)_5.5rem_6.5rem_7rem_6.5rem]";
  const mobileColumnLayout = "grid-cols-[minmax(0,1fr)_6.25rem_5.5rem]";

  return (
    <DashboardLayout>
      <div className="px-6 py-8 max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-serif font-bold text-foreground mb-1">All markers</h1>
          <p className="text-muted-foreground text-sm">{MARKERS.length} tracked markers · click any row to see trend & interpretation</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search markers…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 text-sm"
            />
          </div>

          <div className="flex gap-1.5 flex-wrap">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  category === c
                    ? "bg-primary text-white border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex gap-1.5">
            {RISK_FILTERS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setRiskFilter(value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  riskFilter === value
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div
            className={`grid ${mobileColumnLayout} ${desktopColumnLayout} gap-px text-xs font-semibold uppercase tracking-wide text-muted-foreground bg-muted/50 border-b border-border`}
          >
            <div className="bg-muted/40 px-4 py-3">Marker</div>
            <div className="bg-muted/40 px-4 py-3 text-right">Current</div>
            <div className="bg-muted/40 px-4 py-3 text-center hidden sm:block">Optimal</div>
            <div className="bg-muted/40 px-4 py-3 text-center">Risk</div>
            <div className="bg-muted/40 px-4 py-3 text-center hidden sm:block">Trend</div>
          </div>

          {filtered.length === 0 ? (
            <div className="px-4 py-12 text-center text-muted-foreground text-sm">
              No markers match your filters.
            </div>
          ) : (
            filtered.map((marker, i) => (
              <button
                key={marker.id}
                onClick={() => setSelected(marker)}
                className={`w-full grid ${mobileColumnLayout} ${desktopColumnLayout} items-center text-left hover:bg-muted/30 transition-colors ${
                  i < filtered.length - 1 ? "border-b border-border/50" : ""
                }`}
                data-testid={`marker-row-${marker.id}`}
              >
                <div className="px-4 py-3.5">
                  <p className="text-sm font-semibold text-foreground">{marker.shortName}</p>
                  <p className="text-xs text-muted-foreground">{marker.category}</p>
                </div>
                <div className="px-4 py-3.5 text-right">
                  <p className="text-sm font-bold text-foreground">{marker.current}</p>
                  <p className="text-[11px] text-muted-foreground">{marker.unit}</p>
                </div>
                <div className="px-4 py-3.5 text-center text-xs text-muted-foreground hidden sm:block">
                  {marker.optimal.min > 0 ? `${marker.optimal.min}–` : "< "}
                  {marker.optimal.max === 999 ? "high" : marker.optimal.max}
                </div>
                <div className="px-4 py-3.5 text-center">
                  <Badge className={`text-[10px] border ${getRiskColor(marker.risk)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-1 ${getRiskDot(marker.risk)}`} />
                    <span className="hidden sm:inline">{marker.risk}</span>
                  </Badge>
                </div>
                <div className={`px-4 py-3.5 text-center text-xs font-medium hidden sm:block ${getTrendColor(marker.trend)}`}>
                  {getTrendIcon(marker.trend)} {marker.trend}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {selected && <MarkerDetail marker={selected} onClose={() => setSelected(null)} />}
    </DashboardLayout>
  );
}
