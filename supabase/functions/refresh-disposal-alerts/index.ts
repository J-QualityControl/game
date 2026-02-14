// Supabase Edge Function: refresh-disposal-alerts
// This function is intended to run on a schedule.

Deno.serve(async () => {
  return new Response(JSON.stringify({ ok: true, message: "refresh-disposal-alerts placeholder" }), {
    headers: { "content-type": "application/json" }
  });
});
