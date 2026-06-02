"use client";
import { useState } from "react";

export default function TrendsPage() {
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function findTrends() {
    if (!niche) return;
    setLoading(true);
    setResult("");
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: "trend",
        prompt: `Find the top 10 viral YouTube trends right now for niche: ${niche}. Include search volume estimates, competition level, viral potential score, and 3 video ideas for each trend.`,
        niche,
      }),
    });
    const data = await res.json();
    setResult(data.result || "No results");
    setLoading(false);
  }

  return (
    <main style={{ background: "#020617", minHeight: "100vh", color: "white", fontFamily: "Arial", padding: "32px" }}>
      <h1 style={{ fontSize: "clamp(32px,6vw,60px)", fontWeight: "bold", marginBottom: "12px",
        background: "linear-gradient(to right,#f97316,#ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        🔥 Trend Hunter AI
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "18px", marginBottom: "32px" }}>
        Find viral YouTube trends in real time for any niche.
      </p>
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        <input value={niche} onChange={(e) => setNiche(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && findTrends()}
          placeholder="Enter niche (e.g. BMW, AI Tech, Finance)..."
          style={{ flex: 1, minWidth: "200px", padding: "16px", borderRadius: "14px", border: "1px solid #334155", background: "#0f172a", color: "white", fontSize: "16px" }} />
        <button onClick={findTrends} disabled={loading} style={{
          background: loading ? "#1e293b" : "linear-gradient(to right,#f97316,#ef4444)",
          border: "none", color: "white", padding: "16px 28px", borderRadius: "14px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", fontSize: "16px" }}>
          {loading ? "🔍 Searching..." : "🔥 Find Trends"}
        </button>
      </div>
      <div style={{ background: "#0f172a", padding: "28px", borderRadius: "20px", border: "1px solid #1e293b", minHeight: "200px",
        whiteSpace: "pre-wrap", lineHeight: "1.9", color: "#e2e8f0", fontSize: "15px" }}>
        {loading ? <span style={{ color: "#f97316" }}>🔍 AI analyzing trends...</span>
          : result || <span style={{ color: "#475569" }}>Enter a niche to discover viral trends...</span>}
      </div>
    </main>
  );
}
