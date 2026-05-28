import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const { message } = await req.json();

    /* =========================
       VALIDATION
    ========================== */

    if (!message) {

      return NextResponse.json({
        reply: "❌ Missing message",
      });

    }

    /* =========================
       API KEY CHECK
    ========================== */

    if (!process.env.GROQ_API_KEY) {

      return NextResponse.json({
        reply: "❌ Missing GROQ_API_KEY",
      });

    }

    /* =========================
       AI ROUTER SYSTEM
    ========================== */

    const lower =
      message.toLowerCase();

    let activeAgent =
      "👑 CEO AI";

    let systemPrompt = "";

    /* =========================
       YOUTUBE AI
    ========================== */

    if (
      lower.includes("youtube") ||
      lower.includes("shorts") ||
      lower.includes("viral") ||
      lower.includes("video")
    ) {

      activeAgent =
        "📺 YouTube AI";

      systemPrompt = `
You are YouTube AI OS.

Generate:
- Viral titles
- Shorts hooks
- SEO descriptions
- Hashtags
- Video scripts
- Monetization strategy
- Upload strategy
- Viral growth plans

Act futuristic and powerful.
`;

    }

    /* =========================
       INSTAGRAM AI
    ========================== */

    else if (
      lower.includes("instagram") ||
      lower.includes("reels")
    ) {

      activeAgent =
        "📸 Instagram AI";

      systemPrompt = `
You are Instagram AI.

Generate:
- Viral reels
- Captions
- Hashtags
- Growth plans
- Engagement strategy
- Automation systems
`;

    }

    /* =========================
       WEBSITE AI
    ========================== */

    else if (
      lower.includes("website") ||
      lower.includes("web")
    ) {

      activeAgent =
        "🌐 Website AI";

      systemPrompt = `
You are Website Builder AI.

Generate:
- Website structures
- SaaS ideas
- UI systems
- Landing pages
- Automation flows
- Futuristic design systems
`;

    }

    /* =========================
       REVENUE AI
    ========================== */

    else if (
      lower.includes("money") ||
      lower.includes("revenue") ||
      lower.includes("business")
    ) {

      activeAgent =
        "💰 Revenue AI";

      systemPrompt = `
You are Revenue AI.

Generate:
- Business systems
- Monetization strategies
- Ecommerce plans
- Passive income systems
- AI business ideas
`;

    }

    /* =========================
       CEO AI
    ========================== */

    else {

      activeAgent =
        "👑 CEO AI";

      systemPrompt = `
You are CEO AI OS.

You control:
- YouTube AI
- Instagram AI
- Website AI
- Revenue AI
- Memory AI
- Analytics AI
- Automation AI

Behave like a futuristic autonomous AI operating system.
`;

    }

    /* =========================
       GROQ API REQUEST
    ========================== */

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${process.env.GROQ_API_KEY}`,

        },

        body: JSON.stringify({

          model:
            "llama-3.3-70b-versatile",

          temperature: 0.8,

          max_tokens: 1800,

          messages: [

            {
              role: "system",

              content:
                systemPrompt,
            },

            {
              role: "user",

              content:
                message,
            },

          ],

        }),

      }
    );

    /* =========================
       RESPONSE
    ========================== */

    const data =
      await response.json();

    console.log(
      "AI RESPONSE:",
      data
    );

    /* =========================
       API ERROR
    ========================== */

    if (!response.ok) {

      return NextResponse.json({

        reply:
          data.error?.message ||
          "❌ GROQ API ERROR",

      });

    }

    /* =========================
       SUCCESS
    ========================== */

    return NextResponse.json({

      activeAgent,

      reply:
        data.choices?.[0]?.message
          ?.content ||
        "⚠️ No AI response",

    });

  } catch (err) {

    console.log(err);

    return NextResponse.json({

      reply:
        "❌ SERVER ERROR",

      error:
        String(err),

    });

  }

}
