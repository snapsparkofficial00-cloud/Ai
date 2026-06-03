export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";

export const maxDuration = 60;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("requestId");
    const type = searchParams.get("type");

    if (!requestId) {
      return NextResponse.json({ error: "Missing requestId" }, { status: 400 });
    }

    const FAL_KEY = process.env.FAL_API_KEY;

    if (!FAL_KEY || requestId.startsWith("demo-")) {
      // Demo mode - simulate completion after 30 seconds
      const isComplete = Date.now() - parseInt(requestId.split("-")[1] || "0") > 30000;
      if (isComplete) {
        return NextResponse.json({
          status: "completed",
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        });
      }
      return NextResponse.json({ status: "processing" });
    }

    // Real status check from Fal.ai
    const response = await fetch(`https://fal.run/requests/${requestId}`, {
      headers: { Authorization: `Key ${FAL_KEY}` },
    });

    const data = await response.json();

    if (data.status === "COMPLETED" && data.video?.url) {
      return NextResponse.json({
        status: "completed",
        videoUrl: data.video.url,
      });
    }

    if (data.status === "FAILED") {
      return NextResponse.json({ status: "failed", error: data.error });
    }

    return NextResponse.json({ status: data.status || "processing" });

  } catch (error) {
    console.error("Status check error:", error);
    return NextResponse.json({ status: "processing" });
  }
}
