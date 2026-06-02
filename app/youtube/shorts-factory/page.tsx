"use client";
import { useState } from "react";

export default function ShortsFactoryPage() {
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function generateShorts() {
    if (!niche) return;
    setLoading(true);
    setResult("");
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: "shorts",
        prompt: `Create 5 viral YouTube Shorts concepts for niche: "${niche}". For each short include: hook (first 3 seconds), full 60-second script, on-screen text ideas, trending audio suggestions, hashtags, estimated viral score, and why it will go viral.`,
        niche,
      }),
    });
    const data = await res.json();
    setResult(data.result || "No response");
    setLoading(false);
  }

  const quickNiches = ["🏎️ Supercars", "💰 Finance", "🤖 AI", "💪 Fitness", "🎮 Gaming", "🧠 Facts"];

  return (
    <main style={{ background: "#020617", minHeight: "100vh", color: "white", fontFamily: "Arial", padding: "32px" }}>
      <h1 style={{ fontSize: "clamp(32px,6vw,60px)", fontWeight: "bold", marginBottom: "12px",
        background: "linear-gradient(to right,#10b981,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        ⚡ Shorts Factory
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "18px", marginBottom: "32px" }}>Generate viral YouTube Shorts at scale with AI.</p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
        {quickNiches.map((n) => (
          <button key={n} onClick={() => setNiche(n)} style={{
            padding: "10px 16px", borderRadius: "10px", border: niche === n ? "none" : "1px solid #334155",
            background: niche === n ? "#10b981" : "#0f172a", color: "white", cursor: "pointer", fontWeight: "bold" }}>
            {n}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        <input value={niche} onChange={(e) => setNiche(e.target.value)}
          placeholder="Or enter custom niche..."
          style={{ flex: 1, minWidth: "200px", padding: "16px", borderRadius: "14px", border: "1px solid #334155", background: "#0f172a", color: "white", fontSize: "16px" }} />
        <button onClick={generateShorts} disabled={loading} style={{
          background: loading ? "#1e293b" : "linear-gradient(to right,#10b981,#38bdf8)",
          border: "none", color: "white", padding: "16px 28px", borderRadius: "14px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", fontSize: "16px" }}>
          {loading ? "⚡ Generating..." : "⚡ Generate Shorts"}
        </button>
      </div>

      <div style={{ background: "#0f172a", padding: "28px", borderRadius: "20px", border: "1px solid #1e293b", minHeight: "200px" }}>
        {result && (
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <h3 style={{ color: "#10b981" }}>5 Viral Shorts</h3>
            <button onClick={() => navigator.clipboard.writeText(result)} style={{
              background: "#10b981", border: "none", color: "white", padding: "8px 16px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold" }}>
              📋 Copy All
            </button>
          </div>
        )}
        <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.9", color: "#e2e8f0", fontSize: "15px" }}>
          {loading ? <span style={{ color: "#10b981" }}>⚡ AI generating viral shorts...</span>
            : result || <span style={{ color: "#475569" }}>Select a niche and generate viral shorts...</span>}
        </div>
      </div>
    </main>
  );
}
