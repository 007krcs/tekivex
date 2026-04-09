## From Chatbots to Agents

A regular chatbot generates text responses. An <strong>AI Agent</strong> goes further — it can <em>observe</em> its environment, <em>reason</em> about what to do, <em>take actions</em> (call tools, write code, browse the web), and <em>learn from the results</em>. It's an LLM with hands and eyes.

<div class="callout callout-tip">

<strong>Analogy:</strong> Think of an AI agent like a smart assistant with a toolbox. You say "book me a flight to Tokyo." The assistant thinks about what's needed (reasoning), checks flight APIs (tool use), compares options (observation), and books the best one (action). A chatbot would just tell you how to book a flight.

</div>

### The Agent Loop

Every agent follows a perception-reasoning-action cycle:

<div class="flow-steps">

**Observe** — Perceive environment, read inputs

**Think** — Reason about what to do next

**Act** — Execute an action or call a tool

**Observe Result** — See the outcome of the action

</div>

This loop repeats until the agent has accomplished the goal or decides it cannot proceed.

### The ReAct Pattern

<strong>ReAct</strong> (Reasoning + Acting) is the dominant pattern for LLM agents. The model alternates between <em>thinking</em> (chain-of-thought reasoning) and <em>acting</em> (calling tools), using observations from tool results to inform the next step.

```python title="react_loop.py"
# Simplified ReAct agent loop
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
}
```

### Tool Use Flow

When an agent needs to take action in the world, it uses <strong>tools</strong> — functions it can call to interact with external systems:

<div class="flow-steps">

**User Request** — "What's the weather in Tokyo?"

**Agent Thinks** — "I need to check a weather API"

**Tool Call** — get_weather(city="Tokyo")

**Tool Response** — {"temp": 22, "condition": "sunny"}

**Agent Thinks** — "Now I can answer the user"

**Final Answer** — "It's 22°C and sunny in Tokyo"

</div>

### Agent vs Chatbot

<div class="comparison-card">
<div class="comparison-side">

**Chatbot (LLM)**

- Generates text responses only
- No access to external systems
- Single turn — no persistent state
- Knowledge limited to training data
- Cannot take real-world actions

</div>
<div class="comparison-side">

**AI Agent**

- Reasons, plans, and takes actions
- Uses tools (APIs, code, files, web)
- Multi-step — maintains context across steps
- Can access live data via tools
- Executes real-world tasks autonomously

</div>
</div>

### Real-World Agent Examples

- <strong>Claude Code:</strong> Reads files, writes code, runs tests, makes git commits
- <strong>Devin:</strong> Autonomous software engineer — plans, codes, debugs, deploys
- <strong>AutoGPT:</strong> General-purpose agent that breaks goals into sub-tasks
- <strong>Customer Support Agents:</strong> Look up orders, process refunds, escalate issues
- <strong>Research Agents:</strong> Search papers, summarize findings, generate reports

<div class="callout callout-caution">

Agents are powerful but need guardrails. An agent with unrestricted tool access could make irreversible mistakes. Always implement <strong>human-in-the-loop</strong> confirmation for high-stakes actions (sending emails, making purchases, deleting data).

</div>

### Key Takeaways

1. An AI agent is an LLM that can observe, reason, and take actions — not just generate text
2. The ReAct pattern alternates between reasoning (thoughts) and acting (tool calls)
3. Tools give agents hands — search, code execution, file operations, API calls
4. The agent loop repeats until the goal is achieved or max steps are reached
5. Always add guardrails for high-stakes agent actions

