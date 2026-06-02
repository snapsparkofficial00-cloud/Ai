import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, language } = await req.json();
    if (!text) return NextResponse.json({ error: "Missing text" });
    if (!process.env.ELEVENLABS_API_KEY) return NextResponse.json({ error: "Missing ElevenLabs key" });

    // Hindi voice ID - Multilingual model
    const voiceId = "pNInz6obpgDQGcFmaJgB"; // Adam - multilingual

    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text.slice(0, 2000),
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.5,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json({ error: err?.detail?.message || JSON.stringify(err) });
    }

    const audioBuffer = await res.arrayBuffer();
    const base64 = Buffer.from(audioBuffer).toString("base64");
    return NextResponse.json({ success: true, url: `data:audio/mpeg;base64,${base64}` });

  } catch (err) {
    return NextResponse.json({ error: "Voice API error", details: String(err) });
  }
}
