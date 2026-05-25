import Link from "next/link";

export default function AutomationPage() {
  return (
    <main
      style={{
        background: "#020617",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial",
        display: "flex",
      }}
    >
      {/* SIDEBAR */}

      <aside
        style={{
          width: "260px",
          background: "#0f172a",
          padding: "25px",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          borderRight: "1px solid #1e293b",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            marginBottom: "40px",
          }}
        >
          🤖 AI OS
        </h1>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <SidebarLink href="/" label="🏠 Dashboard" />
          <SidebarLink href="/agents" label="🤖 Agents" />
          <SidebarLink href="/automation" label="⚡ Automation" />
          <SidebarLink href="/analytics" label="📊 Analytics" />
          <SidebarLink href="/telegram" label="📡 Telegram" />
          <SidebarLink href="/memory" label="🧠 Memory" />
          <SidebarLink href="/revenue" label="💰 Revenue" />
          <SidebarLink href="/settings" label="⚙️ Settings" />
        </nav>
      </aside>

      {/* MAIN */}

      <div
        style={{
          marginLeft: "260px",
          width: "100%",
        }}
      >
        {/* NAVBAR */}

        <header
          style={{
            background: "#111827",
            padding: "22px",
            borderBottom: "1px solid #1e293b",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
            }}
          >
            ⚡ Automation Center
          </h2>
        </header>

        {/* CONTENT */}

        <div
          style={{
            padding: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "56px",
              marginBottom: "10px",
            }}
          >
            🚀 AI Workflow Engine
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "20px",
            }}
          >
            Autonomous workflow orchestration system.
          </p>

          {/* WORKFLOW CARDS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(300px,1fr))",
              gap: "25px",
              marginTop: "40px",
            }}
          >
            <WorkflowCard
              title="📺 YouTube Workflow"
              status="Running"
              tasks="128 Tasks"
              desc="Script → Voice → Video → Thumbnail → Upload"
            />

            <WorkflowCard
              title="📸 Instagram Workflow"
              status="Active"
              tasks="64 Tasks"
              desc="Trend → Caption → Reel → Hashtags → Posting"
            />

            <WorkflowCard
              title="🌐 Website Workflow"
              status="Deploying"
              tasks="18 Tasks"
              desc="Design → Code → Build → Deploy"
            />

            <WorkflowCard
              title="🛒 Ecommerce Workflow"
              status="Scanning"
              tasks="42 Tasks"
              desc="Trend → Product → Ads → Marketing"
            />

            <WorkflowCard
              title="🎬 Video Workflow"
              status="Rendering"
              tasks="89 Tasks"
              desc="Script → Edit → Effects → Subtitles"
            />

            <WorkflowCard
              title="💼 Freelance Workflow"
              status="Ready"
              tasks="22 Tasks"
              desc="Client → Proposal → Delivery → Revenue"
            />
          </div>

          {/* PIPELINE */}

          <div
            style={{
              marginTop: "50px",
              background: "#0f172a",
              padding: "35px",
              borderRadius: "25px",
            }}
          >
            <h2
              style={{
                fontSize: "34px",
                marginBottom: "25px",
              }}
            >
              🔥 Autonomous AI Pipeline
            </h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
                alignItems: "center",
              }}
            >
              <PipelineBox text="Trend AI" />
              <Arrow />
              <PipelineBox text="Script AI" />
              <Arrow />
              <PipelineBox text="Voice AI" />
              <Arrow />
              <PipelineBox text="Video AI" />
              <Arrow />
              <PipelineBox text="Thumbnail AI" />
              <Arrow />
              <PipelineBox text="Upload AI" />
              <Arrow />
              <PipelineBox text="Analytics AI" />
              <Arrow />
              <PipelineBox text="Memory AI" />
            </div>
          </div>

          {/* FUTURE */}

          <div
            style={{
              marginTop: "50px",
              background: "#0f172a",
              padding: "30px",
              borderRadius: "25px",
            }}
          >
            <h2
              style={{
                fontSize: "32px",
                marginBottom: "20px",
              }}
            >
              🤖 Future Automation System
            </h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.8",
                fontSize: "18px",
              }}
            >
              Your automation engine will eventually manage
              autonomous businesses, AI content creation,
              ecommerce systems, marketing campaigns, website
              deployments, multi-platform uploads, analytics,
              and self-improving optimization workflows.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* WORKFLOW CARD */

function WorkflowCard({
  title,
  status,
  tasks,
  desc,
}: {
  title: string;
  status: string;
  tasks: string;
  desc: string;
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        padding: "25px",
        borderRadius: "22px",
        border: "1px solid #1e293b",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          marginBottom: "10px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          color: "#22c55e",
          marginBottom: "10px",
        }}
      >
        ● {status}
      </p>

      <p
        style={{
          color: "#38bdf8",
          marginBottom: "15px",
        }}
      >
        {tasks}
      </p>

      <p
        style={{
          color: "#94a3b8",
          lineHeight: "1.7",
        }}
      >
        {desc}
      </p>
    </div>
  );
}

/* PIPELINE BOX */

function PipelineBox({
  text,
}: {
  text: string;
}) {
  return (
    <div
      style={{
        background: "#111827",
        padding: "14px 22px",
        borderRadius: "14px",
        border: "1px solid #1e293b",
      }}
    >
      {text}
    </div>
  );
}

/* ARROW */

function Arrow() {
  return (
    <div
      style={{
        fontSize: "24px",
        color: "#38bdf8",
      }}
    >
      →
    </div>
  );
}

/* SIDEBAR LINK */

function SidebarLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      style={{
        color: "white",
        textDecoration: "none",
        background: "#111827",
        padding: "14px",
        borderRadius: "14px",
      }}
    >
      {label}
    </Link>
  );
}
