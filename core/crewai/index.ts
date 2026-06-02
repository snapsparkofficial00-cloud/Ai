// core/creawai/index.ts - Complete AI Workflow Engine

import { runAIWorkflow, runQuickWorkflow, runFullWorkflow } from "../../app/lib/ai-engine";
import { detectTrends, getViralTopics, analyzeTopicPotential } from "../../app/lib/agents/trend";
import { ceoDecision, runCEOStrategy, getCEORecommendations } from "../../app/lib/agents/ceo";
import { getChannelHealth } from "../../app/lib/agents/channelHealth";
import { saveMemory, recallMemories, learnFromSuccess } from "../../app/lib/agents/memory";
import { addToSchedule, getUpcomingContent, calculateOptimalPostingTime } from "../../app/lib/youtube/scheduler";
import { assessQuality, optimizeScript, generateOptimizedThumbnailPrompt } from "../../app/lib/quality/qualityAgent";

export interface WorkflowResult {
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
  decision?: any;
  trends?: any[];
  channelHealth?: any;
}

export interface CREAWIConfig {
  niche: string;
  type: "short" | "long";
  autoSchedule?: boolean;
  qualityThreshold?: number;
  maxRetries?: number;
}

// Main CREAWAI Engine
export class CREAWAI {
  private config: CREAWIConfig;
  private memory: any[] = [];
  private performanceData: any[] = [];

  constructor(config: CREAWIConfig) {
    this.config = {
      niche: config.niche,
      type: config.type || "short",
      autoSchedule: config.autoSchedule || true,
      qualityThreshold: config.qualityThreshold || 60,
      maxRetries: config.maxRetries || 2,
    };
  }

  // Initialize the AI engine
  async initialize(): Promise<boolean> {
    console.log(`🤖 CREAWAI Initialized for niche: ${this.config.niche}`);
    
    // Load past memories
    const pastMemories = await recallMemories("strategy", 10);
    this.memory = pastMemories;
    
    // Check channel health
    const health = await getChannelHealth();
    console.log(`📊 Channel Health: ${health.status} (Score: ${health.score})`);
    
    return true;
  }

  // Generate content using AI
  async generateContent(): Promise<WorkflowResult> {
    console.log(`🎬 Generating ${this.config.type} content for: ${this.config.niche}`);
    
    const result = await runAIWorkflow(this.config.niche, this.config.type);
    
    // Check quality
    if (result.qualityScore && result.qualityScore < this.config.qualityThreshold && this.config.maxRetries > 0) {
      console.log(`⚠️ Quality score ${result.qualityScore} below threshold. Retrying...`);
      this.config.maxRetries--;
      return this.generateContent();
    }
    
    // Save to memory
    if (result.success) {
      await saveMemory("strategy", `Generated ${this.config.type} video for ${this.config.niche}`, result.qualityScore || 70, {
        title: result.title,
        niche: this.config.niche,
      });
    }
    
    return result;
  }

  // Quick generate (Shorts)
  async quickGenerate(): Promise<WorkflowResult> {
    return await runQuickWorkflow(this.config.niche);
  }

  // Full generate (Long video)
  async fullGenerate(): Promise<WorkflowResult> {
    return await runFullWorkflow(this.config.niche);
  }

  // Get CEO strategy
  async getStrategy(): Promise<any> {
    return await runCEOStrategy(this.config.niche);
  }

  // Get trending topics
  async getTrends(): Promise<any[]> {
    return await detectTrends(this.config.niche);
  }

  // Get viral topic ideas
  async getViralIdeas(limit: number = 10): Promise<string[]> {
    return await getViralTopics(this.config.niche, limit);
  }

  // Analyze topic potential
  async analyzeTopic(topic: string): Promise<any> {
    return await analyzeTopicPotential(topic);
  }

  // Schedule content
  async scheduleContent(title: string, script: string, thumbnailUrl: string, voiceUrl: string): Promise<any> {
    const optimalTime = await calculateOptimalPostingTime(this.config.niche);
    
    return await addToSchedule({
      title,
      niche: this.config.niche,
      type: this.config.type,
      script,
      thumbnailUrl,
      voiceUrl,
      scheduledFor: optimalTime,
    });
  }

  // Get upcoming schedule
  async getSchedule(): Promise<any[]> {
    return await getUpcomingContent(30);
  }

  // Assess content quality
  async assessQuality(script: string, thumbnailUrl: string, voiceUrl?: string): Promise<any> {
    return await assessQuality(script, thumbnailUrl, voiceUrl);
  }

  // Optimize script
  async optimizeScript(script: string): Promise<string> {
    return await optimizeScript(script, this.config.niche);
  }

  // Generate thumbnail prompt
  async generateThumbnailPrompt(title: string): Promise<string> {
    return await generateOptimizedThumbnailPrompt(title, this.config.niche);
  }

  // Learn from performance
  async learnFromPerformance(videoTitle: string, performance: any): Promise<void> {
    await learnFromSuccess(videoTitle, performance);
    this.performanceData.push({ videoTitle, performance, timestamp: new Date() });
  }

  // Get CEO recommendations
  async getRecommendations(): Promise<string[]> {
    return await getCEORecommendations(this.performanceData);
  }

  // Get channel health
  async getChannelHealth(): Promise<any> {
    return await getChannelHealth();
  }

  // Run full autonomous workflow
  async runAutonomousWorkflow(): Promise<{
    content: WorkflowResult;
    strategy: any;
    trends: any[];
    recommendations: string[];
    health: any;
  }> {
    console.log("🚀 Running full autonomous workflow...");
    
    const [content, strategy, trends, recommendations, health] = await Promise.all([
      this.generateContent(),
      this.getStrategy(),
      this.getTrends(),
      this.getRecommendations(),
      this.getChannelHealth(),
    ]);
    
    return {
      content,
      strategy,
      trends: trends.slice(0, 5),
      recommendations,
      health,
    };
  }

  // Get memory insights
  async getMemoryInsights(): Promise<any[]> {
    return await recallMemories("strategy", 20);
  }

  // Update configuration
  updateConfig(newConfig: Partial<CREAWIConfig>): void {
    this.config = { ...this.config, ...newConfig };
    console.log(`⚙️ Config updated:`, this.config);
  }

  // Get current config
  getConfig(): CREAWIConfig {
    return this.config;
  }

  // Get performance summary
  getPerformanceSummary(): any {
    if (this.performanceData.length === 0) {
      return { message: "No performance data yet", score: 0 };
    }
    
    const avgScore = this.performanceData.reduce((acc, p) => acc + (p.performance?.score || 0), 0) / this.performanceData.length;
    
    return {
      totalVideos: this.performanceData.length,
      averageScore: avgScore,
      bestVideo: this.performanceData.sort((a, b) => (b.performance?.score || 0) - (a.performance?.score || 0))[0],
      timestamp: new Date().toISOString(),
    };
  }
}

// Singleton instance for global use
let globalCREAWAI: CREAWAI | null = null;

export function getCREAWAI(niche?: string): CREAWAI {
  if (!globalCREAWAI && niche) {
    globalCREAWAI = new CREAWAI({ niche, type: "short" });
  }
  if (!globalCREAWAI) {
    throw new Error("CREAWAI not initialized. Call initCREAWAI first.");
  }
  return globalCREAWAI;
}

export async function initCREAWAI(niche: string, type: "short" | "long" = "short"): Promise<CREAWAI> {
  const instance = new CREAWAI({ niche, type });
  await instance.initialize();
  globalCREAWAI = instance;
  return instance;
}

// Quick functions for direct use
export async function quickGenerate(niche: string): Promise<WorkflowResult> {
  const engine = await initCREAWAI(niche, "short");
  return await engine.quickGenerate();
}

export async function fullGenerate(niche: string): Promise<WorkflowResult> {
  const engine = await initCREAWAI(niche, "long");
  return await engine.fullGenerate();
}

export async function getTrendingForNiche(niche: string): Promise<any[]> {
  const engine = await initCREAWAI(niche);
  return await engine.getTrends();
}

export async function analyzeTopic(niche: string, topic: string): Promise<any> {
  const engine = await initCREAWAI(niche);
  return await engine.analyzeTopic(topic);
}

export default CREAWAI;
