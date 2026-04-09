## Requirements

- **Functional:** 1:1 and group messaging (max 512 members); online presence; delivery/read receipts; media messages (images, video)
- **Non-functional:** 2B users; 100B messages/day; messages delivered in < 100ms; messages must never be lost

## Core Architecture

**Flow:**

1. **Sender (WebSocket)** — Client sends message to chat server over persistent WebSocket
2. **Chat Server** — Assigns message ID (Snowflake); persists to DB; publishes to queue
3. **Message Queue** — Kafka fan-out to recipient's chat server(s); handles offline queuing
4. **Recipient Chat Server** — Push over WebSocket if online; else store in offline queue
5. **Receipt Propagation** — Delivered/read events flow back to sender the same way


## Message Ordering

Use a **Snowflake ID** (Twitter-style) for message IDs: 64-bit integer = 41-bit timestamp + 10-bit machine ID + 12-bit sequence. IDs are time-ordered, unique across servers, and reveal no sensitive information.

## Group Chat Fan-out

For a group of 512 members, a single sent message becomes 511 delivery operations. Use a **fan-out service** that reads group membership and enqueues one delivery task per member. For large groups, batch deliveries and use async processing.

> **NOTE:** **End-to-End Encryption (E2EE):** WhatsApp uses the Signal Protocol. Each device has a key pair; messages are encrypted with the recipient's public key on the sender's device. The server only ever sees ciphertext — it cannot read messages.
