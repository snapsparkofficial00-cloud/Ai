"use client";

import { useState } from "react";

export default function YouTubeAIPage() {

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [activeNiche, setActiveNiche] = useState("");

  async function generateScript(customPrompt?: string) {

    const finalPrompt = customPrompt || prompt;

    if (!finalPrompt) return;

    setLoading(true);

    setActiveNiche(finalPrompt);

    try {

      const res = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message:
            "Create a FULL viral YouTube automation strategy for: " +
            finalPrompt +
            ". Include viral titles, hooks, thumbnails, SEO description, hashtags, shorts ideas, monetization, upload schedule and AI workflow.",
        }),
      });

      const data = await res.json();

      setResult(data.reply);

    } catch (err) {

      setResult("❌ AI ERROR");

    }

    setLoading(false);
  }

  function copyResult() {

    navigator.clipboard.writeText(result);

  }

  const niches = [
    "🏎️ Supercars",
    "💸 Finance",
    "🤖 AI Tech",
    "🎮 Gaming",
    "🌌 Space",
    "🧠 Motivation",
    "🎬 Movie Edits",
    "🔥 Viral Facts",
    "📱 Tech Reviews",
    "💼 Business",
    "🛸 Sci-Fi",
    "🎵 Music",
  ];

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

      {/* HERO */}

      <div
        style={{
          marginBottom: "50px",
        }}
      >

        <h1
          style={{
            fontSize: "clamp(45px,8vw,90px)",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          🚀 YOUTUBE AI OS
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "22px",
            lineHeight: "1.8",
            maxWidth: "950px",
          }}
        >
          Autonomous AI system for YouTube growth,
          automation, monetization, viral content,
          AI scripts, shorts generation and
          business scaling.
        </p>

      </div>

      {/* AI STATUS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >

        <StatusCard
          title="🤖 AI STATUS"
          value="ONLINE"
          color="#22c55e"
        />

        <StatusCard
          title="⚡ ACTIVE NICHE"
          value={activeNiche || "NONE"}
          color="#38bdf8"
        />

        <StatusCard
          title="🔥 AI ENGINE"
          value="LLAMA 70B"
          color="#f59e0b"
        />

        <StatusCard
          title="📺 VIRAL SCORE"
          value="98%"
          color="#ef4444"
        />

      </div>

      {/* AI INPUT */}

      <div
        style={{
          background: "#0f172a",
          padding: "35px",
          borderRadius: "25px",
          border: "1px solid #1e293b",
          marginBottom: "50px",
        }}
      >

        <h2
          style={{
            fontSize: "36px",
            marginBottom: "25px",
          }}
        >
          🤖 AI Viral Generator
        </h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >

          <input
            value={prompt}
            onChange={(e) =>
              setPrompt(e.target.value)
            }
            placeholder="Enter YouTube idea..."
            style={{
              flex: 1,
              padding: "18px",
              borderRadius: "16px",
              border: "1px solid #334155",
              background: "#020617",
              color: "white",
              fontSize: "18px",
            }}
          />

          <button
            onClick={() => generateScript()}
            disabled={loading}
            style={{
              background:
                "linear-gradient(to right,#2563eb,#38bdf8)",
              border: "none",
              color: "white",
              padding: "18px 30px",
              borderRadius: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            {loading
              ? "🤖 Generating..."
              : "🚀 Generate"}
          </button>

        </div>

        {/* RESULT */}

        <div
          style={{
            marginTop: "30px",
            background: "#020617",
            padding: "25px",
            borderRadius: "18px",
            minHeight: "260px",
            color: "#38bdf8",
            lineHeight: "1.9",
            whiteSpace: "pre-wrap",
            border: "1px solid #1e293b",
          }}
        >

          {loading
            ? "⚡ AI generating viral strategy..."
            : result || "AI response appears here..."}

        </div>

        {/* ACTION BUTTONS */}

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >

          <button
            onClick={copyResult}
            style={{
              background: "#22c55e",
              border: "none",
              color: "white",
              padding: "14px 20px",
              borderRadius: "14px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            📋 Copy Result
          </button>

          <button
            style={{
              background: "#9333ea",
              border: "none",
              color: "white",
              padding: "14px 20px",
              borderRadius: "14px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🎬 Send To Video AI
          </button>

          <button
            style={{
              background: "#f59e0b",
              border: "none",
              color: "white",
              padding: "14px 20px",
              borderRadius: "14px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            📤 Auto Upload
          </button>

        </div>

      </div>

      {/* NICHES */}

      <section>

        <h2
          style={{
            fontSize: "50px",
            marginBottom: "35px",
          }}
        >
          🔥 AI Niches
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: "25px",
          }}
        >

          {niches.map((item, index) => (

            <div
              key={index}
              style={{
                background: "#0f172a",
                padding: "28px",
                borderRadius: "22px",
                border: "1px solid #1e293b",
              }}
            >

              <h2
                style={{
                  fontSize: "28px",
                  marginBottom: "16px",
                }}
              >
                {item}
              </h2>

              <p
                style={{
                  color: "#94a3b8",
                  lineHeight: "1.7",
                }}
              >
                AI generates titles, hooks,
                thumbnails, scripts,
                monetization and upload plans.
              </p>

              <button
                onClick={() => {
                  setPrompt(item);
                  generateScript(item);
                }}
                style={{
                  marginTop: "20px",
                  background: "#2563eb",
                  border: "none",
                  color: "white",
                  padding: "12px 20px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  width: "100%",
                }}
              >
                ⚡ Launch AI
              </button>

            </div>

          ))}

        </div>

      </section>

      {/* AI LOGS */}

      <section
        style={{
          marginTop: "70px",
        }}
      >

        <h2
          style={{
            fontSize: "50px",
            marginBottom: "35px",
          }}
        >
          📡 AI SYSTEM LOGS
        </h2>

        <div
          style={{
            background: "#0f172a",
            padding: "30px",
            borderRadius: "24px",
            border: "1px solid #1e293b",
          }}
        >

          <Log text="⚡ Viral analysis engine online" />
          <Log text="📺 Thumbnail AI optimized CTR" />
          <Log text="🎬 Shorts AI generated hooks" />
          <Log text="📤 Upload system synchronized" />
          <Log text="💰 Revenue AI tracking earnings" />

        </div>

      </section>

    </main>
  );
}

/* STATUS */

function StatusCard({
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
        padding: "24px",
        borderRadius: "22px",
        border: "1px solid #1e293b",
      }}
    >

      <h2
        style={{
          fontSize: "20px",
          marginBottom: "12px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color,
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        {value}
      </p>

    </div>
  );
}

/* LOG */

function Log({
  text,
}: {
  text: string;
}) {

  return (
    <div
      style={{
        background: "#111827",
        padding: "16px",
        borderRadius: "14px",
        marginBottom: "15px",
        color: "#94a3b8",
      }}
    >
      {text}
    </div>
  );
}
