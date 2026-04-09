## What Makes a Model "Large"?

A **Large Language Model (LLM)** is a transformer-based neural network trained on massive text corpora with billions of parameters.

| Model | Params | Training Tokens | Release |
| --- | --- | --- | --- |
| GPT-2 | 1.5B | 40B tokens | 2019 (OpenAI) |
| GPT-3 | 175B | 300B tokens | 2020 (OpenAI) |
| LLaMA-2 | 70B | 2T tokens | 2023 (Meta) |
| GPT-4 | ~1.8T (MoE) | Unknown | 2023 (OpenAI) |
| Claude 3 Opus | Unknown | Unknown | 2024 (Anthropic) |
| LLaMA-3.1 | 405B | 15T tokens | 2024 (Meta) |

### How LLMs Are Trained

**Flow:**

1. **Pre-training** — Next-token prediction on internet-scale text
2. **SFT** — Supervised fine-tuning on instruction pairs
3. **RLHF** — Reward model + PPO to align with human values
4. **Deployed Model** — Helpful, harmless, honest assistant


| Concept | Description |
| --- | --- |
| Context Window | Maximum number of tokens the model can process at once (4K → 1M+) |
| Temperature | Randomness in generation (0 = deterministic, 1 = creative) |
| Top-p Sampling | Sample from top p% probability mass — controls diversity |
| Hallucination | Model confidently generates plausible but false information |
| In-Context Learning | Adapts to new tasks from examples in the prompt without retraining |

> **NOTE:** **Scaling Laws (Chinchilla):** DeepMind's 2022 paper showed optimal training requires ~20 tokens per parameter. A 70B model should train on 1.4T tokens.
