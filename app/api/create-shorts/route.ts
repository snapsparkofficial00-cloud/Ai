import { NextResponse } from "next/server";

const GROQ_KEY = process.env.GROQ_API_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
  try {
    const { action, niche } = await req.json();

    if (action === "full-shorts-kit" && niche) {
      const prompt = `Create a YouTube Shorts pack for: "${niche}" in HINDI+ENGLISH.

Return EXACTLY this:
TITLE: [viral title]
SCRIPT: [60 second script with timings]
HINDI VOICE: [Hindi Devanagari text to speak]
FOOTAGE: [5 search terms for Pexels]
MUSIC: [mood]
HASHTAGS: [15 hashtags]
DESCRIPTION: [YouTube description]`;

      const aiText = await callAI(prompt);

      return NextResponse.json({
        success: true,
        niche,
        result: aiText,
        freeTools: {
          editor: "capcut.com (FREE)",
          voice: "elevenlabs.io (FREE)",
          music: "youtube.com/audiolibrary (FREE)",
          footage: "pexels.com (FREE)",
          thumbnail: "canva.com (FREE)",
        },
        steps: [
          "1. Search footage on pexels.com using terms above",
          "2. Download clips and import to capcut.com (9:16)",
          "3. Paste Hindi text at elevenlabs.io → Download MP3 voice",
          "4. Import voice to CapCut, add text overlays",
          "5. Add music from YouTube Audio Library",
          "6. Export 1080p → Upload to YouTube!",
        ],
      });
    }

    return NextResponse.json({ success: false, error: "Missing action or niche" });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
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
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );
      const data = await res.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    } catch {}
  }
  return "AI unavailable";
}
