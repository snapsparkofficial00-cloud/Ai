import { NextResponse } from "next/server";

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const GROQ_KEY = process.env.GROQ_API_KEY;

export async function POST(req: Request) {
  try {
    const { action, niche } = await req.json();

    switch (action) {
      case "generate-shorts-pack":
        return await generateShortsPack(niche);
      case "hindi-voiceover":
        return await generateHindiVoiceover(niche);
      case "find-footage":
        return await findFreeFootage(niche);
      case "get-music":
        return await getBackgroundMusic(niche);
      case "thumbnail-design":
        return await designThumbnail(niche);
      case "full-shorts-kit":
        return await fullShortsKit(niche);
      default:
        return NextResponse.json({ success: false, error: "Unknown action" });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

// ========== COMPLETE SHORTS PACKAGE ==========

async function generateShortsPack(niche: string) {
  const prompt = `Create a COMPLETE 60-second YouTube Shorts production pack for: "${niche}"

Language: HINDI + ENGLISH mix (Hinglish)

PROVIDE:

1. 🎬 TITLE (viral, clickbait style):
   "[title in Hindi/English]"

2. 📝 FULL SCRIPT (60 seconds with timing):
   [0-3s] HOOK: (shocking line in Hindi)
   [3-10s] INTRO: (what this video is about)
   [10-25s] MAIN CONTENT PART 1: (valuable info)
   [25-45s] MAIN CONTENT PART 2: (more value)
   [45-55s] SURPRISING FACT/TWIST:
   [55-60s] CTA: "Like, Share, Subscribe!"

3. 🎙️ HINDI VOICEOVER TEXT:
   Full script in Hindi (written in Hindi script)
   Every word to be spoken

4. 🖼️ 8 SCENES with TIMING:
   Scene 1 [0-3s]: What to show - (description) | Text overlay: "[text]"
   Scene 2 [3-10s]: What to show - (description) | Text overlay: "[text]"
   ... up to Scene 8

5. 🔍 FOOTAGE SEARCH TERMS (for Pexels):
   - [search term 1]
   - [search term 2]
   - [search term 3]
   - [search term 4]
   - [search term 5]

6. 🎵 MUSIC MOOD: [energetic/cinematic/inspirational]

7. #️⃣ 15 VIRAL HASHTAGS:
   #hashtag1 #hashtag2 ...

8. 📝 YOUTUBE DESCRIPTION:
   First line hook
   2-3 description lines
   Hashtags
   "Subscribe for more" CTA`;

  const result = await callAI(prompt);

  // Parse sections
  const title = result.match(/TITLE:?\s*(.+)/i)?.[1] || `${niche} Shorts`;
  const hook = result.match(/HOOK:?\s*(.+)/i)?.[1] || "";
  const hindiVoiceover = result.match(/HINDI VOICEOVER TEXT:?\s*([\s\S]+?)(?=🖼️|SCENES|$)/i)?.[1]?.trim() || result;
  const scenes = result.match(/SCENES?[\s\S]+?(?=FOOTAGE|🔍|MUSIC|$)/i)?.[0] || "";
  const searchTerms = result.match(/FOOTAGE SEARCH TERMS:?\s*([\s\S]+?)(?=🎵|MUSIC|$)/i)?.[1] || "";
  const musicMood = result.match(/MUSIC MOOD:?\s*(.+)/i)?.[1] || "energetic";
  const hashtags = result.match(/HASHTAGS:?\s*([\s\S]+?)(?=📝|DESCRIPTION|$)/i)?.[1] || "";

  return NextResponse.json({
    success: true,
    niche,
    shorts: {
      title,
      hook,
      script: result,
      hindiVoiceover,
      scenes,
      searchTerms: searchTerms.split("\n").filter((l: string) => l.trim()).map((l: string) => l.replace(/^[-*\s]+/, "").trim()),
      musicMood,
      hashtags,
    },
    tools: {
      videoEditor: { name: "CapCut Online", url: "https://capcut.com", cost: "100% FREE" },
      footage: { name: "Pexels", url: "https://pexels.com/videos", cost: "FREE" },
      voiceover: { name: "ElevenLabs", url: "https://elevenlabs.io", cost: "FREE (10 min/month)", tip: "Select Hindi voice, paste the Hindi text, download MP3" },
      music: { name: "YouTube Audio Library", url: "https://youtube.com/audiolibrary", cost: "FREE" },
      thumbnail: { name: "Canva", url: "https://canva.com", cost: "FREE", tip: "Search 'YouTube Shorts thumbnail template'" },
    },
    steps: [
      "1. Download FREE footage from Pexels using search terms above",
      "2. Go to capcut.com → New Project → 9:16 ratio",
      "3. Import downloaded footage into CapCut",
      "4. Arrange clips according to scene timings",
      "5. Go to elevenlabs.io → Paste Hindi voiceover text → Generate voice → Download MP3",
      "6. Import voiceover MP3 into CapCut",
      "7. Add text overlays as specified in scenes",
      "8. Download FREE music from YouTube Audio Library",
      "9. Add music as background (lower volume to 20%)",
      "10. Add transitions between scenes",
      "11. Export as 1080p MP4",
      "12. Create thumbnail in Canva",
      "13. Upload to YouTube → Paste description + hashtags",
      "14. PUBLISH! 🚀",
    ],
  });
}

async function generateHindiVoiceover(niche: string) {
  const prompt = `Write a 60-second Hindi voiceover script for a YouTube Short about: "${niche}"

Write COMPLETE Hindi text (in Devanagari script).
Use simple, natural Hindi that sounds good when spoken.
Mark pauses with [...].
Start with an energetic hook.
End with "Like, Share aur Subscribe karna mat bhoolna!"

The voiceover should be exactly 60 seconds when spoken at normal speed.`;

  const result = await callAI(prompt);
  return NextResponse.json({
    success: true,
    hindiScript: result,
    voiceTool: {
      name: "ElevenLabs",
      url: "https://elevenlabs.io/app/speech-synthesis",
      steps: [
        "1. Go to elevenlabs.io (sign up FREE)",
        "2. Select voice: 'Hindi - Male/Female'",
        "3. Paste the Hindi script",
        "4. Click Generate",
        "5. Download MP3",
      ],
    },
  });
}

async function findFreeFootage(niche: string) {
  // Search Pexels
  const queries = niche.split(" ").slice(0, 3);
  const allVideos: any[] = [];

  for (const q of queries) {
    try {
      const res = await fetch(
        `https://api.pexels.com/videos/search?query=${encodeURIComponent(q)}&per_page=5&orientation=portrait`,
        { headers: process.env.PEXELS_API_KEY ? { Authorization: process.env.PEXELS_API_KEY } : {} }
      );
      if (res.ok) {
        const data = await res.json();
        data.videos?.forEach((v: any) => {
          const file = v.video_files?.find((f: any) => f.quality === "hd" || f.quality === "sd");
          if (file) allVideos.push({ id: v.id, url: file.link, thumbnail: v.image, duration: v.duration, source: "Pexels" });
        });
      }
    } catch {}
  }

  return NextResponse.json({
    success: true,
    query: niche,
    count: allVideos.length,
    videos: allVideos.slice(0, 10),
    howToDownload: "Click any URL → Right-click video → Save as → Import to CapCut",
    alsoTry: ["pexels.com/videos", "pixabay.com/videos", "mixkit.co/free-stock-video"],
  });
}

async function getBackgroundMusic(niche: string) {
  return NextResponse.json({
    success: true,
    freeSources: [
      { name: "YouTube Audio Library", url: "https://youtube.com/audiolibrary", how: "Filter by genre → Download → Import to CapCut" },
      { name: "Pixabay Music", url: "https://pixabay.com/music", how: "Search 'energetic' or 'cinematic' → Download" },
      { name: "Uppbeat", url: "https://uppbeat.io", how: "Free tier → Download → Credit in description" },
      { name: "Mixkit", url: "https://mixkit.co/free-stock-music", how: "Download → No attribution needed" },
    ],
    searchTerms: ["energetic background music", "cinematic shorts music", "viral background music", `${niche} background`],
  });
}

async function designThumbnail(niche: string) {
  const prompt = `Design a VIRAL YouTube Shorts thumbnail for: "${niche}"

Provide:
1. MAIN TEXT: (3-5 words, BIG BOLD, Hindi or English)
2. SUBTEXT: (2-3 words)
3. BACKGROUND: What image to use (search on Pexels/Unsplash)
4. COLORS: Text color, background color, accent
5. FONT: Bold, thick, readable on mobile
6. LAYOUT: Text placement on image

CANVA STEPS:
- Search "[background query]" in Canva Photos
- Add text "[main text]" in BOLD font
- Add "[subtext]" below
- Use [color scheme]
- Export as JPG`;

  const result = await callAI(prompt);
  return NextResponse.json({ success: true, design: result, tool: "canva.com (FREE)" });
}

async function fullShortsKit(niche: string) {
  const [shorts, voice, footage, music, thumbnail] = await Promise.all([
    generateShortsPack(niche),
    generateHindiVoiceover(niche),
    findFreeFootage(niche),
    getBackgroundMusic(niche),
    designThumbnail(niche),
  ]);

  return NextResponse.json({
    success: true,
    niche,
    kit: { shorts, voice, footage, music, thumbnail },
    totalTimeToCreate: "20-30 minutes",
    totalCost: "100% FREE",
  });
}

async function callAI(prompt: string): Promise<string> {
  if (GEMINI_KEY) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { maxOutputTokens: 4000 } }),
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
