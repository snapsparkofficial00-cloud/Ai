"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [systemStats, setSystemStats] = useState<any>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/system");
        const data = await res.json();
        if (data?.stats) setSystemStats(data.stats);
      } catch (e) {
        console.log(e);
      }
    }
    loadStats();
  }, []);

  return (
    <div style={{
      background: "#020617",
      minHeight: "100vh",
      color: "white",
      fontFamily: "Arial",
      padding: "40px",
    }}>
      <h1 style={{
        fontSize: "48px",
        fontWeight: "bold",
        marginBottom: "20px",
        background: "linear-gradient(to right,#38bdf8,#818cf8,#f472b6)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}>
        🚀 AI OS
      </h1>
      <p style={{ color: "#94a3b8", fontSize: "18px", marginBottom: "40px" }}>
        Autonomous AI Infrastructure
      </p>

      {/* Stats */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginBottom: "40px",
      }}>
        <div style={{ background: "#0f172a", padding: "24px", borderRadius: "16px", border: "1px solid #1e293b" }}>
          <p style={{ color: "#64748b", fontSize: "13px" }}>🤖 Active Agents</p>
          <p style={{ fontSize: "32px", fontWeight: "bold", color: "#38bdf8" }}>{systemStats?.totalAgents || 11}</p>
        </div>
        <div style={{ background: "#0f172a", padding: "24px", borderRadius: "16px", border: "1px solid #1e293b" }}>
          <p style={{ color: "#64748b", fontSize: "13px" }}>✅ Tasks Completed</p>
          <p style={{ fontSize: "32px", fontWeight: "bold", color: "#22c55e" }}>{systemStats?.completedTasks || 0}</p>
        </div>
        <div style={{ background: "#0f172a", padding: "24px", borderRadius: "16px", border: "1px solid #1e293b" }}>
          <p style={{ color: "#64748b", fontSize: "13px" }}>⚡ Running Now</p>
          <p style={{ fontSize: "32px", fontWeight: "bold", color: "#f59e0b" }}>{systemStats?.runningTasks || 0}</p>
        </div>
        <div style={{ background: "#0f172a", padding: "24px", borderRadius: "16px", border: "1px solid #1e293b" }}>
          <p style={{ color: "#64748b", fontSize: "13px" }}>🧠 Memories</p>
          <p style={{ fontSize: "32px", fontWeight: "bold", color: "#a855f7" }}>{systemStats?.memoryStored || 0}</p>
        </div>
      </div>

      {/* Quick Links */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "16px",
      }}>
        <Link href="/youtube" style={{ textDecoration: "none" }}>
          <div style={{ background: "#0f172a", padding: "20px", borderRadius: "16px", border: "1px solid #1e293b", cursor: "pointer" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>📺 YouTube AI</h2>
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>Viral scripts, SEO, growth strategy</p>
          </div>
        </Link>
        <Link href="/ceo" style={{ textDecoration: "none" }}>
          <div style={{ background: "#0f172a", padding: "20px", borderRadius: "16px", border: "1px solid #1e293b", cursor: "pointer" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>👑 CEO AI</h2>
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>Master orchestrator of all agents</p>
          </div>
        </Link>
        <Link href="/autopilot" style={{ textDecoration: "none" }}>
          <div style={{ background: "#0f172a", padding: "20px", borderRadius: "16px", border: "1px solid #1e293b", cursor: "pointer" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>🤖 Auto Pilot</h2>
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>Autonomous content generation</p>
          </div>
        </Link>
        <Link href="/dashboard" style={{ textDecoration: "none" }}>
          <div style={{ background: "#0f172a", padding: "20px", borderRadius: "16px", border: "1px solid #1e293b", cursor: "pointer" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>📊 Analytics</h2>
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>Performance monitoring</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
