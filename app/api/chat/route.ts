import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const { message } =
      await req.json();

    if (!message) {

      return NextResponse.json({
        reply:
          "❌ Missing message",
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
- Scripts
- Monetization plans
- Growth systems
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
        "openai/gpt-4o-mini";

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
- Engagement systems
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
"https://api.groq.com/openai/v1/chat/completions";

API_KEY =
process.env.GROQ_API_KEY;

MODEL =
"llama-3.3-70b-versatile";

      systemPrompt = `
You are elite Website Builder AI.

Generate:
- Fullstack apps
- React systems
- SaaS systems
- Landing pages
- Backend architecture
- API systems
- AI dashboards
- Automation systems

Behave like elite autonomous software engineer.
`;

    }

    /* =========================
       GEMINI UI AI
    ========================== */

    else if (
      lower.includes("ui") ||
      lower.includes("design") ||
      lower.includes("layout") ||
      lower.includes("dashboard")
    ) {

      activeAgent =
        "🧠 Gemini UI AI";

      const geminiResponse =
        await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

            },

            body: JSON.stringify({

              contents: [

                {

                  parts: [

                    {

                      text:
`You are elite UI AI.

Generate:
- futuristic UI
- app layouts
- dashboard systems
- mobile UI
- animations
- responsive systems

User request:
${message}`

                    }

                  ]

                }

              ]

            })

          }
        );

      const geminiData =
        await geminiResponse.json();

      return NextResponse.json({

        activeAgent,

        model:
          "gemini-1.5-flash",

        reply:
          geminiData?.candidates?.[0]
          ?.content?.parts?.[0]?.text
          || "⚠️ Gemini failed",

      });

    }

    /* =========================
       REVENUE AI
    ========================== */

    else if (
      lower.includes("money") ||
      lower.includes("business") ||
      lower.includes("revenue") ||
      lower.includes("ecommerce")
    ) {

      activeAgent =
        "💰 Revenue AI";

      MODEL =
        "meta-llama/llama-3.1-8b-instruct";

      API_URL =
        "https://openrouter.ai/api/v1/chat/completions";

      API_KEY =
        process.env.OPENROUTER_API_KEY;

      systemPrompt = `
You are Revenue AI.

Generate:
- Business systems
- Monetization plans
- Ecommerce plans
- AI income ideas
- Scaling strategies
`;

    }


/* =========================
   GAME AI
========================== */

else if (
  lower.includes("game") ||
  lower.includes("unity") ||
  lower.includes("unreal")
) {

  activeAgent =
    "🎮 Game AI";

  MODEL =
    "deepseek/deepseek-chat";

  API_URL =
    "https://openrouter.ai/api/v1/chat/completions";

  API_KEY =
    process.env.OPENROUTER_API_KEY;

  systemPrompt = `
You are elite Game AI.

Generate:
- mobile games
- Unity systems
- Unreal Engine systems
- game monetization
- ad systems
- viral gameplay loops
- addictive mechanics

Behave like elite game developer AI.
`;

}


/* =========================
   APP BUILDER AI
========================== */

else if (
  lower.includes("app") ||
  lower.includes("apk") ||
  lower.includes("android") ||
  lower.includes("ios")
) {

  activeAgent =
    "📱 App Builder AI";

  MODEL =
    "anthropic/claude-3.5-sonnet";

  API_URL =
    "https://openrouter.ai/api/v1/chat/completions";

  API_KEY =
    process.env.OPENROUTER_API_KEY;

  systemPrompt = `
You are elite App Builder AI.

Generate:
- Android apps
- iOS apps
- React Native systems
- Flutter apps
- monetization systems
- ad integrations
- scalable app architecture

Behave like elite mobile software engineer.
`;

}

/* =========================
   ANALYTICS AI
========================== */

else if (
  lower.includes("analytics") ||
  lower.includes("seo") ||
  lower.includes("traffic")
) {

  activeAgent =
    "📊 Analytics AI";

  MODEL =
    "gemini-1.5-flash";

  API_URL =
    "https://openrouter.ai/api/v1/chat/completions";

  API_KEY =
    process.env.OPENROUTER_API_KEY;

  systemPrompt = `
You are Analytics AI.

Analyze:
- traffic
- SEO
- audience growth
- YouTube metrics
- business performance
- monetization metrics

Behave like elite analytics strategist.
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
        "mistralai/mistral-7b-instruct";

      API_URL =
        "https://openrouter.ai/api/v1/chat/completions";

      API_KEY =
        process.env.OPENROUTER_API_KEY;

      systemPrompt = `
You are Automation AI.

Build:
- workflows
- AI pipelines
- automation systems
- autonomous infrastructure
`;

    }

    /* =========================
       CEO AI
    ========================== */

    else {

      activeAgent =
        "👑 CEO AI";

      MODEL =
        "openai/gpt-4o-mini";

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
          "❌ Missing API Key",

      });

    }

    /* =========================
       API REQUEST
    ========================== */

    const response =
      await fetch(API_URL, {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${API_KEY}`,

        },

        body: JSON.stringify({

          model: MODEL,

          temperature: 0.7,

          max_tokens: 1400,

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

      });

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

            model:
              MODEL,

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
          data?.error?.message
          || "❌ API ERROR",

      });

    }

    /* =========================
       SUCCESS
    ========================== */

    return NextResponse.json({

      activeAgent,

      model:
        MODEL,

      reply:
        data?.choices?.[0]?.message
          ?.content
        || "⚠️ No AI response",

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
