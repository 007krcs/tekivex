// ─── Backend Patterns Tutorial Data ───
import type { TutorialCategory } from '../types';

const category: TutorialCategory = {
  id: 'backend-patterns',
  title: 'Backend Patterns',
  icon: 'database',
  color: '#10b981',
  description: 'Repository pattern, middleware, dependency injection, auth flows, and API design.',
  sections: [
    // ═══════════════════════════════════════════
    // SECTION: Data Access
    // ═══════════════════════════════════════════
    {
      title: 'Data Access',
      topics: [
        // ─── 1. Repository Pattern ───
        {
          slug: 'repository-pattern',
          title: 'Repository Pattern',
          description: 'Abstracting data access behind a clean interface for testability and flexibility.',
          keywords: ['repository', 'data access', 'abstraction', 'persistence', 'database'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          content: [
            { type: 'heading', level: 2, text: 'Repository Pattern', id: 'repository-pattern' },
            {
              type: 'paragraph',
              html: 'The <strong>Repository Pattern</strong> mediates between the domain/business logic layer and the data mapping layer. It provides a collection-like interface for accessing domain objects, hiding the details of how data is persisted or retrieved.',
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'Think of a repository as a <strong>in-memory collection facade</strong> over your database. Your service layer asks for objects — it never knows about SQL, ORMs, or connection pools.',
            },
            { type: 'heading', level: 3, text: 'Request Flow', id: 'repo-flow' },
            {
              type: 'flow',
              steps: [
                { label: 'Controller', desc: 'Receives HTTP request, extracts params', color: '#6366f1' },
                { label: 'Service', desc: 'Applies business rules and orchestration', color: '#8b5cf6' },
                { label: 'Repository', desc: 'Abstracts data access with clean interface', color: '#10b981' },
                { label: 'Database', desc: 'PostgreSQL, MongoDB, or any storage', color: '#f59e0b' },
              ],
            },
            { type: 'heading', level: 3, text: 'Defining the Interface', id: 'repo-interface' },
            {
              type: 'paragraph',
              html: 'Start by defining a generic repository interface. This contract is what your service layer depends on — never a concrete implementation.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'repository.interface.ts',
              code: `export interface Repository<T, ID = string> {
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
}`,
            },
            { type: 'heading', level: 3, text: 'PostgreSQL Implementation', id: 'repo-pg-impl' },
            {
              type: 'code',
              language: 'typescript',
              title: 'pg-user.repository.ts',
              code: `import { Pool } from 'pg';
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
    const where = keys.map((k, i) => \`\${k} = $\${i + 1}\`).join(' AND ');
    const { rows } = await this.pool.query(
      \`SELECT * FROM users WHERE \${where}\`,
      Object.values(filter)
    );
    return rows;
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    const { rows } = await this.pool.query(
      \`INSERT INTO users (email, name, created_at)
       VALUES ($1, $2, NOW()) RETURNING *\`,
      [data.email, data.name]
    );
    return rows[0];
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const keys = Object.keys(data);
    const sets = keys.map((k, i) => \`\${k} = $\${i + 2}\`).join(', ');
    const { rows } = await this.pool.query(
      \`UPDATE users SET \${sets} WHERE id = $1 RETURNING *\`,
      [id, ...Object.values(data)]
    );
    return rows[0];
  }

  async delete(id: string): Promise<void> {
    await this.pool.query('DELETE FROM users WHERE id = $1', [id]);
  }
}`,
            },
            { type: 'heading', level: 3, text: 'Using it in a Service', id: 'repo-service-usage' },
            {
              type: 'code',
              language: 'typescript',
              title: 'user.service.ts',
              code: `import { UserRepository } from './repository.interface';

export class UserService {
  // Depends on the interface, NOT the concrete class
  constructor(private userRepo: UserRepository) {}

  async register(email: string, name: string) {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new Error('Email already registered');
    return this.userRepo.create({ email, name, createdAt: new Date() });
  }
}`,
            },
            { type: 'heading', level: 3, text: 'Benefits', id: 'repo-benefits' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Testability</strong> — Swap the real repository for an in-memory fake in unit tests.',
                '<strong>Swappable storage</strong> — Move from PostgreSQL to MongoDB by writing a new implementation, zero changes in services.',
                '<strong>Single Responsibility</strong> — Data access logic lives in one place, not scattered across services.',
                '<strong>Domain focus</strong> — Services speak in domain terms (findByEmail) instead of raw SQL.',
              ],
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'In small CRUD apps the repository pattern can feel like over-engineering. It pays off in medium-to-large codebases where you need testability and may swap storage backends.',
            },
          ],
        },

        // ─── 2. Active Record vs Data Mapper ───
        {
          slug: 'active-record-vs-data-mapper',
          title: 'Active Record vs Data Mapper',
          description: 'Two fundamental ORM strategies — when the model IS the query versus a separate mapping layer.',
          keywords: ['active record', 'data mapper', 'ORM', 'typeorm', 'sequelize', 'prisma'],
          difficulty: 'intermediate',
          estimatedMinutes: 12,
          content: [
            { type: 'heading', level: 2, text: 'Active Record vs Data Mapper', id: 'ar-vs-dm' },
            {
              type: 'paragraph',
              html: 'When working with databases through an ORM, two dominant patterns emerge: <strong>Active Record</strong> and <strong>Data Mapper</strong>. They differ in where persistence logic lives — inside the model or in a separate layer.',
            },
            { type: 'heading', level: 3, text: 'Active Record', id: 'active-record' },
            {
              type: 'paragraph',
              html: 'In the Active Record pattern, the model object itself contains methods for saving, updating, and querying the database. The entity <em>is</em> the query builder.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'active-record-example.ts',
              code: `import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;
}

// Usage — the model IS the query
const user = new User();
user.name = 'Alice';
user.email = 'alice@example.com';
await user.save();                       // instance method

const found = await User.findOneBy({     // static method
  email: 'alice@example.com'
});
await found?.remove();`,
            },
            { type: 'heading', level: 3, text: 'Data Mapper', id: 'data-mapper' },
            {
              type: 'paragraph',
              html: 'In the Data Mapper pattern, entities are plain objects with no knowledge of the database. A separate repository or mapper handles all persistence operations.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'data-mapper-example.ts',
              code: `import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AppDataSource } from './data-source';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;
}

// Usage — a separate repository handles persistence
const userRepo = AppDataSource.getRepository(User);

const user = userRepo.create({ name: 'Alice', email: 'alice@example.com' });
await userRepo.save(user);

const found = await userRepo.findOneBy({ email: 'alice@example.com' });
if (found) await userRepo.remove(found);`,
            },
            { type: 'heading', level: 3, text: 'Comparison', id: 'ar-dm-comparison' },
            {
              type: 'comparison',
              left: {
                title: 'Active Record',
                color: '#6366f1',
                items: [
                  'Model contains persistence methods',
                  'Quick to set up for simple CRUD',
                  'Less boilerplate code',
                  'Tighter coupling to ORM framework',
                  'Harder to unit test in isolation',
                  'Great for small-to-medium apps',
                ],
              },
              right: {
                title: 'Data Mapper',
                color: '#10b981',
                items: [
                  'Models are plain objects (POJOs)',
                  'Separation of concerns',
                  'More boilerplate but cleaner architecture',
                  'Loosely coupled — easier to swap ORMs',
                  'Easy to mock repositories in tests',
                  'Best for large, domain-rich applications',
                ],
              },
            },
            { type: 'heading', level: 3, text: 'When to Use Which?', id: 'ar-dm-when' },
            {
              type: 'table',
              headers: ['Criterion', 'Active Record', 'Data Mapper'],
              rows: [
                ['Project size', 'Small / prototypes', 'Medium to large'],
                ['Team size', 'Solo / small team', 'Larger teams'],
                ['Domain complexity', 'Simple CRUD', 'Complex business logic'],
                ['Testability need', 'Moderate', 'High'],
                ['ORM examples', 'Sequelize, TypeORM (AR mode)', 'TypeORM (DM mode), Prisma, MikroORM'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Prisma</strong> takes the Data Mapper idea further — your models are defined in a schema file, and the generated client acts as the mapper. You never extend a base class.',
            },
            {
              type: 'callout',
              variant: 'caution',
              html: 'Mixing both patterns in the same project creates confusion. Pick one and stay consistent across your codebase.',
            },
          ],
        },

        // ─── 3. Unit of Work ───
        {
          slug: 'unit-of-work',
          title: 'Unit of Work',
          description: 'Managing transactions across multiple repository operations as a single atomic unit.',
          keywords: ['unit of work', 'transaction', 'atomicity', 'commit', 'rollback', 'database'],
          difficulty: 'advanced',
          estimatedMinutes: 14,
          prerequisites: ['repository-pattern'],
          content: [
            { type: 'heading', level: 2, text: 'Unit of Work', id: 'unit-of-work' },
            {
              type: 'paragraph',
              html: 'The <strong>Unit of Work</strong> pattern tracks all changes made during a business transaction and coordinates writing those changes to the database in a single atomic operation. If any step fails, everything rolls back.',
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'Martin Fowler describes Unit of Work as maintaining a list of objects affected by a business transaction and coordinating the writing out of changes and the resolution of concurrency problems.',
            },
            { type: 'heading', level: 3, text: 'Transaction Flow', id: 'uow-flow' },
            {
              type: 'flow',
              steps: [
                { label: 'Begin Transaction', desc: 'Open a database transaction context', color: '#6366f1' },
                { label: 'Operation 1', desc: 'Create order record via OrderRepository', color: '#8b5cf6' },
                { label: 'Operation 2', desc: 'Deduct inventory via InventoryRepository', color: '#8b5cf6' },
                { label: 'Operation 3', desc: 'Create payment via PaymentRepository', color: '#8b5cf6' },
                { label: 'Commit / Rollback', desc: 'All succeed → commit; any fail → rollback', color: '#10b981' },
              ],
            },
            { type: 'heading', level: 3, text: 'UnitOfWork Interface', id: 'uow-interface' },
            {
              type: 'code',
              language: 'typescript',
              title: 'unit-of-work.ts',
              code: `import { Pool, PoolClient } from 'pg';

export class UnitOfWork {
  private client: PoolClient | null = null;

  constructor(private pool: Pool) {}

  async begin(): Promise<PoolClient> {
    this.client = await this.pool.connect();
    await this.client.query('BEGIN');
    return this.client;
  }

  async commit(): Promise<void> {
    if (!this.client) throw new Error('Transaction not started');
    await this.client.query('COMMIT');
    this.client.release();
    this.client = null;
  }

  async rollback(): Promise<void> {
    if (!this.client) throw new Error('Transaction not started');
    await this.client.query('ROLLBACK');
    this.client.release();
    this.client = null;
  }

  /** Execute a callback within a managed transaction */
  async execute<T>(work: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.begin();
    try {
      const result = await work(client);
      await this.commit();
      return result;
    } catch (err) {
      await this.rollback();
      throw err;
    }
  }
}`,
            },
            { type: 'heading', level: 3, text: 'Transaction-Aware Repository', id: 'uow-repo' },
            {
              type: 'code',
              language: 'typescript',
              title: 'transactional-order.repository.ts',
              code: `import { PoolClient } from 'pg';

export class OrderRepository {
  constructor(private client: PoolClient) {}

  async create(userId: string, total: number) {
    const { rows } = await this.client.query(
      'INSERT INTO orders (user_id, total, status) VALUES ($1, $2, $3) RETURNING *',
      [userId, total, 'pending']
    );
    return rows[0];
  }
}

export class InventoryRepository {
  constructor(private client: PoolClient) {}

  async deduct(productId: string, qty: number) {
    const { rowCount } = await this.client.query(
      'UPDATE inventory SET quantity = quantity - $2 WHERE product_id = $1 AND quantity >= $2',
      [productId, qty]
    );
    if (rowCount === 0) throw new Error('Insufficient inventory');
  }
}`,
            },
            { type: 'heading', level: 3, text: 'Putting It Together', id: 'uow-usage' },
            {
              type: 'code',
              language: 'typescript',
              title: 'checkout.service.ts',
              code: `import { UnitOfWork } from './unit-of-work';
import { OrderRepository } from './transactional-order.repository';
import { InventoryRepository } from './transactional-order.repository';

export class CheckoutService {
  constructor(private uow: UnitOfWork) {}

  async placeOrder(userId: string, productId: string, qty: number, price: number) {
    return this.uow.execute(async (client) => {
      const orderRepo = new OrderRepository(client);
      const inventoryRepo = new InventoryRepository(client);

      // Both operations share the same transaction
      await inventoryRepo.deduct(productId, qty);
      const order = await orderRepo.create(userId, qty * price);

      return order;
      // If deduct or create fails, BOTH are rolled back
    });
  }
}`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'ORMs like TypeORM and MikroORM have built-in Unit of Work support through <code>EntityManager.transaction()</code> or <code>em.flush()</code>. You do not always need to build this from scratch.',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Atomicity</strong> — All-or-nothing semantics for multi-step business operations.',
                '<strong>Consistency</strong> — Database constraints are never left in a half-applied state.',
                '<strong>Reduced round-trips</strong> — Changes can be batched into a single commit.',
                '<strong>Concurrency safety</strong> — Combine with optimistic locking for safe concurrent access.',
              ],
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════
    // SECTION: Service Layer
    // ═══════════════════════════════════════════
    {
      title: 'Service Layer',
      topics: [
        // ─── 4. Service Layer ───
        {
          slug: 'service-layer',
          title: 'Service Layer',
          description: 'Orchestrating business logic in a dedicated layer between controllers and repositories.',
          keywords: ['service layer', 'business logic', 'orchestration', 'controllers', 'separation of concerns'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          prerequisites: ['repository-pattern'],
          content: [
            { type: 'heading', level: 2, text: 'Service Layer Pattern', id: 'service-layer' },
            {
              type: 'paragraph',
              html: 'The <strong>Service Layer</strong> defines an application\'s boundary. It encapsulates the business logic, coordinates work between repositories, and provides a clear API for controllers or other entry points to consume.',
            },
            {
              type: 'paragraph',
              html: 'Without a service layer, business logic leaks into controllers (making them fat) or into repositories (breaking single responsibility). The service layer gives business logic its own home.',
            },
            { type: 'heading', level: 3, text: 'Architecture Flow', id: 'service-flow' },
            {
              type: 'flow',
              steps: [
                { label: 'Route', desc: 'Maps URL to controller method', color: '#94a3b8' },
                { label: 'Controller', desc: 'Parses request, delegates to service', color: '#6366f1' },
                { label: 'Service', desc: 'Business logic, validation, orchestration', color: '#10b981' },
                { label: 'Repository', desc: 'Data access abstraction', color: '#8b5cf6' },
                { label: 'Database', desc: 'Persistent storage layer', color: '#f59e0b' },
              ],
            },
            { type: 'heading', level: 3, text: 'Thin Controller, Thick Service', id: 'thin-controller' },
            {
              type: 'paragraph',
              html: 'Controllers should be <strong>thin</strong> — they parse the request, call a service method, and format the response. All business decisions happen in the service.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'order.controller.ts',
              code: `import { Request, Response, NextFunction } from 'express';
import { OrderService } from './order.service';

export class OrderController {
  constructor(private orderService: OrderService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, items } = req.body;
      // Controller does NOT contain business logic
      const order = await this.orderService.createOrder(userId, items);
      res.status(201).json(order);
    } catch (err) {
      next(err);
    }
  }
}`,
            },
            { type: 'heading', level: 3, text: 'Service with Business Logic', id: 'service-impl' },
            {
              type: 'code',
              language: 'typescript',
              title: 'order.service.ts',
              code: `import { OrderRepository } from './order.repository';
import { InventoryRepository } from './inventory.repository';
import { PaymentService } from './payment.service';

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export class OrderService {
  constructor(
    private orderRepo: OrderRepository,
    private inventoryRepo: InventoryRepository,
    private paymentService: PaymentService,
  ) {}

  async createOrder(userId: string, items: OrderItem[]) {
    // 1. Validate
    if (!items.length) throw new Error('Order must have at least one item');

    // 2. Check inventory for each item
    for (const item of items) {
      const available = await this.inventoryRepo.checkStock(item.productId);
      if (available < item.quantity) {
        throw new Error(\`Insufficient stock for product \${item.productId}\`);
      }
    }

    // 3. Calculate total
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    // 4. Process payment
    const paymentResult = await this.paymentService.charge(userId, total);
    if (!paymentResult.success) throw new Error('Payment failed');

    // 5. Deduct inventory
    for (const item of items) {
      await this.inventoryRepo.deduct(item.productId, item.quantity);
    }

    // 6. Create order record
    return this.orderRepo.create({
      userId,
      items,
      total,
      paymentId: paymentResult.id,
      status: 'confirmed',
    });
  }
}`,
            },
            { type: 'heading', level: 3, text: 'What Belongs Where?', id: 'service-responsibilities' },
            {
              type: 'table',
              headers: ['Concern', 'Controller', 'Service', 'Repository'],
              rows: [
                ['Parse request body', '✅', '—', '—'],
                ['Validate business rules', '—', '✅', '—'],
                ['Orchestrate multi-step flows', '—', '✅', '—'],
                ['Format HTTP response', '✅', '—', '—'],
                ['SQL / database queries', '—', '—', '✅'],
                ['Call external APIs', '—', '✅', '—'],
                ['Error mapping to HTTP codes', '✅', '—', '—'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'A good litmus test: if you can delete the controller and call the service from a CLI command or a message queue consumer, your separation is correct.',
            },
            {
              type: 'callout',
              variant: 'caution',
              html: 'Avoid <strong>anemic services</strong> that just proxy calls to a repository with no logic. If your service methods are one-liners, the layer adds no value.',
            },
          ],
        },

        // ─── 5. Middleware Pipeline ───
        {
          slug: 'middleware-pipeline',
          title: 'Middleware Pipeline',
          description: 'Building composable request processing pipelines in Express and Koa.',
          keywords: ['middleware', 'pipeline', 'express', 'koa', 'request processing', 'chain of responsibility'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          content: [
            { type: 'heading', level: 2, text: 'Middleware Pipeline', id: 'middleware-pipeline' },
            {
              type: 'paragraph',
              html: 'A <strong>middleware pipeline</strong> is a chain of functions that process an HTTP request sequentially. Each middleware can inspect the request, modify it, short-circuit the chain, or pass control to the next middleware.',
            },
            {
              type: 'paragraph',
              html: 'Think of it like an <strong>assembly line in a factory</strong> — each station adds something (authentication badge, quality check, logging stamp) before the product reaches its final destination.',
            },
            { type: 'heading', level: 3, text: 'Request Flow', id: 'middleware-flow' },
            {
              type: 'flow',
              steps: [
                { label: 'Request', desc: 'Incoming HTTP request from client', color: '#94a3b8' },
                { label: 'Auth Middleware', desc: 'Verify JWT token, attach user to req', color: '#ef4444' },
                { label: 'Logging', desc: 'Log method, URL, timestamp', color: '#f59e0b' },
                { label: 'Validation', desc: 'Validate request body / params', color: '#8b5cf6' },
                { label: 'Handler', desc: 'Execute business logic', color: '#10b981' },
                { label: 'Response', desc: 'Send formatted response to client', color: '#94a3b8' },
              ],
            },
            { type: 'heading', level: 3, text: 'How Express Middleware Works', id: 'express-middleware' },
            {
              type: 'paragraph',
              html: 'Each middleware is a function with the signature <code>(req, res, next)</code>. Calling <code>next()</code> passes control to the next middleware. Not calling it stops the chain.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'logger.middleware.ts',
              code: `import { Request, Response, NextFunction } from 'express';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  // Run after response is sent
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      \`[\${new Date().toISOString()}] \${req.method} \${req.originalUrl} \${res.statusCode} \${duration}ms\`
    );
  });

  next(); // Pass control to next middleware
}`,
            },
            { type: 'heading', level: 3, text: 'Auth Middleware', id: 'auth-middleware-example' },
            {
              type: 'code',
              language: 'typescript',
              title: 'auth.middleware.ts',
              code: `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing authorization token' });
    // Chain stops here — next() is NOT called
  }

  try {
    const token = header.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = payload;
    next(); // Token is valid, continue
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}`,
            },
            { type: 'heading', level: 3, text: 'Validation Middleware', id: 'validation-middleware-example' },
            {
              type: 'code',
              language: 'typescript',
              title: 'validate.middleware.ts',
              code: `import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: result.error.flatten().fieldErrors,
      });
    }
    req.body = result.data; // Replace with validated + typed data
    next();
  };
}

// Usage
const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

app.post('/users', validate(createUserSchema), userController.create);`,
            },
            { type: 'heading', level: 3, text: 'Composing the Pipeline', id: 'composing-pipeline' },
            {
              type: 'code',
              language: 'typescript',
              title: 'app.ts',
              code: `import express from 'express';
import { requestLogger } from './logger.middleware';
import { authenticate } from './auth.middleware';
import { validate } from './validate.middleware';

const app = express();

// Global middleware — runs for every request
app.use(express.json());
app.use(requestLogger);

// Public routes (no auth)
app.post('/auth/login', loginController.login);

// Protected routes — auth middleware gates everything below
app.use('/api', authenticate);
app.get('/api/profile', profileController.get);
app.post('/api/orders', validate(orderSchema), orderController.create);`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'Order matters. Place <code>requestLogger</code> before <code>authenticate</code> so that failed auth attempts are still logged. Place error handlers <strong>last</strong>.',
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'Koa uses <code>async/await</code> with an onion-style model — middleware wraps around the next, allowing you to run code both before and after the handler.',
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════
    // SECTION: Infrastructure
    // ═══════════════════════════════════════════
    {
      title: 'Infrastructure',
      topics: [
        // ─── 6. Dependency Injection ───
        {
          slug: 'dependency-injection',
          title: 'Dependency Injection',
          description: 'Decoupling components through constructor injection and DI containers for testable code.',
          keywords: ['dependency injection', 'DI', 'IoC', 'inversion of control', 'container', 'testing'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          content: [
            { type: 'heading', level: 2, text: 'Dependency Injection', id: 'dependency-injection' },
            {
              type: 'paragraph',
              html: '<strong>Dependency Injection (DI)</strong> is a technique where an object receives its dependencies from the outside rather than creating them internally. This inverts the control of dependency creation, making code modular, testable, and loosely coupled.',
            },
            { type: 'heading', level: 3, text: 'The Problem: Hard-Coded Dependencies', id: 'di-problem' },
            {
              type: 'code',
              language: 'typescript',
              title: 'tightly-coupled.ts',
              code: `// BAD — UserService creates its own dependency
class UserService {
  private repo = new PostgresUserRepository(); // hard-coded!

  async getUser(id: string) {
    return this.repo.findById(id);
  }
}

// Problems:
// 1. Cannot test without a real database
// 2. Cannot swap to MongoDB without changing this file
// 3. Violates Open/Closed Principle`,
            },
            { type: 'heading', level: 3, text: 'Constructor Injection', id: 'constructor-injection' },
            {
              type: 'paragraph',
              html: 'The simplest form of DI — pass dependencies through the constructor. The class declares <em>what</em> it needs, and the caller provides it.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'constructor-injection.ts',
              code: `interface UserRepository {
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
const testService = new UserService(fakeRepo);`,
            },
            { type: 'heading', level: 3, text: 'DI Container Flow', id: 'di-flow' },
            {
              type: 'flow',
              steps: [
                { label: 'Register', desc: 'Register interfaces and their implementations', color: '#6366f1' },
                { label: 'Resolve', desc: 'Container builds dependency graph', color: '#8b5cf6' },
                { label: 'Inject', desc: 'Dependencies are injected into constructors', color: '#10b981' },
                { label: 'Use', desc: 'Services operate with all deps wired up', color: '#f59e0b' },
              ],
            },
            { type: 'heading', level: 3, text: 'Manual Composition Root', id: 'composition-root' },
            {
              type: 'paragraph',
              html: 'For small apps, you do not need a container. Wire everything in a single <strong>composition root</strong> file.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'composition-root.ts',
              code: `import { Pool } from 'pg';
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

export { userController };`,
            },
            { type: 'heading', level: 3, text: 'Container-Based DI (tsyringe)', id: 'container-di' },
            {
              type: 'code',
              language: 'typescript',
              title: 'container-setup.ts',
              code: `import 'reflect-metadata';
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
const userService = container.resolve(UserService);`,
            },
            { type: 'heading', level: 3, text: 'Manual vs Container', id: 'manual-vs-container' },
            {
              type: 'comparison',
              left: {
                title: 'Manual DI',
                color: '#6366f1',
                items: [
                  'No library dependency',
                  'Explicit — easy to trace',
                  'No decorators or reflection',
                  'Scales poorly past ~20 services',
                  'Compile-time safety',
                ],
              },
              right: {
                title: 'Container DI',
                color: '#10b981',
                items: [
                  'Auto-resolves deep dependency trees',
                  'Supports lifecycle scopes (singleton, transient)',
                  'Requires reflect-metadata',
                  'Scales to large applications',
                  'Runtime resolution — errors at startup',
                ],
              },
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'NestJS has DI built into its core — every injectable class is auto-wired by the framework. If you use NestJS, you get container DI for free.',
            },
          ],
        },

        // ─── 7. Auth Patterns ───
        {
          slug: 'auth-patterns',
          title: 'Authentication Patterns',
          description: 'JWT, OAuth 2.0, and session-based authentication flows with practical implementation.',
          keywords: ['authentication', 'JWT', 'OAuth', 'session', 'token', 'security', 'authorization'],
          difficulty: 'intermediate',
          estimatedMinutes: 20,
          content: [
            { type: 'heading', level: 2, text: 'Authentication Patterns', id: 'auth-patterns' },
            {
              type: 'paragraph',
              html: 'Authentication verifies <em>who</em> a user is. Three dominant patterns exist in modern backends: <strong>JWT tokens</strong>, <strong>server-side sessions</strong>, and <strong>OAuth 2.0</strong> (delegated auth). Each has distinct trade-offs around scalability, security, and complexity.',
            },
            { type: 'heading', level: 3, text: 'JWT Flow', id: 'jwt-flow' },
            {
              type: 'flow',
              steps: [
                { label: 'Login', desc: 'User sends credentials (email + password)', color: '#6366f1' },
                { label: 'Verify', desc: 'Server validates credentials against DB', color: '#8b5cf6' },
                { label: 'Sign Token', desc: 'Server creates signed JWT with user claims', color: '#10b981' },
                { label: 'Return Token', desc: 'JWT sent to client in response body', color: '#f59e0b' },
                { label: 'Attach Token', desc: 'Client sends JWT in Authorization header', color: '#06b6d4' },
                { label: 'Verify Token', desc: 'Server verifies signature on each request', color: '#ef4444' },
              ],
            },
            { type: 'heading', level: 3, text: 'JWT Implementation', id: 'jwt-impl' },
            {
              type: 'code',
              language: 'typescript',
              title: 'auth.service.ts',
              code: `import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET!;
const TOKEN_EXPIRY = '15m';
const REFRESH_EXPIRY = '7d';

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  constructor(private userRepo: UserRepository) {}

  async login(email: string, password: string): Promise<TokenPair> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error('Invalid credentials');

    return this.generateTokens(user.id, user.email);
  }

  private generateTokens(userId: string, email: string): TokenPair {
    const accessToken = jwt.sign(
      { sub: userId, email },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );
    const refreshToken = jwt.sign(
      { sub: userId, type: 'refresh' },
      JWT_SECRET,
      { expiresIn: REFRESH_EXPIRY }
    );
    return { accessToken, refreshToken };
  }

  verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET) as { sub: string; email: string };
  }
}`,
            },
            { type: 'heading', level: 3, text: 'JWT Auth Middleware', id: 'jwt-middleware' },
            {
              type: 'code',
              language: 'typescript',
              title: 'jwt.middleware.ts',
              code: `import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

export function jwtAuth(authService: AuthService) {
  return (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    try {
      const token = header.split(' ')[1];
      const payload = authService.verifyToken(token);
      (req as any).userId = payload.sub;
      (req as any).userEmail = payload.email;
      next();
    } catch {
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
}`,
            },
            { type: 'heading', level: 3, text: 'OAuth 2.0 Flow', id: 'oauth-flow' },
            {
              type: 'flow',
              steps: [
                { label: 'User clicks Login', desc: 'App redirects to Auth Server (Google, GitHub)', color: '#6366f1' },
                { label: 'Auth Server', desc: 'User authenticates and grants consent', color: '#8b5cf6' },
                { label: 'Auth Code', desc: 'Auth server redirects back with authorization code', color: '#10b981' },
                { label: 'Exchange', desc: 'App exchanges code for access token (server-side)', color: '#f59e0b' },
                { label: 'Resource Server', desc: 'App uses token to fetch user profile', color: '#06b6d4' },
              ],
            },
            { type: 'heading', level: 3, text: 'Session-Based Flow', id: 'session-flow' },
            {
              type: 'flow',
              steps: [
                { label: 'Login', desc: 'User sends credentials', color: '#6366f1' },
                { label: 'Create Session', desc: 'Server creates session in Redis/DB', color: '#8b5cf6' },
                { label: 'Set Cookie', desc: 'Session ID sent as httpOnly cookie', color: '#10b981' },
                { label: 'Subsequent Requests', desc: 'Browser auto-sends cookie on each request', color: '#f59e0b' },
                { label: 'Lookup Session', desc: 'Server validates session ID in store', color: '#ef4444' },
              ],
            },
            { type: 'heading', level: 3, text: 'Comparison', id: 'auth-comparison' },
            {
              type: 'table',
              headers: ['Aspect', 'JWT', 'Session', 'OAuth 2.0'],
              rows: [
                ['Storage', 'Client-side (token)', 'Server-side (Redis/DB)', 'Auth server + client token'],
                ['Scalability', 'Stateless — scales easily', 'Requires shared session store', 'Depends on provider'],
                ['Revocation', 'Hard (need deny-list)', 'Easy (delete session)', 'Managed by provider'],
                ['Security', 'Vulnerable if secret leaks', 'CSRF protection needed', 'Most secure (delegated)'],
                ['Complexity', 'Low', 'Medium', 'High (redirect flows)'],
                ['Best for', 'APIs, microservices', 'Traditional web apps', 'Third-party login (SSO)'],
              ],
            },
            {
              type: 'callout',
              variant: 'caution',
              html: 'Never store JWTs in <code>localStorage</code> — they are vulnerable to XSS attacks. Use <strong>httpOnly cookies</strong> or keep tokens in memory with a refresh token in a cookie.',
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'In practice, many apps combine patterns: OAuth for third-party login, then issue a JWT for API access, backed by a refresh token stored in a session.',
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════
    // SECTION: API & Error Handling
    // ═══════════════════════════════════════════
    {
      title: 'API & Error Handling',
      topics: [
        // ─── 8. API Versioning ───
        {
          slug: 'api-versioning',
          title: 'API Versioning',
          description: 'Strategies for evolving APIs without breaking existing clients.',
          keywords: ['API versioning', 'REST', 'URL versioning', 'header versioning', 'backward compatibility'],
          difficulty: 'intermediate',
          estimatedMinutes: 12,
          content: [
            { type: 'heading', level: 2, text: 'API Versioning', id: 'api-versioning' },
            {
              type: 'paragraph',
              html: 'As APIs evolve, breaking changes are inevitable. <strong>API versioning</strong> lets you introduce new behavior without disrupting existing clients. The key question is <em>where</em> to put the version indicator.',
            },
            { type: 'heading', level: 3, text: 'Versioning Strategies', id: 'versioning-strategies' },
            {
              type: 'table',
              headers: ['Strategy', 'Example', 'Pros', 'Cons'],
              rows: [
                ['URL path', '/api/v1/users', 'Simple, visible, easy to route', 'Pollutes URL namespace, harder to sunset'],
                ['Query parameter', '/api/users?version=1', 'Easy to add, optional', 'Easy to forget, not RESTful'],
                ['Custom header', 'X-API-Version: 1', 'Clean URLs, explicit', 'Hidden from browser, harder to test'],
                ['Accept header', 'Accept: application/vnd.api.v1+json', 'RESTful, content negotiation', 'Complex, less discoverable'],
              ],
            },
            { type: 'heading', level: 3, text: 'URL Path Versioning (Most Common)', id: 'url-versioning' },
            {
              type: 'code',
              language: 'typescript',
              title: 'url-versioning.ts',
              code: `import express from 'express';

const app = express();

// Version 1 — original API
const v1Router = express.Router();
v1Router.get('/users', (req, res) => {
  // Returns { name: string }
  res.json([{ name: 'Alice' }]);
});

// Version 2 — breaking change: split name into first/last
const v2Router = express.Router();
v2Router.get('/users', (req, res) => {
  // Returns { firstName: string, lastName: string }
  res.json([{ firstName: 'Alice', lastName: 'Smith' }]);
});

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);`,
            },
            { type: 'heading', level: 3, text: 'Header-Based Versioning', id: 'header-versioning' },
            {
              type: 'code',
              language: 'typescript',
              title: 'header-versioning.ts',
              code: `import { Request, Response, NextFunction } from 'express';

function versionRouter(handlers: Record<string, express.RequestHandler>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const version = req.headers['x-api-version'] as string || '1';
    const handler = handlers[version];

    if (!handler) {
      return res.status(400).json({
        error: \`Unsupported API version: \${version}\`,
        supported: Object.keys(handlers),
      });
    }

    handler(req, res, next);
  };
}

// Usage
app.get('/api/users', versionRouter({
  '1': (req, res) => res.json([{ name: 'Alice' }]),
  '2': (req, res) => res.json([{ firstName: 'Alice', lastName: 'Smith' }]),
}));`,
            },
            { type: 'heading', level: 3, text: 'Best Practices', id: 'versioning-best-practices' },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Best practices for API versioning:</strong><br/>1. Start with v1 from day one — retrofitting is painful.<br/>2. Use URL versioning for public APIs (most discoverable).<br/>3. Use header versioning for internal/microservice APIs.<br/>4. Deprecate old versions with <code>Sunset</code> header and advance notice.<br/>5. Maintain at most 2-3 active versions simultaneously.',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Prefer <strong>additive changes</strong> (new fields) over breaking changes — they do not require a new version.',
                'Use <strong>API deprecation warnings</strong> in response headers before removing endpoints.',
                'Document version differences in a <strong>migration guide</strong> for each major version.',
                'Set a <strong>version sunset policy</strong> (e.g., N-2 versions supported, 6 months notice).',
              ],
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'GraphQL sidesteps versioning entirely — clients request exactly the fields they need, so new fields never break old queries. Consider it if versioning becomes a major pain point.',
            },
          ],
        },

        // ─── 9. Error Handling Patterns ───
        {
          slug: 'error-handling-patterns',
          title: 'Error Handling Patterns',
          description: 'Building a robust error hierarchy, global error handlers, and consistent error responses.',
          keywords: ['error handling', 'error codes', 'global handler', 'error hierarchy', 'Express', 'middleware'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          content: [
            { type: 'heading', level: 2, text: 'Error Handling Patterns', id: 'error-handling-patterns' },
            {
              type: 'paragraph',
              html: 'Consistent error handling is critical for debuggable APIs. Instead of scattering try/catch blocks everywhere, build an <strong>error hierarchy</strong> and a <strong>global error handler</strong> that formats all errors into a consistent response shape.',
            },
            { type: 'heading', level: 3, text: 'Error Flow', id: 'error-flow' },
            {
              type: 'flow',
              steps: [
                { label: 'Error Thrown', desc: 'Service or repository throws a typed error', color: '#ef4444' },
                { label: 'next(err)', desc: 'Controller passes error to Express pipeline', color: '#f59e0b' },
                { label: 'Error Middleware', desc: 'Global handler catches and classifies error', color: '#8b5cf6' },
                { label: 'Format', desc: 'Map to consistent JSON error shape', color: '#6366f1' },
                { label: 'Response', desc: 'Send error response with proper HTTP status', color: '#10b981' },
              ],
            },
            { type: 'heading', level: 3, text: 'Error Hierarchy', id: 'error-hierarchy' },
            {
              type: 'paragraph',
              html: 'Define a base error class that all application errors extend. Each subclass carries its own HTTP status code and error code string.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'errors.ts',
              code: `export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_ERROR',
    public details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super(\`\${resource} with id '\${id}' not found\`, 404, 'NOT_FOUND');
  }
}

export class ValidationError extends AppError {
  constructor(details: Record<string, string[]>) {
    super('Validation failed', 400, 'VALIDATION_ERROR', details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT');
  }
}`,
            },
            { type: 'heading', level: 3, text: 'Using Typed Errors in Services', id: 'typed-errors-usage' },
            {
              type: 'code',
              language: 'typescript',
              title: 'user.service.ts',
              code: `import { NotFoundError, ConflictError, ValidationError } from './errors';

export class UserService {
  constructor(private repo: UserRepository) {}

  async getUser(id: string) {
    const user = await this.repo.findById(id);
    if (!user) throw new NotFoundError('User', id);
    return user;
  }

  async register(email: string, name: string) {
    if (!email.includes('@')) {
      throw new ValidationError({ email: ['Invalid email format'] });
    }
    const existing = await this.repo.findByEmail(email);
    if (existing) throw new ConflictError('Email already registered');

    return this.repo.create({ email, name, createdAt: new Date() });
  }
}`,
            },
            { type: 'heading', level: 3, text: 'Global Error Handler', id: 'global-error-handler' },
            {
              type: 'code',
              language: 'typescript',
              title: 'error-handler.middleware.ts',
              code: `import { Request, Response, NextFunction } from 'express';
import { AppError } from './errors';

interface ErrorResponse {
  status: 'error';
  code: string;
  message: string;
  details?: Record<string, unknown>;
  stack?: string;
}

export function globalErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  // Known application error
  if (err instanceof AppError) {
    const body: ErrorResponse = {
      status: 'error',
      code: err.code,
      message: err.message,
      details: err.details,
    };
    return res.status(err.statusCode).json(body);
  }

  // Unknown error — log full details, return generic message
  console.error('Unhandled error:', err);
  res.status(500).json({
    status: 'error',
    code: 'INTERNAL_ERROR',
    message: 'An unexpected error occurred',
    // Only include stack in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

// Register LAST in Express (4-arg signature = error middleware)
// app.use(globalErrorHandler);`,
            },
            { type: 'heading', level: 3, text: 'Error Response Shape', id: 'error-response-shape' },
            {
              type: 'table',
              headers: ['Field', 'Type', 'Description'],
              rows: [
                ['status', '"error"', 'Always "error" for error responses'],
                ['code', 'string', 'Machine-readable code (e.g., NOT_FOUND)'],
                ['message', 'string', 'Human-readable description'],
                ['details', 'object?', 'Optional field-level errors or metadata'],
                ['stack', 'string?', 'Stack trace (development only)'],
              ],
            },
            {
              type: 'callout',
              variant: 'caution',
              html: 'Never expose stack traces or internal error details in production. Attackers can use them to map your codebase. Always strip <code>stack</code> in non-development environments.',
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'Use <strong>error codes</strong> (NOT_FOUND, VALIDATION_ERROR) rather than relying on HTTP status codes alone. Clients can switch on the code string for precise error handling.',
            },
          ],
        },

        // ─── 10. Logging & Observability ───
        {
          slug: 'logging-observability',
          title: 'Logging & Observability',
          description: 'Structured logging, log levels, and distributed tracing with correlation IDs.',
          keywords: ['logging', 'observability', 'tracing', 'correlation ID', 'Winston', 'structured logging'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          content: [
            { type: 'heading', level: 2, text: 'Logging & Observability', id: 'logging-observability' },
            {
              type: 'paragraph',
              html: 'In production, <code>console.log</code> is not enough. You need <strong>structured logging</strong> (JSON format), proper <strong>log levels</strong>, and <strong>correlation IDs</strong> to trace requests across services. Together, these form the observability foundation.',
            },
            { type: 'heading', level: 3, text: 'Request Tracing Flow', id: 'tracing-flow' },
            {
              type: 'flow',
              steps: [
                { label: 'Request Arrives', desc: 'HTTP request hits the API gateway', color: '#6366f1' },
                { label: 'Generate Correlation ID', desc: 'Middleware creates a unique request ID (UUID)', color: '#8b5cf6' },
                { label: 'Attach to Context', desc: 'ID stored in AsyncLocalStorage for all downstream code', color: '#10b981' },
                { label: 'Log with ID', desc: 'Every log entry includes the correlation ID', color: '#f59e0b' },
                { label: 'Propagate', desc: 'Pass ID in headers when calling other services', color: '#06b6d4' },
                { label: 'Trace', desc: 'Search logs by correlation ID to see full request path', color: '#ef4444' },
              ],
            },
            { type: 'heading', level: 3, text: 'Log Levels', id: 'log-levels' },
            {
              type: 'table',
              headers: ['Level', 'When to Use', 'Example'],
              rows: [
                ['error', 'Something failed and needs attention', 'Database connection lost, payment failed'],
                ['warn', 'Something unexpected but recoverable', 'Deprecated API called, retry succeeded'],
                ['info', 'Significant business events', 'User registered, order placed, server started'],
                ['http', 'HTTP request/response logging', 'GET /api/users 200 45ms'],
                ['debug', 'Detailed diagnostic info', 'Cache hit for key user:123, query plan details'],
              ],
            },
            { type: 'heading', level: 3, text: 'Winston Structured Logger', id: 'winston-setup' },
            {
              type: 'code',
              language: 'typescript',
              title: 'logger.ts',
              code: `import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  defaultMeta: {
    service: process.env.SERVICE_NAME || 'api',
    env: process.env.NODE_ENV || 'development',
  },
  transports: [
    new winston.transports.Console({
      // Pretty-print in dev, raw JSON in production
      format: process.env.NODE_ENV === 'development'
        ? winston.format.combine(winston.format.colorize(), winston.format.simple())
        : winston.format.json(),
    }),
  ],
});

export default logger;

// Usage:
// logger.info('User registered', { userId: '123', email: 'alice@example.com' });
// logger.error('Payment failed', { orderId: 'abc', error: err.message });`,
            },
            { type: 'heading', level: 3, text: 'Correlation ID Middleware', id: 'correlation-middleware' },
            {
              type: 'code',
              language: 'typescript',
              title: 'correlation.middleware.ts',
              code: `import { AsyncLocalStorage } from 'node:async_hooks';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'node:crypto';
import logger from './logger';

interface RequestContext {
  correlationId: string;
  userId?: string;
}

export const asyncStore = new AsyncLocalStorage<RequestContext>();

export function correlationMiddleware(req: Request, res: Response, next: NextFunction) {
  // Use incoming header or generate a new ID
  const correlationId = (req.headers['x-correlation-id'] as string) || randomUUID();

  // Set it on the response for the client
  res.setHeader('x-correlation-id', correlationId);

  const context: RequestContext = { correlationId };

  // Run entire request within this context
  asyncStore.run(context, () => {
    logger.info('Request started', {
      correlationId,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
    });
    next();
  });
}

// Helper — use anywhere in your codebase
export function getCorrelationId(): string {
  return asyncStore.getStore()?.correlationId || 'no-context';
}`,
            },
            { type: 'heading', level: 3, text: 'Child Logger with Context', id: 'child-logger' },
            {
              type: 'code',
              language: 'typescript',
              title: 'contextual-logger.ts',
              code: `import logger from './logger';
import { asyncStore } from './correlation.middleware';

/** Creates a logger that auto-attaches the current correlation ID */
export function createContextLogger(module: string) {
  return {
    info(message: string, meta?: Record<string, unknown>) {
      const ctx = asyncStore.getStore();
      logger.info(message, {
        ...meta,
        module,
        correlationId: ctx?.correlationId,
        userId: ctx?.userId,
      });
    },
    error(message: string, meta?: Record<string, unknown>) {
      const ctx = asyncStore.getStore();
      logger.error(message, {
        ...meta,
        module,
        correlationId: ctx?.correlationId,
        userId: ctx?.userId,
      });
    },
    warn(message: string, meta?: Record<string, unknown>) {
      const ctx = asyncStore.getStore();
      logger.warn(message, {
        ...meta,
        module,
        correlationId: ctx?.correlationId,
        userId: ctx?.userId,
      });
    },
  };
}

// Usage in a service:
const log = createContextLogger('OrderService');
log.info('Order created', { orderId: 'abc-123', total: 99.99 });
// Output: { "message":"Order created", "module":"OrderService",
//           "correlationId":"550e8400...", "orderId":"abc-123", "total":99.99 }`,
            },
            { type: 'heading', level: 3, text: 'Structured Log Output Example', id: 'log-output-example' },
            {
              type: 'paragraph',
              html: 'In production, every log line is a JSON object. This makes logs searchable in tools like Datadog, ELK, or CloudWatch.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'example-output.json',
              code: `// Single log entry in production
{
  "level": "info",
  "message": "Order created",
  "timestamp": "2025-03-15T14:32:01.456Z",
  "service": "order-api",
  "env": "production",
  "module": "OrderService",
  "correlationId": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "user-789",
  "orderId": "ord-456",
  "total": 149.99,
  "itemCount": 3
}`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Key observability tips:</strong><br/>1. Always log <em>structured data</em> (key-value pairs), never concatenated strings.<br/>2. Use <code>AsyncLocalStorage</code> to propagate correlation IDs without passing them through every function.<br/>3. Set log level via environment variable — <code>debug</code> in dev, <code>info</code> in production.<br/>4. Propagate <code>x-correlation-id</code> in HTTP headers when calling downstream services.',
            },
            {
              type: 'callout',
              variant: 'caution',
              html: 'Never log sensitive data (passwords, tokens, PII) at any level. Use a sanitizer middleware or redact fields before logging.',
            },
          ],
        },
      ],
    },
  ],
};

export default category;
