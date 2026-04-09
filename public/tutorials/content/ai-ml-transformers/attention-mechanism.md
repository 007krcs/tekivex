## What is Attention?

Attention is a mechanism that lets a model focus on the <strong>most relevant parts</strong> of its input when making predictions. Instead of compressing an entire sequence into one fixed-size hidden state (like RNNs), attention allows the model to look back at all input positions and weigh their importance dynamically.

<div class="callout callout-tip">

<strong>Analogy:</strong> Imagine you're in a library looking for information about climate change. Instead of reading every book from cover to cover (RNN), you scan the index, find the relevant chapters, and focus your attention there. That's what attention does — it lets the model "look up" the most relevant pieces of information.

</div>

### Query, Key, Value — The Core Concept

Attention works like a search engine. Each element in the sequence is transformed into three vectors:

- <strong>Query (Q):</strong> "What am I looking for?" — the current word's question
- <strong>Key (K):</strong> "What do I contain?" — each word's label/descriptor
- <strong>Value (V):</strong> "What information do I hold?" — the actual content to retrieve

The attention score between two words is the dot product of the query and key. High score = high relevance. These scores are used to create a weighted sum of the values.

### Scaled Dot-Product Attention

<div class="flow-steps">

**Input Embeddings** — Each token has an embedding vector

**Compute Q, K, V** — Multiply by learned weight matrices

**Attention Scores** — Q × K^T / √d_k (dot product)

**Softmax** — Normalize scores to probabilities

**Weighted Sum** — Multiply attention weights × V

**Output** — Context-aware representation

</div>

<div class="callout callout-note">

We divide by <code>√d_k</code> (square root of key dimension) to prevent dot products from growing too large, which would push softmax into regions with tiny gradients. This is the "scaled" in "scaled dot-product attention."

</div>

### Self-Attention Example

Consider the sentence: "The cat sat on the mat because <strong>it</strong> was soft." When processing the word "it," self-attention computes how much each other word relates to "it." The word "mat" gets a high attention score because "it" refers to the mat.

| Word | Attention Score for "it" | Interpretation |
| --- | --- | --- |
| The | 0.02 | Not very relevant |
| cat | 0.08 | Could be the referent |
| sat | 0.03 | Action, not a referent |
| on | 0.01 | Preposition, irrelevant |
| the | 0.01 | Article, irrelevant |
| <strong>mat</strong> | <strong>0.72</strong> | Most likely referent — "it" = mat |
| because | 0.03 | Conjunction |
| it | 0.05 | Self-reference |
| was | 0.03 | Verb |
| soft | 0.02 | Adjective describing mat |

### Attention Implementation

```python title="attention.py"
import numpy as np

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
print(f"\nOutput shape: {output.shape}")  # (4, 8) — context-aware embeddings
```

### Why Attention Changed Everything

<div class="comparison-card">
<div class="comparison-side">

**Without Attention (RNN)**

- Processes tokens sequentially
- Information bottleneck — fixed-size hidden state
- Struggles with long-range dependencies
- Cannot parallelize across time steps

</div>
<div class="comparison-side">

**With Attention (Transformer)**

- Processes all tokens simultaneously
- No bottleneck — attends directly to any position
- Handles long-range dependencies naturally
- Fully parallelizable — much faster training

</div>
</div>

### Key Takeaways

1. Attention lets models focus on relevant parts of the input dynamically
2. Q (query), K (key), V (value) are projections of input embeddings
3. Attention score = dot product of Q and K, normalized by √d_k, softmaxed
4. Self-attention allows every token to "look at" every other token in the sequence
5. This parallel, direct-access mechanism is why Transformers outperform RNNs

