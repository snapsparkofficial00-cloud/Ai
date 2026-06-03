import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const STORAGE_FILE = path.join(process.cwd(), "video-storage.json");

interface StoredVideo {
  id: string;
  title: string;
  prompt: string;
  videoUrl: string;
  thumbnailUrl?: string;
  hasVoiceover: boolean;
  hasMusic: boolean;
  musicStyle?: string;
  createdAt: string;
  size: string;
}

// Load videos from storage
async function loadVideos(): Promise<StoredVideo[]> {
  try {
    const data = await fs.readFile(STORAGE_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save videos to storage
async function saveVideos(videos: StoredVideo[]): Promise<void> {
  await fs.writeFile(STORAGE_FILE, JSON.stringify(videos, null, 2));
}

export async function GET() {
  const videos = await loadVideos();
  return NextResponse.json({ success: true, videos });
}

export async function POST(req: Request) {
  try {
    const { action, videoId, videoData } = await req.json();
    const videos = await loadVideos();

    if (action === "save") {
      const newVideo: StoredVideo = {
        id: Date.now().toString(),
        ...videoData,
        createdAt: new Date().toISOString(),
      };
      videos.unshift(newVideo);
      await saveVideos(videos);
      return NextResponse.json({ success: true, video: newVideo });
    }

    if (action === "delete") {
      const filtered = videos.filter(v => v.id !== videoId);
      await saveVideos(filtered);
      return NextResponse.json({ success: true, message: "Video deleted" });
    }

    if (action === "update") {
      const index = videos.findIndex(v => v.id === videoId);
      if (index !== -1) {
        videos[index] = { ...videos[index], ...videoData };
        await saveVideos(videos);
        return NextResponse.json({ success: true, video: videos[index] });
      }
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
