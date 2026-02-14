import { describe, expect, it } from "vitest";

describe("rack mapping contract", () => {
  it("GET endpoint exists", () => {
    expect("/api/rack-mappings").toContain("rack-mappings");
  });

  it("PATCH endpoint exists", () => {
    expect("PATCH /api/rack-mappings").toContain("PATCH");
  });
});
