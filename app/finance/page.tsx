import Sidebar from "../components/Sidebar";

export default function FinancePage() {
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
          💰 Finance Center
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
            <h2>Total Revenue</h2>
            <h1 style={{ color: "#22c55e" }}>
              $248,000
            </h1>
          </div>

          <div
            style={{
              background: "#111827",
              padding: "30px",
              borderRadius: "20px",
            }}
          >
            <h2>YouTube Revenue</h2>
            <h1 style={{ color: "#ef4444" }}>
              $84,000
            </h1>
          </div>

          <div
            style={{
              background: "#111827",
              padding: "30px",
              borderRadius: "20px",
            }}
          >
            <h2>Instagram Revenue</h2>
            <h1 style={{ color: "#a855f7" }}>
              $42,000
            </h1>
          </div>
        </div>
      </main>
    </>
  );
}
