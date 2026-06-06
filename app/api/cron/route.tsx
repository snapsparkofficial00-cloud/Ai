import { NextResponse } from "next/server";

export async function GET() {
  const results: any = {};

  // 1. Generate Daily Short
  try {
    const niches = ["BMW Cars and Supercars", "AI Tools", "Gaming", "Movie Reviews", "Finance Tips"];
    const todayNiche = niches[new Date().getDay() % niches.length];
    
    const shortRes = await fetch(`${process.env.NEXT_PUBLIC_URL || "https://ai-ivory-delta.vercel.app"}/api/scheduler`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ niche: todayNiche, type: "short" }),
    });
    const shortData = await shortRes.json();
    results.dailyShort = { success: shortData.success, niche: todayNiche, title: shortData.title };
  } catch (err) {
    results.dailyShort = { error: String(err) };
  }

  // 2. Generate Weekly Long Video (on Sundays)
  if (new Date().getDay() === 0) {
    try {
      const longRes = await fetch(`${process.env.NEXT_PUBLIC_URL || "https://ai-ivory-delta.vercel.app"}/api/scheduler`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: "AI Technology and Future Trends", type: "long" }),
      });
      const longData = await longRes.json();
      results.weeklyLong = { success: longData.success, title: longData.title };
    } catch (err) {
      results.weeklyLong = { error: String(err) };
    }
  }

  return NextResponse.json({ success: true, timestamp: new Date().toISOString(), results });
}
