import { describe, expect, it, vi } from "vitest";
import { publishUploadVersion } from "@/lib/ingest/publish-version";

vi.mock("@/lib/supabase/admin", () => {
  const from = () => ({
    select: () => ({
      order: () => ({
        limit: async () => ({ data: [{ version_no: 3 }], error: null })
      })
    }),
    insert: () => ({
      select: () => ({
        single: async () => ({
          data: { id: "u1", version_no: 4, ingest_status: "processing" },
          error: null
        })
      })
    })
  });

  return {
    createAdminSupabaseClient: () => ({ from })
  };
});

describe("publishUploadVersion", () => {
  it("creates next version", async () => {
    const out = await publishUploadVersion({
      sourceType: "master",
      filename: "master.csv",
      checksum: "abc",
      submittedByEmail: "ops@example.com"
    });

    expect(out.version_no).toBe(4);
  });
});
