"use client";
import { useState } from "react";

export default function MCNPage() {
  const [channels, setChannels] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function analyzeMCN() {
    setLoading(true);
    setResult("");
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: "empire",
        prompt: `Create a Multi-Channel Network (MCN) strategy for managing multiple YouTube channels: ${channels || "BMW, Finance, AI Tech, Gaming"}. Include: network structure, shared resources, cross-promotion strategy, combined monetization, content syndication, team roles, automation workflows, and projected combined revenue.`,
        niche: "MCN",
      }),
    });
    const data = await res.json();
    setResult(data.result || "No response");
    setLoading(false);
  }

  return (
    <main style={{ background: "#020617", minHeight: "100vh", color: "white", fontFamily: "Arial", padding: "32px" }}>
      <h1 style={{ fontSize: "clamp(32px,6vw,60px)", fontWeight: "bold", marginBottom: "12px",
        background: "linear-gradient(to right,#64748b,#94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        🌎 MCN AI
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "18px", marginBottom: "32px" }}>Multi-Channel Network management and strategy powered by AI.</p>

      <div style={{ background: "#0f172a", padding: "28px", borderRadius: "20px", border: "1px solid #1e293b", marginBottom: "24px" }}>
        <input value={channels} onChange={(e) => setChannels(e.target.value)}
          placeholder="Your channels (e.g. BMW Cars, Finance Hub, AI Tech)..."
          style={{ width: "100%", padding: "16px", borderRadius: "14px", border: "1px solid #334155", background: "#020617", color: "white", fontSize: "16px", marginBottom: "16px", boxSizing: "border-box" }} />

        <button onClick={analyzeMCN} disabled={loading} style={{
          background: loading ? "#1e293b" : "linear-gradient(to right,#475569,#64748b)",
          border: "none", color: "white", padding: "16px 32px", borderRadius: "14px",
          fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", fontSize: "17px" }}>
          {loading ? "🌎 Building MCN Strategy..." : "🌎 Build MCN Strategy"}
        </button>
      </div>

      {result && (
        <div style={{ background: "#0f172a", padding: "28px", borderRadius: "20px", border: "1px solid #475569" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <h3 style={{ color: "#94a3b8" }}>MCN Strategy</h3>
            <button onClick={() => navigator.clipboard.writeText(result)} style={{
              background: "#475569", border: "none", color: "white", padding: "8px 16px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold" }}>
              📋 Copy
            </button>
          </div>
          <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.9", color: "#e2e8f0", fontSize: "15px" }}>{result}</div>
        </div>
      )}
    </main>
  );
}
