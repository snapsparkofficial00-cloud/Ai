import { NextResponse } from "next/server";
import { ceoAgent } from "../../../lib/agents/ceo";
import { TrendAgent } from "../../../lib/agents/trend";
import { getChannelHealth } from "../../../lib/agents/channelHealth";

export async function GET() {
  const ceo = await ceoAgent();
  const trend = await TrendAgent();
  const health = await getChannelHealth();

  return NextResponse.json({
    success: true,
    ceo,
    trend,
    health,
  });
}
