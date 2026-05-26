"use client";

import Link from "next/link";

export default function Sidebar() {
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
    { name: "CEO Chat", path: "/xyz" },
  ];

  return (
    <aside
      style={{
        width: "260px",
        height: "100vh",
        background: "#0f172a",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "20px",
        overflowY: "auto",
        borderRight: "1px solid #1e293b",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "10px",
          color: "#38bdf8",
        }}
      >
        AI OS
      </h1>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "14px",
          marginBottom: "30px",
        }}
      >
        Autonomous AI Infrastructure
      </p>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            style={{
              padding: "12px 16px",
              borderRadius: "10px",
              background: "#111827",
              color: "white",
              textDecoration: "none",
              transition: "0.3s",
              fontSize: "15px",
            }}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
