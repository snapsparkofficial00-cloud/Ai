import { NextResponse } from "next/server";
import { detectTrends, getViralTopics } from "../../../lib/agents/trend";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { niche } = await req.json();
    const trends = await detectTrends(niche);
    const viralTopics = await getViralTopics(niche || "general", 10);
    
    return NextResponse.json({
      success: true,
      trends,
      viralTopics,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const trends = await detectTrends();
    return NextResponse.json({
      success: true,
      trends,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
