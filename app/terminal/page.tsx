"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function TerminalPage() {
  const [command, setCommand] = useState("");
  const [logs, setLogs] = useState([
    "🚀 AI SYSTEM INITIALIZED",
    "🧠 Memory Engine Online",
    "⚡ Automation Core Active",
    "📡 Telegram Bots Connected",
  ]);

  const runCommand = () => {
    if (!command) return;

    setLogs((prev) => [
      ...prev,
      `> ${command}`,
      "✅ Command Executed Successfully",
    ]);

    setCommand("");
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
          padding: "40px",
          fontFamily: "Arial",
        }}
      >
        {/* TITLE */}

        <div
          style={{
            marginBottom: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "60px",
              marginBottom: "20px",
            }}
          >
            💻 AI Terminal
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "22px",
              lineHeight: "1.8",
            }}
          >
            Autonomous command interface for controlling
            AI agents, workflows, analytics, automation,
            and cloud infrastructure.
          </p>
        </div>

        {/* TERMINAL */}

        <div
          style={{
            background: "#000000",
            borderRadius: "24px",
            padding: "30px",
            border: "1px solid #1e293b",
            marginBottom: "30px",
          }}
        >
          {/* TOP BAR */}

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "25px",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "#ef4444",
              }}
            />

            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "#f59e0b",
              }}
            />

            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
          </div>

          {/* LOGS */}

          <div
            style={{
              minHeight: "350px",
              marginBottom: "25px",
              fontFamily: "monospace",
              color: "#22c55e",
              fontSize: "18px",
              lineHeight: "2",
            }}
          >
            {logs.map((log, index) => (
              <div key={index}>{log}</div>
            ))}
          </div>

          {/* INPUT */}

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <input
              value={command}
              onChange={(e) =>
                setCommand(e.target.value)
              }
              placeholder="Enter AI command..."
              style={{
                flex: 1,
                minWidth: "300px",
                padding: "18px",
                borderRadius: "14px",
                border: "none",
                background: "#111827",
                color: "white",
                fontSize: "18px",
              }}
            />

            <button
              onClick={runCommand}
              style={{
                background:
                  "linear-gradient(to right,#2563eb,#38bdf8)",
                border: "none",
                padding: "18px 30px",
                borderRadius: "14px",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Execute
            </button>
          </div>
        </div>

        {/* QUICK COMMANDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: "20px",
          }}
        >
          <QuickCommand text="🚀 Start AI Agents" />
          <QuickCommand text="📺 Launch YouTube AI" />
          <QuickCommand text="📸 Open Instagram AI" />
          <QuickCommand text="⚡ Run Automation" />
          <QuickCommand text="💰 Analyze Revenue" />
          <QuickCommand text="🧠 Activate Memory AI" />
        </div>
      </main>
    </>
  );
}

/* QUICK COMMAND */

function QuickCommand({
  text,
}: {
  text: string;
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        padding: "26px",
        borderRadius: "22px",
        border: "1px solid #1e293b",
        fontSize: "22px",
        fontWeight: "bold",
      }}
    >
      {text}
    </div>
  );
}
