"use client";

import { useState } from "react";

export function ChatbotPanel() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function ask() {
    const response = await fetch("/api/chatbot/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });
    const data = await response.json();
    setAnswer(data.answer ?? data.error ?? "No response");
  }

  return (
    <section>
      <h2>Chatbot</h2>
      <input value={question} onChange={(e) => setQuestion(e.target.value)} />
      <button onClick={ask}>Ask</button>
      <p>{answer}</p>
    </section>
  );
}
