import { NextResponse } from "next/server";
import { ChannelHealthAgent } from "@/lib/agents/channelHealth";

export async function GET() {
  const health = await ChannelHealthAgent();

  return NextResponse.json(health);
}
