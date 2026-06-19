# AI Agent Guide

This file helps AI coding assistants — Claude Code, GitHub Copilot Workspace, Cursor, Windsurf, Gemini CLI, and others — understand and modify this repository.

---

## Before You Start

Read in this order for fastest context:
1. `src/config/app.ts` — what this app is
2. This file — how the repo works
3. `public/prototypes/index.json` — what prototypes exist

Run `npm run build` before making changes to confirm the baseline compiles.

---

## What This Repo Does

This is a template for showcasing an app idea through AI-generated HTML prototypes. It has two core parts:

1. **Prototype Generator** — A CLI (`npm run generate`) and web UI (`/generator`) that call an LLM to produce self-contained HTML mockups
2. **Showcase Gallery** — A React/Vite static site that displays those prototypes

The owner of this repo is typically a founder, PM, or developer who wants to demonstrate their app concept to stakeholders before building it.

---

## How to Customize This Template

Follow these steps when asked to "set up this template for [App X]" or "remove the boilerplate":

### Step 1 — Update app identity (required first)

Edit `src/config/app.ts`. Replace every placeholder value:

| Field | What to put |
|-------|------------|
| `name` | The app's actual name |
| `tagline` | One-sentence pitch |
| `description` | 2–3 sentence explanation |
| `targetUsers` | Who uses this app |
| `features` | Replace all 4 with real features (3–6 items) |
| `primaryColor` | Brand hex color |
| `accentColor` | Secondary brand hex color |
| `deployTarget` | `"firebase"` or `"cloudflare"` |
| `status` | `"concept"` \| `"prototype"` \| `"beta"` \| `"live"` |

### Step 2 — Remove sample prototypes

```bash
rm public/prototypes/sample-landing-page.html
rm public/prototypes/sample-dashboard.html
```

Then update `public/prototypes/index.json`:

```json
{
  "prototypes": [],
  "lastUpdated": "<current ISO timestamp>"
}
```

### Step 3 — Update AI discovery files

- Edit `public/llms.txt` — replace `[Your App Name]` and description with real content
- Edit `public/app-index.json` — update the `app` object to match `src/config/app.ts`

### Step 4 — Generate real prototypes

```bash
npm run generate
```

Requires `VITE_LLM_API_KEY` in `.env.local`. Prompts for screen details and saves HTML automatically.

### Step 5 — Update deployment config

- **Cloudflare**: Set `name` in `wrangler.toml`
- **Firebase**: Copy `.firebaserc.example` to `.firebaserc` and set the project ID
- Both: Set `deployTarget` in `src/config/app.ts`

### Step 6 — Replace README

Replace `README.md` with app-specific documentation.

---

## Key Files Reference

| File | Purpose | Edit When |
|------|---------|-----------|
| `src/config/app.ts` | Single source of truth for all app identity | First step, always |
| `public/prototypes/index.json` | Registry of all prototype HTML files | After adding/removing prototypes |
| `public/llms.txt` | Plain-text AI discovery (llms.txt standard) | After config update |
| `public/app-index.json` | Structured JSON app index | After config update |
| `.env.local` | LLM API keys — never committed | LLM setup |
| `src/lib/llm.ts` | Browser-side LLM provider abstraction | Adding new providers |
| `scripts/generate.ts` | CLI prototype generator | Modifying generation behavior |
| `wrangler.toml` | Cloudflare Pages config | Cloudflare deploy setup |
| `firebase.json` | Firebase Hosting config | Firebase deploy setup |
| `docs/DEPLOYMENT.md` | Step-by-step deploy instructions | When deploying |

---

## Keeping Files in Sync

`public/llms.txt` and `public/app-index.json` are derived from `src/config/app.ts`. They are not auto-generated — **whenever `src/config/app.ts` is modified, update these two files to match.**

| Changed in `app.ts` | Update in `llms.txt` | Update in `app-index.json` |
|---------------------|---------------------|---------------------------|
| `name` | First heading and description | `app.name` |
| `tagline` / `description` | Body description | `app.tagline`, `app.description` |
| `targetUsers` | Body if mentioned | `app.targetUsers` |
| `status` | — | `app.status` |
| `deployTarget` | — | `deployment.active` |

---

## Architecture

```
User edits src/config/app.ts
        ↓
npm run generate   (scripts/generate.ts)
  → Reads .env.local for provider/key
  → Prompts user for screen details
  → Calls LLM via dynamic import (Anthropic SDK / OpenAI SDK / fetch)
  → Writes HTML to public/prototypes/{id}.html
  → Updates public/prototypes/index.json
        ↓
npm run dev / npm run build
  → React SPA (src/)
  → Showcase fetches public/prototypes/index.json at runtime
  → Each prototype rendered in a sandboxed iframe
        ↓
npm run deploy:cloudflare / deploy:firebase
  → Ships dist/ to static hosting
```

---

## LLM Provider Configuration

The browser-side LLM abstraction is in `src/lib/llm.ts`. It supports:

| Provider | Config value | Notes |
|----------|-------------|-------|
| Anthropic | `"anthropic"` | Uses direct fetch with `anthropic-dangerous-direct-browser-access` header |
| OpenAI | `"openai"` | Standard OpenAI chat completions API |
| Google | `"google"` | Gemini REST API, key in URL |
| Custom | `"custom"` | Any OpenAI-compatible endpoint; set `VITE_LLM_BASE_URL` |

The CLI generator (`scripts/generate.ts`) uses the same env vars but imports the official SDKs for better reliability.

Configure via `.env.local`:
```
VITE_LLM_PROVIDER=anthropic
VITE_LLM_API_KEY=sk-ant-...
VITE_LLM_MODEL=claude-sonnet-4-6
VITE_LLM_BASE_URL=              # custom/Ollama only
```

---

## Development Commands

```bash
npm run dev               # Dev server at localhost:5173
npm run build             # Production build → dist/
npm run preview           # Preview dist/ locally
npm run generate          # Interactive CLI prototype generator
npm run deploy:cloudflare # Build + deploy to Cloudflare Pages
npm run deploy:firebase   # Build + deploy to Firebase Hosting
```

---

## Conventions

**Do:**
- Keep all user-facing config in `src/config/app.ts` — never scatter it elsewhere
- Run `npm run build` after any change to verify TypeScript compiles
- Before creating a new file, check whether an existing one can be extended instead
- Keep prototype HTML self-contained — styles in `<style>`, no external `<script src>` (Google Fonts `<link>` is fine)
- Use `var(--color-primary)` / `var(--color-accent)` for brand colors so they update everywhere

**Do not:**
- Commit `.env.local` — it contains API keys
- Use `any` in TypeScript or leave unused variables
- Add logic to `public/prototypes/index.json` — it is data only
- Modify `docs/` or `AGENTS.md` unless the structure actually changed

---

## Maintaining This File

Update this file when the project structure changes — not speculatively, only when something actually changes:

| Change | What to update here |
|--------|-------------------|
| New file added | Key Files Reference (if it matters to agents) |
| New route added | `public/app-index.json` routes array too |
| New npm script added | Development Commands section |
| New LLM provider added | LLM Provider Configuration table |

**Keep it concise.** Before adding anything, check whether it already exists in another section. Prefer updating existing content over adding new sections. If something belongs in `docs/`, put it there instead.

---

## Common Tasks

**Add a hand-written prototype:**
1. Save HTML to `public/prototypes/my-screen.html`
2. Add an entry to `public/prototypes/index.json`

**Change the primary brand color:**
Edit `primaryColor` in `src/config/app.ts`

**Add a new LLM provider:**
Edit `src/lib/llm.ts` (browser) and `scripts/generate.ts` (CLI)

**Switch between Firebase and Cloudflare:**
Set `deployTarget` in `src/config/app.ts`, follow `docs/DEPLOYMENT.md`
