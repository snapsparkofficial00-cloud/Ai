import Link from "next/link";

export default function MemoryPage() {
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
            🧠 Memory Intelligence System
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
            🚀 AI Memory Core
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "20px",
            }}
          >
            Self-learning intelligence and strategy storage.
          </p>

          {/* MEMORY STATS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(260px,1fr))",
              gap: "25px",
              marginTop: "40px",
            }}
          >
            <MemoryCard
              title="🧠 Stored Strategies"
              value="842"
              color="#38bdf8"
            />

            <MemoryCard
              title="⚡ Workflow Memories"
              value="1,284"
              color="#22c55e"
            />

            <MemoryCard
              title="📺 YouTube Learning"
              value="428 Insights"
              color="#f59e0b"
            />

            <MemoryCard
              title="🤖 AI Evolution"
              value="Active"
              color="#a855f7"
            />
          </div>

          {/* MEMORY MODULES */}

          <div
            style={{
              marginTop: "50px",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(340px,1fr))",
              gap: "25px",
            }}
          >
            <ModuleCard
              title="📺 YouTube Memory"
              items={[
                "Best upload times",
                "Top-performing thumbnails",
                "Audience retention data",
                "Viral video patterns",
              ]}
            />

            <ModuleCard
              title="📸 Instagram Memory"
              items={[
                "Best hashtags",
                "Top reel styles",
                "Engagement strategies",
                "Growth optimization",
              ]}
            />

            <ModuleCard
              title="🎬 Video AI Memory"
              items={[
                "Best transitions",
                "Cinematic presets",
                "Rendering optimization",
                "High-retention edits",
              ]}
            />

            <ModuleCard
              title="💰 Revenue Intelligence"
              items={[
                "Top revenue sources",
                "Profitable campaigns",
                "Conversion tracking",
                "Monetization insights",
              ]}
            />
          </div>

          {/* LEARNING PIPELINE */}

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
              🔥 Self-Learning Pipeline
            </h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
                alignItems: "center",
              }}
            >
              <Pipeline text="Collect Data" />
              <Arrow />
              <Pipeline text="Analyze Results" />
              <Arrow />
              <Pipeline text="Store Strategy" />
              <Arrow />
              <Pipeline text="Optimize Workflow" />
              <Arrow />
              <Pipeline text="Improve AI" />
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
              🚀 Future AI Evolution
            </h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.9",
                fontSize: "18px",
              }}
            >
              Your Memory AI system will eventually evolve into
              a fully autonomous intelligence layer capable of
              learning from every workflow, optimizing every
              business process, predicting future trends, and
              continuously improving your AI ecosystem without
              human intervention.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* MEMORY CARD */

function MemoryCard({
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
          fontSize: "24px",
          marginBottom: "14px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          fontSize: "36px",
          fontWeight: "bold",
          color,
        }}
      >
        {value}
      </p>
    </div>
  );
}

/* MODULE CARD */

function ModuleCard({
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

/* PIPELINE */

function Pipeline({
  text,
}: {
  text: string;
}) {
  return (
    <div
      style={{
        background: "#111827",
        padding: "14px 22px",
        borderRadius: "14px",
        border: "1px solid #1e293b",
      }}
    >
      {text}
    </div>
  );
}

/* ARROW */

function Arrow() {
  return (
    <div
      style={{
        fontSize: "24px",
        color: "#38bdf8",
      }}
    >
      →
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
