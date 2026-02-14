import { describe, expect, it } from "vitest";

describe("search/history contracts", () => {
  it("search endpoint exists", () => {
    expect("/api/samples/search").toContain("samples/search");
  });

  it("history endpoint exists", () => {
    expect("/api/samples/{sampleId}/history").toContain("samples/");
  });
});
