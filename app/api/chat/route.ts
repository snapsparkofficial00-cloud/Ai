import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({
        reply: "Missing GROQ API KEY",
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
              content:
                "You are a futuristic CEO AI assistant.",
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    return NextResponse.json({
      reply:
        data.choices?.[0]?.message?.content ||
        JSON.stringify(data),
    });
  } catch (err) {
    return NextResponse.json({
      reply: "SERVER ERROR",
      error: String(err),
    });
  }
}
