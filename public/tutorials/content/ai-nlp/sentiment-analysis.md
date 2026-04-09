## Sentiment Analysis Approaches

| Approach | How It Works | Pros | Cons |
| --- | --- | --- | --- |
| Lexicon-based (VADER) | Pre-built word sentiment scores | No training needed, fast | Misses context and sarcasm |
| ML Classifier | Trained Naive Bayes / SVM | Learns domain patterns | Needs labeled training data |
| Deep Learning (BERT) | Fine-tuned transformer model | State-of-the-art accuracy | Compute intensive |

<!-- title: sentiment.py -->
```python
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from transformers import pipeline
import nltk

nltk.download('vader_lexicon', quiet=True)
sia = SentimentIntensityAnalyzer()

reviews = [
    "This product is absolutely amazing!",
    "Terrible quality. Broke after 2 days.",
    "It's okay I guess. Nothing special.",
]

# VADER (fast, rule-based)
for review in reviews:
    scores = sia.polarity_scores(review)
    label = ("POSITIVE" if scores['compound'] >= 0.05
             else "NEGATIVE" if scores['compound'] <= -0.05 else "NEUTRAL")
    print(f"[{label}] {scores['compound']:+.3f} | {review}")

# Transformer (accurate, context-aware)
classifier = pipeline("sentiment-analysis")
results = classifier(reviews)
for review, r in zip(reviews, results):
    print(f"{r['label']} ({r['score']:.3f}) → {review[:50]}")
```
