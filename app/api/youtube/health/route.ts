import { NextResponse } from "next/server";
import { getChannelHealth } from "../../../lib/agents/channelHealth";

export const maxDuration = 60;

export async function GET() {
  try {
    const health = await getChannelHealth();
    return NextResponse.json({
      success: true,
      health,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
