import { NextResponse } from "next/server";
import { publishUploadVersion } from "@/lib/ingest/publish-version";
import { parseMasterCsv } from "@/lib/ingest/parse-upload";
import { completeUpload, failUpload } from "@/lib/repositories/upload-repository";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }

  const uploaded = await publishUploadVersion({
    sourceType: "master",
    filename: file.name,
    checksum: `size-${file.size}`,
    submittedByEmail: "system@example.com"
  });

  try {
    const content = await file.text();
    const parsed = parseMasterCsv(content);
    if (parsed.errors.length > 0) {
      await failUpload(uploaded.id, parsed.errors.join("; "));
      return NextResponse.json({ errors: parsed.errors }, { status: 400 });
    }

    await completeUpload(uploaded.id);
    return NextResponse.json({ uploadId: uploaded.id, versionNo: uploaded.version_no, status: "succeeded" }, { status: 201 });
  } catch (err) {
    await failUpload(uploaded.id, err instanceof Error ? err.message : "unknown error");
    return NextResponse.json({ error: "failed to process upload" }, { status: 500 });
  }
}
