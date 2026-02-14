import { NextResponse } from "next/server";
import { getVersionDiff } from "@/lib/repositories/upload-repository";

export async function GET(
  _request: Request,
  { params }: { params: { versionNo: string; previousVersionNo: string } }
) {
  const versionNo = Number(params.versionNo);
  const previousVersionNo = Number(params.previousVersionNo);

  if (!Number.isFinite(versionNo) || !Number.isFinite(previousVersionNo)) {
    return NextResponse.json({ error: "invalid version numbers" }, { status: 400 });
  }

  const out = await getVersionDiff(versionNo, previousVersionNo);
  return NextResponse.json({
    addedCount: out.added_count,
    removedCount: out.removed_count,
    changedCount: out.changed_count,
    mappingChangedCount: out.mapping_changed_count
  });
}
