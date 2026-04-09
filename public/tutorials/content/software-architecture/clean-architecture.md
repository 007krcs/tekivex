## What is Clean Architecture?

**Clean Architecture**, proposed by Robert C. Martin (Uncle Bob), organizes code into concentric circles where dependencies point *inward*. Inner circles contain business rules and are completely independent of outer circles (frameworks, databases, UI).

### The Concentric Circles

*Clean Architecture layers — dependencies always point inward*

### The Dependency Rule

> **CAUTION:** **The Dependency Rule:** Source code dependencies must only point *inward*. Nothing in an inner circle can know anything about an outer circle. This includes functions, classes, variables, or any named entity.

| Layer | Contains | Depends On |
| --- | --- | --- |
| Entities | Business objects, enterprise rules | Nothing |
| Use Cases | Application-specific business rules | Entities only |
| Interface Adapters | Controllers, presenters, gateways | Use Cases, Entities |
| Frameworks & Drivers | DB, web framework, UI, external services | All inner layers |

### Folder Structure

<!-- title: Project Structure -->
```text
src/
├── domain/                  # Entities (innermost)
│   ├── entities/
│   │   ├── User.ts
│   │   └── Order.ts
│   └── value-objects/
│       ├── Email.ts
│       └── Money.ts
│
├── application/             # Use Cases
│   ├── use-cases/
│   │   ├── CreateUser.ts
│   │   └── PlaceOrder.ts
│   └── ports/               # Interfaces (driven/driving)
│       ├── IUserRepository.ts
│       └── IEmailService.ts
│
├── adapters/                # Interface Adapters
│   ├── controllers/
│   │   └── UserController.ts
│   ├── presenters/
│   │   └── UserPresenter.ts
│   └── repositories/
│       └── PostgresUserRepository.ts
│
└── infrastructure/          # Frameworks & Drivers
    ├── database/
    │   └── prisma.ts
    ├── http/
    │   └── express-app.ts
    └── config/
        └── env.ts
```

### Code Example

<!-- title: domain/entities/User.ts -->
```typescript
// Entity — no dependencies on frameworks
export class User {
  constructor(
    public readonly id: string,
    public name: string,
    private _email: string,
  ) {}

  get email(): string { return this._email; }

  changeEmail(newEmail: string): void {
    if (!newEmail.includes('@')) throw new Error('Invalid email');
    this._email = newEmail;
  }
}
```

<!-- title: application/ports/IUserRepository.ts -->
```typescript
// Port — interface defined in the USE CASE layer
import { User } from '../../domain/entities/User';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
```

<!-- title: application/use-cases/CreateUser.ts -->
```typescript
// Use Case — orchestrates entities + ports
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../ports/IUserRepository';

export class CreateUser {
  constructor(private userRepo: IUserRepository) {}

  async execute(name: string, email: string): Promise<User> {
    const user = new User(crypto.randomUUID(), name, email);
    await this.userRepo.save(user);
    return user;
  }
}
```

<!-- title: adapters/repositories/PostgresUserRepository.ts -->
```typescript
// Adapter — implements the port using a specific technology
import { IUserRepository } from '../../application/ports/IUserRepository';
import { User } from '../../domain/entities/User';
import { prisma } from '../../infrastructure/database/prisma';

export class PostgresUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const row = await prisma.user.findUnique({ where: { id } });
    return row ? new User(row.id, row.name, row.email) : null;
  }

  async save(user: User): Promise<void> {
    await prisma.user.upsert({
      where: { id: user.id },
      create: { id: user.id, name: user.name, email: user.email },
      update: { name: user.name, email: user.email },
    });
  }
}
```

### Benefits & Trade-offs

| Benefits | Trade-offs |
| --- | --- |
| Business logic is framework-independent | More boilerplate (interfaces, mappers) |
| Easy to swap databases, UI, or APIs | Overkill for simple CRUD apps |
| Highly testable — mock ports in use case tests | Steeper learning curve for teams |
| Enforces consistent code organization | Requires discipline to maintain boundaries |

> **TIP:** **Key takeaway:** Clean Architecture protects your business logic from external concerns. The Dependency Rule ensures that changes to frameworks, databases, or UI never ripple into your core domain.
