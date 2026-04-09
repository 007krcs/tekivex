## DR Tiers by Cost vs Recovery Speed

| Strategy | RTO | RPO | Cost | How |
| --- | --- | --- | --- | --- |
| Cold Standby | Hours | Hours | $ | Restore from backup into freshly provisioned infra |
| Warm Standby | 15–30 min | Minutes | $$$ | Scaled-down replica running; scale up on failover |
| Hot Standby (Active-Passive) | < 5 min | Seconds | $$$$ | Full-size replica; automated DNS failover |
| Active-Active | Seconds | ~0 | $$$$$ | Both regions serve live traffic; instant failover |

## DR Runbook Essentials

1. **Declare incident** — who declares, how to communicate
2. **Assess blast radius** — which services are affected?
3. **Failover database** — promote read replica; update connection strings
4. **Redirect DNS** — update Route53/Cloudflare to point to DR region
5. **Verify health checks** — confirm all services are green in DR region
6. **Notify stakeholders** — status page, customer comms
7. **Root cause analysis** — write blameless postmortem within 48h

## Chaos Engineering

**Chaos Engineering** (pioneered by Netflix) proactively injects failures into production to verify resilience before real incidents expose gaps.

- **Netflix Chaos Monkey** — randomly terminates EC2 instances in production
- **AWS Fault Injection Simulator (FIS)** — inject CPU/memory pressure, network latency, AZ outages
- **Gremlin** — managed chaos platform with resource, network, state attacks
- Start small: kill one instance in staging, then non-peak production, then on-call hours

> **TIP:** **Game Days**: schedule a 4-hour window where a team intentionally causes failures and practices the runbook. This builds muscle memory before a real 3 AM incident.
