## Structural Patterns

Structural patterns deal with **object composition** — how classes and objects are combined to form larger structures. They ensure that if one part changes, the entire structure does not need to change.

---

### 1. Adapter

Convert the interface of a class into another interface clients expect. Adapter lets classes work together that could not otherwise because of incompatible interfaces.

<!-- title: Adapter.ts -->
```typescript
// Target interface your code expects
interface PaymentProcessor {
  charge(amount: number, currency: string): Promise<{ id: string; status: string }>;
}

// Third-party library with incompatible interface
class LegacyPaymentSDK {
  makePayment(cents: number, curr: string, callback: (err: Error | null, ref: string) => void) {
    setTimeout(() => callback(null, 'ref_' + Math.random()), 100);
  }
}

// Adapter — bridges the gap
class LegacyPaymentAdapter implements PaymentProcessor {
  constructor(private legacy: LegacyPaymentSDK) {}

  charge(amount: number, currency: string): Promise<{ id: string; status: string }> {
    return new Promise((resolve, reject) => {
      this.legacy.makePayment(amount, currency, (err, ref) => {
        if (err) return reject(err);
        resolve({ id: ref, status: 'success' });
      });
    });
  }
}

// Client code works with the clean interface
async function processPayment(processor: PaymentProcessor) {
  const result = await processor.charge(2500, 'USD');
  console.log(`Payment ${result.id}: ${result.status}`);
}
```

> **TIP:** **When to use Adapter:** When you need to integrate a third-party library or legacy system whose interface does not match what your code expects.

---

### 2. Facade

Provide a simplified, unified interface to a complex subsystem. The Facade does not add new functionality; it just makes existing functionality easier to use.

<!-- title: Facade.ts -->
```typescript
// Complex subsystem classes
class VideoDecoder { decode(file: string) { return `decoded:${file}`; } }
class AudioDecoder { decode(file: string) { return `audio:${file}`; } }
class SubtitleParser { parse(file: string) { return `subs:${file}`; } }
class Renderer { render(video: string, audio: string, subs: string) {
  return `Playing ${video} with ${audio} and ${subs}`;
}}

// Facade — simple API for complex operations
class MediaPlayerFacade {
  private video = new VideoDecoder();
  private audio = new AudioDecoder();
  private subs = new SubtitleParser();
  private renderer = new Renderer();

  play(filePath: string): string {
    const v = this.video.decode(filePath);
    const a = this.audio.decode(filePath);
    const s = this.subs.parse(filePath.replace('.mp4', '.srt'));
    return this.renderer.render(v, a, s);
  }
}

// Client only needs one method
const player = new MediaPlayerFacade();
player.play('movie.mp4');
```

> **TIP:** **When to use Facade:** When a subsystem has many classes and clients only need a simple interface. Common in library/SDK design.

---

### 3. Decorator

Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.

<!-- title: Decorator.ts -->
```typescript
// Component interface
interface Logger {
  log(message: string): void;
}

// Base component
class ConsoleLogger implements Logger {
  log(message: string) { console.log(message); }
}

// Decorators — each adds one responsibility
class TimestampDecorator implements Logger {
  constructor(private wrapped: Logger) {}
  log(message: string) {
    this.wrapped.log(`[${new Date().toISOString()}] ${message}`);
  }
}

class UpperCaseDecorator implements Logger {
  constructor(private wrapped: Logger) {}
  log(message: string) {
    this.wrapped.log(message.toUpperCase());
  }
}

class FilterDecorator implements Logger {
  constructor(private wrapped: Logger, private minLevel: string) {}
  log(message: string) {
    if (message.startsWith(`[${this.minLevel}]`) || this.minLevel === 'ALL') {
      this.wrapped.log(message);
    }
  }
}

// Compose decorators like layers
const logger: Logger = new TimestampDecorator(
  new UpperCaseDecorator(
    new ConsoleLogger()
  )
);
logger.log('server started');
// Output: [2024-01-15T10:30:00.000Z] SERVER STARTED
```

> **TIP:** **When to use Decorator:** When you need to add behavior to individual objects without affecting other objects of the same class. Classic example: middleware in Express, Java I/O streams.

---

## Behavioral Patterns

Behavioral patterns focus on **communication between objects** — how objects interact and distribute responsibilities.

---

### 4. Observer

Define a one-to-many dependency between objects. When one object (the Subject) changes state, all its dependents (Observers) are notified and updated automatically.

<!-- title: Observer.ts -->
```typescript
// Generic typed event emitter
type Listener<T> = (data: T) => void;

class EventEmitter<Events extends Record<string, unknown>> {
  private listeners = new Map<string, Set<Listener<any>>>();

  on<K extends keyof Events>(event: K, listener: Listener<Events[K]>): () => void {
    const key = event as string;
    if (!this.listeners.has(key)) this.listeners.set(key, new Set());
    this.listeners.get(key)!.add(listener);

    // Return unsubscribe function
    return () => this.listeners.get(key)?.delete(listener);
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    const key = event as string;
    this.listeners.get(key)?.forEach(fn => fn(data));
  }
}

// Usage — type-safe events
interface StoreEvents {
  'item:added': { id: string; name: string };
  'item:removed': { id: string };
  'cart:cleared': undefined;
}

const store = new EventEmitter<StoreEvents>();

const unsub = store.on('item:added', ({ id, name }) => {
  console.log(`Added ${name} (${id}) to cart`);
});

store.emit('item:added', { id: '1', name: 'Widget' });
unsub(); // Clean up
```

> **TIP:** **When to use Observer:** When changes in one object must be reflected in others, but you do not know how many objects need to update. Used in event systems, reactive state, pub/sub.

---

### 5. Strategy

Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

<!-- title: Strategy.ts -->
```typescript
// Strategy interface
interface SortStrategy<T> {
  sort(data: T[]): T[];
}

// Concrete strategies
class QuickSort<T> implements SortStrategy<T> {
  sort(data: T[]): T[] {
    if (data.length <= 1) return data;
    const pivot = data[0];
    const left = data.slice(1).filter(x => x <= pivot);
    const right = data.slice(1).filter(x => x > pivot);
    return [...this.sort(left), pivot, ...this.sort(right)];
  }
}

class InsertionSort<T> implements SortStrategy<T> {
  sort(data: T[]): T[] {
    const arr = [...data];
    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) { arr[j + 1] = arr[j]; j--; }
      arr[j + 1] = key;
    }
    return arr;
  }
}

// Context — delegates to strategy
class DataSorter<T> {
  constructor(private strategy: SortStrategy<T>) {}

  setStrategy(strategy: SortStrategy<T>) { this.strategy = strategy; }

  sort(data: T[]): T[] {
    // Automatically choose based on size
    if (data.length < 20) {
      this.strategy = new InsertionSort();
    }
    return this.strategy.sort(data);
  }
}
```

> **TIP:** **When to use Strategy:** When you have multiple algorithms for the same task and want to switch between them at runtime. Eliminates long `if/else` or `switch` chains.

---

### 6. Command

Encapsulate a request as an object, allowing you to parameterize clients with different requests, queue or log requests, and support undoable operations.

<!-- title: Command.ts -->
```typescript
// Command interface
interface Command {
  execute(): void;
  undo(): void;
}

// Concrete commands
class AddTextCommand implements Command {
  constructor(
    private doc: TextDocument,
    private text: string,
    private position: number,
  ) {}

  execute() { this.doc.insert(this.text, this.position); }
  undo() { this.doc.delete(this.position, this.text.length); }
}

class DeleteTextCommand implements Command {
  private deleted = '';
  constructor(
    private doc: TextDocument,
    private position: number,
    private length: number,
  ) {}

  execute() {
    this.deleted = this.doc.getText(this.position, this.length);
    this.doc.delete(this.position, this.length);
  }
  undo() { this.doc.insert(this.deleted, this.position); }
}

// Invoker — manages command history
class CommandHistory {
  private history: Command[] = [];
  private undone: Command[] = [];

  execute(command: Command) {
    command.execute();
    this.history.push(command);
    this.undone = []; // Clear redo stack
  }

  undo() {
    const cmd = this.history.pop();
    if (cmd) { cmd.undo(); this.undone.push(cmd); }
  }

  redo() {
    const cmd = this.undone.pop();
    if (cmd) { cmd.execute(); this.history.push(cmd); }
  }
}
```

> **TIP:** **When to use Command:** When you need undo/redo, command queuing, logging, or macro recording. Essential for text editors, drawing tools, and transaction-based systems.

---

### 7. Chain of Responsibility

Pass a request along a chain of handlers. Each handler decides either to process the request or pass it to the next handler in the chain.

<!-- title: ChainOfResponsibility.ts -->
```typescript
// Handler interface
interface Middleware {
  handle(request: HttpRequest, next: () => Response): Response;
}

interface HttpRequest {
  path: string;
  method: string;
  headers: Record<string, string>;
  body?: unknown;
}
interface Response { status: number; body: unknown; }

// Concrete handlers
class AuthMiddleware implements Middleware {
  handle(req: HttpRequest, next: () => Response): Response {
    if (!req.headers['authorization']) {
      return { status: 401, body: { error: 'Unauthorized' } };
    }
    return next(); // Pass to next in chain
  }
}

class RateLimitMiddleware implements Middleware {
  private requests = new Map<string, number>();

  handle(req: HttpRequest, next: () => Response): Response {
    const ip = req.headers['x-forwarded-for'] ?? 'unknown';
    const count = (this.requests.get(ip) ?? 0) + 1;
    this.requests.set(ip, count);

    if (count > 100) {
      return { status: 429, body: { error: 'Too many requests' } };
    }
    return next();
  }
}

class LoggingMiddleware implements Middleware {
  handle(req: HttpRequest, next: () => Response): Response {
    console.log(`${req.method} ${req.path}`);
    const response = next();
    console.log(`Response: ${response.status}`);
    return response;
  }
}

// Build the chain
function buildChain(middlewares: Middleware[], finalHandler: (req: HttpRequest) => Response) {
  return (req: HttpRequest): Response => {
    let index = 0;
    const next = (): Response => {
      if (index < middlewares.length) {
        return middlewares[index++].handle(req, next);
      }
      return finalHandler(req);
    };
    return next();
  };
}

// Usage
const handler = buildChain(
  [new LoggingMiddleware(), new AuthMiddleware(), new RateLimitMiddleware()],
  (req) => ({ status: 200, body: { message: 'OK' } })
);
```

> **TIP:** **When to use Chain of Responsibility:** When multiple objects may handle a request and the handler is determined at runtime. Classic example: HTTP middleware pipelines (Express, Koa).

---

### Pattern Summary

| Pattern | Category | Key Idea | Common Use |
| --- | --- | --- | --- |
| Adapter | Structural | Convert incompatible interface | Third-party library integration |
| Facade | Structural | Simplify complex subsystem | SDK/API wrappers |
| Decorator | Structural | Add behavior dynamically | Middleware, logging, caching |
| Observer | Behavioral | Notify dependents of changes | Event systems, reactive state |
| Strategy | Behavioral | Swap algorithms at runtime | Sorting, validation, pricing |
| Command | Behavioral | Encapsulate action as object | Undo/redo, queuing, macros |
| Chain of Resp. | Behavioral | Pass along handler chain | Middleware, approval workflows |

> **TIP:** **Key takeaway:** Structural patterns organize how objects are composed. Behavioral patterns define how objects communicate. Combined with creational patterns, these three categories cover the 23 classic GoF design patterns that form the vocabulary of software design.
