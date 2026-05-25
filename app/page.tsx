export default function Home() {
  const cards = [
    "🤖 AI Agents",
    "📺 YouTube Automation",
    "📊 Analytics",
    "📡 Telegram Control",
    "💰 Revenue Tracking",
    "⚡ Automation Engine",
  ];

  return (
    <main
      style={{
        background: "#020617",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "bold",
          }}
        >
          🚀 Snap Spark AI Dashboard
        </h1>

        <p
          style={{
            color: "#94A3B8",
            marginTop: "10px",
            fontSize: "18px",
          }}
        >
          Ultimate AI Automation Control Center
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {[
          ["AI Agents", "12"],
          ["Tasks Running", "48"],
          ["Revenue", "$2,430"],
          ["Active Bots", "7"],
        ].map(([title, value]) => (
          <div
            key={title}
            style={{
              background: "#111827",
              padding: "25px",
              borderRadius: "20px",
              border: "1px solid #1E293B",
            }}
          >
            <h2
              style={{
                color: "#94A3B8",
                marginBottom: "10px",
              }}
            >
              {title}
            </h2>

            <p
              style={{
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* AI Modules */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card}
            style={{
              background: "#0F172A",
              padding: "30px",
              borderRadius: "24px",
              border: "1px solid #1E293B",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              {card}
            </h2>

            <p
              style={{
                color: "#94A3B8",
                marginTop: "10px",
              }}
            >
              Open AI control panel
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
