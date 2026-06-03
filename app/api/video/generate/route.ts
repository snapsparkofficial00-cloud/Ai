import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

// Generate JWT token for Kling API
function generateKlingToken(accessKey: string, secretKey: string): string {
  const payload = {
    iss: accessKey,
    exp: Math.floor(Date.now() / 1000) + 1800,
    nbf: Math.floor(Date.now() / 1000) - 5
  };
  return jwt.sign(payload, secretKey, { algorithm: 'HS256' });
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    const accessKey = process.env.KLING_ACCESS_KEY;
    const secretKey = process.env.KLING_SECRET_KEY;
    
    if (!accessKey || !secretKey) {
      return NextResponse.json({ 
        error: "Missing Kling keys. Add KLING_ACCESS_KEY and KLING_SECRET_KEY to Vercel."
      }, { status: 400 });
    }
    
    const token = generateKlingToken(accessKey, secretKey);
    
    // Submit to Kling AI
    const response = await fetch('https://api-singapore.klingai.com/v1/videos/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'kling-v1-6',
        prompt: prompt,
        duration: 8,
        mode: 'pro',
        aspect_ratio: '9:16',
        negative_prompt: 'low quality, blurry, distorted'
      })
    });
    
    const data = await response.json();
    
    if (data.code !== 0) {
      return NextResponse.json({ error: data.message }, { status: 500 });
    }
    
    const taskId = data.data.task_id;
    
    // Poll for result
    for (let i = 0; i < 60; i++) {
      await new Promise(r => setTimeout(r, 5000));
      
      const pollToken = generateKlingToken(accessKey, secretKey);
      const pollRes = await fetch(`https://api-singapore.klingai.com/v1/videos/generations/${taskId}`, {
        headers: { 'Authorization': `Bearer ${pollToken}` }
      });
      const pollData = await pollRes.json();
      
      if (pollData.data?.status === 'succeeded') {
        return NextResponse.json({ 
          success: true, 
          videoUrl: pollData.data.videos[0].url,
          source: 'Kling AI 1.6',
          quality: '1080p'
        });
      }
    }
    
    return NextResponse.json({ error: 'Timeout' }, { status: 500 });
    
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
