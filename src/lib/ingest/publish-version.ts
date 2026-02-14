import { createAdminSupabaseClient } from "@/lib/supabase/admin";

type PublishInput = {
  sourceType: "master" | "rack" | "combined";
  filename: string;
  checksum: string;
  submittedByEmail: string;
  notes?: string;
};

export async function publishUploadVersion(input: PublishInput) {
  const supabase = createAdminSupabaseClient();

  const { data: maxVersionRows, error: maxVersionError } = await supabase
    .from("upload")
    .select("version_no")
    .order("version_no", { ascending: false })
    .limit(1);

  if (maxVersionError) throw maxVersionError;

  const nextVersion = (maxVersionRows?.[0]?.version_no ?? 0) + 1;

  const { data, error } = await supabase
    .from("upload")
    .insert({
      version_no: nextVersion,
      source_type: input.sourceType,
      source_filename: input.filename,
      file_checksum_sha256: input.checksum,
      ingest_status: "processing",
      submitted_by_email: input.submittedByEmail,
      notes: input.notes ?? null
    })
    .select("id, version_no, ingest_status")
    .single();

  if (error) throw error;
  return data;
}
