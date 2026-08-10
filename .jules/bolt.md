## 2025-08-09 - Next.js Route Handler Prerendering & Cache Optimization

**Learning:**
1. Next.js App Router statically prerenders GET route handlers by default at build time. If these routes initialize clients or make fetch calls that require environment variables (like Supabase URL/keys), the build will fail unless the client is initialized lazily and the route is configured with `export const dynamic = "force-dynamic"`.
2. Hitting external databases like Supabase on every system/dashboard request is an expensive bottleneck. An elegant 30-second TTL in-memory cache with selective invalidation on mutation paths (POST) guarantees speed and fresh data without unnecessary database hits.

**Action:**
1. Force dynamic rendering on GET route handlers that require environment variables or runtime APIs.
2. Initialize database/third-party clients lazily to prevent build-time crashes.
3. Optimize frequently fetched system/dashboard metadata with a memory TTL cache and immediate mutation-based cache invalidation.
