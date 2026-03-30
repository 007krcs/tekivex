/**
 * Tekivex LLM Engine — Llama 3.2 in the Browser
 *
 * Wraps @mlc-ai/web-llm to run Llama 3.2 locally via WebGPU.
 * - Zero server, zero API key, zero cost
 * - Model is downloaded once and cached in IndexedDB (~1.8 GB for 3B)
 * - Falls back gracefully when WebGPU is unavailable
 * - Supports RAG: top KB entries are injected as system context
 */

// web-llm is dynamically imported so it doesn't bloat the initial bundle.
// It loads only when the user explicitly clicks "Enable AI".
import type { MLCEngine, InitProgressReport } from '@mlc-ai/web-llm';
import { findTopMatches } from './ai-assistant';
import { KNOWLEDGE_BASE } from './knowledge-base';

// ─────────────────────────────────────────────
// MODEL OPTIONS
// ─────────────────────────────────────────────

export interface ModelOption {
  id: string;
  label: string;
  sizeMb: number;
  description: string;
}

export const MODEL_OPTIONS: ModelOption[] = [
  {
    id: 'Llama-3.2-1B-Instruct-q4f16_1-MLC',
    label: 'Llama 3.2 · 1B',
    sizeMb: 870,
    description: 'Fast · 870 MB · Good for basic Q&A',
  },
  {
    id: 'Llama-3.2-3B-Instruct-q4f16_1-MLC',
    label: 'Llama 3.2 · 3B',
    sizeMb: 1820,
    description: 'Recommended · 1.8 GB · Better answers',
  },
];

export const DEFAULT_MODEL_ID = MODEL_OPTIONS[1]!.id;

// ─────────────────────────────────────────────
// WEBGPU DETECTION
// ─────────────────────────────────────────────

export async function isWebGpuSupported(): Promise<boolean> {
  try {
    if (!('gpu' in navigator)) return false;
    const adapter = await (navigator as any).gpu.requestAdapter();
    return adapter !== null;
  } catch {
    return false;
  }
}

// ─────────────────────────────────────────────
// PROGRESS CALLBACK TYPE
// ─────────────────────────────────────────────

export interface LoadProgress {
  /** 0–100 */
  percent: number;
  text: string;
  phase: 'fetching' | 'loading' | 'ready';
}

// ─────────────────────────────────────────────
// SINGLETON ENGINE
// ─────────────────────────────────────────────

let _engine: MLCEngine | null = null;
let _loadedModelId: string | null = null;
let _loading = false;

export async function loadModel(
  modelId: string,
  onProgress: (p: LoadProgress) => void,
): Promise<MLCEngine> {
  // Already loaded with same model
  if (_engine && _loadedModelId === modelId) return _engine;

  // Prevent concurrent loads
  if (_loading) {
    await new Promise<void>((resolve) => {
      const check = setInterval(() => {
        if (!_loading) { clearInterval(check); resolve(); }
      }, 200);
    });
    if (_engine && _loadedModelId === modelId) return _engine;
  }

  _loading = true;
  try {
    onProgress({ percent: 0, text: 'Initializing…', phase: 'fetching' });

    // Dynamic import — web-llm (~6MB) only loads when user enables AI
    const { CreateMLCEngine } = await import('@mlc-ai/web-llm');

    _engine = await CreateMLCEngine(modelId, {
      initProgressCallback: (report: InitProgressReport) => {
        const pct = Math.round((report.progress ?? 0) * 100);
        const phase: LoadProgress['phase'] =
          pct < 95 ? 'fetching' : pct < 100 ? 'loading' : 'ready';
        onProgress({ percent: pct, text: report.text ?? 'Loading model…', phase });
      },
    });

    _loadedModelId = modelId;
    onProgress({ percent: 100, text: 'Llama 3.2 ready!', phase: 'ready' });
    return _engine;
  } finally {
    _loading = false;
  }
}

export function getLoadedEngine(): MLCEngine | null {
  return _engine;
}

export function isModelLoaded(modelId?: string): boolean {
  if (!_engine) return false;
  if (modelId) return _loadedModelId === modelId;
  return true;
}

export function unloadModel(): void {
  _engine = null;
  _loadedModelId = null;
}

// ─────────────────────────────────────────────
// SYSTEM PROMPT BUILDER (RAG)
// Injects top relevant KB entries as context
// ─────────────────────────────────────────────

function buildSystemPrompt(userQuery: string): string {
  // Retrieve top 4 KB entries relevant to this query
  const matches = findTopMatches(userQuery, 4);

  let contextBlock = '';
  if (matches.length > 0) {
    contextBlock = '\n\n## Relevant Product Knowledge\n';
    matches.forEach(({ entry }, i) => {
      contextBlock += `\n### [${i + 1}] ${entry.questions[0]}\n${entry.answer}\n`;
    });
  }

  // Build a product overview summary (always included)
  const productSummary = `
## Tekivex Products
${KNOWLEDGE_BASE
  .filter((e) => e.id.endsWith('-what-is') || e.id === 'what-is-tekivex')
  .map((e) => `- **${e.questions[0]?.replace('What is ', '').replace('Tell me about ', '')}**: ${e.answer.split('\n')[0]}`)
  .join('\n')}
`;

  return `You are the **Tekivex AI Support Assistant** — a helpful, knowledgeable, and friendly support bot for Tekivex software products.

## Your Role
- Answer questions about Tekivex products: GridStorm, PDF Toolkit, NexaRecruit, NexaCare, Analytics Studio, DataFlow
- Help with installation, configuration, troubleshooting, pricing, and comparisons
- Give concise, accurate, developer-friendly answers
- Use markdown formatting: **bold** for emphasis, \`code\` for code snippets, bullet lists for features
- If you don't know something, say so and point to GitHub issues or docs

## Important Facts
- GridStorm is MIT-licensed (free forever), no per-developer fees
- GitHub: https://github.com/007krcs/tekivex
- Docs: https://grid-data-analytics-explorer.vercel.app/#/docs
- Enterprise contact: enterprise@tekivex.com
${productSummary}${contextBlock}

Keep answers focused and practical. Respond in plain markdown.`;
}

// ─────────────────────────────────────────────
// STREAMING INFERENCE
// ─────────────────────────────────────────────

export interface StreamCallbacks {
  onToken: (token: string, fullText: string) => void;
  onDone: (fullText: string) => void;
  onError: (err: Error) => void;
}

export async function askLlama(
  query: string,
  history: Array<{ role: 'user' | 'assistant'; content: string }>,
  callbacks: StreamCallbacks,
): Promise<void> {
  const engine = getLoadedEngine();
  if (!engine) {
    callbacks.onError(new Error('Model not loaded'));
    return;
  }

  const systemPrompt = buildSystemPrompt(query);

  // Build messages array (last 6 messages for context window efficiency)
  const recentHistory = history.slice(-6);
  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: systemPrompt },
    ...recentHistory,
    { role: 'user', content: query },
  ];

  try {
    const stream = await engine.chat.completions.create({
      messages,
      stream: true,
      temperature: 0.65,
      max_tokens: 800,
      top_p: 0.9,
    });

    let fullText = '';
    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content ?? '';
      if (delta) {
        fullText += delta;
        callbacks.onToken(delta, fullText);
      }
    }
    callbacks.onDone(fullText);
  } catch (err) {
    callbacks.onError(err instanceof Error ? err : new Error(String(err)));
  }
}
