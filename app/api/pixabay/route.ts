import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "BMW car";
    const type = searchParams.get("type") || "video"; // video or image

    const PIXABAY_KEY = process.env.PIXABAY_API_KEY || process.env.PIXAB___KEY;

    if (!PIXABAY_KEY) {
      return NextResponse.json({ error: "Missing Pixabay API key" });
    }

    if (type === "video") {
      const res = await fetch(
        `https://pixabay.com/api/videos/?key=${PIXABAY_KEY}&q=${encodeURIComponent(query)}&per_page=12&video_type=film&order=popular`,
      );
      const data = await res.json();

      if (!res.ok) {
        return NextResponse.json({ error: "Pixabay API error", detail: data });
      }

      const videos = data.hits?.map((v: any) => ({
        id: v.id,
        title: v.tags,
        duration: v.duration,
        thumbnail: v.picture_id
          ? `https://i.vimeocdn.com/video/${v.picture_id}_295x166.jpg`
          : "",
        url: v.videos?.medium?.url || v.videos?.small?.url || "",
        hdUrl: v.videos?.large?.url || v.videos?.medium?.url || "",
        width: v.videos?.medium?.width,
        height: v.videos?.medium?.height,
        views: v.views,
        downloads: v.downloads,
        user: v.user,
      })) || [];

      return NextResponse.json({
        success: true,
        total: data.totalHits,
        videos,
        query,
      });
    }

    // Image search
    const res = await fetch(
      `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(query)}&per_page=12&image_type=photo&order=popular&safesearch=true`,
    );
    const data = await res.json();

    const images = data.hits?.map((img: any) => ({
      id: img.id,
      title: img.tags,
      url: img.largeImageURL || img.webformatURL,
      thumbnail: img.previewURL,
      width: img.imageWidth,
      height: img.imageHeight,
      views: img.views,
      user: img.user,
    })) || [];

    return NextResponse.json({
      success: true,
      total: data.totalHits,
      images,
      query,
    });

  } catch (err) {
    return NextResponse.json({
      error: "Pixabay error",
      details: String(err),
    });
  }
}
