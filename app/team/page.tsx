import Sidebar from "../components/Sidebar";

export default function TeamPage() {
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
            🤖 AI Teams
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "22px",
              lineHeight: "1.8",
              maxWidth: "1000px",
            }}
          >
            Autonomous AI departments managing
            YouTube, Instagram, automation,
            ecommerce, analytics, cloud systems,
            revenue optimization, and future AI
            business operations.
          </p>
        </div>

        {/* TEAM GRID */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(340px,1fr))",
            gap: "28px",
          }}
        >
          <TeamCard
            icon="📺"
            title="YouTube AI Team"
            status="ACTIVE"
            color="#ef4444"
            tasks={[
              "Shorts Generation",
              "Thumbnail AI",
              "SEO Optimization",
              "Video Scheduling",
            ]}
          />

          <TeamCard
            icon="📸"
            title="Instagram AI Team"
            status="RUNNING"
            color="#a855f7"
            tasks={[
              "Reels Automation",
              "Trend Analysis",
              "Caption AI",
              "Growth Analytics",
            ]}
          />

          <TeamCard
            icon="🛒"
            title="Ecommerce AI Team"
            status="ONLINE"
            color="#22c55e"
            tasks={[
              "Product Research",
              "Store Optimization",
              "Marketing Campaigns",
              "Revenue Tracking",
            ]}
          />

          <TeamCard
            icon="🎬"
            title="Video Editing AI"
            status="ACTIVE"
            color="#38bdf8"
            tasks={[
              "Auto Editing",
              "Cinematic Effects",
              "Subtitle AI",
              "Shorts Production",
            ]}
          />

          <TeamCard
            icon="⚡"
            title="Automation AI Team"
            status="RUNNING"
            color="#f59e0b"
            tasks={[
              "Workflow Control",
              "Task Scheduling",
              "Cloud Operations",
              "Bot Monitoring",
            ]}
          />

          <TeamCard
            icon="🧠"
            title="Memory AI Team"
            status="LEARNING"
            color="#06b6d4"
            tasks={[
              "Prompt Learning",
              "Data Storage",
              "AI Optimization",
              "System Intelligence",
            ]}
          />
        </div>

        {/* FUTURE */}

        <div
          style={{
            marginTop: "60px",
            background: "#0f172a",
            padding: "45px",
            borderRadius: "30px",
            border: "1px solid #1e293b",
          }}
        >
          <h2
            style={{
              fontSize: "42px",
              marginBottom: "24px",
            }}
          >
            🚀 Autonomous AI Workforce
          </h2>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "20px",
              lineHeight: "1.9",
            }}
          >
            Future upgrades will allow AI teams
            to coordinate tasks automatically,
            share memory systems, optimize revenue,
            manage cloud deployments, generate
            content, launch websites, build apps,
            and operate fully autonomous businesses.
          </p>
        </div>
      </main>
    </>
  );
}

/* TEAM CARD */

function TeamCard({
  icon,
  title,
  status,
  color,
  tasks,
}: {
  icon: string;
  title: string;
  status: string;
  color: string;
  tasks: string[];
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        borderRadius: "28px",
        padding: "30px",
        border: `1px solid ${color}`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "22px",
        }}
      >
        <div
          style={{
            fontSize: "44px",
          }}
        >
          {icon}
        </div>

        <div
          style={{
            background: color,
            padding: "8px 14px",
            borderRadius: "14px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {status}
        </div>
      </div>

      <h2
        style={{
          fontSize: "30px",
          marginBottom: "22px",
        }}
      >
        {title}
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {tasks.map((task, index) => (
          <div
            key={index}
            style={{
              background: "#111827",
              padding: "14px",
              borderRadius: "14px",
              color: "#94a3b8",
            }}
          >
            {task}
          </div>
        ))}
      </div>
    </div>
  );
}
