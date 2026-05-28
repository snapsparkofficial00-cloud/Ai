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
       AI ROUTER
    ========================== */

    const lower =
      message.toLowerCase();

    let activeAgent =
      "👑 CEO AI";

    let systemPrompt = "";

    let API_URL =
      "https://api.groq.com/openai/v1/chat/completions";

    let API_KEY =
      process.env.GROQ_API_KEY;

    let MODEL =
      "llama-3.3-70b-versatile";

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

      MODEL =
        "llama-3.3-70b-versatile";

      API_URL =
        "https://api.groq.com/openai/v1/chat/completions";

      API_KEY =
        process.env.GROQ_API_KEY;

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

      MODEL =
        "gpt-4o-mini";

      API_URL =
        "https://openrouter.ai/api/v1/chat/completions";

      API_KEY =
        process.env.OPENROUTER_API_KEY;

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
       WEBSITE AI + DEEPSEEK
    ========================== */

    else if (
      lower.includes("website") ||
      lower.includes("web") ||
      lower.includes("code") ||
      lower.includes("developer")
    ) {

      activeAgent =
        "🌐 Website AI";

      MODEL =
        "deepseek-chat";

      API_URL =
        "https://api.deepseek.com/chat/completions";

      API_KEY =
        process.env.DEEPSEEK_API_KEY;

      systemPrompt = `
You are Website Builder AI.

Generate:
- Website structures
- SaaS ideas
- UI systems
- Landing pages
- Automation flows
- Fullstack coding systems
- Advanced React systems
- Futuristic design systems

Behave like elite autonomous developer AI.
`;

    }

    /* =========================
       REVENUE AI
    ========================== */

    else if (
      lower.includes("money") ||
      lower.includes("revenue") ||
      lower.includes("business") ||
      lower.includes("ecommerce")
    ) {

      activeAgent =
        "💰 Revenue AI";

      MODEL =
        "gpt-4o-mini";

      API_URL =
        "https://openrouter.ai/api/v1/chat/completions";

      API_KEY =
        process.env.OPENROUTER_API_KEY;

      systemPrompt = `
You are Revenue AI.

Generate:
- Business systems
- Monetization strategies
- Ecommerce plans
- Passive income systems
- AI business ideas
- Scaling systems
`;

    }

    /* =========================
       AUTOMATION AI
    ========================== */

    else if (
      lower.includes("automation") ||
      lower.includes("workflow")
    ) {

      activeAgent =
        "⚡ Automation AI";

      MODEL =
        "anthropic/claude-3-haiku";

      API_URL =
        "https://openrouter.ai/api/v1/chat/completions";

      API_KEY =
        process.env.OPENROUTER_API_KEY;

      systemPrompt = `
You are Automation AI.

Build:
- Workflow systems
- AI automations
- Task orchestration
- AI pipelines
- Autonomous systems
`;

    }

    /* =========================
       CEO AI
    ========================== */

    else {

      activeAgent =
        "👑 CEO AI";

      MODEL =
        "gpt-4o-mini";

      API_URL =
        "https://openrouter.ai/api/v1/chat/completions";

      API_KEY =
        process.env.OPENROUTER_API_KEY;

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
       API REQUEST
    ========================== */

    const response = await fetch(
      API_URL,
      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${API_KEY}`,

        },

        body: JSON.stringify({

          model: MODEL,

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

        activeAgent,

        reply:
          data.error?.message ||
          "❌ API ERROR",

      });

    }

    /* =========================
       SUCCESS
    ========================== */

    return NextResponse.json({

      activeAgent,

      model: MODEL,

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
