import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

const STORAGE_DIR = path.join(process.cwd(), "public", "videos");
const STORAGE_FILE = path.join(process.cwd(), "storage", "videos.json");

// Ensure storage directory exists
async function ensureStorage() {
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
    await fs.mkdir(path.join(process.cwd(), "storage"), { recursive: true });
  } catch (e) {}
}

// Save video info to storage
async function saveVideoToStorage(videoData: any) {
  await ensureStorage();
  
  let videos = [];
  try {
    const data = await fs.readFile(STORAGE_FILE, "utf-8");
    videos = JSON.parse(data);
  } catch (e) {}
  
  const newVideo = {
    id: Date.now().toString(),
    ...videoData,
    createdAt: new Date().toISOString(),
  };
  
  videos.unshift(newVideo);
  await fs.writeFile(STORAGE_FILE, JSON.stringify(videos, null, 2));
  return newVideo;
}

export async function POST(req: Request) {
  try {
    const { prompt, mode, imageUrl } = await req.json();
    
    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    // Try multiple sources
    let videoUrl = null;
    let source = null;

    // Try Kaggle first
    const KAGGLE_URL = process.env.KAGGLE_GRADIO_URL;
    if (KAGGLE_URL) {
      try {
        const response = await fetch(`${KAGGLE_URL}/api/predict`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: [prompt, 49, 7.5, 30] }),
          signal: AbortSignal.timeout(300000)
        });
        
        if (response.ok) {
          const result = await response.json();
          videoUrl = result.data?.[0];
          source = "kaggle";
        }
      } catch (e) {}
    }

    // If no video, return demo with note
    if (!videoUrl) {
      return NextResponse.json({
        success: false,
        error: "No video source available. Please ensure Kaggle notebook is running.",
        demoMode: true
      });
    }

    // Save video info to storage
    const savedVideo = await saveVideoToStorage({
      title: prompt.slice(0, 50),
      prompt: prompt,
      videoUrl: videoUrl,
      source: source,
      hasVoiceover: false,
      hasMusic: true
    });

    return NextResponse.json({
      success: true,
      videoUrl: videoUrl,
      videoId: savedVideo.id,
      source: source,
      message: "Video generated and saved to storage"
    });

  } catch (error) {
    console.error("Video generation error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
