import { z } from "zod";

export const RackRowSchema = z.object({
  box_id: z.string().min(1),
  label_n: z.string().min(1),
  cabinet_no: z.number().int().min(1).max(7),
  grid_row: z.number().int().min(1).max(7),
  grid_col: z.number().int().min(1).max(5)
});

export type RackRow = z.infer<typeof RackRowSchema>;
