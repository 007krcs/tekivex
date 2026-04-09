## REST's Limitations

REST is simple and ubiquitous, but it shows cracks at scale: **over-fetching** (getting fields you don't need), **under-fetching** (needing multiple requests), **no type safety** across language boundaries, and **no contract** that clients and servers must agree on.

## GraphQL

**GraphQL** lets clients specify exactly what data they need in a single request. The server exposes a typed schema; clients query it like a SQL SELECT. No more over/under-fetching.

<!-- title: GraphQL Query — Request Only What You Need -->
```graphql
# Fetch user with only the fields needed for a profile card
query GetUserCard($id: ID!) {
  user(id: $id) {
    name
    avatarUrl
    followersCount
    recentPosts(limit: 3) {
      title
      publishedAt
    }
  }
}
```

- **Single endpoint** — all queries/mutations go to `POST /graphql`
- **Introspection** — clients can query the schema itself; auto-generates docs
- **Subscriptions** — real-time updates via WebSocket
- **N+1 problem** — use DataLoader to batch DB queries
- **Best for** — mobile clients (limited bandwidth), public APIs, complex joins

## gRPC

**gRPC** uses **Protocol Buffers** (binary schema + serialization) over HTTP/2. It generates type-safe client/server code from `.proto` files in 10+ languages. Used internally at Google, Netflix, and most large microservice architectures.

<!-- title: user.proto -->
```protobuf
syntax = "proto3";

service UserService {
  rpc GetUser (GetUserRequest) returns (User);
  rpc ListUsers (ListUsersRequest) returns (stream User); // server streaming
  rpc CreateUser (User) returns (User);
}

message GetUserRequest { string id = 1; }
message ListUsersRequest { int32 limit = 1; }

message User {
  string id = 1;
  string name = 2;
  string email = 3;
  int64 created_at = 4;
}
```

- **~7x faster** than JSON/REST for binary payloads
- **Streaming** — unary, server-streaming, client-streaming, bidirectional
- **Strict contract** — proto schema is the source of truth; breaking changes detected at compile time
- **Best for** — internal microservice comms, mobile → server (bandwidth-sensitive), polyglot teams

## tRPC

**tRPC** gives you end-to-end type safety between a TypeScript server and client without schemas or code generation. The client's TypeScript types are *derived directly* from the server's router definition.

> **NOTE:** tRPC is ideal for **full-stack TypeScript monorepos** (Next.js, T3 Stack). For polyglot or public APIs, use gRPC or GraphQL instead.

## Protocol Comparison

| Protocol | Format | Type Safety | Streaming | Best For |
| --- | --- | --- | --- | --- |
| REST | JSON | Manual/OpenAPI | No (SSE workaround) | Public APIs, simplicity |
| GraphQL | JSON | Schema-based | Subscriptions (WS) | Flexible queries, mobile, public |
| gRPC | Protobuf (binary) | Proto schema | Native (4 modes) | Internal microservices, performance |
| tRPC | JSON | TypeScript native | Via subscriptions | Full-stack TS, monorepos |
| AsyncAPI | JSON/YAML | Schema + events | Event-driven native | Documenting async/event APIs |
