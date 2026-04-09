## What Is a CDN?

A Content Delivery Network is a globally distributed network of **edge servers** that cache and serve content from locations close to end users. Instead of every request traveling to your origin server in Virginia, a user in Tokyo gets served from a nearby edge node.

## How CDN Requests Work

**Flow:**

1. **User Request** — Browser requests an image
2. **DNS Resolution** — Resolves to nearest PoP
3. **Edge Cache Check** — Is the asset cached?
4. **Cache HIT** — Return from edge (fast!)
5. **Cache MISS** — Fetch from origin server
6. **Cache & Serve** — Store at edge, return to user


## With CDN vs Without CDN

| Without CDN | With CDN |
| --- | --- |
| All requests hit origin server | 90%+ requests served from edge |
| High latency for distant users | Low latency worldwide |
| Origin bears full bandwidth cost | Origin bandwidth reduced dramatically |
| Single point of failure | DDoS protection at the edge |
| No edge caching | Automatic failover to other PoPs |

## What to Cache on a CDN

| Content Type | Cacheable? | TTL Recommendation |
| --- | --- | --- |
| Static images, CSS, JS | Yes | Long (1 year with cache-busting hash) |
| HTML pages | Sometimes | Short (60s) or stale-while-revalidate |
| API responses (public) | Sometimes | Short (10-60s) with Vary headers |
| API responses (personalized) | No | Do not cache — user-specific data |
| Video/audio streaming | Yes | Long, chunked delivery |

## Cache-Control Headers

<!-- title: HTTP headers -->
```text
# Cache for 1 year (immutable content with hash in filename)
Cache-Control: public, max-age=31536000, immutable

# Cache for 60 seconds, serve stale while revalidating
Cache-Control: public, max-age=60, stale-while-revalidate=30

# Never cache (personalized API responses)
Cache-Control: private, no-store

# Cache at CDN but not browser
Cache-Control: public, s-maxage=300, max-age=0
```

## Edge Computing

Edge computing takes CDNs further by running **application logic** at edge nodes, not just serving cached assets. Cloudflare Workers, AWS Lambda@Edge, and Vercel Edge Functions let you execute code in 200+ locations worldwide.

- **A/B testing** — route users to different variants at the edge
- **Authentication** — validate JWTs before hitting origin
- **Geo-routing** — redirect users to region-specific content
- **Image optimization** — resize and convert formats on the fly

> **TIP:** A good CDN cache hit ratio target is **95%+**. If your ratio is below 80%, review your `Cache-Control` headers and URL structure — query parameters often cause unnecessary cache misses.

## Key Takeaways

1. CDNs reduce latency by serving content from geographically closer nodes.
2. Use long TTLs with cache-busting hashes for static assets.
3. Never cache personalized or authenticated responses at the CDN.
4. Edge computing enables running logic at the edge, not just caching.
