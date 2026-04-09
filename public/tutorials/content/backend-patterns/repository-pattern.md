## Repository Pattern

The **Repository Pattern** mediates between the domain/business logic layer and the data mapping layer. It provides a collection-like interface for accessing domain objects, hiding the details of how data is persisted or retrieved.

> **TIP:** Think of a repository as a **in-memory collection facade** over your database. Your service layer asks for objects — it never knows about SQL, ORMs, or connection pools.

### Request Flow

**Flow:**

1. **Controller** — Receives HTTP request, extracts params
2. **Service** — Applies business rules and orchestration
3. **Repository** — Abstracts data access with clean interface
4. **Database** — PostgreSQL, MongoDB, or any storage


### Defining the Interface

Start by defining a generic repository interface. This contract is what your service layer depends on — never a concrete implementation.

<!-- title: repository.interface.ts -->
```typescript
export interface Repository<T, ID = string> {
  findById(id: ID): Promise<T | null>;
  findAll(filter?: Partial<T>): Promise<T[]>;
  create(entity: Omit<T, 'id'>): Promise<T>;
  update(id: ID, data: Partial<T>): Promise<T>;
  delete(id: ID): Promise<void>;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | null>;
}
```

### PostgreSQL Implementation

<!-- title: pg-user.repository.ts -->
```typescript
import { Pool } from 'pg';
import { UserRepository, User } from './repository.interface';

export class PgUserRepository implements UserRepository {
  constructor(private pool: Pool) {}

  async findById(id: string): Promise<User | null> {
    const { rows } = await this.pool.query(
      'SELECT * FROM users WHERE id = $1', [id]
    );
    return rows[0] ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const { rows } = await this.pool.query(
      'SELECT * FROM users WHERE email = $1', [email]
    );
    return rows[0] ?? null;
  }

  async findAll(filter?: Partial<User>): Promise<User[]> {
    if (!filter) {
      const { rows } = await this.pool.query('SELECT * FROM users');
      return rows;
    }
    const keys = Object.keys(filter);
    const where = keys.map((k, i) => `${k} = $${i + 1}`).join(' AND ');
    const { rows } = await this.pool.query(
      `SELECT * FROM users WHERE ${where}`,
      Object.values(filter)
    );
    return rows;
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    const { rows } = await this.pool.query(
      `INSERT INTO users (email, name, created_at)
       VALUES ($1, $2, NOW()) RETURNING *`,
      [data.email, data.name]
    );
    return rows[0];
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const keys = Object.keys(data);
    const sets = keys.map((k, i) => `${k} = $${i + 2}`).join(', ');
    const { rows } = await this.pool.query(
      `UPDATE users SET ${sets} WHERE id = $1 RETURNING *`,
      [id, ...Object.values(data)]
    );
    return rows[0];
  }

  async delete(id: string): Promise<void> {
    await this.pool.query('DELETE FROM users WHERE id = $1', [id]);
  }
}
```

### Using it in a Service

<!-- title: user.service.ts -->
```typescript
import { UserRepository } from './repository.interface';

export class UserService {
  // Depends on the interface, NOT the concrete class
  constructor(private userRepo: UserRepository) {}

  async register(email: string, name: string) {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new Error('Email already registered');
    return this.userRepo.create({ email, name, createdAt: new Date() });
  }
}
```

### Benefits

- **Testability** — Swap the real repository for an in-memory fake in unit tests.
- **Swappable storage** — Move from PostgreSQL to MongoDB by writing a new implementation, zero changes in services.
- **Single Responsibility** — Data access logic lives in one place, not scattered across services.
- **Domain focus** — Services speak in domain terms (findByEmail) instead of raw SQL.

> **NOTE:** In small CRUD apps the repository pattern can feel like over-engineering. It pays off in medium-to-large codebases where you need testability and may swap storage backends.
