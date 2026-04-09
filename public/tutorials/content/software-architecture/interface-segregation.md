## The Principle

**Interface Segregation Principle:** Clients should not be forced to depend on interfaces they do not use. Instead of one large interface, create multiple small, role-specific interfaces.

### Analogy: Restaurant Menu vs Buffet

| Fat Interface (Buffet) | Segregated Interfaces (Menu) |
| --- | --- |
| Every customer gets access to everything | Choose exactly what you need |
| Pay for items you never eat | Only pay for what you order |
| Changes to sushi station affect dessert area | Changes to appetizers do not affect entrees |
| Overwhelming and wasteful | Focused and efficient |

### Before: Fat Interface

<!-- title: IWorker.ts (BAD) -->
```typescript
// Fat interface — every implementation must handle everything
interface IWorker {
  work(): void;
  eat(): void;
  sleep(): void;
  attendMeeting(): void;
  writeReport(): void;
}

// Robot worker must implement eat() and sleep()??
class RobotWorker implements IWorker {
  work() { /* ... */ }
  eat() { throw new Error('Robots do not eat'); }  // Forced!
  sleep() { throw new Error('Robots do not sleep'); }  // Forced!
  attendMeeting() { /* ... */ }
  writeReport() { /* ... */ }
}
```

### After: Segregated Interfaces

<!-- title: SegregatedWorker.ts (GOOD) -->
```typescript
// Small, role-specific interfaces
interface Workable {
  work(): void;
}

interface Feedable {
  eat(): void;
  sleep(): void;
}

interface Reportable {
  writeReport(): void;
  attendMeeting(): void;
}

// Human implements all relevant interfaces
class HumanWorker implements Workable, Feedable, Reportable {
  work() { console.log('Working...'); }
  eat() { console.log('Eating lunch...'); }
  sleep() { console.log('Sleeping...'); }
  writeReport() { console.log('Writing report...'); }
  attendMeeting() { console.log('In meeting...'); }
}

// Robot only implements what it can do — no dummy methods!
class RobotWorker implements Workable {
  work() { console.log('Processing tasks...'); }
}

// Managers only need the Reportable interface
function scheduleReview(employee: Reportable) {
  employee.attendMeeting();
  employee.writeReport();
}
```

### Signs of ISP Violation

- Implementations throw `NotImplementedError` for some methods
- Methods return `null` or do nothing in certain subclasses
- Clients import an interface but only use 1-2 of its 10 methods
- Changing one interface method forces recompilation of unrelated modules
- You see many `// not applicable` comments in implementations

### ISP in Practice

<!-- title: Repository Interfaces -->
```typescript
// Instead of one massive IRepository<T> with 20 methods:
interface Readable<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
}

interface Writable<T> {
  save(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
}

interface Searchable<T> {
  search(query: string): Promise<T[]>;
}

// Read-only cache only needs Readable
class CachedUserStore implements Readable<User> {
  async findById(id: string) { return this.cache.get(id) ?? null; }
  async findAll() { return Array.from(this.cache.values()); }
}

// Full repository implements what it needs
class UserRepository implements Readable<User>, Writable<User>, Searchable<User> {
  async findById(id: string) { /* ... */ }
  async findAll() { /* ... */ }
  async save(user: User) { /* ... */ }
  async delete(id: string) { /* ... */ }
  async search(query: string) { /* ... */ }
}
```

> **TIP:** **Key takeaway:** Prefer many small interfaces over one large one. Clients should depend only on the methods they actually use. This reduces coupling and makes the system easier to change.
