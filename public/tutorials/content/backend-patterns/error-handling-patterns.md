## Error Handling Patterns

Consistent error handling is critical for debuggable APIs. Instead of scattering try/catch blocks everywhere, build an **error hierarchy** and a **global error handler** that formats all errors into a consistent response shape.

### Error Flow

**Flow:**

1. **Error Thrown** — Service or repository throws a typed error
2. **next(err)** — Controller passes error to Express pipeline
3. **Error Middleware** — Global handler catches and classifies error
4. **Format** — Map to consistent JSON error shape
5. **Response** — Send error response with proper HTTP status


### Error Hierarchy

Define a base error class that all application errors extend. Each subclass carries its own HTTP status code and error code string.

<!-- title: errors.ts -->
```typescript
export class AppError extends Error {
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
    super(`${resource} with id '${id}' not found`, 404, 'NOT_FOUND');
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
}
```

### Using Typed Errors in Services

<!-- title: user.service.ts -->
```typescript
import { NotFoundError, ConflictError, ValidationError } from './errors';

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
}
```

### Global Error Handler

<!-- title: error-handler.middleware.ts -->
```typescript
import { Request, Response, NextFunction } from 'express';
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
// app.use(globalErrorHandler);
```

### Error Response Shape

| Field | Type | Description |
| --- | --- | --- |
| status | "error" | Always "error" for error responses |
| code | string | Machine-readable code (e.g., NOT_FOUND) |
| message | string | Human-readable description |
| details | object? | Optional field-level errors or metadata |
| stack | string? | Stack trace (development only) |

> **CAUTION:** Never expose stack traces or internal error details in production. Attackers can use them to map your codebase. Always strip `stack` in non-development environments.

> **TIP:** Use **error codes** (NOT_FOUND, VALIDATION_ERROR) rather than relying on HTTP status codes alone. Clients can switch on the code string for precise error handling.
