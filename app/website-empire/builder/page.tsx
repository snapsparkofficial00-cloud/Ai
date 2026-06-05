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

  useEffect(() => {
    loadProjectCount();
  }, []);

  async function loadProjectCount() {
    try {
      const res = await fetch("/api/website-projects");
      const data = await res.json();
      if (data.success) setProjectCount(data.projects?.length || 0);
    } catch {}
  }

  function addLog(msg: string) {
    setLog(prev => [`🏗️ ${new Date().toLocaleTimeString()} — ${msg}`, ...prev.slice(0, 49)]);
  }

  async function buildWebsite() {
    if (!niche) return;
    setLoading(true);
    setWebsiteCode("");
    setGeneratedPages({});
    addLog(`🚀 Building website for: ${niche}`);

    try {
      addLog("🤖 AI generating website...");
      const res = await fetch("/api/website-empire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "build-site", niche }),
      });

      if (!res.ok) {
        const text = await res.text();
        addLog(`❌ Server error: ${res.status}`);
        console.error("Response:", text.slice(0, 500));
        setLoading(false);
        return;
      }

      let data;
      try {
        const text = await res.text();
        data = JSON.parse(text);
      } catch (parseErr) {
        addLog(`❌ JSON Parse Error`);
        setLoading(false);
        return;
      }

      if (data.success && data.website) {
        setWebsiteCode(data.website);
        addLog("✅ Website generated successfully!");
        addLog(`📏 Size: ${(data.website.length / 1024).toFixed(1)} KB`);

        addLog("📄 Generating additional pages...");
        const pagesRes = await fetch("/api/website-empire", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "generate-pages", niche }),
        });
        const pagesData = await pagesRes.json();

        if (pagesData.success) {
          setGeneratedPages(pagesData.pages);
          addLog(`✅ ${pagesData.pageCount} pages generated!`);
        }

        addLog("💾 Saving to cloud...");
        try {
          await fetch("/api/website-projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: Date.now(),
              niche,
              websiteCode: data.website,
              pages: pagesData.pages || {},
            }),
          });
          addLog("✅ Saved to Supabase!");
          loadProjectCount();
        } catch {
          addLog("⚠️ Cloud save skipped");
        }

        addLog("🎉 Build complete! Go to Projects to see all.");
      } else {
        addLog(`❌ Failed: ${data.error || "Unknown error"}`);
        if (data.details) addLog(`Details: ${data.details.slice(0, 200)}`);
      }
    } catch (err: any) {
      addLog(`❌ Error: ${err.message || String(err)}`);
    }
    setLoading(false);
  }

  async function buildMoneySite() {
    if (!niche) return;
    setLoading(true);
    setWebsiteCode("");
    setGeneratedPages({});
    addLog(`💰 Building MONEY site for: ${niche}`);

    try {
      const res = await fetch("/api/website-empire/build-money-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche }),
      });

      const data = await res.json();

      if (data.success && data.website) {
        setWebsiteCode(data.website);
        addLog("✅ Money site generated!");
        addLog("📊 Includes: AdSense, Affiliate, Email Capture, SEO, Social Share");
        addLog("📏 Size: " + (data.website.length / 1024).toFixed(1) + " KB");
        addLog("💡 Deploy this site to start earning!");

        try {
          await fetch("/api/website-projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: Date.now(),
              niche: niche + " (💰 Money Site)",
              websiteCode: data.website,
              pages: {},
            }),
          });
          addLog("✅ Saved to cloud!");
          loadProjectCount();
        } catch {}
      } else {
        addLog("❌ Failed: " + (data.error || "Unknown error"));
      }
    } catch (err: any) {
      addLog("❌ Error: " + (err.message || String(err)));
    }
    setLoading(false);
  }

  async function buildToolSite() {
    if (!niche) return;
    setLoading(true);
    setWebsiteCode("");
    setGeneratedPages({});
    addLog(`🛠️ Building TOOL-RICH site for: ${niche}`);

    try {
      const res = await fetch("/api/website-empire/build-tool-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche }),
      });

      const data = await res.json();

      if (data.success && data.website) {
        setWebsiteCode(data.website);
        addLog("✅ Tool-rich website generated!");
        addLog("📏 Size: " + (data.website.length / 1024).toFixed(1) + " KB");
        addLog("🛠️ Includes: Calculators, Games, AI Tools, Widgets, Dashboard");
        addLog("💡 People will STAY and USE these tools daily!");

        try {
          await fetch("/api/website-projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: Date.now(),
              niche: niche + " (🛠️ Tool Site)",
              websiteCode: data.website,
              pages: {},
            }),
          });
          addLog("✅ Saved to cloud!");
          loadProjectCount();
        } catch {}
      } else {
        addLog("❌ Failed: " + (data.error || "Unknown"));
      }
    } catch (err: any) {
      addLog("❌ Error: " + (err.message || String(err)));
    }
    setLoading(false);
  }

  async function saveToSupabase() {
    try {
      addLog("💾 Saving to cloud database...");
      const res = await fetch("/api/website-projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now(),
          niche,
          websiteCode,
          pages: generatedPages,
        }),
      });
      const data = await res.json();
      if (data.success) {
        addLog("✅ Saved to Supabase cloud!");
        loadProjectCount();
        return true;
      }
    } catch (err) {
      addLog(`❌ Save failed: ${String(err)}`);
    }
    return false;
  }

  function downloadWebsite() {
    let allCode = websiteCode;
    Object.entries(generatedPages).forEach(([name, code]) => {
      if (name !== "index") {
        allCode += `\n\n<!-- ${name.toUpperCase()} PAGE -->\n${code}`;
      }
    });
    const blob = new Blob([allCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${niche.replace(/\s+/g, "-")}-website.html`;
    a.click();
    addLog("📥 Downloaded! Upload to Vercel/Netlify to deploy.");
  }

  return (
    <main style={{
      background: "linear-gradient(135deg, #0a0a0a, #0a0a2e)",
      minHeight: "100vh", color: "white", padding: "24px", fontFamily: "system-ui",
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

        {/* NAVIGATION */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
          <Link href="/website-empire" style={{ textDecoration: "none" }}>
            <button style={{
              padding: "10px 20px", borderRadius: "10px",
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
              color: "white", cursor: "pointer",
            }}>🧠 Strategy</button>
          </Link>
          <button style={{
            padding: "10px 20px", borderRadius: "10px",
            background: "#00ff88", border: "none",
            color: "#000", fontWeight: "bold",
          }}>🏗️ Builder</button>
          <Link href="/website-empire/projects" style={{ textDecoration: "none" }}>
            <button style={{
              padding: "10px 20px", borderRadius: "10px",
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
              color: "white", cursor: "pointer",
            }}>📁 Projects ({projectCount})</button>
          </Link>
        </div>

        <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>🏗️ Website Builder</h1>
        <p style={{ color: "#888", marginBottom: "24px" }}>Build REAL websites with AI — Saved to Cloud ☁️</p>

        {/* BUILD CONTROLS */}
        <div style={{
          background: "rgba(255,255,255,0.05)", padding: "24px",
          borderRadius: "16px", marginBottom: "24px",
          display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center",
        }}>
          <input
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="🎯 Enter niche (e.g., Fitness, AI Tools, Real Estate)..."
            style={{
              flex: 1, minWidth: "250px", padding: "14px 18px", borderRadius: "12px",
              background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)",
              color: "white", fontSize: "15px",
            }}
          />
          
          {/* BUTTONS ROW */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button onClick={buildWebsite} disabled={loading || !niche}
              style={{
                padding: "14px 20px", borderRadius: "12px",
                background: loading ? "#333" : "linear-gradient(135deg, #00ff88, #00aaff)",
                border: "none", color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "14px",
              }}>
              {loading ? "⏳..." : "🚀 BUILD"}
            </button>
            
            <button onClick={buildMoneySite} disabled={loading || !niche}
              style={{
                padding: "14px 20px", borderRadius: "12px",
                background: loading ? "#333" : "linear-gradient(135deg, #f59e0b, #ef4444)",
                border: "none", color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "14px",
              }}>
              {loading ? "⏳..." : "💰 MONEY SITE"}
            </button>
            
            <button onClick={buildToolSite} disabled={loading || !niche}
              style={{
                padding: "14px 20px", borderRadius: "12px",
                background: loading ? "#333" : "linear-gradient(135deg, #8b5cf6, #ec4899)",
                border: "none", color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "14px",
              }}>
              {loading ? "⏳..." : "🛠️ TOOL SITE"}
            </button>
          </div>
          
          {websiteCode && (
            <>
              <button onClick={() => setPreviewMode(!previewMode)}
                style={{
                  padding: "14px 20px", borderRadius: "12px",
                  background: previewMode ? "#00ff88" : "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: previewMode ? "#000" : "white", cursor: "pointer", fontSize: "14px",
                }}>
                {previewMode ? "📝 Code" : "👁️ Preview"}
              </button>
              <button onClick={downloadWebsite}
                style={{
                  padding: "14px 20px", borderRadius: "12px",
                  background: "#f59e0b", border: "none",
                  color: "#000", fontWeight: "bold", cursor: "pointer", fontSize: "14px",
                }}>
                📥 Download
              </button>
              <button onClick={saveToSupabase}
                style={{
                  padding: "14px 20px", borderRadius: "12px",
                  background: "#8b5cf6", border: "none",
                  color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "14px",
                }}>
                ☁️ Save
              </button>
            </>
          )}
        </div>

        {/* PAGE TABS */}
        {Object.keys(generatedPages).length > 0 && (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
            <button onClick={() => { setActivePage("index"); setWebsiteCode(websiteCode); }} style={{
              padding: "8px 16px", borderRadius: "8px", textTransform: "capitalize",
              background: activePage === "index" ? "#00ff88" : "rgba(255,255,255,0.1)",
              border: "none", color: activePage === "index" ? "#000" : "white",
              cursor: "pointer", fontWeight: "bold",
            }}>🏠 Home</button>
            {Object.keys(generatedPages).map((page) => (
              <button key={page} onClick={() => { setActivePage(page); setWebsiteCode(generatedPages[page]); }}
                style={{
                  padding: "8px 16px", borderRadius: "8px", textTransform: "capitalize",
                  background: activePage === page ? "#00ff88" : "rgba(255,255,255,0.1)",
                  border: "none", color: activePage === page ? "#000" : "white",
                  cursor: "pointer", fontWeight: "bold",
                }}>
                📄 {page}
              </button>
            ))}
          </div>
        )}

        {/* PREVIEW / CODE */}
        {websiteCode && (
          <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
            {previewMode ? (
              <iframe srcDoc={websiteCode} style={{ width: "100%", height: "80vh", border: "none", background: "white" }} title="Website Preview" />
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
          <div style={{ background: "rgba(0,0,0,0.5)", padding: "16px", borderRadius: "12px", marginTop: "24px" }}>
            <h4 style={{ marginBottom: "8px" }}>📡 Build Log</h4>
            {log.map((entry, i) => (
              <p key={i} style={{ fontSize: "12px", color: "#888", fontFamily: "monospace", margin: "2px 0" }}>{entry}</p>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
