## Dependency Injection

**Dependency Injection (DI)** is a technique where an object receives its dependencies from the outside rather than creating them internally. This inverts the control of dependency creation, making code modular, testable, and loosely coupled.

### The Problem: Hard-Coded Dependencies

<!-- title: tightly-coupled.ts -->
```typescript
// BAD — UserService creates its own dependency
class UserService {
  private repo = new PostgresUserRepository(); // hard-coded!

  async getUser(id: string) {
    return this.repo.findById(id);
  }
}

// Problems:
// 1. Cannot test without a real database
// 2. Cannot swap to MongoDB without changing this file
// 3. Violates Open/Closed Principle
```

### Constructor Injection

The simplest form of DI — pass dependencies through the constructor. The class declares *what* it needs, and the caller provides it.

<!-- title: constructor-injection.ts -->
```typescript
interface UserRepository {
  findById(id: string): Promise<User | null>;
}

class UserService {
  // Depends on an interface, not a concrete class
  constructor(private repo: UserRepository) {}

  async getUser(id: string) {
    return this.repo.findById(id);
  }
}

// Production: inject real repository
const service = new UserService(new PostgresUserRepository(pool));

// Test: inject a fake
const fakeRepo: UserRepository = {
  findById: async (id) => ({ id, name: 'Test', email: 'test@test.com' }),
};
const testService = new UserService(fakeRepo);
```

### DI Container Flow

**Flow:**

1. **Register** — Register interfaces and their implementations
2. **Resolve** — Container builds dependency graph
3. **Inject** — Dependencies are injected into constructors
4. **Use** — Services operate with all deps wired up


### Manual Composition Root

For small apps, you do not need a container. Wire everything in a single **composition root** file.

<!-- title: composition-root.ts -->
```typescript
import { Pool } from 'pg';
import { PgUserRepository } from './pg-user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmailService } from './email.service';

// Create shared dependencies
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Build the dependency tree manually
const userRepo = new PgUserRepository(pool);
const emailService = new EmailService(process.env.SMTP_URL!);
const userService = new UserService(userRepo, emailService);
const userController = new UserController(userService);

export { userController };
```

### Container-Based DI (tsyringe)

<!-- title: container-setup.ts -->
```typescript
import 'reflect-metadata';
import { container, injectable, inject } from 'tsyringe';

// Register implementations
container.register('UserRepository', { useClass: PgUserRepository });
container.register('EmailService', { useClass: SmtpEmailService });

@injectable()
class UserService {
  constructor(
    @inject('UserRepository') private repo: UserRepository,
    @inject('EmailService') private email: EmailService,
  ) {}

  async register(name: string, email: string) {
    const user = await this.repo.create({ name, email, createdAt: new Date() });
    await this.email.sendWelcome(user.email);
    return user;
  }
}

// Resolve — container auto-wires all dependencies
const userService = container.resolve(UserService);
```

### Manual vs Container

| Manual DI | Container DI |
| --- | --- |
| No library dependency | Auto-resolves deep dependency trees |
| Explicit — easy to trace | Supports lifecycle scopes (singleton, transient) |
| No decorators or reflection | Requires reflect-metadata |
| Scales poorly past ~20 services | Scales to large applications |
| Compile-time safety | Runtime resolution — errors at startup |

> **TIP:** NestJS has DI built into its core — every injectable class is auto-wired by the framework. If you use NestJS, you get container DI for free.
