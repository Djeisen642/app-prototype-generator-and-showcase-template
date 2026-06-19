# App Prototype Showcase Template

A template for founders and builders who want to **show an app idea** before writing production code. Describe a concept to an AI agent; the agent generates realistic mockup images and a product brief; the showcase site presents it to investors, users, or teammates.

No API keys required — prototypes are created by AI agents (Claude Code, Cursor, Codex, etc.), not by the app itself.

---

## How It Works

```
You describe an app concept
        ↓
npm run generate
  → prompts for title, tagline, problem, features, competitors
  → scaffolds public/prototypes/{id}/
  → prints an AGENT BRIEF
        ↓
Hand the brief to an AI agent
  → agent generates mockup images → saves to public/prototypes/{id}/
  → agent optionally creates an HTML mockup
  → agent updates index.json with image paths
        ↓
npm run dev  →  view the showcase at localhost:5173
npm run deploy:cloudflare / deploy:firebase  →  ship it
```

---

## Quick Start

```bash
git clone https://github.com/djeisen642/app-prototype-generator-and-showcase-template.git my-app-showcase
cd my-app-showcase
npm install
```

**1. Make it yours** — open `src/config/app.ts` and replace every placeholder value (name, tagline, colors, features, deploy target).

**2. Scaffold your first prototype:**

```bash
npm run generate
```

Answer the prompts, then give the printed AGENT BRIEF to your AI agent.

**3. Run the showcase:**

```bash
npm run dev
```

Open `http://localhost:5173/showcase`.

---

## Project Structure

```
src/
  config/app.ts          ← START HERE — single source of truth for app identity + design tokens
  pages/                 ← Home, Showcase, PrototypeView
  components/            ← Layout, PrototypeCard, FeatureCard
  lib/                   ← Prototype data helpers
  types/                 ← TypeScript interfaces

public/
  prototypes/            ← One folder per prototype: images + optional mockup.html + index.json
  llms.txt               ← Plain-text AI agent discovery (llms.txt standard)
  app-index.json         ← Structured JSON app index for AI agents

scripts/
  generate.ts            ← Interactive CLI scaffolder

docs/
  ONBOARDING.md          ← Step-by-step setup guide
  DEPLOYMENT.md          ← Firebase + Cloudflare deploy instructions
  AI-SETUP.md            ← Agent workflow guide
  REMOVING-BOILERPLATE.md ← How to strip all template content

.github/workflows/
  ci.yml                 ← Format, lint, test, build on every PR + push to main
  deploy-cloudflare.yml  ← Auto-deploy to Cloudflare Pages on push to main
  deploy-firebase.yml    ← Auto-deploy to Firebase Hosting on push to main
```

---

## Design Tokens

All visual tokens live in `src/config/app.ts` — change them there and the entire UI updates:

| Token            | Field             | Example                                 |
| ---------------- | ----------------- | --------------------------------------- |
| Primary color    | `primaryColor`    | `"#6366f1"`                             |
| Accent color     | `accentColor`     | `"#ec4899"`                             |
| Background color | `backgroundColor` | `"#0f172a"` (dark), `"#ffffff"` (light) |
| Font             | `fontFamily`      | `"Inter, system-ui, sans-serif"`        |

---

## Scripts

| Script                      | Description                                |
| --------------------------- | ------------------------------------------ |
| `npm run dev`               | Dev server at `localhost:5173`             |
| `npm run build`             | Production build → `dist/`                 |
| `npm run preview`           | Preview `dist/` locally                    |
| `npm run generate`          | Scaffold a new prototype (interactive CLI) |
| `npm run format`            | Format all files with Prettier             |
| `npm run format:check`      | Check formatting (used in CI)              |
| `npm run lint`              | Lint with ESLint                           |
| `npm run test`              | Run tests in watch mode                    |
| `npm run test:run`          | Run tests once (CI)                        |
| `npm run coverage`          | Test coverage report                       |
| `npm run deploy:cloudflare` | Build + deploy to Cloudflare Pages         |
| `npm run deploy:firebase`   | Build + deploy to Firebase Hosting         |

---

## Deployment

**Cloudflare Pages** (recommended):

```bash
npm install -g wrangler
wrangler login
wrangler pages project create your-app-name
# Set name = "your-app-name" in wrangler.toml
npm run deploy:cloudflare
```

**Firebase Hosting:**

```bash
npm install -g firebase-tools
firebase login
firebase init hosting   # public dir: dist, SPA: yes
npm run deploy:firebase
```

Full instructions: `docs/DEPLOYMENT.md`

---

## Setup Checklist

- [ ] Edit `src/config/app.ts` — name, tagline, features, colors, deploy target
- [ ] Run `npm run generate` and follow the agent brief
- [ ] Delete the sample prototype folder (`public/prototypes/taskflow-*/`)
- [ ] Clear the sample entry from `public/prototypes/index.json`
- [ ] Update `public/llms.txt` and `public/app-index.json`
- [ ] Configure deployment (`wrangler.toml` or `.firebaserc`)
- [ ] Replace this README with your app-specific docs

See `docs/REMOVING-BOILERPLATE.md` for a version of this checklist formatted for AI agents.

---

## AI Agent Setup

- `AGENTS.md` — canonical guide for all AI agents (architecture, workflow, conventions)
- `CLAUDE.md` — Claude Code-specific notes
- `docs/AI-SETUP.md` — agent workflow for generating prototype content

---

## License

MIT — see [LICENSE](LICENSE)
