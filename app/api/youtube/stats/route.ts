import { NextResponse } from "next/server";

export async function GET() {
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  const url =
    `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data);
}
