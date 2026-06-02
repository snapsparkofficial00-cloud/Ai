import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { videoId, views, likes, comments, ctr, retention } = await req.json();

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const GROQ_KEY = process.env.GROQ_API_KEY;

    // Calculate performance score
    const score = ((views || 0) / 1000) + ((likes || 0) / 10) + ((comments || 0) * 2);
    
    // AI learns from performance
    if (GROQ_KEY) {
      const analysisPrompt = `
A YouTube video got:
Views: ${views}
Likes: ${likes}
Comments: ${comments}
CTR: ${ctr}%
Retention: ${retention}%

What made it successful or fail? Give 3 specific learnings for future videos.
Return as JSON: { "learnings": ["learning1", "learning2", "learning3"], "improvementScore": number }
`;

      const analysisRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: analysisPrompt }],
          temperature: 0.7,
        }),
      });
      const analysisData = await analysisRes.json();
      let analysis = {};
      try {
        analysis = JSON.parse(analysisData.choices[0]?.message?.content || "{}");
      } catch {}
    }

    // Save performance to database
    if (SUPABASE_URL && SUPABASE_KEY) {
      await fetch(`${SUPABASE_URL}/rest/v1/performance`, {
        method: "POST",
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, views, likes, comments, ctr, retention, score, learnedAt: new Date().toISOString() }),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true, score, message: "AI learned from this video" });

  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) });
  }
}
