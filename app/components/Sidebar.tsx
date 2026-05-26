"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const menuItems = [
  "Dashboard",
  "AI Assistant",
  "AI Agents",
  "Automation",
  "Analytics",
  "Telegram",
  "Memory",
  "Revenue",
  "Cloud",
  "Deploy",
  "Control",
  "Security",
  "Notifications",
  "Mobile",
  "Monitor",
  "Marketplace",
  "Finance",
  "Settings",
  "Team",
  "Terminal",
  "CEO Chat",
];

export default function Sidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#020617] text-white overflow-x-hidden">
      
      {/* MOBILE BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 bg-blue-600 p-2 rounded-xl lg:hidden"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-[250px]
          bg-[#020b2d] border-r border-[#1e293b]
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="p-6">
          <h1 className="text-5xl font-bold text-cyan-400">AI OS</h1>

          <p className="text-gray-400 mt-3 text-sm">
            Autonomous AI Infrastructure
          </p>

          <div className="mt-8 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item}
                href={`/${item
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="
                  block
                  bg-[#071338]
                  hover:bg-[#0f1d4f]
                  rounded-2xl
                  px-5
                  py-4
                  text-lg
                  font-semibold
                  transition-all
                "
                onClick={() => setOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className="
          flex-1
          w-full
          transition-all
          duration-300
          lg:ml-[250px]
          overflow-x-hidden
        "
      >
        {children}
      </main>
    </div>
  );
}
