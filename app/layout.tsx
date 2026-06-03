"use client";

import { useState } from "react";
import "./globals.css";
import Sidebar from "./components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body>
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
