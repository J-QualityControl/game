import { NextResponse } from "next/server";
import { searchByLabel } from "@/lib/repositories/search-repository";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const label = searchParams.get("label");
  if (!label) return NextResponse.json({ error: "label is required" }, { status: 400 });

  const out = await searchByLabel(label);
  return NextResponse.json(out);
}
