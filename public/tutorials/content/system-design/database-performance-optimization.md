## Indexing Strategy

An **index** is a data structure (usually B-tree) that speeds up reads at the cost of write overhead and storage. The wrong index strategy is the #1 cause of slow production queries.

| Index Type | Use Case | Example |
| --- | --- | --- |
| B-tree (default) | Equality and range queries | WHERE created_at > '2024-01-01' |
| Hash | Equality-only (faster than B-tree) | WHERE user_id = $1 (exact match) |
| Composite | Multi-column filters (order matters) | (tenant_id, created_at) — filter by tenant first |
| Partial | Index a subset of rows | WHERE status = 'active' — don't index archived rows |
| GIN/GiST | Full-text, JSON, arrays, geospatial | WHERE tags @> ARRAY['react'] |
| Covering | All SELECT columns in index (index-only scan) | CREATE INDEX ON orders (user_id) INCLUDE (total) |

## Reading EXPLAIN ANALYZE

<!-- title: EXPLAIN ANALYZE — Find Sequential Scans -->
```sql
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT o.id, o.total, u.email
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.status = 'pending'
  AND o.created_at > NOW() - INTERVAL '7 days'
ORDER BY o.created_at DESC
LIMIT 100;

-- 🔴 Warning signs to fix:
--   Seq Scan on orders   → missing index on (status, created_at)
--   Hash Join (rows=500K) → consider (user_id) index on orders
--   Buffers: read=50000  → 50K blocks read from disk (slow)

-- ✅ Add composite index:
CREATE INDEX CONCURRENTLY idx_orders_status_created
  ON orders (status, created_at DESC)
  WHERE status = 'pending'; -- partial index
```

## Connection Pooling

Every database connection has overhead (memory, auth, TCP). Opening a new connection per request at high load kills performance. Use a **connection pool** to reuse a fixed number of persistent connections.

<!-- title: PgBouncer + node-postgres Pool Config -->
```typescript
import { Pool } from 'pg';

// Application-level pool (connects to PgBouncer in production)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,            // Max connections per app instance
  idleTimeoutMillis: 10_000,
  connectionTimeoutMillis: 3_000,
});

// Rule of thumb: max_connections = (2 * CPU cores) + disk spindles
// PgBouncer sits between app (many connections) and Postgres (few connections)
// Transaction-mode pooling: connections released after each transaction
```

> **TIP:** The **N+1 query problem**: loading 100 users then querying orders for each one = 101 queries. Fix with a JOIN or DataLoader (batch + deduplicate). This single issue is responsible for more production slowdowns than any other.
