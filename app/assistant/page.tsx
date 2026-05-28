"use client";

import { useState } from "react";

export default function AssistantPage() {

  const [command, setCommand] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [activeAgent, setActiveAgent] =
    useState("👑 CEO AI");

  async function executeCommand(
    customCommand?: string
  ) {

    const finalCommand =
      customCommand || command;

    if (!finalCommand) return;

    setLoading(true);

    setResponse("");

    try {

      const lower =
        finalCommand.toLowerCase();

      /* =========================
         YOUTUBE AI
      ========================== */

      if (
        lower.includes("youtube") ||
        lower.includes("shorts") ||
        lower.includes("viral") ||
        lower.includes("video")
      ) {

        setActiveAgent("📺 YouTube AI");

        const res = await fetch(
          "/api/youtube/generate",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              topic: finalCommand,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {

          setResponse(
            data.error ||
            "❌ YouTube AI Failed"
          );

        } else {

          setResponse(
            data.result ||
            "⚠️ No AI response"
          );

        }

        setLoading(false);

        return;
      }

      /* =========================
         INSTAGRAM AI
      ========================== */

      if (
        lower.includes("instagram") ||
        lower.includes("reels")
      ) {

        setActiveAgent("📸 Instagram AI");
      }

      /* =========================
         WEBSITE AI
      ========================== */

      else if (
        lower.includes("website") ||
        lower.includes("web")
      ) {

        setActiveAgent("🌐 Website AI");
      }

      /* =========================
         REVENUE AI
      ========================== */

      else if (
        lower.includes("revenue") ||
        lower.includes("money")
      ) {

        setActiveAgent("💰 Revenue AI");
      }

      /* =========================
         CEO AI
      ========================== */

      else {

        setActiveAgent("👑 CEO AI");
      }

      /* =========================
         CEO AI API
      ========================== */

      const res = await fetch(
        "/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            message:
              "Execute this AI OS command: " +
              finalCommand,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {

        setResponse(
          data.error ||
          "❌ CEO AI Error"
        );

      } else {

        setResponse(
          data.reply ||
          "⚠️ No AI response"
        );

      }

    } catch (err: any) {

      setResponse(
        "❌ AI COMMAND ERROR\n\n" +
        err.message
      );

    }

    setLoading(false);
  }

  const quickCommands = [

    "Run YouTube AI",
    "Generate Viral Shorts",
    "Start Instagram Automation",
    "Create AI Website",
    "Generate Revenue Plan",
    "Analyze YouTube Growth",
    "Create Viral Finance Channel",
    "Build Ecommerce Strategy",

  ];

  return (

    <main
      style={{
        background: "#020617",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >

      {/* HEADER */}

      <h1
        style={{
          fontSize: "60px",
          marginBottom: "20px",
        }}
      >
        👑 CEO AI COMMAND CENTER
      </h1>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "22px",
          marginBottom: "40px",
          lineHeight: "1.8",
        }}
      >
        Autonomous AI infrastructure
        controlling business systems,
        automation workflows,
        analytics and AI agents.
      </p>

      {/* STATUS */}

      <div
        style={{
          background: "#0f172a",
          padding: "30px",
          borderRadius: "24px",
          marginBottom: "30px",
          border: "1px solid #1e293b",
        }}
      >

        <h2
          style={{
            fontSize: "32px",
            marginBottom: "20px",
          }}
        >
          🟢 AI SYSTEM STATUS
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >

          <Card
            title="AI Status"
            value="ONLINE"
          />

          <Card
            title="Active Agent"
            value={activeAgent}
          />

          <Card
            title="Tasks Running"
            value="128"
          />

          <Card
            title="Cloud Sync"
            value="ACTIVE"
          />

        </div>

      </div>

      {/* COMMAND CENTER */}

      <div
        style={{
          background: "#0f172a",
          padding: "30px",
          borderRadius: "24px",
          border: "1px solid #1e293b",
          marginBottom: "30px",
        }}
      >

        <h2
          style={{
            fontSize: "32px",
            marginBottom: "20px",
          }}
        >
          ⚡ AI Command Center
        </h2>

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

            placeholder="Give command to AI OS..."

            style={{
              flex: 1,
              padding: "18px",
              borderRadius: "14px",
              border: "none",
              background: "#111827",
              color: "white",
              fontSize: "18px",
            }}
          />

          <button
            onClick={() =>
              executeCommand()
            }

            style={{
              background:
                "linear-gradient(to right,#2563eb,#38bdf8)",

              padding: "16px 28px",

              borderRadius: "14px",

              border: "none",

              color: "white",

              fontSize: "18px",

              fontWeight: "bold",

              cursor: "pointer",
            }}
          >
            {loading
              ? "🤖 Executing..."
              : "🚀 Execute"}
          </button>

        </div>

        {/* RESPONSE */}

        <div
          style={{
            marginTop: "25px",
            background: "#020617",
            padding: "25px",
            borderRadius: "18px",
            minHeight: "240px",
            border: "1px solid #1e293b",
            color: "#38bdf8",
            whiteSpace: "pre-wrap",
            lineHeight: "1.9",
          }}
        >

          {loading
            ? "⚡ AI OS processing..."
            : response ||
              "AI response appears here..."}

        </div>

      </div>

      {/* QUICK COMMANDS */}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "40px",
        }}
      >

        {quickCommands.map(
          (cmd, index) => (

            <button
              key={index}

              onClick={() => {

                setCommand(cmd);

                executeCommand(cmd);

              }}

              style={{
                background: "#111827",

                border:
                  "1px solid #1e293b",

                color: "white",

                padding: "14px 22px",

                borderRadius: "14px",

                cursor: "pointer",
              }}
            >
              ⚡ {cmd}
            </button>

          )
        )}

      </div>

      {/* MODULES */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",

          gap: "25px",
        }}
      >

        <Module
          title="📺 YouTube AI"
          desc="Creates viral videos and automation."
        />

        <Module
          title="📸 Instagram AI"
          desc="Automates reels and growth."
        />

        <Module
          title="🎬 Video AI"
          desc="Creates cinematic AI videos."
        />

        <Module
          title="💰 Revenue AI"
          desc="Optimizes monetization systems."
        />

        <Module
          title="🧠 Memory AI"
          desc="Stores successful AI strategies."
        />

        <Module
          title="🌐 Website AI"
          desc="Builds websites automatically."
        />

      </div>

    </main>
  );
}

/* =========================
   CARD
========================= */

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {

  return (

    <div
      style={{
        background: "#111827",
        padding: "24px",
        borderRadius: "18px",
      }}
    >

      <h3
        style={{
          marginBottom: "12px",
          color: "#94a3b8",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        {value}
      </p>

    </div>

  );
}

/* =========================
   MODULE
========================= */

function Module({
  title,
  desc,
}: {
  title: string;
  desc: string;
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
          marginBottom: "14px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color: "#94a3b8",
          lineHeight: "1.8",
          fontSize: "18px",
        }}
      >
        {desc}
      </p>

    </div>

  );
}
