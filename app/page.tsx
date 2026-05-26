"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        background: "#020617",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {/* HERO */}

      <section
        style={{
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "30px",
          }}
        >
          <div style={{ flex: 1, minWidth: "300px" }}>
            <h1
              style={{
                fontSize: "clamp(42px,8vw,72px)",
                marginBottom: "20px",
                fontWeight: "bold",
                lineHeight: "1.1",
              }}
            >
              🚀 FUTURE AI
              <br />
              ECOSYSTEM
            </h1>

            <p
              style={{
                fontSize: "clamp(18px,3vw,24px)",
                color: "#94a3b8",
                lineHeight: "1.8",
                maxWidth: "900px",
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
                gap: "15px",
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
              width: "100%",
              maxWidth: "420px",
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
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(240px,1fr))",
            gap: "20px",
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

      {/* AI ANALYTICS */}

      <section
        style={{
          padding: "60px 20px",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(34px,6vw,50px)",
            marginBottom: "40px",
          }}
        >
          📊 Live AI Analytics
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "25px",
          }}
        >
          {/* BAR GRAPH */}

          <div
            style={{
              background: "#0f172a",
              padding: "25px",
              borderRadius: "24px",
              border: "1px solid #1e293b",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
                fontSize: "28px",
              }}
            >
              🚀 AI Growth
            </h2>

            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "10px",
                height: "220px",
              }}
            >
              {[40, 70, 100, 130, 170, 220, 300].map(
                (height, index) => (
                  <div
                    key={index}
                    style={{
                      background:
                        "linear-gradient(to top,#2563eb,#38bdf8)",
                      flex: 1,
                      height: `${height}px`,
                      borderRadius: "12px",
                    }}
                  />
                )
              )}
            </div>

            <p
              style={{
                marginTop: "20px",
                color: "#94a3b8",
              }}
            >
              AI ecosystem scaling analytics
            </p>
          </div>

          {/* LINE GRAPH */}

          <div
            style={{
              background: "#0f172a",
              padding: "25px",
              borderRadius: "24px",
              border: "1px solid #1e293b",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
                fontSize: "28px",
              }}
            >
              💰 Revenue Analytics
            </h2>

            <div
              style={{
                position: "relative",
                height: "220px",
                borderLeft: "2px solid #334155",
                borderBottom: "2px solid #334155",
              }}
            >
              <svg width="100%" height="220">
                <polyline
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="6"
                  points="
                    0,220
                    60,180
                    120,170
                    180,120
                    240,100
                    300,70
                    360,30
                  "
                />
              </svg>
            </div>

            <p
              style={{
                marginTop: "20px",
                color: "#94a3b8",
              }}
            >
              Autonomous monetization intelligence
            </p>
          </div>
        </div>
      </section>

      {/* MODULES */}

      <section
        style={{
          padding: "60px 20px",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(34px,6vw,50px)",
            marginBottom: "40px",
          }}
        >
          🔥 AI Infrastructure Modules
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "25px",
          }}
        >
          <Module
            title="📺 YouTube AI"
            desc="Multi-channel YouTube automation and AI content generation."
          />

          <Module
            title="📸 Instagram AI"
            desc="AI reels, captions, hashtags, and viral growth."
          />

          <Module
            title="🎬 Video Editing AI"
            desc="Professional cinematic editing and shorts creation."
          />

          <Module
            title="🌐 Website AI"
            desc="AI-powered SaaS and website generation."
          />

          <Module
            title="🛒 Ecommerce AI"
            desc="Shopify and dropshipping automation system."
          />

          <Module
            title="🧠 Memory AI"
            desc="Self-learning intelligence storage engine."
          />

          <Module
            title="📡 Telegram AI"
            desc="Remote AI control and monitoring system."
          />

          <Module
            title="⚡ Workflow AI"
            desc="Advanced autonomous workflow orchestration."
          />

          <Module
            title="💰 Revenue AI"
            desc="Revenue optimization and analytics intelligence."
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
        padding: "16px 24px",
        borderRadius: "18px",
        color: "white",
        textDecoration: "none",
        fontSize: "18px",
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
