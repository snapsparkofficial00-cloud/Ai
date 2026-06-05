"use client";
import { useState } from "react";
import Link from "next/link";

export default function WebsiteBuilderPage() {
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [websiteCode, setWebsiteCode] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [generatedPages, setGeneratedPages] = useState<Record<string, string>>({});
  const [activePage, setActivePage] = useState("index");
  const [log, setLog] = useState<string[]>([]);
  const [savedProjects, setSavedProjects] = useState<any[]>([]);

  // Load saved projects from localStorage
  useState(() => {
    const saved = localStorage.getItem("website-projects");
    if (saved) setSavedProjects(JSON.parse(saved));
  });

  function addLog(msg: string) {
    setLog(prev => [`🏗️ ${new Date().toLocaleTimeString()} — ${msg}`, ...prev.slice(0, 49)]);
  }

  function saveProject() {
    const project = {
      id: Date.now(),
      niche,
      websiteCode,
      pages: generatedPages,
      createdAt: new Date().toISOString(),
    };
    const updated = [project, ...savedProjects];
    setSavedProjects(updated);
    localStorage.setItem("website-projects", JSON.stringify(updated));
    addLog("💾 Project saved!");
  }

  async function buildWebsite() {
    if (!niche) return;
    setLoading(true);
    setWebsiteCode("");
    setGeneratedPages({});
    addLog(`🚀 Building website for: ${niche}`);

    try {
      // Step 1: Build main website
      addLog("Generating main website...");
      const res = await fetch("/api/website-empire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "build-site", niche }),
      });
      const data = await res.json();
      
      if (data.success && data.website) {
        setWebsiteCode(data.website);
        addLog("✅ Website generated!");

        // Step 2: Generate all pages
        addLog("Generating additional pages...");
        const pagesRes = await fetch("/api/website-empire", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "generate-pages", niche }),
        });
        const pagesData = await pagesRes.json();
        
        if (pagesData.success) {
          setGeneratedPages(pagesData.pages);
          addLog(`✅ ${pagesData.pageCount} pages ready!`);
        }
        
        // Auto-save
        addLog("💾 Auto-saving project...");
        saveProject();
        addLog("🎉 Build complete! Check Projects tab to see all.");
      }
    } catch (err) {
      addLog(`❌ Error: ${String(err)}`);
    }
    setLoading(false);
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
    addLog("📥 Downloaded!");
  }

  return (
    <main style={{
      background: "linear-gradient(135deg, #0a0a0a, #0a0a2e)", 
      minHeight: "100vh", color: "white", padding: "24px", fontFamily: "system-ui",
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        
        {/* NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
          <Link href="/website-empire" style={{ textDecoration: "none" }}>
            <button style={{
              padding: "10px 20px", borderRadius: "10px",
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
              color: "white", cursor: "pointer",
            }}>
              🧠 Strategy
            </button>
          </Link>
          <button style={{
            padding: "10px 20px", borderRadius: "10px",
            background: "#00ff88", border: "none",
            color: "#000", fontWeight: "bold",
          }}>
            🏗️ Builder
          </button>
          <Link href="/website-empire/projects" style={{ textDecoration: "none" }}>
            <button style={{
              padding: "10px 20px", borderRadius: "10px",
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
              color: "white", cursor: "pointer",
            }}>
              📁 Projects ({savedProjects.length})
            </button>
          </Link>
        </div>

        <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>🏗️ Website Builder</h1>
        <p style={{ color: "#888", marginBottom: "24px" }}>Build REAL websites — Preview, Download, Deploy</p>

        {/* BUILD CONTROLS */}
        <div style={{
          background: "rgba(255,255,255,0.05)", padding: "24px",
          borderRadius: "16px", marginBottom: "24px",
          display: "flex", gap: "12px", flexWrap: "wrap",
        }}>
          <input
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="Enter niche (e.g., Fitness, AI Tools, Real Estate)..."
            style={{
              flex: 1, minWidth: "250px", padding: "14px", borderRadius: "12px",
              background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)",
              color: "white", fontSize: "15px",
            }}
          />
          <button onClick={buildWebsite} disabled={loading || !niche}
            style={{
              padding: "14px 28px", borderRadius: "12px",
              background: loading ? "#333" : "linear-gradient(135deg, #00ff88, #00aaff)",
              border: "none", color: "white", fontWeight: "bold", cursor: "pointer",
            }}>
            {loading ? "🏗️ Building..." : "🏗️ BUILD"}
          </button>
          {websiteCode && (
            <>
              <button onClick={() => setPreviewMode(!previewMode)}
                style={{
                  padding: "14px 28px", borderRadius: "12px",
                  background: previewMode ? "#00ff88" : "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: previewMode ? "#000" : "white", cursor: "pointer",
                }}>
                {previewMode ? "📝 CODE" : "👁️ PREVIEW"}
              </button>
              <button onClick={downloadWebsite}
                style={{
                  padding: "14px 28px", borderRadius: "12px",
                  background: "#f59e0b", border: "none",
                  color: "#000", fontWeight: "bold", cursor: "pointer",
                }}>
                📥 DOWNLOAD
              </button>
              <button onClick={saveProject}
                style={{
                  padding: "14px 28px", borderRadius: "12px",
                  background: "#8b5cf6", border: "none",
                  color: "white", fontWeight: "bold", cursor: "pointer",
                }}>
                💾 SAVE
              </button>
            </>
          )}
        </div>

        {/* PAGE TABS */}
        {Object.keys(generatedPages).length > 0 && (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
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
              <iframe srcDoc={websiteCode} style={{ width: "100%", height: "80vh", border: "none", background: "white" }} />
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
            <h4>📡 Build Log</h4>
            {log.map((entry, i) => (
              <p key={i} style={{ fontSize: "12px", color: "#888", fontFamily: "monospace" }}>{entry}</p>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
