"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function CEOPage() {
  const [messages, setMessages] = useState([
    {
      role: "CEO AI",
      text: "Welcome CEO. AI infrastructure is online.",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      {
        role: "You",
        text: input,
      },
      {
        role: "CEO AI",
        text: "Command executed successfully.",
      },
    ]);

    setInput("");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          marginLeft: "260px",
          padding: "20px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            marginBottom: "20px",
          }}
        >
          🚀 CEO AI Chat
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "25px",
            fontSize: "18px",
          }}
        >
          Manage your AI infrastructure and autonomous systems.
        </p>

        <div
          style={{
            background: "#0f172a",
            borderRadius: "20px",
            padding: "20px",
            height: "65vh",
            overflowY: "auto",
            marginBottom: "20px",
            border: "1px solid #1e293b",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                marginBottom: "16px",
                padding: "16px",
                borderRadius: "14px",
                background:
                  msg.role === "You"
                    ? "#2563eb"
                    : "#111827",
              }}
            >
              <strong>{msg.role}</strong>

              <p
                style={{
                  marginTop: "10px",
                  lineHeight: "1.6",
                }}
              >
                {msg.text}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            width: "100%",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type CEO command..."
            style={{
              flex: 1,
              padding: "16px",
              borderRadius: "12px",
              border: "none",
              background: "#1e293b",
              color: "white",
              fontSize: "16px",
              outline: "none",
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              padding: "16px 24px",
              borderRadius: "12px",
              border: "none",
              background: "#2563eb",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
}
