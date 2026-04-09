## Service Layer Pattern

The **Service Layer** defines an application's boundary. It encapsulates the business logic, coordinates work between repositories, and provides a clear API for controllers or other entry points to consume.

Without a service layer, business logic leaks into controllers (making them fat) or into repositories (breaking single responsibility). The service layer gives business logic its own home.

### Architecture Flow

**Flow:**

1. **Route** — Maps URL to controller method
2. **Controller** — Parses request, delegates to service
3. **Service** — Business logic, validation, orchestration
4. **Repository** — Data access abstraction
5. **Database** — Persistent storage layer


### Thin Controller, Thick Service

Controllers should be **thin** — they parse the request, call a service method, and format the response. All business decisions happen in the service.

<!-- title: order.controller.ts -->
```typescript
import { Request, Response, NextFunction } from 'express';
import { OrderService } from './order.service';

export class OrderController {
  constructor(private orderService: OrderService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, items } = req.body;
      // Controller does NOT contain business logic
      const order = await this.orderService.createOrder(userId, items);
      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  }
}
```

### Service with Business Logic

<!-- title: order.service.ts -->
```typescript
import { OrderRepository } from './order.repository';
import { InventoryRepository } from './inventory.repository';
import { PaymentService } from './payment.service';

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export class OrderService {
  constructor(
    private orderRepo: OrderRepository,
    private inventoryRepo: InventoryRepository,
    private paymentService: PaymentService,
  ) {}

  async createOrder(userId: string, items: OrderItem[]) {
    // 1. Validate
    if (!items.length) throw new Error('Order must have at least one item');

    // 2. Check inventory for each item
    for (const item of items) {
      const available = await this.inventoryRepo.checkStock(item.productId);
      if (available < item.quantity) {
        throw new Error(`Insufficient stock for product ${item.productId}`);
      }
    }

    // 3. Calculate total
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    // 4. Process payment
    const paymentResult = await this.paymentService.charge(userId, total);
    if (!paymentResult.success) throw new Error('Payment failed');

    // 5. Deduct inventory
    for (const item of items) {
      await this.inventoryRepo.deduct(item.productId, item.quantity);
    }

    // 6. Create order record
    return this.orderRepo.create({
      userId,
      items,
      total,
      paymentId: paymentResult.id,
      status: 'confirmed',
    });
  }
}
```

### What Belongs Where?

| Concern | Controller | Service | Repository |
| --- | --- | --- | --- |
| Parse request body | ✅ | — | — |
| Validate business rules | — | ✅ | — |
| Orchestrate multi-step flows | — | ✅ | — |
| Format HTTP response | ✅ | — | — |
| SQL / database queries | — | — | ✅ |
| Call external APIs | — | ✅ | — |
| Error mapping to HTTP codes | ✅ | — | — |

> **TIP:** A good litmus test: if you can delete the controller and call the service from a CLI command or a message queue consumer, your separation is correct.

> **CAUTION:** Avoid **anemic services** that just proxy calls to a repository with no logic. If your service methods are one-liners, the layer adds no value.
