import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const { message } = await req.json();

    if (!message) {

      return NextResponse.json({
        reply: "❌ Missing message",
      });

    }

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

      API_URL =
        "https://api.groq.com/openai/v1/chat/completions";

      API_KEY =
        process.env.GROQ_API_KEY;

      MODEL =
        "llama-3.3-70b-versatile";

      systemPrompt = `
You are YouTube AI OS.

Generate:
- Viral titles
- Shorts hooks
- SEO descriptions
- Hashtags
- Scripts
- Growth strategies
- Monetization systems

Behave like elite YouTube growth AI.
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

      API_URL =
        "https://openrouter.ai/api/v1/chat/completions";

      API_KEY =
        process.env.OPENROUTER_API_KEY;

      MODEL =
        "openai/gpt-4o-mini";

      systemPrompt = `
You are Instagram AI.

Generate:
- Viral reels
- Captions
- Hashtags
- Growth plans
- Engagement strategies
`;

    }

    /* =========================
       WEBSITE AI
    ========================== */

    else if (
      lower.includes("website") ||
      lower.includes("web") ||
      lower.includes("code") ||
      lower.includes("developer")
    ) {

      activeAgent =
        "🌐 Website AI";

      API_URL =
        "https://api.deepseek.com/chat/completions";

      API_KEY =
        process.env.DEEPSEEK_API_KEY;

      MODEL =
        "deepseek-chat";

      systemPrompt = `
You are Website Builder AI.

Generate:
- Fullstack systems
- React apps
- SaaS ideas
- Landing pages
- Backend systems
- UI systems
- Automation workflows

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

      API_URL =
        "https://openrouter.ai/api/v1/chat/completions";

      API_KEY =
        process.env.OPENROUTER_API_KEY;

      MODEL =
        "meta-llama/llama-3.1-8b-instruct";

      systemPrompt = `
You are Revenue AI.

Generate:
- Business systems
- Monetization plans
- Ecommerce systems
- AI income ideas
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

      API_URL =
        "https://openrouter.ai/api/v1/chat/completions";

      API_KEY =
        process.env.OPENROUTER_API_KEY;

      MODEL =
  "mistralai/mistral-7b-instruct";

      systemPrompt = `
You are Automation AI.

Build:
- AI workflows
- Pipelines
- Autonomous systems
- Automation architecture
`;

    }

    /* =========================
       CEO AI
    ========================== */

    else {

      activeAgent =
        "👑 CEO AI";

      API_URL =
        "https://openrouter.ai/api/v1/chat/completions";

      API_KEY =
        process.env.OPENROUTER_API_KEY;

      MODEL =
        "openai/gpt-4o-mini";

      systemPrompt = `
You are CEO AI OS.

You control:
- YouTube AI
- Instagram AI
- Website AI
- Revenue AI
- Memory AI
- Automation AI
- Analytics AI

Behave like futuristic autonomous AI operating system.
`;

    }

    /* =========================
       API KEY CHECK
    ========================== */

    if (!API_KEY) {

      return NextResponse.json({

        activeAgent,

        reply:
          "❌ Missing API Key for " +
          activeAgent,

      });

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
              content: systemPrompt,
            },

            {
              role: "user",
              content: message,
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
       SAVE MEMORY
    ========================== */

    try {

      await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/memory`,
        {

          method: "POST",

          headers: {

            apikey:
              process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

            Authorization:
              `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,

            "Content-Type":
              "application/json",

            Prefer:
              "return=minimal",

          },

          body: JSON.stringify({

            agent:
              activeAgent,

            message:
              message,

            response:
              data?.choices?.[0]?.message
                ?.content || "",

          }),

        }
      );

    } catch (memoryError) {

      console.log(
        "MEMORY SAVE ERROR:",
        memoryError
      );

    }

    /* =========================
       API ERROR
    ========================== */

    if (!response.ok) {

      return NextResponse.json({

        activeAgent,

        reply:
          data?.error?.message ||
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
        data?.choices?.[0]?.message
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
