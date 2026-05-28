"use client";

import { useState } from "react";

export default function YouTubeAIPage() {

  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState("");

  async function generateScript() {

    if (!prompt) return;

    setLoading(true);

    try {

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message:
            "Create a viral YouTube video strategy for: " +
            prompt,
        }),
      });

      const data = await res.json();

      setResult(data.reply);

    } catch (err) {

      setResult("❌ AI ERROR");

    }

    setLoading(false);
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
          📺 YOUTUBE AI OS
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "22px",
            lineHeight: "1.8",
            maxWidth: "900px",
          }}
        >
          Autonomous YouTube AI infrastructure
          capable of generating scripts,
          thumbnails, voiceovers, viral ideas,
          SEO, hashtags, editing workflows,
          and auto-upload systems.
        </p>

      </div>

      {/* AI INPUT */}

      <div
        style={{
          background: "#0f172a",
          padding: "30px",
          borderRadius: "25px",
          border: "1px solid #1e293b",
          marginBottom: "40px",
        }}
      >

        <h2
          style={{
            fontSize: "34px",
            marginBottom: "20px",
          }}
        >
          🤖 AI Script Generator
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
            placeholder="Enter niche or video idea..."
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
            onClick={generateScript}
            style={{
              background:
                "linear-gradient(to right,#2563eb,#38bdf8)",
              border: "none",
              color: "white",
              padding: "18px 28px",
              borderRadius: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            🚀 Generate
          </button>

        </div>

        {/* RESULT */}

        <div
          style={{
            marginTop: "30px",
            background: "#020617",
            padding: "25px",
            borderRadius: "18px",
            minHeight: "180px",
            color: "#38bdf8",
            lineHeight: "1.8",
            whiteSpace: "pre-wrap",
          }}
        >

          {loading
            ? "🤖 AI generating..."
            : result || "AI response appears here..."}

        </div>

      </div>

      {/* MULTI AI NICHES */}

      <section>

        <h2
          style={{
            fontSize: "50px",
            marginBottom: "35px",
          }}
        >
          🔥 Multi AI Niches
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: "25px",
          }}
        >

          {[
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
          ].map((item, index) => (

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
                AI generates:
                scripts,
                thumbnails,
                hooks,
                titles,
                SEO,
                hashtags,
                editing plans,
                and auto-upload workflows.
              </p>

              <button
                style={{
                  marginTop: "20px",
                  background: "#2563eb",
                  border: "none",
                  color: "white",
                  padding: "12px 20px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                ⚡ Launch AI
              </button>

            </div>

          ))}

        </div>

      </section>

      {/* AUTOMATION */}

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
          ⚡ Automation Pipeline
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "25px",
          }}
        >

          <PipelineCard
            title="🧠 Script AI"
            desc="Creates viral scripts automatically."
          />

          <PipelineCard
            title="🎬 Video AI"
            desc="Creates cinematic shorts and edits."
          />

          <PipelineCard
            title="🎤 Voice AI"
            desc="Generates realistic AI voiceovers."
          />

          <PipelineCard
            title="🖼️ Thumbnail AI"
            desc="Creates high CTR thumbnails."
          />

          <PipelineCard
            title="📤 Auto Upload"
            desc="Uploads videos automatically."
          />

          <PipelineCard
            title="📊 Analytics AI"
            desc="Tracks growth and optimizes videos."
          />

        </div>

      </section>

      {/* STATS */}

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
          📊 Live AI Metrics
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
            title="📺 Videos Generated"
            value="12,480"
            color="#38bdf8"
          />

          <StatCard
            title="🔥 Viral Score"
            value="98%"
            color="#ef4444"
          />

          <StatCard
            title="💰 Revenue"
            value="$82,000"
            color="#22c55e"
          />

          <StatCard
            title="👁️ Views"
            value="48M"
            color="#a855f7"
          />

        </div>

      </section>

    </main>
  );
}

/* PIPELINE CARD */

function PipelineCard({
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
        padding: "30px",
        borderRadius: "24px",
        border: "1px solid #1e293b",
      }}
    >

      <h2
        style={{
          fontSize: "30px",
          marginBottom: "18px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color: "#94a3b8",
          lineHeight: "1.7",
        }}
      >
        {desc}
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
          fontSize: "24px",
          marginBottom: "15px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          fontSize: "46px",
          color,
          fontWeight: "bold",
        }}
      >
        {value}
      </p>

    </div>
  );
}
