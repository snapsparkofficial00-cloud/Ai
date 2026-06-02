import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { title, description, videoUrl, tags } = body;

    const clientId = process.env.YOUTUBE_CLIENT_ID;
    const clientSecret = process.env.YOUTUBE_CLIENT_SECRET;
    const refreshToken = process.env.YOUTUBE_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
      return NextResponse.json({
        success: false,
        message: "Missing YouTube OAuth credentials. Add YOUTUBE_CLIENT_SECRET and YOUTUBE_REFRESH_TOKEN to Vercel env vars.",
      });
    }

    // Get fresh access token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return NextResponse.json({
        success: false,
        message: "Failed to get access token. Check OAuth credentials.",
        detail: tokenData,
      });
    }

    // Insert video metadata
    const metadataRes = await fetch(
      "https://www.googleapis.com/youtube/v3/videos?part=snippet,status&uploadType=resumable",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Upload-Content-Type": "video/mp4",
        },
        body: JSON.stringify({
          snippet: {
            title: title || "AI Generated Video",
            description: description || "Created by AI OS — Automated YouTube System",
            tags: tags || ["AI", "automated", "viral", "shorts"],
            categoryId: "22",
          },
          status: {
            privacyStatus: "public",
            selfDeclaredMadeForKids: false,
          },
        }),
      }
    );

    const uploadUrl = metadataRes.headers.get("location");

    if (!uploadUrl) {
      return NextResponse.json({
        success: false,
        message: "Could not get upload URL from YouTube",
      });
    }

    return NextResponse.json({
      success: true,
      message: "✅ YouTube upload session created! Send video file to uploadUrl.",
      uploadUrl,
      accessToken,
    });

  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Upload failed",
      error: String(err),
    });
  }
}
