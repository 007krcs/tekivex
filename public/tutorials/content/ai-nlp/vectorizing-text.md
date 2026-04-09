## Text Vectorization Methods

Machine learning models work with numbers, not words. Vectorization converts text into numerical representations. The quality of this representation determines how much semantic information the model can capture.

<!-- title: tfidf.py -->
```python
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd

corpus = [
    "The cat sat on the mat",
    "The dog chased the cat up the tree",
    "A bird sat on the tree branch",
]

vectorizer = TfidfVectorizer(stop_words='english', max_features=10)
X = vectorizer.fit_transform(corpus)

df = pd.DataFrame(
    X.toarray(),
    columns=vectorizer.get_feature_names_out(),
    index=[f"doc{i+1}" for i in range(len(corpus))]
)
print(df.round(3))
```

<!-- title: word2vec.py -->
```python
from gensim.models import Word2Vec
from gensim.utils import simple_preprocess

sentences = [
    "the king wore a crown and ruled the kingdom",
    "the queen sat beside the king on the throne",
    "a man walked through the forest alone",
    "a woman sang a beautiful song in the palace",
]

tokenized = [simple_preprocess(s) for s in sentences]
model = Word2Vec(sentences=tokenized, vector_size=100, window=5, min_count=1, sg=1, epochs=200)

print(model.wv.similarity('king', 'queen'))   # high
print(model.wv.similarity('king', 'forest'))  # low

# Analogy: king - man + woman ≈ queen
result = model.wv.most_similar(positive=['king', 'woman'], negative=['man'], topn=1)
print(f"king - man + woman = {result[0][0]}")
```

| Word2Vec | GloVe |
| --- | --- |
| Predicts context words (local) | Factorizes co-occurrence matrix (global) |
| Skip-gram or CBOW training | Captures global corpus statistics |
| Fast to train on large corpora | Slightly better on analogy tasks |
