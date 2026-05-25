import Link from "next/link";

export default function SettingsPage() {
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
        {/* HEADER */}

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
            ⚙️ AI System Settings
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
            🚀 AI Configuration Center
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "20px",
            }}
          >
            Manage your AI infrastructure and autonomous systems.
          </p>

          {/* SETTINGS GRID */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(340px,1fr))",
              gap: "25px",
              marginTop: "40px",
            }}
          >
            <SettingsBox
              title="🤖 AI Core Settings"
              items={[
                "Claude AI Integration",
                "Multi-Agent System",
                "Self-Learning Engine",
                "Cloud Synchronization",
              ]}
            />

            <SettingsBox
              title="📺 YouTube AI"
              items={[
                "Auto Uploads",
                "Thumbnail Generator",
                "SEO Optimization",
                "Analytics Tracking",
              ]}
            />

            <SettingsBox
              title="📸 Instagram AI"
              items={[
                "Auto Posting",
                "Trend Detection",
                "Hashtag Intelligence",
                "Reel Automation",
              ]}
            />

            <SettingsBox
              title="🎬 Video AI"
              items={[
                "4K Rendering",
                "AI Cinematic Effects",
                "Auto Subtitles",
                "Shorts Generator",
              ]}
            />

            <SettingsBox
              title="🌐 Cloud Infrastructure"
              items={[
                "Vercel Deployment",
                "Render Server",
                "Database Sync",
                "Realtime Monitoring",
              ]}
            />

            <SettingsBox
              title="🔐 Security System"
              items={[
                "Encrypted Tokens",
                "AI Firewall",
                "Secure Cloud Access",
                "Protected API Keys",
              ]}
            />
          </div>

          {/* SYSTEM STATUS */}

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
                marginBottom: "25px",
              }}
            >
              ⚡ System Status
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(220px,1fr))",
                gap: "20px",
              }}
            >
              <Status title="🤖 AI Agents" value="12 Online" />
              <Status title="⚡ Workflows" value="128 Active" />
              <Status title="🧠 Memory Core" value="Synced" />
              <Status title="🌐 Cloud Servers" value="Operational" />
            </div>
          </div>

          {/* FUTURE */}

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
              🔥 Future AI Infrastructure
            </h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.9",
                fontSize: "18px",
              }}
            >
              Your AI infrastructure is evolving into a
              professional autonomous cloud ecosystem with
              self-learning agents, business automation,
              intelligent analytics, cloud deployment systems,
              advanced content generation, and fully scalable
              AI operations running continuously across multiple
              platforms.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* SETTINGS BOX */

function SettingsBox({
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
          fontSize: "28px",
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

/* STATUS */

function Status({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        background: "#111827",
        padding: "22px",
        borderRadius: "18px",
      }}
    >
      <h3
        style={{
          marginBottom: "10px",
          fontSize: "20px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "#22c55e",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        {value}
      </p>
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
