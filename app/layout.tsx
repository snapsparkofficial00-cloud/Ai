"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import LiveAIPresence from "./components/LiveAIPresence";
import VoiceAssistant from "./components/VoiceAssistant";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  function handleVoiceCommand(command: string) {
    const lower = command.toLowerCase();
    
    if (lower.includes("youtube") || lower.includes("video")) {
      router.push("/youtube");
    } else if (lower.includes("ceo") || lower.includes("dashboard")) {
      router.push("/ceo");
    } else if (lower.includes("autopilot") || lower.includes("auto")) {
      router.push("/autopilot");
    } else if (lower.includes("generate") || lower.includes("create")) {
      router.push("/youtube");
    }
  }

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#020617" }}>
        <Sidebar onToggle={setSidebarOpen} />
        <div style={{
          marginLeft: sidebarOpen ? "280px" : "0px",
          transition: "margin-left 0.3s ease",
          minHeight: "100vh",
        }}>
          {children}
        </div>
        <LiveAIPresence />
        <VoiceAssistant onCommand={handleVoiceCommand} />
      </body>
    </html>
  );
}
