"use client";

import Link from "next/link";
import {
  Bot,
  Brain,
  Cloud,
  Settings,
  Terminal,
  BarChart3,
  Shield,
  DollarSign,
  Rocket,
  Activity,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: Rocket, href: "/" },
    { name: "AI Assistant", icon: Bot, href: "/assistant" },
    { name: "AI Agents", icon: Brain, href: "/agents" },
    { name: "Automation", icon: Activity, href: "/automatic" },
    { name: "Analytics", icon: BarChart3, href: "/analytics" },
    { name: "Cloud", icon: Cloud, href: "/cloud" },
    { name: "Security", icon: Shield, href: "/security" },
    { name: "Revenue", icon: DollarSign, href: "/revenue" },
    { name: "Terminal", icon: Terminal, href: "/terminal" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 p-2 rounded-lg"
      >
        <Menu size={24} />
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
        fixed md:relative z-40
        top-0 left-0 h-screen
        w-72 bg-[#081028]
        border-r border-blue-900/40
        p-6
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        {/* CLOSE BUTTON MOBILE */}
        <div className="flex justify-between items-center md:hidden mb-8">
          <h1 className="text-xl font-bold text-cyan-400">AI OS</h1>

          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* LOGO */}
        <div className="hidden md:block mb-10">
          <h1 className="text-3xl font-bold text-cyan-400">
            AI OS
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Autonomous AI Infrastructure
          </p>
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-3">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                bg-[#0B1736]
                hover:bg-blue-600/20
                transition
              "
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* STATUS CARD */}
        <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 text-black">
          <h2 className="text-2xl font-bold">
            🚀 Future AI
          </h2>

          <p className="mt-3 text-sm font-medium">
            Multi-agent autonomous business ecosystem.
          </p>
        </div>
      </aside>

      {/* OVERLAY MOBILE */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed inset-0 bg-black/50 z-30 md:hidden
          "
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-0 p-6 md:p-10 overflow-hidden w-full">
        
        {/* HERO */}
        <div
          className="
            rounded-3xl
            bg-gradient-to-br
            from-[#081028]
            to-[#020617]
            border border-blue-900/40
            p-8
          "
        >
          <div className="flex items-center gap-4">
            <Rocket
              size={50}
              className="text-cyan-400"
            />

            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                FUTURE AI
                <br />
                ECOSYSTEM
              </h1>
            </div>
          </div>

          <p className="mt-8 text-gray-300 text-lg leading-9 max-w-4xl">
            Autonomous AI business infrastructure with self-learning systems,
            YouTube automation, Instagram AI, ecommerce workflows, analytics
            intelligence, futuristic memory systems, cloud orchestration,
            and advanced AI teams.
          </p>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            <button className="bg-blue-600 hover:bg-blue-700 transition rounded-2xl py-4 font-semibold">
              🤖 AI Assistant
            </button>

            <button className="bg-cyan-500 hover:bg-cyan-600 transition rounded-2xl py-4 font-semibold">
              🧠 AI Agents
            </button>

            <button className="bg-indigo-600 hover:bg-indigo-700 transition rounded-2xl py-4 font-semibold">
              ⚡ Automation
            </button>
          </div>
        </div>

        {/* STATUS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
          
          {/* CARD */}
          <div className="bg-[#081028] border border-blue-900/40 rounded-3xl p-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              🟢 System Online
            </h2>

            <div className="mt-8 space-y-5 text-gray-300">
              <p>🤖 AI Core: ACTIVE</p>
              <p>⚡ Automation: RUNNING</p>
              <p>☁️ Cloud Sync: CONNECTED</p>
              <p>📡 Bots: ONLINE</p>
              <p>🧠 Memory Engine: ACTIVE</p>
            </div>
          </div>

          {/* CARD */}
          <div className="bg-[#081028] border border-blue-900/40 rounded-3xl p-6">
            <h2 className="text-3xl font-bold">
              📈 Analytics
            </h2>

            <div className="mt-8 space-y-4">
              <div>
                <p className="text-gray-400">AI Agents</p>
                <h3 className="text-4xl font-bold text-cyan-400">
                  12
                </h3>
              </div>

              <div>
                <p className="text-gray-400">Workflows</p>
                <h3 className="text-4xl font-bold text-blue-400">
                  128
                </h3>
              </div>

              <div>
                <p className="text-gray-400">Revenue Streams</p>
                <h3 className="text-4xl font-bold text-green-400">
                  24
                </h3>
              </div>
            </div>
          </div>

          {/* CARD */}
          <div className="bg-[#081028] border border-blue-900/40 rounded-3xl p-6">
            <h2 className="text-3xl font-bold">
              ☁️ Cloud Systems
            </h2>

            <div className="mt-8 space-y-5 text-gray-300">
              <p>🌍 Vercel: CONNECTED</p>
              <p>📦 GitHub: ACTIVE</p>
              <p>🤗 Hugging Face: READY</p>
              <p>📡 Telegram Bot: ONLINE</p>
              <p>🛡️ Security Layer: ACTIVE</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
