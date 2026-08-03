## 2025-03-05 - [Memory API Cache and In-Build Supabase Initialization Guard]
**Learning:**
1. Calling standard Supabase `createClient()` at the module scope with non-null assertion operators (`!`) during a production Next.js build (`next build`) will crash page/static collection when env variables are not present in the build container. Wrap or dynamically instantiate the client to make the application buildable.
2. Fetching `select=*` repeatedly from a growing database table on generic endpoints (like `/api/system` checking metrics) is highly inefficient and creates database resource exhaustion and high API latency.
3. Implementing a 30-second TTL in-memory cache with immediate cache invalidation triggers on mutation paths (`MemoryAI` and `saveMemory`) maintains near-perfect consistency while reducing network latency to 0ms on warm caches.

**Action:**
1. Always lazily instantiate third-party SDK clients (Supabase, Firebase, Stripe, etc.) or dynamically check env variables instead of instantiating at the root of Next.js route files.
2. Cache read-heavy data queried for meta-stats (such as array lengths) with smart TTL and invalidation triggers to optimize API execution paths.
