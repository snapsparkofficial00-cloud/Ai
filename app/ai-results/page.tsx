"use client";
import { useState, useEffect } from "react";

export default function AIResultsPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadResults(); }, []);

  async function loadResults() {
    const res = await fetch("/api/get-results");
    const data = await res.json();
    if (data.success) setResults(data.results || []);
    setLoading(false);
  }

  return (
    <main style={{ background: "#000", minHeight: "100vh", color: "white", padding: "24px" }}>
      <h1 style={{ color: "#00ff88", fontSize: "32px" }}>📊 AI Results Dashboard</h1>
      <p style={{ color: "#888", marginBottom: "20px" }}>See everything your AI Empire has created</p>

      {loading && <p>Loading...</p>}

      <div style={{ display: "grid", gap: "16px" }}>
        {results.map((r, i) => (
          <div key={i} style={{ background: "#111", padding: "16px", borderRadius: "12px", border: "1px solid #333" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
              <span style={{ 
                padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold",
                background: r.type === "website" ? "#00ff8833" : r.type === "shorts" ? "#ff660033" : "#7c4dff33",
                color: r.type === "website" ? "#00ff88" : r.type === "shorts" ? "#ff6600" : "#7c4dff"
              }}>
                {r.type?.toUpperCase()}
              </span>
              <span style={{ color: "#888", fontSize: "12px" }}>
                {new Date(r.created_at).toLocaleString()}
              </span>
            </div>
            <h3 style={{ margin: "10px 0" }}>🎯 {r.niche}</h3>
            <p style={{ color: "#888", fontSize: "13px" }}>
              📏 Size: {r.size} chars | Status: {r.status}
            </p>
            {r.url && <a href={r.url} target="_blank" style={{ color: "#00aaff", fontSize: "13px" }}>🔗 View</a>}
          </div>
        ))}
      </div>

      {!loading && results.length === 0 && (
        <p style={{ color: "#888", textAlign: "center", padding: "40px" }}>No results yet. Start building on your AI Brain!</p>
      )}

      <button onClick={loadResults} style={{ marginTop: "20px", padding: "12px 24px", borderRadius: "10px", background: "#00ff88", color: "#000", border: "none", fontWeight: "bold", cursor: "pointer" }}>
        🔄 Refresh
      </button>
    </main>
  );
}
