import { NextResponse } from "next/server";

export async function GET() {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const GROQ_KEY = process.env.GROQ_API_KEY;

  let analytics = {
    totalViews: 0,
    totalSubs: 0,
    avgRetention: 0,
    bestPerforming: [] as any[],
    recommendations: [] as string[],
  };

  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const perfRes = await fetch(`${SUPABASE_URL}/rest/v1/performance?select=*&order=score.desc&limit=10`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
      });
      const performances = await perfRes.json();
      analytics.bestPerforming = performances;

      if (performances.length) {
        analytics.totalViews = performances.reduce((a: any, b: any) => a + (b.views || 0), 0);
      }
    } catch (e) {}
  }

  // AI recommendations based on data
  if (GROQ_KEY && analytics.bestPerforming.length) {
    const recommendPrompt = `
Based on these best-performing videos:
${analytics.bestPerforming.slice(0,3).map((v: any) => `- Views: ${v.views}, Score: ${v.score}`).join("\n")}

Give 5 actionable recommendations for next video.
Return as JSON array: ["rec1", "rec2", "rec3", "rec4", "rec5"]`;

    const recRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: recommendPrompt }],
        temperature: 0.7,
      }),
    });
    const recData = await recRes.json();
    try {
      analytics.recommendations = JSON.parse(recData.choices[0]?.message?.content || "[]");
    } catch {}
  }

  return NextResponse.json({ success: true, analytics });
}
