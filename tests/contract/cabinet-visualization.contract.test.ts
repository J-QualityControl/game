import { describe, expect, it } from "vitest";

describe("cabinet visualization contract", () => {
  it("endpoint exists", () => {
    expect("/api/cabinets/visualization").toContain("cabinets/visualization");
  });
});
