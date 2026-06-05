"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EcosystemPage() {
  const [status, setStatus] = useState<any>(null);
  const [log, setLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchStatus(); }, []);

  async function fetchStatus() {
    const res = await fetch("/api/ai-ecosystem", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "ecosystem-status" }),
    });
    const data = await res.json();
    if (data.success) setStatus(data.ecosystem);
  }

  function addLog(msg: string) {
    setLog(prev => [`🧬 ${new Date().toLocaleTimeString()} — ${msg}`, ...prev.slice(0, 49)]);
  }

  async function runAction(action: string, label: string) {
    setLoading(true);
    addLog(`🚀 ${label}...`);
    try {
      const res = await fetch("/api/ai-ecosystem", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      addLog(`✅ ${label} completed!`);
      fetchStatus();
    } catch { addLog(`❌ Failed`); }
    setLoading(false);
  }

  return (
    <main style={{ background: "#000", minHeight: "100vh", color: "white", padding: "24px", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
          <Link href="/website-empire"><button style={navBtn}>🧠 Strategy</button></Link>
          <Link href="/website-empire/builder"><button style={navBtn}>🏗️ Builder</button></Link>
          <Link href="/website-empire/projects"><button style={navBtn}>📁 Projects</button></Link>
          <button style={{ ...navBtn, background: "#7c4dff", color: "white", fontWeight: "bold" }}>🧬 Ecosystem</button>
        </div>

        <h1 style={{ fontSize: "36px", background: "linear-gradient(to right, #7c4dff, #00bcd4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          🧬 LIVING AI ECOSYSTEM
        </h1>
        <p style={{ color: "#888", marginBottom: "24px" }}>Self-learning • Self-publishing • Self-optimizing • 24/7 Active</p>

        {/* STATUS */}
        {status && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginBottom: "24px" }}>
            {[
              { label: "🧬 Status", value: status.status, color: "#00ff88" },
              { label: "🤖 Agents", value: `${status.agents.active}/${status.agents.total} Active`, color: "#7c4dff" },
              { label: "🌐 Sites", value: `${status.sites.published}/${status.sites.total} Published`, color: "#00bcd4" },
              { label: "📊 Visitors", value: status.traffic.visitors || 0, color: "#ff9800" },
              { label: "💰 Revenue", value: `$${status.revenue.total.toFixed(2)}`, color: "#4caf50" },
              { label: "🧠 Learnings", value: status.learning.totalInsights, color: "#e91e63" },
            ].map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.05)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
                <p style={{ color: "#888", fontSize: "11px" }}>{s.label}</p>
                <p style={{ fontSize: "20px", fontWeight: "bold", color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* CONTROL PANEL */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px", marginBottom: "24px" }}>
          {[
            { action: "run-all-agents", label: "🤖 Activate All Agents", color: "#7c4dff" },
            { action: "auto-publish-all", label: "🚀 Publish All Sites", color: "#00bcd4" },
            { action: "ai-decision", label: "🧠 AI Make Decision", color: "#e91e63" },
            { action: "revenue-report", label: "💰 Revenue Report", color: "#4caf50" },
          ].map((btn, i) => (
            <button key={i} onClick={() => runAction(btn.action, btn.label)} disabled={loading}
              style={{ padding: "16px", borderRadius: "12px", background: btn.color, border: "none", color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "15px" }}>
              {btn.label}
            </button>
          ))}
        </div>

        {/* LOGS */}
        <div style={{ background: "rgba(0,0,0,0.5)", padding: "16px", borderRadius: "12px" }}>
          <h4>📡 Ecosystem Log</h4>
          {log.map((entry, i) => (
            <p key={i} style={{ fontSize: "12px", color: "#888", fontFamily: "monospace", margin: "2px 0" }}>{entry}</p>
          ))}
        </div>
      </div>
    </main>
  );
}

const navBtn: React.CSSProperties = {
  padding: "10px 20px", borderRadius: "10px",
  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
  color: "white", cursor: "pointer",
};
