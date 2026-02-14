import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function searchByLabel(label: string) {
  const supabase = createAdminSupabaseClient();
  const normalized = label.trim().toUpperCase();

  const { data: exact, error: exactError } = await supabase
    .from("sample")
    .select("id,label_n_normalized,lifecycle_status,expiry_at")
    .eq("label_n_normalized", normalized)
    .limit(1);

  if (exactError) throw exactError;

  const { data: suggestions, error: suggestionError } = await supabase
    .from("sample")
    .select("id,label_n_normalized,lifecycle_status,expiry_at")
    .ilike("label_n_normalized", `${normalized.split("-")[0]}%`)
    .limit(10);

  if (suggestionError) throw suggestionError;

  return {
    exactMatch: exact?.[0] ?? null,
    suggestions: suggestions ?? []
  };
}

export async function getSampleHistory(sampleId: string) {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("event")
    .select("id,event_type,event_time,actor_email,payload")
    .eq("sample_id", sampleId)
    .order("event_time", { ascending: false });

  if (error) throw error;
  return data ?? [];
}
