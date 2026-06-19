// Browser-compatible LLM provider abstraction.
// Used by the web generator UI.
// For CLI generation (no CORS concerns), see scripts/generate.ts.

import type { LLMProvider } from "../types";

interface LLMCallOptions {
  provider: LLMProvider;
  apiKey: string;
  model: string;
  baseUrl?: string;
  prompt: string;
  systemPrompt?: string;
}

export type { LLMProvider };

export async function callLLM(options: LLMCallOptions): Promise<string> {
  switch (options.provider) {
    case "openai":
    case "custom":
      return callOpenAICompatible(options);
    case "anthropic":
      return callAnthropic(options);
    case "google":
      return callGoogle(options);
    default:
      throw new Error(`Unknown provider: ${options.provider}`);
  }
}

async function callOpenAICompatible(options: LLMCallOptions): Promise<string> {
  const baseUrl = options.baseUrl || "https://api.openai.com/v1";
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${options.apiKey}`,
    },
    body: JSON.stringify({
      model: options.model,
      messages: [
        ...(options.systemPrompt
          ? [{ role: "system", content: options.systemPrompt }]
          : []),
        { role: "user", content: options.prompt },
      ],
      max_tokens: 4096,
    }),
  });

  if (!res.ok) throw new Error(`OpenAI API error ${res.status}: ${await res.text()}`);
  const data = await res.json() as { choices: Array<{ message: { content: string } }> };
  return data.choices[0].message.content;
}

async function callAnthropic(options: LLMCallOptions): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": options.apiKey,
      "anthropic-version": "2023-06-01",
      // Required for direct browser calls — acknowledges the key is client-side
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: options.model,
      max_tokens: 4096,
      ...(options.systemPrompt ? { system: options.systemPrompt } : {}),
      messages: [{ role: "user", content: options.prompt }],
    }),
  });

  if (!res.ok) throw new Error(`Anthropic API error ${res.status}: ${await res.text()}`);
  const data = await res.json() as { content: Array<{ type: string; text: string }> };
  return data.content[0].text;
}

async function callGoogle(options: LLMCallOptions): Promise<string> {
  const model = options.model || "gemini-2.0-flash-lite";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${options.apiKey}`;
  const prompt = options.systemPrompt
    ? `${options.systemPrompt}\n\n${options.prompt}`
    : options.prompt;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    }),
  });

  if (!res.ok) throw new Error(`Google API error ${res.status}: ${await res.text()}`);
  const data = await res.json() as {
    candidates: Array<{ content: { parts: Array<{ text: string }> } }>;
  };
  return data.candidates[0].content.parts[0].text;
}

export function buildPrototypePrompt(params: {
  appName: string;
  appDescription: string;
  targetUsers: string;
  screenType: string;
  style: string;
  specificDescription: string;
}): { system: string; user: string } {
  const system = `You are an expert UI/UX designer and frontend developer.
Generate complete, self-contained HTML prototypes that look like real, polished applications.

Requirements:
- Complete HTML document with all CSS in a <style> tag (no external CSS)
- No external JavaScript dependencies; Google Fonts via <link> is allowed
- Realistic, specific placeholder content — never "Lorem ipsum"
- Modern, professional design that matches the requested visual style
- Responsive layout
- Output ONLY the HTML document — no explanation, no markdown code fences`;

  const user = `Generate a ${params.screenType} prototype for this app:

App Name: ${params.appName}
App Description: ${params.appDescription}
Target Users: ${params.targetUsers}
Visual Style: ${params.style}
Screen Details: ${params.specificDescription}

Create a complete, realistic prototype that looks like a real, shippable product.`;

  return { system, user };
}
