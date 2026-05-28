"use client";

import { useState } from "react";

export default function AutomationPage() {

  const [logs, setLogs] = useState<string[]>([
    "⚡ AI Automation System Online",
  ]);

  function addLog(text: string) {

    setLogs((prev) => [
      `${new Date().toLocaleTimeString()} — ${text}`,
      ...prev,
    ]);

  }

  return (

    <main
      style={{
        background: "#020617",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial",
        padding: "40px",
      }}
    >

      {/* HEADER */}

      <div
        style={{
          marginBottom: "50px",
        }}
      >

        <h1
          style={{
            fontSize: "clamp(40px,8vw,80px)",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          ⚡ AUTOMATION AI OS
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "22px",
            lineHeight: "1.8",
            maxWidth: "1000px",
          }}
        >
          Autonomous workflow orchestration
          system for YouTube automation,
          AI uploads,
          rendering pipelines,
          Telegram control,
          cloud deployment,
          and multi-agent execution.
        </p>

      </div>

      {/* CONTROL CENTER */}

      <section
        style={{
          marginBottom: "60px",
        }}
      >

        <h2
          style={{
            fontSize: "42px",
            marginBottom: "30px",
          }}
        >
          🧠 AI Workflow Controls
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "25px",
          }}
        >

          <ControlCard
            title="📺 Generate Video"
            desc="AI creates full video workflow."
            onRun={() =>
              addLog("📺 Video generation started")
            }
          />

          <ControlCard
            title="🎬 Render Shorts"
            desc="Creates cinematic shorts."
            onRun={() =>
              addLog("🎬 Shorts rendering started")
            }
          />

          <ControlCard
            title="🎤 AI Voice"
            desc="Generate AI voiceover."
            onRun={() =>
              addLog("🎤 AI voice generation started")
            }
          />

          <ControlCard
            title="🖼️ Thumbnail AI"
            desc="Generate viral thumbnails."
            onRun={() =>
              addLog("🖼️ Thumbnail generation started")
            }
          />

          <ControlCard
            title="📤 Auto Upload"
            desc="Upload videos automatically."
            onRun={() =>
              addLog("📤 Upload pipeline activated")
            }
          />

          <ControlCard
            title="📡 Telegram Sync"
            desc="Sync Telegram AI controls."
            onRun={() =>
              addLog("📡 Telegram synchronization online")
            }
          />

        </div>

      </section>

      {/* AI AGENTS */}

      <section
        style={{
          marginBottom: "70px",
        }}
      >

        <h2
          style={{
            fontSize: "42px",
            marginBottom: "30px",
          }}
        >
          🤖 Active Automation Agents
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "25px",
          }}
        >

          <AgentCard
            title="📺 YouTube AI"
            status="ACTIVE"
            color="#ef4444"
          />

          <AgentCard
            title="🎬 Video Editing AI"
            status="RENDERING"
            color="#3b82f6"
          />

          <AgentCard
            title="📸 Instagram AI"
            status="RUNNING"
            color="#ec4899"
          />

          <AgentCard
            title="🌐 Website AI"
            status="ONLINE"
            color="#22c55e"
          />

          <AgentCard
            title="💰 Revenue AI"
            status="TRACKING"
            color="#f59e0b"
          />

          <AgentCard
            title="📡 Telegram AI"
            status="CONNECTED"
            color="#38bdf8"
          />

        </div>

      </section>

      {/* ANALYTICS */}

      <section
        style={{
          marginBottom: "70px",
        }}
      >

        <h2
          style={{
            fontSize: "42px",
            marginBottom: "30px",
          }}
        >
          📊 Automation Analytics
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: "25px",
          }}
        >

          <StatCard
            title="⚡ Running Tasks"
            value="148"
            color="#38bdf8"
          />

          <StatCard
            title="📺 Videos Rendered"
            value="12,482"
            color="#ef4444"
          />

          <StatCard
            title="📤 Upload Queue"
            value="86"
            color="#22c55e"
          />

          <StatCard
            title="💰 Revenue"
            value="$84K"
            color="#f59e0b"
          />

        </div>

      </section>

      {/* SYSTEM LOGS */}

      <section>

        <h2
          style={{
            fontSize: "42px",
            marginBottom: "30px",
          }}
        >
          📜 AI System Logs
        </h2>

        <div
          style={{
            background: "#0f172a",
            borderRadius: "25px",
            padding: "30px",
            border: "1px solid #1e293b",
            minHeight: "300px",
          }}
        >

          {logs.map((log, index) => (

            <div
              key={index}
              style={{
                padding: "12px",
                borderBottom:
                  "1px solid #1e293b",
                color: "#38bdf8",
              }}
            >
              {log}
            </div>

          ))}

        </div>

      </section>

    </main>

  );
}

/* CONTROL CARD */

function ControlCard({
  title,
  desc,
  onRun,
}: {
  title: string;
  desc: string;
  onRun: () => void;
}) {

  return (

    <div
      style={{
        background: "#0f172a",
        padding: "28px",
        borderRadius: "24px",
        border: "1px solid #1e293b",
      }}
    >

      <h2
        style={{
          fontSize: "28px",
          marginBottom: "16px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color: "#94a3b8",
          lineHeight: "1.7",
          marginBottom: "22px",
        }}
      >
        {desc}
      </p>

      <button
        onClick={onRun}
        style={{
          background:
            "linear-gradient(to right,#2563eb,#38bdf8)",
          border: "none",
          color: "white",
          padding: "14px 22px",
          borderRadius: "14px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        🚀 Run Automation
      </button>

    </div>

  );
}

/* AGENT CARD */

function AgentCard({
  title,
  status,
  color,
}: {
  title: string;
  status: string;
  color: string;
}) {

  return (

    <div
      style={{
        background: "#0f172a",
        padding: "28px",
        borderRadius: "24px",
        border: "1px solid #1e293b",
      }}
    >

      <h2
        style={{
          fontSize: "28px",
          marginBottom: "16px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color,
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        ● {status}
      </p>

    </div>

  );
}

/* STATS */

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {

  return (

    <div
      style={{
        background: "#0f172a",
        padding: "30px",
        borderRadius: "24px",
        border: "1px solid #1e293b",
      }}
    >

      <h2
        style={{
          fontSize: "22px",
          marginBottom: "14px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          fontSize: "46px",
          fontWeight: "bold",
          color,
        }}
      >
        {value}
      </p>

    </div>

  );
}
