## Authentication Patterns

Authentication verifies *who* a user is. Three dominant patterns exist in modern backends: **JWT tokens**, **server-side sessions**, and **OAuth 2.0** (delegated auth). Each has distinct trade-offs around scalability, security, and complexity.

### JWT Flow

**Flow:**

1. **Login** — User sends credentials (email + password)
2. **Verify** — Server validates credentials against DB
3. **Sign Token** — Server creates signed JWT with user claims
4. **Return Token** — JWT sent to client in response body
5. **Attach Token** — Client sends JWT in Authorization header
6. **Verify Token** — Server verifies signature on each request


### JWT Implementation

<!-- title: auth.service.ts -->
```typescript
import jwt from 'jsonwebtoken';
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
}
```

### JWT Auth Middleware

<!-- title: jwt.middleware.ts -->
```typescript
import { Request, Response, NextFunction } from 'express';
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
}
```

### OAuth 2.0 Flow

**Flow:**

1. **User clicks Login** — App redirects to Auth Server (Google, GitHub)
2. **Auth Server** — User authenticates and grants consent
3. **Auth Code** — Auth server redirects back with authorization code
4. **Exchange** — App exchanges code for access token (server-side)
5. **Resource Server** — App uses token to fetch user profile


### Session-Based Flow

**Flow:**

1. **Login** — User sends credentials
2. **Create Session** — Server creates session in Redis/DB
3. **Set Cookie** — Session ID sent as httpOnly cookie
4. **Subsequent Requests** — Browser auto-sends cookie on each request
5. **Lookup Session** — Server validates session ID in store


### Comparison

| Aspect | JWT | Session | OAuth 2.0 |
| --- | --- | --- | --- |
| Storage | Client-side (token) | Server-side (Redis/DB) | Auth server + client token |
| Scalability | Stateless — scales easily | Requires shared session store | Depends on provider |
| Revocation | Hard (need deny-list) | Easy (delete session) | Managed by provider |
| Security | Vulnerable if secret leaks | CSRF protection needed | Most secure (delegated) |
| Complexity | Low | Medium | High (redirect flows) |
| Best for | APIs, microservices | Traditional web apps | Third-party login (SSO) |

> **CAUTION:** Never store JWTs in `localStorage` — they are vulnerable to XSS attacks. Use **httpOnly cookies** or keep tokens in memory with a refresh token in a cookie.

> **TIP:** In practice, many apps combine patterns: OAuth for third-party login, then issue a JWT for API access, backed by a refresh token stored in a session.
