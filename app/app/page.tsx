import Sidebar from "../components/Sidebar";

export default function AppsPage() {
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
        <h1>Apps Dashboard</h1>

        <div
          style={{
            marginTop: "20px",
            background: "#0f172a",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <p>YouTube AI Agent</p>
          <p>Blog AI Agent</p>
          <p>Automation Running</p>
        </div>
      </main>
    </>
  );
}
