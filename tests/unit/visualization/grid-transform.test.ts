import { describe, expect, it } from "vitest";

function toIndex(row: number, col: number) {
  return (row - 1) * 5 + (col - 1);
}

describe("cabinet grid transform", () => {
  it("maps row/col to stable index", () => {
    expect(toIndex(1, 1)).toBe(0);
    expect(toIndex(7, 5)).toBe(34);
  });
});
