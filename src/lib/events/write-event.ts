import { createAdminSupabaseClient } from "@/lib/supabase/admin";

type EventInput = {
  eventType: string;
  actorEmail: string;
  uploadId?: string;
  sampleId?: string;
  sampleBoxId?: string;
  payload?: Record<string, unknown>;
};

export async function writeEvent(input: EventInput) {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase.from("event").insert({
    event_type: input.eventType,
    actor_email: input.actorEmail,
    upload_id: input.uploadId ?? null,
    sample_id: input.sampleId ?? null,
    sample_box_id: input.sampleBoxId ?? null,
    payload: input.payload ?? {}
  });

  if (error) throw error;
}
