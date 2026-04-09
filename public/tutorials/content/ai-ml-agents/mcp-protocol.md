## What is MCP and Why Does It Exist?

The <strong>Model Context Protocol (MCP)</strong> is an open standard created by Anthropic for connecting AI models to external tools, data sources, and services. Think of it as a <strong>USB-C for AI</strong> — a universal interface that lets any AI model talk to any tool through a single standardized protocol.

Before MCP, every AI application needed custom integration code for every tool it wanted to use. If you had <strong>N AI models</strong> and <strong>M tools</strong>, you needed <strong>N × M</strong> custom integrations — an explosion of bespoke glue code. MCP reduces this to <strong>N + M</strong>: each model implements one MCP client, each tool implements one MCP server, and they all interoperate automatically.

### The N×M Problem MCP Solves

<div class="comparison-card">
<div class="comparison-side">

**Before MCP (N×M)**

- Custom integration for each tool × each model
- 3 models × 5 tools = 15 custom integrations
- Every new tool requires code in every AI app
- Duplicated auth, error handling, serialization
- Fragile, hard to maintain, vendor lock-in

</div>
<div class="comparison-side">

**With MCP (N+M)**

- Each model: 1 MCP client. Each tool: 1 MCP server
- 3 models + 5 tools = 8 implementations total
- New tool works with ALL AI apps automatically
- Standardized protocol handles communication
- Modular, composable, vendor-neutral

</div>
</div>

### When to Build an MCP Server

Not everything needs an MCP server. Here is when MCP is the right choice:

- <strong>You have a tool or API</strong> you want AI models (Claude, GPT, etc.) to call directly
- <strong>You have private data</strong> (databases, filesystems, internal APIs) that should be queryable by AI
- <strong>You want reusability</strong> — one implementation works across Claude Desktop, Claude Code, Cursor, and any MCP-compatible client
- <strong>You need structured tool schemas</strong> — MCP enforces typed parameters with Zod/JSON Schema, reducing hallucinated arguments
- <strong>You want composability</strong> — users can mix-and-match your MCP server with others in a single AI session

<div class="callout callout-tip">

<strong>Rule of thumb:</strong> If you are building a REST API and want AI models to use it, wrap it in an MCP server. The server acts as a typed, discoverable bridge between your API and any AI model.

</div>

---

## MCP Architecture Deep-Dive

MCP follows a <strong>client-server architecture</strong> with four key components: <strong>Host</strong>, <strong>Client</strong>, <strong>Server</strong>, and <strong>Transport</strong>. Understanding each component is critical for building production MCP systems.

<div class="flow-steps">

**Host** — AI application (Claude Desktop, IDE)

**MCP Client** — Manages server connections

**Transport** — stdio or HTTP+SSE

**MCP Server** — Exposes tools, resources, prompts

**External Service** — Database, API, filesystem

</div>

| Component | Role | Examples |
| --- | --- | --- |
| <strong>Host</strong> | The AI application that the user interacts with. Creates and manages MCP clients. | Claude Desktop, Claude Code, Cursor, Windsurf |
| <strong>Client</strong> | Protocol handler inside the host. Maintains 1:1 connection with a server. Handles initialization, capability negotiation, tool discovery. | Built into the host — one client per server connection |
| <strong>Server</strong> | Lightweight process that exposes capabilities (tools, resources, prompts) via the MCP protocol. | filesystem server, GitHub server, Postgres server |
| <strong>Transport</strong> | Communication layer between client and server. Handles message serialization and delivery. | stdio (local), HTTP + SSE (remote), custom |

<div class="callout callout-note">

<strong>Key insight:</strong> A single Host can connect to <strong>multiple MCP servers simultaneously</strong>. Claude Desktop might connect to a filesystem server, a GitHub server, and a database server all at once — each through its own Client instance.

</div>

---

## Protocol Lifecycle

Every MCP session follows a structured lifecycle. Understanding this flow is essential for debugging connection issues and building reliable servers.

<div class="flow-steps">

**1. Initialize** — Client sends capabilities, server responds with its capabilities

**2. List Tools** — Client requests available tools from server

**3. User Prompt** — User asks AI something that needs a tool

**4. Call Tool** — Client sends tool name + args to server

**5. Execute** — Server runs the tool logic

**6. Response** — Server returns structured result to client

**7. AI Uses Result** — Model incorporates tool output into its response

</div>

```typescript title="protocol-messages.ts"
// 1. Initialize — Client → Server
{
  jsonrpc: "2.0",
  method: "initialize",
  params: {
    protocolVersion: "2024-11-05",
    clientInfo: { name: "claude-desktop", version: "1.0.0" },
    capabilities: { tools: {}, resources: {} }
  }
}

// 2. Initialize Response — Server → Client
{
  jsonrpc: "2.0",
  result: {
    protocolVersion: "2024-11-05",
    serverInfo: { name: "weather-server", version: "1.0.0" },
    capabilities: {
      tools: { listChanged: true },
      resources: { subscribe: true }
    }
  }
}

// 3. List Tools — Client → Server
{ jsonrpc: "2.0", method: "tools/list" }

// 4. List Tools Response — Server → Client
{
  jsonrpc: "2.0",
  result: {
    tools: [{
      name: "get_weather",
      description: "Get current weather for a city",
      inputSchema: {
        type: "object",
        properties: {
          city: { type: "string", description: "City name" },
          units: { type: "string", enum: ["celsius", "fahrenheit"] }
        },
        required: ["city"]
      }
    }]
  }
}

// 5. Call Tool — Client → Server
{
  jsonrpc: "2.0",
  method: "tools/call",
  params: {
    name: "get_weather",
    arguments: { city: "Tokyo", units: "celsius" }
  }
}

// 6. Tool Result — Server → Client
{
  jsonrpc: "2.0",
  result: {
    content: [{
      type: "text",
      text: '{"city":"Tokyo","temperature":22,"condition":"sunny"}'
    }]
  }
}
```

---

## Transport Types: stdio vs HTTP+SSE

MCP supports two transport mechanisms. Your choice depends on whether the server runs locally or remotely.

<div class="comparison-card">
<div class="comparison-side">

**stdio Transport (Local)**

- Server runs as a child process of the host
- Communication via stdin/stdout pipes
- Zero network configuration needed
- Best for local tools: filesystem, git, local DB
- Fastest — no HTTP overhead
- Server lifecycle managed by the host

</div>
<div class="comparison-side">

**HTTP + SSE Transport (Remote)**

- Server runs as a standalone HTTP service
- Client connects over the network
- Supports authentication (API keys, OAuth)
- Best for cloud APIs, shared services, SaaS tools
- Can serve multiple clients simultaneously
- Server lifecycle managed independently

</div>
</div>

```typescript title="transports.ts"
// ── stdio transport (local server) ──
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({ name: "local-server", version: "1.0.0" });
// ... register tools ...

const transport = new StdioServerTransport();
await server.connect(transport);
// Server communicates via stdin/stdout — host spawns this process


// ── HTTP + SSE transport (remote server) ──
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";

const app = express();
const server = new McpServer({ name: "remote-server", version: "1.0.0" });
// ... register tools ...

app.get("/sse", async (req, res) => {
  const transport = new SSEServerTransport("/messages", res);
  await server.connect(transport);
});

app.post("/messages", async (req, res) => {
  // Handle incoming messages from client
  await transport.handlePostMessage(req, res);
});

app.listen(3001, () => console.log("MCP server on http://localhost:3001"));
```

---

## MCP Capabilities: Tools, Resources, and Prompts

MCP servers can expose three types of capabilities. <strong>Tools</strong> are functions the AI can call. <strong>Resources</strong> are data the AI can read. <strong>Prompts</strong> are reusable prompt templates.

| Capability | Purpose | Analogy | Example |
| --- | --- | --- | --- |
| <strong>Tools</strong> | Actions the AI can perform | Functions / API endpoints | get_weather(), create_issue(), query_db() |
| <strong>Resources</strong> | Data the AI can read | GET endpoints / file reads | file://config.json, db://users/123 |
| <strong>Prompts</strong> | Reusable prompt templates | Stored procedures / macros | code-review, summarize-doc, debug-error |

### Tools — Functions the AI Can Call

```typescript title="mcp-tools-example.ts"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({ name: "demo-server", version: "1.0.0" });

// Tool with typed parameters via Zod
server.tool(
  "search_users",
  "Search for users by name or email",
  {
    query: z.string().describe("Search query"),
    limit: z.number().min(1).max(100).default(10).describe("Max results"),
    active_only: z.boolean().default(true).describe("Only active users"),
  },
  async ({ query, limit, active_only }) => {
    // Your logic here — call a database, API, etc.
    const users = await db.users.search({ query, limit, active_only });
    return {
      content: [{
        type: "text",
        text: JSON.stringify(users, null, 2),
      }],
    };
  }
);

// Tool that returns an image
server.tool(
  "generate_chart",
  "Generate a chart image from data",
  {
    data: z.array(z.object({ label: z.string(), value: z.number() })),
    chart_type: z.enum(["bar", "line", "pie"]),
  },
  async ({ data, chart_type }) => {
    const imageBuffer = await renderChart(data, chart_type);
    return {
      content: [{
        type: "image",
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      }],
    };
  }
);
```

### Resources — Data the AI Can Read

<strong>Resources</strong> expose data sources that the AI model can read. Unlike tools (which perform actions), resources are read-only and represent data that exists — files, database records, API responses, etc.

```typescript title="mcp-resources-example.ts"
// Expose a static resource
server.resource(
  "config",                          // unique resource name
  "app://config",                    // URI for the resource
  "Application configuration file",  // description
  async () => ({
    contents: [{
      uri: "app://config",
      text: JSON.stringify(appConfig, null, 2),
      mimeType: "application/json",
    }],
  })
);

// Expose a dynamic resource with a template URI
server.resource(
  "user-profile",
  "db://users/{userId}",
  "User profile from database",
  async (uri) => {
    const userId = uri.pathname.split("/").pop();
    const user = await db.users.findById(userId);
    return {
      contents: [{
        uri: uri.toString(),
        text: JSON.stringify(user, null, 2),
        mimeType: "application/json",
      }],
    };
  }
);
```

### Prompts — Reusable Prompt Templates

<strong>Prompts</strong> let MCP servers define reusable, parameterized prompt templates. When a user selects a prompt, the client fills in the parameters and sends the assembled messages to the AI model.

```typescript title="mcp-prompts-example.ts"
// Register a prompt template
server.prompt(
  "code-review",
  "Review code for bugs, security issues, and best practices",
  {
    code: z.string().describe("The code to review"),
    language: z.string().default("typescript").describe("Programming language"),
    focus: z.enum(["bugs", "security", "performance", "all"]).default("all"),
  },
  async ({ code, language, focus }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `Review this ${language} code. Focus on: ${focus}.

\`\`\`${language}
${code}
\`\`\`

Provide specific feedback with line references.`,
        },
      },
    ],
  })
);
```

---

## Building a Complete MCP Server

Let us build a complete, production-ready MCP server step by step — a <strong>notes manager</strong> that Claude can use to create, search, and organize notes.

```typescript title="notes-mcp-server.ts"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

// ── Configuration ──
const NOTES_DIR = path.join(process.env.HOME || "~", ".notes");

// Ensure notes directory exists
await fs.mkdir(NOTES_DIR, { recursive: true });

// ── Create MCP Server ──
const server = new McpServer({
  name: "notes-manager",
  version: "1.0.0",
  description: "Manage personal notes — create, search, list, and delete.",
});

// ── Tool: Create a note ──
server.tool(
  "create_note",
  "Create a new note with a title and content",
  {
    title: z.string().min(1).max(200).describe("Note title (used as filename)"),
    content: z.string().describe("Note content (Markdown supported)"),
    tags: z.array(z.string()).default([]).describe("Tags for categorization"),
  },
  async ({ title, content, tags }) => {
    const filename = title.replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s+/g, "-").toLowerCase();
    const filepath = path.join(NOTES_DIR, `${filename}.md`);

    const frontmatter = `---
title: ${title}
tags: [${tags.join(", ")}]
created: ${new Date().toISOString()}
---

${content}`;

    await fs.writeFile(filepath, frontmatter, "utf-8");
    return {
      content: [{ type: "text", text: `Note created: ${filepath}` }],
    };
  }
);

// ── Tool: Search notes ──
server.tool(
  "search_notes",
  "Search notes by keyword in title or content",
  {
    query: z.string().describe("Search query"),
    tag: z.string().optional().describe("Filter by tag"),
  },
  async ({ query, tag }) => {
    const files = await fs.readdir(NOTES_DIR);
    const results: Array<{ title: string; preview: string }> = [];

    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const content = await fs.readFile(path.join(NOTES_DIR, file), "utf-8");
      const matchesQuery = content.toLowerCase().includes(query.toLowerCase());
      const matchesTag = !tag || content.includes(`tags: [` + tag);

      if (matchesQuery && matchesTag) {
        results.push({
          title: file.replace(".md", ""),
          preview: content.slice(0, 200) + "...",
        });
      }
    }

    return {
      content: [{
        type: "text",
        text: results.length > 0
          ? JSON.stringify(results, null, 2)
          : "No notes found matching your query.",
      }],
    };
  }
);

// ── Tool: List all notes ──
server.tool(
  "list_notes",
  "List all saved notes with their titles and tags",
  {},
  async () => {
    const files = await fs.readdir(NOTES_DIR);
    const notes = files.filter(f => f.endsWith(".md")).map(f => f.replace(".md", ""));
    return {
      content: [{ type: "text", text: JSON.stringify(notes, null, 2) }],
    };
  }
);

// ── Resource: Read a specific note ──
server.resource(
  "note",
  "notes://{filename}",
  "Read the full content of a note",
  async (uri) => {
    const filename = uri.pathname.replace(/^\/\//, "") + ".md";
    const content = await fs.readFile(path.join(NOTES_DIR, filename), "utf-8");
    return {
      contents: [{ uri: uri.toString(), text: content, mimeType: "text/markdown" }],
    };
  }
);

// ── Start the server ──
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Notes MCP server running on stdio");
```

---

## SOP: Building an MCP Server (Step-by-Step)

<div class="callout callout-tip">

<strong>Standard Operating Procedure</strong> — Follow these steps in order to build and deploy any MCP server from scratch.

</div>

1. <strong>Step 1 — Define your tools:</strong> List the operations your server will expose. For each tool, define: name, description, input parameters (with types), and what it returns. Start with 2-3 tools maximum.
2. <strong>Step 2 — Choose your transport:</strong> Use <code>stdio</code> for local servers (filesystem, git, local DB). Use <code>HTTP+SSE</code> for remote/shared servers (cloud APIs, SaaS integrations). Most servers start with stdio.
3. <strong>Step 3 — Scaffold the project:</strong> Run <code>npm init -y && npm install @modelcontextprotocol/sdk zod</code>. Create your server file. Use TypeScript for type safety.
4. <strong>Step 4 — Implement tool handlers:</strong> Register each tool with <code>server.tool(name, description, schema, handler)</code>. Each handler receives validated arguments and returns <code>{ content: [{ type: "text", text: "..." }] }</code>.
5. <strong>Step 5 — Add error handling:</strong> Wrap handler logic in try/catch. Return user-friendly error messages. Use <code>isError: true</code> in the result to signal failures to the AI model.
6. <strong>Step 6 — Test locally:</strong> Run your server directly: <code>npx tsx server.ts</code>. Use the MCP Inspector tool (<code>npx @modelcontextprotocol/inspector</code>) to test tools interactively.
7. <strong>Step 7 — Register in Claude Desktop:</strong> Add your server to <code>claude_desktop_config.json</code> (see config example below). Restart Claude Desktop.
8. <strong>Step 8 — Test with Claude:</strong> Open Claude Desktop and ask it to use your tools. Verify tool discovery, argument passing, and result formatting work correctly.

```json title="claude_desktop_config.json"
{
  "mcpServers": {
    "notes-manager": {
      "command": "npx",
      "args": ["tsx", "/path/to/notes-mcp-server.ts"],
      "env": {
        "NOTES_DIR": "/Users/you/notes"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost:5432/mydb"
      }
    }
  }
}
```

---

## SOP: Debugging MCP Servers

<div class="callout callout-caution">

<strong>Debugging MCP</strong> can be tricky because the server runs as a subprocess. Use these systematic steps to diagnose and fix common issues.

</div>

| Error | Cause | Fix |
| --- | --- | --- |
| <strong>Connection refused</strong> | Server process failed to start or crashed on init | Check server logs with <code>npx @modelcontextprotocol/inspector</code>. Verify the command/args in config are correct. Check for missing dependencies. |
| <strong>Tool not found</strong> | Tool name mismatch between registration and call | Verify tool names exactly match. Run <code>tools/list</code> via Inspector to see registered tools. Check for typos. |
| <strong>Timeout</strong> | Tool handler takes too long or hangs | Add timeouts to external API calls. Check for unresolved promises. Use <code>AbortController</code> for cancellation. |
| <strong>Schema mismatch</strong> | AI sends arguments that do not match the Zod schema | Make parameter descriptions more specific. Add <code>.describe()</code> to every Zod field. Test with Inspector. |
| <strong>Permission denied</strong> | Server process lacks access to files/APIs | Check file permissions. Verify environment variables (API keys, tokens) are set in the config. |
| <strong>Server crashes silently</strong> | Unhandled exception in tool handler | Wrap all handlers in try/catch. Log errors to stderr (<code>console.error</code>). Never throw from handlers — return error content. |

### Debugging Workflow

<div class="flow-steps">

**1. Check Logs** — stderr output from server process

**2. Use Inspector** — npx @modelcontextprotocol/inspector

**3. Test Tool** — Call each tool manually with test args

**4. Check Schema** — Verify Zod schemas match expected input

**5. Check Config** — Validate claude_desktop_config.json

</div>

```typescript title="error-handling-pattern.ts"
// Best practice: wrap every tool handler with error handling
server.tool(
  "risky_operation",
  "An operation that might fail",
  { input: z.string() },
  async ({ input }) => {
    try {
      const result = await someExternalAPI(input);
      return {
        content: [{ type: "text", text: JSON.stringify(result) }],
      };
    } catch (error) {
      // Log to stderr (visible in host logs, not sent to AI)
      console.error("risky_operation failed:", error);

      // Return error content to the AI model
      return {
        content: [{
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        }],
        isError: true,  // Signals to the AI that this tool call failed
      };
    }
  }
);
```

---

## Advanced: Building an MCP Client

Most developers build MCP <em>servers</em>. But if you are building an AI application (a Host), you need an MCP <em>client</em> to connect to servers and relay tool calls. Here is how to build one from scratch.

```typescript title="mcp-client.ts"
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

// Create a client that connects to a server via stdio
const transport = new StdioClientTransport({
  command: "npx",
  args: ["tsx", "./notes-mcp-server.ts"],
});

const client = new Client(
  { name: "my-ai-app", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// Connect to the server
await client.connect(transport);

// Discover available tools
const { tools } = await client.listTools();
console.log("Available tools:", tools.map(t => t.name));
// => ["create_note", "search_notes", "list_notes"]

// Call a tool
const result = await client.callTool({
  name: "search_notes",
  arguments: { query: "meeting", tag: "work" },
});
console.log("Result:", result.content);

// List available resources
const { resources } = await client.listResources();
console.log("Resources:", resources.map(r => r.name));

// Read a resource
const resource = await client.readResource({ uri: "notes://weekly-standup" });
console.log("Note content:", resource.contents[0].text);

// Graceful shutdown
await client.close();
```

---

## Advanced: Multi-Tool Servers and Middleware

Production MCP servers often need shared logic across multiple tools — authentication, logging, rate limiting, caching. Use middleware patterns to keep tool handlers clean.

```typescript title="middleware-pattern.ts"
// Middleware pattern for MCP tool handlers
type ToolHandler = (args: Record<string, unknown>) => Promise<{ content: Array<{ type: string; text: string }> }>;

// Logging middleware — wraps any tool handler
function withLogging(toolName: string, handler: ToolHandler): ToolHandler {
  return async (args) => {
    const start = Date.now();
    console.error(`[${toolName}] called with:`, JSON.stringify(args));
    try {
      const result = await handler(args);
      console.error(`[${toolName}] completed in ${Date.now() - start}ms`);
      return result;
    } catch (error) {
      console.error(`[${toolName}] FAILED after ${Date.now() - start}ms:`, error);
      throw error;
    }
  };
}

// Rate limiting middleware
function withRateLimit(maxPerMinute: number, handler: ToolHandler): ToolHandler {
  const calls: number[] = [];
  return async (args) => {
    const now = Date.now();
    // Remove calls older than 1 minute
    while (calls.length > 0 && calls[0] < now - 60_000) calls.shift();
    if (calls.length >= maxPerMinute) {
      return {
        content: [{ type: "text", text: "Rate limit exceeded. Try again in a minute." }],
        isError: true,
      } as any;
    }
    calls.push(now);
    return handler(args);
  };
}

// Usage: compose middleware
server.tool("expensive_query", "...", { sql: z.string() },
  withLogging("expensive_query",
    withRateLimit(10,
      async ({ sql }) => {
        const rows = await db.query(sql);
        return { content: [{ type: "text", text: JSON.stringify(rows) }] };
      }
    )
  )
);
```

---

## Security Considerations

<div class="callout callout-caution">

<strong>MCP servers execute code on your machine.</strong> A malicious or poorly written server can read your files, make network requests, or execute arbitrary commands. Always review servers before installing them.

</div>

- <strong>Sandboxing:</strong> Run untrusted MCP servers in containers (Docker) or VMs. Limit filesystem access to specific directories.
- <strong>Input validation:</strong> Always validate tool arguments with Zod schemas. Never pass raw user input to shell commands or SQL queries without sanitization.
- <strong>Permission scoping:</strong> Follow the principle of least privilege. A GitHub MCP server should only have repo-level tokens, not org-admin tokens.
- <strong>Environment variables:</strong> Store secrets (API keys, tokens) in env vars, never hardcoded in server code. Use <code>env</code> in <code>claude_desktop_config.json</code>.
- <strong>Remote server auth:</strong> For HTTP+SSE servers, implement authentication (API keys, OAuth, mTLS). Never expose MCP servers to the public internet without auth.
- <strong>Audit logging:</strong> Log all tool calls with timestamps and arguments to stderr. This helps detect misuse and debug issues.

---

## The MCP Ecosystem

The MCP ecosystem is growing rapidly. Here are some popular, production-ready MCP servers you can use today:

| Server | Provider | What It Does | Transport |
| --- | --- | --- | --- |
| <strong>filesystem</strong> | Anthropic | Read/write files, search directories | stdio |
| <strong>github</strong> | Anthropic | Issues, PRs, repos, code search | stdio |
| <strong>postgres</strong> | Anthropic | SQL queries against PostgreSQL databases | stdio |
| <strong>slack</strong> | Anthropic | Read/send messages, list channels | stdio |
| <strong>brave-search</strong> | Anthropic | Web search via Brave Search API | stdio |
| <strong>google-drive</strong> | Community | Read/search Google Drive files | stdio |
| <strong>notion</strong> | Community | Read/write Notion pages and databases | stdio |
| <strong>puppeteer</strong> | Community | Browser automation, screenshots, scraping | stdio |
| <strong>sqlite</strong> | Community | SQLite database operations | stdio |
| <strong>memory</strong> | Anthropic | Persistent knowledge graph for AI context | stdio |

<div class="callout callout-note">

Find more servers at <strong>github.com/modelcontextprotocol/servers</strong> (official) and <strong>mcp.so</strong> (community directory). Anyone can build and publish an MCP server.

</div>

---

## MCP vs Direct API Integration

<div class="comparison-card">
<div class="comparison-side">

**Direct API Integration**

- Custom code for each tool per AI model
- Tightly coupled to specific AI provider
- Must handle auth, retries, serialization manually
- Hard to reuse across different AI models
- No standardized tool discovery or schema
- Difficult for end-users to extend

</div>
<div class="comparison-side">

**MCP Protocol**

- One standardized interface for all tools
- Works with any MCP-compatible AI client
- Protocol handles communication and serialization
- Build once, use with Claude, GPT, Gemini, etc.
- Typed schemas with automatic validation
- Users install servers with zero code changes

</div>
</div>

---

## Key Takeaways

1. MCP is a universal open protocol that solves the N×M integration problem — reducing it to N+M
2. Architecture: Host (AI app) → Client (protocol handler) → Transport (stdio/HTTP) → Server (tools/resources/prompts) → External Service
3. Three capability types: <strong>Tools</strong> (actions), <strong>Resources</strong> (data), <strong>Prompts</strong> (templates)
4. Two transports: <strong>stdio</strong> for local servers, <strong>HTTP+SSE</strong> for remote/shared servers
5. Protocol lifecycle: initialize → list tools → call tool → return result (JSON-RPC 2.0)
6. Build servers with <code>@modelcontextprotocol/sdk</code>, validate inputs with Zod, handle errors gracefully
7. Register servers in <code>claude_desktop_config.json</code> for Claude Desktop / Claude Code
8. Debug with <code>@modelcontextprotocol/inspector</code> — test tools interactively before deploying
9. Security: sandbox untrusted servers, validate inputs, scope permissions, use env vars for secrets
10. Growing ecosystem: 100+ community servers for filesystems, databases, APIs, and SaaS tools

