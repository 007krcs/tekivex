## Unit of Work

The **Unit of Work** pattern tracks all changes made during a business transaction and coordinates writing those changes to the database in a single atomic operation. If any step fails, everything rolls back.

> **NOTE:** Martin Fowler describes Unit of Work as maintaining a list of objects affected by a business transaction and coordinating the writing out of changes and the resolution of concurrency problems.

### Transaction Flow

**Flow:**

1. **Begin Transaction** — Open a database transaction context
2. **Operation 1** — Create order record via OrderRepository
3. **Operation 2** — Deduct inventory via InventoryRepository
4. **Operation 3** — Create payment via PaymentRepository
5. **Commit / Rollback** — All succeed → commit; any fail → rollback


### UnitOfWork Interface

<!-- title: unit-of-work.ts -->
```typescript
import { Pool, PoolClient } from 'pg';

export class UnitOfWork {
  private client: PoolClient | null = null;

  constructor(private pool: Pool) {}

  async begin(): Promise<PoolClient> {
    this.client = await this.pool.connect();
    await this.client.query('BEGIN');
    return this.client;
  }

  async commit(): Promise<void> {
    if (!this.client) throw new Error('Transaction not started');
    await this.client.query('COMMIT');
    this.client.release();
    this.client = null;
  }

  async rollback(): Promise<void> {
    if (!this.client) throw new Error('Transaction not started');
    await this.client.query('ROLLBACK');
    this.client.release();
    this.client = null;
  }

  /** Execute a callback within a managed transaction */
  async execute<T>(work: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.begin();
    try {
      const result = await work(client);
      await this.commit();
      return result;
    } catch (err) {
      await this.rollback();
      throw err;
    }
  }
}
```

### Transaction-Aware Repository

<!-- title: transactional-order.repository.ts -->
```typescript
import { PoolClient } from 'pg';

export class OrderRepository {
  constructor(private client: PoolClient) {}

  async create(userId: string, total: number) {
    const { rows } = await this.client.query(
      'INSERT INTO orders (user_id, total, status) VALUES ($1, $2, $3) RETURNING *',
      [userId, total, 'pending']
    );
    return rows[0];
  }
}

export class InventoryRepository {
  constructor(private client: PoolClient) {}

  async deduct(productId: string, qty: number) {
    const { rowCount } = await this.client.query(
      'UPDATE inventory SET quantity = quantity - $2 WHERE product_id = $1 AND quantity >= $2',
      [productId, qty]
    );
    if (rowCount === 0) throw new Error('Insufficient inventory');
  }
}
```

### Putting It Together

<!-- title: checkout.service.ts -->
```typescript
import { UnitOfWork } from './unit-of-work';
import { OrderRepository } from './transactional-order.repository';
import { InventoryRepository } from './transactional-order.repository';

export class CheckoutService {
  constructor(private uow: UnitOfWork) {}

  async placeOrder(userId: string, productId: string, qty: number, price: number) {
    return this.uow.execute(async (client) => {
      const orderRepo = new OrderRepository(client);
      const inventoryRepo = new InventoryRepository(client);

      // Both operations share the same transaction
      await inventoryRepo.deduct(productId, qty);
      const order = await orderRepo.create(userId, qty * price);

      return order;
      // If deduct or create fails, BOTH are rolled back
    });
  }
}
```

> **TIP:** ORMs like TypeORM and MikroORM have built-in Unit of Work support through `EntityManager.transaction()` or `em.flush()`. You do not always need to build this from scratch.

- **Atomicity** — All-or-nothing semantics for multi-step business operations.
- **Consistency** — Database constraints are never left in a half-applied state.
- **Reduced round-trips** — Changes can be batched into a single commit.
- **Concurrency safety** — Combine with optimistic locking for safe concurrent access.
