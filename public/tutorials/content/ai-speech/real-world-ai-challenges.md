## Hard Problems in Production LLM Systems

| Challenge | Description | Solutions |
| --- | --- | --- |
| Hallucination | Model invents plausible but false information | RAG, citations, fact-checking, constrained generation |
| Evaluation at Scale | Human review doesn't scale | LLM-as-judge, automated metrics, sampling + human review |
| Cost Explosion | Tokens add up fast | Caching, smaller models, prompt compression, batching |
| Latency | LLMs are slow (1–30 seconds) | Streaming, smaller models, speculative decoding |
| Prompt Injection | Malicious instructions in user content | Input sanitization, sandboxed context, validation |

<!-- title: llm_judge.py -->
```python
from openai import OpenAI
import json

client = OpenAI()

JUDGE_PROMPT = """Score the response 1-5. Return JSON: {{"score":<1-5>, "reasoning":"<brief>", "passed":<true if >=4>}}

Criteria: 5=Perfect, 4=Good, 3=Acceptable, 2=Poor, 1=Fail

Question: {question}
Expected: {expected}
Actual response: {response}"""

def judge(question: str, expected: str, response: str) -> dict:
    result = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": JUDGE_PROMPT.format(
            question=question, expected=expected, response=response
        )}],
        temperature=0, response_format={"type": "json_object"},
    )
    return json.loads(result.choices[0].message.content)

test_cases = [
    {"q": "What is RAG?", "expected": "Retrieval-Augmented Generation"},
    {"q": "Capital of France?", "expected": "Paris"},
]

for tc in test_cases:
    verdict = judge(tc["q"], tc["expected"], "Paris is the capital of France.")
    print(f"Score {verdict['score']}/5 | Passed: {verdict['passed']} | {verdict['reasoning']}")
```

> **TIP:** **Observability:** Use LangSmith or Weights & Biases Traces to log every LLM call — prompt, response, latency, token count, cost. You cannot improve what you cannot measure. Start logging from day 1.
