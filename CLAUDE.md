# Claude Code Instructions

> **Read `AGENTS.md` first** — it is the canonical guide. This file only adds what is specific to Claude Code.

---

## Claude-Specific Notes

**Removing boilerplate:** Use `docs/REMOVING-BOILERPLATE.md` as your task description — it is formatted as a direct agent prompt.

**Adding a prototype:** Run `npm run generate`, answer the prompts, then follow the printed agent brief. The brief tells you exactly what images to generate and where to save them.

**Generating mockup images:** Use whatever image generation tools are available in your current environment (MCP image tools, DALL-E via the API, etc.). Save the output to `public/prototypes/{id}/`.

**Creating HTML mockups:** Write a self-contained HTML file with all styles inline. No external JS dependencies. Google Fonts `<link>` is fine. Save to `public/prototypes/{id}/mockup.html`.
