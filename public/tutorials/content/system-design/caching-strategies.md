## Why Caching?

Caching stores copies of frequently accessed data in a **faster storage layer** (usually RAM) so future requests can be served without hitting the slower primary data store. A single Redis lookup takes ~0.5ms vs ~5ms for a PostgreSQL query — a 10x improvement.

> **NOTE:** There are only two hard things in computer science: cache invalidation and naming things. Caching is powerful but introduces consistency challenges.

## Cache-Aside (Lazy Loading)

The application checks the cache first. On a **cache miss**, it fetches from the database, stores the result in the cache, then returns it. The cache is only populated on demand.

**Flow:**

1. **Request** — App receives read request
2. **Check Cache** — Lookup key in Redis
3. **Cache Hit?** — Return cached data if found
4. **Cache Miss** — Query the database
5. **Populate Cache** — Store result with TTL
6. **Return Data** — Send response to client


<!-- title: cache-aside.ts -->
```typescript
import Redis from 'ioredis';
import { Pool } from 'pg';

const redis = new Redis();
const db = new Pool({ connectionString: process.env.DATABASE_URL });

interface User {
  id: string;
  name: string;
  email: string;
}

async function getUser(userId: string): Promise<User | null> {
  const cacheKey = `user:${userId}`;

  // 1. Check cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // 2. Cache miss — query database
  const { rows } = await db.query(
    'SELECT id, name, email FROM users WHERE id = $1',
    [userId]
  );

  if (rows.length === 0) return null;

  // 3. Populate cache with 5-minute TTL
  const user = rows[0] as User;
  await redis.set(cacheKey, JSON.stringify(user), 'EX', 300);

  return user;
}

async function updateUser(userId: string, data: Partial<User>): Promise<void> {
  // Update database
  await db.query(
    'UPDATE users SET name = COALESCE($2, name), email = COALESCE($3, email) WHERE id = $1',
    [userId, data.name, data.email]
  );

  // Invalidate cache
  await redis.del(`user:${userId}`);
}
```

## Write-Through

Data is written to the cache **and** the database simultaneously. Every write updates both layers, so the cache is always consistent. The downside is higher write latency.

**Flow:**

1. **Write Request** — App receives data to store
2. **Write to Cache** — Update Redis
3. **Write to DB** — Update PostgreSQL
4. **Confirm** — Both writes succeed


## Write-Behind (Write-Back)

Data is written to the cache first and acknowledged immediately. The cache then **asynchronously flushes** to the database in batches. This gives the lowest write latency but risks data loss if the cache crashes before flushing.

## Read-Through

Similar to cache-aside, but the **cache itself** handles loading from the database on a miss. The application only talks to the cache, never directly to the database. This simplifies application code but requires cache infrastructure that supports data loaders.

## Strategy Comparison

| Strategy | Read Latency | Write Latency | Consistency | Complexity |
| --- | --- | --- | --- | --- |
| Cache-Aside | Low (on hit) | Normal | Eventual (TTL) | Low |
| Write-Through | Low | Higher (dual write) | Strong | Medium |
| Write-Behind | Low | Lowest | Eventual (async) | High |
| Read-Through | Low (on hit) | Normal | Eventual (TTL) | Medium |

## Cache Invalidation Strategies

- **TTL (Time-To-Live)** — automatically expire after N seconds. Simple, but stale data until TTL expires.
- **Event-driven invalidation** — delete cache on write. Requires coordination between services.
- **Versioned keys** — include a version number in the cache key, increment on write.
- **Pub/Sub invalidation** — broadcast invalidation events to all app servers.

> **CAUTION:** Never cache without a TTL in production. A missing TTL means stale data lives forever. Even a generous TTL of 24 hours is better than none.

## Key Takeaways

1. Cache-aside is the most common and easiest to implement.
2. Write-through ensures consistency; write-behind optimizes write speed.
3. Always set a TTL to prevent stale data buildup.
4. Cache invalidation is the hard part — choose a strategy based on your consistency needs.
