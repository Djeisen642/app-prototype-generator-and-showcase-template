import { describe, it, expect } from "vitest";
import { getPrototypeIndex } from "./prototypes";

describe("getPrototypeIndex", () => {
  it("loads the prototype registry with the expected shape", () => {
    const index = getPrototypeIndex();
    expect(Array.isArray(index.prototypes)).toBe(true);
    expect(typeof index.lastUpdated).toBe("string");
  });

  it("gives every prototype a non-empty id and title", () => {
    for (const p of getPrototypeIndex().prototypes) {
      expect(p.id.length).toBeGreaterThan(0);
      expect(p.title.length).toBeGreaterThan(0);
    }
  });
});
