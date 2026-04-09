## SLI, SLO, and SLA

| Term | Meaning | Example |
| --- | --- | --- |
| SLI (Service Level Indicator) | A measured metric of service behaviour | Request success rate = successful_requests / total_requests |
| SLO (Service Level Objective) | Internal target for an SLI | Success rate ≥ 99.9% over 30 days |
| SLA (Service Level Agreement) | External contract with penalties for breach | If uptime < 99.9%, customer gets 25% credit |

## The Nines

| Availability | Monthly Downtime | Yearly Downtime | Achievable With |
| --- | --- | --- | --- |
| 99% (2 nines) | 7.3 hours | 3.65 days | Single server, manual deploys |
| 99.9% (3 nines) | 43.8 min | 8.76 hours | Basic HA with load balancer |
| 99.95% | 21.9 min | 4.38 hours | Multi-AZ, auto-failover |
| 99.99% (4 nines) | 4.4 min | 52.6 min | Active-active multi-region |
| 99.999% (5 nines) | 26 sec | 5.26 min | Extremely complex — Google-scale |

## Error Budgets

An **error budget** is the amount of unreliability you are allowed before breaching your SLO. If your SLO is 99.9%, you have a 0.1% error budget (43.8 min/month). Teams can spend error budget on risky releases; when it runs out, feature deployments pause until reliability improves.

> **TIP:** Error budgets align engineering and product: reliability isn't just "ops' problem" — if product ships too fast and burns the budget, new features pause. This **incentivises reliability at the team level**.

## Common SLIs to Measure

- **Availability** — % of time the service returns non-5xx responses
- **Latency** — % of requests served in < N ms (e.g. 95% under 200ms)
- **Error rate** — % of requests returning 5xx
- **Saturation** — % CPU / memory / queue depth utilised
- **Freshness** — for data pipelines, how old is the latest processed record?
