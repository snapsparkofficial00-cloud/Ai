"use client";
import { useState } from "react";

export default function CalendarPage() {
  const [niche, setNiche] = useState("");
  const [frequency, setFrequency] = useState("3x per week");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function generateCalendar() {
    if (!niche) return;
    setLoading(true);
    setResult("");
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: "calendar",
        prompt: `Create a 30-day YouTube content calendar for niche: "${niche}" posting ${frequency}. For each video include: title, hook, best upload day/time, estimated views, thumbnail concept, and monetization angle. Format as a clear weekly schedule.`,
        niche,
      }),
    });
    const data = await res.json();
    setResult(data.result || "No response");
    setLoading(false);
  }

  const frequencies = ["daily", "3x per week", "2x per week", "weekly"];

  return (
    <main style={{ background: "#020617", minHeight: "100vh", color: "white", fontFamily: "Arial", padding: "32px" }}>
      <h1 style={{ fontSize: "clamp(32px,6vw,60px)", fontWeight: "bold", marginBottom: "12px",
        background: "linear-gradient(to right,#eab308,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        📅 Content Calendar AI
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "18px", marginBottom: "32px" }}>Generate a 30-day content calendar optimized for growth.</p>

      <div style={{ background: "#0f172a", padding: "28px", borderRadius: "20px", border: "1px solid #1e293b", marginBottom: "24px" }}>
        <input value={niche} onChange={(e) => setNiche(e.target.value)}
          placeholder="Your niche (e.g. BMW Cars, Crypto, AI Tools)..."
          style={{ width: "100%", padding: "16px", borderRadius: "14px", border: "1px solid #334155", background: "#020617", color: "white", fontSize: "16px", marginBottom: "16px", boxSizing: "border-box" }} />

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
          {frequencies.map((f) => (
            <button key={f} onClick={() => setFrequency(f)} style={{
              padding: "10px 18px", borderRadius: "10px", border: frequency === f ? "none" : "1px solid #334155",
              background: frequency === f ? "#eab308" : "#020617", color: frequency === f ? "#000" : "white",
              cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}>
              {f}
            </button>
          ))}
        </div>

        <button onClick={generateCalendar} disabled={loading} style={{
          background: loading ? "#1e293b" : "linear-gradient(to right,#eab308,#f97316)",
          border: "none", color: loading ? "#64748b" : "#000", padding: "16px 32px", borderRadius: "14px",
          fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", fontSize: "17px" }}>
          {loading ? "📅 Building Calendar..." : "📅 Generate Calendar"}
        </button>
      </div>

      {result && (
        <div style={{ background: "#0f172a", padding: "28px", borderRadius: "20px", border: "1px solid #1e293b" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <h3 style={{ color: "#eab308" }}>30-Day Content Calendar</h3>
            <button onClick={() => navigator.clipboard.writeText(result)} style={{
              background: "#eab308", border: "none", color: "#000", padding: "8px 16px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold" }}>
              📋 Copy
            </button>
          </div>
          <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.9", color: "#e2e8f0", fontSize: "15px" }}>{result}</div>
        </div>
      )}
    </main>
  );
}
