import { NextResponse } from "next/server";
import { getAIBrain } from "../../../core/brain";

export async function GET() {
  try {
    const brain = await getAIBrain();
    const status = await brain.getStatus();
    return NextResponse.json({ success: true, ...status });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const brain = await getAIBrain();
    const { action, niche, goal, topic, title, subscribers } = body;

    switch (action) {

      case "think":
        const thought = await brain.think({
          goal: goal || topic || "Create viral content",
          niche: niche || "BMW Cars",
          context: { subscribers },
        });
        return NextResponse.json({ success: true, thought });

      case "predict":
        const prediction = await brain.predictor.predictViralScore(
          topic || goal || "BMW M5",
          niche
        );
        return NextResponse.json({ success: true, prediction });

      case "decide":
        const decision = await brain.decider.decideNextAction({
          currentNiche: niche || "BMW Cars",
          subscribers: subscribers || 0,
        });
        return NextResponse.json({ success: true, decision });

      case "trends":
        const trends = await brain.trendAnalyzer.analyzeTrends(
          niche || "BMW Cars"
        );
        return NextResponse.json({ success: true, trends });

      case "analyze":
        const analysis = await brain.fullAnalysis(
          niche || "BMW Cars",
          subscribers || 0
        );
        return NextResponse.json({ success: true, analysis });

      case "optimize_title":
        const optimized = await brain.contentOptimizer.optimizeTitle(
          title || topic || "BMW M5 Review",
          niche || "BMW Cars"
        );
        return NextResponse.json({ success: true, optimized });

      case "thumbnail":
        const thumbnail = await brain.contentOptimizer.generateThumbnailConcept(
          title || topic || "BMW M5",
          niche || "BMW Cars"
        );
        return NextResponse.json({ success: true, thumbnail });

      case "weekly_plan":
        const plan = await brain.decider.generateWeeklyPlan(
          niche || "BMW Cars"
        );
        return NextResponse.json({ success: true, plan });

      case "improve":
        const improvement = await brain.selfImprover.analyze();
        return NextResponse.json({ success: true, improvement });

      case "competitor":
        const competitor = await brain.trendAnalyzer.compareWithCompetitors(
          niche || "BMW Cars",
          subscribers || 66
        );
        return NextResponse.json({ success: true, competitor });

      default:
        const defaultStatus = await brain.getStatus();
        return NextResponse.json({ success: true, status: defaultStatus });
    }

  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}
