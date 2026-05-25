import Link from "next/link";

export default function TelegramPage() {
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
            📡 Telegram AI Control Center
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
            🤖 Remote AI Control
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "20px",
            }}
          >
            Monitor and control your AI ecosystem remotely.
          </p>

          {/* STATUS GRID */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(260px,1fr))",
              gap: "25px",
              marginTop: "40px",
            }}
          >
            <StatusCard
              title="📡 Telegram Bot"
              status="Connected"
              color="#22c55e"
            />

            <StatusCard
              title="🤖 AI Agents"
              status="12 Online"
              color="#38bdf8"
            />

            <StatusCard
              title="⚡ Workflows"
              status="128 Running"
              color="#f59e0b"
            />

            <StatusCard
              title="🧠 Memory Sync"
              status="Active"
              color="#a855f7"
            />
          </div>

          {/* COMMANDS */}

          <div
            style={{
              marginTop: "50px",
            }}
          >
            <h2
              style={{
                fontSize: "34px",
                marginBottom: "25px",
              }}
            >
              🚀 AI Command System
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(320px,1fr))",
                gap: "25px",
              }}
            >
              <CommandCard
                command="/youtube-start"
                desc="Start YouTube automation workflow."
              />

              <CommandCard
                command="/video-render"
                desc="Launch AI video rendering engine."
              />

              <CommandCard
                command="/instagram-post"
                desc="Publish Instagram AI campaign."
              />

              <CommandCard
                command="/deploy-website"
                desc="Deploy website AI project."
              />

              <CommandCard
                command="/analytics-report"
                desc="Generate performance report."
              />

              <CommandCard
                command="/memory-sync"
                desc="Sync AI memory database."
              />
            </div>
          </div>

          {/* LIVE ACTIVITY */}

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
              ⚡ Live AI Activity
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Activity text="📺 YouTube AI uploaded new video" />
              <Activity text="🎬 Video AI rendered cinematic short" />
              <Activity text="📸 Instagram AI posted viral reel" />
              <Activity text="💰 Revenue AI updated earnings" />
              <Activity text="🧠 Memory AI optimized workflow" />
            </div>
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
              🔥 Future Remote Infrastructure
            </h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.9",
                fontSize: "18px",
              }}
            >
              Telegram AI will eventually become your global
              command center capable of controlling autonomous
              workflows, AI business systems, cloud agents,
              content engines, ecommerce operations, and
              self-learning AI teams from anywhere in the world.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* STATUS CARD */

function StatusCard({
  title,
  status,
  color,
}: {
  title: string;
  status: string;
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
          fontSize: "24px",
          marginBottom: "15px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color,
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        {status}
      </p>
    </div>
  );
}

/* COMMAND CARD */

function CommandCard({
  command,
  desc,
}: {
  command: string;
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
          color: "#38bdf8",
          fontSize: "24px",
          marginBottom: "15px",
        }}
      >
        {command}
      </h2>

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

/* ACTIVITY */

function Activity({
  text,
}: {
  text: string;
}) {
  return (
    <div
      style={{
        background: "#111827",
        padding: "16px",
        borderRadius: "14px",
        color: "#94a3b8",
      }}
    >
      {text}
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
