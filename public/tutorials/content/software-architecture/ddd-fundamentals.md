## What is Domain-Driven Design?

**Domain-Driven Design (DDD)** is an approach to software development that centers the design on the core business domain. It uses a shared *Ubiquitous Language* between developers and domain experts, and structures code to reflect the domain model.

> **NOTE:** DDD was introduced by Eric Evans in his 2003 book. It is most valuable for complex domains where the business logic — not the technology — is the primary challenge.

### Key Building Blocks

| Concept | Definition | Example |
| --- | --- | --- |
| Entity | Has a unique identity that persists over time | User (identified by userId) |
| Value Object | Defined by its attributes, no identity, immutable | Money(100, "USD"), Email("a@b.com") |
| Aggregate | Cluster of entities treated as a single unit | Order (with OrderLines, ShippingAddress) |
| Aggregate Root | Entry point to the aggregate, ensures consistency | Order is the root; OrderLine is accessed through Order |
| Repository | Abstracts persistence of aggregates | OrderRepository.save(order) |
| Domain Service | Logic that does not belong to a single entity | PricingService.calculateDiscount() |
| Domain Event | Something meaningful that happened in the domain | OrderPlaced, PaymentReceived |
| Bounded Context | Explicit boundary where a model applies | Sales context vs Shipping context |

### Bounded Contexts

*Bounded Contexts communicate through well-defined interfaces (Anti-Corruption Layers, Events)*

### Entity vs Value Object

| Entity | Value Object |
| --- | --- |
| Has a unique identity (ID) | No identity — defined by attributes |
| Mutable — state changes over time | Immutable — create new instead of modify |
| Equality based on ID | Equality based on all attributes |
| Example: User, Order, Account | Example: Money, Email, DateRange |
| Tracked in repository by ID | Embedded inside entities |

### Entity Code Example

<!-- title: domain/entities/Order.ts -->
```typescript
// Entity — identified by orderId, state changes over time
class Order {
  private lines: OrderLine[] = [];
  private status: OrderStatus = 'draft';

  constructor(
    public readonly orderId: string,
    private customerId: string,
  ) {}

  addLine(productId: string, quantity: number, unitPrice: Money): void {
    if (this.status !== 'draft') {
      throw new Error('Cannot modify a placed order');
    }
    this.lines.push(new OrderLine(productId, quantity, unitPrice));
  }

  get total(): Money {
    return this.lines.reduce(
      (sum, line) => sum.add(line.subtotal),
      Money.zero('USD')
    );
  }

  place(): void {
    if (this.lines.length === 0) throw new Error('Cannot place empty order');
    this.status = 'placed';
    // Raise domain event: OrderPlaced
  }

  // Equality by identity
  equals(other: Order): boolean {
    return this.orderId === other.orderId;
  }
}
```

### Value Object Code Example

<!-- title: domain/value-objects/Money.ts -->
```typescript
// Value Object — immutable, equality by attributes
class Money {
  constructor(
    public readonly amount: number,
    public readonly currency: string,
  ) {
    if (amount < 0) throw new Error('Amount cannot be negative');
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot add different currencies');
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  multiply(factor: number): Money {
    return new Money(Math.round(this.amount * factor), this.currency);
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  static zero(currency: string): Money {
    return new Money(0, currency);
  }

  toString(): string {
    return `${this.currency} ${(this.amount / 100).toFixed(2)}`;
  }
}
```

### Aggregate Rules

1. Only the **Aggregate Root** can be referenced from outside the aggregate
2. All changes to the aggregate go **through the root**
3. Aggregates are the **unit of persistence** — save/load the entire aggregate
4. Keep aggregates **small** — only group things that must be consistent together
5. Reference other aggregates by **ID**, not by direct object reference

> **CAUTION:** **Common mistake:** Making aggregates too large. If Order contained the full Customer entity, changing a customer name would lock the order. Reference Customer by `customerId` instead.

> **TIP:** **Key takeaway:** DDD aligns your code with the business domain using a shared language. Entities have identity; Value Objects are defined by their data. Aggregates enforce consistency boundaries. Bounded Contexts keep different models from conflicting.
