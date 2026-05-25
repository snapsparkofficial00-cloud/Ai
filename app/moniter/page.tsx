import Sidebar from "../components/Sidebar";

export default function MoniterPage() {
  return (
    <div>
      <Sidebar />

      <main
        style={{
          marginLeft: "280px",
          padding: "40px",
          minHeight: "100vh",
          background: "#020617",
          color: "white",
        }}
      >
        <h1>📡 Monitor Page</h1>
      </main>
    </div>
  );
}
