## Middleware Pipeline

A **middleware pipeline** is a chain of functions that process an HTTP request sequentially. Each middleware can inspect the request, modify it, short-circuit the chain, or pass control to the next middleware.

Think of it like an **assembly line in a factory** — each station adds something (authentication badge, quality check, logging stamp) before the product reaches its final destination.

### Request Flow

**Flow:**

1. **Request** — Incoming HTTP request from client
2. **Auth Middleware** — Verify JWT token, attach user to req
3. **Logging** — Log method, URL, timestamp
4. **Validation** — Validate request body / params
5. **Handler** — Execute business logic
6. **Response** — Send formatted response to client


### How Express Middleware Works

Each middleware is a function with the signature `(req, res, next)`. Calling `next()` passes control to the next middleware. Not calling it stops the chain.

<!-- title: logger.middleware.ts -->
```typescript
import { Request, Response, NextFunction } from 'express';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  // Run after response is sent
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
    );
  });

  next(); // Pass control to next middleware
}
```

### Auth Middleware

<!-- title: auth.middleware.ts -->
```typescript
import { Request, Response, NextFunction } from 'express';
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
}
```

### Validation Middleware

<!-- title: validate.middleware.ts -->
```typescript
import { Request, Response, NextFunction } from 'express';
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

app.post('/users', validate(createUserSchema), userController.create);
```

### Composing the Pipeline

<!-- title: app.ts -->
```typescript
import express from 'express';
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
app.post('/api/orders', validate(orderSchema), orderController.create);
```

> **TIP:** Order matters. Place `requestLogger` before `authenticate` so that failed auth attempts are still logged. Place error handlers **last**.

> **NOTE:** Koa uses `async/await` with an onion-style model — middleware wraps around the next, allowing you to run code both before and after the handler.
