import type { TutorialCategory } from '../types';

const category: TutorialCategory = {
  id: 'ai-nlp',
  title: 'NLP & Language Models',
  icon: 'message-square',
  color: '#8b5cf6',
  description: 'Natural Language Processing fundamentals, text pipelines, and deep dives into Large Language Models architecture and fine-tuning.',
  sections: [
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 6 — Natural Language Processing (NLP)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      title: 'Natural Language Processing (NLP)',
      topics: [
        {
          slug: 'intro-to-nlp',
          title: 'Introduction to NLP',
          description: 'What NLP is, why it matters, and the pipeline from raw text to machine understanding.',
          keywords: ['nlp', 'natural language processing', 'text', 'spacy', 'nltk'],
          difficulty: 'beginner',
          estimatedMinutes: 12,
          content: [
            { type: 'heading', level: 2, text: 'What is Natural Language Processing?', id: 'what-is-nlp' },
            { type: 'paragraph', html: '<strong>Natural Language Processing (NLP)</strong> is the branch of AI that gives computers the ability to read, understand, and generate human language. Every time you use a search engine, get an autocomplete suggestion, or ask a voice assistant a question — NLP is at work.' },
            { type: 'callout', variant: 'tip', html: '<strong>Scale:</strong> Humans produce roughly 2.5 quintillion bytes of text data every day. NLP is the key technology that lets machines make sense of all of it.' },
            { type: 'heading', level: 3, text: 'Core NLP Tasks', id: 'nlp-tasks' },
            { type: 'table', headers: ['Task', 'Description', 'Example'], rows: [
              ['Tokenization', 'Split text into words/sentences', '"Hello world" → ["Hello", "world"]'],
              ['POS Tagging', 'Label each word\'s grammatical role', '"Run" → Verb, "fast" → Adverb'],
              ['NER', 'Identify named entities (people, places)', '"Apple Inc." → ORG'],
              ['Sentiment Analysis', 'Detect positive/negative/neutral tone', '"Great product!" → Positive'],
              ['Text Classification', 'Categorize documents into classes', 'Spam vs. Not Spam'],
              ['Machine Translation', 'Translate between languages', '"Bonjour" → "Hello"'],
              ['Question Answering', 'Extract answers from context', 'BERT, RAG pipelines'],
              ['Text Generation', 'Produce coherent text from a prompt', 'GPT-4, LLaMA'],
            ]},
            { type: 'heading', level: 3, text: 'The NLP Pipeline', id: 'nlp-pipeline' },
            { type: 'flow', steps: [
              { label: 'Raw Text', desc: 'User input or corpus', color: '#6366f1' },
              { label: 'Preprocessing', desc: 'Clean, tokenize, normalize', color: '#8b5cf6' },
              { label: 'Features', desc: 'TF-IDF, embeddings, vectors', color: '#a855f7' },
              { label: 'Model', desc: 'Classifier, seq2seq, LLM', color: '#f59e0b' },
              { label: 'Output', desc: 'Label, translation, answer', color: '#22c55e' },
            ]},
            { type: 'heading', level: 3, text: 'Key NLP Libraries', id: 'nlp-libraries' },
            { type: 'table', headers: ['Library', 'Language', 'Best For'], rows: [
              ['NLTK', 'Python', 'Learning NLP fundamentals, academic research'],
              ['spaCy', 'Python', 'Production NLP: tokenization, NER, POS, fast'],
              ['HuggingFace Transformers', 'Python', 'BERT, GPT, fine-tuning, state-of-the-art models'],
              ['Gensim', 'Python', 'Topic modelling, Word2Vec, document similarity'],
              ['TextBlob', 'Python', 'Simple sentiment analysis and text processing'],
            ]},
          ],
        },
        {
          slug: 'text-preprocessing',
          title: 'Text Preprocessing',
          description: 'Tokenization, stemming, lemmatization, stopword removal, and cleaning pipelines that convert raw text into model-ready input.',
          keywords: ['tokenization', 'stemming', 'lemmatization', 'stopwords', 'text cleaning'],
          difficulty: 'beginner',
          estimatedMinutes: 16,
          prerequisites: ['intro-to-nlp'],
          content: [
            { type: 'heading', level: 2, text: 'Why Preprocess Text?', id: 'why-preprocess' },
            { type: 'paragraph', html: 'Raw text is noisy — it contains HTML tags, punctuation, inconsistent capitalization, and irrelevant words. Preprocessing transforms messy human language into structured, clean input for models.' },
            { type: 'heading', level: 3, text: 'Tokenization', id: 'tokenization' },
            { type: 'code', language: 'python', title: 'tokenization.py', code: `import nltk
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
print("spaCy tokens:", [token.text for token in doc])` },
            { type: 'heading', level: 3, text: 'Stemming vs Lemmatization', id: 'stemming-lemma' },
            { type: 'comparison', left: { title: 'Stemming', color: '#6366f1', items: [
              'Crude rule-based truncation',
              '"running" → "run", "studies" → "studi"',
              'Fast, but may produce non-words',
              'Use: search engines, IR systems',
            ]}, right: { title: 'Lemmatization', color: '#22c55e', items: [
              'Uses vocabulary and morphological analysis',
              '"running" → "run", "better" → "good"',
              'Slower, always produces real words',
              'Use: sentiment analysis, chatbots',
            ]}},
            { type: 'code', language: 'python', title: 'preprocess_pipeline.py', code: `import re, string, spacy
from nltk.corpus import stopwords

nlp = spacy.load("en_core_web_sm")
stop_words = set(stopwords.words('english'))

def preprocess(text: str) -> list[str]:
    text = text.lower()
    text = re.sub(r'https?://\\S+', '', text)
    text = re.sub(r'<.*?>', '', text)
    text = text.translate(str.maketrans('', '', string.punctuation))
    doc = nlp(text)
    return [
        token.lemma_ for token in doc
        if not token.is_stop and token.is_alpha and len(token.text) > 2
    ]

print(preprocess("The cats are running quickly across the green field!"))
# ['cat', 'run', 'quickly', 'green', 'field']` },
          ],
        },
        {
          slug: 'pos-ner',
          title: 'POS Tagging & Named Entity Recognition',
          description: 'Label grammatical roles with POS tagging and extract real-world entities (people, places, organizations) with NER.',
          keywords: ['pos tagging', 'named entity recognition', 'ner', 'spacy'],
          difficulty: 'intermediate',
          estimatedMinutes: 15,
          prerequisites: ['text-preprocessing'],
          content: [
            { type: 'heading', level: 2, text: 'Part-of-Speech (POS) Tagging', id: 'pos-tagging' },
            { type: 'paragraph', html: 'POS tagging assigns a grammatical label to each token — noun, verb, adjective, etc. It is the foundation for parsing, information extraction, and disambiguation.' },
            { type: 'table', headers: ['Tag', 'Meaning', 'Example'], rows: [
              ['NN', 'Noun (singular)', '"dog", "city"'],
              ['VB', 'Verb (base)', '"run", "eat"'],
              ['JJ', 'Adjective', '"fast", "blue"'],
              ['RB', 'Adverb', '"quickly", "never"'],
              ['IN', 'Preposition', '"in", "on", "at"'],
            ]},
            { type: 'code', language: 'python', title: 'pos_ner.py', code: `import spacy

nlp = spacy.load("en_core_web_sm")
doc = nlp("Apple is looking to buy a startup in the UK for $1 billion.")

# POS tags
for token in doc:
    print(f"{token.text:15}{token.pos_:8}{token.tag_}")

# Named entities
print("\\nEntities:")
for ent in doc.ents:
    print(f"{ent.text:20}{ent.label_:12}{spacy.explain(ent.label_)}")
# Apple          ORG         Companies, agencies
# UK             GPE         Countries, cities
# $1 billion     MONEY       Monetary values` },
            { type: 'table', headers: ['Entity Type', 'Description', 'Example'], rows: [
              ['PERSON', 'People, including fictional', '"Elon Musk"'],
              ['ORG', 'Companies, agencies, institutions', '"Google", "MIT"'],
              ['GPE', 'Countries, cities, states', '"France", "New York"'],
              ['DATE', 'Absolute or relative dates', '"January 2025"'],
              ['MONEY', 'Monetary values', '"$1 billion"'],
            ]},
          ],
        },
        {
          slug: 'sentiment-analysis',
          title: 'Sentiment Analysis',
          description: 'Detect positive, negative, and neutral sentiment using VADER, TextBlob, and fine-tuned transformer models.',
          keywords: ['sentiment analysis', 'opinion mining', 'vader', 'textblob', 'bert sentiment'],
          difficulty: 'intermediate',
          estimatedMinutes: 17,
          prerequisites: ['text-preprocessing'],
          content: [
            { type: 'heading', level: 2, text: 'Sentiment Analysis Approaches', id: 'sentiment-approaches' },
            { type: 'table', headers: ['Approach', 'How It Works', 'Pros', 'Cons'], rows: [
              ['Lexicon-based (VADER)', 'Pre-built word sentiment scores', 'No training needed, fast', 'Misses context and sarcasm'],
              ['ML Classifier', 'Trained Naive Bayes / SVM', 'Learns domain patterns', 'Needs labeled training data'],
              ['Deep Learning (BERT)', 'Fine-tuned transformer model', 'State-of-the-art accuracy', 'Compute intensive'],
            ]},
            { type: 'code', language: 'python', title: 'sentiment.py', code: `from nltk.sentiment.vader import SentimentIntensityAnalyzer
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
    print(f"{r['label']} ({r['score']:.3f}) → {review[:50]}")` },
          ],
        },
        {
          slug: 'vectorizing-text',
          title: 'Vectorizing Text — TF-IDF, Word2Vec & GloVe',
          description: 'Convert words and documents into numerical vectors that capture semantic meaning.',
          keywords: ['tf-idf', 'word2vec', 'glove', 'embeddings', 'vectorization'],
          difficulty: 'intermediate',
          estimatedMinutes: 20,
          prerequisites: ['text-preprocessing'],
          content: [
            { type: 'heading', level: 2, text: 'Text Vectorization Methods', id: 'vectorization' },
            { type: 'paragraph', html: 'Machine learning models work with numbers, not words. Vectorization converts text into numerical representations. The quality of this representation determines how much semantic information the model can capture.' },
            { type: 'code', language: 'python', title: 'tfidf.py', code: `from sklearn.feature_extraction.text import TfidfVectorizer
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
print(df.round(3))` },
            { type: 'code', language: 'python', title: 'word2vec.py', code: `from gensim.models import Word2Vec
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
print(f"king - man + woman = {result[0][0]}")` },
            { type: 'comparison', left: { title: 'Word2Vec', color: '#6366f1', items: [
              'Predicts context words (local)',
              'Skip-gram or CBOW training',
              'Fast to train on large corpora',
            ]}, right: { title: 'GloVe', color: '#f59e0b', items: [
              'Factorizes co-occurrence matrix (global)',
              'Captures global corpus statistics',
              'Slightly better on analogy tasks',
            ]}},
          ],
        },
        {
          slug: 'topic-modelling',
          title: 'Topic Modelling with LDA',
          description: 'Discover hidden themes in document collections using Latent Dirichlet Allocation and evaluate topic coherence.',
          keywords: ['topic modelling', 'lda', 'latent dirichlet allocation', 'gensim', 'coherence'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          prerequisites: ['vectorizing-text'],
          content: [
            { type: 'heading', level: 2, text: 'Latent Dirichlet Allocation (LDA)', id: 'lda' },
            { type: 'paragraph', html: 'LDA is an unsupervised technique that automatically discovers the main themes ("topics") in a document collection. It assumes each document is a mixture of topics, and each topic is a mixture of words.' },
            { type: 'code', language: 'python', title: 'lda_topic_model.py', code: `import gensim
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
print(f"Coherence Score: {coherence.get_coherence():.4f}")` },
          ],
        },
        {
          slug: 'text-classifier',
          title: 'Building a Text Classifier',
          description: 'Train a complete text classification pipeline with TF-IDF + Naive Bayes and LinearSVC, with evaluation and cross-validation.',
          keywords: ['text classification', 'naive bayes', 'svm', 'sklearn', 'pipeline'],
          difficulty: 'intermediate',
          estimatedMinutes: 20,
          prerequisites: ['vectorizing-text'],
          content: [
            { type: 'heading', level: 2, text: 'Text Classification Pipeline', id: 'text-clf-pipeline' },
            { type: 'flow', steps: [
              { label: 'Raw Text', desc: 'Documents with labels', color: '#6366f1' },
              { label: 'TF-IDF', desc: 'Convert to term frequency vectors', color: '#8b5cf6' },
              { label: 'Classifier', desc: 'Naive Bayes / SVM / LR', color: '#f59e0b' },
              { label: 'Predict', desc: 'Output class label', color: '#22c55e' },
              { label: 'Evaluate', desc: 'Accuracy, F1, confusion matrix', color: '#06b6d4' },
            ]},
            { type: 'code', language: 'python', title: 'text_classifier.py', code: `from sklearn.datasets import fetch_20newsgroups
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
    print(f"\\n── {name} (Accuracy: {acc:.3f}) ──")
    print(classification_report(test.target, preds, target_names=categories))` },
          ],
        },
        {
          slug: 'fake-news-detection',
          title: 'Case Study — Detecting Fake News',
          description: 'End-to-end fake news detection: data loading, feature engineering, model training, and ethical considerations.',
          keywords: ['fake news', 'misinformation', 'text classification', 'case study'],
          difficulty: 'intermediate',
          estimatedMinutes: 22,
          prerequisites: ['text-classifier'],
          content: [
            { type: 'heading', level: 2, text: 'Fake News Detection Project', id: 'fake-news-project' },
            { type: 'paragraph', html: 'Fake news detection is a real-world binary classification problem. The task: given a news article or headline, classify it as <strong>REAL</strong> or <strong>FAKE</strong>.' },
            { type: 'code', language: 'python', title: 'fake_news_detection.py', code: `import pandas as pd
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
print(predict_news("Federal Reserve raises interest rates by 0.25 basis points"))` },
            { type: 'callout', variant: 'caution', html: '<strong>Ethical Note:</strong> Fake news classifiers can false-positive on satire, opinion, and breaking news. Always combine ML with human review. Never use as a sole arbiter of truth.' },
          ],
        },
        {
          slug: 'future-of-nlp',
          title: 'The Future of NLP',
          description: 'Where NLP is heading — multimodal models, real-time translation, AI writing, and the challenges ahead.',
          keywords: ['future nlp', 'multimodal', 'llm', 'real-time translation'],
          difficulty: 'beginner',
          estimatedMinutes: 10,
          content: [
            { type: 'heading', level: 2, text: 'Where NLP is Heading', id: 'future-nlp' },
            { type: 'list', ordered: false, items: [
              '<strong>Multimodal Models</strong> — GPT-4V, Gemini Ultra understand text + images + audio in one model',
              '<strong>Real-Time Translation</strong> — Near-perfect live translation across 100+ languages',
              '<strong>Code Generation</strong> — GitHub Copilot, Claude Code write production-quality code from natural language',
              '<strong>AI Agents</strong> — LLM agents that read emails, write reports, and take actions in the world',
              '<strong>Smaller, Faster Models</strong> — DistilBERT, TinyLLaMA bring LLM power to edge devices',
            ]},
            { type: 'table', headers: ['Challenge', 'Current Status', 'Research Direction'], rows: [
              ['Hallucination', 'LLMs confidently generate false facts', 'RAG, RLHF, factual grounding'],
              ['Long Context', 'Most models limited to 4K–128K tokens', '1M+ context (Gemini 1.5)'],
              ['Reasoning', 'Struggles with multi-step logic', 'Chain-of-thought, process reward models'],
              ['Bias', 'Reflects training data biases', 'Debiasing, RLHF, Constitutional AI'],
            ]},
          ],
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 7 — Large Language Models Deep Dive
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      title: 'Large Language Models — Deep Dive',
      topics: [
        {
          slug: 'intro-llms',
          title: 'Introduction to Large Language Models',
          description: 'What makes LLMs different, how they are trained at scale, and the emergent capabilities that arise from massive pre-training.',
          keywords: ['llm', 'large language model', 'gpt', 'scaling laws', 'emergent abilities'],
          difficulty: 'intermediate',
          estimatedMinutes: 15,
          content: [
            { type: 'heading', level: 2, text: 'What Makes a Model "Large"?', id: 'what-makes-llm' },
            { type: 'paragraph', html: 'A <strong>Large Language Model (LLM)</strong> is a transformer-based neural network trained on massive text corpora with billions of parameters.' },
            { type: 'table', headers: ['Model', 'Params', 'Training Tokens', 'Release'], rows: [
              ['GPT-2', '1.5B', '40B tokens', '2019 (OpenAI)'],
              ['GPT-3', '175B', '300B tokens', '2020 (OpenAI)'],
              ['LLaMA-2', '70B', '2T tokens', '2023 (Meta)'],
              ['GPT-4', '~1.8T (MoE)', 'Unknown', '2023 (OpenAI)'],
              ['Claude 3 Opus', 'Unknown', 'Unknown', '2024 (Anthropic)'],
              ['LLaMA-3.1', '405B', '15T tokens', '2024 (Meta)'],
            ]},
            { type: 'heading', level: 3, text: 'How LLMs Are Trained', id: 'llm-training' },
            { type: 'flow', steps: [
              { label: 'Pre-training', desc: 'Next-token prediction on internet-scale text', color: '#6366f1' },
              { label: 'SFT', desc: 'Supervised fine-tuning on instruction pairs', color: '#8b5cf6' },
              { label: 'RLHF', desc: 'Reward model + PPO to align with human values', color: '#f59e0b' },
              { label: 'Deployed Model', desc: 'Helpful, harmless, honest assistant', color: '#22c55e' },
            ]},
            { type: 'table', headers: ['Concept', 'Description'], rows: [
              ['Context Window', 'Maximum number of tokens the model can process at once (4K → 1M+)'],
              ['Temperature', 'Randomness in generation (0 = deterministic, 1 = creative)'],
              ['Top-p Sampling', 'Sample from top p% probability mass — controls diversity'],
              ['Hallucination', 'Model confidently generates plausible but false information'],
              ['In-Context Learning', 'Adapts to new tasks from examples in the prompt without retraining'],
            ]},
            { type: 'callout', variant: 'note', html: '<strong>Scaling Laws (Chinchilla):</strong> DeepMind\'s 2022 paper showed optimal training requires ~20 tokens per parameter. A 70B model should train on 1.4T tokens.' },
          ],
        },
        {
          slug: 'transformer-deep-dive',
          title: 'Transformer Architecture — Deep Dive',
          description: 'Multi-head self-attention, positional encodings, feed-forward sublayers, layer normalization, and the full encoder-decoder architecture.',
          keywords: ['transformer', 'attention', 'multi-head attention', 'positional encoding', 'layer norm'],
          difficulty: 'advanced',
          estimatedMinutes: 25,
          content: [
            { type: 'heading', level: 2, text: 'Inside the Transformer Block', id: 'transformer-block' },
            { type: 'paragraph', html: 'Every transformer layer has two sub-layers: <strong>Multi-Head Self-Attention</strong> and a <strong>Position-wise Feed-Forward Network</strong>. Each sub-layer is wrapped with a residual connection and layer normalization.' },
            { type: 'code', language: 'python', title: 'transformer_block.py', code: `import torch
import torch.nn as nn
import math

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model: int, num_heads: int, dropout: float = 0.1):
        super().__init__()
        assert d_model % num_heads == 0
        self.d_k = d_model // num_heads
        self.num_heads = num_heads
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)
        self.dropout = nn.Dropout(dropout)

    def scaled_dot_product_attention(self, Q, K, V, mask=None):
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)
        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)
        attn = self.dropout(torch.softmax(scores, dim=-1))
        return torch.matmul(attn, V), attn

    def forward(self, Q, K, V, mask=None):
        B = Q.size(0)
        Q = self.W_q(Q).view(B, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = self.W_k(K).view(B, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = self.W_v(V).view(B, -1, self.num_heads, self.d_k).transpose(1, 2)
        x, _ = self.scaled_dot_product_attention(Q, K, V, mask)
        x = x.transpose(1, 2).contiguous().view(B, -1, self.num_heads * self.d_k)
        return self.W_o(x)

class TransformerBlock(nn.Module):
    def __init__(self, d_model: int, num_heads: int, d_ff: int, dropout: float = 0.1):
        super().__init__()
        self.attention = MultiHeadAttention(d_model, num_heads, dropout)
        self.ff = nn.Sequential(
            nn.Linear(d_model, d_ff), nn.GELU(), nn.Dropout(dropout), nn.Linear(d_ff, d_model),
        )
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, mask=None):
        attn_out = self.attention(self.norm1(x), self.norm1(x), self.norm1(x), mask)
        x = x + self.dropout(attn_out)
        x = x + self.dropout(self.ff(self.norm2(x)))
        return x

block = TransformerBlock(d_model=512, num_heads=8, d_ff=2048)
x = torch.randn(1, 10, 512)
print(block(x).shape)  # torch.Size([1, 10, 512])` },
            { type: 'callout', variant: 'note', html: '<strong>RoPE (Rotary PE):</strong> Used in LLaMA, Mistral, and most modern LLMs. Rotates key/query vectors based on position, allowing relative position encoding that generalizes better to sequences longer than seen during training.' },
          ],
        },
        {
          slug: 'gpt-models',
          title: 'GPT Models — From GPT-1 to GPT-4',
          description: 'How the GPT series evolved from language modelling to instruction-following assistants via RLHF.',
          keywords: ['gpt', 'gpt-3', 'gpt-4', 'rlhf', 'chatgpt'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          content: [
            { type: 'heading', level: 2, text: 'The GPT Evolution', id: 'gpt-evolution' },
            { type: 'table', headers: ['Version', 'Year', 'Params', 'Key Innovation'], rows: [
              ['GPT-1', '2018', '117M', 'Pre-train then fine-tune paradigm established'],
              ['GPT-2', '2019', '1.5B', 'Zero-shot transfer — works on unseen tasks'],
              ['GPT-3', '2020', '175B', 'Few-shot in-context learning'],
              ['InstructGPT', '2022', '175B', 'RLHF — human feedback alignment'],
              ['ChatGPT', '2022', '~175B', 'Conversational RLHF fine-tuning'],
              ['GPT-4', '2023', '~1.8T MoE', 'Multimodal, advanced reasoning, 128K context'],
            ]},
            { type: 'heading', level: 3, text: 'RLHF — Making GPT Helpful', id: 'rlhf' },
            { type: 'flow', steps: [
              { label: 'SFT', desc: 'Fine-tune on human demonstrations', color: '#6366f1' },
              { label: 'Reward Model', desc: 'Train to predict human preference', color: '#8b5cf6' },
              { label: 'PPO', desc: 'RL optimizes model against reward model', color: '#f59e0b' },
              { label: 'Aligned Model', desc: 'Helpful, harmless, honest', color: '#22c55e' },
            ]},
            { type: 'code', language: 'python', title: 'openai_gpt.py', code: `from openai import OpenAI

client = OpenAI()

# Basic chat completion
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a concise Python expert."},
        {"role": "user",   "content": "Explain list comprehensions in 3 sentences."},
    ],
    temperature=0.3,
    max_tokens=200,
)
print(response.choices[0].message.content)

# Streaming
stream = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Count from 1 to 5."}],
    stream=True,
)
for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)` },
          ],
        },
        {
          slug: 'huggingface-transformers',
          title: 'HuggingFace Transformers Library',
          description: 'Master the HuggingFace ecosystem — pipeline API, tokenizers, AutoModel classes, and fine-tuning with Trainer.',
          keywords: ['huggingface', 'transformers', 'pipeline', 'tokenizer', 'automodel', 'trainer'],
          difficulty: 'intermediate',
          estimatedMinutes: 22,
          content: [
            { type: 'heading', level: 2, text: 'The HuggingFace Ecosystem', id: 'hf-ecosystem' },
            { type: 'paragraph', html: 'HuggingFace provides a unified API to load and use 500,000+ pre-trained models for NLP, vision, audio, and multimodal tasks — with just a few lines of code.' },
            { type: 'code', language: 'python', title: 'hf_pipeline.py', code: `from transformers import pipeline

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
print(summarizer(text, max_length=60, min_length=20)[0]['summary_text'])` },
            { type: 'code', language: 'python', title: 'fine_tune.py', code: `from transformers import AutoTokenizer, AutoModelForSequenceClassification, TrainingArguments, Trainer
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
).train()` },
          ],
        },
        {
          slug: 'qa-with-bert',
          title: 'Question Answering with BERT',
          description: 'Extractive QA using BERT\'s span-extraction approach on the SQuAD dataset.',
          keywords: ['bert', 'question answering', 'squad', 'span extraction'],
          difficulty: 'advanced',
          estimatedMinutes: 20,
          content: [
            { type: 'heading', level: 2, text: 'How BERT Does QA', id: 'bert-qa' },
            { type: 'paragraph', html: 'BERT approaches QA as <strong>span extraction</strong>: given a question and context paragraph, it predicts the start and end token positions of the answer within the context.' },
            { type: 'flow', steps: [
              { label: '[CLS] Q [SEP]', desc: 'Encode question', color: '#6366f1' },
              { label: 'Context [SEP]', desc: 'Encode passage', color: '#8b5cf6' },
              { label: 'BERT', desc: 'Compute token representations', color: '#f59e0b' },
              { label: 'Start/End Logits', desc: 'Score each token as start or end', color: '#ef4444' },
              { label: 'Span', desc: 'Extract answer tokens', color: '#22c55e' },
            ]},
            { type: 'code', language: 'python', title: 'bert_qa.py', code: `from transformers import pipeline, AutoTokenizer, AutoModelForQuestionAnswering
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
    print(f"A: {result['answer']} (score: {result['score']:.3f})\\n")

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

print(extract_answer("What is the length of the Amazon?", context))` },
          ],
        },
        {
          slug: 'xlnet-text-classification',
          title: 'Text Classification with XLNet',
          description: 'Understand XLNet\'s permutation language modelling objective and apply it to text classification.',
          keywords: ['xlnet', 'permutation language model', 'text classification'],
          difficulty: 'advanced',
          estimatedMinutes: 18,
          content: [
            { type: 'heading', level: 2, text: 'What is XLNet?', id: 'what-is-xlnet' },
            { type: 'paragraph', html: 'XLNet uses <strong>permutation language modelling</strong> — it trains on all possible orderings of the input, capturing bidirectional context without BERT\'s masking mismatch.' },
            { type: 'comparison', left: { title: 'BERT', color: '#6366f1', items: [
              'Masked Language Modelling (MLM)',
              '[MASK] token mismatch at inference',
              'Better: NER, QA, span tasks',
            ]}, right: { title: 'XLNet', color: '#f59e0b', items: [
              'Permutation Language Modelling',
              'No train/inference mismatch',
              'Better: classification, long-doc tasks',
            ]}},
            { type: 'code', language: 'python', title: 'xlnet_classification.py', code: `from transformers import XLNetTokenizer, XLNetForSequenceClassification, TrainingArguments, Trainer
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
).train()` },
          ],
        },
      ],
    },

  ],
};

export default category;
