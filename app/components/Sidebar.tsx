"use client";
import { useState } from "react";
const [open, setOpen] = useState(false);
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
  }}
>
  ☰
</button>
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "280px",
        background: "#0f172a",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "30px 20px",
        borderRight: "1px solid #1e293b",
        overflowY: "auto",
      }}
    >
      {/* LOGO */}

      <div
        style={{
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            color: "#38bdf8",
          }}
        >
          🚀 AI OS
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginTop: "10px",
          }}
        >
          Autonomous AI Infrastructure
        </p>
      </div>

      {/* MENU */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <MenuItem href="/" label="🏠 Dashboard" />
        <MenuItem href="/assistant" label="🤖 AI Assistant" />
        <MenuItem href="/agents" label="🧠 AI Agents" />
        <MenuItem href="/automation" label="⚡ Automation" />
        <MenuItem href="/analytics" label="📊 Analytics" />
        <MenuItem href="/telegram" label="📡 Telegram" />
        <MenuItem href="/memory" label="🧠 Memory" />
        <MenuItem href="/revenue" label="💰 Revenue" />
        <MenuItem href="/settings" label="⚙️ Settings" />
      </div>

      {/* SYSTEM */}

      <div
        style={{
          marginTop: "50px",
          background: "#111827",
          padding: "22px",
          borderRadius: "20px",
        }}
      >
        <h2
          style={{
            marginBottom: "16px",
            fontSize: "22px",
          }}
        >
          🟢 System Status
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            color: "#94a3b8",
          }}
        >
          <p>🤖 AI Core: ONLINE</p>
          <p>⚡ Workflows: ACTIVE</p>
          <p>☁️ Cloud: CONNECTED</p>
          <p>📡 Bots: RUNNING</p>
        </div>
      </div>

      {/* FUTURE */}

      <div
        style={{
          marginTop: "30px",
          background:
            "linear-gradient(to right,#2563eb,#38bdf8)",
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            marginBottom: "12px",
          }}
        >
          🚀 Future AI
        </h2>

        <p
          style={{
            lineHeight: "1.7",
          }}
        >
          Multi-agent autonomous business ecosystem.
        </p>
      </div>
    </aside>
  );
}

/* MENU ITEM */

function MenuItem({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
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
        transition: "0.3s",
      }}
    >
      {label}
    </Link>
  );
}
