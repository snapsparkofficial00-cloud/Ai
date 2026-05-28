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

          temperature: 0.9,

          max_tokens: 2200,

          messages: [

            {
              role: "system",

              content: `
You are YOUTUBE AI OS.

You are an advanced autonomous YouTube growth AI.

Generate HIGHLY viral content strategy.

Return professional formatting.

Generate:

# VIDEO TITLE
# SHORTS HOOK
# THUMBNAIL IDEA
# SEO DESCRIPTION
# VIRAL HASHTAGS
# FULL SHORT SCRIPT
# BEST UPLOAD TIME
# VIRALITY SCORE
# MONETIZATION PLAN
# CTA
# GROWTH STRATEGY
# 5 EXTRA VIDEO IDEAS

Be futuristic, powerful, highly optimized.
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

    /* SUCCESS */

    return NextResponse.json({

      success: true,

      agent: "YOUTUBE_AI",

      topic,

      timestamp: Date.now(),

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
