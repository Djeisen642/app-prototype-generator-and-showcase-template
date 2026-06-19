#!/usr/bin/env tsx
/**
 * Prototype Scaffolder
 * Run: npm run generate
 *
 * Collects metadata about a new app concept, scaffolds the directory
 * and index.json entry, then prints a brief for your AI agent.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { appConfig } from "../src/config/app.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");
const PROTOTYPES_DIR = join(ROOT, "public", "prototypes");
const INDEX_FILE = join(PROTOTYPES_DIR, "index.json");

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface PrototypeEntry {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  targetUsers: string;
  features: Feature[];
  competitive: { competitors: string[]; advantages: string[] };
  images: string[];
  htmlFile?: string;
  tags: string[];
  status: "concept" | "mockup" | "prototype" | "beta" | "live";
  createdAt: string;
}

interface PrototypeIndex {
  prototypes: PrototypeEntry[];
  lastUpdated: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function readIndex(): PrototypeIndex {
  if (!existsSync(INDEX_FILE)) return { prototypes: [], lastUpdated: new Date().toISOString() };
  return JSON.parse(readFileSync(INDEX_FILE, "utf-8")) as PrototypeIndex;
}

function writeIndex(index: PrototypeIndex): void {
  mkdirSync(PROTOTYPES_DIR, { recursive: true });
  writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2) + "\n");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

async function promptLine(
  rl: Awaited<ReturnType<typeof createInterface>>,
  question: string
): Promise<string> {
  return (await rl.question(question)).trim();
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const rl = createInterface({ input, output });
  const line = (q: string) => promptLine(rl, q);

  console.log("\nApp Prototype Generator");
  console.log("─".repeat(44));
  console.log(`Showcase: ${appConfig.name}\n`);

  // Core concept
  const title = await line("App name / title: ");
  if (!title) {
    console.log("Title is required.");
    rl.close();
    process.exit(1);
  }

  const tagline = await line("One-line pitch: ");
  const description = await line("2–3 sentence description: ");
  const problem = await line("What problem does this solve? ");
  const targetUsers = await line("Who is this for? ");

  // Competitors
  const competitorsRaw = await line("Competing apps (comma-separated, optional): ");
  const competitors = competitorsRaw
    ? competitorsRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  // Advantages
  const advantagesRaw = await line("Key advantages over competitors (comma-separated, optional): ");
  const advantages = advantagesRaw
    ? advantagesRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  // Features (up to 4)
  const features: Feature[] = [];
  console.log("\nAdd up to 4 key features (press Enter to skip):");
  const FEATURE_ICONS = ["⚡", "🎯", "🔒", "📊"];
  for (let i = 0; i < 4; i++) {
    const ftitle = await line(`  Feature ${i + 1} title (or Enter to stop): `);
    if (!ftitle) break;
    const fdesc = await line(`  Feature ${i + 1} description: `);
    features.push({ icon: FEATURE_ICONS[i], title: ftitle, description: fdesc });
  }

  // Tags and status
  const tagsRaw = await line('\nTags, comma-separated (e.g. "saas, productivity"): ');
  const tags = tagsRaw
    ? tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const statusOptions = ["concept", "mockup", "prototype", "beta", "live"] as const;
  const rawStatus = await line("Status (concept/mockup/prototype/beta/live) [concept]: ");
  const status = statusOptions.includes(rawStatus as (typeof statusOptions)[number])
    ? (rawStatus as (typeof statusOptions)[number])
    : "concept";

  rl.close();

  // Scaffold
  const id = `${slugify(title)}-${Date.now()}`;
  const dir = join(PROTOTYPES_DIR, id);
  mkdirSync(dir, { recursive: true });

  const entry: PrototypeEntry = {
    id,
    title,
    tagline: tagline || title,
    description: description || title,
    problem: problem || "",
    targetUsers: targetUsers || "",
    features,
    competitive: { competitors, advantages },
    images: [],
    tags,
    status,
    createdAt: new Date().toISOString(),
  };

  const index = readIndex();
  index.prototypes.push(entry);
  index.lastUpdated = new Date().toISOString();
  writeIndex(index);

  // Output agent brief
  const divider = "━".repeat(56);
  console.log(`\nScaffolded: public/prototypes/${id}/`);
  console.log(`Updated:    public/prototypes/index.json\n`);
  console.log(divider);
  console.log(`AGENT BRIEF — ${title}`);
  console.log(divider);
  console.log(`
Concept:  ${tagline || description}
For:      ${targetUsers}
Problem:  ${problem}
${competitors.length ? `Beats:    ${competitors.join(", ")}` : ""}
`);
  console.log(`Generate mockup images and save them to:`);
  console.log(`  public/prototypes/${id}/\n`);
  console.log(`Suggested screens:`);
  console.log(`  home.png        — Landing page or main entry point`);
  console.log(`  dashboard.png   — Core user workflow`);
  console.log(`  feature.png     — Standout feature close-up\n`);
  console.log(`After generating each image, add its path to "images" in index.json:`);
  console.log(`  "/prototypes/${id}/home.png"\n`);
  console.log(`Optional: create an HTML mockup at:`);
  console.log(`  public/prototypes/${id}/mockup.html`);
  console.log(`  Then set "htmlFile": "/prototypes/${id}/mockup.html" in index.json.\n`);
  console.log(`View at: http://localhost:5173/showcase/${id}`);
  console.log(divider + "\n");
}

main().catch((err) => {
  console.error("\nError:", err instanceof Error ? err.message : err);
  process.exit(1);
});
