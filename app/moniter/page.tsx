import Sidebar from "../components/Sidebar";

export default function MonitorPage() {
  return (
    <>
      <Sidebar />

      <main
        style={{
          marginLeft: "280px",
          minHeight: "100vh",
          background: "#020617",
          color: "white",
          padding: "40px",
          fontFamily: "Arial",
        }}
      >
        {/* HEADER */}

        <div
          style={{
            marginBottom: "50px",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              marginBottom: "20px",
            }}
          >
            📡 AI Monitoring Center
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "22px",
              lineHeight: "1.8",
              maxWidth: "1000px",
            }}
          >
            Realtime monitoring system for AI agents,
            cloud infrastructure, workflows,
            automations, security systems,
            and autonomous business operations.
          </p>
        </div>

        {/* LIVE STATUS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: "24px",
            marginBottom: "50px",
          }}
        >
          <StatusCard
            title="🤖 AI Agents"
            value="128 ONLINE"
            color="#22c55e"
          />

          <StatusCard
            title="☁️ Cloud Nodes"
            value="42 ACTIVE"
            color="#38bdf8"
          />

          <StatusCard
            title="⚡ Workflows"
            value="312 RUNNING"
            color="#f59e0b"
          />

          <StatusCard
            title="📡 Monitoring"
            value="LIVE"
            color="#a855f7"
          />
        </div>

        {/* LIVE ACTIVITY */}

        <div
          style={{
            background: "#0f172a",
            padding: "40px",
            borderRadius: "30px",
            border: "1px solid #1e293b",
            marginBottom: "50px",
          }}
        >
          <h2
            style={{
