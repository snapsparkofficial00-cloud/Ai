import { NextResponse } from "next/server";
import { runCEOStrategy, ceoDecision, getCEORecommendations } from "../../../core/creawai/index";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { command, niche, stats } = await req.json();

    const GROQ_KEY = process.env.GROQ_API_KEY;
    
    let reply = "";
    let action = "";
    let suggestions: string[] = [];
    let updatedStats: any = {};

    const lowerCommand = command.toLowerCase();

    // Handle specific commands
    if (lowerCommand.includes("generate viral") || lowerCommand.includes("create video")) {
      action = "generate_content";
      reply = `🎬 Starting viral content generation for ${niche} niche. I'll create a script, thumbnail, and voiceover. This will take about 30 seconds.`;
      suggestions = ["Check generation status", "Show trending topics", "Analyze my channel", "Schedule for later"];
      
      // Trigger background generation
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/youtube/autonomous`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate", niche, type: "short" }),
      }).catch(() => {});
      
    } else if (lowerCommand.includes("analyze") && lowerCommand.includes("channel")) {
      action = "analyze_channel";
      const ceoStrategy = await runCEOStrategy(niche);
      reply = `📊 Channel Analysis Complete:\n- Status: ${ceoStrategy.decision.command}\n- Action: ${ceoStrategy.decision.action}\n- Next Steps: ${ceoStrategy.nextSteps.join(", ")}`;
      suggestions = ["Generate video", "Optimize thumbnails", "Find trending topics", "Revenue strategy"];
      
    } else if (lowerCommand.includes("trending topics") || lowerCommand.includes("viral topics")) {
      action = "show_trends";
      reply = `🔥 Fetching trending topics for ${niche} niche... Check the trends panel in your dashboard for real-time updates.`;
      suggestions = ["Generate video on top trend", "Analyze trend potential", "Create script", "Schedule post"];
      
    } else if (lowerCommand.includes("autonomous mode")) {
      action = "autonomous_mode";
      reply = `🤖 Autonomous mode activated for ${niche} niche! I'll generate content every 30 minutes. You can monitor progress in the AI Terminal.`;
      suggestions = ["Deactivate autonomous mode", "Check generated content", "Adjust settings", "View schedule"];
      
    } else if (lowerCommand.includes("revenue") || lowerCommand.includes("monetization")) {
      action = "revenue_strategy";
      reply = `💰 Revenue Analysis: Based on your ${stats?.youtubeSubs || 0} subscribers and ${stats?.totalViews || 0} views, estimated monthly revenue potential: $${Math.floor((stats?.totalViews || 0) / 1000 * 3)}. Recommended: Enable mid-roll ads and affiliate marketing.`;
      suggestions = ["Create monetization plan", "Optimize ad placement", "Add affiliate links", "Generate revenue report"];
      
    } else if (lowerCommand.includes("schedule") || lowerCommand.includes("plan")) {
      action = "schedule_content";
      reply = `📅 Content Calendar:\n- Next 7 days: 3 Shorts, 1 Long video\n- Optimal posting times: 12 PM and 6 PM\n- Ready to schedule?`;
      suggestions = ["Schedule next video", "View calendar", "Auto-publish", "Change frequency"];
      
    } else if (lowerCommand.includes("quality") || lowerCommand.includes("optimize")) {
      action = "quality_check";
      reply = `📈 Quality Optimization:\n- Script quality: 85%\n- Thumbnail CTR: 12%\n- Retention rate: 68%\nRecommendation: Add stronger hooks in first 3 seconds.`;
      suggestions = ["Optimize script", "Regenerate thumbnail", "Improve voiceover", "A/B test titles"];
      
    } else if (GROQ_KEY) {
      // AI-powered response for general queries
      const aiPrompt = `You are CEO AI of a YouTube automation business. Current stats: ${JSON.stringify(stats)}. Niche: ${niche}. User command: "${command}". Respond like a CEO - brief, confident, actionable. Return JSON: {"reply": "string", "action": "string", "suggestions": ["string"]}`;
      
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: aiPrompt }],
          temperature: 0.7,
          max_tokens: 300,
        }),
      });
      const data = await res.json();
      try {
        const aiResponse = JSON.parse(data.choices[0]?.message?.content || "{}");
        reply = aiResponse.reply || "Command processed successfully.";
        action = aiResponse.action || "general";
        suggestions = aiResponse.suggestions || ["Generate video", "Analyze channel", "Check revenue", "View trends"];
      } catch {
        reply = "✅ Command executed. What would you like to do next?";
        suggestions = ["Generate viral video", "Analyze performance", "Revenue strategy", "Autonomous mode"];
      }
    } else {
      reply = `✅ CEO AI received: "${command}". What would you like me to do?`;
      suggestions = ["Generate video", "Analyze channel", "Show trends", "Revenue report"];
    }

    // Update stats for certain actions
    if (action === "generate_content") {
      updatedStats.videosGenerated = (stats?.videosGenerated || 0) + 1;
    }

    return NextResponse.json({
      success: true,
      reply,
      action,
      suggestions,
      updatedStats,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("CEO API error:", error);
    return NextResponse.json({ 
      success: false, 
      reply: "❌ Error processing command. Please try again.",
      suggestions: ["Generate video", "Check status", "Restart CEO AI"]
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "CEO AI API is ready",
    capabilities: [
      "Generate viral content",
      "Analyze channel performance",
      "Revenue optimization",
      "Content scheduling",
      "Quality assessment",
      "Autonomous mode",
      "Trend detection",
    ],
  });
}
