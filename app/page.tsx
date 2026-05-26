"use client";

import Link from "next/link";

const cards = [
{
title: "AI Agents",
value: "12 Active",
icon: "🤖",
color: "#38bdf8",
},
{
title: "Automation",
value: "128 Running",
icon: "⚡",
color: "#22c55e",
},
{
title: "Cloud",
value: "Connected",
icon: "☁️",
color: "#a855f7",
},
{
title: "CEO AI",
value: "Online",
icon: "🧠",
color: "#f59e0b",
},
];

const modules = [
"YouTube AI",
"Instagram AI",
"Video Generator",
"AI Automation",
"Cloud Intelligence",
"Analytics System",
"Telegram Control",
"Memory Engine",
"Revenue AI",
"Security Shield",
"Terminal Access",
"AI Marketplace",
];

export default function HomePage() {
return (
<div
style={{
minHeight: "100vh",
background:
"linear-gradient(to bottom,#020617,#030b1d)",
color: "white",
padding: "40px",
fontFamily: "Arial",
}}
>
{/* HERO */}

  <div
    style={{
      marginBottom: "60px",
    }}
  >
    <div
      style={{
        display: "inline-block",
        background: "#0f172a",
        padding: "10px 18px",
        borderRadius: "999px",
        border: "1px solid #1e293b",
        marginBottom: "25px",
      }}
    >
      🚀 FUTURE AI OPERATING SYSTEM
    </div>

    <h1
      style={{
        fontSize: "72px",
        lineHeight: "1.1",
        marginBottom: "25px",
        fontWeight: "bold",
      }}
    >
      Autonomous
      <br />
      AI Ecosystem
    </h1>

    <p
      style={{
        fontSize: "24px",
        color: "#94a3b8",
        lineHeight: "1.8",
        maxWidth: "1100px",
      }}
    >
      Powerful AI infrastructure with autonomous
      agents, cloud intelligence, analytics,
      automation systems, futuristic dashboards,
      revenue optimization, memory engines, and
      CEO command systems.
    </p>

    <div
      style={{
        display: "flex",
        gap: "20px",
        marginTop: "35px",
        flexWrap: "wrap",
      }}
    >
      <ActionButton
        href="/assistant"
        text="🤖 AI Assistant"
      />

      <ActionButton
        href="/agents"
        text="🧠 AI Agents"
      />

      <ActionButton
        href="/terminal"
        text="💻 Terminal"
      />

      <ActionButton
        href="/analytics"
        text="📊 Analytics"
      />
    </div>
  </div>

  {/* STATUS GRID */}

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(260px,1fr))",
      gap: "25px",
      marginBottom: "70px",
    }}
  >
    {cards.map((card, index) => (
      <div
        key={index}
        style={{
          background: "#0f172a",
          padding: "35px",
          borderRadius: "28px",
          border: "1px solid #1e293b",
          boxShadow:
            "0 0 30px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            fontSize: "30px",
            marginBottom: "18px",
          }}
        >
          {card.icon}
        </div>

        <h2
          style={{
            fontSize: "34px",
            marginBottom: "12px",
          }}
        >
          {card.title}
        </h2>

        <p
          style={{
            color: card.color,
            fontSize: "42px",
            fontWeight: "bold",
          }}
        >
          {card.value}
        </p>
      </div>
    ))}
  </div>

  {/* ANALYTICS */}

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(420px,1fr))",
      gap: "30px",
      marginBottom: "70px",
    }}
  >
    {/* GRAPH */}

    <div
      style={{
        background: "#0f172a",
        padding: "35px",
        borderRadius: "28px",
        border: "1px solid #1e293b",
      }}
    >
      <h2
        style={{
          fontSize: "34px",
          marginBottom: "25px",
        }}
      >
        📈 AI Growth
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "15px",
          height: "260px",
        }}
      >
        {[60, 100, 140, 180, 220, 260].map(
          (height, index) => (
            <div
              key={index}
              style={{
                width: "55px",
                height: `${height}px`,
                borderRadius: "18px",
                background:
                  "linear-gradient(to top,#2563eb,#38bdf8)",
              }}
            />
          )
        )}
      </div>
    </div>

    {/* SYSTEM STATUS */}

    <div
      style={{
        background: "#0f172a",
        padding: "35px",
        borderRadius: "28px",
        border: "1px solid #1e293b",
      }}
    >
      <h2
        style={{
          fontSize: "34px",
          marginBottom: "30px",
        }}
      >
        🟢 System Status
      </h2>

      <Status text="AI Core Active" />
      <Status text="Cloud Sync Connected" />
      <Status text="Automation Running" />
      <Status text="Memory Engine Online" />
      <Status text="Revenue Tracking Active" />
      <Status text="Analytics Operational" />
    </div>
  </div>

  {/* MODULES */}

  <div>
    <h2
      style={{
        fontSize: "52px",
        marginBottom: "40px",
      }}
    >
      🔥 AI Modules
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(260px,1fr))",
        gap: "25px",
      }}
    >
      {modules.map((module, index) => (
        <div
          key={index}
          style={{
            background: "#0f172a",
            padding: "28px",
            borderRadius: "24px",
            border: "1px solid #1e293b",
          }}
        >
          <h3
            style={{
              fontSize: "28px",
              marginBottom: "15px",
            }}
          >
            🚀 {module}
          </h3>

          <p
            style={{
              color: "#94a3b8",
              lineHeight: "1.7",
              fontSize: "17px",
            }}
          >
            Advanced AI infrastructure module for
            futuristic autonomous business systems.
          </p>
        </div>
      ))}
    </div>
  </div>
</div>

);
}

/* BUTTON */

function ActionButton({
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
background:
"linear-gradient(to right,#2563eb,#38bdf8)",
padding: "18px 28px",
borderRadius: "18px",
color: "white",
textDecoration: "none",
fontWeight: "bold",
fontSize: "20px",
}}
>
{text}
</Link>
);
}

/* STATUS */

function Status({
text,
}: {
text: string;
}) {
return (
<div
style={{
display: "flex",
alignItems: "center",
gap: "14px",
marginBottom: "18px",
fontSize: "22px",
}}
>
<div
style={{
width: "14px",
height: "14px",
borderRadius: "999px",
background: "#22c55e",
}}
/>

  <span>{text}</span>
</div>

);
}
