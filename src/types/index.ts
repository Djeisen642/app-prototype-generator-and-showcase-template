// Shared lifecycle stage used by both the whole-app status (src/config/app.ts)
// and each prototype entry. Single source of truth so the two never drift.
export type Status = "concept" | "mockup" | "prototype" | "beta" | "live";

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Prototype {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem?: string;
  targetUsers?: string;
  features?: Feature[];
  competitive?: {
    competitors?: string[];
    advantages?: string[];
  };
  images: string[];
  htmlFile?: string;
  tags: string[];
  status: Status;
  createdAt: string;
}

export interface PrototypeIndex {
  prototypes: Prototype[];
  lastUpdated: string;
}
