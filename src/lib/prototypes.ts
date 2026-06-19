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
