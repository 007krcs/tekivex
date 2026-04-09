## Why LangGraph?

LangChain chains are linear — A → B → C. Real agents need *loops*: call a tool, observe the result, decide to call another tool. LangGraph models this as a directed graph with nodes, edges, conditional routing, and cycles.

| LangChain Chains | LangGraph |
| --- | --- |
| Linear: A → B → C → Output | Graph: nodes + conditional edges |
| No loops or branching | Supports cycles and loops |
| Stateless between calls | Persistent state across steps |
| Good for: RAG, simple chatbots | Good for: multi-step agents, ReAct |

**Flow:**

1. **START** — Initial state
2. **Agent** — LLM decides next action
3. **Tools** — Execute tool call
4. **Observe** — Process tool result
5. **END** — Task complete

