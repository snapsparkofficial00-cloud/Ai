import Sidebar from "../components/Sidebar";

export default function DeployPage() {
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
            🚀 AI Deployment Center
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "22px",
              lineHeight: "1.8",
              maxWidth: "1000px",
            }}
          >
            Autonomous deployment infrastructure
            for AI systems, websites, apps,
            cloud services, automation workflows,
            and futuristic business ecosystems.
          </p>
        </div>

        {/* DEPLOYMENT STATS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: "24px",
            marginBottom: "50px",
          }}
        >
          <DeployStat
            title="☁️ Cloud Deployments"
            value="148"
            color="#38bdf8"
          />

          <DeployStat
            title="🌐 Websites Online"
            value="64"
            color="#22c55e"
          />

          <DeployStat
            title="📱 Apps Published"
            value="23"
            color="#a855f7"
          />

          <DeployStat
            title="⚡ AI Systems Active"
            value="312"
            color="#f59e0b"
          />
        </div>

        {/* ACTIVE DEPLOYMENTS */}

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
              fontSize: "42px",
              marginBottom: "30px",
            }}
          >
            📡 Active Deployments
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20
