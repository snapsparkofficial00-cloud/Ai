import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const { message } = await req.json();

    /* CHECK API KEY */

    if (!process.env.GROQ_API_KEY) {

      return NextResponse.json({
        reply: "❌ Missing GROQ_API_KEY",
      });

    }

    /* GROQ API */

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

          temperature: 0.7,

          max_tokens: 1200,

          messages: [

            {
              role: "system",

              content: `
You are CEO AI OS.

You control multiple AI agents:

1. YouTube AI
2. Instagram AI
3. Website AI
4. Ecommerce AI
5. Telegram AI
6. Automation AI
7. Analytics AI
8. Memory AI
9. Revenue AI
10. Video Editing AI

Your personality:
- futuristic
- powerful
- intelligent
- business focused
- automation expert

Always answer like an advanced autonomous AI operating system.
`,
            },

            {
              role: "user",
              content: message,
            },

          ],

        }),

      }
    );

    /* RESPONSE */

    const data = await response.json();

    console.log("GROQ RESPONSE:", data);

    /* ERROR */

    if (!response.ok) {

      return NextResponse.json({
        reply:
          data.error?.message ||
          "❌ GROQ API ERROR",
      });

    }

    /* SUCCESS */

    return NextResponse.json({

      reply:
        data.choices?.[0]?.message?.content ||
        "⚠️ No AI response",

    });

  } catch (err) {

    console.log(err);

    return NextResponse.json({

      reply: "❌ SERVER ERROR",

      error: String(err),

    });

  }

}
