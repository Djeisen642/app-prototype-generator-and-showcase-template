import type { PrototypeIndex } from "../types";

export async function fetchPrototypeIndex(): Promise<PrototypeIndex> {
  try {
    const res = await fetch("/prototypes/index.json");
    if (!res.ok) return { prototypes: [], lastUpdated: new Date().toISOString() };
    return res.json() as Promise<PrototypeIndex>;
  } catch {
    return { prototypes: [], lastUpdated: new Date().toISOString() };
  }
}

export async function fetchPrototypeHtml(htmlFile: string): Promise<string> {
  const res = await fetch(htmlFile);
  if (!res.ok) throw new Error(`Failed to load prototype: ${htmlFile}`);
  return res.text();
}
