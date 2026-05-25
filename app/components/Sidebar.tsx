import Link from "next/link";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "260px",
        background: "#0f172a",
        height: "100vh",
        padding: "20px",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>
        🤖 AI OS
      </h1>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <Link href="/">Dashboard</Link>
        <Link href="/agents">Agents</Link>
        <Link href="/automation">Automation</Link>
        <Link href="/analytics">Analytics</Link>
        <Link href="/telegram">Telegram</Link>
        <Link href="/memory">Memory</Link>
        <Link href="/revenue">Revenue</Link>
        <Link href="/settings">Settings</Link>
      </nav>
    </aside>
  );
}
