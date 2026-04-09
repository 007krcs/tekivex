## Understanding Tokens

LLMs process **tokens** — roughly 4 characters or 0.75 words in English. The word "unbelievable" is one token; "ChatGPT is great!" is 6 tokens.

<!-- title: count_tokens.py -->
```python
import tiktoken

enc = tiktoken.encoding_for_model("gpt-4o")
texts = [
    "Hello, world!",
    "Machine learning is fascinating.",
    "The quick brown fox jumps over the lazy dog",
]
for text in texts:
    print(f"{len(enc.encode(text)):3} tokens | {text}")

def estimate_cost(texts: list[str], model: str = "gpt-4o") -> dict:
    enc = tiktoken.encoding_for_model(model)
    total = sum(len(enc.encode(t)) for t in texts)
    cost = (total / 1_000_000) * 5.0   # GPT-4o: $5/1M input tokens
    return {"total_tokens": total, "estimated_cost_usd": round(cost, 6)}

print(estimate_cost(["Summarize this document..."] * 1000))
```

| Model | Input (per 1M tokens) | Output (per 1M tokens) | Context |
| --- | --- | --- | --- |
| gpt-4o | $5.00 | $15.00 | 128K |
| gpt-4o-mini | $0.15 | $0.60 | 128K |
| claude-3-5-sonnet | $3.00 | $15.00 | 200K |
| claude-3-haiku | $0.25 | $1.25 | 200K |
