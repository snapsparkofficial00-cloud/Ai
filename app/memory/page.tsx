"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function MemoryPage() {

  const [memory, setMemory] = useState<any[]>([]);

  async function loadMemory() {

    try {

      const res = await fetch("/api/memory");

      const data = await res.json();

      setMemory(data.memory || []);

    } catch (err) {

      console.log(err);

    }

  }

  useEffect(() => {

    loadMemory();

  }, []);

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
          <SidebarLink href="/assistant" label="👑 CEO AI" />
          <SidebarLink href="/agents" label="🤖 Agents" />
          <SidebarLink href="/automation" label="⚡ Automation" />
          <SidebarLink href="/analytics" label="📊 Analytics" />
          <SidebarLink href="/memory" label="🧠 Memory" />

        </nav>

      </aside>

      {/* MAIN */}

      <div
        style={{
          marginLeft: "260px",
          width: "100%",
        }}
      >

        {/* HEADER */}

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
            🧠 Memory Intelligence System
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
            🚀 AI Memory Core
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "20px",
              marginBottom: "40px",
            }}
          >
            Self-learning intelligence storage system.
          </p>

          {/* LIVE MEMORY */}

          <div
            style={{
              background: "#0f172a",
              padding: "30px",
              borderRadius: "25px",
              border: "1px solid #1e293b",
            }}
          >

            <h2
              style={{
                fontSize: "34px",
                marginBottom: "25px",
              }}
            >
              🔥 Live AI Memory
            </h2>

            {memory.length === 0 ? (

              <p
                style={{
                  color: "#94a3b8",
                }}
              >
                No memories stored yet...
              </p>

            ) : (

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >

                {memory.map((item, index) => (

                  <div
                    key={index}
                    style={{
                      background: "#111827",
                      padding: "22px",
                      borderRadius: "18px",
                      border: "1px solid #1e293b",
                    }}
                  >

                    <h2
                      style={{
                        fontSize: "24px",
                        marginBottom: "12px",
                        color: "#38bdf8",
                      }}
                    >
                      ⚡ {item.task}
                    </h2>

                    <p
                      style={{
                        color: "#94a3b8",
                        lineHeight: "1.8",
                        marginBottom: "14px",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {item.result}
                    </p>

                    <small
                      style={{
                        color: "#64748b",
                      }}
                    >
                      {item.timestamp}
                    </small>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </main>

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
