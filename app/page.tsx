import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom,#020617,#071129)",
        color: "white",
        fontFamily: "Arial",
        padding: "40px",
      }}
    >
      {/* NAVBAR */}

      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "60px",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
          }}
        >
          🤖 AI OS
        </h1>

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <NavButton href="/" text="Dashboard" />
          <NavButton href="/ceo" text="CEO AI" />
          <NavButton href="/control" text="Control" />
          <NavButton href="/terminal" text="Terminal" />
        </div>
      </nav>

      {/* HERO */}

      <section
        style={{
          marginBottom: "70px",
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            marginBottom: "20px",
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
            maxWidth: "1000px",
            lineHeight: "1.8",
          }}
        >
          Autonomous AI infrastructure with
          self-learning agents, cloud intelligence,
          automation systems, advanced analytics,
          futuristic security, AI revenue engines,
          and remote terminal orchestration.
        </p>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          <ActionButton
            href="/agents"
            text="🤖 AI Agents"
          />

          <ActionButton
            href="/automation"
            text="⚡ Automation"
          />

          <ActionButton
            href="/cloud"
            text="☁️ Cloud System"
          />
        </div>
      </section>

      {/* STATS */}

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",
          gap: "25px",
          marginBottom: "70px",
        }}
      >
        <Card
          title="🤖 AI Agents"
          value="12 Active"
          color="#38bdf8"
        />

        <Card
          title="⚡ Automation"
          value="128 Running"
          color="#22c55e"
        />

        <Card
          title="☁️ Cloud"
          value="Connected"
          color="#a855f7"
        />

        <Card
          title="🧠 CEO AI"
          value="Online"
          color="#f59e0b"
        />
      </section>

      {/* ANALYTICS */}

      <section
        style={{
          marginBottom: "70px",
        }}
      >
        <h2
          style={{
            fontSize: "48px",
            marginBottom: "30px",
          }}
        >
          📊 AI Analytics
        </h2>

        <div
          style={{
            background: "#0f172a",
            padding: "40px",
            borderRadius: "24px",
            border: "1px solid #1e293b",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "18px",
              height: "300px",
            }}
          >
            {[80, 120, 170, 220, 260, 310].map(
              (height, index) => (
                <div
                  key={index}
                  style={{
                    width: "70px",
                    height: `${height}px`,
                    borderRadius: "16px",
                    background:
                      "linear-gradient(to top,#2563eb,#38bdf8)",
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
            Autonomous ecosystem growth metrics
          </p>
        </div>
      </section>

      {/* MODULES */}

      <section>
        <h2
          style={{
            fontSize: "48px",
            marginBottom: "30px",
          }}
        >
          🔥 AI Modules
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "24px",
          }}
        >
          <Module
            title="📺 YouTube AI"
            desc="AI content creation and automation."
          />

          <Module
            title="📸 Instagram AI"
            desc="Reels, captions, viral AI growth."
          />

          <Module
            title="🛒 Ecommerce AI"
            desc="Dropshipping automation system."
          />

          <Module
            title="⚡ Workflow AI"
            desc="Advanced autonomous workflows."
          />

          <Module
            title="🧠 Memory AI"
            desc="Self-learning intelligence engine."
          />

          <Module
            title="💰 Revenue AI"
            desc="Revenue optimization intelligence."
          />
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
        color: "#cbd5e1",
        textDecoration: "none",
        fontSize: "18px",
      }}
    >
      {text}
    </Link>
  );
}

/* ACTION BUTTON */

function ActionButton({
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
        fontWeight: "bold",
        fontSize: "18px",
      }}
    >
      {text}
    </Link>
  );
}

/* CARD */

function Card({
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
          fontSize: "28px",
          marginBottom: "14px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          fontSize: "40px",
          fontWeight: "bold",
          color,
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
