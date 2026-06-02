import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: "Missing prompt" });
    if (!process.env.FAL_KEY) return NextResponse.json({ error: "Missing FAL key" });

    const res = await fetch("https://fal.run/fal-ai/flux/dev", {
      method: "POST",
      headers: {
        "Authorization": `Key ${process.env.FAL_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        image_size: "landscape_16_9",
        num_inference_steps: 28,
        num_images: 1,
        enable_safety_checker: false,
      }),
    });

    const data = await res.json();
    if (!res.ok) return NextResponse.json({ error: "Fal.ai failed", detail: data });
    const url = data?.images?.[0]?.url;
    if (!url) return NextResponse.json({ error: "No image returned", detail: data });
    return NextResponse.json({ success: true, url });

  } catch (err) {
    return NextResponse.json({ error: "Image API error", details: String(err) });
  }
}
