## Why Preprocess Text?

Raw text is noisy — it contains HTML tags, punctuation, inconsistent capitalization, and irrelevant words. Preprocessing transforms messy human language into structured, clean input for models.

### Tokenization

<!-- title: tokenization.py -->
```python
import nltk
from nltk.tokenize import word_tokenize, sent_tokenize
import spacy

nltk.download('punkt', quiet=True)
text = "Dr. Smith went to the U.S.A. He bought a car for $50,000."

words = word_tokenize(text)
print("Words:", words)

sentences = sent_tokenize(text)
print("Sentences:", sentences)

# spaCy (smarter — handles contractions)
nlp = spacy.load("en_core_web_sm")
doc = nlp("I can't believe it's already 2025!")
print("spaCy tokens:", [token.text for token in doc])
```

### Stemming vs Lemmatization

| Stemming | Lemmatization |
| --- | --- |
| Crude rule-based truncation | Uses vocabulary and morphological analysis |
| "running" → "run", "studies" → "studi" | "running" → "run", "better" → "good" |
| Fast, but may produce non-words | Slower, always produces real words |
| Use: search engines, IR systems | Use: sentiment analysis, chatbots |

<!-- title: preprocess_pipeline.py -->
```python
import re, string, spacy
from nltk.corpus import stopwords

nlp = spacy.load("en_core_web_sm")
stop_words = set(stopwords.words('english'))

def preprocess(text: str) -> list[str]:
    text = text.lower()
    text = re.sub(r'https?://\S+', '', text)
    text = re.sub(r'<.*?>', '', text)
    text = text.translate(str.maketrans('', '', string.punctuation))
    doc = nlp(text)
    return [
        token.lemma_ for token in doc
        if not token.is_stop and token.is_alpha and len(token.text) > 2
    ]

print(preprocess("The cats are running quickly across the green field!"))
# ['cat', 'run', 'quickly', 'green', 'field']
```
