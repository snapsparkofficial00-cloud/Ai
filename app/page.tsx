export default function Home() {
  const modules = [
    "🤖 AI Agents",
    "📺 YouTube Automation",
    "📊 Analytics",
    "📡 Telegram Control",
    "💰 Revenue Tracking",
    "⚡ Automation Engine",
    "🧠 AI Memory",
    "🌐 Website Builder",
  ];

  return (
    <main
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          background: "#0F172A",
          padding: "25px",
          borderRight: "1px solid #1E293B",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "40px",
          }}
        >
          🚀 Snap Spark
        </h1>

        {[
          "Dashboard",
          "AI Agents",
          "Automation",
          "Analytics",
          "Telegram",
          "Revenue",
          "Settings",
        ].map((item) => (
          <div
            key={item}
            style={{
              padding: "14px",
              marginBottom: "10px",
              background: "#111827",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            {item}
          </div>
        ))}
      </aside>

      {/* Main */}
      <section
        style={{
          flex: 1,
          padding: "30px",
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
            AI Command Center
          </h1>

          <p
            style={{
              color: "#94A3B8",
              marginTop: "10px",
            }}
          >
            Ultimate Autonomous AI System
          </p>
        </div>

        {/* System Status */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {[
            ["AI Agents", "12"],
            ["Tasks Running", "48"],
            ["Active Bots", "7"],
            ["CPU Usage", "62%"],
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
                  fontSize: "34px",
                  fontWeight: "bold",
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Modules */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          {modules.map((module) => (
            <div
              key={module}
              style={{
                background: "#0F172A",
                padding: "30px",
                borderRadius: "24px",
                border: "1px solid #1E293B",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                {module}
              </h2>

              <p
                style={{
                  color: "#94A3B8",
                }}
              >
                Open AI control panel
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
