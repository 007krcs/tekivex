## The Same-Origin Policy

The **Same-Origin Policy** (SOP) is a browser security rule: JavaScript on `https://app.com` cannot make requests to `https://api.other.com` and read the response. Two URLs have the same origin only if **protocol + host + port** are all identical.

> **NOTE:** SOP protects *users* from malicious sites silently reading their banking data or emails via cross-origin requests. **CORS is the controlled exception** — a way for servers to opt-in to cross-origin access.

## How CORS Works

When a browser detects a cross-origin request, it checks whether the server allows it by looking for `Access-Control-Allow-Origin` in the response. If the header is missing or doesn't match, the browser blocks the response (the request still hits the server — only the response is blocked).

## Simple vs Preflighted Requests

| Simple Request (no preflight) | Preflighted Request |
| --- | --- |
| Method: GET, POST, HEAD only | Method: PUT, DELETE, PATCH |
| Content-Type: text/plain, multipart/form-data, application/x-www-form-urlencoded | Content-Type: application/json |
| No custom headers | Any custom header (Authorization, X-*) |
| Browser sends request directly | Browser sends OPTIONS first |
| Checks CORS headers in response | Checks if server allows it before sending real request |

<!-- title: CORS Preflight Exchange -->
```http
// 1. Browser sends OPTIONS preflight
OPTIONS /api/users HTTP/1.1
Origin: https://app.tekivex.dev
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization

// 2. Server responds (must include these headers)
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.tekivex.dev
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400   // Cache preflight for 24h

// 3. Browser sends the actual request
POST /api/users HTTP/1.1
Origin: https://app.tekivex.dev
Content-Type: application/json
Authorization: Bearer ...
```

## Configuring CORS Correctly

<!-- title: Express CORS Middleware -->
```typescript
import cors from 'cors';

const ALLOWED_ORIGINS = new Set([
  'https://app.tekivex.dev',
  'https://admin.tekivex.dev',
  // Never add '*' for authenticated APIs
]);

app.use(cors({
  origin: (origin, callback) => {
    // Allow same-origin requests (Postman, server-to-server)
    if (!origin || ALLOWED_ORIGINS.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  credentials: true,      // Allow cookies / auth headers
  maxAge: 86400,          // Cache preflight 24h
}));
```

> **CAUTION:** **Never use `Access-Control-Allow-Origin: *` with `Access-Control-Allow-Credentials: true`** — browsers block it. And never whitelist `*` on authenticated endpoints — any website could silently act on behalf of your logged-in users.

## Common CORS Mistakes

| Mistake | Risk | Fix |
| --- | --- | --- |
| Allow-Origin: * | Unauthenticated APIs leak publicly | Fine for public read-only assets only |
| Reflect request Origin blindly | Any site can act as allowed origin | Validate against allowlist |
| Skip HTTPS check | Allow http:// origins → downgrade attack | Enforce https:// in allowlist |
| Forget credentials: true on client | Cookies not sent cross-origin | Set credentials: 'include' on fetch() |
| Long Max-Age with rotating origins | Stale preflight cache blocks new origins | Keep Max-Age ≤ 3600 during rollouts |
