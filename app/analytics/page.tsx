"use client";
import { useState, useEffect } from "react";

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);
  useEffect(() => {
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, []);

  async function loadData() {
    try {
      const res = await fetch("/api/real-analytics");
      const d = await res.json();
      if (d.success) setData(d);
    } catch (err) {
      console.error("Analytics error:", err);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <main style={{ background: "#020617", minHeight: "100vh", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Arial" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "48px" }}>⏳</p>
          <p style={{ color: "#94a3b8", fontSize: "18px" }}>Loading REAL data from Supabase...</p>
        </div>
      </main>
    );
  }

  const stats = data?.stats || {};

  return (
    <main style={{ background: "#020617", minHeight: "100vh", color: "white", fontFamily: "Arial" }}>
      {/* HEADER */}
      <header style={{ background: "#111827", padding: "22px 30px", borderBottom: "1px solid #1e293b", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <h2 style={{ fontSize: "28px", margin: 0 }}>📊 Analytics Intelligence</h2>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 8px #22c55e" }} />
          <span style={{ color: "#22c55e", fontSize: "13px" }}>LIVE — Real Data from Supabase</span>
          <button onClick={loadData} style={{ padding: "8px 16px", borderRadius: "8px", background: "#1e293b", border: "1px solid #334155", color: "white", cursor: "pointer", fontSize: "13px" }}>🔄 Refresh</button>
        </div>
      </header>

      {/* CONTENT */}
      <div style={{ padding: "30px", maxWidth: "1400px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "42px", marginBottom: "8px" }}>🚀 AI Growth Analytics</h1>
        <p style={{ color: "#94a3b8", fontSize: "16px", marginBottom: "30px" }}>100% Real-time data from your AI Empire — No demo, no fake numbers</p>

        {/* STATS CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "40px" }}>
          <StatCard title="🌐 Total Websites" value={stats.totalWebsites || 0} color="#38bdf8" icon="🌐" />
          <StatCard title="🚀 Deployed Live" value={stats.totalDeployed || 0} color="#22c55e" icon="🚀" />
          <StatCard title="🎬 Content Created" value={stats.totalContent || 0} color="#f59e0b" icon="🎬" />
          <StatCard title="⏱️ Last Activity" value={stats.lastActivity ? new Date(stats.lastActivity).toLocaleDateString() : "None"} color="#ec4899" icon="⏱️" small />
        </div>

        {/* BY TYPE */}
        {stats.byType && Object.keys(stats.byType).length > 0 && (
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>📁 Content Breakdown</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px" }}>
              {Object.entries(stats.byType).map(([type, count]: any) => (
                <div key={type} style={{ background: "#0f172a", padding: "20px", borderRadius: "16px", border: "1px solid #1e293b", textAlign: "center" }}>
                  <p style={{ color: "#64748b", fontSize: "12px", textTransform: "uppercase", marginBottom: "8px" }}>{type}</p>
                  <p style={{ color: "#38bdf8", fontSize: "32px", fontWeight: "bold" }}>{count}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DAILY ACTIVITY */}
        {stats.byDate && Object.keys(stats.byDate).length > 0 && (
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>📅 Daily Activity</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px" }}>
              {Object.entries(stats.byDate).map(([date, count]: any) => (
                <div key={date} style={{ background: "#0f172a", padding: "16px", borderRadius: "14px", border: "1px solid #1e293b", textAlign: "center" }}>
                  <p style={{ color: "#64748b", fontSize: "11px", marginBottom: "6px" }}>{date}</p>
                  <p style={{ color: "#22c55e", fontSize: "24px", fontWeight: "bold" }}>{count}</p>
                  <p style={{ color: "#64748b", fontSize: "10px" }}>actions</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RECENT ACTIVITY */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>🕐 Recent Activity Log</h2>
          <div style={{ background: "#0f172a", borderRadius: "16px", border: "1px solid #1e293b", overflow: "hidden" }}>
            {(data?.recentActivity || []).length > 0 ? (
              (data.recentActivity || []).map((item: any, i: number) => (
                <div key={i} style={{ padding: "14px 20px", borderBottom: "1px solid #1e293b", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "20px" }}>{item.action === "build" ? "🌐" : item.action === "shorts" ? "🎬" : "⚡"}</span>
                    <div>
                      <p style={{ fontWeight: "bold", fontSize: "14px" }}>{item.action?.toUpperCase()}</p>
                      <p style={{ color: "#64748b", fontSize: "12px" }}>{item.agent || "AI Agent"}</p>
                    </div>
                  </div>
                  <span style={{ color: "#64748b", fontSize: "11px" }}>{new Date(item.created_at).toLocaleString()}</span>
                </div>
              ))
            ) : (
              <p style={{ padding: "30px", textAlign: "center", color: "#64748b" }}>No activity yet. Start your AI Brain on Hugging Face!</p>
            )}
          </div>
        </div>

        {/* RECENT RESULTS */}
        <div>
          <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>📦 Recent Content Created</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
            {(data?.recentResults || []).slice(0, 12).map((item: any, i: number) => (
              <div key={i} style={{ background: "#0f172a", padding: "20px", borderRadius: "16px", border: "1px solid #1e293b" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ padding: "4px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: "bold", background: item.type === "website" ? "#166534" : item.type === "shorts" ? "#441100" : "#1e1b4b", color: item.type === "website" ? "#22c55e" : item.type === "shorts" ? "#ff6600" : "#7c4dff" }}>
                    {item.type?.toUpperCase()}
                  </span>
                  <span style={{ color: "#64748b", fontSize: "11px" }}>{new Date(item.created_at).toLocaleDateString()}</span>
                </div>
                <h3 style={{ fontSize: "16px", marginBottom: "6px" }}>🎯 {item.niche}</h3>
                <p style={{ color: "#64748b", fontSize: "12px" }}>📏 Size: {item.size || 0} chars | Status: {item.status || "completed"}</p>
                {item.url && (
                  <a href={item.url} target="_blank" style={{ color: "#38bdf8", fontSize: "13px", display: "inline-block", marginTop: "8px", textDecoration: "none" }}>
                    🔗 View Live Site →
                  </a>
                )}
              </div>
            ))}
            {(!data?.recentResults || data.recentResults.length === 0) && (
              <p style={{ color: "#64748b", textAlign: "center", padding: "40px", gridColumn: "1 / -1" }}>
                📦 No content created yet. Go to your AI Brain and start building!
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ title, value, color, icon, small }: { title: string; value: any; color: string; icon: string; small?: boolean }) {
  return (
    <div style={{ background: "#0f172a", padding: "24px", borderRadius: "20px", border: "1px solid #1e293b" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <p style={{ color: "#64748b", fontSize: "13px" }}>{title}</p>
        <span style={{ fontSize: "24px" }}>{icon}</span>
      </div>
      <p style={{ color, fontSize: small ? "16px" : "36px", fontWeight: "bold" }}>{value}</p>
      <p style={{ color: "#64748b", fontSize: "10px", marginTop: "4px" }}>{small ? "Last activity" : "Real data from Supabase"}</p>
    </div>
  );
                   }
