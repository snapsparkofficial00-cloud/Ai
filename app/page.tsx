export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "100px 40px",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          fontSize: "70px",
          marginBottom: "20px",
        }}
      >
        🚀 FUTURE AI ECOSYSTEM
      </h1>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "24px",
          maxWidth: "900px",
          lineHeight: "1.8",
        }}
      >
        Autonomous AI infrastructure with AI agents,
        analytics, automation, cloud systems,
        security intelligence, terminal access,
        and futuristic CEO command center.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "50px",
        }}
      >
        <Card
          title="🤖 AI Agents"
          value="12 Active"
        />

        <Card
          title="⚡ Automation"
          value="128 Running"
        />

        <Card
          title="☁️ Cloud"
          value="Connected"
        />

        <Card
          title="🧠 CEO AI"
          value="Online"
        />
      </div>
    </main>
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
        borderRadius: "20px",
      }}
    >
      <h2
        style={{
          fontSize: "28px",
          marginBottom: "15px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color: "#38bdf8",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        {value}
      </p>
    </div>
  );
}
