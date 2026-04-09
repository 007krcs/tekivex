## The Client-Server Model

In the **client-server model**, clients initiate requests and servers respond with data or actions. The client knows the server's address; the server does not need to know the client's address in advance. This asymmetry is the foundation of web architecture.

## The Request-Response Cycle

**Flow:**

1. **DNS Lookup** — Resolve hostname to IP address
2. **TCP Handshake** — SYN → SYN-ACK → ACK (3-way handshake)
3. **TLS Handshake** — Certificate exchange, cipher negotiation (HTTPS)
4. **HTTP Request** — Client sends GET/POST with headers and body
5. **Server Processing** — Auth, business logic, DB query, response assembly
6. **HTTP Response** — Status code, headers, body returned to client


## Stateless vs Stateful Servers

| Stateless Server | Stateful Server |
| --- | --- |
| No session data stored locally | Session data held in memory |
| Any server can handle any request | Sticky sessions required |
| Horizontal scaling is trivial | Harder to scale horizontally |
| State lives in DB / Redis / JWT | Faster for in-memory ops |
| REST APIs, microservices | WebSocket servers, game servers |

> **TIP:** **Design stateless by default.** Move session state to a shared store (Redis) so any server replica can serve any request. This is the single biggest enabler of horizontal scaling.

## Thin vs Thick Clients

| Model | Logic Location | Examples | Tradeoffs |
| --- | --- | --- | --- |
| Thin client | Server-side rendering, minimal JS | Traditional web, server-side React | Simple client; server under load; less offline capability |
| Thick client | Heavy client-side processing | SPAs, mobile apps, Electron | Rich UX, offline-capable; harder to update, security exposure |
| Hybrid | Split by concern | React + REST API, Flutter + gRPC | Best of both; most common modern architecture |

## Connection Types

- **Short-lived (HTTP/1.1)** — new TCP connection per request (or pooled with keep-alive)
- **Persistent (HTTP/2)** — single TCP connection multiplexes many requests simultaneously
- **Long-polling** — client holds request open; server responds when data is ready
- **WebSocket** — full-duplex; either side can push at any time after upgrade handshake
- **Server-Sent Events (SSE)** — one-way push from server to client over HTTP

<!-- title: Simple HTTP Client-Server (Node.js) -->
```typescript
// server.ts
import http from 'http';

const server = http.createServer((req, res) => {
  // Stateless — no memory of previous requests
  const url = new URL(req.url!, 'http://localhost');
  const name = url.searchParams.get('name') ?? 'World';

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: `Hello, ${name}!` }));
});

server.listen(3000, () => console.log('Server on :3000'));

// client.ts
const res = await fetch('http://localhost:3000?name=Tekivex');
const data = await res.json();
console.log(data.message); // "Hello, Tekivex!"
```
