"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function WebsiteBuilderPage() {
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [websiteCode, setWebsiteCode] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [generatedPages, setGeneratedPages] = useState<Record<string, string>>({});
  const [activePage, setActivePage] = useState("index");
  const [log, setLog] = useState<string[]>([]);
  const [projectCount, setProjectCount] = useState(0);
  const [activeTab, setActiveTab] = useState("builder");

  useEffect(() => { loadProjectCount(); }, []);

  async function loadProjectCount() {
    try {
      const res = await fetch("/api/website-projects");
      const data = await res.json();
      if (data.success) setProjectCount(data.projects?.length || 0);
    } catch {}
  }

  function addLog(msg: string) {
    setLog(prev => [`🏗️ ${new Date().toLocaleTimeString()} — ${msg}`, ...prev.slice(0, 99)]);
  }

  // ========== ALL BUILD FUNCTIONS ==========

  async function buildWebsite() {
    if (!niche) return;
    setLoading(true); setWebsiteCode(""); setGeneratedPages({});
    addLog(`🚀 Building website: ${niche}`);
    try {
      const res = await fetch("/api/website-empire", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "build-site", niche }),
      });
      const data = await res.json();
      if (data.success && data.website) {
        setWebsiteCode(data.website);
        addLog(`✅ Generated! Size: ${(data.website.length/1024).toFixed(1)} KB`);
        await saveToCloud(data.website, "Basic Website");
      } else { addLog(`❌ ${data.error || "Failed"}`); }
    } catch (err: any) { addLog(`❌ ${err.message}`); }
    setLoading(false);
  }

  async function buildMoneySite() {
    if (!niche) return;
    setLoading(true); setWebsiteCode("");
    addLog(`💰 Building MONEY site: ${niche}`);
    try {
      const res = await fetch("/api/website-empire/build-money-site", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche }),
      });
      const data = await res.json();
      if (data.success && data.website) {
        setWebsiteCode(data.website);
        addLog(`✅ Money site! Size: ${(data.website.length/1024).toFixed(1)} KB`);
        await saveToCloud(data.website, "💰 Money Site");
      } else { addLog(`❌ ${data.error || "Failed"}`); }
    } catch (err: any) { addLog(`❌ ${err.message}`); }
    setLoading(false);
  }

  async function buildToolSite() {
    if (!niche) return;
    setLoading(true); setWebsiteCode("");
    addLog(`🛠️ Building TOOL site: ${niche}`);
    try {
      const res = await fetch("/api/website-empire/build-tool-site", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche }),
      });
      const data = await res.json();
      if (data.success && data.website) {
        setWebsiteCode(data.website);
        addLog(`✅ Tool site! Size: ${(data.website.length/1024).toFixed(1)} KB`);
        await saveToCloud(data.website, "🛠️ Tool Site");
      } else { addLog(`❌ ${data.error || "Failed"}`); }
    } catch (err: any) { addLog(`❌ ${err.message}`); }
    setLoading(false);
  }

  async function buildEntertainmentHub() {
    if (!niche) return;
    setLoading(true); setWebsiteCode("");
    addLog(`🎬 Building Entertainment Hub`);
    try {
      const res = await fetch("/api/website-empire/build-entertainment-hub", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche }),
      });
      const data = await res.json();
      if (data.success && data.website) {
        setWebsiteCode(data.website);
        addLog(`✅ Entertainment! Size: ${(data.website.length/1024).toFixed(1)} KB`);
        await saveToCloud(data.website, "🎬 Entertainment Hub");
      } else { addLog(`❌ ${data.error || "Failed"}`); }
    } catch (err: any) { addLog(`❌ ${err.message}`); }
    setLoading(false);
  }

  async function buildModsHub() {
    if (!niche) return;
    setLoading(true); setWebsiteCode("");
    addLog(`📱 Building MODS Hub`);
    try {
      const res = await fetch("/api/website-empire/build-mods-hub", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche }),
      });
      const data = await res.json();
      if (data.success && data.website) {
        setWebsiteCode(data.website);
        addLog(`✅ Mods Hub! Size: ${(data.website.length/1024).toFixed(1)} KB`);
        await saveToCloud(data.website, "📱 Mods Hub");
      } else { addLog(`❌ ${data.error || "Failed"}`); }
    } catch (err: any) { addLog(`❌ ${err.message}`); }
    setLoading(false);
  }

  async function buildSMMPanel() {
    if (!niche) return;
    setLoading(true); setWebsiteCode("");
    addLog(`👥 Building SMM Panel`);
    try {
      const res = await fetch("/api/website-empire/build-smm-panel", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche }),
      });
      const data = await res.json();
      if (data.success && data.website) {
        setWebsiteCode(data.website);
        addLog(`✅ SMM Panel! Size: ${(data.website.length/1024).toFixed(1)} KB`);
        await saveToCloud(data.website, "👥 SMM Panel");
      } else { addLog(`❌ ${data.error || "Failed"}`); }
    } catch (err: any) { addLog(`❌ ${err.message}`); }
    setLoading(false);
  }

  async function buildMoviesHub() {
    if (!niche) return;
    setLoading(true); setWebsiteCode("");
    addLog(`🎬 Building Movies Hub`);
    try {
      const res = await fetch("/api/website-empire/build-movies-hub", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche }),
      });
      const data = await res.json();
      if (data.success && data.website) {
        setWebsiteCode(data.website);
        addLog(`✅ Movies Hub! Size: ${(data.website.length/1024).toFixed(1)} KB`);
        await saveToCloud(data.website, "🎬 Movies Hub");
      } else { addLog(`❌ ${data.error || "Failed"}`); }
    } catch (err: any) { addLog(`❌ ${err.message}`); }
    setLoading(false);
  }

  async function buildAIToolsHub() {
    if (!niche) return;
    setLoading(true); setWebsiteCode("");
    addLog(`🤖 Building AI Tools Hub`);
    try {
      const res = await fetch("/api/website-empire/build-ai-tools-hub", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche }),
      });
      const data = await res.json();
      if (data.success && data.website) {
        setWebsiteCode(data.website);
        addLog(`✅ AI Tools Hub! Size: ${(data.website.length/1024).toFixed(1)} KB`);
        await saveToCloud(data.website, "🤖 AI Tools Hub");
      } else { addLog(`❌ ${data.error || "Failed"}`); }
    } catch (err: any) { addLog(`❌ ${err.message}`); }
    setLoading(false);
  }

  async function saveToCloud(code: string, type: string) {
    try {
      await fetch("/api/website-projects", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Date.now(), niche: `${niche} (${type})`, websiteCode: code, pages: {} }),
      });
      addLog("☁️ Saved to cloud!");
      loadProjectCount();
    } catch { addLog("⚠️ Cloud save skipped"); }
  }

  function downloadWebsite() {
    const blob = new Blob([websiteCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${niche.replace(/\s+/g, "-")}-website.html`; a.click();
    addLog("📥 Downloaded!");
  }

  async function saveToSupabase() {
    addLog("💾 Saving...");
    await saveToCloud(websiteCode, "Manual Save");
  }

  // ========== UI ==========

  const buildButtons = [
    { label: "🚀 BUILD", onClick: buildWebsite, gradient: "#00ff88, #00aaff" },
    { label: "💰 MONEY", onClick: buildMoneySite, gradient: "#f59e0b, #ef4444" },
    { label: "🛠️ TOOLS", onClick: buildToolSite, gradient: "#8b5cf6, #ec4899" },
    { label: "🎬 ENTER", onClick: buildEntertainmentHub, gradient: "#ff0000, #ff6600" },
    { label: "📱 MODS", onClick: buildModsHub, gradient: "#00c853, #76ff03" },
    { label: "👥 SMM", onClick: buildSMMPanel, gradient: "#e91e63, #9c27b0" },
    { label: "🎬 MOVIES", onClick: buildMoviesHub, gradient: "#e50914, #b20710" },
    { label: "🤖 AI", onClick: buildAIToolsHub, gradient: "#00bcd4, #7c4dff" },
  ];

  return (
    <main style={{ background: "linear-gradient(135deg, #0a0a0a, #0a0a2e)", minHeight: "100vh", color: "white", padding: "24px", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

        {/* NAVIGATION */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
          <Link href="/website-empire"><button style={navBtnStyle}>🧠 Strategy</button></Link>
          <button style={{ ...navBtnStyle, background: "#00ff88", color: "#000", fontWeight: "bold" }}>🏗️ Builder</button>
          <Link href="/website-empire/projects"><button style={navBtnStyle}>📁 Projects ({projectCount})</button></Link>
        </div>

        <h1 style={{ fontSize: "32px", marginBottom: "4px" }}>🏗️ AI Website Empire Builder</h1>
        <p style={{ color: "#888", marginBottom: "24px" }}>AI autonomously builds, publishes, and manages your website empire</p>

        {/* AI STATUS BAR */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px", marginBottom: "24px" }}>
          {[
            { label: "🧠 AI Engine", value: "Gemini + Groq + 4 more" },
            { label: "📊 Sites Built", value: String(projectCount) },
            { label: "☁️ Storage", value: "Supabase Cloud" },
            { label: "💰 Revenue Model", value: "AdSense + Affiliate" },
            { label: "🚀 Deploy", value: "Vercel Ready" },
            { label: "📈 Analytics", value: "Auto-Integrated" },
          ].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.05)", padding: "12px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
              <p style={{ fontSize: "11px", color: "#64748b", marginBottom: "4px" }}>{s.label}</p>
              <p style={{ fontSize: "14px", fontWeight: "bold", color: "#00ff88" }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* INPUT + BUILD BUTTONS */}
        <div style={{ background: "rgba(255,255,255,0.05)", padding: "24px", borderRadius: "16px", marginBottom: "24px" }}>
          <input value={niche} onChange={(e) => setNiche(e.target.value)}
            placeholder="🎯 Enter niche (e.g., AI Tools, Gaming, Movies, Fitness)..."
            style={{ width: "100%", padding: "14px 18px", borderRadius: "12px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", color: "white", fontSize: "15px", marginBottom: "16px", boxSizing: "border-box" }}
          />

          {/* BUILD BUTTONS GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "8px", marginBottom: "16px" }}>
            {buildButtons.map((btn, i) => (
              <button key={i} onClick={btn.onClick} disabled={loading || !niche}
                style={{ padding: "12px", borderRadius: "10px", background: loading ? "#333" : `linear-gradient(135deg, ${btn.gradient})`, border: "none", color: i === 5 ? "white" : i === 4 ? "#000" : "white", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", fontSize: "13px" }}>
                {loading ? "⏳" : btn.label}
              </button>
            ))}
          </div>

          {/* ACTION BUTTONS */}
          {websiteCode && (
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button onClick={() => setPreviewMode(!previewMode)} style={{ padding: "10px 18px", borderRadius: "10px", background: previewMode ? "#00ff88" : "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: previewMode ? "#000" : "white", cursor: "pointer" }}>
                {previewMode ? "📝 Code" : "👁️ Preview"}
              </button>
              <button onClick={downloadWebsite} style={{ padding: "10px 18px", borderRadius: "10px", background: "#f59e0b", border: "none", color: "#000", fontWeight: "bold", cursor: "pointer" }}>
                📥 Download
              </button>
              <button onClick={saveToSupabase} style={{ padding: "10px 18px", borderRadius: "10px", background: "#8b5cf6", border: "none", color: "white", fontWeight: "bold", cursor: "pointer" }}>
                ☁️ Save
              </button>
            </div>
          )}
        </div>

        {/* PREVIEW / CODE */}
        {websiteCode && (
          <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", marginBottom: "24px" }}>
            {previewMode ? (
              <iframe srcDoc={websiteCode} style={{ width: "100%", height: "80vh", border: "none", background: "white" }} title="Preview" />
            ) : (
              <div style={{ background: "#1a1a2e", padding: "20px", maxHeight: "80vh", overflow: "auto" }}>
                <pre style={{ whiteSpace: "pre-wrap", fontSize: "12px", lineHeight: "1.5", color: "#00ff88", fontFamily: "monospace" }}>
                  {websiteCode.slice(0, 15000)}
                  {websiteCode.length > 15000 && "\n\n... (Download for full code)"}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* LOGS */}
        {log.length > 0 && (
          <div style={{ background: "rgba(0,0,0,0.5)", padding: "16px", borderRadius: "12px" }}>
            <h4 style={{ marginBottom: "8px" }}>📡 AI System Log</h4>
            {log.map((entry, i) => (
              <p key={i} style={{ fontSize: "12px", color: "#888", fontFamily: "monospace", margin: "2px 0" }}>{entry}</p>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

const navBtnStyle: React.CSSProperties = {
  padding: "10px 20px", borderRadius: "10px",
  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
  color: "white", cursor: "pointer",
};
