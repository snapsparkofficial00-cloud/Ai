import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getMasterCEO } from "@/core/ceo";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  // 1. Pick the oldest pending task
  const { data: task, error } = await supabase
    .from("task_queue")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: true })
    .limit(1)
    .single();

  if (error || !task) {
    return NextResponse.json({ success: true, message: "No pending tasks" });
  }

  // 2. Mark as processing
  await supabase
    .from("task_queue")
    .update({ status: "processing", started_at: new Date().toISOString() })
    .eq("id", task.id);

  try {
    const ceo = getMasterCEO();
    let result;

    // 3. Execute the task based on its type
    switch (task.type) {
      case "short_video":
        // Reuse your existing auto‑pilot logic – generate a Short
        // (you'll need to move that logic to a shared function)
        result = await generateShortVideo(task.payload.niche);
        break;
      case "long_video":
        result = await generateLongVideo(task.payload.niche);
        break;
      // Add more cases: "income_stream", "freelance_gig", etc.
      default:
        throw new Error(`Unknown task type: ${task.type}`);
    }

    // 4. Mark as completed
    await supabase
      .from("task_queue")
      .update({ status: "completed", finished_at: new Date().toISOString(), result: JSON.stringify(result) })
      .eq("id", task.id);
  } catch (err) {
    // 5. Mark as failed, increment attempts
    const attempts = (task.attempts || 0) + 1;
    await supabase
      .from("task_queue")
      .update({ status: attempts >= 3 ? "failed" : "pending", attempts, error: String(err) })
      .eq("id", task.id);
  }

  return NextResponse.json({ success: true, processed: task.id });
}
