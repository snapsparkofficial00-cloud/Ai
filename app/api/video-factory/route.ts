import { NextResponse } from "next/server";

const PEXELS_KEY = process.env.PEXELS_API_KEY || "";
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const GROQ_KEY = process.env.GROQ_API_KEY;

export async function POST(req: Request) {
  try {
    const { action, niche, query, websiteName, websiteUrl, script } = await req.json();

    switch (action) {
      case "search-footage": return await searchPexelsFootage(query || niche);
      case "search-music": return await searchPixabayMusic(niche);
      case "generate-script": return await generateVideoScript(niche, websiteName, websiteUrl);
      case "generate-thumbnail-design": return await generateThumbnailDesign(niche, websiteName);
      case "generate-description": return await generateYouTubeDescription(niche, websiteUrl);
      case "generate-hashtags": return await generateHashtags(niche);
      case "full-package": return await fullVideoPackage(niche, websiteName, websiteUrl);
      case "shorts-batch": return await shortsBatch(niche, websiteName, websiteUrl);
      default: return NextResponse.json({ success: false, error: "Unknown action" });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

// ========== PEXELS FREE STOCK FOOTAGE ==========
async function searchPexelsFootage(query: string) {
  const searchQueries = query.split(" ").slice(0, 3);

  const allVideos: any[] = [];

  for (const q of searchQueries) {
    try {
      // Pexels API
      const pexelsRes = await fetch(
        `https://api.pexels.com/videos/search?query=${encodeURIComponent(q)}&per_page=5&orientation=portrait`,
        { headers: PEXELS_KEY ? { Authorization: PEXELS_KEY } : {} }
      );
      
      if (pexelsRes.ok) {
        const data = await pexelsRes.json();
        data.videos?.forEach((v: any) => {
          const file = v.video_files?.find((f: any) => f.quality === "hd" || f.quality === "sd");
          if (file) {
            allVideos.push({
              id: v.id,
              url: file.link,
              thumbnail: v.image,
              duration: v.duration,
              source: "Pexels",
              download: `https://www.pexels.com/video/${v.id}/download/`,
            });
          }
        });
      }
    } catch {}
  }

  // Fallback: Pixabay
  if (allVideos.length === 0) {
    try {
      const pixRes = await fetch(
        `https://pixabay.com/api/videos/?key=25550272-9a2e5e5e5e5e5e5e5e5e5e5e5&q=${encodeURIComponent(query)}&per_page=10`
      );
      const pixData = await pixRes.json();
      pixData.hits?.forEach((v: any) => {
        const url = v.videos?.large?.url || v.videos?.medium?.url || v.videos?.small?.url;
        if (url) {
          allVideos.push({
            id: v.id,
            url: url,
            thumbnail: v.videos?.large?.thumbnail || "",
            duration: v.duration,
            source: "Pixabay",
            download: v.pageURL,
          });
        }
      });
    } catch {}
  }

  return NextResponse.json({
    success: true,
    query,
    count: allVideos.length,
    videos: allVideos.slice(0, 12),
    howToUse: "Download these free clips → Import into CapCut → Arrange on timeline",
  });
}

// ========== PIXABAY FREE MUSIC ==========
async function searchPixabayMusic(mood: string) {
  const moods: Record<string, string> = {
    "energetic": "upbeat",
    "calm": "relaxing",
    "cinematic": "epic",
    "viral": "energetic",
    "inspirational": "motivational",
  };

  const searchMood = moods[mood.toLowerCase()] || mood;

  try {
    const res = await fetch(
      `https://pixabay.com/api/music/?key=25550272-9a2e5e5e5e5e5e5e5e5e5e5e5&q=${encodeURIComponent(searchMood)}&per_page=10`
    );
    const data = await res.json();
    const tracks = (data.hits || []).map((t: any) => ({
      id: t.id,
      title: t.title,
      url: t.audio_url,
      duration: t.duration,
      tags: t.tags,
    }));

    return NextResponse.json({
      success: true,
      mood,
      tracks,
      alsoCheck: "YouTube Audio Library: youtube.com/audiolibrary (FREE, no copyright)",
    });
  } catch {
    return NextResponse.json({
      success: true,
      message: "Use YouTube Audio Library for free music: youtube.com/audiolibrary",
      alternativeSources: ["Pixabay Music", "Uppbeat.io (free tier)", "Mixkit.co"],
    });
  }
}

// ========== AI VIDEO SCRIPT ==========
async function generateVideoScript(niche: string, websiteName?: string, websiteUrl?: string) {
  const prompt = `Create a COMPLETE 60-second YouTube Shorts script for: "${niche}"${websiteName ? ` promoting ${websiteName} (${websiteUrl})` : ""}.

FORMAT EXACTLY:

⏱️ TIMINGS:
[0-3s] HOOK: (write the exact words)
[3-15s] BODY PART 1: (exact words)
[15-25s] BODY PART 2: (exact words)
[25-45s] VALUE: (exact words)${websiteUrl ? ` - mention ${websiteUrl} naturally` : ""}
[45-55s] PEAK/CLIMAX: (exact words)
[55-60s] CTA: (exact words with ${websiteUrl || "like, share, subscribe"})

🎬 FOOTAGE SEARCH TERMS (for Pexels/CapCut):
- [term 1]
- [term 2]
- [term 3]
- [term 4]
- [term 5]

📝 TEXT OVERLAYS (timing + exact text):
- [time] "[text]"
- [time] "[text]"
- [time] "[text]"

🎵 MUSIC: [mood recommendation for Pixabay]
🎙️ VOICE: [tone + pace for ElevenLabs]

🖼️ THUMBNAIL TEXT: "[main text]" + "[subtext]"
#️⃣ 5 HASHTAGS: #hashtag1 #hashtag2...

Make it VIRAL, engaging, and production-ready. Language: Hindi + English mix.`;

  const result = await callAI(prompt);
  
  // Parse script sections
  const timingMatch = result.match(/\[0-3s\].*?\[55-60s\].*?(?=\n\n|$)/s);
  const hook = result.match(/\[0-3s\] HOOK: (.*)/)?.[1] || "";
  
  return NextResponse.json({
    success: true,
    script: result,
    hook,
    voiceoverReady: result,
    tools: {
      voiceover: "elevenlabs.io (FREE 10 min/month)",
      editor: "capcut.com (FREE online)",
      thumbnail: "canva.com (FREE)",
      footage: "pexels.com (FREE)",
      music: "pixabay.com/music (FREE)",
    },
  });
}

// ========== THUMBNAIL DESIGN ==========
async function generateThumbnailDesign(niche: string, websiteName?: string) {
  const prompt = `Design a VIRAL YouTube Shorts thumbnail for: "${niche}"${websiteName ? ` promoting ${websiteName}` : ""}.

PROVIDE:
1. MAIN TEXT (big, bold, 3-5 words max)
2. SUBTEXT (smaller, 2-3 words)
3. COLOR SCHEME: Background, Text, Accent (hex codes)
4. IMAGE SEARCH: What to search on Pexels/Unsplash for the background
5. LAYOUT: Where to place text, where to place image
6. FONT: Bold sans-serif recommendation
7. CTR PREDICTION: Why this will get clicks

CANVA INSTRUCTIONS:
- Search for "[image query]" in Canva Photos
- Add text "[main text]" in [font] size [large]
- Add subtext "[subtext]" below
- Use [color scheme]`;

  const result = await callAI(prompt);
  return NextResponse.json({ success: true, design: result, tool: "canva.com (FREE)" });
}

// ========== YOUTUBE DESCRIPTION ==========
async function generateYouTubeDescription(niche: string, websiteUrl?: string) {
  const prompt = `Write a PERFECT YouTube Shorts description for: "${niche}"${websiteUrl ? ` promoting ${websiteUrl}` : ""}.

INCLUDE:
1. First line (visible before "more"): Hook with main keyword
2. Description (2-3 lines)
3. ${websiteUrl ? `🔗 Website: ${websiteUrl}` : ""}
4. 📢 "Subscribe for more!"
5. 15 hashtags
6. Affiliate/products section (if applicable)`;

  const result = await callAI(prompt);
  return NextResponse.json({ success: true, description: result });
}

// ========== HASHTAGS ==========
async function generateHashtags(niche: string) {
  const prompt = `Generate 20 VIRAL hashtags for YouTube Shorts about: "${niche}". Mix high-volume + niche + trending. Include Hindi hashtags. Return as: #tag1 #tag2 #tag3...`;
  const result = await callAI(prompt);
  return NextResponse.json({ success: true, hashtags: result });
}

// ========== FULL VIDEO PACKAGE ==========
async function fullVideoPackage(niche: string, websiteName?: string, websiteUrl?: string) {
  const [footage, music, script, thumbnail, description, hashtags] = await Promise.all([
    searchPexelsFootage(niche),
    searchPixabayMusic("energetic"),
    generateVideoScript(niche, websiteName, websiteUrl),
    generateThumbnailDesign(niche, websiteName),
    generateYouTubeDescription(niche, websiteUrl),
    generateHashtags(niche),
  ]);

  return NextResponse.json({
    success: true,
    niche,
    websiteName,
    package: {
      footage: footage,
      music: music,
      script: script,
      thumbnail: thumbnail,
      description: description,
      hashtags: hashtags,
    },
    steps: [
      "1. 📥 Download footage from Pexels links above",
      "2. 🎬 Go to capcut.com → New Project (9:16)",
      "3. 📤 Import downloaded footage into CapCut",
      "4. ✂️ Arrange clips according to script timings",
      "5. 🎙️ Go to elevenlabs.io → Paste script → Generate voice",
      "6. 📤 Download voiceover → Import to CapCut",
      "7. 🎵 Download music from links above → Add as background",
      "8. 📝 Add text overlays from script (CapCut text tool)",
      "9. 🔄 Add transitions between clips",
      "10. 📤 Export as 1080p MP4",
      "11. 🖼️ Go to canva.com → Create thumbnail using design above",
      "12. 📺 Upload to YouTube → Paste description + hashtags",
      "13. 💰 Add affiliate links in description",
      "14. 🚀 PUBLISH & watch traffic come!",
    ],
    totalTime: "~30 minutes per video",
    totalCost: "100% FREE",
  });
}

// ========== SHORTS BATCH ==========
async function shortsBatch(niche: string, websiteName?: string, websiteUrl?: string) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const prompt = `Create 7 YouTube Shorts scripts (one per day) to promote: ${niche}${websiteName ? ` website: ${websiteName} (${websiteUrl})` : ""}.

For EACH day provide:
- Title
- Hook (3 seconds)
- Full 60-second script
- Footage search terms
- Text overlay timings
- Best posting time

Days: ${days.join(", ")}
Make them BINGE-WORTHY.`;

  const result = await callAI(prompt);
  const footage = await searchPexelsFootage(niche);

  return NextResponse.json({
    success: true,
    scripts: result,
    footage,
    schedule: days.map((day, i) => ({
      day,
      time: i < 5 ? "6 PM IST" : "10 AM IST",
      type: i < 5 ? "Shorts" : "Long Video",
    })),
  });
}

// ========== AI CALL ==========
async function callAI(prompt: string): Promise<string> {
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
  return "AI unavailable";
}
