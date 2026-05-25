import Link from "next/link";

export default function AnalyticsPage() {
  return (
    <main
      style={{
        background: "#020617",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial",
        display: "flex",
      }}
    >
      {/* SIDEBAR */}

      <aside
        style={{
          width: "260px",
          background: "#0f172a",
          padding: "25px",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          borderRight: "1px solid #1e293b",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            marginBottom: "40px",
          }}
        >
          🤖 AI OS
        </h1>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <SidebarLink href="/" label="🏠 Dashboard" />
          <SidebarLink href="/agents" label="🤖 Agents" />
          <SidebarLink href="/automation" label="⚡ Automation" />
          <SidebarLink href="/analytics" label="📊 Analytics" />
          <SidebarLink href="/telegram" label="📡 Telegram" />
          <SidebarLink href="/memory" label="🧠 Memory" />
          <SidebarLink href="/revenue" label="💰 Revenue" />
          <SidebarLink href="/settings" label="⚙️ Settings" />
        </nav>
      </aside>

      {/* MAIN */}

      <div
        style={{
          marginLeft: "260px",
          width: "100%",
        }}
      >
        {/* NAVBAR */}

        <header
          style={{
            background: "#111827",
            padding: "22px",
            borderBottom: "1px solid #1e293b",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
            }}
          >
            📊 Analytics Intelligence
          </h2>
        </header>

        {/* CONTENT */}

        <div
          style={{
            padding: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "56px",
              marginBottom: "10px",
            }}
          >
            🚀 AI Growth Analytics
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "20px",
            }}
          >
            Real-time monitoring and optimization system.
          </p>

          {/* STATS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(260px,1fr))",
              gap: "25px",
              marginTop: "40px",
            }}
          >
            <StatCard
              title="📺 Total Views"
              value="12.8M"
              color="#38bdf8"
            />

            <StatCard
              title="📸 Instagram Reach"
              value="4.2M"
              color="#ec4899"
            />

            <StatCard
              title="💰 Revenue"
              value="$24,580"
              color="#22c55e"
            />

            <StatCard
              title="⚡ Active Workflows"
              value="128"
              color="#f59e0b"
            />
          </div>

          {/* PERFORMANCE */}

          <div
            style={{
              marginTop: "50px",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(350px,1fr))",
              gap: "25px",
            }}
          >
            <AnalyticsBox
              title="📈 YouTube Performance"
              items={[
                "CTR: 12.4%",
                "Watch Time: 82%",
                "Upload Success: 97%",
                "Growth Rate: +32%",
              ]}
            />

            <AnalyticsBox
              title="📸 Instagram Growth"
              items={[
                "Reel Reach: +240%",
                "Engagement: 18%",
                "Followers: +12K",
                "AI Posting Success: 95%",
              ]}
            />

            <AnalyticsBox
              title="🎬 Video AI Metrics"
              items={[
                "Videos Rendered: 428",
                "Shorts Created: 982",
                "Auto Captions: Enabled",
                "Rendering Efficiency: 91%",
              ]}
            />

            <AnalyticsBox
              title="🧠 AI Learning System"
              items={[
                "Strategies Stored: 842",
                "Prompt Optimizations: 194",
                "Workflow Improvements: 76",
                "Memory Efficiency: 98%",
              ]}
            />
          </div>

          {/* AI LEARNING */}

          <div
            style={{
              marginTop: "50px",
              background: "#0f172a",
              padding: "35px",
              borderRadius: "25px",
            }}
          >
            <h2
              style={{
                fontSize: "34px",
                marginBottom: "20px",
              }}
            >
              🤖 Self-Learning Intelligence
            </h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.9",
                fontSize: "18px",
              }}
            >
              Your AI analytics system continuously studies
              performance metrics, audience behavior, workflow
              efficiency, and revenue patterns to improve future
              automation strategies across YouTube, Instagram,
              ecommerce, websites, and autonomous AI operations.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* STAT CARD */

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        padding: "28px",
        borderRadius: "22px",
        border: "1px solid #1e293b",
      }}
    >
      <h2
        style={{
          fontSize: "22px",
          marginBottom: "14px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          fontSize: "42px",
          color,
          fontWeight: "bold",
        }}
      >
        {value}
      </p>
    </div>
  );
}

/* ANALYTICS BOX */

function AnalyticsBox({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        padding: "28px",
        borderRadius: "22px",
        border: "1px solid #1e293b",
      }}
    >
      <h2
        style={{
          fontSize: "26px",
          marginBottom: "20px",
        }}
      >
        {title}
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#111827",
              padding: "14px",
              borderRadius: "14px",
              color: "#94a3b8",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* SIDEBAR LINK */

function SidebarLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      style={{
        color: "white",
        textDecoration: "none",
        background: "#111827",
        padding: "14px",
        borderRadius: "14px",
      }}
    >
      {label}
    </Link>
  );
}
