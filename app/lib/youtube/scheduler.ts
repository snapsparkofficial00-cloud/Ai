// app/lib/youtube/scheduler.ts

export interface ScheduledContent {
  id: string;
  title: string;
  niche: string;
  type: "short" | "long";
  script: string;
  thumbnailUrl: string;
  voiceUrl: string;
  scheduledFor: string;
  status: "pending" | "ready" | "uploaded" | "failed";
  createdAt: string;
}

let scheduleQueue: ScheduledContent[] = [];

// Load schedule from JSON file or Supabase
export async function loadSchedule(): Promise<ScheduledContent[]> {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/schedule?select=*&order=scheduledFor.asc`, {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
      });
      const data = await res.json();
      if (data.length) {
        scheduleQueue = data;
        return scheduleQueue;
      }
    } catch {}
  }
  
  return scheduleQueue;
}

// Save content to schedule
export async function addToSchedule(content: Omit<ScheduledContent, "id" | "createdAt" | "status">): Promise<ScheduledContent> {
  const newContent: ScheduledContent = {
    ...content,
    id: Date.now().toString(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  
  scheduleQueue.push(newContent);
  scheduleQueue.sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime());
  
  // Save to Supabase
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (SUPABASE_URL && SUPABASE_KEY) {
    await fetch(`${SUPABASE_URL}/rest/v1/schedule`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContent),
    }).catch(() => {});
  }
  
  return newContent;
}

// Update schedule status
export async function updateScheduleStatus(id: string, status: ScheduledContent["status"]): Promise<void> {
  const index = scheduleQueue.findIndex(item => item.id === id);
  if (index !== -1) {
    scheduleQueue[index].status = status;
  }
  
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (SUPABASE_URL && SUPABASE_KEY) {
    await fetch(`${SUPABASE_URL}/rest/v1/schedule?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }).catch(() => {});
  }
}

// Get upcoming content
export async function getUpcomingContent(days: number = 7): Promise<ScheduledContent[]> {
  const now = new Date();
  const future = new Date();
  future.setDate(now.getDate() + days);
  
  return scheduleQueue.filter(item => {
    const scheduleDate = new Date(item.scheduledFor);
    return scheduleDate >= now && scheduleDate <= future && item.status !== "uploaded";
  });
}

// Auto-publish scheduler (run by cron job)
export async function processPendingUploads(): Promise<void> {
  const now = new Date();
  const readyToUpload = scheduleQueue.filter(item => 
    item.status === "ready" && new Date(item.scheduledFor) <= now
  );
  
  for (const item of readyToUpload) {
    console.log(`📤 Auto-uploading scheduled video: ${item.title}`);
    // Trigger upload here
    await updateScheduleStatus(item.id, "uploaded");
  }
}

// Calculate next best posting time based on AI learning
export async function calculateOptimalPostingTime(niche: string): Promise<string> {
  const GROQ_KEY = process.env.GROQ_API_KEY;
  
  if (GROQ_KEY) {
    const prompt = `Best time to post YouTube ${niche} content for maximum views. Return as "HH:00" format (0-23).`;
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5,
      }),
    });
    const data = await res.json();
    const hour = data.choices[0]?.message?.content?.match(/\d+/) || ["12"];
    const date = new Date();
    date.setHours(parseInt(hour[0]), 0, 0, 0);
    date.setDate(date.getDate() + 1);
    return date.toISOString();
  }
  
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + 1);
  return date.toISOString();
}
