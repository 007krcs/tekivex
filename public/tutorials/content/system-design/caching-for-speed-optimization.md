## Cache Placement

| Location | Latency | Examples | Tradeoff |
| --- | --- | --- | --- |
| Client-side (browser) | 0 ms (cache hit) | HTTP Cache-Control, Service Worker | No control after delivery; stale data risk |
| CDN / Edge | 1–10 ms | Cloudflare, CloudFront | Great for static/public content; complexity for personalised |
| Reverse proxy | 1–5 ms | Nginx proxy_cache, Varnish | Shared across all clients; good for read-heavy APIs |
| Application-level | < 1 ms (in-process) | In-memory Map, LRU cache | Not shared across instances; per-process memory |
| Distributed cache | 1–3 ms | Redis, Memcached | Shared across all servers; network overhead |

## Cache Strategies

| Cache-Aside (Lazy Loading) | Write-Through |
| --- | --- |
| Read: check cache → miss → fetch DB → populate cache | Write: update cache AND DB together |
| Write: update DB, invalidate cache | Read: always from cache (always warm) |
| Cache only what is requested | No stale reads |
| Risk: cache stampede on miss | Risk: cache bloat (write-only data cached) |
| Best for: read-heavy, irregular access | Best for: write + read workloads |

## Cache Stampede Prevention

A **cache stampede** occurs when a popular cached item expires and hundreds of concurrent requests all miss simultaneously, all hitting the database at once. Solutions:

<!-- title: Prevent Cache Stampede with Mutex Lock -->
```typescript
async function getCachedProduct(id: string) {
  const cached = await redis.get(`product:${id}`);
  if (cached) return JSON.parse(cached);

  // Acquire a lock — only one request fetches from DB
  const lock = await redis.set(`lock:product:${id}`, 1, 'NX', 'PX', 5000);

  if (!lock) {
    // Another request is fetching — wait and retry
    await sleep(100);
    return getCachedProduct(id); // Retry
  }

  try {
    const product = await db.products.findOne(id);
    // Add 5–10% jitter to prevent synchronized expiry across keys
    const ttl = 300 + Math.floor(Math.random() * 30);
    await redis.setex(`product:${id}`, ttl, JSON.stringify(product));
    return product;
  } finally {
    await redis.del(`lock:product:${id}`);
  }
}
```

## Eviction Policies

| Policy | Evicts | Best For |
| --- | --- | --- |
| LRU (Least Recently Used) | Longest-unused item | General-purpose; temporal locality |
| LFU (Least Frequently Used) | Least-accessed item | Frequency-based access (product catalog) |
| FIFO | Oldest entry | Simple queue-like patterns |
| TTL-based | Expired entries | Session tokens, rate limit counters |
| Random | Random item | When access pattern is unknown |
