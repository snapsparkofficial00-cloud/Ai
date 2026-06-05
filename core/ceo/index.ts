// core/ceo/index.ts — CEO MASTER BRAIN
import { getMasterCEO } from "@/core/ceo";

const GROQ_KEY = process.env.GROQ_API_KEY;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ============================================
// DATABASE
// ============================================

async function db(table: string, method = "GET", data?: any, filter?: string) {
  const url = `${SUPABASE_URL}/rest/v1/${table}${filter ? `?${filter}` : ""}`;
  const headers: any = {
    apikey: SUPABASE_KEY!,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
    Prefer: method === "POST" ? "return=representation" : "return=minimal",
  };
  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });
  if (method === "GET") return res.ok ? await res.json() : [];
  return res.ok;
}

async function ai(
  system: string,
  user: string,
  maxTokens = 1000,
  model = "llama-3.3-70b-versatile"
) {
  try {
    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          temperature: 0.8,
          max_tokens: maxTokens,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
        }),
      }
    );
    const data = await res.json();
    return data?.choices?.[0]?.message?.content || "";
  } catch {
    return "";
  }
}

async function aiJSON(system: string, user: string, maxTokens = 800) {
  const raw = await ai(system, user, maxTokens);
  try {
    const clean = raw.replace(/```json|```/g, "").trim();
    const match = clean.match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : {};
  } catch {
    return {};
  }
}

// ============================================
// INCOME TRACKER
// ============================================

export class IncomeTracker {
  async addSource(source: {
    name: string;
    type: string;
    estimatedMonthly: number;
    status: string;
    agent: string;
    steps?: string[];
  }) {
    await db("income_sources", "POST", {
      ...source,
      steps: JSON.stringify(source.steps || []),
      created_at: new Date().toISOString(),
    });
  }

  async getSources() {
    const rows = await db(
      "income_sources",
      "GET",
      undefined,
      "select=*&order=estimated_monthly.desc"
    );
    return rows.map((r: any) => ({
      ...r,
      steps: this.safeParse(r.steps),
    }));
  }

  async getTotalEstimate() {
    const sources = await this.getSources();
    return sources.reduce(
      (sum: number, s: any) => sum + (s.estimatedMonthly || 0),
      0
    );
  }

  safeParse(val: any) {
    try {
      return typeof val === "string" ? JSON.parse(val) : val;
    } catch {
      return val;
    }
  }
}

// ============================================
// AGENT FACTORY — creates new agents on demand
// ============================================

export class AgentFactory {
  async createAgent(job: string, context: string) {
    const agentSpec = await aiJSON(
      `You are an AI agent architect. Design specialized AI agents for specific business tasks.
Always return valid JSON only.`,
      `Create a specialized AI agent for this job: "${job}"
Context: ${context}

Return JSON:
{
  "id": "agent-id-lowercase",
  "name": "Agent Name with emoji",
  "role": "What it does",
  "specialization": "${job}",
  "systemPrompt": "Detailed system prompt for this agent",
  "skills": ["skill1", "skill2", "skill3"],
  "model": "llama-3.3-70b-versatile",
  "incomeStreams": ["how this agent makes money"],
  "estimatedMonthlyValue": 500,
  "priority": 8
}`,
      600
    );

    if (agentSpec.id) {
      await db("custom_agents", "POST", {
        ...agentSpec,
        skills: JSON.stringify(agentSpec.skills || []),
        income_streams: JSON.stringify(agentSpec.incomeStreams || []),
        created_at: new Date().toISOString(),
      });
    }

    return agentSpec;
  }

  async getAgents() {
    const rows = await db("custom_agents", "GET", undefined, "select=*&order=priority.desc");
    return rows.map((r: any) => ({
      ...r,
      skills: this.safeParse(r.skills),
      income_streams: this.safeParse(r.income_streams),
    }));
  }

  async runAgent(agentId: string, task: string) {
    const agents = await this.getAgents();
    const agent = agents.find((a: any) => a.id === agentId);
    if (!agent) return { error: "Agent not found" };

    const result = await ai(
      agent.systemPrompt || `You are ${agent.name}. ${agent.role}`,
      task,
      1200
    );

    await db("agent_jobs", "POST", {
      agent_id: agentId,
      agent_name: agent.name,
      task,
      result,
      status: "completed",
      created_at: new Date().toISOString(),
    });

    return { success: true, agent: agent.name, result };
  }

  safeParse(val: any) {
    try {
      return typeof val === "string" ? JSON.parse(val) : val;
    } catch {
      return val;
    }
  }
}

// ============================================
// MONEY MACHINE — builds income sources
// ============================================

export class MoneyMachine {
  private incomeTracker: IncomeTracker;

  constructor(incomeTracker: IncomeTracker) {
    this.incomeTracker = incomeTracker;
  }

  async buildIncomeStream(type: string, niche: string) {
    const plans: Record<string, any> = {
      youtube: {
        name: "YouTube AdSense",
        agent: "youtube-ai",
        prompt: `Create a complete YouTube monetization plan for "${niche}" niche. Include: AdSense setup, sponsorship rates, affiliate products, merchandise, Super Chat strategy, estimated monthly earnings at different subscriber counts.`,
      },
      affiliate: {
        name: "Affiliate Marketing",
        agent: "revenue-ai",
        prompt: `Build an affiliate marketing system for "${niche}". Include: top affiliate programs (Amazon, ShareASale, CJ), content strategy, review videos, comparison posts, estimated commissions, 30-day action plan.`,
      },
      freelance: {
        name: "Freelancing Income",
        agent: "automation-ai",
        prompt: `Create a freelancing business plan for "${niche}". Include: services to offer, platforms (Fiverr, Upwork, Toptal), pricing strategy, portfolio tips, client acquisition, income milestones.`,
      },
      digital_products: {
        name: "Digital Products",
        agent: "revenue-ai",
        prompt: `Design digital products for "${niche}". Include: eBooks, courses, templates, presets, tools. Platforms: Gumroad, Teachable, Notion. Pricing, marketing strategy, expected revenue.`,
      },
      instagram: {
        name: "Instagram Monetization",
        agent: "instagram-ai",
        prompt: `Build Instagram monetization for "${niche}". Include: brand deals rates, affiliate links in bio, paid promotions, DM automation for sales, content strategy for conversions, 90-day growth plan.`,
      },
      saas: {
        name: "AI SaaS Tool",
        agent: "website-ai",
        prompt: `Design a micro SaaS tool for "${niche}" that can be built with Next.js and monetized. Include: product idea, features, pricing tiers, landing page copy, user acquisition, MRR projections.`,
      },
      sponsorship: {
        name: "Brand Sponsorships",
        agent: "ceo-ai",
        prompt: `Create a sponsorship acquisition strategy for "${niche}" content creator. Include: brands to target, outreach email templates, pricing calculator, negotiation tactics, contract basics.`,
      },
    };

    const plan = plans[type] || plans.youtube;
    const result = await ai(
      `You are an expert business strategist and digital income specialist.
Create detailed, actionable, realistic income plans.
Focus on ${niche} niche.`,
      plan.prompt,
      1500
    );

    const estimate = await aiJSON(
      `Estimate realistic monthly income. Return JSON only.`,
      `For ${plan.name} in "${niche}" niche for a beginner with 66 subscribers.
Return JSON: {"month1": 50, "month3": 200, "month6": 500, "month12": 2000, "potential": 5000}`
    );

    await this.incomeTracker.addSource({
      name: plan.name,
      type,
      estimatedMonthly: estimate.month6 || 500,
      status: "building",
      agent: plan.agent,
      steps: result.split("\n").filter((l: string) => l.trim()).slice(0, 10),
    });

    return {
      type,
      name: plan.name,
      plan: result,
      estimate,
      agent: plan.agent,
    };
  }

  async buildAllStreams(niche: string) {
    const types = [
      "youtube",
      "affiliate",
      "instagram",
      "digital_products",
      "sponsorship",
    ];
    const results = await Promise.all(
      types.map((t) => this.buildIncomeStream(t, niche))
    );
    const total = await this.incomeTracker.getTotalEstimate();
    return { streams: results, totalEstimate: total };
  }
}

// ============================================
// INSTAGRAM MANAGER
// ============================================

export class InstagramManager {
  async generateContent(niche: string, count = 5) {
    return await ai(
      `You are an Instagram growth expert specializing in viral content for ${niche}.`,
      `Generate ${count} Instagram post ideas for "${niche}":
For each post include:
- Caption (with emojis, conversational)
- 30 hashtags (mix of sizes)
- Best posting time
- Reel concept (15-30 sec)
- CTA to get followers/sales
- Estimated reach

Make content viral, engaging, and monetization-focused.`,
      1500
    );
  }

  async buildGrowthPlan(niche: string, currentFollowers: number) {
    return await ai(
      `You are an Instagram algorithm expert and growth hacker.`,
      `Build a 90-day Instagram growth plan for:
Niche: ${niche}
Current followers: ${currentFollowers}

Include:
- Daily posting schedule
- Reel strategy (most important)
- Story strategy
- Hashtag system
- Engagement tactics
- Collaboration strategy
- Monetization at each milestone (1K, 10K, 100K)
- Tools needed (all free)`,
      1500
    );
  }

  async generateDMScript(purpose: string) {
    return await ai(
      `You are an expert in Instagram DM marketing and conversion.`,
      `Write Instagram DM scripts for: "${purpose}"
Include:
- Initial outreach message (not spammy)
- Follow-up messages (3 versions)
- Closing/CTA message
- Objection handling responses
Make them feel natural and personalized.`,
      800
    );
  }
}

// ============================================
// WEB/APP BUILDER
// ============================================

export class WebAppBuilder {
  async designWebsite(purpose: string, niche: string) {
    return await ai(
      `You are an elite fullstack architect and UI/UX designer.
Design production-ready web applications.`,
      `Design a complete website for: "${purpose}" in "${niche}" niche.

Include:
# SITE ARCHITECTURE
# TECH STACK (Next.js 14, Tailwind, Supabase)
# PAGE STRUCTURE
- Homepage: hero, features, testimonials, pricing, CTA
- Dashboard: main features
- API routes needed
# DATABASE SCHEMA
# UI DESIGN SYSTEM (colors, fonts, components)
# MONETIZATION INTEGRATION (how it makes money)
# SEO STRATEGY
# LAUNCH CHECKLIST
# CODE SNIPPETS (most critical parts)

Make it production-ready and professional.`,
      2000
    );
  }

  async designApp(appIdea: string) {
    return await ai(
      `You are a senior mobile app architect. Design React Native apps.`,
      `Design a complete mobile app for: "${appIdea}"

Include:
# APP OVERVIEW
# CORE FEATURES (top 5)
# SCREEN FLOW
# TECH STACK (React Native + Expo)
# STATE MANAGEMENT
# API INTEGRATIONS
# MONETIZATION (ads, IAP, subscription)
# APP STORE STRATEGY
# MVP DEVELOPMENT PLAN (30 days)
# CODE SKELETON (key screens)`,
      1800
    );
  }

  async buildAITool(toolIdea: string) {
    return await ai(
      `You are an AI product builder. Create profitable AI tools.`,
      `Build an AI-powered web tool: "${toolIdea}"

Include:
# TOOL DESCRIPTION
# HOW IT WORKS
# API INTEGRATIONS (free tiers)
# NEXT.JS CODE STRUCTURE
# KEY API ROUTES
# UI COMPONENTS
# PRICING MODEL (freemium)
# USER ACQUISITION
# REVENUE PROJECTIONS
# COMPLETE CODE EXAMPLE (most important parts)`,
      2000
    );
  }
}

// ============================================
// FREELANCE SYSTEM
// ============================================

export class FreelanceSystem {
  async createGigProposal(skill: string, platform: string) {
    return await ai(
      `You are a top-rated freelancer on ${platform}. Write winning proposals.`,
      `Create a complete freelance gig for: "${skill}" on ${platform}

Include:
# GIG TITLE (SEO optimized)
# GIG DESCRIPTION (compelling, keyword-rich)
# PACKAGES (Basic/Standard/Premium with prices)
# FAQ (5 common questions)
# PORTFOLIO IDEAS (what to show)
# PROPOSAL TEMPLATE (for applying to jobs)
# PRICING STRATEGY
# HOW TO GET FIRST CLIENT IN 7 DAYS
# SCALING TO $1000/month`,
      1500
    );
  }

  async findOpportunities(skills: string[]) {
    return await ai(
      `You are a freelance opportunity analyst. Find high-paying opportunities.`,
      `Find the best freelance opportunities for these skills: ${skills.join(", ")}

For each opportunity include:
- Platform (Fiverr/Upwork/Toptal/LinkedIn)
- Service to offer
- Price range
- Competition level (1-10)
- Demand level (1-10)
- Time to first client
- Monthly potential
- Action steps to start TODAY

Sort by easiest + highest paying first.`,
      1500
    );
  }

  async writeProposal(jobTitle: string, clientNeeds: string) {
    return await ai(
      `You are a professional freelancer with 100% job success rate.`,
      `Write a winning proposal for:
Job: "${jobTitle}"
Client needs: "${clientNeeds}"

Write a compelling, personalized proposal that:
- Addresses their exact needs
- Shows relevant experience
- Provides a clear solution
- Has a strong CTA
- Is under 300 words
- Feels human, not AI`,
      600
    );
  }
}

// ============================================
// AFFILIATE SYSTEM
// ============================================

export class AffiliateSystem {
  async findPrograms(niche: string) {
    return await ai(
      `You are an affiliate marketing expert with 10 years experience.`,
      `Find the best affiliate programs for "${niche}" niche.

For each program include:
- Program name + signup URL
- Commission rate
- Cookie duration
- Average order value
- Monthly earning potential
- Content ideas to promote it
- How to get approved

Rank by highest earning potential.
Include programs for: Amazon, ShareASale, CJ, ClickBank, and direct brand programs.`,
      1500
    );
  }

  async createContent(product: string, platform: string) {
    return await ai(
      `You are an expert affiliate content creator.`,
      `Create affiliate content for "${product}" on ${platform}:

${platform === "youtube"
  ? `- Video title + hook
- Full review script (5 min)
- Comparison video idea
- SEO description with affiliate disclaimer
- Best call-to-action`
  : platform === "instagram"
    ? `- Reel script (30 sec)
- Caption with CTA
- Story sequence (5 slides)
- Bio link strategy`
    : `- Blog post outline
- SEO title + meta
- Review structure
- Comparison table
- CTA placement`}

Make it convert well and feel authentic.`,
      1200
    );
  }
}

// ============================================
// MASTER CEO — orchestrates everything
// ============================================

export class MasterCEO {
  incomeTracker: IncomeTracker;
  agentFactory: AgentFactory;
  moneyMachine: MoneyMachine;
  instagramManager: InstagramManager;
  webAppBuilder: WebAppBuilder;
  freelanceSystem: FreelanceSystem;
  affiliateSystem: AffiliateSystem;
  isRunning: boolean;
  version: string;

  constructor() {
    this.incomeTracker = new IncomeTracker();
    this.agentFactory = new AgentFactory();
    this.moneyMachine = new MoneyMachine(this.incomeTracker);
    this.instagramManager = new InstagramManager();
    this.webAppBuilder = new WebAppBuilder();
    this.freelanceSystem = new FreelanceSystem();
    this.affiliateSystem = new AffiliateSystem();
    this.isRunning = true;
    this.version = "CEO-2030.1.0";
  }

  async executeGoal(goal: string, niche: string) {
    const plan = await aiJSON(
      `You are a CEO AI that turns goals into executable plans.
Always return valid JSON only.`,
      `Goal: "${goal}"
Niche: "${niche}"

Create an execution plan. Return JSON:
{
  "understanding": "what the goal means",
  "category": "youtube|instagram|website|app|freelance|affiliate|saas",
  "priority": 9,
  "steps": ["step1", "step2", "step3"],
  "agents_needed": ["agent1", "agent2"],
  "income_potential": "$500/month",
  "time_to_first_income": "30 days",
  "immediate_action": "do this first TODAY"
}`,
      500
    );

    return plan;
  }

  async buildEmpire(niche: string) {
    const [incomeStreams, instagramPlan, freelanceOpps] = await Promise.all([
      this.moneyMachine.buildAllStreams(niche),
      this.instagramManager.buildGrowthPlan(niche, 0),
      this.freelanceSystem.findOpportunities([
        "video editing",
        "content creation",
        "AI automation",
        niche,
      ]),
    ]);

    const totalEstimate = await this.incomeTracker.getTotalEstimate();

    return {
      niche,
      incomeStreams: incomeStreams.streams.length,
      totalMonthlyEstimate: totalEstimate,
      instagramPlan,
      freelanceOpps,
      version: this.version,
      builtAt: new Date().toISOString(),
    };
  }

  async getStatus() {
    const [sources, agents] = await Promise.all([
      this.incomeTracker.getSources(),
      this.agentFactory.getAgents(),
    ]);

    const total = sources.reduce(
      (sum: number, s: any) => sum + (s.estimatedMonthly || 0),
      0
    );

    return {
      version: this.version,
      running: this.isRunning,
      incomeSources: sources.length,
      customAgents: agents.length,
      estimatedMonthlyIncome: total,
      sources: sources.slice(0, 5),
      agents: agents.slice(0, 5),
    };
  }
}

let ceoInstance: MasterCEO | null = null;

export function getMasterCEO(): MasterCEO {
  if (!ceoInstance) ceoInstance = new MasterCEO();
  return ceoInstance;
}

export default MasterCEO;
