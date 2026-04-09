## Thread-Level State Persistence

LangGraph's checkpointer saves the full graph state after each step. The same `thread_id` in a future call resumes from where it left off — enabling multi-session conversations and human-in-the-loop workflows.

<!-- title: persistence.py -->
```python
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.sqlite import SqliteSaver
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, BaseMessage
from typing import TypedDict, Annotated
import operator

llm = ChatOpenAI(model="gpt-4o-mini")

class ChatState(TypedDict):
    messages: Annotated[list[BaseMessage], operator.add]

def chat(state: ChatState) -> ChatState:
    return {"messages": [llm.invoke(state["messages"])]}

builder = StateGraph(ChatState)
builder.add_node("chat", chat)
builder.set_entry_point("chat")
builder.add_edge("chat", END)

checkpointer = SqliteSaver.from_conn_string("conversations.db")
graph = builder.compile(checkpointer=checkpointer)

config_alice = {"configurable": {"thread_id": "alice-001"}}
graph.invoke({"messages": [HumanMessage("Hi! My name is Alice.")]}, config=config_alice)
graph.invoke({"messages": [HumanMessage("I love Python programming.")]}, config=config_alice)

# Resume — state auto-loaded from DB
result = graph.invoke(
    {"messages": [HumanMessage("What is my name and what do I like?")]},
    config=config_alice,
)
print(result["messages"][-1].content)
# "Your name is Alice and you love Python programming."
```

> **TIP:** **Production:** Use `langgraph-checkpoint-postgres` for PostgreSQL in production. Drop-in replacement for SqliteSaver with the same API.
