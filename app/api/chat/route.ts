import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content:
              "You are the CEO AI of a futuristic autonomous AI operating system.",
          },
          {
            role: "user",
            content: body.message,
          },
        ],
      });

    return NextResponse.json({
      reply:
        completion.choices[0].message.content,
    });
  } catch (error) {
    return NextResponse.json({
      reply: "CEO AI ERROR",
    });
  }
}
