import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";

export default tseslint.config(
  { ignores: ["dist", "node_modules", "public/prototypes", "coverage", ".astro"] },
  // Shared TypeScript modules (config, types, lib) consumed by .astro pages.
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["src/**/*.ts"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  // Node scripts and config files
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["scripts/**/*.ts", "*.config.{ts,js,mjs}"],
    languageOptions: { globals: globals.node },
  },
  // Astro components/pages: framework rules + strict accessibility (jsx-a11y).
  // These target **/*.astro and bring their own parser.
  ...eslintPluginAstro.configs["flat/recommended"],
  ...eslintPluginAstro.configs["flat/jsx-a11y-strict"]
);
