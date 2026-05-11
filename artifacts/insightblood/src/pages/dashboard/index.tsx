import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { MarkerDetail } from "@/pages/dashboard/markers";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  EyeOff,
  Eye,
  Trash2,
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
type OverviewFilter = "tracked" | "optimal" | "attention" | "uploads";

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
  const [uploads, setUploads] = useState(() => UPLOADS.map((upload) => ({ ...upload, hiddenFromTrends: false })));
  const [selectedUploadIds, setSelectedUploadIds] = useState<string[]>([]);
  const [showHiddenUploads, setShowHiddenUploads] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTargetIds, setDeleteTargetIds] = useState<string[]>([]);
  const lastUpload = uploads[0];
  const [activeFilter, setActiveFilter] = useState<OverviewFilter>("tracked");
  const [selectedMarker, setSelectedMarker] = useState<typeof MARKERS[0] | null>(null);
  const statCards: {
    key: OverviewFilter;
    label: string;
    value: number;
    icon: typeof Activity;
    color: string;
  }[] = [
    { key: "tracked", label: "Markers tracked", value: MARKERS.length, icon: Activity, color: "text-primary" },
    { key: "optimal", label: "Optimal", value: riskCounts.optimal, icon: TrendingUp, color: "text-emerald-600" },
    { key: "attention", label: "Need attention", value: riskCounts.borderline + riskCounts.elevated, icon: AlertCircle, color: "text-amber-600" },
    { key: "uploads", label: "Total uploads", value: uploads.length, icon: Upload, color: "text-blue-600" },
  ];
  const filteredOverviewMarkers = MARKERS.filter((marker) => {
    if (activeFilter === "optimal") return marker.risk === "optimal";
    if (activeFilter === "attention") return marker.risk !== "optimal";
    return true;
  }).slice(0, 6);
  const nonHiddenUploads = uploads.filter((upload) => !upload.hiddenFromTrends);
  const uploadsForList = showHiddenUploads ? uploads : nonHiddenUploads;
  const visibleUploads = activeFilter === "uploads" ? uploadsForList : uploadsForList.slice(0, 4);
  const hiddenUploadsCount = uploads.length - nonHiddenUploads.length;
  const selectedCount = selectedUploadIds.length;
  const toggleUploadSelection = (uploadId: string) => {
    setSelectedUploadIds((prev) =>
      prev.includes(uploadId) ? prev.filter((id) => id !== uploadId) : [...prev, uploadId],
    );
  };
  const hideSelectedUploads = () => {
    if (selectedUploadIds.length === 0) return;
    setUploads((prev) =>
      prev.map((upload) =>
        selectedUploadIds.includes(upload.id) ? { ...upload, hiddenFromTrends: true } : upload,
      ),
    );
    setSelectedUploadIds([]);
  };
  const unhideSelectedUploads = () => {
    if (selectedUploadIds.length === 0) return;
    setUploads((prev) =>
      prev.map((upload) =>
        selectedUploadIds.includes(upload.id) ? { ...upload, hiddenFromTrends: false } : upload,
      ),
    );
    setSelectedUploadIds([]);
  };
  const requestDeleteUploads = (uploadIds: string[]) => {
    if (uploadIds.length === 0) return;
    setDeleteTargetIds(uploadIds);
    setDeleteDialogOpen(true);
  };
  const confirmDeleteUploads = () => {
    if (deleteTargetIds.length === 0) return;
    setUploads((prev) => prev.filter((upload) => !deleteTargetIds.includes(upload.id)));
    setSelectedUploadIds([]);
    setDeleteTargetIds([]);
    setDeleteDialogOpen(false);
  };
  const hideUpload = (uploadId: string) => {
    setUploads((prev) =>
      prev.map((upload) => (upload.id === uploadId ? { ...upload, hiddenFromTrends: true } : upload)),
    );
    setSelectedUploadIds((prev) => prev.filter((id) => id !== uploadId));
  };
  const unhideUpload = (uploadId: string) => {
    setUploads((prev) =>
      prev.map((upload) => (upload.id === uploadId ? { ...upload, hiddenFromTrends: false } : upload)),
    );
    setSelectedUploadIds((prev) => prev.filter((id) => id !== uploadId));
  };
  const deleteUpload = (uploadId: string) => {
    requestDeleteUploads([uploadId]);
  };
  const keyMarkersTitle =
    activeFilter === "optimal"
      ? "Key markers · Optimal"
      : activeFilter === "attention"
        ? "Key markers · Need attention"
        : "Key markers";

  return (
    <>
    <DashboardLayout>
      <div className="px-6 py-8 max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-serif font-bold text-foreground mb-1">
              Good morning, {firstName}
            </h1>
            <p className="text-muted-foreground text-sm flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Last upload: {lastUpload ? `${lastUpload.date} · ${lastUpload.lab}` : "No uploads yet"}
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
          {statCards.map(({ key, label, value, icon: Icon, color }) => (
            <button
              key={label}
              type="button"
              onClick={() => setActiveFilter(key)}
              aria-pressed={activeFilter === key}
              className="text-left rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              data-testid={`overview-filter-${key}`}
            >
              <Card className={`border-border/50 transition-all ${activeFilter === key ? "border-primary/60 shadow-sm bg-primary/5" : "hover:border-primary/30"}`}>
              <CardContent className="p-4">
                <div className={`w-8 h-8 rounded-lg bg-current/10 flex items-center justify-center mb-3 ${color}`} style={{ backgroundColor: "transparent" }}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <p className="text-2xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              </CardContent>
            </Card>
            </button>
          ))}
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">{keyMarkersTitle}</h2>
            <Link href="/dashboard/markers" className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
              View all {MARKERS.length} <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {filteredOverviewMarkers.length === 0 ? (
            <div className="rounded-xl border border-border bg-card px-4 py-6 text-sm text-muted-foreground">
              No markers match this filter yet.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredOverviewMarkers.map((marker) => (
              <button key={marker.id} onClick={() => setSelectedMarker(marker)} className="text-left block w-full rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-sm transition-all group">
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
              </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Recent uploads</h2>
            {hiddenUploadsCount > 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setShowHiddenUploads((prev) => !prev)}
              >
                {showHiddenUploads ? "Hide hidden uploads" : `Show hidden uploads (${hiddenUploadsCount})`}
              </Button>
            )}
          </div>
          {selectedCount > 0 && (
            <div className="mb-3 rounded-lg border border-border bg-muted/30 px-3 py-2 flex flex-wrap items-center gap-2">
              <p className="text-xs text-muted-foreground mr-2">{selectedCount} selected</p>
              <Button type="button" size="sm" variant="outline" className="h-7 text-xs" onClick={hideSelectedUploads}>
                <EyeOff className="w-3.5 h-3.5 mr-1.5" />
                Hide from trends
              </Button>
              <Button type="button" size="sm" variant="outline" className="h-7 text-xs" onClick={unhideSelectedUploads}>
                <Eye className="w-3.5 h-3.5 mr-1.5" />
                Unhide
              </Button>
              <Button type="button" size="sm" variant="outline" className="h-7 text-xs text-red-600 hover:text-red-700" onClick={() => requestDeleteUploads(selectedUploadIds)}>
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                Delete
              </Button>
              <Button type="button" size="sm" variant="ghost" className="h-7 text-xs ml-auto" onClick={() => setSelectedUploadIds([])}>
                Clear
              </Button>
            </div>
          )}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            {visibleUploads.length === 0 ? (
              <div className="px-4 py-6 text-sm text-muted-foreground">
                {uploads.length === 0 ? "No uploads available." : "No uploads visible for this view."}
              </div>
            ) : (
              visibleUploads.map((upload, i) => (
                <div
                  key={upload.id}
                  className={`flex items-center gap-3 px-4 py-3 ${
                    i < visibleUploads.length - 1 ? "border-b border-border/50" : ""
                  } ${selectedUploadIds.includes(upload.id) ? "bg-primary/5" : ""}`}
                >
                  <input
                    type="checkbox"
                    aria-label={`Select upload ${upload.lab} ${upload.date}`}
                    checked={selectedUploadIds.includes(upload.id)}
                    onChange={() => toggleUploadSelection(upload.id)}
                    className="h-4 w-4 rounded border-border text-primary"
                  />
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Upload className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{upload.lab}</p>
                    <p className="text-xs text-muted-foreground">
                      {upload.date} · {upload.markers} markers · {upload.source}
                      {upload.hiddenFromTrends && " · hidden from trends"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {upload.hiddenFromTrends ? (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={() => unhideUpload(upload.id)}
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        Unhide
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={() => hideUpload(upload.id)}
                      >
                        <EyeOff className="w-3.5 h-3.5 mr-1" />
                        Hide
                      </Button>
                    )}
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs text-red-600 hover:text-red-700"
                      onClick={() => deleteUpload(upload.id)}
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1" />
                      Delete
                    </Button>
                  </div>
                  {i === 0 && (
                    <Badge className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">Latest</Badge>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open);
          if (!open) setDeleteTargetIds([]);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {deleteTargetIds.length > 1 ? `Delete ${deleteTargetIds.length} uploads?` : "Delete upload?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTargetIds.length > 1
                ? "These uploads will be removed from your history and trends. This action cannot be undone."
                : "This upload will be removed from your history and trends. This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 focus-visible:ring-red-500"
              onClick={confirmDeleteUploads}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
    {selectedMarker && <MarkerDetail marker={selectedMarker} onClose={() => setSelectedMarker(null)} />}
    </>
  );
}
