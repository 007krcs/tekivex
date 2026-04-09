## Building a ReAct Agent with Tools

<!-- title: react_agent.py -->
```python
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from langchain_openai import ChatOpenAI
from langchain_core.messages import BaseMessage, HumanMessage
from langchain_core.tools import tool
import operator, math

@tool
def calculator(expression: str) -> str:
    """Evaluate a mathematical expression like '2 * (3 + 4)'."""
    try:
        result = eval(expression, {"__builtins__": {}}, {"math": math, "sqrt": math.sqrt})
        return f"Result: {result}"
    except Exception as e:
        return f"Error: {str(e)}"

@tool
def reverse_string(text: str) -> str:
    """Reverse a string."""
    return f"Reversed: {text[::-1]}"

tools = [calculator, reverse_string]

class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], operator.add]

llm_with_tools = ChatOpenAI(model="gpt-4o-mini", temperature=0).bind_tools(tools)

def agent_node(state: AgentState) -> AgentState:
    return {"messages": [llm_with_tools.invoke(state["messages"])]}

def should_use_tools(state: AgentState) -> str:
    last = state["messages"][-1]
    return "tools" if hasattr(last, "tool_calls") and last.tool_calls else "end"

builder = StateGraph(AgentState)
builder.add_node("agent", agent_node)
builder.add_node("tools", ToolNode(tools))
builder.set_entry_point("agent")
builder.add_conditional_edges("agent", should_use_tools, {"tools": "tools", "end": END})
builder.add_edge("tools", "agent")
graph = builder.compile()

result = graph.invoke({
    "messages": [HumanMessage(content="What is sqrt(144) + 50? Also reverse the word 'Python'.")]
})
for msg in result["messages"]:
    print(f"[{msg.__class__.__name__}]: {msg.content}")
```
