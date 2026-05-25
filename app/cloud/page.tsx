import Sidebar from "../components/Sidebar";

export default function CloudPage() {
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
            ☁️ AI Cloud Control
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "22px",
              lineHeight: "1.8",
              maxWidth: "1000px",
            }}
          >
            Advanced cloud infrastructure management
            for AI agents, automation systems,
            storage engines, realtime monitoring,
            and autonomous cloud orchestration.
          </p>
        </div>

        {/* CLOUD SERVERS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(340px,1fr))",
            gap: "28px",
          }}
        >
          <ServerCard
            icon="🚀"
            title="Main AI Server"
            status="ONLINE"
            usage="72%"
            color="#22c55e"
          />

          <ServerCard
            icon="📺
