"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function YouTubeAIPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [activeNiche, setActiveNiche] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [logs, setLogs] = useState<string[]>([
    "⚡ Neural engine online — 2070 mode",
    "🎬 Shorts AI loaded with 50+ viral templates",
    "🎥 Long form AI ready with cinematic scripts",
    "🖼️ Thumbnail AI — 99% CTR prediction",
    "🎙️ Voice AI — 40+ languages loaded",
    "🎵 Music AI — Royalty-free library synced",
    "#️⃣ Hashtag AI — Trending database updated",
    "📊 Analytics AI — Real-time tracking active",
    "👥 Competitor AI — 1000+ channels monitored",
    "💰 Revenue AI — Affiliate optimization ready",
    "🧠 Self-learning module — Evolving continuously",
    "🚀 Auto-pilot — 24/7 operation mode",
  ]);
  
  const [channels] = useState([
    { name: "AI Tech", subscribers: 12450, revenue: 320, status: "Excellent", niche: "AI Tech" },
    { name: "Finance Hub", subscribers: 8420, revenue: 190, status: "Good", niche: "Finance" },
    { name: "Space News", subscribers: 23100, revenue: 610, status: "Excellent", niche: "Space" },
    { name: "Supercars", subscribers: 56700, revenue: 1240, status: "Viral", niche: "Supercars" },
    { name: "Gaming Zone", subscribers: 89500, revenue: 2100, status: "Viral", niche: "Gaming" },
    { name: "Movie Hub", subscribers: 34000, revenue: 850, status: "Excellent", niche: "Movies" },
  ]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        const autoLogs = [
          "🧠 AI analyzing trending topics...",
          "📊 Updating viral prediction database...",
          "👥 Monitoring competitor activity...",
          "💰 Optimizing revenue strategies...",
          "🎬 Generating content ideas...",
        ];
        const randomLog = autoLogs[Math.floor(Math.random() * autoLogs.length)];
        setLogs(prev => [randomLog, ...prev.slice(0, 49)]);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [loading]);

  function addLog(msg: string) {
    setLogs((prev) => [msg, ...prev.slice(0, 49)]);
  }

  // ========== ALL ACTIONS ==========

  async function generateScript() {
    if (!prompt && !activeNiche) return;
    setLoading(true); setResult("");
    const topic = prompt || activeNiche;
    addLog(`🚀 Generating script: ${topic}`);
    try {
      const res = await fetch("/api/youtube/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      setResult(data.result || data.script || "No response");
      addLog("✅ Script generated!");
    } catch { addLog("❌ Failed"); }
    setLoading(false);
  }

  async function generateFullVideo() {
    if (!prompt && !activeNiche) return;
    setLoading(true); setResult("");
    const topic = prompt || activeNiche;
    addLog(`🎬 Generating FULL video package for: ${topic}`);
    try {
      const [scriptRes, hashRes, descRes, thumbRes] = await Promise.all([
        fetch("/api/youtube-automation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "script", niche: topic }) }),
        fetch("/api/youtube-automation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "hashtags", niche: topic }) }),
        fetch("/api/youtube-automation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "description", niche: topic }) }),
        fetch("/api/youtube-automation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "thumbnail-prompt", niche: topic }) }),
      ]);
      const [script, hash, desc, thumb] = await Promise.all([scriptRes.json(), hashRes.json(), descRes.json(), thumbRes.json()]);
      
      setResult(`📝 SCRIPTS:\n${script.result}\n\n#️⃣ HASHTAGS:\n${hash.result}\n\n📝 DESCRIPTION:\n${desc.result}\n\n🖼️ THUMBNAIL:\n${thumb.result}`);
      addLog("✅ Full video package ready!");
      addLog("📝 Script + #️⃣ Hashtags + 📝 SEO + 🖼️ Thumbnail");
    } catch { addLog("❌ Failed"); }
    setLoading(false);
  }

  async function generateShorts() {
    if (!activeNiche) { addLog("❌ Select a niche!"); return; }
    setLoading(true);
    addLog(`⚡ Generating 5 VIRAL Shorts for: ${activeNiche}`);
    try {
      const res = await fetch("/api/youtube-automation", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "script", niche: `${activeNiche} viral shorts ideas` }),
      });
      const data = await res.json();
      setResult(data.result || "No response");
      addLog("✅ 5 Shorts scripts generated!");
    } catch { addLog("❌ Failed"); }
    setLoading(false);
  }

  async function generateLongVideo() {
    if (!activeNiche) { addLog("❌ Select a niche!"); return; }
    setLoading(true);
    addLog(`🎥 Generating 10-min video script: ${activeNiche}`);
    try {
      const res = await fetch("/api/youtube-automation", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "script", niche: `${activeNiche} long form 10 minute video with chapters` }),
      });
      const data = await res.json();
      setResult(data.result || "No response");
      addLog("✅ Long video script with chapters!");
    } catch { addLog("❌ Failed"); }
    setLoading(false);
  }

  async function competitorSpy() {
    if (!activeNiche) { addLog("❌ Select a niche!"); return; }
    setLoading(true);
    addLog(`🔍 Spying on competitors: ${activeNiche}`);
    try {
      const res = await fetch("/api/youtube-automation", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "competitor-analysis", niche: activeNiche }),
      });
      const data = await res.json();
      setResult(data.result || "No response");
      addLog("✅ Competitor secrets revealed!");
    } catch { addLog("❌ Failed"); }
    setLoading(false);
  }

  async function growthHack() {
    if (!activeNiche) { addLog("❌ Select a niche!"); return; }
    setLoading(true);
    addLog(`📈 Creating growth strategy: ${activeNiche}`);
    try {
      const res = await fetch("/api/youtube-automation", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "growth-strategy", niche: activeNiche }),
      });
      const data = await res.json();
      setResult(data.result || "No response");
      addLog("✅ 90-day domination plan ready!");
    } catch { addLog("❌ Failed"); }
    setLoading(false);
  }

  async function viralPredictor() {
    if (!activeNiche) { addLog("❌ Select a niche!"); return; }
    setLoading(true);
    addLog(`🔮 Predicting viral trends: ${activeNiche}`);
    try {
      const res = await fetch("/api/youtube-automation", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "viral-prediction", niche: activeNiche }),
      });
      const data = await res.json();
      setResult(data.result || "No response");
      addLog("✅ 30-day viral forecast ready!");
    } catch { addLog("❌ Failed"); }
    setLoading(false);
  }

  async function channelAudit() {
    if (!activeNiche) { addLog("❌ Select a niche!"); return; }
    setLoading(true);
    addLog(`📊 Auditing channel: ${activeNiche}`);
    try {
      const res = await fetch("/api/youtube-automation", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "channel-analysis", channelName: activeNiche }),
      });
      const data = await res.json();
      setResult(data.result || "No response");
      addLog("✅ Channel audit complete!");
    } catch { addLog("❌ Failed"); }
    setLoading(false);
  }

  async function affiliateOptimizer() {
    if (!activeNiche) { addLog("❌ Select a niche!"); return; }
    setLoading(true);
    addLog(`💰 Optimizing affiliate strategy: ${activeNiche}`);
    try {
      const res = await fetch("/api/youtube-automation", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "affiliate-strategy", niche: activeNiche }),
      });
      const data = await res.json();
      setResult(data.result || "No response");
      addLog("✅ Affiliate revenue plan ready!");
    } catch { addLog("❌ Failed"); }
    setLoading(false);
  }

  async function autoPromote() {
    if (!activeNiche) { addLog("❌ Select a niche!"); return; }
    setLoading(true);
    addLog(`🌐 Auto-promoting website for: ${activeNiche}`);
    try {
      const res = await fetch("/api/youtube-automation", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "auto-promote-website", niche: activeNiche, websiteName: activeNiche + " Hub", websiteUrl: "https://" + activeNiche.replace(/\s+/g, "-").toLowerCase() + ".com" }),
      });
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
      addLog("✅ Website promotion plan ready!");
      addLog("🎯 100K+ views/month target set");
    } catch { addLog("❌ Failed"); }
    setLoading(false);
  }

  async function fullAutomation() {
    if (!activeNiche) { addLog("❌ Select a niche!"); return; }
    setLoading(true);
    addLog(`🤖 Activating FULL 2070 AUTOMATION for: ${activeNiche}`);
    try {
      const res = await fetch("/api/youtube-automation", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "full-channel-automation", niche: activeNiche }),
      });
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
      addLog("✅ 2070 Automation activated!");
      addLog("📅 1 Short/day + 3 Long/week scheduled");
      addLog("💰 $5K/month revenue target by Month 6");
    } catch { addLog("❌ Failed"); }
    setLoading(false);
  }

  // ========== UI ==========

  const tabs = [
    { id: "dashboard", icon: "🏠", label: "Dashboard" },
    { id: "shorts", icon: "⚡", label: "Shorts" },
    { id: "long", icon: "🎥", label: "Long Videos" },
    { id: "growth", icon: "📈", label: "Growth" },
    { id: "competitors", icon: "👥", label: "Spy" },
    { id: "revenue", icon: "💰", label: "Revenue" },
    { id: "automation", icon: "🤖", label: "Auto-Pilot" },
  ];

  return (
    <main style={{ background: "linear-gradient(135deg, #000000, #0a0a1a, #000033)", minHeight: "100vh", color: "white", padding: "20px", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: "1500px", margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1 style={{
            fontSize: "clamp(28px, 5vw, 56px)", fontWeight: "bold",
            background: "linear-gradient(to right, #ff0000, #ff6600, #ff00ff, #00aaff)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: "6px",
          }}>
            🎬 YOUTUBE AI 2070
          </h1>
          <p style={{ color: "#888", fontSize: "14px" }}>
            Neural Engine • Viral Predictor • Auto-Pilot • 50+ Templates • Competitor Spy • Revenue AI
          </p>
        </div>

        {/* STATS BAR */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "8px", marginBottom: "20px" }}>
          {[
            { label: "🤖 AI", val: "ONLINE", color: "#00ff88" },
            { label: "⚡ Shorts", val: "50+", color: "#ff6600" },
            { label: "🎥 Long", val: "20+", color: "#00aaff" },
            { label: "🎙️ Voice", val: "40 lang", color: "#ff00ff" },
            { label: "🖼️ Thumb", val: "99% CTR", color: "#ffcc00" },
            { label: "#️⃣ Tags", val: "Viral DB", color: "#00bcd4" },
            { label: "📊 Analytics", val: "LIVE", color: "#4caf50" },
            { label: "👥 Spy", val: "1K+ ch", color: "#e91e63" },
            { label: "💰 Revenue", val: "Auto", color: "#ff9800" },
            { label: "🧠 Learn", val: "Active", color: "#7c4dff" },
          ].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.05)", padding: "8px", borderRadius: "10px", textAlign: "center", border: "1px solid rgba(255,255,255,0.1)" }}>
              <p style={{ fontSize: "10px", color: "#888" }}>{s.label}</p>
              <p style={{ fontSize: "13px", fontWeight: "bold", color: s.color }}>{s.val}</p>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap", overflowX: "auto" }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "10px 18px", borderRadius: "10px", border: "none",
                background: activeTab === tab.id ? "linear-gradient(135deg, #ff0000, #ff6600)" : "rgba(255,255,255,0.1)",
                color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "13px", whiteSpace: "nowrap",
              }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* NICHE INPUT + QUICK ACTIONS */}
        <div style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "16px", marginBottom: "20px", border: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "12px" }}>
            <input
              value={prompt}
              onChange={(e) => { setPrompt(e.target.value); setActiveNiche(e.target.value); }}
              placeholder="🎯 Enter niche or topic (e.g., AI Tools, Gaming, Movie Reviews)..."
              style={{ flex: 1, minWidth: "250px", padding: "14px", borderRadius: "12px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", color: "white", fontSize: "15px" }}
            />
            <button onClick={generateScript} disabled={loading}
              style={btnStyle("linear-gradient(135deg, #00ff88, #00aaff)")}>
              {loading ? "⏳" : "📝 Script"}
            </button>
            <button onClick={generateFullVideo} disabled={loading}
              style={btnStyle("linear-gradient(135deg, #ff0000, #ff6600)")}>
              {loading ? "⏳" : "🎬 Full Video"}
            </button>
          </div>
          
          {/* QUICK NICHE BUTTONS */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {niches.slice(0, 8).map((n, i) => (
              <button key={i} onClick={() => { setActiveNiche(n.name); setPrompt(n.prompt); }}
                style={{ padding: "6px 12px", borderRadius: "20px", background: activeNiche === n.name ? "#ff0000" : "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", cursor: "pointer", fontSize: "11px" }}>
                {n.emoji} {n.name}
              </button>
            ))}
          </div>
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <>
            {/* CHANNELS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "24px" }}>
              {channels.map((ch, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}
                  onClick={() => { setActiveNiche(ch.niche); setPrompt(ch.niche); }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <h3 style={{ fontSize: "18px" }}>{ch.name}</h3>
                    <span style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "10px", background: ch.status === "Viral" ? "#ff000033" : "#00ff8833", color: ch.status === "Viral" ? "#ff0000" : "#00ff88" }}>
                      🟢 {ch.status}
                    </span>
                  </div>
                  <p style={{ color: "#888", fontSize: "13px" }}>👥 {ch.subscribers.toLocaleString()} subs</p>
                  <p style={{ color: "#4caf50", fontSize: "13px" }}>💰 ${ch.revenue}/mo</p>
                  <button style={{ marginTop: "10px", padding: "8px 16px", borderRadius: "8px", background: "#ff0000", border: "none", color: "white", fontWeight: "bold", cursor: "pointer", width: "100%" }}>
                    🚀 Generate Content
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* SHORTS TAB */}
        {activeTab === "shorts" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px", marginBottom: "20px" }}>
            {[
              { icon: "⚡", label: "5 Viral Scripts", action: generateShorts, color: "#ff6600" },
              { icon: "#️⃣", label: "Viral Hashtags", action: () => runAction("hashtags"), color: "#00bcd4" },
              { icon: "🎵", label: "Trending Music", action: () => runAction("music-suggestions"), color: "#ff00ff" },
              { icon: "🖼️", label: "Thumbnail Ideas", action: () => runAction("thumbnail-prompt"), color: "#ffcc00" },
              { icon: "📝", label: "SEO Description", action: () => runAction("description"), color: "#4caf50" },
              { icon: "🎙️", label: "Voice Setup", action: () => runAction("voice"), color: "#7c4dff" },
              { icon: "📅", label: "Best Time", action: () => runAction("best-upload-time"), color: "#e91e63" },
              { icon: "🎬", label: "Full Package", action: generateFullVideo, color: "#ff0000" },
            ].map((btn, i) => (
              <button key={i} onClick={btn.action} disabled={loading}
                style={{ padding: "16px", borderRadius: "12px", background: btn.color, border: "none", color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "15px" }}>
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>
        )}

        {/* LONG VIDEOS TAB */}
        {activeTab === "long" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px", marginBottom: "20px" }}>
            {[
              { icon: "🎥", label: "10-Min Script", action: generateLongVideo, color: "#00aaff" },
              { icon: "📋", label: "Chapters Plan", action: () => runAction("script", "long form with chapters"), color: "#7c4dff" },
              { icon: "🎬", label: "Cinematic Hook", action: () => runAction("script", "cinematic opening hook"), color: "#ff0000" },
              { icon: "📊", label: "Case Study", action: () => runAction("script", "case study format"), color: "#4caf50" },
              { icon: "🎙️", label: "Interview Qs", action: () => runAction("script", "interview questions"), color: "#ff9800" },
              { icon: "📚", label: "Tutorial", action: () => runAction("script", "step by step tutorial"), color: "#00bcd4" },
            ].map((btn, i) => (
              <button key={i} onClick={btn.action} disabled={loading}
                style={{ padding: "16px", borderRadius: "12px", background: btn.color, border: "none", color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "15px" }}>
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>
        )}

        {/* GROWTH TAB */}
        {activeTab === "growth" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px", marginBottom: "20px" }}>
            {[
              { icon: "📈", label: "Growth Strategy", action: growthHack, color: "#4caf50" },
              { icon: "🔮", label: "Viral Predictor", action: viralPredictor, color: "#7c4dff" },
              { icon: "📊", label: "Channel Audit", action: channelAudit, color: "#ff9800" },
              { icon: "🎯", label: "SEO Optimize", action: () => runAction("seo-optimization"), color: "#00bcd4" },
              { icon: "📅", label: "Content Calendar", action: () => runAction("video-ideas"), color: "#e91e63" },
              { icon: "🌐", label: "Website Promo", action: autoPromote, color: "#ff0000" },
            ].map((btn, i) => (
              <button key={i} onClick={btn.action} disabled={loading}
                style={{ padding: "16px", borderRadius: "12px", background: btn.color, border: "none", color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "15px" }}>
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>
        )}

        {/* COMPETITORS TAB */}
        {activeTab === "competitors" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px", marginBottom: "20px" }}>
            {[
              { icon: "👥", label: "Spy Competitors", action: competitorSpy, color: "#e91e63" },
              { icon: "🔍", label: "Reverse Engineer", action: competitorSpy, color: "#ff0000" },
              { icon: "📊", label: "Content Gaps", action: competitorSpy, color: "#ff9800" },
              { icon: "🎯", label: "Beat Them Plan", action: competitorSpy, color: "#4caf50" },
            ].map((btn, i) => (
              <button key={i} onClick={btn.action} disabled={loading}
                style={{ padding: "16px", borderRadius: "12px", background: btn.color, border: "none", color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "15px" }}>
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>
        )}

        {/* REVENUE TAB */}
        {activeTab === "revenue" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px", marginBottom: "20px" }}>
            {[
              { icon: "💰", label: "Affiliate Plan", action: affiliateOptimizer, color: "#4caf50" },
              { icon: "💵", label: "AdSense Opt", action: () => runAction("affiliate-strategy"), color: "#ff9800" },
              { icon: "🤝", label: "Sponsorships", action: () => runAction("affiliate-strategy"), color: "#00bcd4" },
              { icon: "🛒", label: "Products", action: () => runAction("affiliate-strategy"), color: "#7c4dff" },
            ].map((btn, i) => (
              <button key={i} onClick={btn.action} disabled={loading}
                style={{ padding: "16px", borderRadius: "12px", background: btn.color, border: "none", color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "15px" }}>
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>
        )}

        {/* AUTOMATION TAB */}
        {activeTab === "automation" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px", marginBottom: "20px" }}>
            {[
              { icon: "🤖", label: "Full Auto-Pilot", action: fullAutomation, color: "#ff0000" },
              { icon: "🌐", label: "Auto-Promote Site", action: autoPromote, color: "#7c4dff" },
              { icon: "📅", label: "Auto-Schedule", action: fullAutomation, color: "#4caf50" },
              { icon: "🧠", label: "Self-Learning", action: fullAutomation, color: "#ff9800" },
            ].map((btn, i) => (
              <button key={i} onClick={btn.action} disabled={loading}
                style={{ padding: "16px", borderRadius: "12px", background: btn.color, border: "none", color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "15px" }}>
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>
        )}

        {/* RESULT PANEL */}
        {result && (
          <div style={{ background: "rgba(0,255,136,0.1)", padding: "20px", borderRadius: "16px", border: "1px solid #00ff88", marginBottom: "20px", maxHeight: "500px", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <h3 style={{ color: "#00ff88" }}>✅ AI OUTPUT</h3>
              <button onClick={() => navigator.clipboard.writeText(result)}
                style={{ padding: "6px 14px", borderRadius: "8px", background: "#00ff88", border: "none", color: "#000", fontWeight: "bold", cursor: "pointer" }}>
                📋 Copy
              </button>
            </div>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: "13px", lineHeight: "1.6", color: "#e2e8f0" }}>{result}</pre>
          </div>
        )}

        {/* SYSTEM LOGS */}
        <div style={{ background: "rgba(0,0,0,0.5)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", maxHeight: "300px", overflowY: "auto" }}>
          <h4 style={{ marginBottom: "10px", color: "#888" }}>📡 NEURAL LOG STREAM</h4>
          {logs.map((log, i) => (
            <p key={i} style={{
              fontSize: "11px", fontFamily: "monospace", margin: "2px 0",
              color: log.includes("✅") ? "#22c55e" : log.includes("❌") ? "#ef4444" : log.includes("🤖") ? "#a855f7" : log.includes("🎬") ? "#ff6600" : "#64748b",
              borderLeft: `3px solid ${log.includes("✅") ? "#22c55e" : log.includes("❌") ? "#ef4444" : log.includes("🤖") ? "#a855f7" : "#38bdf8"}`,
              paddingLeft: "8px",
            }}>
              {log}
            </p>
          ))}
        </div>

      </div>
    </main>
  );

  // Helper function
  async function runAction(action: string, extra?: string) {
    if (!activeNiche) { addLog("❌ Select a niche first!"); return; }
    setLoading(true);
    const niche = extra || activeNiche;
    addLog(`🚀 Running: ${action} for ${niche}`);
    try {
      const res = await fetch("/api/youtube-automation", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, niche }),
      });
      const data = await res.json();
      setResult(data.result || JSON.stringify(data, null, 2));
      addLog(`✅ ${action} completed!`);
    } catch { addLog(`❌ ${action} failed`); }
    setLoading(false);
  }
}

function btnStyle(gradient: string): React.CSSProperties {
  return {
    padding: "14px 24px", borderRadius: "12px", background: gradient,
    border: "none", color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "14px",
  };
}
