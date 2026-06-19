import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Static site generator. Every page (home, showcase, and each prototype
// detail page) is prerendered to HTML at build time, so the product brief
// content ships in the markup — good for SEO and AI discovery.
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
