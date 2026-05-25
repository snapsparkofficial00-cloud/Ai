export default function AnalyticsPage() {
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
        📊 Analytics Center
      </h1>

      <p
        style={{
          color: "#94a3b8",
          marginTop: "20px",
          fontSize: "22px",
        }}
      >
        AI analytics systems monitoring all operations.
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
          <h2>📺 YouTube Views</h2>
          <p>1.2M Total Views</p>
        </div>

        <div
          style={{
            background: "#0f172a",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h2>👥 Subscribers</h2>
          <p>42K Active Subscribers</p>
        </div>

        <div
          style={{
            background: "#0f172a",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h2>💰 Revenue Growth</h2>
          <p>+18% This Month</p>
        </div>

        <div
          style={{
            background: "#0f172a",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h2>⚡ AI Performance</h2>
          <p>98% System Efficiency</p>
        </div>
      </div>
    </main>
  );
}
