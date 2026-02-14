import { z } from "zod";

export const MasterRowSchema = z.object({
  label_n: z.string().min(1),
  sample_type: z.string().optional(),
  lifecycle_status: z.enum(["active", "reserved", "disposed", "missing"]).default("active"),
  expiry_at: z.string().datetime().optional()
});

export type MasterRow = z.infer<typeof MasterRowSchema>;
