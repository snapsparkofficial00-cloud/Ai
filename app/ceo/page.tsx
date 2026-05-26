"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function CEOPage() {
  const [messages, setMessages] = useState([
    {
      role: "CEO AI",
      text: "Welcome CEO. Your AI ecosystem is online.",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;

    const userMessage = {
      role: "You",
      text: input,
    };

    const aiMessage = {
      role: "CEO AI",
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
            fontSize: "36px",
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
            height: "70vh",
            overflowY: "auto",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                marginBottom: "15px",
              }}
            >
              <strong>{msg.role}: </strong>
              {msg.text}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "20px",
            gap: "10px",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Give command to AI CEO..."
            style={{
              flex: 1,
              padding: "15px",
              borderRadius: "10px",
              border: "none",
              background: "#1e293b",
              color: "white",
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              padding: "15px 25px",
              border: "none",
              borderRadius: "10px",
              background: "#3b82f6",
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
