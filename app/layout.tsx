import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "AI OS",
  description: "Future AI Ecosystem",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#020617",
          color: "white",
          fontFamily: "Arial",
        }}
      >
        <Sidebar />

        <main
          style={{
            marginLeft: "250px",
            padding: "30px",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
