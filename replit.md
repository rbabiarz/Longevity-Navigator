# InsightBlood

A responsive marketing/product website for InsightBlood — a life sciences and longevity SaaS platform that turns personal blood work into actionable, evidence-backed intelligence.

## Run & Operate

- `pnpm --filter @workspace/insightblood run dev` — run the marketing site (port 21523)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS v4, shadcn/ui, wouter (routing), recharts, lucide-react
- API: Express 5
- DB: PostgreSQL + Drizzle ORM

## Where things live

- `artifacts/insightblood/` — marketing/product website (5 pages)
- `artifacts/insightblood/src/pages/` — home, features, science, pricing, about
- `artifacts/insightblood/src/components/` — Navigation, Footer, shadcn ui components
- `artifacts/insightblood/src/index.css` — design system (teal palette, Inter + Playfair Display fonts)
- `artifacts/api-server/` — backend API (not yet used by the marketing site)

## Architecture decisions

- Pure client-side marketing site — no API calls needed, all content is static.
- Wouter used instead of react-router for minimal bundle size.
- Tailwind CSS v4 with HSL custom properties for theming; dark-mode ready variables defined.
- Recharts used for interactive blood marker trend charts embedded in feature demos.
- Dedupe of `react`/`react-dom` in Vite config prevents duplicate React issues from workspace libs.

## Product

Five-page marketing website covering:
1. **Home** — hero with live marker trend chart, value props, testimonials, pricing teaser
2. **Features** — deep dives into intervention correlation, AI coach, trend analysis, lab integrations
3. **Science** — product principles, PubMed citation methodology, clinical evidence approach
4. **Pricing** — Free vs Premium tiers ($0 / $50 per year) with full feature comparison table + FAQ
5. **About** — origin story, team philosophy, longevity-first mission

## User preferences

- Deep teal primary (`hsl(186 68% 28%)`), warm off-white background (`hsl(45 20% 96%)`), amber accent
- Playfair Display for headings, Inter for body text
- Evidence-backed, never alarmist tone — cite PubMed, be honest about uncertainty
- Responsive: desktop, tablet, and mobile all fully supported

## Gotchas

- The `BASE_PATH` and `PORT` env vars are injected by the workflow system; do not hard-code them.
- Google Fonts `@import` must be the very first line in `index.css` (before `@import "tailwindcss"`).
- Use `React.Fragment` (not `<>`) when rendering keyed fragments in table rows.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
