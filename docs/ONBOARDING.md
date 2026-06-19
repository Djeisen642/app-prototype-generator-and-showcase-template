# Getting Started

Welcome to the App Prototype Generator & Showcase Template. This guide walks through setup from zero to deployed.

**Estimated time: 20–30 minutes**

---

## Before You Start

You need:
- [ ] Node.js 18+ (`node --version` to check)
- [ ] An API key from one LLM provider (Anthropic, OpenAI, Google, or compatible)
- [ ] A Firebase or Cloudflare account for deployment (optional for local testing)

---

## Step 1 — Get the Code

```bash
git clone https://github.com/djeisen642/app-prototype-generator-and-showcase-template.git my-app-showcase
cd my-app-showcase
npm install
```

---

## Step 2 — Make It Yours

Open `src/config/app.ts`. This file controls everything — app name, tagline, features, colors, and more.

Change at minimum:
- `name` → your app's name
- `tagline` → one-sentence pitch  
- `description` → 2–3 sentences about what it does and who it's for
- `targetUsers` → describe your primary user
- `features` → your actual features (replace all 4 placeholders)

The file is fully commented. Read it top-to-bottom and update everything.

---

## Step 3 — Configure Your LLM

```bash
cp .env.example .env.local
```

Edit `.env.local` with your provider and API key:

```env
VITE_LLM_PROVIDER=anthropic
VITE_LLM_API_KEY=sk-ant-your-key-here
VITE_LLM_MODEL=claude-sonnet-4-6
```

See `docs/AI-SETUP.md` for all provider options, including free tiers and local models.

---

## Step 4 — Generate Your First Prototype

```bash
npm run generate
```

You'll be prompted for:
1. A title (e.g. "Landing Page", "Main Dashboard")
2. What this screen should look like
3. Screen type (landing page, dashboard, mobile screen, etc.)
4. Visual style (minimal, dark, colorful, etc.)
5. Optional tags

The HTML is saved to `public/prototypes/` automatically.

---

## Step 5 — Remove the Sample Prototypes

The template ships with two example prototypes. Remove them once you have your own:

```bash
rm public/prototypes/sample-landing-page.html
rm public/prototypes/sample-dashboard.html
```

Open `public/prototypes/index.json` and clear the `prototypes` array (keep the file structure intact).

---

## Step 6 — Run the Dev Server

```bash
npm run dev
```

Open `http://localhost:5173`. You should see your app name, tagline, and features on the home page, and your prototype(s) in the Showcase.

The Generator page at `/generator` lets you build prompts visually and optionally generate live using your API key.

---

## Step 7 — Deploy

**Cloudflare Pages** (recommended):

```bash
npm install -g wrangler
wrangler login
wrangler pages project create your-app-name   # creates the project
# Edit wrangler.toml: set name = "your-app-name"
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

## What's Next?

- Generate more screens: `npm run generate`
- Try live generation: visit `/generator` in the app
- Share the deployed link with stakeholders
- Update `public/llms.txt` and `public/app-index.json` with your real app info
- For a full boilerplate cleanup, see `docs/REMOVING-BOILERPLATE.md`
