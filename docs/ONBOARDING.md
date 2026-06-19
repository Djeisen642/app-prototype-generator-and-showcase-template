# Getting Started

Welcome to the App Prototype Generator & Showcase Template. This guide walks through setup from zero to deployed.

**Estimated time: 15–20 minutes**

---

## Before You Start

You need:

- [ ] Node.js 18+ (`node --version` to check)
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

## Step 3 — Generate Your First Prototype

```bash
npm run generate
```

You'll be prompted for:

1. A title (e.g. "TaskFlow", "EcoTracker")
2. A tagline and description
3. The problem it solves
4. Target users
5. Competitors and your advantages
6. Key features (up to 4)
7. Tags and status

The CLI creates a folder in `public/prototypes/` and prints an **AGENT BRIEF** — a detailed prompt to hand to an AI agent (Claude Code, Cursor, Codex, etc.). The agent uses the brief to generate mockup images and save them to the prototype's folder.

See `docs/AI-SETUP.md` for full agent workflow instructions.

---

## Step 4 — Remove the Sample Prototypes

The template ships with an example prototype. Remove it once you have your own:

```bash
rm -rf public/prototypes/taskflow-*/
```

Open `public/prototypes/index.json` and clear the `prototypes` array (keep the file structure intact).

---

## Step 5 — Run the Dev Server

```bash
npm run dev
```

Open `http://localhost:4321`. You should see your app name, tagline, and features on the home page, and your prototype(s) in the Showcase.

---

## Step 6 — Deploy

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
firebase init hosting   # public dir: dist, SPA: No (Astro emits static pages)
npm run deploy:firebase
```

Full instructions: `docs/DEPLOYMENT.md`

---

## What's Next?

- Generate more prototypes: `npm run generate`
- Share the deployed link with stakeholders
- Update `public/llms.txt` and `public/app-index.json` with your real app info
- For a full boilerplate cleanup, see `docs/REMOVING-BOILERPLATE.md`
