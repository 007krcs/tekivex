## Why Real-Time Matters

Standard HTTP is **pull-based** — clients ask, servers answer. Real-time systems need **push-based** communication where the server initiates data delivery. There are four major approaches, each with different trade-offs.

## Long Polling

The client sends a request; the server **holds it open** until it has data (or times out). The client immediately sends another request on response. This emulates push using standard HTTP.

| Pros | Cons |
| --- | --- |
| Works everywhere (plain HTTP) | High latency per message |
| Firewall/proxy friendly | Many open connections on server |
| Simple to implement | Overhead of repeated HTTP handshakes |
| No special server support | Hard to scale beyond 10K connections |

## Server-Sent Events (SSE)

**SSE** is a one-way push channel over a persistent HTTP connection. The server streams `text/event-stream` data; the client uses the native `EventSource` API. Reconnection is automatic.

<!-- title: SSE Server (Node.js) -->
```typescript
// server
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const send = (data: object) =>
    res.write(`data: ${JSON.stringify(data)}\n\n`);

  const interval = setInterval(() => send({ ts: Date.now() }), 1000);
  req.on('close', () => clearInterval(interval));
});

// client
const es = new EventSource('/events');
es.onmessage = (e) => console.log(JSON.parse(e.data));
```

## WebSockets

**WebSocket** provides a **full-duplex** channel over a single TCP connection. After an HTTP upgrade handshake, either side can send frames at any time with very low overhead (~2 bytes per frame vs ~800 bytes for HTTP headers).

<!-- title: WebSocket Server (ws library) -->
```typescript
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    // Echo to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });
});
```

## WebRTC

**WebRTC** enables **peer-to-peer** audio, video, and data directly between browsers — no server relay once the connection is established. A **signaling server** (any protocol) is still needed for connection negotiation.

## Choosing the Right Protocol

| Protocol | Direction | Best For | Scale Challenge |
| --- | --- | --- | --- |
| Long Polling | Bi-directional | Legacy browsers, simple notifications | Server threads per connection |
| SSE | Server → Client only | Live feeds, dashboards, progress | One connection per client, HTTP/2 mitigates |
| WebSocket | Full-duplex | Chat, gaming, collaborative editing | Sticky sessions required, horizontal scaling via pub/sub (Redis) |
| WebRTC | Peer-to-peer | Video calls, file sharing, low-latency gaming | Signaling server + STUN/TURN infrastructure |

> **CAUTION:** WebSocket connections are **stateful and sticky**. For horizontal scaling, use a pub/sub broker (Redis Pub/Sub, NATS) so any server can receive and broadcast messages to clients connected to other servers.
