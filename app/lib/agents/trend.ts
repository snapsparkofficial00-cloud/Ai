interface Trend {
  keyword: string;
  searchVolume: number;
  growth: number;
  category: string;
  viralScore: number;
}

export async function detectTrends(niche?: string): Promise<Trend[]> {
  const GROQ_KEY = process.env.GROQ_API_KEY;
  
  if (!GROQ_KEY) {
    return [
      { keyword: "AI tools", searchVolume: 50000, growth: 120, category: "Tech", viralScore: 85 },
      { keyword: "passive income", searchVolume: 45000, growth: 95, category: "Finance", viralScore: 82 },
      { keyword: "space news", searchVolume: 30000, growth: 75, category: "Science", viralScore: 78 },
    ];
  }
  
  const prompt = `Find top 5 viral YouTube trends ${niche ? `in ${niche} niche` : "right now"}. Return as JSON array with: keyword, searchVolume, growth, category, viralScore (0-100).`;
  
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    }),
  });
  
  const data = await res.json();
  try {
    return JSON.parse(data.choices[0]?.message?.content || "[]");
  } catch {
    return [];
  }
}

export async function getViralTopics(niche: string, limit: number = 10): Promise<string[]> {
  const GROQ_KEY = process.env.GROQ_API_KEY;
  
  const prompt = `Generate ${limit} viral YouTube Shorts topics about ${niche}. Return as JSON array of strings.`;
  
  if (GROQ_KEY) {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9,
      }),
    });
    const data = await res.json();
    try {
      return JSON.parse(data.choices[0]?.message?.content || "[]");
    } catch {
      return [`Amazing ${niche} facts`, `Top 10 ${niche} moments`, `${niche} viral video`];
    }
  }
  
  return [`Amazing ${niche} facts`, `Top 10 ${niche} moments`, `${niche} viral video`];
}
