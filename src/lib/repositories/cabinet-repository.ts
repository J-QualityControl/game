import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function getCabinetVisualization() {
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("slot")
    .select("cabinet_no,grid_row,grid_col,position_status,sample:sample_id(label_n_normalized),sample_box:sample_box_id(box_id_normalized)")
    .is("effective_to_upload_id", null);

  if (error) throw error;

  const cabinets = Array.from({ length: 7 }, (_, i) => ({
    cabinetNo: i + 1,
    slots: [] as Array<{ row: number; col: number; status: string; labelN?: string; boxId?: string }>
  }));

  for (const row of data ?? []) {
    const cabinet = cabinets[row.cabinet_no - 1];
    cabinet.slots.push({
      row: row.grid_row,
      col: row.grid_col,
      status: row.position_status,
      labelN: row.sample?.[0]?.label_n_normalized,
      boxId: row.sample_box?.[0]?.box_id_normalized
    });
  }

  return { cabinets };
}
