// ============================================================
// PORTFOLIO CONFIGURATION — Start here
// ============================================================
// This file describes YOU and your portfolio, not any single
// app idea. Change every value to make this template yours.
//
// AI Agents: see AGENTS.md for a step-by-step checklist.
// ============================================================

import type { Status } from "../types";

export const appConfig = {
  // --- Identity ---
  // Describe your portfolio, not a single app.
  name: "Your Portfolio Name",
  tagline: "One sentence about you or what you're building toward",
  description:
    "A 2–3 sentence description of who you are, what kinds of ideas " +
    "you explore, and why you build them.",

  targetUsers:
    "Who this portfolio is for — other builders, collaborators, potential co-founders, etc.",

  // --- Approach / Focus Areas (show 3–6) ---
  // These appear on the home page as "My Approach".
  // Use them to describe your building philosophy or areas of interest,
  // not features of a product.
  features: [
    {
      icon: "⚡",
      title: "Principle One",
      description: "A principle or focus area that shapes how you approach ideas",
    },
    {
      icon: "🎯",
      title: "Principle Two",
      description: "A principle or focus area that shapes how you approach ideas",
    },
    {
      icon: "🔒",
      title: "Principle Three",
      description: "A principle or focus area that shapes how you approach ideas",
    },
    {
      icon: "📊",
      title: "Principle Four",
      description: "A principle or focus area that shapes how you approach ideas",
    },
  ],

  // --- Branding ---
  // All design tokens are injected as CSS variables by src/layouts/Layout.astro.
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
  // One of: "concept" | "mockup" | "prototype" | "beta" | "live"
  status: "concept" as Status,

  // --- Deployment Target ---
  // Set this to match where you plan to deploy.
  // Then follow docs/DEPLOYMENT.md for setup instructions.
  deployTarget: "cloudflare" as "firebase" | "cloudflare",
};
