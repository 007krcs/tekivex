## Concurrency vs Parallelism

| Concurrency | Parallelism |
| --- | --- |
| Multiple tasks making progress (interleaved) | Multiple tasks executing simultaneously |
| Single CPU, time-sliced | Multiple CPU cores |
| Node.js event loop, goroutines | Worker threads, multi-process, SIMD |
| I/O-bound work benefits most | CPU-bound work benefits most |
| "Dealing with many things at once" | "Doing many things at once" |

## Race Conditions

A **race condition** occurs when the correctness of a result depends on the relative timing of concurrent operations. The classic example is two requests both reading a balance, both seeing $100, both debiting $60, and both succeeding — leaving a negative balance.

<!-- title: Fixing a Race Condition with DB-Level Locking -->
```typescript
// ❌ Race condition: two requests both read balance = 100
async function withdrawUnsafe(userId: string, amount: number) {
  const { balance } = await db.query('SELECT balance FROM accounts WHERE id = $1', [userId]);
  if (balance < amount) throw new Error('Insufficient funds');
  await db.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [amount, userId]);
}

// ✅ Option 1: Atomic update with constraint check
async function withdrawAtomic(userId: string, amount: number) {
  const result = await db.query(
    'UPDATE accounts SET balance = balance - $1 WHERE id = $2 AND balance >= $1 RETURNING balance',
    [amount, userId]
  );
  if (result.rowCount === 0) throw new Error('Insufficient funds');
}

// ✅ Option 2: Optimistic locking with version field
async function withdrawOptimistic(userId: string, amount: number) {
  const { balance, version } = await db.query('SELECT balance, version FROM accounts WHERE id = $1', [userId]);
  if (balance < amount) throw new Error('Insufficient funds');
  const result = await db.query(
    'UPDATE accounts SET balance = $1, version = version + 1 WHERE id = $2 AND version = $3',
    [balance - amount, userId, version]
  );
  if (result.rowCount === 0) throw new Error('Concurrent update detected — retry');
}
```

## Distributed Locks

In distributed systems, a mutex inside one process doesn't prevent another server from running the same code. Use **Redis SETNX** (or Redlock) for distributed locking.

> **CAUTION:** **Distributed locks are not a silver bullet.** Clock drift, network partitions, and GC pauses can all cause lock expiry before work completes. Prefer **idempotent operations + optimistic concurrency** over distributed locks when possible.
