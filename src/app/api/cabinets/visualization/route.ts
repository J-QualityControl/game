import { NextResponse } from "next/server";
import { getCabinetVisualization } from "@/lib/repositories/cabinet-repository";

export async function GET() {
  return NextResponse.json(await getCabinetVisualization());
}
