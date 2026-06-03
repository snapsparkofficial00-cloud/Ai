
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const STORAGE_FILE = path.join(process.cwd(), "storage", "videos.json");

async function getVideos() {
  try {
    const data = await fs.readFile(STORAGE_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveVideos(videos: any[]) {
  await fs.mkdir(path.dirname(STORAGE_FILE), { recursive: true });
  await fs.writeFile(STORAGE_FILE, JSON.stringify(videos, null, 2));
}

export async function GET() {
  const videos = await getVideos();
  return NextResponse.json({ videos });
}

export async function POST(req: Request) {
  try {
    const { action, videoData, id } = await req.json();
    const videos = await getVideos();
    
    if (action === "save") {
      const newVideo = {
        id: Date.now().toString(),
        ...videoData,
        createdAt: new Date().toISOString()
      };
      videos.unshift(newVideo);
      await saveVideos(videos);
      return NextResponse.json({ success: true, video: newVideo });
    }
    
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const videos = await getVideos();
    const filtered = videos.filter((v: any) => v.id !== id);
    await saveVideos(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
