import { NextResponse } from "next/server";
import { saveMemory, recallMemories, getBestStrategies, learnFromSuccess } from "../../../lib/agents/memory";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { action, type, content, score, metadata, videoTitle, performance } = await req.json();

    switch (action) {
      case "save":
        await saveMemory(type, content, score, metadata);
        return NextResponse.json({ success: true, message: "Memory saved" });

      case "recall":
        const memories = await recallMemories(type, 20);
        return NextResponse.json({ success: true, memories });

      case "bestStrategies":
        const strategies = await getBestStrategies(10);
        return NextResponse.json({ success: true, strategies });

      case "learnFromSuccess":
        await learnFromSuccess(videoTitle, performance);
        return NextResponse.json({ success: true, message: "Learning saved" });

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const memories = await recallMemories(undefined, 50);
    return NextResponse.json({
      success: true,
      memories,
      count: memories.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
