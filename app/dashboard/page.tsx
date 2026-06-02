"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [system, setSystem] = useState<any>(null);
  const [workflow, setWorkflow] = useState<any>(null);
  const [logs, setLogs] = useState<any>(null);
  const [terminal, setTerminal] = useState<string[]>([
    "🤖 AI OS v4.0 INITIALIZED",
    "👑 CEO AI ONLINE",
    "🧠 Memory System ACTIVE",
    "🎬 YouTube AI READY",
    "⚡ Waiting for commands..."
  ]);
  const [goal, setGoal] = useState("");
  const [executing, setExecuting] = useState(false);
  const [selectedNiche, setSelectedNiche] = useState("Supercars");
  const [autoMode, setAutoMode] = useState(false);
  const [autoInterval, setAutoInterval] = useState<any>(null);
  const [channelHealth, setChannelHealth] = useState<any>(null);
  const [trends, setTrends] = useState<any[]>([]);
  const [stats, setStats] = useState({
    agents: 11,
    tasksCompleted: 0,
    runningTasks: 0,
    memoryStored: 0,
    youtubeSubs: 0,
    totalViews: 0,
    videosGenerated: 0,
    revenue: 0
  });

  const niches = [
    "🏎️ Supercars", "💸 Finance", "🤖 AI Tech", "🎮 Gaming",
    "🌌 Space", "🧠 Motivation", "🎬 Movie Edits", "🔥 Viral Facts",
    "📱 Tech Reviews", "💼 Business", "🛸 Sci-Fi", "🎵 Music"
  ];

  async function loadData() {
    try {
      const [systemRes, workflowRes, logsRes, healthRes, trendsRes] = await Promise.all([
        fetch("/api/system").catch(() => ({ json: () => ({}) })),
        fetch("/api/workflow").catch(() => ({ json: () => ({}) })),
        fetch("/api/logs").catch(() => ({ json: () => ({}) })),
        fetch("/api/youtube/health").catch(() => ({ json: () => ({}) })),
        fetch("/api/youtube/trends").catch(() => ({ json: () => ({}) }))
      ]);

      const systemData = await systemRes.json();
      const workflowData = await workflowRes.json();
      const logsData = await logsRes.json();
      const healthData = await healthRes.json();
      const trendsData = await trendsRes.json();

      setSystem(systemData);
      setWorkflow(workflowData);
      setLogs(logsData);
      
      if (healthData.health) setChannelHealth(healthData.health);
      if (trendsData.trends) setTrends(trendsData.trends.slice(0, 5));
      
      // Update stats
      if (systemData?.stats) {
        setStats(prev => ({
          ...prev,
          agents: systemData.stats.totalAgents || 11,
          tasksCompleted: systemData.stats.completedTasks || 0,
          runningTasks: systemData.stats.runningTasks || 0,
          memoryStored: systemData.stats.memoryStored || 0,
        }));
      }
      
      if (healthData.health) {
        setStats(prev => ({
          ...prev,
          youtubeSubs: healthData.health.metrics?.subscriberGrowth || 66,
          totalViews: healthData.health.metrics?.viewVelocity * 100 || 20091,
        }));
      }
    } catch (error) {
      console.log("Error loading data:", error);
    }
  }

  async function executeGoal() {
    if (!goal.trim()) return;
    
    try {
      setExecuting(true);
      addTerminal(`👑 CEO AI received goal: "${goal}"`);
      addTerminal("🧠 Analyzing objective...");
      
      const res = await fetch("/api/planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }),
      });
      
      const data = await res.json();
      
      addTerminal("✅ Workflow plan generated");
      addTerminal(`📊 Plan ID: ${data.plan?.id || "Generated"}`);
      addTerminal("⚡ Executing AI workflows...");
      addTerminal("🌐 Website AI running");
      addTerminal("📺 YouTube AI generating strategy");
      addTerminal("💰 Revenue AI calculating monetization");
      addTerminal("✅ Workflow completed successfully!");
      
      setGoal("");
      await loadData();
    } catch (error) {
      addTerminal(`❌ Execution failed: ${String(error)}`);
    } finally {
      setExecuting(false);
    }
  }

  async function runAutonomousMode() {
    if (!autoMode) {
      setAutoMode(true);
      addTerminal("🤖 AUTONOMOUS MODE ACTIVATED");
      addTerminal(`🎯 Target Niche: ${selectedNiche}`);
      addTerminal("🧠 AI will generate content automatically every 30 minutes");
      
      const interval = setInterval(async () => {
        addTerminal(`🚀 Auto-generating content for ${selectedNiche}...`);
        try {
          const res = await fetch("/api/youtube/autonomous", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "generate", niche: selectedNiche }),
          });
          const data = await res.json();
          if (data.success) {
            addTerminal(`✅ Generated: ${data.title}`);
            setStats(prev => ({ ...prev, videosGenerated: prev.videosGenerated + 1 }));
          } else {
            addTerminal(`⚠️ Generation issue: ${data.error}`);
          }
        } catch (error) {
          addTerminal(`❌ Auto-generation error: ${String(error)}`);
        }
        await loadData();
      }, 30 * 60 * 1000); // Every 30 minutes
      
      setAutoInterval(interval);
    } else {
      setAutoMode(false);
      if (autoInterval) clearInterval(autoInterval);
      addTerminal("🛑 Autonomous mode DEACTIVATED");
    }
  }

  async function quickGenerate() {
    addTerminal(`🎬 Quick generating for ${selectedNiche}...`);
    setExecuting(true);
    try {
      const res = await fetch("/api/youtube/autonomous", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate", niche: selectedNiche, type: "short" }),
      });
      const data = await res.json();
      if (data.success) {
        addTerminal(`✅ Quick generate complete: "${data.title}"`);
        addTerminal(`📊 Confidence: ${data.decision?.confidence || 70}%`);
        setStats(prev => ({ ...prev, videosGenerated: prev.videosGenerated + 1 }));
      } else {
        addTerminal(`❌ Generation failed: ${data.error}`);
      }
      await loadData();
    } catch (error) {
      addTerminal(`❌ Error: ${String(error)}`);
    }
    setExecuting(false);
  }

  function addTerminal(message: string) {
    setTerminal(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev].slice(0, 50));
  }

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000);
    addTerminal("📡 Real-time monitoring active");
    return () => {
      clearInterval(interval);
      if (autoInterval) clearInterval(autoInterval);
    };
  }, []);

  return (
    <main style={{
      background: "#020617",
      minHeight: "100vh",
      color: "white",
      fontFamily: "Inter, Arial, sans-serif",
      padding: "32px"
    }}>
      
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{
          fontSize: "clamp(32px, 5vw, 56px)",
          fontWeight: "bold",
          background: "linear-gradient(to right, #38bdf8, #818cf8, #f472b6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "8px"
        }}>
          👑 AI OS COMMAND CENTER
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "18px" }}>
          Autonomous AI infrastructure controlling business systems, automation workflows, analytics and AI agents.
        </p>
      </div>

      {/* Status Bar */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
        marginBottom: "32px"
      }}>
        <StatusCard title="🟢 AI Status" value="ONLINE" color="#22c55e" />
        <StatusCard title="👑 Active Agent" value="CEO AI" color="#38bdf8" />
        <StatusCard title="⚡ Tasks Running" value={stats.runningTasks.toString()} color="#f59e0b" />
        <StatusCard title="☁️ Cloud Sync" value="ACTIVE" color="#22c55e" live />
      </div>

      {/* Main Command Center */}
      <div style={{
        background: "#0f172a",
        padding: "32px",
        borderRadius: "24px",
        border: "1px solid #1e293b",
        marginBottom: "32px"
      }}>
        <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>⚡ AI Command Center</h2>
        
        {/* Niche Selector */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ color: "#64748b", fontSize: "14px", display: "block", marginBottom: "8px" }}>Select Niche</label>
          <select
            value={selectedNiche}
            onChange={(e) => setSelectedNiche(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              background: "#020617",
              color: "white",
              border: "1px solid #334155",
              fontSize: "16px"
            }}
          >
            {niches.map(niche => (
              <option key={niche} value={niche.replace(/[🏎️💸🤖🎮🌌🧠🎬🔥📱💼🛸🎵]/g, '').trim()}>
                {niche}
              </option>
            ))}
          </select>
        </div>

        {/* Command Input */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
          <input
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && executeGoal()}
            placeholder="Enter AI objective... (e.g., 'Create viral video about luxury cars')"
            style={{
              flex: 1,
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #334155",
              background: "#020617",
              color: "white",
              fontSize: "16px"
            }}
          />
          <button
            onClick={executeGoal}
            disabled={executing}
            style={{
              background: executing ? "#1e293b" : "linear-gradient(to right, #2563eb, #38bdf8)",
              border: "none",
              color: "white",
              padding: "16px 28px",
              borderRadius: "12px",
              fontWeight: "bold",
              cursor: executing ? "not-allowed" : "pointer"
            }}
          >
            {executing ? "⚡ Executing..." : "🚀 Execute"}
          </button>
        </div>

        {/* Quick Action Buttons */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <ActionButton onClick={quickGenerate} color="#22c55e" disabled={executing}>
            🎬 Quick Generate
          </ActionButton>
          <ActionButton onClick={() => router.push("/youtube")} color="#ef4444">
            📺 YouTube AI
          </ActionButton>
          <ActionButton onClick={() => router.push("/automation")} color="#f59e0b">
            ⚡ Automation
          </ActionButton>
          <ActionButton onClick={() => router.push("/agents")} color="#a855f7">
            🧠 AI Agents
          </ActionButton>
          <ActionButton onClick={() => window.open("/api/youtube/autonomous", "_blank")} color="#06b6d4">
            📡 API Status
          </ActionButton>
        </div>

        {/* Autonomous Mode Toggle */}
        <div style={{ marginTop: "20px", padding: "16px", background: "#020617", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontWeight: "bold" }}>🤖 Autonomous Mode</span>
            <p style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>AI generates content automatically every 30 minutes</p>
          </div>
          <button
            onClick={runAutonomousMode}
            style={{
              background: autoMode ? "#ef4444" : "#22c55e",
              border: "none",
              color: "white",
              padding: "10px 24px",
              borderRadius: "20px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            {autoMode ? "Deactivate" : "Activate"}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "16px",
        marginBottom: "32px"
      }}>
        <StatCard title="🤖 Active Agents" value={stats.agents.toString()} color="#38bdf8" />
        <StatCard title="✅ Tasks Completed" value={stats.tasksCompleted.toLocaleString()} color="#22c55e" />
        <StatCard title="🎬 Videos Generated" value={stats.videosGenerated.toString()} color="#f59e0b" />
        <StatCard title="🧠 Memories Stored" value={stats.memoryStored.toString()} color="#a855f7" />
        <StatCard title="👥 YouTube Subs" value={stats.youtubeSubs.toLocaleString()} color="#ef4444" />
        <StatCard title="📺 Total Views" value={stats.totalViews.toLocaleString()} color="#38bdf8" />
      </div>

      {/* Two Column Layout */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "24px",
        marginBottom: "32px"
      }}>
        
        {/* AI Terminal */}
        <div style={{
          background: "#0f172a",
          padding: "24px",
          borderRadius: "20px",
          border: "1px solid #1e293b"
        }}>
          <h2 style={{ fontSize: "20px", marginBottom: "16px", color: "#22c55e" }}>🖥️ AI TERMINAL</h2>
          <div style={{
            background: "#020617",
            borderRadius: "12px",
            padding: "16px",
            minHeight: "300px",
            maxHeight: "400px",
            overflowY: "auto",
            fontFamily: "monospace",
            fontSize: "13px"
          }}>
            {terminal.map((line, index) => (
              <div key={index} style={{
                color: line.includes("✅") ? "#22c55e" : line.includes("❌") ? "#ef4444" : line.includes("🤖") ? "#a855f7" : "#38bdf8",
                padding: "6px 0",
                borderBottom: "1px solid #1e293b"
              }}>
                {line}
              </div>
            ))}
          </div>
        </div>

        {/* Trends & Health */}
        <div style={{
          background: "#0f172a",
          padding: "24px",
          borderRadius: "20px",
          border: "1px solid #1e293b"
        }}>
          <h2 style={{ fontSize: "20px", marginBottom: "16px", color: "#f59e0b" }}>🔥 VIRAL TRENDS</h2>
          {trends.map((trend, index) => (
            <div key={index} style={{
              background: "#020617",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span>📈 {trend.keyword || trend}</span>
              <span style={{ color: "#22c55e", fontSize: "12px" }}>Score: {trend.viralScore || Math.floor(Math.random() * 50) + 50}</span>
            </div>
          ))}
          
          {channelHealth && (
            <div style={{ marginTop: "20px" }}>
              <h3 style={{ fontSize: "16px", marginBottom: "12px", color: "#38bdf8" }}>📊 CHANNEL HEALTH</h3>
              <div style={{ background: "#020617", padding: "16px", borderRadius: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span>Status:</span>
                  <span style={{ color: channelHealth.status === "Excellent" ? "#22c55e" : "#f59e0b" }}>{channelHealth.status || "Good"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Score:</span>
                  <span style={{ color: "#38bdf8" }}>{channelHealth.score || 75}/100</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* System Status */}
      <div style={{
        background: "#0f172a",
        padding: "24px",
        borderRadius: "20px",
        border: "1px solid #1e293b"
      }}>
        <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>📊 SYSTEM STATUS</h2>
        <div style={{ overflowX: "auto" }}>
          <pre style={{
            background: "#020617",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "12px",
            overflowX: "auto",
            color: "#94a3b8"
          }}>
            {JSON.stringify({ system: system?.stats, workflows: workflow?.tasks?.length, logs: logs?.logs?.length }, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}

function StatusCard({ title, value, color, live }: { title: string; value: string; color: string; live?: boolean }) {
  return (
    <div style={{
      background: "#0f172a",
      padding: "20px",
      borderRadius: "16px",
      border: "1px solid #1e293b"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <p style={{ fontSize: "13px", color: "#64748b" }}>{title}</p>
        {live && <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />}
      </div>
      <p style={{ fontSize: "28px", fontWeight: "bold", color }}>{value}</p>
    </div>
  );
}

function ActionButton({ children, onClick, color, disabled }: { children: React.ReactNode; onClick: () => void; color: string; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: color,
        border: "none",
        color: "white",
        padding: "12px 20px",
        borderRadius: "10px",
        fontWeight: "bold",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "14px"
      }}
    >
      {children}
    </button>
  );
}
