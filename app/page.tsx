"use client";
import { useState } from "react";
import Link from "next/link";
import Sidebar from "./components/Sidebar";

export default function Home() {
const [message, setMessage] = useState("");
const [reply, setReply] = useState("AI CEO ONLINE");

async function sendMessage() {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  });

  const data = await res.json();

  setReply(data.reply || JSON.stringify(data));
}
  return (
    <>
      <Sidebar />

      <main
        style={{
          background: "#020617",
          minHeight: "100vh",
          color: "white",
          fontFamily: "Arial",
          marginLeft: "0px",
paddingLeft: "280px",
maxWidth: "100vw",
overflowX: "hidden",
        }}
      >
<div
  style={{
    background: "#0f172a",
    padding: "30px",
    borderRadius: "25px",
    marginTop: "40px",
  }}
>
  <h2
    style={{
      fontSize: "clamp(28px,5vw,40px)",
      marginBottom: "20px",
    }}
  >
    👑 CEO AI CHAT
  </h2>

  <div
    style={{
      background: "#020617",
      padding: "20px",
      borderRadius: "15px",
      minHeight: "120px",
      marginBottom: "20px",
      color: "#38bdf8",
    }}
  >
    {reply}
  </div>

  <div
    style={{
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    }}
  >
    <input
      value={message}
      onChange={(e) =>
        setMessage(e.target.value)
      }
      placeholder="Send command to CEO AI..."
      style={{
        flex: 1,
        padding: "16px",
        borderRadius: "15px",
        border: "1px solid #334155",
        background: "#020617",
        color: "white",
      }}
    />

    <button
      onClick={sendMessage}
      style={{
        background: "#2563eb",
        border: "none",
        color: "white",
        padding: "16px 24px",
        borderRadius: "15px",
        fontWeight: "bold",
      }}
    >
      🚀 Send
    </button>
  </div>
</div>
        {/* HERO */}

        <section
          style={{
            padding: "80px 40px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "30px",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "clamp(36px,8vw,72px)",
                  marginBottom: "20px",
                  fontWeight: "bold",
                }}
              >
                🚀 FUTURE AI
                <br />
                ECOSYSTEM
              </h1>

              <p
                style={{
                  fontSize: "24px",
                  color: "#94a3b8",
                  maxWidth: "900px",
                  lineHeight: "1.8",
                }}
              >
                Autonomous AI business infrastructure
                with self-learning systems, YouTube
                automation, Instagram AI, ecommerce
                workflows, analytics intelligence,
                futuristic memory systems, cloud
                orchestration, and advanced AI teams.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  marginTop: "35px",
                  flexWrap: "wrap",
                }}
              >
                <HeroButton
                  href="/assistant"
                  text="🤖 AI Assistant"
                />

                <HeroButton
                  href="/agents"
                  text="🧠 AI Agents"
                />

                <HeroButton
                  href="/automation"
                  text="⚡ Automation"
                />
              </div>
            </div>

            {/* STATUS CARD */}

            <div
              style={{
                background: "#0f172a",
                padding: "35px",
                borderRadius: "28px",
                border: "1px solid #1e293b",
                minWidth: "320px",
              }}
            >
              <h2
                style={{
                  fontSize: "34px",
                  marginBottom: "25px",
                }}
              >
                🟢 System Online
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  color: "#94a3b8",
                  fontSize: "18px",
                }}
              >
                <p>🤖 AI Core: ACTIVE</p>
                <p>⚡ Automation: RUNNING</p>
                <p>☁️ Cloud Sync: CONNECTED</p>
                <p>📡 Bots: ONLINE</p>
                <p>🧠 Memory Engine: ACTIVE</p>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}

        <section
          style={{
            padding: "20px 40px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(260px,1fr))",
              gap: "25px",
            }}
          >
            <StatCard
              title="🤖 Active AI Agents"
              value="12"
              color="#38bdf8"
            />

            <StatCard
              title="⚡ Running Workflows"
              value="128"
              color="#22c55e"
            />

            <StatCard
              title="💰 Revenue Generated"
              value="$24,580"
              color="#f59e0b"
            />

            <StatCard
              title="📺 YouTube Views"
              value="12.8M"
              color="#a855f7"
            />
          </div>
        </section>

        {/* AI ANALYTICS */}

        <section
          style={{
            padding: "70px 40px",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(28px,6vw,50px)",
              marginBottom: "40px",
            }}
          >
            📊 Live AI Analytics
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(420px,1fr))",
              gap: "30px",
            }}
          >
            {/* BAR GRAPH */}

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
                  marginBottom: "20px",
                  fontSize: "30px",
                }}
              >
                🚀 AI Growth
              </h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "15px",
                  height: "250px",
                }}
              >
                {[40, 70, 100, 130, 170, 220, 300].map(
                  (height, index) => (
                    <div
                      key={index}
                      style={{
                        background:
                          "linear-gradient(to top,#2563eb,#38bdf8)",
                        width: "45px",
                        height: `${height}px`,
                        borderRadius: "12px",
                      }}
                    />
                  )
                )}
              </div>

              <p
                style={{
                  marginTop: "20px",
                  color: "#94a3b8",
                }}
              >
                AI ecosystem scaling analytics
              </p>
            </div>

            {/* LINE GRAPH */}

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
                  marginBottom: "20px",
                  fontSize: "30px",
                }}
              >
                💰 Revenue Analytics
              </h2>

              <div
                style={{
                  position: "relative",
                  height: "250px",
                  borderLeft: "2px solid #334155",
                  borderBottom: "2px solid #334155",
                }}
              >
                <svg width="100%" height="250">
                  <polyline
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="6"
                    points="
                      0,220
                      60,180
                      120,170
                      180,120
                      240,100
                      300,70
                      360,30
                    "
                  />
                </svg>
              </div>

              <p
                style={{
                  marginTop: "20px",
                  color: "#94a3b8",
                }}
              >
                Autonomous monetization intelligence
              </p>
            </div>
          </div>
        </section>

        {/* MODULES */}

        <section
          style={{
            padding: "60px 40px",
          }}
        >
          <h2
            style={{
              fontSize: "50px",
              marginBottom: "40px",
            }}
          >
            🔥 AI Infrastructure Modules
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(320px,1fr))",
              gap: "25px",
            }}
          >
            <Module
              title="📺 YouTube AI"
              desc="Multi-channel YouTube automation and AI content generation."
            />

            <Module
              title="📸 Instagram AI"
              desc="AI reels, captions, hashtags, and viral growth."
            />

            <Module
              title="🎬 Video Editing AI"
              desc="Professional cinematic editing and shorts creation."
            />

            <Module
              title="🌐 Website AI"
              desc="AI-powered SaaS and website generation."
            />

            <Module
              title="🛒 Ecommerce AI"
              desc="Shopify and dropshipping automation system."
            />

            <Module
              title="🧠 Memory AI"
              desc="Self-learning intelligence storage engine."
            />

            <Module
              title="📡 Telegram AI"
              desc="Remote AI control and monitoring system."
            />

            <Module
              title="⚡ Workflow AI"
              desc="Advanced autonomous workflow orchestration."
            />

            <Module
              title="💰 Revenue AI"
              desc="Revenue optimization and analytics intelligence."
            />
          </div>
        </section>

        {/* FUTURE SECTION */}

        <section
          style={{
            padding: "60px 40px",
          }}
        >
          <div
            style={{
              background: "#0f172a",
              borderRadius: "30px",
              padding: "50px",
              border: "1px solid #1e293b",
            }}
          >
            <h2
              style={{
                fontSize: "50px",
                marginBottom: "25px",
              }}
            >
              🚀 Autonomous AI Future
            </h2>

            <p
              style={{
                fontSize: "22px",
                color: "#94a3b8",
                lineHeight: "1.9",
              }}
            >
              This AI ecosystem is evolving into a
              futuristic autonomous business operating
              system capable of building websites,
              creating videos, managing social media,
              scaling revenue systems, learning from
              analytics, and orchestrating advanced
              cloud-based AI teams.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

/* HERO BUTTON */

function HeroButton({
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
        fontSize: "20px",
        fontWeight: "bold",
      }}
    >
      {text}
    </Link>
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
        background: "#0f172a",
        padding: "30px",
        borderRadius: "24px",
        border: "1px solid #1e293b",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          marginBottom: "15px",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          fontSize: "42px",
          color,
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
          lineHeight: "1.8",
          fontSize: "18px",
        }}
      >
        {desc}
      </p>
    </div>
  );
}
