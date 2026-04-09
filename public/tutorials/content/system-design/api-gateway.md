## What Is an API Gateway?

An **API Gateway** is a server that acts as the single entry point for all client requests in a microservices architecture. Rather than clients knowing about dozens of internal services, they talk to one gateway that routes, transforms, and enforces policies.

> **TIP:** Think of an API Gateway as a **reverse proxy on steroids** — it not only routes traffic but also handles auth, rate limiting, logging, circuit breaking, and protocol translation.

## Core Responsibilities

| Responsibility | Description | Example |
| --- | --- | --- |
| Request routing | Map path/method to backend service | GET /users/* → user-service:3001 |
| Authentication | Validate JWT, API key, or OAuth token | Reject requests without valid Bearer token |
| Rate limiting | Enforce per-client or global quotas | 1000 req/min per API key |
| SSL/TLS termination | Decrypt HTTPS; plain HTTP to backends | Centralize cert management |
| Protocol translation | REST ↔ gRPC, HTTP/1.1 ↔ HTTP/2 | Mobile REST client → gRPC backend |
| Request/response transform | Add headers, reshape payloads | Inject correlation IDs, filter sensitive fields |
| Observability | Centralized logging, metrics, tracing | All requests logged with latency/status |
| Circuit breaking | Stop forwarding to unhealthy services | Open circuit after 50% error rate |

## API Gateway vs Load Balancer vs Reverse Proxy

| Concern | Reverse Proxy | Load Balancer | API Gateway |
| --- | --- | --- | --- |
| Traffic distribution | ✓ basic | ✓ advanced algorithms | ✓ service routing |
| Auth / authz | ✗ | ✗ | ✓ native |
| Rate limiting | ✗ (plugin) | ✗ | ✓ native |
| Protocol transform | ✗ | ✗ | ✓ |
| Request rewriting | Limited | ✗ | ✓ |
| Observability | Logs only | Health checks | ✓ full tracing |
| Operates at | L7 | L4/L7 | L7 application |

## Popular API Gateways

- **AWS API Gateway** — fully managed; tight integration with Lambda, Cognito, WAF
- **Kong** — open-source, plugin ecosystem, Kubernetes-native (Kong Ingress Controller)
- **Nginx** — lightweight; handles gateway patterns via Lua/NJS scripting
- **Traefik** — auto-discovers services from Docker/K8s labels; great for self-hosted
- **Envoy** — high-performance proxy; base of Istio service mesh
- **Apigee** — Google's enterprise API management with full lifecycle tools

<!-- title: Kong Declarative Config (kong.yml) -->
```yaml
_format_version: "3.0"

services:
  - name: user-service
    url: http://user-service:3001
    routes:
      - name: users-route
        paths: [/api/users]
        methods: [GET, POST]
    plugins:
      - name: jwt           # Validate JWT on every request
      - name: rate-limiting
        config:
          minute: 1000
          policy: redis

  - name: order-service
    url: http://order-service:3002
    routes:
      - name: orders-route
        paths: [/api/orders]
    plugins:
      - name: jwt
      - name: request-transformer
        config:
          add:
            headers: ["X-Correlation-ID:$(uuid)"]
```

> **CAUTION:** **The gateway is a potential SPOF and bottleneck.** Run multiple instances behind a load balancer, use async plugins where possible, and keep the gateway stateless so it scales horizontally.
