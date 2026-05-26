"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function CEOPage() {
  const [messages, setMessages] = useState([
    {
      role: "CEO AI",
      text: "Welcome CEO. AI ecosystem is online.",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;

    setMessages([
      ...messages,
      {
        role: "You",
        text: input,
      },
      {
        role: "CEO AI",
        text: "Command received successfully.",
      },
    ]);

    setInput("");
  };

  return (
    <>
      <Sidebar />

      <main
        style={{
          marginLeft: "280px",
          minHeight: "100vh",
          background: "#020617",
          color: "white",
          padding: "30px",
          fontFamily: "Arial",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "30px",
          }}
        >
          CEO AI Chat
        </h1>

        <div
          style={{
            background: "#0f172a",
            borderRadius: "20px",
            padding: "20px",
            height: "70vh",
            overflowY: "auto",
            marginBottom: "20px",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                padding: "15px",
                borderRadius: "12px",
                background:
                  msg.role === "You" ? "#2563eb" : "#1e293b",
              }}
            >
              <strong>{msg.role}:</strong>

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
            gap: "15px",
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
              outline: "none",
              background: "#1e293b",
              color: "white",
              fontSize: "16px",
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              padding: "16px 30px",
              border: "none",
              borderRadius: "12px",
              background: "#2563eb",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Send
          </button>
        </div>
      </main>
    </>
  );
}
