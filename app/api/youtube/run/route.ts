import { NextResponse } from "next/server";
import { ceoAgent } from "../../../lib/agents/ceo";
import { trendAgent } from "../../../lib/agents/trend";

export async function GET() {
  const ceo = await ceoAgent();
  const trend = await trendAgent();

  return NextResponse.json({
    success: true,
    ceo,
    trend,
  });
}
