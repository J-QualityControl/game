"use client";

import { useState } from "react";
import { ChatbotPanel } from "@/components/chatbot/chatbot-panel";

type Alert = { id: string; labelN: string; status: string; expiryAt: string | null };

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  async function loadAlerts() {
    const response = await fetch("/api/disposal-alerts");
    setAlerts(await response.json());
  }

  return (
    <main>
      <h1>Disposal Alerts</h1>
      <button onClick={loadAlerts}>Load Alerts</button>
      <ul>
        {alerts.map((a) => (
          <li key={a.id}>{a.labelN} - {a.status}</li>
        ))}
      </ul>
      <ChatbotPanel />
    </main>
  );
}
