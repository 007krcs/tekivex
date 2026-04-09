## The Principle

**Dependency Inversion Principle:** (A) High-level modules should not depend on low-level modules. Both should depend on abstractions. (B) Abstractions should not depend on details. Details should depend on abstractions.

### Dependency Flow

**Flow:**

1. **High-Level Module** — Business logic (e.g., OrderService)
2. **Abstraction** — Interface (e.g., IPaymentGateway)
3. **Low-Level Module** — Implementation (e.g., StripeGateway)


Both high-level and low-level modules depend on the abstraction. The high-level module *defines* the interface, and the low-level module *implements* it. This inverts the traditional dependency direction.

### Without DIP

<!-- title: OrderService.ts (BAD — tightly coupled) -->
```typescript
import { StripeClient } from 'stripe'; // Direct dependency on low-level detail!

class OrderService {
  private stripe = new StripeClient('sk_live_...');

  async placeOrder(order: Order) {
    // High-level module depends directly on Stripe
    await this.stripe.charges.create({
      amount: order.total,
      currency: 'usd',
      source: order.paymentToken,
    });
    // Cannot test without Stripe, cannot switch to PayPal
  }
}
```

### With DIP

<!-- title: PaymentGateway.ts (GOOD — depends on abstraction) -->
```typescript
// Abstraction — defined by the HIGH-LEVEL module
interface PaymentGateway {
  charge(amount: number, currency: string, token: string): Promise<string>;
}

// High-level module depends on abstraction
class OrderService {
  constructor(private gateway: PaymentGateway) {}

  async placeOrder(order: Order): Promise<string> {
    const receiptId = await this.gateway.charge(
      order.total, 'usd', order.paymentToken
    );
    return receiptId;
  }
}

// Low-level module implements abstraction
class StripeGateway implements PaymentGateway {
  async charge(amount: number, currency: string, token: string) {
    const result = await stripe.charges.create({
      amount, currency, source: token,
    });
    return result.id;
  }
}

class PayPalGateway implements PaymentGateway {
  async charge(amount: number, currency: string, token: string) {
    const result = await paypal.payments.create({
      amount: { total: amount / 100, currency },
      payer: { payment_method: token },
    });
    return result.id;
  }
}
```

### Dependency Injection in Practice

<!-- title: Composition Root -->
```typescript
// Wire dependencies at the application entry point
function createApp() {
  // Choose implementation based on config
  const gateway: PaymentGateway =
    process.env.PAYMENT_PROVIDER === 'paypal'
      ? new PayPalGateway()
      : new StripeGateway();

  const orderService = new OrderService(gateway);
  return { orderService };
}

// In tests — inject a mock
class MockGateway implements PaymentGateway {
  public lastCharge?: { amount: number; currency: string; token: string };

  async charge(amount: number, currency: string, token: string) {
    this.lastCharge = { amount, currency, token };
    return 'mock-receipt-id';
  }
}

const mock = new MockGateway();
const service = new OrderService(mock);
await service.placeOrder(testOrder);
expect(mock.lastCharge?.amount).toBe(5000);
```

### DIP vs Dependency Injection

| Dependency Inversion (Principle) | Dependency Injection (Technique) |
| --- | --- |
| A design guideline about which way dependencies point | A mechanism for providing dependencies from outside |
| Says: depend on abstractions, not concretions | Says: pass dependencies through constructors/setters |
| Can be achieved without DI (e.g., service locator) | DI is the most common way to achieve DIP |
| About architecture direction | About wiring at runtime |

> **TIP:** **Key takeaway:** DIP inverts the direction of dependencies so that high-level policy does not depend on low-level details. Define interfaces in the high-level module and let low-level modules implement them. Dependency injection is the most common technique to achieve this.
