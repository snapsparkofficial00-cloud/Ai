"use client";

import { useState, useEffect, useRef } from "react";

export default function VideoEditorPage() {
  const [activeTab, setActiveTab] = useState("create");
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState<"text-to-video" | "image-to-video">("text-to-video");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [status, setStatus] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [script, setScript] = useState("");
  const [voiceUrl, setVoiceUrl] = useState("");
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [thumbUrl, setThumbUrl] = useState("");
  const [thumbLoading, setThumbLoading] = useState(false);
  const pollRef = useRef<any>(null);

  async function generateVideo() {
    if (!prompt) return;
    setLoading(true);
    setStatus("🚀 Submitting to Kling AI...");
    setVideoUrl("");
    setRequestId("");

    try {
      const res = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, mode, imageUrl }),
      });
      const data = await res.json();

      if (data.error) {
        setStatus(`❌ ${data.error}`);
        setLoading(false);
        return;
      }

      const newJob = {
        id: data.requestId,
        prompt,
        mode,
        status: "processing",
        createdAt: new Date().toLocaleTimeString(),
        videoUrl: "",
      };

      setJobs((prev) => [newJob, ...prev]);
      setRequestId(data.requestId);
      setStatus("⏳ Generating video... (1-3 mins)");
      startPolling(data.requestId);

    } catch {
      setStatus("❌ Video generation failed");
      setLoading(false);
    }
  }

  function startPolling(reqId: string) {
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/video/status?requestId=${reqId}&type=${mode}`);
        const data = await res.json();

        if (data.videoUrl) {
          setVideoUrl(data.videoUrl);
          setStatus("✅ Video ready!");
          setLoading(false);
          setJobs((prev) =>
            prev.map((j) => j.id === reqId ? { ...j, status: "completed", videoUrl: data.videoUrl } : j)
          );
          clearInterval(pollRef.current);
        } else if (data.status === "failed") {
          setStatus("❌ Generation failed");
          setLoading(false);
          clearInterval(pollRef.current);
        } else {
          setStatus(`⏳ Status: ${data.status || "processing"}...`);
        }
      } catch {
        console.log("Poll error");
      }
    }, 8000);
  }

  useEffect(() => {
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  async function generateVoice() {
    if (!script) { alert("Enter a script first"); return; }
    setVoiceLoading(true);
    try {
      const res = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: script.slice(0, 1000) }),
      });
      const data = await res.json();
      if (data.url) setVoiceUrl(data.url);
      else alert(data.error || "Voice failed");
    } catch { alert("Voice error"); }
    setVoiceLoading(false);
  }

  async function generateThumbnail() {
    if (!prompt) { alert("Enter a video topic first"); return; }
    setThumbLoading(true);
    try {
      const res = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `YouTube thumbnail: ${prompt}. Bold, vibrant, high contrast, viral, professional`,
        }),
      });
      const data = await res.json();
      if (data.url) setThumbUrl(data.url);
      else alert(data.error || "Thumbnail failed");
    } catch { alert("Thumbnail error"); }
    setThumbLoading(false);
  }

  async function generateScript() {
    if (!prompt) { alert("Enter a topic first"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/youtube/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: prompt }),
      });
      const data = await res.json();
      setScript(data.result || "");
    } catch { alert("Script generation failed"); }
    setLoading(false);
  }

  const tabs = [
    { id: "create", label: "🎬 Create Video" },
    { id: "voice", label: "🎤 Voice & Script" },
    { id: "thumbnail", label: "🖼️ Thumbnail" },
    { id: "jobs", label: `📋 Jobs (${jobs.length})` },
  ];

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
          background: "linear-gradient(to right,#f59e0b,#ef4444,#ec4899)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "12px",
        }}>
          🎬 VIDEO AI OS
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "18px", lineHeight: "1.7" }}>
          AI video generation with Kling AI + voice synthesis + thumbnail creation + YouTube upload
        </p>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: "12px 20px",
            borderRadius: "14px",
            border: activeTab === tab.id ? "none" : "1px solid #1e293b",
            background: activeTab === tab.id ? "linear-gradient(to right,#f59e0b,#ef4444)" : "#0f172a",
            color: "white",
            fontWeight: "bold",
            fontSize: "15px",
            cursor: "pointer",
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB: CREATE VIDEO */}
      {activeTab === "create" && (
        <div style={{
          background: "#0f172a",
          padding: "32px",
          borderRadius: "24px",
          border: "1px solid #1e293b",
        }}>
          <h2 style={{ fontSize: "28px", marginBottom: "24px" }}>🎬 AI Video Generator</h2>

          {/* MODE SELECT */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
            {(["text-to-video", "image-to-video"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)} style={{
                padding: "12px 20px",
                borderRadius: "12px",
                border: mode === m ? "none" : "1px solid #334155",
                background: mode === m ? "#f59e0b" : "#020617",
                color: mode === m ? "#000" : "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}>
                {m === "text-to-video" ? "📝 Text to Video" : "🖼️ Image to Video"}
              </button>
            ))}
          </div>

          {/* PROMPT */}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your video... e.g. BMW M5 drifting on a mountain road at sunset, cinematic 4K"
            rows={4}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              border: "1px solid #334155",
              background: "#020617",
              color: "white",
              fontSize: "16px",
              lineHeight: "1.7",
              marginBottom: "16px",
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />

          {/* IMAGE URL for image-to-video */}
          {mode === "image-to-video" && (
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste image URL to animate..."
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #334155",
                background: "#020617",
                color: "white",
                fontSize: "15px",
                marginBottom: "16px",
                boxSizing: "border-box",
              }}
            />
          )}

          {/* BUTTONS */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "24px" }}>
            <button
              onClick={generateVideo}
              disabled={loading || !prompt}
              style={{
                background: loading ? "#1e293b" : "linear-gradient(to right,#f59e0b,#ef4444)",
                border: "none",
                color: loading ? "#64748b" : "white",
                padding: "16px 32px",
                borderRadius: "14px",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "17px",
              }}
            >
              {loading ? "🎬 Generating..." : "🎬 Generate Video"}
            </button>
            <button
              onClick={generateScript}
              style={{
                background: "#7c3aed",
                border: "none",
                color: "white",
                padding: "16px 24px",
                borderRadius: "14px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              📝 Generate Script
            </button>
            <button
              onClick={generateThumbnail}
              style={{
                background: "#0f172a",
                border: "1px solid #334155",
                color: "white",
                padding: "16px 24px",
                borderRadius: "14px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              🖼️ Thumbnail
            </button>
          </div>

          {/* STATUS */}
          {status && (
            <div style={{
              background: "#020617",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #334155",
              color: status.includes("✅") ? "#22c55e" : status.includes("❌") ? "#ef4444" : "#38bdf8",
              marginBottom: "20px",
              fontWeight: "bold",
            }}>
              {status}
            </div>
          )}

          {/* VIDEO PLAYER */}
          {videoUrl && (
            <div style={{
              background: "#020617",
              padding: "24px",
              borderRadius: "18px",
              border: "1px solid #22c55e",
            }}>
              <p style={{ color: "#22c55e", fontWeight: "bold", marginBottom: "16px" }}>
                ✅ Video Generated!
              </p>
              <video
                controls
                src={videoUrl}
                style={{ width: "100%", borderRadius: "12px", marginBottom: "16px" }}
              />
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a href={videoUrl} download="video.mp4" style={{
                  background: "#22c55e",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}>
                  ⬇️ Download MP4
                </a>
                <button
                  onClick={async () => {
                    const res = await fetch("/api/youtube/upload", { method: "POST" });
                    const data = await res.json();
                    alert(data.message || "Upload triggered");
                  }}
                  style={{
                    background: "#ef4444",
                    border: "none",
                    color: "white",
                    padding: "12px 24px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  📤 Upload to YouTube
                </button>
              </div>
            </div>
          )}

          {/* THUMBNAIL PREVIEW */}
          {thumbUrl && (
            <div style={{ marginTop: "24px" }}>
              <p style={{ color: "#f59e0b", fontWeight: "bold", marginBottom: "12px" }}>🖼️ Thumbnail:</p>
              <img src={thumbUrl} alt="thumbnail" style={{ width: "100%", maxWidth: "480px", borderRadius: "12px" }} />
            </div>
          )}
        </div>
      )}

      {/* TAB: VOICE & SCRIPT */}
      {activeTab === "voice" && (
        <div style={{
          background: "#0f172a",
          padding: "32px",
          borderRadius: "24px",
          border: "1px solid #1e293b",
        }}>
          <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>🎤 Voice & Script AI</h2>

          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Write or generate a script for your video..."
            rows={10}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              border: "1px solid #334155",
              background: "#020617",
              color: "white",
              fontSize: "15px",
              lineHeight: "1.8",
              marginBottom: "20px",
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={generateVoice}
              disabled={voiceLoading}
              style={{
                background: voiceLoading ? "#1e293b" : "linear-gradient(to right,#8b5cf6,#ec4899)",
                border: "none",
                color: "white",
                padding: "16px 28px",
                borderRadius: "14px",
                fontWeight: "bold",
                cursor: voiceLoading ? "not-allowed" : "pointer",
                fontSize: "16px",
              }}
            >
              {voiceLoading ? "🎤 Generating..." : "🎤 Generate Voice"}
            </button>
          </div>

          {voiceUrl && (
            <div style={{ marginTop: "24px", background: "#020617", padding: "20px", borderRadius: "14px", border: "1px solid #22c55e" }}>
              <p style={{ color: "#22c55e", fontWeight: "bold", marginBottom: "12px" }}>✅ Voice Ready!</p>
              <audio controls src={voiceUrl} style={{ width: "100%" }} />
              <a href={voiceUrl} download="voice.mp3" style={{
                display: "inline-block",
                marginTop: "12px",
                background: "#22c55e",
                color: "white",
                padding: "10px 20px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: "bold",
              }}>
                ⬇️ Download MP3
              </a>
            </div>
          )}
        </div>
      )}

      {/* TAB: THUMBNAIL */}
      {activeTab === "thumbnail" && (
        <div style={{
          background: "#0f172a",
          padding: "32px",
          borderRadius: "24px",
          border: "1px solid #1e293b",
        }}>
          <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>🖼️ Thumbnail Generator</h2>
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Video topic for thumbnail..."
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              border: "1px solid #334155",
              background: "#020617",
              color: "white",
              fontSize: "16px",
              marginBottom: "16px",
              boxSizing: "border-box",
            }}
          />
          <button
            onClick={generateThumbnail}
            disabled={thumbLoading}
            style={{
              background: thumbLoading ? "#1e293b" : "linear-gradient(to right,#f59e0b,#ef4444)",
              border: "none",
              color: "white",
              padding: "16px 28px",
              borderRadius: "14px",
              fontWeight: "bold",
              cursor: thumbLoading ? "not-allowed" : "pointer",
              fontSize: "16px",
            }}
          >
            {thumbLoading ? "🖼️ Generating..." : "🖼️ Generate Thumbnail"}
          </button>

          {thumbUrl && (
            <div style={{ marginTop: "24px" }}>
              <img src={thumbUrl} alt="thumbnail" style={{ width: "100%", maxWidth: "640px", borderRadius: "14px", display: "block", marginBottom: "16px" }} />
              <a href={thumbUrl} download="thumbnail.png" target="_blank" style={{
                background: "#f59e0b",
                color: "black",
                padding: "12px 24px",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: "bold",
              }}>
                ⬇️ Download
              </a>
            </div>
          )}
        </div>
      )}

      {/* TAB: JOBS */}
      {activeTab === "jobs" && (
        <div>
          <h2 style={{ fontSize: "28px", marginBottom: "24px" }}>📋 Video Jobs</h2>
          {jobs.length === 0 ? (
            <p style={{ color: "#475569" }}>No jobs yet. Generate a video to see it here.</p>
          ) : (
            jobs.map((job, i) => (
              <div key={i} style={{
                background: "#0f172a",
                padding: "20px",
                borderRadius: "18px",
                border: "1px solid #1e293b",
                marginBottom: "14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
              }}>
                <div>
                  <p style={{ fontWeight: "bold", marginBottom: "4px" }}>{job.prompt.slice(0, 60)}...</p>
                  <p style={{ color: "#64748b", fontSize: "13px" }}>🕐 {job.createdAt} · {job.mode}</p>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{
                    padding: "6px 14px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    background: job.status === "completed" ? "#166534" : "#1e3a5f",
                    color: job.status === "completed" ? "#22c55e" : "#38bdf8",
                  }}>
                    {job.status === "completed" ? "✅ DONE" : "⏳ PROCESSING"}
                  </span>
                  {job.videoUrl && (
                    <a href={job.videoUrl} download style={{
                      background: "#22c55e",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "10px",
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: "13px",
                    }}>
                      ⬇️ Download
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}
