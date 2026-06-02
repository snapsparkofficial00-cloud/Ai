// core/quality/qualityAgent.ts

export interface QualityScore {
  overall: number;
  script: number;
  thumbnail: number;
  voice: number;
  engagement: number;
  recommendations: string[];
}

export async function assessQuality(script: string, thumbnailUrl: string, voiceUrl?: string): Promise<QualityScore> {
  let scriptScore = 70;
  let recommendations: string[] = [];
  
  if (script.length < 100) {
    scriptScore -= 20;
    recommendations.push("Script is too short. Add more value.");
  }
  if (script.length > 2000) {
    scriptScore -= 10;
    recommendations.push("Script is too long. Keep under 500 chars for Shorts.");
  }
  if (script.includes("?") && script.includes("!")) {
    scriptScore += 10;
  }
  if (script.toLowerCase().includes("subscribe")) {
    scriptScore += 5;
  }
  
  let thumbnailScore = thumbnailUrl ? 75 : 30;
  if (!thumbnailUrl) recommendations.push("Missing thumbnail. Generate one for better CTR.");
  
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
  
  const prompt = `Optimize this YouTube ${niche} script for better retention. Make it more engaging, add hook, improve flow. Return ONLY the script:\n\n${script}`;
  
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });
    const data = await res.json();
    return data.choices[0]?.message?.content || script;
  } catch {
    return script;
  }
}

export async function generateOptimizedThumbnailPrompt(title: string, niche: string): Promise<string> {
  const GROQ_KEY = process.env.GROQ_API_KEY;
  
  const prompt = `Create a detailed image prompt for a viral YouTube thumbnail.
Title: "${title}"
Niche: ${niche}
Requirements: bold colors, dramatic lighting, face reaction, arrows, text overlay, high contrast.
Return ONLY the prompt.`;
  
  if (GROQ_KEY) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.8,
          max_tokens: 200,
        }),
      });
      const data = await res.json();
      return data.choices[0]?.message?.content || `${title}, bold colors, dramatic lighting, viral YouTube thumbnail`;
    } catch {}
  }
  
  return `${title}, bold colors, dramatic lighting, viral YouTube thumbnail, 4k, highly detailed`;
}
