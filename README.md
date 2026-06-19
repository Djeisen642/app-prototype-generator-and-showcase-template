# App Prototype Generator & Showcase Template

A template for founders and builders who want to **show their app idea** before writing production code. Use AI to generate realistic HTML mockups, then present them in a polished showcase site.

---

## What This Does

1. **Generate** — AI produces realistic HTML screen mockups from a description of your app
2. **Showcase** — A clean, deployable website displays those prototypes to investors, users, or teammates
3. **Deploy** — One command ships to Firebase Hosting or Cloudflare Pages

---

## Quick Start

### Prerequisites
- Node.js 18+
- An API key from one LLM provider (Anthropic, OpenAI, Google, or any OpenAI-compatible endpoint)

### 1. Clone and install

```bash
git clone https://github.com/djeisen642/app-prototype-generator-and-showcase-template.git my-app-showcase
cd my-app-showcase
npm install
```

### 2. Configure your app

Open `src/config/app.ts` and replace every value with your real app details. This is the only file you need to edit to make the showcase yours.

### 3. Set up your LLM provider

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
VITE_LLM_PROVIDER=anthropic
VITE_LLM_API_KEY=sk-ant-your-key-here
VITE_LLM_MODEL=claude-sonnet-4-6
```

See `docs/AI-SETUP.md` for all provider options.

### 4. Generate your first prototype

```bash
npm run generate
```

Follow the prompts. The HTML prototype is saved to `public/prototypes/` automatically.

### 5. Run the showcase

```bash
npm run dev
```

Open `http://localhost:5173`.

---

## Generating Prototypes

### CLI (recommended)

Runs server-side — no CORS issues, files saved automatically:

```bash
npm run generate
```

### Web UI

Navigate to `/generator` in the running app to build prompts visually and optionally generate live.

### Manually

Save any HTML file to `public/prototypes/your-name.html`, then add an entry to `public/prototypes/index.json`.

---

## Deployment

### Cloudflare Pages (recommended)

```bash
npm install -g wrangler
wrangler login
wrangler pages project create your-app-name
# Update name in wrangler.toml, then:
npm run deploy:cloudflare
```

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting   # public dir: dist, SPA: yes
npm run deploy:firebase
```

Full instructions for both: `docs/DEPLOYMENT.md`

---

## Project Structure

```
src/
  config/app.ts          ← START HERE — the only file you must edit
  pages/                 ← Home, Showcase, Generator, PrototypeView
  components/            ← Layout, PrototypeCard, FeatureCard
  lib/                   ← LLM abstraction, prototype helpers
  types/                 ← TypeScript interfaces

public/
  prototypes/            ← Generated HTML files + index.json manifest
  llms.txt               ← AI agent discovery file
  app-index.json         ← Structured app index for AI agents
  _redirects             ← Cloudflare Pages SPA routing

scripts/
  generate.ts            ← CLI prototype generator

docs/
  ONBOARDING.md          ← Step-by-step setup guide
  DEPLOYMENT.md          ← Firebase + Cloudflare instructions
  AI-SETUP.md            ← LLM provider configuration
  REMOVING-BOILERPLATE.md ← How to strip all template content

.github/workflows/
  deploy-cloudflare.yml  ← Auto-deploy to Cloudflare Pages
  deploy-firebase.yml    ← Auto-deploy to Firebase Hosting
```

---

## Customization Checklist

- [ ] Edit `src/config/app.ts` — name, tagline, features, colors, deploy target
- [ ] Copy `.env.example` to `.env.local` and add your LLM API key
- [ ] Run `npm run generate` to create your prototypes
- [ ] Delete the sample prototypes (`public/prototypes/sample-*.html`)
- [ ] Clear the sample entries from `public/prototypes/index.json`
- [ ] Update `public/llms.txt` and `public/app-index.json`
- [ ] Deploy with `npm run deploy:cloudflare` or `npm run deploy:firebase`
- [ ] Replace this README with your app-specific docs

See `docs/REMOVING-BOILERPLATE.md` for the complete checklist (useful to hand to an AI agent).

---

## LLM Providers

| Provider | Default Model | Notes |
|----------|---------------|-------|
| Anthropic | `claude-sonnet-4-6` | Best HTML output quality |
| OpenAI | `gpt-4o` | Solid quality, widely available |
| Google | `gemini-2.0-flash-lite` | Fast, generous free tier |
| Custom | *(you set it)* | Any OpenAI-compatible endpoint, including Ollama for local models |

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run generate` | Generate a new prototype via CLI |
| `npm run deploy:firebase` | Build and deploy to Firebase Hosting |
| `npm run deploy:cloudflare` | Build and deploy to Cloudflare Pages |

---

## AI Agent Setup

This repo is set up for AI coding assistants. See:
- `AGENTS.md` — generic setup for all AI agents (Claude Code, Cursor, Copilot, Gemini CLI, etc.)
- `CLAUDE.md` — Claude Code-specific instructions

---

## License

MIT — see [LICENSE](LICENSE)
