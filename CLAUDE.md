# Claude Code Instructions

> **Read `AGENTS.md` first** — it is the canonical guide. This file only adds what is specific to Claude Code.

---

## Claude-Specific Notes

**Removing boilerplate:** Use `docs/REMOVING-BOILERPLATE.md` as your task description — it is formatted as a direct agent prompt.

**Adding a prototype:** Run `npm run generate`, answer the prompts, then follow the printed agent brief. The brief tells you exactly what images to generate and where to save them.

**Generating mockup images:** Use whatever image generation tools are available in your current environment (MCP image tools, DALL-E via the API, etc.). Save the output to `public/prototypes/{id}/`.

**Creating HTML mockups:** Write a self-contained HTML file with all styles inline. An inline `<script>` is encouraged — see the Interactive Mockup Standard below — but no external `<script src>`. Google Fonts `<link>` is fine. Save to `public/prototypes/{id}/mockup.html`.

---

## Interactive Mockup Standard — what "interactive" means here

The detail page renders each `mockup.html` under the heading **"Interactive Mockup."**
That word is literal, not decorative. The bar is: **the mockup is the app, you operate
it; it is not a poster or a second landing page.**

**Match the form factor first.** Not every prototype is a mobile app — it might be a
web app, a desktop tool, a dashboard, a browser extension, a CLI/TUI, etc. Render it in
the frame that fits: a phone for a mobile app, a browser-chrome or desktop window for a
web/desktop app, a terminal for a CLI. A phone frame and tab bar are _one form factor's_
expression of the rules below — not the rules themselves. Translate the principles to
whatever you're building; don't force a phone where it doesn't belong.

A mockup meets the standard only if all of these hold:

1. **The real thing, one view at a time.** Render a single, believable frame of the
   actual product showing one view/state at a time — _not_ every screen tiled side by
   side, and _not_ a scrolling marketing page. If you only have static renders, put them
   in the image gallery; don't dress a static page up as "Interactive."
2. **Working navigation.** Moving between views (tabs, a sidebar, routes, steps, panes —
   whatever the form factor uses) actually works via the inline `<script>`. Every entry
   point leads somewhere real — no dead links.
3. **Real interactions, with state.** Controls respond to input and _change something_ —
   navigate, expand/collapse, select, filter, update content. The primary flow works end
   to end (e.g. Start session → Session → Done → Score). A control that only looks
   clickable fails the standard.
4. **No duplicated pitch.** Don't repeat the detail-page brief — overview, features,
   "pillars," voice — inside the mockup. That content belongs on the page (e.g. the
   `voice` field on the prototype, rendered as "How It Talks"). The iframe is the
   product, not the sell.
5. **Self-contained and accessible.** Styles in `<style>`; an inline `<script>` is fine,
   no external `<script src>`. Interactive elements are real, focusable controls
   (`<button>`, `<a>`, etc.) with accessible names and live aria state where it applies
   (`aria-current`, `aria-expanded`, `aria-checked`).

When the owner says "make it interactive" or "it feels like an extension of the page,"
this section is the target — rebuild to it in the right form factor, and move any
page-worthy copy out of the mockup and onto the detail page.

---

## Research Standard — "Pulitzer light"

When a prototype is backed by research, keep it in a research doc at
`docs/research/{topic}.md`. When the owner asks to "do research," "make it airtight,"
or invokes the shorthand **"Pulitzer light,"** hold the work to this rubric. (The phrase
is a casual handle for the six criteria below — honor the criteria, not the vibe.)

1. **Primary sources, read in full.** The actual paper, survey, or dataset — not a
   search-result snippet, and not a blog summarizing a study. If the environment
   blocks a source (`WebFetch` is often 403'd here), say so and ask the owner to paste
   the text or upload the PDF/`.mht` rather than quoting the snippet.
2. **Attribute every key claim** — author, year, sample size, journal/source. Name it
   or flag it as unnamed.
3. **Report effect sizes and confidence intervals, not just direction.** "+12 kg 1RM
   [95% CI 8–16], in trained men only" beats "strength improves."
4. **State confidence honestly.** Mark thin claims as "blog-sourced / unverified"
   instead of laundering them into fact. Prefer "directionally supported, magnitude
   uncertain" over fake precision.
5. **The change-my-mind test.** Research that only confirms the prior isn't research.
   Call out where a source _contradicts_ an earlier assumption and update the design.
6. **Separate "what's known" from "what I'm inferring."** Keep evidence and
   hypothesis visibly distinct.

End each research doc with a **Sources** section and a one-paragraph honest note on
where the evidence is strong vs. weak/contested. The standard isn't "more citations" —
it's sources you actually read, claims you can defend, and caveats you didn't hide.
