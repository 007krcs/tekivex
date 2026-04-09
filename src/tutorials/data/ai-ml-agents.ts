import type { TutorialCategory } from '../types';

const category: TutorialCategory = {
  id: 'ai-ml-agents',
  title: 'AI Agents & Multi-Agent Systems',
  icon: 'cpu',
  color: '#f59e0b',
  description: 'AI agents, ReAct pattern, multi-agent systems, MCP protocol, swarm intelligence, LangChain and LangGraph.',
  sections: [
    {
      title: 'AI Agents & Multi-Agent Systems',
      topics: [
        {
          slug: 'what-is-ai-agent',
          title: 'What is an AI Agent?',
          description: 'The Observe-Think-Act loop, ReAct pattern, tool use, and how modern AI agents work.',
          keywords: ['ai agent', 'react pattern', 'tool use', 'reasoning', 'autonomous', 'observe think act'],
          difficulty: 'beginner',
          estimatedMinutes: 14,
          contentFile: 'ai-ml-agents/what-is-ai-agent.md',
        },
        {
          slug: 'agent-architectures',
          title: 'Agent Architectures',
          description: 'Single agent, multi-agent, hierarchical orchestration, memory systems, and orchestrator/worker patterns.',
          keywords: ['multi-agent', 'orchestrator', 'worker agent', 'memory', 'vector db', 'hierarchical agents'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          prerequisites: ['what-is-ai-agent'],
          contentFile: 'ai-ml-agents/agent-architectures.md',
        },
        {
          slug: 'swarm-intelligence',
          title: 'Swarm Intelligence',
          description: 'How agents communicate — message passing, shared state, blackboard architecture, and network topologies.',
          keywords: ['swarm intelligence', 'message passing', 'blackboard architecture', 'multi-agent communication', 'topology'],
          difficulty: 'advanced',
          estimatedMinutes: 16,
          prerequisites: ['agent-architectures'],
          contentFile: 'ai-ml-agents/swarm-intelligence.md',
        },
        {
          slug: 'mcp-protocol',
          title: 'Model Context Protocol (MCP) — Complete Guide',
          description: 'Master MCP from basics to production: architecture deep-dive, building servers and clients, transports, resources, prompts, security, debugging SOPs, and the MCP ecosystem.',
          keywords: ['mcp', 'model context protocol', 'mcp server', 'mcp client', 'tool use', 'claude code', 'ai tools', 'stdio transport', 'sse transport', 'mcp resources', 'mcp prompts', 'mcp debugging', 'mcp security', 'mcp ecosystem', 'build mcp server', 'claude desktop config'],
          difficulty: 'advanced',
          estimatedMinutes: 35,
          prerequisites: ['what-is-ai-agent'],
          contentFile: 'ai-ml-agents/mcp-protocol.md',
        },
        {
          slug: 'langchain-langgraph',
          title: 'LangChain & LangGraph',
          description: 'LangChain chains, LangGraph state machines, RAG pipelines, and building practical AI agent workflows.',
          keywords: ['langchain', 'langgraph', 'rag', 'retrieval augmented generation', 'chain', 'state machine', 'vector db'],
          difficulty: 'intermediate',
          estimatedMinutes: 20,
          prerequisites: ['what-is-ai-agent', 'agent-architectures'],
          contentFile: 'ai-ml-agents/langchain-langgraph.md',
        },
      ],
    },
  ],
};

export default category;
