/**
 * Browser-only auth for static hosting (e.g. GitHub Pages) when the bundle was
 * built without VITE_API_BASE_URL. Set VITE_API_BASE_URL at build time to use
 * the real API, or VITE_DEMO_AUTH=true to force demo mode even with an API URL.
 */
export const DEMO_AUTH =
  import.meta.env.VITE_DEMO_AUTH === "true" ||
  (import.meta.env.PROD && !import.meta.env.VITE_API_BASE_URL);
