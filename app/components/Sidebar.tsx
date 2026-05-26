"use client";

import Link from "next/link";
import { useState } from "react";

const menuItems = [
  { name: "Dashboard", link: "/" },
  { name: "AI Assistant", link: "/assistant" },
  { name: "AI Agents", link: "/agents" },
  { name: "Automation", link: "/automation" },
  { name: "Analytics", link: "/analytics" },
  { name: "Telegram", link: "/telegram" },
  { name: "Memory", link: "/memory" },
  { name: "Revenue", link: "/revenue" },
  { name: "Cloud", link: "/cloud" },
  { name: "Deploy", link: "/deploy" },
  { name: "Control", link: "/control" },
  { name: "Security", link: "/security" },
  { name: "Notifications", link: "/notifications" },
  { name: "Mobile", link: "/mobile" },
  { name: "Monitor", link: "/monitor" },
  { name: "Marketplace", link: "/marketplace" },
  { name: "Finance", link: "/finance" },
  { name: "Settings", link: "/settings" },
  { name: "Team", link: "/team" },
  { name: "Terminal", link: "/terminal" },
  { name: "CEO Chat", link: "/ceo" },
];

export default function Sidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-[#020617] min-h-screen overflow-x-hidden">

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="
          fixed
          top-4
          left-4
          z-50
          lg:hidden
          bg-blue-600
          text-white
          w-11
          h-11
          rounded-xl
          shadow-lg
        "
      >
        {open ? "✕" : "☰"}
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed
          top-0
          left-0
          z-40
          h-screen
          w-[250px]
          bg-[#020b2d]
          border-r
          border-[#0f172a]
          overflow-y-auto
          transition-transform
          duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
        `}
      >
        <div className="p-5">

          {/* LOGO */}
          <h1 className="text-cyan-400 text-5xl font-bold">
            AI OS
          </h1>

          <p className="text-gray-400 text-sm mt-3">
            Autonomous AI Infrastructure
          </p>

          {/* MENU */}
          <div className="mt-8 space-y-3 pb-10">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                onClick={() => setOpen(false)}
                className="
                  block
                  bg-[#071338]
                  hover:bg-[#10204d]
                  transition-all
                  duration-200
                  rounded-2xl
                  px-5
                  py-4
                  text-white
                  font-semibold
                  shadow-md
                "
              >
                {item.name}
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
          min-h-screen
          bg-[#020617]
          transition-all
          duration-300
          lg:ml-[250px]
        "
      >
        {children}
      </main>

    </div>
  );
}
