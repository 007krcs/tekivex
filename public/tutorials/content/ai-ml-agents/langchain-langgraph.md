## Building AI Applications with LangChain

<strong>LangChain</strong> is a framework for building applications powered by LLMs. Its core concept is the <strong>chain</strong> — a sequence of steps where each step's output feeds into the next. Think of it as a pipeline: Prompt → LLM → Parser → Action.

### The Chain Concept

<div class="flow-steps">

**Prompt Template** — Fill in variables to create a prompt

**LLM** — Send prompt to language model

**Output Parser** — Extract structured data from response

**Action** — Use parsed output (API call, DB write, etc.)

</div>

```python title="langchain_chain.py"
# Simple LangChain chain example
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
    "Review this code for bugs and improvements:\n{code}"
) | llm | StrOutputParser()

# Compose: generate → review
full_chain = generate | (lambda code: {"code": code}) | review
result = full_chain.invoke({"task": "sorts a list using quicksort"})
```

### RAG — Retrieval Augmented Generation

<strong>RAG</strong> lets LLMs answer questions using your private data. Instead of relying solely on training knowledge, the model retrieves relevant documents from a <strong>vector database</strong> and uses them as context to generate accurate, grounded answers.

<div class="flow-steps">

**User Query** — "How do I configure the API?"

**Embed Query** — Convert question to vector

**Vector Search** — Find similar docs in vector DB

**Retrieve Docs** — Top-k most relevant documents

**Augment Prompt** — Insert docs into LLM context

**Generate** — LLM answers using retrieved context

</div>

```python title="rag_pipeline.py"
# RAG pipeline with LangChain
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
    return "\n".join(doc.page_content for doc in docs)

rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | rag_prompt
    | ChatAnthropic(model="claude-sonnet-4-20250514")
    | StrOutputParser()
)

# Step 4: Query
answer = rag_chain.invoke("How do I authenticate with the API?")
print(answer)  # Uses retrieved docs about Bearer tokens
```

### LangGraph — State Machines for Agents

<strong>LangGraph</strong> extends LangChain with <strong>graph-based state machines</strong>. While LangChain chains are linear (A → B → C), LangGraph allows loops, conditional branching, and persistent state — essential for building agents that iterate until a task is complete.

<div class="comparison-card">
<div class="comparison-side">

**LangChain Chains**

- Linear pipeline: A → B → C
- Each step runs once
- No loops or conditional branching
- Good for simple, sequential workflows
- Prompt → LLM → Parser → Output

</div>
<div class="comparison-side">

**LangGraph**

- Graph: nodes + edges with conditions
- Can loop back (agent cycles)
- Conditional routing based on state
- Built for agents with iterative behavior
- State persists across steps

</div>
</div>

### LangGraph Agent Example

```python title="langgraph_agent.py"
# LangGraph agent with tool use
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
})
```

### When to Use Each Framework

| Use Case | Best Tool | Why |
| --- | --- | --- |
| Simple prompt → response | LangChain Chain | Linear, no loops needed |
| RAG (Q&A over documents) | LangChain + Vector DB | Well-supported retrieval pattern |
| Agent with tool use | LangGraph | Needs loops (tool → observe → decide) |
| Multi-agent orchestration | LangGraph | Complex state + conditional routing |
| Production agent deployment | LangGraph + LangSmith | Monitoring, tracing, evaluation |

<div class="callout callout-tip">

<strong>Starting recommendation:</strong> Use LangChain for RAG pipelines and simple chains. Use LangGraph when your application needs loops (agent cycles) or complex branching logic. Both integrate with LangSmith for observability and debugging.

</div>

### Key Takeaways

1. LangChain chains compose steps linearly: Prompt → LLM → Parser → Action
2. RAG retrieves relevant documents from a vector DB to augment LLM context
3. LangGraph adds graph-based state machines — loops, branches, persistent state
4. Use LangChain for simple chains and RAG; LangGraph for agents with iterative behavior
5. The RAG pattern: embed query → search vector DB → retrieve docs → augment prompt → generate

