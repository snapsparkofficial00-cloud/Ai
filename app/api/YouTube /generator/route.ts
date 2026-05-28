import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const { topic } = await req.json();

    /* VALIDATION */

    if (!topic) {

      return NextResponse.json({
        success: false,
        error: "Missing topic",
      });

    }

    /* API KEY */

    if (!process.env.GROQ_API_KEY) {

      return NextResponse.json({
        success: false,
        error: "Missing GROQ API KEY",
      });

    }

    /* GROQ REQUEST */

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization:
            `Bearer ${process.env.GROQ_API_KEY}`,
        },

        body: JSON.stringify({

          model: "llama-3.3-70b-versatile",

          temperature: 0.8,

          max_tokens: 1800,

          messages: [

            {
              role: "system",

              content: `
You are YOUTUBE AI OS.

You are an advanced YouTube growth expert.

For every topic generate:

1. Viral YouTube title
2. Shorts hook
3. Thumbnail idea
4. SEO optimized description
5. Viral hashtags
6. Full short-form video script
7. Upload strategy
8. Best upload timing
9. Monetization strategy
10. Viral growth tips

Your response should look futuristic,
professional and highly optimized.
`,
            },

            {
              role: "user",

              content:
                "Create a viral YouTube strategy for: " +
                topic,
            },

          ],

        }),

      }
    );

    /* RESPONSE */

    const data = await response.json();

    console.log("YOUTUBE AI:", data);

    /* ERROR */

    if (!response.ok) {

      return NextResponse.json({
        success: false,

        error:
          data.error?.message ||
          "GROQ API ERROR",
      });

    }

    /* AI RESULT */

    const result =
      data.choices?.[0]?.message?.content;

    return NextResponse.json({

      success: true,

      topic,

      result:
        result || "No AI response",

    });

  } catch (err) {

    console.log(err);

    return NextResponse.json({

      success: false,

      error: "SERVER ERROR",

      details: String(err),

    });

  }

}
