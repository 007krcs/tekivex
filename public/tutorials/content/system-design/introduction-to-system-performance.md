## The Performance Triangle

System performance is measured by three interrelated properties: **Latency** (how fast?), **Throughput** (how many?), and **Resource Utilization** (at what cost?). Optimising one usually affects the others.

## Latency Targets

| Operation | Typical Latency | Order of Magnitude |
| --- | --- | --- |
| L1 Cache read | 1 ns | 1 |
| L3 Cache read | 10 ns | 10× |
| RAM read | 100 ns | 100× |
| SSD random read | 100 µs | 100,000× |
| Same DC network round-trip | 500 µs | 500,000× |
| Redis GET (same region) | 1 ms | 1,000,000× |
| DB query (indexed) | 5–50 ms | 5–50M× |
| Cross-continent HTTP | 150–250 ms | 150–250M× |

## Percentiles Over Averages

**Never use average latency alone.** A 10ms average can hide a 2-second p99. Use percentiles: **p50** (median), **p95**, **p99**, **p999**. High-value users often experience the worst latency — they make the most requests.

<!-- title: Measuring p99 Latency -->
```typescript
// Using Prometheus histogram (preferred in production)
import { Histogram, register } from 'prom-client';

const httpLatency = new Histogram({
  name: 'http_request_duration_ms',
  help: 'HTTP request latency in milliseconds',
  labelNames: ['method', 'route', 'status'],
  // Buckets optimised for web APIs
  buckets: [1, 5, 10, 25, 50, 100, 250, 500, 1000, 2500],
});

app.use((req, res, next) => {
  const end = httpLatency.startTimer();
  res.on('finish', () =>
    end({ method: req.method, route: req.route?.path, status: res.statusCode })
  );
  next();
});

// Query p99 in PromQL:
// histogram_quantile(0.99, rate(http_request_duration_ms_bucket[5m]))
```

## Finding Bottlenecks (USE Method)

Brendan Gregg's **USE Method**: for every resource (CPU, memory, network, disk, DB pool), check **Utilization** (% busy), **Saturation** (queue depth), and **Errors**. The first saturated resource is your bottleneck.

- **CPU** — high user% suggests compute-bound; high sys% suggests syscall overhead
- **Memory** — high swap usage = out of RAM; GC pauses in JVM apps
- **Network** — check bandwidth, packet loss, retransmits
- **DB connection pool** — pool exhausted = requests queue behind DB calls
- **External APIs** — downstream latency directly affects your p99
