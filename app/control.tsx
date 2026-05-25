"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function ControlPage() {
  const [system, setSystem] = useState(true);
  const [automation, setAutomation] =
    useState(true);
  const [cloud, setCloud] = useState(false);

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
            🎛️ AI Command Center
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "22px",
              lineHeight: "1.8",
              maxWidth: "1000px",
            }}
          >
            Centralized control system for AI agents,
            automations, cloud systems,
            monitoring tools, mobile operations,
            and autonomous business infrastructure.
          </p>
        </div>

        {/* LIVE CONTROL GRID */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(340px,1fr))",
            gap: "28px",
            marginBottom: "50px",
          }}
        >
          <ToggleCard
            title="🤖 AI Core"
            state={system}
            setState={setSystem}
            color="#22c55e"
          />

          <ToggleCard
            title="⚡ Automation"
            state={automation}
            setState={setAutomation}
            color="#f59e0b"
          />

          <ToggleCard
            title="☁️ Cloud Sync"
            state={cloud}
            setState={setCloud}
            color="#38bdf8"
          />
        </div>

        {/* QUICK ACTIONS */}

        <div
          style={{
            background: "#0f172a",
            padding: "40px",
            borderRadius: "30px",
            border: "1px solid #1e293b",
            marginBottom: "50px",
          }}
        >
          <h2
            style={{
              fontSize: "42px",
              marginBottom: "30px",
            }}
          >
            🚀 Quick AI Actions
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(260px,1fr))",
              gap: "24px",
            }}
          >
            <ActionCard
              icon="📺"
              title="Launch YouTube AI"
              color="#ef4444"
            />

            <ActionCard
              icon="📸"
              title="Start Instagram AI"
              color="#a855f7"
            />

            <ActionCard
              icon="🛒"
              title="Run Ecommerce AI"
              color="#22c55e"
            />

            <ActionCard
              icon="🎬"
              title="Generate Videos"
              color="#38bdf8"
            />

            <ActionCard
              icon="🧠"
              title="Optimize Memory"
              color="#06b6d4"
            />

            <ActionCard
              icon="⚡"
              title="Execute Workflow"
              color="#f59e0b"
            />
          </div>
        </div>
