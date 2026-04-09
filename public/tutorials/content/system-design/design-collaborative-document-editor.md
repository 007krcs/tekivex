## The Core Problem: Concurrent Edits

When two users edit the same document simultaneously, their operations must be merged without data loss. If User A inserts "Hello" at position 0, and User B inserts "World" at position 0 at the same time, how should these be reconciled?

## Operational Transformation (OT)

**OT** (used by Google Docs) transforms each incoming operation based on operations that were applied first. If A inserted at position 0 first, B's position-0 insert is transformed to position 5 to account for A's characters.

<!-- title: Simplified OT Transform -->
```typescript
type Op = { type: 'insert' | 'delete'; pos: number; text?: string };

// Transform op2 assuming op1 was already applied
function transform(op1: Op, op2: Op): Op {
  if (op1.type === 'insert' && op2.type === 'insert') {
    // op1 inserted before op2's position — shift op2 right
    if (op1.pos <= op2.pos) {
      return { ...op2, pos: op2.pos + (op1.text?.length ?? 0) };
    }
  }
  if (op1.type === 'delete' && op2.type === 'insert') {
    // op1 deleted before op2's position — shift op2 left
    if (op1.pos < op2.pos) {
      return { ...op2, pos: op2.pos - 1 };
    }
  }
  return op2; // No transformation needed
}
```

## CRDTs — The Alternative

**CRDTs** (Conflict-free Replicated Data Types) are data structures that automatically merge concurrent operations without coordination. Used by Figma, Linear, and Notion. They work offline natively and don't require a central server to sequence operations.

## System Architecture

| Component | Role |
| --- | --- |
| WebSocket Server | Real-time bidirectional channel per document session |
| OT/CRDT Engine | Transform and merge concurrent operations |
| Document Store | PostgreSQL: full document snapshots every N ops |
| Op Log | Append-only log of all operations (Redis Streams or Kafka) |
| Presence Service | Track cursors and active users per document (Redis pub/sub) |
| Revision History | Time-travel to any past version using op replay |
