## Latent Dirichlet Allocation (LDA)

LDA is an unsupervised technique that automatically discovers the main themes ("topics") in a document collection. It assumes each document is a mixture of topics, and each topic is a mixture of words.

<!-- title: lda_topic_model.py -->
```python
import gensim
from gensim import corpora
from gensim.models import LdaModel, CoherenceModel
from gensim.utils import simple_preprocess
from nltk.corpus import stopwords
import nltk

nltk.download('stopwords', quiet=True)
stop_words = set(stopwords.words('english'))

documents = [
    "machine learning neural networks deep learning AI training",
    "python programming code functions class object oriented",
    "stock market investment returns portfolio finance trading",
    "health fitness exercise nutrition diet calories gym",
    "deep learning convolutional neural network image classification",
    "software development programming algorithms data structures",
    "cryptocurrency bitcoin blockchain decentralized finance",
    "running marathon fitness training health endurance",
]

def preprocess(doc):
    return [w for w in simple_preprocess(doc) if w not in stop_words]

texts = [preprocess(d) for d in documents]
dictionary = corpora.Dictionary(texts)
corpus = [dictionary.doc2bow(text) for text in texts]

lda = LdaModel(corpus=corpus, id2word=dictionary, num_topics=3, random_state=42, passes=20)

for idx, topic in lda.print_topics(num_words=5):
    print(f"Topic {idx}: {topic}")

coherence = CoherenceModel(model=lda, texts=texts, dictionary=dictionary, coherence='c_v')
print(f"Coherence Score: {coherence.get_coherence():.4f}")
```
