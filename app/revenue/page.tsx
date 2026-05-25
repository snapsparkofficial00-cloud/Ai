import Link from "next/link";

export default function RevenuePage() {
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
            💰 Revenue Intelligence System
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
            🚀 AI Revenue Dashboard
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "20px",
            }}
          >
            Monitor earnings and optimize monetization systems.
          </p>

          {/* REVENUE STATS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(260px,1fr))",
              gap: "25px",
              marginTop: "40px",
            }}
          >
            <RevenueCard
              title="💰 Total Revenue"
              value="$24,580"
              color="#22c55e"
            />

            <RevenueCard
              title="📺 YouTube Earnings"
              value="$12,240"
              color="#38bdf8"
            />

            <RevenueCard
              title="🛒 Ecommerce Revenue"
              value="$8,920"
              color="#f59e0b"
            />

            <RevenueCard
              title="💼 Freelance Income"
              value="$3,420"
              color="#a855f7"
            />
          </div>

          {/* BUSINESS MODULES */}

          <div
            style={{
              marginTop: "50px",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(340px,1fr))",
              gap: "25px",
            }}
          >
            <BusinessBox
              title="📺 YouTube Business"
              items={[
                "12 Active Channels",
                "AI Shorts Automation",
                "Thumbnail Optimization",
                "Ad Revenue Tracking",
              ]}
            />

            <BusinessBox
              title="🛒 Ecommerce Business"
              items={[
                "AI Product Research",
                "Store Automation",
                "Marketing Campaigns",
                "Conversion Analytics",
              ]}
            />

            <BusinessBox
              title="💼 Freelance Business"
              items={[
                "Client Management",
                "AI Proposal System",
                "Project Tracking",
                "Invoice Monitoring",
              ]}
            />

            <BusinessBox
              title="📸 Social Media Growth"
              items={[
                "Instagram AI",
                "Reels Automation",
                "Trend Detection",
                "Audience Growth",
              ]}
            />
          </div>

          {/* REVENUE PIPELINE */}

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
              🔥 AI Revenue Pipeline
            </h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
                alignItems: "center",
              }}
            >
              <Pipeline text="Trend AI" />
              <Arrow />
              <Pipeline text="Content AI" />
              <Arrow />
              <Pipeline text="Marketing AI" />
              <Arrow />
              <Pipeline text="Audience Growth" />
              <Arrow />
              <Pipeline text="Revenue AI" />
            </div>
          </div>

          {/* FUTURE */}

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
                marginBottom: "20px",
              }}
            >
              🚀 Autonomous AI Economy
            </h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.9",
                fontSize: "18px",
              }}
            >
              Your Revenue AI system will eventually manage
              multiple automated businesses including YouTube
              channels, ecommerce brands, freelance services,
              AI-generated products, marketing systems, and
              autonomous monetization workflows operating
              continuously in the cloud.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* REVENUE CARD */

function RevenueCard({
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
        padding: "28px",
        borderRadius: "22px",
        border: "1px solid #1e293b",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          marginBottom: "14px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          fontSize: "38px",
          fontWeight: "bold",
          color,
        }}
      >
        {value}
      </p>
    </div>
  );
}

/* BUSINESS BOX */

function BusinessBox({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        padding: "28px",
        borderRadius: "22px",
        border: "1px solid #1e293b",
      }}
    >
      <h2
        style={{
          fontSize: "28px",
          marginBottom: "20px",
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
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#111827",
              padding: "14px",
              borderRadius: "14px",
              color: "#94a3b8",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* PIPELINE */

function Pipeline({
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
