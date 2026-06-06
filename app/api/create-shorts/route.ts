import { NextResponse } from "next/server";

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const GROQ_KEY = process.env.GROQ_API_KEY;

export async function POST(req: Request) {
  try {
    const { action, niche } = await req.json();

    if (!niche) {
      return NextResponse.json({ success: false, error: "Niche is required" });
    }

    switch (action) {
      case "full-shorts-kit":
        return await fullShortsKit(niche);
      case "hindi-voiceover":
        return await hindiVoiceover(niche);
      case "find-footage":
        return await findFootage(niche);
      default:
        return NextResponse.json({ success: false, error: "Unknown action" });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

async function fullShortsKit(niche: string) {
  // Generate everything directly
  const prompt = `Create a COMPLETE YouTube Shorts production pack for: "${niche}"

Language: HINDI + ENGLISH mix

PROVIDE EXACTLY THIS FORMAT:

🎬 TITLE: [viral title]

📝 FULL 60-SECOND SCRIPT:
[0-3s] HOOK: (shocking line)
[3-10s] INTRO: (what this is about)
[10-25s] MAIN CONTENT:
[25-45s] MORE VALUE:
[45-55s] TWIST/FACT:
[55-60s] CTA: Like Share Subscribe!

🎙️ HINDI VOICEOVER (Devanagari):
[Write complete Hindi text to speak]

🔍 FOOTAGE SEARCH TERMS:
- term1
- term2
- term3
- term4
- term5

🎵 MUSIC: [energetic/cinematic]

#️⃣ HASHTAGS: #tag1 #tag2 ... (15 hashtags)

📝 YOUTUBE DESCRIPTION:
[First line hook]
[2-3 description lines]
[Hashtags]`;

  const aiResult = await callAI(prompt);

  // Parse sections
  const title = extractSection(aiResult, "TITLE");
  const script = extractSection(aiResult, "SCRIPT");
  const voiceover = extractSection(aiResult, "VOICEOVER");
  const footageTerms = extractSection(aiResult, "FOOTAGE SEARCH TERMS");
  const music = extractSection(aiResult, "MUSIC");
  const hashtags = extractSection(aiResult, "HASHTAGS");
  const description = extractSection(aiResult, "DESCRIPTION");

  // Get footage
  let videos: any[] = [];
  if (footageTerms) {
    const terms = footageTerms.split("\n").filter((t: string) => t.trim()).slice(0, 3);
    for (const term of terms) {
      try {
        const cleanTerm = term.replace(/^[-*\s\d.]+/, "").trim();
        const res = await fetch(
          `https://api.pexels.com/videos/search?query=${encodeURIComponent(cleanTerm)}&per_page=3&orientation=portrait`
        );
        if (res.ok) {
          const data = await res.json();
          data.videos?.forEach((v: any) => {
            const file = v.video_files?.find((f: any) => f.quality === "hd" || f.quality === "sd");
            if (file) videos.push({ url: file.link, thumbnail: v.image, duration: v.duration, query: cleanTerm });
          });
        }
      } catch {}
    }
  }

  return NextResponse.json({
    success: true,
    niche,
    shortsPack: {
      title: title || `${niche} Shorts`,
      script: script || aiResult,
      hindiVoiceover: voiceover || "Voiceover text in script above",
      footageTerms: footageTerms || "supercars, cars, racing",
      videos: videos.slice(0, 10),
      music: music || "energetic",
      hashtags: hashtags || "#viral #shorts #trending",
      description: description || "Watch this amazing video!",
    },
    steps: [
      "1. Download FREE footage from links above",
      "2. Go to capcut.com → New Project → 9:16 ratio",
      "3. Import footage, arrange by script timings",
      "4. Go to elevenlabs.io (FREE) → Paste Hindi text → Download MP3",
      "5. Import voiceover to CapCut",
      "6. Add text overlays from script",
      "7. Download FREE music from YouTube Audio Library",
      "8. Add music as background (volume 20%)",
      "9. Export as 1080p → Upload to YouTube! 🚀",
    ],
    freeTools: {
      editor: "capcut.com",
      voice: "elevenlabs.io",
      music: "youtube.com/audiolibrary",
      footage: "pexels.com",
      thumbnail: "canva.com",
    },
  });
}

async function hindiVoiceover(niche: string) {
  const prompt = `Write 60-second Hindi voiceover (Devanagari script) for YouTube Short: "${niche}". Natural Hindi, energetic, hook at start, CTA at end.`;
  const result = await callAI(prompt);
  return NextResponse.json({ success: true, hindiScript: result });
}

async function findFootage(niche: string) {
  const videos: any[] = [];
  try {
    const res = await fetch(
      `https://api.pexels.com/videos/search?query=${encodeURIComponent(niche)}&per_page=8&orientation=portrait`
    );
    if (res.ok) {
      const data = await res.json();
      data.videos?.forEach((v: any) => {
        const file = v.video_files?.find((f: any) => f.quality === "hd" || f.quality === "sd");
        if (file) videos.push({ url: file.link, thumbnail: v.image, duration: v.duration });
      });
    }
  } catch {}
  return NextResponse.json({ success: true, count: videos.length, videos });
}

function extractSection(text: string, keyword: string): string {
  const regex = new RegExp(`${keyword}[:\s]*([\\s\\S]+?)(?=🎬|📝|🎙️|🔍|🎵|#️⃣|📝|$)`, "i");
  const match = text.match(regex);
  return match ? match[1].trim() : "";
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
  return "AI unavailable - add API keys";
}
