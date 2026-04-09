## What is CQRS?

**CQRS** separates the responsibility for reading data (Queries) from the responsibility for changing data (Commands). Instead of a single model for both, you maintain separate optimized models for reads and writes.

> **NOTE:** CQRS was formalized by Greg Young, building on Bertrand Meyer's Command-Query Separation (CQS) principle. CQS applies at the method level; CQRS applies at the architectural level.

### CQRS Data Flow

**Flow:**

1. **Command** — User action: CreateOrder, UpdateProfile
2. **Command Handler** — Validates, executes business logic
3. **Write Model** — Domain entities, normalized DB
4. **Domain Event** — OrderCreated published to event bus
5. **Read Model** — Denormalized projection, optimized for queries
6. **Query** — Fast read from optimized view


### CRUD vs CQRS

| Traditional CRUD | CQRS |
| --- | --- |
| Single model for reads and writes | Separate models for reads and writes |
| Same database schema serves both | Different storage optimized for each |
| Simple to implement and understand | More complex but highly scalable |
| Limited scalability — reads and writes compete | Reads and writes scale independently |
| Ideal for simple domains | Ideal for complex domains with different read/write patterns |

### Command Handler

<!-- title: commands/PlaceOrderCommand.ts -->
```typescript
// Command — describes intent to change state
interface PlaceOrderCommand {
  type: 'PlaceOrder';
  customerId: string;
  items: Array<{ productId: string; quantity: number }>;
}

// Command Handler — validates and executes
class PlaceOrderHandler {
  constructor(
    private orderRepo: OrderRepository,
    private eventBus: EventBus,
  ) {}

  async handle(cmd: PlaceOrderCommand): Promise<string> {
    // Business validation
    if (cmd.items.length === 0) {
      throw new Error('Order must have at least one item');
    }

    // Create aggregate
    const order = Order.create(cmd.customerId, cmd.items);

    // Persist write model
    await this.orderRepo.save(order);

    // Publish domain event for read model projection
    await this.eventBus.publish({
      type: 'OrderPlaced',
      orderId: order.id,
      customerId: cmd.customerId,
      items: cmd.items,
      total: order.total,
      placedAt: new Date(),
    });

    return order.id;
  }
}
```

### Query Handler

<!-- title: queries/GetOrderSummaryQuery.ts -->
```typescript
// Query — request for data, never modifies state
interface GetOrderSummaryQuery {
  type: 'GetOrderSummary';
  orderId: string;
}

// Read model — denormalized, optimized for display
interface OrderSummaryView {
  orderId: string;
  customerName: string;
  itemCount: number;
  total: number;
  status: string;
  placedAt: Date;
}

// Query Handler — reads from optimized projection
class GetOrderSummaryHandler {
  constructor(private readDb: ReadDatabase) {}

  async handle(query: GetOrderSummaryQuery): Promise<OrderSummaryView | null> {
    // Simple, fast read — no business logic
    return this.readDb.findOne<OrderSummaryView>(
      'order_summaries',
      { orderId: query.orderId }
    );
  }
}
```

### Event Projection

<!-- title: projections/OrderSummaryProjection.ts -->
```typescript
// Projection — builds read model from domain events
class OrderSummaryProjection {
  constructor(private readDb: ReadDatabase) {}

  async handle(event: DomainEvent) {
    switch (event.type) {
      case 'OrderPlaced':
        await this.readDb.upsert('order_summaries', {
          orderId: event.orderId,
          customerName: event.customerName,
          itemCount: event.items.length,
          total: event.total,
          status: 'placed',
          placedAt: event.placedAt,
        });
        break;

      case 'OrderShipped':
        await this.readDb.update('order_summaries',
          { orderId: event.orderId },
          { status: 'shipped', shippedAt: event.shippedAt }
        );
        break;
    }
  }
}
```

### When to Use CQRS

| Use CQRS When | Avoid CQRS When |
| --- | --- |
| Read and write patterns differ significantly | Simple CRUD with matching read/write shapes |
| Read-heavy systems (100:1 read/write ratio) | Equal read and write load |
| Complex domain with rich business rules | Straightforward data entry forms |
| You need independent read/write scaling | Single database is sufficient |
| Multiple views of the same data | One-to-one correspondence between form and storage |

> **CAUTION:** **Eventual consistency:** With separate read and write stores, the read model may lag behind. Users might submit a command and not see the result immediately. Design your UI to handle this (optimistic updates, loading indicators).

> **TIP:** **Key takeaway:** CQRS splits your application into command (write) and query (read) sides, each optimized independently. It adds complexity but pays off in systems where read and write patterns are fundamentally different.
