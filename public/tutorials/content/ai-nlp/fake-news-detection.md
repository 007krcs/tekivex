## Fake News Detection Project

Fake news detection is a real-world binary classification problem. The task: given a news article or headline, classify it as **REAL** or **FAKE**.

<!-- title: fake_news_detection.py -->
```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

# Load dataset (Kaggle Fake and Real News dataset)
fake = pd.read_csv('Fake.csv')
real = pd.read_csv('True.csv')

fake['label'] = 0
real['label'] = 1
df = pd.concat([fake, real], ignore_index=True).sample(frac=1, random_state=42)

# Feature engineering
df['content'] = df['title'].fillna('') + ' ' + df['text'].fillna('')
df['char_count'] = df['content'].str.len()
df['exclamation'] = df['content'].str.count('!')

print("Fake avg exclamations:", df[df.label==0]['exclamation'].mean().round(2))
print("Real avg exclamations:", df[df.label==1]['exclamation'].mean().round(2))

X_train, X_test, y_train, y_test = train_test_split(
    df['content'], df['label'], test_size=0.2, random_state=42, stratify=df['label']
)

pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(stop_words='english', ngram_range=(1, 3), max_features=100000, sublinear_tf=True)),
    ('clf', LogisticRegression(C=5.0, max_iter=1000, n_jobs=-1)),
])
pipeline.fit(X_train, y_train)
preds = pipeline.predict(X_test)
print(classification_report(y_test, preds, target_names=['FAKE', 'REAL']))

def predict_news(headline: str) -> str:
    prob = pipeline.predict_proba([headline])[0]
    label = "REAL" if prob[1] > 0.5 else "FAKE"
    return f"{label} (confidence: {max(prob):.1%})"

print(predict_news("Scientists discover cure for all diseases overnight"))
print(predict_news("Federal Reserve raises interest rates by 0.25 basis points"))
```

> **CAUTION:** **Ethical Note:** Fake news classifiers can false-positive on satire, opinion, and breaking news. Always combine ML with human review. Never use as a sole arbiter of truth.
