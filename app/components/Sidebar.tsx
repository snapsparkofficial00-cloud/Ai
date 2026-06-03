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
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "34px", color: "#38bdf8", margin: 0 }}>🚀 AI OS</h1>
          <p style={{ color: "#94a3b8", marginTop: "10px" }}>Autonomous AI Infrastructure</p>
        </div>

        {/* MENU */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <MenuItem href="/" label="🏠 Dashboard" />
          <MenuItem href="/youtube" label="📺 YouTube AI" />
          <MenuItem href="/ceo" label="👑 CEO AI" />
          <MenuItem href="/autopilot" label="🤖 Auto Pilot" />
          <MenuItem href="/assistant" label="🤖 AI Assistant" />
          <MenuItem href="/agents" label="🧠 AI Agents" />
          <MenuItem href="/automation" label="⚡ Automation" />
          <MenuItem href="/analytics" label="📊 Analytics" />
          <MenuItem href="/telegram" label="📡 Telegram" />
          <MenuItem href="/memory" label="🧠 Memory" />
          <MenuItem href="/revenue" label="💰 Revenue" />
          <MenuItem href="/settings" label="⚙️ Settings" />
        </div>
      </aside>
    </>
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
        padding: "16px 18px",
        borderRadius: "16px",
        fontSize: "18px",
        display: "block",
        transition: "0.2s",
      }}
    >
      {label}
    </Link>
  );
}
