import React, { useState } from "react";
import api from "../api/axios";
import ChatMessage from "../components/ChatMessage";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    const userMsg = { id: Date.now(), from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    try {
      const res = await api.post("/chat", { query: text });
      const botMsg = { id: Date.now() + 1, from: "bot", text: res.data.answer };
      // include sources if returned: res.data.sources
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 2, from: "bot", text: "Failed to get response" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900 }}>
      <h2>Ask the National Memory</h2>
      <div
        style={{
          minHeight: 300,
          border: "1px solid #eee",
          padding: 12,
          overflowY: "auto",
        }}
      >
        {messages.map((m) => (
          <ChatMessage key={m.id} m={m} />
        ))}
      </div>
      <ChatInput onSend={sendMessage} disabled={loading} />
    </div>
  );
}
