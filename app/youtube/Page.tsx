"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function YouTubeAIPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [activeNiche, setActiveNiche] = useState("");
  const [logs, setLogs] = useState<string[]>([
    "⚡ Viral analysis engine online",
    "📺 Thumbnail AI optimized CTR",
    "🎬 Shorts AI generated hooks",
    "📤 Upload system synchronized",
    "💰 Revenue AI tracking earnings",
  ]);
  const [generatedVideo, setGeneratedVideo] = useState<any>(null);
  const [voiceUrl, setVoiceUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [scheduleList, setScheduleList] = useState<any[]>([]);

  const [channels, setChannels] = useState([
    { name: "AI Tech", subscribers: 12450, revenue: 320, status: "Excellent", niche: "AI Tech" },
    { name: "Finance Hub", subscribers: 8420, revenue: 190, status: "Good", niche: "Finance" },
    { name: "Space News", subscribers: 23100, revenue: 610, status: "Excellent", niche: "Space" },
  ]);

  useEffect(() => {
    loadSchedule();
    loadChannels();
  }, []);

  async function loadSchedule() {
    try {
      const res = await fetch("/api/youtube/schedule");
      const data = await res.json();
      if (data.schedule) setScheduleList(data.schedule);
    } catch (e) {}
  }

  async function loadChannels() {
    try {
      const res = await fetch("/api/youtube/channels");
      const data = await res.json();
      if (data.channels) setChannels(data.channels);
    } catch (e) {}
  }

  function addLog(msg: string) {
    setLogs((prev) => [msg, ...prev.slice(0, 19)]);
  }

  async function generateScript(customPrompt?: string) {
    const finalPrompt = customPrompt || prompt;
    if (!finalPrompt) return;

    setLoading(true);
    setActiveNiche(finalPrompt);
    setGeneratedVideo(null);
    setVoiceUrl("");
    setThumbnailUrl("");
    setUploadStatus("");
    addLog(`🚀 Starting AI generation for: ${finalPrompt}`);

    try {
      const res = await fetch("/api/youtube/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: finalPrompt }),
      });

      const data = await res.json();

      if (data.result) {
        setResult(data.result);
        addLog("✅ Script generated successfully");
      } else if (data.script) {
        setResult(data.script);
        addLog("✅ Script generated successfully");
      } else {
        setResult("⚠️ No response from AI");
        addLog("⚠️ AI returned empty response");
      }
    } catch (err) {
      setResult("❌ AI ERROR — Check API key");
      addLog("❌ Script generation failed");
    }

    setLoading(false);
  }

  async function generateFullVideo() {
    if (!activeNiche && !prompt) {
      addLog("❌ No niche selected. Click a niche button first.");
      return;
    }

    const niche = activeNiche || prompt;
    setLoading(true);
    setUploadStatus("");
    addLog(`🎬 Starting full video generation for: ${niche}`);

    try {
      // Step 1: Generate script, title, thumbnail via scheduler
      addLog("📝 Generating script and title...");
      const schedulerRes = await fetch("/api/scheduler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, type: "short" }),
      });
      const schedulerData = await schedulerRes.json();

      if (!schedulerData.success) {
        throw new Error(schedulerData.error || "Scheduler failed");
      }

      setResult(schedulerData.script);
      setGeneratedVideo(schedulerData);
      addLog(`✅ Script ready: ${schedulerData.title}`);

      if (schedulerData.thumbnailUrl) {
        setThumbnailUrl(schedulerData.thumbnailUrl);
        addLog("✅ Thumbnail generated");
      }

      // Step 2: Generate voice
      addLog("🎙️ Generating Hindi voiceover...");
      const voiceRes = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: schedulerData.script.slice(0, 1500),
          language: "hindi",
        }),
      });
      const voiceData = await voiceRes.json();

      if (voiceData.url) {
        setVoiceUrl(voiceData.url);
        addLog("✅ Voiceover generated");
      } else {
        addLog(`⚠️ Voice generation: ${voiceData.error || "Failed"}`);
      }

      // Step 3: Save to schedule
      addLog("📅 Scheduling video...");
      const scheduleRes = await fetch("/api/youtube/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: schedulerData.title,
          niche,
          type: "short",
          script: schedulerData.script,
          thumbnailUrl: schedulerData.thumbnailUrl,
        }),
      });
      await scheduleRes.json();

      addLog("✅ Video scheduled for publishing");
      await loadSchedule();

    } catch (err) {
      addLog(`❌ Generation failed: ${String(err)}`);
    }

    setLoading(false);
  }

  async function uploadToYouTube() {
    if (!generatedVideo) {
      addLog("❌ No video generated. Run 'Generate Full Video' first.");
      return;
    }

    setUploadStatus("uploading");
    addLog(`📤 Uploading "${generatedVideo.title}" to YouTube...`);

    try {
      const res = await fetch("/api/youtube/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: generatedVideo.title,
          description: generatedVideo.script?.slice(0, 500),
          tags: [activeNiche, "AI", "viral"],
        }),
      });
      const data = await res.json();

      if (data.success) {
        addLog(`✅ Upload successful! ${data.message || "Video published"}`);
        setUploadStatus("success");
      } else {
        addLog(`⚠️ Upload: ${data.message || "Failed"}`);
        setUploadStatus("failed");
      }
    } catch (err) {
      addLog(`❌ Upload error: ${String(err)}`);
      setUploadStatus("failed");
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
    addLog("📋 Script copied to clipboard");
  }

  const niches = [
    { emoji: "🏎️", name: "Supercars", prompt: "BMW M5, Ferrari, Lamborghini supercar viral shorts" },
    { emoji: "💸", name: "Finance", prompt: "Make money online, passive income, crypto trading" },
    { emoji: "🤖", name: "AI Tech", prompt: "AI tools, ChatGPT, future technology trends" },
    { emoji: "🎮", name: "Gaming", prompt: "GTA 6, Free Fire, BGMI viral gaming moments" },
    { emoji: "🌌", name: "Space", prompt: "NASA, SpaceX, black holes, universe mysteries" },
    { emoji: "🧠", name: "Motivation", prompt: "Success mindset, discipline, billionaire habits" },
    { emoji: "🎬", name: "Movie Edits", prompt: "Hollywood movie scenes, action edits, cinematic" },
    { emoji: "🔥", name: "Viral Facts", prompt: "Mind-blowing facts, interesting trivia, did you know" },
    { emoji: "📱", name: "Tech Reviews", prompt: "iPhone 16, Samsung S25, gadget unboxing" },
    { emoji: "💼", name: "Business", prompt: "Startup ideas, business growth, entrepreneur" },
    { emoji: "🛸", name: "Sci-Fi", prompt: "Alien theories, future technology, sci-fi movies" },
    { emoji: "🎵", name: "Music", prompt: "Hindi songs, viral music, Bollywood beats" },
  ];

  return (
    <main style={{
      background: "#020617",
      minHeight: "100vh",
      color: "white",
      fontFamily: "Arial",
      padding: "40px",
    }}>

      {/* HERO */}
      <div style={{ marginBottom: "50px" }}>
        <h1 style={{
          fontSize: "clamp(45px,8vw,90px)",
          fontWeight: "bold",
          marginBottom: "20px",
          background: "linear-gradient(to right,#ef4444,#38bdf8,#f59e0b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          🚀 YOUTUBE AI OS V3
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "22px", lineHeight: "1.8", maxWidth: "950px" }}>
          Autonomous AI system — viral content, voice generation, thumbnail AI, CEO strategy, and real YouTube analytics.
        </p>
      </div>

      {/* AI STATUS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
        gap: "20px",
        marginBottom: "40px",
      }}>
        <StatusCard title="🤖 AI STATUS" value="ONLINE" color="#22c55e" live />
        <StatusCard title="⚡ NICHE" value={activeNiche || "NONE"} color="#38bdf8" />
        <StatusCard title="🔥 ENGINE" value="LLAMA 70B" color="#f59e0b" />
        <StatusCard title="👥 SUBS" value="66" color="#ef4444" />
        <StatusCard title="📺 VIEWS" value="20,091" color="#38bdf8" />
        <StatusCard title="🎬 VIDEOS" value="13" color="#f59e0b" />
      </div>

      {/* MAIN GENERATOR */}
      <div style={{
        background: "#0f172a",
        padding: "35px",
        borderRadius: "25px",
        border: "1px solid #1e293b",
        marginBottom: "50px",
      }}>
        <h2 style={{ fontSize: "36px", marginBottom: "25px" }}>🤖 AI Viral Generator</h2>

        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginBottom: "20px" }}>
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter YouTube idea or niche..."
            style={{
              flex: 1,
              padding: "18px",
              borderRadius: "16px",
              border: "1px solid #334155",
              background: "#020617",
              color: "white",
              fontSize: "18px",
            }}
          />
          <button
            onClick={() => generateScript()}
            disabled={loading}
            style={{
              background: "linear-gradient(to right,#2563eb,#38bdf8)",
              border: "none",
              color: "white",
              padding: "18px 30px",
              borderRadius: "16px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "18px",
            }}
          >
            {loading ? "🤖 Generating..." : "🚀 Generate Script"}
          </button>
        </div>

        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginBottom: "30px" }}>
          <button
            onClick={generateFullVideo}
            disabled={loading}
            style={{
              background: "linear-gradient(to right,#f59e0b,#ef4444)",
              border: "none",
              color: "white",
              padding: "14px 24px",
              borderRadius: "14px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            🎬 Generate Full Video (Script + Voice + Thumbnail)
          </button>
          <button
            onClick={uploadToYouTube}
            disabled={loading || !generatedVideo}
            style={{
              background: uploadStatus === "uploading" ? "#1e293b" : "#ef4444",
              border: "none",
              color: "white",
              padding: "14px 24px",
              borderRadius: "14px",
              fontWeight: "bold",
              cursor: (!generatedVideo || loading) ? "not-allowed" : "pointer",
            }}
          >
            {uploadStatus === "uploading" ? "📤 Uploading..." : "📤 Auto Upload to YouTube"}
          </button>
        </div>

        {/* RESULT */}
        <div style={{
          background: "#020617",
          padding: "25px",
          borderRadius: "18px",
          minHeight: "260px",
          color: "#38bdf8",
          lineHeight: "1.9",
          whiteSpace: "pre-wrap",
          border: "1px solid #1e293b",
        }}>
          {loading ? "⚡ AI generating viral strategy..." : result || "AI response appears here..."}
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ display: "flex", gap: "15px", marginTop: "20px", flexWrap: "wrap" }}>
          <button onClick={copyResult} style={{ background: "#22c55e", border: "none", color: "white", padding: "14px 20px", borderRadius: "14px", cursor: "pointer", fontWeight: "bold" }}>📋 Copy Script</button>
          <button onClick={() => router.push("/voice")} style={{ background: "#9333ea", border: "none", color: "white", padding: "14px 20px", borderRadius: "14px", cursor: "pointer", fontWeight: "bold" }}>🎙 Voice AI</button>
          <button onClick={() => router.push("/video-editor")} style={{ background: "#f59e0b", border: "none", color: "white", padding: "14px 20px", borderRadius: "14px", cursor: "pointer", fontWeight: "bold" }}>🎬 Video AI</button>
        </div>

        {/* VOICE PLAYER */}
        {voiceUrl && (
          <div style={{ marginTop: "25px", padding: "20px", background: "#020617", borderRadius: "16px", border: "1px solid #22c55e" }}>
            <p style={{ color: "#22c55e", marginBottom: "12px" }}>🎙️ Hindi Voice Generated:</p>
            <audio controls src={voiceUrl} style={{ width: "100%" }} />
          </div>
        )}

        {/* THUMBNAIL */}
        {thumbnailUrl && (
          <div style={{ marginTop: "25px", padding: "20px", background: "#020617", borderRadius: "16px", border: "1px solid #38bdf8" }}>
            <p style={{ color: "#38bdf8", marginBottom: "12px" }}>🖼️ AI Generated Thumbnail:</p>
            <img src={thumbnailUrl} alt="thumbnail" style={{ maxWidth: "300px", borderRadius: "12px" }} />
          </div>
        )}
      </div>

      {/* CHANNEL CONTROL CENTER */}
      <section style={{ marginBottom: "50px" }}>
        <h2 style={{ fontSize: "40px", marginBottom: "20px" }}>📺 CHANNEL CONTROL CENTER</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "20px" }}>
          {channels.map((channel, idx) => (
            <div key={idx} style={{ background: "#0f172a", padding: "20px", borderRadius: "20px", border: "1px solid #1e293b" }}>
              <h3>{channel.name}</h3>
              <p>👥 Subscribers: {channel.subscribers.toLocaleString()}</p>
              <p>💰 Revenue: ${channel.revenue}</p>
              <p>🟢 Status: {channel.status}</p>
              <button
                onClick={() => { setPrompt(channel.niche); generateScript(channel.niche); }}
                style={{ width: "100%", marginTop: "10px", padding: "12px", background: "#2563eb", border: "none", color: "white", borderRadius: "12px", cursor: "pointer" }}
              >
                Generate for {channel.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* AI NICHES */}
      <section style={{ marginBottom: "70px" }}>
        <h2 style={{ fontSize: "50px", marginBottom: "35px" }}>🔥 AI Niches</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "25px" }}>
          {niches.map((item, idx) => (
            <div key={idx} style={{ background: "#0f172a", padding: "28px", borderRadius: "22px", border: "1px solid #1e293b" }}>
              <h2 style={{ fontSize: "32px", marginBottom: "12px" }}>{item.emoji} {item.name}</h2>
              <p style={{ color: "#94a3b8", lineHeight: "1.7", fontSize: "14px", marginBottom: "16px" }}>{item.prompt}</p>
              <button
                onClick={() => { setPrompt(item.name); generateFullVideo(); }}
                style={{ width: "100%", background: "#2563eb", border: "none", color: "white", padding: "14px", borderRadius: "12px", cursor: "pointer", fontWeight: "bold" }}
              >
                🚀 Launch AI
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* AI SYSTEM LOGS */}
      <section>
        <h2 style={{ fontSize: "40px", marginBottom: "25px" }}>📡 AI SYSTEM LOGS</h2>
        <div style={{ background: "#0f172a", padding: "30px", borderRadius: "24px", border: "1px solid #1e293b", maxHeight: "400px", overflowY: "auto" }}>
          {logs.map((log, idx) => (
            <div key={idx} style={{ background: "#111827", padding: "14px", borderRadius: "12px", marginBottom: "12px", color: "#94a3b8", fontFamily: "monospace", fontSize: "13px" }}>
              {log}
            </div>
          ))}
        </div>
      </section>

      {/* SCHEDULE SECTION */}
      {scheduleList.length > 0 && (
        <section style={{ marginTop: "50px" }}>
          <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>📅 Content Schedule</h2>
          {scheduleList.map((item, idx) => (
            <div key={idx} style={{ background: "#0f172a", padding: "16px", borderRadius: "16px", marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
              <div>
                <p style={{ fontWeight: "bold" }}>{item.title}</p>
                <p style={{ fontSize: "12px", color: "#64748b" }}>{item.scheduledFor || "Pending"}</p>
              </div>
              <span style={{ background: "#166534", color: "#22c55e", padding: "4px 12px", borderRadius: "999px", fontSize: "12px" }}>{item.status || "READY"}</span>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

function StatusCard({ title, value, color, live }: { title: string; value: string; color: string; live?: boolean }) {
  return (
    <div style={{ background: "#0f172a", padding: "24px", borderRadius: "22px", border: "1px solid #1e293b" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <h2 style={{ fontSize: "18px" }}>{title}</h2>
        {live && <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 6px #22c55e" }} />}
      </div>
      <p style={{ color, fontSize: "32px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}
