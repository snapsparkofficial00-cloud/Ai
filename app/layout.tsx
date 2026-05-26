import "./globals.css";
import Link from "next/link";

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
        <div
          style={{
            display: "flex",
          }}
        >
          {/* SIDEBAR */}

          <aside
            style={{
              width: "250px",
              minHeight: "100vh",
              background: "#071129",
              borderRight: "1px solid #1e293b",
              padding: "30px 20px",
              position: "fixed",
              left: 0,
              top: 0,
            }}
          >
            <h1
              style={{
                fontSize: "34px",
                marginBottom: "40px",
              }}
            >
              🚀 AI OS
            </h1>

            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <NavItem href="/" text="🏠 Dashboard" />
              <NavItem href="/ceo" text="🧠 CEO Chat" />
              <NavItem href="/terminal" text="💻 Terminal" />
              <NavItem href="/control" text="🎛 Control" />
              <NavItem href="/analytics" text="📊 Analytics" />
              <NavItem href="/cloud" text="☁️ Cloud" />
            </nav>
          </aside>

          {/* CONTENT */}

          <main
            style={{
              marginLeft: "250px",
              width: "100%",
              padding: "40px",
            }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

function NavItem({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      style={{
        color: "#cbd5e1",
        textDecoration: "none",
        background: "#0f172a",
        padding: "14px 18px",
        borderRadius: "14px",
        border: "1px solid #1e293b",
      }}
    >
      {text}
    </Link>
  );
}
