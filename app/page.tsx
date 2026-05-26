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
      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "60px",
          flexWrap: "wrap",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "bold",
          }}
        >
          🚀 AI OS
        </h1>

        <div
          style={{
            display: "flex",
            gap: "18px",
            flexWrap: "wrap",
          }}
        >
          <Button text="Dashboard" />
          <Button text="AI Agents" />
          <Button text="Cloud" />
          <Button text="Terminal" />
        </div>
      </div>

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
          FUTURE AI
          <br />
          ECOSYSTEM
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "24px",
            maxWidth: "1000px",
            lineHeight: "1.8",
          }}
        >
          Advanced autonomous AI infrastructure
          with intelligent agents, cloud systems,
          automation workflows, analytics engines,
          revenue optimization, futuristic security,
          and CEO command intelligence.
        </p>
      </section>

      {/* STATS */}

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",
          gap: "24px",
          marginBottom: "70px",
        }}
      >
        <Card
          title="🤖 AI Agents"
          value="12 ACTIVE"
          color="#38bdf8"
        />

        <Card
          title="⚡ Automation"
          value="128 RUNNING"
          color="#22c55e"
        />

        <Card
          title="☁️ Cloud"
          value="CONNECTED"
          color="#a855f7"
        />

        <Card
          title="🧠 CEO AI"
          value="ONLINE"
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
            fontSize: "50px",
            marginBottom: "30px",
          }}
        >
          📊 Analytics
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
            {[80, 120, 160, 210, 260, 320].map(
              (h, i) => (
                <div
                  key={i}
                  style={{
                    width: "70px",
                    height: `${h}px`,
                    borderRadius: "16px",
                    background:
                      "linear-gradient(to top,#2563eb,#38bdf8)",
                  }}
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* MODULES */}

      <section>
        <h2
          style={{
            fontSize: "50px",
            marginBottom: "30px",
          }}
        >
          🔥 AI MODULES
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
            desc="Video automation engine"
          />

          <Module
            title="📸 Instagram AI"
            desc="Reels and viral growth"
          />

          <Module
            title="🛒 Ecommerce AI"
            desc="Automated store system"
          />

          <Module
            title="🧠 Memory AI"
            desc="Self-learning intelligence"
          />

          <Module
            title="⚡ Workflow AI"
            desc="Automation infrastructure"
          />

          <Module
            title="💰 Revenue AI"
            desc="Revenue optimization system"
          />
        </div>
      </section>
    </main>
  );
}

function Button({
  text,
}: {
  text: string;
}) {
  return (
    <button
      style={{
        background: "#0f172a",
        color: "white",
        border: "1px solid #1e293b",
        padding: "14px 22px",
        borderRadius: "14px",
        cursor: "pointer",
      }}
    >
      {text}
    </button>
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
          fontSize: "28px",
          marginBottom: "16px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color,
          fontSize: "38px",
          fontWeight: "bold",
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
          fontSize: "30px",
          marginBottom: "16px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "18px",
          lineHeight: "1.8",
        }}
      >
        {desc}
      </p>
    </div>
  );
}
