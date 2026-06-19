import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "node_modules", "public/prototypes", "coverage", ".astro"] },
  // Shared TypeScript modules (config, types, lib) consumed by .astro pages.
  // .astro files are type-checked by `astro check`, not ESLint.
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
  }
);
