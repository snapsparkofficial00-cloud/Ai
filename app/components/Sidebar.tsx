"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Sidebar({ onToggle }: { onToggle?: (open: boolean) => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (onToggle) {
      onToggle(open);
    }
  }, [open, onToggle]);

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          top: "15px",
          left: "15px",
          zIndex: 9999,
          background: "#2563eb",
          border: "none",
          color: "white",
          padding: "12px 16px",
          borderRadius: "12px",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        ☰
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 998,
          }}
        />
      )}

      {/* SIDEBAR */}
      <aside
        style={{
          width: "280px",
          maxWidth: "85vw",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "0.3s ease",
          zIndex: 999,
          background: "#0f172a",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          padding: "30px 20px",
          borderRight: "1px solid #1e293b",
          overflowY: "auto",
          boxShadow: open ? "0 0 30px rgba(0,0,0,0.5)" : "none",
        }}
      >
        {/* LOGO */}
        <div style={{ marginBottom: "30px" }}>
          <h1 style={{ 
            fontSize: "28px", 
            background: "linear-gradient(to right, #00ff88, #00aaff, #ff00ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
            fontWeight: "bold",
          }}>
            🚀 AI OS
          </h1>
          <p style={{ color: "#94a3b8", marginTop: "6px", fontSize: "11px" }}>
            Autonomous AI Infrastructure
          </p>
        </div>

        {/* MENU */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <MenuItem href="/" label="🏠 Dashboard" />
          
          {/* SECTION: AI AGENTS */}
          <SectionLabel label="🤖 AI AGENTS" />
          <MenuItem href="/youtube" label="📺 YouTube AI" />
          <MenuItem href="/website-empire" label="🌐 Website Empire" />
<MenuItem href="/website-empire/builder" label="🏗️ Builder" />
<MenuItem href="/website-empire/projects" label="📁 Projects" />
          <MenuItem href="/ceo" label="👑 CEO AI" />
          <MenuItem href="/brain" label="🧠 AI Brain" />
          <MenuItem href="/ai-results" label="📊 AI Results" />
          <MenuItem href="/live-sites" label="🌐 Live Sites" />
          <MenuItem href="/autopilot" label="🤖 Auto Pilot" />
          <MenuItem href="/assistant" label="🤖 AI Assistant" />
          <MenuItem href="/agents" label="🧠 AI Agents" />
          
          {/* SECTION: TOOLS */}
          <SectionLabel label="⚡ TOOLS" />
          <MenuItem href="/storage" label="🗄️ Storage" />
          <MenuItem href="/automation" label="⚡ Automation" />
          <MenuItem href="/analytics" label="📊 Analytics" />
          <MenuItem href="/memory" label="🧠 Memory" />
          
          {/* SECTION: CONNECTIONS */}
          <SectionLabel label="📡 CONNECTIONS" />
          <MenuItem href="/telegram" label="📡 Telegram" />
          
          {/* SECTION: BUSINESS */}
          <SectionLabel label="💰 BUSINESS" />
          <MenuItem href="/revenue" label="💰 Revenue" />
          <MenuItem href="/settings" label="⚙️ Settings" />
        </div>
      </aside>
    </>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <p style={{
      color: "#64748b",
      fontSize: "10px",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "2px",
      padding: "16px 18px 4px 18px",
      margin: 0,
    }}>
      {label}
    </p>
  );
}

function MenuItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        color: "white",
        background: "#111827",
        padding: "12px 16px",
        borderRadius: "12px",
        fontSize: "15px",
        display: "block",
        transition: "0.2s",
        border: "1px solid transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#1e293b";
        e.currentTarget.style.borderColor = "#38bdf8";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#111827";
        e.currentTarget.style.borderColor = "transparent";
      }}
    >
      {label}
    </Link>
  );
          }
