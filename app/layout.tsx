"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import AlwaysActiveMonitor from "./components/AlwaysActiveMonitor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [systemActive, setSystemActive] = useState(true);

  useEffect(() => {
    // Start the always-active system
    async function initializeActiveSystem() {
      console.log("🚀 AI OS - ALWAYS ACTIVE MODE INITIALIZED");
      
      // Start background processor
      await fetch("/api/tasks/active").catch(() => {});
      
      // Start auto scheduler
      await fetch("/api/cron/ai-brain").catch(() => {});
    }
    
    initializeActiveSystem();
    
    // Keep system alive with heartbeat
    const heartbeat = setInterval(async () => {
      await fetch("/api/cron/ai-brain").catch(() => {});
    }, 60000); // Every minute
    
    return () => clearInterval(heartbeat);
  }, []);

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#020617" }}>
        <Sidebar onToggle={setSidebarOpen} />
        <div style={{
          marginLeft: sidebarOpen ? "280px" : "0px",
          transition: "margin-left 0.3s ease",
          minHeight: "100vh",
        }}>
          {children}
        </div>
        {systemActive && <AlwaysActiveMonitor />}
      </body>
    </html>
  );
}
