// app/lib/ai-engine.ts

export const maxDuration = 300;

import { trackPerformance, getBestPerforming, generateInsights } from "./agents/analytics";
import { runCEOStrategy, ceoDecision } from "./agents/ceo";
import { getChannelHealth } from "./agents/channelHealth";
import { saveMemory, recallMemories, getBestStrategies, learnFromSuccess } from "./agents/memory";
import { detectTrends, getViralTopics } from "./agents/trend";
import { addToSchedule, getUpcomingContent, calculateOptimalPostingTime } from "./youtube/scheduler";
import { assessQuality, optimizeScript, generateOptimizedThumbnailPrompt } from "./quality/qualityAgent";

interface WorkflowResult {
  success: boolean;
  topic: string;
  script?: string;
  title?: string;
  voiceUrl?: string;
  thumbnailUrl?: string;
  qualityScore?: number;
  youtubeUrl?: string;
  scheduledFor?: string;
  duration: number;
  logs: string[];
}

export async function runAIWorkflow(topic: string, type: "short" | "long" = "short"): Promise<WorkflowResult> {
  const startTime = Date.now();
  const logs: string[] = [];
  
  function addLog(msg: string) {
    const timestamp = new Date().toLocaleTimeString();
    const logMsg = `[${timestamp}] ${msg}`;
    logs.push(logMsg);
    console.log(logMsg);
  }

  try {
    addLog("🚀 STARTING AI WORKFLOW");
    addLog(`📌 Topic: ${topic}`);
    addLog(`📹 Video Type: ${type === "short" ? "YouTube Shorts (60s)" : "Long Video (5-10min)"}`);

    // Step 1: Check trending topics
    addLog("🔥 Checking trending topics...");
    const trends = await detectTrends(topic);
    if (trends.length) {
      addLog(`📈 Top trend: ${trends[0].keyword} (Viral score: ${trends[0].viralScore})`);
    }

    // Step 2: Get CEO strategy decision
    addLog("👑 Getting CEO AI strategy...");
    const ceoStrategy = await runCEOStrategy(topic);
    addLog(`📊 CEO Decision: ${ceoStrategy.decision.command}`);

    // Step 3: Generate viral topics
    addLog("💡 Generating viral content ideas...");
    const viralTopics = await getViralTopics(topic, 5);
    addLog(`✨ Ideas: ${viralTopics.slice(0, 3).join(", ")}`);

    // Step 4: Generate script with optimization
    addLog("📝 Generating script...");
    const GROQ_KEY = process.env.GROQ_API_KEY;
    let script = "";
    let title = "";

    if (GROQ_KEY) {
      const scriptPrompt = type === "short" 
        ? `Write a viral 45-60 second YouTube Shorts script about ${topic} in Hindi/English mix. Start with shocking hook. Fast-paced. End with CTA. Return ONLY script.`
        : `Write complete 5-8 minute YouTube script about ${topic}. Include hook, intro, 5 sections, conclusion, CTA. Return ONLY script.`;

      const scriptRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: scriptPrompt }],
          temperature: 0.9,
          max_tokens: type === "short" ? 600 : 2500,
        }),
      });
      const scriptData = await scriptRes.json();
      script = scriptData.choices?.[0]?.message?.content || "Script generation failed";

      // Optimize script quality
      script = await optimizeScript(script, topic);
      
      // Generate title
      const titlePrompt = `Generate click-bait YouTube ${type === "short" ? "Shorts" : "video"} title for: ${topic}. Use numbers, curiosity, emojis. Return ONLY title.`;
      const titleRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: titlePrompt }],
          temperature: 0.9,
          max_tokens: 100,
        }),
      });
      const titleData = await titleRes.json();
      title = titleData.choices?.[0]?.message?.content || `${topic} - ${type === "short" ? "Shorts" : "Video"}`;
    } else {
      script = `Amazing video about ${topic}! Subscribe for more!`;
      title = `${topic} - Viral Video`;
    }
    addLog(`✅ Script generated (${script.length} chars)`);

    // Step 5: Assess quality
    addLog("🔍 Assessing content quality...");
    let qualityScore = 0;
    let thumbnailUrl = "";
    
    const thumbnailPrompt = await generateOptimizedThumbnailPrompt(title, topic);
    
    try {
      const thumbRes = await fetch(`${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: thumbnailPrompt }),
      });
      const thumbData = await thumbRes.json();
      if (thumbData.url) {
        thumbnailUrl = thumbData.url;
        addLog("✅ Thumbnail generated");
      }
    } catch (err) {
      addLog(`⚠️ Thumbnail error: ${String(err)}`);
    }

    const quality = await assessQuality(script, thumbnailUrl);
    qualityScore = quality.overall;
    addLog(`📊 Quality Score: ${qualityScore}/100`);
    quality.recommendations.forEach(rec => addLog(`💡 ${rec}`));

    // Step 6: Generate voice
    addLog("🎤 Creating voiceover...");
    let voiceUrl = "";
    try {
      const voiceRes = await fetch(`${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/voice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: script.slice(0, 1500), language: "hindi" }),
      });
      const voiceData = await voiceRes.json();
      if (voiceData.url) {
        voiceUrl = voiceData.url;
        addLog("✅ Voiceover generated");
      }
    } catch (err) {
      addLog(`⚠️ Voice error: ${String(err)}`);
    }

    // Step 7: Schedule posting at optimal time
    addLog("📅 Calculating optimal posting time...");
    const optimalTime = await calculateOptimalPostingTime(topic);
    const scheduledContent = await addToSchedule({
      title,
      niche: topic,
      type,
      script,
      thumbnailUrl,
      voiceUrl,
      scheduledFor: optimalTime,
    });
    addLog(`✅ Scheduled for: ${new Date(optimalTime).toLocaleString()}`);

    // Step 8: Save to memory for learning
    await saveMemory("strategy", `Generated ${type} video about ${topic}`, qualityScore, { title, script: script.slice(0, 100) });
    addLog("🧠 Saved to AI memory");

    // Step 9: Get channel health
    const health = await getChannelHealth();
    addLog(`📊 Channel Health: ${health.status} (Score: ${health.score})`);

    const duration = Date.now() - startTime;
    addLog(`🎉 WORKFLOW COMPLETED in ${(duration / 1000).toFixed(1)} seconds`);

    return {
      success: true,
      topic,
      script,
      title,
      voiceUrl,
      thumbnailUrl,
      qualityScore,
      scheduledFor: optimalTime,
      duration,
      logs,
    };

  } catch (error) {
    const duration = Date.now() - startTime;
    addLog(`❌ WORKFLOW FAILED: ${String(error)}`);
    return {
      success: false,
      topic,
      duration,
      logs,
    };
  }
}

// Export all agent functions
export {
  trackPerformance,
  getBestPerforming,
  generateInsights,
  runCEOStrategy,
  ceoDecision,
  getChannelHealth,
  saveMemory,
  recallMemories,
  getBestStrategies,
  learnFromSuccess,
  detectTrends,
  getViralTopics,
  addToSchedule,
  getUpcomingContent,
  calculateOptimalPostingTime,
  assessQuality,
  optimizeScript,
  generateOptimizedThumbnailPrompt,
};

// Quick workflow
export async function runQuickWorkflow(niche: string): Promise<WorkflowResult> {
  return runAIWorkflow(niche, "short");
}

// Full workflow
export async function runFullWorkflow(niche: string): Promise<WorkflowResult> {
  return runAIWorkflow(niche, "long");
}
