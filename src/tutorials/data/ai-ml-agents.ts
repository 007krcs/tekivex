import type { TutorialCategory } from '../types';

const category: TutorialCategory = {
  id: 'ai-ml-agents',
  title: 'AI Agents & Multi-Agent Systems',
  icon: 'cpu',
  color: '#f59e0b',
  description: 'AI agents, ReAct pattern, multi-agent systems, MCP protocol, swarm intelligence, LangChain and LangGraph.',
  sections: [
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 5 — AI Agents & Multi-Agent Systems
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      title: 'AI Agents & Multi-Agent Systems',
      topics: [
        // ──────────────────────────────────────────────────────────
        // 16. What is an AI Agent?
        // ──────────────────────────────────────────────────────────
        {
          slug: 'what-is-ai-agent',
          title: 'What is an AI Agent?',
          description: 'The Observe-Think-Act loop, ReAct pattern, tool use, and how modern AI agents work.',
          keywords: ['ai agent', 'react pattern', 'tool use', 'reasoning', 'autonomous', 'observe think act'],
          difficulty: 'beginner',
          estimatedMinutes: 14,
          content: [
            { type: 'heading', level: 2, text: 'From Chatbots to Agents', id: 'chatbots-to-agents' },
            { type: 'paragraph', html: 'A regular chatbot generates text responses. An <strong>AI Agent</strong> goes further — it can <em>observe</em> its environment, <em>reason</em> about what to do, <em>take actions</em> (call tools, write code, browse the web), and <em>learn from the results</em>. It\'s an LLM with hands and eyes.' },
            { type: 'callout', variant: 'tip', html: '<strong>Analogy:</strong> Think of an AI agent like a smart assistant with a toolbox. You say "book me a flight to Tokyo." The assistant thinks about what\'s needed (reasoning), checks flight APIs (tool use), compares options (observation), and books the best one (action). A chatbot would just tell you how to book a flight.' },

            { type: 'heading', level: 3, text: 'The Agent Loop', id: 'agent-loop' },
            { type: 'paragraph', html: 'Every agent follows a perception-reasoning-action cycle:' },
            { type: 'flow', steps: [
              { label: 'Observe', desc: 'Perceive environment, read inputs', color: '#6366f1' },
              { label: 'Think', desc: 'Reason about what to do next', color: '#8b5cf6' },
              { label: 'Act', desc: 'Execute an action or call a tool', color: '#f59e0b' },
              { label: 'Observe Result', desc: 'See the outcome of the action', color: '#22c55e' },
            ]},
            { type: 'paragraph', html: 'This loop repeats until the agent has accomplished the goal or decides it cannot proceed.' },

            { type: 'heading', level: 3, text: 'The ReAct Pattern', id: 'react-pattern' },
            { type: 'paragraph', html: '<strong>ReAct</strong> (Reasoning + Acting) is the dominant pattern for LLM agents. The model alternates between <em>thinking</em> (chain-of-thought reasoning) and <em>acting</em> (calling tools), using observations from tool results to inform the next step.' },
            { type: 'code', language: 'python', title: 'react_loop.py', code: `# Simplified ReAct agent loop
def react_agent(user_query: str, tools: dict, llm) -> str:
    """
    ReAct loop: Thought → Action → Observation → Thought → ...
    """
    messages = [{"role": "user", "content": user_query}]
    max_steps = 10

    for step in range(max_steps):
        # LLM generates thought + action (or final answer)
        response = llm.generate(messages, tools=tools)

        if response.has_tool_call:
            # Agent decided to use a tool
            tool_name = response.tool_call.name
            tool_args = response.tool_call.arguments
            print(f"  Step {step}: Calling {tool_name}({tool_args})")

            # Execute the tool
            result = tools[tool_name].execute(**tool_args)

            # Feed result back as observation
            messages.append({"role": "tool", "content": str(result)})
        else:
            # Agent generated final answer
            return response.text

    return "Agent exceeded max steps."

# Example tools an agent might use
tools = {
    "search_web":   SearchTool(),
    "run_code":     CodeExecutor(),
    "read_file":    FileReader(),
    "write_file":   FileWriter(),
}` },

            { type: 'heading', level: 3, text: 'Tool Use Flow', id: 'tool-use-flow' },
            { type: 'paragraph', html: 'When an agent needs to take action in the world, it uses <strong>tools</strong> — functions it can call to interact with external systems:' },
            { type: 'flow', steps: [
              { label: 'User Request', desc: '"What\'s the weather in Tokyo?"', color: '#6366f1' },
              { label: 'Agent Thinks', desc: '"I need to check a weather API"', color: '#8b5cf6' },
              { label: 'Tool Call', desc: 'get_weather(city="Tokyo")', color: '#f59e0b' },
              { label: 'Tool Response', desc: '{"temp": 22, "condition": "sunny"}', color: '#22c55e' },
              { label: 'Agent Thinks', desc: '"Now I can answer the user"', color: '#a855f7' },
              { label: 'Final Answer', desc: '"It\'s 22°C and sunny in Tokyo"', color: '#06b6d4' },
            ]},

            { type: 'heading', level: 3, text: 'Agent vs Chatbot', id: 'agent-vs-chatbot' },
            { type: 'comparison', left: { title: 'Chatbot (LLM)', color: '#6366f1', items: [
              'Generates text responses only',
              'No access to external systems',
              'Single turn — no persistent state',
              'Knowledge limited to training data',
              'Cannot take real-world actions',
            ]}, right: { title: 'AI Agent', color: '#f59e0b', items: [
              'Reasons, plans, and takes actions',
              'Uses tools (APIs, code, files, web)',
              'Multi-step — maintains context across steps',
              'Can access live data via tools',
              'Executes real-world tasks autonomously',
            ]}},

            { type: 'heading', level: 3, text: 'Real-World Agent Examples', id: 'agent-examples' },
            { type: 'list', ordered: false, items: [
              '<strong>Claude Code:</strong> Reads files, writes code, runs tests, makes git commits',
              '<strong>Devin:</strong> Autonomous software engineer — plans, codes, debugs, deploys',
              '<strong>AutoGPT:</strong> General-purpose agent that breaks goals into sub-tasks',
              '<strong>Customer Support Agents:</strong> Look up orders, process refunds, escalate issues',
              '<strong>Research Agents:</strong> Search papers, summarize findings, generate reports',
            ]},

            { type: 'callout', variant: 'caution', html: 'Agents are powerful but need guardrails. An agent with unrestricted tool access could make irreversible mistakes. Always implement <strong>human-in-the-loop</strong> confirmation for high-stakes actions (sending emails, making purchases, deleting data).' },

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'agent-takeaways' },
            { type: 'list', ordered: true, items: [
              'An AI agent is an LLM that can observe, reason, and take actions — not just generate text',
              'The ReAct pattern alternates between reasoning (thoughts) and acting (tool calls)',
              'Tools give agents hands — search, code execution, file operations, API calls',
              'The agent loop repeats until the goal is achieved or max steps are reached',
              'Always add guardrails for high-stakes agent actions',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 17. Agent Architectures
        // ──────────────────────────────────────────────────────────
        {
          slug: 'agent-architectures',
          title: 'Agent Architectures',
          description: 'Single agent, multi-agent, hierarchical orchestration, memory systems, and orchestrator/worker patterns.',
          keywords: ['multi-agent', 'orchestrator', 'worker agent', 'memory', 'vector db', 'hierarchical agents'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          prerequisites: ['what-is-ai-agent'],
          content: [
            { type: 'heading', level: 2, text: 'From Single to Multi-Agent Systems', id: 'single-to-multi' },
            { type: 'paragraph', html: 'A single agent works well for simple tasks, but complex problems benefit from <strong>multiple specialized agents</strong> working together — just like how a company has different departments (engineering, design, marketing) rather than one person doing everything.' },

            { type: 'heading', level: 3, text: 'Architecture Patterns', id: 'arch-patterns' },
            { type: 'table', headers: ['Pattern', 'Description', 'Best For'], rows: [
              ['<strong>Single Agent</strong>', 'One LLM with tools, handles everything', 'Simple, well-defined tasks'],
              ['<strong>Multi-Agent (Flat)</strong>', 'Multiple peers collaborate as equals', 'Brainstorming, debate, diverse perspectives'],
              ['<strong>Hierarchical</strong>', 'Manager delegates to specialized workers', 'Complex projects with distinct sub-tasks'],
              ['<strong>Pipeline</strong>', 'Agents in sequence, each refining output', 'Content creation, code review pipelines'],
            ]},

            { type: 'heading', level: 3, text: 'The Orchestrator/Worker Pattern', id: 'orchestrator-worker' },
            { type: 'paragraph', html: 'The most common multi-agent architecture. An <strong>orchestrator</strong> agent receives the user\'s request, breaks it into sub-tasks, delegates to <strong>worker agents</strong>, and aggregates their results.' },
            { type: 'flow', steps: [
              { label: 'User Request', desc: '"Build me a landing page"', color: '#6366f1' },
              { label: 'Orchestrator', desc: 'Plans tasks, assigns to workers', color: '#8b5cf6' },
              { label: 'Design Agent', desc: 'Creates layout and color scheme', color: '#f59e0b' },
              { label: 'Code Agent', desc: 'Writes HTML/CSS/JS', color: '#22c55e' },
              { label: 'Copy Agent', desc: 'Writes compelling text content', color: '#06b6d4' },
              { label: 'Orchestrator', desc: 'Combines results, ensures quality', color: '#8b5cf6' },
              { label: 'Final Response', desc: 'Complete landing page delivered', color: '#a855f7' },
            ]},

            { type: 'code', language: 'typescript', title: 'orchestrator.ts', code: `// Orchestrator/Worker agent pattern
interface AgentResult {
  agent: string;
  output: string;
  status: 'success' | 'error';
}

interface WorkerAgent {
  name: string;
  description: string;
  execute(task: string, context: Record<string, string>): Promise<AgentResult>;
}

class Orchestrator {
  private workers: Map<string, WorkerAgent> = new Map();

  registerWorker(agent: WorkerAgent): void {
    this.workers.set(agent.name, agent);
  }

  async handleRequest(userRequest: string): Promise<string> {
    // Step 1: Plan — break request into sub-tasks
    const plan = await this.planTasks(userRequest);
    console.log("Plan:", plan.map(t => t.task));

    // Step 2: Execute — delegate to workers
    const results: AgentResult[] = [];
    const context: Record<string, string> = {};

    for (const step of plan) {
      const worker = this.workers.get(step.agent);
      if (!worker) throw new Error(\`No worker: \${step.agent}\`);

      const result = await worker.execute(step.task, context);
      results.push(result);

      // Share results with subsequent agents
      context[step.agent] = result.output;
    }

    // Step 3: Aggregate — combine worker outputs
    return this.aggregate(userRequest, results);
  }

  private async planTasks(request: string) {
    // LLM decomposes request into steps
    return [
      { agent: 'researcher', task: 'Research the topic' },
      { agent: 'writer',     task: 'Write the content' },
      { agent: 'reviewer',   task: 'Review and refine' },
    ];
  }

  private async aggregate(request: string, results: AgentResult[]) {
    return results.map(r => r.output).join('\\n\\n');
  }
}` },

            { type: 'heading', level: 3, text: 'Agent Memory Systems', id: 'agent-memory' },
            { type: 'paragraph', html: 'Agents need memory to be effective. There are three types:' },
            { type: 'table', headers: ['Memory Type', 'Duration', 'Implementation', 'Use Case'], rows: [
              ['<strong>Short-Term</strong>', 'Current conversation', 'Context window / chat history', 'Tracking current task state'],
              ['<strong>Working Memory</strong>', 'Current session', 'Scratchpad / variables', 'Intermediate results, plans'],
              ['<strong>Long-Term</strong>', 'Across sessions', 'Vector database / knowledge base', 'User preferences, learned facts'],
            ]},

            { type: 'heading', level: 3, text: 'Vector Database for Long-Term Memory', id: 'vector-db-memory' },
            { type: 'paragraph', html: 'Long-term memory typically uses a <strong>vector database</strong>. Text is converted to embeddings (dense vectors), stored, and retrieved by semantic similarity — so the agent can recall relevant information even if the exact wording differs.' },
            { type: 'flow', steps: [
              { label: 'New Information', desc: 'Agent learns something worth remembering', color: '#6366f1' },
              { label: 'Embed', desc: 'Convert text to vector embedding', color: '#8b5cf6' },
              { label: 'Store', desc: 'Save in vector database with metadata', color: '#f59e0b' },
              { label: 'Later: Query', desc: 'Search for relevant memories by similarity', color: '#22c55e' },
              { label: 'Recall', desc: 'Retrieved memories added to agent context', color: '#06b6d4' },
            ]},

            { type: 'heading', level: 3, text: 'Architecture Decision Guide', id: 'arch-decision' },
            { type: 'comparison', left: { title: 'Use Single Agent', color: '#6366f1', items: [
              'Task is well-defined and bounded',
              'Can be done with 3-5 tool calls',
              'Low latency requirement',
              'Simple workflow, no sub-tasks',
            ]}, right: { title: 'Use Multi-Agent', color: '#f59e0b', items: [
              'Task requires diverse expertise',
              'Multiple independent sub-tasks',
              'Quality benefits from specialization',
              'Complex workflows with dependencies',
            ]}},

            { type: 'callout', variant: 'caution', html: 'Multi-agent systems add complexity. Each agent call has latency and cost. Start with a single agent and only add more when you\'ve identified clear sub-tasks that benefit from specialization.' },

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'arch-takeaways' },
            { type: 'list', ordered: true, items: [
              'Single agent for simple tasks; multi-agent for complex ones requiring diverse expertise',
              'The orchestrator/worker pattern delegates sub-tasks to specialized agents',
              'Agent memory: short-term (context), working (scratchpad), long-term (vector DB)',
              'Vector databases enable semantic memory retrieval across sessions',
              'Start simple — add agents only when complexity demands it',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 18. Swarm Intelligence
        // ──────────────────────────────────────────────────────────
        {
          slug: 'swarm-intelligence',
          title: 'Swarm Intelligence',
          description: 'How agents communicate — message passing, shared state, blackboard architecture, and network topologies.',
          keywords: ['swarm intelligence', 'message passing', 'blackboard architecture', 'multi-agent communication', 'topology'],
          difficulty: 'advanced',
          estimatedMinutes: 16,
          prerequisites: ['agent-architectures'],
          content: [
            { type: 'heading', level: 2, text: 'What is Swarm Intelligence?', id: 'what-is-swarm' },
            { type: 'paragraph', html: '<strong>Swarm intelligence</strong> is how many simple agents, following simple rules, produce complex collective behavior. No single ant builds a colony; no single bee finds the best flowers. But together, through local interactions and shared signals, they solve problems that no individual could.' },
            { type: 'callout', variant: 'tip', html: '<strong>Analogy:</strong> Ant colonies find the shortest path to food without any central planner. Each ant follows simple rules: follow pheromone trails, leave your own pheromone, and wander randomly if no trail exists. The colony as a whole converges on optimal paths. AI swarms work the same way.' },

            { type: 'heading', level: 3, text: 'Communication Patterns', id: 'communication-patterns' },
            { type: 'table', headers: ['Pattern', 'How It Works', 'Pros', 'Cons'], rows: [
              ['<strong>Message Passing</strong>', 'Agents send direct messages to each other', 'Precise, targeted communication', 'Must know who to talk to'],
              ['<strong>Shared State</strong>', 'Agents read/write to a shared memory', 'Simple, decoupled agents', 'Concurrency issues, bottleneck'],
              ['<strong>Blackboard</strong>', 'Shared workspace; agents react to changes', 'Flexible, event-driven', 'Complex coordination logic'],
              ['<strong>Stigmergy</strong>', 'Agents modify environment; others react', 'Fully decoupled, scalable', 'Indirect, slower convergence'],
            ]},

            { type: 'heading', level: 3, text: 'Message Bus Architecture', id: 'message-bus' },
            { type: 'flow', steps: [
              { label: 'Agent A', desc: 'Publishes: "Found relevant data"', color: '#6366f1' },
              { label: 'Message Bus', desc: 'Routes messages to subscribers', color: '#f59e0b' },
              { label: 'Agent B', desc: 'Receives and analyzes data', color: '#22c55e' },
              { label: 'Agent C', desc: 'Receives and generates report', color: '#06b6d4' },
              { label: 'Agent D', desc: 'Receives and updates dashboard', color: '#8b5cf6' },
            ]},

            { type: 'heading', level: 3, text: 'Network Topologies', id: 'topologies' },
            { type: 'paragraph', html: 'The topology defines how agents connect and communicate. Different topologies suit different problem structures:' },
            { type: 'table', headers: ['Topology', 'Structure', 'Communication', 'Best For'], rows: [
              ['<strong>Mesh</strong>', 'Every agent connects to every other', 'O(n²) connections', 'Small groups needing full collaboration'],
              ['<strong>Star</strong>', 'All agents connect through a central hub', 'Hub routes all messages', 'Centralized coordination, orchestrator pattern'],
              ['<strong>Hierarchical</strong>', 'Tree structure — managers and workers', 'Top-down delegation, bottom-up reporting', 'Large organizations, clear task decomposition'],
              ['<strong>Ring</strong>', 'Each agent connects to two neighbors', 'Messages pass around the ring', 'Sequential processing, consensus algorithms'],
            ]},

            { type: 'heading', level: 3, text: 'Blackboard Architecture', id: 'blackboard' },
            { type: 'paragraph', html: 'The <strong>blackboard pattern</strong> uses a shared workspace where agents post findings and react to changes. A controller decides which agent to activate based on the current state of the blackboard.' },
            { type: 'code', language: 'typescript', title: 'blackboard.ts', code: `// Blackboard architecture for agent communication
interface BlackboardEntry {
  agent: string;
  type: 'hypothesis' | 'evidence' | 'conclusion';
  content: string;
  confidence: number;
  timestamp: number;
}

class Blackboard {
  private entries: BlackboardEntry[] = [];
  private subscribers: Map<string, (entry: BlackboardEntry) => void> = new Map();

  // Agents post findings to the shared workspace
  post(entry: BlackboardEntry): void {
    this.entries.push(entry);
    console.log(\`[\${entry.agent}] posted \${entry.type}: "\${entry.content}" (conf: \${entry.confidence})\`);

    // Notify all subscribers
    for (const [name, handler] of this.subscribers) {
      if (name !== entry.agent) handler(entry);
    }
  }

  // Agents subscribe to react to new entries
  subscribe(agentName: string, handler: (entry: BlackboardEntry) => void): void {
    this.subscribers.set(agentName, handler);
  }

  // Query the blackboard for relevant information
  query(type?: string, minConfidence?: number): BlackboardEntry[] {
    return this.entries.filter(e =>
      (!type || e.type === type) &&
      (!minConfidence || e.confidence >= minConfidence)
    );
  }
}

// Usage: research swarm
const board = new Blackboard();

board.subscribe('analyst', (entry) => {
  if (entry.type === 'evidence' && entry.confidence > 0.7) {
    // Analyst reacts to high-confidence evidence
    board.post({
      agent: 'analyst',
      type: 'hypothesis',
      content: \`Based on "\${entry.content}", I hypothesize...\`,
      confidence: 0.6,
      timestamp: Date.now(),
    });
  }
});` },

            { type: 'heading', level: 3, text: 'Nature-Inspired AI Swarms', id: 'nature-inspired' },
            { type: 'paragraph', html: 'Many AI swarm algorithms are directly inspired by nature:' },
            { type: 'list', ordered: false, items: [
              '<strong>Ant Colony Optimization (ACO):</strong> Digital pheromone trails for path finding and routing problems',
              '<strong>Particle Swarm Optimization (PSO):</strong> Agents explore solution space, sharing best-found positions',
              '<strong>Bee Algorithm:</strong> Scout bees explore, recruit others to promising areas — used for load balancing',
              '<strong>Firefly Algorithm:</strong> Agents attracted to brighter (better) solutions — used for optimization',
            ]},

            { type: 'heading', level: 3, text: 'Modern AI Swarms', id: 'modern-swarms' },
            { type: 'comparison', left: { title: 'Nature Swarms', color: '#22c55e', items: [
              'Simple agents, simple rules',
              'No central controller',
              'Emergent collective behavior',
              'Robust to individual failures',
              'Examples: ants, bees, flocking birds',
            ]}, right: { title: 'AI Swarms', color: '#f59e0b', items: [
              'LLM-powered agents with reasoning',
              'Optional orchestrator for efficiency',
              'Explicit communication protocols',
              'Can handle complex, diverse tasks',
              'Examples: CrewAI, AutoGen, Swarm',
            ]}},

            { type: 'callout', variant: 'note', html: 'OpenAI\'s Swarm framework and Microsoft\'s AutoGen are practical implementations of multi-agent swarms. They provide tools for agent coordination, message passing, and shared state management.' },

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'swarm-takeaways' },
            { type: 'list', ordered: true, items: [
              'Swarm intelligence produces complex behavior from simple agents following simple rules',
              'Communication patterns: message passing, shared state, blackboard, stigmergy',
              'Network topology (mesh, star, hierarchical) affects coordination efficiency',
              'The blackboard pattern is a flexible shared workspace for multi-agent collaboration',
              'Nature-inspired algorithms (ACO, PSO) solve optimization via collective exploration',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 19. MCP Protocol — Complete Guide
        // ──────────────────────────────────────────────────────────
        {
          slug: 'mcp-protocol',
          title: 'Model Context Protocol (MCP) — Complete Guide',
          description: 'Master MCP from basics to production: architecture deep-dive, building servers and clients, transports, resources, prompts, security, debugging SOPs, and the MCP ecosystem.',
          keywords: ['mcp', 'model context protocol', 'mcp server', 'mcp client', 'tool use', 'claude code', 'ai tools', 'stdio transport', 'sse transport', 'mcp resources', 'mcp prompts', 'mcp debugging', 'mcp security', 'mcp ecosystem', 'build mcp server', 'claude desktop config'],
          difficulty: 'advanced',
          estimatedMinutes: 35,
          prerequisites: ['what-is-ai-agent'],
          content: [
            // ── Section 1: What is MCP and WHY ──
            { type: 'heading', level: 2, text: 'What is MCP and Why Does It Exist?', id: 'what-is-mcp' },
            { type: 'paragraph', html: 'The <strong>Model Context Protocol (MCP)</strong> is an open standard created by Anthropic for connecting AI models to external tools, data sources, and services. Think of it as a <strong>USB-C for AI</strong> — a universal interface that lets any AI model talk to any tool through a single standardized protocol.' },
            { type: 'paragraph', html: 'Before MCP, every AI application needed custom integration code for every tool it wanted to use. If you had <strong>N AI models</strong> and <strong>M tools</strong>, you needed <strong>N × M</strong> custom integrations — an explosion of bespoke glue code. MCP reduces this to <strong>N + M</strong>: each model implements one MCP client, each tool implements one MCP server, and they all interoperate automatically.' },

            { type: 'heading', level: 3, text: 'The N×M Problem MCP Solves', id: 'nxm-problem' },
            { type: 'comparison', left: { title: 'Before MCP (N×M)', color: '#ef4444', items: [
              'Custom integration for each tool × each model',
              '3 models × 5 tools = 15 custom integrations',
              'Every new tool requires code in every AI app',
              'Duplicated auth, error handling, serialization',
              'Fragile, hard to maintain, vendor lock-in',
            ]}, right: { title: 'With MCP (N+M)', color: '#22c55e', items: [
              'Each model: 1 MCP client. Each tool: 1 MCP server',
              '3 models + 5 tools = 8 implementations total',
              'New tool works with ALL AI apps automatically',
              'Standardized protocol handles communication',
              'Modular, composable, vendor-neutral',
            ]}},

            { type: 'heading', level: 3, text: 'When to Build an MCP Server', id: 'when-to-build-mcp' },
            { type: 'paragraph', html: 'Not everything needs an MCP server. Here is when MCP is the right choice:' },
            { type: 'list', ordered: false, items: [
              '<strong>You have a tool or API</strong> you want AI models (Claude, GPT, etc.) to call directly',
              '<strong>You have private data</strong> (databases, filesystems, internal APIs) that should be queryable by AI',
              '<strong>You want reusability</strong> — one implementation works across Claude Desktop, Claude Code, Cursor, and any MCP-compatible client',
              '<strong>You need structured tool schemas</strong> — MCP enforces typed parameters with Zod/JSON Schema, reducing hallucinated arguments',
              '<strong>You want composability</strong> — users can mix-and-match your MCP server with others in a single AI session',
            ]},
            { type: 'callout', variant: 'tip', html: '<strong>Rule of thumb:</strong> If you are building a REST API and want AI models to use it, wrap it in an MCP server. The server acts as a typed, discoverable bridge between your API and any AI model.' },

            { type: 'divider' },

            // ── Section 2: Architecture Deep-Dive ──
            { type: 'heading', level: 2, text: 'MCP Architecture Deep-Dive', id: 'mcp-architecture' },
            { type: 'paragraph', html: 'MCP follows a <strong>client-server architecture</strong> with four key components: <strong>Host</strong>, <strong>Client</strong>, <strong>Server</strong>, and <strong>Transport</strong>. Understanding each component is critical for building production MCP systems.' },

            { type: 'flow', steps: [
              { label: 'Host', desc: 'AI application (Claude Desktop, IDE)', color: '#6366f1' },
              { label: 'MCP Client', desc: 'Manages server connections', color: '#8b5cf6' },
              { label: 'Transport', desc: 'stdio or HTTP+SSE', color: '#a855f7' },
              { label: 'MCP Server', desc: 'Exposes tools, resources, prompts', color: '#f59e0b' },
              { label: 'External Service', desc: 'Database, API, filesystem', color: '#22c55e' },
            ]},

            { type: 'table', headers: ['Component', 'Role', 'Examples'], rows: [
              ['<strong>Host</strong>', 'The AI application that the user interacts with. Creates and manages MCP clients.', 'Claude Desktop, Claude Code, Cursor, Windsurf'],
              ['<strong>Client</strong>', 'Protocol handler inside the host. Maintains 1:1 connection with a server. Handles initialization, capability negotiation, tool discovery.', 'Built into the host — one client per server connection'],
              ['<strong>Server</strong>', 'Lightweight process that exposes capabilities (tools, resources, prompts) via the MCP protocol.', 'filesystem server, GitHub server, Postgres server'],
              ['<strong>Transport</strong>', 'Communication layer between client and server. Handles message serialization and delivery.', 'stdio (local), HTTP + SSE (remote), custom'],
            ]},
            { type: 'callout', variant: 'note', html: '<strong>Key insight:</strong> A single Host can connect to <strong>multiple MCP servers simultaneously</strong>. Claude Desktop might connect to a filesystem server, a GitHub server, and a database server all at once — each through its own Client instance.' },

            { type: 'divider' },

            // ── Section 3: Protocol Lifecycle ──
            { type: 'heading', level: 2, text: 'Protocol Lifecycle', id: 'protocol-lifecycle' },
            { type: 'paragraph', html: 'Every MCP session follows a structured lifecycle. Understanding this flow is essential for debugging connection issues and building reliable servers.' },
            { type: 'flow', steps: [
              { label: '1. Initialize', desc: 'Client sends capabilities, server responds with its capabilities', color: '#6366f1' },
              { label: '2. List Tools', desc: 'Client requests available tools from server', color: '#8b5cf6' },
              { label: '3. User Prompt', desc: 'User asks AI something that needs a tool', color: '#a855f7' },
              { label: '4. Call Tool', desc: 'Client sends tool name + args to server', color: '#f59e0b' },
              { label: '5. Execute', desc: 'Server runs the tool logic', color: '#ef4444' },
              { label: '6. Response', desc: 'Server returns structured result to client', color: '#22c55e' },
              { label: '7. AI Uses Result', desc: 'Model incorporates tool output into its response', color: '#06b6d4' },
            ]},

            { type: 'code', language: 'typescript', title: 'protocol-messages.ts', code: `// 1. Initialize — Client → Server
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
}` },

            { type: 'divider' },

            // ── Section 4: Transport Types ──
            { type: 'heading', level: 2, text: 'Transport Types: stdio vs HTTP+SSE', id: 'transport-types' },
            { type: 'paragraph', html: 'MCP supports two transport mechanisms. Your choice depends on whether the server runs locally or remotely.' },

            { type: 'comparison', left: { title: 'stdio Transport (Local)', color: '#6366f1', items: [
              'Server runs as a child process of the host',
              'Communication via stdin/stdout pipes',
              'Zero network configuration needed',
              'Best for local tools: filesystem, git, local DB',
              'Fastest — no HTTP overhead',
              'Server lifecycle managed by the host',
            ]}, right: { title: 'HTTP + SSE Transport (Remote)', color: '#f59e0b', items: [
              'Server runs as a standalone HTTP service',
              'Client connects over the network',
              'Supports authentication (API keys, OAuth)',
              'Best for cloud APIs, shared services, SaaS tools',
              'Can serve multiple clients simultaneously',
              'Server lifecycle managed independently',
            ]}},

            { type: 'code', language: 'typescript', title: 'transports.ts', code: `// ── stdio transport (local server) ──
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

app.listen(3001, () => console.log("MCP server on http://localhost:3001"));` },

            { type: 'divider' },

            // ── Section 5: MCP Capabilities — Tools, Resources, Prompts ──
            { type: 'heading', level: 2, text: 'MCP Capabilities: Tools, Resources, and Prompts', id: 'mcp-capabilities' },
            { type: 'paragraph', html: 'MCP servers can expose three types of capabilities. <strong>Tools</strong> are functions the AI can call. <strong>Resources</strong> are data the AI can read. <strong>Prompts</strong> are reusable prompt templates.' },

            { type: 'table', headers: ['Capability', 'Purpose', 'Analogy', 'Example'], rows: [
              ['<strong>Tools</strong>', 'Actions the AI can perform', 'Functions / API endpoints', 'get_weather(), create_issue(), query_db()'],
              ['<strong>Resources</strong>', 'Data the AI can read', 'GET endpoints / file reads', 'file://config.json, db://users/123'],
              ['<strong>Prompts</strong>', 'Reusable prompt templates', 'Stored procedures / macros', 'code-review, summarize-doc, debug-error'],
            ]},

            { type: 'heading', level: 3, text: 'Tools — Functions the AI Can Call', id: 'mcp-tools' },
            { type: 'code', language: 'typescript', title: 'mcp-tools-example.ts', code: `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
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
);` },

            { type: 'heading', level: 3, text: 'Resources — Data the AI Can Read', id: 'mcp-resources' },
            { type: 'paragraph', html: '<strong>Resources</strong> expose data sources that the AI model can read. Unlike tools (which perform actions), resources are read-only and represent data that exists — files, database records, API responses, etc.' },
            { type: 'code', language: 'typescript', title: 'mcp-resources-example.ts', code: `// Expose a static resource
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
);` },

            { type: 'heading', level: 3, text: 'Prompts — Reusable Prompt Templates', id: 'mcp-prompts' },
            { type: 'paragraph', html: '<strong>Prompts</strong> let MCP servers define reusable, parameterized prompt templates. When a user selects a prompt, the client fills in the parameters and sends the assembled messages to the AI model.' },
            { type: 'code', language: 'typescript', title: 'mcp-prompts-example.ts', code: `// Register a prompt template
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
          text: \`Review this \${language} code. Focus on: \${focus}.

\\\`\\\`\\\`\${language}
\${code}
\\\`\\\`\\\`

Provide specific feedback with line references.\`,
        },
      },
    ],
  })
);` },

            { type: 'divider' },

            // ── Section 6: Building a Complete MCP Server ──
            { type: 'heading', level: 2, text: 'Building a Complete MCP Server', id: 'building-mcp-server' },
            { type: 'paragraph', html: 'Let us build a complete, production-ready MCP server step by step — a <strong>notes manager</strong> that Claude can use to create, search, and organize notes.' },

            { type: 'code', language: 'typescript', title: 'notes-mcp-server.ts', code: `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
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
    const filename = title.replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\\s+/g, "-").toLowerCase();
    const filepath = path.join(NOTES_DIR, \`\${filename}.md\`);

    const frontmatter = \`---
title: \${title}
tags: [\${tags.join(", ")}]
created: \${new Date().toISOString()}
---

\${content}\`;

    await fs.writeFile(filepath, frontmatter, "utf-8");
    return {
      content: [{ type: "text", text: \`Note created: \${filepath}\` }],
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
      const matchesTag = !tag || content.includes(\`tags: [\` + tag);

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
    const filename = uri.pathname.replace(/^\\/\\//, "") + ".md";
    const content = await fs.readFile(path.join(NOTES_DIR, filename), "utf-8");
    return {
      contents: [{ uri: uri.toString(), text: content, mimeType: "text/markdown" }],
    };
  }
);

// ── Start the server ──
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Notes MCP server running on stdio");` },

            { type: 'divider' },

            // ── Section 7: SOP for Building an MCP Server ──
            { type: 'heading', level: 2, text: 'SOP: Building an MCP Server (Step-by-Step)', id: 'sop-building-mcp' },
            { type: 'callout', variant: 'tip', html: '<strong>Standard Operating Procedure</strong> — Follow these steps in order to build and deploy any MCP server from scratch.' },
            { type: 'list', ordered: true, items: [
              '<strong>Step 1 — Define your tools:</strong> List the operations your server will expose. For each tool, define: name, description, input parameters (with types), and what it returns. Start with 2-3 tools maximum.',
              '<strong>Step 2 — Choose your transport:</strong> Use <code>stdio</code> for local servers (filesystem, git, local DB). Use <code>HTTP+SSE</code> for remote/shared servers (cloud APIs, SaaS integrations). Most servers start with stdio.',
              '<strong>Step 3 — Scaffold the project:</strong> Run <code>npm init -y && npm install @modelcontextprotocol/sdk zod</code>. Create your server file. Use TypeScript for type safety.',
              '<strong>Step 4 — Implement tool handlers:</strong> Register each tool with <code>server.tool(name, description, schema, handler)</code>. Each handler receives validated arguments and returns <code>{ content: [{ type: "text", text: "..." }] }</code>.',
              '<strong>Step 5 — Add error handling:</strong> Wrap handler logic in try/catch. Return user-friendly error messages. Use <code>isError: true</code> in the result to signal failures to the AI model.',
              '<strong>Step 6 — Test locally:</strong> Run your server directly: <code>npx tsx server.ts</code>. Use the MCP Inspector tool (<code>npx @modelcontextprotocol/inspector</code>) to test tools interactively.',
              '<strong>Step 7 — Register in Claude Desktop:</strong> Add your server to <code>claude_desktop_config.json</code> (see config example below). Restart Claude Desktop.',
              '<strong>Step 8 — Test with Claude:</strong> Open Claude Desktop and ask it to use your tools. Verify tool discovery, argument passing, and result formatting work correctly.',
            ]},

            { type: 'code', language: 'json', title: 'claude_desktop_config.json', code: `{
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
}` },

            { type: 'divider' },

            // ── Section 8: SOP for Debugging MCP ──
            { type: 'heading', level: 2, text: 'SOP: Debugging MCP Servers', id: 'sop-debugging-mcp' },
            { type: 'callout', variant: 'caution', html: '<strong>Debugging MCP</strong> can be tricky because the server runs as a subprocess. Use these systematic steps to diagnose and fix common issues.' },

            { type: 'table', headers: ['Error', 'Cause', 'Fix'], rows: [
              ['<strong>Connection refused</strong>', 'Server process failed to start or crashed on init', 'Check server logs with <code>npx @modelcontextprotocol/inspector</code>. Verify the command/args in config are correct. Check for missing dependencies.'],
              ['<strong>Tool not found</strong>', 'Tool name mismatch between registration and call', 'Verify tool names exactly match. Run <code>tools/list</code> via Inspector to see registered tools. Check for typos.'],
              ['<strong>Timeout</strong>', 'Tool handler takes too long or hangs', 'Add timeouts to external API calls. Check for unresolved promises. Use <code>AbortController</code> for cancellation.'],
              ['<strong>Schema mismatch</strong>', 'AI sends arguments that do not match the Zod schema', 'Make parameter descriptions more specific. Add <code>.describe()</code> to every Zod field. Test with Inspector.'],
              ['<strong>Permission denied</strong>', 'Server process lacks access to files/APIs', 'Check file permissions. Verify environment variables (API keys, tokens) are set in the config.'],
              ['<strong>Server crashes silently</strong>', 'Unhandled exception in tool handler', 'Wrap all handlers in try/catch. Log errors to stderr (<code>console.error</code>). Never throw from handlers — return error content.'],
            ]},

            { type: 'heading', level: 3, text: 'Debugging Workflow', id: 'debug-workflow' },
            { type: 'flow', steps: [
              { label: '1. Check Logs', desc: 'stderr output from server process', color: '#6366f1' },
              { label: '2. Use Inspector', desc: 'npx @modelcontextprotocol/inspector', color: '#8b5cf6' },
              { label: '3. Test Tool', desc: 'Call each tool manually with test args', color: '#a855f7' },
              { label: '4. Check Schema', desc: 'Verify Zod schemas match expected input', color: '#f59e0b' },
              { label: '5. Check Config', desc: 'Validate claude_desktop_config.json', color: '#22c55e' },
            ]},

            { type: 'code', language: 'typescript', title: 'error-handling-pattern.ts', code: `// Best practice: wrap every tool handler with error handling
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
          text: \`Error: \${error instanceof Error ? error.message : "Unknown error"}\`,
        }],
        isError: true,  // Signals to the AI that this tool call failed
      };
    }
  }
);` },

            { type: 'divider' },

            // ── Section 9: Advanced — Building an MCP Client ──
            { type: 'heading', level: 2, text: 'Advanced: Building an MCP Client', id: 'mcp-client' },
            { type: 'paragraph', html: 'Most developers build MCP <em>servers</em>. But if you are building an AI application (a Host), you need an MCP <em>client</em> to connect to servers and relay tool calls. Here is how to build one from scratch.' },

            { type: 'code', language: 'typescript', title: 'mcp-client.ts', code: `import { Client } from "@modelcontextprotocol/sdk/client/index.js";
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
await client.close();` },

            { type: 'divider' },

            // ── Section 10: Advanced — Multi-Tool Servers & Middleware ──
            { type: 'heading', level: 2, text: 'Advanced: Multi-Tool Servers and Middleware', id: 'advanced-patterns' },
            { type: 'paragraph', html: 'Production MCP servers often need shared logic across multiple tools — authentication, logging, rate limiting, caching. Use middleware patterns to keep tool handlers clean.' },

            { type: 'code', language: 'typescript', title: 'middleware-pattern.ts', code: `// Middleware pattern for MCP tool handlers
type ToolHandler = (args: Record<string, unknown>) => Promise<{ content: Array<{ type: string; text: string }> }>;

// Logging middleware — wraps any tool handler
function withLogging(toolName: string, handler: ToolHandler): ToolHandler {
  return async (args) => {
    const start = Date.now();
    console.error(\`[\${toolName}] called with:\`, JSON.stringify(args));
    try {
      const result = await handler(args);
      console.error(\`[\${toolName}] completed in \${Date.now() - start}ms\`);
      return result;
    } catch (error) {
      console.error(\`[\${toolName}] FAILED after \${Date.now() - start}ms:\`, error);
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
);` },

            { type: 'divider' },

            // ── Section 11: Security Considerations ──
            { type: 'heading', level: 2, text: 'Security Considerations', id: 'mcp-security' },
            { type: 'callout', variant: 'caution', html: '<strong>MCP servers execute code on your machine.</strong> A malicious or poorly written server can read your files, make network requests, or execute arbitrary commands. Always review servers before installing them.' },

            { type: 'list', ordered: false, items: [
              '<strong>Sandboxing:</strong> Run untrusted MCP servers in containers (Docker) or VMs. Limit filesystem access to specific directories.',
              '<strong>Input validation:</strong> Always validate tool arguments with Zod schemas. Never pass raw user input to shell commands or SQL queries without sanitization.',
              '<strong>Permission scoping:</strong> Follow the principle of least privilege. A GitHub MCP server should only have repo-level tokens, not org-admin tokens.',
              '<strong>Environment variables:</strong> Store secrets (API keys, tokens) in env vars, never hardcoded in server code. Use <code>env</code> in <code>claude_desktop_config.json</code>.',
              '<strong>Remote server auth:</strong> For HTTP+SSE servers, implement authentication (API keys, OAuth, mTLS). Never expose MCP servers to the public internet without auth.',
              '<strong>Audit logging:</strong> Log all tool calls with timestamps and arguments to stderr. This helps detect misuse and debug issues.',
            ]},

            { type: 'divider' },

            // ── Section 12: MCP Ecosystem ──
            { type: 'heading', level: 2, text: 'The MCP Ecosystem', id: 'mcp-ecosystem' },
            { type: 'paragraph', html: 'The MCP ecosystem is growing rapidly. Here are some popular, production-ready MCP servers you can use today:' },

            { type: 'table', headers: ['Server', 'Provider', 'What It Does', 'Transport'], rows: [
              ['<strong>filesystem</strong>', 'Anthropic', 'Read/write files, search directories', 'stdio'],
              ['<strong>github</strong>', 'Anthropic', 'Issues, PRs, repos, code search', 'stdio'],
              ['<strong>postgres</strong>', 'Anthropic', 'SQL queries against PostgreSQL databases', 'stdio'],
              ['<strong>slack</strong>', 'Anthropic', 'Read/send messages, list channels', 'stdio'],
              ['<strong>brave-search</strong>', 'Anthropic', 'Web search via Brave Search API', 'stdio'],
              ['<strong>google-drive</strong>', 'Community', 'Read/search Google Drive files', 'stdio'],
              ['<strong>notion</strong>', 'Community', 'Read/write Notion pages and databases', 'stdio'],
              ['<strong>puppeteer</strong>', 'Community', 'Browser automation, screenshots, scraping', 'stdio'],
              ['<strong>sqlite</strong>', 'Community', 'SQLite database operations', 'stdio'],
              ['<strong>memory</strong>', 'Anthropic', 'Persistent knowledge graph for AI context', 'stdio'],
            ]},

            { type: 'callout', variant: 'note', html: 'Find more servers at <strong>github.com/modelcontextprotocol/servers</strong> (official) and <strong>mcp.so</strong> (community directory). Anyone can build and publish an MCP server.' },

            { type: 'divider' },

            // ── Section 13: MCP vs Direct API Integration ──
            { type: 'heading', level: 2, text: 'MCP vs Direct API Integration', id: 'mcp-vs-direct' },
            { type: 'comparison', left: { title: 'Direct API Integration', color: '#ef4444', items: [
              'Custom code for each tool per AI model',
              'Tightly coupled to specific AI provider',
              'Must handle auth, retries, serialization manually',
              'Hard to reuse across different AI models',
              'No standardized tool discovery or schema',
              'Difficult for end-users to extend',
            ]}, right: { title: 'MCP Protocol', color: '#22c55e', items: [
              'One standardized interface for all tools',
              'Works with any MCP-compatible AI client',
              'Protocol handles communication and serialization',
              'Build once, use with Claude, GPT, Gemini, etc.',
              'Typed schemas with automatic validation',
              'Users install servers with zero code changes',
            ]}},

            { type: 'divider' },

            // ── Section 14: Key Takeaways ──
            { type: 'heading', level: 2, text: 'Key Takeaways', id: 'mcp-takeaways' },
            { type: 'list', ordered: true, items: [
              'MCP is a universal open protocol that solves the N×M integration problem — reducing it to N+M',
              'Architecture: Host (AI app) → Client (protocol handler) → Transport (stdio/HTTP) → Server (tools/resources/prompts) → External Service',
              'Three capability types: <strong>Tools</strong> (actions), <strong>Resources</strong> (data), <strong>Prompts</strong> (templates)',
              'Two transports: <strong>stdio</strong> for local servers, <strong>HTTP+SSE</strong> for remote/shared servers',
              'Protocol lifecycle: initialize → list tools → call tool → return result (JSON-RPC 2.0)',
              'Build servers with <code>@modelcontextprotocol/sdk</code>, validate inputs with Zod, handle errors gracefully',
              'Register servers in <code>claude_desktop_config.json</code> for Claude Desktop / Claude Code',
              'Debug with <code>@modelcontextprotocol/inspector</code> — test tools interactively before deploying',
              'Security: sandbox untrusted servers, validate inputs, scope permissions, use env vars for secrets',
              'Growing ecosystem: 100+ community servers for filesystems, databases, APIs, and SaaS tools',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 20. LangChain & LangGraph
        // ──────────────────────────────────────────────────────────
        {
          slug: 'langchain-langgraph',
          title: 'LangChain & LangGraph',
          description: 'LangChain chains, LangGraph state machines, RAG pipelines, and building practical AI agent workflows.',
          keywords: ['langchain', 'langgraph', 'rag', 'retrieval augmented generation', 'chain', 'state machine', 'vector db'],
          difficulty: 'intermediate',
          estimatedMinutes: 20,
          prerequisites: ['what-is-ai-agent', 'agent-architectures'],
          content: [
            { type: 'heading', level: 2, text: 'Building AI Applications with LangChain', id: 'langchain-intro' },
            { type: 'paragraph', html: '<strong>LangChain</strong> is a framework for building applications powered by LLMs. Its core concept is the <strong>chain</strong> — a sequence of steps where each step\'s output feeds into the next. Think of it as a pipeline: Prompt → LLM → Parser → Action.' },

            { type: 'heading', level: 3, text: 'The Chain Concept', id: 'chain-concept' },
            { type: 'flow', steps: [
              { label: 'Prompt Template', desc: 'Fill in variables to create a prompt', color: '#6366f1' },
              { label: 'LLM', desc: 'Send prompt to language model', color: '#8b5cf6' },
              { label: 'Output Parser', desc: 'Extract structured data from response', color: '#f59e0b' },
              { label: 'Action', desc: 'Use parsed output (API call, DB write, etc.)', color: '#22c55e' },
            ]},

            { type: 'code', language: 'python', title: 'langchain_chain.py', code: `# Simple LangChain chain example
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_anthropic import ChatAnthropic

# Step 1: Create a prompt template
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful coding assistant. Be concise."),
    ("user", "Explain {concept} in {language} with a code example."),
])

# Step 2: Initialize the LLM
llm = ChatAnthropic(model="claude-sonnet-4-20250514")

# Step 3: Create the chain (prompt → llm → parser)
chain = prompt | llm | StrOutputParser()

# Step 4: Run the chain
result = chain.invoke({
    "concept": "list comprehensions",
    "language": "Python"
})
print(result)

# --- Chaining multiple steps ---
from langchain_core.runnables import RunnablePassthrough

# Chain: generate code → review code → improve code
generate = ChatPromptTemplate.from_template(
    "Write a Python function that {task}"
) | llm | StrOutputParser()

review = ChatPromptTemplate.from_template(
    "Review this code for bugs and improvements:\\n{code}"
) | llm | StrOutputParser()

# Compose: generate → review
full_chain = generate | (lambda code: {"code": code}) | review
result = full_chain.invoke({"task": "sorts a list using quicksort"})` },

            { type: 'heading', level: 3, text: 'RAG — Retrieval Augmented Generation', id: 'rag-pipeline' },
            { type: 'paragraph', html: '<strong>RAG</strong> lets LLMs answer questions using your private data. Instead of relying solely on training knowledge, the model retrieves relevant documents from a <strong>vector database</strong> and uses them as context to generate accurate, grounded answers.' },
            { type: 'flow', steps: [
              { label: 'User Query', desc: '"How do I configure the API?"', color: '#6366f1' },
              { label: 'Embed Query', desc: 'Convert question to vector', color: '#8b5cf6' },
              { label: 'Vector Search', desc: 'Find similar docs in vector DB', color: '#a855f7' },
              { label: 'Retrieve Docs', desc: 'Top-k most relevant documents', color: '#f59e0b' },
              { label: 'Augment Prompt', desc: 'Insert docs into LLM context', color: '#ef4444' },
              { label: 'Generate', desc: 'LLM answers using retrieved context', color: '#22c55e' },
            ]},
            { type: 'code', language: 'python', title: 'rag_pipeline.py', code: `# RAG pipeline with LangChain
from langchain_community.vectorstores import FAISS
from langchain_anthropic import ChatAnthropic
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

# Step 1: Create vector store from documents
documents = [
    "To configure the API, set the API_KEY environment variable.",
    "The rate limit is 100 requests per minute per API key.",
    "Authentication uses Bearer tokens in the Authorization header.",
    "Errors return JSON with 'error' and 'message' fields.",
]

# Embed and store documents
vectorstore = FAISS.from_texts(documents, embedding=embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

# Step 2: Create RAG prompt
rag_prompt = ChatPromptTemplate.from_template("""
Answer the question based only on the following context:

Context: {context}

Question: {question}

If the context doesn't contain the answer, say "I don't have that information."
""")

# Step 3: Build RAG chain
def format_docs(docs):
    return "\\n".join(doc.page_content for doc in docs)

rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | rag_prompt
    | ChatAnthropic(model="claude-sonnet-4-20250514")
    | StrOutputParser()
)

# Step 4: Query
answer = rag_chain.invoke("How do I authenticate with the API?")
print(answer)  # Uses retrieved docs about Bearer tokens` },

            { type: 'heading', level: 3, text: 'LangGraph — State Machines for Agents', id: 'langgraph-intro' },
            { type: 'paragraph', html: '<strong>LangGraph</strong> extends LangChain with <strong>graph-based state machines</strong>. While LangChain chains are linear (A → B → C), LangGraph allows loops, conditional branching, and persistent state — essential for building agents that iterate until a task is complete.' },
            { type: 'comparison', left: { title: 'LangChain Chains', color: '#6366f1', items: [
              'Linear pipeline: A → B → C',
              'Each step runs once',
              'No loops or conditional branching',
              'Good for simple, sequential workflows',
              'Prompt → LLM → Parser → Output',
            ]}, right: { title: 'LangGraph', color: '#f59e0b', items: [
              'Graph: nodes + edges with conditions',
              'Can loop back (agent cycles)',
              'Conditional routing based on state',
              'Built for agents with iterative behavior',
              'State persists across steps',
            ]}},

            { type: 'heading', level: 3, text: 'LangGraph Agent Example', id: 'langgraph-example' },
            { type: 'code', language: 'python', title: 'langgraph_agent.py', code: `# LangGraph agent with tool use
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
import operator

# Define the state that flows through the graph
class AgentState(TypedDict):
    messages: Annotated[list, operator.add]  # append-only message list
    next_action: str

# Node: call the LLM
def call_model(state: AgentState) -> AgentState:
    """LLM decides what to do next."""
    response = llm.invoke(state["messages"])
    return {
        "messages": [response],
        "next_action": "tool" if response.tool_calls else "end"
    }

# Node: execute tools
def call_tools(state: AgentState) -> AgentState:
    """Execute the tool the LLM requested."""
    last_message = state["messages"][-1]
    results = []
    for tool_call in last_message.tool_calls:
        result = tool_executor.invoke(tool_call)
        results.append(result)
    return {"messages": results, "next_action": "continue"}

# Routing function: decide next step
def should_continue(state: AgentState) -> str:
    if state["next_action"] == "tool":
        return "tools"     # → call_tools node
    return END             # → finish

# Build the graph
graph = StateGraph(AgentState)

# Add nodes
graph.add_node("agent", call_model)
graph.add_node("tools", call_tools)

# Add edges
graph.set_entry_point("agent")
graph.add_conditional_edges("agent", should_continue, {
    "tools": "tools",
    END: END,
})
graph.add_edge("tools", "agent")  # after tools → back to agent (loop!)

# Compile and run
app = graph.compile()
result = app.invoke({
    "messages": [{"role": "user", "content": "Search for recent AI news"}],
    "next_action": ""
})` },

            { type: 'heading', level: 3, text: 'When to Use Each Framework', id: 'when-to-use' },
            { type: 'table', headers: ['Use Case', 'Best Tool', 'Why'], rows: [
              ['Simple prompt → response', 'LangChain Chain', 'Linear, no loops needed'],
              ['RAG (Q&A over documents)', 'LangChain + Vector DB', 'Well-supported retrieval pattern'],
              ['Agent with tool use', 'LangGraph', 'Needs loops (tool → observe → decide)'],
              ['Multi-agent orchestration', 'LangGraph', 'Complex state + conditional routing'],
              ['Production agent deployment', 'LangGraph + LangSmith', 'Monitoring, tracing, evaluation'],
            ]},

            { type: 'callout', variant: 'tip', html: '<strong>Starting recommendation:</strong> Use LangChain for RAG pipelines and simple chains. Use LangGraph when your application needs loops (agent cycles) or complex branching logic. Both integrate with LangSmith for observability and debugging.' },

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'langchain-takeaways' },
            { type: 'list', ordered: true, items: [
              'LangChain chains compose steps linearly: Prompt → LLM → Parser → Action',
              'RAG retrieves relevant documents from a vector DB to augment LLM context',
              'LangGraph adds graph-based state machines — loops, branches, persistent state',
              'Use LangChain for simple chains and RAG; LangGraph for agents with iterative behavior',
              'The RAG pattern: embed query → search vector DB → retrieve docs → augment prompt → generate',
            ]},
          ],
        },
      ],
    },
  ],
};

export default category;
