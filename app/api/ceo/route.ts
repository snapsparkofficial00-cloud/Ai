import { NextResponse } from "next/server";
import { getMasterCEO } from "../../../core/ceo";

export async function GET() {
  try {
    const ceo = getMasterCEO();
    const status = await ceo.getStatus();
    return NextResponse.json({ success: true, ...status });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, niche, goal, type, skill, platform,
      product, purpose, appIdea, toolIdea, skills,
      jobTitle, clientNeeds, agentJob, agentContext,
      agentId, task, count } = body;

    const ceo = getMasterCEO();

    switch (action) {

      case "execute_goal":
        const plan = await ceo.executeGoal(
          goal || "build income", niche || "BMW Cars"
        );
        return NextResponse.json({ success: true, plan });

      case "build_empire":
        const empire = await ceo.buildEmpire(niche || "BMW Cars");
        return NextResponse.json({ success: true, empire });

      case "income_stream":
        const stream = await ceo.moneyMachine.buildIncomeStream(
          type || "youtube", niche || "BMW Cars"
        );
        return NextResponse.json({ success: true, stream });

      case "all_income":
        const allStreams = await ceo.moneyMachine.buildAllStreams(
          niche || "BMW Cars"
        );
        return NextResponse.json({ success: true, allStreams });

      case "instagram_content":
        const igContent = await ceo.instagramManager.generateContent(
          niche || "BMW Cars", count || 5
        );
        return NextResponse.json({ success: true, content: igContent });

      case "instagram_growth":
        const igGrowth = await ceo.instagramManager.buildGrowthPlan(
          niche || "BMW Cars", 0
        );
        return NextResponse.json({ success: true, plan: igGrowth });

      case "instagram_dm":
        const dmScript = await ceo.instagramManager.generateDMScript(
          purpose || "sell digital product"
        );
        return NextResponse.json({ success: true, script: dmScript });

      case "build_website":
        const website = await ceo.webAppBuilder.designWebsite(
          purpose || "portfolio", niche || "BMW Cars"
        );
        return NextResponse.json({ success: true, design: website });

      case "build_app":
        const app = await ceo.webAppBuilder.designApp(
          appIdea || "car tracking app"
        );
        return NextResponse.json({ success: true, design: app });

      case "build_ai_tool":
        const tool = await ceo.webAppBuilder.buildAITool(
          toolIdea || "YouTube title generator"
        );
        return NextResponse.json({ success: true, design: tool });

      case "freelance_gig":
        const gig = await ceo.freelanceSystem.createGigProposal(
          skill || "video editing", platform || "Fiverr"
        );
        return NextResponse.json({ success: true, gig });

      case "freelance_opportunities":
        const opps = await ceo.freelanceSystem.findOpportunities(
          skills || ["video editing", "AI automation"]
        );
        return NextResponse.json({ success: true, opportunities: opps });

      case "write_proposal":
        const proposal = await ceo.freelanceSystem.writeProposal(
          jobTitle || "Video Editor", clientNeeds || "Need YouTube videos"
        );
        return NextResponse.json({ success: true, proposal });

      case "affiliate_programs":
        const programs = await ceo.affiliateSystem.findPrograms(
          niche || "BMW Cars"
        );
        return NextResponse.json({ success: true, programs });

      case "affiliate_content":
        const affContent = await ceo.affiliateSystem.createContent(
          product || "BMW accessories", platform || "youtube"
        );
        return NextResponse.json({ success: true, content: affContent });

      case "create_agent":
        const newAgent = await ceo.agentFactory.createAgent(
          agentJob || "Social media manager",
          agentContext || niche || "BMW Cars"
        );
        return NextResponse.json({ success: true, agent: newAgent });

      case "run_agent":
        const agentResult = await ceo.agentFactory.runAgent(
          agentId, task || "complete your primary task"
        );
        return NextResponse.json({ success: true, ...agentResult });

      case "get_agents":
        const agents = await ceo.agentFactory.getAgents();
        return NextResponse.json({ success: true, agents });

      case "get_income":
        const income = await ceo.incomeTracker.getSources();
        const total = await ceo.incomeTracker.getTotalEstimate();
        return NextResponse.json({ success: true, income, total });

      default:
        const status = await ceo.getStatus();
        return NextResponse.json({ success: true, status });
    }

  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}
