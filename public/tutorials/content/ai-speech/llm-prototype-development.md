## Production-Ready LLM Patterns

<!-- title: production_llm.py -->
```python
import asyncio, hashlib, json
from openai import AsyncOpenAI
from tenacity import retry, stop_after_attempt, wait_exponential
import tiktoken

client = AsyncOpenAI()
_cache: dict = {}

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=1, max=10))
async def call_llm(messages: list, model: str = "gpt-4o-mini", **kwargs) -> str:
    response = await client.chat.completions.create(model=model, messages=messages, **kwargs)
    return response.choices[0].message.content

async def cached_call(messages: list, model: str = "gpt-4o-mini", temperature: float = 0.0) -> str:
    if temperature > 0:
        return await call_llm(messages, model, temperature=temperature)
    key = hashlib.sha256(json.dumps({"messages": messages, "model": model}, sort_keys=True).encode()).hexdigest()
    if key not in _cache:
        _cache[key] = await call_llm(messages, model, temperature=temperature)
    return _cache[key]

def enforce_token_budget(messages: list, max_tokens: int = 3000) -> list:
    enc = tiktoken.encoding_for_model("gpt-4o")
    system = [m for m in messages if m["role"] == "system"]
    convo  = [m for m in messages if m["role"] != "system"]
    while convo:
        total = sum(len(enc.encode(m["content"])) for m in system + convo)
        if total <= max_tokens: break
        convo = convo[2:]  # drop oldest pair
    return system + convo

async def process_batch(items: list[str], system: str) -> list[str]:
    sem = asyncio.Semaphore(10)
    async def one(item):
        async with sem:
            return await cached_call([{"role": "system", "content": system}, {"role": "user", "content": item}])
    return list(await asyncio.gather(*[one(i) for i in items], return_exceptions=True))
```
