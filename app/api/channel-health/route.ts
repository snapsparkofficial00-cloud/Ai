import { NextResponse } from "next/server";
import { ChannelHealthAgent } from "../../../lib/agents/channelHealth";

export async function GET() {
  try {
    const health = await ChannelHealthAgent();

    return NextResponse.json({
      success: true,
      health,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to load channel health",
    });
  }
}
