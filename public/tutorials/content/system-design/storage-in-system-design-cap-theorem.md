## The Storage Landscape

| Type | Abstraction | Access | Examples | Best For |
| --- | --- | --- | --- | --- |
| Block Storage | Raw blocks (like a disk) | Low-level, OS mounts as filesystem | AWS EBS, GCP Persistent Disk | Database volumes, VMs, high IOPS |
| File Storage | Files in a directory tree | NFS/SMB protocol | AWS EFS, Azure Files, NFS | Shared files, home dirs, legacy apps |
| Object Storage | Flat key-value blobs | HTTP REST API | S3, GCS, Azure Blob | Images, videos, backups, data lakes |
| In-Memory | Key-value in RAM | Sub-millisecond access | Redis, Memcached | Caching, session store, leaderboards |

## CAP Theorem

**CAP Theorem** (Brewer, 2000) states that a distributed system can guarantee at most **two of three** properties simultaneously: **C**onsistency, **A**vailability, and **P**artition Tolerance.

| Property | Meaning |
| --- | --- |
| Consistency (C) | Every read receives the most recent write or an error — no stale reads |
| Availability (A) | Every request gets a (non-error) response — even if data may be stale |
| Partition Tolerance (P) | System continues operating even when network partitions drop messages between nodes |

> **NOTE:** **P is not optional in real distributed systems** — network partitions happen. So the practical choice is **CP** (sacrifice availability during a partition) or **AP** (sacrifice consistency during a partition).

| CP Systems | AP Systems |
| --- | --- |
| Reject requests during partition | Return best available (possibly stale) data |
| Never return stale data | Stay available during partition |
| HBase, Zookeeper, MongoDB (w/ majority writes) | Cassandra, DynamoDB, CouchDB |
| Banks, inventory, distributed locks | Shopping carts, DNS, social feeds |
| Prioritise correctness over uptime | Prioritise uptime over perfect accuracy |

## PACELC — Beyond CAP

**PACELC** extends CAP: even when there is **no partition**, you still must choose between **latency** and **consistency**. DynamoDB defaults to eventual consistency (low latency) but offers strong consistency reads at higher cost. Most real design decisions are on this P → latency/consistency axis.
