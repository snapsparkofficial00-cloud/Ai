import Sidebar from "../components/Sidebar";

export default function CloudPage() {
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
        <h1>Cloud Dashboard</h1>

        <div
          style={{
            marginTop: "20px",
            background: "#0f172a",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          Welcome to Cloud Page
        </div>
      </main>
    </div>
  );
}
