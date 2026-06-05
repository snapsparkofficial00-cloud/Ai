// app/website-empire/page.tsx
"use client";
import { useState } from "react";

export default function WebsiteEmpirePage() {
  const [niche, setNiche] = useState("");
  const [domain, setDomain] = useState("");
  const [action, setAction] = useState("genesis");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [evolutionStage, setEvolutionStage] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const [trafficTarget, setTrafficTarget] = useState("100000");
  const [monetization, setMonetization] = useState("all");
  const [competitors, setCompetitors] = useState("");

  function addLog(msg: string) {
    setLog(prev => [`🔮 ${new Date().toLocaleTimeString()} — ${msg}`, ...prev.slice(0, 99)]);
  }

  async function executeAction() {
    if (!niche) return;
    setLoading(true);
    setResult(null);
    addLog(`🚀 Executing: ${action} for ${niche}`);

    try {
      const res = await fetch("/api/website-empire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          niche,
          domain,
          target: trafficTarget,
          monetization,
          competitors,
          evolutionStage,
        }),
      });

      const data = await res.json();
      setResult(data);
      
      if (data.success) {
        addLog(`✅ ${action} completed successfully!`);
        if (action === "evolve" && data.nextStage) {
          setEvolutionStage(prev => Math.min(prev + 1, 4));
        }
      } else {
        addLog(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      addLog(`❌ Failed: ${String(err)}`);
    }
    setLoading(false);
  }

  const actions = [
    { id: "genesis", icon: "🌟", label: "GENESIS", desc: "Create empire from void", color: "#22c55e" },
    { id: "evolve", icon: "🧬", label: "EVOLVE", desc: "Self-improve website", color: "#a855f7" },
    { id: "monetize", icon: "💰", label: "MONETIZE", desc: "Revenue optimization", color: "#f59e0b" },
    { id: "traffic", icon: "🚀", label: "TRAFFIC", desc: "Visitor explosion", color: "#3b82f6" },
    { id: "seo", icon: "🔮", label: "SEO 5.0", desc: "Rank #1 everywhere", color: "#06b6d4" },
    { id: "content", icon: "📝", label: "CONTENT", desc: "Auto-generate articles", color: "#ec4899" },
    { id: "design", icon: "🎨", label: "DESIGN", desc: "Neural UI/UX", color: "#8b5cf6" },
    { id: "ads", icon: "💵", label: "ADS", desc: "Ad revenue AI", color: "#ef4444" },
    { id: "empire", icon: "👑", label: "EMPIRE", desc: "Multi-site expansion", color: "#f97316" },
    { id: "analyze", icon: "🔬", label: "ANALYZE", desc: "Deep site analysis", color: "#14b8a6" },
    { id: "clone", icon: "🧬", label: "CLONE", desc: "Beat competitors", color: "#e11d48" },
  ];

  const evolutionStages = [
    "Alpha Genesis", "Neural Awakening", "Quantum Growth", 
    "Empire Formation", "Singularity"
  ];

  return (
    <main style={{
      background: "linear-gradient(135deg, #000000, #0a0a1a, #000033)",
      minHeight: "100vh", color: "white",
      padding: "24px", fontFamily: "system-ui, sans-serif",
    }}>
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{
          fontSize: "clamp(32px, 6vw, 64px)",
          fontWeight: "bold",
          background: "linear-gradient(to right, #00ff88, #00aaff, #ff00ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "8px",
        }}>
          🌐 WEBSITE EMPIRE 2060
        </h1>
        <p style={{ color: "#888", fontSize: "16px" }}>
          Autonomous AI Website Builder · Self-Monetizing · Self-Growing · Infinite Scale
        </p>
        <div style={{
          display: "flex", gap: "12px", justifyContent: "center",
          flexWrap: "wrap", marginTop: "16px",
        }}>
          {[
            { label: "🧠 AI Model", value: "LLAMA 70B + FAL AI" },
            { label: "⚡ Status", value: "SENTIENT" },
            { label: "🌐 Sites Built", value: "∞" },
            { label: "💰 Revenue Gen", value: "AUTONOMOUS" },
          ].map((s, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.05)",
              padding: "8px 16px", borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.1)",
              fontSize: "13px",
            }}>
              {s.label}: <span style={{ color: "#00ff88" }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* EVOLUTION BAR */}
      <div style={{
        background: "rgba(255,255,255,0.05)",
        padding: "16px", borderRadius: "16px",
        marginBottom: "24px", border: "1px solid rgba(255,255,255,0.1)",
      }}>
        <p style={{ marginBottom: "8px", color: "#888" }}>
          🧬 Evolution Stage: {evolutionStages[evolutionStage]}
        </p>
        <div style={{
          background: "rgba(255,255,255,0.1)",
          borderRadius: "10px", height: "8px", overflow: "hidden",
        }}>
          <div style={{
            width: `${((evolutionStage + 1) / 5) * 100}%`,
            height: "100%",
            background: "linear-gradient(to right, #00ff88, #00aaff)",
            transition: "width 1s ease",
            borderRadius: "10px",
          }} />
        </div>
      </div>

      {/* MAIN GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px", marginBottom: "24px",
      }}>
        {/* INPUT PANEL */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          padding: "24px", borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.1)",
          gridColumn: "span 2",
        }}>
          <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>🎯 Empire Command Center</h2>
          
          <div style={{ display: "grid", gap: "12px" }}>
            <input
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="🎯 Enter Niche (e.g., AI Tools, Fitness, Finance)..."
              style={{
                width: "100%", padding: "14px", borderRadius: "12px",
                background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)",
                color: "white", fontSize: "15px",
              }}
            />
            
            {action === "analyze" && (
              <input
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="🌐 Enter domain to analyze..."
                style={{
                  width: "100%", padding: "14px", borderRadius: "12px",
                  background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)",
                  color: "white", fontSize: "15px",
                }}
              />
            )}

            {action === "traffic" && (
              <input
                value={trafficTarget}
                onChange={(e) => setTrafficTarget(e.target.value)}
                placeholder="🚀 Traffic target (visitors/month)"
                style={{
                  width: "100%", padding: "14px", borderRadius: "12px",
                  background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)",
                  color: "white", fontSize: "15px",
                }}
              />
            )}

            {action === "clone" && (
              <input
                value={competitors}
                onChange={(e) => setCompetitors(e.target.value)}
                placeholder="🔍 Competitor URLs (comma separated)..."
                style={{
                  width: "100%", padding: "14px", borderRadius: "12px",
                  background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)",
                  color: "white", fontSize: "15px",
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "10px", marginBottom: "24px",
      }}>
        {actions.map((a) => (
          <button
            key={a.id}
            onClick={() => setAction(a.id)}
            disabled={loading}
            style={{
              padding: "16px", borderRadius: "14px",
              border: action === a.id ? `2px solid ${a.color}` : "1px solid rgba(255,255,255,0.1)",
              background: action === a.id ? `${a.color}22` : "rgba(255,255,255,0.05)",
              color: action === a.id ? a.color : "#888",
              cursor: "pointer", textAlign: "left",
              transition: "all 0.3s",
            }}
          >
            <div style={{ fontSize: "24px", marginBottom: "4px" }}>{a.icon}</div>
            <div style={{ fontWeight: "bold", fontSize: "14px" }}>{a.label}</div>
            <div style={{ fontSize: "11px", opacity: 0.7 }}>{a.desc}</div>
          </button>
        ))}
      </div>

      {/* EXECUTE BUTTON */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <button
          onClick={executeAction}
          disabled={loading || !niche}
          style={{
            padding: "20px 60px", borderRadius: "16px",
            border: "none",
            background: loading ? "#333" : "linear-gradient(135deg, #00ff88, #00aaff, #ff00ff)",
            color: loading ? "#888" : "white",
            fontSize: "20px", fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.3s",
            animation: loading ? "none" : "pulse 2s infinite",
          }}
        >
          {loading ? "🧠 Processing Quantum AI..." : `🚀 Execute ${actions.find(a => a.id === action)?.label}`}
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div style={{
          background: "rgba(0,255,136,0.1)",
          padding: "24px", borderRadius: "20px",
          border: "1px solid #00ff88",
          marginBottom: "24px",
        }}>
          <h3 style={{ color: "#00ff88", marginBottom: "16px" }}>
            ✅ {result.action?.toUpperCase()} Complete
          </h3>
          
          {result.blueprint && (
            <div>
              <h4>🌟 Website Blueprint</h4>
              <pre style={{
                whiteSpace: "pre-wrap", background: "rgba(0,0,0,0.5)",
                padding: "16px", borderRadius: "12px", maxHeight: "400px",
                overflowY: "auto", fontSize: "13px", lineHeight: "1.6",
              }}>
                {JSON.stringify(result.blueprint, null, 2)}
              </pre>
            </div>
          )}

          {result.evolution && (
            <div>
              <p>Stage: {result.currentStage} → {result.nextStage} ({result.progress}%)</p>
              <pre style={{
                whiteSpace: "pre-wrap", background: "rgba(0,0,0,0.5)",
                padding: "16px", borderRadius: "12px", maxHeight: "400px",
                overflowY: "auto", fontSize: "13px", lineHeight: "1.6",
              }}>
                {result.evolution}
              </pre>
            </div>
          )}

          {result.strategy && (
            <pre style={{
              whiteSpace: "pre-wrap", background: "rgba(0,0,0,0.5)",
              padding: "16px", borderRadius: "12px", maxHeight: "500px",
              overflowY: "auto", fontSize: "13px", lineHeight: "1.8",
            }}>
              {result.strategy}
            </pre>
          )}

          {result.designPreview && (
            <div style={{ marginBottom: "16px" }}>
              <img src={result.designPreview} alt="Design Preview" 
                style={{ width: "100%", borderRadius: "12px" }} />
            </div>
          )}

          {result.code && (
            <div>
              <h4>🎨 Generated Code</h4>
              <pre style={{
                whiteSpace: "pre-wrap", background: "rgba(0,0,0,0.5)",
                padding: "16px", borderRadius: "12px", maxHeight: "400px",
                overflowY: "auto", fontSize: "12px",
              }}>
                {result.code}
              </pre>
            </div>
          )}

          {result.calendar && (
            <pre style={{
              whiteSpace: "pre-wrap", background: "rgba(0,0,0,0.5)",
              padding: "16px", borderRadius: "12px", maxHeight: "500px",
              overflowY: "auto", fontSize: "13px", lineHeight: "1.8",
            }}>
              {result.calendar}
            </pre>
          )}

          {result.analysis && (
            <pre style={{
              whiteSpace: "pre-wrap", background: "rgba(0,0,0,0.5)",
              padding: "16px", borderRadius: "12px", maxHeight: "500px",
              overflowY: "auto", fontSize: "13px", lineHeight: "1.8",
            }}>
              {result.analysis}
            </pre>
          )}

          {result.plan && (
            <pre style={{
              whiteSpace: "pre-wrap", background: "rgba(0,0,0,0.5)",
              padding: "16px", borderRadius: "12px", maxHeight: "500px",
              overflowY: "auto", fontSize: "13px", lineHeight: "1.8",
            }}>
              {result.plan}
            </pre>
          )}
        </div>
      )}

      {/* LOGS */}
      {log.length > 0 && (
        <div style={{
          background: "rgba(0,0,0,0.5)",
          padding: "20px", borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.1)",
        }}>
          <h3 style={{ marginBottom: "12px" }}>📡 Quantum Log</h3>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {log.map((entry, i) => (
              <p key={i} style={{
                fontSize: "12px", color: "#888",
                padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
                fontFamily: "monospace",
              }}>
                {entry}
              </p>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0,255,136,0.3); }
          50% { box-shadow: 0 0 40px rgba(0,170,255,0.5), 0 0 60px rgba(255,0,255,0.3); }
        }
      `}</style>
    </main>
  );
}
