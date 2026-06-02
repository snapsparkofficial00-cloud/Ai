interface AnalyticsData {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  ctr: number;
  retention: number;
  revenue: number;
}

interface LearningInsight {
  pattern: string;
  recommendation: string;
  confidence: number;
}

export async function trackPerformance(videoId: string, data: AnalyticsData): Promise<void> {
  console.log(`📊 Tracking performance for video: ${videoId}`);
  
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (SUPABASE_URL && SUPABASE_KEY) {
    await fetch(`${SUPABASE_URL}/rest/v1/performance`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        videoId,
        views: data.views,
        likes: data.likes,
        comments: data.comments,
        shares: data.shares,
        ctr: data.ctr,
        retention: data.retention,
        revenue: data.revenue,
        score: calculateScore(data),
        trackedAt: new Date().toISOString(),
      }),
    }).catch(() => {});
  }
}

function calculateScore(data: AnalyticsData): number {
  let score = 0;
  score += (data.views / 1000) * 10;
  score += data.likes * 2;
  score += data.comments * 3;
  score += data.shares * 5;
  score += (data.ctr || 0) * 2;
  score += (data.retention || 0) * 1.5;
  return Math.min(100, Math.max(0, score));
}

export async function getBestPerforming(days: number = 30): Promise<any[]> {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!SUPABASE_URL || !SUPABASE_KEY) return [];
  
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/performance?select=*&order=score.desc&limit=10`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );
    return await res.json();
  } catch {
    return [];
  }
}

export async function generateInsights(): Promise<LearningInsight[]> {
  const GROQ_KEY = process.env.GROQ_API_KEY;
  const bestVideos = await getBestPerforming();
  
  if (!GROQ_KEY || bestVideos.length === 0) {
    return [
      { pattern: "No data yet", recommendation: "Upload more videos to get insights", confidence: 0 },
    ];
  }
  
  const prompt = `
Based on these top performing videos:
${bestVideos.slice(0, 3).map((v: any) => `- Views: ${v.views}, Score: ${v.score}`).join("\n")}

Give 3 actionable insights for viral success.
Return as JSON array: [{"pattern": "...", "recommendation": "...", "confidence": 0-100}]`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });
  
  const data = await res.json();
  try {
    return JSON.parse(data.choices[0]?.message?.content || "[]");
  } catch {
    return [];
  }
}
