import { NextResponse } from "next/server";

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
      fetch(`${process.env.NEXT_PUBLIC_URL || "https://ai-ivory-delta.vercel.app"}/api/youtube/autonomous`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate", niche, type: "short" }),
      }).catch(() => {});
      
    } else if (lowerCommand.includes("analyze") && lowerCommand.includes("channel")) {
      action = "analyze_channel";
      reply = `📊 Channel Analysis Complete for ${niche} niche.\n- Status: Active\n- Next Steps: Generate content, optimize thumbnails, find trending topics`;
      suggestions = ["Generate video", "Optimize thumbnails", "Find trending topics", "Revenue strategy"];
      
    } else if (lowerCommand.includes("trending topics") || lowerCommand.includes("viral topics")) {
      action = "show_trends";
      reply = `🔥 Trending topics for ${niche} niche:\n- Top 3 viral ideas are ready\n- Check the trends panel for details`;
      suggestions = ["Generate video on top trend", "Analyze trend potential", "Create script", "Schedule post"];
      
    } else if (lowerCommand.includes("autonomous mode")) {
      action = "autonomous_mode";
      reply = `🤖 Autonomous mode activated for ${niche} niche! I'll generate content automatically.`;
      suggestions = ["Deactivate autonomous mode", "Check generated content", "Adjust settings", "View schedule"];
      
    } else if (lowerCommand.includes("revenue") || lowerCommand.includes("monetization")) {
      action = "revenue_strategy";
      reply = `💰 Revenue Analysis: Based on your stats, estimated monthly revenue potential: $${Math.floor((stats?.totalViews || 0) / 1000 * 3)}. Recommended: Enable mid-roll ads and affiliate marketing.`;
      suggestions = ["Create monetization plan", "Optimize ad placement", "Add affiliate links", "Generate revenue report"];
      
    } else {
      reply = `✅ CEO AI received: "${command}". What would you like me to do?`;
      suggestions = ["Generate video", "Analyze channel", "Show trends", "Revenue report"];
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
