## What is LangChain?

LangChain is a Python/JavaScript framework for building LLM-powered applications. It provides abstractions for chaining LLM calls, managing prompts, connecting to external tools, and building memory-enabled agents.

| Component | Purpose | Example |
| --- | --- | --- |
| Models | Unified interface for LLMs and chat models | ChatOpenAI, ChatAnthropic |
| Prompts | Reusable, parameterized prompt templates | PromptTemplate, ChatPromptTemplate |
| Chains | Compose multiple steps sequentially | LLMChain, SequentialChain |
| Memory | Persist conversation history | ConversationBufferMemory |
| Tools | Actions agents can take | DuckDuckGoSearch, PythonREPL |
| Retrievers | Fetch relevant documents from vector stores | Chroma, FAISS, Pinecone |
| Agents | LLM that decides which tools to call | ReAct, OpenAI Functions agent |
