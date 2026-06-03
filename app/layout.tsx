import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "AI OS - Autonomous AI Infrastructure",
  description: "Self-learning AI systems, automation workflows, and advanced AI teams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
