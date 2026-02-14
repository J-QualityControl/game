import { NextResponse } from "next/server";
import { updateDisposalAlertStatus } from "@/lib/repositories/alerts-chatbot-repository";

export async function PATCH(
  request: Request,
  { params }: { params: { alertId: string } }
) {
  const body = await request.json();
  const status = body?.status;
  if (!["pending", "reviewed", "completed"].includes(status)) {
    return NextResponse.json({ error: "invalid status" }, { status: 400 });
  }
  return NextResponse.json(await updateDisposalAlertStatus(params.alertId, status));
}
