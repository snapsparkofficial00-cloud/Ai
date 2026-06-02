import { NextResponse } from "next/server";
import { initCREAWAI, quickGenerate, fullGenerate, getTrendingForNiche, analyzeTopic } from "../../../core/creawai/index";

export const maxDuration = 300;

export async function POST(req: Request) {
  try {
    const { action, niche, topic, type } = await req.json();

    if (!niche && action !== "analyze") {
      return NextResponse.json({ error: "Missing niche parameter" }, { status: 400 });
    }

    switch (action) {
      case "quick":
        const quickResult = await quickGenerate(niche);
        return NextResponse.json(quickResult);

      case "full":
        const fullResult = await fullGenerate(niche);
        return NextResponse.json(fullResult);

      case "trends":
        const trends = await getTrendingForNiche(niche);
        return NextResponse.json({ success: true, trends });

      case "analyze":
        if (!topic) return NextResponse.json({ error: "Missing topic" }, { status: 400 });
        const analysis = await analyzeTopic(niche, topic);
        return NextResponse.json({ success: true, analysis });

      case "init":
        const engine = await initCREAWAI(niche, type || "short");
        return NextResponse.json({
          success: true,
          message: `CREAWAI initialized for niche: ${niche}`,
          config: engine.getConfig(),
        });

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    console.error("CREAWAI API error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "CREAWAI API is ready",
    endpoints: {
      quick: "POST with { action: 'quick', niche: 'Supercars' }",
      full: "POST with { action: 'full', niche: 'Supercars' }",
      trends: "POST with { action: 'trends', niche: 'Supercars' }",
      analyze: "POST with { action: 'analyze', niche: 'Supercars', topic: 'BMW M5' }",
      init: "POST with { action: 'init', niche: 'Supercars', type: 'short' }",
    },
  });
}
