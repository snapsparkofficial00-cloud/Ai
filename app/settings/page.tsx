export default function SettingsPage() {
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
        ⚙️ System Settings
      </h1>

      <p
        style={{
          color: "#94a3b8",
          marginTop: "20px",
          fontSize: "22px",
        }}
      >
        Configure your AI operating system and automation controls.
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
          <h2>🌐 API Settings</h2>
          <p>Manage AI API integrations</p>
        </div>

        <div
          style={{
            background: "#0f172a",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h2>🔒 Security</h2>
          <p>Authentication and encryption settings</p>
        </div>

        <div
          style={{
            background: "#0f172a",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h2>🤖 AI Configuration</h2>
          <p>Control AI behaviors and automation</p>
        </div>

        <div
          style={{
            background: "#0f172a",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h2>📡 Cloud Sync</h2>
          <p>Realtime synchronization active</p>
        </div>
      </div>
    </main>
  );
}
