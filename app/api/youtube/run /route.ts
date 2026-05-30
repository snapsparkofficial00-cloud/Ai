import { NextResponse } from "next/server";
import { ceoAgent } from "../../../lib/agents/ceo";
import { TrendAgent } from "../../../lib/agents/trend";

export async function GET() {
  const ceo = await ceoAgent();
  const trend = await TrendAgent();

  return NextResponse.json({
    success: true,
    ceo,
    trend,
  });
}
