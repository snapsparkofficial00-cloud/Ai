export default function RevenuePage() {
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
        💰 Revenue Control Center
      </h1>

      <p
        style={{
          color: "#94a3b8",
          marginTop: "20px",
          fontSize: "22px",
        }}
      >
        AI revenue monitoring and financial automation system.
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
          <h2>💵 Total Revenue</h2>
          <p>$24,580 Generated</p>
        </div>

        <div
          style={{
            background: "#0f172a",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h2>📈 Monthly Growth</h2>
          <p>+32% This Month</p>
        </div>

        <div
          style={{
            background: "#0f172a",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h2>🤖 AI Businesses</h2>
          <p>7 Automated Income Streams</p>
        </div>

        <div
          style={{
            background: "#0f172a",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h2>⚡ Live Transactions</h2>
          <p>Real-time revenue tracking active</p>
        </div>
      </div>
    </main>
  );
}
