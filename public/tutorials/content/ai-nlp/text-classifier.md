## Text Classification Pipeline

**Flow:**

1. **Raw Text** — Documents with labels
2. **TF-IDF** — Convert to term frequency vectors
3. **Classifier** — Naive Bayes / SVM / LR
4. **Predict** — Output class label
5. **Evaluate** — Accuracy, F1, confusion matrix


<!-- title: text_classifier.py -->
```python
from sklearn.datasets import fetch_20newsgroups
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import LinearSVC
from sklearn.metrics import classification_report, accuracy_score
from sklearn.model_selection import cross_val_score
import numpy as np

categories = ['sci.space', 'rec.sport.hockey', 'talk.politics.guns', 'comp.graphics']
train = fetch_20newsgroups(subset='train', categories=categories, remove=('headers', 'footers', 'quotes'))
test  = fetch_20newsgroups(subset='test',  categories=categories, remove=('headers', 'footers', 'quotes'))

nb_pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(stop_words='english', ngram_range=(1, 2), max_features=50000)),
    ('clf',   MultinomialNB(alpha=0.1)),
])

svm_pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(stop_words='english', ngram_range=(1, 2), max_features=50000)),
    ('clf',   LinearSVC(C=1.0, max_iter=1000)),
])

for name, pipeline in [("Naive Bayes", nb_pipeline), ("Linear SVM", svm_pipeline)]:
    pipeline.fit(train.data, train.target)
    preds = pipeline.predict(test.data)
    acc = accuracy_score(test.target, preds)
    print(f"\n── {name} (Accuracy: {acc:.3f}) ──")
    print(classification_report(test.target, preds, target_names=categories))
```
