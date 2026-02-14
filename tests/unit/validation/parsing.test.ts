import { describe, expect, it } from "vitest";
import { assertValidBoxId } from "@/lib/validation/box-id";
import { assertValidLabelN } from "@/lib/validation/label-n";

describe("canonical parsing", () => {
  it("accepts valid BOX-ID", () => {
    expect(assertValidBoxId(" box-001 ")).toBe("BOX-001");
  });

  it("rejects invalid BOX-ID", () => {
    expect(() => assertValidBoxId("box@id")).toThrow();
  });

  it("accepts valid LABEL-N", () => {
    expect(assertValidLabelN("label-123")).toBe("LABEL-123");
  });

  it("rejects invalid LABEL-N", () => {
    expect(() => assertValidLabelN("LABEL-ABC")).toThrow();
  });
});
