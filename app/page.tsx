import Link from "next/link";

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
        background: "#020617",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        fontFamily: "Arial",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "240px",
          background: "#071028",
          padding: "30px 20px",
          borderRight: "1px solid #1e293b",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            marginBottom: "40px",
            color: "#38bdf8",
          }}
        >
          🚀 Snap Spark
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Link href="/" style={linkStyle}>
            Dashboard
          </Link>

          <Link href="/agents" style={linkStyle}>
            AI Agents
          </Link>

          <Link href="/automation" style={linkStyle}>
            Automation
          </Link>

          <Link href="/analytics" style={linkStyle}>
            Analytics
          </Link>

          <Link href="/telegram" style={linkStyle}>
            Telegram
          </Link>

          <Link href="/memory" style={linkStyle}>
            AI Memory
          </Link>

          <Link href="/revenue" style={linkStyle}>
            Revenue
          </Link>

          <Link href="/settings" style={linkStyle}>
            Settings
          </Link>
        </div>
      </aside>

      {/* Main */}
      <section
        style={{
          flex: 1,
          padding: "40px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "48px",
                marginBottom: "10px",
              }}
            >
              AI Command Center
            </h1>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "20px",
              }}
            >
              Autonomous AI Operating System
            </p>
          </div>

          <div
            style={{
              background: "#0f172a",
              padding: "20px",
              borderRadius: "20px",
              minWidth: "180px",
            }}
          >
            <h2
              style={{
                color: "#4ade80",
                fontSize: "22px",
              }}
            >
              ● System Online
            </h2>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <StatCard title="AI Agents" value="12" />
          <StatCard title="Tasks Running" value="48" />
          <StatCard title="CPU Usage" value="62%" />
          <StatCard title="Active Bots" value="7" />
        </div>

        {/* Modules */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "20px",
          }}
        >
          {modules.map((module, index) => (
            <div
              key={index}
              style={{
                background: "#0f172a",
                padding: "30px",
                borderRadius: "25px",
                border: "1px solid #1e293b",
              }}
            >
              <h2
                style={{
                  fontSize: "30px",
                  marginBottom: "15px",
                }}
              >
                {module}
              </h2>

              <p
                style={{
                  color: "#94a3b8",
                  marginBottom: "20px",
                }}
              >
                Open AI module
              </p>

              <button
                style={{
                  background: "#38bdf8",
                  color: "black",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Open
              </button>
            </div>
          ))}
        </div>

        {/* Assistant */}
        <div
          style={{
            marginTop: "40px",
            background: "#0f172a",
            padding: "30px",
            borderRadius: "25px",
            border: "1px solid #1e293b",
          }}
        >
          <h2
            style={{
              fontSize: "34px",
              marginBottom: "20px",
            }}
          >
            🤖 AI Assistant
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginBottom: "20px",
            }}
          >
            AI system online and operational.
          </p>

          <p
            style={{
              marginBottom: "20px",
            }}
          >
            Waiting for commands...
          </p>

          <input
            placeholder="Type AI command..."
            style={{
              width: "100%",
              padding: "16px",
              background: "#020617",
              border: "1px solid #1e293b",
              borderRadius: "15px",
              color: "white",
              fontSize: "16px",
            }}
          />
        </div>
      </section>
    </main>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        padding: "30px",
        borderRadius: "25px",
        border: "1px solid #1e293b",
      }}
    >
      <h2
        style={{
          color: "#94a3b8",
          marginBottom: "20px",
          fontSize: "24px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          fontSize: "48px",
          fontWeight: "bold",
        }}
      >
        {value}
      </p>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "18px",
};
