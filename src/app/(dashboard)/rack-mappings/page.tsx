"use client";

import { useState } from "react";
import { RackMappingTable } from "@/components/mappings/rack-mapping-table";

type Mapping = { boxId: string; labelN: string; rackCode?: string | null };

export default function RackMappingsPage() {
  const [rows, setRows] = useState<Mapping[]>([]);

  async function load() {
    const response = await fetch("/api/rack-mappings");
    setRows(await response.json());
  }

  return (
    <main>
      <h1>Rack Mappings</h1>
      <button onClick={load}>Load</button>
      <RackMappingTable rows={rows} />
    </main>
  );
}
