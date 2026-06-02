"use client";
import { useState } from "react";

export default function EmpirePage() {
  const [niche, setNiche] = useState("");
  const [goal, setGoal] = useState("1M subscribers");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function buildEmpire() {
    if (!niche) return;
    setLoading(true);
    setResult("");
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: "empire",
        prompt: `Build a complete YouTube empire strategy for niche: "${niche}" with goal: ${goal}. Include: channel architecture (multiple channels strategy), content pillars, team structure, automation systems, revenue streams (AdSense, sponsorships, merch, courses, memberships), scaling roadmap month by month, estimated revenue at each milestone, and tools needed.`,
        niche,
      }),
    });
    const data = await res.json();
    setResult(data.result || "No response");
    setLoading(false);
  }

  const goals = ["100K subscribers", "1M subscribers", "$10K/month", "$100K/month", "Full automation"];

  return (
    <main style={{ background: "#020617", minHeight: "100vh", color: "white", fontFamily: "Arial", padding: "32px" }}>
      <h1 style={{ fontSize: "clamp(32px,6vw,60px)", fontWeight: "bold", marginBottom: "12px",
        background: "linear-gradient(to right,#f59e0b,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        👑 Auto Empire AI
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "18px", marginBottom: "32px" }}>Build a fully automated YouTube empire with AI strategy.</p>

      <div style={{ background: "#0f172a", padding: "28px", borderRadius: "20px", border: "1px solid #1e293b", marginBottom: "24px" }}>
        <input value={niche} onChange={(e) => setNiche(e.target.value)}
          placeholder="Your niche (e.g. BMW Cars, Crypto, AI)..."
          style={{ width: "100%", padding: "16px", borderRadius: "14px", border: "1px solid #334155", background: "#020617", color: "white", fontSize: "16px", marginBottom: "16px", boxSizing: "border-box" }} />

        <p style={{ color: "#64748b", marginBottom: "12px" }}>Your goal:</p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
          {goals.map((g) => (
            <button key={g} onClick={() => setGoal(g)} style={{
              padding: "10px 16px", borderRadius: "10px", border: goal === g ? "none" : "1px solid #334155",
              background: goal === g ? "#f59e0b" : "#020617", color: goal === g ? "#000" : "white",
              cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}>
              {g}
            </button>
          ))}
        </div>

        <button onClick={buildEmpire} disabled={loading} style={{
          background: loading ? "#1e293b" : "linear-gradient(to right,#f59e0b,#f97316)",
          border: "none", color: loading ? "#64748b" : "#000", padding: "16px 32px", borderRadius: "14px",
          fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", fontSize: "17px" }}>
          {loading ? "👑 Building Empire..." : "👑 Build My Empire"}
        </button>
      </div>

      {result && (
        <div style={{ background: "#0f172a", padding: "28px", borderRadius: "20px", border: "1px solid #f59e0b" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <h3 style={{ color: "#f59e0b" }}>Empire Strategy</h3>
            <button onClick={() => navigator.clipboard.writeText(result)} style={{
              background: "#f59e0b", border: "none", color: "#000", padding: "8px 16px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold" }}>
              📋 Copy
            </button>
          </div>
          <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.9", color: "#e2e8f0", fontSize: "15px" }}>{result}</div>
        </div>
      )}
    </main>
  );
}
