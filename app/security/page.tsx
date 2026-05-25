import Sidebar from "../components/Sidebar";

export default function SecurityPage() {
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
            🛡️ AI Security Center
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "22px",
              lineHeight: "1.8",
              maxWidth: "1000px",
            }}
          >
            Advanced cybersecurity and AI protection
            system for cloud infrastructure, AI agents,
            databases, automation workflows,
            authentication systems, and realtime threat monitoring.
          </p>
        </div>

        {/* SECURITY STATUS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: "24px",
            marginBottom: "50px",
          }}
        >
          <SecurityCard
            title="🟢 Firewall"
            value="ACTIVE"
            color="#22c55e"
          />

          <SecurityCard
            title="🔒 Encryption"
            value="AES-256"
            color="#38bdf8"
          />

          <SecurityCard
            title="⚡ Threat Detection"
            value="ONLINE"
            color="#f59e0b"
          />

          <SecurityCard
            title="☁️ Cloud Security"
            value="SECURED"
            color="#a855f7"
          />
        </div>

        {/* THREAT MONITOR */}

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
              fontSize: "40px",
              marginBottom: "30px",
            }}
          >
            🚨 Threat Monitoring
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <ThreatCard
              level="LOW"
              title="Unauthorized Login Attempt Blocked"
              color="#22c55e"
            />

            <ThreatCard
              level="MEDIUM"
              title="Cloud API Usage Spike Detected"
              color="#f59e0b"
            />

            <ThreatCard
