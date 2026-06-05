// core/brain/index.ts - AI BRAIN 2030 ADVANCED

const GROQ_KEY = process.env.GROQ_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ============================================
// SUPABASE HELPERS
// ============================================

async function dbInsert(table: string, data: any) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY!,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(data),
    });
  } catch {}
}

async function dbSelect(table: string, filter?: string, limit = 50) {
  try {
    const url = `${SUPABASE_URL}/rest/v1/${table}?select=*${filter ? `&${filter}` : ""}&order=created_at.desc&limit=${limit}`;
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY!,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}

async function groqCall(
  systemPrompt: string,
  userPrompt: string,
  maxTokens = 500,
  jsonMode = false
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
          model: "llama-3.3-70b-versatile",
          temperature: 0.7,
          max_tokens: maxTokens,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      }
    );
    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content || "";
    if (jsonMode) {
      try {
        const clean = content.replace(/```json|```/g, "").trim();
        return JSON.parse(clean);
      } catch {
        return {};
      }
    }
    return content;
  } catch {
    return jsonMode ? {} : "";
  }
}

// ============================================
// MEMORY SYSTEM — persists to Supabase
// ============================================

export class MemorySystem {
  async store(experience: {
    type: string;
    topic: string;
    result: any;
    score?: number;
    metadata?: any;
  }) {
    await dbInsert("brain_memory", {
      type: experience.type,
      topic: experience.topic,
      result: JSON.stringify(experience.result),
      score: experience.score || 0,
      metadata: JSON.stringify(experience.metadata || {}),
      created_at: new Date().toISOString(),
    });
  }

  async recall(type?: string, limit = 20) {
    const filter = type ? `type=eq.${type}` : undefined;
    const rows = await dbSelect("brain_memory", filter, limit);
    return rows.map((r: any) => ({
      ...r,
      result: this.safeParse(r.result),
      metadata: this.safeParse(r.metadata),
    }));
  }

  async getTopPerforming(limit = 10) {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/brain_memory?select=*&order=score.desc&limit=${limit}`,
        {
          headers: {
            apikey: SUPABASE_KEY!,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        }
      );
      const rows = res.ok ? await res.json() : [];
      return rows.map((r: any) => ({
        ...r,
        result: this.safeParse(r.result),
      }));
    } catch {
      return [];
    }
  }

  async getPatterns() {
    const all = await this.recall(undefined, 100);
    const topics: Record<string, number[]> = {};
    all.forEach((m: any) => {
      if (!topics[m.topic]) topics[m.topic] = [];
      topics[m.topic].push(m.score || 0);
    });
    return Object.entries(topics).map(([topic, scores]) => ({
      topic,
      count: scores.length,
      avgScore: scores.reduce((a, b) => a + b, 0) / scores.length,
      maxScore: Math.max(...scores),
    })).sort((a, b) => b.avgScore - a.avgScore);
  }

  safeParse(val: any) {
    try { return typeof val === "string" ? JSON.parse(val) : val; } catch { return val; }
  }
}

// ============================================
// VIRAL PREDICTOR — ML scoring engine
// ============================================

export class ViralPredictor {
  private memory: MemorySystem;

  constructor(memory: MemorySystem) {
    this.memory = memory;
  }

  async predictViralScore(topic: string, niche?: string) {
    // Get historical patterns
    const patterns = await this.memory.getPatterns();
    const topPatterns = patterns.slice(0, 5).map((p) => `${p.topic}: avg ${Math.round(p.avgScore)}/100`).join(", ");

    const result = await groqCall(
      `You are a YouTube viral prediction AI. 
Analyze topics and predict viral potential 0-100.
Historical top patterns: ${topPatterns || "no data yet"}.
Always return valid JSON only.`,
      `Predict viral score for: "${topic}" in niche: "${niche || "general"}".
Return JSON: {
  "score": 85,
  "confidence": 80,
  "factors": ["factor1", "factor2"],
  "recommendedHook": "hook text",
  "bestPostingTime": "6:00 PM",
  "estimatedViews": "10K-50K",
  "competitionLevel": "medium",
  "improvementTips": ["tip1", "tip2"]
}`,
      300,
      true
    );

    // Store prediction
    await this.memory.store({
      type: "viral_prediction",
      topic,
      result,
      score: result.score || 75,
    });

    return {
      score: result.score || 75,
      confidence: result.confidence || 70,
      factors: result.factors || [],
      recommendedHook: result.recommendedHook || "",
      bestPostingTime: result.bestPostingTime || "6:00 PM",
      estimatedViews: result.estimatedViews || "Unknown",
      competitionLevel: result.competitionLevel || "medium",
      improvementTips: result.improvementTips || [],
    };
  }

  async batchPredict(topics: string[]) {
    return await Promise.all(
      topics.map((t) => this.predictViralScore(t))
    );
  }
}

// ============================================
// DECISION ENGINE — autonomous AI decisions
// ============================================

export class DecisionEngine {
  private memory: MemorySystem;
  lastDecision: any;

  constructor(memory: MemorySystem) {
    this.memory = memory;
    this.lastDecision = null;
  }

  async decideNextAction(context: {
    currentNiche: string;
    subscribers?: number;
    recentViews?: number;
    lastVideoType?: string;
    dayOfWeek?: string;
  }) {
    const patterns = await this.memory.getPatterns();
    const topContent = patterns[0]?.topic || "BMW M5";
    const now = new Date();
    const hour = now.getHours();
    const day = now.toLocaleDateString("en-US", { weekday: "long" });

    const result = await groqCall(
      `You are an autonomous YouTube growth AI decision engine.
Make data-driven decisions about content strategy.
Always return valid JSON only.`,
      `Channel context:
- Niche: ${context.currentNiche}
- Subscribers: ${context.subscribers || 0}
- Recent views: ${context.recentViews || 0}
- Last video: ${context.lastVideoType || "unknown"}
- Top performing topic: ${topContent}
- Current time: ${hour}:00, ${day}

Decide the optimal next action. Return JSON:
{
  "action": "create_short",
  "reason": "why this action",
  "priority": 8,
  "estimatedOutcome": "+1000 views",
  "contentTopic": "specific topic",
  "contentType": "short",
  "language": "hindi",
  "scheduledFor": "today 6PM",
  "urgency": "high",
  "alternativeAction": "alternative if this fails"
}`,
      400,
      true
    );

    this.lastDecision = result;

    await this.memory.store({
      type: "decision",
      topic: context.currentNiche,
      result,
      score: result.priority * 10 || 70,
    });

    return result;
  }

  async generateWeeklyPlan(niche: string) {
    const patterns = await this.memory.getPatterns();
    const insights = patterns.slice(0, 3).map((p) =>
      `${p.topic}: ${Math.round(p.avgScore)}/100`
    ).join(", ");

    return await groqCall(
      `You are a YouTube channel strategy AI. Create detailed weekly content plans.`,
      `Create a 7-day content plan for "${niche}" channel.
Historical insights: ${insights || "building data"}.
Include: 1 long video + 3 shorts per week.
All content in Hindi.
Return as structured plan with specific topics, hooks, and upload times.`,
      1000
    );
  }
}

// ============================================
// SELF IMPROVEMENT ENGINE — learns over time
// ============================================

export class SelfImprovementEngine {
  version: number;
  improvements: string[];
  private memory: MemorySystem;

  constructor(memory: MemorySystem) {
    this.memory = memory;
    this.version = 1;
    this.improvements = [];
  }

  async analyze() {
    const topPerforming = await this.memory.getTopPerforming(10);
    const patterns = await this.memory.getPatterns();

    if (topPerforming.length === 0) {
      return {
        insights: ["Not enough data yet. Keep generating content."],
        recommendations: ["Focus on BMW and supercar content"],
        version: this.version,
      };
    }

    const topTopics = patterns
      .slice(0, 5)
      .map((p) => p.topic)
      .join(", ");

    const insights = await groqCall(
      `You are a YouTube AI analyst. Analyze performance data and give actionable insights.`,
      `Top performing topics: ${topTopics}
Total memories: ${topPerforming.length}
Average score: ${Math.round(topPerforming.reduce((a: any, b: any) => a + (b.score || 0), 0) / topPerforming.length)}

Give 5 specific insights to improve content performance. Be concrete and actionable.`,
      500
    );

    this.version++;
    this.improvements.push(`v${this.version}: Analyzed ${topPerforming.length} data points`);

    await this.memory.store({
      type: "self_improvement",
      topic: "system_analysis",
      result: { insights, version: this.version },
      score: 80,
    });

    return {
      insights,
      topTopics: patterns.slice(0, 5),
      version: this.version,
      improvements: this.improvements,
    };
  }

  async evolve(performanceData: any) {
    this.version++;
    const result = await groqCall(
      `You are a self-improving AI system. Suggest optimizations based on performance.`,
      `Performance data: ${JSON.stringify(performanceData).slice(0, 500)}
Suggest 3 specific improvements to the content strategy.`,
      300
    );
    return {
      version: this.version,
      improvements: result || "Content strategy optimized",
      timestamp: new Date().toISOString(),
    };
  }
}

// ============================================
// TREND ANALYZER — real-time trend detection
// ============================================

export class TrendAnalyzer {
  async analyzeTrends(niche: string) {
    const result = await groqCall(
      `You are a YouTube trend analysis AI with knowledge of viral content patterns.
Always return valid JSON only.`,
      `Analyze current YouTube trends for niche: "${niche}".
Return JSON:
{
  "hotTopics": ["topic1", "topic2", "topic3"],
  "risingKeywords": ["kw1", "kw2"],
  "viralFormats": ["format1", "format2"],
  "competitorGaps": ["gap1", "gap2"],
  "bestTimeToPost": "6:00 PM IST",
  "trendScore": 85,
  "hindiContentOpportunity": "specific opportunity",
  "recommendedNextVideo": "specific video idea"
}`,
      500,
      true
    );

    return result;
  }

  async compareWithCompetitors(niche: string, channelSize: number) {
    return await groqCall(
      `You are a YouTube competitive analysis AI.`,
      `For a ${channelSize} subscriber channel in "${niche}" niche:
1. What are competitors doing right?
2. What content gaps exist?
3. How to differentiate?
4. What would go viral in Hindi for this niche?
Give specific, actionable analysis.`,
      600
    );
  }
}

// ============================================
// CONTENT OPTIMIZER — optimize existing content
// ============================================

export class ContentOptimizer {
  async optimizeTitle(title: string, niche: string) {
    const result = await groqCall(
      `You are a YouTube SEO and title optimization expert. Return valid JSON only.`,
      `Optimize this title: "${title}" for niche: "${niche}".
Return JSON:
{
  "optimizedTitle": "better title",
  "hindiTitle": "Hindi version",
  "clickThroughRate": 85,
  "seoScore": 90,
  "emotionalTrigger": "curiosity",
  "keywords": ["kw1", "kw2"],
  "alternativeTitles": ["alt1", "alt2"]
}`,
      400,
      true
    );
    return result;
  }

  async optimizeDescription(topic: string) {
    return await groqCall(
      `You are a YouTube SEO expert. Write optimized descriptions.`,
      `Write an SEO-optimized YouTube description for: "${topic}".
Include: keyword-rich first 2 lines, timestamps placeholder, links section, hashtags.
Mix Hindi and English naturally.`,
      600
    );
  }

  async generateThumbnailConcept(title: string, niche: string) {
    const result = await groqCall(
      `You are a viral YouTube thumbnail designer. Return valid JSON only.`,
      `Design a viral thumbnail for: "${title}" in "${niche}".
Return JSON:
{
  "mainText": "bold text overlay",
  "backgroundColor": "#ff0000",
  "emotionalExpression": "shocked/excited",
  "visualElements": ["element1", "element2"],
  "colorScheme": ["#color1", "#color2"],
  "layout": "person on left, text right",
  "viralScore": 88
}`,
      300,
      true
    );
    return result;
  }
}

// ============================================
// MAIN AI BRAIN — orchestrates everything
// ============================================

export class AIBrain2030 {
  memory: MemorySystem;
  predictor: ViralPredictor;
  decider: DecisionEngine;
  selfImprover: SelfImprovementEngine;
  trendAnalyzer: TrendAnalyzer;
  contentOptimizer: ContentOptimizer;
  isRunning: boolean;
  version: string;
  startTime: number;

  constructor() {
    this.memory = new MemorySystem();
    this.predictor = new ViralPredictor(this.memory);
    this.decider = new DecisionEngine(this.memory);
    this.selfImprover = new SelfImprovementEngine(this.memory);
    this.trendAnalyzer = new TrendAnalyzer();
    this.contentOptimizer = new ContentOptimizer();
    this.isRunning = false;
    this.version = "2030.1.0";
    this.startTime = Date.now();
  }

  async initialize() {
    this.isRunning = true;
    await this.memory.store({
      type: "system_event",
      topic: "brain_initialized",
      result: { version: this.version },
      score: 100,
    });
    return true;
  }

  async think(input: {
    goal: string;
    niche: string;
    context?: any;
  }) {
    // Full thinking pipeline
    const [viral, decision, trends] = await Promise.all([
      this.predictor.predictViralScore(input.goal, input.niche),
      this.decider.decideNextAction({
        currentNiche: input.niche,
        ...input.context,
      }),
      this.trendAnalyzer.analyzeTrends(input.niche),
    ]);

    const thought = {
      goal: input.goal,
      viralPrediction: viral,
      decision,
      trends,
      recommendation: decision.contentTopic || input.goal,
      confidence: viral.confidence,
      timestamp: new Date().toISOString(),
    };

    await this.memory.store({
      type: "thought",
      topic: input.goal,
      result: thought,
      score: viral.score,
    });

    return thought;
  }

  async fullAnalysis(niche: string, subscribers: number) {
    const [patterns, trends, improvement, weeklyPlan] = await Promise.all([
      this.memory.getPatterns(),
      this.trendAnalyzer.analyzeTrends(niche),
      this.selfImprover.analyze(),
      this.decider.generateWeeklyPlan(niche),
    ]);

    return {
      patterns: patterns.slice(0, 10),
      trends,
      improvement,
      weeklyPlan,
      brainVersion: this.version,
      timestamp: new Date().toISOString(),
    };
  }

  async getStatus() {
    const memories = await this.memory.recall(undefined, 5);
    const patterns = await this.memory.getPatterns();
    const uptime = Math.round((Date.now() - this.startTime) / 1000);

    return {
      version: this.version,
      running: this.isRunning,
      uptime: `${uptime}s`,
      totalMemories: memories.length,
      topPatterns: patterns.slice(0, 3),
      evolutionVersion: this.selfImprover.version,
      lastDecision: this.decider.lastDecision,
      capabilities: [
        "viral_prediction",
        "autonomous_decisions",
        "trend_analysis",
        "self_improvement",
        "content_optimization",
        "weekly_planning",
        "competitor_analysis",
        "hindi_content",
      ],
    };
  }

  async getRecentPerformance() {
    return await this.memory.getTopPerforming(10);
  }
}

// Singleton
let brainInstance: AIBrain2030 | null = null;

export async function getAIBrain(): Promise<AIBrain2030> {
  if (!brainInstance) {
    brainInstance = new AIBrain2030();
    await brainInstance.initialize();
  }
  return brainInstance;
}

export default AIBrain2030;
