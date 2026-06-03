import { NextResponse } from "next/server";

export const maxDuration = 300;

export async function POST(req: Request) {
  try {
    const { command } = await req.json();
    const GROQ_KEY = process.env.GROQ_API_KEY;

    // Understand natural language command
    const understandingPrompt = `
You are a smart YouTube AI assistant. Analyze this user command and extract what they want:

Command: "${command}"

Return ONLY JSON:
{
  "topic": "main topic (e.g., BMW M5)",
  "hasVoiceover": true/false,
  "hasMusic": true/false,
  "musicStyle": "epic/energetic/calm/cinematic/techno/none",
  "videoType": "short/long",
  "language": "hindi/english/mix",
  "duration": 30-60,
  "additionalInstructions": "any special requests"
}`;

    let understanding = {
      topic: "BMW M5",
      hasVoiceover: false,
      hasMusic: true,
      musicStyle: "epic",
      videoType: "short",
      language: "hindi",
      duration: 45,
      additionalInstructions: "",
    };

    if (GROQ_KEY) {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: understandingPrompt }],
          temperature: 0.3,
          max_tokens: 500,
        }),
      });
      const data = await res.json();
      try {
        understanding = JSON.parse(data.choices[0]?.message?.content || "{}");
      } catch {}
    }

    // Generate content based on understanding
    let script = "";
    let title = "";

    if (!understanding.hasVoiceover) {
      // Generate music-only visual description
      const visualPrompt = `Create a visual scene description for a ${understanding.duration}-second MUSIC-ONLY video about "${understanding.topic}".
${understanding.musicStyle} background music.
NO WORDS, NO DIALOGUE, NO VOICEOVER.
Return ONLY a short scene description (max 50 words).`;

      if (GROQ_KEY) {
        const scriptRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: visualPrompt }],
            temperature: 0.8,
            max_tokens: 200,
          }),
        });
        const scriptData = await scriptRes.json();
        script = scriptData.choices[0]?.message?.content || `Amazing ${understanding.topic} visuals with epic music`;
      }

      title = `${understanding.topic} 🔥 Epic Music Video`;
    } else {
      // Generate script with voiceover
      const scriptPrompt = `Write a viral ${understanding.duration}-second YouTube Shorts script about "${understanding.topic}" in ${understanding.language}.
Start with shocking hook. Fast-paced. End with CTA. Return ONLY the script.`;

      if (GROQ_KEY) {
        const scriptRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: scriptPrompt }],
            temperature: 0.9,
            max_tokens: 600,
          }),
        });
        const scriptData = await scriptRes.json();
        script = scriptData.choices[0]?.message?.content || `Check out this amazing ${understanding.topic} video!`;
      }

      title = `${understanding.topic} - ${understanding.language === "hindi" ? "वायरल वीडियो" : "Viral Video"}`;
    }

    return NextResponse.json({
      success: true,
      understanding,
      title,
      script,
      noVoiceover: !understanding.hasVoiceover,
      musicOnly: !understanding.hasVoiceover && understanding.hasMusic,
      musicStyle: understanding.musicStyle,
      message: understanding.hasVoiceover ? "✅ Script with voiceover generated" : "🎵 Music-only video ready",
      nextSteps: {
        generateVideo: "/api/video",
        addMusic: understanding.hasMusic ? `Add ${understanding.musicStyle} background music` : null,
      },
    });

  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
