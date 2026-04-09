## Relational Databases (SQL)

Relational databases store data in **tables with rows and columns**, enforce a schema, and use SQL for queries. They provide **ACID** transactions: Atomicity, Consistency, Isolation, Durability.

- **Strengths:** complex joins, strong consistency, mature tooling, flexible queries
- **Weaknesses:** schema changes are painful; vertical scaling hits limits; not great for hierarchical or unstructured data
- **Examples:** PostgreSQL (OLTP + OLAP), MySQL, SQLite, CockroachDB (distributed SQL)

## NoSQL Database Types

| Type | Data Model | Strengths | Examples |
| --- | --- | --- | --- |
| Document | JSON/BSON documents | Flexible schema, rich queries, nested data | MongoDB, Firestore, CouchDB |
| Key-Value | key → opaque value | Sub-ms reads/writes, simple, infinitely scalable | Redis, DynamoDB, Riak |
| Wide-Column | Rows with dynamic columns | Write-heavy workloads, time-series, IoT | Cassandra, HBase, ScyllaDB |
| Graph | Nodes and edges | Relationship traversal, fraud detection, recommendations | Neo4j, Amazon Neptune, TigerGraph |
| Time-Series | Timestamped data points | Metrics, monitoring, fast range queries | InfluxDB, TimescaleDB, Prometheus |
| Search | Inverted index | Full-text search, facets, ranking | Elasticsearch, OpenSearch, Typesense |

## Choosing a Database

| Question | SQL | NoSQL |
| --- | --- | --- |
| Need ACID transactions? | ✓ Native | Varies (DynamoDB: single-item; MongoDB: multi-doc) |
| Schema known upfront? | ✓ Required | ✓ Optional — evolve freely |
| Complex joins / reporting? | ✓ Efficient | ✗ Expensive or impossible |
| Horizontal scale needed? | Hard (Citus, Vitess) | ✓ Built-in partitioning |
| Write throughput > 100K/s? | Difficult | ✓ Cassandra, DynamoDB |
| Graph relationships? | ✗ Many joins | ✓ Graph DB (Neo4j) |

> **TIP:** **Most production systems use both.** PostgreSQL for orders and users (ACID), Redis for caching and sessions, Elasticsearch for search, S3 for files. Use the right tool for each access pattern.
