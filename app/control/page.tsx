"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";

export default function ControlPage() {
  const [system, setSystem] = useState(true);
  const [agents, setAgents] = useState(true);
  const [security, setSecurity] = useState(false);

  return (
    <>
      <Sidebar />

      <main
        style={{
          marginLeft: "280px",
          minHeight: "100vh",
          background: "#020617",
          color: "white",
          padding: "30px",
          fontFamily: "Arial",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            marginBottom: "30px",
          }}
        >
          AI Control Center
        </h1>

        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          {/* System Control */}
          <div
            style={{
              background: "#0f172a",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h2>System Power</h2>

            <button
              onClick={() => setSystem(!system)}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                background: system ? "#22c55e" : "#ef4444",
                color: "white",
              }}
            >
              {system ? "SYSTEM ONLINE" : "SYSTEM OFFLINE"}
            </button>
          </div>

          {/* AI Agents */}
          <div
            style={{
              background: "#0f172a",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h2>AI Agents</h2>

            <button
              onClick={() => setAgents(!agents)}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                background: agents ? "#3b82f6" : "#ef4444",
                color: "white",
              }}
            >
              {agents ? "AGENTS RUNNING" : "AGENTS STOPPED"}
            </button>
          </div>

          {/* Security */}
          <div
            style={{
              background: "#0f172a",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h2>Security Shield</h2>

            <button
              onClick={() => setSecurity(!security)}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                background: security ? "#eab308" : "#475569",
                color: "white",
              }}
            >
              {security ? "SECURITY ENABLED" : "SECURITY DISABLED"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
