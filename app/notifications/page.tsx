import Sidebar from "../components/Sidebar";

export default function NotificationsPage() {
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
            marginBottom: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "60px",
              marginBottom: "20px",
            }}
          >
            🔔 AI Notifications
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "22px",
              lineHeight: "1.8",
            }}
          >
            Realtime AI alerts, workflow updates,
            automation status, cloud monitoring,
            and autonomous system intelligence.
          </p>
        </div>

        {/* NOTIFICATIONS */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <NotificationCard
            icon="🚀"
            title="AI Growth Increased"
            desc="YouTube AI engagement increased by 28% today."
            color="#2563eb"
          />

          <NotificationCard
            icon="📸"
            title="Instagram AI Active"
            desc="Reels automation workflow completed successfully."
            color="#a855f7"
          />

          <NotificationCard
            icon="💰"
            title="Revenue Generated"
            desc="Revenue AI detected new monetization opportunity."
            color="#22c55e"
          />

          <NotificationCard
            icon="⚡"
            title="Workflow Running"
            desc="Automation pipeline executing cloud operations."
            color="#f59e0b"
          />

          <NotificationCard
            icon="🧠"
            title="Memory AI Updated"
            desc="Self-learning engine optimized system prompts."
            color="#38bdf8"
          />

          <NotificationCard
            icon="☁️"
            title="Cloud Sync Complete"
            desc="All AI systems synchronized successfully."
            color="#06b6d4"
          />
        </div>

        {/* FUTURE */}

        <div
          style={{
            marginTop: "50px",
            background: "#0f172a",
            padding: "40px",
            borderRadius: "28px",
            border: "1px solid #1e293b",
          }}
        >
          <h2
