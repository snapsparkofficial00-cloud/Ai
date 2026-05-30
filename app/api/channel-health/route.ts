import { NextResponse } from "next/server";
import { getChannelHealth } from "../../lib/agents/channelHealth";

export async function GET() {
  const health = await getChannelHealth();

  return NextResponse.json({
    success: true,
    health,
  });
}
