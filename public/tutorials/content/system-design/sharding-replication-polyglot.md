## Database Replication

**Replication** copies data to multiple nodes for availability and read scaling. The primary node accepts writes; replicas (followers) receive the write log.

| Topology | Writes | Reads | Consistency | Use Case |
| --- | --- | --- | --- | --- |
| Single Primary | Primary only | Primary + replicas | Strong on primary, eventual on replicas | Most OLTP systems |
| Multi-Primary | Any node | Any node | Eventual (conflict resolution needed) | Multi-region writes, CRDTs |
| Synchronous replication | Primary waits for replica ACK | Replica reads = consistent | Strong | Financial systems, <2 nodes |
| Asynchronous replication | Primary doesn't wait | Replica reads may be stale | Eventual | Most common — better performance |

## Sharding (Horizontal Partitioning)

**Sharding** splits data across multiple database nodes. Each shard holds a subset. The application (or a proxy) routes each query to the correct shard.

- **Range sharding** — shard by ID range (0–1M on shard 1, 1M–2M on shard 2). Simple; hot spots when new data concentrates on one shard.
- **Hash sharding** — `shard = hash(key) % N`. Even distribution; resharding when N changes is expensive.
- **Consistent hashing** — place nodes on a ring; keys route to next node clockwise. Only K/N keys reroute when a node is added/removed. Used by Cassandra, DynamoDB.
- **Directory-based** — lookup table maps key → shard. Flexible; the lookup table becomes a bottleneck.

## Polyglot Persistence

**Polyglot persistence** uses multiple database technologies in one system — each chosen for the specific access pattern it serves best.

<!-- title: Polyglot Architecture — E-Commerce Example -->
```typescript
// Users & orders → PostgreSQL (ACID, complex queries)
const user = await pg.query('SELECT * FROM users WHERE id = $1', [userId]);

// Product catalog → MongoDB (flexible schema, nested attributes)
const product = await mongo.collection('products').findOne({ _id: productId });

// Sessions & cart → Redis (TTL, fast reads/writes)
await redis.setex(`cart:${userId}`, 3600, JSON.stringify(cart));

// Search → Elasticsearch (full-text, facets)
const results = await es.search({ index: 'products', query: { match: { name: q } } });

// Images/videos → S3 (object storage, CDN-friendly)
const url = s3.getSignedUrl('getObject', { Bucket: 'media', Key: imageKey });

// Analytics → ClickHouse (columnar, fast aggregation)
await ch.query(`INSERT INTO events VALUES (${userId}, '${event}', now())`);
```
