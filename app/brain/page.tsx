"use client";
import { useState, useEffect } from "react";

export default function BrainPage() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [activeAction, setActiveAction] = useState("");
  const [niche, setNiche] = useState("BMW Cars");
  const [topic, setTopic] = useState("");
  const [log, setLog] = useState<string[]>([]);

  function addLog(msg: string) {
    setLog((prev) => [`${new Date().toLocaleTimeString()} — ${msg}`, ...prev.slice(0, 29)]);
  }

  useEffect(() => {
    loadStatus();
    const interval = setInterval(loadStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  async function loadStatus() {
    const res = await fetch("/api/brain");
    const data = await res.json();
    if (data.success) setStatus(data);
  }

  async function runAction(action: string, label: string) {
    setLoading(true);
    setActiveAction(action);
    setResult(null);
    addLog(`🧠 Running: ${label}...`);

    try {
      const res = await fetch("/api/brain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, niche, topic, goal: topic || niche }),
      });
      const data = await res.json();
      setResult({ action: label, data });
      addLog(`✅ ${label} complete`);
    } catch {
      addLog(`❌ ${label} failed`);
    }
    setLoading(false);
  }

  const actions = [
    { id: "think", label: "🧠 Full Think", color: "#8b5cf6" },
    { id: "predict", label: "🎯 Predict Viral", color: "#ef4444" },
    { id: "decide", label: "⚡ Auto Decide", color: "#f59e0b" },
    { id: "trends", label: "🔥 Analyze Trends", color: "#f97316" },
    { id: "analyze", label: "📊 Full Analysis", color: "#3b82f6" },
    { id: "weekly_plan", label: "📅 Weekly Plan", color: "#22c55e" },
    { id: "improve", label: "🚀 Self Improve", color: "#ec4899" },
    { id: "competitor", label: "🥊 Competitors", color: "#06b6d4" },
    { id: "optimize_title", label: "✏️ Optimize Title", color: "#a855f7" },
    { id: "thumbnail", label: "🖼️ Thumbnail AI", color: "#eab308" },
  ];

  return (
    <main style={{
      background: "#020617",
      minHeight: "100vh",
      color: "white",
      fontFamily: "Arial",
      padding: "24px",
      maxWidth: "100vw",
      overflowX: "hidden",
    }}>

      {/* HERO */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{
          fontSize: "clamp(28px,5vw,56px)",
          fontWeight: "bold",
          marginBottom: "10px",
          background: "linear-gradient(to right,#8b5cf6,#38bdf8,#22c55e)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          🧠 AI BRAIN 2030
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "17px", lineHeight: "1.7" }}>
          Self-learning autonomous intelligence — viral prediction, trend analysis,
          content decisions, self-improvement
        </p>
      </div>

      {/* BRAIN STATUS */}
      {status && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          gap: "14px",
          marginBottom: "28px",
        }}>
          {[
            { label: "🧠 Version", value: status.version, color: "#8b5cf6" },
            { label: "⚡ Status", value: status.running ? "ACTIVE" : "OFFLINE", color: "#22c55e" },
            { label: "💾 Memories", value: String(status.totalMemories || 0), color: "#38bdf8" },
            { label: "🔄 Evolution", value: `v${status.evolutionVersion || 1}`, color: "#f59e0b" },
            { label: "⏱️ Uptime", value: status.uptime || "0s", color: "#ec4899" },
            { label: "🎯 Capabilities", value: String(status.capabilities?.length || 8), color: "#a855f7" },
          ].map((s, i) => (
            <div key={i} style={{
              background: "#0f172a",
              padding: "16px 20px",
              borderRadius: "14px",
              border: "1px solid #1e293b",
            }}>
              <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "6px" }}>{s.label}</p>
              <p style={{ color: s.color, fontSize: "20px", fontWeight: "bold" }}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* INPUT */}
      <div style={{
        background: "#0f172a",
        padding: "24px",
        borderRadius: "20px",
        border: "1px solid #1e293b",
        marginBottom: "24px",
      }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <input
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="Your niche (e.g. BMW Cars)"
            style={{
              flex: 1,
              minWidth: "180px",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #334155",
              background: "#020617",
              color: "white",
              fontSize: "15px",
            }}
          />
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Specific topic or title (optional)"
            style={{
              flex: 2,
              minWidth: "200px",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #334155",
              background: "#020617",
              color: "white",
              fontSize: "15px",
            }}
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
        gap: "12px",
        marginBottom: "28px",
      }}>
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => runAction(action.id, action.label)}
            disabled={loading}
            style={{
              background: loading && activeAction === action.id
                ? "#1e293b"
                : action.color,
              border: "none",
              color: loading && activeAction === action.id ? "#64748b" : "white",
              padding: "14px 16px",
              borderRadius: "14px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {loading && activeAction === action.id
              ? "⏳ Running..."
              : action.label}
          </button>
        ))}
      </div>

      {/* RESULT */}
      {result && (
        <div style={{
          background: "#0f172a",
          padding: "28px",
          borderRadius: "20px",
          border: "1px solid #8b5cf6",
          marginBottom: "24px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <h3 style={{ color: "#8b5cf6", fontSize: "20px" }}>
              ✅ {result.action}
            </h3>
            <button
              onClick={() => navigator.clipboard.writeText(JSON.stringify(result.data, null, 2))}
              style={{
                background: "#1e293b",
                border: "1px solid #334155",
                color: "white",
                padding: "8px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "13px",
              }}
            >
              📋 Copy JSON
            </button>
          </div>
          <pre style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            color: "#e2e8f0",
            fontSize: "13px",
            lineHeight: "1.7",
            maxHeight: "500px",
            overflowY: "auto",
          }}>
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}

      {/* TOP PATTERNS */}
      {status?.topPatterns?.length > 0 && (
        <div style={{
          background: "#0f172a",
          padding: "24px",
          borderRadius: "20px",
          border: "1px solid #1e293b",
          marginBottom: "24px",
        }}>
          <h3 style={{ fontSize: "20px", marginBottom: "16px" }}>🏆 Top Performing Patterns</h3>
          {status.topPatterns.map((p: any, i: number) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #1e293b",
            }}>
              <span style={{ color: "#94a3b8" }}>#{i + 1} {p.topic}</span>
              <span style={{ color: "#22c55e", fontWeight: "bold" }}>
                {Math.round(p.avgScore)}/100 ({p.count} runs)
              </span>
            </div>
          ))}
        </div>
      )}

      {/* LOGS */}
      <div style={{
        background: "#0f172a",
        padding: "24px",
        borderRadius: "20px",
        border: "1px solid #1e293b",
      }}>
        <h3 style={{ fontSize: "20px", marginBottom: "16px" }}>📡 Brain Activity Log</h3>
        {log.length === 0
          ? <p style={{ color: "#475569" }}>Run an action to see brain activity...</p>
          : log.map((l, i) => (
            <div key={i} style={{
              padding: "8px 0",
              borderBottom: "1px solid #1e293b",
              fontFamily: "monospace",
              fontSize: "13px",
              color: l.includes("❌") ? "#ef4444" : l.includes("✅") ? "#22c55e" : "#38bdf8",
            }}>
              {l}
            </div>
          ))
        }
      </div>
    </main>
  );
}
