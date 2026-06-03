import { NextResponse } from "next/server";

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }
    
    // Try Kaggle first (fast, free)
    const KAGGLE_URL = process.env.KAGGLE_GRADIO_URL;
    if (KAGGLE_URL) {
      try {
        console.log("🎬 Trying Kaggle...");
        const response = await fetch(`${KAGGLE_URL}/api/predict`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: [prompt, 49, 7.5, 30] }),
          signal: AbortSignal.timeout(300000)
        });
        
        if (response.ok) {
          const result = await response.json();
          const videoUrl = result.data?.[0];
          if (videoUrl) {
            return NextResponse.json({ 
              success: true, 
              videoUrl,
              source: "kaggle"
            });
          }
        }
      } catch (error) {
        console.log("Kaggle failed:", error);
      }
    }
    
    // Fallback to Replicate
    const REPLICATE_KEY = process.env.REPLICATE_API_KEY;
    if (REPLICATE_KEY) {
      try {
        console.log("🎬 Trying Replicate...");
        
        // Start generation
        const startRes = await fetch("https://api.replicate.com/v1/predictions", {
          method: "POST",
          headers: {
            "Authorization": `Token ${REPLICATE_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            version: "cjwbw/ltx-video:latest",
            input: { prompt: prompt }
          })
        });
        
        const { id } = await startRes.json();
        
        // Poll for result
        for (let i = 0; i < 60; i++) {
          await new Promise(r => setTimeout(r, 5000));
          
          const statusRes = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
            headers: { "Authorization": `Token ${REPLICATE_KEY}` }
          });
          const data = await statusRes.json();
          
          if (data.status === "succeeded") {
            return NextResponse.json({
              success: true,
              videoUrl: data.output,
              source: "replicate"
            });
          }
          
          if (data.status === "failed") {
            break;
          }
        }
      } catch (error) {
        console.log("Replicate failed:", error);
      }
    }
    
    return NextResponse.json({ 
      error: "No video source available. Check KAGGLE_GRADIO_URL and REPLICATE_API_KEY" 
    }, { status: 500 });
    
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
