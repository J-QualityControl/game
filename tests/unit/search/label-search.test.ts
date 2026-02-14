import { describe, expect, it } from "vitest";

function normalizeLabel(input: string) {
  return input.trim().toUpperCase();
}

describe("label search normalization", () => {
  it("normalizes label key", () => {
    expect(normalizeLabel(" label-1 ")).toBe("LABEL-1");
  });

  it("keeps exact identifier semantics", () => {
    expect(normalizeLabel("ABC-123")).toBe("ABC-123");
  });
});
