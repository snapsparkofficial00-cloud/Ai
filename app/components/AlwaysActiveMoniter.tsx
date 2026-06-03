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
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  async function checkAndExecute() {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      const res = await fetch("/api/cron/ai-brain");
      const data = await res.json();
      
      if (data.tasksCompleted > 0) {
        setLastActivity(`Completed ${data.tasksCompleted} tasks at ${new Date().toLocaleTimeString()}`);
        setActiveTasks(prev => [`✅ ${data.tasksCompleted} tasks completed`, ...prev].slice(0, 10));
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
      padding: "12px",
      border: "1px solid #22c55e",
      fontSize: "11px",
      maxWidth: "250px",
      zIndex: 1000,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
        <div style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#22c55e",
          animation: "pulse 1s infinite",
        }} />
        <span style={{ fontWeight: "bold", fontSize: "12px" }}>⚡ ACTIVE</span>
        <span style={{ color: "#64748b", fontSize: "10px" }}>24/7 Processing</span>
      </div>
      {lastActivity && (
        <p style={{ color: "#38bdf8", fontSize: "10px", marginBottom: "4px" }}>
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
