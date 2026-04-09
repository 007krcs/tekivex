## Step 1: Requirements

### Functional Requirements

1. Given a long URL, generate a short unique URL
2. Redirect short URL to the original long URL
3. Users can optionally set a custom alias
4. Links expire after a configurable duration (default: 5 years)
5. Analytics: track click count, referrer, geo

### Non-Functional Requirements

- **Highly available** — redirects must always work (read-heavy)
- **Low latency** — redirect in under 50ms
- **Short URLs should not be guessable** (no sequential IDs)
- **Scale** — 100M new URLs/month, 10B redirects/month

## Step 2: Back-of-the-Envelope Estimation

| Metric | Calculation | Result |
| --- | --- | --- |
| New URLs / second | 100M / (30 * 24 * 3600) | ~40 writes/sec |
| Redirects / second | 10B / (30 * 24 * 3600) | ~4,000 reads/sec |
| Read:write ratio | 10B / 100M | 100:1 |
| Storage per URL (avg) | 500 bytes (URL + metadata) | ~500 bytes |
| Storage / year | 100M * 12 * 500 bytes | ~600 GB/year |
| URLs in 5 years | 100M * 12 * 5 | 6 billion |
| Key space (7-char base62) | 62^7 | ~3.5 trillion (enough!) |

> **NOTE:** With a 100:1 read:write ratio and 4K reads/sec, this is a **read-heavy** system. Caching will be critical — most short URLs are accessed repeatedly (viral links, social media posts).

## Step 3: System Architecture

*High-level architecture of a URL shortener service.*

## Step 4: Short Key Generation

We need to generate a unique 7-character string for each URL. There are several approaches:

| Approach | How | Pros | Cons |
| --- | --- | --- | --- |
| Hash + truncate | MD5/SHA → take first 7 chars (base62) | Simple, deterministic | Collisions possible, need check |
| Counter + base62 | Auto-increment ID → base62 encode | No collisions | Sequential = guessable, single counter bottleneck |
| Pre-generated keys | Generate keys offline, store in DB | Fast, no collision at runtime | Need key generation service |
| Snowflake ID | Distributed ID generator → base62 | No coordination needed | Longer IDs (more bits) |

<!-- title: key-generator.ts -->
```typescript
const BASE62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const KEY_LENGTH = 7;

/** Convert a numeric ID to a base62 string */
function toBase62(num: bigint): string {
  if (num === 0n) return BASE62[0];
  let result = '';
  while (num > 0n) {
    result = BASE62[Number(num % 62n)] + result;
    num = num / 62n;
  }
  return result.padStart(KEY_LENGTH, '0');
}

/** Generate a short key from a counter value */
function generateShortKey(counter: bigint): string {
  return toBase62(counter);
}

// Examples:
// generateShortKey(1n)         → "0000001"
// generateShortKey(1000000n)   → "0004C92"
// generateShortKey(3500000000000n) → uses full 7 chars

/** Hash-based approach (for deduplication) */
async function hashUrl(url: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(url);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // Convert first 7 bytes to base62
  let num = 0n;
  for (let i = 0; i < 7; i++) {
    num = num * 256n + BigInt(hashArray[i]);
  }
  return toBase62(num % (62n ** BigInt(KEY_LENGTH)));
}
```

## Step 5: Database Schema

<!-- title: schema.sql -->
```sql
CREATE TABLE urls (
    short_key   VARCHAR(7) PRIMARY KEY,
    long_url    TEXT NOT NULL,
    user_id     UUID,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    expires_at  TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '5 years'),
    click_count BIGINT DEFAULT 0
);

-- Index for expiration cleanup job
CREATE INDEX idx_urls_expires ON urls(expires_at) WHERE expires_at IS NOT NULL;

-- Index for user's URLs
CREATE INDEX idx_urls_user ON urls(user_id) WHERE user_id IS NOT NULL;

-- Analytics table (append-only, partitioned by date)
CREATE TABLE clicks (
    id          BIGSERIAL,
    short_key   VARCHAR(7) NOT NULL,
    clicked_at  TIMESTAMPTZ DEFAULT NOW(),
    referrer    TEXT,
    user_agent  TEXT,
    ip_address  INET,
    country     VARCHAR(2)
) PARTITION BY RANGE (clicked_at);

-- Create monthly partitions
CREATE TABLE clicks_2025_01 PARTITION OF clicks
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');
```

## Step 6: Redirect Flow

**Flow:**

1. **GET /abc1234** — Browser requests short URL
2. **Check Cache** — Lookup in Redis
3. **Cache Hit** — Return 301 redirect
4. **Cache Miss** — Query PostgreSQL
5. **Populate Cache** — Store with 24h TTL
6. **301 Redirect** — Browser follows to long URL


> **TIP:** Use **301 (Permanent Redirect)** if you want browsers to cache the redirect and reduce load. Use **302 (Temporary Redirect)** if you need to track every click for analytics (the browser will always come back to your server).

## Step 7: Scaling Considerations

- **Read replicas** — distribute redirect queries across replicas
- **Redis cluster** — partition the cache for high throughput
- **CDN** — cache 301 redirects at the edge for ultra-low latency
- **Async analytics** — write clicks to a queue, process in batch
- **Database sharding** — shard URLs by short_key hash when data exceeds single-node capacity
- **Rate limiting** — prevent abuse of URL creation endpoint

## Step 8: Additional Features

| Feature | Implementation |
| --- | --- |
| Custom aliases | Check uniqueness in DB before inserting; reserve common words |
| Link expiration | expires_at column; background cleanup job; return 410 Gone |
| Analytics dashboard | ClickHouse for aggregation; pre-compute daily/hourly rollups |
| Spam prevention | Check URL against Google Safe Browsing API before shortening |
| QR code generation | Generate server-side on creation; cache as SVG/PNG |

## Key Takeaways

1. Start with requirements and estimation before designing.
2. A 7-character base62 key gives 3.5 trillion unique URLs — more than enough.
3. Cache aggressively — most redirects hit popular URLs repeatedly.
4. Separate the analytics path (async) from the redirect path (sync, low-latency).
5. Choose 301 vs 302 based on whether you need to track every click.
