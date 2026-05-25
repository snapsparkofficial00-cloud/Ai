import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        background: "#020617",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      {/* NAVBAR */}

      <header
        style={{
          padding: "25px 40px",
          borderBottom: "1px solid #1e293b",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#0f172a",
        }}
      >
        <h1
          style={{
            fontSize: "34px",
          }}
        >
          🤖 AI EMPIRE OS
        </h1>

        <div
          style={{
            display: "flex",
            gap: "15px",
          }}
        >
          <NavButton href="/agents" text="Agents" />
          <NavButton href="/automation" text="Automation" />
          <NavButton href="/analytics" text="Analytics" />
          <NavButton href="/telegram" text="Telegram" />
          <NavButton href="/memory" text="Memory" />
          <NavButton href="/revenue" text="Revenue" />
          <NavButton href="/settings" text="Settings" />
        </div>
      </header>

      {/* HERO */}

      <section
        style={{
          padding: "80px 40px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "80px",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          🚀 FUTURE AI ECOSYSTEM
        </h1>

        <p
          style={{
            fontSize: "24px",
            color: "#94a3b8",
            maxWidth: "1000px",
            margin: "auto",
            lineHeight: "1.8",
          }}
        >
          Autonomous AI business infrastructure with
          self-learning agents, YouTube automation,
          Instagram AI, ecommerce systems, cloud deployment,
          analytics intelligence, memory systems, revenue
          optimization, and futuristic workflow orchestration.
        </p>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <BigButton href="/agents" text="🤖 Launch AI Agents" />
          <BigButton href="/automation" text="⚡ Open Automation" />
          <BigButton href="/analytics" text="📊 View Analytics" />
        </div>
      </section>

      {/* LIVE STATS */}

      <section
        style={{
          padding: "20px 40px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: "25px",
          }}
        >
          <StatCard
            title="🤖 Active AI Agents"
            value="12"
            color="#38bdf8"
          />

          <StatCard
            title="⚡ Running Workflows"
            value="128"
            color="#22c55e"
          />

          <StatCard
            title="💰 Revenue Generated"
            value="$24,580"
            color="#f59e0b"
          />

          <StatCard
            title="📺 YouTube Views"
            value="12.8M"
            color="#a855f7"
          />
        </div>
      </section>

      {/* MODULES */}

      <section
        style={{
          padding: "60px 40px",
        }}
      >
        <h2
          style={{
            fontSize: "48px",
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          🔥 AI Infrastructure Modules
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "25px",
          }}
        >
          <Module
            title="📺 YouTube AI"
            desc="Multi-channel YouTube automation system."
          />

          <Module
            title="📸 Instagram AI"
            desc="AI reels, captions, hashtags, and growth."
          />

          <Module
            title="🎬 Video AI"
            desc="Cinematic editing and shorts generation."
          />

          <Module
            title="🌐 Website AI"
            desc="Autonomous website and SaaS builder."
          />

          <Module
            title="💰 Revenue AI"
            desc="Tracks and optimizes monetization."
          />

          <Module
            title="🧠 Memory AI"
            desc="Self-learning intelligence system."
          />

          <Module
            title="📡 Telegram AI"
            desc="Remote command center for your ecosystem."
          />

          <Module
            title="⚡ Workflow AI"
            desc="Advanced autonomous workflow orchestration."
          />

          <Module
            title="🛒 Ecommerce AI"
            desc="Shopify and dropshipping automation."
          />
        </div>
      </section>

      {/* FUTURE */}

      <section
        style={{
          padding: "60px 40px",
        }}
      >
        <div
          style={{
            background: "#0f172a",
            borderRadius: "30px",
            padding: "50px",
          }}
        >
          <h2
            style={{
              fontSize: "48px",
              marginBottom: "25px",
            }}
          >
            🚀 Autonomous AI Future
          </h2>

          <p
            style={{
              fontSize: "20px",
              color: "#94a3b8",
              lineHeight: "1.9",
            }}
          >
            This system is evolving into a futuristic AI empire
            capable of running autonomous businesses, managing
            social media growth, generating revenue, deploying
            cloud infrastructure, learning from analytics,
            improving workflows automatically, and scaling
            operations globally through advanced AI agents.
          </p>
        </div>
      </section>
    </main>
  );
}

/* NAV BUTTON */

function NavButton({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      style={{
        background: "#111827",
        padding: "12px 18px",
        borderRadius: "14px",
        color: "white",
        textDecoration: "none",
      }}
    >
      {text}
    </Link>
  );
}

/* BIG BUTTON */

function BigButton({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      style={{
        background: "#2563eb",
        padding: "18px 28px",
        borderRadius: "18px",
        color: "white",
        textDecoration: "none",
        fontSize: "20px",
        fontWeight: "bold",
      }}
    >
      {text}
    </Link>
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
        padding: "30px",
        borderRadius: "24px",
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

/* MODULE */

function Module({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        padding: "30px",
        borderRadius: "24px",
        border: "1px solid #1e293b",
      }}
    >
      <h2
        style={{
          fontSize: "30px",
          marginBottom: "16px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color: "#94a3b8",
          lineHeight: "1.8",
          fontSize: "18px",
        }}
      >
        {desc}
      </p>
    </div>
  );
}
