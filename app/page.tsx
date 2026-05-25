import Link from "next/link";

export default function Home() {
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

      {/* MAIN CONTENT */}

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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
            }}
          >
            🚀 AI Business Operating System
          </h2>

          <div
            style={{
              background: "#0f172a",
              padding: "10px 20px",
              borderRadius: "14px",
            }}
          >
            Online
          </div>
        </header>

        {/* DASHBOARD */}

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
            🤖 Welcome Back
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "20px",
            }}
          >
            Your futuristic AI business ecosystem dashboard.
          </p>

          {/* CARDS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(260px,1fr))",
              gap: "25px",
              marginTop: "40px",
            }}
          >
            <Card
              title="📺 YouTube AI"
              value="12 Channels Running"
            />

            <Card
              title="📸 Instagram AI"
              value="Automation Active"
            />

            <Card
              title="🎬 Video AI"
              value="Rendering Videos"
            />

            <Card
              title="💰 Revenue AI"
              value="$24,580 Generated"
            />

            <Card
              title="📊 Analytics AI"
              value="Growth Monitoring"
            />

            <Card
              title="🧠 Memory AI"
              value="Learning Active"
            />

            <Card
              title="⚡ Workflow AI"
              value="128 Tasks Running"
            />

            <Card
              title="🌐 Website AI"
              value="Deploying Projects"
            />
          </div>

          {/* FUTURE SECTION */}

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
                fontSize: "32px",
                marginBottom: "20px",
              }}
            >
              🔥 AI Team Network
            </h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.8",
                fontSize: "18px",
              }}
            >
              Your AI system is evolving into a full autonomous
              business ecosystem with multi-agent workflows,
              video creation, automation systems, website
              builders, YouTube AI channels, Instagram growth
              engines, analytics intelligence, and self-learning
              memory architecture.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* CARD COMPONENT */

function Card({
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
        {title}
      </h2>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "18px",
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
