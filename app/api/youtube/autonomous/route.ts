import { NextResponse } from "next/server";
import { saveMemory, recallMemories } from "../../../lib/agents/memory";
import { detectTrends } from "../../../lib/agents/trend";
import { getChannelHealth } from "../../../lib/agents/channelHealth";
import { runCEOStrategy } from "../../../lib/agents/ceo";

export const maxDuration = 300;

let learningMemory: any[] = [];
let performanceHistory: any[] = [];

export async function POST(req: Request) {
  try {
    const { action, niche, topic, type, regenerate } = await req.json();

    const GROQ_KEY = process.env.GROQ_API_KEY;
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!GROQ_KEY) {
      return NextResponse.json({ error: "Missing GROQ_API_KEY. Add it in Vercel environment variables." });
    }

    // Load past learnings from Supabase
    if (SUPABASE_URL && SUPABASE_KEY) {
      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/learning?select=*&order=score.desc&limit=10`, {
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
        });
        const data = await res.json();
        if (data.length) learningMemory = data;
      } catch (e) {}
    }

    // Load memories from memory agent
    const pastMemories = await recallMemories("strategy", 5);

    // Get current channel health
    const channelHealth = await getChannelHealth();

    // Get CEO strategy
    const ceoStrategy = await runCEOStrategy(niche || topic || "general");

    // Get trending topics
    const trends = await detectTrends(niche || topic);

    // AI Decision Engine - Learns from past performance
    const decisionPrompt = `
You are an autonomous YouTube AI that learns from past results.

Current Niche: ${niche || topic || "Supercars"}
Channel Health Score: ${channelHealth.score}/100
Channel Status: ${channelHealth.status}
CEO Recommended Action: ${ceoStrategy.decision.command}

Trending Topics:
${trends.slice(0, 3).map((t: any) => `- ${t.keyword} (Score: ${t.viralScore})`).join("\n") || "No trends detected"}

Past Learnings:
${learningMemory.slice(0,5).map((m:any) => `- ${m.strategy}: ${m.result} (Score: ${m.score})`).join("\n") || "No past data yet"}

Memory Insights:
${pastMemories.slice(0,3).map((m:any) => `- ${m.content.slice(0, 100)}`).join("\n") || "No memory insights"}

Based on ALL this data, decide:
1. Best video type (shorts vs long)
2. Best hook style (shocking, question, storytelling, educational)
3. Best thumbnail style (color, text, expression)
4. Best posting time (0-23 hours)
5. Suggested title keywords
6. Confidence level

Return ONLY JSON:
{
  "videoType": "short" or "long",
  "hookStyle": "string",
  "thumbnailStyle": "string",
  "postingHour": number,
  "keywords": ["word1", "word2"],
  "confidence": number(0-100),
  "reasoning": "brief explanation"
}`;

    const decisionRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: decisionPrompt }],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });
    const decisionData = await decisionRes.json();
    let decision = {};
    try {
      decision = JSON.parse(decisionData.choices[0]?.message?.content || "{}");
    } catch { 
      decision = { 
        videoType: type || "short", 
        hookStyle: "viral", 
        thumbnailStyle: "bold", 
        postingHour: 12, 
        keywords: ["viral", "trending"], 
        confidence: 70,
        reasoning: "Default strategy based on available data"
      }; 
    }

    // Generate optimized script based on learnings
    const scriptPrompt = `
Write a ${(decision as any).videoType === "short" ? "45-60 second YouTube Shorts script" : "5-8 minute YouTube video script"}
Niche: ${niche || topic || "Supercars"}
Hook Style: ${(decision as any).hookStyle || "viral"}
Target Keywords: ${(decision as any).keywords?.join(", ") || "viral, trending"}
${regenerate ? "REWRITE with different approach, more engaging hook:" : ""}

Requirements:
- Engaging hook within first 3 seconds
- Fast-paced, retention-focused
- Call to action at end (like, subscribe, comment)
- Return ONLY the script text`;

    const scriptRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: scriptPrompt }],
        temperature: regenerate ? 1.0 : 0.9,
        max_tokens: (decision as any).videoType === "short" ? 600 : 2500,
      }),
    });
    const scriptData = await scriptRes.json();
    const script = scriptData.choices[0]?.message?.content || "Script generation failed. Please try again.";

    // Generate title with keywords
    const titlePrompt = `Generate a clickable YouTube ${(decision as any).videoType === "short" ? "Shorts" : "video"} title for: ${niche || topic || "Supercars"}. Use these keywords: ${(decision as any).keywords?.join(", ")}. Make it viral-worthy. Return ONLY the title.`;
    const titleRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: titlePrompt }],
        temperature: 0.9,
        max_tokens: 150,
      }),
    });
    const titleData = await titleRes.json();
    const title = titleData.choices[0]?.message?.content || `${niche || topic} - ${(decision as any).videoType === "short" ? "🔥 Viral Shorts" : "Full Video"}`;

    // Generate thumbnail prompt from learning
    const thumbPrompt = `Create a detailed image generation prompt for a YouTube thumbnail.
Title: "${title}"
Style: ${(decision as any).thumbnailStyle || "bold"}
Niche: ${niche || topic}

Requirements: bold colors, dramatic lighting, face reaction, arrows, text overlay, high contrast, clickable.
Return ONLY the prompt.`;
    const thumbRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: thumbPrompt }],
        temperature: 0.8,
        max_tokens: 200,
      }),
    });
    const thumbData = await thumbRes.json();
    const imagePrompt = thumbData.choices[0]?.message?.content || `${title}, bold colors, dramatic lighting, viral YouTube thumbnail, 4k, highly detailed`;

    // Generate thumbnail
    let thumbnailUrl = "";
    try {
      const imageRes = await fetch(`${process.env.NEXT_PUBLIC_URL || "https://ai-ivory-delta.vercel.app"}/api/image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: imagePrompt }),
      });
      const imageJson = await imageRes.json();
      thumbnailUrl = imageJson.url || "";
    } catch (e) {
      console.log("Thumbnail generation failed:", e);
    }

    // Save learning to memory
    const learningEntry = {
      id: Date.now(),
      strategy: `${(decision as any).videoType} - ${(decision as any).hookStyle}`,
      title,
      result: "generated",
      score: (decision as any).confidence || 50,
      created_at: new Date().toISOString(),
    };
    learningMemory.unshift(learningEntry);

    // Save to Supabase learning table
    if (SUPABASE_URL && SUPABASE_KEY) {
      await fetch(`${SUPABASE_URL}/rest/v1/learning`, {
        method: "POST",
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify(learningEntry),
      }).catch(() => {});
    }

    // Save to memory agent
    await saveMemory("strategy", `Generated ${(decision as any).videoType} video for ${niche || topic}`, (decision as any).confidence || 50, {
      title,
      hookStyle: (decision as any).hookStyle,
      keywords: (decision as any).keywords,
    });

    // Record performance history
    performanceHistory.unshift({
      timestamp: new Date().toISOString(),
      niche: niche || topic,
      type: (decision as any).videoType,
      confidence: (decision as any).confidence,
      title,
    });
    performanceHistory = performanceHistory.slice(0, 50);

    return NextResponse.json({
      success: true,
      decision,
      title,
      script,
      thumbnailUrl,
      imagePrompt,
      channelHealth,
      ceoStrategy: ceoStrategy.decision,
      trends: trends.slice(0, 3),
      learningMemory: learningMemory.slice(0, 10),
      performanceHistory: performanceHistory.slice(0, 10),
      nextSteps: {
        voice: "/api/voice",
        upload: "/api/youtube/upload",
        schedule: `${(decision as any).postingHour || 12}:00 UTC`,
        quality: "/api/youtube/quality",
      },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Autonomous API error:", error);
    return NextResponse.json({ 
      success: false, 
      error: String(error),
      message: "Check your GROQ_API_KEY and Supabase connection"
    }, { status: 500 });
  }
}

export async function GET() {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  let supabaseLearning = [];
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/learning?select=*&order=score.desc&limit=10`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
      });
      supabaseLearning = await res.json();
    } catch (e) {}
  }

  return NextResponse.json({
    success: true,
    learningMemory: learningMemory.slice(0, 20),
    supabaseLearning,
    performanceHistory: performanceHistory.slice(0, 20),
    totalMemories: learningMemory.length,
    message: "Autonomous AI system ready. Send POST with: { action: 'generate', niche: 'your niche' }",
    endpoints: {
      generate: "POST with { niche: 'Supercars' }",
      regenerate: "POST with { niche: 'Supercars', regenerate: true }",
      health: "GET /api/youtube/health",
      trends: "GET /api/youtube/trends",
      ceo: "POST /api/youtube/ceo",
    }
  });
}
