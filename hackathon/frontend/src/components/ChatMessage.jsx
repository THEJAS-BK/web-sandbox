import React from "react";
export default function ChatMessage({ m }) {
  return (
    <div style={{ margin: "8px 0" }}>
      <div style={{ fontSize: 12, color: "#666" }}>
        {m.from === "user" ? "You" : "NMI"}
      </div>
      <div
        style={{
          padding: 8,
          borderRadius: 6,
          background: m.from === "user" ? "#e6f7ff" : "#f3f3f3",
        }}
      >
        {m.text}
      </div>
    </div>
  );
}
