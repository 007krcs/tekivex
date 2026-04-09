## API Versioning

As APIs evolve, breaking changes are inevitable. **API versioning** lets you introduce new behavior without disrupting existing clients. The key question is *where* to put the version indicator.

### Versioning Strategies

| Strategy | Example | Pros | Cons |
| --- | --- | --- | --- |
| URL path | /api/v1/users | Simple, visible, easy to route | Pollutes URL namespace, harder to sunset |
| Query parameter | /api/users?version=1 | Easy to add, optional | Easy to forget, not RESTful |
| Custom header | X-API-Version: 1 | Clean URLs, explicit | Hidden from browser, harder to test |
| Accept header | Accept: application/vnd.api.v1+json | RESTful, content negotiation | Complex, less discoverable |

### URL Path Versioning (Most Common)

<!-- title: url-versioning.ts -->
```typescript
import express from 'express';

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
app.use('/api/v2', v2Router);
```

### Header-Based Versioning

<!-- title: header-versioning.ts -->
```typescript
import { Request, Response, NextFunction } from 'express';

function versionRouter(handlers: Record<string, express.RequestHandler>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const version = req.headers['x-api-version'] as string || '1';
    const handler = handlers[version];

    if (!handler) {
      return res.status(400).json({
        error: `Unsupported API version: ${version}`,
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
}));
```

### Best Practices

> **TIP:** **Best practices for API versioning:**
> 1. Start with v1 from day one — retrofitting is painful.
> 2. Use URL versioning for public APIs (most discoverable).
> 3. Use header versioning for internal/microservice APIs.
> 4. Deprecate old versions with `Sunset` header and advance notice.
> 5. Maintain at most 2-3 active versions simultaneously.

1. Prefer **additive changes** (new fields) over breaking changes — they do not require a new version.
2. Use **API deprecation warnings** in response headers before removing endpoints.
3. Document version differences in a **migration guide** for each major version.
4. Set a **version sunset policy** (e.g., N-2 versions supported, 6 months notice).

> **NOTE:** GraphQL sidesteps versioning entirely — clients request exactly the fields they need, so new fields never break old queries. Consider it if versioning becomes a major pain point.
