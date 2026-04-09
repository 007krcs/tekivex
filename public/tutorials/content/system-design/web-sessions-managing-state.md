## The Statefulness Problem

HTTP is **stateless** — each request is independent. Yet users expect continuity: stay logged in, maintain a shopping cart, remember preferences. **Sessions** are the mechanism that grafts statefulness onto stateless HTTP.

## Session Storage Approaches

| Approach | Where State Lives | Pros | Cons |
| --- | --- | --- | --- |
| Server-side session + cookie | DB or Redis; cookie holds session ID only | Revoke instantly, small cookie | DB lookup every request, sticky sessions or shared store |
| JWT (stateless token) | Encoded in the token itself (client-side) | No DB lookup, scales horizontally | Cannot revoke before expiry, larger payload |
| Cookie-only (encrypted) | Encrypted in the cookie (e.g. Rails cookie store) | Zero DB, simple | Cannot revoke, size limit (4KB) |
| localStorage/sessionStorage | Browser JavaScript storage | Easy to use in SPAs | XSS vulnerable — never store sensitive tokens here |

## Cookie Attributes

<!-- title: Secure Cookie Response Header -->
```http
Set-Cookie: session_id=abc123;
  HttpOnly;          // JS cannot read — prevents XSS theft
  Secure;            // HTTPS only
  SameSite=Strict;   // No cross-site sending — prevents CSRF
  Path=/;
  Max-Age=86400;     // Expires in 24h
```

## JWT (JSON Web Token)

A JWT has three base64url-encoded parts: `header.payload.signature`. The server signs the payload with a secret (HMAC) or private key (RSA/ECDSA). Any server with the public key or secret can verify it — no DB needed.

<!-- title: JWT Issue and Verify -->
```typescript
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;

// Issue — on login
export function issueToken(userId: string): string {
  return jwt.sign(
    { sub: userId, role: 'user' },
    SECRET,
    { expiresIn: '1h', algorithm: 'HS256' }
  );
}

// Verify — on every protected request
export function verifyToken(token: string): jwt.JwtPayload {
  return jwt.verify(token, SECRET) as jwt.JwtPayload;
  // throws JsonWebTokenError if tampered or expired
}
```

> **CAUTION:** **JWT revocation is hard.** Once issued, a JWT is valid until expiry. For logout/revoke: use short expiry (15 min) + refresh tokens, or maintain a token blocklist in Redis (defeats the stateless benefit, but adds revocation).

## Distributed Session Store

When you run multiple server instances, session data stored in process memory isn't shared. Use a **shared session store** (Redis, Memcached) so any instance can serve any user's request.

<!-- title: Express + Redis Session Store -->
```typescript
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

app.use(session({
  store: new RedisStore({ client: redis }),
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 24h
  },
}));
```
