"use client";

import Link from "next/link";
import { useState } from "react";
import Sidebar from "./components/Sidebar";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("AI CEO ONLINE");

  async function sendMessage() {
    try {
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

      setReply(data.reply || "No response");
    } catch (error) {
      setReply("AI connection failed");
    }
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
          padding: "30px",
          overflowX: "hidden",
        }}
      >
        {/* HERO */}

        <section
          style={{
            background:
              "linear-gradient(to right,#0f172a,#081028)",
            border: "1px solid #1e293b",
            borderRadius: "35px",
            padding: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "40px",
            }}
          >
            {/* LEFT */}

            <div style={{ flex: 1, minWidth: "300px" }}>
              <h1
                style={{
                  fontSize: "72px",
                  fontWeight: "bold",
                  lineHeight: "1.1",
                }}
              >
                🚀 FUTURE AI
                <br />
                COMMAND CENTER
              </h1>

              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "22px",
                  lineHeight: "1.9",
                  marginTop: "30px",
                  maxWidth: "900px",
                }}
              >
                Autonomous AI ecosystem with
                futuristic analytics, multi-agent
                orchestration, CEO intelligence,
                revenue systems, YouTube automation,
                ecommerce AI, memory systems, cloud
                infrastructure and advanced AI
                business operations.
              </p>

              {/* BUTTONS */}

              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  marginTop: "40px",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  href="/assistant"
                  text="🤖 AI Assistant"
                  color="#2563eb"
                />

                <Button
                  href="/agents"
                  text="🧠 AI Agents"
                  color="#06b6d4"
                />

                <Button
                  href="/terminal"
                  text="💻 AI Terminal"
                  color="#7c3aed"
                />

                <Button
                  href="/analytics"
                  text="📊 Analytics"
                  color="#16a34a"
                />
              </div>
            </div>

            {/* SYSTEM STATUS */}

            <div
              style={{
                width: "360px",
                background: "#0f172a",
                borderRadius: "30px",
                border: "1px solid #1e293b",
                padding: "30px",
              }}
            >
              <h2
                style={{
                  fontSize: "36px",
                  marginBottom: "30px",
                }}
              >
                🟢 AI STATUS
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                  color: "#94a3b8",
                  fontSize: "18px",
                }}
              >
                <p>🤖 AI Core: ACTIVE</p>
                <p>⚡ Automation: RUNNING</p>
                <p>☁️ Cloud Sync: CONNECTED</p>
                <p>📡 Telegram Bots: ONLINE</p>
                <p>🧠 Memory Engine: ACTIVE</p>
                <p>📊 Analytics AI: LIVE</p>
                <p>💰 Revenue AI: TRACKING</p>
                <p>🛡️ Security AI: ENABLED</p>
              </div>
            </div>
          </div>
        </section>

        {/* CEO CHAT */}

        <section
          style={{
            marginTop: "50px",
            background: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "35px",
            padding: "40px",
          }}
        >
          <h2
            style={{
              fontSize: "50px",
              marginBottom: "25px",
            }}
          >
            👑 CEO AI COMMAND CHAT
          </h2>

          <div
            style={{
              background: "#020617",
              padding: "25px",
              borderRadius: "20px",
              minHeight: "180px",
              border: "1px solid #1e293b",
              color: "#38bdf8",
              fontSize: "20px",
              lineHeight: "1.8",
            }}
          >
            {reply}
          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "25px",
              flexWrap: "wrap",
            }}
          >
            <input
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="Give command to CEO AI..."
              style={{
                flex: 1,
                minWidth: "250px",
                background: "#020617",
                border: "1px solid #334155",
                color: "white",
                padding: "18px",
                borderRadius: "18px",
                fontSize: "18px",
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                background:
                  "linear-gradient(to right,#2563eb,#38bdf8)",
                border: "none",
                color: "white",
                padding: "18px 28px",
                borderRadius: "18px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              🚀 Execute
            </button>
          </div>
        </section>

        {/* STATS */}

        <section
          style={{
            marginTop: "50px",
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
              title="🤖 AI Agents"
              value="12"
              color="#38bdf8"
            />

            <StatCard
              title="⚡ Workflows"
              value="128"
              color="#22c55e"
            />

            <StatCard
              title="💰 Revenue"
              value="$24,580"
              color="#f59e0b"
            />

            <StatCard
              title="📺 Views"
              value="12.8M"
              color="#a855f7"
            />
          </div>
        </section>

        {/* ANALYTICS */}

        <section
          style={{
            marginTop: "60px",
          }}
        >
          <h2
            style={{
              fontSize: "50px",
              marginBottom: "35px",
            }}
          >
            📊 AI ANALYTICS
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(420px,1fr))",
              gap: "30px",
            }}
          >
            {/* GRAPH */}

            <div
              style={{
                background: "#0f172a",
                borderRadius: "30px",
                padding: "30px",
                border: "1px solid #1e293b",
              }}
            >
              <h2
                style={{
                  marginBottom: "30px",
                  fontSize: "30px",
                }}
              >
                🚀 Growth Engine
              </h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "15px",
                  height: "250px",
                }}
              >
                {[50, 90, 130, 170, 210, 250, 300].map(
                  (height, index) => (
                    <div
                      key={index}
                      style={{
                        background:
                          "linear-gradient(to top,#2563eb,#38bdf8)",
                        width: "50px",
                        height: `${height}px`,
                        borderRadius: "12px",
                      }}
                    />
                  )
                )}
              </div>
            </div>

            {/* MODULES */}

            <div
              style={{
                background: "#0f172a",
                borderRadius: "30px",
                padding: "30px",
                border: "1px solid #1e293b",
              }}
            >
              <h2
                style={{
                  marginBottom: "30px",
                  fontSize: "30px",
                }}
              >
                🌐 AI MODULES
              </h2>

              <div
                style={{
                  display: "grid",
                  gap: "15px",
                }}
              >
                <Module text="📺 YouTube AI" />
                <Module text="📸 Instagram AI" />
                <Module text="🎬 Video AI" />
                <Module text="🌐 Website AI" />
                <Module text="🛒 Ecommerce AI" />
                <Module text="📡 Telegram AI" />
                <Module text="🧠 Memory AI" />
              </div>
            </div>
          </div>
        </section>

        {/* FUTURE */}

        <section
          style={{
            marginTop: "60px",
            marginBottom: "50px",
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(to right,#0f172a,#081028)",
              borderRadius: "35px",
              padding: "50px",
              border: "1px solid #1e293b",
            }}
          >
            <h2
              style={{
                fontSize: "55px",
                marginBottom: "30px",
              }}
            >
              🌌 FUTURE AI VISION
            </h2>

            <p
              style={{
                fontSize: "22px",
                color: "#94a3b8",
                lineHeight: "2",
              }}
            >
              This AI infrastructure is evolving into
              a futuristic autonomous operating
              system capable of generating businesses,
              building SaaS products, managing
              automation workflows, scaling social
              media brands, orchestrating AI agents,
              optimizing monetization systems, and
              creating a self-growing AI ecosystem.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

/* BUTTON */

function Button({
  href,
  text,
  color,
}: {
  href: string;
  text: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      style={{
        background: color,
        padding: "18px 28px",
        borderRadius: "18px",
        color: "white",
        textDecoration: "none",
        fontWeight: "bold",
        fontSize: "18px",
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
        borderRadius: "25px",
        padding: "30px",
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
          fontSize: "48px",
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
  text,
}: {
  text: string;
}) {
  return (
    <div
      style={{
        background: "#020617",
        padding: "18px",
        borderRadius: "16px",
        border: "1px solid #1e293b",
        fontSize: "18px",
      }}
    >
      {text}
    </div>
  );
}
