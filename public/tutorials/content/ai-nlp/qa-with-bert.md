## How BERT Does QA

BERT approaches QA as **span extraction**: given a question and context paragraph, it predicts the start and end token positions of the answer within the context.

**Flow:**

1. **[CLS] Q [SEP]** — Encode question
2. **Context [SEP]** — Encode passage
3. **BERT** — Compute token representations
4. **Start/End Logits** — Score each token as start or end
5. **Span** — Extract answer tokens


<!-- title: bert_qa.py -->
```python
from transformers import pipeline, AutoTokenizer, AutoModelForQuestionAnswering
import torch

# Pipeline (easiest)
qa_pipeline = pipeline("question-answering", model="deepset/roberta-base-squad2")

context = """
The Amazon River is the largest river by discharge volume.
It flows through Brazil, Peru, and Colombia, approximately 6,400 km long.
"""

questions = ["How long is the Amazon River?", "Which countries does the Amazon flow through?"]
for q in questions:
    result = qa_pipeline(question=q, context=context)
    print(f"Q: {q}")
    print(f"A: {result['answer']} (score: {result['score']:.3f})\n")

# Manual span extraction
model_name = "deepset/bert-base-cased-squad2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForQuestionAnswering.from_pretrained(model_name)

def extract_answer(question: str, context: str) -> str:
    inputs = tokenizer(question, context, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    start_idx = torch.argmax(outputs.start_logits)
    end_idx   = torch.argmax(outputs.end_logits) + 1
    return tokenizer.decode(inputs["input_ids"][0][start_idx:end_idx], skip_special_tokens=True)

print(extract_answer("What is the length of the Amazon?", context))
```
