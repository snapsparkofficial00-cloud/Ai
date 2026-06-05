import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { niche, type } = await req.json();
    // type: "short" or "long"

    const GROQ_KEY = process.env.GROQ_API_KEY;
    const channelNiche = niche || "BMW Cars and Supercars";

    // Step 1: Generate script with AI
    const scriptRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          temperature: 0.9,
          max_tokens: type === "short" ? 500 : 2000,
          messages: [
            {
              role: "system",
              content: type === "short"
                ? `You are a viral YouTube Shorts script writer. Write in Hindi. Create a 45-60 second script about ${channelNiche}. Start with a shocking hook. Be energetic and viral.`
                : `You are a YouTube video script writer. Write in Hindi. Create a complete 8-10 minute video script about ${channelNiche}. Include hook, intro, 5 sections, CTA, outro.`,
            },
            {
              role: "user",
              content: `Write a ${type === "short" ? "YouTube Shorts" : "full YouTube"} script about ${channelNiche} in Hindi.`,
            },
          ],
        }),
      }
    );

    const scriptData = await scriptRes.json();
    const script = scriptData?.choices?.[0]?.message?.content || "";

    // After generating title, add this:
const hashtagRes = await fetch(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: 200,
      messages: [
        {
          role: "system",
          content: "Generate viral YouTube hashtags. Return ONLY hashtags separated by spaces. Mix Hindi and English.",
        },
        {
          role: "user",
          content: `30 hashtags for: ${niche} ${type === "short" ? "shorts" : "video"}`,
        },
      ],
    }),
  }
);
const hashtagData = await hashtagRes.json();
const hashtags = hashtagData?.choices?.[0]?.message?.content || "";

// Then add hashtags to the return:
return NextResponse.json({
  success: true,
  type,
  title,
  script,
  hashtags,
  thumbnailUrl,
  niche: channelNiche,
  language: "Hindi",
  scheduledAt: new Date().toISOString(),
});

    // Step 2: Generate title
    const titleRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 100,
          messages: [
            {
              role: "system",
              content: "Generate a viral YouTube title in Hindi for this script. Return only the title, nothing else.",
            },
            { role: "user", content: script.slice(0, 200) },
          ],
        }),
      }
    );

    const titleData = await titleRes.json();
    const title = titleData?.choices?.[0]?.message?.content || `${channelNiche} - AI Video`;

    // Step 3: Generate thumbnail prompt
    const thumbPrompt = `YouTube thumbnail: ${channelNiche}, ${type === "short" ? "vertical 9:16" : "horizontal 16:9"}, bold Hindi text overlay, vibrant colors, dramatic lighting, viral`;

    // Step 4: Generate thumbnail image
    let thumbnailUrl = "";
    try {
      const thumbRes = await fetch(`${process.env.NEXT_PUBLIC_URL || "https://ai-ivory-delta.vercel.app"}/api/image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: thumbPrompt }),
      });
      const thumbData = await thumbRes.json();
      thumbnailUrl = thumbData.url || "";
    } catch {}

    // Step 5: Save to Supabase memory
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/memory`,
        {
          method: "POST",
          headers: {
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            agent: "scheduler-ai",
            message: `Auto-generated ${type} video: ${title}`,
            response: script.slice(0, 500),
            model: "llama-3.3-70b-versatile",
            created_at: new Date().toISOString(),
          }),
        }
      );
    } catch {}

    return NextResponse.json({
      success: true,
      type,
      title,
      script,
      thumbnailUrl,
      niche: channelNiche,
      language: "Hindi",
      scheduledAt: new Date().toISOString(),
      nextStep: "Call /api/voice with script to generate Hindi audio, then /api/youtube/upload",
    });

  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}
