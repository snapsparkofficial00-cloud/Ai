"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "250px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        background: "#071129",
        borderRight: "1px solid #1e293b",
        padding: "30px 20px",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "40px",
          color: "white",
        }}
      >
        🚀 AI OS
      </h1>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <NavItem href="/" text="🏠 Dashboard" />
        <NavItem href="/agents" text="🤖 AI Agents" />
        <NavItem href="/cloud" text="☁️ Cloud" />
        <NavItem href="/analytics" text="📊 Analytics" />
        <NavItem href="/automation" text="⚡ Automation" />
        <NavItem href="/security" text="🔐 Security" />
        <NavItem href="/terminal" text="💻 Terminal" />
        <NavItem href="/ceo" text="🧠 CEO AI" />
      </nav>
    </aside>
  );
}

function NavItem({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      style={{
        color: "#cbd5e1",
        textDecoration: "none",
        padding: "14px 18px",
        borderRadius: "14px",
        background: "#0f172a",
        border: "1px solid #1e293b",
        fontSize: "18px",
      }}
    >
      {text}
    </Link>
  );
}
