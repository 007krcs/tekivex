import type { TutorialCategory } from '../types';

const category: TutorialCategory = {
  id: 'ai-langchain',
  title: 'LangChain, LangGraph & Vector DBs',
  icon: 'link',
  color: '#10b981',
  description: 'Practical LangChain LCEL chains, LangGraph stateful agents, and Vector Database search patterns for RAG applications.',
  sections: [
    // â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”
    // SECTION 8 â€” LangChain Practical
    // â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”
    {
      title: 'LangChain Practical',
      topics: [
        {
          slug: 'langchain-intro',
          title: 'Introduction to LangChain',
          description: 'What LangChain is, its core abstractions, and when to use it vs. raw API calls.',
          keywords: ['langchain', 'chains', 'llm framework', 'orchestration'],
          difficulty: 'intermediate',
          estimatedMinutes: 12,
          content: [
            { type: 'heading', level: 2, text: 'What is LangChain?', id: 'what-is-langchain' },
            { type: 'paragraph', html: 'LangChain is a Python/JavaScript framework for building LLM-powered applications. It provides abstractions for chaining LLM calls, managing prompts, connecting to external tools, and building memory-enabled agents.' },
            { type: 'table', headers: ['Component', 'Purpose', 'Example'], rows: [
              ['Models', 'Unified interface for LLMs and chat models', 'ChatOpenAI, ChatAnthropic'],
              ['Prompts', 'Reusable, parameterized prompt templates', 'PromptTemplate, ChatPromptTemplate'],
              ['Chains', 'Compose multiple steps sequentially', 'LLMChain, SequentialChain'],
              ['Memory', 'Persist conversation history', 'ConversationBufferMemory'],
              ['Tools', 'Actions agents can take', 'DuckDuckGoSearch, PythonREPL'],
              ['Retrievers', 'Fetch relevant documents from vector stores', 'Chroma, FAISS, Pinecone'],
              ['Agents', 'LLM that decides which tools to call', 'ReAct, OpenAI Functions agent'],
            ]},
          ],
        },
        {
          slug: 'tokens-models-pricing',
          title: 'Tokens, Models & Pricing',
          description: 'Understand how LLM tokens work, count them, and optimize costs across OpenAI, Anthropic, and open-source models.',
          keywords: ['tokens', 'pricing', 'tiktoken', 'cost optimization'],
          difficulty: 'beginner',
          estimatedMinutes: 10,
          content: [
            { type: 'heading', level: 2, text: 'Understanding Tokens', id: 'tokens' },
            { type: 'paragraph', html: 'LLMs process <strong>tokens</strong> â€” roughly 4 characters or 0.75 words in English. The word "unbelievable" is one token; "ChatGPT is great!" is 6 tokens.' },
            { type: 'code', language: 'python', title: 'count_tokens.py', code: `import tiktoken

enc = tiktoken.encoding_for_model("gpt-4o")
texts = [
    "Hello, world!",
    "Machine learning is fascinating.",
    "The quick brown fox jumps over the lazy dog",
]
for text in texts:
    print(f"{len(enc.encode(text)):3} tokens | {text}")

def estimate_cost(texts: list[str], model: str = "gpt-4o") -> dict:
    enc = tiktoken.encoding_for_model(model)
    total = sum(len(enc.encode(t)) for t in texts)
    cost = (total / 1_000_000) * 5.0   # GPT-4o: $5/1M input tokens
    return {"total_tokens": total, "estimated_cost_usd": round(cost, 6)}

print(estimate_cost(["Summarize this document..."] * 1000))` },
            { type: 'table', headers: ['Model', 'Input (per 1M tokens)', 'Output (per 1M tokens)', 'Context'], rows: [
              ['gpt-4o', '$5.00', '$15.00', '128K'],
              ['gpt-4o-mini', '$0.15', '$0.60', '128K'],
              ['claude-3-5-sonnet', '$3.00', '$15.00', '200K'],
              ['claude-3-haiku', '$0.25', '$1.25', '200K'],
            ]},
          ],
        },
        {
          slug: 'langchain-environment',
          title: 'LangChain Environment Setup',
          description: 'Install LangChain, configure API keys securely, and run a first chain end-to-end.',
          keywords: ['langchain setup', 'environment', 'api keys', 'dotenv'],
          difficulty: 'beginner',
          estimatedMinutes: 8,
          content: [
            { type: 'heading', level: 2, text: 'Setting Up LangChain', id: 'langchain-setup' },
            { type: 'code', language: 'bash', title: 'install.sh', code: `pip install langchain langchain-openai langchain-anthropic langchain-community python-dotenv` },
            { type: 'code', language: 'python', title: 'first_chain.py', code: `from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful coding assistant."),
    ("human", "Explain {concept} in simple terms with a Python example."),
])

chain = prompt | llm | StrOutputParser()
print(chain.invoke({"concept": "decorators"}))` },
          ],
        },
        {
          slug: 'langchain-model-inputs',
          title: 'Model Inputs & Prompt Templates',
          description: 'Master PromptTemplate, ChatPromptTemplate, FewShotPromptTemplate, and dynamic prompt construction.',
          keywords: ['prompt template', 'few shot', 'chat prompt', 'system message'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          prerequisites: ['langchain-environment'],
          content: [
            { type: 'heading', level: 2, text: 'Prompt Templates in LangChain', id: 'prompt-templates' },
            { type: 'code', language: 'python', title: 'prompt_templates.py', code: `from langchain_core.prompts import (
    PromptTemplate, ChatPromptTemplate, FewShotPromptTemplate, MessagesPlaceholder,
)
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini")

# 1. Basic PromptTemplate
template = PromptTemplate(
    input_variables=["language", "task"],
    template="Write a {language} function that {task}. Include docstring and type hints.",
)
print(template.format(language="Python", task="reverses a string in place"))

# 2. ChatPromptTemplate
chat_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an expert {domain} teacher who explains things step by step."),
    ("human", "Explain {topic} to a {level} student."),
])
chain = chat_prompt | llm
response = chain.invoke({"domain": "mathematics", "topic": "eigenvalues", "level": "undergraduate"})
print(response.content)

# 3. Few-Shot Template
examples = [
    {"input": "happy", "output": "sad"},
    {"input": "tall",  "output": "short"},
]
example_prompt = PromptTemplate(input_variables=["input", "output"], template="Input: {input}\\nOutput: {output}")
few_shot = FewShotPromptTemplate(
    examples=examples, example_prompt=example_prompt,
    prefix="Give the antonym.", suffix="Input: {adjective}\\nOutput:", input_variables=["adjective"],
)
print(few_shot.format(adjective="bright"))` },
          ],
        },
        {
          slug: 'langchain-output-parsers',
          title: 'Output Parsers â€” Structured LLM Output',
          description: 'Force LLMs to return structured JSON, Pydantic models, or lists using LangChain output parsers.',
          keywords: ['output parser', 'json parser', 'pydantic', 'structured output'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          prerequisites: ['langchain-model-inputs'],
          content: [
            { type: 'heading', level: 2, text: 'Why Output Parsers?', id: 'why-output-parsers' },
            { type: 'paragraph', html: 'Output parsers coerce LLM text into structured Python objects â€” JSON dicts, Pydantic models, lists â€” making LLM outputs directly usable in code.' },
            { type: 'code', language: 'python', title: 'output_parsers.py', code: `from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import CommaSeparatedListOutputParser
from langchain.output_parsers import PydanticOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

# 1. CommaSeparatedListOutputParser
list_parser = CommaSeparatedListOutputParser()
chain = ChatPromptTemplate.from_messages([
    ("human", "List 5 {category}. {format_instructions}"),
]) | llm | list_parser
result = chain.invoke({"category": "Python web frameworks", "format_instructions": list_parser.get_format_instructions()})
print(result)  # ['Django', 'Flask', 'FastAPI', 'Tornado', 'Starlette']

# 2. Pydantic Output Parser
class MovieReview(BaseModel):
    title: str = Field(description="Movie title")
    rating: float = Field(description="Rating from 0 to 10")
    genre: str = Field(description="Primary genre")
    recommended: bool = Field(description="Whether to recommend it")

parser = PydanticOutputParser(pydantic_object=MovieReview)
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a movie critic. {format_instructions}"),
    ("human", "Review the movie: {movie}"),
]).partial(format_instructions=parser.get_format_instructions())

review: MovieReview = (prompt | llm | parser).invoke({"movie": "Inception (2010)"})
print(f"Rating: {review.rating}/10 | Recommended: {review.recommended}")` },
          ],
        },
        {
          slug: 'lcel',
          title: 'LCEL â€” LangChain Expression Language',
          description: 'Compose chains with the pipe operator, use RunnableParallel for concurrent steps, add fallbacks, and stream outputs.',
          keywords: ['lcel', 'runnable', 'pipe operator', 'parallel', 'streaming'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          prerequisites: ['langchain-output-parsers'],
          content: [
            { type: 'heading', level: 2, text: 'LangChain Expression Language (LCEL)', id: 'lcel-intro' },
            { type: 'paragraph', html: 'LCEL uses Python\'s <code>|</code> pipe operator to chain <em>Runnables</em> into pipelines with streaming, batching, parallelism, and fallbacks built in.' },
            { type: 'code', language: 'python', title: 'lcel_basics.py', code: `from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableParallel, RunnablePassthrough

llm = ChatOpenAI(model="gpt-4o-mini")

# 1. Basic chain
chain = (
    ChatPromptTemplate.from_messages([("human", "Summarize: {text}")])
    | llm | StrOutputParser()
)

# 2. Streaming
for chunk in chain.stream({"text": "Python is great for data science..."}):
    print(chunk, end="", flush=True)

# 3. Batch
results = chain.batch([{"text": "Text 1..."}, {"text": "Text 2..."}])

# 4. Parallel â€” run multiple chains concurrently
summary_chain  = ChatPromptTemplate.from_messages([("human", "Summarize in 1 sentence: {text}")]) | llm | StrOutputParser()
keywords_chain = ChatPromptTemplate.from_messages([("human", "Extract 5 keywords: {text}")]) | llm | StrOutputParser()

parallel = RunnableParallel({"summary": summary_chain, "keywords": keywords_chain, "original": RunnablePassthrough()})
result = parallel.invoke({"text": "Machine learning is a subset of AI..."})
print(result["summary"])
print(result["keywords"])` },
          ],
        },
        {
          slug: 'langchain-rag',
          title: 'RAG â€” Retrieval-Augmented Generation',
          description: 'Build a complete RAG pipeline: load documents, chunk, embed to a vector store, retrieve context, and generate grounded answers.',
          keywords: ['rag', 'retrieval augmented generation', 'vector store', 'faiss', 'chroma'],
          difficulty: 'advanced',
          estimatedMinutes: 25,
          prerequisites: ['lcel'],
          content: [
            { type: 'heading', level: 2, text: 'What is RAG?', id: 'what-is-rag' },
            { type: 'paragraph', html: '<strong>RAG</strong> dynamically retrieves relevant documents from a knowledge base and injects them into the prompt, preventing hallucination and enabling up-to-date answers.' },
            { type: 'flow', steps: [
              { label: 'Load Docs', desc: 'PDF, web, DB, code', color: '#6366f1' },
              { label: 'Chunk', desc: 'Split into overlapping passages', color: '#8b5cf6' },
              { label: 'Embed', desc: 'Convert to dense vectors', color: '#a855f7' },
              { label: 'Vector Store', desc: 'Index vectors (FAISS/Chroma)', color: '#f59e0b' },
              { label: 'Retrieve', desc: 'Find top-k similar chunks', color: '#ef4444' },
              { label: 'Generate', desc: 'LLM answers with context', color: '#22c55e' },
            ]},
            { type: 'code', language: 'python', title: 'rag_pipeline.py', code: `from langchain_community.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

# 1. Load
loader = WebBaseLoader("https://en.wikipedia.org/wiki/Transformer_(deep_learning_architecture)")
docs = loader.load()

# 2. Chunk
splits = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200).split_documents(docs)
print(f"Split into {len(splits)} chunks")

# 3. Embed & store
vectorstore = Chroma.from_documents(splits, OpenAIEmbeddings(model="text-embedding-3-small"))
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

# 4. RAG prompt
rag_prompt = ChatPromptTemplate.from_messages([
    ("system", "Answer using ONLY this context. Say 'I don't know' if unsure.\\n\\nContext:\\n{context}"),
    ("human", "{question}"),
])

# 5. RAG chain
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
rag_chain = (
    {"context": retriever | (lambda docs: "\\n\\n".join(d.page_content for d in docs)),
     "question": RunnablePassthrough()}
    | rag_prompt | llm | StrOutputParser()
)

print(rag_chain.invoke("What is the attention mechanism in transformers?"))` },
            { type: 'callout', variant: 'tip', html: '<strong>Chunking strategy matters:</strong> Use <code>chunk_size=1000</code> with <code>chunk_overlap=200</code> as a starting point. For code: chunk by function. For legal docs: chunk by section.' },
          ],
        },
      ],
    },

    // â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”
    // SECTION 9 â€” LangGraph Agents
    // â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”
    {
      title: 'LangGraph Agents',
      topics: [
        {
          slug: 'langgraph-intro',
          title: 'Introduction to LangGraph',
          description: 'What LangGraph adds over LangChain â€” stateful graphs, cycles, conditional edges, and why agent workflows need graph-based orchestration.',
          keywords: ['langgraph', 'agent graph', 'stateful', 'cycles'],
          difficulty: 'advanced',
          estimatedMinutes: 14,
          content: [
            { type: 'heading', level: 2, text: 'Why LangGraph?', id: 'why-langgraph' },
            { type: 'paragraph', html: 'LangChain chains are linear â€” A â†’ B â†’ C. Real agents need <em>loops</em>: call a tool, observe the result, decide to call another tool. LangGraph models this as a directed graph with nodes, edges, conditional routing, and cycles.' },
            { type: 'comparison', left: { title: 'LangChain Chains', color: '#6366f1', items: [
              'Linear: A â†’ B â†’ C â†’ Output',
              'No loops or branching',
              'Stateless between calls',
              'Good for: RAG, simple chatbots',
            ]}, right: { title: 'LangGraph', color: '#f59e0b', items: [
              'Graph: nodes + conditional edges',
              'Supports cycles and loops',
              'Persistent state across steps',
              'Good for: multi-step agents, ReAct',
            ]}},
            { type: 'flow', steps: [
              { label: 'START', desc: 'Initial state', color: '#6366f1' },
              { label: 'Agent', desc: 'LLM decides next action', color: '#8b5cf6' },
              { label: 'Tools', desc: 'Execute tool call', color: '#f59e0b' },
              { label: 'Observe', desc: 'Process tool result', color: '#ef4444' },
              { label: 'END', desc: 'Task complete', color: '#22c55e' },
            ]},
          ],
        },
        {
          slug: 'langgraph-setup',
          title: 'LangGraph Environment & Setup',
          description: 'Install LangGraph, understand StateGraph, TypedDict state schemas, and the compilation step.',
          keywords: ['langgraph setup', 'stategraph', 'typeddict', 'checkpointer'],
          difficulty: 'intermediate',
          estimatedMinutes: 10,
          prerequisites: ['langgraph-intro'],
          content: [
            { type: 'heading', level: 2, text: 'Installing LangGraph', id: 'langgraph-install' },
            { type: 'code', language: 'bash', title: 'install.sh', code: `pip install langgraph langsmith langchain-openai langgraph-checkpoint-sqlite` },
            { type: 'code', language: 'python', title: 'first_graph.py', code: `from typing import TypedDict, Annotated
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
print(result["messages"][-1].content)` },
          ],
        },
        {
          slug: 'langgraph-components',
          title: 'Graph Components & Agent Implementation',
          description: 'Build a full ReAct agent with tools â€” tool nodes, conditional routing, tool binding, and error handling.',
          keywords: ['react agent', 'tool node', 'tool binding', 'conditional routing'],
          difficulty: 'advanced',
          estimatedMinutes: 22,
          prerequisites: ['langgraph-setup'],
          content: [
            { type: 'heading', level: 2, text: 'Building a ReAct Agent with Tools', id: 'react-agent' },
            { type: 'code', language: 'python', title: 'react_agent.py', code: `from typing import TypedDict, Annotated
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
    print(f"[{msg.__class__.__name__}]: {msg.content}")` },
          ],
        },
        {
          slug: 'langgraph-message-management',
          title: 'Message Management in LangGraph',
          description: 'Handle conversation history with message trimming and summarization to prevent context window overflow.',
          keywords: ['message management', 'trim messages', 'summarization', 'context window'],
          difficulty: 'advanced',
          estimatedMinutes: 16,
          prerequisites: ['langgraph-components'],
          content: [
            { type: 'heading', level: 2, text: 'Managing Message History', id: 'message-mgmt' },
            { type: 'paragraph', html: 'As conversations grow, history fills the context window and costs increase. LangGraph gives full control over state to implement trimming, summarization, or custom memory strategies.' },
            { type: 'code', language: 'python', title: 'message_management.py', code: `from typing import TypedDict, Annotated
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
graph = builder.compile()` },
          ],
        },
        {
          slug: 'langgraph-persistence',
          title: 'Thread-Level Persistence in LangGraph',
          description: 'Use LangGraph checkpointers to persist conversation state across sessions with SQLite, Redis, or PostgreSQL.',
          keywords: ['langgraph persistence', 'checkpointer', 'thread id', 'sqlite'],
          difficulty: 'advanced',
          estimatedMinutes: 18,
          prerequisites: ['langgraph-message-management'],
          content: [
            { type: 'heading', level: 2, text: 'Thread-Level State Persistence', id: 'thread-persistence' },
            { type: 'paragraph', html: 'LangGraph\'s checkpointer saves the full graph state after each step. The same <code>thread_id</code> in a future call resumes from where it left off â€” enabling multi-session conversations and human-in-the-loop workflows.' },
            { type: 'code', language: 'python', title: 'persistence.py', code: `from langgraph.graph import StateGraph, END
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

# Resume â€” state auto-loaded from DB
result = graph.invoke(
    {"messages": [HumanMessage("What is my name and what do I like?")]},
    config=config_alice,
)
print(result["messages"][-1].content)
# "Your name is Alice and you love Python programming."` },
            { type: 'callout', variant: 'tip', html: '<strong>Production:</strong> Use <code>langgraph-checkpoint-postgres</code> for PostgreSQL in production. Drop-in replacement for SqliteSaver with the same API.' },
          ],
        },
      ],
    },

    // â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”
    // SECTION 10 â€” Vector Databases
    // â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”
    {
      title: 'Vector Databases',
      topics: [
        {
          slug: 'intro-vector-databases',
          title: 'Introduction to Vector Databases',
          description: 'Why traditional databases fail for semantic search and how vector databases store and query embeddings at scale.',
          keywords: ['vector database', 'embeddings', 'semantic search', 'ann'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          content: [
            { type: 'heading', level: 2, text: 'Why Vector Databases?', id: 'why-vector-db' },
            { type: 'comparison', left: { title: 'Traditional DB (SQL)', color: '#6366f1', items: [
              'Exact and range queries',
              'Rows and columns (structured)',
              'Cannot understand meaning',
              'Example: "WHERE tag = \'AI\'"',
            ]}, right: { title: 'Vector Database', color: '#f59e0b', items: [
              'Similarity search (nearest neighbor)',
              'Dense vectors (384â€“1536 dims)',
              'Captures meaning via embeddings',
              'Example: "Find text similar to query"',
            ]}},
            { type: 'table', headers: ['Database', 'Type', 'Best For', 'Scale'], rows: [
              ['Pinecone', 'Managed cloud', 'Production, RAG, no ops burden', 'Billions of vectors'],
              ['Chroma', 'Open-source local', 'Prototyping, local dev', 'Millions of vectors'],
              ['FAISS (Meta)', 'Library (not a DB)', 'GPU-accelerated research', 'Billions on GPU'],
              ['Weaviate', 'Open-source', 'Hybrid search, multi-modal', 'Billions'],
              ['pgvector', 'PostgreSQL extension', 'Existing Postgres users', 'Millions'],
            ]},
          ],
        },
        {
          slug: 'vector-space',
          title: 'Vector Space & High-Dimensional Data',
          description: 'Cosine similarity, dot product, Euclidean distance, and approximate nearest neighbor algorithms (HNSW, IVF).',
          keywords: ['cosine similarity', 'dot product', 'euclidean distance', 'ann', 'hnsw'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          prerequisites: ['intro-vector-databases'],
          content: [
            { type: 'heading', level: 2, text: 'Similarity Metrics', id: 'similarity-metrics' },
            { type: 'table', headers: ['Metric', 'Formula', 'Best For', 'Range'], rows: [
              ['Cosine Similarity', 'cos(Î¸) = AÂ·B / (|A||B|)', 'Text embeddings (direction matters)', '-1 to 1'],
              ['Dot Product', 'AÂ·B = Î£(aáµ¢ Ã— báµ¢)', 'Normalized vectors', 'Unbounded'],
              ['Euclidean (L2)', 'âˆšÎ£(aáµ¢ - báµ¢)Â²', 'Images, spatial data', '0 to âˆž'],
            ]},
            { type: 'code', language: 'python', title: 'similarity.py', code: `import numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')  # 384-dim embeddings

documents = [
    "Machine learning is a type of artificial intelligence",
    "Deep learning uses neural networks with many layers",
    "The Eiffel Tower is located in Paris, France",
    "Neural networks are inspired by the human brain",
]

embeddings = model.encode(documents, normalize_embeddings=True)

query = "What is deep learning?"
query_emb = model.encode([query], normalize_embeddings=True)[0]

scores = [(doc, np.dot(query_emb, emb)) for doc, emb in zip(documents, embeddings)]
scores.sort(key=lambda x: x[1], reverse=True)

for doc, score in scores:
    print(f"  {score:.4f} | {doc}")` },
            { type: 'table', headers: ['Algorithm', 'Index Type', 'Speed', 'Notes'], rows: [
              ['HNSW', 'Hierarchical graph', 'Very fast', 'Best recall/speed tradeoff; used by Pinecone'],
              ['IVF-Flat', 'Inverted file', 'Fast', 'Partitions space into Voronoi cells'],
              ['IVF-PQ', 'IVF + Product Quantization', 'Fastest', 'Compresses vectors 4â€“32Ã—'],
            ]},
          ],
        },
        {
          slug: 'pinecone-intro',
          title: 'Pinecone Introduction',
          description: 'Set up Pinecone, create indexes, upsert vectors with metadata, and perform filtered similarity search.',
          keywords: ['pinecone', 'index', 'upsert', 'metadata filtering'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          prerequisites: ['vector-space'],
          content: [
            { type: 'heading', level: 2, text: 'Getting Started with Pinecone', id: 'pinecone-start' },
            { type: 'code', language: 'python', title: 'pinecone_setup.py', code: `from pinecone import Pinecone, ServerlessSpec
from sentence_transformers import SentenceTransformer
import os

pc = Pinecone(api_key=os.environ["PINECONE_API_KEY"])
index_name = "knowledge-base"

if index_name not in pc.list_indexes().names():
    pc.create_index(
        name=index_name, dimension=384, metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1"),
    )

index = pc.Index(index_name)
model = SentenceTransformer("all-MiniLM-L6-v2")

documents = [
    {"id": "doc-1", "text": "Python is great for machine learning", "category": "programming"},
    {"id": "doc-2", "text": "Neural networks power modern AI", "category": "ai"},
    {"id": "doc-3", "text": "React is a JavaScript UI framework", "category": "web"},
    {"id": "doc-4", "text": "Transformers revolutionized NLP", "category": "ai"},
]

vectors = [{
    "id": doc["id"],
    "values": model.encode(doc["text"]).tolist(),
    "metadata": {"text": doc["text"], "category": doc["category"]},
} for doc in documents]

index.upsert(vectors=vectors)

# Query with metadata filter
query_emb = model.encode("How do I use deep learning?").tolist()
results = index.query(
    vector=query_emb, top_k=3, include_metadata=True,
    filter={"category": {"$eq": "ai"}},
)
for match in results["matches"]:
    print(f"Score: {match['score']:.4f} | {match['metadata']['text']}")` },
          ],
        },
        {
          slug: 'semantic-search-pinecone',
          title: 'Semantic Search with Pinecone',
          description: 'Build a production-grade semantic search engine with hybrid search (dense + BM25) and cross-encoder reranking.',
          keywords: ['semantic search', 'hybrid search', 'reranking', 'bm25', 'cross encoder'],
          difficulty: 'advanced',
          estimatedMinutes: 22,
          prerequisites: ['pinecone-intro'],
          content: [
            { type: 'heading', level: 2, text: 'Hybrid Search + Reranking', id: 'hybrid-rerank' },
            { type: 'flow', steps: [
              { label: 'Query', desc: 'User search query', color: '#6366f1' },
              { label: 'Embed + BM25', desc: 'Dense + sparse vectors', color: '#8b5cf6' },
              { label: 'Pinecone', desc: 'Hybrid ANN search, top-100', color: '#f59e0b' },
              { label: 'Reranker', desc: 'Cross-encoder rescoring, top-5', color: '#ef4444' },
              { label: 'Results', desc: 'Ranked, relevant answers', color: '#22c55e' },
            ]},
            { type: 'code', language: 'python', title: 'semantic_search.py', code: `from pinecone import Pinecone
from pinecone_text.sparse import BM25Encoder
from sentence_transformers import SentenceTransformer, CrossEncoder
import os

pc = Pinecone(api_key=os.environ["PINECONE_API_KEY"])
dense_model = SentenceTransformer("all-MiniLM-L6-v2")
reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")
index = pc.Index("hybrid-search")

corpus = [
    "Python decorators add behavior to functions without modifying source",
    "NumPy arrays support vectorized mathematical operations efficiently",
    "LangChain chains LLM calls with prompt templates and parsers",
]

bm25 = BM25Encoder()
bm25.fit(corpus)

def hybrid_search(query: str, alpha: float = 0.5) -> list[dict]:
    dense_q  = dense_model.encode(query, normalize_embeddings=True).tolist()
    sparse_q = bm25.encode_queries(query)
    results = index.query(
        vector=[v * alpha for v in dense_q],
        sparse_vector={"indices": sparse_q["indices"], "values": [v * (1-alpha) for v in sparse_q["values"]]},
        top_k=10, include_metadata=True,
    )
    return results["matches"]

def rerank(query: str, candidates: list[dict], top_k: int = 3) -> list[dict]:
    pairs = [(query, c["metadata"]["text"]) for c in candidates]
    scores = reranker.predict(pairs)
    return [c for c, _ in sorted(zip(candidates, scores), key=lambda x: x[1], reverse=True)[:top_k]]

query = "How do Python decorators work?"
results = rerank(query, hybrid_search(query))
for r in results:
    print(f"â†’ {r['metadata']['text']}")` },
          ],
        },
      ],
    },
  ],
};

export default category;
