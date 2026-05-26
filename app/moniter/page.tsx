import Sidebar from "../components/Sidebar";

export default function MonitorPage() {
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
        <h1>System Monitor</h1>

        <div
          style={{
            marginTop: "20px",
            background: "#0f172a",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <p>CPU Usage: 32%</p>
          <p>RAM Usage: 48%</p>
          <p>AI Status: Online</p>
        </div>
      </main>
    </>
  );
}
