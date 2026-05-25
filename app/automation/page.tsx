export default function AutomationPage() {
  return (
    <main
      style={{
        background: "#020617",
        color: "white",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ fontSize: "50px" }}>
        ⚡ Automation Engine
      </h1>

      <p
        style={{
          color: "#94a3b8",
          marginTop: "20px",
          fontSize: "22px",
        }}
      >
        Automation systems are active and running.
      </p>

      <div
        style={{
          marginTop: "40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "#0f172a",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h2>📺 YouTube AI</h2>
          <p>Uploading videos automatically</p>
        </div>

        <div
          style={{
            background: "#0f172a",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h2>📝 Blog AI</h2>
          <p>Generating SEO blog articles</p>
        </div>

        <div
          style={{
            background: "#0f172a",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h2>💰 Revenue AI</h2>
          <p>Tracking income streams</p>
        </div>

        <div
          style={{
            background: "#0f172a",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h2>🌐 Website Builder</h2>
          <p>Deploying AI websites automatically</p>
        </div>
      </div>
    </main>
  );
}
