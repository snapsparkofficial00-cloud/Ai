"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main
      style={{
        background:
          "linear-gradient(to bottom,#020617,#0f172a)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background: "#0f172a",
          width: "100%",
          maxWidth: "500px",
          padding: "50px",
          borderRadius: "30px",
          border: "1px solid #1e293b",
          color: "white",
          boxShadow: "0 0 40px rgba(37,99,235,0.3)",
        }}
      >
        {/* TITLE */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "56px",
              marginBottom: "20px",
            }}
          >
            🚀 AI OS
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "20px",
              lineHeight: "1.8",
            }}
          >
            Advanced AI Operating System Access Portal
          </p>
        </div>

        {/* EMAIL */}

        <div
          style={{
            marginBottom: "25px",
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: "12px",
              fontSize: "18px",
            }}
          >
            📧 Email
          </label>

          <input
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "16px",
              border: "none",
              background: "#111827",
              color: "white",
              fontSize: "18px",
            }}
          />
        </div>

        {/* PASSWORD */}

        <div
          style={{
            marginBottom: "35px",
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: "12px",
              fontSize: "18px",
            }}
          >
            🔒 Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter password"
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "16px",
              border: "none",
              background: "#111827",
              color: "white",
              fontSize: "18px",
            }}
          />
        </div>

        {/* BUTTON */}

        <button
          style={{
            width: "100%",
            padding: "20px",
            borderRadius: "18px",
            border: "none",
            background:
              "linear-gradient(to right,#2563eb,#38bdf8)",
            color: "white",
            fontSize: "22px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "25px",
          }}
        >
          🚀 Access AI System
        </button>

        {/* INFO */}

        <div
          style={{
            background: "#111827",
            padding: "20px",
            borderRadius: "18px",
          }}
        >
          <h2
            style={{
              marginBottom: "14px",
              fontSize: "24px",
            }}
          >
            🟢 System Status
          </h2>

          <div
            style={{
              color: "#94a3b8",
              lineHeight: "1.9",
            }}
          >
            <p>🤖 AI Core: ONLINE</p>
            <p>⚡ Automation: ACTIVE</p>
            <p>☁️ Cloud: CONNECTED</p>
            <p>📡 Bots: RUNNING</p>
          </div>
        </div>
      </div>
    </main>
  );
}
