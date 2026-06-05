import { NextResponse } from "next/server";

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const GROQ_KEY = process.env.GROQ_API_KEY;

export async function POST(req: Request) {
  try {
    const { action, websiteName, websiteUrl, niche, websiteDescription } = await req.json();

    switch (action) {
      case "promo-video-package":
        return await createPromoVideoPackage(websiteName, websiteUrl, niche, websiteDescription);
      case "shorts-series":
        return await createShortsSeries(websiteName, websiteUrl, niche);
      case "video-ad":
        return await createVideoAd(websiteName, websiteUrl, niche);
      case "tutorial-video":
        return await createTutorialVideo(websiteName, websiteUrl, niche);
      case "all-promo-content":
        return await createAllPromoContent(websiteName, websiteUrl, niche, websiteDescription);
      default:
        return NextResponse.json({ success: false, error: "Unknown action" });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

async function createPromoVideoPackage(websiteName: string, websiteUrl: string, niche: string, description?: string) {
  const prompt = `Create a COMPLETE YouTube video production package to promote: ${websiteName} (${websiteUrl})

Niche: ${niche}

GENERATE:
1. 60-second Shorts script with hook, body, CTA
2. Voiceover text (Hindi+English mix, energetic tone)
3. 10 visual scenes with text overlays and transitions
4. Background music recommendation (free sources)
5. 30 viral hashtags (Hindi + English mix)
6. YouTube SEO description with affiliate section
7. Thumbnail design concept (visual, text, colors)

Make it viral and production-ready. Think MrBeast quality.`;

  const result = await smartAI(prompt);
  return NextResponse.json({ success: true, type: "promo-video-package", websiteName, websiteUrl, result });
}

async function createShortsSeries(websiteName: string, websiteUrl: string, niche: string) {
  const prompt = `Create a 7-DAY YouTube Shorts SERIES to promote: ${websiteName} (${websiteUrl})

Niche: ${niche}

Generate 7 scripts (one per day):
DAY 1 - "The Problem": Show the problem ${websiteName} solves
DAY 2 - "The Solution": Reveal ${websiteName} as the solution
DAY 3 - "How To": Tutorial showing how to use ${websiteName}
DAY 4 - "Results": Show benefits of using ${websiteName}
DAY 5 - "Comparison": ${websiteName} vs competitors
DAY 6 - "Secret Tip": Insider tip about ${niche}
DAY 7 - "Full Review": Complete review + strong CTA

For EACH day: viral title, 60-sec script, hook, visual scenes, hashtags, best posting time.
Make them BINGE-WORTHY.`;

  const result = await smartAI(prompt);
  return NextResponse.json({ success: true, type: "shorts-series", series: "7 Days", result });
}

async function createVideoAd(websiteName: string, websiteUrl: string, niche: string) {
  const prompt = `Create a 30-SECOND VIDEO AD for: ${websiteName} (${websiteUrl})

Niche: ${niche}

SCRIPT STRUCTURE:
0-3s: ATTENTION GRAB
3-15s: Problem + Solution
15-25s: 3 Key Benefits with text popups
25-30s: Strong CTA to visit ${websiteUrl}

Include: music suggestions, sound effects, text animations, color grading.`;

  const result = await smartAI(prompt);
  return NextResponse.json({ success: true, type: "video-ad", duration: "30 seconds", result });
}

async function createTutorialVideo(websiteName: string, websiteUrl: string, niche: string) {
  const prompt = `Create an 8-MINUTE TUTORIAL for: ${websiteName} (${websiteUrl})

Niche: ${niche}

VIDEO STRUCTURE:
INTRO (30s): What viewers will learn
CHAPTER 1 (2min): Getting started
CHAPTER 2 (2min): Main features walkthrough
CHAPTER 3 (2min): Pro tips & tricks
CHAPTER 4 (1min): Common mistakes to avoid
OUTRO (30s): Summary + CTA to visit ${websiteUrl}

For each chapter: narration script, screen recording instructions, text overlays, transitions.`;

  const result = await smartAI(prompt);
  return NextResponse.json({ success: true, type: "tutorial-video", duration: "8 minutes", result });
}

async function createAllPromoContent(websiteName: string, websiteUrl: string, niche: string, description?: string) {
  const [promoResult, shortsResult, adResult, tutorialResult] = await Promise.all([
    smartAI(`Create promo video package for ${websiteName}: ${niche}. Script, voiceover, scenes, hashtags, SEO, thumbnail.`),
    smartAI(`Create 7-day Shorts series for ${websiteName}: ${niche}. One script per day.`),
    smartAI(`Create 30-second video ad for ${websiteName}: ${niche}.`),
    smartAI(`Create 8-minute tutorial for ${websiteName}: ${niche}. Chapters included.`),
  ]);

  return NextResponse.json({
    success: true,
    websiteName,
    websiteUrl,
    niche,
    contentPackage: {
      promoVideo: promoResult,
      shortsSeries: shortsResult,
      videoAd: adResult,
      tutorial: tutorialResult,
    },
    promotionPlan: {
      week1: "Post Promo Short + Day 1 of Series",
      week2: "Post Tutorial + Days 2-4 of Series",
      week3: "Post Video Ad + Days 5-7 of Series",
      week4: "Analyze + Optimize + Repost best performer",
      expectedResults: "50K-200K views, 5K-20K website visits",
    },
  });
}

// ========== SMART AI ROUTER ==========
// Tries OpenAI → Gemini → Groq

async function smartAI(prompt: string): Promise<string> {
  // 1. Try OpenAI
  if (OPENAI_KEY) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${OPENAI_KEY}` },
        body: JSON.stringify({ model: "gpt-4o-mini", max_tokens: 4000, messages: [{ role: "user", content: prompt }] }),
      });
      if (res.ok) {
        const data = await res.json();
        const text = data?.choices?.[0]?.message?.content;
        if (text) return text;
      }
    } catch {}
  }

  // 2. Try Gemini
  if (GEMINI_KEY) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { maxOutputTokens: 4000, temperature: 0.9 } }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch {}
  }

  // 3. Try Groq
  if (GROQ_KEY) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
        body: JSON.stringify({ model: "llama-3.3-70b-versatile", max_tokens: 4000, messages: [{ role: "user", content: prompt }] }),
      });
      if (res.ok) {
        const data = await res.json();
        const text = data?.choices?.[0]?.message?.content;
        if (text) return text;
      }
    } catch {}
  }

  return "No AI API available. Please add OPENAI_API_KEY, GEMINI_API_KEY, or GROQ_API_KEY to Vercel environment variables.";
  }
