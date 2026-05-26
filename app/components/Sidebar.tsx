"use client";

import Link from "next/link";
import { useState } from "react";

const menuItems = [
  { name: "Dashboard", link: "/" },
  { name: "AI Assistant", link: "/assistant" },
  { name: "AI Agents", link: "/agents" },
  { name: "Analytics", link: "/analytics" },
  { name: "Cloud", link: "/cloud" },
  { name: "Deploy", link: "/deploy" },
  { name: "Control", link: "/control" },
  { name: "Security", link: "/security" },
  { name: "Terminal", link: "/terminal" },
  { name: "CEO Chat", link: "/ceo" },
];

export default function Sidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        background: "#020617",
        minHeight: "100vh",
      }}
    >
      {/* MOBILE BUTTON */}

      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          top: "15px",
          left: "15px",
          zIndex: 1000,
          width: "45px",
          height: "45px",
          border: "none",
          borderRadius: "10px",
          background: "#2563eb",
          color: "white",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        {open ? "✕" : "☰"}
      </button>

      {/* SIDEBAR */}

      <aside
        style={{
          position: "fixed",
          top: 0,
          left: open ? "0" : "-260px",
          width: "250px",
          height: "100vh",
          background: "#020b2d",
          padding: "20px",
          transition: "0.3s",
          overflowY: "auto",
          zIndex: 999,
        }}
      >
        <h1
          style={{
            color: "#38bdf8",
            fontSize: "38px",
            marginBottom: "10px",
          }}
        >
          AI OS
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          Future AI System
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              onClick={() => setOpen(false)}
              style={{
                background: "#0f172a",
                padding: "14px",
                borderRadius: "12px",
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </aside>

      {/* MAIN */}

      <main
        style={{
          flex: 1,
          width: "100%",
          minHeight: "100vh",
          background: "#020617",
          color: "white",
        }}
      >
        {children}
      </main>
    </div>
  );
}
