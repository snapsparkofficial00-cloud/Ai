import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata = {
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
      <body>
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
