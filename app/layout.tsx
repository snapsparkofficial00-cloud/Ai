"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#020617", color: "white", fontFamily: "Arial, sans-serif" }}>
        <Sidebar onToggle={setSidebarOpen} />
        <div style={{
          marginLeft: sidebarOpen ? "280px" : "0px",
          transition: "margin-left 0.3s ease",
          minHeight: "100vh",
        }}>
          {children}
        </div>
      </body>
    </html>
  );
}
