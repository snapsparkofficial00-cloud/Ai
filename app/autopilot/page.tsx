"use client";
import { useState, useEffect } from "react";

export default function AutoPilotPage() {
  const [niche, setNiche] = useState("BMW Cars and Supercars");
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);
  const [voiceUrl, setVoiceUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [musicUrl, setMusicUrl] = useState("");
  const [schedule, setSchedule] = useState<any[]>([]);
  const [musicMood, setMusicMood] = useState("epic");

  function addLog(msg: string, type = "info") {
    const colors: Record<string, string> = {
      info: "🔵", success: "✅", error: "❌", warn: "⚠️",
    };
    setLog((prev) => [
      `${colors[type]} ${new Date().toLocaleTimeString()} — ${msg}`,
      ...prev.slice(0, 49),
    ]);
  }

  async function runAutoPilot(type: "short" | "long") {
    setLoading(true);
    setResult(null);
    setVoiceUrl("");
    setVideoUrl("");
    setMusicUrl("");

    addLog(`Starting ${type === "short" ? "Shorts" : "Long Video"} generation`, "info");
    addLog(`Niche: ${niche} | Language: Hindi`, "info");

    try {
      // STEP 1: Generate Hindi Script
      addLog("Generating Hindi script with Groq AI...", "info");
      const scriptRes = await fetch("/api/scheduler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, type }),
      });
      const scriptData = await scriptRes.json();

      if (!scriptData.success) {
        addLog(`Script failed: ${scriptData.error}`, "error");
        setLoading(false);
        return;
      }

      setResult(scriptData);
      addLog(`Script generated: "${scriptData.title}"`, "success");

      // STEP 2: Get Stock Footage
      addLog("Searching Pixabay for footage...", "info");
      try {
        const videoRes = await fetch("/api/video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: niche,
            type,
          }),
        });
        const videoData = await videoRes.json();
        if (videoData.videoUrl) {
          setVideoUrl(videoData.videoUrl);
          addLog("Stock footage found!", "success");
        } else {
          addLog(`Footage: ${videoData.error || "Not found"}`, "warn");
        }
      } catch {
        addLog("Footage search failed", "warn");
      }

      // STEP 3: Generate Voice
      addLog("Generating Hindi voice with Google TTS...", "info");
      try {
        const voiceRes = await fetch("/api/voice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: scriptData.script?.slice(0, 200),
          }),
        });
        const voiceData = await voiceRes.json();
        if (voiceData.url) {
          setVoiceUrl(voiceData.url);
          addLog("Hindi voice generated!", "success");
        } else {
          addLog(`Voice: ${voiceData.error}`, "warn");
        }
      } catch {
        addLog("Voice generation failed", "warn");
      }

      // STEP 4: Get Background Music
      addLog("Loading background music...", "info");
      try {
        const musicRes = await fetch(`/api/music?mood=${musicMood}`);
        const musicData = await musicRes.json();
        if (musicData.track?.url) {
          setMusicUrl(musicData.track.url);
          addLog(`Music loaded: ${musicData.track.name}`, "success");
        }
      } catch {
        addLog("Music loading failed", "warn");
      }

      // STEP 5: Schedule
      const scheduled = {
        id: Date.now(),
        title: scriptData.title,
        type,
        niche,
        scheduledFor: type === "short"
          ? new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()
          : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        status: "ready",
      };
      setSchedule((prev) => [scheduled, ...prev]);
      addLog(`Scheduled for: ${scheduled.scheduledFor}`, "success");
      addLog("Auto-pilot cycle complete!", "success");

    } catch (err) {
      addLog(`Error: ${String(err)}`, "error");
    }
    setLoading(false);
  }

  async function uploadToYouTube() {
    if (!result) return;
    addLog("Uploading to YouTube...", "info");
    try {
      const res = await fetch("/api/youtube/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: result.title,
          description: result.script?.slice(0, 500),
          tags: ["BMW", "shorts", "viral", "hindi"],
        }),
      });
      const data = await res.json();
      addLog(data.message || "Upload triggered", data.success ? "success" : "warn");
      alert(data.message || "Upload initiated");
    } catch {
      addLog("Upload failed", "error");
    }
  }

  const moods = ["epic", "phonk", "motivational", "dramatic", "chill"];

  return (
    <main style={{
      background: "#020617", minHeight: "100vh",
      color: "white", fontFamily: "Arial",
      padding: "24px", maxWidth: "100vw", overflowX: "hidden",
    }}>

      {/* HERO */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{
          fontSize: "clamp(28px,5vw,56px)", fontWeight: "bold", marginBottom: "10px",
          background: "linear-gradient(to right,#22c55e,#38bdf8,#a855f7)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          🤖 AUTO PILOT AI
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.7" }}>
          Fully autonomous YouTube system — Hindi scripts + Google TTS voice + Pixabay footage + music
          <br />
          <span style={{ color: "#22c55e" }}>
            1 Short every 2 days + 1 Long video weekly. Zero manual work.
          </span>
        </p>
      </div>

      {/* STATUS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
        gap: "14px", marginBottom: "28px",
      }}>
        {[
          { label: "📅 Shorts", value: "Every 2 Days", color: "#22c55e" },
          { label: "🎬 Long Video", value: "Every Week", color: "#38bdf8" },
          { label: "🌐 Voice", value: "Google TTS", color: "#f59e0b" },
          { label: "🎬 Video", value: "Pixabay FREE", color: "#a855f7" },
          { label: "🎵 Music", value: "Free Tracks", color: "#ec4899" },
          { label: "🤖 Mode", value: "Full Auto", color: "#22c55e" },
        ].map((s, i) => (
          <div key={i} style={{
            background: "#0f172a", padding: "16px 18px",
            borderRadius: "14px", border: "1px solid #1e293b",
          }}>
            <p style={{ color: "#64748b", fontSize: "11px", marginBottom: "6px" }}>{s.label}</p>
            <p style={{ color: s.color, fontSize: "16px", fontWeight: "bold" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* SETTINGS */}
      <div style={{
        background: "#0f172a", padding: "24px", borderRadius: "20px",
        border: "1px solid #1e293b", marginBottom: "24px",
      }}>
        <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>⚙️ Auto-Pilot Settings</h2>

        <input
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="Your YouTube niche..."
          style={{
            width: "100%", padding: "14px", borderRadius: "12px",
            border: "1px solid #334155", background: "#020617",
            color: "white", fontSize: "15px", marginBottom: "16px",
            boxSizing: "border-box",
          }}
        />

        {/* MUSIC MOOD */}
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "10px" }}>
          BACKGROUND MUSIC MOOD
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
          {moods.map((m) => (
            <button key={m} onClick={() => setMusicMood(m)} style={{
              padding: "8px 16px", borderRadius: "8px",
              border: musicMood === m ? "none" : "1px solid #334155",
              background: musicMood === m ? "#8b5cf6" : "#020617",
              color: "white", cursor: "pointer", fontWeight: "bold",
              fontSize: "13px", textTransform: "capitalize",
            }}>
              {m}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            onClick={() => runAutoPilot("short")}
            disabled={loading}
            style={{
              background: loading ? "#1e293b" : "linear-gradient(to right,#22c55e,#38bdf8)",
              border: "none", color: loading ? "#64748b" : "white",
              padding: "16px 28px", borderRadius: "14px", fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer", fontSize: "16px",
            }}
          >
            {loading ? "🤖 Running..." : "⚡ Generate Short"}
          </button>
          <button
            onClick={() => runAutoPilot("long")}
            disabled={loading}
            style={{
              background: loading ? "#1e293b" : "linear-gradient(to right,#a855f7,#3b82f6)",
              border: "none", color: loading ? "#64748b" : "white",
              padding: "16px 28px", borderRadius: "14px", fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer", fontSize: "16px",
            }}
          >
            {loading ? "🤖 Running..." : "🎬 Generate Long Video"}
          </button>
        </div>
      </div>

      {/* RESULT */}
      {result && (
        <div style={{
          background: "#0f172a", padding: "24px", borderRadius: "20px",
          border: "1px solid #22c55e", marginBottom: "24px",
        }}>
          <h2 style={{ color: "#22c55e", fontSize: "20px", marginBottom: "20px" }}>
            ✅ {result.title}
          </h2>

          {/* VIDEO */}
          {videoUrl && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>
                🎬 STOCK FOOTAGE (Pixabay)
              </p>
              <video
                controls
                src={videoUrl}
                style={{ width: "100%", maxWidth: "640px", borderRadius: "12px", display: "block" }}
              />
            </div>
          )}

          {/* VOICE */}
          {voiceUrl && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>
                🎙️ HINDI VOICE (Google TTS)
              </p>
              <audio controls src={voiceUrl} style={{ width: "100%" }} />
              <a href={voiceUrl} download="hindi-voice.mp3" style={{
                display: "inline-block", marginTop: "8px",
                background: "#22c55e", color: "white",
                padding: "8px 16px", borderRadius: "8px",
                textDecoration: "none", fontWeight: "bold", fontSize: "13px",
              }}>
                ⬇️ Download Voice
              </a>
            </div>
          )}

          {/* MUSIC */}
          {musicUrl && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>
                🎵 BACKGROUND MUSIC (Free)
              </p>
              <audio controls src={musicUrl} style={{ width: "100%" }} />
            </div>
          )}

          {/* SCRIPT */}
          <div style={{ marginBottom: "20px" }}>
            <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>
              📝 HINDI SCRIPT
            </p>
            <div style={{
              background: "#020617", padding: "16px", borderRadius: "12px",
              border: "1px solid #1e293b", whiteSpace: "pre-wrap",
              lineHeight: "1.9", color: "#e2e8f0", fontSize: "14px",
              maxHeight: "200px", overflowY: "auto",
            }}>
              {result.script}
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => navigator.clipboard.writeText(result.script)}
              style={{
                background: "#3b82f6", border: "none", color: "white",
                padding: "10px 18px", borderRadius: "10px",
                fontWeight: "bold", cursor: "pointer", fontSize: "14px",
              }}
            >
              📋 Copy Script
            </button>
            <button
              onClick={uploadToYouTube}
              style={{
                background: "#ef4444", border: "none", color: "white",
                padding: "10px 18px", borderRadius: "10px",
                fontWeight: "bold", cursor: "pointer", fontSize: "14px",
              }}
            >
              📤 Upload to YouTube
            </button>
          </div>
        </div>
      )}

      {/* SCHEDULE */}
      {schedule.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>📅 Content Schedule</h2>
          {schedule.map((item, i) => (
            <div key={i} style={{
              background: "#0f172a", padding: "16px 20px", borderRadius: "14px",
              border: "1px solid #1e293b", marginBottom: "10px",
              display: "flex", justifyContent: "space-between",
              alignItems: "center", flexWrap: "wrap", gap: "10px",
            }}>
              <div>
                <p style={{ fontWeight: "bold", marginBottom: "4px", fontSize: "14px" }}>
                  {item.title}
                </p>
                <p style={{ color: "#64748b", fontSize: "12px" }}>
                  {item.type === "short" ? "⚡ Short" : "🎬 Long"} · 📅 {item.scheduledFor}
                </p>
              </div>
              <span style={{
                background: "#166534", color: "#22c55e",
                padding: "5px 12px", borderRadius: "999px",
                fontSize: "11px", fontWeight: "bold",
              }}>
                ✅ READY
              </span>
            </div>
          ))}
        </div>
      )}

      {/* LOGS */}
      <div>
        <h2 style={{ fontSize: "20px", marginBottom: "14px" }}>📡 Auto-Pilot Logs</h2>
        <div style={{
          background: "#0f172a", padding: "20px", borderRadius: "18px",
          border: "1px solid #1e293b", maxHeight: "300px", overflowY: "auto",
        }}>
          {log.length === 0
            ? <p style={{ color: "#475569", fontSize: "14px" }}>
                Logs appear here when auto-pilot runs...
              </p>
            : log.map((l, i) => (
              <div key={i} style={{
                padding: "7px 0", borderBottom: "1px solid #1e293b",
                fontFamily: "monospace", fontSize: "12px",
                color: l.includes("❌") ? "#ef4444" :
                       l.includes("✅") ? "#22c55e" :
                       l.includes("⚠️") ? "#f59e0b" : "#38bdf8",
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
