import { invalidateMemoryCache } from "../../../core/memory";

interface Memory {
  id: string;
  type: "success" | "failure" | "learning" | "strategy";
  content: string;
  score: number;
  timestamp: string;
  metadata: Record<string, any>;
}

let memoryStore: Memory[] = [];

export async function saveMemory(type: Memory["type"], content: string, score: number, metadata: Record<string, any> = {}): Promise<void> {
  const memory: Memory = {
    id: Date.now().toString(),
    type,
    content,
    score,
    timestamp: new Date().toISOString(),
    metadata,
  };
  
  memoryStore.unshift(memory);
  memoryStore = memoryStore.slice(0, 100); // Keep last 100 memories
  
  // Save to Supabase
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (SUPABASE_URL && SUPABASE_KEY) {
    await fetch(`${SUPABASE_URL}/rest/v1/memory`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent: "memory-ai",
        message: content,
        response: JSON.stringify(metadata),
        model: "autonomous",
        created_at: new Date().toISOString(),
      }),
    })
      .then(() => {
        try {
          invalidateMemoryCache();
        } catch (e) {
          console.error("Failed to invalidate memory cache:", e);
        }
      })
      .catch(() => {});
  }
  
  console.log(`🧠 Memory saved: ${type} - ${content.slice(0, 50)}...`);
}

export async function recallMemories(type?: Memory["type"], limit: number = 10): Promise<Memory[]> {
  let filtered = memoryStore;
  if (type) filtered = filtered.filter(m => m.type === type);
  return filtered.slice(0, limit);
}

export async function getBestStrategies(limit: number = 5): Promise<Memory[]> {
  return memoryStore.filter(m => m.type === "strategy" && m.score > 70).slice(0, limit);
}

export async function learnFromSuccess(videoTitle: string, performance: any): Promise<void> {
  const GROQ_KEY = process.env.GROQ_API_KEY;
  
  if (GROQ_KEY && performance.score > 70) {
    const prompt = `This video "${videoTitle}" got score ${performance.score}. What made it successful? Give 1 key learning.`;
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });
    const data = await res.json();
    const learning = data.choices[0]?.message?.content || "Success pattern detected";
    await saveMemory("learning", learning, performance.score, { videoTitle });
  }
}
