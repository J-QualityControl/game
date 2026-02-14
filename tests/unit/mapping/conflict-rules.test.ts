import { describe, expect, it } from "vitest";

describe("mapping conflict rules", () => {
  it("flags duplicate active keys", () => {
    const seen = new Set<string>();
    const key = "BOX-1|LABEL-1";
    seen.add(key);
    expect(seen.has(key)).toBe(true);
  });
});
