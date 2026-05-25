import Link from "next/link";

export default function AgentsPage() {
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
            🤖 AI Agents Network
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
            ⚡ Active AI Agents
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "20px",
            }}
          >
            Manage your futuristic multi-agent AI ecosystem.
          </p>

          {/* AGENTS GRID */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(280px,1fr))",
              gap: "25px",
              marginTop: "40px",
            }}
          >
            <AgentCard
              name="📺 YouTube AI"
              status="Running"
              desc="Multi-channel YouTube automation system."
            />

            <AgentCard
              name="📸 Instagram AI"
              status="Active"
              desc="Reels, captions, hashtags, and growth AI."
            />

            <AgentCard
              name="🎬 Video AI"
              status="Rendering"
              desc="AI cinematic editor and shorts generator."
            />

            <AgentCard
              name="🌐 Website AI"
              status="Deploying"
              desc="Website and SaaS builder automation."
            />

            <AgentCard
              name="💰 Revenue AI"
              status="Monitoring"
              desc="Income tracking and monetization AI."
            />

            <AgentCard
              name="📊 Analytics AI"
              status="Learning"
              desc="Tracks growth and optimizes performance."
            />

            <AgentCard
              name="🧠 Memory AI"
              status="Evolving"
              desc="Stores successful strategies and prompts."
            />

            <AgentCard
              name="⚡ Workflow AI"
              status="Operational"
              desc="Handles autonomous task execution."
            />

            <AgentCard
              name="📡 Telegram AI"
              status="Connected"
              desc="Remote control and notifications."
            />

            <AgentCard
              name="🛒 Ecommerce AI"
              status="Scanning"
              desc="Product research and Shopify automation."
            />

            <AgentCard
              name="💼 Freelance AI"
              status="Ready"
              desc="Client work automation and proposals."
            />

            <AgentCard
              name="🎨 Design AI"
              status="Generating"
              desc="Thumbnails, branding, and graphics."
            />
          </div>

          {/* FUTURE */}

          <div
            style={{
              marginTop: "50px",
              background: "#0f172a",
              padding: "30px",
              borderRadius: "25px",
            }}
          >
            <h2
              style={{
                fontSize: "34px",
                marginBottom: "20px",
              }}
            >
              🚀 Autonomous AI Future
            </h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.8",
                fontSize: "18px",
              }}
            >
              Your AI ecosystem is evolving into a full
              autonomous business infrastructure capable of
              creating videos, managing YouTube channels,
              deploying websites, automating ecommerce,
              generating revenue, and continuously improving
              itself through advanced memory and analytics
              systems.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* AGENT CARD */

function AgentCard({
  name,
  status,
  desc,
}: {
  name: string;
  status: string;
  desc: string;
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        padding: "25px",
        borderRadius: "22px",
        border: "1px solid #1e293b",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          marginBottom: "12px",
        }}
      >
        {name}
      </h2>

      <p
        style={{
          color: "#22c55e",
          marginBottom: "15px",
          fontSize: "18px",
        }}
      >
        ● {status}
      </p>

      <p
        style={{
          color: "#94a3b8",
          lineHeight: "1.7",
        }}
      >
        {desc}
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
