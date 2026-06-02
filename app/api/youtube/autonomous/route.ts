import { NextResponse } from "next/server";

export const maxDuration = 300;

let learningMemory: any[] = [];
let performanceHistory: any[] = [];

export async function POST(req: Request) {
  try {
    const { action, niche } = await req.json();

    const GROQ_KEY = process.env.GROQ_API_KEY;
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!GROQ_KEY) {
      return NextResponse.json({ error: "Missing GROQ_API_KEY" });
    }

    // Load past learnings
    if (SUPABASE_URL && SUPABASE_KEY) {
      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/learning?select=*&order=score.desc&limit=10`, {
          headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
        });
        const data = await res.json();
        if (data.length) learningMemory = data;
      } catch (e) {}
    }

    // AI Decision Engine - Learns from past performance
    const decisionPrompt = `
You are an autonomous YouTube AI that learns from past results.

Current Niche: ${niche || "Supercars"}

Past Learnings:
${learningMemory.slice(0,5).map((m:any) => `- ${m.strategy}: ${m.result} (Score: ${m.score})`).join("\n") || "No past data yet"}

Based on this learning, decide:
1. Best video type (shorts vs long)
2. Best hook style (shocking, question, storytelling)
3. Best thumbnail style (color, text, expression)
4. Best posting time (0-23 hours)
5. Suggested title keywords

Return ONLY JSON:
{
  "videoType": "short" or "long",
  "hookStyle": "string",
  "thumbnailStyle": "string",
  "postingHour": number,
  "keywords": ["word1", "word2"],
  "confidence": number(0-100)
}`;

    const decisionRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: decisionPrompt }],
        temperature: 0.7,
      }),
    });
    const decisionData = await decisionRes.json();
    let decision = {};
    try {
      decision = JSON.parse(decisionData.choices[0]?.message?.content || "{}");
    } catch { decision = { videoType: "short", hookStyle: "viral", thumbnailStyle: "bold", postingHour: 12, keywords: ["viral"], confidence: 70 }; }

    // Generate optimized script based on learnings
    const scriptPrompt = `
Write a ${(decision as any).videoType === "short" ? "45-second YouTube Shorts script" : "5-minute YouTube video script"}
Niche: ${niche || "Supercars"}
Hook Style: ${(decision as any).hookStyle || "viral"}
Target Keywords: ${(decision as any).keywords?.join(", ") || "viral, trending"}

Requirements:
- Engaging hook within first 3 seconds
- Fast-paced, retention-focused
- Call to action at end
- Return ONLY the script text`;

    const scriptRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: scriptPrompt }],
        temperature: 0.9,
      }),
    });
    const scriptData = await scriptRes.json();
    const script = scriptData.choices[0]?.message?.content || "";

    // Generate title with keywords
    const titlePrompt = `Generate a clickable YouTube title for a ${(decision as any).videoType} about ${niche || "Supercars"}. Use these keywords: ${(decision as any).keywords?.join(", ")}. Return ONLY the title.`;
    const titleRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: titlePrompt }],
        temperature: 0.9,
      }),
    });
    const titleData = await titleRes.json();
    const title = titleData.choices[0]?.message?.content || `${niche} - Viral Video`;

    // Generate thumbnail prompt from learning
    const thumbPrompt = `Create a thumbnail prompt for: ${title}. Style: ${(decision as any).thumbnailStyle}. Return ONLY the prompt.`;
    const thumbRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: thumbPrompt }],
        temperature: 0.8,
      }),
    });
    const thumbData = await thumbRes.json();
    const imagePrompt = thumbData.choices[0]?.message?.content || `${title}, bold colors, dramatic lighting, viral YouTube thumbnail`;

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
    } catch (e) {}

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

    if (SUPABASE_URL && SUPABASE_KEY) {
      await fetch(`${SUPABASE_URL}/rest/v1/learning`, {
        method: "POST",
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify(learningEntry),
      }).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      decision,
      title,
      script,
      thumbnailUrl,
      imagePrompt,
      learningMemory: learningMemory.slice(0, 10),
      nextSteps: {
        voice: "/api/voice",
        upload: "/api/youtube/upload",
        schedule: `${(decision as any).postingHour}:00 UTC`,
      },
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) });
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    learningMemory: learningMemory.slice(0, 20),
    performanceHistory: performanceHistory.slice(0, 20),
    message: "Autonomous AI system ready. Send POST with action: 'generate'",
  });
}
