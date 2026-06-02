"use client";
import { useState, useEffect } from "react";

export default function AnalyticsPage() {
  const [subs, setSubs] = useState("0");
  const [views, setViews] = useState("0");
  const [videos, setVideos] = useState("0");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/youtube/stats").then((r) => r.json()).then((d) => {
      setSubs(d.subscribers || "0");
      setViews(d.views || "0");
      setVideos(d.videos || "0");
    });
  }, []);

  async function analyzeChannel() {
    setLoading(true);
    setAnalysis("");
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: "analytics",
        prompt: `Analyze this YouTube channel: ${subs} subscribers, ${views} total views, ${videos} videos. Provide: growth rate analysis, revenue estimate, content strategy recommendations, SEO improvements, audience insights, and a 90-day growth plan to 10x the channel.`,
        niche: "YouTube Analytics",
      }),
    });
    const data = await res.json();
    setAnalysis(data.result || "No response");
    setLoading(false);
  }

  return (
    <main style={{ background: "#020617", minHeight: "100vh", color: "white", fontFamily: "Arial", padding: "32px" }}>
      <h1 style={{ fontSize: "clamp(32px,6vw,60px)", fontWeight: "bold", marginBottom: "12px",
        background: "linear-gradient(to right,#ec4899,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        📊 Analytics AI
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "18px", marginBottom: "32px" }}>Real-time channel analytics with AI-powered growth insights.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "20px", marginBottom: "32px" }}>
        {[
          { label: "👥 Subscribers", value: Number(subs).toLocaleString(), color: "#22c55e" },
          { label: "📺 Total Views", value: Number(views).toLocaleString(), color: "#38bdf8" },
          { label: "🎬 Videos", value: videos, color: "#f59e0b" },
          { label: "📈 Est. Monthly Revenue", value: `$${Math.round(Number(views) * 0.003)}`, color: "#ec4899" },
          { label: "👁️ Avg Views/Video", value: videos !== "0" ? Math.round(Number(views) / Number(videos)).toLocaleString() : "0", color: "#a855f7" },
          { label: "🔥 Growth Score", value: Number(subs) > 1000 ? "Strong" : "Building", color: "#f97316" },
        ].map((stat, i) => (
          <div key={i} style={{ background: "#0f172a", padding: "24px", borderRadius: "18px", border: "1px solid #1e293b" }}>
            <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "8px" }}>{stat.label}</p>
            <p style={{ color: stat.color, fontSize: "28px", fontWeight: "bold" }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <button onClick={analyzeChannel} disabled={loading} style={{
        background: loading ? "#1e293b" : "linear-gradient(to right,#ec4899,#8b5cf6)",
        border: "none", color: "white", padding: "16px 32px", borderRadius: "14px",
        fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", fontSize: "17px", marginBottom: "24px" }}>
        {loading ? "📊 Analyzing..." : "📊 AI Channel Analysis"}
      </button>

      {analysis && (
        <div style={{ background: "#0f172a", padding: "28px", borderRadius: "20px", border: "1px solid #1e293b" }}>
          <h3 style={{ color: "#ec4899", marginBottom: "16px" }}>AI Growth Analysis</h3>
          <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.9", color: "#e2e8f0", fontSize: "15px" }}>{analysis}</div>
        </div>
      )}
    </main>
  );
}
