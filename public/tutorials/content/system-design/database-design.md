## SQL vs NoSQL Overview

Choosing a database is one of the most impactful decisions in system design. **SQL databases** (relational) enforce a structured schema and support complex joins. **NoSQL databases** offer flexible schemas and horizontal scalability at the cost of some consistency guarantees.

| SQL (PostgreSQL) | NoSQL (MongoDB) |
| --- | --- |
| Fixed schema with migrations | Flexible/dynamic schema |
| ACID transactions | Eventual consistency (tunable) |
| Complex JOINs and aggregations | Denormalized, embedded documents |
| Vertical scaling (read replicas help) | Horizontal scaling (sharding) |
| Best for: structured data, relationships | Best for: unstructured, high-write loads |
| Examples: PostgreSQL, MySQL, SQLite | Examples: MongoDB, Cassandra, DynamoDB |

## Normalization

Normalization organizes data to **reduce redundancy**. Each fact is stored in exactly one place. This makes updates consistent but can require expensive JOINs for reads.

| Normal Form | Rule | Example |
| --- | --- | --- |
| 1NF | No repeating groups; atomic columns | Separate phone numbers into rows, not comma-separated |
| 2NF | No partial dependencies on composite keys | Move product name to products table |
| 3NF | No transitive dependencies | Move city/state to a separate addresses table |

## SQL Schema Example

<!-- title: schema.sql -->
```sql
-- Users table
CREATE TABLE users (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email       VARCHAR(255) UNIQUE NOT NULL,
    name        VARCHAR(100) NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Posts table (normalized — references users)
CREATE TABLE posts (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    body        TEXT NOT NULL,
    published   BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Tags (many-to-many via junction table)
CREATE TABLE tags (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE post_tags (
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    tag_id  INT  REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Indexes for common queries
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_published ON posts(published) WHERE published = TRUE;
```

## NoSQL Schema Example

<!-- title: mongo-schema.ts -->
```typescript
// MongoDB — denormalized document model
// Embed related data to avoid joins

interface PostDocument {
  _id: ObjectId;
  title: string;
  body: string;
  published: boolean;

  // Embedded author (denormalized)
  author: {
    _id: ObjectId;
    name: string;
    email: string;
  };

  // Embedded tags (no junction table needed)
  tags: string[];

  createdAt: Date;
}

// Example document:
// {
//   _id: ObjectId("..."),
//   title: "System Design 101",
//   body: "...",
//   published: true,
//   author: { _id: ObjectId("..."), name: "Alice", email: "alice@example.com" },
//   tags: ["system-design", "tutorial"],
//   createdAt: ISODate("2025-01-15")
// }

// Indexes
db.posts.createIndex({ "author._id": 1 });
db.posts.createIndex({ tags: 1 });
db.posts.createIndex({ published: 1, createdAt: -1 });
```

## Indexing Strategies

| Index Type | When to Use | Example |
| --- | --- | --- |
| B-tree (default) | Equality and range queries | WHERE age > 25 |
| Hash | Exact equality only | WHERE email = '...' |
| GIN (inverted) | Full-text search, array/JSON fields | WHERE tags @> ARRAY['js'] |
| Partial | Index only matching rows | WHERE published = TRUE |
| Composite | Multi-column queries | WHERE author_id = ? AND published = TRUE |

> **CAUTION:** Every index speeds up reads but **slows down writes** because the index must be updated on every INSERT/UPDATE. Only index columns you actually query on. Use `EXPLAIN ANALYZE` to verify indexes are being used.

## When to Choose What

| Scenario | Recommended | Reason |
| --- | --- | --- |
| E-commerce with transactions | SQL (PostgreSQL) | ACID for orders and payments |
| Social media feed | NoSQL (Cassandra) | High write throughput, time-series data |
| User profiles with varied fields | NoSQL (MongoDB) | Flexible schema per user |
| Analytics and reporting | SQL (PostgreSQL) or columnar (ClickHouse) | Complex aggregations and JOINs |
| Real-time chat messages | NoSQL (Cassandra/ScyllaDB) | Massive write volume, partition by chat room |

## Key Takeaways

1. Start with SQL unless you have a specific reason for NoSQL.
2. Normalize in SQL; denormalize (embed) in NoSQL.
3. Index columns you query, but not every column.
4. Consider access patterns first — schema follows queries.
