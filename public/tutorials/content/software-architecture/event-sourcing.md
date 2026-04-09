## What is Event Sourcing?

**Event Sourcing** persists the state of an entity as a sequence of immutable, append-only domain events rather than storing just the current state. To get the current state, you replay all events from the beginning.

> **NOTE:** Think of it like a bank account: the balance is derived from the sequence of deposits and withdrawals (events), not stored as a standalone number.

### Event Sourcing Flow

**Flow:**

1. **Command** — Intent to change state (e.g., WithdrawMoney)
2. **Aggregate** — Validates command, produces event
3. **Event Store** — Appends event to immutable log
4. **Projection** — Consumes events, builds read views
5. **Read View** — Optimized query model for the UI


### Event-Sourced Aggregate

<!-- title: domain/BankAccount.ts -->
```typescript
// Domain events — immutable facts
type AccountEvent =
  | { type: 'AccountOpened'; accountId: string; owner: string; openedAt: Date }
  | { type: 'MoneyDeposited'; amount: number; depositedAt: Date }
  | { type: 'MoneyWithdrawn'; amount: number; withdrawnAt: Date }
  | { type: 'AccountClosed'; closedAt: Date };

class BankAccount {
  private balance = 0;
  private closed = false;
  private uncommitted: AccountEvent[] = [];

  // Apply event to update state (used during replay AND when producing events)
  private apply(event: AccountEvent) {
    switch (event.type) {
      case 'AccountOpened':
        this.balance = 0;
        this.closed = false;
        break;
      case 'MoneyDeposited':
        this.balance += event.amount;
        break;
      case 'MoneyWithdrawn':
        this.balance -= event.amount;
        break;
      case 'AccountClosed':
        this.closed = true;
        break;
    }
  }

  // Raise an event: validate, apply, and record
  private raise(event: AccountEvent) {
    this.apply(event);
    this.uncommitted.push(event);
  }

  // Command methods
  static open(accountId: string, owner: string): BankAccount {
    const account = new BankAccount();
    account.raise({
      type: 'AccountOpened', accountId, owner, openedAt: new Date(),
    });
    return account;
  }

  deposit(amount: number) {
    if (this.closed) throw new Error('Account is closed');
    if (amount <= 0) throw new Error('Amount must be positive');
    this.raise({ type: 'MoneyDeposited', amount, depositedAt: new Date() });
  }

  withdraw(amount: number) {
    if (this.closed) throw new Error('Account is closed');
    if (amount > this.balance) throw new Error('Insufficient funds');
    this.raise({ type: 'MoneyWithdrawn', amount, withdrawnAt: new Date() });
  }

  close() {
    if (this.balance !== 0) throw new Error('Balance must be zero to close');
    this.raise({ type: 'AccountClosed', closedAt: new Date() });
  }

  // Rehydrate from event history
  static fromHistory(events: AccountEvent[]): BankAccount {
    const account = new BankAccount();
    events.forEach(e => account.apply(e));
    return account;
  }

  getUncommittedEvents(): AccountEvent[] { return [...this.uncommitted]; }
  getBalance(): number { return this.balance; }
}
```

### Event Store

<!-- title: infrastructure/EventStore.ts -->
```typescript
// Simplified event store — append-only log
interface StoredEvent {
  streamId: string;
  version: number;
  type: string;
  data: unknown;
  timestamp: Date;
}

class EventStore {
  private streams = new Map<string, StoredEvent[]>();

  append(streamId: string, events: AccountEvent[], expectedVersion: number): void {
    const stream = this.streams.get(streamId) ?? [];

    // Optimistic concurrency check
    if (stream.length !== expectedVersion) {
      throw new Error(`Concurrency conflict: expected v${expectedVersion}, got v${stream.length}`);
    }

    const stored = events.map((e, i) => ({
      streamId,
      version: expectedVersion + i + 1,
      type: e.type,
      data: e,
      timestamp: new Date(),
    }));

    this.streams.set(streamId, [...stream, ...stored]);
  }

  getStream(streamId: string): StoredEvent[] {
    return this.streams.get(streamId) ?? [];
  }
}
```

### Projection Example

<!-- title: projections/AccountBalanceProjection.ts -->
```typescript
// Projection builds a denormalized read model from events
class AccountBalanceProjection {
  private balances = new Map<string, { owner: string; balance: number; status: string }>();

  handle(event: StoredEvent) {
    const data = event.data as AccountEvent;
    switch (data.type) {
      case 'AccountOpened':
        this.balances.set(event.streamId, {
          owner: data.owner, balance: 0, status: 'open',
        });
        break;
      case 'MoneyDeposited': {
        const acc = this.balances.get(event.streamId)!;
        acc.balance += data.amount;
        break;
      }
      case 'MoneyWithdrawn': {
        const acc = this.balances.get(event.streamId)!;
        acc.balance -= data.amount;
        break;
      }
      case 'AccountClosed': {
        const acc = this.balances.get(event.streamId)!;
        acc.status = 'closed';
        break;
      }
    }
  }

  getBalance(accountId: string) {
    return this.balances.get(accountId) ?? null;
  }
}
```

### Pros vs Cons

| Pros | Cons |
| --- | --- |
| Complete audit trail — every change is recorded | Increased complexity in design and ops |
| Temporal queries — state at any point in time | Eventual consistency between event store and projections |
| Debug by replaying events | Event schema evolution is challenging |
| Build new read models by replaying history | Storage grows indefinitely (snapshotting helps) |
| Natural fit with CQRS and DDD | Steep learning curve for teams |
| Enables event-driven microservices | Harder to do ad-hoc queries on event store |

### Snapshots

For aggregates with many events, replaying from the beginning is slow. **Snapshots** periodically save the current state so you only need to replay events *after* the snapshot.

<!-- title: Snapshot Strategy -->
```typescript
// Save snapshot every N events
async function loadAggregate(accountId: string): Promise<BankAccount> {
  const snapshot = await snapshotStore.getLatest(accountId);
  const fromVersion = snapshot?.version ?? 0;

  const events = await eventStore.getStream(accountId, fromVersion);

  const account = snapshot
    ? BankAccount.fromSnapshot(snapshot.data)
    : new BankAccount();

  events.forEach(e => account.apply(e.data));

  // Save new snapshot if we replayed many events
  if (events.length > 100) {
    await snapshotStore.save(accountId, account.toSnapshot(), account.version);
  }

  return account;
}
```

> **TIP:** **Key takeaway:** Event Sourcing stores what happened (events) rather than what is (current state). Combined with CQRS, it provides a powerful architecture for complex domains that need audit trails, temporal queries, and event-driven integration.
