import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    const { topic } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({
        error: "Missing GROQ API KEY",
      });
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },

        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",

          messages: [
            {
              role: "system",

              content: `
You are a professional YouTube automation AI.

Generate:
1. Viral title
2. Shorts hook
3. SEO description
4. Viral hashtags
5. Thumbnail idea
6. Full short video script
              `,
            },

            {
              role: "user",
              content: topic,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json({
      result:
        data.choices?.[0]?.message?.content ||
        "No AI response",
    });

  } catch (err) {

    return NextResponse.json({
      error: "SERVER ERROR",
      details: String(err),
    });

  }
}
