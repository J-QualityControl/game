import { NextResponse } from "next/server";
import { listDisposalAlerts } from "@/lib/repositories/alerts-chatbot-repository";

export async function GET(request: Request) {
  const status = new URL(request.url).searchParams.get("status") ?? undefined;
  return NextResponse.json(await listDisposalAlerts(status));
}
