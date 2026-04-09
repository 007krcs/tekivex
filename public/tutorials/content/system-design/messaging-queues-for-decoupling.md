## Why Messaging?

Synchronous service-to-service calls create **tight coupling** — if the downstream service is slow or down, the caller suffers. **Message queues** decouple producers from consumers: the producer writes to a queue and returns immediately; consumers process at their own pace.

- **Temporal decoupling** — producer and consumer don't need to be online simultaneously
- **Load leveling** — queue absorbs traffic spikes; consumers process at a steady rate
- **Retry & resilience** — failed messages stay in queue and retry automatically
- **Fan-out** — one event processed by multiple independent consumers

## Message Queue vs Pub/Sub

| Point-to-Point Queue | Pub/Sub (Topic) |
| --- | --- |
| One message consumed by one consumer | One message delivered to ALL subscribers |
| Message deleted after ACK | Message retained for all subscriber groups |
| Load balancing across consumers natural | Fan-out: email + analytics + audit all get it |
| RabbitMQ, SQS, ActiveMQ | Kafka, SNS, Google Pub/Sub |
| Order fulfillment, job processing | Events: order placed, user signed up |

| Feature | Kafka | RabbitMQ | AWS SQS |
| --- | --- | --- | --- |
| Model | Log-based pub/sub | AMQP queue/exchange | Managed point-to-point |
| Throughput | Millions/sec | 50K–100K/sec | Thousands/sec |
| Retention | Configurable (days/forever) | Until ACK | Up to 14 days |
| Replay | Yes — rewind offset | No | No |
| Ordering | Per partition | FIFO queue option | FIFO queue option |
| Best For | Event streaming, audit log, CDC | Complex routing, RPC, priority queues | Serverless, simple async jobs |

> **CAUTION:** **Design for at-least-once delivery.** All major queues guarantee at-least-once (not exactly-once). Make your consumers **idempotent** — processing the same message twice should be safe. Use a deduplication key or check for prior processing.
