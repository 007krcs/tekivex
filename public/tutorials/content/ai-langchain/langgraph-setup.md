## Installing LangGraph

<!-- title: install.sh -->
```bash
pip install langgraph langsmith langchain-openai langgraph-checkpoint-sqlite
```

<!-- title: first_graph.py -->
```python
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
import operator

class AgentState(TypedDict):
    messages: Annotated[list, operator.add]
    steps: int

llm = ChatOpenAI(model="gpt-4o-mini")

def call_model(state: AgentState) -> AgentState:
    response = llm.invoke(state["messages"])
    return {"messages": [response], "steps": state["steps"] + 1}

def should_continue(state: AgentState) -> str:
    if state["steps"] >= 3:
        return "end"
    if "goodbye" in state["messages"][-1].content.lower():
        return "end"
    return "continue"

builder = StateGraph(AgentState)
builder.add_node("agent", call_model)
builder.set_entry_point("agent")
builder.add_conditional_edges("agent", should_continue, {"continue": "agent", "end": END})
graph = builder.compile()

result = graph.invoke({"messages": [HumanMessage(content="Hello! What is 2+2?")], "steps": 0})
print(result["messages"][-1].content)
```
