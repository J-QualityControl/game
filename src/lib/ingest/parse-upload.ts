import { MasterRowSchema, type MasterRow } from "@/lib/validation/master-row";
import { RackRowSchema, type RackRow } from "@/lib/validation/rack-row";

type ParseResult<T> = { rows: T[]; errors: string[] };

function parseCsv(content: string): Record<string, string>[] {
  const lines = content.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const header = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim());
    return Object.fromEntries(header.map((h, i) => [h, values[i] ?? ""]));
  });
}

export function parseMasterCsv(content: string): ParseResult<MasterRow> {
  const rows = parseCsv(content);
  const out: MasterRow[] = [];
  const errors: string[] = [];

  rows.forEach((row, idx) => {
    const parsed = MasterRowSchema.safeParse({
      label_n: row.label_n,
      sample_type: row.sample_type,
      lifecycle_status: row.lifecycle_status,
      expiry_at: row.expiry_at || undefined
    });
    if (parsed.success) out.push(parsed.data);
    else errors.push(`row ${idx + 2}: ${parsed.error.issues[0]?.message ?? "invalid"}`);
  });

  return { rows: out, errors };
}

export function parseRackCsv(content: string): ParseResult<RackRow> {
  const rows = parseCsv(content);
  const out: RackRow[] = [];
  const errors: string[] = [];

  rows.forEach((row, idx) => {
    const parsed = RackRowSchema.safeParse({
      box_id: row.box_id,
      label_n: row.label_n,
      cabinet_no: Number(row.cabinet_no),
      grid_row: Number(row.grid_row),
      grid_col: Number(row.grid_col)
    });
    if (parsed.success) out.push(parsed.data);
    else errors.push(`row ${idx + 2}: ${parsed.error.issues[0]?.message ?? "invalid"}`);
  });

  return { rows: out, errors };
}
