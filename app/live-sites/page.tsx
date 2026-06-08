"use client";
import { useState, useEffect } from "react";

export default function LiveSitesPage() {
  const [sites, setSites] = useState<any[]>([]);
  const [activeSite, setActiveSite] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"grid" | "live">("grid");

  useEffect(() => {
    loadSites();
  }, []);

  async function loadSites() {
    try {
      const res = await fetch("/api/get-results");
      const data = await res.json();
      if (data.success) setSites(data.results || []);
    } catch {}
  }

  // ⭐ AUTO DEPLOY FUNCTION
  async function deploySite(site: any) {
    const confirmed = confirm(`Deploy "${site.niche}" to a live URL?`);
    if (!confirmed) return;
    
    try {
      const res = await fetch("/api/auto-deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "deploy-to-vercel", 
          html: site.content || site.website_code, 
          niche: site.niche 
        }),
      });
      const data = await res.json();
      
      if (data.url) {
        alert(`✅ DEPLOYED!\n\nYour website is LIVE at:\n${data.url}`);
        window.open(data.url, "_blank");
      } else {
        alert(`📋 Ready to deploy!\n\n1. Download the HTML\n2. Go to vercel.com/new\n3. Drag & drop the file\n4. Your site goes LIVE!`);
      }
    } catch (err: any) {
      alert("Deploy failed: " + err.message);
    }
  }

  // ⭐ DOWNLOAD FUNCTION
  function downloadSite(site: any) {
    const html = site.content || site.website_code;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(site.niche || "website").replace(/\s+/g, "-")}.html`;
    a.click();
  }

  return (
    <main style={{ background: "#000", minHeight: "100vh", color: "white", fontFamily: "system-ui" }}>
      {/* HEADER */}
      <div style={{ background: "#111", padding: "20px", textAlign: "center", borderBottom: "2px solid #00ff88" }}>
        <h1 style={{ fontSize: "32px", margin: 0 }}>🌐 YOUR LIVE WEBSITES</h1>
        <p style={{ color: "#888", marginTop: "8px" }}>Click any website to see it LIVE — All websites built by your AI Empire</p>
        <div style={{ marginTop: "12px", display: "flex", gap: "10px", justifyContent: "center" }}>
          <button onClick={() => setViewMode("grid")} style={btnStyle(viewMode === "grid")}>📱 Grid View</button>
          <button onClick={() => setViewMode("live")} style={btnStyle(viewMode === "live")}>🖥️ Live Preview</button>
        </div>
      </div>

      {/* LIVE PREVIEW MODE */}
      {viewMode === "live" && activeSite && (
        <div style={{ height: "90vh" }}>
          <div style={{ background: "#111", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
            <span>🔴 LIVE: {activeSite.niche}</span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => downloadSite(activeSite)} style={{ background: "#f59e0b", color: "black", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>📥 Download</button>
              <button onClick={() => deploySite(activeSite)} style={{ background: "#00ff88", color: "black", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>🚀 Deploy</button>
              <button onClick={() => setActiveSite(null)} style={{ background: "red", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>✕ Close</button>
            </div>
          </div>
          <iframe srcDoc={activeSite.content || activeSite.website_code} style={{ width: "100%", height: "100%", border: "none", background: "white" }} />
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === "grid" && (
        <div style={{ padding: "24px" }}>
          {sites.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px", color: "#888" }}>
              <p style={{ fontSize: "48px" }}>📦</p>
              <p>No websites built yet. Go to AI Brain and build one!</p>
              <a href="https://huggingface.co/spaces/Snapspark/ai-brain" target="_blank" style={{ color: "#00ff88", fontSize: "18px" }}>🧠 Open AI Brain →</a>
            </div>
          )}
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "20px" }}>
            {sites.map((site, i) => (
              <div key={i} style={{ background: "#111", borderRadius: "16px", overflow: "hidden", border: "1px solid #333", transition: "transform 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                {/* Thumbnail Preview */}
                <div style={{ height: "200px", background: "#1a1a1a", overflow: "hidden", position: "relative", cursor: "pointer" }}
                  onClick={() => { setActiveSite(site); setViewMode("live"); }}>
                  <iframe srcDoc={site.content || site.website_code} style={{ width: "200%", height: "200%", transform: "scale(0.5)", transformOrigin: "top left", border: "none", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", top: 10, right: 10, background: "#00ff88", color: "black", padding: "4px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: "bold" }}>
                    LIVE
                  </div>
                </div>
                
                {/* Info */}
                <div style={{ padding: "16px" }}>
                  <h3 style={{ margin: "0 0 8px 0", color: "#00ff88" }}>🌐 {site.niche}</h3>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
                    <span style={{ background: "#1a1a1a", padding: "4px 10px", borderRadius: "6px", fontSize: "11px" }}>
                      {(site.type || "website").toUpperCase()}
                    </span>
                    <span style={{ background: "#1a1a1a", padding: "4px 10px", borderRadius: "6px", fontSize: "11px" }}>
                      📏 {site.size || (site.content || site.website_code || "").length} chars
                    </span>
                  </div>
                  <p style={{ color: "#888", fontSize: "12px", margin: 0 }}>
                    🕐 {new Date(site.created_at).toLocaleString()}
                  </p>
                  
                  {/* ⭐ 3 BUTTONS ⭐ */}
                  <div style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
                    <button onClick={() => { setActiveSite(site); setViewMode("live"); }}
                      style={{ flex: 1, padding: "10px 8px", borderRadius: "8px", background: "#00aaff", border: "none", color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                      👁️ View
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); downloadSite(site); }}
                      style={{ flex: 1, padding: "10px 8px", borderRadius: "8px", background: "#f59e0b", border: "none", color: "black", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                      📥 Download
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); deploySite(site); }}
                      style={{ flex: 1, padding: "10px 8px", borderRadius: "8px", background: "#00ff88", border: "none", color: "black", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
                      🚀 Deploy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

function btnStyle(active: boolean): React.CSSProperties {
  return {
    padding: "10px 20px",
    borderRadius: "8px",
    border: active ? "2px solid #00ff88" : "1px solid #333",
    background: active ? "#00ff8833" : "#111",
    color: active ? "#00ff88" : "#888",
    cursor: "pointer",
    fontWeight: "bold",
  };
                        }
