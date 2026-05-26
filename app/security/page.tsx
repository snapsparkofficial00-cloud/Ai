import Sidebar from "../components/Sidebar";

export default function SecurityPage() {
  return (
    <>
      <Sidebar />

      <main
        style={{
          marginLeft: "280px",
          minHeight: "100vh",
          background: "#020617",
          color: "white",
          padding: "30px",
        }}
      >
        <h1>Security Dashboard</h1>

        <div
          style={{
            marginTop: "20px",
            background: "#0f172a",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <h2>System Security</h2>
          <p>Firewall Active</p>
          <p>AI Protection Enabled</p>
        </div>
      </main>
    </>
  );
}
