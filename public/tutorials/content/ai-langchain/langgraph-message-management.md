## Managing Message History

As conversations grow, history fills the context window and costs increase. LangGraph gives full control over state to implement trimming, summarization, or custom memory strategies.

<!-- title: message_management.py -->
```python
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from langchain_core.messages import BaseMessage, SystemMessage, trim_messages
import operator

llm = ChatOpenAI(model="gpt-4o-mini")

class ConversationState(TypedDict):
    messages: Annotated[list[BaseMessage], operator.add]
    summary: str

def summarize_if_long(state: ConversationState) -> ConversationState:
    if len(state["messages"]) < 10:
        return state
    summary_prompt = [
        SystemMessage(content="Summarize this conversation concisely."),
        *state["messages"][:-4],
    ]
    summary = llm.invoke(summary_prompt).content
    return {
        "messages": [SystemMessage(content=f"Prior summary: {summary}"), *state["messages"][-4:]],
        "summary": summary,
    }

def chat_node(state: ConversationState) -> ConversationState:
    trimmed = trim_messages(state["messages"], strategy="last", max_tokens=2000, token_counter=llm)
    return {"messages": [llm.invoke(trimmed)], "summary": state.get("summary", "")}

builder = StateGraph(ConversationState)
builder.add_node("summarize", summarize_if_long)
builder.add_node("chat", chat_node)
builder.set_entry_point("summarize")
builder.add_edge("summarize", "chat")
builder.add_edge("chat", END)
graph = builder.compile()
```
