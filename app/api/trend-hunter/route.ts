import { NextResponse } from "next/server";

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const GROQ_KEY = process.env.GROQ_API_KEY;
const SERP_API_KEY = process.env.SERP_API_KEY; // Get from serpapi.com (FREE tier)

export async function POST(req: Request) {
  try {
    const { action, query, niche } = await req.json();

    switch (action) {
      case "scan-trends":
        return await scanTrends();
      case "analyze-keyword":
        return await analyzeKeyword(query);
      case "find-opportunities":
        return await findOpportunities(niche);
      case "competitor-analysis":
        return await analyzeCompetitors(query);
      case "what-to-build":
        return await whatToBuild();
      case "full-market-research":
        return await fullMarketResearch(query || niche);
      default:
        return NextResponse.json({ success: false, error: "Unknown action" });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

// ========== SCAN REAL TRENDS ==========

async function scanTrends() {
  // Fetch REAL trending data from multiple sources
  const trends: any = {};

  // 1. Google Trends (RSS feed - FREE)
  try {
    const rssRes = await fetch("https://trends.google.com/trending/rss?geo=IN");
    const rssText = await rssRes.text();
    trends.googleTrends = extractTrends(rssText);
  } catch { trends.googleTrends = []; }

  // 2. Reddit Hot Topics
  try {
    const redditRes = await fetch("https://www.reddit.com/r/india/hot.json?limit=10");
    const redditData = await redditRes.json();
    trends.redditHot = (redditData?.data?.children || []).map((c: any) => ({
      title: c.data.title,
      ups: c.data.ups,
      subreddit: c.data.subreddit,
    }));
  } catch { trends.redditHot = []; }

  // 3. Use AI to predict trending niches
  const aiAnalysis = await callAI(
    "Based on current internet trends in India 2025, list 20 niches/topics that have HIGH search volume but LOW competition. For each: niche name, estimated monthly searches, competition level (Low/Medium/High), monetization potential (1-10). Focus on topics Indians search for."
  );

  return NextResponse.json({
    success: true,
    dataSource: "Real-time Google Trends + Reddit + AI Analysis",
    googleTrends: trends.googleTrends,
    redditHot: trends.redditHot,
    aiPredictedNiches: aiAnalysis,
    timestamp: new Date().toISOString(),
  });
}

// ========== ANALYZE KEYWORD ==========

async function analyzeKeyword(query: string) {
  // Use Google Suggest API (FREE)
  const suggestions: string[] = [];
  try {
    const res = await fetch(
      `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(query)}&hl=en&gl=IN`
    );
    const data = await res.json();
    suggestions.push(...(data[1] || []));
  } catch {}

  // AI analysis
  const analysis = await callAI(
    `Analyze the keyword: "${query}"
    
    Provide:
    1. Estimated monthly search volume in India
    2. Competition level (Low/Medium/High)
    3. CPC (cost per click if running ads)
    4. Related keywords people also search
    5. What type of website would rank for this?
    6. Monetization ideas
    7. Difficulty score to rank (1-10)
    8. Recommended action: Build website / Create video / Both`
  );

  return NextResponse.json({
    success: true,
    keyword: query,
    googleSuggestions: suggestions,
    aiAnalysis: analysis,
  });
}

// ========== FIND OPPORTUNITIES ==========

async function findOpportunities(niche: string) {
  const prompt = `Find MONEY-MAKING opportunities in: "${niche}"

  Analyze:
  1. What are people searching for in this niche?
  2. What problems do they have?
  3. What products are they buying?
  4. What gaps exist in the market?
  5. What type of website/tool would fill this gap?
  6. Estimated traffic potential
  7. Revenue potential per month
  8. Competition analysis
  9. Step-by-step plan to dominate this niche
  
  Be SPECIFIC with real numbers and actionable advice.`;

  const analysis = await callAI(prompt);
  return NextResponse.json({ success: true, niche, analysis });
}

// ========== COMPETITOR ANALYSIS ==========

async function analyzeCompetitors(query: string) {
  // Simulate SERP analysis (in production, use SERP API)
  const prompt = `Analyze the top 5 websites ranking for: "${query}"

  For EACH competitor provide:
  1. Website name and URL
  2. What they do
  3. Their strengths
  4. Their weaknesses
  5. How much traffic they get (estimate)
  6. How they make money
  7. What you can do BETTER than them
  8. Their content gaps (topics they missed)
  9. Backlink opportunities
  10. How to outrank them`;

  const analysis = await callAI(prompt);
  return NextResponse.json({ success: true, query, analysis });
}

// ========== WHAT TO BUILD ==========

async function whatToBuild() {
  const prompt = `Based on current internet trends in India (2025), suggest 10 WEBSITE IDEAS that have:

  - High search demand (>50,000 searches/month)
  - Low competition (easy to rank)
  - High monetization potential (>₹50,000/month possible)
  - Can be built as a single-page website or tool
  - Indians are actively searching for

  For EACH idea provide:
  1. Website type (blog/tool/directory/download site/etc.)
  2. Main keyword to target
  3. Monthly search volume
  4. Competition level
  5. Monetization method
  6. Estimated monthly revenue
  7. Time to first traffic
  8. Difficulty to build (Easy/Medium/Hard)
  9. Example of successful competitor
  10. Your unique angle to beat them`;

  const ideas = await callAI(prompt);
  return NextResponse.json({ success: true, ideas });
}

// ========== FULL MARKET RESEARCH ==========

async function fullMarketResearch(query: string) {
  const [trends, keyword, opportunities, competitors, ideas] = await Promise.all([
    scanTrends(),
    analyzeKeyword(query),
    findOpportunities(query),
    analyzeCompetitors(query),
    whatToBuild(),
  ]);

  return NextResponse.json({
    success: true,
    query,
    research: {
      trends,
      keywordAnalysis: keyword,
      opportunities,
      competitorAnalysis: competitors,
      recommendedIdeas: ideas,
    },
    nextAction: "AI recommends building the top idea immediately!",
  });
}

// ========== HELPERS ==========

function extractTrends(rssText: string): string[] {
  const trends: string[] = [];
  const regex = /<title>(.*?)<\/title>/g;
  let match;
  while ((match = regex.exec(rssText)) !== null) {
    if (match[1] && !match[1].includes("Google Trends")) {
      trends.push(match[1]);
    }
  }
  return trends.slice(0, 15);
}

async function callAI(prompt: string): Promise<string> {
  if (GROQ_KEY) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
        body: JSON.stringify({ model: "llama-3.3-70b-versatile", max_tokens: 4000, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      return data?.choices?.[0]?.message?.content || "";
    } catch {}
  }
  if (GEMINI_KEY) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) }
      );
      const data = await res.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    } catch {}
  }
  return "AI unavailable";
}
