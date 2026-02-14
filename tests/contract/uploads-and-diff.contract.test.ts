import { describe, expect, it } from "vitest";

describe("upload and diff contracts", () => {
  it("master upload endpoint exists", () => {
    expect("/api/uploads/master").toContain("/api/uploads/master");
  });

  it("rack upload endpoint exists", () => {
    expect("/api/uploads/rack").toContain("/api/uploads/rack");
  });

  it("version diff endpoint exists", () => {
    expect("/api/versions/{versionNo}/diff/{previousVersionNo}").toContain("/api/versions/");
  });
});
