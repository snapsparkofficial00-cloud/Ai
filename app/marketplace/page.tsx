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
            🛒 AI Marketplace
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "22px",
              lineHeight: "1.8",
              maxWidth: "1000px",
            }}
          >
            Futuristic AI services marketplace for
            automation tools, AI agents, content
            systems, ecommerce workflows, cloud
            tools, and autonomous business products.
          </p>
        </div>

        {/* PRODUCTS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(340px,1fr))",
            gap: "28px",
          }}
        >
          <ProductCard
            icon="📺"
            title="YouTube AI System"
            price="$299"
            color="#ef4444"
            desc="Autonomous YouTube shorts and content automation."
          />

          <ProductCard
            icon="📸"
            title="Instagram AI Growth"
            price="$199"
            color="#a855f7"
            desc="AI reels, captions, hashtags, and analytics."
          />

          <ProductCard
            icon="🎬"
            title="Video Editing AI"
            price="$499"
            color="#38bdf8"
            desc="Professional cinematic AI editing workflows."
          />

          <ProductCard
            icon="🛒"
            title="Dropshipping AI"
            price="$399"
            color="#22c55e"
            desc="Shopify and ecommerce automation
