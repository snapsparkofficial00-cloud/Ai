import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getMasterCEO } from "../../../../core/ceo";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ success: false, error: "Supabase not configured" }, { status: 500 });
  }

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
    let result;

    switch (task.type) {
      case "short_video":
        // Call your existing auto‑pilot endpoint to generate a Short
        const shortRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/youtube/autonomous`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "generate", niche: task.payload.niche, type: "short" }),
        });
        result = await shortRes.json();
        break;

      case "long_video":
        const longRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/youtube/autonomous`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "generate", niche: task.payload.niche, type: "long" }),
        });
        result = await longRes.json();
        break;

      case "build_empire":
        const ceo = getMasterCEO();
        result = await ceo.buildEmpire(task.payload.niche);
        break;

      default:
        throw new Error(`Unknown task type: ${task.type}`);
    }

    // 3. Mark as completed
    await supabase
      .from("task_queue")
      .update({ status: "completed", finished_at: new Date().toISOString(), result: JSON.stringify(result) })
      .eq("id", task.id);

  } catch (err) {
    const attempts = (task.attempts || 0) + 1;
    await supabase
      .from("task_queue")
      .update({
        status: attempts >= 3 ? "failed" : "pending",
        attempts,
        error: String(err),
      })
      .eq("id", task.id);
  }

  return NextResponse.json({ success: true, processed: task.id });
}
