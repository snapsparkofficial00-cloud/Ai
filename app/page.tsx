import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        background: "#020617",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial",
        padding: "40px",
      }}
    >
      {/* HERO */}

      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "30px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "72px",
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              🚀 FUTURE AI
              <br />
              ECOSYSTEM
            </h1>

            <p
              style={{
                fontSize: "24px",
                color: "#94a3b8",
                maxWidth: "900px",
                lineHeight: "1.8",
              }}
            >
              Autonomous AI business infrastructure
              with self-learning systems, YouTube
              automation, Instagram AI, ecommerce
              workflows, analytics intelligence,
              futuristic memory systems, cloud
              orchestration, and advanced AI teams.
            </p>

            <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "35px",
                flexWrap: "wrap",
              }}
            >
              <HeroButton
                href="/assistant"
                text="🤖 AI Assistant"
              />

              <HeroButton
                href="/agents"
                text="🧠 AI Agents"
              />

              <HeroButton
                href="/automation"
                text="⚡ Automation"
              />
            </div>
          </div>

          {/* STATUS CARD */}

          <div
            style={{
              background: "#0f172a",
              padding: "35px",
              borderRadius: "28px",
              border: "1px solid #1e293b",
              minWidth: "320px",
            }}
          >
            <h2
              style={{
                fontSize: "34px",
                marginBottom: "25px",
              }}
            >
              🟢 System Online
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                color: "#94a3b8",
                fontSize: "18px",
              }}
            >
              <p>🤖 AI Core: ACTIVE</p>
              <p>⚡ Automation: RUNNING</p>
              <p>☁️ Cloud Sync: CONNECTED</p>
              <p>📡 Bots: ONLINE</p>
              <p>🧠 Memory Engine: ACTIVE</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}

      <section
        style={{
          paddingTop: "50px",
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
    </main>
  );
}

/* HERO BUTTON */

function HeroButton({
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
        background:
          "linear-gradient(to right,#2563eb,#38bdf8)",
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
