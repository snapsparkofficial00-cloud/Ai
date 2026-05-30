import { NextResponse } from "next/server";
import { CEOAgent } from "@/lib/agents/ceo";
import { TrendAgent } from "@/lib/agents/trend";

export async function GET() {
  const ceo = await CEOAgent();
  const trend = await TrendAgent();

  return NextResponse.json({
    success: true,
    ceo,
    selectedTopic: trend,
  });
}
