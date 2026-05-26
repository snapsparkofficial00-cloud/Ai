"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function CEOPage() {
  const [messages, setMessages] = useState([
    {
      sender: "CEO AI",
      text: "Welcome Commander. AI ecosystem is operational.",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;

    const userMessage = {
      sender: "You",
      text: input,
    };

    const aiMessage = {
      sender: "CEO AI",
      text: "Task received: " + input,
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
            fontSize: "38px",
            marginBottom: "20px",
          }}
        >
          CEO AI Command Center
        </h1>

        <div
          style={{
            background: "#0f172a",
            borderRadius: "16px",
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
                marginBottom: "15px",
                padding: "14px",
                borderRadius: "12px",
                background:
                  msg.sender === "You" ? "#2563eb" : "#1e293b",
              }}
            >
              <strong>{msg.sender}</strong>
              <p style={{ marginTop: "6px" }}>{msg.text}</p>
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
            type="text"
            placeholder="Give CEO AI a command..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background: "#1e293b",
              color: "white",
              fontSize: "16px",
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              padding: "14px 22px",
              border: "none",
              borderRadius: "10px",
              background: "#2563eb",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Send
          </button>
        </div>
      </main>
    </>
  );
}
