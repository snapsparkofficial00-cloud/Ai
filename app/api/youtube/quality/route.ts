import { NextResponse } from "next/server";
import { assessQuality, optimizeScript, generateOptimizedThumbnailPrompt } from "../../../lib/quality/qualityAgent";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { script, thumbnailUrl, voiceUrl, niche, title, action } = await req.json();

    switch (action) {
      case "assess":
        const quality = await assessQuality(script, thumbnailUrl, voiceUrl);
        return NextResponse.json({ success: true, quality });

      case "optimize":
        const optimizedScript = await optimizeScript(script, niche);
        return NextResponse.json({ success: true, optimizedScript });

      case "thumbnailPrompt":
        const prompt = await generateOptimizedThumbnailPrompt(title, niche);
        return NextResponse.json({ success: true, prompt });

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
