import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { PrototypeIndex } from "../types";

// The prototype registry is read at build time from the same file the
// scaffolder (`npm run generate`) writes and that ships in public/. Astro
// prerenders every page, so the content lands in static HTML — no runtime fetch.
const indexPath = fileURLToPath(new URL("../../public/prototypes/index.json", import.meta.url));

export function getPrototypeIndex(): PrototypeIndex {
  try {
    return JSON.parse(readFileSync(indexPath, "utf-8")) as PrototypeIndex;
  } catch {
    throw new Error(
      `Cannot read prototype index at ${indexPath} — run "npm run generate" to create it`
    );
  }
}
