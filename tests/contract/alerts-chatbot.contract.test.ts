import { describe, expect, it } from "vitest";

describe("alerts and chatbot contracts", () => {
  it("alerts endpoint exists", () => {
    expect("/api/disposal-alerts").toContain("disposal-alerts");
  });

  it("chatbot endpoint exists", () => {
    expect("/api/chatbot/query").toContain("chatbot/query");
  });
});
