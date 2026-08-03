type MemoryInput = {
  agent: string;
  message: string;
  response: string;
};

// Represents a memory object retrieved from Supabase
type CachedMemory = {
  id?: number | string;
  agent: string;
  message: string;
  response: string;
  created_at?: string | Date;
};

// Performance Optimization: Global in-memory cache for GetMemory
// This avoids hitting the Supabase rest/v1/memory endpoint repeatedly on every system check,
// reducing API latency, network load, and Supabase request count.
let memoryCache: CachedMemory[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL_MS = 30000; // 30 seconds Time-To-Live (TTL)

// Cache invalidation trigger to ensure data consistency immediately after write mutations
export function invalidateMemoryCache() {
  memoryCache = null;
  cacheTimestamp = 0;
}

export async function MemoryAI(
  input: MemoryInput
) {
  // Invalidate cache immediately on memory write mutation
  invalidateMemoryCache();

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Gracefully guard against missing environment variables during Next.js builds
    if (!supabaseUrl || !supabaseKey) {
      return {
        success: false,
      };
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
    console.log(
      "MEMORY ERROR:",
      err
    );
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
  // Return cached memories if TTL has not expired to save network requests and database processing
  if (memoryCache && (now - cacheTimestamp < CACHE_TTL_MS)) {
    return memoryCache;
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Gracefully guard against missing environment variables during Next.js builds
    if (!supabaseUrl || !supabaseKey) {
      return [];
    }

    const response =
      await fetch(
        `${supabaseUrl}/rest/v1/memory?select=*`,
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
        }
      );

    const data =
      await response.json();

    memoryCache = Array.isArray(data) ? data : [];
    cacheTimestamp = Date.now();
    return memoryCache;
  } catch (err) {
    console.log(err);
    return [];
  }
}
