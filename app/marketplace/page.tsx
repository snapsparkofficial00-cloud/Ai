import Sidebar from "../components/Sidebar";

export default function MarketplacePage() {
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
          🛒 AI Marketplace
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
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
            <h2>AI SaaS Templates</h2>
            <p>Premium AI dashboard systems.</p>
          </div>

          <div
            style={{
              background: "#111827",
              padding: "30px",
              borderRadius: "20px",
            }}
          >
            <h2>Automation Tools</h2>
            <p>AI workflow systems and automations.</p>
          </div>

          <div
            style={{
              background: "#111827",
              padding: "30px",
              borderRadius: "20px",
            }}
          >
            <h2>Video AI Tools</h2>
            <p>Professional AI editing systems.</p>
          </div>
        </div>
      </main>
    </>
  );
}
