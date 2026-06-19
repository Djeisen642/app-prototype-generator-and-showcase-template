import type { Status } from "../types";

// Badge styling for every lifecycle stage. Shared by the app header
// (Layout) and the prototype cards/detail page so the colors stay in sync.
// Keep each value a complete literal string so Tailwind's scanner emits it.
const STATUS_STYLES: Record<Status, string> = {
  concept: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  mockup: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  prototype: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  beta: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  live: "bg-green-500/20 text-green-300 border-green-500/30",
};

// Neutral styling for an unrecognized status. index.json is hand/agent-edited,
// so a typo must degrade to a plain badge rather than `className="... undefined"`.
const FALLBACK_STYLE = "bg-slate-500/20 text-slate-300 border-slate-500/30";

export function statusStyle(status: string): string {
  return STATUS_STYLES[status as Status] ?? FALLBACK_STYLE;
}
