"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "./components/Sidebar";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: "ai", text: "👑 AI CEO ONLINE — How can I help you build your empire today?" },
  ]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Real stats
  const [systemStats, setSystemStats] = useState<any>(null);
  const [ytSubs, setYtSubs] = useState("0");
  const [ytViews, setYtViews] = useState("0");
  const [ytVideos, setYtVideos] = useState("0");
  const [logs, setLogs] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    loadAll();
    const interval = setInterval(loadAll, 5000);
    return () => clearInterval(interval);
  }, []);

  async function loadAll() {
    try {
      const [sysRes, ytRes, logsRes, workflowRes] = await Promise.all([
        fetch("/api/system"),
        fetch("/api/youtube/stats"),
        fetch("/api/logs"),
        fetch("/api/workflow"),
      ]);

      const sys = await sysRes.json();
      const yt = await ytRes.json();
      const logsData = await logsRes.json();
      const workflow = await workflowRes.json();

      if (sys?.stats) setSystemStats(sys.stats);
      if (yt?.subscribers) {
        setYtSubs(Number(yt.subscribers).toLocaleString());
        setYtViews(Number(yt.views).toLocaleString());
        setYtVideos(yt.videos);
      }
      if (logsData?.logs) setLogs(logsData.logs.slice(0, 6));
      if (workflow?.tasks) setTasks(workflow.tasks.slice(0, 5));
    } catch (e) {
      console.log(e);
    }
  }

  async function sendMessage() {
    if (!message) return;
    const currentMessage = message;
    setMessages((prev) => [...prev, { role: "user", text: currentMessage }]);
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentMessage }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data.reply || "⚠️ No response" },
      ]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", text: "❌ AI ERROR" }]);
    }
    setLoading(false);
    loadAll();
  }

  return (
    <>
      <Sidebar onToggle={setSidebarOpen} />
      <main style={{
        background: "#020617",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial",
        padding: "24px",
        marginLeft: sidebarOpen ? "280px" : "0px",
        transition: "margin-left 0.3s ease",
        overflowX: "hidden",
      }}>

        {/* HERO */}
        <section style={{ padding: "60px 0 40px" }}>
          <h1 style={{
            fontSize: "clamp(36px,8vw,72px)",
            fontWeight: "bold",
            lineHeight: "1.1",
            marginBottom: "20px",
            background: "linear-gradient(to right,#38bdf8,#818cf8,#f472b6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            🚀 FUTURE AI<br />ECOSYSTEM
          </h1>
          <p style={{ fontSize: "20px", color: "#94a3b8", maxWidth: "800px", lineHeight: "1.8", marginBottom: "32px" }}>
            Autonomous AI business infrastructure with self-learning systems,
            automation workflows, analytics intelligence, and advanced AI teams.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <HeroButton href="/youtube" text="🚀 YouTube OS" />
            <HeroButton href="/agents" text="🧠 AI Agents" />
            <HeroButton href="/automation" text="⚡ Automation" />
            <HeroButton href="/assistant" text="🤖 AI Assistant" />
          </div>
        </section>

        {/* REAL STATS */}
        <section style={{ marginBottom: "48px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: "20px",
          }}>
            <StatCard
              title="🤖 Active Agents"
              value={systemStats ? String(systemStats.totalAgents) : "11"}
              color="#38bdf8"
              live
            />
            <StatCard
              title="✅ Tasks Completed"
              value={systemStats ? String(systemStats.completedTasks) : "0"}
              color="#22c55e"
              live
            />
            <StatCard
              title="⚡ Running Now"
              value={systemStats ? String(systemStats.runningTasks) : "0"}
              color="#f59e0b"
              live
            />
            <StatCard
              title="🧠 Memories Stored"
              value={systemStats ? String(systemStats.memoryStored) : "0"}
              color="#a855f7"
              live
            />
            <StatCard
              title="👥 YouTube Subs"
              value={ytSubs}
              color="#ef4444"
              live
            />
            <StatCard
              title="📺 Total Views"
              value={ytViews}
              color="#38bdf8"
              live
            />
            <StatCard
              title="🎬 Videos"
              value={ytVideos}
              color="#f59e0b"
              live
            />
            <StatCard
              title="📊 System Logs"
              value={systemStats ? String(systemStats.logs) : "0"}
              color="#ec4899"
              live
            />
          </div>
        </section>

        {/* CEO CHAT */}
        <section style={{ marginBottom: "48px" }}>
          <div style={{
            background: "#0f172a",
            padding: "32px",
            borderRadius: "24px",
            border: "1px solid #1e293b",
          }}>
            <h2 style={{ fontSize: "clamp(24px,4vw,36px)", marginBottom: "20px" }}>
              👑 CEO AI CHAT
            </h2>
            <div style={{
              background: "#020617",
              padding: "20px",
              borderRadius: "16px",
              minHeight: "280px",
              maxHeight: "400px",
              overflowY: "auto",
              marginBottom: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              border: "1px solid #1e293b",
            }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  background: msg.role === "user" ? "#2563eb" : "#111827",
                  padding: "14px 18px",
                  borderRadius: "16px",
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  lineHeight: "1.7",
                  fontSize: "15px",
                }}>
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div style={{ color: "#38bdf8", fontSize: "14px" }}>🤖 CEO AI thinking...</div>
              )}
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Send command to CEO AI..."
                style={{
                  flex: 1,
                  minWidth: "200px",
                  padding: "16px",
                  borderRadius: "14px",
                  border: "1px solid #334155",
                  background: "#020617",
                  color: "white",
                  fontSize: "16px",
                }}
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                style={{
                  background: loading ? "#1e293b" : "linear-gradient(to right,#2563eb,#38bdf8)",
                  border: "none",
                  color: "white",
                  padding: "16px 28px",
                  borderRadius: "14px",
                  fontWeight: "bold",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "16px",
                }}
              >
                🚀 Send
              </button>
            </div>
          </div>
        </section>

        {/* LIVE TASKS + LOGS SIDE BY SIDE */}
        <section style={{ marginBottom: "48px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(380px,1fr))",
            gap: "24px",
          }}>

            {/* LIVE TASKS */}
            <div style={{
              background: "#0f172a",
              padding: "28px",
              borderRadius: "24px",
              border: "1px solid #1e293b",
            }}>
              <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>⚡ Live Tasks</h2>
              {tasks.length === 0 ? (
                <p style={{ color: "#475569" }}>No tasks yet. Run an agent to see activity.</p>
              ) : (
                tasks.map((task: any, i) => (
                  <div key={i} style={{
                    padding: "12px 16px",
                    borderRadius: "12px",
                    background: "#020617",
                    marginBottom: "10px",
                    border: "1px solid #1e293b",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: "bold" }}>{task.agent}</p>
                      <p style={{ fontSize: "12px", color: "#64748b" }}>
                        {task.input?.slice(0, 50)}...
                      </p>
                    </div>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: "bold",
                      padding: "4px 10px",
                      borderRadius: "999px",
                      background:
                        task.status === "completed" ? "#166534" :
                        task.status === "running" ? "#1e3a5f" :
                        task.status === "failed" ? "#7f1d1d" : "#1e293b",
                      color:
                        task.status === "completed" ? "#22c55e" :
                        task.status === "running" ? "#38bdf8" :
                        task.status === "failed" ? "#ef4444" : "#94a3b8",
                    }}>
                      {task.status?.toUpperCase()}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* LIVE LOGS */}
            <div style={{
              background: "#0f172a",
              padding: "28px",
              borderRadius: "24px",
              border: "1px solid #1e293b",
            }}>
              <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>📡 Live Logs</h2>
              {logs.length === 0 ? (
                <p style={{ color: "#475569" }}>No logs yet. Activity appears here in real time.</p>
              ) : (
                logs.map((log: any, i) => (
                  <div key={i} style={{
                    padding: "10px 14px",
                    borderBottom: "1px solid #1e293b",
                    fontFamily: "monospace",
                    fontSize: "12px",
                    color: log.type === "ERROR" ? "#ef4444" :
                           log.type === "SUCCESS" ? "#22c55e" : "#38bdf8",
                  }}>
                    <span style={{ color: "#475569" }}>
                      {new Date(log.created_at).toLocaleTimeString()}
                    </span>{" "}
                    [{log.type}] {log.agent} — {log.message}
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* AGENTS GRID */}
        <section style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "clamp(28px,5vw,48px)", marginBottom: "32px", fontWeight: "bold" }}>
            🧠 MULTI AI AGENTS
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "20px",
          }}>
            {[
              { title: "📺 YouTube AI", desc: "Viral scripts, SEO, growth strategy.", status: "ACTIVE", color: "#ef4444", href: "/youtube" },
              { title: "📸 Instagram AI", desc: "Reels, captions, hashtag growth.", status: "ACTIVE", color: "#ec4899", href: "/agents" },
              { title: "🌐 Website AI", desc: "Fullstack apps and SaaS builder.", status: "ACTIVE", color: "#3b82f6", href: "/agents" },
              { title: "💰 Revenue AI", desc: "Monetization and scaling engine.", status: "ACTIVE", color: "#22c55e", href: "/agents" },
              { title: "📡 Telegram AI", desc: "Remote control and notifications.", status: "ACTIVE", color: "#06b6d4", href: "/telegram" },
              { title: "🎬 Video AI", desc: "AI video generation with Kling + Fal.", status: "ACTIVE", color: "#f59e0b", href: "/video-editor" },
            ].map((agent, i) => (
              <Link key={i} href={agent.href} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "#0f172a",
                  padding: "24px",
                  borderRadius: "20px",
                  border: "1px solid #1e293b",
                  borderTop: `3px solid ${agent.color}`,
                  cursor: "pointer",
                  transition: "0.2s",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <h2 style={{ fontSize: "22px" }}>{agent.title}</h2>
                    <span style={{
                      background: agent.color,
                      padding: "4px 10px",
                      borderRadius: "999px",
                      fontSize: "11px",
                      fontWeight: "bold",
                      color: "#000",
                    }}>{agent.status}</span>
                  </div>
                  <p style={{ color: "#94a3b8", lineHeight: "1.6", fontSize: "15px" }}>{agent.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* YOUTUBE QUICK MODULES */}
        <section style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "clamp(24px,5vw,40px)", marginBottom: "24px", fontWeight: "bold" }}>
            🚀 YouTube AI Modules
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
            gap: "14px",
          }}>
            {[
              { href: "/youtube/trends", label: "🔥 Trends", color: "#f97316" },
              { href: "/youtube/scripts", label: "📝 Scripts", color: "#3b82f6" },
              { href: "/youtube/hashtags", label: "#️⃣ Hashtags", color: "#22c55e" },
              { href: "/youtube/calendar", label: "📅 Calendar", color: "#eab308" },
              { href: "/voice", label: "🎙 Voice AI", color: "#8b5cf6" },
              { href: "/video-editor", label: "🎬 Video AI", color: "#ef4444" },
              { href: "/youtube/analytics", label: "📊 Analytics", color: "#ec4899" },
              { href: "/youtube/manager", label: "📺 Manager", color: "#06b6d4" },
              { href: "/youtube/studio", label: "🎥 Studio", color: "#6366f1" },
              { href: "/youtube/shorts-factory", label: "⚡ Shorts", color: "#10b981" },
              { href: "/youtube/empire", label: "👑 Empire", color: "#f59e0b" },
              { href: "/youtube/mcn", label: "🌎 MCN AI", color: "#64748b" },
            ].map((item, i) => (
              <Link key={i} href={item.href} style={{ textDecoration: "none" }}>
                <div style={{
                  background: item.color,
                  padding: "18px 14px",
                  borderRadius: "16px",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "15px",
                  color: "white",
                  cursor: "pointer",
                }}>
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </>
  );
}

function HeroButton({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href} style={{
      background: "linear-gradient(to right,#2563eb,#38bdf8)",
      padding: "16px 24px",
      borderRadius: "16px",
      color: "white",
      textDecoration: "none",
      fontSize: "18px",
      fontWeight: "bold",
    }}>
      {text}
    </Link>
  );
}

function StatCard({ title, value, color, live }: {
  title: string; value: string; color: string; live?: boolean;
}) {
  return (
    <div style={{
      background: "#0f172a",
      padding: "24px",
      borderRadius: "20px",
      border: "1px solid #1e293b",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <p style={{ fontSize: "13px", color: "#64748b" }}>{title}</p>
        {live && (
          <span style={{
            width: "8px", height: "8px",
            borderRadius: "50%",
            background: "#22c55e",
            display: "inline-block",
            boxShadow: "0 0 6px #22c55e",
          }} />
        )}
      </div>
      <p style={{ fontSize: "36px", fontWeight: "bold", color }}>{value}</p>
    </div>
  );
}
