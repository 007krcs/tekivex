## Advanced Prompt Engineering

| Technique | When to Use | Example |
| --- | --- | --- |
| Zero-shot | Simple, well-defined tasks | "Classify this email as spam or not spam." |
| Few-shot | Complex or domain-specific tasks | 3–5 examples of input → expected output |
| Chain-of-Thought | Multi-step reasoning, math, logic | "Think step by step before answering." |
| Self-Consistency | Reduce reasoning errors | Generate 5 answers, take majority vote |
| Structured Output | When output must be parsed by code | JSON schema + Pydantic parser |

<!-- title: prompt_testing.py -->
```python
from openai import OpenAI
import json

client = OpenAI()

eval_set = [
    {"input": "The product arrived broken and customer service was rude.",
     "expected": {"sentiment": "negative", "priority": "HIGH", "category": "complaint"}},
    {"input": "Love this product! Best purchase of the year.",
     "expected": {"sentiment": "positive", "priority": "LOW", "category": "praise"}},
    {"input": "I have a question about my order status.",
     "expected": {"sentiment": "neutral", "priority": "MEDIUM", "category": "inquiry"}},
]

prompts = {
    "v1_basic": "Analyze this customer message and return JSON with keys: sentiment, priority, category.",
    "v2_few_shot": """Analyze customer support messages. Return JSON only.
Examples:
Input: "Package never arrived!"
Output: {"sentiment":"negative","priority":"HIGH","category":"complaint"}
Input: "Thanks for the quick response!"
Output: {"sentiment":"positive","priority":"LOW","category":"praise"}
Now analyze:""",
}

def evaluate_prompt(name: str, system: str) -> float:
    correct = sum(
        1 for ex in eval_set
        if json.loads(client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "system", "content": system}, {"role": "user", "content": ex["input"]}],
            temperature=0, max_tokens=100,
        ).choices[0].message.content.strip()) == ex["expected"]
    )
    print(f"[{name}] {correct}/{len(eval_set)} correct")
    return correct / len(eval_set)

for name, prompt in prompts.items():
    evaluate_prompt(name, prompt)
```
