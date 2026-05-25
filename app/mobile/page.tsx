import Sidebar from "../components/Sidebar";

export default function MobilePage() {
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
            📱 AI Mobile Control
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "22px",
              lineHeight: "1.8",
              maxWidth: "1000px",
            }}
          >
            Advanced mobile AI control system for
            remote automation, AI agents,
            realtime monitoring, notifications,
            and cloud synchronization.
          </p>
        </div>

        {/* DEVICE STATUS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: "24px",
            marginBottom: "50px",
          }}
        >
          <DeviceCard
            title="📶 Network"
            value="CONNECTED"
            color="#22c55e"
          />

          <DeviceCard
            title="🔋 Battery AI"
            value="92%"
            color="#38bdf8"
          />

          <DeviceCard
            title="📡 Sync Status"
            value="ACTIVE"
            color="#a855f7"
          />

          <DeviceCard
            title="⚡ AI Runtime"
            value="ONLINE"
            color="#f59e0b"
          />
        </div>

        {/* CONTROL CENTER */}

        <div
          style={{
            background: "#0f172a",
            padding: "35px",
            borderRadius: "30px",
            border: "1px solid #1e293b",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              fontSize: "42px",
              marginBottom: "30px",
            }}
          >
            🎛️ Mobile AI Controls
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(300px,1fr))",
              gap: "24px",
            }}
          >
            <ControlCard
              icon="🤖"
              title="Launch AI Agents"
              color="#22c55e"
            />

            <ControlCard
              icon="📺"
              title="Start YouTube AI"
              color="#ef4444"
            />

            <ControlCard
              icon="📸"
              title="Open Instagram AI
