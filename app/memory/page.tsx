"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";

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
      }}
    >
      <Sidebar />

      <div
        style={{
          width: "100%",
          paddingTop: "70px",
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
              margin: 0,
            }}
          >
            🧠 Memory Intelligence System
          </h2>
        </header>

        {/* CONTENT */}

        <div
          style={{
            padding: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              marginBottom: "10px",
              lineHeight: "1.2",
            }}
          >
            🚀 AI Memory Core
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "18px",
              marginBottom: "30px",
            }}
          >
            Self-learning intelligence storage system.
          </p>

          <div
            style={{
              background: "#0f172a",
              padding: "20px",
              borderRadius: "25px",
              border: "1px solid #1e293b",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                marginBottom: "20px",
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
                      padding: "20px",
                      borderRadius: "18px",
                      border: "1px solid #1e293b",
                    }}
                  >
                    <h3
                      style={{
                        color: "#38bdf8",
                        marginBottom: "10px",
                      }}
                    >
                      ⚡ {item.task}
                    </h3>

                    <p
                      style={{
                        color: "#94a3b8",
                        whiteSpace: "pre-wrap",
                        lineHeight: "1.8",
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
