import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "AI Dashboard",
  description: "Future AI Operating System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#020b2d] text-white">
        <Sidebar />

        <main className="lg:ml-[250px] min-h-screen p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
