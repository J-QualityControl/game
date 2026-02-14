import { describe, expect, it } from "vitest";

function classifyIntent(q: string) {
  if (q.toLowerCase().includes("expiry")) return "expiry_summary";
  if (q.toLowerCase().includes("where")) return "location_lookup";
  return "unsupported";
}

describe("chatbot intent routing", () => {
  it("classifies expiry intent", () => {
    expect(classifyIntent("show expiry list")).toBe("expiry_summary");
  });
});
