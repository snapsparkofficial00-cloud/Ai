import { NextResponse } from "next/server";

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
  const prompt = `Create a COMPLETE YouTube video production package to promote this website:

WEBSITE: ${websiteName}
URL: ${websiteUrl}
NICHE: ${niche}
DESCRIPTION: ${description || "A website that provides amazing value"}

GENERATE:

1. 🎬 VIDEO SCRIPT (60 seconds Shorts):
   - Hook (first 2 seconds): Shocking question/statement about ${niche}
   - Body (50 seconds): Show value of ${websiteName}, what it offers, why visit
   - CTA (last 8 seconds): "Visit ${websiteUrl} now! Link in description"
   - Make it ENTERTAINING and VIRAL

2. 🎙️ VOICEOVER TEXT:
   - Full narration script
   - Energetic tone, Hindi + English mix
   - 60 seconds duration
   - Pauses marked with [...]

3. 🖼️ VISUAL SCENES (10 scenes):
   For EACH scene describe:
   - What to show on screen
   - Text overlay (bold, large)
   - Duration in seconds
   - Transition effect

4. 🎵 BACKGROUND MUSIC:
   - Genre recommendation
   - Mood: Energetic/Exciting
   - Where to download free: YouTube Audio Library search terms

5. #️⃣ 30 VIRAL HASHTAGS:
   - Mix of high-volume + niche
   - Hindi + English

6. 📝 YOUTUBE DESCRIPTION:
   - First 2 lines with hook
   - What ${websiteName} offers
   - Link: ${websiteUrl}
   - Affiliate section
   - Hashtags
   - "Subscribe" CTA

7. 🖼️ THUMBNAIL DESIGN:
   - Visual concept description
   - Text overlay
   - Color scheme
   - Why it will get clicks

Make everything PRODUCTION-READY. Think MrBeast quality.`;

  const result = await callAI(prompt);
  return NextResponse.json({ success: true, type: "promo-video-package", websiteName, websiteUrl, result });
}

async function createShortsSeries(websiteName: string, websiteUrl: string, niche: string) {
  const prompt = `Create a 7-DAY YouTube Shorts SERIES to promote: ${websiteName} (${websiteUrl})

Niche: ${niche}

Generate 7 Shorts scripts (one for each day):

DAY 1 - "The Problem": Show the problem ${websiteName} solves
DAY 2 - "The Solution": Reveal ${websiteName} as the solution
DAY 3 - "How To": Tutorial showing how to use ${websiteName}
DAY 4 - "Results": Show benefits/results of using ${websiteName}
DAY 5 - "Comparison": ${websiteName} vs competitors
DAY 6 - "Secret Tip": Insider tip about ${niche}
DAY 7 - "Full Review": Complete review + strong CTA

For EACH day provide:
- Viral title
- 60-second script
- Hook
- Visual scenes
- Text overlays
- Hashtags
- Best posting time

Make them BINGE-WORTHY so viewers watch all 7.`;

  const result = await callAI(prompt);
  return NextResponse.json({ success: true, type: "shorts-series", series: "7 Days", result });
}

async function createVideoAd(websiteName: string, websiteUrl: string, niche: string) {
  const prompt = `Create a PROFESSIONAL VIDEO ADVERTISEMENT for: ${websiteName}

URL: ${websiteUrl}
Niche: ${niche}

Generate a 30-SECOND AD:

SCRIPT STRUCTURE:
- 0-3s: ATTENTION GRAB ("Stop scrolling! This will change your ${niche} game!")
- 3-15s: PROBLEM + SOLUTION
- 15-25s: BENEFITS (3 key benefits with text popups)
- 25-30s: STRONG CTA ("Click ${websiteUrl} NOW!")

Also include:
- Background music suggestions
- Sound effects cues
- Text animation ideas
- Color grading recommendation
- Target audience
- Estimated conversion rate

Make it CONVERT viewers into visitors.`;

  const result = await callAI(prompt);
  return NextResponse.json({ success: true, type: "video-ad", duration: "30 seconds", result });
}

async function createTutorialVideo(websiteName: string, websiteUrl: string, niche: string) {
  const prompt = `Create a STEP-BY-STEP TUTORIAL video (8 minutes) for: ${websiteName}

URL: ${websiteUrl}
Niche: ${niche}

VIDEO STRUCTURE:
1. INTRO (30s): "In this video, I'll show you exactly how to use ${websiteName} to..."
2. CHAPTER 1 (2 min): Getting started
3. CHAPTER 2 (2 min): Main features walkthrough
4. CHAPTER 3 (2 min): Pro tips & tricks
5. CHAPTER 4 (1 min): Common mistakes to avoid
6. OUTRO (30s): Summary + CTA to visit ${websiteUrl}

For EACH chapter:
- Narration script
- Screen recording instructions
- Zoom/highlight moments
- Text overlays
- Transition effects

Also: Thumbnail concept, SEO title, description, tags, playlist suggestion.`;

  const result = await callAI(prompt);
  return NextResponse.json({ success: true, type: "tutorial-video", duration: "8 minutes", result });
}

async function createAllPromoContent(websiteName: string, websiteUrl: string, niche: string, description?: string) {
  const [promoRes, shortsRes, adRes, tutorialRes] = await Promise.all([
    createPromoVideoPackage(websiteName, websiteUrl, niche, description),
    createShortsSeries(websiteName, websiteUrl, niche),
    createVideoAd(websiteName, websiteUrl, niche),
    createTutorialVideo(websiteName, websiteUrl, niche),
  ]);

  const promoData = await promoRes.json();
  const shortsData = await shortsRes.json();
  const adData = await adRes.json();
  const tutorialData = await tutorialRes.json();

  return NextResponse.json({
    success: true,
    websiteName,
    websiteUrl,
    niche,
    contentPackage: {
      promoVideo: promoData,
      shortsSeries: shortsData,
      videoAd: adData,
      tutorial: tutorialData,
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
  
  // Generate everything in parallel
  const [promoRes, shortsRes, adRes, tutorialRes] = await Promise.all([
    createPromoVideoPackage(websiteName, websiteUrl, niche, description),
    createShortsSeries(websiteName, websiteUrl, niche),
    createVideoAd(websiteName, websiteUrl, niche),
    createTutorialVideo(websiteName, websiteUrl, niche),
  ]);

  return NextResponse.json({
    success: true,
    websiteName,
    websiteUrl,
    niche,
    contentPackage: {
      promoVideo: await promoRes.json(),
      shortsSeries: await shortsRes.json(),
      videoAd: await adRes.json(),
      tutorial: await tutorialRes.json(),
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

async function callAI(prompt: string) {
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
      const data = await res.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    } catch {}
  }
  
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
  
  return "AI unavailable - add API keys";
}
