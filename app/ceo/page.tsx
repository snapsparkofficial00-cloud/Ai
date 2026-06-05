"use client";
import { useState, useEffect } from "react";

// Main navigation tabs
const tabs = [
  { id: "command", label: "👑 CEO Command" },
  { id: "income", label: "💰 Money Machine" },
  { id: "instagram", label: "📸 Instagram" },
  { id: "web", label: "🌐 Web & Apps" },
  { id: "freelance", label: "💼 Freelance" },
  { id: "affiliate", label: "🔗 Affiliate" },
  { id: "agents", label: "🤖 Agent Factory" },
];

// Income types (used inside the "income" tab)
const INCOME_TYPES = [
  { id: "youtube", label: "📺 YouTube", color: "#ef4444" },
  { id: "affiliate", label: "🔗 Affiliate", color: "#f97316" },
  { id: "instagram", label: "📸 Instagram", color: "#ec4899" },
  { id: "digital_products", label: "📦 Digital Products", color: "#8b5cf6" },
  { id: "sponsorship", label: "🤝 Sponsorships", color: "#3b82f6" },
  { id: "saas", label: "🚀 SaaS Tool", color: "#22c55e" },
  { id: "freelance", label: "💼 Freelancing", color: "#f59e0b" },
];

export default function CEOPage() {
  const [activeTab, setActiveTab] = useState("command");
  const [niche, setNiche] = useState("BMW Cars and Supercars");
  const [loading, setLoading] = useState(false);
  const [activeAction, setActiveAction] = useState("");
  const [result, setResult] = useState("");
  const [status, setStatus] = useState<any>(null);
  const [goal, setGoal] = useState("");
  const [log, setLog] = useState<string[]>([]);

  // Tab-specific inputs
  const [igPurpose, setIgPurpose] = useState("sell BMW merchandise");
  const [webPurpose, setWebPurpose] = useState("BMW car review website");
  const [appIdea, setAppIdea] = useState("supercar tracking app");
  const [toolIdea, setToolIdea] = useState("YouTube title generator for car channels");
  const [skill, setSkill] = useState("video editing");
  const [platform, setPlatform] = useState("Fiverr");
  const [jobTitle, setJobTitle] = useState("YouTube Video Editor");
  const [clientNeeds, setClientNeeds] = useState("Need short form content for car channel");
  const [agentJob, setAgentJob] = useState("TikTok content manager");
  const [agentContext, setAgentContext] = useState("BMW and supercar niche");
  const [customAgents, setCustomAgents] = useState<any[]>([]);
  const [incomeSources, setIncomeSources] = useState<any[]>([]);

  function addLog(msg: string) {
    setLog((prev) => [`${new Date().toLocaleTimeString()} — ${msg}`, ...prev.slice(0, 29)]);
  }

  useEffect(() => {
    loadStatus();
  }, []);

  async function loadStatus() {
    try {
      const res = await fetch("/api/ceo");
      const data = await res.json();
      if (data.success) {
        setStatus(data);
        setIncomeSources(data.sources || []);
        setCustomAgents(data.agents || []);
      }
    } catch {}
  }

  async function callCEO(action: string, label: string, extraBody?: any) {
    setLoading(true);
    setActiveAction(action);
    setResult("");
    addLog(`🚀 ${label}...`);

    try {
      const res = await fetch("/api/ceo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          niche,
          goal,
          ...extraBody,
        }),
      });
      const data = await res.json();

      const output = extractText(data);
      setResult(output);
      addLog(`✅ ${label} complete`);
      loadStatus();
    } catch (err) {
      addLog(`❌ ${label} failed`);
      setResult(`Error: ${String(err)}`);
    }
    setLoading(false);
  }

  function extractText(data: any): string {
    if (!data) return "No response";
    const content = data.plan || data.empire || data.stream?.plan ||
      data.content || data.gig || data.opportunities ||
      data.proposal || data.programs || data.design ||
      data.agent || data.script || data.allStreams ||
      data.status || data;

    if (typeof content === "string") return content;
    return JSON.stringify(content, null, 2);
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "command", label: "👑 CEO Command" },
    { id: "income", label: "💰 Money Machine" },
    { id: "instagram", label: "📸 Instagram" },
    { id: "web", label: "🌐 Web & Apps" },
    { id: "freelance", label: "💼 Freelance" },
    { id: "affiliate", label: "🔗 Affiliate" },
    { id: "agents", label: "🤖 Agent Factory" },
  ];

  return (
    <main style={{
      background: "#020617", minHeight: "100vh",
      color: "white", fontFamily: "Arial",
      padding: "24px", maxWidth: "100vw", overflowX: "hidden",
    }}>

      {/* HERO */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{
          fontSize: "clamp(28px,5vw,56px)", fontWeight: "bold", marginBottom: "8px",
          background: "linear-gradient(to right,#f59e0b,#ef4444,#8b5cf6,#22c55e)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          👑 CEO MASTER AI
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.7" }}>
          Autonomous business OS — YouTube · Instagram · Web · Apps · Freelance · Affiliate · AI Tools
        </p>
      </div>

      {/* STATUS CARDS */}
      {status && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
          gap: "12px", marginBottom: "24px",
        }}>
          {[
            { label: "💰 Est. Monthly", value: `$${status.estimatedMonthlyIncome || 0}`, color: "#22c55e" },
            { label: "📊 Income Sources", value: String(status.incomeSources || 0), color: "#38bdf8" },
            { label: "🤖 Custom Agents", value: String(status.customAgents || 0), color: "#8b5cf6" },
            { label: "👑 CEO Version", value: "2030", color: "#f59e0b" },
          ].map((s, i) => (
            <div key={i} style={{
              background: "#0f172a", padding: "16px 20px",
              borderRadius: "14px", border: "1px solid #1e293b",
            }}>
              <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "6px" }}>{s.label}</p>
              <p style={{ color: s.color, fontSize: "22px", fontWeight: "bold" }}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* NICHE INPUT — global */}
      <div style={{
        background: "#0f172a", padding: "20px", borderRadius: "16px",
        border: "1px solid #1e293b", marginBottom: "20px",
      }}>
        <input
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="Your main niche..."
          style={{
            width: "100%", padding: "14px", borderRadius: "12px",
            border: "1px solid #334155", background: "#020617",
            color: "white", fontSize: "15px", boxSizing: "border-box",
          }}
        />
      </div>

      {/* TABS */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: "10px 16px", borderRadius: "12px",
            border: activeTab === tab.id ? "none" : "1px solid #1e293b",
            background: activeTab === tab.id
              ? "linear-gradient(to right,#f59e0b,#ef4444)"
              : "#0f172a",
            color: "white", fontWeight: "bold", fontSize: "13px", cursor: "pointer",
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB: CEO COMMAND */}
      {activeTab === "command" && (
        <div>
          <div style={{
            background: "#0f172a", padding: "24px", borderRadius: "20px",
            border: "1px solid #1e293b", marginBottom: "20px",
          }}>
            <h2 style={{ fontSize: "22px", marginBottom: "16px" }}>👑 Give CEO a Goal</h2>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
              <input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. Make $1000/month, Build Instagram to 10K, Create a SaaS tool..."
                style={{
                  flex: 1, minWidth: "200px", padding: "14px", borderRadius: "12px",
                  border: "1px solid #334155", background: "#020617",
                  color: "white", fontSize: "15px",
                }}
              />
              <button
                onClick={() => callCEO("execute_goal", "Execute Goal")}
                disabled={loading}
                style={{
                  background: loading ? "#1e293b" : "linear-gradient(to right,#f59e0b,#ef4444)",
                  border: "none", color: "white", padding: "14px 24px",
                  borderRadius: "12px", fontWeight: "bold",
                  cursor: loading ? "not-allowed" : "pointer", fontSize: "15px",
                }}
              >
                {loading && activeAction === "execute_goal" ? "⚡ Planning..." : "⚡ Execute"}
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "10px" }}>
              {[
                { action: "build_empire", label: "🏰 Build Empire", desc: "All income streams at once" },
                { action: "all_income", label: "💰 All Income", desc: "Build all money sources" },
                { action: "instagram_growth", label: "📸 IG Growth", desc: "90-day Instagram plan" },
                { action: "freelance_opportunities", label: "💼 Find Jobs", desc: "Best freelance opportunities" },
                { action: "affiliate_programs", label: "🔗 Find Affiliates", desc: "Best affiliate programs" },
                { action: "get_agents", label: "🤖 Get Agents", desc: "View all custom agents" },
              ].map((btn) => (
                <button
                  key={btn.action}
                  onClick={() => callCEO(btn.action, btn.label, { skills: ["video editing", "AI", niche] })}
                  disabled={loading}
                  style={{
                    background: "#020617", border: "1px solid #334155",
                    color: "white", padding: "14px", borderRadius: "12px",
                    cursor: loading ? "not-allowed" : "pointer", textAlign: "left",
                  }}
                >
                  <p style={{ fontWeight: "bold", marginBottom: "4px" }}>{btn.label}</p>
                  <p style={{ color: "#64748b", fontSize: "12px" }}>{btn.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: MONEY MACHINE */}
      {activeTab === "income" && (
        <div>
          <h2 style={{ fontSize: "22px", marginBottom: "16px" }}>💰 Build Income Streams</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: "14px", marginBottom: "24px",
          }}>
            {INCOME_TYPES.map((inc) => (
              <button
                key={inc.id}
                onClick={() => callCEO("income_stream", `${inc.label} Income`, { type: inc.id })}
                disabled={loading}
                style={{
                  background: loading && activeAction === "income_stream" ? "#1e293b" : inc.color,
                  border: "none", color: "white", padding: "20px",
                  borderRadius: "16px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "16px", textAlign: "center",
                }}
              >
                {inc.label}
              </button>
            ))}
          </div>

          {incomeSources.length > 0 && (
            <div style={{ background: "#0f172a", padding: "24px", borderRadius: "20px", border: "1px solid #1e293b", marginBottom: "20px" }}>
              <h3 style={{ color: "#22c55e", marginBottom: "16px" }}>💰 Active Income Sources</h3>
              {incomeSources.map((s: any, i: number) => (
                <div key={i} style={{
                  padding: "14px", background: "#020617", borderRadius: "12px",
                  marginBottom: "10px", display: "flex", justifyContent: "space-between",
                  alignItems: "center", flexWrap: "wrap", gap: "8px",
                }}>
                  <div>
                    <p style={{ fontWeight: "bold" }}>{s.name}</p>
                    <p style={{ color: "#64748b", fontSize: "13px" }}>Agent: {s.agent}</p>
                  </div>
                  <p style={{ color: "#22c55e", fontWeight: "bold", fontSize: "18px" }}>
                    ${s.estimatedMonthly}/mo
                  </p>
                </div>
              ))}
              <div style={{
                borderTop: "1px solid #1e293b", paddingTop: "14px",
                display: "flex", justifyContent: "space-between",
              }}>
                <span style={{ color: "#94a3b8" }}>Total Estimate:</span>
                <span style={{ color: "#22c55e", fontWeight: "bold", fontSize: "20px" }}>
                  ${status?.estimatedMonthlyIncome || 0}/month
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB: INSTAGRAM */}
      {activeTab === "instagram" && (
        <div style={{ background: "#0f172a", padding: "24px", borderRadius: "20px", border: "1px solid #1e293b" }}>
          <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>📸 Instagram AI Manager</h2>
          <input
            value={igPurpose}
            onChange={(e) => setIgPurpose(e.target.value)}
            placeholder="Purpose (e.g. sell BMW merchandise, affiliate marketing)..."
            style={{
              width: "100%", padding: "14px", borderRadius: "12px",
              border: "1px solid #334155", background: "#020617",
              color: "white", fontSize: "15px", marginBottom: "16px", boxSizing: "border-box",
            }}
          />
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[
              { action: "instagram_content", label: "📝 Generate Posts", extra: { count: 5 } },
              { action: "instagram_growth", label: "📈 Growth Plan", extra: {} },
              { action: "instagram_dm", label: "💬 DM Scripts", extra: { purpose: igPurpose } },
            ].map((btn) => (
              <button
                key={btn.action}
                onClick={() => callCEO(btn.action, btn.label, btn.extra)}
                disabled={loading}
                style={{
                  background: loading && activeAction === btn.action ? "#1e293b" : "#ec4899",
                  border: "none", color: "white", padding: "14px 20px",
                  borderRadius: "12px", fontWeight: "bold",
                  cursor: loading ? "not-allowed" : "pointer", fontSize: "15px",
                }}
              >
                {loading && activeAction === btn.action ? "⏳..." : btn.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TAB: WEB & APPS */}
      {activeTab === "web" && (
        <div style={{ background: "#0f172a", padding: "24px", borderRadius: "20px", border: "1px solid #1e293b" }}>
          <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>🌐 Web & App Builder AI</h2>
          <div style={{ display: "grid", gap: "16px", marginBottom: "20px" }}>
            <div>
              <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "8px" }}>WEBSITE PURPOSE</p>
              <input
                value={webPurpose}
                onChange={(e) => setWebPurpose(e.target.value)}
                placeholder="Website idea..."
                style={{
                  width: "100%", padding: "14px", borderRadius: "12px",
                  border: "1px solid #334155", background: "#020617",
                  color: "white", fontSize: "15px", boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "8px" }}>APP IDEA</p>
              <input
                value={appIdea}
                onChange={(e) => setAppIdea(e.target.value)}
                placeholder="Mobile app idea..."
                style={{
                  width: "100%", padding: "14px", borderRadius: "12px",
                  border: "1px solid #334155", background: "#020617",
                  color: "white", fontSize: "15px", boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "8px" }}>AI TOOL IDEA</p>
              <input
                value={toolIdea}
                onChange={(e) => setToolIdea(e.target.value)}
                placeholder="AI tool idea..."
                style={{
                  width: "100%", padding: "14px", borderRadius: "12px",
                  border: "1px solid #334155", background: "#020617",
                  color: "white", fontSize: "15px", boxSizing: "border-box",
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[
              { action: "build_website", label: "🌐 Design Website", extra: { purpose: webPurpose } },
              { action: "build_app", label: "📱 Design App", extra: { appIdea } },
              { action: "build_ai_tool", label: "🤖 Build AI Tool", extra: { toolIdea } },
            ].map((btn) => (
              <button
                key={btn.action}
                onClick={() => callCEO(btn.action, btn.label, btn.extra)}
                disabled={loading}
                style={{
                  background: loading && activeAction === btn.action ? "#1e293b" : "#3b82f6",
                  border: "none", color: "white", padding: "14px 20px",
                  borderRadius: "12px", fontWeight: "bold",
                  cursor: loading ? "not-allowed" : "pointer", fontSize: "15px",
                }}
              >
                {loading && activeAction === btn.action ? "⏳..." : btn.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TAB: FREELANCE */}
      {activeTab === "freelance" && (
        <div style={{ background: "#0f172a", padding: "24px", borderRadius: "20px", border: "1px solid #1e293b" }}>
          <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>💼 Freelance System</h2>
          <div style={{ display: "grid", gap: "14px", marginBottom: "20px" }}>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <input
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                placeholder="Your skill..."
                style={{
                  flex: 1, minWidth: "150px", padding: "14px", borderRadius: "12px",
                  border: "1px solid #334155", background: "#020617", color: "white", fontSize: "15px",
                }}
              />
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                style={{
                  padding: "14px", borderRadius: "12px",
                  border: "1px solid #334155", background: "#020617",
                  color: "white", fontSize: "15px",
                }}
              >
                {["Fiverr", "Upwork", "Toptal", "LinkedIn", "Freelancer"].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Job title for proposal..."
              style={{
                width: "100%", padding: "14px", borderRadius: "12px",
                border: "1px solid #334155", background: "#020617",
                color: "white", fontSize: "15px", boxSizing: "border-box",
              }}
            />
            <input
              value={clientNeeds}
              onChange={(e) => setClientNeeds(e.target.value)}
              placeholder="Client needs..."
              style={{
                width: "100%", padding: "14px", borderRadius: "12px",
                border: "1px solid #334155", 
