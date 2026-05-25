export default function AssistantPage() {
  return (
    <main
      style={{
        background: "#020617",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          fontSize: "60px",
          marginBottom: "20px",
        }}
      >
        🤖 AI Assistant Core
      </h1>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "22px",
          marginBottom: "40px",
          lineHeight: "1.8",
        }}
      >
        Central intelligence system controlling autonomous
        AI agents, automation workflows, analytics,
        memory systems, and future cloud operations.
      </p>

      {/* STATUS */}

      <div
        style={{
          background: "#0f172a",
          padding: "30px",
          borderRadius: "24px",
          marginBottom: "30px",
          border: "1px solid #1e293b",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            marginBottom: "20px",
          }}
        >
          🟢 System Status
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          <Card title="AI Status" value="ONLINE" />
          <Card title="Agents Running" value="12" />
          <Card title="Tasks Active" value="128" />
          <Card title="Cloud Sync" value="ACTIVE" />
        </div>
      </div>

      {/* COMMAND */}

      <div
        style={{
          background: "#0f172a",
          padding: "30px",
          borderRadius: "24px",
          border: "1px solid #1e293b",
          marginBottom: "30px",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            marginBottom: "20px",
          }}
        >
          ⚡ AI Command Center
        </h2>

        <input
          placeholder="Type AI command..."
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "14px",
            border: "none",
            background: "#111827",
            color: "white",
            fontSize: "18px",
            marginBottom: "20px",
          }}
        />

        <button
          style={{
            background:
              "linear-gradient(to right,#2563eb,#38bdf8)",
            padding: "16px 28px",
            borderRadius: "14px",
            border: "none",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Execute Command
        </button>
      </div>

      {/* AI MODULES */}

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
          desc="Video automation and uploads."
        />

        <Module
          title="📸 Instagram AI"
          desc="Reels, captions and growth."
        />

        <Module
          title="🎬 Video AI"
          desc="Professional editing workflows."
        />

        <Module
          title="💰 Revenue AI"
          desc="Monetization optimization engine."
        />

        <Module
          title="🧠 Memory AI"
          desc="Self-learning intelligence storage."
        />

        <Module
          title="🌐 Website Builder AI"
          desc="Autonomous web generation."
        />
      </div>
    </main>
  );
}

/* CARD */

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
        background: "#111827",
        padding: "24px",
        borderRadius: "18px",
      }}
    >
      <h3
        style={{
          marginBottom: "12px",
          color: "#94a3b8",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: "30px",
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
        padding: "28px",
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
