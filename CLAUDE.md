# Claude Code Instructions

> **Read `AGENTS.md` first** — it is the canonical guide for this repo (architecture, key files, customization steps, LLM config, commands). This file only adds what is specific to Claude Code on top of that.

---

## Quick Context

This is an app prototype showcase template. The owner clones it, edits `src/config/app.ts` with their app details, runs `npm run generate` to produce HTML prototypes, and deploys to Firebase or Cloudflare Pages.

The main customization point is always `src/config/app.ts`.

---

## Key Files

```
src/config/app.ts         ← START HERE — all app identity lives here
src/lib/llm.ts            ← Browser LLM abstraction (multi-provider)
scripts/generate.ts       ← CLI generator (uses Node + SDK imports)
public/prototypes/        ← Generated HTML + index.json manifest
docs/REMOVING-BOILERPLATE.md ← Checklist for full template cleanup
```

---

## Common Tasks

**Set up this template for a new app:**
Read `docs/REMOVING-BOILERPLATE.md` and follow the checklist. That file is designed to be used directly as a task description.

**Generate a prototype:**
```bash
npm run generate
```
Requires `VITE_LLM_API_KEY` set in `.env.local`.

**Build and preview:**
```bash
npm run build && npm run preview
```

**Deploy:**
```bash
npm run deploy:cloudflare   # or deploy:firebase
```

---

## Important Rules

- Never commit `.env.local` — it contains API keys
- Prototype HTML must be self-contained — no external `<script src>` tags (Google Fonts `<link>` is fine)
- TypeScript strict mode is on — keep all types clean
- When modifying the generator prompt, edit both `src/lib/llm.ts` (web) and `scripts/generate.ts` (CLI)

---

## LLM Models

Default models used in this template (as of the latest release):

| Provider | Model ID |
|----------|----------|
| Anthropic | `claude-sonnet-4-6` |
| Anthropic (fast) | `claude-haiku-4-5-20251001` |
| OpenAI | `gpt-4o` |
| Google | `gemini-2.0-flash-lite` |

---

## Removing Boilerplate

Use `docs/REMOVING-BOILERPLATE.md` as your task description when the user wants to "make this their own." That file lists every file to touch, in priority order, and includes a ready-to-use prompt template.
