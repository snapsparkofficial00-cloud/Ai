"use client";
import { useState } from "react";

export default function HashtagsPage() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function generateHashtags() {
    if (!topic) return;
    setLoading(true);
    setResult("");
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: "hashtags",
        prompt: `Generate the ultimate hashtag strategy for YouTube video about: "${topic}". Include: 30 hashtags ranked by search volume, 10 trending hashtags, 10 niche hashtags, 10 broad hashtags, SEO tags for description, and best practices for maximum reach.`,
        niche: topic,
      }),
    });
    const data = await res.json();
    setResult(data.result || "No response");
    setLoading(false);
  }

  return (
    <main style={{ background: "#020617", minHeight: "100vh", color: "white", fontFamily: "Arial", padding: "32px" }}>
      <h1 style={{ fontSize: "clamp(32px,6vw,60px)", fontWeight: "bold", marginBottom: "12px",
        background: "linear-gradient(to right,#22c55e,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        #️⃣ Hashtag AI
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "18px", marginBottom: "32px" }}>Generate viral hashtag sets optimized for maximum YouTube reach.</p>

      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        <input value={topic} onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generateHashtags()}
          placeholder="Video topic..."
          style={{ flex: 1, minWidth: "200px", padding: "16px", borderRadius: "14px", border: "1px solid #334155", background: "#0f172a", color: "white", fontSize: "16px" }} />
        <button onClick={generateHashtags} disabled={loading} style={{
          background: loading ? "#1e293b" : "linear-gradient(to right,#22c55e,#38bdf8)",
          border: "none", color: "white", padding: "16px 28px", borderRadius: "14px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", fontSize: "16px" }}>
          {loading ? "⚡ Generating..." : "#️⃣ Generate Hashtags"}
        </button>
      </div>

      <div style={{ background: "#0f172a", padding: "28px", borderRadius: "20px", border: "1px solid #1e293b", minHeight: "200px" }}>
        {result && (
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <h3 style={{ color: "#22c55e" }}>Hashtag Strategy</h3>
            <button onClick={() => navigator.clipboard.writeText(result)} style={{
              background: "#22c55e", border: "none", color: "white", padding: "8px 16px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold" }}>
              📋 Copy All
            </button>
          </div>
        )}
        <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.9", color: "#e2e8f0", fontSize: "15px" }}>
          {loading ? <span style={{ color: "#22c55e" }}>⚡ AI generating hashtags...</span>
            : result || <span style={{ color: "#475569" }}>Enter a topic to generate hashtags...</span>}
        </div>
      </div>
    </main>
  );
}
