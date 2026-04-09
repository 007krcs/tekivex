## Logging & Observability

In production, `console.log` is not enough. You need **structured logging** (JSON format), proper **log levels**, and **correlation IDs** to trace requests across services. Together, these form the observability foundation.

### Request Tracing Flow

**Flow:**

1. **Request Arrives** — HTTP request hits the API gateway
2. **Generate Correlation ID** — Middleware creates a unique request ID (UUID)
3. **Attach to Context** — ID stored in AsyncLocalStorage for all downstream code
4. **Log with ID** — Every log entry includes the correlation ID
5. **Propagate** — Pass ID in headers when calling other services
6. **Trace** — Search logs by correlation ID to see full request path


### Log Levels

| Level | When to Use | Example |
| --- | --- | --- |
| error | Something failed and needs attention | Database connection lost, payment failed |
| warn | Something unexpected but recoverable | Deprecated API called, retry succeeded |
| info | Significant business events | User registered, order placed, server started |
| http | HTTP request/response logging | GET /api/users 200 45ms |
| debug | Detailed diagnostic info | Cache hit for key user:123, query plan details |

### Winston Structured Logger

<!-- title: logger.ts -->
```typescript
import winston from 'winston';

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
// logger.error('Payment failed', { orderId: 'abc', error: err.message });
```

### Correlation ID Middleware

<!-- title: correlation.middleware.ts -->
```typescript
import { AsyncLocalStorage } from 'node:async_hooks';
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
}
```

### Child Logger with Context

<!-- title: contextual-logger.ts -->
```typescript
import logger from './logger';
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
//           "correlationId":"550e8400...", "orderId":"abc-123", "total":99.99 }
```

### Structured Log Output Example

In production, every log line is a JSON object. This makes logs searchable in tools like Datadog, ELK, or CloudWatch.

<!-- title: example-output.json -->
```typescript
// Single log entry in production
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
}
```

> **TIP:** **Key observability tips:**
> 1. Always log *structured data* (key-value pairs), never concatenated strings.
> 2. Use `AsyncLocalStorage` to propagate correlation IDs without passing them through every function.
> 3. Set log level via environment variable — `debug` in dev, `info` in production.
> 4. Propagate `x-correlation-id` in HTTP headers when calling downstream services.

> **CAUTION:** Never log sensitive data (passwords, tokens, PII) at any level. Use a sanitizer middleware or redact fields before logging.
