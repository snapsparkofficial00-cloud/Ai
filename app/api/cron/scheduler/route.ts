import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  // 1. Determine what needs to be generated based on your schedule
  const lastShort = await getLastGenerated("short");
  const lastLong = await getLastGenerated("long");
  const lastEmpire = await getLastGenerated("empire"); // ← new
  const now = Date.now();

  const tasks = [];

  if (now - lastShort > 2 * 24 * 60 * 60 * 1000) {
    tasks.push({
      type: "short_video",
      payload: { niche: "BMW Cars" },
    });
  }
  if (now - lastLong > 7 * 24 * 60 * 60 * 1000) {
    tasks.push({
      type: "long_video",
      payload: { niche: "BMW Cars" },
    });
  }

  // 🆕 Build empire once per week
  if (now - lastEmpire > 7 * 24 * 60 * 60 * 1000) {
    tasks.push({
      type: "build_empire",
      payload: { niche: "BMW Cars" }, // or use a dynamic niche variable
    });
  }

  // 2. Insert tasks into the queue (only if not already pending)
  for (const task of tasks) {
    const { error } = await supabase
      .from("task_queue")
      .insert({ type: task.type, payload: task.payload, status: "pending" });
    if (error) console.error("Insert error", error);
  }

  // 3. Update the last generated timestamps
  if (tasks.some(t => t.type === "short_video"))
    await updateLastGenerated("short", now);
  if (tasks.some(t => t.type === "long_video"))
    await updateLastGenerated("long", now);
  if (tasks.some(t => t.type === "build_empire"))
    await updateLastGenerated("empire", now);       // 🆕

  return NextResponse.json({ success: true, tasksEnqueued: tasks.length });
}

async function getLastGenerated(type: string): Promise<number> {
  const { data } = await supabase
    .from("settings")
    .select("value")
    .eq("key", `last_${type}_generated`)
    .single();
  return data?.value || 0;
}

async function updateLastGenerated(type: string, timestamp: number) {
  await supabase
    .from("settings")
    .upsert({ key: `last_${type}_generated`, value: timestamp }, { onConflict: "key" });
}
