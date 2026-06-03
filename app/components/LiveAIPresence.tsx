"use client";

import { useState, useEffect } from "react";

interface AIThought {
  id: string;
  message: string;
  type: "thinking" | "action" | "learning" | "speaking";
  timestamp: Date;
}

export default function LiveAIPresence() {
  const [thoughts, setThoughts] = useState<AIThought[]>([
    { id: "1", message: "👑 CEO AI is awake and monitoring...", type: "speaking", timestamp: new Date() },
  ]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentActivity, setCurrentActivity] = useState("Idle - Waiting for commands");

  // AI "brain" that constantly generates thoughts
  useEffect(() => {
    const activities = [
      "Analyzing YouTube trends",
      "Learning from past videos",
      "Optimizing thumbnail strategies",
      "Monitoring channel performance",
      "Generating content ideas",
      "Checking revenue metrics",
      "Scanning viral topics",
      "Improving script quality",
      "Testing new hooks",
      "Studying audience behavior",
    ];

    let activityIndex = 0;
    const activityInterval = setInterval(() => {
      setCurrentActivity(`${activities[activityIndex]}...`);
      activityIndex = (activityIndex + 1) % activities.length;
    }, 8000);

    return () => clearInterval(activityInterval);
  }, []);

  // Simulate AI "thinking" randomly
  useEffect(() => {
    const thinkingMessages = [
      "Hmm, that's interesting...",
      "I see a pattern here",
      "Learning from this interaction",
      "Optimizing for better results",
      "Checking quality metrics",
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomThought = thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)];
        addThought(randomThought, "thinking");
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  function addThought(message: string, type: AIThought["type"]) {
    setThoughts(prev => [
      { id: Date.now().toString(), message, type, timestamp: new Date() },
      ...prev.slice(0, 4),
    ]);
  }

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: 1000,
      maxWidth: "320px",
    }}>
      {/* AI Avatar / Presence Indicator */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "#0f172a",
        padding: "12px 20px",
        borderRadius: "50px",
        border: "1px solid #22c55e",
        boxShadow: "0 0 20px rgba(34,197,94,0.3)",
        cursor: "pointer",
        marginBottom: "12px",
      }}>
        <div style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "#22c55e",
          animation: "pulse 1.5s infinite",
        }} />
        <span style={{ fontWeight: "bold", fontSize: "14px" }}>🤖 AI CEO</span>
        <span style={{ color: "#22c55e", fontSize: "12px" }}>● ONLINE</span>
        <span style={{ color: "#64748b", fontSize: "11px" }}>{currentActivity}</span>
      </div>

      {/* Thought Bubble */}
      {thoughts.length > 0 && (
        <div style={{
          background: "#1e293b",
          borderRadius: "20px",
          padding: "12px 16px",
          border: "1px solid #334155",
          maxHeight: "200px",
          overflowY: "auto",
          fontSize: "12px",
        }}>
          {thoughts.map(thought => (
            <div key={thought.id} style={{
              padding: "6px 0",
              borderBottom: "1px solid #1e293b",
              color: thought.type === "speaking" ? "#22c55e" : thought.type === "thinking" ? "#fbbf24" : "#38bdf8",
              fontSize: "11px",
            }}>
              <span style={{ color: "#64748b", fontSize: "9px" }}>
                {thought.timestamp.toLocaleTimeString()}
              </span>{" "}
              {thought.type === "speaking" && "🗣️ "}
              {thought.type === "thinking" && "💭 "}
              {thought.type === "action" && "⚡ "}
              {thought.message}
            </div>
          ))}
        </div>
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
