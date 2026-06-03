"use client";

import { useState, useEffect } from "react";

interface Activity {
  id: string;
  message: string;
  icon: string;
  timestamp: Date;
}

export default function LiveActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([
    { id: "1", message: "AI system initialized", icon: "🚀", timestamp: new Date() },
    { id: "2", message: "YouTube AI is online", icon: "📺", timestamp: new Date() },
    { id: "3", message: "CEO AI is monitoring", icon: "👑", timestamp: new Date() },
  ]);

  useEffect(() => {
    const activitiesList = [
      { message: "Analyzing trending topics", icon: "🔥" },
      { message: "Generating script ideas", icon: "📝" },
      { message: "Optimizing thumbnails", icon: "🖼️" },
      { message: "Checking revenue metrics", icon: "💰" },
      { message: "Learning from past videos", icon: "🧠" },
      { message: "Scanning for viral patterns", icon: "📈" },
      { message: "Preparing content schedule", icon: "📅" },
      { message: "AI agent working in background", icon: "⚡" },
    ];

    const interval = setInterval(() => {
      const randomActivity = activitiesList[Math.floor(Math.random() * activitiesList.length)];
      addActivity(randomActivity.message, randomActivity.icon);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  function addActivity(message: string, icon: string) {
    setActivities(prev => [
      { id: Date.now().toString(), message, icon, timestamp: new Date() },
      ...prev.slice(0, 9),
    ]);
  }

  return (
    <div style={{
      background: "#0f172a",
      borderRadius: "16px",
      padding: "16px",
      border: "1px solid #1e293b",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
        <span style={{ fontSize: "20px" }}>⚡</span>
        <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>LIVE ACTIVITY</h3>
        <span style={{
          background: "#22c55e",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          display: "inline-block",
          animation: "pulse 1.5s infinite",
        }} />
      </div>
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        {activities.map(activity => (
          <div key={activity.id} style={{
            padding: "10px 0",
            borderBottom: "1px solid #1e293b",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "13px",
          }}>
            <span>{activity.icon}</span>
            <span style={{ flex: 1 }}>{activity.message}</span>
            <span style={{ color: "#64748b", fontSize: "10px" }}>
              {activity.timestamp.toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
