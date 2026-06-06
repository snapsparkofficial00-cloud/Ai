import { NextResponse } from "next/server";

const GROQ_KEY = process.env.GROQ_API_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const OPENAI_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: Request) {
  try {
    const { action, prompt, niche, context, tools } = await req.json();

    switch (action) {
      case "deep-think": return await deepThink(prompt, context);
      case "multi-step": return await multiStepPlan(prompt, niche);
      case "self-reflect": return await selfReflect(prompt, context);
      case "tool-use": return await toolUse(prompt, tools);
      case "chain-of-thought": return await chainOfThought(prompt);
      case "memory-recall": return await memoryRecall(niche);
      case "analyze-deep": return await deepAnalyze(prompt);
      case "strategize": return await strategize(prompt, niche);
      case "full-claude-mode": return await fullClaudeMode(prompt, niche);
      default: return NextResponse.json({ error: "Unknown action" });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

// ========== CLAUDE-LEVEL REASONING ==========

async function deepThink(prompt: string, context?: string) {
  // Claude's Deep Reasoning System
  const systemPrompt = `You are an advanced AI with deep reasoning capabilities like Claude.

THINKING PROCESS:
1. ANALYZE: Break down the problem into components
2. CONTEXT: Consider all relevant factors and context
3. REASON: Apply logical step-by-step reasoning
4. EVALUATE: Consider multiple perspectives and outcomes
5. CONCLUDE: Provide well-reasoned final answer

${context ? `CONTEXT: ${context}` : ""}

Think deeply and provide a comprehensive analysis.`;

  const result = await callBestAI(systemPrompt, prompt, 4000);
  return NextResponse.json({ success: true, reasoning: result });
}

async function multiStepPlan(prompt: string, niche: string) {
  // Claude's Multi-Step Planning
  const systemPrompt = `You are a strategic AI planner. For the goal: "${prompt}" in niche: "${niche}"

Create a DETAILED MULTI-STEP PLAN:

PHASE 1: ANALYSIS (What we know, what we need)
PHASE 2: STRATEGY (3 possible approaches)
PHASE 3: EXECUTION (Step-by-step timeline)
PHASE 4: RESOURCES (What's needed)
PHASE 5: RISKS (What could go wrong + solutions)
PHASE 6: METRICS (How to measure success)
PHASE 7: OPTIMIZATION (How to improve continuously)

Think like a CEO, engineer, and strategist combined.`;

  const result = await callBestAI(systemPrompt, `Goal: ${prompt}\nNiche: ${niche}`, 4000);
  return NextResponse.json({ success: true, plan: result });
}

async function selfReflect(prompt: string, context?: string) {
  // Claude's Self-Reflection (checks own work)
  const systemPrompt = `You are a self-reflective AI. Analyze the following work critically.

SELF-REFLECTION CHECKLIST:
1. ACCURACY: Are there any factual errors?
2. COMPLETENESS: Is anything missing?
3. CLARITY: Is it easy to understand?
4. DEPTH: Is it deep enough or superficial?
5. IMPROVEMENT: How can it be better?
6. ALTERNATIVES: What other approaches exist?
7. BIAS: Any assumptions or biases?

Be brutally honest. Identify flaws and improvements.

${context ? `ORIGINAL WORK: ${context}` : ""}`;

  const result = await callBestAI(systemPrompt, prompt, 4000);
  return NextResponse.json({ success: true, reflection: result });
}

async function toolUse(prompt: string, tools?: any) {
  // Claude's Tool Use Capability
  const availableTools = tools || {
    "web_search": "Search the internet for information",
    "code_execute": "Write and run code",
    "data_analyze": "Analyze data and create insights",
    "api_call": "Call external APIs",
    "file_read": "Read and process files",
    "image_generate": "Generate images",
  };

  const systemPrompt = `You have access to these TOOLS:
${JSON.stringify(availableTools, null, 2)}

For the task: "${prompt}"

Determine:
1. WHICH TOOLS to use and in what order
2. What INPUT each tool needs
3. What OUTPUT to expect
4. How to COMBINE results
5. FALLBACK plan if tools fail

Think like an engineer using tools to solve problems.`;

  const result = await callBestAI(systemPrompt, prompt, 4000);
  return NextResponse.json({ success: true, toolPlan: result, availableTools });
}

async function chainOfThought(prompt: string) {
  // Claude's Chain of Thought
  const systemPrompt = `Think step by step to solve this problem. Show your COMPLETE reasoning:

Step 1: UNDERSTAND - What exactly is being asked?
Step 2: DECOMPOSE - Break into smaller parts
Step 3: RESEARCH - What do I need to know?
Step 4: ANALYZE - Examine each part
Step 5: SYNTHESIZE - Combine insights
Step 6: SOLUTION - Provide the answer
Step 7: VERIFY - Check if answer is correct

Show ALL your thinking. Don't skip steps.`;

  const result = await callBestAI(systemPrompt, prompt, 4000);
  return NextResponse.json({ success: true, chainOfThought: result });
}

async function memoryRecall(niche: string) {
  // Claude-like Memory System
  const systemPrompt = `You have access to ALL previous conversations about: "${niche}"

Recall and summarize:
1. PAST DECISIONS: What was decided before?
2. LEARNINGS: What worked? What failed?
3. PATTERNS: Any recurring themes?
4. PREFERENCES: User's preferred approaches
5. CONTEXT: Important background information

Provide a comprehensive memory summary.`;

  const result = await callBestAI(systemPrompt, `Recall everything about: ${niche}`, 4000);
  return NextResponse.json({ success: true, memory: result });
}

async function deepAnalyze(prompt: string) {
  // Claude's Deep Analysis
  const systemPrompt = `Perform a DEEP ANALYSIS:

1. SURFACE LEVEL: What's immediately obvious?
2. PATTERNS: What patterns emerge?
3. CONNECTIONS: How does this connect to other things?
4. ROOT CAUSES: What's REALLY causing this?
5. IMPLICATIONS: What does this mean for the future?
6. OPPORTUNITIES: What opportunities exist?
7. THREATS: What risks should we watch?
8. RECOMMENDATIONS: What should we do?

Go DEEP. Think like a scientist + detective + strategist.`;

  const result = await callBestAI(systemPrompt, prompt, 4000);
  return NextResponse.json({ success: true, analysis: result });
}

async function strategize(prompt: string, niche: string) {
  // Claude's Strategic Thinking
  const systemPrompt = `Act as a WORLD-CLASS STRATEGIST for: "${niche}"

Create a COMPREHENSIVE STRATEGY:

1. VISION: Where should we be in 1 year?
2. MISSION: What's our purpose?
3. SWOT ANALYSIS: Strengths, Weaknesses, Opportunities, Threats
4. COMPETITIVE ADVANTAGE: What makes us unique?
5. GO TO MARKET: How to launch and grow?
6. REVENUE MODEL: How to make money?
7. GROWTH HACKS: Unconventional tactics
8. 90-DAY PLAN: Exact execution timeline
9. KPIs: What to measure?
10. PIVOT PLAN: When and how to change direction

Think like Steve Jobs, Elon Musk, and Sun Tzu combined.`;

  const result = await callBestAI(systemPrompt, prompt, 4000);
  return NextResponse.json({ success: true, strategy: result });
}

async function fullClaudeMode(prompt: string, niche: string) {
  // FULL CLAUDE EXPERIENCE - All capabilities combined
  const [reasoning, plan, reflection, analysis, strategy] = await Promise.all([
    deepThink(prompt),
    multiStepPlan(prompt, niche),
    selfReflect(prompt),
    deepAnalyze(prompt),
    strategize(prompt, niche),
  ]);

  return NextResponse.json({
    success: true,
    mode: "FULL CLAUDE MODE ACTIVATED",
    capabilities: {
      deepReasoning: reasoning,
      strategicPlanning: plan,
      selfReflection: reflection,
      deepAnalysis: analysis,
      strategy: strategy,
    },
    summary: "All 5 Claude-level capabilities executed. Review each for comprehensive insights.",
  });
}

// ========== BEST AI SELECTOR ==========

async function callBestAI(systemPrompt: string, userPrompt: string, maxTokens: number): Promise<string> {
  // Try OpenAI first (best quality)
  if (OPENAI_KEY) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${OPENAI_KEY}` },
        body: JSON.stringify({
          model: "gpt-4o",
          max_tokens: maxTokens,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      });
      if (res.ok) {
        const data = await res.json();
        return data?.choices?.[0]?.message?.content || "";
      }
    } catch {}
  }

  // Try Groq (fastest)
  if (GROQ_KEY) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: maxTokens,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      });
      if (res.ok) {
        const data = await res.json();
        return data?.choices?.[0]?.message?.content || "";
      }
    } catch {}
  }

  // Try Gemini
  if (GEMINI_KEY) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
            generationConfig: { maxOutputTokens: maxTokens },
          }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      }
    } catch {}
  }

  return "No AI available";
}
