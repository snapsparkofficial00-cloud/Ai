import { NextResponse } from "next/server";
import { generateInsights, getBestPerforming } from "../../../lib/ai-engine";

export const maxDuration = 60;

export async function GET() {
  try {
    const [insights, bestPerforming] = await Promise.all([
      generateInsights(),
      getBestPerforming(10)
    ]);

    return NextResponse.json({
      success: true,
      insights,
      bestPerforming,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
