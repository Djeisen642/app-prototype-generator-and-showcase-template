# Claude Code Instructions

> **Read `AGENTS.md` first** — it is the canonical guide. This file only adds what is specific to Claude Code.

---

## Claude-Specific Notes

**Removing boilerplate:** Use `docs/REMOVING-BOILERPLATE.md` as your task description — it is formatted as a direct agent prompt.

**Generator prompt changes:** Edit both `src/lib/llm.ts` (web UI) and `scripts/generate.ts` (CLI) — they build prompts independently.

**Model recommendations:**

| Provider | Quality | Fast/cheap |
|----------|---------|------------|
| Anthropic | `claude-sonnet-4-6` | `claude-haiku-4-5-20251001` |
| OpenAI | `gpt-4o` | `gpt-4o-mini` |
| Google | `gemini-1.5-flash` | `gemini-2.0-flash-lite` |
