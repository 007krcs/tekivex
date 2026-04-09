## The Architecture That Changed AI

The Transformer, introduced in the landmark 2017 paper, replaced recurrence entirely with <strong>attention</strong>. It processes entire sequences in parallel, enabling massive speedups and paving the way for GPT, BERT, Claude, and every modern LLM. The key insight: you don't need recurrence or convolution — attention is all you need.

### High-Level Architecture

The original Transformer has two halves: an <strong>Encoder</strong> (understands input) and a <strong>Decoder</strong> (generates output). Modern models often use only one: BERT uses the encoder; GPT/Claude use the decoder.

<div class="flow-steps">

**Input Tokens** — Tokenized text sequence

**Embedding + Position** — Token embedding + positional encoding

**Multi-Head Attention** — Multiple parallel attention heads

**Add & Norm** — Residual connection + layer norm

**Feed-Forward** — Two linear layers with ReLU

**Add & Norm** — Residual connection + layer norm

**Output** — Contextualized representations

</div>

### Positional Encoding

Since Transformers process all tokens simultaneously (no sequential order), they need a way to know <em>where</em> each token is in the sequence. <strong>Positional encodings</strong> are vectors added to token embeddings that encode position information using sine and cosine waves of different frequencies.

<div class="callout callout-tip">

<strong>Analogy:</strong> Positional encoding is like adding a "seat number" to each guest at a dinner table. Without it, the model would see a bag of words with no order — "dog bites man" and "man bites dog" would look identical.

</div>

```python title="positional_encoding.py"
import numpy as np

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
print("Position 5:", np.round(pe[5], 3))
```

### Multi-Head Attention

Instead of performing one attention operation, the Transformer runs <strong>multiple attention heads in parallel</strong>. Each head learns to focus on different relationships — one might attend to syntax, another to semantics, another to coreference. Their outputs are concatenated and projected.

1. Split Q, K, V into <code>h</code> heads (e.g., 8 or 12)
2. Each head performs scaled dot-product attention independently
3. Concatenate all head outputs
4. Project through a final linear layer to get the output

<div class="callout callout-note">

With 8 heads and d_model=512, each head operates on d_k=64 dimensions. This is more expressive than a single head with 512 dimensions because different heads can capture different types of relationships.

</div>

### Feed-Forward Network

After attention, each position passes through a <strong>feed-forward network</strong> (FFN) — two linear layers with a ReLU activation. This processes each position independently and adds non-linearity. The inner dimension is typically 4× the model dimension (e.g., 2048 for d_model=512).

### Residual Connections & Layer Normalization

Two critical techniques make deep Transformers trainable:

- <strong>Residual Connections:</strong> output = layer(x) + x — lets gradients flow directly through the network, preventing vanishing gradients
- <strong>Layer Normalization:</strong> Normalizes activations to have zero mean and unit variance, stabilizing training

### Encoder vs Decoder

<div class="comparison-card">
<div class="comparison-side">

**Encoder (BERT-style)**

- Bidirectional — sees full input
- Self-attention attends to all positions
- Used for understanding (classification, NER)
- Examples: BERT, RoBERTa, DeBERTa

</div>
<div class="comparison-side">

**Decoder (GPT-style)**

- Autoregressive — sees only past tokens
- Causal mask prevents looking ahead
- Used for generation (text, code)
- Examples: GPT-4, Claude, LLaMA

</div>
</div>

### Transformer vs RNN

| Aspect | Transformer | RNN/LSTM |
| --- | --- | --- |
| Parallelism | Fully parallel (all tokens at once) | Sequential (one token at a time) |
| Long-range deps | Direct attention to any position | Decays with distance |
| Training speed | Much faster (GPU-friendly) | Slower (sequential bottleneck) |
| Memory | O(n²) for sequence length n | O(n) — more memory-efficient |
| Inductive bias | None — must learn everything from data | Sequential bias built in |

### Key Takeaways

1. Transformers replace recurrence with self-attention — processing all tokens in parallel
2. Positional encodings inject sequence order information into the model
3. Multi-head attention lets the model focus on different relationship types simultaneously
4. Residual connections + layer norm make deep stacking possible
5. Encoder = bidirectional understanding; Decoder = autoregressive generation

