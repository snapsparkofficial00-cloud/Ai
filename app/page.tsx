"use client";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import Link from "next/link";
import Sidebar from "./components/Sidebar";

export default function Home() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<
    { role: string; text: string }[]
  >([
    {
      role: "ai",
      text: "👑 AI CEO ONLINE",
    },
  ]);

  const [loading, setLoading] = useState(false);

  async function sendMessage() {

    if (!message) return;

    const currentMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: currentMessage,
      },
    ]);

    setMessage("");

    setLoading(true);

    try {

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentMessage,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            data.reply ||
            "⚠️ No response from AI",
        },
      ]);

    } catch (error) {

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "❌ AI ERROR",
        },
      ]);

    }

    setLoading(false);
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
          padding: "20px",
          overflowX: "hidden",
        }}
      >

        {/* CHAT */}

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

          {/* CHAT BOX */}

          <div
            style={{
              background: "#020617",
              padding: "20px",
              borderRadius: "15px",
              minHeight: "300px",
              marginBottom: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >

            {messages.map((msg, index) => (

              <div
                key={index}
                style={{
                  background:
                    msg.role === "user"
                      ? "#2563eb"
                      : "#111827",

                  padding: "14px",
                  borderRadius: "14px",

                  alignSelf:
                    msg.role === "user"
                      ? "flex-end"
                      : "flex-start",

                  maxWidth: "85%",
                }}
              >
                {msg.text}
              </div>

            ))}

            {loading && (

              <div
                style={{
                  color: "#38bdf8",
                }}
              >
                🤖 CEO AI typing...
              </div>

            )}

          </div>

          {/* INPUT */}

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
                cursor: "pointer",
              }}
            >
              🚀 Send
            </button>

          </div>

        </div>

        {/* HERO */}

        <section
          style={{
            padding: "80px 0px",
          }}
        >

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
            with self-learning systems,
            automation workflows,
            analytics intelligence,
            cloud orchestration,
            and advanced AI teams.
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
