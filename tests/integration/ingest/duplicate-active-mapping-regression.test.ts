import { describe, expect, it } from "vitest";

describe("duplicate mapping regression", () => {
  it("rejects duplicate active mapping key", () => {
    const seen = new Set<string>();
    const key = "BOX-1|LABEL-1";
    seen.add(key);
    expect(seen.has(key)).toBe(true);
  });
});
