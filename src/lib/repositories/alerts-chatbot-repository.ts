import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function listDisposalAlerts(status?: string) {
  const supabase = createAdminSupabaseClient();
  let query = supabase
    .from("event")
    .select("id,payload,event_time")
    .eq("event_type", "disposal_alert_created")
    .order("event_time", { ascending: false });

  if (status) query = query.contains("payload", { status });

  const { data, error } = await query.limit(200);
  if (error) throw error;

  return (data ?? []).map((d) => ({
    id: d.id,
    status: d.payload?.status ?? "pending",
    labelN: d.payload?.labelN ?? "",
    expiryAt: d.payload?.expiryAt ?? null
  }));
}

export async function updateDisposalAlertStatus(alertId: string, status: "pending" | "reviewed" | "completed") {
  const supabase = createAdminSupabaseClient();
  const { error } = await supabase
    .from("event")
    .update({ payload: { status } })
    .eq("id", alertId)
    .eq("event_type", "disposal_alert_created");
  if (error) throw error;
  return { id: alertId, status };
}

export async function runChatbotQuery(question: string) {
  const q = question.toLowerCase();
  if (q.includes("expiry")) {
    return { answer: "Supported intent: expiry summary.", sources: ["sample", "event"], confidence: 0.8 };
  }
  if (q.includes("where")) {
    return { answer: "Supported intent: location lookup.", sources: ["slot", "sample_box"], confidence: 0.8 };
  }
  throw new Error("unsupported_intent");
}
