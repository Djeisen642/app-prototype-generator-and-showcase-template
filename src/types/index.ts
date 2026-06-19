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
  status: "concept" | "mockup" | "prototype";
  createdAt: string;
}

export interface PrototypeIndex {
  prototypes: Prototype[];
  lastUpdated: string;
}
