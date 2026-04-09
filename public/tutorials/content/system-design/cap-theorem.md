## The CAP Theorem Explained

The CAP theorem (Brewer's theorem) states that a distributed data store can guarantee **at most two** of the following three properties simultaneously:

- **Consistency (C)** — every read receives the most recent write or an error
- **Availability (A)** — every request receives a non-error response (though it may not be the latest data)
- **Partition Tolerance (P)** — the system continues to operate despite network partitions between nodes

> **CAUTION:** In practice, network partitions *will* happen. So the real choice is between **CP** (consistency during partition, sacrificing availability) and **AP** (availability during partition, sacrificing consistency).

## CAP Triangle

*The CAP triangle — pick two guarantees; the third is sacrificed during partitions.*

## Database Classification

| Database | Type | CAP Choice | Trade-off |
| --- | --- | --- | --- |
| PostgreSQL (single node) | Relational | CA | No partition tolerance — single server |
| MongoDB (replica set) | Document | CP | Rejects writes during partition until new primary elected |
| HBase | Wide-column | CP | Consistent reads; unavailable during region server failure |
| Cassandra | Wide-column | AP | Always writable; eventual consistency between replicas |
| DynamoDB | Key-value | AP | Eventually consistent reads by default; optional strong reads |
| CockroachDB | Relational | CP | Serializable SQL; unavailable minority partitions |

## Consistency Models

CAP's "C" is specifically **linearizability** (the strongest model). In practice, systems offer a spectrum of consistency:

| Model | Guarantee | Example |
| --- | --- | --- |
| Strong (linearizable) | Reads always see the latest write | Google Spanner |
| Sequential | All nodes see operations in the same order | ZooKeeper |
| Causal | Causally related operations are ordered | MongoDB causal sessions |
| Eventual | Replicas converge eventually | Cassandra, DynamoDB default |

> **TIP:** Many modern databases let you *tune* consistency per query. DynamoDB supports both eventually consistent and strongly consistent reads. Choose based on the use case — user profiles can be eventual, but bank balances need strong consistency.

## PACELC Extension

PACELC extends CAP: during a **Partition**, choose **A** or **C**; **Else** (no partition), choose **Latency** or **Consistency**. This captures the real-world trade-off that exists even when the network is healthy.

## Key Takeaways

1. Network partitions are inevitable — the real choice is CP vs AP.
2. Most applications need different consistency levels for different data.
3. CAP is a simplification; PACELC is more nuanced.
4. Choose your database based on your **consistency requirements**, not popularity.
