import { NextResponse } from "next/server";

const REPLICATE_KEY = process.env.REPLICATE_API_KEY;

export async function POST(req: Request) {
  try {
    const { action, prompt, niche } = await req.json();

    switch (action) {
      case "generate-video":
        return await generateVideo(prompt);
      case "generate-thumbnail":
        return await generateThumbnail(niche);
      case "enhance-script":
        return await enhanceScript(prompt);
      case "gpu-status":
        return NextResponse.json({ 
          gpu: "Ready", 
          providers: ["Replicate (A100)", "Groq (LPU)", "Google Colab (T4)"],
          cost: "FREE to $0.01/video" 
        });
      default:
        return NextResponse.json({ error: "Unknown action" });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

async function generateVideo(prompt: string) {
  if (!REPLICATE_KEY) {
    return NextResponse.json({ 
      error: "Add REPLICATE_API_KEY to Vercel. Get free key at replicate.com" 
    });
  }

  // Use Replicate's GPU for video generation
  const res = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${REPLICATE_KEY}`,
    },
    body: JSON.stringify({
      version: "stability-ai/stable-video-diffusion",
      input: { prompt, num_frames: 25, fps: 8 },
    }),
  });

  const data = await res.json();
  return NextResponse.json({ success: true, prediction: data });
}

async function generateThumbnail(niche: string) {
  if (!REPLICATE_KEY) {
    return NextResponse.json({ error: "Add REPLICATE_API_KEY" });
  }

  const res = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${REPLICATE_KEY}`,
    },
    body: JSON.stringify({
      version: "black-forest-labs/flux-schnell",
      input: { prompt: `YouTube thumbnail for ${niche}, vibrant, clickbait, 16:9` },
    }),
  });

  const data = await res.json();
  return NextResponse.json({ success: true, prediction: data });
}

async function enhanceScript(prompt: string) {
  // Uses Groq's LPU (fast AI chip) for enhancement
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: `Enhance this for viral YouTube: ${prompt}` }],
    }),
  });

  const data = await res.json();
  return NextResponse.json({ success: true, enhanced: data?.choices?.[0]?.message?.content });
}
