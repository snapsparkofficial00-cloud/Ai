"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

interface Video {
  id: string;
  title: string;
  prompt: string;
  videoUrl: string;
  source: string;
  createdAt: string;
}

export default function StoragePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

  async function loadVideos() {
    try {
      const res = await fetch("/api/video/storage");
      const data = await res.json();
      if (data.videos) setVideos(data.videos);
    } catch (error) {
      console.log("Error loading videos:", error);
    }
    setLoading(false);
  }

  async function deleteVideo(id: string) {
    if (!confirm("Delete this video?")) return;
    
    const res = await fetch("/api/video/storage", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    
    if (res.ok) {
      setVideos(videos.filter(v => v.id !== id));
    }
  }

  async function uploadToYouTube(video: Video) {
    const res = await fetch("/api/youtube/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: video.title,
        description: video.prompt,
        videoUrl: video.videoUrl
      })
    });
    const data = await res.json();
    alert(data.message || "Upload initiated");
  }

  if (loading) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "#020617" }}>
        <Sidebar />
        <main style={{ flex: 1, marginLeft: "260px", padding: "32px", color: "white" }}>
          Loading videos...
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#020617" }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: "260px", padding: "32px", color: "white", overflow: "auto" }}>
        
        <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}>
          🗄️ Video Storage
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "32px" }}>
          All generated videos - ready for upload
        </p>

        {videos.length === 0 ? (
          <div style={{
            background: "#0f172a",
            padding: "60px",
            borderRadius: "20px",
            textAlign: "center",
            color: "#64748b"
          }}>
            🎬 No videos yet. Generate your first video from YouTube AI page.
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px"
          }}>
            {videos.map(video => (
              <div key={video.id} style={{
                background: "#0f172a",
                borderRadius: "16px",
                border: "1px solid #1e293b",
                overflow: "hidden"
              }}>
                {/* Video Preview */}
                <div style={{
                  background: "#020617",
                  height: "180px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                }}>
                  {video.videoUrl ? (
                    <video
                      src={video.videoUrl}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      controls
                    />
                  ) : (
                    <span style={{ fontSize: "48px" }}>🎬</span>
                  )}
                </div>
                
                {/* Info */}
                <div style={{ padding: "16px" }}>
                  <p style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "8px" }}>
                    {video.title}
                  </p>
                  <p style={{ fontSize: "11px", color: "#64748b", marginBottom: "12px" }}>
                    {new Date(video.createdAt).toLocaleString()}
                  </p>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <a
                      href={video.videoUrl}
                      download
                      style={{
                        flex: 1,
                        background: "#22c55e",
                        color: "white",
                        padding: "8px",
                        borderRadius: "8px",
                        textAlign: "center",
                        textDecoration: "none",
                        fontSize: "12px",
                        fontWeight: "bold"
                      }}
                    >
                      📥 Download
                    </a>
                    <button
                      onClick={() => uploadToYouTube(video)}
                      style={{
                        flex: 1,
                        background: "#ef4444",
                        color: "white",
                        padding: "8px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "bold"
                      }}
                    >
                      📤 Upload
                    </button>
                    <button
                      onClick={() => deleteVideo(video.id)}
                      style={{
                        background: "transparent",
                        border: "1px solid #ef4444",
                        color: "#ef4444",
                        padding: "8px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "12px"
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
