import { NextResponse } from "next/server";
import { runCEOStrategy, ceoDecision } from "../../../lib/agents/ceo";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { niche, context } = await req.json();
    const decision = await ceoDecision(context || `Manage YouTube channel in ${niche} niche`);
    const strategy = await runCEOStrategy(niche);
    
    return NextResponse.json({
      success: true,
      decision,
      strategy,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "CEO AI ready",
    commands: ["generate_script", "upload_video", "analyze_performance", "optimize_thumbnail"],
    timestamp: new Date().toISOString()
  });
}
