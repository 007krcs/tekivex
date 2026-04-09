## Planning Your LLM Application

1. **Define the task precisely:** e.g., "Summarize support tickets into one sentence with priority label HIGH/MEDIUM/LOW"
2. **Write success criteria first:** "95% of summaries rated ≥4/5 by human reviewer"
3. **Build evaluation set before prompting:** 50–200 examples with expected outputs
4. **Estimate cost and latency:** tokens × price × volume = monthly budget
5. **Identify failure modes:** What happens when model refuses? Gets priority wrong? Produces gibberish?
6. **Choose the right model tier:** Simple tasks → gpt-4o-mini ($0.15/1M); complex → gpt-4o ($5/1M)

<!-- title: cost_estimator.py -->
```python
import tiktoken

def estimate_monthly_cost(system_prompt: str, avg_user_msg: str,
                           avg_output_tokens: int, requests_per_day: int,
                           model: str = "gpt-4o-mini") -> dict:
    enc = tiktoken.encoding_for_model("gpt-4o")
    input_per_req  = len(enc.encode(system_prompt)) + len(enc.encode(avg_user_msg))
    monthly_reqs   = requests_per_day * 30
    monthly_input  = monthly_reqs * input_per_req
    monthly_output = monthly_reqs * avg_output_tokens

    pricing = {
        "gpt-4o-mini": {"input": 0.15, "output": 0.60},
        "gpt-4o":      {"input": 5.00, "output": 15.00},
    }
    p = pricing.get(model, pricing["gpt-4o-mini"])
    cost = monthly_input / 1e6 * p["input"] + monthly_output / 1e6 * p["output"]
    return {"model": model, "monthly_requests": monthly_reqs, "estimated_cost_usd": round(cost, 2)}

print(estimate_monthly_cost(
    system_prompt="You are a customer support analyst...",
    avg_user_msg="Customer: I can't log into my account...",
    avg_output_tokens=50, requests_per_day=500,
))
```
