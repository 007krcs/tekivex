## HTTP Fundamentals

**HTTP** (HyperText Transfer Protocol) is a stateless, application-layer protocol that defines how clients and servers exchange messages. Every web request you've ever made — loading a page, calling an API, uploading a file — runs over HTTP.

## HTTP Request Structure

<!-- title: HTTP Request -->
```http
POST /api/users HTTP/1.1
Host: api.tekivex.dev
Content-Type: application/json
Authorization: Bearer eyJhbGci...
Content-Length: 47
Accept: application/json

{"name": "Alice", "email": "alice@example.com"}
```

## HTTP Response Structure

<!-- title: HTTP Response -->
```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/users/42
X-Request-ID: a1b2c3d4
Cache-Control: no-store

{"id": 42, "name": "Alice", "email": "alice@example.com"}
```

## HTTP Methods

| Method | Purpose | Idempotent? | Body? |
| --- | --- | --- | --- |
| GET | Retrieve resource | Yes | No |
| POST | Create resource / trigger action | No | Yes |
| PUT | Replace resource entirely | Yes | Yes |
| PATCH | Partial update | No | Yes |
| DELETE | Remove resource | Yes | No |
| HEAD | Like GET but no body (check existence/metadata) | Yes | No |
| OPTIONS | CORS preflight / discover allowed methods | Yes | No |

## Status Codes

| Range | Category | Common Codes |
| --- | --- | --- |
| 2xx | Success | 200 OK, 201 Created, 204 No Content |
| 3xx | Redirection | 301 Moved Permanently, 302 Found, 304 Not Modified |
| 4xx | Client Error | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests |
| 5xx | Server Error | 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout |

## HTTP/1.1 vs HTTP/2 vs HTTP/3

| Feature | HTTP/1.1 | HTTP/2 | HTTP/3 |
| --- | --- | --- | --- |
| Transport | TCP | TCP | QUIC (UDP) |
| Multiplexing | No (one req/conn) | Yes (streams) | Yes (no HoL blocking) |
| Header compression | No | HPACK | QPACK |
| Server push | No | Yes | Limited |
| TLS | Optional | Required (de facto) | Required (built-in) |
| Head-of-line blocking | Yes (connection level) | Yes (TCP level) | No |
| Adoption (2024) | Legacy | ~65% traffic | ~30% and growing |

> **TIP:** Most CDNs and reverse proxies (Cloudflare, Nginx, Caddy) transparently upgrade connections to HTTP/2 or HTTP/3. You rarely need to configure this manually — just enable TLS and the proxy handles it.

## Key Headers for System Design

- `Cache-Control: max-age=3600` — tell clients and CDNs how long to cache
- `ETag` / `If-None-Match` — conditional requests to avoid downloading unchanged content
- `Authorization: Bearer <token>` — carry auth credentials
- `X-Request-ID` — propagate trace IDs for distributed tracing
- `Retry-After` — tell rate-limited clients when to retry
- `Content-Encoding: gzip` — compressed response body
- `Strict-Transport-Security` — force HTTPS for future requests (HSTS)
