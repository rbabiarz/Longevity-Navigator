import { useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UPLOADS } from "@/lib/mockData";
import {
  Upload,
  FileText,
  PenLine,
  Plug,
  CheckCircle,
  ArrowRight,
  CloudUpload,
  X,
  Loader2,
} from "lucide-react";

type Step = "choose" | "upload" | "processing" | "done";
type Source = "pdf" | "manual" | "connector";

const CONNECTORS = [
  { id: "quest", name: "Quest Diagnostics", status: "available" },
  { id: "labcorp", name: "Labcorp", status: "available" },
  { id: "boston", name: "Boston Heart", status: "coming_soon" },
  { id: "natera", name: "Natera", status: "coming_soon" },
];

const PARSED_PREVIEW = [
  { name: "ApoB", value: "82", unit: "mg/dL", status: "mapped" },
  { name: "LDL-C", value: "98", unit: "mg/dL", status: "mapped" },
  { name: "HDL-C", value: "58", unit: "mg/dL", status: "mapped" },
  { name: "Triglycerides", value: "88", unit: "mg/dL", status: "mapped" },
  { name: "HbA1c", value: "5.4", unit: "%", status: "mapped" },
  { name: "Fasting Glucose", value: "91", unit: "mg/dL", status: "mapped" },
  { name: "hsCRP", value: "0.4", unit: "mg/L", status: "mapped" },
  { name: "Ferritin", value: "145", unit: "ng/mL", status: "mapped" },
  { name: "Vitamin D", value: "42", unit: "ng/mL", status: "mapped" },
  { name: "TSH", value: "2.1", unit: "mIU/L", status: "mapped" },
  { name: "Total Testosterone", value: "612", unit: "ng/dL", status: "mapped" },
  { name: "Homocysteine", value: "12.4", unit: "µmol/L", status: "mapped" },
];

export default function DashboardUpload() {
  const [step, setStep] = useState<Step>("choose");
  const [source, setSource] = useState<Source | null>(null);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();

  const selectSource = (s: Source) => {
    setSource(s);
    setStep("upload");
  };

  const handleFile = (f: File) => {
    setFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const startProcessing = async () => {
    setStep("processing");
    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 60));
      setProgress(i);
    }
    setTimeout(() => setStep("done"), 300);
  };

  return (
    <DashboardLayout>
      <div className="px-6 py-8 max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-serif font-bold text-foreground mb-1">Upload lab results</h1>
          <p className="text-muted-foreground text-sm">Add your blood work — PDF, manual entry, or a connected lab.</p>
        </div>

        <div className="flex items-center gap-2 mb-8">
          {(["choose", "upload", "processing", "done"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step === s
                    ? "bg-primary text-white"
                    : ["upload", "processing", "done"].indexOf(step) > ["choose", "upload", "processing", "done"].indexOf(s)
                    ? "bg-emerald-500 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {["upload", "processing", "done"].indexOf(step) > i ? (
                  <CheckCircle className="w-3.5 h-3.5" />
                ) : (
                  i + 1
                )}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${step === s ? "text-foreground" : "text-muted-foreground"}`}>
                {s === "choose" ? "Source" : s === "upload" ? "Upload" : s === "processing" ? "Parsing" : "Done"}
              </span>
              {i < 3 && <div className="w-6 h-px bg-border" />}
            </div>
          ))}
        </div>

        {step === "choose" && (
          <div className="space-y-3">
            <button
              onClick={() => selectSource("pdf")}
              className="w-full flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-sm transition-all text-left group"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Upload a PDF or image</p>
                <p className="text-sm text-muted-foreground">Drag in your lab report — we'll parse and map every marker automatically.</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </button>

            <button
              onClick={() => selectSource("manual")}
              className="w-full flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-sm transition-all text-left group"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <PenLine className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Enter values manually</p>
                <p className="text-sm text-muted-foreground">Type in results from a printed report or patient portal screenshot.</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </button>

            <button
              onClick={() => selectSource("connector")}
              className="w-full flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-sm transition-all text-left group"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <Plug className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Connect a lab directly</p>
                <p className="text-sm text-muted-foreground">Link Quest, Labcorp, or Boston Heart for automatic syncing on every new result.</p>
              </div>
              <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[10px] shrink-0">Premium</Badge>
            </button>
          </div>
        )}

        {step === "upload" && source === "pdf" && (
          <div>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                dragging ? "border-primary bg-primary/5" : file ? "border-emerald-400 bg-emerald-50" : "border-border hover:border-primary/50 hover:bg-muted/30"
              }`}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
              {file ? (
                <div className="flex flex-col items-center gap-3">
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                  <p className="font-semibold text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</p>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Remove
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <CloudUpload className="w-10 h-10 text-muted-foreground" />
                  <p className="font-semibold text-foreground">Drop your PDF here or click to browse</p>
                  <p className="text-sm text-muted-foreground">PDF or image · Max 20 MB</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => { setStep("choose"); setFile(null); }}>
                Back
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 text-white flex-1"
                disabled={!file}
                onClick={startProcessing}
                data-testid="upload-analyze"
              >
                Analyze {file ? `"${file.name}"` : "PDF"}
              </Button>
            </div>
          </div>
        )}

        {step === "upload" && source === "manual" && (
          <div>
            <div className="rounded-xl border border-border bg-card overflow-hidden mb-6">
              <div className="grid grid-cols-3 gap-px bg-border text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <div className="bg-muted/50 px-4 py-2.5">Marker</div>
                <div className="bg-muted/50 px-4 py-2.5">Value</div>
                <div className="bg-muted/50 px-4 py-2.5">Unit</div>
              </div>
              {["ApoB", "LDL-C", "HDL-C", "Triglycerides", "HbA1c", "Fasting Glucose"].map((marker) => (
                <div key={marker} className="grid grid-cols-3 gap-px bg-border">
                  <div className="bg-card px-4 py-3 text-sm text-foreground flex items-center">{marker}</div>
                  <div className="bg-card px-3 py-2">
                    <input
                      type="number"
                      step="0.1"
                      placeholder="—"
                      className="w-full text-sm bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="bg-card px-4 py-3 text-xs text-muted-foreground flex items-center">
                    {marker === "HbA1c" ? "%" : marker === "Glucose" ? "mg/dL" : "mg/dL"}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("choose")}>Back</Button>
              <Button className="bg-primary hover:bg-primary/90 text-white flex-1" onClick={startProcessing}>
                Save & analyze
              </Button>
            </div>
          </div>
        )}

        {step === "upload" && source === "connector" && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">Connect your lab account — new results will sync automatically.</p>
            {CONNECTORS.map((c) => (
              <div
                key={c.id}
                className={`flex items-center gap-4 p-4 rounded-xl border bg-card ${
                  c.status === "available" ? "border-border hover:border-primary/40 cursor-pointer" : "border-border opacity-50"
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                  <Plug className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{c.name}</p>
                </div>
                {c.status === "available" ? (
                  <Button size="sm" className="bg-primary text-white text-xs">Connect</Button>
                ) : (
                  <Badge className="text-[10px] border-border text-muted-foreground bg-muted">Soon</Badge>
                )}
              </div>
            ))}
            <Button variant="outline" className="mt-4" onClick={() => setStep("choose")}>Back</Button>
          </div>
        )}

        {step === "processing" && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <h2 className="font-serif font-semibold text-xl text-foreground mb-2">Parsing your results…</h2>
            <p className="text-sm text-muted-foreground mb-6">Extracting values, matching markers, checking references.</p>
            <div className="max-w-sm mx-auto bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{progress}%</p>
          </div>
        )}

        {step === "done" && (
          <div>
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-emerald-600" />
              </div>
              <h2 className="font-serif font-semibold text-xl text-foreground mb-1">
                {PARSED_PREVIEW.length} markers extracted
              </h2>
              <p className="text-sm text-muted-foreground">All values mapped and integrated into your longitudinal history.</p>
            </div>

            <div className="rounded-xl border border-border bg-card overflow-hidden mb-6">
              <div className="grid grid-cols-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground bg-muted/50 border-b border-border">
                <div className="px-4 py-2.5">Marker</div>
                <div className="px-4 py-2.5">Value</div>
                <div className="px-4 py-2.5">Status</div>
              </div>
              {PARSED_PREVIEW.map((row, i) => (
                <div
                  key={row.name}
                  className={`grid grid-cols-3 ${i < PARSED_PREVIEW.length - 1 ? "border-b border-border/50" : ""}`}
                >
                  <div className="px-4 py-3 text-sm font-medium text-foreground">{row.name}</div>
                  <div className="px-4 py-3 text-sm text-foreground">
                    {row.value} <span className="text-muted-foreground text-xs">{row.unit}</span>
                  </div>
                  <div className="px-4 py-3">
                    <Badge className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">
                      <CheckCircle className="w-2.5 h-2.5 mr-1" />
                      Mapped
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => { setStep("choose"); setFile(null); setProgress(0); }}
                className="flex-1"
              >
                Upload another
              </Button>
              <Link href="/dashboard/markers" className="flex-1">
                <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                  View updated insights <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {step === "choose" && (
          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Recent uploads</p>
            <div className="space-y-2">
              {UPLOADS.slice(0, 3).map((u) => (
                <div key={u.id} className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-card">
                  <Upload className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{u.lab}</p>
                    <p className="text-xs text-muted-foreground">{u.date} · {u.markers} markers</p>
                  </div>
                  <Badge className="text-[10px]">{u.source}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
