## HA Design Principles

- **Eliminate single points of failure (SPOF)** — every critical component has at least one standby
- **Design for failure** — assume any component will fail; the system must degrade gracefully
- **Fast detection** — health checks catch failures in seconds, not minutes
- **Fast recovery** — automated failover restores service without human intervention
- **Test failures in production** — Chaos Engineering (Netflix Chaos Monkey)

## Active-Passive vs Active-Active

| Active-Passive | Active-Active |
| --- | --- |
| One primary handles all traffic | All nodes handle live traffic |
| Standby ready to take over | Instant failover (just stop routing) |
| Failover time: 15–60 seconds | Failover time: < 1 second |
| Simpler to implement and reason about | Complex conflict resolution needed |
| Primary DB + read replicas | Multi-region load balanced APIs |

## Circuit Breaker Pattern

A **circuit breaker** wraps calls to an external service. After N consecutive failures, it **opens** and immediately returns an error without calling the service — protecting it from cascading failures and giving it time to recover.

**Flow:**

1. **Closed** — Normal operation. Calls pass through. Failures counted.
2. **Open** — Failure threshold exceeded. All calls fail-fast immediately.
3. **Half-Open** — After timeout, allow one probe request. Success → Close. Fail → Open.


<!-- title: Simple Circuit Breaker Implementation -->
```typescript
class CircuitBreaker {
  private failures = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  private nextRetry = 0;

  constructor(
    private threshold = 5,
    private timeout = 30_000
  ) {}

  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() < this.nextRetry) throw new Error('Circuit open');
      this.state = 'half-open';
    }
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFailure();
      throw err;
    }
  }

  private onSuccess() { this.failures = 0; this.state = 'closed'; }
  private onFailure() {
    this.failures++;
    if (this.failures >= this.threshold) {
      this.state = 'open';
      this.nextRetry = Date.now() + this.timeout;
    }
  }
}
```
