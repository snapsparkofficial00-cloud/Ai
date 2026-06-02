"use client";
import { useState } from "react";

export default function ScriptsPage() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("educational");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function generateScript() {
    if (!topic) return;
    setLoading(true);
    setResult("");
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: "script",
        prompt: `Write a complete ${style} YouTube video script for: "${topic}". Include: hook (first 30 seconds), intro, 5 main sections with talking points, transitions, call to action, and outro. Make it engaging, conversational and optimized for watch time.`,
        niche: topic,
      }),
    });
    const data = await res.json();
    setResult(data.result || "No response");
    setLoading(false);
  }

  const styles = ["educational", "entertaining", "storytelling", "tutorial", "viral shorts", "documentary"];

  return (
    <main style={{ background: "#020617", minHeight: "100vh", color: "white", fontFamily: "Arial", padding: "32px" }}>
      <h1 style={{ fontSize: "clamp(32px,6vw,60px)", fontWeight: "bold", marginBottom: "12px",
        background: "linear-gradient(to right,#3b82f6,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        📝 Script AI
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "18px", marginBottom: "32px" }}>Generate full YouTube scripts optimized for watch time and engagement.</p>

      <div style={{ background: "#0f172a", padding: "28px", borderRadius: "20px", border: "1px solid #1e293b", marginBottom: "24px" }}>
        <input value={topic} onChange={(e) => setTopic(e.target.value)}
          placeholder="Video topic (e.g. BMW M5 Review, How to Make Money with AI)..."
          style={{ width: "100%", padding: "16px", borderRadius: "14px", border: "1px solid #334155", background: "#020617", color: "white", fontSize: "16px", marginBottom: "16px", boxSizing: "border-box" }} />

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
          {styles.map((s) => (
            <button key={s} onClick={() => setStyle(s)} style={{
              padding: "10px 18px", borderRadius: "10px", border: style === s ? "none" : "1px solid #334155",
              background: style === s ? "#3b82f6" : "#020617", color: "white", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}>
              {s}
            </button>
          ))}
        </div>

        <button onClick={generateScript} disabled={loading} style={{
          background: loading ? "#1e293b" : "linear-gradient(to right,#3b82f6,#38bdf8)",
          border: "none", color: "white", padding: "16px 32px", borderRadius: "14px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", fontSize: "17px" }}>
          {loading ? "✍️ Writing Script..." : "📝 Generate Script"}
        </button>
      </div>

      {result && (
        <div style={{ background: "#0f172a", padding: "28px", borderRadius: "20px", border: "1px solid #1e293b" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <h3 style={{ color: "#38bdf8" }}>Generated Script</h3>
            <button onClick={() => navigator.clipboard.writeText(result)} style={{
              background: "#22c55e", border: "none", color: "white", padding: "8px 16px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold" }}>
              📋 Copy
            </button>
          </div>
          <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.9", color: "#e2e8f0", fontSize: "15px" }}>{result}</div>
        </div>
      )}
    </main>
  );
}
