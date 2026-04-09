## The Principle

**Open/Closed Principle:** Software entities (classes, modules, functions) should be *open for extension* (you can add new behavior) but *closed for modification* (you do not change existing code).

> **NOTE:** Bertrand Meyer coined OCP in 1988. The modern interpretation (by Uncle Bob) relies on polymorphism and abstractions rather than inheritance.

### Before: Violating OCP

<!-- title: DiscountCalculator.ts (BAD) -->
```typescript
// Every new discount type requires modifying this function
function calculateDiscount(type: string, amount: number): number {
  if (type === 'percentage') {
    return amount * 0.1;
  } else if (type === 'fixed') {
    return 10;
  } else if (type === 'bogo') {
    return amount * 0.5;
  }
  // Adding 'loyalty' discount? Must change this file!
  return 0;
}
```

### After: Following OCP with Strategy Pattern

<!-- title: DiscountStrategy.ts (GOOD) -->
```typescript
// Abstraction — open for extension
interface DiscountStrategy {
  calculate(amount: number): number;
}

// Concrete strategies — each is self-contained
class PercentageDiscount implements DiscountStrategy {
  constructor(private rate: number) {}
  calculate(amount: number) { return amount * this.rate; }
}

class FixedDiscount implements DiscountStrategy {
  constructor(private value: number) {}
  calculate(amount: number) { return Math.min(this.value, amount); }
}

class BuyOneGetOneFree implements DiscountStrategy {
  calculate(amount: number) { return amount * 0.5; }
}

// Adding a new discount? Just create a new class!
class LoyaltyDiscount implements DiscountStrategy {
  constructor(private years: number) {}
  calculate(amount: number) { return amount * Math.min(this.years * 0.02, 0.2); }
}

// Calculator is CLOSED for modification
class DiscountCalculator {
  calculate(strategy: DiscountStrategy, amount: number): number {
    return strategy.calculate(amount);
  }
}
```

### OCP Flow

**Flow:**

1. **New Requirement** — Business wants a loyalty discount
2. **Create Class** — Write LoyaltyDiscount implements DiscountStrategy
3. **Register** — Add to configuration or DI container
4. **Done** — No existing code was modified!


### Techniques for OCP

| Technique | When to Use |
| --- | --- |
| Strategy Pattern | Multiple interchangeable algorithms |
| Plugin Architecture | System needs to be extended by third parties |
| Decorator Pattern | Add behavior to objects without subclassing |
| Event/Observer Pattern | React to events without coupling to handlers |
| Generics/Templates | Algorithms that work with multiple types |

> **CAUTION:** **Warning:** Do not pre-emptively abstract everything. Apply OCP at points where you *know* change is likely. Premature abstraction adds complexity without benefit.

> **TIP:** **Key takeaway:** OCP means you can add new behavior by writing new code, not by modifying existing code. The Strategy pattern, plugins, and decorators are your primary tools.
