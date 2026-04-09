## What is Natural Language Processing?

**Natural Language Processing (NLP)** is the branch of AI that gives computers the ability to read, understand, and generate human language. Every time you use a search engine, get an autocomplete suggestion, or ask a voice assistant a question — NLP is at work.

> **TIP:** **Scale:** Humans produce roughly 2.5 quintillion bytes of text data every day. NLP is the key technology that lets machines make sense of all of it.

### Core NLP Tasks

| Task | Description | Example |
| --- | --- | --- |
| Tokenization | Split text into words/sentences | "Hello world" → ["Hello", "world"] |
| POS Tagging | Label each word's grammatical role | "Run" → Verb, "fast" → Adverb |
| NER | Identify named entities (people, places) | "Apple Inc." → ORG |
| Sentiment Analysis | Detect positive/negative/neutral tone | "Great product!" → Positive |
| Text Classification | Categorize documents into classes | Spam vs. Not Spam |
| Machine Translation | Translate between languages | "Bonjour" → "Hello" |
| Question Answering | Extract answers from context | BERT, RAG pipelines |
| Text Generation | Produce coherent text from a prompt | GPT-4, LLaMA |

### The NLP Pipeline

**Flow:**

1. **Raw Text** — User input or corpus
2. **Preprocessing** — Clean, tokenize, normalize
3. **Features** — TF-IDF, embeddings, vectors
4. **Model** — Classifier, seq2seq, LLM
5. **Output** — Label, translation, answer


### Key NLP Libraries

| Library | Language | Best For |
| --- | --- | --- |
| NLTK | Python | Learning NLP fundamentals, academic research |
| spaCy | Python | Production NLP: tokenization, NER, POS, fast |
| HuggingFace Transformers | Python | BERT, GPT, fine-tuning, state-of-the-art models |
| Gensim | Python | Topic modelling, Word2Vec, document similarity |
| TextBlob | Python | Simple sentiment analysis and text processing |
