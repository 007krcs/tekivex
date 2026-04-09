## Transfer Learning — Standing on Giants' Shoulders

Training an LLM from scratch costs millions of dollars and months of GPU time. <strong>Transfer learning</strong> lets you take a pre-trained model that already understands language and adapt it to your specific task — often with a small dataset and a fraction of the cost.

<div class="callout callout-tip">

<strong>Analogy:</strong> It's like hiring a multilingual expert and teaching them your company's jargon. You don't need to teach them the entire language — just the specialized vocabulary and patterns for your domain.

</div>

### Pre-Training vs Fine-Tuning

<div class="flow-steps">

**Massive Dataset** — Trillions of tokens from the internet

**Pre-Train** — Learn general language understanding

**Base Model** — Large, general-purpose foundation

**Task Dataset** — Small, domain-specific examples

**Fine-Tune** — Adapt to specific task/domain

**Specialized Model** — Optimized for your use case

</div>

| Aspect | Pre-Training | Fine-Tuning |
| --- | --- | --- |
| Data | Trillions of tokens (generic) | Thousands to millions (task-specific) |
| Cost | $1M - $100M+ | $10 - $10,000 |
| Time | Weeks to months | Hours to days |
| Hardware | 1000s of GPUs/TPUs | 1-8 GPUs |
| Goal | Learn general language patterns | Adapt to specific task or domain |

### Types of Fine-Tuning

- <strong>Full Fine-Tuning:</strong> Update all model parameters — most expressive but expensive and risks catastrophic forgetting
- <strong>Feature Extraction:</strong> Freeze all layers, only train a new head — cheapest but least adaptable
- <strong>PEFT (Parameter-Efficient Fine-Tuning):</strong> Update only a small subset of parameters — best balance of cost and performance

### LoRA — Low-Rank Adaptation

<strong>LoRA</strong> is the most popular PEFT method. Instead of updating the full weight matrix W (millions of params), it adds two small matrices A and B such that the update is ΔW = A × B. This reduces trainable parameters by 100-1000×.

```python title="lora_concept.py"
# Conceptual LoRA implementation
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
# LoRA:   65,536 params (0.4% of original!)
```

### QLoRA — Quantized LoRA

<strong>QLoRA</strong> goes further: it quantizes the frozen model to 4-bit precision (reducing memory by 4×) while keeping LoRA adapters in full precision. This lets you fine-tune a 65B parameter model on a single 48GB GPU.

<div class="callout callout-note">

QLoRA makes fine-tuning accessible to everyone. A model that would normally need 8× A100 GPUs ($200K+ hardware) can be fine-tuned on a single consumer GPU with QLoRA.

</div>

### Fine-Tuning vs Prompt Engineering

Not every problem needs fine-tuning. Often, clever prompting can achieve similar results at zero cost:

<div class="comparison-card">
<div class="comparison-side">

**When to Fine-Tune**

- Domain-specific knowledge (medical, legal)
- Consistent output format/style needed
- Large volume of similar tasks
- Latency-sensitive — smaller fine-tuned model
- Task requires specialized behavior

</div>
<div class="comparison-side">

**When to Prompt Engineer**

- General-purpose tasks
- Few examples needed (few-shot learning)
- Rapid prototyping and iteration
- No training infrastructure available
- Task can be well-specified in instructions

</div>
</div>

### PEFT Methods Comparison

| Method | Trainable Params | Memory | Performance | Complexity |
| --- | --- | --- | --- | --- |
| Full Fine-Tuning | 100% | Very High | Best (with enough data) | Medium |
| LoRA | 0.1-1% | Low | Near full fine-tuning | Low |
| QLoRA | 0.1-1% | Very Low | Near LoRA | Medium |
| Prefix Tuning | <0.1% | Very Low | Good for generation | Low |
| Adapters | 1-5% | Low | Good across tasks | Medium |

### Key Takeaways

1. Transfer learning adapts pre-trained models to specific tasks — saving time and money
2. LoRA adds small trainable matrices instead of updating all weights (0.1-1% of params)
3. QLoRA quantizes frozen weights to 4-bit, enabling fine-tuning on consumer GPUs
4. Fine-tune for domain expertise and consistent behavior; prompt engineer for general tasks
5. PEFT methods give near-full fine-tuning performance at a fraction of the cost

