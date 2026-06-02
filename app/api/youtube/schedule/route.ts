import { NextResponse } from "next/server";
import { 
  addToSchedule, 
  getUpcomingContent, 
  updateScheduleStatus,
  calculateOptimalPostingTime 
} from "../../../lib/youtube/scheduler";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { title, niche, type, script, thumbnailUrl, voiceUrl, scheduledFor } = await req.json();

    const optimalTime = scheduledFor || await calculateOptimalPostingTime(niche);
    
    const scheduled = await addToSchedule({
      title,
      niche,
      type,
      script,
      thumbnailUrl,
      voiceUrl,
      scheduledFor: optimalTime,
    });

    return NextResponse.json({
      success: true,
      scheduled,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const schedule = await getUpcomingContent(30);
    return NextResponse.json({
      success: true,
      schedule,
      count: schedule.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    await updateScheduleStatus(id, status);
    return NextResponse.json({
      success: true,
      message: `Schedule ${id} updated to ${status}`
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
