"use client";

import Link from "next/link";

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
  return (
    <aside
      style={{
        width: "170px",
        height: "100vh",
        background: "#020617",
        borderRight: "1px solid #1e293b",
        padding: "15px",
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto",
      }}
    >
      <h1
        style={{
          color: "#38bdf8",
          fontSize: "32px",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        AI OS
      </h1>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "11px",
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
                padding: "12px",
                borderRadius: "12px",
                color: "white",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
