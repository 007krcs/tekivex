## System Overview

**Flow:**

1. **Event Source** — Services emit events (order placed, mention, follow)
2. **Notification Service** — Applies user preferences; deduplication; rate limiting
3. **Message Queue** — Kafka topics per channel (push/email/sms)
4. **Channel Workers** — Per-channel consumers call 3rd party APIs (FCM, SES, Twilio)
5. **Delivery Tracking** — Track sent/delivered/clicked; retry failed deliveries


## Channels and Providers

| Channel | Provider | Latency | Cost | Use Case |
| --- | --- | --- | --- | --- |
| Push (iOS) | APNs (Apple Push) | < 1 sec | Free | Mobile app alerts |
| Push (Android) | FCM (Firebase) | < 1 sec | Free | Mobile app alerts |
| Email | SES, SendGrid, Postmark | 1–60 sec | Low | Transactional, marketing |
| SMS | Twilio, AWS SNS | 1–10 sec | High ($0.01/msg) | Auth codes, urgent alerts |
| In-app | WebSocket / SSE | ms | Free | Real-time while app open |
| Webhook | HTTP POST to customer URL | ms–sec | Low | B2B integrations |

## Key Design Decisions

- **User preferences** — store per-user channel + type preferences in a fast-read store (Redis or DynamoDB)
- **Idempotency keys** — deduplicate notifications; same event processed twice must not send twice
- **Exponential backoff** — retry failed deliveries: 1m → 5m → 15m → 1h → dead-letter
- **Rate limiting** — max N notifications per user per day per channel; prevents spam
- **Priority queues** — auth/security notifications bypass rate limits; marketing doesn't
- **Template engine** — personalise content with user name, order ID, etc.
