export interface Prototype {
  id: string;
  title: string;
  description: string;
  type: PrototypeType;
  style: PrototypeStyle;
  createdAt: string;
  htmlFile: string;
  tags?: string[];
}

export type PrototypeType =
  | "landing-page"
  | "dashboard"
  | "mobile-screen"
  | "onboarding"
  | "settings"
  | "other";

export type PrototypeStyle =
  | "minimal"
  | "colorful"
  | "dark"
  | "corporate"
  | "playful";

export interface PrototypeIndex {
  prototypes: Prototype[];
  lastUpdated: string;
}

export interface GeneratorFormData {
  screenType: PrototypeType;
  style: PrototypeStyle;
  description: string;
}

export type LLMProvider = "openai" | "anthropic" | "google" | "custom";
