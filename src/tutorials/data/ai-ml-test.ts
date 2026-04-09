import type { TutorialCategory } from '../types';

const category: TutorialCategory = {
  id: 'ai-ml-test',
  title: 'Test',
  icon: 'zap',
  color: '#f59e0b',
  description: 'test',
  sections: [
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 3 — Modern AI: Transformers & LLMs
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      title: 'Modern AI — Transformers & LLMs',
      topics: [
        // ──────────────────────────────────────────────────────────
        // 9. Attention Mechanism
        // ──────────────────────────────────────────────────────────
        {
          slug: 'attention-mechanism',
          title: 'The Attention Mechanism',
          description: 'Self-attention explained simply — Query, Key, Value, attention scores, and a code implementation.',
          keywords: ['attention', 'self-attention', 'query key value', 'scaled dot-product', 'transformer'],
          difficulty: 'advanced',
          estimatedMinutes: 18,
          prerequisites: ['rnn-sequence-models'],
          content: [
            { type: 'heading', level: 2, text: 'What is Attention?', id: 'what-is-attention' },
            { type: 'paragraph', html: 'Attention is a mechanism that lets a model focus on the <strong>most relevant parts</strong> of its input when making predictions. Instead of compressing an entire sequence into one fixed-size hidden state (like RNNs), attention allows the model to look back at all input positions and weigh their importance dynamically.' },
            { type: 'callout', variant: 'tip', html: '<strong>Analogy:</strong> Imagine you\'re in a library looking for information about climate change. Instead of reading every book from cover to cover (RNN), you scan the index, find the relevant chapters, and focus your attention there. That\'s what attention does — it lets the model "look up" the most relevant pieces of information.' },

            { type: 'heading', level: 3, text: 'Query, Key, Value — The Core Concept', id: 'qkv-concept' },
            { type: 'paragraph', html: 'Attention works like a search engine. Each element in the sequence is transformed into three vectors:' },
            { type: 'list', ordered: false, items: [
              '<strong>Query (Q):</strong> "What am I looking for?" — the current word\'s question',
              '<strong>Key (K):</strong> "What do I contain?" — each word\'s label/descriptor',
              '<strong>Value (V):</strong> "What information do I hold?" — the actual content to retrieve',
            ]},
            { type: 'paragraph', html: 'The attention score between two words is the dot product of the query and key. High score = high relevance. These scores are used to create a weighted sum of the values.' },

            { type: 'heading', level: 3, text: 'Scaled Dot-Product Attention', id: 'scaled-dot-product' },
            { type: 'flow', steps: [
              { label: 'Input Embeddings', desc: 'Each token has an embedding vector', color: '#6366f1' },
              { label: 'Compute Q, K, V', desc: 'Multiply by learned weight matrices', color: '#8b5cf6' },
              { label: 'Attention Scores', desc: 'Q × K^T / √d_k (dot product)', color: '#f59e0b' },
              { label: 'Softmax', desc: 'Normalize scores to probabilities', color: '#ef4444' },
              { label: 'Weighted Sum', desc: 'Multiply attention weights × V', color: '#22c55e' },
              { label: 'Output', desc: 'Context-aware representation', color: '#06b6d4' },
            ]},
            { type: 'callout', variant: 'note', html: 'We divide by <code>√d_k</code> (square root of key dimension) to prevent dot products from growing too large, which would push softmax into regions with tiny gradients. This is the "scaled" in "scaled dot-product attention."' },

            { type: 'heading', level: 3, text: 'Self-Attention Example', id: 'self-attention-example' },
            { type: 'paragraph', html: 'Consider the sentence: "The cat sat on the mat because <strong>it</strong> was soft." When processing the word "it," self-attention computes how much each other word relates to "it." The word "mat" gets a high attention score because "it" refers to the mat.' },
            { type: 'table', headers: ['Word', 'Attention Score for "it"', 'Interpretation'], rows: [
              ['The', '0.02', 'Not very relevant'],
              ['cat', '0.08', 'Could be the referent'],
              ['sat', '0.03', 'Action, not a referent'],
              ['on', '0.01', 'Preposition, irrelevant'],
              ['the', '0.01', 'Article, irrelevant'],
              ['<strong>mat</strong>', '<strong>0.72</strong>', 'Most likely referent — "it" = mat'],
              ['because', '0.03', 'Conjunction'],
              ['it', '0.05', 'Self-reference'],
              ['was', '0.03', 'Verb'],
              ['soft', '0.02', 'Adjective describing mat'],
            ]},

            { type: 'heading', level: 3, text: 'Attention Implementation', id: 'attention-code' },
            { type: 'code', language: 'python', title: 'attention.py', code: `import numpy as np

def softmax(x: np.ndarray) -> np.ndarray:
    """Numerically stable softmax."""
    exp_x = np.exp(x - np.max(x, axis=-1, keepdims=True))
    return exp_x / np.sum(exp_x, axis=-1, keepdims=True)

def scaled_dot_product_attention(
    Q: np.ndarray,  # (seq_len, d_k) — queries
    K: np.ndarray,  # (seq_len, d_k) — keys
    V: np.ndarray,  # (seq_len, d_v) — values
) -> tuple[np.ndarray, np.ndarray]:
    """
    Compute scaled dot-product attention.
    Returns: (output, attention_weights)
    """
    d_k = Q.shape[-1]

    # Step 1: Compute attention scores
    scores = Q @ K.T / np.sqrt(d_k)  # (seq_len, seq_len)

    # Step 2: Normalize with softmax
    weights = softmax(scores)  # (seq_len, seq_len)

    # Step 3: Weighted sum of values
    output = weights @ V  # (seq_len, d_v)

    return output, weights

# --- Demo ---
np.random.seed(42)
seq_len, d_model = 4, 8  # 4 tokens, 8-dim embeddings

# Simulated token embeddings (e.g., "the cat sat down")
embeddings = np.random.randn(seq_len, d_model)

# Learned projection matrices
W_q = np.random.randn(d_model, d_model) * 0.1
W_k = np.random.randn(d_model, d_model) * 0.1
W_v = np.random.randn(d_model, d_model) * 0.1

# Project to Q, K, V
Q = embeddings @ W_q
K = embeddings @ W_k
V = embeddings @ W_v

output, attn_weights = scaled_dot_product_attention(Q, K, V)

print("Attention weights (each row shows what each token attends to):")
print(np.round(attn_weights, 3))
print(f"\\nOutput shape: {output.shape}")  # (4, 8) — context-aware embeddings` },

            { type: 'heading', level: 3, text: 'Why Attention Changed Everything', id: 'why-attention-matters' },
            { type: 'comparison', left: { title: 'Without Attention (RNN)', color: '#6366f1', items: [
              'Processes tokens sequentially',
              'Information bottleneck — fixed-size hidden state',
              'Struggles with long-range dependencies',
              'Cannot parallelize across time steps',
            ]}, right: { title: 'With Attention (Transformer)', color: '#f59e0b', items: [
              'Processes all tokens simultaneously',
              'No bottleneck — attends directly to any position',
              'Handles long-range dependencies naturally',
              'Fully parallelizable — much faster training',
            ]}},

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'attention-takeaways' },
            { type: 'list', ordered: true, items: [
              'Attention lets models focus on relevant parts of the input dynamically',
              'Q (query), K (key), V (value) are projections of input embeddings',
              'Attention score = dot product of Q and K, normalized by √d_k, softmaxed',
              'Self-attention allows every token to "look at" every other token in the sequence',
              'This parallel, direct-access mechanism is why Transformers outperform RNNs',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
      ],
    },
  ],
};

export default category;
