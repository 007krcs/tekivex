## The Principle

**Single Responsibility Principle:** A module should have one, and only one, reason to change. In other words, a class should be responsible to exactly one actor or stakeholder.

> **NOTE:** Uncle Bob clarifies: SRP is not about doing one thing. It is about having *one reason to change* — being responsible to one actor.

### Analogy: Swiss Army Knife vs Specialized Tools

| Swiss Army Knife (Violates SRP) | Specialized Tools (Follows SRP) |
| --- | --- |
| One object does cutting, screwing, opening bottles | Each tool does one thing well |
| Change the blade? Risk breaking the screwdriver | Replace the knife without affecting the screwdriver |
| Hard to optimize any single function | Each can be optimized independently |
| If one part breaks, you might lose everything | Failure is isolated to one tool |

### Before: Violating SRP

<!-- title: UserService.ts (BAD) -->
```typescript
// This class has THREE reasons to change:
// 1. User business rules change
// 2. Email format changes
// 3. Database schema changes
class UserService {
  createUser(name: string, email: string) {
    // Validation (business rules)
    if (name.length < 2) throw new Error('Name too short');
    if (!email.includes('@')) throw new Error('Invalid email');

    // Persistence (database concern)
    const id = db.query(
      'INSERT INTO users (name, email) VALUES (?, ?) RETURNING id',
      [name, email]
    );

    // Notification (email concern)
    const html = `<h1>Welcome ${name}!</h1><p>Your account is ready.</p>`;
    smtp.send({ to: email, subject: 'Welcome!', html });

    return { id, name, email };
  }
}
```

### After: Following SRP

<!-- title: Separated Responsibilities -->
```typescript
// Each class has ONE reason to change

class UserValidator {
  validate(name: string, email: string): void {
    if (name.length < 2) throw new Error('Name too short');
    if (!email.includes('@')) throw new Error('Invalid email');
  }
}

class UserRepository {
  save(name: string, email: string): string {
    return db.query(
      'INSERT INTO users (name, email) VALUES (?, ?) RETURNING id',
      [name, email]
    );
  }
}

class WelcomeEmailSender {
  send(name: string, email: string): void {
    const html = `<h1>Welcome ${name}!</h1><p>Your account is ready.</p>`;
    smtp.send({ to: email, subject: 'Welcome!', html });
  }
}

// Orchestrator — its one responsibility is coordination
class CreateUserUseCase {
  constructor(
    private validator: UserValidator,
    private repo: UserRepository,
    private emailSender: WelcomeEmailSender,
  ) {}

  execute(name: string, email: string) {
    this.validator.validate(name, email);
    const id = this.repo.save(name, email);
    this.emailSender.send(name, email);
    return { id, name, email };
  }
}
```

### How to Identify SRP Violations

1. Count the **reasons to change**. If more than one, split.
2. Look at **import statements**. If a class imports DB drivers, HTTP clients, and email libs, it is doing too much.
3. Check if **different stakeholders** would request changes to the same class.
4. Apply the **"describe in one sentence" test**. If you use "and" or "or", you likely have multiple responsibilities.

> **CAUTION:** **Do not over-apply SRP.** Breaking every function into its own class creates a different problem: fragmented code that is hard to follow. The goal is *cohesion*, not maximum decomposition.

> **TIP:** **Key takeaway:** SRP is about aligning code modules with the people who request changes. When different stakeholders want different changes, those responsibilities belong in separate modules.
