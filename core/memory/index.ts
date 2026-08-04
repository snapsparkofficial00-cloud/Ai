type MemoryInput = {
  agent: string;
  message: string;
  response: string;
};

// ⚡ In-memory cache variables to optimize GetMemory() performance
let memoryCache: any[] | null = null;
let lastFetchTime: number = 0;
const CACHE_TTL_MS = 30000; // 30 seconds Time-To-Live

/**
 * ⚡ Invalidates the in-memory cache to ensure stale data is not read after mutation paths
 */
export function invalidateMemoryCache(): void {
  memoryCache = null;
  lastFetchTime = 0;
  console.log("🧠 Memory Cache Invalidated");
}

export async function MemoryAI(input: MemoryInput) {
  // ⚡ Trigger immediate cache invalidation on any mutation path
  invalidateMemoryCache();

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Safe guard to prevent compilation & runtime errors when Supabase credentials are missing
    if (!supabaseUrl || !supabaseKey) {
      console.log("MemoryAI: Supabase credentials not configured");
      return { success: false };
    }

    await fetch(
      `${supabaseUrl}/rest/v1/memory`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          agent: input.agent,
          message: input.message,
          response: input.response,
          created_at: new Date(),
        }),
      }
    );

    return {
      success: true,
    };
  } catch (err) {
    console.log("MEMORY ERROR:", err);
    return {
      success: false,
    };
  }
}

/* =========================
   GET MEMORY
========================== */

export async function GetMemory() {
  const now = Date.now();

  // ⚡ Performance Win: If the cache is valid, return it immediately to avoid expensive network calls
  if (memoryCache !== null && (now - lastFetchTime) < CACHE_TTL_MS) {
    console.log("🧠 Performance Win: Memory retrieved from 30s TTL cache");
    return memoryCache;
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Safe guard to prevent compilation & runtime errors when Supabase credentials are missing
    if (!supabaseUrl || !supabaseKey) {
      console.log("GetMemory: Supabase credentials not configured");
      return [];
    }

    const response = await fetch(
      `${supabaseUrl}/rest/v1/memory?select=*`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );

    const data = await response.json();

    // ⚡ Cache the newly retrieved memory list and update timestamp
    memoryCache = Array.isArray(data) ? data : [];
    lastFetchTime = Date.now();

    return memoryCache;
  } catch (err) {
    console.log("GetMemory Error:", err);
    return [];
  }
}
