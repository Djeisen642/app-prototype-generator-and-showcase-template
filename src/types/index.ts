// Shared lifecycle stage used by both the whole-app status (src/config/app.ts)
// and each prototype entry. Single source of truth so the two never drift.
export type Status = "concept" | "mockup" | "prototype" | "beta" | "live";

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

// A sample of the product's voice — how it talks to the user at a key moment.
// Lives on the detail page so the tone is part of the brief, not buried in a mockup.
export interface VoiceSample {
  when: string; // the moment, e.g. "After a miss"
  line: string; // what the app actually says
  note?: string; // why it's written that way
}

export interface Prototype {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem?: string;
  targetUsers?: string;
  features?: Feature[];
  voice?: VoiceSample[];
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
