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

  // Tab‑specific inputs
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

  return (
    <main style={{
      background: "#020617", minHeight: "100vh", color: "white",
      padding: "24px", fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{
        fontSize: "clamp(28px,5vw,56px)", fontWeight: "bold", marginBottom: "8px",
        background: "linear-gradient(to right,#f59e0b,#ef4444,#8b5cf6,#22c55e)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
      }}>
        👑 CEO MASTER BRAIN
      </h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
        Autonomous business builder – YouTube, Instagram, Web, Freelance, Affiliate, AI Agents
      </p>

      {/* Status cards */}
      {status && (
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
          gap: "12px", marginBottom: "24px"
        }}>
          <div style={{ background: "#0f172a", padding: "12px", borderRadius: "12px" }}>
            <p style={{ fontSize: "11px", color: "#64748b" }}>Income Sources</p>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#22c55e" }}>{status.incomeSources || 0}</p>
          </div>
          <div style={{ background: "#0f172a", padding: "12px", borderRadius: "12px" }}>
            <p style={{ fontSize: "11px", color: "#64748b" }}>Custom Agents</p>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#38bdf8" }}>{status.customAgents || 0}</p>
          </div>
          <div style={{ background: "#0f172a", padding: "12px", borderRadius: "12px" }}>
            <p style={{ fontSize: "11px", color: "#64748b" }}>Est. Monthly</p>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#f59e0b" }}>
              ${status.estimatedMonthlyIncome?.toLocaleString() || 0}
            </p>
          </div>
        </div>
      )}

      {/* Niche input */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "13px", color: "#64748b" }}>Niche / Channel</label>
        <input
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          style={{
            width: "100%", padding: "12px", borderRadius: "12px",
            background: "#0f172a", border: "1px solid #334155", color: "white"
          }}
        />
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px",
        borderBottom: "1px solid #1e293b", paddingBottom: "12px"
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? "#2563eb" : "#0f172a",
              border: "none", padding: "8px 16px", borderRadius: "20px",
              cursor: "pointer", color: "white"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ========= COMMAND TAB ========= */}
      {activeTab === "command" && (
        <div style={{ background: "#0f172a", padding: "24px", borderRadius: "20px" }}>
          <h2>👑 CEO Command</h2>
          <input
            value={goal}
            onChange={e => setGoal(e.target.value)}
            placeholder="Your goal..."
            style={{
              width: "100%", padding: "12px", margin: "16px 0",
              background: "#020617", border: "1px solid #334155",
              color: "white", borderRadius: "12px"
            }}
          />
          <button
            onClick={() => callCEO("execute_goal", "Execute Goal")}
            disabled={loading}
            style={{ background: "#8b5cf6", padding: "12px 24px", borderRadius: "12px", cursor: "pointer" }}
          >
            🚀 Execute
          </button>
          <button
            onClick={() => callCEO("build_empire", "Build Empire")}
            disabled={loading}
            style={{ background: "#22c55e", padding: "12px 24px", borderRadius: "12px", marginLeft: "12px", cursor: "pointer" }}
          >
            🏭 Build Empire
          </button>
        </div>
      )}

      {/* ========= INCOME TAB ========= */}
      {activeTab === "income" && (
        <div style={{ background: "#0f172a", padding: "24px", borderRadius: "20px" }}>
          <h2>💰 Money Machine</h2>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", margin: "16px 0" }}>
            {INCOME_TYPES.map(type => (
              <button
                key={type.id}
                onClick={() => callCEO("build_income_stream", `Build ${type.label}`, { incomeType: type.id })}
                disabled={loading}
                style={{ background: type.color, padding: "10px 16px", borderRadius: "20px", cursor: "pointer" }}
              >
                {type.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => callCEO("build_all_streams", "Build All Income Streams")}
            disabled={loading}
            style={{ background: "#f59e0b", padding: "12px 20px", borderRadius: "12px", cursor: "pointer" }}
          >
            ⚡ Build ALL
          </button>
        </div>
      )}

      {/* ========= INSTAGRAM TAB ========= */}
      {activeTab === "instagram" && (
        <div style={{ background: "#0f172a", padding: "24px", borderRadius: "20px" }}>
          <h2>📸 Instagram Manager</h2>
          <input
            value={igPurpose}
            onChange={e => setIgPurpose(e.target.value)}
            style={{
              width: "100%", padding: "12px", margin: "16px 0",
              background: "#020617", border: "1px solid #334155", borderRadius: "12px", color: "white"
            }}
          />
          <button onClick={() => callCEO("instagram_script", "Generate DM Script", { purpose: igPurpose })} style={{ background: "#ec4899", padding: "12px 24px", borderRadius: "12px", cursor: "pointer" }}>
            📩 DM Script
          </button>
          <button onClick={() => callCEO("instagram_growth_plan", "Growth Plan")} style={{ background: "#8b5cf6", marginLeft: "12px", padding: "12px 24px", borderRadius: "12px", cursor: "pointer" }}>
            📈 90‑Day Plan
          </button>
          <button onClick={() => callCEO("instagram_content", "Generate Content Ideas")} style={{ background: "#22c55e", marginLeft: "12px", padding: "12px 24px", borderRadius: "12px", cursor: "pointer" }}>
            💡 Content Ideas
          </button>
        </div>
      )}

      {/* ========= WEB & APPS TAB ========= */}
      {activeTab === "web" && (
        <div style={{ background: "#0f172a", padding: "24px", borderRadius: "20px" }}>
          <h2>🌐 Web & App Builder</h2>
          <input
            value={webPurpose}
            onChange={e => setWebPurpose(e.target.value)}
            placeholder="Website purpose"
            style={{
              width: "100%", padding: "12px", margin: "10px 0",
              background: "#020617", border: "1px solid #334155", borderRadius: "12px", color: "white"
            }}
          />
          <button onClick={() => callCEO("build_website", "Design Website", { purpose: webPurpose })} style={{ background: "#3b82f6", padding: "12px 24px", borderRadius: "12px", cursor: "pointer" }}>
            🌐 Design Website
          </button>

          <input
            value={appIdea}
            onChange={e => setAppIdea(e.target.value)}
            placeholder="App idea"
            style={{
              width: "100%", padding: "12px", margin: "10px 0",
              background: "#020617", border: "1px solid #334155", borderRadius: "12px", color: "white"
            }}
          />
          <button onClick={() => callCEO("build_app", "Design App", { appIdea })} style={{ background: "#10b981", padding: "12px 24px", borderRadius: "12px", cursor: "pointer" }}>
            📱 Design App
          </button>

          <input
            value={toolIdea}
            onChange={e => setToolIdea(e.target.value)}
            placeholder="AI Tool idea"
            style={{
              width: "100%", padding: "12px", margin: "10px 0",
              background: "#020617", border: "1px solid #334155", borderRadius: "12px", color: "white"
            }}
          />
          <button onClick={() => callCEO("build_ai_tool", "Build AI Tool", { toolIdea })} style={{ background: "#f59e0b", padding: "12px 24px", borderRadius: "12px", cursor: "pointer" }}>
            🤖 Build AI Tool
          </button>
        </div>
      )}

      {/* ========= FREELANCE TAB ========= */}
      {activeTab === "freelance" && (
        <div style={{ background: "#0f172a", padding: "24px", borderRadius: "20px" }}>
          <h2>💼 Freelance System</h2>
          <div style={{ display: "flex", gap: "12px", margin: "16px 0" }}>
            <input
              value={skill}
              onChange={e => setSkill(e.target.value)}
              placeholder="Skill"
              style={{ flex: 1, padding: "12px", background: "#020617", border: "1px solid #334155", borderRadius: "12px", color: "white" }}
            />
            <select
              value={platform}
              onChange={e => setPlatform(e.target.value)}
              style={{ padding: "12px", background: "#020617", border: "1px solid #334155", borderRadius: "12px", color: "white" }}
            >
              {["Fiverr", "Upwork", "Toptal", "LinkedIn", "Freelancer"].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <button onClick={() => callCEO("freelance_gig", "Create Gig", { skill, platform })} style={{ background: "#8b5cf6", padding: "12px 24px", borderRadius: "12px", cursor: "pointer" }}>
            📝 Create Gig
          </button>
          <button onClick={() => callCEO("freelance_opportunities", "Find Opportunities", { skills: [skill] })} style={{ background: "#3b82f6", marginLeft: "12px", padding: "12px 24px", borderRadius: "12px", cursor: "pointer" }}>
            🔍 Find Opportunities
          </button>
          <div style={{ marginTop: "16px" }}>
            <input
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
              placeholder="Job title"
              style={{ width: "100%", padding: "12px", marginBottom: "10px", background: "#020617", border: "1px solid #334155", borderRadius: "12px", color: "white" }}
            />
            <input
              value={clientNeeds}
              onChange={e => setClientNeeds(e.target.value)}
              placeholder="Client needs"
              style={{ width: "100%", padding: "12px", marginBottom: "10px", background: "#020617", border: "1px solid #334155", borderRadius: "12px", color: "white" }}
            />
            <button onClick={() => callCEO("freelance_proposal", "Write Proposal", { jobTitle, clientNeeds })} style={{ background: "#f59e0b", padding: "12px 24px", borderRadius: "12px", cursor: "pointer" }}>
              ✍️ Write Proposal
            </button>
          </div>
        </div>
      )}

      {/* ========= AFFILIATE TAB ========= */}
      {activeTab === "affiliate" && (
        <div style={{ background: "#0f172a", padding: "24px", borderRadius: "20px" }}>
          <h2>🔗 Affiliate System</h2>
          <button onClick={() => callCEO("affiliate_programs", "Find Programs")} style={{ background: "#f97316", padding: "12px 24px", borderRadius: "12px", cursor: "pointer" }}>
            🔍 Find Programs
          </button>
          <button onClick={() => callCEO("affiliate_content", "Create Content", { product: niche, platform: "youtube" })} style={{ background: "#ef4444", marginLeft: "12px", padding: "12px 24px", borderRadius: "12px", cursor: "pointer" }}>
            📺 YouTube Script
          </button>
        </div>
      )}

      {/* ========= AGENT FACTORY TAB ========= */}
      {activeTab === "agents" && (
        <div style={{ background: "#0f172a", padding: "24px", borderRadius: "20px" }}>
          <h2>🤖 Agent Factory</h2>
          <input
            value={agentJob}
            onChange={e => setAgentJob(e.target.value)}
            placeholder="Job description"
            style={{ width: "100%", padding: "12px", margin: "16px 0", background: "#020617", border: "1px solid #334155", borderRadius: "12px", color: "white" }}
          />
          <input
            value={agentContext}
            onChange={e => setAgentContext(e.target.value)}
            placeholder="Context / niche"
            style={{ width: "100%", padding: "12px", marginBottom: "16px", background: "#020617", border: "1px solid #334155", borderRadius: "12px", color: "white" }}
          />
          <button onClick={() => callCEO("create_agent", "Create Agent", { job: agentJob, context: agentContext })} style={{ background: "#8b5cf6", padding: "12px 24px", borderRadius: "12px", cursor: "pointer" }}>
            🧬 Create New Agent
          </button>
          <button onClick={() => callCEO("run_agent", "Run Agent", { agentId: customAgents[0]?.id, task: agentJob })} style={{ background: "#22c55e", marginLeft: "12px", padding: "12px 24px", borderRadius: "12px", cursor: "pointer" }}>
            ⚙️ Run Agent
          </button>
          {customAgents.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <h3>Existing Agents</h3>
              {customAgents.map(a => (
                <div key={a.id} style={{ background: "#020617", padding: "8px", marginTop: "8px", borderRadius: "8px" }}>
                  {a.name} – {a.role}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Result display */}
      {result && (
        <div style={{ marginTop: "30px", background: "#0f172a", padding: "20px", borderRadius: "16px", border: "1px solid #22c55e" }}>
          <h3>📄 AI Output</h3>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: "13px", lineHeight: "1.5", maxHeight: "400px", overflowY: "auto" }}>{result}</pre>
          <button onClick={() => navigator.clipboard.writeText(result)} style={{ marginTop: "12px", background: "#1e293b", border: "none", padding: "6px 12px", borderRadius: "8px", cursor: "pointer" }}>
            📋 Copy
          </button>
        </div>
      )}

      {/* Activity log */}
      <div style={{ marginTop: "30px", background: "#0f172a", padding: "20px", borderRadius: "16px" }}>
        <h3>📡 Activity Log</h3>
        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
          {log.map((l, i) => (
            <div key={i} style={{ fontFamily: "monospace", fontSize: "12px", borderBottom: "1px solid #1e293b", padding: "6px 0" }}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
