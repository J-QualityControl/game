import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { assertValidBoxId } from "@/lib/validation/box-id";
import { assertValidLabelN } from "@/lib/validation/label-n";

export async function listRackMappings() {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("slot")
    .select("sample_box:sample_box_id(box_id_normalized,rack_code),sample:sample_id(label_n_normalized)")
    .is("effective_to_upload_id", null)
    .limit(500);

  if (error) throw error;

  return (data ?? []).map((row) => ({
    boxId: row.sample_box?.[0]?.box_id_normalized,
    labelN: row.sample?.[0]?.label_n_normalized,
    rackCode: row.sample_box?.[0]?.rack_code
  }));
}

export async function updateRackMapping(boxIdRaw: string, labelNRaw: string) {
  const boxId = assertValidBoxId(boxIdRaw);
  const labelN = assertValidLabelN(labelNRaw);
  return { boxId, labelN, rackCode: null };
}
