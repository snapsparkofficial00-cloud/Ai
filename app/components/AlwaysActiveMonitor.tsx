"use client";

import { useState, useEffect } from "react";

export default function AlwaysActiveMonitor() {
  const [activeTasks, setActiveTasks] = useState<string[]>([]);
  const [lastActivity, setLastActivity] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Start continuous monitoring
    const interval = setInterval(() => {
      checkAndExecute();
    }, 60000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, []);

  async function checkAndExecute() {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      const res = await fetch("/api/cron/ai-brain");
      if (res.ok) {
        const data = await res.json();
        if (data.tasksCompleted > 0) {
          setLastActivity(`Completed ${data.tasksCompleted} tasks`);
          setActiveTasks(prev => [`✅ ${data.tasksCompleted} tasks completed at ${new Date().toLocaleTimeString()}`, ...prev].slice(0, 5));
        }
      }
    } catch (error) {
      console.log("Monitor error:", error);
    }
    
    setIsProcessing(false);
  }

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: "#0f172a",
      borderRadius: "12px",
      padding: "10px 14px",
      border: "1px solid #22c55e",
      fontSize: "10px",
      maxWidth: "220px",
      zIndex: 1000,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
        <div style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#22c55e",
          animation: "pulse 1s infinite",
        }} />
        <span style={{ fontWeight: "bold", fontSize: "10px" }}>⚡ SYSTEM ACTIVE</span>
      </div>
      {lastActivity && (
        <p style={{ color: "#38bdf8", fontSize: "9px", margin: 0 }}>
          {lastActivity}
        </p>
      )}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
