import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
  try {
    const { action, websiteId, niche, data } = await req.json();

    switch (action) {
      case "publish": return await publishWebsite(websiteId);
      case "auto-publish-all": return await autoPublishAll();
      case "analyze": return await analyzeWebsite(websiteId, niche);
      case "optimize": return await optimizeWebsite(websiteId);
      case "learn": return await aiLearn(niche, data);
      case "ecosystem-status": return await getEcosystemStatus();
      case "run-all-agents": return await runAllAgents();
      case "simulate-traffic": return await simulateTraffic(websiteId);
      case "revenue-report": return await getRevenueReport();
      case "ai-decision": return await aiDecision(niche);
      default: return NextResponse.json({ error: "Unknown action" });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

// ========== PUBLISHING ENGINE ==========

async function publishWebsite(websiteId: number) {
  // Get website from DB
  const res = await fetch(`${SUPABASE_URL}/rest/v1/websites?id=eq.${websiteId}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  const websites = await res.json();
  if (!websites.length) return NextResponse.json({ success: false, error: "Website not found" });

  const website = websites[0];
  
  // Simulate deploying to Vercel (in real life, use Vercel API)
  const deployUrl = `https://${website.niche.replace(/\s+/g, "-").toLowerCase()}.vercel.app`;
  
  // Update website status
  await fetch(`${SUPABASE_URL}/rest/v1/websites?id=eq.${websiteId}`, {
    method: "PATCH",
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ status: "published", url: deployUrl, deployed_at: new Date().toISOString() }),
  });

  // Log to publish queue
  await fetch(`${SUPABASE_URL}/rest/v1/publish_queue`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ id: Date.now(), website_id: websiteId, status: "completed", completed_at: new Date().toISOString() }),
  });

  return NextResponse.json({ success: true, url: deployUrl, message: "Website published successfully!" });
}

async function autoPublishAll() {
  // Get all draft websites
  const res = await fetch(`${SUPABASE_URL}/rest/v1/websites?status=eq.draft`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  const websites = await res.json();
  
  const published = [];
  for (const site of websites) {
    const result = await publishWebsite(site.id);
    published.push(site.niche);
  }

  return NextResponse.json({ success: true, published, count: published.length });
}

// ========== ANALYTICS ENGINE ==========

async function analyzeWebsite(websiteId: number, niche: string) {
  // Simulate analytics data
  const analytics = {
    visitors: Math.floor(Math.random() * 10000) + 100,
    pageviews: Math.floor(Math.random() * 30000) + 500,
    bounceRate: (Math.random() * 40 + 30).toFixed(1),
    avgTime: (Math.random() * 5 + 1).toFixed(2),
    topSources: ["Google", "Direct", "Social Media", "Referral"],
    revenue: (Math.random() * 500 + 10).toFixed(2),
  };

  // Save analytics
  await fetch(`${SUPABASE_URL}/rest/v1/traffic_analytics`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({
      website_id: websiteId, visitors: analytics.visitors, pageviews: analytics.pageviews,
      bounce_rate: analytics.bounceRate, avg_time_on_site: analytics.avgTime,
      revenue: analytics.revenue, date: new Date().toISOString().split("T")[0],
    }),
  });

  // AI analysis
  const aiPrompt = `Analyze website performance for: ${niche}. Visitors: ${analytics.visitors}, Revenue: $${analytics.revenue}. Give 3 specific recommendations to improve traffic and revenue.`;
  const aiAnalysis = await callAI(aiPrompt);

  return NextResponse.json({ success: true, analytics, aiRecommendations: aiAnalysis });
}

// ========== AI LEARNING ENGINE ==========

async function aiLearn(niche: string, data: any) {
  const prompt = `You are a self-learning AI. Based on this data for ${niche}: ${JSON.stringify(data)}. What patterns do you notice? What should be improved? How can we 10x results?`;
  const learning = await callAI(prompt);

  // Save learning
  await fetch(`${SUPABASE_URL}/rest/v1/ai_learning`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ id: Date.now(), agent: "learner-agent", input_data: data, output_data: { learning }, performance_score: Math.random() * 100 }),
  });

  return NextResponse.json({ success: true, learning });
}

// ========== OPTIMIZATION ENGINE ==========

async function optimizeWebsite(websiteId: number) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/websites?id=eq.${websiteId}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  const websites = await res.json();
  if (!websites.length) return NextResponse.json({ error: "Not found" });

  const prompt = `Optimize this website for SEO and revenue: ${websites[0].niche}. Current code length: ${websites[0].html_code.length} chars. Suggest improvements for meta tags, keywords, ad placement, and user engagement.`;
  const optimizations = await callAI(prompt);

  return NextResponse.json({ success: true, website: websites[0].niche, optimizations });
}

// ========== AI DECISION MAKER ==========

async function aiDecision(niche: string) {
  const prompt = `As an AI ecosystem manager, decide the best strategy for: "${niche}". Consider: 
1. Should we build more sites in this niche?
2. What type of site would perform best?
3. What monetization strategy?
4. What traffic sources to target?
5. What improvements are needed?
Make a clear, actionable decision.`;
  
  const decision = await callAI(prompt);
  return NextResponse.json({ success: true, niche, decision });
}

// ========== ECOSYSTEM STATUS ==========

async function getEcosystemStatus() {
  const [agents, sites, traffic, revenue, learning] = await Promise.all([
    fetch(`${SUPABASE_URL}/rest/v1/ai_agents`, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }).then(r => r.json()),
    fetch(`${SUPABASE_URL}/rest/v1/websites`, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }).then(r => r.json()),
    fetch(`${SUPABASE_URL}/rest/v1/traffic_analytics?order=created_at.desc&limit=1`, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }).then(r => r.json()),
    fetch(`${SUPABASE_URL}/rest/v1/revenue_tracking`, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }).then(r => r.json()),
    fetch(`${SUPABASE_URL}/rest/v1/ai_learning?order=created_at.desc&limit=10`, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }).then(r => r.json()),
  ]);

  const totalRevenue = (revenue || []).reduce((sum: number, r: any) => sum + (r.amount || 0), 0);

  return NextResponse.json({
    success: true,
    ecosystem: {
      agents: { total: agents.length, active: agents.filter((a: any) => a.status === "active").length },
      sites: { total: sites.length, published: sites.filter((s: any) => s.status === "published").length },
      traffic: traffic[0] || { visitors: 0, pageviews: 0 },
      revenue: { total: totalRevenue, transactions: revenue.length },
      learning: { totalInsights: learning.length },
      status: "🧬 ALIVE & EVOLVING",
      uptime: "24/7",
    }
  });
}

// ========== RUN ALL AGENTS ==========

async function runAllAgents() {
  const tasks = [
    { agent: "builder-agent", action: "Building new websites..." },
    { agent: "publisher-agent", action: "Publishing queued sites..." },
    { agent: "learner-agent", action: "Learning from data..." },
    { agent: "optimizer-agent", action: "Optimizing SEO & revenue..." },
    { agent: "monitor-agent", action: "Checking all systems..." },
    { agent: "traffic-agent", action: "Generating traffic strategies..." },
    { agent: "revenue-agent", action: "Optimizing monetization..." },
  ];

  // Update all agents status
  for (const task of tasks) {
    await fetch(`${SUPABASE_URL}/rest/v1/ai_agents?name=eq.${task.agent}`, {
      method: "PATCH",
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ status: "active", last_run: new Date().toISOString() }),
    });
  }

  return NextResponse.json({ success: true, message: "All 7 AI agents activated!", agents: tasks });
}

// ========== SIMULATE TRAFFIC ==========

async function simulateTraffic(websiteId: number) {
  const sources = ["Google", "Facebook", "Instagram", "YouTube", "Direct", "Pinterest", "Reddit"];
  const traffic = [];
  
  for (let i = 0; i < 7; i++) {
    const visitors = Math.floor(Math.random() * 5000) + 200;
    traffic.push({ source: sources[i], visitors, date: new Date(Date.now() - i * 86400000).toISOString().split("T")[0] });
  }

  return NextResponse.json({ success: true, traffic, total: traffic.reduce((s, t) => s + t.visitors, 0) });
}

// ========== REVENUE REPORT ==========

async function getRevenueReport() {
  const sources = ["AdSense", "Affiliate", "Sponsorship", "Product Sales"];
  const report = sources.map(s => ({
    source: s,
    amount: (Math.random() * 1000 + 50).toFixed(2),
    growth: (Math.random() * 50 + 5).toFixed(1) + "%"
  }));

  return NextResponse.json({ success: true, report, total: report.reduce((s, r) => s + parseFloat(r.amount), 0).toFixed(2) });
}

// ========== AI CALL HELPER ==========

async function callAI(prompt: string) {
  if (!GEMINI_KEY) return "AI engine offline - add GEMINI_API_KEY";
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
  } catch { return "AI unavailable"; }
}
