import Sidebar from "../components/Sidebar";

export default function AppsPage() {
  return (
    <>
      <Sidebar />

      <main
        style={{
          marginLeft: "280px",
          minHeight: "100vh",
          background: "#020617",
          color: "white",
          padding: "40px",
          fontFamily: "Arial",
        }}
      >
        {/* HEADER */}

        <div
          style={{
            marginBottom: "50px",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              marginBottom: "20px",
            }}
          >
            📱 AI App Builder
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "22px",
              lineHeight: "1.8",
              maxWidth: "1000px",
            }}
          >
            Advanced autonomous AI application
            generation system for websites,
            Android apps, SaaS platforms,
            automation dashboards,
            and futuristic AI ecosystems.
          </p>
        </div>

        {/* APP STATS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: "24px",
            marginBottom: "50px",
          }}
        >
          <StatCard
            title="🚀 Apps Generated"
            value="128"
            color="#22c55e"
          />

          <StatCard
            title="🌐 Websites Built"
            value="42"
            color="#38bdf8"
          />

          <StatCard
            title="⚡ AI Workflows"
            value="312"
            color="#f59e0b"
          />

          <StatCard
            title="☁️ Cloud Deployments"
            value="87"
            color="#a855f7"
          />
        </div>

        {/* AI BUILDERS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(340px,1fr))",
            gap: "28px",
          }}
        >
          <BuilderCard
            icon="🌐"
            title="Website AI"
            desc="Generate futuristic websites and SaaS dashboards automatically."
            color="#38bdf8"
          />

          <BuilderCard
            icon="📱"
            title="Android App AI"
            desc="Create Android applications and mobile systems using AI."
            color="#22c55e"
          />

          <BuilderCard
            icon="🛒"
            title="Ecommerce Builder"
            desc="Generate Shopify and ecommerce business platforms."
            color="#f59e0b"
          />

          <BuilderCard
            icon="🤖"
            title="AI Agent Creator"
            desc="Build autonomous AI agents for multiple industries."
            color="#a855f7"
          />

          <BuilderCard
            icon="📊"
            title="Dashboard Generator"
            desc="Create professional analytics and monitoring dashboards."
            color="#06b6d4"
          />

          <BuilderCard
            icon="⚡"
            title="Automation Builder"
            desc="Build autonomous workflows and cloud automations."
            color="#ef4444"
          />
        </div>

        {/* LIVE BUILD STATUS */}

        <div
          style={{
            marginTop: "60px",
            background: "#0f172a",
            padding: "40px",
            borderRadius: "30px",
            border: "1px solid #1e293b",
          }}
        >
          <h2
            style={{
              fontSize:
