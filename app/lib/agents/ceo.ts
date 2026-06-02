// app/lib/agents/ceo.ts

export const maxDuration = 300;

interface CEOCommand {
  command: "generate_script" | "upload_video" | "analyze_performance" | "optimize_thumbnail" | "schedule_content" | "trend_analysis";
  action: string;
  params: {
    niche: string;
    type: "short" | "long";
    priority: number;
    scheduledTime?: string;
  };
}

interface CEOStrategy {
  success: boolean;
  decision: CEOCommand;
  reasoning: string;
  timestamp: string;
  nextSteps: string[];
}

// Main CEO decision function
export async function ceoDecision(context: string): Promise<CEOCommand> {
  const GROQ_KEY = process.env.GROQ_API_KEY;
  
  const prompt = `
You are the CEO AI of an autonomous YouTube empire.
Context: ${context}

Based on this context, decide the NEXT BEST ACTION.

Available commands:
- generate_script: Create viral YouTube script
- upload_video: Upload ready video to YouTube
- analyze_performance: Check analytics and optimize
- optimize_thumbnail: Improve thumbnail for better CTR
- schedule_content: Plan future content calendar
- trend_analysis: Find trending topics

Return ONLY JSON format:
{
  "command": "one of the commands above",
  "action": "brief description of what to do",
  "params": {
    "niche": "specific niche or topic",
    "type": "short or long",
    "priority": 1-10 number
  }
}`;

  if (GROQ_KEY) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 300,
        }),
      });
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || "{}";
      try {
        return JSON.parse(content);
      } catch {
        return {
          command: "generate_script",
          action: "Create viral content for current niche",
          params: { niche: "general", type: "short", priority: 5 },
        };
      }
    } catch {
      return {
        command: "generate_script",
        action: "Create viral content for current niche",
        params: { niche: "general", type: "short", priority: 5 },
      };
    }
  }
  
  return {
    command: "generate_script",
    action: "Create viral content for current niche",
    params: { niche: "general", type: "short", priority: 5 },
  };
}

// Run full CEO strategy
export async function runCEOStrategy(niche: string): Promise<CEOStrategy> {
  console.log(`👑 CEO AI analyzing: ${niche}`);
  
  const decision = await ceoDecision(`Current niche: ${niche}. Need viral YouTube growth strategy. Analytics show potential for rapid growth.`);
  
  const reasoning = `Based on ${niche} niche analysis, ${decision.command} is the optimal action with priority ${decision.params.priority}.`;
  
  const nextSteps: string[] = [];
  switch (decision.command) {
    case "generate_script":
      nextSteps.push("Generate viral script", "Create thumbnail", "Add voiceover", "Schedule upload");
      break;
    case "upload_video":
      nextSteps.push("Check video quality", "Add tags and description", "Set privacy", "Publish");
      break;
    case "analyze_performance":
      nextSteps.push("Fetch latest analytics", "Identify top performers", "Extract patterns", "Update strategy");
      break;
    case "optimize_thumbnail":
      nextSteps.push("Analyze current CTR", "Generate new thumbnails", "A/B test", "Monitor improvement");
      break;
    case "schedule_content":
      nextSteps.push("Plan weekly calendar", "Batch create scripts", "Set upload times", "Auto-publish");
      break;
    case "trend_analysis":
      nextSteps.push("Scan viral topics", "Find rising trends", "Create trend-based script", "Post quickly");
      break;
  }
  
  return {
    success: true,
    decision,
    reasoning,
    timestamp: new Date().toISOString(),
    nextSteps,
  };
}

// Get CEO recommendations based on performance
export async function getCEORecommendations(performanceData: any[]): Promise<string[]> {
  const GROQ_KEY = process.env.GROQ_API_KEY;
  
  if (!GROQ_KEY || !performanceData.length) {
    return [
      "📹 Post at least 3 shorts per week",
      "🎯 Focus on one niche for 30 days",
      "🖼️ Improve thumbnails with bright colors",
      "🎙️ Add voiceover to all videos",
      "📊 Track analytics daily"
    ];
  }
  
  const avgScore = performanceData.reduce((a, b) => a + (b.score || 0), 0) / performanceData.length;
  
  const prompt = `
Performance average score: ${avgScore}
Based on this, give 5 specific recommendations to improve.
Return as JSON array of strings.`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 300,
    }),
  });
  
  const data = await res.json();
  try {
    return JSON.parse(data.choices?.[0]?.message?.content || "[]");
  } catch {
    return [
      "📹 Increase posting frequency",
      "🎯 Optimize video titles",
      "🖼️ Improve thumbnail CTR",
      "🎙️ Add engaging voiceover",
      "📊 Monitor and adapt"
    ];
  }
}

// CEO Agent object for backward compatibility
export const ceoAgent = {
  decide: ceoDecision,
  runStrategy: runCEOStrategy,
  getRecommendations: getCEORecommendations,
};
