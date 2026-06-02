import { NextResponse } from "next/server";
import { runCEOStrategy, ceoDecision } from "../../../lib/agents/ceo";
import { detectTrends, getViralTopics } from "../../../lib/agents/trend";
import { getChannelHealth } from "../../../lib/agents/channelHealth";
import { runAIWorkflow } from "../../../lib/ai-engine";

export const maxDuration = 300;

export async function POST(req: Request) {
  try {
    const { action, niche, topic } = await req.json();

    switch (action) {
      case "ceo":
        const decision = await ceoDecision(`Manage YouTube channel in ${niche || "general"} niche`);
        const strategy = await runCEOStrategy(niche || "general");
        return NextResponse.json({ success: true, decision, strategy });

      case "trends":
        const trends = await detectTrends(niche);
        const viralTopics = await getViralTopics(niche || "general", 10);
        return NextResponse.json({ success: true, trends, viralTopics });

      case "health":
        const health = await getChannelHealth();
        return NextResponse.json({ success: true, health });

      case "generate":
        const result = await runAIWorkflow(topic || niche, "short");
        return NextResponse.json(result);

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    console.error("YouTube run error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const [trends, health] = await Promise.all([
      detectTrends(),
      getChannelHealth()
    ]);

    return NextResponse.json({
      success: true,
      trends: trends.slice(0, 5),
      channelHealth: health,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
