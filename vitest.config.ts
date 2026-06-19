import { defineConfig } from "vitest/config";

// Tests cover the framework-agnostic logic (app config, status styling,
// prototype data loading). No DOM is needed — these run in plain Node.
export default defineConfig({
  test: {
    environment: "node",
    globals: true,
  },
});
