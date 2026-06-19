import { describe, it, expect } from "vitest";
import { appConfig } from "./app";

describe("appConfig", () => {
  it("has a name and tagline", () => {
    expect(typeof appConfig.name).toBe("string");
    expect(appConfig.name.length).toBeGreaterThan(0);
    expect(typeof appConfig.tagline).toBe("string");
  });

  it("has a valid hex primary color", () => {
    expect(appConfig.primaryColor).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it("has a valid hex accent color", () => {
    expect(appConfig.accentColor).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it("has a valid hex background color", () => {
    expect(appConfig.backgroundColor).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it("has a non-empty fontFamily", () => {
    expect(typeof appConfig.fontFamily).toBe("string");
    expect(appConfig.fontFamily.length).toBeGreaterThan(0);
  });

  it("has at least one feature", () => {
    expect(appConfig.features.length).toBeGreaterThan(0);
    for (const f of appConfig.features) {
      expect(typeof f.icon).toBe("string");
      expect(typeof f.title).toBe("string");
      expect(typeof f.description).toBe("string");
    }
  });

  it("has a valid status", () => {
    expect(["concept", "mockup", "prototype", "beta", "live"]).toContain(appConfig.status);
  });

  it("has a valid deployTarget", () => {
    expect(["firebase", "cloudflare"]).toContain(appConfig.deployTarget);
  });
});
