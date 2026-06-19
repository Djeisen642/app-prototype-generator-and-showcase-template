import { describe, it, expect } from "vitest";
import { statusStyle } from "./status";

describe("statusStyle", () => {
  it("returns distinct styling for each known status", () => {
    const known = ["concept", "mockup", "prototype", "beta", "live"];
    const styles = known.map(statusStyle);
    expect(new Set(styles).size).toBe(known.length);
    for (const s of styles) expect(s).not.toContain("undefined");
  });

  it("falls back to a neutral style for an unknown status", () => {
    const style = statusStyle("not-a-real-status");
    expect(style).not.toContain("undefined");
    expect(style).toContain("slate");
  });
});
