import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom,#020617,#0f172a)",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      {/* HERO */}

      <section
        style={{
          marginBottom: "60px",
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          🚀 FUTURE AI OS
        </h1>

        <p
          style={{
            fontSize: "24px",
            color: "#94a3b8",
            maxWidth: "900px",
            lineHeight: "1.8",
          }}
        >
          Professional AI Operating System with
          autonomous agents, automation workflows,
          analytics intelligence, cloud orchestration,
          revenue tracking, memory engine,
          cybersecurity tools, terminal control,
          and futuristic business infrastructure.
        </p>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "35px",
            flexWrap: "wrap",
          }}
        >
          <Button
            href="/assistant"
            text="🤖 AI Assistant"
          />

          <Button
            href="/analytics"
            text="📊 Analytics"
          />

          <Button
            href="/terminal"
            text="💻 Terminal"
          />

          <Button
            href="/cloud"
            text="☁️ Cloud"
          />
        </div>
      </section>

      {/* STATS */}

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
          marginBottom: "60px",
        }}
      >
        <Card
          title="🤖 AI Agents"
          value="24 Active"
          color="#38bdf8"
        />

        <Card
          title="⚡ Automation"
          value="128 Running"
          color="#22c55e"
        />

        <Card
          title="💰 Revenue"
          value="$84,500"
          color="#f59e0b"
        />

        <Card
          title="📡 Cloud Status"
          value="Connected"
          color="#a855f7"
        />
      </section>

      {/* MODULES */}

      <section>
        <h2
          style={{
            fontSize: "42px",
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
            gap: "25px",
          }}
        >
          <Module
            title="📺 YouTube AI"
            desc="Automated content creation and viral analytics."
          />

          <Module
            title="📸 Instagram AI"
            desc="AI reels, hashtags, captions, and engagement growth."
          />

          <Module
            title="🌐 Website Builder"
            desc="Generate websites and SaaS dashboards automatically."
          />

          <Module
            title="🛒 Ecommerce AI"
            desc="Dropshipping and Shopify automation engine."
          />

          <Module
            title="🧠 Memory Engine"
            desc="Self-learning AI memory infrastructure."
          />

          <Module
            title="💻 AI Terminal"
            desc="Remote terminal execution and command system."
          />
        </div>
      </section>
    </main>
  );
}

function Button({
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
        padding: "16px 24px",
        background:
          "linear-gradient(to right,#2563eb,#38bdf8)",
        borderRadius: "16px",
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
          fontSize: "24px",
          marginBottom: "15px",
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
          fontSize: "28px",
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
