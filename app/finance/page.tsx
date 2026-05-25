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
          fontFamily: "Arial",
        }}
      >
        {/* HEADER */}

        <div
          style={{
            marginBottom: "50px",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              marginBottom: "20px",
            }}
          >
            💰 AI Finance Center
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "22px",
              lineHeight: "1.8",
              maxWidth: "1000px",
            }}
          >
            Advanced financial intelligence system
            for revenue tracking, AI monetization,
            ecommerce analytics, cloud expenses,
            and autonomous profit optimization.
          </p>
        </div>

        {/* TOP CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: "24px",
            marginBottom: "50px",
          }}
        >
          <FinanceCard
            title="💵 Total Revenue"
            value="$248,580"
            color="#22c55e"
          />

          <FinanceCard
            title="📺 YouTube Revenue"
            value="$84,200"
            color="#ef4444"
          />

          <FinanceCard
            title="📸 Instagram Revenue"
            value="$42,500"
            color="#a855f7"
          />

          <FinanceCard
            title="🛒 Ecommerce Sales"
            value="$121,880"
            color="#38bdf8"
          />
        </div>

        {/* GRAPH SECTION */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(420px,1fr))",
            gap: "30px",
          }}
        >
          {/* REVENUE GRAPH */}

          <div
            style={{
              background: "#0f172a",
              padding: "30px",
              borderRadius: "28px",
              border: "1px solid #1e293b",
            }}
          >
            <h2
              style={{
                fontSize: "34px",
                marginBottom: "24px",
              }}
            >
              📈 Revenue Growth
            </h2>

            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "14px",
                height: "260px",
              }}
            >
              {[60, 90, 120, 150, 180, 240, 320].map(
                (height, index) => (
                  <div
                    key={index}
                    style={{
                      width: "48px",
                      height: `${height}px`,
                      borderRadius: "14px",
                      background:
                        "linear-gradient(to top,#22c55e,#86efac)",
                    }}
                  />
                )
              )}
            </div>

            <p
              style={{
