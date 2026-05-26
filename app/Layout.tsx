import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "AI OS",
  description: "Autonomous AI Infrastructure",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white">
        <Sidebar />

        <main className="lg:ml-[250px] min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
