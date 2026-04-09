## What is XLNet?

XLNet uses **permutation language modelling** — it trains on all possible orderings of the input, capturing bidirectional context without BERT's masking mismatch.

| BERT | XLNet |
| --- | --- |
| Masked Language Modelling (MLM) | Permutation Language Modelling |
| [MASK] token mismatch at inference | No train/inference mismatch |
| Better: NER, QA, span tasks | Better: classification, long-doc tasks |

<!-- title: xlnet_classification.py -->
```python
from transformers import XLNetTokenizer, XLNetForSequenceClassification, TrainingArguments, Trainer
from datasets import load_dataset
import torch

model_name = "xlnet-base-cased"
tokenizer = XLNetTokenizer.from_pretrained(model_name)
model = XLNetForSequenceClassification.from_pretrained(model_name, num_labels=2)

dataset = load_dataset("glue", "sst2")

def tokenize(batch):
    return tokenizer(batch["sentence"], padding="max_length", truncation=True, max_length=128)

tokenized = dataset.map(tokenize, batched=True)
tokenized = tokenized.rename_column("label", "labels")
tokenized.set_format("torch", columns=["input_ids", "attention_mask", "token_type_ids", "labels"])

Trainer(
    model=model,
    args=TrainingArguments(
        output_dir="xlnet-sst2",
        num_train_epochs=3,
        per_device_train_batch_size=8,
        learning_rate=2e-5,
        evaluation_strategy="epoch",
        fp16=torch.cuda.is_available(),
    ),
    train_dataset=tokenized["train"].select(range(1000)),
    eval_dataset=tokenized["validation"],
).train()
```
