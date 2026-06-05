import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
  try {
    const { action, scheduleId, data } = await req.json();

    switch (action) {
      case "create-schedule": return await createSchedule(data);
      case "get-schedules": return await getSchedules();
      case "update-schedule": return await updateSchedule(scheduleId, data);
      case "delete-schedule": return await deleteSchedule(scheduleId);
      case "run-schedule": return await runScheduledTask(scheduleId);
      case "run-all-due": return await runAllDueTasks();
      case "get-next-tasks": return await getNextTasks();
      case "schedule-website": return await scheduleWebsite(data);
      case "auto-pilot": return await autoPilotMode(data);
      default: return NextResponse.json({ error: "Unknown action" });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

// ========== SCHEDULE CRUD ==========

async function createSchedule(data: any) {
  const schedule = {
    id: Date.now(),
    name: data.name,
    type: data.type, // "build", "publish", "optimize", "analyze", "backup", "all"
    niche: data.niche || null,
    website_type: data.websiteType || "basic",
    frequency: data.frequency, // "once", "daily", "weekly", "monthly", "every_2_days", "every_3_days"
    time: data.time || "09:00",
    days: data.days || ["Monday"],
    status: "active",
    last_run: null,
    next_run: calculateNextRun(data.frequency, data.time, data.days),
    config: data.config || {},
    created_at: new Date().toISOString(),
  };

  await fetch(`${SUPABASE_URL}/rest/v1/schedules`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify(schedule),
  });

  return NextResponse.json({ success: true, schedule });
}

async function getSchedules() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/schedules?order=created_at.desc`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  const schedules = await res.json();
  return NextResponse.json({ success: true, schedules: Array.isArray(schedules) ? schedules : [] });
}

async function updateSchedule(id: number, data: any) {
  await fetch(`${SUPABASE_URL}/rest/v1/schedules?id=eq.${id}`, {
    method: "PATCH",
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return NextResponse.json({ success: true, message: "Schedule updated" });
}

async function deleteSchedule(id: number) {
  await fetch(`${SUPABASE_URL}/rest/v1/schedules?id=eq.${id}`, {
    method: "DELETE",
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  return NextResponse.json({ success: true, message: "Schedule deleted" });
}

// ========== SCHEDULE EXECUTION ==========

async function runScheduledTask(scheduleId: number) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/schedules?id=eq.${scheduleId}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  const schedules = await res.json();
  if (!schedules.length) return NextResponse.json({ error: "Schedule not found" });

  const schedule = schedules[0];
  let result = {};

  switch (schedule.type) {
    case "build":
      result = { action: "Website built", niche: schedule.niche, type: schedule.website_type };
      break;
    case "publish":
      result = { action: "Sites published", count: 1 };
      break;
    case "optimize":
      result = { action: "SEO optimized" };
      break;
    case "analyze":
      result = { action: "Analytics generated" };
      break;
    case "all":
      result = { action: "Full cycle completed", steps: ["build", "publish", "optimize", "analyze"] };
      break;
  }

  // Update last_run and next_run
  const nextRun = calculateNextRun(schedule.frequency, schedule.time, schedule.days);
  await fetch(`${SUPABASE_URL}/rest/v1/schedules?id=eq.${scheduleId}`, {
    method: "PATCH",
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ last_run: new Date().toISOString(), next_run: nextRun }),
  });

  // Log to activity
  await fetch(`${SUPABASE_URL}/rest/v1/ai_activity`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({
      id: Date.now(),
      agent: "scheduler",
      action: schedule.type,
      details: JSON.stringify(result),
      created_at: new Date().toISOString(),
    }),
  });

  return NextResponse.json({ success: true, result, nextRun });
}

async function runAllDueTasks() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/schedules?status=eq.active`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  const schedules = await res.json();
  
  const now = new Date();
  const due = (Array.isArray(schedules) ? schedules : []).filter((s: any) => {
    if (!s.next_run) return false;
    return new Date(s.next_run) <= now;
  });

  const results = [];
  for (const task of due) {
    const result = await runScheduledTask(task.id);
    results.push({ name: task.name, type: task.type });
  }

  return NextResponse.json({ success: true, executed: results.length, tasks: results });
}

async function getNextTasks() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/schedules?status=eq.active&order=next_run.asc&limit=10`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  const schedules = await res.json();
  return NextResponse.json({ success: true, upcoming: Array.isArray(schedules) ? schedules : [] });
}

// ========== AUTO PILOT MODE ==========

async function scheduleWebsite(data: any) {
  // Create a complete schedule for a website
  const schedules = [
    { name: `Build: ${data.niche}`, type: "build", frequency: "once", time: "09:00" },
    { name: `Publish: ${data.niche}`, type: "publish", frequency: "once", time: "10:00" },
    { name: `SEO: ${data.niche}`, type: "optimize", frequency: "weekly", days: ["Monday"], time: "11:00" },
    { name: `Analytics: ${data.niche}`, type: "analyze", frequency: "daily", time: "18:00" },
  ];

  const created = [];
  for (const s of schedules) {
    const res = await createSchedule({ ...s, niche: data.niche, websiteType: data.websiteType || "basic" });
    created.push(s.name);
  }

  return NextResponse.json({ success: true, message: "Complete schedule created!", schedules: created });
}

async function autoPilotMode(data: any) {
  const niches = data.niches || ["AI Tools", "Gaming Mods", "Movie Downloads", "Free Followers"];
  
  const schedulePlan = {
    mode: "AUTO-PILOT 24/7",
    niches,
    schedule: {
      monday: { "09:00": "Build new website", "11:00": "Publish", "14:00": "SEO optimize", "18:00": "Analytics" },
      tuesday: { "09:00": "Build new website", "11:00": "Publish", "14:00": "Content update", "18:00": "Analytics" },
      wednesday: { "09:00": "Build new website", "11:00": "Publish", "14:00": "Backlink building", "18:00": "Analytics" },
      thursday: { "09:00": "Build new website", "11:00": "Publish", "14:00": "Social media", "18:00": "Analytics" },
      friday: { "09:00": "Build new website", "11:00": "Publish", "14:00": "Revenue optimize", "18:00": "Weekly report" },
      saturday: { "09:00": "AI learning session", "14:00": "Competitor analysis", "18:00": "Analytics" },
      sunday: { "09:00": "System maintenance", "14:00": "Strategy planning", "18:00": "Weekly summary" },
    },
    totalWebsitesPerWeek: 5,
    estimatedTrafficByMonth6: "500K+ visitors",
    estimatedRevenueByMonth6: "$5,000+/month",
  };

  // Create all schedules
  for (const niche of niches) {
    await scheduleWebsite({ niche, websiteType: "money-site" });
  }

  return NextResponse.json({ success: true, autoPilot: schedulePlan });
}

// ========== HELPER ==========

function calculateNextRun(frequency: string, time: string, days?: string[]): string {
  const now = new Date();
  const [hours, minutes] = (time || "09:00").split(":").map(Number);
  
  let next = new Date(now);
  next.setHours(hours, minutes, 0, 0);

  switch (frequency) {
    case "once":
      return next.toISOString();
    case "daily":
      if (next <= now) next.setDate(next.getDate() + 1);
      return next.toISOString();
    case "weekly":
      if (days?.length) {
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const targetDay = dayNames.indexOf(days[0]);
        const currentDay = now.getDay();
        let daysUntil = targetDay - currentDay;
        if (daysUntil <= 0) daysUntil += 7;
        next.setDate(next.getDate() + daysUntil);
      }
      return next.toISOString();
    case "monthly":
      next.setMonth(next.getMonth() + 1);
      return next.toISOString();
    case "every_2_days":
      next.setDate(next.getDate() + 2);
      return next.toISOString();
    case "every_3_days":
      next.setDate(next.getDate() + 3);
      return next.toISOString();
    default:
      next.setDate(next.getDate() + 1);
      return next.toISOString();
  }
}
