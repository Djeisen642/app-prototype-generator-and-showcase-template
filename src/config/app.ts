// ============================================================
// APP CONFIGURATION — Start here
// ============================================================
// This is the single file you need to edit to make this
// template yours. Change every value in this file.
//
// AI Agents: see AGENTS.md for a step-by-step checklist.
// ============================================================

export const appConfig = {
  // --- Identity ---
  // Replace these with your real app details.
  name: "Your App Name",
  tagline: "One sentence that captures what makes your app special",
  description:
    "A 2–3 sentence description of what problem your app solves, " +
    "who it helps, and what makes it different from existing solutions.",

  targetUsers: "Describe your primary user — their role, frustrations, and goals",

  // --- Key Features (show 3–6) ---
  features: [
    {
      icon: "⚡",
      title: "Feature One",
      description: "What this feature does and why users will love it",
    },
    {
      icon: "🎯",
      title: "Feature Two",
      description: "What this feature does and why users will love it",
    },
    {
      icon: "🔒",
      title: "Feature Three",
      description: "What this feature does and why users will love it",
    },
    {
      icon: "📊",
      title: "Feature Four",
      description: "What this feature does and why users will love it",
    },
  ],

  // --- Branding ---
  // All design tokens are read by main.tsx and applied as CSS variables.
  // Change any of these and the entire UI updates — no other files to touch.
  primaryColor: "#6366f1",
  accentColor: "#ec4899",
  backgroundColor: "#0f172a",
  fontFamily: "Inter, system-ui, sans-serif",

  // --- Links (leave empty to hide) ---
  githubUrl: "",
  demoUrl: "",
  contactEmail: "",

  // --- Development Status ---
  status: "concept" as "concept" | "prototype" | "beta" | "live",

  // --- Deployment Target ---
  // Set this to match where you plan to deploy.
  // Then follow docs/DEPLOYMENT.md for setup instructions.
  deployTarget: "cloudflare" as "firebase" | "cloudflare",
};
