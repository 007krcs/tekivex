## What Is a Load Balancer?

A load balancer distributes incoming network traffic across multiple servers to ensure no single server bears too much load. Think of it as a traffic cop at a busy intersection, directing cars to the least congested lane.

## Architecture Overview

*Load balancer distributing requests across four backend servers.*

## Load Balancing Algorithms

| Algorithm | How It Works | Best For |
| --- | --- | --- |
| Round Robin | Requests go to servers in order: 1, 2, 3, 1, 2, 3... | Equal-capacity servers, stateless services |
| Weighted Round Robin | Higher-weight servers get more requests | Mixed-capacity server fleet |
| Least Connections | Route to the server with fewest active connections | Long-lived connections (WebSockets) |
| IP Hash | Hash client IP to determine target server | Session stickiness without cookies |
| Consistent Hashing | Hash ring minimizes redistribution when servers added/removed | Cache layers, distributed stores |
| Random | Pick a random server | Simple, surprisingly effective at scale |

## Layer 4 vs Layer 7

| Layer 4 (Transport) | Layer 7 (Application) |
| --- | --- |
| Routes based on IP and TCP/UDP port | Routes based on HTTP headers, URL, cookies |
| Cannot inspect HTTP headers or body | Can do path-based routing (/api vs /static) |
| Faster — less processing per packet | Slightly more overhead per request |
| Example: AWS NLB, HAProxy TCP mode | Example: AWS ALB, nginx, Envoy |
| Good for: non-HTTP protocols, raw TCP | Good for: microservices, A/B testing, SSL termination |

## Nginx Load Balancer Configuration

<!-- title: nginx.conf -->
```nginx
upstream backend_servers {
    # Least-connections algorithm
    least_conn;

    server 10.0.1.1:3000 weight=3;  # powerful machine gets 3x traffic
    server 10.0.1.2:3000 weight=1;
    server 10.0.1.3:3000 weight=1;
    server 10.0.1.4:3000 backup;     # only used when others are down

    # Health checks
    keepalive 32;
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://backend_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # Timeouts
        proxy_connect_timeout 5s;
        proxy_read_timeout 30s;
    }

    location /health {
        return 200 'OK';
    }
}
```

> **TIP:** Use the `backup` directive for a standby server that only receives traffic when all primary servers are down. This is a simple way to add fault tolerance.

## Health Checks

A load balancer must know which servers are healthy. It periodically sends **health check** requests to each backend. If a server fails several checks in a row, it is removed from the pool until it recovers.

**Flow:**

1. **LB Sends Probe** — GET /health every 10s
2. **Server Responds** — 200 OK = healthy
3. **No Response?** — Mark unhealthy after 3 failures
4. **Remove from Pool** — Stop routing traffic
5. **Recovery** — Re-add after consecutive successes


## Key Takeaways

1. Use Layer 7 LBs for HTTP services; Layer 4 for raw TCP/UDP.
2. Least connections is often better than round robin for variable-latency backends.
3. Always configure health checks to avoid sending traffic to dead servers.
4. Consistent hashing minimizes cache misses when scaling up/down.
