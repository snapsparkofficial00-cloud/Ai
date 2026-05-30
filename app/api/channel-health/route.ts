import { NextResponse } from "next/server";
import { getChannelHealth } from "@/lib/agents/channelHealth";

export async function GET() {
  const data = await getChannelHealth();

  return NextResponse.json(data);
}
