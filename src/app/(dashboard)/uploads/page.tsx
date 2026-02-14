"use client";

import { useState } from "react";
import { VersionDiffTable, type VersionDiff } from "@/components/uploads/version-diff-table";

export default function UploadsPage() {
  const [diff, setDiff] = useState<VersionDiff | null>(null);
  const [message, setMessage] = useState<string>("");

  async function fetchDiff() {
    const response = await fetch("/api/versions/2/diff/1");
    if (!response.ok) {
      setMessage("Failed to fetch diff.");
      return;
    }
    const data = await response.json();
    setDiff(data);
    setMessage("Diff loaded.");
  }

  return (
    <main>
      <h1>Uploads</h1>
      <p>Upload endpoints are available at /api/uploads/master and /api/uploads/rack.</p>
      <button onClick={fetchDiff}>Load Sample Diff</button>
      <p>{message}</p>
      <VersionDiffTable diff={diff} />
    </main>
  );
}
