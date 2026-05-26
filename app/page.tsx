export default function Home() {
  return (
    <div>
      <h1
        style={{
          fontSize: "72px",
          marginBottom: "20px",
        }}
      >
        🚀 FUTURE AI ECOSYSTEM
      </h1>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "24px",
          lineHeight: "1.8",
          maxWidth: "900px",
        }}
      >
        Autonomous AI operating system with CEO AI,
        analytics intelligence, terminal control,
        automation systems, cloud infrastructure,
        and futuristic business management.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "24px",
          marginTop: "50px",
        }}
      >
        <Card title="🤖 AI Agents" value="12 ACTIVE" />
        <Card title="⚡ Automation" value="128 RUNNING" />
        <Card title="☁️ Cloud" value="CONNECTED" />
        <Card title="🧠 CEO AI" value="ONLINE" />
      </div>
    </div>
  );
}

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
          color: "#38bdf8",
          fontSize: "34px",
          fontWeight: "bold",
        }}
      >
        {value}
      </p>
    </div>
  );
}
