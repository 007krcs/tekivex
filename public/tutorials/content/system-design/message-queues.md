## Why Message Queues?

A message queue **decouples** the producer (sender) from the consumer (receiver). The producer puts a message on the queue and continues immediately, without waiting for the consumer to process it. Think of it as a mailbox — you drop off a letter and walk away.

- **Decoupling** — services evolve independently
- **Buffering** — absorb traffic spikes without dropping requests
- **Async processing** — offload heavy work (email, image resize, ML inference)
- **Retry & dead-letter** — failed messages can be retried or inspected

## Point-to-Point vs Pub/Sub

| Point-to-Point | Pub/Sub (Fan-out) |
| --- | --- |
| One producer, one consumer | One producer, many consumers |
| Each message consumed by exactly one consumer | Each message delivered to all subscribers |
| Work queue pattern | Event broadcast pattern |
| Example: SQS, RabbitMQ work queue | Example: Kafka topics, SNS, Redis Pub/Sub |
| Good for: task distribution, job processing | Good for: notifications, event-driven architecture |

## Message Flow

**Flow:**

1. **Producer** — Creates and sends message
2. **Queue / Topic** — Stores message durably
3. **Consumer** — Pulls and processes message
4. **Acknowledge** — Confirms successful processing
5. **Delete / Commit** — Message removed from queue


## Simple Queue Implementation

<!-- title: simple-queue.ts -->
```typescript
import Redis from 'ioredis';

const redis = new Redis();

interface Message<T = unknown> {
  id: string;
  payload: T;
  createdAt: number;
  retries: number;
}

class SimpleQueue<T> {
  constructor(private name: string) {}

  /** Enqueue a message */
  async enqueue(payload: T): Promise<string> {
    const msg: Message<T> = {
      id: crypto.randomUUID(),
      payload,
      createdAt: Date.now(),
      retries: 0,
    };
    await redis.lpush(`queue:${this.name}`, JSON.stringify(msg));
    return msg.id;
  }

  /** Dequeue with blocking wait (up to timeoutSec) */
  async dequeue(timeoutSec = 5): Promise<Message<T> | null> {
    const result = await redis.brpop(`queue:${this.name}`, timeoutSec);
    if (!result) return null;
    return JSON.parse(result[1]) as Message<T>;
  }

  /** Get queue length */
  async length(): Promise<number> {
    return redis.llen(`queue:${this.name}`);
  }
}

// --- Usage ---
interface EmailJob {
  to: string;
  subject: string;
  body: string;
}

const emailQueue = new SimpleQueue<EmailJob>('emails');

// Producer
await emailQueue.enqueue({
  to: 'user@example.com',
  subject: 'Welcome!',
  body: 'Thanks for signing up.',
});

// Consumer (worker process)
async function worker() {
  while (true) {
    const msg = await emailQueue.dequeue();
    if (msg) {
      console.log(`Sending email to ${msg.payload.to}`);
      // await sendEmail(msg.payload);
    }
  }
}
```

## Queue Comparison

| Feature | RabbitMQ | Apache Kafka | AWS SQS |
| --- | --- | --- | --- |
| Model | Message broker | Event streaming log | Managed queue |
| Ordering | Per-queue FIFO | Per-partition ordered | Best-effort (FIFO option) |
| Delivery | At-most-once or at-least-once | At-least-once | At-least-once |
| Retention | Until consumed | Configurable (days/forever) | Up to 14 days |
| Throughput | Moderate (~50K msg/s) | Very high (~1M msg/s) | High (managed) |
| Best for | Task queues, RPC | Event sourcing, stream processing | Serverless, simple async |

> **TIP:** Always design consumers to be **idempotent** — processing the same message twice should produce the same result. Messages can be delivered more than once in almost every queue system.

## Dead Letter Queues

A dead letter queue (DLQ) captures messages that fail processing after multiple retries. Instead of losing them, you can inspect and reprocess them later. Always configure a DLQ in production.

## Key Takeaways

1. Use queues to decouple producers from consumers and absorb traffic spikes.
2. Point-to-point for work distribution; pub/sub for event broadcast.
3. Make consumers idempotent — duplicate messages will happen.
4. Always configure dead letter queues for failed messages.
