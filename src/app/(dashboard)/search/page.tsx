"use client";

import { useState } from "react";
import { HistoryTimeline } from "@/components/search/history-timeline";

type HistoryEvent = { id: string; eventType: string; eventTime: string };

export default function SearchPage() {
  const [label, setLabel] = useState("LABEL-1");
  const [history, setHistory] = useState<HistoryEvent[]>([]);
  const [result, setResult] = useState<string>("");

  async function runSearch() {
    const response = await fetch(`/api/samples/search?label=${encodeURIComponent(label)}`);
    const data = await response.json();
    setResult(data.exactMatch?.label_n_normalized ?? "No exact match");
  }

  async function loadHistory() {
    const response = await fetch(`/api/samples/sample-id/history`);
    const data = await response.json();
    setHistory(data);
  }

  return (
    <main>
      <h1>Label Search</h1>
      <input value={label} onChange={(e) => setLabel(e.target.value)} />
      <button onClick={runSearch}>Search</button>
      <button onClick={loadHistory}>Load History</button>
      <p>{result}</p>
      <HistoryTimeline events={history} />
    </main>
  );
}
