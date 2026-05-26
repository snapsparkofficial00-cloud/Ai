"use client";

import Link from "next/link";
import { useState } from "react";

const menuItems = [
  { name: "Dashboard", path: "/" },
  { name: "AI Assistant", path: "/assistant" },
  { name: "AI Agents", path: "/agents" },
  { name: "Automation", path: "/automatic" },
  { name: "Analytics", path: "/analytics" },
  { name: "Telegram", path: "/telegram" },
  { name: "Memory", path: "/memory" },
  { name: "Revenue", path: "/revenue" },
  { name: "Cloud", path: "/cloud" },
  { name: "Deploy", path: "/deploy" },
  { name: "Control", path: "/control" },
  { name: "Security", path: "/security" },
  { name: "Notifications", path: "/notifications" },
  { name: "Mobile", path: "/mobile" },
  { name: "Monitor", path: "/moniter" },
  { name: "Marketplace", path: "/marketplace" },
  { name: "Finance", path: "/finance" },
  { name: "Settings", path: "/settings" },
  { name: "Team", path: "/team" },
  { name: "Terminal", path: "/terminal" },
  { name: "CEO Chat", path: "/ceo" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          top: "15px",
          left: "15px",
          zIndex: 1000,
          background: "#2563eb",
          border: "none",
          color: "white",
          padding: "10px 14px",
          borderRadius: "10px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          height: "100vh",
          background: "#020617",
          padding: "15px",
          position: "fixed",
          top: 0,
          left: open ? "0" : "-240px",
          transition: "0.3s",
          overflowY: "auto",
          zIndex: 999,
          borderRight: "1px solid #1e293b",
        }}
      >
        <h1
          style={{
            color: "#38bdf8",
            fontSize: "40px",
            marginTop: "60px",
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          AI OS
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "12px",
            marginBottom: "20px",
          }}
        >
          Autonomous AI Infrastructure
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              style={{
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  background: "#0f172a",
                  padding: "14px",
                  borderRadius: "14px",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}
