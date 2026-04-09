## Monolithic Architecture

A monolith is a single deployable unit containing all features. All code runs in one process, shares one database, and is deployed together. Think of it as a single large building that houses every department of a company.

## Microservices Architecture

Microservices break the application into small, independent services, each owning its own data and deployable separately. Each service is like an independent shop in a mall — they can open, close, and renovate without affecting others.

## Detailed Comparison

| Monolith | Microservices |
| --- | --- |
| Single codebase and deployment | Multiple codebases and deployments |
| Shared database | Each service owns its data |
| Simple local function calls | Network calls (REST, gRPC, events) |
| Easier to develop and debug initially | More complex infrastructure |
| One team can own the entire app | Independent team ownership |
| Harder to scale individual features | Scale each service independently |
| One bug can crash everything | Fault isolation — one service failure is contained |

## Deployment Models

**Flow:**

1. **Monolith Deploy** — Build → Test → Deploy entire app
2. **Single artifact** — One binary or container
3. **All-or-nothing** — Rollback = redeploy everything


---

**Flow:**

1. **Microservice Deploy** — Build → Test → Deploy one service
2. **Independent artifacts** — Each service is its own container
3. **Targeted rollback** — Roll back just the failing service


## Communication Patterns

| Pattern | Type | When to Use | Example |
| --- | --- | --- | --- |
| REST / HTTP | Synchronous | Simple request-response, CRUD | User service calls Auth service |
| gRPC | Synchronous | High-performance, internal services | Order service calls Inventory service |
| Message Queue | Asynchronous | Fire-and-forget, background jobs | Order placed → send confirmation email |
| Event Bus | Asynchronous | Event-driven, pub/sub fan-out | Payment received → notify shipping, inventory, analytics |

> **TIP:** The **Strangler Fig pattern** lets you gradually migrate from a monolith to microservices. Route specific endpoints to new services while the monolith handles the rest. Over time, the monolith shrinks until it can be retired.

## When to Use Which

| Scenario | Recommendation | Reasoning |
| --- | --- | --- |
| Startup / MVP | Monolith | Ship fast, iterate, find product-market fit |
| Small team (< 10 engineers) | Monolith | Microservices overhead not justified |
| Large team with domain boundaries | Microservices | Independent teams, independent deploys |
| Different scaling needs per feature | Microservices | Scale search independently from payments |
| Strict compliance per module | Microservices | Isolate PCI-compliant payment service |

## API Gateway Pattern

An API gateway sits in front of your microservices and handles cross-cutting concerns: **routing**, **authentication**, **rate limiting**, **request aggregation**, and **protocol translation**. Clients talk to one endpoint; the gateway fans out to the right services.

**Flow:**

1. **Client** — Mobile or web app
2. **API Gateway** — Auth, rate limit, route
3. **User Service** — /users/*
4. **Order Service** — /orders/*
5. **Product Service** — /products/*


## Key Takeaways

1. Start with a monolith; extract services only when complexity demands it.
2. Prefer async communication (events) over sync (REST) between services.
3. Use an API gateway for cross-cutting concerns.
4. Each microservice should own its own data — no shared databases.
