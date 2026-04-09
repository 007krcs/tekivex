// ─── Tutorial Registry ───
import type { TutorialCategory, TutorialTopic, CategoryMeta } from './types';

type CategoryLoader = () => Promise<{ default: TutorialCategory }>;

const loaders: Record<string, CategoryLoader> = {
  'system-design': () => import('./data/system-design'),
  'software-architecture': () => import('./data/software-architecture'),
  'frontend-patterns': () => import('./data/frontend-patterns'),
  'backend-patterns': () => import('./data/backend-patterns'),
  'ai-ml': () => import('./data/ai-ml'),
  'ai-nlp': () => import('./data/ai-nlp'),
  'ai-langchain': () => import('./data/ai-langchain'),
  'ai-speech': () => import('./data/ai-speech'),
  'ai-ethics': () => import('./data/ai-ethics'),
};

export const CATEGORY_META: CategoryMeta[] = [
  { id: 'system-design', title: 'System Design', icon: 'server', color: '#6366f1', description: 'Scalability, availability, caching, load balancing, databases, and real-world case studies.', topicCount: 15 },
  { id: 'software-architecture', title: 'Software Architecture', icon: 'layers', color: '#8b5cf6', description: 'MVC, Clean Architecture, SOLID principles, DDD, CQRS, and GoF design patterns.', topicCount: 15 },
  { id: 'frontend-patterns', title: 'Frontend Patterns', icon: 'layout', color: '#06b6d4', description: 'Component patterns, state management, performance optimization, and testing strategies.', topicCount: 10 },
  { id: 'backend-patterns', title: 'Backend Patterns', icon: 'database', color: '#10b981', description: 'Repository pattern, middleware, dependency injection, auth flows, and API design.', topicCount: 10 },
  { id: 'ai-ml', title: 'AI & Machine Learning', icon: 'cpu', color: '#f59e0b', description: 'Neural networks, transformers, LLMs, fine-tuning, AI agents, MCP, LangChain, and swarm intelligence.', topicCount: 20 },
  { id: 'ai-nlp', title: 'NLP & Language Models', icon: 'message-square', color: '#8b5cf6', description: 'Natural Language Processing fundamentals, text pipelines, and Large Language Models architecture and fine-tuning.', topicCount: 12 },
  { id: 'ai-langchain', title: 'LangChain, LangGraph & Vector DBs', icon: 'link', color: '#10b981', description: 'Practical LangChain LCEL chains, LangGraph stateful agents, and Vector Database patterns for RAG applications.', topicCount: 10 },
  { id: 'ai-speech', title: 'Speech Recognition & LLM Engineering', icon: 'mic', color: '#f97316', description: 'Speech recognition with Whisper, TTS pipelines, prompt engineering, LLM evaluation, and production observability.', topicCount: 12 },
  { id: 'ai-ethics', title: 'AI Ethics & Regulation', icon: 'shield', color: '#ef4444', description: 'AI ethics, bias, fairness, explainability (XAI), and global AI regulation including the EU AI Act.', topicCount: 6 },
];

const cache = new Map<string, TutorialCategory>();

export async function loadCategory(id: string): Promise<TutorialCategory | null> {
  if (cache.has(id)) return cache.get(id)!;
  const loader = loaders[id];
  if (!loader) return null;
  const mod = await loader();
  cache.set(id, mod.default);
  return mod.default;
}

export function findTopic(category: TutorialCategory, slug: string): TutorialTopic | null {
  for (const section of category.sections) {
    const topic = section.topics.find(t => t.slug === slug);
    if (topic) return topic;
  }
  return null;
}

export function getFirstTopic(category: TutorialCategory): TutorialTopic | null {
  return category.sections[0]?.topics[0] ?? null;
}

export function getAdjacentTopics(category: TutorialCategory, slug: string): { prev: TutorialTopic | null; next: TutorialTopic | null } {
  const all = category.sections.flatMap(s => s.topics);
  const idx = all.findIndex(t => t.slug === slug);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}
