import Sidebar from "../components/Sidebar";

export default function DeployPage() {
  return (
    <div>
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
        <h1>Deploy Dashboard</h1>

        <div
          style={{
            marginTop: "20px",
            background: "#0f172a",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          Welcome to Deploy Page
        </div>
      </main>
    </div>
  );
}
