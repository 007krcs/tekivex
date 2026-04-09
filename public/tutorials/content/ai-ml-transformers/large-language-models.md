## What Are Large Language Models?

Large Language Models (LLMs) like GPT-4 and Claude are <strong>decoder-only Transformers</strong> trained on massive text corpora. Their fundamental capability is surprisingly simple: <strong>predict the next token</strong>. Yet from this simple objective, they develop reasoning, coding, translation, and creative abilities.

<div class="callout callout-note">

An LLM doesn't "understand" language the way humans do. It has learned statistical patterns from trillions of words. But these patterns are so rich and deep that the model can generate coherent text, answer questions, write code, and even reason about novel problems.

</div>

### The LLM Pipeline

<div class="flow-steps">

**Input Text** — "The capital of France is"

**Tokenizer** — Split into tokens: ["The", " capital", " of", " France", " is"]

**Embeddings** — Convert tokens to dense vectors

**N Transformer Blocks** — Self-attention + FFN × 96 layers

**Logits** — Score for every token in vocabulary

**Sampling** — Select next token ("Paris")

</div>

### Tokenization

LLMs don't work with raw characters or whole words. They use <strong>subword tokenization</strong> (like BPE — Byte Pair Encoding) that splits text into meaningful chunks. Common words are single tokens; rare words are broken into subwords.

| Text | Tokens | Token Count |
| --- | --- | --- |
| "Hello world" | ["Hello", " world"] | 2 |
| "unbelievable" | ["un", "believ", "able"] | 3 |
| "GPT-4 is great!" | ["G", "PT", "-", "4", " is", " great", "!"] | 7 |
| "こんにちは" | ["こん", "にち", "は"] | 3 |

<div class="callout callout-tip">

Typical LLM vocabulary sizes: GPT-4 has ~100,000 tokens. Each token is roughly 3-4 characters in English. This balance lets the model handle any text while keeping sequence lengths manageable.

</div>

### Next-Token Prediction

The training objective is deceptively simple: given all previous tokens, predict the next one. The model outputs a probability distribution over its entire vocabulary, and the loss function (cross-entropy) pushes the model to assign high probability to the correct next token.

During inference, the model generates text one token at a time in an <strong>autoregressive</strong> loop: predict token → append to input → predict next token → repeat.

### Sampling Strategies

When the model outputs logits (scores for each token), we need to choose which token to actually generate. Different sampling strategies control the creativity and randomness of the output:

| Strategy | How It Works | Effect |
| --- | --- | --- |
| <strong>Greedy</strong> | Always pick the highest probability token | Deterministic, repetitive, boring |
| <strong>Temperature</strong> | Divide logits by T before softmax | T < 1: sharper (more focused); T > 1: flatter (more random) |
| <strong>Top-k</strong> | Only consider the top k tokens | k=10: choose from 10 best candidates |
| <strong>Top-p (Nucleus)</strong> | Consider tokens until cumulative prob ≥ p | p=0.9: dynamic number of candidates, covers 90% probability mass |

<div class="callout callout-tip">

<strong>Rule of thumb:</strong> Temperature 0.0-0.3 for factual/code tasks (focused). Temperature 0.7-1.0 for creative writing (varied). Top-p of 0.9-0.95 is a good default for most use cases.

</div>

### Scale and Emergent Abilities

LLMs exhibit <strong>emergent abilities</strong> — capabilities that appear suddenly at certain scales. A model with 1B parameters can't do arithmetic, but at 100B+ parameters, it suddenly can. These emergent behaviors include:

- <strong>In-context learning:</strong> Learning from examples in the prompt without weight updates
- <strong>Chain-of-thought reasoning:</strong> Step-by-step logical reasoning
- <strong>Code generation:</strong> Writing and debugging functional code
- <strong>Translation:</strong> Translating between languages not explicitly paired in training
- <strong>Instruction following:</strong> Understanding and executing complex natural language instructions

### Key Takeaways

1. LLMs are decoder-only Transformers trained on next-token prediction
2. Tokenization converts text to subword tokens (BPE) — roughly 3-4 chars each
3. Generation is autoregressive: predict one token, append, repeat
4. Temperature, top-k, and top-p control the randomness of generated text
5. Emergent abilities appear at large scales — in-context learning, reasoning, coding

