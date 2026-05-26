"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function CEOPage() {
  const [messages, setMessages] = useState([
    {
      sender: "CEO AI",
      text: "Welcome CEO. AI ecosystem is online.",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "You",
      text: input,
    };

    const aiMessage = {
      sender: "CEO AI",
      text: "Command received: " + input,
    };

    setMessages([...messages, userMessage, aiMessage]);
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
            fontSize: "32px",
            marginBottom: "20px",
          }}
        >
          CEO AI Chat
        </h1>

        <div
          style={{
            background: "#0f172a",
            borderRadius: "12px",
            padding: "20px",
            height: "500px",
            overflowY: "auto",
            marginBottom: "20px",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                marginBottom: "15px",
              }}
            >
              <strong>{msg.sender}:</strong>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type CEO command..."
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background: "#1e293b",
              color: "white",
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              padding: "14px 24px",
              border: "none",
              borderRadius: "10px",
              background: "#2563eb",
              color: "white",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      </main>
    </>
  );
}
