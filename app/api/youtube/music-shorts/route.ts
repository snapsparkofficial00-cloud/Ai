import { NextResponse } from "next/server";

export const maxDuration = 60;

const musicOptions: Record<string, string> = {
  epic: "Epic orchestral dramatic music, powerful build-up, cinematic",
  energetic: "High energy electronic dance music, fast tempo, upbeat",
  calm: "Soft piano melody, relaxing ambient, peaceful",
  cinematic: "Movie soundtrack style, emotional, dramatic",
  techno: "Techno beat, driving rhythm, club music",
};

export async function POST(req: Request) {
  try {
    const { topic, musicStyle } = await req.json();
    const GROQ_KEY = process.env.GROQ_API_KEY;

    const musicPrompt = musicOptions[musicStyle] || musicOptions.epic;

    // Generate visual description only (no dialogue)
    const visualPrompt = `Create a visual description for a 30-second MUSIC-ONLY YouTube Shorts video about "${topic}".
NO WORDS, NO DIALOGUE, NO VOICEOVER.
Just describe the scenes that will appear on screen.
Keep it under 100 words. Return ONLY the description.`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: visualPrompt }],
        temperature: 0.8,
        max_tokens: 300,
      }),
    });

    const data = await res.json();
    const visualDescription = data.choices?.[0]?.message?.content || `Amazing ${topic} visuals`;

    return NextResponse.json({
      success: true,
      visualDescription,
      musicStyle,
      musicMood: musicPrompt,
      noVoiceover: true,
      message: "Music-only short ready. Add background music in video editor.",
    });

  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
