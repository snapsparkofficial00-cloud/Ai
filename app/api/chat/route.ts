import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const message = body.message;

    const GROQ_API_KEY =
      process.env.GROQ_API_KEY;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
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

    return NextResponse.json({
      reply:
        data?.choices?.[0]?.message?.content ||
        "No response",
    });
  } catch (error) {
    return NextResponse.json({
      reply: "API ERROR",
      error: String(error),
    });
  }
}
