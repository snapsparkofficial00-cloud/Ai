"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [previewProject, setPreviewProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load from Supabase
  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    try {
      const res = await fetch("/api/website-projects");
      const data = await res.json();
      if (data.success) setProjects(data.projects || []);
    } catch (err) {
      console.error("Failed to load projects:", err);
    }
    setLoading(false);
  }

  async function deleteProject(id: number) {
    try {
      await fetch("/api/website-projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  function downloadProject(project: any) {
    let code = project.website_code;
    if (project.pages && typeof project.pages === "object") {
      Object.entries(project.pages).forEach(([name, pageCode]: [string, any]) => {
        if (name !== "index") code += `\n\n<!-- ${name.toUpperCase()} -->\n${pageCode}`;
      });
    }
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

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: "32px", marginBottom: "4px" }}>📁 My Website Projects</h1>
            <p style={{ color: "#888" }}>Saved in Supabase Cloud ☁️ — Access from anywhere</p>
          </div>
          <Link href="/website-empire/builder">
            <button style={{
              padding: "14px 24px", borderRadius: "12px",
              background: "linear-gradient(135deg, #00ff88, #00aaff)",
              border: "none", color: "white", fontWeight: "bold", cursor: "pointer",
            }}>
              🏗️ Build New Website
            </button>
          </Link>
        </div>

        {/* PREVIEW MODAL */}
        {previewProject && (
          <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)",
            zIndex: 9999, display: "flex", flexDirection: "column",
          }}>
            <div style={{ padding: "12px 20px", display: "flex", gap: "12px", background: "#111", alignItems: "center" }}>
              <button onClick={() => setPreviewProject(null)}
                style={{ padding: "8px 16px", borderRadius: "8px", background: "#ef4444", border: "none", color: "white", cursor: "pointer", fontWeight: "bold" }}>
                ✕ Close
              </button>
              <span style={{ color: "#00ff88", fontWeight: "bold" }}>🌐 {previewProject.niche}</span>
              <span style={{ color: "#888", fontSize: "12px" }}>
                {new Date(previewProject.created_at).toLocaleDateString()}
              </span>
            </div>
            <iframe srcDoc={previewProject.website_code} style={{ flex: 1, border: "none", background: "white" }} title="Preview" />
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div style={{ textAlign: "center", padding: "60px" }}>
            <p style={{ fontSize: "32px" }}>⏳</p>
            <p style={{ color: "#888" }}>Loading projects from cloud...</p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && projects.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px", color: "#888" }}>
            <p style={{ fontSize: "64px" }}>📁</p>
            <p style={{ fontSize: "20px", marginBottom: "8px" }}>No projects yet</p>
            <p>Build your first website and it will appear here</p>
            <Link href="/website-empire/builder">
              <button style={{
                marginTop: "16px", padding: "14px 28px", borderRadius: "12px",
                background: "linear-gradient(135deg, #00ff88, #00aaff)",
                border: "none", color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "16px",
              }}>
                🏗️ Build Your First Website
              </button>
            </Link>
          </div>
        )}

        {/* PROJECTS GRID */}
        {!loading && projects.length > 0 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
            gap: "20px",
          }}>
            {projects.map((project) => (
              <div key={project.id} style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "16px", padding: "20px",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "all 0.3s",
              }}>
                {/* THUMBNAIL */}
                <div style={{
                  height: "200px", background: "rgba(0,0,0,0.3)",
                  borderRadius: "12px", overflow: "hidden", marginBottom: "16px",
                  border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer",
                }} onClick={() => setPreviewProject(project)}>
                  <iframe
                    srcDoc={project.website_code}
                    style={{
                      width: "200%", height: "200%",
                      transform: "scale(0.5)", transformOrigin: "top left",
                      border: "none", pointerEvents: "none",
                    }}
                    title={project.niche}
                  />
                </div>

                {/* INFO */}
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
                    ☁️ Cloud Saved
                  </span>
                </div>
                <p style={{ color: "#888", fontSize: "11px", marginBottom: "12px" }}>
                  Created: {new Date(project.created_at).toLocaleString()}
                </p>

                {/* ACTIONS */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button onClick={() => setPreviewProject(project)}
                    style={{
                      padding: "10px 18px", borderRadius: "8px",
                      background: "#00ff88", border: "none",
                      color: "#000", fontWeight: "bold", cursor: "pointer", fontSize: "13px",
                    }}>
                    👁️ Preview
                  </button>
                  <button onClick={() => downloadProject(project)}
                    style={{
                      padding: "10px 18px", borderRadius: "8px",
                      background: "#f59e0b", border: "none",
                      color: "#000", fontWeight: "bold", cursor: "pointer", fontSize: "13px",
                    }}>
                    📥 Download
                  </button>
                  <button onClick={() => deleteProject(project.id)}
                    style={{
                      padding: "10px 18px", borderRadius: "8px",
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
      </div>
    </main>
  );
}
