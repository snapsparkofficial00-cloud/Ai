import { NextResponse } from "next/server";

export const maxDuration = 300;

export async function POST(req: Request) {
  try {
    const { prompt, mode, imageUrl } = await req.json();

    if (!prompt && mode === "text-to-video") {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const FAL_KEY = process.env.FAL_API_KEY;

    if (!FAL_KEY) {
      // Demo mode - return mock response
      const mockRequestId = `demo-${Date.now()}`;
      return NextResponse.json({
        requestId: mockRequestId,
        status: "processing",
        message: "Demo mode. Add FAL_API_KEY for real Kling AI video generation.",
      });
    }

    // Actual Kling AI API call via Fal.ai
    const response = await fetch("https://fal.run/fal-ai/kling-video", {
      method: "POST",
      headers: {
        Authorization: `Key ${FAL_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        image_url: mode === "image-to-video" ? imageUrl : undefined,
        num_frames: 121,
        fps: 24,
        cfg_scale: 0.5,
        negative_prompt: "low quality, blurry, distorted",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.detail || "Kling AI failed" }, { status: 500 });
    }

    return NextResponse.json({
      requestId: data.request_id || `kling-${Date.now()}`,
      status: "processing",
    });

  } catch (error) {
    console.error("Video generation error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
