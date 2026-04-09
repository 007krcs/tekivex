## Why Rate Limiting?

Rate limiting controls how many requests a client can make in a given time window. Without it, a single misbehaving client (or attacker) can overwhelm your servers. Think of it as a bouncer at a club — only letting in a certain number of people per hour.

- Prevent **DDoS attacks** and abuse
- Protect backend services from **overload**
- Enforce **fair usage** across API consumers
- Manage **cost** for metered third-party APIs

## Request Flow

**Flow:**

1. **Incoming Request** — Client sends API request
2. **Identify Client** — By API key, IP, or user ID
3. **Check Rate** — Look up counter in Redis
4. **Under Limit?** — Increment counter and allow
5. **Over Limit?** — Return 429 Too Many Requests


## Algorithms

### Token Bucket

A bucket holds tokens (capacity N). Tokens are added at a fixed rate. Each request consumes one token. If the bucket is empty, the request is rejected. This allows **bursts** up to the bucket size while maintaining an average rate.

### Leaky Bucket

Requests enter a queue (bucket) and are processed at a **fixed rate**, like water dripping from a bucket. If the queue is full, new requests are dropped. This smooths out bursts into a constant outflow.

### Sliding Window

Track the timestamp of each request. Count requests in the last N seconds. More accurate than fixed windows (which can allow 2x burst at window boundaries) but requires more memory.

| Algorithm | Burst Handling | Memory | Accuracy | Complexity |
| --- | --- | --- | --- | --- |
| Token Bucket | Allows bursts | Low (counter + timestamp) | Good | Low |
| Leaky Bucket | Smooths bursts | Medium (queue) | Good | Medium |
| Fixed Window | Edge burst issue | Low (counter per window) | Moderate | Low |
| Sliding Window Log | No edge burst | High (all timestamps) | Excellent | High |
| Sliding Window Counter | Minimal edge burst | Low (2 counters) | Very Good | Low |

## Express Rate Limiter Middleware

<!-- title: rate-limiter.ts -->
```typescript
import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

const redis = new Redis();

interface RateLimitOptions {
  windowMs: number;    // Time window in milliseconds
  maxRequests: number; // Max requests per window
  keyPrefix?: string;  // Redis key prefix
}

export function rateLimit(options: RateLimitOptions) {
  const { windowMs, maxRequests, keyPrefix = 'rl' } = options;
  const windowSec = Math.ceil(windowMs / 1000);

  return async (req: Request, res: Response, next: NextFunction) => {
    const clientId = req.ip || 'unknown';
    const key = `${keyPrefix}:${clientId}`;

    // Atomic increment + expire using Lua script
    const current = await redis.eval(
      `
      local count = redis.call('INCR', KEYS[1])
      if count == 1 then
        redis.call('EXPIRE', KEYS[1], ARGV[1])
      end
      return count
      `,
      1, key, windowSec
    ) as number;

    // Set rate limit headers
    res.set('X-RateLimit-Limit', String(maxRequests));
    res.set('X-RateLimit-Remaining', String(Math.max(0, maxRequests - current)));

    if (current > maxRequests) {
      const ttl = await redis.ttl(key);
      res.set('Retry-After', String(ttl));
      return res.status(429).json({
        error: 'Too Many Requests',
        retryAfter: ttl,
      });
    }

    next();
  };
}

// Usage:
// app.use('/api/', rateLimit({ windowMs: 60_000, maxRequests: 100 }));
```

> **TIP:** Always return `Retry-After` and `X-RateLimit-Remaining` headers so clients can implement intelligent backoff instead of blindly retrying.

## Rate Limiting at Different Layers

| Layer | Tool | Use Case |
| --- | --- | --- |
| CDN / Edge | Cloudflare, AWS WAF | Block DDoS, bot traffic |
| API Gateway | Kong, AWS API Gateway | Per-API-key quotas |
| Application | Express middleware, custom | Per-user, per-endpoint limits |
| Database | Connection pool limits | Prevent DB overload |

## Key Takeaways

1. Token bucket is the most popular algorithm — allows bursts while capping average rate.
2. Use Redis for distributed rate limiting across multiple app servers.
3. Apply rate limits at multiple layers for defense in depth.
4. Always include rate limit headers in your API responses.
