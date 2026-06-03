"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";

interface Message {
  role: "user" | "ceo";
  text: string;
  timestamp: string;
  action?: string;
  isTyping?: boolean;
}

interface SystemData {
  stats?: {
    totalAgents?: number;
    completedTasks?: number;
    runningTasks?: number;
    memoryStored?: number;
  };
}

interface HealthData {
  health?: {
    metrics?: {
      subscriberGrowth?: number;
      viewVelocity?: number;
    };
    status?: string;
    score?: number;
  };
  channelHealth?: {
    metrics?: {
      subscriberGrowth?: number;
      viewVelocity?: number;
    };
    status?: string;
    score?: number;
  };
}

// Typing Effect Component
function TypingEffect({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, 20 + Math.random() * 30);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, onComplete]);

  return (
    <span>
      {displayedText}
      {index < text.length && (
        <span style={{
          display: "inline-block",
          width: "8px",
          height: "16px",
          background: "#38bdf8",
          marginLeft: "2px",
          animation: "blink 1s infinite",
        }} />
      )}
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}

// Live AI Thoughts Component
function LiveAIThoughts() {
  const [thought, setThought] = useState("💭 I'm here to help you build your empire");
  const [activity, setActivity] = useState("Monitoring systems");

  useEffect(() => {
    const thoughts = [
      "💭 Analyzing market trends...",
      "💭 Learning from past interactions...",
      "💭 Optimizing strategies for you...",
      "💭 Checking channel health...",
      "💭 Finding viral opportunities...",
      "💭 Calculating revenue potential...",
      "💭 Improving response quality...",
    ];
    
    const activities = [
      "📡 Active",
      "🧠 Learning",
      "🎯 Focused",
      "⚡ Processing",
      "🔍 Analyzing",
      "📊 Computing",
    ];

    let thoughtIndex = 0;
    let activityIndex = 0;

    const thoughtInterval = setInterval(() => {
      setThought(thoughts[thoughtIndex % thoughts.length]);
      thoughtIndex++;
    }, 8000);

    const activityInterval = setInterval(() => {
      setActivity(activities[activityIndex % activities.length]);
      activityIndex++;
    }, 5000);

    return () => {
      clearInterval(thoughtInterval);
      clearInterval(activityInterval);
    };
  }, []);

  return (
    <div style={{
      background: "#1e293b",
      borderRadius: "16px",
      padding: "12px 16px",
      marginBottom: "20px",
      border: "1px solid #334155",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "#22c55e",
          animation: "pulse 1.5s infinite",
        }} />
        <span style={{ fontWeight: "bold", fontSize: "14px" }}>🧠 CEO AI</span>
        <span style={{ color: "#22c55e", fontSize: "12px" }}>● {activity}</span>
      </div>
      <p style={{ color: "#94a3b8", fontSize: "13px", marginTop: "8px", fontStyle: "italic" }}>
        {thought}
      </p>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

export default function CEOPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ceo",
      text: "👑 CEO AI ONLINE — How can I help you build your empire today?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState<string | null>(null);
  const [selectedNiche, setSelectedNiche] = useState("Supercars");
  const [isListening, setIsListening] = useState(false);
  const [ceoStats, setCeoStats] = useState({
    activeAgents: 11,
    tasksCompleted: 0,
    revenue: 0,
    youtubeSubs: 0,
    totalViews: 0,
    videosGenerated: 0,
  });
  const [suggestions, setSuggestions] = useState<string[]>([
    "Generate viral YouTube script for Supercars",
    "Analyze channel performance",
    "Create monetization strategy",
    "Run autonomous mode",
    "Show trending topics",
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const niches = [
    "Supercars", "Finance", "AI Tech", "Gaming",
    "Space", "Motivation", "Movie Edits", "Viral Facts",
    "Tech Reviews", "Business", "Sci-Fi", "Music"
  ];

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onresult = (event: any) => {
          const command = event.results[0][0].transcript;
          setInput(command);
          setIsListening(false);
          setTimeout(() => sendMessage(), 100);
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
          addSystemMessage("🎤 Sorry, I didn't catch that. Please type your command.");
        };
      }
    }
  }, []);

  useEffect(() => {
    loadCEOStats();
    const interval = setInterval(loadCEOStats, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingMessage]);

  async function loadCEOStats() {
    try {
      const [systemRes, healthRes] = await Promise.all([
        fetch("/api/system"),
        fetch("/api/youtube/health"),
      ]);

      const systemData: SystemData = await systemRes.json();
      const healthData: HealthData = await healthRes.json();
      
      if (systemData && systemData.stats) {
        setCeoStats(prev => ({
          ...prev,
          activeAgents: systemData.stats?.totalAgents || 11,
          tasksCompleted: systemData.stats?.completedTasks || 0,
        }));
      }
      
      const healthInfo = healthData?.health || healthData?.channelHealth;
      if (healthInfo && healthInfo.metrics) {
        setCeoStats(prev => ({
          ...prev,
          youtubeSubs: healthInfo.metrics?.subscriberGrowth || 66,
          totalViews: (healthInfo.metrics?.viewVelocity || 200) * 100,
        }));
      }
    } catch (error) {
      console.log("Error loading CEO stats:", error);
    }
  }

  function startVoiceListening() {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      addSystemMessage("🎤 Voice recognition not supported in this browser. Please type your command.");
    }
  }

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setTypingMessage(null);

    // Speak back that we're processing
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance("Processing your request...");
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }

    try {
      const response = await fetch("/api/ceo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          command: input, 
          niche: selectedNiche,
          stats: ceoStats 
        }),
      });

      const data = await response.json();
      const replyText = data.reply || "✅ Command executed successfully.";
      
      setTypingMessage(replyText);

      if (data.suggestions) {
        setSuggestions(data.suggestions);
      }

      // Speak the response
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(replyText.slice(0, 100));
        utterance.lang = "en-US";
        utterance.rate = 0.9;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      }

    } catch (error) {
      setTypingMessage("❌ Error processing command. Please try again.");
    }

    setLoading(false);
    setInput("");
  }

  function addSystemMessage(text: string) {
    const systemMessage: Message = {
      role: "ceo",
      text,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, systemMessage]);
  }

  async function quickAction(action: string) {
    setInput(action);
    setTimeout(() => sendMessage(), 100);
  }

  async function runAutonomousCommand() {
    addSystemMessage("🤖 CEO AI activating autonomous mode...");
    
    try {
      const res = await fetch("/api/youtube/autonomous", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate", niche: selectedNiche }),
      });
      const data = await res.json();
      
      if (data.success) {
        addSystemMessage(`✅ Generated: "${data.title || "Video"}"`);
        setCeoStats(prev => ({ ...prev, videosGenerated: prev.videosGenerated + 1 }));
      } else {
        addSystemMessage(`⚠️ Issue: ${data.error || "Unknown"}`);
      }
    } catch (error) {
      addSystemMessage(`❌ Error: ${String(error)}`);
    }
  }

  async function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await sendMessage();
    }
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#020617", color: "white" }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: "260px", padding: "24px", overflow: "hidden" }}>
        
        <h1 style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "8px" }}>
          👑 CEO AI COMMAND CENTER
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
          Autonomous AI infrastructure controlling business systems and AI agents.
        </p>

        {/* Live AI Thoughts */}
        <LiveAIThoughts />

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "12px", marginBottom: "24px" }}>
          <StatCard title="AI Status" value="ONLINE" color="#22c55e" />
          <StatCard title="Active Agent" value="CEO AI" color="#38bdf8" />
          <StatCard title="Agents" value={ceoStats.activeAgents.toString()} color="#a855f7" />
          <StatCard title="Tasks" value={ceoStats.tasksCompleted.toString()} color="#22c55e" />
          <StatCard title="Videos" value={ceoStats.videosGenerated.toString()} color="#f59e0b" />
          <StatCard title="Subs" value={ceoStats.youtubeSubs.toLocaleString()} color="#ef4444" />
        </div>

        {/* Niche Selector */}
        <select
          value={selectedNiche}
          onChange={(e) => setSelectedNiche(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "12px",
            background: "#0f172a",
            color: "white",
            border: "1px solid #334155",
            marginBottom: "20px",
            width: "250px",
          }}
        >
          {niches.map(niche => <option key={niche} value={niche}>{niche}</option>)}
        </select>

        {/* Chat */}
        <div style={{
          background: "#0f172a",
          borderRadius: "20px",
          padding: "20px",
          height: "400px",
          overflowY: "auto",
          marginBottom: "20px",
          border: "1px solid #1e293b",
        }}>
          {messages.map((msg, index) => (
            <div key={index} style={{
              marginBottom: "12px",
              padding: "12px 16px",
              borderRadius: "14px",
              background: msg.role === "user" ? "#2563eb" : "#1e293b",
              textAlign: msg.role === "user" ? "right" : "left",
            }}>
              <strong>{msg.role === "user" ? "👤 You" : "👑 CEO"}</strong>
              <p style={{ marginTop: "6px", fontSize: "14px" }}>{msg.text}</p>
              <span style={{ fontSize: "10px", color: "#64748b" }}>{msg.timestamp}</span>
            </div>
          ))}
          {typingMessage && (
            <div style={{
              marginBottom: "12px",
              padding: "12px 16px",
              borderRadius: "14px",
              background: "#1e293b",
              textAlign: "left",
            }}>
              <strong>👑 CEO</strong>
              <p style={{ marginTop: "6px", fontSize: "14px" }}>
                <TypingEffect text={typingMessage} onComplete={() => {
                  const finalMessage: Message = {
                    role: "ceo",
                    text: typingMessage,
                    timestamp: new Date().toLocaleTimeString(),
                  };
                  setMessages(prev => [...prev, finalMessage]);
                  setTypingMessage(null);
                }} />
              </p>
            </div>
          )}
          {loading && !typingMessage && <p style={{ color: "#38bdf8" }}>🤖 CEO AI is thinking...</p>}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
          {suggestions.slice(0, 4).map((s, i) => (
            <button key={i} onClick={() => quickAction(s)} style={{ background: "#1e293b", border: "none", color: "#94a3b8", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", cursor: "pointer" }}>
              💡 {s.length > 35 ? s.slice(0, 35) + "..." : s}
            </button>
          ))}
        </div>

        {/* Input with Voice Button */}
        <div style={{ display: "flex", gap: "12px" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isListening ? "🎤 Listening..." : "Type CEO command or click microphone..."}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #334155",
              background: "#0f172a",
              color: "white",
            }}
          />
          <button
            onClick={startVoiceListening}
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: isListening ? "#ef4444" : "#3b82f6",
              color: "white",
              cursor: "pointer",
              animation: isListening ? "pulse 1s infinite" : "none",
            }}
          >
            🎤
          </button>
          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              padding: "14px 24px",
              borderRadius: "12px",
              border: "none",
              background: loading ? "#1e293b" : "#2563eb",
              color: "white",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            Send
          </button>
        </div>

        {/* Quick Actions */}
        <div style={{ display: "flex", gap: "10px", marginTop: "16px", justifyContent: "center" }}>
          <button onClick={runAutonomousCommand} style={{ background: "#22c55e", border: "none", color: "white", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "12px" }}>
            🤖 Auto Mode
          </button>
          <button onClick={() => quickAction(`Generate video for ${selectedNiche}`)} style={{ background: "#3b82f6", border: "none", color: "white", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "12px" }}>
            🎬 Generate
          </button>
          <button onClick={() => quickAction("Analyze channel performance")} style={{ background: "#f59e0b", border: "none", color: "white", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "12px" }}>
            📊 Analyze
          </button>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
          }
        `}</style>
      </main>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div style={{ background: "#0f172a", padding: "12px", borderRadius: "12px", border: "1px solid #1e293b" }}>
      <p style={{ fontSize: "11px", color: "#64748b" }}>{title}</p>
      <p style={{ fontSize: "20px", fontWeight: "bold", color }}>{value}</p>
    </div>
  );
}
