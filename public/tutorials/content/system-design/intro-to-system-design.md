## What Is System Design?

System design is the process of defining the **architecture, components, data flow, and interfaces** of a system to satisfy a set of requirements. Think of it like creating a blueprint before constructing a building — you need to decide where the load-bearing walls go before you start pouring concrete.

> **TIP:** System design is not just for interviews! Every time you sketch a service on a whiteboard, choose a database, or decide how two microservices communicate, you are doing system design.

## Why System Design Matters

Good design prevents costly rewrites. A poor database choice or a missing cache layer can take months to fix once the system is live. The earlier you make the right trade-offs, the cheaper the system is to build and maintain.

- **Scalability** — can the system handle 10x traffic without a rewrite?
- **Reliability** — does it keep working when a server crashes?
- **Maintainability** — can a new engineer understand the codebase in a week?
- **Cost** — are we using the right amount of infrastructure?

## The Design Process

Every system design follows a similar lifecycle. Understanding each phase helps you ask the right questions at the right time.

**Flow:**

1. **Requirements** — Clarify functional & non-functional needs
2. **High-Level Design** — Sketch major components & data flow
3. **Detailed Design** — APIs, schemas, algorithms
4. **Implementation** — Write code, integrate services
5. **Testing** — Load testing, chaos engineering
6. **Deployment** — Rollout, monitoring, alerting


### Functional vs Non-Functional Requirements

| Functional Requirements | Non-Functional Requirements |
| --- | --- |
| What the system should do | How the system should behave |
| User-facing features | Quality attributes |
| Example: users can upload images | Example: 99.99% uptime |
| Example: search returns results in <1s | Example: handle 10K RPS |
| Defined by product managers | Defined by engineers & SREs |

### Back-of-the-Envelope Estimation

Before diving into design, engineers perform quick calculations to understand scale. These "napkin math" estimates help you decide whether you need one server or a hundred.

| Metric | Rough Value |
| --- | --- |
| QPS (queries per second) for a small app | 100–1,000 |
| QPS for a large social network | 100K–1M+ |
| Storage for 1 million user profiles (1 KB each) | ~1 GB |
| Network bandwidth for 10K image uploads/day (2 MB each) | ~20 GB/day |
| Read:write ratio (typical social media) | 100:1 |

> **NOTE:** Always state your assumptions explicitly. An estimate of "1 TB of storage per year" is useless without knowing you assumed 10 million users uploading one 100 KB file per year.

## Key Takeaways

1. System design is about **trade-offs**, not perfect solutions.
2. Always start with **requirements** before jumping to architecture.
3. Use back-of-the-envelope math to **size your system** early.
4. Good design is iterative — plan to revisit and refine.
