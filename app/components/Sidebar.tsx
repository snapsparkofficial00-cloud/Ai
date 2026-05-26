"use client";

const linkStyle = {
  display: "block",
  padding: "14px 18px",
  marginBottom: "10px",
  borderRadius: "10px",
  textDecoration: "none",
  color: "white",
  background: "#0f172a",
  fontSize: "15px",
  fontWeight: "bold" as const,
};

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "260px",
        height: "100vh",
        background: "#020617",
        padding: "20px",
        position: "fixed",
        left: 0,
        top: 0,
        overflowY: "auto",
        borderRight: "1px solid #1e293b",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          color: "#38bdf8",
          fontSize: "40px",
          marginBottom: "5px",
        }}
      >
        AI OS
      </h1>

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "30px",
          fontSize: "14px",
        }}
      >
        Autonomous AI Infrastructure
      </p>

      <nav>
        <a href="/" style={linkStyle}>
          Dashboard
        </a>

        <a href="/assistant" style={linkStyle}>
          AI Assistant
        </a>

        <a href="/agents" style={linkStyle}>
          AI Agents
        </a>

        <a href="/automatic" style={linkStyle}>
          Automation
        </a>

        <a href="/analytics" style={linkStyle}>
          Analytics
        </a>

        <a href="/telegram" style={linkStyle}>
          Telegram
        </a>

        <a href="/memory" style={linkStyle}>
          Memory
        </a>

        <a href="/revenue" style={linkStyle}>
          Revenue
        </a>

        <a href="/cloud" style={linkStyle}>
          Cloud
        </a>

        <a href="/deploy" style={linkStyle}>
          Deploy
        </a>

        <a href="/control" style={linkStyle}>
          Control
        </a>

        <a href="/security" style={linkStyle}>
          Security
        </a>

        <a href="/notifications" style={linkStyle}>
          Notifications
        </a>

        <a href="/mobile" style={linkStyle}>
          Mobile
        </a>

        <a href="/moniter" style={linkStyle}>
          Monitor
        </a>

        <a href="/marketplace" style={linkStyle}>
          Marketplace
        </a>

        <a href="/finance" style={linkStyle}>
          Finance
        </a>

        <a href="/settings" style={linkStyle}>
          Settings
        </a>

        <a href="/team" style={linkStyle}>
          Team
        </a>

        <a href="/terminal" style={linkStyle}>
          Terminal
        </a>

        <a href="/ceo" style={linkStyle}>
          CEO Chat
        </a>
      </nav>
    </aside>
  );
}
