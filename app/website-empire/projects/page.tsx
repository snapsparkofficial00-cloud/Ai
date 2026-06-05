"use client";
import { useState } from "react";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [previewProject, setPreviewProject] = useState<any>(null);

  // Load projects on mount
  useState(() => {
    const saved = localStorage.getItem("website-projects");
    if (saved) setProjects(JSON.parse(saved));
  });

  function deleteProject(id: number) {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem("website-projects", JSON.stringify(updated));
  }

  function downloadProject(project: any) {
    let code = project.websiteCode;
    Object.entries(project.pages || {}).forEach(([name, pageCode]: [string, any]) => {
      if (name !== "index") code += `\n\n<!-- ${name.toUpperCase()} -->\n${pageCode}`;
    });
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.niche.replace(/\s+/g, "-")}-website.html`;
    a.click();
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
          <Link href="/website-empire/builder" style={{ textDecoration: "none" }}>
            <button style={{
              padding: "10px 20px", borderRadius: "10px",
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
              color: "white", cursor: "pointer",
            }}>🏗️ Builder</button>
          </Link>
          <button style={{
            padding: "10px 20px", borderRadius: "10px",
            background: "#8b5cf6", border: "none",
            color: "white", fontWeight: "bold",
          }}>📁 Projects ({projects.length})</button>
        </div>

        <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>📁 My Website Projects</h1>
        <p style={{ color: "#888", marginBottom: "24px" }}>All your AI-built websites in one place</p>

        {/* PREVIEW MODAL */}
        {previewProject && (
          <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)",
            zIndex: 9999, display: "flex", flexDirection: "column",
          }}>
            <div style={{ padding: "16px", display: "flex", gap: "12px", background: "#111" }}>
              <button onClick={() => setPreviewProject(null)}
                style={{ padding: "8px 16px", borderRadius: "8px", background: "#ef4444", border: "none", color: "white", cursor: "pointer" }}>
                ✕ Close
              </button>
              <span style={{ color: "#00ff88", padding: "8px" }}>Preview: {previewProject.niche}</span>
            </div>
            <iframe srcDoc={previewProject.websiteCode} style={{ flex: 1, border: "none", background: "white" }} />
          </div>
        )}

        {/* PROJECTS GRID */}
        {projects.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", color: "#888" }}>
            <p style={{ fontSize: "48px" }}>📁</p>
            <p style={{ fontSize: "20px" }}>No projects yet</p>
            <Link href="/website-empire/builder">
              <button style={{
                marginTop: "16px", padding: "14px 28px", borderRadius: "12px",
                background: "linear-gradient(135deg, #00ff88, #00aaff)",
                border: "none", color: "white", fontWeight: "bold", cursor: "pointer",
              }}>
                🏗️ Build Your First Website
              </button>
            </Link>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "20px",
          }}>
            {projects.map((project) => (
              <div key={project.id} style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "16px", padding: "20px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}>
                {/* PREVIEW THUMBNAIL */}
                <div style={{
                  height: "200px", background: "rgba(0,0,0,0.3)",
                  borderRadius: "12px", overflow: "hidden", marginBottom: "16px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}>
                  <iframe
                    srcDoc={project.websiteCode}
                    style={{
                      width: "200%", height: "200%",
                      transform: "scale(0.5)", transformOrigin: "top left",
                      border: "none", pointerEvents: "none",
                    }}
                  />
                </div>

                {/* PROJECT INFO */}
                <h3 style={{ fontSize: "18px", marginBottom: "8px", color: "#00ff88" }}>
                  🌐 {project.niche}
                </h3>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                  <span style={{
                    background: "rgba(0,255,136,0.2)", padding: "4px 10px",
                    borderRadius: "6px", fontSize: "11px", color: "#00ff88",
                  }}>
                    📄 {Object.keys(project.pages || {}).length || 1} Pages
                  </span>
                  <span style={{
                    background: "rgba(0,170,255,0.2)", padding: "4px 10px",
                    borderRadius: "6px", fontSize: "11px", color: "#00aaff",
                  }}>
                    📱 Responsive
                  </span>
                  <span style={{
                    background: "rgba(139,92,246,0.2)", padding: "4px 10px",
                    borderRadius: "6px", fontSize: "11px", color: "#8b5cf6",
                  }}>
                    ⚡ {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* ACTION BUTTONS */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button onClick={() => setPreviewProject(project)}
                    style={{
                      padding: "8px 16px", borderRadius: "8px",
                      background: "#00ff88", border: "none",
                      color: "#000", fontWeight: "bold", cursor: "pointer", fontSize: "13px",
                    }}>
                    👁️ Preview
                  </button>
                  <button onClick={() => downloadProject(project)}
                    style={{
                      padding: "8px 16px", borderRadius: "8px",
                      background: "#f59e0b", border: "none",
                      color: "#000", fontWeight: "bold", cursor: "pointer", fontSize: "13px",
                    }}>
                    📥 Download
                  </button>
                  <button onClick={() => deleteProject(project.id)}
                    style={{
                      padding: "8px 16px", borderRadius: "8px",
                      background: "rgba(239,68,68,0.2)", border: "1px solid #ef4444",
                      color: "#ef4444", cursor: "pointer", fontSize: "13px",
                    }}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BUILD MORE BUTTON */}
        {projects.length > 0 && (
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <Link href="/website-empire/builder">
              <button style={{
                padding: "16px 32px", borderRadius: "12px",
                background: "linear-gradient(135deg, #00ff88, #00aaff)",
                border: "none", color: "white", fontWeight: "bold",
                cursor: "pointer", fontSize: "16px",
              }}>
                🏗️ Build Another Website
              </button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
