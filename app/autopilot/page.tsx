"use client";
import { useState, useEffect } from "react";

export default function AutoPilotPage() {
  const [niche, setNiche] = useState("BMW Cars and Supercars");
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);
  const [voiceUrl, setVoiceUrl] = useState("");
  const [schedule, setSchedule] = useState<any[]>([]);

  function addLog(msg: string) {
    setLog((prev) => [`${new Date().toLocaleTimeString()} — ${msg}`, ...prev]);
  }

  async function runAutoPilot(type: "short" | "long") {
    setLoading(true);
    setResult(null);
    setVoiceUrl("");

    addLog(`🚀 Starting ${type === "short" ? "Shorts" : "Long Video"} generation...`);
    addLog(`🎯 Niche: ${niche}`);
    addLog(`🌐 Language: Hindi`);

    try {
      // Step 1: Generate script + title + thumbnail
      addLog("📝 Generating Hindi script with AI...");
      const res = await fetch("/api/scheduler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, type }),
      });
      const data = await res.json();

      if (!data.success) {
        addLog(`❌ Script generation failed: ${data.error}`);
        setLoading(false);
        return;
      }

      setResult(data);
      addLog(`✅ Script generated: "${data.title}"`);
      if (data.thumbnailUrl) addLog("✅ Thumbnail generated");

      // Step 2: Generate Hindi voice
      addLog("🎙️ Generating Hindi voiceover...");
      const voiceRes = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: data.script.slice(0, 1500),
          language: "hindi",
        }),
      });
      const voiceData = await voiceRes.json();

      if (voiceData.url) {
        setVoiceUrl(voiceData.url);
        addLog("✅ Hindi voice generated successfully!");
      } else {
        addLog(`⚠️ Voice: ${voiceData.error || "Failed"}`);
      }

      // Step 3: Schedule
      const scheduled = {
        id: Date.now(),
        title: data.title,
        type,
        niche,
        scheduledFor: type === "short"
          ? new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()
          : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        status: "ready",
        thumbnailUrl: data.thumbnailUrl,
      };

      setSchedule((prev) => [scheduled, ...prev]);
      addLog(`📅 Scheduled for: ${scheduled.scheduledFor}`);
      addLog("🎉 Auto-pilot cycle complete!");

    } catch (err) {
      addLog(`❌ Error: ${String(err)}`);
    }

    setLoading(false);
  }

  return (
    <main style={{
      background: "#020617",
      minHeight: "100vh",
      color: "white",
      fontFamily: "Arial",
      padding: "24px",
      maxWidth: "100vw",
      overflowX: "hidden",
    }}>

      {/* HERO */}
      <div style={{ marginBottom: "36px" }}>
        <h1 style={{
          fontSize: "clamp(32px,6vw,64px)",
          fontWeight: "bold",
          background: "linear-gradient(to right,#22c55e,#38bdf8,#a855f7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "12px",
        }}>
          🤖 AUTO PILOT AI
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "18px", lineHeight: "1.7" }}>
          Fully autonomous YouTube system — Hindi scripts, voice, thumbnails, scheduling.<br />
          <span style={{ color: "#22c55e" }}>1 Short every 2 days + 1 Long video every week. Zero manual work.</span>
        </p>
      </div>

      {/* SCHEDULE INFO */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
        gap: "16px",
        marginBottom: "32px",
      }}>
        {[
          { label: "📅 Shorts Schedule", value: "Every 2 Days", color: "#22c55e" },
          { label: "🎬 Long Video", value: "Every Week", color: "#38bdf8" },
          { label: "🌐 Language", value: "Hindi", color: "#f59e0b" },
          { label: "🤖 Mode", value: "Full Auto", color: "#a855f7" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#0f172a", padding: "20px", borderRadius: "16px", border: "1px solid #1e293b" }}>
            <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "8px" }}>{s.label}</p>
            <p style={{ color: s.color, fontSize: "22px", fontWeight: "bold" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* NICHE INPUT */}
      <div style={{
        background: "#0f172a",
        padding: "28px",
        borderRadius: "20px",
        border: "1px solid #1e293b",
        marginBottom: "28px",
      }}>
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>⚙️ Auto-Pilot Settings</h2>
        <input
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="Your YouTube niche..."
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "14px",
            border: "1px solid #334155",
            background: "#020617",
            color: "white",
            fontSize: "16px",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        />

        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          <button
            onClick={() => runAutoPilot("short")}
            disabled={loading}
            style={{
              background: loading ? "#1e293b" : "linear-gradient(to right,#22c55e,#38bdf8)",
              border: "none",
              color: loading ? "#64748b" : "white",
              padding: "16px 28px",
              borderRadius: "14px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
            }}
          >
            {loading ? "🤖 Running..." : "⚡ Generate Short"}
          </button>
          <button
            onClick={() => runAutoPilot("long")}
            disabled={loading}
            style={{
              background: loading ? "#1e293b" : "linear-gradient(to right,#a855f7,#3b82f6)",
              border: "none",
              color: loading ? "#64748b" : "white",
              padding: "16px 28px",
              borderRadius: "14px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
            }}
          >
            {loading ? "🤖 Running..." : "🎬 Generate Long Video"}
          </button>
        </div>
      </div>

      {/* RESULT */}
      {result && (
        <div style={{
          background: "#0f172a",
          padding: "28px",
          borderRadius: "20px",
          border: "1px solid #22c55e",
          marginBottom: "28px",
        }}>
          <h2 style={{ color: "#22c55e", fontSize: "22px", marginBottom: "20px" }}>
            ✅ Generated: {result.title}
          </h2>

          {result.thumbnailUrl && (
            <img src={result.thumbnailUrl} alt="thumbnail"
              style={{ width: "100%", maxWidth: "480px", borderRadius: "12px", marginBottom: "20px", display: "block" }} />
          )}

          <div style={{
            background: "#020617",
            padding: "20px",
            borderRadius: "14px",
            border: "1px solid #1e293b",
            whiteSpace: "pre-wrap",
            lineHeight: "1.9",
            color: "#e2e8f0",
            fontSize: "14px",
            maxHeight: "300px",
            overflowY: "auto",
            marginBottom: "20px",
          }}>
            {result.script}
          </div>

          {voiceUrl && (
            <div style={{ marginBottom: "16px" }}>
              <p style={{ color: "#f59e0b", fontWeight: "bold", marginBottom: "10px" }}>🎙️ Hindi Voice:</p>
              <audio controls src={voiceUrl} style={{ width: "100%" }} />
              <a href={voiceUrl} download="hindi-voice.mp3" style={{
                display: "inline-block", marginTop: "10px", background: "#22c55e",
                color: "white", padding: "10px 20px", borderRadius: "10px", textDecoration: "none", fontWeight: "bold" }}>
                ⬇️ Download MP3
              </a>
            </div>
          )}

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={() => navigator.clipboard.writeText(result.script)}
              style={{ background: "#3b82f6", border: "none", color: "white", padding: "12px 20px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold" }}>
              📋 Copy Script
            </button>
            <button
              onClick={async () => {
                const res = await fetch("/api/youtube/upload", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ title: result.title, description: result.script.slice(0, 500) }),
                });
                const data = await res.json();
                addLog(data.message || "Upload triggered");
                alert(data.message || "Upload initiated");
              }}
              style={{ background: "#ef4444", border: "none", color: "white", padding: "12px 20px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold" }}>
              📤 Upload to YouTube
            </button>
          </div>
        </div>
      )}

      {/* SCHEDULE */}
      {schedule.length > 0 && (
        <div style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>📅 Content Schedule</h2>
          {schedule.map((item, i) => (
            <div key={i} style={{
              background: "#0f172a", padding: "20px", borderRadius: "16px",
              border: "1px solid #1e293b", marginBottom: "12px",
              display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px",
            }}>
              <div>
                <p style={{ fontWeight: "bold", marginBottom: "4px" }}>{item.title}</p>
                <p style={{ color: "#64748b", fontSize: "13px" }}>
                  {item.type === "short" ? "⚡ Short" : "🎬 Long"} · 📅 {item.scheduledFor}
                </p>
              </div>
              <span style={{
                background: "#166534", color: "#22c55e", padding: "6px 14px",
                borderRadius: "999px", fontSize: "12px", fontWeight: "bold",
              }}>
                ✅ READY
              </span>
            </div>
          ))}
        </div>
      )}

      {/* LIVE LOGS */}
      <div>
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>📡 Auto-Pilot Logs</h2>
        <div style={{
          background: "#0f172a",
          padding: "24px",
          borderRadius: "20px",
          border: "1px solid #1e293b",
          maxHeight: "300px",
          overflowY: "auto",
        }}>
          {log.length === 0
            ? <p style={{ color: "#475569" }}>Logs appear here when auto-pilot runs...</p>
            : log.map((l, i) => (
              <div key={i} style={{
                padding: "8px 12px",
                borderBottom: "1px solid #1e293b",
                fontFamily: "monospace",
                fontSize: "13px",
                color: l.includes("❌") ? "#ef4444" : l.includes("✅") ? "#22c55e" : "#38bdf8",
              }}>
                {l}
              </div>
            ))
          }
        </div>
      </div>
    </main>
  );
}
