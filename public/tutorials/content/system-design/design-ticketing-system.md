## Requirements

| Type | Requirement |
| --- | --- |
| Functional | Browse events and venues; select seats on an interactive map; reserve and purchase tickets |
| Functional | Each seat can only be booked by one user at a time (no double-booking) |
| Non-functional | 10M DAU; 100K concurrent users during peak (popular event launch) |
| Non-functional | Seat reservation must be consistent — eventual consistency is not acceptable |
| Non-functional | Reserve-to-payment window: 10 minutes (after which the seat is released) |

## The Core Challenge: Seat Reservation

Ticketing is a classic **high-contention write problem**. At event launch, thousands of users simultaneously try to reserve the same limited seats. Standard optimistic locking at the DB layer will cause massive retry storms.

**Flow:**

1. **User selects seat** — Frontend shows real-time seat availability via WebSocket/SSE
2. **Reserve (10-min hold)** — Acquire Redis lock on seat ID; write reservation to DB with expiry
3. **Payment** — User completes payment within 10 min; redirect to payment gateway
4. **Confirm or Release** — Payment webhook: confirm reservation. Timeout: release seat.


<!-- title: Atomic Seat Reservation with Redis + DB -->
```typescript
async function reserveSeat(seatId: string, userId: string): Promise<boolean> {
  // Atomic: SET if Not eXists + 10-min expiry
  const lockKey = `seat:lock:${seatId}`;
  const reserved = await redis.set(lockKey, userId, 'NX', 'EX', 600);

  if (!reserved) return false; // Seat already held by someone else

  // Write pending reservation to DB
  await db.reservations.create({
    seatId, userId, status: 'pending',
    expiresAt: new Date(Date.now() + 600_000),
  });

  // Schedule expiry cleanup (via job queue)
  await queue.add('release-seat', { seatId }, { delay: 600_000 });

  return true;
}
```

## Handling Flash Sales

- **Queue-based admission** — a virtual waiting room queues users; only N are let into the reservation flow at once
- **Pre-shard seats** — partition seats into buckets; each bucket handled by a separate DB instance to reduce contention
- **Read replicas for browsing** — seat availability reads from replicas (with 1–2s staleness acceptable for display)
- **CDN for static content** — venue maps, images served from edge to protect origin
