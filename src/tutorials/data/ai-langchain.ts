import type { TutorialCategory } from '../types';

const category: TutorialCategory = {
  id: 'ai-langchain',
  title: 'LangChain, LangGraph & Vector DBs',
  icon: 'link',
  color: '#10b981',
  description: 'Practical LangChain LCEL chains, LangGraph stateful agents, and Vector Database search patterns for RAG applications.',
  sections: [
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 8 — LangChain Practical
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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
          contentFile: 'ai-langchain/langchain-intro.md',
        },
        {
          slug: 'tokens-models-pricing',
          title: 'Tokens, Models & Pricing',
          description: 'Understand how LLM tokens work, count them, and optimize costs across OpenAI, Anthropic, and open-source models.',
          keywords: ['tokens', 'pricing', 'tiktoken', 'cost optimization'],
          difficulty: 'beginner',
          estimatedMinutes: 10,
          contentFile: 'ai-langchain/tokens-models-pricing.md',
        },
        {
          slug: 'langchain-environment',
          title: 'LangChain Environment Setup',
          description: 'Install LangChain, configure API keys securely, and run a first chain end-to-end.',
          keywords: ['langchain setup', 'environment', 'api keys', 'dotenv'],
          difficulty: 'beginner',
          estimatedMinutes: 8,
          contentFile: 'ai-langchain/langchain-environment.md',
        },
        {
          slug: 'langchain-model-inputs',
          title: 'Model Inputs & Prompt Templates',
          description: 'Master PromptTemplate, ChatPromptTemplate, FewShotPromptTemplate, and dynamic prompt construction.',
          keywords: ['prompt template', 'few shot', 'chat prompt', 'system message'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          prerequisites: ['langchain-environment'],
          contentFile: 'ai-langchain/langchain-model-inputs.md',
        },
        {
          slug: 'langchain-output-parsers',
          title: 'Output Parsers — Structured LLM Output',
          description: 'Force LLMs to return structured JSON, Pydantic models, or lists using LangChain output parsers.',
          keywords: ['output parser', 'json parser', 'pydantic', 'structured output'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          prerequisites: ['langchain-model-inputs'],
          contentFile: 'ai-langchain/langchain-output-parsers.md',
        },
        {
          slug: 'lcel',
          title: 'LCEL — LangChain Expression Language',
          description: 'Compose chains with the pipe operator, use RunnableParallel for concurrent steps, add fallbacks, and stream outputs.',
          keywords: ['lcel', 'runnable', 'pipe operator', 'parallel', 'streaming'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          prerequisites: ['langchain-output-parsers'],
          contentFile: 'ai-langchain/lcel.md',
        },
        {
          slug: 'langchain-rag',
          title: 'RAG — Retrieval-Augmented Generation',
          description: 'Build a complete RAG pipeline: load documents, chunk, embed to a vector store, retrieve context, and generate grounded answers.',
          keywords: ['rag', 'retrieval augmented generation', 'vector store', 'faiss', 'chroma'],
          difficulty: 'advanced',
          estimatedMinutes: 25,
          prerequisites: ['lcel'],
          contentFile: 'ai-langchain/langchain-rag.md',
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 9 — LangGraph Agents
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      title: 'LangGraph Agents',
      topics: [
        {
          slug: 'langgraph-intro',
          title: 'Introduction to LangGraph',
          description: 'What LangGraph adds over LangChain — stateful graphs, cycles, conditional edges, and why agent workflows need graph-based orchestration.',
          keywords: ['langgraph', 'agent graph', 'stateful', 'cycles'],
          difficulty: 'advanced',
          estimatedMinutes: 14,
          contentFile: 'ai-langchain/langgraph-intro.md',
        },
        {
          slug: 'langgraph-setup',
          title: 'LangGraph Environment & Setup',
          description: 'Install LangGraph, understand StateGraph, TypedDict state schemas, and the compilation step.',
          keywords: ['langgraph setup', 'stategraph', 'typeddict', 'checkpointer'],
          difficulty: 'intermediate',
          estimatedMinutes: 10,
          prerequisites: ['langgraph-intro'],
          contentFile: 'ai-langchain/langgraph-setup.md',
        },
        {
          slug: 'langgraph-components',
          title: 'Graph Components & Agent Implementation',
          description: 'Build a full ReAct agent with tools — tool nodes, conditional routing, tool binding, and error handling.',
          keywords: ['react agent', 'tool node', 'tool binding', 'conditional routing'],
          difficulty: 'advanced',
          estimatedMinutes: 22,
          prerequisites: ['langgraph-setup'],
          contentFile: 'ai-langchain/langgraph-components.md',
        },
        {
          slug: 'langgraph-message-management',
          title: 'Message Management in LangGraph',
          description: 'Handle conversation history with message trimming and summarization to prevent context window overflow.',
          keywords: ['message management', 'trim messages', 'summarization', 'context window'],
          difficulty: 'advanced',
          estimatedMinutes: 16,
          prerequisites: ['langgraph-components'],
          contentFile: 'ai-langchain/langgraph-message-management.md',
        },
        {
          slug: 'langgraph-persistence',
          title: 'Thread-Level Persistence in LangGraph',
          description: 'Use LangGraph checkpointers to persist conversation state across sessions with SQLite, Redis, or PostgreSQL.',
          keywords: ['langgraph persistence', 'checkpointer', 'thread id', 'sqlite'],
          difficulty: 'advanced',
          estimatedMinutes: 18,
          prerequisites: ['langgraph-message-management'],
          contentFile: 'ai-langchain/langgraph-persistence.md',
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 10 — Vector Databases
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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
          contentFile: 'ai-langchain/intro-vector-databases.md',
        },
        {
          slug: 'vector-space',
          title: 'Vector Space & High-Dimensional Data',
          description: 'Cosine similarity, dot product, Euclidean distance, and approximate nearest neighbor algorithms (HNSW, IVF).',
          keywords: ['cosine similarity', 'dot product', 'euclidean distance', 'ann', 'hnsw'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          prerequisites: ['intro-vector-databases'],
          contentFile: 'ai-langchain/vector-space.md',
        },
        {
          slug: 'pinecone-intro',
          title: 'Pinecone Introduction',
          description: 'Set up Pinecone, create indexes, upsert vectors with metadata, and perform filtered similarity search.',
          keywords: ['pinecone', 'index', 'upsert', 'metadata filtering'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          prerequisites: ['vector-space'],
          contentFile: 'ai-langchain/pinecone-intro.md',
        },
        {
          slug: 'semantic-search-pinecone',
          title: 'Semantic Search with Pinecone',
          description: 'Build a production-grade semantic search engine with hybrid search (dense + BM25) and cross-encoder reranking.',
          keywords: ['semantic search', 'hybrid search', 'reranking', 'bm25', 'cross encoder'],
          difficulty: 'advanced',
          estimatedMinutes: 22,
          prerequisites: ['pinecone-intro'],
          contentFile: 'ai-langchain/semantic-search-pinecone.md',
        },
      ],
    },

  ],
};

export default category;
