import { defineConfig } from "drizzle-kit";

import { DATABASE_URL } from "./src/config/env.js";

export default defineConfig({
  schema: "./src/db/schemas/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
