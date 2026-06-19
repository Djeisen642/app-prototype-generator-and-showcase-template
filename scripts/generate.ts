#!/usr/bin/env tsx
/**
 * CLI Prototype Generator
 * Run: npm run generate
 *
 * Prompts for screen details, calls your configured LLM,
 * saves the HTML to public/prototypes/, and updates index.json.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");
const PROTOTYPES_DIR = join(ROOT, "public", "prototypes");
const INDEX_FILE = join(PROTOTYPES_DIR, "index.json");

// ---------------------------------------------------------------------------
// Env loader (reads .env.local without requiring dotenv as a dep)
// ---------------------------------------------------------------------------
function loadEnv() {
  const envPath = join(ROOT, ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (key && !process.env[key]) process.env[key] = val;
  }
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface PrototypeEntry {
  id: string;
  title: string;
  description: string;
  type: string;
  style: string;
  createdAt: string;
  htmlFile: string;
  tags: string[];
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
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50);
}

function stripCodeFences(text: string): string {
  return text.replace(/^```(?:html)?\s*/i, "").replace(/\s*```\s*$/, "").trim();
}

// ---------------------------------------------------------------------------
// LLM Providers
// ---------------------------------------------------------------------------
async function callLLM(userPrompt: string, systemPrompt: string): Promise<string> {
  const provider = (process.env.VITE_LLM_PROVIDER ?? "anthropic").toLowerCase();
  const apiKey = process.env.VITE_LLM_API_KEY;
  const model = process.env.VITE_LLM_MODEL;
  const baseUrl = process.env.VITE_LLM_BASE_URL;

  if (!apiKey) {
    throw new Error(
      "\nNo API key found.\nCreate .env.local and set VITE_LLM_API_KEY.\nSee .env.example for options.\n"
    );
  }

  console.log(`\nGenerating with ${provider}${model ? ` (${model})` : ""}…\n`);

  if (provider === "anthropic") {
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: model ?? "claude-sonnet-4-6",
      max_tokens: 8192,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });
    const block = response.content[0];
    if (block.type !== "text") throw new Error("Unexpected Anthropic response type");
    return block.text;
  }

  if (provider === "openai" || provider === "custom") {
    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey, baseURL: baseUrl ?? undefined });
    const response = await client.chat.completions.create({
      model: model ?? "gpt-4o",
      max_tokens: 8192,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });
    return response.choices[0]?.message.content ?? "";
  }

  if (provider === "google") {
    const m = model ?? "gemini-2.0-flash-lite";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
      }),
    });
    if (!res.ok) throw new Error(`Google API error ${res.status}: ${await res.text()}`);
    const data = (await res.json()) as {
      candidates: Array<{ content: { parts: Array<{ text: string }> } }>;
    };
    return data.candidates[0].content.parts[0].text;
  }

  throw new Error(
    `Unknown provider: "${provider}". Set VITE_LLM_PROVIDER to: anthropic, openai, google, or custom.`
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  loadEnv();

  const rl = createInterface({ input, output });

  console.log("\nApp Prototype Generator");
  console.log("─".repeat(40));
  console.log("Generates AI-powered HTML prototypes.\n");

  const title = (await rl.question("Prototype title (e.g. 'Main Dashboard'): ")).trim();
  if (!title) { console.log("Title is required."); rl.close(); process.exit(1); }

  const description = (await rl.question("Describe this screen: ")).trim();

  const screenTypes = ["landing-page", "dashboard", "mobile-screen", "onboarding", "settings", "other"];
  console.log(`\nOptions: ${screenTypes.join(", ")}`);
  const rawType = (await rl.question("Screen type [dashboard]: ")).trim();
  const screenType = screenTypes.includes(rawType) ? rawType : "dashboard";

  const styles = ["minimal", "dark", "colorful", "corporate", "playful"];
  console.log(`\nOptions: ${styles.join(", ")}`);
  const rawStyle = (await rl.question("Visual style [minimal]: ")).trim();
  const style = styles.includes(rawStyle) ? rawStyle : "minimal";

  const tagsRaw = (await rl.question("Tags, comma-separated (optional): ")).trim();
  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];

  rl.close();

  const systemPrompt = `You are an expert UI/UX designer and frontend developer.
Generate complete, self-contained HTML prototypes that look like real, polished applications.

Requirements:
- Complete HTML document with all styles in a <style> tag
- No external JavaScript dependencies; Google Fonts <link> is allowed
- Realistic, specific placeholder content — never "Lorem ipsum"
- Modern, professional design matching the requested style
- Responsive layout
- Output ONLY the HTML document — no explanation, no markdown fences`;

  const userPrompt = `Generate a ${screenType} prototype with ${style} visual style.

Title: ${title}
Details: ${description || "A standard " + screenType + " screen"}`;

  let html: string;
  try {
    html = await callLLM(userPrompt, systemPrompt);
  } catch (err) {
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }

  const cleanHtml = stripCodeFences(html);
  const id = `${slugify(title)}-${Date.now()}`;
  const filename = `${id}.html`;
  const outputPath = join(PROTOTYPES_DIR, filename);

  mkdirSync(PROTOTYPES_DIR, { recursive: true });
  writeFileSync(outputPath, cleanHtml + "\n");

  const index = readIndex();
  index.prototypes.push({
    id,
    title,
    description: description || "",
    type: screenType,
    style,
    createdAt: new Date().toISOString(),
    htmlFile: `/prototypes/${filename}`,
    tags,
  });
  index.lastUpdated = new Date().toISOString();
  writeIndex(index);

  console.log(`\nSaved:   public/prototypes/${filename}`);
  console.log(`Updated: public/prototypes/index.json`);
  console.log(`\nView at: http://localhost:5173/showcase/${id}`);
  console.log("         (run 'npm run dev' if not already running)\n");
}

main().catch((err) => {
  console.error("\nError:", err instanceof Error ? err.message : err);
  process.exit(1);
});
