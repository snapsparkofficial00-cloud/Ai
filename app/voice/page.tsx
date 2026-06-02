"use client";
import { useState } from "react";

export default function VoicePage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [voiceUrl, setVoiceUrl] = useState("");
  const [scriptLoading, setScriptLoading] = useState(false);
  const [topic, setTopic] = useState("");

  async function generateVoice() {
    if (!text) return;
    setLoading(true);
    setVoiceUrl("");
    const res = await fetch("/api/voice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text.slice(0, 1000) }),
    });
    const data = await res.json();
    if (data.url) setVoiceUrl(data.url);
    else alert(data.error || "Voice generation failed");
    setLoading(false);
  }

  async function generateScript() {
    if (!topic) return;
    setScriptLoading(true);
    const res = await fetch("/api/youtube/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    const data = await res.json();
    setText(data.result?.slice(0, 1000) || "");
    setScriptLoading(false);
  }

  return (
    <main style={{ background: "#020617", minHeight: "100vh", color: "white", fontFamily: "Arial", padding: "32px" }}>
      <h1 style={{ fontSize: "clamp(32px,6vw,60px)", fontWeight: "bold", marginBottom: "12px",
        background: "linear-gradient(to right,#8b5cf6,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        🎙 Voice AI
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "18px", marginBottom: "32px" }}>Convert any text to professional AI voiceover using ElevenLabs.</p>

      <div style={{ background: "#0f172a", padding: "28px", borderRadius: "20px", border: "1px solid #1e293b", marginBottom: "24px" }}>
        <h3 style={{ marginBottom: "16px", color: "#8b5cf6" }}>⚡ Generate Script First</h3>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <input value={topic} onChange={(e) => setTopic(e.target.value)}
            placeholder="Video topic to generate script..."
            style={{ flex: 1, minWidth: "200px", padding: "14px", borderRadius: "12px", border: "1px solid #334155", background: "#020617", color: "white", fontSize: "15px" }} />
          <button onClick={generateScript} disabled={scriptLoading} style={{
            background: scriptLoading ? "#1e293b" : "#7c3aed",
            border: "none", color: "white", padding: "14px 24px", borderRadius: "12px", fontWeight: "bold", cursor: scriptLoading ? "not-allowed" : "pointer" }}>
            {scriptLoading ? "✍️ Writing..." : "📝 Generate Script"}
          </button>
        </div>
      </div>

      <div style={{ background: "#0f172a", padding: "28px", borderRadius: "20px", border: "1px solid #1e293b", marginBottom: "24px" }}>
        <h3 style={{ marginBottom: "16px", color: "#ec4899" }}>🎤 Text to Voice</h3>
        <textarea value={text} onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text to convert to voice (max 1000 chars)..."
          rows={8}
          style={{ width: "100%", padding: "16px", borderRadius: "14px", border: "1px solid #334155", background: "#020617", color: "white", fontSize: "15px", lineHeight: "1.8", marginBottom: "16px", resize: "vertical", boxSizing: "border-box" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <span style={{ color: "#475569", fontSize: "13px" }}>{text.length}/1000 characters</span>
        </div>
        <button onClick={generateVoice} disabled={loading || !text} style={{
          background: loading ? "#1e293b" : "linear-gradient(to right,#8b5cf6,#ec4899)",
          border: "none", color: "white", padding: "16px 32px", borderRadius: "14px", fontWeight: "bold",
          cursor: loading || !text ? "not-allowed" : "pointer", fontSize: "17px" }}>
          {loading ? "🎤 Generating Voice..." : "🎤 Generate Voice"}
        </button>
      </div>

      {voiceUrl && (
        <div style={{ background: "#0f172a", padding: "28px", borderRadius: "20px", border: "1px solid #22c55e" }}>
          <p style={{ color: "#22c55e", fontWeight: "bold", marginBottom: "16px", fontSize: "18px" }}>✅ Voice Generated!</p>
          <audio controls src={voiceUrl} style={{ width: "100%", marginBottom: "16px" }} />
          <a href={voiceUrl} download="voice.mp3" style={{
            display: "inline-block", background: "#22c55e", color: "white", padding: "12px 24px",
            borderRadius: "12px", textDecoration: "none", fontWeight: "bold" }}>
            ⬇️ Download MP3
          </a>
        </div>
      )}
    </main>
  );
}
