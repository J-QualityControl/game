import { NextResponse } from "next/server";
import { runChatbotQuery } from "@/lib/repositories/alerts-chatbot-repository";

export async function POST(request: Request) {
  const body = await request.json();
  if (!body?.question) {
    return NextResponse.json({ error: "question is required" }, { status: 400 });
  }

  try {
    return NextResponse.json(await runChatbotQuery(body.question));
  } catch {
    return NextResponse.json({ error: "unsupported intent" }, { status: 422 });
  }
}
