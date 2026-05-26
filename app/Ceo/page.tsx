"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function CEOPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      role: "ai",
      text: "Hello CEO. AI System is online. What do you want to build today?",
    },
  ]);

  const sendMessage = () => {
    if (!message) return;

    const newChat = [
      ...chat,
      { role: "user", text: message },
      {
        role: "ai",
        text:
          "AI CEO Assistant received: " +
          message +
          ". Strategic analysis processing...",
      },
    ];

    setChat(newChat);
    setMessage("");
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
          CEO AI Assistant
        </h1>

        <div
          style={{
            background: "#0f172a",
            borderRadius: "15px",
            padding: "20px",
            height: "500px",
            overflowY: "auto",
            marginBottom: "20px",
          }}
        >
          {chat.map((msg, index) => (
            <div
              key={index}
              style={{
                marginBottom: "15px",
                textAlign: msg.role === "user" ? "right" : "left",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "12px",
                  borderRadius: "12px",
                  background:
                    msg.role === "user" ? "#2563eb" : "#1e293b",
                  maxWidth: "70%",
                }}
              >
                <strong>
                  {msg.role === "user" ? "YOU" : "CEO AI"}
                </strong>

                <p
                  style={{
                    marginTop: "5px",
                  }}
                >
                  {msg.text}
                </p>
              </div>
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask your AI CEO..."
            style={{
              flex: 1,
              padding: "15px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
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
              fontWeight: "bold",
            }}
          >
            SEND
          </button>
        </div>
      </main>
    </>
  );
}
