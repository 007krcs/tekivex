## Creational Patterns Overview

Creational patterns abstract the instantiation process. They help make a system independent of how its objects are created, composed, and represented. The five GoF creational patterns are: **Factory Method**, **Abstract Factory**, **Builder**, **Singleton**, and **Prototype**.

| Pattern | Purpose | Real-World Analogy |
| --- | --- | --- |
| Factory Method | Delegate object creation to subclasses | A hiring manager posting jobs for different departments |
| Abstract Factory | Create families of related objects | A furniture catalog (Modern set vs Victorian set) |
| Builder | Construct complex objects step by step | Ordering a customized pizza with toppings |
| Singleton | Ensure a class has only one instance | A country has one president at a time |
| Prototype | Clone existing objects instead of creating new | Photocopying a document template |

---

### 1. Factory Method

Define an interface for creating objects, but let subclasses decide which class to instantiate. The Factory Method lets a class defer instantiation to subclasses.

<!-- title: FactoryMethod.ts -->
```typescript
// Product interface
interface Notification {
  send(message: string): void;
}

// Concrete products
class EmailNotification implements Notification {
  send(message: string) { console.log(`Email: ${message}`); }
}

class SMSNotification implements Notification {
  send(message: string) { console.log(`SMS: ${message}`); }
}

class PushNotification implements Notification {
  send(message: string) { console.log(`Push: ${message}`); }
}

// Factory Method — subclasses decide which product to create
abstract class NotificationFactory {
  abstract createNotification(): Notification;

  // Template method uses the factory method
  notify(message: string) {
    const notification = this.createNotification();
    notification.send(message);
  }
}

class EmailNotificationFactory extends NotificationFactory {
  createNotification() { return new EmailNotification(); }
}

class SMSNotificationFactory extends NotificationFactory {
  createNotification() { return new SMSNotification(); }
}

// Usage
const factory: NotificationFactory = new SMSNotificationFactory();
factory.notify('Your order has shipped!');
```

> **TIP:** **When to use Factory Method:** When a class cannot anticipate the type of objects it needs to create, or when subclasses should specify what gets created.

---

### 2. Abstract Factory

Provide an interface for creating *families* of related objects without specifying their concrete classes. Ensures that products from the same family are used together.

<!-- title: AbstractFactory.ts -->
```typescript
// Product interfaces
interface Button { render(): string; }
interface Input { render(): string; }
interface Card { render(): string; }

// Abstract Factory
interface UIFactory {
  createButton(): Button;
  createInput(): Input;
  createCard(): Card;
}

// Dark theme family
class DarkButton implements Button { render() { return '<button class="dark">'; } }
class DarkInput implements Input { render() { return '<input class="dark">'; } }
class DarkCard implements Card { render() { return '<div class="card dark">'; } }

class DarkUIFactory implements UIFactory {
  createButton() { return new DarkButton(); }
  createInput() { return new DarkInput(); }
  createCard() { return new DarkCard(); }
}

// Light theme family
class LightButton implements Button { render() { return '<button class="light">'; } }
class LightInput implements Input { render() { return '<input class="light">'; } }
class LightCard implements Card { render() { return '<div class="card light">'; } }

class LightUIFactory implements UIFactory {
  createButton() { return new LightButton(); }
  createInput() { return new LightInput(); }
  createCard() { return new LightCard(); }
}

// Client — works with any factory, ensuring consistent theme
function renderForm(factory: UIFactory) {
  const card = factory.createCard();
  const input = factory.createInput();
  const button = factory.createButton();
  return `${card.render()}${input.render()}${button.render()}`;
}
```

> **TIP:** **When to use Abstract Factory:** When the system must use one of several families of products, and products within a family must be used together (e.g., UI themes, OS-specific widgets).

---

### 3. Builder

Separate the construction of a complex object from its representation. The same construction process can create different representations.

<!-- title: Builder.ts -->
```typescript
// Complex object
interface HttpRequest {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: string;
  timeout: number;
  retries: number;
}

// Builder — step-by-step construction with fluent API
class HttpRequestBuilder {
  private request: Partial<HttpRequest> = {
    method: 'GET',
    headers: {},
    timeout: 30000,
    retries: 0,
  };

  url(url: string) { this.request.url = url; return this; }
  method(m: string) { this.request.method = m; return this; }
  header(key: string, value: string) {
    this.request.headers![key] = value;
    return this;
  }
  body(b: string) { this.request.body = b; return this; }
  timeout(ms: number) { this.request.timeout = ms; return this; }
  retries(n: number) { this.request.retries = n; return this; }

  build(): HttpRequest {
    if (!this.request.url) throw new Error('URL is required');
    return this.request as HttpRequest;
  }
}

// Usage — readable, no giant constructor
const req = new HttpRequestBuilder()
  .url('https://api.example.com/users')
  .method('POST')
  .header('Content-Type', 'application/json')
  .header('Authorization', 'Bearer token123')
  .body(JSON.stringify({ name: 'Alice' }))
  .timeout(5000)
  .retries(3)
  .build();
```

> **TIP:** **When to use Builder:** When constructing an object requires many optional parameters, or when the same construction process should create different representations.

---

### 4. Singleton

Ensure a class has only one instance and provide a global point of access to it. Use sparingly — singletons are essentially global state.

<!-- title: Singleton.ts -->
```typescript
// Classic Singleton
class Logger {
  private static instance: Logger;
  private logs: string[] = [];

  private constructor() {} // Private constructor prevents direct instantiation

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message: string) {
    const entry = `[${new Date().toISOString()}] ${message}`;
    this.logs.push(entry);
    console.log(entry);
  }

  getHistory(): string[] { return [...this.logs]; }
}

// Modern alternative — module-level singleton (preferred in TypeScript)
// logger.ts
class LoggerService {
  private logs: string[] = [];

  log(message: string) {
    this.logs.push(`[${new Date().toISOString()}] ${message}`);
  }
}

export const logger = new LoggerService(); // Module creates single instance
```

> **CAUTION:** **Warning:** Singletons introduce global state, making testing and parallel execution difficult. Prefer dependency injection where possible. In TypeScript/ES modules, a module-level instance is often simpler and equally effective.

---

### 5. Prototype

Create new objects by cloning an existing instance (the prototype) rather than constructing from scratch. Useful when object creation is expensive.

<!-- title: Prototype.ts -->
```typescript
// Prototype interface
interface Cloneable<T> {
  clone(): T;
}

// Complex object that is expensive to create
class GridConfiguration implements Cloneable<GridConfiguration> {
  columns: Array<{ id: string; width: number; visible: boolean }> = [];
  theme: 'light' | 'dark' = 'light';
  pageSize = 50;
  filters: Map<string, string> = new Map();
  sortOrder: Array<{ column: string; direction: 'asc' | 'desc' }> = [];

  clone(): GridConfiguration {
    const copy = new GridConfiguration();
    copy.columns = this.columns.map(c => ({ ...c }));
    copy.theme = this.theme;
    copy.pageSize = this.pageSize;
    copy.filters = new Map(this.filters);
    copy.sortOrder = this.sortOrder.map(s => ({ ...s }));
    return copy;
  }
}

// Registry of prototypes
class ConfigRegistry {
  private prototypes = new Map<string, GridConfiguration>();

  register(name: string, config: GridConfiguration) {
    this.prototypes.set(name, config);
  }

  create(name: string): GridConfiguration {
    const proto = this.prototypes.get(name);
    if (!proto) throw new Error(`No prototype: ${name}`);
    return proto.clone(); // Clone, don't share!
  }
}

// Usage
const registry = new ConfigRegistry();
const defaultConfig = new GridConfiguration();
defaultConfig.columns = [{ id: 'name', width: 200, visible: true }];
defaultConfig.theme = 'dark';
registry.register('default', defaultConfig);

const myConfig = registry.create('default'); // Clone of default
myConfig.pageSize = 100; // Does not affect the prototype
```

> **TIP:** **When to use Prototype:** When creating objects is expensive (complex initialization, DB lookups), or when you need many similar objects that differ slightly from a template.

---

### Summary

| Pattern | Creates | Key Benefit | Drawback |
| --- | --- | --- | --- |
| Factory Method | Single product via subclass | Decouples client from concrete class | Requires subclass per product type |
| Abstract Factory | Family of related products | Ensures consistent product families | Hard to add new product types |
| Builder | Complex object step by step | Readable construction, optional params | More code for the builder class |
| Singleton | Exactly one instance | Global access, lazy initialization | Global state, hard to test |
| Prototype | Clone of existing object | Avoids expensive construction | Deep cloning can be tricky |
