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
            🤖 AI Team Management
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "22px",
              lineHeight: "1.8",
              maxWidth: "1000px",
            }}
          >
            Advanced autonomous AI workforce system
            managing multiple AI agents,
            departments, business operations,
            automation workflows,
            and intelligent digital employees.
          </p>
        </div>

        {/* TEAM STATS */}

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
            title="🤖 Active AI Agents"
            value="128"
            color="#22c55e"
          />

          <StatCard
            title="⚡ Running Tasks"
            value="542"
            color="#f59e0b"
          />

          <StatCard
            title="☁️ Cloud Workers"
            value="64"
            color="#38bdf8"
          />

          <StatCard
            title="💰 Revenue Bots"
            value="37"
            color="#a855f7"
          />
        </div>

        {/* AI TEAMS */}

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
            workers="24 AI Agents"
            color="#ef4444"
            desc="Video creation, SEO, thumbnails, analytics, and automation."
          />

          <TeamCard
            icon="📸"
            title="Instagram AI Team"
            workers="18 AI Agents"
            color="#a855f7"
            desc="Reels generation, captions, growth, and engagement automation."
          />

          <TeamCard
            icon="🛒"
            title="Ecommerce AI Team"
            workers="32 AI Agents"
            color="#22c55e"
            desc="Shopify operations, ads, products, and sales optimization."
          />

          <TeamCard
            icon="🌐"
            title="Web Builder AI"
            workers="14 AI Agents"
            color="#38bdf8"
            desc="Website creation, SaaS dashboards, and app development."
          />

          <TeamCard
            icon="🎬"
            title="Video Editing AI"
            workers="21 AI Agents"
            color="#f59e0b"
            desc="Professional cinematic video generation and editing."
          />

          <TeamCard
            icon="⚡"
            title="Automation Core"
            workers="19 AI Agents"
            color="#06b6d4"
            desc="Workflow automation and autonomous infrastructure control."
          />
        </div>

        {/* LIVE TASKS */}

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
              fontSize: "42px",
              marginBottom: "30px",
            }}
          >
            📡 Live AI Tasks
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            <TaskCard
              text="📺 YouTube AI generating viral shorts"
              color="#ef4444"
            />

            <TaskCard
              text="📸 Instagram AI scheduling reels"
              color="#a855f7"
            />

            <TaskCard
              text="🛒 Ecommerce AI optimizing products"
              color="#22c55e"
            />

            <TaskCard
              text="🌐 Website AI deploying new SaaS"
              color="#38bdf8"
            />

            <TaskCard
              text="⚡ Automation AI executing workflows"
              color="#f59e0b"
            />
          </div>
        </div>

        {/* FUTURE */}

        <div
          style={{
            marginTop: "60px",
            background:
              "linear-gradient(to right,#2563eb,#38bdf8)",
            padding: "45px",
            borderRadius: "30px",
          }}
        >
          <h2
            style={{
              fontSize: "42px",
              marginBottom: "24px",
            }}
          >
            🚀 Future Autonomous AI Workforce
          </h2>

          <p
            style={{
              fontSize: "20px",
              lineHeight: "1.9",
            }}
          >
            Future upgrades will allow AI agents
            to autonomously hire sub-agents,
            create new businesses,
            optimize operations,
            manage cloud infrastructure,
            scale digital products,
            and run complete autonomous ecosystems.
          </p>
        </div>
      </main>
    </>
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
        background: "#111827",
        padding: "28px",
        borderRadius: "22px",
        border: `1px solid ${color}`,
      }}
    >
      <h3
        style={{
          marginBottom: "16px",
          color: "#94a3b8",
        }}
      >
        {title}
      </h3>

      <div
        style={{
          fontSize: "38px",
          fontWeight: "bold",
          color,
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* TEAM CARD */

function TeamCard({
  icon,
  title,
  workers,
  desc,
  color,
}: {
  icon: string;
  title: string;
  workers: string;
  desc: string;
  color: string;
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
          fontSize: "48px",
          marginBottom: "20px",
        }}
      >
        {icon}
      </div>

      <h2
        style={{
          fontSize: "30px",
          marginBottom: "12px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color,
          fontWeight: "bold",
          marginBottom: "16px",
        }}
      >
        {workers}
      </p>

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

/* TASK CARD */

function TaskCard({
  text,
  color,
}: {
  text: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: "#111827",
        padding: "20px",
        borderRadius: "18px",
        borderLeft: `6px solid ${color}`,
        fontSize: "18px",
      }}
    >
      {text}
    </div>
  );
}
