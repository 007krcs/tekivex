## The Principle

**Liskov Substitution Principle:** If `S` is a subtype of `T`, then objects of type `T` may be replaced with objects of type `S` without altering any of the desirable properties of the program (correctness, task performed, etc.).

> **NOTE:** Formulated by Barbara Liskov in 1987. In practical terms: a subclass must be usable anywhere its parent class is expected, without surprises.

### The Rectangle/Square Problem

In geometry, a square *is-a* rectangle. But in code, making `Square extends Rectangle` violates LSP because a square's `setWidth` must also change height, breaking the expectation that width and height are independent.

<!-- title: RectangleSquare.ts (BAD — violates LSP) -->
```typescript
class Rectangle {
  constructor(protected width: number, protected height: number) {}

  setWidth(w: number) { this.width = w; }
  setHeight(h: number) { this.height = h; }
  area(): number { return this.width * this.height; }
}

class Square extends Rectangle {
  setWidth(w: number) { this.width = w; this.height = w; }  // surprise!
  setHeight(h: number) { this.width = h; this.height = h; } // surprise!
}

// Client code expects Rectangle behavior:
function resize(rect: Rectangle) {
  rect.setWidth(5);
  rect.setHeight(10);
  console.assert(rect.area() === 50); // FAILS for Square (100)!
}
```

### The Correct Fix

<!-- title: Shape.ts (GOOD — follows LSP) -->
```typescript
// Use a common abstraction that does not promise independent width/height
interface Shape {
  area(): number;
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}
  area(): number { return this.width * this.height; }

  withWidth(w: number): Rectangle { return new Rectangle(w, this.height); }
  withHeight(h: number): Rectangle { return new Rectangle(this.width, h); }
}

class Square implements Shape {
  constructor(private side: number) {}
  area(): number { return this.side * this.side; }

  withSide(s: number): Square { return new Square(s); }
}

// Both are Shapes, but neither pretends to be the other
function printArea(shape: Shape) {
  console.log(`Area: ${shape.area()}`); // Always correct!
}
```

### LSP Violations Checklist

- Subclass **throws unexpected exceptions** not thrown by parent
- Subclass **ignores or overrides** parent methods to do nothing
- Subclass **strengthens preconditions** (rejects valid inputs)
- Subclass **weakens postconditions** (returns weaker guarantees)
- Client code uses `instanceof` checks to handle subtypes differently

### Real-World Example

<!-- title: ReadOnlyCollection.ts -->
```typescript
// BAD: ReadOnlyList extends List but throws on mutation
class List<T> {
  protected items: T[] = [];
  add(item: T) { this.items.push(item); }
  get(index: number) { return this.items[index]; }
}

class ReadOnlyList<T> extends List<T> {
  add(_item: T) { throw new Error('Cannot add to read-only list'); } // LSP violation!
}

// GOOD: Separate interfaces
interface Readable<T> { get(index: number): T | undefined; }
interface Writable<T> { add(item: T): void; }

class MutableList<T> implements Readable<T>, Writable<T> {
  private items: T[] = [];
  add(item: T) { this.items.push(item); }
  get(index: number) { return this.items[index]; }
}

class ImmutableList<T> implements Readable<T> {
  constructor(private items: T[]) {}
  get(index: number) { return this.items[index]; }
  // No add method — no surprise!
}
```

> **TIP:** **Key takeaway:** If your subclass has to neuter or fundamentally change a parent method, the inheritance relationship is wrong. Prefer composition or separate interfaces.
