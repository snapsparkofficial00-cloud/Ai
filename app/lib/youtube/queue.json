// app/lib/quality/qualityAgent.ts

interface QualityScore {
  overall: number;
  script: number;
  thumbnail: number;
  voice: number;
  engagement: number;
  recommendations: string[];
}

export async function assessQuality(script: string, thumbnailUrl: string, voiceUrl?: string): Promise<QualityScore> {
  const GROQ_KEY = process.env.GROQ_API_KEY;
  
  let scriptScore = 70;
  let recommendations: string[] = [];
  
  // Basic script quality checks
  if (script.length < 100) {
    scriptScore -= 20;
    recommendations.push("Script is too short. Add more value.");
  }
  if (script.length > 2000) {
    scriptScore -= 10;
    recommendations.push("Script is too long for Shorts. Keep under 500 chars.");
  }
  if (script.includes("?") && script.includes("!")) {
    scriptScore += 10;
  }
  if (script.toLowerCase().includes("subscribe") || script.toLowerCase().includes("follow")) {
    scriptScore += 5;
  }
  
  // AI-powered quality assessment
  if (GROQ_KEY) {
    const prompt = `
Rate this YouTube script from 0-100 for viral potential:
"${script.slice(0, 500)}"

Return JSON: {"score": number, "reason": "string"}`;
    
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5,
      }),
    });
    const data = await res.json();
    try {
      const aiResult = JSON.parse(data.choices[0]?.message?.content || "{}");
      scriptScore = (scriptScore + (aiResult.score || 70)) / 2;
      if (aiResult.reason) recommendations.push(aiResult.reason);
    } catch {}
  }
  
  // Thumbnail quality (simulated - would need actual image analysis)
  let thumbnailScore = 75;
  if (!thumbnailUrl) {
    thumbnailScore = 30;
    recommendations.push("Missing thumbnail. Generate one for better CTR.");
  }
  
  // Voice quality (simulated)
  let voiceScore = voiceUrl ? 80 : 50;
  if (!voiceUrl) recommendations.push("Add voiceover for better engagement.");
  
  const overall = Math.floor((scriptScore + thumbnailScore + voiceScore) / 3);
  
  if (overall >= 80) recommendations.unshift("🎯 High quality content! Ready for upload.");
  else if (overall >= 60) recommendations.unshift("📈 Good quality. Small improvements will help.");
  else recommendations.unshift("⚠️ Quality needs improvement. Review suggestions below.");
  
  return {
    overall,
    script: Math.floor(scriptScore),
    thumbnail: Math.floor(thumbnailScore),
    voice: Math.floor(voiceScore),
    engagement: Math.floor((scriptScore + (voiceUrl ? 80 : 50)) / 2),
    recommendations: recommendations.slice(0, 5),
  };
}

export async function optimizeScript(script: string, niche: string): Promise<string> {
  const GROQ_KEY = process.env.GROQ_API_KEY;
  
  if (!GROQ_KEY) return script;
  
  const prompt = `Optimize this YouTube ${niche} script for better retention and virality. Make it more engaging, add hook, improve flow. Return ONLY the optimized script:\n\n${script}`;
  
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    }),
  });
  
  const data = await res.json();
  return data.choices[0]?.message?.content || script;
}

export async function generateOptimizedThumbnailPrompt(title: string, niche: string): Promise<string> {
  const GROQ_KEY = process.env.GROQ_API_KEY;
  
  const prompt = `Create a detailed image generation prompt for a viral YouTube thumbnail.
Title: "${title}"
Niche: ${niche}

Requirements: bold colors, dramatic lighting, face reaction, arrows, text overlay, high contrast, clickable.
Return ONLY the prompt.`;
  
  if (GROQ_KEY) {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
      }),
    });
    const data = await res.json();
    return data.choices[0]?.message?.content || `${title}, viral style, bold text, dramatic, 4k, YouTube thumbnail`;
  }
  
  return `${title}, viral style, bold text, dramatic, 4k, YouTube thumbnail`;
}
