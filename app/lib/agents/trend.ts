// app/lib/agents/trend.ts

export const maxDuration = 300;

export interface Trend {
  keyword: string;
  searchVolume: number;
  growth: number;
  category: string;
  viralScore: number;
  competition: "low" | "medium" | "high";
  bestFormat: "short" | "long" | "both";
}

export interface ViralTopic {
  title: string;
  hook: string;
  estimatedViews: number;
  difficulty: number;
}

// Detect current trending topics
export async function detectTrends(niche?: string): Promise<Trend[]> {
  const GROQ_KEY = process.env.GROQ_API_KEY;
  
  if (!GROQ_KEY) {
    // Fallback trends
    const fallbackTrends: Trend[] = [
      { keyword: "AI tools", searchVolume: 50000, growth: 120, category: "Tech", viralScore: 85, competition: "medium", bestFormat: "short" },
      { keyword: "passive income", searchVolume: 45000, growth: 95, category: "Finance", viralScore: 82, competition: "high", bestFormat: "long" },
      { keyword: "space news", searchVolume: 30000, growth: 75, category: "Science", viralScore: 78, competition: "low", bestFormat: "both" },
      { keyword: "motivation", searchVolume: 80000, growth: 60, category: "Lifestyle", viralScore: 75, competition: "high", bestFormat: "short" },
      { keyword: "gaming", searchVolume: 120000, growth: 45, category: "Gaming", viralScore: 70, competition: "high", bestFormat: "both" },
    ];
    if (niche) {
      return fallbackTrends.filter(t => t.category.toLowerCase().includes(niche.toLowerCase()) || t.keyword.toLowerCase().includes(niche.toLowerCase()));
    }
    return fallbackTrends;
  }
  
  const prompt = `Find top 8 viral YouTube trends ${niche ? `in ${niche} niche` : "right now across all categories"}.
Return as JSON array with: keyword, searchVolume, growth, category, viralScore (0-100), competition (low/medium/high), bestFormat (short/long/both).`;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        max_tokens: 800,
      }),
    });
    
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "[]";
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length) {
        return parsed;
      }
    } catch {}
  } catch (error) {
    console.log("Trend detection error:", error);
  }
  
  return [];
}

// Generate viral topic ideas
export async function getViralTopics(niche: string, limit: number = 10): Promise<string[]> {
  const GROQ_KEY = process.env.GROQ_API_KEY;
  
  const prompt = `Generate ${limit} viral YouTube Shorts topics about "${niche}" that will get millions of views.
Each topic should be unique, engaging, and trend-worthy.
Return as JSON array of strings.`;

  if (GROQ_KEY) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.9,
          max_tokens: 500,
        }),
      });
      
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || "[]";
      try {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length) {
          return parsed.slice(0, limit);
        }
      } catch {}
    } catch (error) {
      console.log("Viral topics error:", error);
    }
  }
  
  // Fallback topics
  return [
    `Amazing ${niche} facts you never knew`,
    `Top 10 ${niche} moments that went viral`,
    `${niche} secrets exposed!`,
    `The truth about ${niche}`,
    `${niche} compilation that breaks the internet`,
    `How to master ${niche} in 60 seconds`,
    `${niche} fails that shocked everyone`,
    `Best ${niche} content ever created`,
    `${niche} experts don't want you to know`,
    `${niche} transformation that went viral`,
  ].slice(0, limit);
}

// Get trending hashtags for a niche
export async function getTrendingHashtags(niche: string): Promise<string[]> {
  const GROQ_KEY = process.env.GROQ_API_KEY;
  
  const prompt = `Generate 15 viral YouTube hashtags for ${niche} niche.
Return as JSON array of strings with # symbol.`;

  if (GROQ_KEY) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 300,
        }),
      });
      
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || "[]";
      try {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length) {
          return parsed.slice(0, 15);
        }
      } catch {}
    } catch {}
  }
  
  return [
    `#${niche.replace(/ /g, "")}`,
    `#Viral${niche.replace(/ /g, "")}`,
    `#TrendingNow`,
    `#Shorts`,
    `#YouTubeShorts`,
    `#ViralVideo`,
    `#${niche.replace(/ /g, "")}Shorts`,
    `#MustWatch`,
  ];
}

// Analyze topic potential
export async function analyzeTopicPotential(topic: string): Promise<{
  score: number;
  potential: "low" | "medium" | "high" | "viral";
  reason: string;
}> {
  const GROQ_KEY = process.env.GROQ_API_KEY;
  
  if (!GROQ_KEY) {
    return { score: 70, potential: "medium", reason: "Good topic with moderate potential" };
  }
  
  const prompt = `Analyze topic "${topic}" for viral YouTube Shorts potential.
Return JSON: {"score": 0-100, "potential": "low/medium/high/viral", "reason": "brief explanation"}`;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5,
        max_tokens: 200,
      }),
    });
    
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "{}";
    try {
      return JSON.parse(content);
    } catch {}
  } catch {}
  
  return { score: 50, potential: "medium", reason: "Topic has average potential" };
}

// Get trending niches
export async function getTrendingNiches(): Promise<{ niche: string; growth: number; views: number }[]> {
  const GROQ_KEY = process.env.GROQ_API_KEY;
  
  if (!GROQ_KEY) {
    return [
      { niche: "AI Technology", growth: 250, views: 1000000 },
      { niche: "Finance/Crypto", growth: 180, views: 800000 },
      { niche: "Motivation", growth: 150, views: 1200000 },
      { niche: "Gaming", growth: 120, views: 2000000 },
      { niche: "Space/Science", growth: 100, views: 500000 },
    ];
  }
  
  const prompt = `Return top 5 trending YouTube niches right now with estimated growth percentage and monthly views.
Return as JSON array: [{"niche": "string", "growth": number, "views": number}]`;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 400,
      }),
    });
    
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "[]";
    try {
      return JSON.parse(content);
    } catch {}
  } catch {}
  
  return [];
}

// Trend Agent object for backward compatibility
export const TrendAgent = {
  detectTrends,
  getViralTopics,
  getTrendingHashtags,
  analyzeTopicPotential,
  getTrendingNiches,
};
