## What is Hexagonal Architecture?

**Hexagonal Architecture**, proposed by Alistair Cockburn, structures an application around its core domain. External systems (databases, APIs, UIs) connect to the core through *Ports* (interfaces) and *Adapters* (implementations). The hexagonal shape is just a visual metaphor meaning "many sides" for different types of external actors.

### Ports & Adapters Diagram

*Hexagonal Architecture — the application core defines ports, adapters plug in from outside*

### Driving vs Driven

| Driving (Primary) | Driven (Secondary) |
| --- | --- |
| Initiates interaction with the app | Called by the app when it needs something |
| Examples: HTTP controller, CLI, tests | Examples: database, email service, message queue |
| Calls USE CASE methods | Implements PORT interfaces |
| Left side of the hexagon | Right side of the hexagon |

### Port Interface

<!-- title: ports/NotificationPort.ts -->
```typescript
// Port — defined INSIDE the application core
// The core does not know how notifications are sent
export interface NotificationPort {
  send(to: string, subject: string, body: string): Promise<void>;
}
```

### Adapter Implementations

<!-- title: adapters/EmailNotificationAdapter.ts -->
```typescript
// Driven adapter — implements the port using SMTP
import { NotificationPort } from '../ports/NotificationPort';
import nodemailer from 'nodemailer';

export class EmailNotificationAdapter implements NotificationPort {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  async send(to: string, subject: string, body: string): Promise<void> {
    await this.transporter.sendMail({
      from: 'noreply@app.com', to, subject, html: body,
    });
  }
}
```

<!-- title: adapters/SlackNotificationAdapter.ts -->
```typescript
// Alternative adapter — same port, different technology
import { NotificationPort } from '../ports/NotificationPort';

export class SlackNotificationAdapter implements NotificationPort {
  constructor(private webhookUrl: string) {}

  async send(to: string, subject: string, body: string): Promise<void> {
    await fetch(this.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: `*${subject}*\n${body}\n(to: ${to})` }),
    });
  }
}
```

<!-- title: composition-root.ts -->
```typescript
// Composition root — wire adapters at startup
import { CreateUser } from './use-cases/CreateUser';
import { PostgresUserRepository } from './adapters/PostgresUserRepository';
import { EmailNotificationAdapter } from './adapters/EmailNotificationAdapter';

const userRepo = new PostgresUserRepository();
const notifier = new EmailNotificationAdapter();
const createUser = new CreateUser(userRepo, notifier);

// In tests, swap with in-memory / mock adapters
// const userRepo = new InMemoryUserRepository();
// const notifier = new FakeNotificationAdapter();
```

### Benefits

- **Technology independence:** Swap Postgres for MongoDB by writing a new adapter
- **Testability:** Test use cases with in-memory adapters
- **Flexibility:** Add new entry points (REST, gRPC, CLI) without changing core logic
- **Explicit boundaries:** Ports document what the application needs from the outside world

> **TIP:** **Key takeaway:** Hexagonal Architecture makes external dependencies pluggable via Ports (interfaces defined by the core) and Adapters (implementations that live outside the core). This is Clean Architecture's practical cousin.
