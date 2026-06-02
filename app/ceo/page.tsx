"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";

interface Message {
  role: "user" | "ceo";
  text: string;
  timestamp: string;
  action?: string;
}

export default function CEOPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ceo",
      text: "👑 CEO AI ONLINE — How can I help you build your empire today?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedNiche, setSelectedNiche] = useState("Supercars");
  const [ceoStats, setCeoStats] = useState({
    activeAgents: 11,
    tasksCompleted: 0,
    revenue: 0,
    youtubeSubs: 0,
    totalViews: 0,
    videosGenerated: 0,
  });
  const [suggestions, setSuggestions] = useState<string[]>([
    "Generate viral YouTube script for Supercars",
    "Analyze channel performance",
    "Create monetization strategy",
    "Run autonomous mode",
    "Show trending topics",
  ]);
  const [autoResponder, setAutoResponder] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const niches = [
    "Supercars", "Finance", "AI Tech", "Gaming",
    "Space", "Motivation", "Movie Edits", "Viral Facts",
    "Tech Reviews", "Business", "Sci-Fi", "Music"
  ];

  useEffect(() => {
    loadCEOStats();
    const interval = setInterval(loadCEOStats, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function loadCEOStats() {
    try {
      const [systemRes, healthRes] = await Promise.all([
        fetch("/api/system").catch(() => ({ json: () => ({}) })),
        fetch("/api/youtube/health").catch(() => ({ json: () => ({}) })),
      ]);

      const systemData = await systemRes.json();
      const healthData = await healthRes.json();

      // Fix: Check if systemData exists and has stats property
      if (systemData && systemData.stats) {
        setCeoStats(prev => ({
          ...prev,
          activeAgents: systemData.stats.totalAgents || 11,
          tasksCompleted: systemData.stats.completedTasks || 0,
        }));
      }
      
      // Fix: Check if healthData exists and has health property
      if (healthData && healthData.health) {
        setCeoStats(prev => ({
          ...prev,
          youtubeSubs: healthData.health.metrics?.subscriberGrowth || 66,
          totalViews: healthData.health.metrics?.viewVelocity * 100 || 20091,
        }));
      } else if (healthData && healthData.channelHealth) {
        setCeoStats(prev => ({
          ...prev,
          youtubeSubs: healthData.channelHealth.metrics?.subscriberGrowth || 66,
          totalViews: healthData.channelHealth.metrics?.viewVelocity * 100 || 20091,
        }));
      }
    } catch (error) {
      console.log("Error loading CEO stats:", error);
    }
  }

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch("/api/ceo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          command: input, 
          niche: selectedNiche,
          stats: ceoStats 
        }),
      });

      const data = await response.json();

      const ceoMessage: Message = {
        role: "ceo",
        text: data.reply || "✅ Command executed successfully. What would you like to do next?",
        timestamp: new Date().toLocaleTimeString(),
        action: data.action,
      };
      setMessages(prev => [...prev, ceoMessage]);

      if (data.suggestions) {
        setSuggestions(data.suggestions);
      }

    } catch (error) {
      const errorMessage: Message = {
        role: "ceo",
        text: "❌ Error processing command. Please try again.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setLoading(false);
    setInput("");
  }

  async function quickAction(action: string) {
    setInput(action);
    setTimeout(() => sendMessage(), 100);
  }

  async function runAutonomousCommand() {
    setLoading(true);
    addSystemMessage("🤖 CEO AI activating autonomous mode...");
    
    try {
      const res = await fetch("/api/youtube/autonomous", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate", niche: selectedNiche }),
      });
      const data = await res.json();
      
      if (data.success) {
        addSystemMessage(`✅ Autonomous generation complete: "${data.title || "Video generated"}"`);
        addSystemMessage(`📊 Confidence: ${data.decision?.confidence || 70}%`);
        setCeoStats(prev => ({ ...prev, videosGenerated: prev.videosGenerated + 1 }));
      } else {
        addSystemMessage(`⚠️ Generation issue: ${data.error || "Unknown"}`);
      }
    } catch (error) {
      addSystemMessage(`❌ Error: ${String(error)}`);
    }
    
    setLoading(false);
  }

  function addSystemMessage(text: string) {
    const systemMessage: Message = {
      role: "ceo",
      text,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, systemMessage]);
  }

  async function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await sendMessage();
    }
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          marginLeft: "260px",
          padding: "24px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: "bold",
              background: "linear-gradient(to right, #38bdf8, #818cf8, #f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "8px",
            }}
          >
            👑 CEO AI COMMAND CENTER
          </h1>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "16px",
            }}
          >
            Autonomous AI infrastructure controlling business systems, automation workflows, analytics and AI agents.
          </p>
        </div>

        {/* CEO Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <StatCard title="🟢 AI Status" value="ONLINE" color="#22c55e" live />
          <StatCard title="👑 Active Agent" value="CEO AI" color="#38bdf8" />
          <StatCard title="🤖 Active Agents" value={ceoStats.activeAgents.toString()} color="#a855f7" />
          <StatCard title="✅ Tasks" value={ceoStats.tasksCompleted.toLocaleString()} color="#22c55e" />
          <StatCard title="🎬 Videos" value={ceoStats.videosGenerated.toString()} color="#f59e0b" />
          <StatCard title="👥 Subs" value={ceoStats.youtubeSubs.toLocaleString()} color="#ef4444" />
        </div>

        {/* Niche Selector */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ color: "#64748b", fontSize: "14px", display: "block", marginBottom: "8px" }}>
            🎯 Active Niche
          </label>
          <select
            value={selectedNiche}
            onChange={(e) => setSelectedNiche(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "300px",
              padding: "12px 16px",
              borderRadius: "12px",
              background: "#0f172a",
              color: "white",
              border: "1px solid #334155",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            {niches.map(niche => (
              <option key={niche} value={niche}>{niche}</option>
            ))}
          </select>
        </div>

        {/* Chat Container */}
        <div
          style={{
            background: "#0f172a",
            borderRadius: "20px",
            padding: "20px",
            height: "calc(100vh - 420px)",
            minHeight: "350px",
            overflowY: "auto",
            marginBottom: "20px",
            border: "1px solid #1e293b",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                marginBottom: "12px",
                padding: "12px 16px",
                borderRadius: "14px",
                background: msg.role === "user" ? "#2563eb" : "#1e293b",
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "80%",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <strong style={{ color: msg.role === "user" ? "#a5f3fc" : "#fbbf24" }}>
                  {msg.role === "user" ? "👤 YOU" : "👑 CEO"}
                </strong>
                <span style={{ fontSize: "10px", color: "#64748b", marginLeft: "12px" }}>
                  {msg.timestamp}
                </span>
              </div>
              <p style={{ marginTop: "4px", lineHeight: "1.5", fontSize: "14px", whiteSpace: "pre-wrap" }}>
                {msg.text}
              </p>
            </div>
          ))}
          {loading && (
            <div style={{ padding: "12px", color: "#38bdf8", fontStyle: "italic" }}>
              🤖 CEO AI is thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        <div style={{ marginBottom: "16px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {suggestions.slice(0, 4).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => quickAction(suggestion)}
              style={{
                background: "#1e293b",
                border: "1px solid #334155",
                color: "#94a3b8",
                padding: "6px 14px",
                borderRadius: "16px",
                fontSize: "11px",
                cursor: "pointer",
              }}
            >
              💡 {suggestion.length > 40 ? suggestion.slice(0, 40) + "..." : suggestion}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            width: "100%",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type CEO command..."
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #334155",
              background: "#0f172a",
              color: "white",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              padding: "14px 24px",
              borderRadius: "12px",
              border: "none",
              background: loading ? "#1e293b" : "linear-gradient(to right, #2563eb, #38bdf8)",
              color: "white",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "14px",
            }}
          >
            {loading ? "..." : "🚀 Send"}
          </button>
        </div>

        {/* Quick Actions */}
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button onClick={runAutonomousCommand} style={{ background: "#22c55e", border: "none", color: "white", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "12px" }}>
            🤖 Auto Mode
          </button>
          <button onClick={() => quickAction(`Generate video for ${selectedNiche}`)} style={{ background: "#3b82f6", border: "none", color: "white", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "12px" }}>
            🎬 Generate
          </button>
          <button onClick={() => quickAction("Analyze channel")} style={{ background: "#f59e0b", border: "none", color: "white", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "12px" }}>
            📊 Analyze
          </button>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, color, live }: { title: string; value: string; color: string; live?: boolean }) {
  return (
    <div
      style={{
        background: "#0f172a",
        padding: "12px",
        borderRadius: "12px",
        border: "1px solid #1e293b",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
        <p style={{ fontSize: "11px", color: "#64748b" }}>{title}</p>
        {live && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />}
      </div>
      <p style={{ fontSize: "20px", fontWeight: "bold", color }}>{value}</p>
    </div>
  );
}
