import type { TutorialCategory } from '../types';

const category: TutorialCategory = {
  id: 'ai-ml-advanced',
  title: 'Transformers, LLMs & Optimization',
  icon: 'zap',
  color: '#f59e0b',
  description: 'Modern AI: Transformers, BERT, GPT, fine-tuning, training optimization, and production deployment strategies.',
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
        // 10. Transformer Architecture
        // ──────────────────────────────────────────────────────────
        {
          slug: 'transformer-architecture',
          title: 'The Transformer Architecture',
          description: 'Complete Transformer breakdown — encoder, decoder, positional encoding, multi-head attention, and feed-forward networks.',
          keywords: ['transformer', 'encoder', 'decoder', 'positional encoding', 'multi-head attention', 'feed-forward'],
          difficulty: 'advanced',
          estimatedMinutes: 20,
          prerequisites: ['attention-mechanism'],
          content: [
            { type: 'heading', level: 2, text: 'The Architecture That Changed AI', id: 'transformer-intro' },
            { type: 'paragraph', html: 'The Transformer, introduced in the landmark 2017 paper, replaced recurrence entirely with <strong>attention</strong>. It processes entire sequences in parallel, enabling massive speedups and paving the way for GPT, BERT, Claude, and every modern LLM. The key insight: you don\'t need recurrence or convolution — attention is all you need.' },

            { type: 'heading', level: 3, text: 'High-Level Architecture', id: 'high-level-arch' },
            { type: 'paragraph', html: 'The original Transformer has two halves: an <strong>Encoder</strong> (understands input) and a <strong>Decoder</strong> (generates output). Modern models often use only one: BERT uses the encoder; GPT/Claude use the decoder.' },
            { type: 'flow', steps: [
              { label: 'Input Tokens', desc: 'Tokenized text sequence', color: '#6366f1' },
              { label: 'Embedding + Position', desc: 'Token embedding + positional encoding', color: '#8b5cf6' },
              { label: 'Multi-Head Attention', desc: 'Multiple parallel attention heads', color: '#a855f7' },
              { label: 'Add & Norm', desc: 'Residual connection + layer norm', color: '#ec4899' },
              { label: 'Feed-Forward', desc: 'Two linear layers with ReLU', color: '#f59e0b' },
              { label: 'Add & Norm', desc: 'Residual connection + layer norm', color: '#ef4444' },
              { label: 'Output', desc: 'Contextualized representations', color: '#22c55e' },
            ]},

            { type: 'heading', level: 3, text: 'Positional Encoding', id: 'positional-encoding' },
            { type: 'paragraph', html: 'Since Transformers process all tokens simultaneously (no sequential order), they need a way to know <em>where</em> each token is in the sequence. <strong>Positional encodings</strong> are vectors added to token embeddings that encode position information using sine and cosine waves of different frequencies.' },
            { type: 'callout', variant: 'tip', html: '<strong>Analogy:</strong> Positional encoding is like adding a "seat number" to each guest at a dinner table. Without it, the model would see a bag of words with no order — "dog bites man" and "man bites dog" would look identical.' },
            { type: 'code', language: 'python', title: 'positional_encoding.py', code: `import numpy as np

def positional_encoding(seq_len: int, d_model: int) -> np.ndarray:
    """Generate sinusoidal positional encodings."""
    pos = np.arange(seq_len)[:, np.newaxis]       # (seq_len, 1)
    dim = np.arange(d_model)[np.newaxis, :]        # (1, d_model)

    # Frequency decreases with dimension
    angle = pos / (10000 ** (2 * (dim // 2) / d_model))

    # Even indices: sine, Odd indices: cosine
    pe = np.zeros((seq_len, d_model))
    pe[:, 0::2] = np.sin(angle[:, 0::2])
    pe[:, 1::2] = np.cos(angle[:, 1::2])
    return pe

# Example: 10 positions, 8 dimensions
pe = positional_encoding(10, 8)
print("Shape:", pe.shape)  # (10, 8)
print("Position 0:", np.round(pe[0], 3))
print("Position 5:", np.round(pe[5], 3))` },

            { type: 'heading', level: 3, text: 'Multi-Head Attention', id: 'multi-head-attention' },
            { type: 'paragraph', html: 'Instead of performing one attention operation, the Transformer runs <strong>multiple attention heads in parallel</strong>. Each head learns to focus on different relationships — one might attend to syntax, another to semantics, another to coreference. Their outputs are concatenated and projected.' },
            { type: 'list', ordered: true, items: [
              'Split Q, K, V into <code>h</code> heads (e.g., 8 or 12)',
              'Each head performs scaled dot-product attention independently',
              'Concatenate all head outputs',
              'Project through a final linear layer to get the output',
            ]},
            { type: 'callout', variant: 'note', html: 'With 8 heads and d_model=512, each head operates on d_k=64 dimensions. This is more expressive than a single head with 512 dimensions because different heads can capture different types of relationships.' },

            { type: 'heading', level: 3, text: 'Feed-Forward Network', id: 'ffn' },
            { type: 'paragraph', html: 'After attention, each position passes through a <strong>feed-forward network</strong> (FFN) — two linear layers with a ReLU activation. This processes each position independently and adds non-linearity. The inner dimension is typically 4× the model dimension (e.g., 2048 for d_model=512).' },

            { type: 'heading', level: 3, text: 'Residual Connections & Layer Normalization', id: 'residual-layernorm' },
            { type: 'paragraph', html: 'Two critical techniques make deep Transformers trainable:' },
            { type: 'list', ordered: false, items: [
              '<strong>Residual Connections:</strong> output = layer(x) + x — lets gradients flow directly through the network, preventing vanishing gradients',
              '<strong>Layer Normalization:</strong> Normalizes activations to have zero mean and unit variance, stabilizing training',
            ]},

            { type: 'heading', level: 3, text: 'Encoder vs Decoder', id: 'encoder-vs-decoder' },
            { type: 'comparison', left: { title: 'Encoder (BERT-style)', color: '#6366f1', items: [
              'Bidirectional — sees full input',
              'Self-attention attends to all positions',
              'Used for understanding (classification, NER)',
              'Examples: BERT, RoBERTa, DeBERTa',
            ]}, right: { title: 'Decoder (GPT-style)', color: '#f59e0b', items: [
              'Autoregressive — sees only past tokens',
              'Causal mask prevents looking ahead',
              'Used for generation (text, code)',
              'Examples: GPT-4, Claude, LLaMA',
            ]}},

            { type: 'heading', level: 3, text: 'Transformer vs RNN', id: 'transformer-vs-rnn' },
            { type: 'table', headers: ['Aspect', 'Transformer', 'RNN/LSTM'], rows: [
              ['Parallelism', 'Fully parallel (all tokens at once)', 'Sequential (one token at a time)'],
              ['Long-range deps', 'Direct attention to any position', 'Decays with distance'],
              ['Training speed', 'Much faster (GPU-friendly)', 'Slower (sequential bottleneck)'],
              ['Memory', 'O(n²) for sequence length n', 'O(n) — more memory-efficient'],
              ['Inductive bias', 'None — must learn everything from data', 'Sequential bias built in'],
            ]},

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'transformer-takeaways' },
            { type: 'list', ordered: true, items: [
              'Transformers replace recurrence with self-attention — processing all tokens in parallel',
              'Positional encodings inject sequence order information into the model',
              'Multi-head attention lets the model focus on different relationship types simultaneously',
              'Residual connections + layer norm make deep stacking possible',
              'Encoder = bidirectional understanding; Decoder = autoregressive generation',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 11. Large Language Models
        // ──────────────────────────────────────────────────────────
        {
          slug: 'large-language-models',
          title: 'Large Language Models (LLMs)',
          description: 'How GPT and Claude work — tokenization, embeddings, transformer blocks, next-token prediction, and sampling strategies.',
          keywords: ['llm', 'gpt', 'claude', 'tokenization', 'next-token prediction', 'temperature', 'top-k', 'top-p'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          prerequisites: ['transformer-architecture'],
          content: [
            { type: 'heading', level: 2, text: 'What Are Large Language Models?', id: 'what-are-llms' },
            { type: 'paragraph', html: 'Large Language Models (LLMs) like GPT-4 and Claude are <strong>decoder-only Transformers</strong> trained on massive text corpora. Their fundamental capability is surprisingly simple: <strong>predict the next token</strong>. Yet from this simple objective, they develop reasoning, coding, translation, and creative abilities.' },
            { type: 'callout', variant: 'note', html: 'An LLM doesn\'t "understand" language the way humans do. It has learned statistical patterns from trillions of words. But these patterns are so rich and deep that the model can generate coherent text, answer questions, write code, and even reason about novel problems.' },

            { type: 'heading', level: 3, text: 'The LLM Pipeline', id: 'llm-pipeline' },
            { type: 'flow', steps: [
              { label: 'Input Text', desc: '"The capital of France is"', color: '#6366f1' },
              { label: 'Tokenizer', desc: 'Split into tokens: ["The", " capital", " of", " France", " is"]', color: '#8b5cf6' },
              { label: 'Embeddings', desc: 'Convert tokens to dense vectors', color: '#a855f7' },
              { label: 'N Transformer Blocks', desc: 'Self-attention + FFN × 96 layers', color: '#f59e0b' },
              { label: 'Logits', desc: 'Score for every token in vocabulary', color: '#ef4444' },
              { label: 'Sampling', desc: 'Select next token ("Paris")', color: '#22c55e' },
            ]},

            { type: 'heading', level: 3, text: 'Tokenization', id: 'tokenization' },
            { type: 'paragraph', html: 'LLMs don\'t work with raw characters or whole words. They use <strong>subword tokenization</strong> (like BPE — Byte Pair Encoding) that splits text into meaningful chunks. Common words are single tokens; rare words are broken into subwords.' },
            { type: 'table', headers: ['Text', 'Tokens', 'Token Count'], rows: [
              ['"Hello world"', '["Hello", " world"]', '2'],
              ['"unbelievable"', '["un", "believ", "able"]', '3'],
              ['"GPT-4 is great!"', '["G", "PT", "-", "4", " is", " great", "!"]', '7'],
              ['"こんにちは"', '["こん", "にち", "は"]', '3'],
            ]},
            { type: 'callout', variant: 'tip', html: 'Typical LLM vocabulary sizes: GPT-4 has ~100,000 tokens. Each token is roughly 3-4 characters in English. This balance lets the model handle any text while keeping sequence lengths manageable.' },

            { type: 'heading', level: 3, text: 'Next-Token Prediction', id: 'next-token' },
            { type: 'paragraph', html: 'The training objective is deceptively simple: given all previous tokens, predict the next one. The model outputs a probability distribution over its entire vocabulary, and the loss function (cross-entropy) pushes the model to assign high probability to the correct next token.' },
            { type: 'paragraph', html: 'During inference, the model generates text one token at a time in an <strong>autoregressive</strong> loop: predict token → append to input → predict next token → repeat.' },

            { type: 'heading', level: 3, text: 'Sampling Strategies', id: 'sampling-strategies' },
            { type: 'paragraph', html: 'When the model outputs logits (scores for each token), we need to choose which token to actually generate. Different sampling strategies control the creativity and randomness of the output:' },
            { type: 'table', headers: ['Strategy', 'How It Works', 'Effect'], rows: [
              ['<strong>Greedy</strong>', 'Always pick the highest probability token', 'Deterministic, repetitive, boring'],
              ['<strong>Temperature</strong>', 'Divide logits by T before softmax', 'T < 1: sharper (more focused); T > 1: flatter (more random)'],
              ['<strong>Top-k</strong>', 'Only consider the top k tokens', 'k=10: choose from 10 best candidates'],
              ['<strong>Top-p (Nucleus)</strong>', 'Consider tokens until cumulative prob ≥ p', 'p=0.9: dynamic number of candidates, covers 90% probability mass'],
            ]},
            { type: 'callout', variant: 'tip', html: '<strong>Rule of thumb:</strong> Temperature 0.0-0.3 for factual/code tasks (focused). Temperature 0.7-1.0 for creative writing (varied). Top-p of 0.9-0.95 is a good default for most use cases.' },

            { type: 'heading', level: 3, text: 'Scale and Emergent Abilities', id: 'scale-emergence' },
            { type: 'paragraph', html: 'LLMs exhibit <strong>emergent abilities</strong> — capabilities that appear suddenly at certain scales. A model with 1B parameters can\'t do arithmetic, but at 100B+ parameters, it suddenly can. These emergent behaviors include:' },
            { type: 'list', ordered: false, items: [
              '<strong>In-context learning:</strong> Learning from examples in the prompt without weight updates',
              '<strong>Chain-of-thought reasoning:</strong> Step-by-step logical reasoning',
              '<strong>Code generation:</strong> Writing and debugging functional code',
              '<strong>Translation:</strong> Translating between languages not explicitly paired in training',
              '<strong>Instruction following:</strong> Understanding and executing complex natural language instructions',
            ]},

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'llm-takeaways' },
            { type: 'list', ordered: true, items: [
              'LLMs are decoder-only Transformers trained on next-token prediction',
              'Tokenization converts text to subword tokens (BPE) — roughly 3-4 chars each',
              'Generation is autoregressive: predict one token, append, repeat',
              'Temperature, top-k, and top-p control the randomness of generated text',
              'Emergent abilities appear at large scales — in-context learning, reasoning, coding',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 12. Fine-Tuning & Transfer Learning
        // ──────────────────────────────────────────────────────────
        {
          slug: 'fine-tuning-transfer',
          title: 'Fine-Tuning & Transfer Learning',
          description: 'Pre-training vs fine-tuning, LoRA, QLoRA, PEFT methods, and when to fine-tune vs prompt engineer.',
          keywords: ['fine-tuning', 'transfer learning', 'lora', 'qlora', 'peft', 'pre-training', 'prompt engineering'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          prerequisites: ['large-language-models'],
          content: [
            { type: 'heading', level: 2, text: 'Transfer Learning — Standing on Giants\' Shoulders', id: 'transfer-learning-intro' },
            { type: 'paragraph', html: 'Training an LLM from scratch costs millions of dollars and months of GPU time. <strong>Transfer learning</strong> lets you take a pre-trained model that already understands language and adapt it to your specific task — often with a small dataset and a fraction of the cost.' },
            { type: 'callout', variant: 'tip', html: '<strong>Analogy:</strong> It\'s like hiring a multilingual expert and teaching them your company\'s jargon. You don\'t need to teach them the entire language — just the specialized vocabulary and patterns for your domain.' },

            { type: 'heading', level: 3, text: 'Pre-Training vs Fine-Tuning', id: 'pretrain-vs-finetune' },
            { type: 'flow', steps: [
              { label: 'Massive Dataset', desc: 'Trillions of tokens from the internet', color: '#6366f1' },
              { label: 'Pre-Train', desc: 'Learn general language understanding', color: '#8b5cf6' },
              { label: 'Base Model', desc: 'Large, general-purpose foundation', color: '#a855f7' },
              { label: 'Task Dataset', desc: 'Small, domain-specific examples', color: '#f59e0b' },
              { label: 'Fine-Tune', desc: 'Adapt to specific task/domain', color: '#22c55e' },
              { label: 'Specialized Model', desc: 'Optimized for your use case', color: '#06b6d4' },
            ]},
            { type: 'table', headers: ['Aspect', 'Pre-Training', 'Fine-Tuning'], rows: [
              ['Data', 'Trillions of tokens (generic)', 'Thousands to millions (task-specific)'],
              ['Cost', '$1M - $100M+', '$10 - $10,000'],
              ['Time', 'Weeks to months', 'Hours to days'],
              ['Hardware', '1000s of GPUs/TPUs', '1-8 GPUs'],
              ['Goal', 'Learn general language patterns', 'Adapt to specific task or domain'],
            ]},

            { type: 'heading', level: 3, text: 'Types of Fine-Tuning', id: 'fine-tuning-types' },
            { type: 'list', ordered: false, items: [
              '<strong>Full Fine-Tuning:</strong> Update all model parameters — most expressive but expensive and risks catastrophic forgetting',
              '<strong>Feature Extraction:</strong> Freeze all layers, only train a new head — cheapest but least adaptable',
              '<strong>PEFT (Parameter-Efficient Fine-Tuning):</strong> Update only a small subset of parameters — best balance of cost and performance',
            ]},

            { type: 'heading', level: 3, text: 'LoRA — Low-Rank Adaptation', id: 'lora-explained' },
            { type: 'paragraph', html: '<strong>LoRA</strong> is the most popular PEFT method. Instead of updating the full weight matrix W (millions of params), it adds two small matrices A and B such that the update is ΔW = A × B. This reduces trainable parameters by 100-1000×.' },
            { type: 'code', language: 'python', title: 'lora_concept.py', code: `# Conceptual LoRA implementation
import numpy as np

class LoRALayer:
    """
    LoRA: Instead of updating full W (d_in × d_out),
    learn two small matrices A (d_in × r) and B (r × d_out)
    where r << d_in, d_out (rank, typically 4-64).
    """
    def __init__(self, d_in: int, d_out: int, rank: int = 8):
        # Original frozen weights
        self.W_frozen = np.random.randn(d_in, d_out) * 0.01

        # LoRA trainable parameters (much smaller!)
        self.A = np.random.randn(d_in, rank) * 0.01   # down-project
        self.B = np.zeros((rank, d_out))                # up-project

        # Stats
        frozen_params = d_in * d_out
        lora_params = d_in * rank + rank * d_out
        print(f"Frozen: {frozen_params:,} params")
        print(f"LoRA:   {lora_params:,} params ({lora_params/frozen_params:.1%})")

    def forward(self, x: np.ndarray) -> np.ndarray:
        # Original output + low-rank adaptation
        return x @ self.W_frozen + x @ self.A @ self.B

# Example: adapting a 4096 × 4096 layer with rank 8
layer = LoRALayer(4096, 4096, rank=8)
# Frozen: 16,777,216 params
# LoRA:   65,536 params (0.4% of original!)` },

            { type: 'heading', level: 3, text: 'QLoRA — Quantized LoRA', id: 'qlora' },
            { type: 'paragraph', html: '<strong>QLoRA</strong> goes further: it quantizes the frozen model to 4-bit precision (reducing memory by 4×) while keeping LoRA adapters in full precision. This lets you fine-tune a 65B parameter model on a single 48GB GPU.' },
            { type: 'callout', variant: 'note', html: 'QLoRA makes fine-tuning accessible to everyone. A model that would normally need 8× A100 GPUs ($200K+ hardware) can be fine-tuned on a single consumer GPU with QLoRA.' },

            { type: 'heading', level: 3, text: 'Fine-Tuning vs Prompt Engineering', id: 'finetune-vs-prompt' },
            { type: 'paragraph', html: 'Not every problem needs fine-tuning. Often, clever prompting can achieve similar results at zero cost:' },
            { type: 'comparison', left: { title: 'When to Fine-Tune', color: '#6366f1', items: [
              'Domain-specific knowledge (medical, legal)',
              'Consistent output format/style needed',
              'Large volume of similar tasks',
              'Latency-sensitive — smaller fine-tuned model',
              'Task requires specialized behavior',
            ]}, right: { title: 'When to Prompt Engineer', color: '#22c55e', items: [
              'General-purpose tasks',
              'Few examples needed (few-shot learning)',
              'Rapid prototyping and iteration',
              'No training infrastructure available',
              'Task can be well-specified in instructions',
            ]}},

            { type: 'heading', level: 3, text: 'PEFT Methods Comparison', id: 'peft-comparison' },
            { type: 'table', headers: ['Method', 'Trainable Params', 'Memory', 'Performance', 'Complexity'], rows: [
              ['Full Fine-Tuning', '100%', 'Very High', 'Best (with enough data)', 'Medium'],
              ['LoRA', '0.1-1%', 'Low', 'Near full fine-tuning', 'Low'],
              ['QLoRA', '0.1-1%', 'Very Low', 'Near LoRA', 'Medium'],
              ['Prefix Tuning', '<0.1%', 'Very Low', 'Good for generation', 'Low'],
              ['Adapters', '1-5%', 'Low', 'Good across tasks', 'Medium'],
            ]},

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'finetune-takeaways' },
            { type: 'list', ordered: true, items: [
              'Transfer learning adapts pre-trained models to specific tasks — saving time and money',
              'LoRA adds small trainable matrices instead of updating all weights (0.1-1% of params)',
              'QLoRA quantizes frozen weights to 4-bit, enabling fine-tuning on consumer GPUs',
              'Fine-tune for domain expertise and consistent behavior; prompt engineer for general tasks',
              'PEFT methods give near-full fine-tuning performance at a fraction of the cost',
            ]},
          ],
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 4 — Training & Optimization
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      title: 'Training & Optimization',
      topics: [
        // ──────────────────────────────────────────────────────────
        // 13. Model Training Pipeline
        // ──────────────────────────────────────────────────────────
        {
          slug: 'model-training-pipeline',
          title: 'The Model Training Pipeline',
          description: 'Full production ML pipeline from data collection through deployment and monitoring — every step explained.',
          keywords: ['ml pipeline', 'data engineering', 'feature engineering', 'model deployment', 'monitoring', 'data versioning'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          prerequisites: ['first-ml-model'],
          content: [
            { type: 'heading', level: 2, text: 'The Full ML Pipeline', id: 'full-pipeline' },
            { type: 'paragraph', html: 'Building a production ML system is much more than training a model. Data collection, cleaning, feature engineering, validation, deployment, and monitoring each require careful attention. In production, the model code is often <em>less than 5%</em> of the total system.' },
            { type: 'flow', steps: [
              { label: 'Data Collection', desc: 'Gather raw data from APIs, DBs, logs', color: '#6366f1' },
              { label: 'Data Cleaning', desc: 'Fix missing values, remove duplicates', color: '#8b5cf6' },
              { label: 'Augmentation', desc: 'Expand dataset with synthetic variations', color: '#a855f7' },
              { label: 'Feature Engineering', desc: 'Create informative input features', color: '#ec4899' },
              { label: 'Train', desc: 'Fit model on training set', color: '#f59e0b' },
              { label: 'Validate', desc: 'Tune hyperparameters on val set', color: '#ef4444' },
              { label: 'Test', desc: 'Final evaluation on held-out data', color: '#22c55e' },
              { label: 'Deploy', desc: 'Serve model in production', color: '#06b6d4' },
              { label: 'Monitor', desc: 'Track drift, errors, performance', color: '#64748b' },
            ]},

            { type: 'heading', level: 3, text: 'Data Collection', id: 'data-collection' },
            { type: 'paragraph', html: 'The quality of your data determines the ceiling of your model\'s performance. No amount of training can fix bad data.' },
            { type: 'list', ordered: false, items: [
              '<strong>APIs & Databases:</strong> Structured data from internal systems',
              '<strong>Web Scraping:</strong> Collecting public data (respecting robots.txt)',
              '<strong>User-Generated:</strong> Labels from annotations, feedback, interactions',
              '<strong>Synthetic Data:</strong> Generated data to fill gaps or handle rare cases',
              '<strong>Third-Party Datasets:</strong> Pre-existing datasets (Kaggle, HuggingFace, etc.)',
            ]},

            { type: 'heading', level: 3, text: 'Data Cleaning & Preprocessing', id: 'data-cleaning' },
            { type: 'table', headers: ['Problem', 'Solution', 'Tool/Method'], rows: [
              ['Missing values', 'Impute with mean/median/mode or drop', 'pandas fillna(), SimpleImputer'],
              ['Duplicates', 'Identify and remove duplicate records', 'pandas drop_duplicates()'],
              ['Outliers', 'Cap at percentiles or remove', 'IQR method, Z-score filtering'],
              ['Inconsistent formats', 'Standardize dates, categories, units', 'Custom parsing, regex'],
              ['Class imbalance', 'Oversample minority, undersample majority', 'SMOTE, random oversampling'],
            ]},

            { type: 'heading', level: 3, text: 'Feature Engineering', id: 'feature-engineering' },
            { type: 'paragraph', html: 'Feature engineering transforms raw data into informative inputs that help the model learn. Good features can make a simple model outperform a complex one with raw features.' },
            { type: 'code', language: 'python', title: 'feature_engineering.py', code: `import numpy as np

# Example: feature engineering for house price prediction
def engineer_features(data: dict) -> dict:
    """Transform raw data into ML-ready features."""
    features = {}

    # Numeric: normalize to [0, 1]
    features['sqft_norm'] = data['sqft'] / 5000.0
    features['bedrooms_norm'] = data['bedrooms'] / 10.0

    # Derived: create new informative features
    features['price_per_sqft'] = data['price'] / max(data['sqft'], 1)
    features['room_ratio'] = data['bedrooms'] / max(data['bathrooms'], 1)
    features['age'] = 2026 - data['year_built']

    # Binning: convert continuous to categorical
    features['age_bucket'] = (
        'new' if features['age'] < 10
        else 'mid' if features['age'] < 30
        else 'old'
    )

    # Interaction: combine features
    features['size_x_bedrooms'] = features['sqft_norm'] * features['bedrooms_norm']

    return features

# Raw data
house = {'sqft': 2000, 'bedrooms': 3, 'bathrooms': 2,
         'price': 450000, 'year_built': 2005}

features = engineer_features(house)
for k, v in features.items():
    print(f"  {k}: {v}")` },

            { type: 'heading', level: 3, text: 'Data Versioning', id: 'data-versioning' },
            { type: 'paragraph', html: 'Just like code has Git, ML datasets need versioning. When you retrain a model and get different results, you need to know whether the data changed. Tools like <strong>DVC</strong> (Data Version Control) track dataset versions alongside code.' },
            { type: 'callout', variant: 'caution', html: '<strong>Reproducibility crisis:</strong> Without data versioning, you can\'t reproduce results. If training data changes silently (new records, removed outliers), the same code will produce a different model. Always version your data.' },

            { type: 'heading', level: 3, text: 'Deployment & Monitoring', id: 'deployment-monitoring' },
            { type: 'paragraph', html: 'Deploying a model is just the beginning. Models degrade over time as real-world data drifts from training data.' },
            { type: 'list', ordered: false, items: [
              '<strong>Model Serving:</strong> REST API, batch prediction, or edge deployment',
              '<strong>Data Drift:</strong> Monitor if input distribution changes (new user behavior)',
              '<strong>Concept Drift:</strong> Monitor if the relationship between inputs and outputs changes',
              '<strong>Performance Metrics:</strong> Track accuracy, latency, throughput in production',
              '<strong>Retraining Triggers:</strong> Automatic retraining when performance drops below threshold',
            ]},

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'pipeline-takeaways' },
            { type: 'list', ordered: true, items: [
              'Production ML is 95% data engineering and infrastructure, 5% model code',
              'Feature engineering can be more impactful than choosing a fancier model',
              'Always version your data alongside your code — reproducibility is critical',
              'Models degrade over time — monitor for data drift and concept drift',
              'The pipeline is a cycle: deploy → monitor → retrain → redeploy',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 14. Hyperparameter Tuning
        // ──────────────────────────────────────────────────────────
        {
          slug: 'hyperparameter-tuning',
          title: 'Hyperparameter Tuning',
          description: 'Learning rate, batch size, and architecture choices — grid search, random search, and Bayesian optimization.',
          keywords: ['hyperparameter', 'learning rate', 'batch size', 'grid search', 'random search', 'bayesian optimization'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          prerequisites: ['training-deep-networks'],
          content: [
            { type: 'heading', level: 2, text: 'What Are Hyperparameters?', id: 'what-are-hyperparams' },
            { type: 'paragraph', html: '<strong>Hyperparameters</strong> are settings you choose <em>before</em> training — they control how the model learns, not what it learns. Unlike model parameters (weights), hyperparameters aren\'t learned from data; they\'re set by the engineer.' },
            { type: 'table', headers: ['Hyperparameter', 'What It Controls', 'Typical Range', 'Impact'], rows: [
              ['<strong>Learning Rate</strong>', 'Step size for weight updates', '1e-5 to 1e-1', 'Most important — too high: diverge, too low: stuck'],
              ['<strong>Batch Size</strong>', 'Samples per gradient update', '16 to 512', 'Large: stable but may generalize worse'],
              ['<strong>Epochs</strong>', 'Passes through entire dataset', '10 to 1000', 'Too few: underfit, too many: overfit'],
              ['<strong>Hidden Layers</strong>', 'Network depth', '1 to 100+', 'Deeper = more capacity, harder to train'],
              ['<strong>Neurons per Layer</strong>', 'Layer width', '32 to 4096', 'Wider = more capacity, more memory'],
              ['<strong>Dropout Rate</strong>', 'Fraction of neurons to randomly disable', '0.1 to 0.5', 'Regularization — prevents overfitting'],
            ]},

            { type: 'heading', level: 3, text: 'The Learning Rate — Most Critical Hyperparameter', id: 'learning-rate' },
            { type: 'paragraph', html: 'The learning rate controls how much weights change each step. Getting it right is the single most important tuning decision.' },
            { type: 'callout', variant: 'tip', html: '<strong>Analogy:</strong> Learning rate is like the stride length when walking down a hill. Too big — you overshoot the valley and bounce around. Too small — you take forever to reach the bottom. Just right — smooth, efficient descent.' },
            { type: 'list', ordered: false, items: [
              '<strong>Too high (0.1+):</strong> Loss oscillates wildly or explodes to NaN',
              '<strong>Too low (1e-6):</strong> Training takes forever, may get stuck in local minima',
              '<strong>Sweet spot (1e-4 to 1e-3):</strong> Smooth convergence for most problems',
              '<strong>Learning rate schedule:</strong> Start high, reduce over time (warmup + decay)',
            ]},

            { type: 'heading', level: 3, text: 'Search Strategies', id: 'search-strategies' },
            { type: 'comparison', left: { title: 'Grid Search', color: '#6366f1', items: [
              'Try every combination of preset values',
              'Exhaustive but exponentially expensive',
              'Good for 2-3 hyperparameters',
              'Wastes time on unimportant dimensions',
            ]}, right: { title: 'Random Search', color: '#f59e0b', items: [
              'Sample random combinations',
              'More efficient — explores diverse values',
              'Better for high-dimensional spaces',
              'Finds good solutions faster than grid',
            ]}},
            { type: 'paragraph', html: '<strong>Bayesian Optimization</strong> is the smartest approach: it builds a model of the objective function and strategically picks the next hyperparameters to try. It learns from previous trials, converging on optimal values much faster.' },

            { type: 'heading', level: 3, text: 'Hyperparameter Search Implementation', id: 'search-code' },
            { type: 'code', language: 'python', title: 'hyperparam_search.py', code: `import numpy as np
from itertools import product

def train_and_evaluate(lr: float, batch_size: int, hidden: int) -> float:
    """Simulate training — returns validation accuracy."""
    # In real code, this trains a model and returns val accuracy
    # Here we simulate with a function that has an optimum
    score = (
        -10 * (np.log10(lr) + 3.0) ** 2    # optimum lr ~= 1e-3
        - 0.001 * (batch_size - 64) ** 2     # optimum batch ~= 64
        - 0.0001 * (hidden - 128) ** 2       # optimum hidden ~= 128
        + 95.0                                # max accuracy
        + np.random.randn() * 0.5            # noise
    )
    return max(0, min(100, score))

# --- Grid Search ---
print("=== Grid Search ===")
best_score, best_params = 0, {}
lr_options = [1e-4, 1e-3, 1e-2]
batch_options = [32, 64, 128]
hidden_options = [64, 128, 256]

trials = 0
for lr, bs, hid in product(lr_options, batch_options, hidden_options):
    score = train_and_evaluate(lr, bs, hid)
    trials += 1
    if score > best_score:
        best_score = score
        best_params = {'lr': lr, 'batch': bs, 'hidden': hid}

print(f"Grid: {trials} trials, best={best_score:.2f}%, params={best_params}")

# --- Random Search ---
print("\\n=== Random Search ===")
best_score, best_params = 0, {}
for i in range(27):  # same budget as grid
    lr  = 10 ** np.random.uniform(-4, -1)
    bs  = int(2 ** np.random.uniform(4, 8))     # 16 to 256
    hid = int(2 ** np.random.uniform(5, 9))      # 32 to 512
    score = train_and_evaluate(lr, bs, hid)
    if score > best_score:
        best_score = score
        best_params = {'lr': f'{lr:.5f}', 'batch': bs, 'hidden': hid}

print(f"Random: 27 trials, best={best_score:.2f}%, params={best_params}")` },

            { type: 'heading', level: 3, text: 'Practical Tuning Tips', id: 'tuning-tips' },
            { type: 'list', ordered: true, items: [
              'Start with published defaults (Adam lr=1e-3, batch=32, dropout=0.1)',
              'Tune learning rate first — it has the biggest impact',
              'Use random search over grid search — more efficient for 3+ hyperparameters',
              'Use a learning rate finder: increase lr exponentially, plot loss, pick the steepest descent',
              'Monitor validation loss for early stopping — stop training when it starts rising',
              'Use cross-validation for robust estimates, especially with small datasets',
            ]},

            { type: 'callout', variant: 'note', html: 'For production systems, consider automated tools like <strong>Optuna</strong> (Bayesian optimization), <strong>Ray Tune</strong> (distributed tuning), or <strong>W&B Sweeps</strong> (experiment tracking + tuning combined).' },

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'tuning-takeaways' },
            { type: 'list', ordered: true, items: [
              'Hyperparameters control how the model learns — learning rate is the most critical',
              'Grid search is exhaustive but scales poorly; random search is more efficient',
              'Bayesian optimization learns from past trials to find optimal values faster',
              'Start with established defaults, then tune the most impactful hyperparameters first',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 15. Model Evaluation
        // ──────────────────────────────────────────────────────────
        {
          slug: 'model-evaluation',
          title: 'Model Evaluation & Metrics',
          description: 'ROC curves, AUC, cross-validation, overfitting vs underfitting, and choosing the right evaluation metrics.',
          keywords: ['roc curve', 'auc', 'cross-validation', 'overfitting', 'underfitting', 'evaluation metrics'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          prerequisites: ['classification-regression'],
          content: [
            { type: 'heading', level: 2, text: 'Why Evaluation Matters', id: 'why-evaluation' },
            { type: 'paragraph', html: 'A model that gets 99% accuracy on training data might perform terribly in production. Proper evaluation tells you how the model will perform on <strong>unseen data</strong> — which is all that matters in the real world. Choosing the right metric depends on your problem and what errors cost you.' },

            { type: 'heading', level: 3, text: 'Classification Metrics', id: 'classification-metrics' },
            { type: 'table', headers: ['Metric', 'Formula', 'Range', 'When to Use'], rows: [
              ['<strong>Accuracy</strong>', '(TP+TN) / Total', '0-1', 'Balanced classes only'],
              ['<strong>Precision</strong>', 'TP / (TP+FP)', '0-1', 'When FP are costly (spam → inbox)'],
              ['<strong>Recall (Sensitivity)</strong>', 'TP / (TP+FN)', '0-1', 'When FN are costly (missed cancer)'],
              ['<strong>F1 Score</strong>', '2×P×R / (P+R)', '0-1', 'Balance precision & recall'],
              ['<strong>Specificity</strong>', 'TN / (TN+FP)', '0-1', 'True negative rate'],
              ['<strong>AUC-ROC</strong>', 'Area under ROC curve', '0-1', 'Overall model quality, threshold-independent'],
            ]},

            { type: 'heading', level: 3, text: 'The ROC Curve', id: 'roc-curve' },
            { type: 'paragraph', html: 'The <strong>ROC (Receiver Operating Characteristic)</strong> curve plots True Positive Rate vs False Positive Rate at every classification threshold. <strong>AUC (Area Under Curve)</strong> summarizes this into a single number — 1.0 is perfect, 0.5 is random guessing.' },
            { type: 'list', ordered: false, items: [
              '<strong>AUC = 1.0:</strong> Perfect model — separates classes completely',
              '<strong>AUC = 0.9:</strong> Excellent — strong discrimination',
              '<strong>AUC = 0.7-0.8:</strong> Fair — reasonable performance',
              '<strong>AUC = 0.5:</strong> No discrimination — random coin flip',
            ]},
            { type: 'callout', variant: 'tip', html: 'Use AUC-ROC when you need a threshold-independent measure of model quality. Use F1 when you care about a specific threshold and want to balance precision and recall.' },

            { type: 'heading', level: 3, text: 'Regression Metrics', id: 'regression-metrics' },
            { type: 'table', headers: ['Metric', 'Formula', 'Interpretation'], rows: [
              ['<strong>MSE</strong>', '(1/n) Σ(ŷ-y)²', 'Average squared error — penalizes large errors'],
              ['<strong>RMSE</strong>', '√MSE', 'Same units as target — more interpretable'],
              ['<strong>MAE</strong>', '(1/n) Σ|ŷ-y|', 'Average absolute error — robust to outliers'],
              ['<strong>R² Score</strong>', '1 - SS_res/SS_tot', 'Fraction of variance explained (1.0 = perfect)'],
            ]},

            { type: 'heading', level: 3, text: 'Overfitting vs Underfitting', id: 'overfit-underfit' },
            { type: 'paragraph', html: 'The goal is a model that generalizes well — performing similarly on training and test data.' },
            { type: 'comparison', left: { title: 'Underfitting', color: '#6366f1', items: [
              'Model too simple to capture patterns',
              'High training error AND high test error',
              'Symptom: training loss plateaus high',
              'Fix: more capacity (layers, neurons), more features, train longer',
            ]}, right: { title: 'Overfitting', color: '#ef4444', items: [
              'Model memorizes training data instead of learning patterns',
              'Low training error BUT high test error',
              'Symptom: training loss drops, validation loss rises',
              'Fix: more data, dropout, regularization, early stopping',
            ]}},

            { type: 'heading', level: 3, text: 'Cross-Validation', id: 'cross-validation' },
            { type: 'paragraph', html: '<strong>K-fold cross-validation</strong> gives a more robust estimate of model performance. Instead of a single train/test split, it rotates through K different splits and averages the results.' },
            { type: 'flow', steps: [
              { label: 'Split Data', desc: 'Divide into K equal folds (e.g., K=5)', color: '#6366f1' },
              { label: 'Fold 1 as Test', desc: 'Train on folds 2-5, test on fold 1', color: '#8b5cf6' },
              { label: 'Fold 2 as Test', desc: 'Train on folds 1,3-5, test on fold 2', color: '#a855f7' },
              { label: '... Repeat K times', desc: 'Each fold gets a turn as test set', color: '#f59e0b' },
              { label: 'Average Scores', desc: 'Mean ± std of K evaluations', color: '#22c55e' },
            ]},
            { type: 'callout', variant: 'note', html: '5-fold or 10-fold cross-validation is standard. Use <strong>stratified</strong> K-fold for classification to maintain class proportions in each fold. Leave-one-out (K=N) is for tiny datasets.' },

            { type: 'heading', level: 3, text: 'Training vs Test Accuracy', id: 'train-vs-test' },
            { type: 'table', headers: ['Scenario', 'Train Accuracy', 'Test Accuracy', 'Diagnosis', 'Action'], rows: [
              ['Good fit', '92%', '90%', 'Healthy generalization', 'Deploy!'],
              ['Overfitting', '99%', '75%', 'Memorizing training data', 'Add regularization, get more data'],
              ['Underfitting', '65%', '63%', 'Model too simple', 'More capacity, better features'],
              ['Data leakage', '99%', '99%', 'Test data leaked into training', 'Check preprocessing pipeline!'],
            ]},

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'eval-takeaways' },
            { type: 'list', ordered: true, items: [
              'Choose metrics based on your problem — accuracy is misleading with imbalanced data',
              'AUC-ROC is threshold-independent; F1 balances precision and recall at a specific threshold',
              'Overfitting: low train error, high test error — fix with regularization or more data',
              'Cross-validation gives robust estimates by averaging over K different train/test splits',
              'Always compare training vs test performance to diagnose model health',
            ]},
          ],
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ],
};

export default category;
