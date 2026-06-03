"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";

// Auto-scheduler that runs 24/7 in the browser
function startAutoScheduler() {
  console.log("🤖 Auto-Scheduler Started - Running 24/7");
  
  // Check every hour if content needs to be generated
  const interval = setInterval(async () => {
    const now = new Date();
    const hours = now.getHours();
    const day = now.getDay();
    
    // Schedule: Shorts every 2 days, Long video every week
    // Last generated timestamps (stored in localStorage)
    const lastShort = localStorage.getItem('last_short_generated');
    const lastLong = localStorage.getItem('last_long_generated');
    
    const twoDaysAgo = Date.now() - (2 * 24 * 60 * 60 * 1000);
    const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    
    // Generate Short if 2 days passed
    if (!lastShort || parseInt(lastShort) < twoDaysAgo) {
      console.log("🎬 Auto-generating Short...");
      try {
        const niches = ["Supercars", "AI Tech", "Finance", "Gaming", "Space"];
        const randomNiche = niches[Math.floor(Math.random() * niches.length)];
        
        await fetch("/api/youtube/autonomous", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "generate", niche: randomNiche, type: "short" })
        });
        
        localStorage.setItem('last_short_generated', Date.now().toString());
        console.log("✅ Short generated for:", randomNiche);
      } catch (e) { console.log("Auto-short failed:", e); }
    }
    
    // Generate Long video if 7 days passed
    if (!lastLong || parseInt(lastLong) < oneWeekAgo) {
      console.log("🎬 Auto-generating Long video...");
      try {
        const niches = ["Supercars", "AI Tech", "Finance", "Gaming", "Space"];
        const randomNiche = niches[Math.floor(Math.random() * niches.length)];
        
        await fetch("/api/youtube/autonomous", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "generate", niche: randomNiche, type: "long" })
        });
        
        localStorage.setItem('last_long_generated', Date.now().toString());
        console.log("✅ Long video generated for:", randomNiche);
      } catch (e) { console.log("Auto-long failed:", e); }
    }
    
  }, 60 * 60 * 1000); // Check every hour
  
  return interval;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Start auto-scheduler when site loads
    const interval = startAutoScheduler();
    
    // Keep browser awake (prevents sleep)
    const keepAlive = setInterval(() => {
      // Ping a lightweight endpoint to keep service worker active
      fetch('/api/health').catch(() => {});
    }, 5 * 60 * 1000); // Every 5 minutes
    
    return () => {
      clearInterval(interval);
      clearInterval(keepAlive);
    };
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
      </body>
    </html>
  );
}
