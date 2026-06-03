"use client";

import { useState, useEffect } from "react";

interface StoredVideo {
  id: string;
  title: string;
  prompt: string;
  videoUrl: string;
  thumbnailUrl?: string;
  hasVoiceover: boolean;
  hasMusic: boolean;
  musicStyle?: string;
  createdAt: string;
}

export default function VideoGallery() {
  const [videos, setVideos] = useState<StoredVideo[]>([]);
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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", videoId: id }),
    });
    
    if (res.ok) {
      setVideos(videos.filter(v => v.id !== id));
    }
  }

  if (loading) return <div style={{ color: "#64748b" }}>Loading videos...</div>;

  if (videos.length === 0) {
    return (
      <div style={{
        background: "#0f172a",
        padding: "40px",
        borderRadius: "20px",
        textAlign: "center",
        color: "#64748b",
      }}>
        🎬 No videos created yet. Say something like "Create BMW M5 video with music only"
      </div>
    );
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: "20px",
    }}>
      {videos.map((video) => (
        <div key={video.id} style={{
          background: "#0f172a",
          borderRadius: "16px",
          border: "1px solid #1e293b",
          overflow: "hidden",
        }}>
          {/* Thumbnail/Video Preview */}
          <div style={{
            background: "#020617",
            height: "180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}>
            {video.videoUrl ? (
              <video
                src={video.videoUrl}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                controls={false}
              />
            ) : (
              <span style={{ fontSize: "48px" }}>🎬</span>
            )}
            
            {/* Badges */}
            <div style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              display: "flex",
              gap: "6px",
            }}>
              {!video.hasVoiceover && (
                <span style={{
                  background: "#a855f7",
                  padding: "4px 8px",
                  borderRadius: "8px",
                  fontSize: "10px",
                  fontWeight: "bold",
                }}>🎵 MUSIC ONLY</span>
              )}
              {video.hasVoiceover && (
                <span style={{
                  background: "#22c55e",
                  padding: "4px 8px",
                  borderRadius: "8px",
                  fontSize: "10px",
                  fontWeight: "bold",
                }}>🎙️ VOICE</span>
              )}
            </div>
          </div>

          {/* Info */}
          <div style={{ padding: "16px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}>
              {video.title}
            </h3>
            <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "8px" }}>
              {video.prompt?.slice(0, 60)}...
            </p>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "12px",
            }}>
              <span style={{ fontSize: "11px", color: "#475569" }}>
                {new Date(video.createdAt).toLocaleDateString()}
              </span>
              <button
                onClick={() => deleteVideo(video.id)}
                style={{
                  background: "transparent",
                  border: "1px solid #ef4444",
                  color: "#ef4444",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
