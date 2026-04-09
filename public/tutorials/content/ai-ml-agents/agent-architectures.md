## From Single to Multi-Agent Systems

A single agent works well for simple tasks, but complex problems benefit from <strong>multiple specialized agents</strong> working together — just like how a company has different departments (engineering, design, marketing) rather than one person doing everything.

### Architecture Patterns

| Pattern | Description | Best For |
| --- | --- | --- |
| <strong>Single Agent</strong> | One LLM with tools, handles everything | Simple, well-defined tasks |
| <strong>Multi-Agent (Flat)</strong> | Multiple peers collaborate as equals | Brainstorming, debate, diverse perspectives |
| <strong>Hierarchical</strong> | Manager delegates to specialized workers | Complex projects with distinct sub-tasks |
| <strong>Pipeline</strong> | Agents in sequence, each refining output | Content creation, code review pipelines |

### The Orchestrator/Worker Pattern

The most common multi-agent architecture. An <strong>orchestrator</strong> agent receives the user's request, breaks it into sub-tasks, delegates to <strong>worker agents</strong>, and aggregates their results.

<div class="flow-steps">

**User Request** — "Build me a landing page"

**Orchestrator** — Plans tasks, assigns to workers

**Design Agent** — Creates layout and color scheme

**Code Agent** — Writes HTML/CSS/JS

**Copy Agent** — Writes compelling text content

**Orchestrator** — Combines results, ensures quality

**Final Response** — Complete landing page delivered

</div>

```typescript title="orchestrator.ts"
// Orchestrator/Worker agent pattern
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
      if (!worker) throw new Error(`No worker: ${step.agent}`);

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
    return results.map(r => r.output).join('\n\n');
  }
}
```

### Agent Memory Systems

Agents need memory to be effective. There are three types:

| Memory Type | Duration | Implementation | Use Case |
| --- | --- | --- | --- |
| <strong>Short-Term</strong> | Current conversation | Context window / chat history | Tracking current task state |
| <strong>Working Memory</strong> | Current session | Scratchpad / variables | Intermediate results, plans |
| <strong>Long-Term</strong> | Across sessions | Vector database / knowledge base | User preferences, learned facts |

### Vector Database for Long-Term Memory

Long-term memory typically uses a <strong>vector database</strong>. Text is converted to embeddings (dense vectors), stored, and retrieved by semantic similarity — so the agent can recall relevant information even if the exact wording differs.

<div class="flow-steps">

**New Information** — Agent learns something worth remembering

**Embed** — Convert text to vector embedding

**Store** — Save in vector database with metadata

**Later: Query** — Search for relevant memories by similarity

**Recall** — Retrieved memories added to agent context

</div>

### Architecture Decision Guide

<div class="comparison-card">
<div class="comparison-side">

**Use Single Agent**

- Task is well-defined and bounded
- Can be done with 3-5 tool calls
- Low latency requirement
- Simple workflow, no sub-tasks

</div>
<div class="comparison-side">

**Use Multi-Agent**

- Task requires diverse expertise
- Multiple independent sub-tasks
- Quality benefits from specialization
- Complex workflows with dependencies

</div>
</div>

<div class="callout callout-caution">

Multi-agent systems add complexity. Each agent call has latency and cost. Start with a single agent and only add more when you've identified clear sub-tasks that benefit from specialization.

</div>

### Key Takeaways

1. Single agent for simple tasks; multi-agent for complex ones requiring diverse expertise
2. The orchestrator/worker pattern delegates sub-tasks to specialized agents
3. Agent memory: short-term (context), working (scratchpad), long-term (vector DB)
4. Vector databases enable semantic memory retrieval across sessions
5. Start simple — add agents only when complexity demands it

