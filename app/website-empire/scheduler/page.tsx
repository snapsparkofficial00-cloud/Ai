"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SchedulerPage() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const [newSchedule, setNewSchedule] = useState({
    name: "", type: "build", niche: "", websiteType: "basic",
    frequency: "daily", time: "09:00",
  });

  useEffect(() => { loadSchedules(); }, []);

  async function loadSchedules() {
    const res = await fetch("/api/ai-ecosystem/scheduler", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "get-schedules" }),
    });
    const data = await res.json();
    if (data.success) setSchedules(data.schedules);
  }

  function addLog(msg: string) {
    setLog(prev => [`📅 ${new Date().toLocaleTimeString()} — ${msg}`, ...prev.slice(0, 49)]);
  }

  async function createNewSchedule() {
    addLog(`Creating: ${newSchedule.name}`);
    const res = await fetch("/api/ai-ecosystem/scheduler", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create-schedule", data: newSchedule }),
    });
    const data = await res.json();
    if (data.success) { addLog("✅ Created!"); loadSchedules(); }
  }

  async function runAllDue() {
    addLog("🔄 Running due tasks...");
    const res = await fetch("/api/ai-ecosystem/scheduler", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "run-all-due" }),
    });
    const data = await res.json();
    addLog(`✅ ${data.executed} tasks executed`);
    loadSchedules();
  }

  async function deleteSchedule(id: number) {
    await fetch("/api/ai-ecosystem/scheduler", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete-schedule", scheduleId: id }),
    });
    loadSchedules();
  }

  async function autoPilot() {
    addLog("🚀 Activating AUTO-PILOT...");
    const res = await fetch("/api/ai-ecosystem/scheduler", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "auto-pilot", data: { niches: ["AI Tools", "Gaming", "Movies", "SMM", "Mods"] } }),
    });
    const data = await res.json();
    if (data.success) addLog("✅ Auto-Pilot activated! 24/7 operation started.");
    loadSchedules();
  }

  return (
    <main style={{ background: "#000", minHeight: "100vh", color: "white", padding: "24px", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
          <Link href="/website-empire"><button style={navBtn}>🧠 Strategy</button></Link>
          <Link href="/website-empire/builder"><button style={navBtn}>🏗️ Builder</button></Link>
          <Link href="/website-empire/projects"><button style={navBtn}>📁 Projects</button></Link>
          <Link href="/website-empire/ecosystem"><button style={navBtn}>🧬 Ecosystem</button></Link>
          <button style={{ ...navBtn, background: "#ff9800", color: "#000", fontWeight: "bold" }}>📅 Scheduler</button>
        </div>

        <h1 style={{ fontSize: "32px", color: "#ff9800" }}>📅 AI SCHEDULER</h1>
        <p style={{ color: "#888", marginBottom: "24px" }}>Auto-build, auto-publish, auto-optimize — 24/7 autonomous operation</p>

        {/* CREATE SCHEDULE */}
        <div style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "16px", marginBottom: "24px" }}>
          <h3>➕ Create New Schedule</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px", marginTop: "12px" }}>
            <input value={newSchedule.name} onChange={(e) => setNewSchedule({...newSchedule, name: e.target.value})}
              placeholder="Schedule name" style={inputStyle} />
            <select value={newSchedule.type} onChange={(e) => setNewSchedule({...newSchedule, type: e.target.value})} style={inputStyle}>
              <option value="build">🏗️ Build</option><option value="publish">🚀 Publish</option>
              <option value="optimize">🔧 Optimize</option><option value="analyze">📊 Analyze</option>
              <option value="all">🔄 Full Cycle</option>
            </select>
            <input value={newSchedule.niche} onChange={(e) => setNewSchedule({...newSchedule, niche: e.target.value})}
              placeholder="Niche" style={inputStyle} />
            <select value={newSchedule.frequency} onChange={(e) => setNewSchedule({...newSchedule, frequency: e.target.value})} style={inputStyle}>
              <option value="once">Once</option><option value="daily">Daily</option>
              <option value="weekly">Weekly</option><option value="every_2_days">Every 2 Days</option>
              <option value="every_3_days">Every 3 Days</option><option value="monthly">Monthly</option>
            </select>
            <input type="time" value={newSchedule.time} onChange={(e) => setNewSchedule({...newSchedule, time: e.target.value})} style={inputStyle} />
          </div>
          <button onClick={createNewSchedule} style={{ marginTop: "12px", padding: "12px 24px", borderRadius: "10px", background: "#ff9800", border: "none", color: "#000", fontWeight: "bold", cursor: "pointer" }}>
            ➕ Create Schedule
          </button>
        </div>

        {/* QUICK ACTIONS */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
          <button onClick={runAllDue} style={actionBtn("#4caf50")}>🔄 Run Due Tasks</button>
          <button onClick={autoPilot} style={actionBtn("#7c4dff")}>🚀 Activate AUTO-PILOT</button>
        </div>

        {/* SCHEDULES LIST */}
        <div style={{ display: "grid", gap: "10px" }}>
          {schedules.map((s: any) => (
            <div key={s.id} style={{ background: "rgba(255,255,255,0.05)", padding: "16px", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <p style={{ fontWeight: "bold" }}>{s.name}</p>
                <p style={{ fontSize: "12px", color: "#888" }}>
                  {s.type} | {s.frequency} | {s.time} | {s.niche || "All"} 
                </p>
                <p style={{ fontSize: "11px", color: "#ff9800" }}>
                  Next: {s.next_run ? new Date(s.next_run).toLocaleString() : "N/A"}
                </p>
              </div>
              <button onClick={() => deleteSchedule(s.id)}
                style={{ padding: "8px 16px", borderRadius: "8px", background: "#ef4444", border: "none", color: "white", cursor: "pointer" }}>
                🗑️
              </button>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}

const navBtn: React.CSSProperties = { padding: "10px 20px", borderRadius: "10px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", cursor: "pointer" };
const inputStyle: React.CSSProperties = { padding: "10px", borderRadius: "8px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", color: "white", fontSize: "14px" };
const actionBtn = (color: string): React.CSSProperties => ({ padding: "14px 24px", borderRadius: "12px", background: color, border: "none", color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "15px" });
