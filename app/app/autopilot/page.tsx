"use client";
import { useState } from "react";

export default function AutoPilotPage() {
  const [niche, setNiche] = useState("BMW Cars and Supercars");
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);
  const [voiceUrl, setVoiceUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [musicUrl, setMusicUrl] = useState("");
  const [thumbUrl, setThumbUrl] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [schedule, setSchedule] = useState<any[]>([]);
  const [musicMood, setMusicMood] = useState("phonk");
  const [allVideos, setAllVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState(0);

  function addLog(msg: string, type = "info") {
    const icons: Record<string, string> = {
      info: "🔵", success: "✅", error: "❌", warn: "⚠️",
    };
    setLog((prev) => [
      `${icons[type]} ${new Date().toLocaleTimeString()} — ${msg}`,
      ...prev.slice(0, 49),
    ]);
  }

  async function runAutoPilot(type: "short" | "long") {
    setLoading(true);
    setResult(null);
    setVoiceUrl("");
    setVideoUrl("");
    setMusicUrl("");
    setThumbUrl("");
    setHashtags("");
    setAllVideos([]);

    addLog(`Starting ${type === "short" ? "Shorts" : "Long Video"} pipeline`, "info");
    addLog(`Niche: ${niche} | Hindi | ${type}`, "info");

    try {
      // STEP 1: Generate Hindi Script + Title + Hashtags
      addLog("Generating Hindi script...", "info");
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
      addLog(`✅ Script: "${scriptData.title}"`, "success");

      // Generate hashtags separately
      addLog("Generating viral hashtags...", "info");
      try {
        const hashRes = await fetch("/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            task: "hashtags",
            prompt: `Generate 30 viral YouTube hashtags for: "${niche}" ${type === "short" ? "Shorts" : "video"}. Mix Hindi and English. Include trending tags. Return only hashtags separated by spaces.`,
            niche,
          }),
        });
        const hashData = await hashRes.json();
        if (hashData.result) {
          setHashtags(hashData.result);
          addLog("Hashtags generated!", "success");
        }
      } catch {
        addLog("Hashtags skipped", "warn");
      }

      // STEP 2: Search Pixabay Footage
      addLog("Searching BMW footage on Pixabay...", "info");
      try {
        const searchQuery = niche.split(" ").slice(0, 3).join(" ");
        const pixabayRes = await fetch(
          `/api/pixabay?query=${encodeURIComponent(searchQuery)}&type=video`
        );
        const pixabayData = await pixabayRes.json();

        if (pixabayData.videos?.length > 0) {
          setAllVideos(pixabayData.videos);
          setVideoUrl(pixabayData.videos[0].url);
          addLog(`Found ${pixabayData.videos.length} footage clips!`, "success");
        } else {
          // Fallback search
          const fallbackRes = await fetch(
            `/api/pixabay?query=supercar+racing&type=video`
          );
          const fallbackData = await fallbackRes.json();
          if (fallbackData.videos?.length > 0) {
            setAllVideos(fallbackData.videos);
            setVideoUrl(fallbackData.videos[0].url);
            addLog("Using fallback car footage", "warn");
          } else {
            addLog("No footage found", "warn");
          }
        }
      } catch (e) {
        addLog(`Footage error: ${e}`, "warn");
      }

      // STEP 3: Generate Thumbnail
      addLog("Generating thumbnail with AI...", "info");
      try {
        const thumbRes = await fetch("/api/image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: `YouTube ${type === "short" ? "shorts vertical thumbnail" : "thumbnail"}: ${niche}. Bold Hindi text overlay, dramatic lighting, vibrant red and black colors, supercar photography, professional YouTube thumbnail, high contrast, eye-catching`,
          }),
        });
        const thumbData = await thumbRes.json();
        if (thumbData.url) {
          setThumbUrl(thumbData.url);
          addLog("Thumbnail generated!", "success");
        } else {
          addLog(`Thumbnail: ${thumbData.error}`, "warn");
        }
      } catch {
        addLog("Thumbnail failed", "warn");
      }

      // STEP 4: Generate Hindi Voice
      addLog("Generating Hindi voice...", "info");
      try {
        const voiceRes = await fetch("/api/voice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: scriptData.script?.slice(0, 300),
          }),
        });
        const voiceData = await voiceRes.json();
        if (voiceData.url) {
          setVoiceUrl(voiceData.url);
          addLog("Hindi voice ready!", "success");
        } else {
          addLog(`Voice: ${voiceData.error}`, "warn");
        }
      } catch {
        addLog("Voice failed", "warn");
      }

      // STEP 5: Load Music
      addLog(`Loading ${musicMood} music...`, "info");
      try {
        const musicRes = await fetch(`/api/music?mood=${musicMood}`);
        const musicData = await musicRes.json();
        if (musicData.track?.url) {
          setMusicUrl(musicData.track.url);
          addLog(`Music loaded: ${musicData.track.name}`, "success");
        }
      } catch {
        addLog("Music failed", "warn");
      }

      // STEP 6: Schedule
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
      addLog(`Scheduled: ${scheduled.scheduledFor}`, "success");
      addLog("🎉 Pipeline complete!", "success");

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
          description: `${result.script?.slice(0, 400)}\n\n${hashtags}`,
          tags: hashtags.split(" ").filter((h: string) => h.startsWith("#")).slice(0, 15),
        }),
      });
      const data = await res.json();
      addLog(data.message || "Upload done", data.success ? "success" : "warn");
      alert(data.message);
    } catch {
      addLog("Upload failed", "error");
    }
  }

  const moods = [
    { id: "phonk", label: "🔥 Phonk", desc: "Dark viral" },
    { id: "epic", label: "⚡ Epic", desc: "Cinematic" },
    { id: "motivational", label: "💪 Hype", desc: "Energy" },
    { id: "dramatic", label: "🎭 Dramatic", desc: "Intense" },
    { id: "chill", label: "😎 Chill", desc: "Smooth" },
  ];

  return (
    <main style={{
      background: "#020617", minHeight: "100vh",
      color: "white", fontFamily: "Arial",
      padding: "24px", maxWidth: "100vw", overflowX: "hidden",
    }}>

      {/* HERO */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{
          fontSize: "clamp(28px,5vw,56px)", fontWeight: "bold", marginBottom: "10px",
          background: "linear-gradient(to right,#22c55e,#38bdf8,#a855f7)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          🤖 AUTO PILOT AI
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: "1.7" }}>
          Hindi script → Voice → Footage → Thumbnail → Hashtags → YouTube
          <br />
          <span style={{ color: "#22c55e", fontWeight: "bold" }}>
            1 Short every 2 days + 1 Long video weekly. Zero manual work.
          </span>
        </p>
      </div>

      {/* STATUS ROW */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))",
        gap: "12px", marginBottom: "24px",
      }}>
        {[
          { label: "📅 Shorts", value: "Every 2 Days", color: "#22c55e" },
          { label: "🎬 Long", value: "Every Week", color: "#38bdf8" },
          { label: "🌐 Voice", value: "Google TTS", color: "#f59e0b" },
          { label: "🎬 Footage", value: "Pixabay FREE", color: "#a855f7" },
          { label: "🖼️ Thumb", value: "Fal.ai", color: "#ec4899" },
          { label: "📊 Hashtags", value: "AI Generated", color: "#06b6d4" },
        ].map((s, i) => (
          <div key={i} style={{
            background: "#0f172a", padding: "14px 16px",
            borderRadius: "12px", border: "1px solid #1e293b",
          }}>
            <p style={{ color: "#64748b", fontSize: "11px", marginBottom: "4px" }}>{s.label}</p>
            <p style={{ color: s.color, fontSize: "14px", fontWeight: "bold" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* SETTINGS */}
      <div style={{
        background: "#0f172a", padding: "24px", borderRadius: "20px",
        border: "1px solid #1e293b", marginBottom: "24px",
      }}>
        <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>⚙️ Settings</h2>

        <input
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="Your niche (e.g. BMW Cars and Supercars)..."
          style={{
            width: "100%", padding: "14px", borderRadius: "12px",
            border: "1px solid #334155", background: "#020617",
            color: "white", fontSize: "15px", marginBottom: "16px",
            boxSizing: "border-box",
          }}
        />

        {/* MUSIC SELECTOR */}
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "10px" }}>
          🎵 BACKGROUND MUSIC STYLE
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
          {moods.map((m) => (
            <button
              key={m.id}
              onClick={() => setMusicMood(m.id)}
              style={{
                padding: "10px 16px", borderRadius: "10px",
                border: musicMood === m.id ? "none" : "1px solid #334155",
                background: musicMood === m.id ? "#8b5cf6" : "#020617",
                color: "white", cursor: "pointer", fontWeight: "bold", fontSize: "13px",
              }}
            >
              {m.label}
              <span style={{ display: "block", color: musicMood === m.id ? "#e9d5ff" : "#475569", fontSize: "10px" }}>
                {m.desc}
              </span>
            </button>
          ))}
        </div>

        {/* GENERATE BUTTONS */}
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
            {loading ? "🤖 Running Pipeline..." : "⚡ Generate Short"}
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
            {loading ? "🤖 Running Pipeline..." : "🎬 Generate Long Video"}
          </button>
        </div>
      </div>

      {/* RESULT */}
      {result && (
        <div style={{
          background: "#0f172a", padding: "24px", borderRadius: "20px",
          border: "1px solid #22c55e", marginBottom: "24px",
        }}>
          <h2 style={{ color: "#22c55e", fontSize: "18px", marginBottom: "20px" }}>
            ✅ {result.title}
          </h2>

          {/* THUMBNAIL + VIDEO side by side */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "16px", marginBottom: "20px",
          }}>

            {/* THUMBNAIL */}
            {thumbUrl && (
              <div>
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>
                  🖼️ THUMBNAIL
                </p>
                <img
                  src={thumbUrl}
                  alt="thumbnail"
                  style={{ width: "100%", borderRadius: "12px", display: "block" }}
                />
                <a
                  href={thumbUrl}
                  download="thumbnail.jpg"
                  style={{
                    display: "inline-block", marginTop: "8px",
                    background: "#f59e0b", color: "#000",
                    padding: "8px 14px", borderRadius: "8px",
                    textDecoration: "none", fontWeight: "bold", fontSize: "13px",
                  }}
                >
                  ⬇️ Download Thumbnail
                </a>
              </div>
            )}

            {/* FOOTAGE SELECTOR */}
            {allVideos.length > 0 && (
              <div>
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>
                  🎬 STOCK FOOTAGE — tap to select clip
                </p>
                <video
                  key={videoUrl}
                  controls
                  autoPlay
                  muted
                  loop
                  src={videoUrl}
                  style={{ width: "100%", borderRadius: "12px", display: "block", marginBottom: "8px" }}
                />
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {allVideos.slice(0, 6).map((v: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => { setVideoUrl(v.url); setSelectedVideo(i); }}
                      style={{
                        padding: "6px 10px", borderRadius: "6px",
                        border: selectedVideo === i ? "2px solid #22c55e" : "1px solid #334155",
                        background: selectedVideo === i ? "#166534" : "#020617",
                        color: "white", cursor: "pointer", fontSize: "12px",
                      }}
                    >
                      Clip {i + 1} ({v.duration}s)
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* VOICE */}
          {voiceUrl && (
            <div style={{ marginBottom: "16px" }}>
              <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>
                🎙️ HINDI VOICE
              </p>
              <audio controls src={voiceUrl} style={{ width: "100%" }} />
              <a
                href={voiceUrl}
                download="hindi-voice.mp3"
                style={{
                  display: "inline-block", marginTop: "8px",
                  background: "#22c55e", color: "white",
                  padding: "8px 14px", borderRadius: "8px",
                  textDecoration: "none", fontWeight: "bold", fontSize: "13px",
                }}
              >
                ⬇️ Download Voice
              </a>
            </div>
          )}

          {/* MUSIC */}
          {musicUrl && (
            <div style={{ marginBottom: "16px" }}>
              <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>
                🎵 BACKGROUND MUSIC ({musicMood.toUpperCase()})
              </p>
              <audio controls src={musicUrl} style={{ width: "100%" }} />
            </div>
          )}

          {/* HASHTAGS */}
          {hashtags && (
            <div style={{ marginBottom: "16px" }}>
              <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>
                #️⃣ VIRAL HASHTAGS
              </p>
              <div style={{
                background: "#020617", padding: "14px", borderRadius: "10px",
                border: "1px solid #1e293b", fontSize: "13px",
                color: "#38bdf8", lineHeight: "1.8", wordBreak: "break-word",
              }}>
                {hashtags}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(hashtags)}
                style={{
                  marginTop: "8px", background: "#1e293b", border: "1px solid #334155",
                  color: "white", padding: "7px 14px", borderRadius: "8px",
                  cursor: "pointer", fontWeight: "bold", fontSize: "12px",
                }}
              >
                📋 Copy Hashtags
              </button>
            </div>
          )}

          {/* SCRIPT */}
          <div style={{ marginBottom: "16px" }}>
            <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>
              📝 HINDI SCRIPT
            </p>
            <div style={{
              background: "#020617", padding: "14px", borderRadius: "10px",
              border: "1px solid #1e293b", whiteSpace: "pre-wrap",
              lineHeight: "1.9", color: "#e2e8f0", fontSize: "13px",
              maxHeight: "200px", overflowY: "auto",
            }}>
              {result.script}
            </div>
          </div>

          {/* ACTION BUTTONS */}
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
            <button
              onClick={() => {
                const content = `Title: ${result.title}\n\nScript:\n${result.script}\n\nHashtags:\n${hashtags}`;
                navigator.clipboard.writeText(content);
                alert("All content copied!");
              }}
              style={{
                background: "#22c55e", border: "none", color: "white",
                padding: "10px 18px", borderRadius: "10px",
                fontWeight: "bold", cursor: "pointer", fontSize: "14px",
              }}
            >
              📦 Copy All
            </button>
          </div>
        </div>
      )}

      {/* SCHEDULE */}
      {schedule.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>📅 Scheduled Videos</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {schedule.map((item: any, index: number) => (
              <div
                key={index}
                style={{
                  background: "#0f172a",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "1px solid #1e293b",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div>
                  <p style={{ fontWeight: "bold", fontSize: "15px" }}>{item.title}</p>
                  <p style={{ color: "#64748b", fontSize: "13px" }}>
                    {item.type === "short" ? "⚡ Short" : "🎬 Long"} · {item.niche}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ color: "#22c55e", fontWeight: "bold", fontSize: "14px" }}>
                    {item.scheduledFor}
                  </p>
                  <p style={{
                    color: item.status === "ready" ? "#22c55e" : "#f59e0b",
                    fontSize: "12px",
                    textTransform: "uppercase",
                  }}>
                    {item.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LOGS */}
      {log.length > 0 && (
        <div style={{
          background: "#0f172a", padding: "20px", borderRadius: "20px",
          border: "1px solid #1e293b",
        }}>
          <h2 style={{ fontSize: "18px", marginBottom: "14px" }}>📋 AutoPilot Logs</h2>
          <div style={{
            background: "#020617", padding: "14px", borderRadius: "10px",
            border: "1px solid #1e293b", maxHeight: "300px", overflowY: "auto",
          }}>
            {log.map((entry, i) => (
              <p key={i} style={{
                fontSize: "12px", color: "#94a3b8",
                padding: "4px 0", borderBottom: "1px solid #1e293b",
                fontFamily: "monospace",
              }}>
                {entry}
              </p>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
