import { NextResponse } from "next/server";

interface ActiveTask {
  id: string;
  type: string;
  status: "queued" | "processing" | "completed" | "failed";
  createdAt: Date;
  result?: any;
}

let activeTasks: ActiveTask[] = [];
let taskProcessor: NodeJS.Timeout | null = null;

// Start background processor
if (!taskProcessor) {
  taskProcessor = setInterval(async () => {
    const pendingTasks = activeTasks.filter(t => t.status === "queued");
    
    for (const task of pendingTasks) {
      task.status = "processing";
      
      try {
        // Process based on task type
        if (task.type === "generate_video") {
          const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/youtube/autonomous`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "generate", niche: task.result?.niche || "Supercars" }),
          });
          task.result = await res.json();
          task.status = "completed";
        } else if (task.type === "analyze_trends") {
          // Process trend analysis
          task.status = "completed";
        } else {
          task.status = "completed";
        }
      } catch (error) {
        task.status = "failed";
        task.result = { error: String(error) };
      }
    }
  }, 5000);
}

export async function POST(req: Request) {
  try {
    const { type, data } = await req.json();
    
    const newTask: ActiveTask = {
      id: Date.now().toString(),
      type,
      status: "queued",
      createdAt: new Date(),
      result: data,
    };
    
    activeTasks.unshift(newTask);
    activeTasks = activeTasks.slice(0, 100);
    
    return NextResponse.json({ success: true, taskId: newTask.id });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    activeTasks: activeTasks.filter(t => t.status !== "completed"),
    completedTasks: activeTasks.filter(t => t.status === "completed").length,
    totalTasks: activeTasks.length,
    processorStatus: taskProcessor ? "running" : "stopped",
  });
}
