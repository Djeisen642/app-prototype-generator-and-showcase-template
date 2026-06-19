import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchPrototypeIndex, fetchPrototypeHtml } from "./prototypes";

describe("fetchPrototypeIndex", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns an empty index when fetch fails", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({ ok: false } as Response);
    const result = await fetchPrototypeIndex();
    expect(result.prototypes).toEqual([]);
  });

  it("returns an empty index when fetch throws", async () => {
    vi.spyOn(global, "fetch").mockRejectedValue(new Error("network error"));
    const result = await fetchPrototypeIndex();
    expect(result.prototypes).toEqual([]);
  });

  it("parses and returns the prototype index on success", async () => {
    const mockData = {
      prototypes: [{ id: "test-1", title: "Test Screen" }],
      lastUpdated: "2025-01-01T00:00:00Z",
    };
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as unknown as Response);
    const result = await fetchPrototypeIndex();
    expect(result.prototypes).toHaveLength(1);
    expect(result.prototypes[0].id).toBe("test-1");
  });
});

describe("fetchPrototypeHtml", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("throws when the fetch fails", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({ ok: false } as Response);
    await expect(fetchPrototypeHtml("/prototypes/test.html")).rejects.toThrow(
      "Failed to load prototype"
    );
  });

  it("returns HTML text on success", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      text: () => Promise.resolve("<html><body>Hello</body></html>"),
    } as unknown as Response);
    const html = await fetchPrototypeHtml("/prototypes/test.html");
    expect(html).toBe("<html><body>Hello</body></html>");
  });
});
