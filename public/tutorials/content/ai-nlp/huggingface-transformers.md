## The HuggingFace Ecosystem

HuggingFace provides a unified API to load and use 500,000+ pre-trained models for NLP, vision, audio, and multimodal tasks — with just a few lines of code.

<!-- title: hf_pipeline.py -->
```python
from transformers import pipeline

# Sentiment analysis
classifier = pipeline("sentiment-analysis")
print(classifier("HuggingFace is absolutely amazing!"))
# [{'label': 'POSITIVE', 'score': 0.9999}]

# Zero-shot classification
zero_shot = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
result = zero_shot(
    "The new iPhone has an incredible camera.",
    candidate_labels=["technology", "sports", "politics"],
)
print(result['labels'][0])  # technology

# NER
ner = pipeline("ner", aggregation_strategy="simple")
entities = ner("Elon Musk founded SpaceX in Hawthorne, California.")
for e in entities:
    print(f"{e['word']:15} {e['entity_group']:8} ({e['score']:.3f})")

# Summarization
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
text = "The Amazon rainforest covers 5.5 million km2 in South America..."
print(summarizer(text, max_length=60, min_length=20)[0]['summary_text'])
```

<!-- title: fine_tune.py -->
```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification, TrainingArguments, Trainer
from datasets import load_dataset
import numpy as np
from sklearn.metrics import accuracy_score

model_name = "distilbert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=2)

dataset = load_dataset("imdb")

def tokenize(batch):
    return tokenizer(batch["text"], truncation=True, padding="max_length", max_length=256)

tokenized = dataset.map(tokenize, batched=True)

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    return {"accuracy": accuracy_score(labels, np.argmax(logits, axis=-1))}

args = TrainingArguments(
    output_dir="./distilbert-imdb",
    num_train_epochs=3,
    per_device_train_batch_size=16,
    learning_rate=2e-5,
    evaluation_strategy="epoch",
    fp16=True,
)

Trainer(
    model=model, args=args,
    train_dataset=tokenized["train"].select(range(2000)),
    eval_dataset=tokenized["test"].select(range(500)),
    compute_metrics=compute_metrics,
).train()
```
