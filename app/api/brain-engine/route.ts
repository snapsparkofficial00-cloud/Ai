import { NextResponse } from "next/server";

const GROQ_KEY = process.env.GROQ_API_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
  try {
    const { action, niche, type, data } = await req.json();

    switch (action) {
      // Content Creation
      case "create-shorts": return await createShorts(niche);
      case "create-long-video": return await createLongVideo(niche);
      case "create-thumbnail": return await createThumbnail(niche);
      case "create-voiceover": return await createVoiceover(niche);
      case "create-hashtags": return await createHashtags(niche);
      case "create-description": return await createDescription(niche);
      
      // Full Packages
      case "full-video-pack": return await fullVideoPack(niche, type);
      case "daily-content": return await dailyContent(niche);
      case "weekly-batch": return await weeklyBatch(niche);
      
      // Growth & Analytics
      case "channel-audit": return await channelAudit(niche);
      case "growth-plan": return await growthPlan(niche);
      case "competitor-analysis": return await competitorAnalysis(niche);
      case "trend-predictor": return await trendPredictor(niche);
      
      // Revenue
      case "revenue-optimizer": return await revenueOptimizer(niche);
      case "affiliate-plan": return await affiliatePlan(niche);
      
      // Auto-Pilot
      case "auto-pilot": return await autoPilot(niche);
      case "brain-status": return await brainStatus();
      
      default: return NextResponse.json({ error: "Unknown action" });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

// ========== CONTENT CREATION ==========

async function createShorts(niche: string) {
  const prompt = `Create a VIRAL 60-second YouTube Shorts script for: "${niche}"

Language: HINDI + ENGLISH mix (Hinglish)

Format:
🎬 TITLE: [viral clickbait title]
📝 SCRIPT:
[0-3s] HOOK: [shocking line]
[3-15s] INTRO: [what this is]
[15-45s] MAIN: [valuable content]
[45-55s] TWIST: [surprising fact]
[55-60s] CTA: Like, Share, Subscribe!
🎙️ VOICEOVER (Hindi): [complete Hindi text]
🔍 FOOTAGE: [5 search terms]
🎵 MUSIC: [mood]
#️⃣ HASHTAGS: [15 tags]
📝 DESCRIPTION: [YouTube description]`;

  const result = await callAI(prompt);
  return NextResponse.json({ success: true, niche, result, type: "shorts" });
}

async function createLongVideo(niche: string) {
  const prompt = `Create a 10-minute YouTube video script for: "${niche}"

Language: HINDI + ENGLISH

Format:
📺 TITLE: [SEO optimized title]
📝 INTRO (30s): [hook + what viewers learn]
📋 CHAPTERS (8 min):
  Ch1 (2min): [topic]
  Ch2 (2min): [topic]
  Ch3 (2min): [topic]
  Ch4 (2min): [topic]
🎬 OUTRO (30s): [summary + CTA]
🎙️ FULL VOICEOVER: [complete script]
#️⃣ HASHTAGS: [20 tags]
📝 DESCRIPTION: [with timestamps]`;

  const result = await callAI(prompt);
  return NextResponse.json({ success: true, niche, result, type: "long" });
}

async function createThumbnail(niche: string) {
  const prompt = `Design 3 YouTube thumbnail concepts for: "${niche}"

Each: text, colors, image idea, why it gets clicks. Canva instructions included.`;
  const result = await callAI(prompt);
  return NextResponse.json({ success: true, result });
}

async function createVoiceover(niche: string) {
  const prompt = `Write 60-second Hindi voiceover (Devanagari) for: "${niche}". Natural, energetic, hook at start.`;
  const result = await callAI(prompt);
  return NextResponse.json({ success: true, hindiText: result, tool: "elevenlabs.io (FREE)" });
}

async function createHashtags(niche: string) {
  const prompt = `30 viral YouTube hashtags for: "${niche}". Hindi+English, high volume. Return as: #tag1 #tag2...`;
  const result = await callAI(prompt);
  return NextResponse.json({ success: true, hashtags: result });
}

async function createDescription(niche: string) {
  const prompt = `SEO YouTube description for: "${niche}". Hook line, 3 description lines, hashtags, subscribe CTA.`;
  const result = await callAI(prompt);
  return NextResponse.json({ success: true, description: result });
}

// ========== FULL PACKAGES ==========

async function fullVideoPack(niche: string, type: string = "short") {
  const [script, hashtags, description, thumbnail, voiceover] = await Promise.all([
    type === "short" ? createShorts(niche) : createLongVideo(niche),
    createHashtags(niche),
    createDescription(niche),
    createThumbnail(niche),
    createVoiceover(niche),
  ]);

  return NextResponse.json({
    success: true,
    pack: { script, hashtags, description, thumbnail, voiceover },
    tools: "CapCut + ElevenLabs + YouTube Audio Library = 100% FREE",
  });
}

async function dailyContent(niche: string) {
  const shorts = await createShorts(niche);
  return NextResponse.json({
    success: true,
    daily: { shorts },
    schedule: "1 Short per day → 30 Shorts/month",
  });
}

async function weeklyBatch(niche: string) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const scripts = [];
  
  for (const day of days) {
    const result = await createShorts(`${niche} ${day} special`);
    scripts.push({ day, result });
  }

  const longVideo = await createLongVideo(niche);

  return NextResponse.json({
    success: true,
    weekly: { shorts: scripts, longVideo },
    schedule: "6 Shorts + 1 Long = 28 videos/month",
  });
}

// ========== GROWTH ==========

async function channelAudit(niche: string) {
  const prompt = `Audit YouTube channel for: "${niche}". Score: content, SEO, thumbnails, engagement. Give improvements.`;
  const result = await callAI(prompt);
  return NextResponse.json({ success: true, audit: result });
}

async function growthPlan(niche: string) {
  const prompt = `90-day YouTube growth plan for: "${niche}". Daily tasks, targets, strategy.`;
  const result = await callAI(prompt);
  return NextResponse.json({ success: true, plan: result });
}

async function competitorAnalysis(niche: string) {
  const prompt = `Analyze top competitors for: "${niche}". Their secrets, weaknesses, how to beat them.`;
  const result = await callAI(prompt);
  return NextResponse.json({ success: true, analysis: result });
}

async function trendPredictor(niche: string) {
  const prompt = `Predict next 30 days viral trends for: "${niche}". What will explode.`;
  const result = await callAI(prompt);
  return NextResponse.json({ success: true, trends: result });
}

// ========== REVENUE ==========

async function revenueOptimizer(niche: string) {
  const prompt = `Revenue optimization for YouTube: "${niche}". AdSense, affiliates, sponsors, products.`;
  const result = await callAI(prompt);
  return NextResponse.json({ success: true, revenue: result });
}

async function affiliatePlan(niche: string) {
  const prompt = `Affiliate marketing plan for: "${niche}". Top programs, commission rates, promo strategy.`;
  const result = await callAI(prompt);
  return NextResponse.json({ success: true, affiliate: result });
}

// ========== AUTO-PILOT ==========

async function autoPilot(niche: string) {
  const [shorts, hashtags, description, thumbnail, voiceover, trends, growth] = await Promise.all([
    createShorts(niche),
    createHashtags(niche),
    createDescription(niche),
    createThumbnail(niche),
    createVoiceover(niche),
    trendPredictor(niche),
    growthPlan(niche),
  ]);

  return NextResponse.json({
    success: true,
    autoPilot: {
      status: "🚀 ACTIVE 24/7",
      todayContent: { shorts, hashtags, description, thumbnail, voiceover },
      strategy: { trends, growth },
      schedule: "1 Short daily + 1 Long weekly = 34 videos/month",
    },
  });
}

async function brainStatus() {
  return NextResponse.json({
    success: true,
    brain: {
      status: "🧠 ALIVE & ACTIVE",
      engines: "Groq + Gemini",
      capabilities: ["Shorts", "Long Videos", "Voiceover", "Thumbnails", "Hashtags", "SEO", "Analytics", "Growth", "Revenue"],
      uptime: "24/7",
      autoMode: "ENABLED",
    },
  });
}

// ========== AI ENGINE ==========

async function callAI(prompt: string): Promise<string> {
  if (GROQ_KEY) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
        body: JSON.stringify({ model: "llama-3.3-70b-versatile", max_tokens: 4000, temperature: 0.9, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      const text = data?.choices?.[0]?.message?.content;
      if (text) return text;
    } catch {}
  }
  if (GEMINI_KEY) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) }
      );
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return text;
    } catch {}
  }
  return "AI unavailable";
}
