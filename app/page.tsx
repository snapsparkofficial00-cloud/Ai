export default function Home() {
  const modules = [
    "🤖 AI Agents",
    "📺 YouTube Automation",
    "📊 Analytics",
    "📡 Telegram Control",
    "🧠 AI Memory",
    "🌐 Website Builder",
    "⚡ Automation Engine",
    "💰 Revenue Tracking",
  ];

  return (
    <main
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        fontFamily: "Arial",
        overflowX: "hidden",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "240px",
          background: "#0F172A",
          borderRight: "1px solid #1E293B",
          padding: "20px",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "35px",
            color: "#38BDF8",
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
          "AI Memory",
          "Revenue",
          "Settings",
        ].map((item) => (
          <div
            key={item}
            style={{
              padding: "14px",
              marginBottom: "12px",
              borderRadius: "14px",
              background: "#111827",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            {item}
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <section
        style={{
          flex: 1,
          padding: "25px",
        }}
      >
        {/* Topbar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          <div>
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
                marginTop: "8px",
              }}
            >
              Autonomous AI Operating System
            </p>
          </div>

          <div
            style={{
              background: "#111827",
              padding: "14px 22px",
              borderRadius: "16px",
              border: "1px solid #1E293B",
            }}
          >
            🟢 System Online
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          {[
            ["AI Agents", "12"],
            ["Tasks Running", "48"],
            ["CPU Usage", "62%"],
            ["Active Bots", "7"],
          ].map(([title, value]) => (
            <div
              key={title}
              style={{
                background: "#0F172A",
                padding: "25px",
                borderRadius: "22px",
                border: "1px solid #1E293B",
                boxShadow: "0 0 20px rgba(56,189,248,0.08)",
              }}
            >
              <h2
                style={{
                  color: "#94A3B8",
                  marginBottom: "12px",
                }}
              >
                {title}
              </h2>

              <p
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
        >
          {/* Modules */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: "20px",
            }}
          >
            {modules.map((module) => (
              <div
                key={module}
                style={{
                  background: "#111827",
                  padding: "28px",
                  borderRadius: "24px",
                  border: "1px solid #1E293B",
                  boxShadow: "0 0 20px rgba(56,189,248,0.05)",
                }}
              >
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: "12px",
                  }}
                >
                  {module}
                </h2>

                <p
                  style={{
                    color: "#94A3B8",
                  }}
                >
                  Open AI module
                </p>
              </div>
            ))}
          </div>

          {/* AI Assistant */}
          <div
            style={{
              background: "#0F172A",
              borderRadius: "24px",
              padding: "25px",
              border: "1px solid #1E293B",
            }}
          >
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              🤖 AI Assistant
            </h2>

            <div
              style={{
                background: "#111827",
                padding: "18px",
                borderRadius: "16px",
                marginBottom: "16px",
              }}
            >
              AI system online and operational.
            </div>

            <div
              style={{
                background: "#111827",
                padding: "18px",
                borderRadius: "16px",
                marginBottom: "16px",
              }}
            >
              Waiting for commands...
            </div>

            <input
              placeholder="Type AI command..."
              style={{
                width: "100%",
                padding: "18px",
                background: "#111827",
                border: "1px solid #1E293B",
                borderRadius: "14px",
                color: "white",
                outline: "none",
                fontSize: "16px",
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
