import Sidebar from "../components/Sidebar";

export default function MobilePage() {
  return (
    <>
      <Sidebar />

      <main
        style={{
          marginLeft: "280px",
          minHeight: "100vh",
          background: "#020617",
          color: "white",
          padding: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            marginBottom: "20px",
          }}
        >
          📱 Mobile Control
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "#111827",
              padding: "30px",
              borderRadius: "20px",
            }}
          >
            <h2>Battery AI</h2>
            <h1 style={{ color: "#22c55e" }}>
              92%
            </h1>
          </div>

          <div
            style={{
              background: "#111827",
              padding: "30px",
              borderRadius: "20px",
            }}
          >
            <h2>AI Runtime</h2>
            <h1 style={{ color: "#38bdf8" }}>
              ONLINE
            </h1>
          </div>

          <div
            style={{
              background: "#111827",
              padding: "30px",
              borderRadius: "20px",
            }}
          >
            <h2>Cloud Sync</h2>
            <h1 style={{ color: "#a855f7" }}>
              ACTIVE
            </h1>
          </div>
        </div>
      </main>
    </>
  );
}
