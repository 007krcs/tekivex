## Why Shard?

When a single database server cannot handle the data volume or query load, you split the data across multiple servers — this is **sharding** (horizontal partitioning). Each shard holds a subset of the data.

## Sharding Strategies

| Strategy | How It Works | Pros | Cons |
| --- | --- | --- | --- |
| Range-based | Shard by value range (A-M, N-Z) | Simple, range queries easy | Hot spots if data is skewed |
| Hash-based | Hash the shard key, mod by shard count | Even distribution | Range queries need scatter-gather |
| Directory-based | Lookup table maps keys to shards | Flexible, custom placement | Lookup service is a SPOF |
| Geo-based | Shard by geographic region | Data locality | Cross-region queries are expensive |

## Sharded Cluster Architecture

*Sharded cluster with 3 shards, each having a primary and replica.*

## Sharding vs Replication

| Sharding (Partition) | Replication (Copy) |
| --- | --- |
| Splits data across nodes | Copies data to multiple nodes |
| Each shard has unique data | Each replica has the same data |
| Scales write throughput | Scales read throughput |
| Increases total storage capacity | Provides redundancy / fault tolerance |
| Complex: cross-shard queries, rebalancing | Simpler: replication lag is the main concern |

## Replication Topologies

| Topology | How It Works | Consistency | Use Case |
| --- | --- | --- | --- |
| Single-leader | One primary accepts writes; replicas for reads | Strong (sync) or Eventual (async) | Most OLTP workloads |
| Multi-leader | Multiple primaries accept writes | Conflict resolution needed | Multi-region deployments |
| Leaderless | Any node accepts reads and writes | Quorum-based (R + W > N) | Cassandra, DynamoDB |

## Choosing a Shard Key

The shard key determines which shard stores each record. A bad shard key creates **hot spots** (one shard gets most of the traffic). Good shard keys have high cardinality and even distribution.

> **CAUTION:** Avoid using timestamps as shard keys! All recent writes would go to the same shard. Instead, use a hash of the user ID or a compound key like `user_id + timestamp`.

- **Good shard keys:** user_id, order_id, tenant_id
- **Bad shard keys:** timestamp, country (low cardinality), auto-increment ID

## Rebalancing Shards

When you add or remove shards, data must be redistributed. **Consistent hashing** minimizes data movement by only moving keys that map to the changed portion of the hash ring. Virtual nodes improve balance further.

## Key Takeaways

1. Use replication for read scaling and HA; use sharding for write scaling and storage.
2. Choose shard keys with high cardinality and even distribution.
3. Consistent hashing minimizes data movement during rebalancing.
4. Combine sharding + replication for both scale and fault tolerance.
