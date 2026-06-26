import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { PrototypeIndex } from "../types";

// The prototype registry is read at build time from the same file the
// scaffolder (`npm run generate`) writes and that ships in public/. Astro
// prerenders every page, so the content lands in static HTML — no runtime fetch.
// Use process.cwd() so the path resolves correctly both during page rendering
// and during getStaticPaths (which runs before Vite processes import.meta.url).
const indexPath = join(process.cwd(), "public/prototypes/index.json");

export function getPrototypeIndex(): PrototypeIndex {
  try {
    return JSON.parse(readFileSync(indexPath, "utf-8")) as PrototypeIndex;
  } catch {
    return { prototypes: [], lastUpdated: "" };
  }
}
