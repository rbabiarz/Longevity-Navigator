import { defineConfig } from "drizzle-kit";
import path from "path";

const DATABASE_URL =
  process.env.DATABASE_URL ?? "postgresql://localhost:5432/longevity_navigator";

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
