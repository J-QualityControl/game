import { NextResponse } from "next/server";
import { getSampleHistory } from "@/lib/repositories/search-repository";

export async function GET(
  _request: Request,
  { params }: { params: { sampleId: string } }
) {
  const rows = await getSampleHistory(params.sampleId);
  return NextResponse.json(rows.map((r) => ({
    id: r.id,
    eventType: r.event_type,
    eventTime: r.event_time,
    actorEmail: r.actor_email,
    payload: r.payload
  })));
}
