## Latency vs Throughput

Think of a highway. **Latency** is how long it takes one car to travel from point A to point B. **Throughput** is how many cars pass a point per hour. A 10-lane highway has high throughput even if each car takes the same time (latency) as on a 1-lane road.

| Latency | Throughput |
| --- | --- |
| Time for a single operation | Operations per unit of time |
| Measured in ms or seconds | Measured in RPS, MB/s, TPS |
| Lower is better | Higher is better |
| Affected by distance, processing, queuing | Affected by concurrency, bandwidth |
| Key metric: p50, p95, p99 | Key metric: sustained RPS under load |

## The Journey of a Request

**Flow:**

1. **Client** — User clicks a button
2. **DNS Lookup** — ~10ms to resolve domain
3. **TCP + TLS** — ~50ms handshake
4. **Load Balancer** — ~1ms routing
5. **App Server** — ~20ms processing
6. **Database** — ~5ms query
7. **Response** — Total: ~86ms


## Latency Numbers Every Engineer Should Know

| Operation | Latency | Notes |
| --- | --- | --- |
| L1 cache reference | ~1 ns | Fastest memory access |
| L2 cache reference | ~4 ns | 4x L1 |
| Main memory (RAM) | ~100 ns | 100x L1 |
| SSD random read | ~16 µs | 16,000 ns |
| HDD seek | ~2 ms | 2,000,000 ns |
| Round trip same datacenter | ~0.5 ms | Network within rack |
| Round trip cross-continent | ~150 ms | Speed of light limit |
| Read 1 MB from memory | ~3 µs | Very fast |
| Read 1 MB from SSD | ~50 µs | 16x slower than RAM |
| Read 1 MB from network (1 Gbps) | ~10 ms | Network is the bottleneck |

> **TIP:** Memory is roughly **1,000x faster than SSD** and **100,000x faster than HDD**. This is why caching in RAM (Redis, Memcached) has such a massive impact on performance.

## Percentile Latencies

Averages hide outliers. If your average latency is 50ms but p99 is 2 seconds, 1% of users are having a terrible experience. Always measure **p50** (median), **p95**, and **p99**.

| Percentile | Meaning | Use Case |
| --- | --- | --- |
| p50 (median) | 50% of requests are faster | Typical user experience |
| p95 | 95% of requests are faster | SLO target for most services |
| p99 | 99% of requests are faster | Tail latency — catches edge cases |
| p99.9 | 99.9% of requests are faster | Used by large-scale services |

## Optimizing Latency & Throughput

- **Caching** — serve from RAM instead of disk or network
- **CDN** — move content closer to users geographically
- **Connection pooling** — reuse TCP connections to databases
- **Async processing** — offload heavy work to background queues
- **Batching** — combine multiple small operations into one
- **Compression** — reduce bytes transferred over the network

## Key Takeaways

1. Latency and throughput are independent — optimizing one does not always improve the other.
2. Measure percentiles (p95, p99), not averages.
3. Memory is 1000x faster than disk — cache aggressively.
4. Network latency is often the dominant bottleneck.
