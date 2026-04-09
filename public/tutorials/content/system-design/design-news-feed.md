## Requirements

- **Functional:** Post tweets/photos; follow/unfollow users; view personalised home feed with posts from followees
- **Non-functional:** 300M DAU; post QPS ~5K; read QPS ~500K; feed must load in < 500ms (p99)
- **Scale:** Average user follows 300 people; celebrities have 100M+ followers

## The Core Trade-off: Fan-out on Write vs Read

| Fan-out on Write (Push) | Fan-out on Read (Pull) |
| --- | --- |
| On post: write to every follower's feed cache | On read: query recent posts from all followees |
| Fast read — feed pre-computed in Redis | Slow read — N+1 queries at read time |
| Slow write — 100M writes for celebrity post | Fast write — just one post write |
| Celebrity problem: impractical for >1M followers | Works for celebrities (avoid 100M writes) |
| Good for users with < 10K followers | Heavy read load; need aggressive caching |

## Hybrid Approach (Twitter's Solution)

Twitter uses a **hybrid**: fan-out on write for regular users (≤ 1M followers); fan-out on read for celebrities. When a regular user loads their feed, their pre-computed cache is merged with recent posts from any celebrity they follow.

<!-- title: Feed Service — Hybrid Fan-out -->
```typescript
async function getFeed(userId: string, limit = 20): Promise<Post[]> {
  // 1. Get pre-built feed from Redis (regular users, fan-out-on-write)
  const cached = await redis.lrange(`feed:${userId}`, 0, limit - 1);
  const feedPosts = cached.map(id => postCache.get(id)).filter(Boolean);

  // 2. Merge in recent celebrity posts (fan-out-on-read for celebs)
  const celebrities = await getCelebFollowees(userId); // followers > 1M
  const celebPosts = await Promise.all(
    celebrities.map(c => getRecentPosts(c.id, limit))
  );

  // 3. Rank and merge (recency + engagement score)
  const allPosts = [...feedPosts, ...celebPosts.flat()];
  return rankPosts(allPosts).slice(0, limit);
}
```
