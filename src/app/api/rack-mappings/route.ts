import { NextResponse } from "next/server";
import { listRackMappings, updateRackMapping } from "@/lib/repositories/rack-mapping-repository";

export async function GET() {
  return NextResponse.json(await listRackMappings());
}

export async function PATCH(request: Request) {
  const body = await request.json();
  if (!body?.boxId || !body?.labelN) {
    return NextResponse.json({ error: "boxId and labelN are required" }, { status: 400 });
  }

  try {
    return NextResponse.json(await updateRackMapping(body.boxId, body.labelN));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "conflict" }, { status: 409 });
  }
}
