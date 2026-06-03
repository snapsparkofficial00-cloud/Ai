import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

// This runs continuously via cron-job.org
let isRunning = false;
let lastRunTime: Date | null = null;
let taskCount = 0;

export async function GET() {
  if (isRunning) {
    return NextResponse.json({ 
      status: "already_running", 
      lastRun: lastRunTime,
      tasksCompleted: taskCount 
    });
  }

  isRunning = true;
  const startTime = Date.now();

  try {
    // Execute active tasks
    const results = await executeActiveTasks();
    
    taskCount += results.completed;
    lastRunTime = new Date();

    return NextResponse.json({
      status: "success",
      duration: `${(Date.now() - startTime) / 1000}s`,
      tasksCompleted: results.completed,
      tasksFailed: results.failed,
      lastRun: lastRunTime,
      totalTasksCompleted: taskCount
    });

  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  } finally {
    isRunning = false;
  }
}

async function executeActiveTasks() {
  let completed = 0;
  let failed = 0;

  const GROQ_KEY = process.env.GROQ_API_KEY;
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Task 1: Check for pending content generation
  try {
    if (SUPABASE_URL && SUPABASE_KEY) {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/tasks?status=eq.pending&limit=5`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
      });
      const pendingTasks = await res.json();
      
      for (const task of pendingTasks) {
        // Process pending task
        await fetch(`${process.env.NEXT_PUBLIC_URL}/api/youtube/autonomous`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "generate", niche: task.niche || "Supercars" })
        }).catch(() => {});
        completed++;
      }
    }
  } catch (e) {}

  // Task 2: Analyze trending topics
  try {
    if (GROQ_KEY) {
      await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: "Analyze current YouTube trends and return top 3 viral topics. Return as JSON." }],
          temperature: 0.7,
          max_tokens: 200,
        }),
      });
      completed++;
    }
  } catch (e) { failed++; }

  // Task 3: Update learning memory
  try {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/youtube/learn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "auto_learn" })
    }).catch(() => {});
    completed++;
  } catch (e) { failed++; }

  return { completed, failed };
}
