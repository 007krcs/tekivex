## What Is Scalability?

Scalability is a system's ability to handle increased load by adding resources. Imagine a restaurant: when it gets busy you can either **get a bigger kitchen** (vertical scaling) or **open more locations** (horizontal scaling).

## Vertical Scaling (Scale Up)

Add more CPU, RAM, or storage to a single machine. This is the simplest approach — no code changes required — but it has a hard ceiling: you can only buy so big a server.

- **Pros:** simple, no distributed systems complexity
- **Cons:** single point of failure, hardware limits, expensive at scale
- **When to use:** databases with strong ACID requirements, early-stage startups

## Horizontal Scaling (Scale Out)

Add more machines to distribute the load. This requires a **load balancer** to route traffic and usually a **shared data layer** (database, cache) that all instances can access.

**Flow:**

1. **Single Server** — Handles all traffic alone
2. **Load Balancer** — Distributes incoming requests
3. **Server 1** — Handles portion of traffic
4. **Server 2** — Handles portion of traffic
5. **Server N** — Scales as demand grows


### Comparison: Vertical vs Horizontal

| Vertical Scaling | Horizontal Scaling |
| --- | --- |
| Upgrade hardware (CPU, RAM, SSD) | Add more machines |
| No code changes needed | Requires load balancer & shared state |
| Single point of failure | Redundancy built-in |
| Hard hardware ceiling | Theoretically unlimited |
| Higher cost per unit at scale | Commodity hardware, lower per-unit cost |
| Good for databases (PostgreSQL) | Good for stateless services |

## Node.js Cluster Example

Node.js runs on a single thread by default. The built-in `cluster` module lets you fork worker processes to use all available CPU cores — a simple form of horizontal scaling within one machine.

<!-- title: cluster-server.ts -->
```typescript
import cluster from 'node:cluster';
import { cpus } from 'node:os';
import http from 'node:http';

const NUM_WORKERS = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} forking ${NUM_WORKERS} workers`);

  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code) => {
    console.log(`Worker ${worker.process.pid} exited (code ${code}). Restarting...`);
    cluster.fork(); // auto-restart crashed workers
  });
} else {
  http
    .createServer((_req, res) => {
      res.writeHead(200);
      res.end(`Handled by worker ${process.pid}\n`);
    })
    .listen(3000);

  console.log(`Worker ${process.pid} listening on :3000`);
}
```

> **TIP:** In production, consider `pm2` or container orchestrators like Kubernetes instead of the raw `cluster` module. They provide health checks, rolling restarts, and auto-scaling.

## Stateless vs Stateful Services

Horizontal scaling works best with **stateless** services — each request carries all the data the server needs. If the server stores session data in memory, a load balancer might send the next request to a different server that has no idea who the user is.

| Approach | State Location | Scaling Ease |
| --- | --- | --- |
| Sticky sessions | Server memory | Hard — uneven load |
| Centralized session store (Redis) | External cache | Easy — any server works |
| JWT tokens | Client (cookie/header) | Easiest — fully stateless |

## Key Takeaways

1. Start vertical, go horizontal when you hit limits.
2. Stateless services are easier to scale horizontally.
3. Always externalize session state (Redis, JWT).
4. Auto-scaling policies should react to CPU, memory, *and* request latency.
