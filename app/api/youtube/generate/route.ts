import { NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();
    if (!topic) return NextResponse.json({ error: "Missing topic" });

    const GROQ_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_KEY) {
      return NextResponse.json({ 
        result: `Amazing video about ${topic}! This will go viral. Subscribe for more!` 
      });
    }

    const prompt = `Write a viral 45-60 second YouTube Shorts script about "${topic}" in Hindi/English mix. Start with shocking hook. Fast-paced. End with CTA. Return ONLY the script.`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9,
        max_tokens: 600,
      }),
    });

    const data = await res.json();
    const script = data.choices?.[0]?.message?.content || `Check out this amazing ${topic} video!`;

    return NextResponse.json({ result: script });

  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
