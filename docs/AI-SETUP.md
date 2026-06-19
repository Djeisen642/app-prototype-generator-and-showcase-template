# LLM Provider Setup

This template uses an LLM to generate HTML prototypes. You need an API key from at least one provider.

---

## Configuration

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
VITE_LLM_PROVIDER=anthropic     # See providers below
VITE_LLM_API_KEY=               # Your API key
VITE_LLM_MODEL=                 # Optional — uses default if empty
VITE_LLM_BASE_URL=              # Only for custom/self-hosted providers
```

---

## Providers

### Anthropic (Claude) — Recommended

Best HTML output quality. The default.

```env
VITE_LLM_PROVIDER=anthropic
VITE_LLM_API_KEY=sk-ant-...
VITE_LLM_MODEL=claude-sonnet-4-6
```

Get your key: https://console.anthropic.com

Models:
- `claude-sonnet-4-6` — best quality (default)
- `claude-haiku-4-5-20251001` — faster, cheaper

---

### OpenAI

```env
VITE_LLM_PROVIDER=openai
VITE_LLM_API_KEY=sk-...
VITE_LLM_MODEL=gpt-4o
```

Get your key: https://platform.openai.com/api-keys

Models: `gpt-4o`, `gpt-4o-mini`

---

### Google Gemini

Free tier available. Good for experimentation.

```env
VITE_LLM_PROVIDER=google
VITE_LLM_API_KEY=AIza...
VITE_LLM_MODEL=gemini-2.0-flash-lite
```

Get your key: https://aistudio.google.com/app/apikey

Models: `gemini-2.0-flash-lite`, `gemini-1.5-flash`

---

### Custom / Self-Hosted

Any OpenAI-compatible API endpoint, including Ollama for fully local generation.

```env
VITE_LLM_PROVIDER=custom
VITE_LLM_API_KEY=ollama           # Use any placeholder for local models
VITE_LLM_MODEL=llama3.2
VITE_LLM_BASE_URL=http://localhost:11434/v1
```

For Ollama: `ollama serve` + `ollama pull llama3.2`

---

## CLI vs Browser Generation

### CLI Generator (`npm run generate`)

- Runs in Node.js — no browser CORS constraints
- Uses official SDKs (Anthropic, OpenAI) for reliability
- Saves files directly to `public/prototypes/`
- **Use this for most prototype generation**

### Web Generator (`/generator` page)

- Runs in the browser using `fetch`
- CORS support by provider:
  - **Anthropic** ✓ Supported (requires special header, already set)
  - **Google** ✓ Supported
  - **OpenAI** ⚠ Requires adding your domain to allowed origins in your OpenAI account
  - **Custom/Ollama** ⚠ Requires CORS headers on the local server
- If browser generation fails with a CORS error, use the CLI instead
- The "Copy Prompt" button always works and lets you paste into any LLM manually

---

## Security

`VITE_*` env vars are bundled into the client-side JavaScript at build time.

This means:
- Your API key is visible in the page source to anyone who visits the site
- For **private sharing** (a link you send to your team), this is generally acceptable
- For **public deployment**, remove the live generation feature or proxy the API through a server

To disable browser generation and use prompt-copy mode only, remove `VITE_LLM_API_KEY` from your production build environment.
