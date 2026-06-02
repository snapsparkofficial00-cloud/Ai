"use client";
import { useState, useEffect } from "react";

export default function ManagerPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [subs, setSubs] = useState("0");
  const [views, setViews] = useState("0");
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    fetch("/api/youtube/stats").then((r) => r.json()).then((d) => {
      setSubs(d.subscribers || "0");
      setViews(d.views || "0");
    });
    fetch("/api/youtube/videos").then((r) => r.json()).then((d) => setVideos(d.items || []));
  }, []);

  async function getAdvice() {
    setLoading(true);
    setAdvice("");
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: "empire",
        prompt: `I have a YouTube channel with ${subs} subscribers, ${views} views, and ${videos.length} videos. Recent videos: ${videos.slice(0, 3).map((v: any) => v.snippet?.title).join(", ")}. Give me specific actionable advice to grow this channel faster, improve CTR, increase watch time, and maximize revenue.`,
        niche: "Channel Management",
      }),
    });
    const data = await res.json();
    setAdvice(data.result || "No response");
    setLoading(false);
  }

  return (
    <main style={{ background: "#020617", minHeight: "100vh", color: "white", fontFamily: "Arial", padding: "32px" }}>
      <h1 style={{ fontSize: "clamp(32px,6vw,60px)", fontWeight: "bold", marginBottom: "12px",
        background: "linear-gradient(to right,#06b6d4,#3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        📺 Channel Manager
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "18px", marginBottom: "32px" }}>Manage and optimize your YouTube channel with AI.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "16px", marginBottom: "32px" }}>
        <StatCard label="👥 Subscribers" value={Number(subs).toLocaleString()} color="#22c55e" />
        <StatCard label="📺 Total Views" value={Number(views).toLocaleString()} color="#38bdf8" />
        <StatCard label="🎬 Videos" value={String(videos.length)} color="#f59e0b" />
      </div>

      <button onClick={getAdvice} disabled={loading} style={{
        background: loading ? "#1e293b" : "linear-gradient(to right,#06b6d4,#3b82f6)",
        border: "none", color: "white", padding: "16px 28px", borderRadius: "14px",
        fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", fontSize: "16px", marginBottom: "32px" }}>
        {loading ? "🤖 Analyzing..." : "🤖 Get AI Growth Advice"}
      </button>

      {advice && (
        <div style={{ background: "#0f172a", padding: "28px", borderRadius: "20px", border: "1px solid #1e293b", marginBottom: "32px" }}>
          <h3 style={{ color: "#06b6d4", marginBottom: "16px" }}>AI Growth Advice</h3>
          <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.9", color: "#e2e8f0", fontSize: "15px" }}>{advice}</div>
        </div>
      )}

      <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>🎬 Your Videos</h2>
      <div style={{ display: "grid", gap: "12px" }}>
        {videos.length === 0 ? <p style={{ color: "#475569" }}>Loading videos...</p>
          : videos.map((v: any, i) => (
            <div key={i} style={{ background: "#0f172a", padding: "20px", borderRadius: "16px", border: "1px solid #1e293b",
              display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <p style={{ fontWeight: "bold", marginBottom: "4px" }}>{v.snippet?.title}</p>
                <p style={{ color: "#64748b", fontSize: "13px" }}>📅 {new Date(v.snippet?.publishedAt).toLocaleDateString()}</p>
              </div>
              <a href={`https://youtube.com/watch?v=${v.id?.videoId || v.id}`} target="_blank"
                style={{ background: "#ef4444", color: "white", padding: "10px 18px", borderRadius: "10px", textDecoration: "none", fontWeight: "bold", fontSize: "14px" }}>
                ▶ Watch
              </a>
            </div>
          ))}
      </div>
    </main>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ background: "#0f172a", padding: "24px", borderRadius: "18px", border: "1px solid #1e293b" }}>
      <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "8px" }}>{label}</p>
      <p style={{ color, fontSize: "28px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}
