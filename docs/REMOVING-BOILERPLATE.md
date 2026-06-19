# Removing Template Boilerplate

This document lists every template-specific element to update when setting up this template for a real app. It is designed to be handed directly to an AI agent as a task.

---

## Checklist

### Required — Do These First

- [ ] **`src/config/app.ts`** — Replace ALL values:
  - `name` → real app name
  - `tagline` → one-sentence pitch
  - `description` → 2–3 sentence explanation
  - `targetUsers` → specific user description
  - `features` → real features (3–6 items with icon, title, description)
  - `primaryColor` → brand hex (e.g. `#6366f1`)
  - `accentColor` → secondary hex
  - `backgroundColor` → page background hex (e.g. `#0f172a` for dark, `#ffffff` for light)
  - `fontFamily` → CSS font-family string (e.g. `"Inter, system-ui, sans-serif"`)
  - `status` → `"concept"` | `"prototype"` | `"beta"` | `"live"`
  - `deployTarget` → `"firebase"` or `"cloudflare"`
  - `githubUrl`, `demoUrl`, `contactEmail` → real links or empty strings

- [ ] **`public/prototypes/index.json`** — Clear the prototypes array:

  ```json
  {
    "prototypes": [],
    "lastUpdated": "2025-01-01T00:00:00Z"
  }
  ```

- [ ] **`public/prototypes/taskflow-*/`** — Delete the sample prototype folder

- [ ] **`public/llms.txt`** — Update the first two lines with the real app name and description

- [ ] **`public/app-index.json`** — Update the `app` object to match `src/config/app.ts`

- [ ] **`README.md`** — Replace the entire file with app-specific documentation

### Deployment — Do Before First Deploy

- [ ] **Cloudflare**: Update `name` in `wrangler.toml` to your Cloudflare Pages project name
- [ ] **Firebase**: Copy `.firebaserc.example` to `.firebaserc` and set your project ID
- [ ] Delete the workflow file for the platform you're NOT using:
  - Keeping Cloudflare: delete `.github/workflows/deploy-firebase.yml`
  - Keeping Firebase: delete `.github/workflows/deploy-cloudflare.yml`

### Optional

- [ ] **`AGENTS.md`** — Can be kept or updated with app-specific agent instructions
- [ ] **`CLAUDE.md`** — Can be kept or updated
- [ ] **`LICENSE`** — Update copyright line with your name
- [ ] **`index.html`** — The `<title>` is set dynamically from `appConfig.name`, no change needed
- [ ] **`public/favicon.svg`** — Replace with your app's real favicon

---

## AI Agent Prompt for Automated Setup

When asking an AI agent to set up this template, paste this prompt and fill in the brackets:

```
Set up this app prototype showcase template for my app. Here are the details:

App Name: [NAME]
Tagline: [ONE SENTENCE]
Description: [2-3 SENTENCES]
Target Users: [WHO USES THIS]
Features:
  1. Icon: [EMOJI], Title: [TITLE], Description: [WHAT IT DOES]
  2. Icon: [EMOJI], Title: [TITLE], Description: [WHAT IT DOES]
  3. Icon: [EMOJI], Title: [TITLE], Description: [WHAT IT DOES]
  4. Icon: [EMOJI], Title: [TITLE], Description: [WHAT IT DOES]
Primary Color (hex): [#XXXXXX]
Accent Color (hex): [#XXXXXX]
Background Color (hex): [#XXXXXX]
Font Family: [e.g. "Inter, system-ui, sans-serif"]
Deploy Target: [firebase or cloudflare]
Status: [concept / prototype / beta / live]
GitHub URL: [URL or empty]
Contact Email: [EMAIL or empty]

Please follow the REMOVING-BOILERPLATE.md checklist exactly:
1. Update src/config/app.ts with all values above
2. Delete public/prototypes/taskflow-*/ (sample prototype folder)
3. Clear public/prototypes/index.json (empty prototypes array)
4. Update public/llms.txt with the real app name and description
5. Update public/app-index.json to match the config
6. Do NOT modify AGENTS.md, CLAUDE.md, LICENSE, or docs/ files
```

---

## What Not to Change

These files should be kept as-is (they're infrastructure, not content):

- `src/lib/prototypes.ts`
- `src/components/` — unless changing the UI design
- `src/pages/` — unless changing the showcase UX
- `scripts/generate.ts`
- `firebase.json`, `vite.config.ts`, `tsconfig.json`
- `docs/DEPLOYMENT.md`, `docs/AI-SETUP.md`, `docs/ONBOARDING.md` — these are useful for the user
