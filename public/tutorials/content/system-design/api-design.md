## API Styles Comparison

| Feature | REST | GraphQL | gRPC |
| --- | --- | --- | --- |
| Protocol | HTTP/1.1 or HTTP/2 | HTTP/1.1 or HTTP/2 | HTTP/2 |
| Data format | JSON (typically) | JSON | Protocol Buffers (binary) |
| Schema | OpenAPI (optional) | SDL (required) | .proto files (required) |
| Endpoint pattern | Multiple endpoints (/users, /posts) | Single endpoint (/graphql) | Service methods |
| Over-fetching | Common (fixed response shape) | Client specifies exact fields | Fixed per RPC method |
| Streaming | Limited (SSE, WebSockets separate) | Subscriptions | Bidirectional streaming built-in |
| Best for | Public APIs, CRUD | Flexible frontends, mobile | Internal services, low latency |

## RESTful API Design

REST (Representational State Transfer) uses standard HTTP methods to operate on **resources** identified by URLs. A well-designed REST API is intuitive, consistent, and follows established conventions.

| Method | Path | Action | Idempotent? |
| --- | --- | --- | --- |
| GET | /api/v1/users | List all users | Yes |
| GET | /api/v1/users/:id | Get one user | Yes |
| POST | /api/v1/users | Create a user | No |
| PUT | /api/v1/users/:id | Replace a user | Yes |
| PATCH | /api/v1/users/:id | Partial update | Yes |
| DELETE | /api/v1/users/:id | Delete a user | Yes |

## REST Example

<!-- title: rest-api.ts -->
```typescript
import express from 'express';

const app = express();
app.use(express.json());

interface User {
  id: string;
  name: string;
  email: string;
}

const users = new Map<string, User>();

// GET /api/v1/users — list all
app.get('/api/v1/users', (_req, res) => {
  res.json({
    data: Array.from(users.values()),
    total: users.size,
  });
});

// GET /api/v1/users/:id — get one
app.get('/api/v1/users/:id', (req, res) => {
  const user = users.get(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ data: user });
});

// POST /api/v1/users — create
app.post('/api/v1/users', (req, res) => {
  const { name, email } = req.body;
  const id = crypto.randomUUID();
  const user: User = { id, name, email };
  users.set(id, user);
  res.status(201).json({ data: user });
});

// PATCH /api/v1/users/:id — partial update
app.patch('/api/v1/users/:id', (req, res) => {
  const user = users.get(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  Object.assign(user, req.body);
  res.json({ data: user });
});

// DELETE /api/v1/users/:id — delete
app.delete('/api/v1/users/:id', (req, res) => {
  if (!users.delete(req.params.id)) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(204).end();
});
```

## GraphQL Example

<!-- title: graphql-schema.ts -->
```typescript
import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    author: User!
  }

  type Query {
    user(id: ID!): User
    users(limit: Int = 10, offset: Int = 0): [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    updateUser(id: ID!, name: String, email: String): User!
  }
`);

// Client can request exactly the fields they need:
// query {
//   user(id: "123") {
//     name
//     posts { title }
//   }
// }
```

## gRPC Example

<!-- title: user.proto -->
```protobuf
syntax = "proto3";

package users;

service UserService {
  rpc GetUser (GetUserRequest) returns (User);
  rpc ListUsers (ListUsersRequest) returns (ListUsersResponse);
  rpc CreateUser (CreateUserRequest) returns (User);
  rpc StreamUpdates (StreamRequest) returns (stream UserEvent);
}

message User {
  string id = 1;
  string name = 2;
  string email = 3;
}

message GetUserRequest {
  string id = 1;
}

message ListUsersRequest {
  int32 limit = 1;
  int32 offset = 2;
}

message ListUsersResponse {
  repeated User users = 1;
  int32 total = 2;
}

message CreateUserRequest {
  string name = 1;
  string email = 2;
}

message StreamRequest {}

message UserEvent {
  string type = 1;
  User user = 2;
}
```

## API Versioning Strategies

| Strategy | Example | Pros | Cons |
| --- | --- | --- | --- |
| URL path | /api/v1/users | Explicit, easy routing | URL changes on version bump |
| Query param | /api/users?version=1 | Single URL | Easy to forget, harder to route |
| Header | Accept: application/vnd.api.v1+json | Clean URLs | Less discoverable |
| No versioning | Additive-only changes | Simplest | Breaking changes are impossible |

> **TIP:** URL path versioning (`/api/v1/`) is the most widely adopted strategy. It is explicit, easy to understand, and works well with API documentation tools like Swagger/OpenAPI.

## Best Practices

- Use **nouns** for resources (`/users`), not verbs (`/getUsers`)
- Return proper **HTTP status codes** (201 Created, 404 Not Found, 429 Rate Limited)
- Support **pagination** for list endpoints (offset/limit or cursor-based)
- Use **consistent error format**: `{ error: string, code: string, details?: any }`
- Add **rate limiting headers** to every response
- Document with **OpenAPI/Swagger** for REST, SDL for GraphQL

## Key Takeaways

1. REST for public APIs, GraphQL for flexible frontends, gRPC for internal services.
2. Use URL-based versioning for REST APIs.
3. Design for the consumer — model resources around business entities.
4. Always paginate list endpoints and include total counts.
