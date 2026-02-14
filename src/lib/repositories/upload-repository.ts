import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function completeUpload(uploadId: string) {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from("upload")
    .update({ ingest_status: "succeeded", ingest_completed_at: new Date().toISOString() })
    .eq("id", uploadId);
  if (error) throw error;
}

export async function failUpload(uploadId: string, reason: string) {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from("upload")
    .update({ ingest_status: "failed", notes: reason, ingest_completed_at: new Date().toISOString() })
    .eq("id", uploadId);
  if (error) throw error;
}

export async function getVersionDiff(versionNo: number, previousVersionNo: number) {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase.rpc("get_version_diff", {
    curr_version: versionNo,
    prev_version: previousVersionNo
  });
  if (error) throw error;
  return data?.[0] ?? { added_count: 0, removed_count: 0, changed_count: 0, mapping_changed_count: 0 };
}
