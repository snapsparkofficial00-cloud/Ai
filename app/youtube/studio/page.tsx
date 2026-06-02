"use client";
import { useState } from "react";

export default function StudioPage() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [activeTask, setActiveTask] = useState("");

  async function runTask(task: string, taskLabel: string) {
    if (!topic) { alert("Enter a topic first"); return; }
    setLoading(true);
    setActiveTask(taskLabel);
    setResult("");
    const prompts: Record<string, string> = {
      title: `Generate 10 viral YouTube video titles for: "${topic}". Include click-through rate prediction, emotional trigger used, and SEO score for each.`,
      description: `Write an SEO-optimized YouTube video description for: "${topic}". Include keyword-rich intro, timestamps, links section, hashtags, and CTA.`,
      chapters: `Create YouTube video chapters/timestamps for a 15-minute video about: "${topic}". Format: 0:00 - Chapter Name`,
      thumbnail: `Describe 5 viral thumbnail concepts for YouTube video about: "${topic}". Include color scheme, text overlay, expression, and why it would get clicks.`,
      tags: `Generate 50 SEO-optimized YouTube tags for video about: "${topic}". Mix broad and specific terms.`,
    };
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, prompt: prompts[task] || prompts.title, niche: topic }),
    });
    const data = await res.json();
    setResult(data.result || "No response");
    setLoading(false);
  }

  const tasks = [
    { id: "title", label: "🎯 Viral Titles", color: "#ef4444" },
    { id: "description", label: "📄 SEO Description", color: "#3b82f6" },
    { id: "chapters", label: "📑 Chapters", color: "#22c55e" },
    { id: "thumbnail", label: "🖼️ Thumbnail Ideas", color: "#f59e0b" },
    { id: "tags", label: "🏷️ SEO Tags", color: "#8b5cf6" },
  ];

  return (
    <main style={{ background: "#020617", minHeight: "100vh", color: "white", fontFamily: "Arial", padding: "32px" }}>
      <h1 style={{ fontSize: "clamp(32px,6vw,60px)", fontWeight: "bold", marginBottom: "12px",
        background: "linear-gradient(to right,#6366f1,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        🎥 YouTube Studio AI
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "18px", marginBottom: "32px" }}>Complete video optimization toolkit powered by AI.</p>

      <input value={topic} onChange={(e) => setTopic(e.target.value)}
        placeholder="Video topic..."
        style={{ width: "100%", padding: "16px", borderRadius: "14px", border: "1px solid #334155", background: "#0f172a", color: "white", fontSize: "16px", marginBottom: "20px", boxSizing: "border-box" }} />

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "28px" }}>
        {tasks.map((t) => (
          <button key={t.id} onClick={() => runTask(t.id, t.label)} disabled={loading} style={{
            background: loading && activeTask === t.label ? "#1e293b" : t.color,
            border: "none", color: "white", padding: "14px 20px", borderRadius: "12px",
            fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", fontSize: "15px" }}>
            {loading && activeTask === t.label ? "⚡ Running..." : t.label}
          </button>
        ))}
      </div>

      {result && (
        <div style={{ background: "#0f172a", padding: "28px", borderRadius: "20px", border: "1px solid #1e293b" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <h3 style={{ color: "#8b5cf6" }}>{activeTask} Results</h3>
            <button onClick={() => navigator.clipboard.writeText(result)} style={{
              background: "#8b5cf6", border: "none", color: "white", padding: "8px 16px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold" }}>
              📋 Copy
            </button>
          </div>
          <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.9", color: "#e2e8f0", fontSize: "15px" }}>{result}</div>
        </div>
      )}
    </main>
  );
}
