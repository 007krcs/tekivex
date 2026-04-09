## The Framework

Whether in an interview or a real greenfield design, a structured approach prevents you from jumping straight to solutions before you understand the problem. The **4-step framework** ensures you cover requirements, scale, design, and trade-offs systematically.

**Flow:**

1. **Step 1: Clarify Requirements** — Functional + non-functional requirements; out-of-scope boundaries
2. **Step 2: Estimate Scale** — DAU, QPS, storage, bandwidth — back-of-envelope calculations
3. **Step 3: High-Level Design** — Core components, data flow, APIs, database schema
4. **Step 4: Deep Dive** — Zoom in on hard/critical components; discuss trade-offs


## Step 1 — Clarify Requirements

- **Functional:** What must the system do? (user stories, core features)
- **Non-functional:** Scale, availability (SLO?), latency (p99?), consistency, security, compliance
- **Constraints:** Must use existing systems? Specific cloud provider? Budget?
- **Out of scope:** Explicitly state what you are NOT designing

## Step 2 — Estimate Scale

<!-- title: Back-of-Envelope Estimation Template -->
```text
// Example: Design Twitter (1B users, 300M DAU)

// Reads vs Writes (read-heavy: 100:1)
Write QPS:  300M DAU * 1 tweet/day / 86,400s ≈ 3,500 QPS
Read QPS:   3,500 * 100                       ≈ 350,000 QPS

// Storage (tweets retained forever)
Tweet size: 280 chars * 2 bytes + metadata    ≈ 1 KB
Daily writes: 3,500 QPS * 86,400s            = 300M tweets/day
Daily storage: 300M * 1 KB                   = 300 GB/day
5-year storage: 300 GB * 365 * 5             ≈ 550 TB

// Bandwidth
Read bandwidth: 350,000 QPS * 1 KB           = 350 MB/s  ← need CDN
Write bandwidth: 3,500 QPS * 1 KB            = 3.5 MB/s  ← manageable
```

## Step 3 — High-Level Design

- Draw the main components: clients, load balancers, services, caches, databases, queues
- Define the primary APIs (endpoint, method, request/response)
- Choose database(s) and justify: SQL vs NoSQL, what schema
- Identify the core data flow for the most critical use case (e.g. post tweet, see feed)

## Step 4 — Deep Dive

- Pick the **hardest 2–3 sub-problems** and solve them in depth
- Common deep-dives: feed generation, search, notifications, chat, storage, consistency
- Discuss trade-offs explicitly: "I chose X over Y because… the downside is…"
- Address bottlenecks identified in estimation: if 350K QPS read, explain how cache + CDN handles it

> **TIP:** **In interviews:** spend 5 min on Step 1, 5 min on Step 2, 15 min on Step 3, and 15 min on Step 4. Interviewers want to see your thought process and trade-off reasoning more than a perfect answer.
