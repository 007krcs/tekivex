## Defining Availability

Availability measures the **percentage of time** a system is operational and accessible. It is expressed as "nines" — 99.9% (three nines) means roughly 8.7 hours of downtime per year.

| Nines | Availability | Downtime / Year | Downtime / Month |
| --- | --- | --- | --- |
| Two nines | 99% | 3.65 days | 7.3 hours |
| Three nines | 99.9% | 8.76 hours | 43.8 minutes |
| Four nines | 99.99% | 52.6 minutes | 4.38 minutes |
| Five nines | 99.999% | 5.26 minutes | 26.3 seconds |

> **NOTE:** Each additional nine is **exponentially harder** (and more expensive) to achieve. Going from 99.9% to 99.99% often requires completely re-architecting your system.

## SLA, SLO, and SLI

- **SLI (Service Level Indicator)** — a measured metric, e.g. request latency p99
- **SLO (Service Level Objective)** — the target value for an SLI, e.g. p99 latency < 200ms
- **SLA (Service Level Agreement)** — a contract with consequences if SLOs are missed

## Redundancy & Failover

Redundancy means having **backup components** ready to take over when a primary fails. Failover is the process of switching to the backup. Think of a hospital generator: when the main power grid goes down, the generator kicks in automatically.

**Flow:**

1. **Primary Server** — Handles all production traffic
2. **Heartbeat Check** — Monitors primary health every few seconds
3. **Failure Detected** — Primary stops responding
4. **Standby Promoted** — Hot standby becomes new primary
5. **Traffic Rerouted** — DNS/LB points to new primary


### Active-Passive vs Active-Active

| Active-Passive (Hot Standby) | Active-Active |
| --- | --- |
| One server handles traffic | All servers handle traffic |
| Standby idles until failover | No idle resources |
| Simpler to implement | More complex (data sync) |
| Some downtime during switch | Near-zero downtime failover |
| Standby cost with no throughput benefit | Better resource utilization |

## High Availability vs Disaster Recovery

| High Availability (HA) | Disaster Recovery (DR) |
| --- | --- |
| Prevents downtime within a region | Recovers from region-wide failures |
| Automatic failover in seconds | Can take minutes to hours |
| Redundant components in same data center | Backups in different geographic region |
| Goal: minimize unplanned downtime | Goal: recover from catastrophic events |
| Example: database replicas with auto-failover | Example: cross-region S3 replication |

## Measuring Reliability

Reliability is about the system producing **correct results consistently**. A system can be available (it responds) but unreliable (it returns wrong data). Key metrics include:

| Metric | What It Measures |
| --- | --- |
| MTBF (Mean Time Between Failures) | Average time the system runs without failing |
| MTTR (Mean Time To Repair) | Average time to fix a failure |
| Error rate | Percentage of requests that return errors |
| Data durability | Probability that stored data is not lost (e.g., 99.999999999%) |

> **TIP:** **Availability = MTBF / (MTBF + MTTR)**. To improve availability you can either increase MTBF (better hardware, fewer bugs) or decrease MTTR (faster detection, automated recovery).

## Key Takeaways

1. Define your SLOs *before* designing the system.
2. Redundancy removes single points of failure.
3. Active-active gives better utilization but adds complexity.
4. HA protects within a region; DR protects across regions.
