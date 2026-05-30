import { NextResponse } from "next/server";

export async function GET() {
  const url =
    `https://www.googleapis.com/youtube/v3/channels` +
    `?part=statistics,snippet` +
    `&id=${process.env.YOUTUBE_CHANNEL_ID}` +
    `&key=${process.env.YOUTUBE_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  const channel = data.items?.[0];

  return NextResponse.json({
    channel: channel?.snippet?.title,
    subscribers: channel?.statistics?.subscriberCount,
    views: channel?.statistics?.viewCount,
    videos: channel?.statistics?.videoCount,
  });
}
