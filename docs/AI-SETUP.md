# Generating Prototypes with an AI Agent

Prototypes in this template are created by AI agents — Claude Code, Cursor, Copilot Workspace, or similar tools — not by direct API calls from the app.

---

## The Workflow

**1. Scaffold a new entry:**

```bash
npm run generate
```

Answer the prompts (title, pitch, problem, target users, features, competitors). This creates `public/prototypes/{id}/` and adds a skeleton entry to `public/prototypes/index.json`.

**2. Ask your agent to build it out:**

The scaffolder prints a brief like this:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AGENT BRIEF — TaskFlow
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Concept:  Project management without the overhead
For:      Small engineering teams
Problem:  Jira is too complex, Trello is too simple

Generate mockup images and save them to:
  public/prototypes/taskflow-1234567890/

Suggested screens:
  home.png        — Landing page or main entry point
  dashboard.png   — Core user workflow
  feature.png     — Standout feature close-up
...
```

Give this brief to your AI agent. The agent generates images, optionally creates an HTML mockup, and updates `index.json` with the image paths.

**3. View the result:**

```bash
npm run dev
```

Open `http://localhost:5173/showcase` to see the new prototype card.

---

## What AI Agents Can Generate

| Deliverable             | Where to save                              |
| ----------------------- | ------------------------------------------ |
| Mockup images (PNG/JPG) | `public/prototypes/{id}/`                  |
| HTML mockup             | `public/prototypes/{id}/mockup.html`       |
| Competitive analysis    | In the `competitive` field of `index.json` |
| Feature descriptions    | In the `features` array of `index.json`    |

---

## Image Guidelines

- Use realistic UI content — real app names, plausible data, no Lorem Ipsum
- Match the color palette from `src/config/app.ts` (`primaryColor`, `accentColor`)
- Recommended dimensions: 1280×800px (desktop) or 390×844px (mobile)
- PNG or JPEG, under 500KB per image

---

## HTML Mockup Guidelines

- Complete HTML document with all CSS in a `<style>` tag
- No external JavaScript dependencies (Google Fonts `<link>` is fine)
- Use `var(--color-primary)` and `var(--color-accent)` for brand colors
- Must work in a sandboxed iframe (`sandbox="allow-scripts allow-same-origin"`)
