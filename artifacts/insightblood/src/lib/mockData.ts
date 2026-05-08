export type RiskLevel = "optimal" | "borderline" | "elevated" | "high";

export interface MarkerPoint {
  date: string;
  value: number;
  lab: string;
}

export interface Marker {
  id: string;
  name: string;
  shortName: string;
  category: string;
  unit: string;
  current: number;
  optimal: { min: number; max: number };
  labRange: { min: number; max: number };
  risk: RiskLevel;
  trend: "improving" | "stable" | "worsening";
  history: MarkerPoint[];
  interpretation: string;
  pubmedIds: string[];
}

export const MARKERS: Marker[] = [
  {
    id: "apob",
    name: "Apolipoprotein B",
    shortName: "ApoB",
    category: "Cardiovascular",
    unit: "mg/dL",
    current: 82,
    optimal: { min: 0, max: 80 },
    labRange: { min: 0, max: 130 },
    risk: "borderline",
    trend: "improving",
    history: [
      { date: "Jan '23", value: 108, lab: "Quest" },
      { date: "Jun '23", value: 104, lab: "Quest" },
      { date: "Dec '23", value: 99, lab: "Labcorp" },
      { date: "May '24", value: 95, lab: "Boston Heart" },
      { date: "Nov '24", value: 89, lab: "Quest" },
      { date: "Mar '25", value: 82, lab: "Quest" },
    ],
    interpretation:
      "Your ApoB has fallen 24% over two years — a meaningful, sustained reduction. At 82 mg/dL you remain just above the longevity-optimal threshold of 80. Continued progress with your current dietary approach is warranted.",
    pubmedIds: ["31475782", "35862527"],
  },
  {
    id: "ldl",
    name: "LDL Cholesterol",
    shortName: "LDL-C",
    category: "Cardiovascular",
    unit: "mg/dL",
    current: 98,
    optimal: { min: 0, max: 100 },
    labRange: { min: 0, max: 160 },
    risk: "optimal",
    trend: "stable",
    history: [
      { date: "Jan '23", value: 128, lab: "Quest" },
      { date: "Jun '23", value: 122, lab: "Quest" },
      { date: "Dec '23", value: 114, lab: "Labcorp" },
      { date: "May '24", value: 108, lab: "Boston Heart" },
      { date: "Nov '24", value: 103, lab: "Quest" },
      { date: "Mar '25", value: 98, lab: "Quest" },
    ],
    interpretation:
      "LDL-C is within optimal range. Note that ApoB remains a superior predictor of cardiovascular risk — continue tracking both.",
    pubmedIds: ["31475782"],
  },
  {
    id: "hdl",
    name: "HDL Cholesterol",
    shortName: "HDL-C",
    category: "Cardiovascular",
    unit: "mg/dL",
    current: 58,
    optimal: { min: 50, max: 999 },
    labRange: { min: 40, max: 999 },
    risk: "optimal",
    trend: "improving",
    history: [
      { date: "Jan '23", value: 46, lab: "Quest" },
      { date: "Jun '23", value: 49, lab: "Quest" },
      { date: "Dec '23", value: 52, lab: "Labcorp" },
      { date: "May '24", value: 55, lab: "Boston Heart" },
      { date: "Nov '24", value: 57, lab: "Quest" },
      { date: "Mar '25", value: 58, lab: "Quest" },
    ],
    interpretation:
      "HDL has risen steadily, likely driven by your zone-2 training. At 58 mg/dL you are in the optimal range for cardiovascular protection.",
    pubmedIds: ["29420224"],
  },
  {
    id: "trig",
    name: "Triglycerides",
    shortName: "TG",
    category: "Cardiovascular",
    unit: "mg/dL",
    current: 88,
    optimal: { min: 0, max: 100 },
    labRange: { min: 0, max: 150 },
    risk: "optimal",
    trend: "stable",
    history: [
      { date: "Jan '23", value: 142, lab: "Quest" },
      { date: "Jun '23", value: 128, lab: "Quest" },
      { date: "Dec '23", value: 112, lab: "Labcorp" },
      { date: "May '24", value: 98, lab: "Boston Heart" },
      { date: "Nov '24", value: 92, lab: "Quest" },
      { date: "Mar '25", value: 88, lab: "Quest" },
    ],
    interpretation:
      "Excellent progress. Triglycerides have dropped 38% to 88 mg/dL — well within the optimal range. Dietary carbohydrate reduction and aerobic exercise appear to be the primary drivers.",
    pubmedIds: ["17023695"],
  },
  {
    id: "hba1c",
    name: "Hemoglobin A1c",
    shortName: "HbA1c",
    category: "Metabolic",
    unit: "%",
    current: 5.4,
    optimal: { min: 0, max: 5.4 },
    labRange: { min: 0, max: 5.7 },
    risk: "borderline",
    trend: "stable",
    history: [
      { date: "Jan '23", value: 5.7, lab: "Quest" },
      { date: "Jun '23", value: 5.6, lab: "Quest" },
      { date: "Dec '23", value: 5.5, lab: "Labcorp" },
      { date: "May '24", value: 5.5, lab: "Boston Heart" },
      { date: "Nov '24", value: 5.4, lab: "Quest" },
      { date: "Mar '25", value: 5.4, lab: "Quest" },
    ],
    interpretation:
      "HbA1c at 5.4% sits right at the longevity-optimal ceiling. Consistent with your recent fasting glucose results. Time-restricted eating or reducing refined carbohydrate intake could push this into the 5.0–5.2 range.",
    pubmedIds: ["26049583"],
  },
  {
    id: "glucose",
    name: "Fasting Glucose",
    shortName: "Glucose",
    category: "Metabolic",
    unit: "mg/dL",
    current: 91,
    optimal: { min: 70, max: 90 },
    labRange: { min: 70, max: 99 },
    risk: "borderline",
    trend: "stable",
    history: [
      { date: "Jan '23", value: 98, lab: "Quest" },
      { date: "Jun '23", value: 96, lab: "Quest" },
      { date: "Dec '23", value: 94, lab: "Labcorp" },
      { date: "May '24", value: 93, lab: "Boston Heart" },
      { date: "Nov '24", value: 92, lab: "Quest" },
      { date: "Mar '25", value: 91, lab: "Quest" },
    ],
    interpretation:
      "Fasting glucose is within the lab's normal range but slightly above the longevity-optimal ceiling of 90 mg/dL. Confirm fasting duration before drawing — even 10 hours vs 12 hours can shift this by 4–5 mg/dL.",
    pubmedIds: ["26049583", "24561712"],
  },
  {
    id: "hscrp",
    name: "High-Sensitivity CRP",
    shortName: "hsCRP",
    category: "Inflammation",
    unit: "mg/L",
    current: 0.4,
    optimal: { min: 0, max: 1.0 },
    labRange: { min: 0, max: 3.0 },
    risk: "optimal",
    trend: "improving",
    history: [
      { date: "Jan '23", value: 2.1, lab: "Quest" },
      { date: "Jun '23", value: 1.6, lab: "Quest" },
      { date: "Dec '23", value: 1.1, lab: "Labcorp" },
      { date: "May '24", value: 0.8, lab: "Boston Heart" },
      { date: "Nov '24", value: 0.6, lab: "Quest" },
      { date: "Mar '25", value: 0.4, lab: "Quest" },
    ],
    interpretation:
      "hsCRP has dropped from 2.1 to 0.4 mg/L — an 81% reduction in systemic inflammation. Your sleep optimization and omega-3 supplementation starting mid-2023 correlate strongly with this trend.",
    pubmedIds: ["12490960"],
  },
  {
    id: "vitd",
    name: "Vitamin D (25-OH)",
    shortName: "Vit D",
    category: "Hormonal",
    unit: "ng/mL",
    current: 42,
    optimal: { min: 40, max: 70 },
    labRange: { min: 30, max: 100 },
    risk: "optimal",
    trend: "improving",
    history: [
      { date: "Jan '23", value: 22, lab: "Quest" },
      { date: "Jun '23", value: 31, lab: "Quest" },
      { date: "Dec '23", value: 35, lab: "Labcorp" },
      { date: "May '24", value: 38, lab: "Boston Heart" },
      { date: "Nov '24", value: 40, lab: "Quest" },
      { date: "Mar '25", value: 42, lab: "Quest" },
    ],
    interpretation:
      "Vitamin D has finally reached optimal range after supplementation. Maintain 2,000–4,000 IU/day with K2 co-administration. Recheck in 6 months to confirm stability.",
    pubmedIds: ["20194581"],
  },
  {
    id: "ferritin",
    name: "Ferritin",
    shortName: "Ferritin",
    category: "Nutrition",
    unit: "ng/mL",
    current: 145,
    optimal: { min: 50, max: 150 },
    labRange: { min: 12, max: 300 },
    risk: "borderline",
    trend: "worsening",
    history: [
      { date: "Jan '23", value: 112, lab: "Quest" },
      { date: "Jun '23", value: 118, lab: "Quest" },
      { date: "Dec '23", value: 124, lab: "Labcorp" },
      { date: "May '24", value: 131, lab: "Boston Heart" },
      { date: "Nov '24", value: 138, lab: "Quest" },
      { date: "Mar '25", value: 145, lab: "Quest" },
    ],
    interpretation:
      "Ferritin is trending upward and approaching the longevity-optimal ceiling of 150 ng/mL. Elevated ferritin can signal iron overload or low-grade inflammation. Worth ruling out both — confirm with serum iron and TIBC, and re-check hsCRP.",
    pubmedIds: ["16354095"],
  },
  {
    id: "tsh",
    name: "Thyroid Stimulating Hormone",
    shortName: "TSH",
    category: "Hormonal",
    unit: "mIU/L",
    current: 2.1,
    optimal: { min: 1.0, max: 2.5 },
    labRange: { min: 0.4, max: 4.0 },
    risk: "optimal",
    trend: "stable",
    history: [
      { date: "Jan '23", value: 2.4, lab: "Quest" },
      { date: "Jun '23", value: 2.3, lab: "Quest" },
      { date: "Dec '23", value: 2.2, lab: "Labcorp" },
      { date: "May '24", value: 2.2, lab: "Boston Heart" },
      { date: "Nov '24", value: 2.1, lab: "Quest" },
      { date: "Mar '25", value: 2.1, lab: "Quest" },
    ],
    interpretation:
      "TSH is stable and within the longevity-optimal range. No thyroid concerns at this time. Continue annual monitoring.",
    pubmedIds: ["22442688"],
  },
  {
    id: "testosterone",
    name: "Total Testosterone",
    shortName: "Testosterone",
    category: "Hormonal",
    unit: "ng/dL",
    current: 612,
    optimal: { min: 500, max: 900 },
    labRange: { min: 264, max: 916 },
    risk: "optimal",
    trend: "stable",
    history: [
      { date: "Jan '23", value: 548, lab: "Quest" },
      { date: "Jun '23", value: 562, lab: "Quest" },
      { date: "Dec '23", value: 580, lab: "Labcorp" },
      { date: "May '24", value: 598, lab: "Boston Heart" },
      { date: "Nov '24", value: 608, lab: "Quest" },
      { date: "Mar '25", value: 612, lab: "Quest" },
    ],
    interpretation:
      "Total testosterone is solid and trending upward since you began resistance training. At 612 ng/dL you are well within optimal. Pair with free testosterone and SHBG for a complete picture.",
    pubmedIds: ["23412685"],
  },
  {
    id: "homocysteine",
    name: "Homocysteine",
    shortName: "Hcy",
    category: "Cardiovascular",
    unit: "µmol/L",
    current: 12.4,
    optimal: { min: 0, max: 9.0 },
    labRange: { min: 0, max: 15.0 },
    risk: "elevated",
    trend: "stable",
    history: [
      { date: "Jan '23", value: 14.2, lab: "Quest" },
      { date: "Jun '23", value: 13.8, lab: "Quest" },
      { date: "Dec '23", value: 13.1, lab: "Labcorp" },
      { date: "May '24", value: 12.8, lab: "Boston Heart" },
      { date: "Nov '24", value: 12.6, lab: "Quest" },
      { date: "Mar '25", value: 12.4, lab: "Quest" },
    ],
    interpretation:
      "Homocysteine remains elevated above the longevity-optimal ceiling of 9 µmol/L. This is a modifiable cardiovascular risk factor. Methylated B-vitamins (methyl-B12, methylfolate, B6) are the first-line intervention — consider adding them if not already supplementing.",
    pubmedIds: ["15003610", "11386066"],
  },
];

export const UPLOADS = [
  { id: "u1", date: "Mar 15, 2025", lab: "Quest Diagnostics", markers: 18, source: "PDF" },
  { id: "u2", date: "Nov 8, 2024", lab: "Quest Diagnostics", markers: 16, source: "PDF" },
  { id: "u3", date: "May 3, 2024", lab: "Boston Heart Diagnostics", markers: 22, source: "PDF" },
  { id: "u4", date: "Dec 12, 2023", lab: "Labcorp", markers: 14, source: "Manual" },
  { id: "u5", date: "Jun 20, 2023", lab: "Quest Diagnostics", markers: 18, source: "PDF" },
  { id: "u6", date: "Jan 9, 2023", lab: "Quest Diagnostics", markers: 17, source: "PDF" },
];

export const COACH_MESSAGES = [
  {
    role: "assistant" as const,
    text: "Hi Alex! I've reviewed your latest labs from March 2025. A few things stand out — want me to start with the good news or the areas to work on?",
    citations: [],
  },
  {
    role: "user" as const,
    text: "Let's start with what needs attention.",
    citations: [],
  },
  {
    role: "assistant" as const,
    text: "The main priority is your homocysteine at 12.4 µmol/L. It's been above 12 for two years and isn't moving fast enough. Elevated homocysteine is an independent cardiovascular risk factor — the mechanism is endothelial dysfunction via oxidative stress. The evidence strongly supports methylated B-vitamins as a first-line intervention: methyl-B12 (1,000 mcg/day), methylfolate (400–800 mcg/day), and B6 (25–50 mg/day). Do you know your MTHFR status?",
    citations: ["PMID 15003610", "PMID 11386066"],
  },
  {
    role: "user" as const,
    text: "I haven't tested MTHFR. Should I?",
    citations: [],
  },
  {
    role: "assistant" as const,
    text: "It's useful context but not strictly necessary. Even without an MTHFR variant, methylated forms are better absorbed than cyanocobalamin or folic acid, so the supplementation approach is the same either way. I'd start the B-vitamins now and retest in 3 months. If homocysteine doesn't drop below 9, then MTHFR testing would help explain why and guide next steps.",
    citations: ["PMID 23155038"],
  },
];

export function getRiskColor(risk: RiskLevel) {
  switch (risk) {
    case "optimal": return "text-emerald-700 bg-emerald-50 border-emerald-200";
    case "borderline": return "text-amber-700 bg-amber-50 border-amber-200";
    case "elevated": return "text-orange-700 bg-orange-50 border-orange-200";
    case "high": return "text-red-700 bg-red-50 border-red-200";
  }
}

export function getRiskDot(risk: RiskLevel) {
  switch (risk) {
    case "optimal": return "bg-emerald-500";
    case "borderline": return "bg-amber-500";
    case "elevated": return "bg-orange-500";
    case "high": return "bg-red-500";
  }
}

export function getTrendIcon(trend: Marker["trend"]) {
  switch (trend) {
    case "improving": return "↑";
    case "stable": return "→";
    case "worsening": return "↓";
  }
}

export function getTrendColor(trend: Marker["trend"]) {
  switch (trend) {
    case "improving": return "text-emerald-600";
    case "stable": return "text-muted-foreground";
    case "worsening": return "text-orange-600";
  }
}
