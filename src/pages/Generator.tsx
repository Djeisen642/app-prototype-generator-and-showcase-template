import { useState } from "react";
import { appConfig } from "../config/app";
import { buildPrototypePrompt, callLLM } from "../lib/llm";
import type { LLMProvider, PrototypeType, PrototypeStyle } from "../types";

const SCREEN_TYPES: { value: PrototypeType; label: string }[] = [
  { value: "landing-page", label: "Landing Page" },
  { value: "dashboard", label: "Dashboard" },
  { value: "mobile-screen", label: "Mobile Screen" },
  { value: "onboarding", label: "Onboarding Flow" },
  { value: "settings", label: "Settings Page" },
  { value: "other", label: "Other" },
];

const STYLES: { value: PrototypeStyle; label: string; description: string }[] = [
  { value: "minimal", label: "Minimal", description: "Clean, lots of whitespace" },
  { value: "dark", label: "Dark Mode", description: "Dark backgrounds, light text" },
  { value: "colorful", label: "Colorful", description: "Bold, vibrant colors" },
  { value: "corporate", label: "Corporate", description: "Professional, blue tones" },
  { value: "playful", label: "Playful", description: "Rounded, friendly, fun" },
];

const PROVIDERS: { value: LLMProvider; label: string; defaultModel: string }[] = [
  { value: "anthropic", label: "Anthropic (Claude)", defaultModel: "claude-sonnet-4-6" },
  { value: "openai", label: "OpenAI", defaultModel: "gpt-4o" },
  { value: "google", label: "Google (Gemini)", defaultModel: "gemini-2.0-flash-lite" },
  { value: "custom", label: "Custom (OpenAI-compatible)", defaultModel: "your-model" },
];

export default function Generator() {
  const [screenType, setScreenType] = useState<PrototypeType>("landing-page");
  const [style, setStyle] = useState<PrototypeStyle>("minimal");
  const [description, setDescription] = useState("");
  const [provider, setProvider] = useState<LLMProvider>("anthropic");
  const [model, setModel] = useState("claude-sonnet-4-6");
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_LLM_API_KEY ?? "");
  const [baseUrl, setBaseUrl] = useState(import.meta.env.VITE_LLM_BASE_URL ?? "");
  const [generating, setGenerating] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const screenLabel = SCREEN_TYPES.find((s) => s.value === screenType)?.label ?? screenType;
  const styleLabel = STYLES.find((s) => s.value === style)?.label ?? style;

  const { system, user } = buildPrototypePrompt({
    appName: appConfig.name,
    appDescription: appConfig.description,
    targetUsers: appConfig.targetUsers,
    screenType: screenLabel,
    style: styleLabel,
    specificDescription: description || `A standard ${screenLabel.toLowerCase()} screen`,
  });

  const fullPrompt = `${system}\n\n---\n\n${user}`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = async () => {
    if (!apiKey) {
      setError(
        "No API key provided. Add one in the Live Generation section below, or copy the prompt and paste it into any LLM."
      );
      return;
    }
    setGenerating(true);
    setError(null);
    setGeneratedHtml(null);
    try {
      const result = await callLLM({
        provider,
        apiKey,
        model,
        baseUrl: baseUrl || undefined,
        prompt: user,
        systemPrompt: system,
      });
      const fenceMatch = result.match(/```(?:html)?\s*([\s\S]*?)```/);
      setGeneratedHtml(fenceMatch ? fenceMatch[1].trim() : result.trim());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedHtml) return;
    const blob = new Blob([generatedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prototype-${screenType}-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Prototype Generator</h1>
        <p className="text-slate-400">
          Configure a screen below. Copy the prompt to any LLM, or generate live with an API key.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left — Form */}
        <div className="space-y-6">
          {/* Screen Type */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">Screen Type</label>
            <div className="grid grid-cols-2 gap-2">
              {SCREEN_TYPES.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setScreenType(value)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors border ${
                    screenType === value
                      ? "bg-slate-700 text-white border-slate-500"
                      : "bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-800"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Style */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">Visual Style</label>
            <div className="space-y-2">
              {STYLES.map(({ value, label, description: desc }) => (
                <button
                  key={value}
                  onClick={() => setStyle(value)}
                  className={`w-full px-4 py-3 rounded-lg text-sm text-left transition-colors flex items-center justify-between border ${
                    style === value
                      ? "bg-slate-700 border-slate-500"
                      : "bg-slate-800/50 border-slate-700 hover:bg-slate-800"
                  }`}
                >
                  <span className="font-medium text-white">{label}</span>
                  <span className="text-slate-500 text-xs">{desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Additional Details{" "}
              <span className="text-slate-500 font-normal">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this specific screen should show… e.g. 'Dashboard with recent activity feed, monthly revenue chart, and a quick-action sidebar'"
              className="w-full h-24 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-slate-500 resize-none"
            />
          </div>

          {/* Live generation collapsible */}
          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-300 cursor-pointer select-none list-none">
              <span className="transition-transform group-open:rotate-90 inline-block">▶</span>
              Live Generation
              <span className="text-slate-600 font-normal">— requires API key</span>
            </summary>
            <div className="mt-4 space-y-3 pl-4 border-l border-slate-700/70">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Provider</label>
                <select
                  value={provider}
                  onChange={(e) => {
                    const p = e.target.value as LLMProvider;
                    setProvider(p);
                    setModel(PROVIDERS.find((pr) => pr.value === p)?.defaultModel ?? "");
                  }}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none"
                >
                  {PROVIDERS.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Model</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none"
                />
              </div>
              {provider === "custom" && (
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">
                    Base URL (e.g. http://localhost:11434/v1 for Ollama)
                  </label>
                  <input
                    type="text"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    placeholder="https://api.example.com/v1"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none"
                />
                <p className="text-xs text-slate-600 mt-1">
                  Or set <code>VITE_LLM_API_KEY</code> in <code>.env.local</code>. Keys are never
                  stored or sent anywhere except the chosen provider.
                </p>
              </div>
            </div>
          </details>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleCopyPrompt}
              className="flex-1 px-4 py-3 rounded-lg text-sm font-medium border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors"
            >
              {copied ? "✓ Copied!" : "Copy Prompt"}
            </button>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="flex-1 px-4 py-3 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {generating ? "Generating…" : "Generate Live"}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-800/40 rounded-lg text-sm text-red-300">
              {error}
            </div>
          )}
        </div>

        {/* Right — Output */}
        <div className="space-y-4">
          {!generatedHtml && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-slate-400">Generated Prompt</p>
                <button
                  onClick={handleCopyPrompt}
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[420px] overflow-auto">
                {fullPrompt}
              </pre>
              <p className="text-xs text-slate-600 mt-2">
                Paste into Claude, ChatGPT, Gemini, or any LLM to generate the prototype.
              </p>
            </div>
          )}

          {generatedHtml && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-slate-400">Preview</p>
                <div className="flex gap-2">
                  <button
                    onClick={handleDownload}
                    className="text-xs px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
                  >
                    Download HTML
                  </button>
                  <button
                    onClick={() => setGeneratedHtml(null)}
                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    ✕ Clear
                  </button>
                </div>
              </div>
              <iframe
                srcDoc={generatedHtml}
                className="w-full rounded-lg bg-white border border-slate-700"
                style={{ height: 480 }}
                title="Generated Prototype"
                sandbox="allow-scripts allow-same-origin"
              />
              <div className="mt-3 p-3 bg-slate-800/40 border border-slate-700/50 rounded-lg">
                <p className="text-xs text-slate-400">
                  To add to your showcase: download the HTML, copy it to{" "}
                  <code className="text-slate-300 bg-slate-800 px-1 rounded">
                    public/prototypes/
                  </code>
                  , and add an entry to{" "}
                  <code className="text-slate-300 bg-slate-800 px-1 rounded">
                    public/prototypes/index.json
                  </code>
                  . Or run{" "}
                  <code className="text-slate-300 bg-slate-800 px-1 rounded">
                    npm run generate
                  </code>{" "}
                  to do it automatically.
                </p>
              </div>
            </div>
          )}

          <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-slate-300 mb-1.5">CLI Generator</h3>
            <p className="text-xs text-slate-500 mb-3">
              For server-side generation that saves files automatically (no CORS issues):
            </p>
            <code className="block bg-slate-900 rounded px-3 py-2.5 text-sm text-green-400 font-mono">
              npm run generate
            </code>
            <p className="text-xs text-slate-600 mt-2">
              Requires <code>VITE_LLM_API_KEY</code> in <code>.env.local</code>. See{" "}
              <code>docs/AI-SETUP.md</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
