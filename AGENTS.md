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

This is a showcase template for app concepts. The owner describes an app idea; an AI agent turns it into a polished product brief — mockup images, competitive analysis, feature breakdown — and adds it to the gallery.

The site has two parts:

1. **Showcase Gallery** — a React/Vite static site that displays app concept pages
2. **Prototype Scaffolder** — a CLI (`npm run generate`) that collects metadata and scaffolds the files you need to populate

---

## How to Customize This Template

### Step 1 — Update app identity (required first)

Edit `src/config/app.ts`. Replace every placeholder value:

| Field             | What to put                                                        |
| ----------------- | ------------------------------------------------------------------ |
| `name`            | The app's actual name                                              |
| `tagline`         | One-sentence pitch                                                 |
| `description`     | 2–3 sentence explanation                                           |
| `targetUsers`     | Who uses this app                                                  |
| `features`        | Replace all 4 with real features (3–6 items)                       |
| `primaryColor`    | Brand hex color                                                    |
| `accentColor`     | Secondary brand hex color                                          |
| `backgroundColor` | Page background hex (e.g. `#0f172a` dark, `#ffffff` light)         |
| `fontFamily`      | CSS font-family string (e.g. `"Inter, system-ui, sans-serif"`)     |
| `deployTarget`    | `"firebase"` or `"cloudflare"`                                     |
| `status`          | `"concept"` \| `"mockup"` \| `"prototype"` \| `"beta"` \| `"live"` |

### Step 2 — Remove sample prototypes

```bash
rm -rf public/prototypes/taskflow-*/
```

Then clear `public/prototypes/index.json`:

```json
{
  "prototypes": [],
  "lastUpdated": "<current ISO timestamp>"
}
```

### Step 3 — Update AI discovery files

- Edit `public/llms.txt` — replace `[Your App Name]` with real content
- Edit `public/app-index.json` — update the `app` object to match `src/config/app.ts`

### Step 4 — Add your first prototype

```bash
npm run generate
```

Answer the prompts, then follow the agent brief that prints at the end.

### Step 5 — Update deployment config

- **Cloudflare**: Set `name` in `wrangler.toml`
- **Firebase**: Copy `.firebaserc.example` to `.firebaserc` and set the project ID
- Both: Set `deployTarget` in `src/config/app.ts`

### Step 6 — Replace README

Replace `README.md` with app-specific documentation.

---

## Adding a Prototype (Agent Instructions)

When asked to add a new app concept prototype:

1. **Run the scaffolder** (if it hasn't been run yet):

   ```bash
   npm run generate
   ```

   Answer the prompts. This creates `public/prototypes/{id}/` and adds an entry to `index.json`.

2. **Generate mockup images** and save them to `public/prototypes/{id}/`:
   - `home.png` — landing page or main entry point
   - `dashboard.png` — core user workflow
   - `feature.png` — standout feature close-up
   - Add more as needed for the concept

   Images should be polished UI mockups with realistic content (never Lorem Ipsum). Use any image generation tool available to you.

3. **Update `public/prototypes/index.json`** — add each image path to the `"images"` array:

   ```json
   "images": [
     "/prototypes/{id}/home.png",
     "/prototypes/{id}/dashboard.png"
   ]
   ```

4. **Optionally create an HTML mockup** at `public/prototypes/{id}/mockup.html` — a self-contained HTML file (styles in `<style>`, no external JS). Set `"htmlFile"` in the index entry.

5. **Run `npm run build`** to confirm nothing broke.

### Prototype entry shape

```jsonc
{
  "id": "my-app-1234567890",
  "title": "App Name",
  "tagline": "One-line pitch",
  "description": "2–3 sentences about what it does and who it's for.",
  "problem": "What existing pain point this solves.",
  "targetUsers": "Specific user persona.",
  "features": [{ "icon": "⚡", "title": "Feature", "description": "What it does." }],
  "competitive": {
    "competitors": ["Competitor A", "Competitor B"],
    "advantages": ["Advantage 1", "Advantage 2"],
  },
  "images": ["/prototypes/my-app-1234567890/home.png"],
  "htmlFile": "/prototypes/my-app-1234567890/mockup.html",
  "tags": ["saas", "productivity"],
  "status": "concept",
  "createdAt": "2025-01-01T00:00:00Z",
}
```

---

## Key Files Reference

| File                           | Purpose                                     | Edit When                        |
| ------------------------------ | ------------------------------------------- | -------------------------------- |
| `src/config/app.ts`            | Single source of truth for all app identity | First step, always               |
| `public/prototypes/index.json` | Registry of all prototype entries           | After adding/removing prototypes |
| `public/llms.txt`              | Plain-text AI discovery (llms.txt standard) | After config update              |
| `public/app-index.json`        | Structured JSON app index                   | After config update              |
| `scripts/generate.ts`          | CLI scaffolder for new prototypes           | Modifying scaffolding behavior   |
| `wrangler.toml`                | Cloudflare Pages config                     | Cloudflare deploy setup          |
| `firebase.json`                | Firebase Hosting config                     | Firebase deploy setup            |
| `docs/DEPLOYMENT.md`           | Step-by-step deploy instructions            | When deploying                   |

---

## Keeping Files in Sync

`public/llms.txt` and `public/app-index.json` are derived from `src/config/app.ts`. They are not auto-generated — **whenever `src/config/app.ts` is modified, update these two files to match.**

| Changed in `app.ts`       | Update in `llms.txt`          | Update in `app-index.json`       |
| ------------------------- | ----------------------------- | -------------------------------- |
| `name`                    | First heading and description | `app.name`                       |
| `tagline` / `description` | Body description              | `app.tagline`, `app.description` |
| `targetUsers`             | Body if mentioned             | `app.targetUsers`                |
| `status`                  | —                             | `app.status`                     |
| `deployTarget`            | —                             | `deployment.active`              |

---

## Architecture

```
Owner describes an app concept
        ↓
npm run generate
  → Prompts for title, tagline, problem, target users, features, competitors
  → Creates public/prototypes/{id}/ directory
  → Adds entry to public/prototypes/index.json
  → Prints agent brief
        ↓
AI agent follows the brief
  → Generates mockup images → saves to public/prototypes/{id}/
  → Optionally creates HTML mockup
  → Updates index.json with image paths
        ↓
npm run dev / npm run build
  → React SPA fetches public/prototypes/index.json
  → Showcase displays prototype cards with images
  → Detail pages show product brief + images + optional interactive mockup
        ↓
npm run deploy:cloudflare / deploy:firebase
  → Ships dist/ to static hosting
```

---

## Development Commands

```bash
npm run dev               # Dev server at localhost:5173
npm run build             # Production build → dist/
npm run preview           # Preview dist/ locally
npm run generate          # Interactive CLI to scaffold a new prototype
npm run format            # Format all files with Prettier
npm run format:check      # Check formatting (used in CI)
npm run lint              # Lint with ESLint
npm run test              # Run tests in watch mode
npm run test:run          # Run tests once (CI)
npm run coverage          # Test coverage report
npm run deploy:cloudflare # Build + deploy to Cloudflare Pages
npm run deploy:firebase   # Build + deploy to Firebase Hosting
```

---

## Conventions

**Do:**

- Keep all user-facing config in `src/config/app.ts` — never scatter it elsewhere
- Run `npm run build` after any change to verify TypeScript compiles
- Before creating a new file, check whether an existing one can be extended instead
- Keep prototype HTML mockups self-contained — styles in `<style>`, no external `<script src>`
- Use `var(--color-primary)` / `var(--color-accent)` for brand colors so they update everywhere
- Keep the pull request description in sync with the diff — when a PR's functionality diverges from its description, update the description in the same push

**Do not:**

- Commit `.env.local` — it contains any local secrets
- Use `any` in TypeScript or leave unused variables
- Add logic to `public/prototypes/index.json` — it is data only
- Modify `docs/` or `AGENTS.md` unless the structure actually changed

---

## Maintaining This File

**Agents must keep `AGENTS.md` and `README.md` accurate.** When you make a structural change, update both files before finishing the task. Do not leave them stale.

| Change                         | Update in `AGENTS.md`                         | Update in `README.md`     |
| ------------------------------ | --------------------------------------------- | ------------------------- |
| New file added                 | Key Files Reference (if it matters to agents) | Project Structure section |
| New field added to `app.ts`    | Step 1 field table + Common Tasks if relevant | Design Tokens table       |
| New route added                | Architecture diagram + `app-index.json` too   | —                         |
| New npm script added           | Development Commands section                  | Scripts table             |
| Prototype sample files changed | Step 2 remove instructions                    | Setup Checklist           |
| Workflow changed               | Architecture section                          | How It Works section      |

**Keep it concise.** Before adding anything, check whether it already exists in another section. Prefer updating existing content over adding new sections.

---

## Common Tasks

**Add a new prototype:**

1. Run `npm run generate` and answer the prompts
2. Follow the agent brief that prints at the end

**Change the primary brand color:**
Edit `primaryColor` in `src/config/app.ts`

**Switch between Firebase and Cloudflare:**
Set `deployTarget` in `src/config/app.ts`, follow `docs/DEPLOYMENT.md`
