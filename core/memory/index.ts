type MemoryInput = {

  agent: string;

  message: string;

  response: string;

};

// 30-second TTL in-memory cache for memory retrieval system
let memoryCache: any[] | null = null;
let lastCacheTimestamp: number = 0;
const CACHE_TTL_MS = 30000; // 30 seconds

export function invalidateMemoryCache() {
  memoryCache = null;
  lastCacheTimestamp = 0;
}

export async function MemoryAI(
  input: MemoryInput
) {

  try {

    await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/memory`,
      {

        method: "POST",

        headers: {

          apikey:
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

          Authorization:
`Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,

          "Content-Type":
            "application/json",

          Prefer:
            "return=minimal",

        },

        body: JSON.stringify({

          agent:
            input.agent,

          message:
            input.message,

          response:
            input.response,

          created_at:
            new Date(),

        }),

      }
    );

    // Immediate cache invalidation on mutation success
    invalidateMemoryCache();

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
  if (memoryCache && (now - lastCacheTimestamp < CACHE_TTL_MS)) {
    return memoryCache;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return [];
  }

  try {

    const response =
      await fetch(
        `${supabaseUrl}/rest/v1/memory?select=*`,
        {

          headers: {

            apikey:
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

            Authorization:
`Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,

          },

        }
      );

    const data =
      await response.json();

    // Cache the response with current timestamp on success
    memoryCache = data;
    lastCacheTimestamp = now;

    return data;

  } catch (err) {

    console.log(err);

    return [];

  }

}
