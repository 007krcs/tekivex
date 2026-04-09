## The GPT Evolution

| Version | Year | Params | Key Innovation |
| --- | --- | --- | --- |
| GPT-1 | 2018 | 117M | Pre-train then fine-tune paradigm established |
| GPT-2 | 2019 | 1.5B | Zero-shot transfer — works on unseen tasks |
| GPT-3 | 2020 | 175B | Few-shot in-context learning |
| InstructGPT | 2022 | 175B | RLHF — human feedback alignment |
| ChatGPT | 2022 | ~175B | Conversational RLHF fine-tuning |
| GPT-4 | 2023 | ~1.8T MoE | Multimodal, advanced reasoning, 128K context |

### RLHF — Making GPT Helpful

**Flow:**

1. **SFT** — Fine-tune on human demonstrations
2. **Reward Model** — Train to predict human preference
3. **PPO** — RL optimizes model against reward model
4. **Aligned Model** — Helpful, harmless, honest


<!-- title: openai_gpt.py -->
```python
from openai import OpenAI

client = OpenAI()

# Basic chat completion
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a concise Python expert."},
        {"role": "user",   "content": "Explain list comprehensions in 3 sentences."},
    ],
    temperature=0.3,
    max_tokens=200,
)
print(response.choices[0].message.content)

# Streaming
stream = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Count from 1 to 5."}],
    stream=True,
)
for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```
