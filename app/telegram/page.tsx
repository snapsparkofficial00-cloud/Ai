export default function TelegramPage() {
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
        📡 Telegram Control Center
      </h1>

      <p
        style={{
          color: "#94a3b8",
          marginTop: "20px",
          fontSize: "22px",
        }}
      >
        Telegram AI bots connected and operational.
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
          <h2>🤖 Main Bot</h2>
          <p>Status: Online</p>
        </div>

        <div
          style={{
            background: "#0f172a",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h2>📨 Messages</h2>
          <p>1,248 Commands Processed</p>
        </div>

        <div
          style={{
            background: "#0f172a",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h2>⚡ Automation</h2>
          <p>Auto replies active</p>
        </div>

        <div
          style={{
            background: "#0f172a",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h2>🔒 Security</h2>
          <p>Encrypted bot connection</p>
        </div>
      </div>
    </main>
  );
}
