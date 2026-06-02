"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";

interface SystemData {
  stats?: {
    totalAgents?: number;
    completedTasks?: number;
    runningTasks?: number;
    memoryStored?: number;
    logs?: number;
  };
}

interface HealthResponse {
  health?: {
    metrics?: {
      subscriberGrowth?: number;
      viewVelocity?: number;
    };
    status?: string;
    score?: number;
  };
  success?: boolean;
  channelHealth?: {
    metrics?: {
      subscriberGrowth?: number;
      viewVelocity?: number;
    };
    status?: string;
    score?: number;
  };
}

interface TrendsResponse {
  trends?: Array<{ keyword: string; viralScore: number }>;
  success?: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [system, setSystem] = useState<SystemData | null>(null);
  const [channelHealth, setChannelHealth] = useState<any>(null);
  const [trends, setTrends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [systemRes, healthRes, trendsRes] = await Promise.all([
        fetch("/api/system"),
        fetch("/api/youtube/health"),
        fetch("/api/youtube/trends"),
      ]);

      const systemData: SystemData = await systemRes.json();
      const healthData: HealthResponse = await healthRes.json();
      const trendsData: TrendsResponse = await trendsRes.json();

      setSystem(systemData);

      // Safe check for health data
      if (healthData && (healthData.health || healthData.channelHealth)) {
        setChannelHealth(healthData.health || healthData.channelHealth);
      }

      // Safe check for trends data
      if (trendsData && trendsData.trends) {
        setTrends(trendsData.trends.slice(0, 5));
      }

    } catch (error) {
      console.log("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "#020617", color: "white" }}>
        <Sidebar />
        <main style={{ flex: 1, marginLeft: "260px", padding: "40px" }}>
          <h1>Loading dashboard...</h1>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#020617", color: "white" }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: "260px", padding: "32px" }}>
        
        <h1 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "8px" }}>
          🚀 AI OS Dashboard
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "32px" }}>
          Autonomous AI Infrastructure
        </p>

        {/* Stats Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}>
          <StatCard title="🤖 Active Agents" value={system?.stats?.totalAgents?.toString() || "11"} color="#38bdf8" />
          <StatCard title="✅ Tasks Completed" value={system?.stats?.completedTasks?.toString() || "0"} color="#22c55e" />
          <StatCard title="⚡ Running Now" value={system?.stats?.runningTasks?.toString() || "0"} color="#f59e0b" />
          <StatCard title="🧠 Memories" value={system?.stats?.memoryStored?.toString() || "0"} color="#a855f7" />
          <StatCard title="📊 Logs" value={system?.stats?.logs?.toString() || "0"} color="#ec4899" />
        </div>

        {/* Channel Health */}
        {channelHealth && (
          <div style={{
            background: "#0f172a",
            padding: "24px",
            borderRadius: "20px",
            marginBottom: "32px",
            border: "1px solid #1e293b",
          }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>📊 Channel Health</h2>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div>
                <p style={{ color: "#64748b", fontSize: "12px" }}>Status</p>
                <p style={{ color: "#22c55e", fontSize: "24px", fontWeight: "bold" }}>{channelHealth.status || "Good"}</p>
              </div>
              <div>
                <p style={{ color: "#64748b", fontSize: "12px" }}>Score</p>
                <p style={{ color: "#38bdf8", fontSize: "24px", fontWeight: "bold" }}>{channelHealth.score || 75}/100</p>
              </div>
            </div>
          </div>
        )}

        {/* Trends */}
        {trends.length > 0 && (
          <div style={{
            background: "#0f172a",
            padding: "24px",
            borderRadius: "20px",
            border: "1px solid #1e293b",
          }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>🔥 Viral Trends</h2>
            {trends.map((trend, i) => (
              <div key={i} style={{
                padding: "12px",
                borderBottom: "1px solid #1e293b",
                display: "flex",
                justifyContent: "space-between",
              }}>
                <span>📈 {trend.keyword || trend}</span>
                <span style={{ color: "#22c55e" }}>Score: {trend.viralScore || 75}</span>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div style={{
          display: "flex",
          gap: "16px",
          marginTop: "32px",
          flexWrap: "wrap",
        }}>
          <button
            onClick={() => router.push("/youtube")}
            style={{ background: "#ef4444", border: "none", color: "white", padding: "14px 24px", borderRadius: "12px", cursor: "pointer", fontWeight: "bold" }}
          >
            📺 YouTube AI
          </button>
          <button
            onClick={() => router.push("/ceo")}
            style={{ background: "#a855f7", border: "none", color: "white", padding: "14px 24px", borderRadius: "12px", cursor: "pointer", fontWeight: "bold" }}
          >
            👑 CEO AI
          </button>
          <button
            onClick={() => router.push("/autopilot")}
            style={{ background: "#22c55e", border: "none", color: "white", padding: "14px 24px", borderRadius: "12px", cursor: "pointer", fontWeight: "bold" }}
          >
            🤖 Auto Pilot
          </button>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div style={{
      background: "#0f172a",
      padding: "20px",
      borderRadius: "16px",
      border: "1px solid #1e293b",
    }}>
      <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>{title}</p>
      <p style={{ fontSize: "32px", fontWeight: "bold", color }}>{value}</p>
    </div>
  );
}
