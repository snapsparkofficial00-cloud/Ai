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
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            color: "#38bdf8",
          }}
        >
          🚀 AI EMPIRE OS
        </h1>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
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
          padding: "80px 30px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "80px",
            fontWeight: "bold",
            marginBottom: "25px",
          }}
        >
          🤖 FUTURE AI ECOSYSTEM
        </h1>

        <p
          style={{
            fontSize: "24px",
            color: "#94a3b8",
            maxWidth: "1100px",
            margin: "auto",
            lineHeight: "1.8",
          }}
        >
          Autonomous AI infrastructure with self-learning
          systems, YouTube automation, Instagram AI,
          ecommerce workflows, cloud orchestration,
          revenue intelligence, futuristic analytics,
          AI memory systems, and advanced business
          automation architecture.
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
          <BigButton
            href="/agents"
            text="🤖 Launch AI Agents"
          />

          <BigButton
            href="/automation"
            text="⚡ Open Automation"
          />

          <BigButton
            href="/analytics"
            text="📊 View Analytics"
          />
        </div>
      </section>

      {/* STATS */}

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

      {/* AI ANALYTICS */}

      <section
        style={{
          padding: "70px 40px",
        }}
      >
        <h2
          style={{
            fontSize: "48px",
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          📊 Live AI Analytics
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(400px,1fr))",
            gap: "30px",
          }}
        >
          {/* BAR GRAPH */}

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
                gap: "15px",
                height: "250px",
              }}
            >
              {[40, 70, 100, 130, 170, 220, 300].map(
                (height, index) => (
                  <div
                    key={index}
                    style={{
                      background:
                        "linear-gradient(to top,#2563eb,#38bdf8)",
                      width: "45px",
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
              AI growth and scaling analytics
            </p>
          </div>

          {/* LINE GRAPH */}

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
                marginBottom: "20px",
                fontSize: "28px",
              }}
            >
              💰 Revenue Analytics
            </h2>

            <div
              style={{
                position: "relative",
                height: "250px",
                borderLeft: "2px solid #334155",
                borderBottom: "2px solid #334155",
              }}
            >
              <svg width="100%" height="250">
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
              Autonomous revenue scaling intelligence
            </p>
          </div>
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
            desc="Multi-channel YouTube automation and AI content generation."
          />

          <Module
            title="📸 Instagram AI"
            desc="AI reels, captions, hashtags, and viral growth systems."
          />

          <Module
            title="🎬 Video Editing AI"
            desc="Professional cinematic editing and shorts generation."
          />

          <Module
            title="🌐 Website AI"
            desc="AI-powered website and SaaS builder infrastructure."
          />

          <Module
            title="🛒 Ecommerce AI"
            desc="Shopify and dropshipping automation system."
          />

          <Module
            title="🧠 Memory AI"
            desc="Self-learning memory intelligence system."
          />

          <Module
            title="📡 Telegram AI"
            desc="Remote AI command center and control system."
          />

          <Module
            title="⚡ Workflow AI"
            desc="Autonomous AI workflow orchestration engine."
          />

          <Module
            title="💰 Revenue AI"
            desc="Revenue optimization and monetization tracking."
          />
        </div>
      </section>

      {/* SYSTEM STATUS */}

      <section
        style={{
          padding: "50px 40px",
        }}
      >
        <div
          style={{
            background: "#0f172a",
            borderRadius: "30px",
            padding: "50px",
            border: "1px solid #1e293b",
          }}
        >
          <h2
            style={{
              fontSize: "50px",
              marginBottom: "25px",
            }}
          >
            🟢 SYSTEM ONLINE
          </h2>

          <p
            style={{
              fontSize: "22px",
              color: "#94a3b8",
              lineHeight: "1.9",
            }}
          >
            AI ecosystem operational. Autonomous systems are
            prepared for future integrations including
            advanced AI models, automation pipelines,
            social media scaling, ecommerce infrastructure,
            intelligent analytics, self-learning memory,
            and futuristic cloud orchestration.
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

/* MODULE CARD */

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
