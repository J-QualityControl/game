"use client";

import { useState } from "react";
import { CabinetGrid } from "@/components/cabinets/cabinet-grid";

type Cabinet = { cabinetNo: number; slots: Array<{ row: number; col: number; status: string; labelN?: string; boxId?: string }> };

export default function CabinetsPage() {
  const [cabinets, setCabinets] = useState<Cabinet[]>([]);

  async function load() {
    const response = await fetch("/api/cabinets/visualization");
    const data = await response.json();
    setCabinets(data.cabinets ?? []);
  }

  return (
    <main>
      <h1>Cabinet Visualization</h1>
      <button onClick={load}>Load Cabinets</button>
      {cabinets.map((cabinet) => (
        <section key={cabinet.cabinetNo}>
          <h2>Cabinet {cabinet.cabinetNo}</h2>
          <CabinetGrid slots={cabinet.slots} />
        </section>
      ))}
    </main>
  );
}
