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
          contentFile: 'ai-nlp/intro-to-nlp.md',
        },
        {
          slug: 'text-preprocessing',
          title: 'Text Preprocessing',
          description: 'Tokenization, stemming, lemmatization, stopword removal, and cleaning pipelines that convert raw text into model-ready input.',
          keywords: ['tokenization', 'stemming', 'lemmatization', 'stopwords', 'text cleaning'],
          difficulty: 'beginner',
          estimatedMinutes: 16,
          prerequisites: ['intro-to-nlp'],
          contentFile: 'ai-nlp/text-preprocessing.md',
        },
        {
          slug: 'pos-ner',
          title: 'POS Tagging & Named Entity Recognition',
          description: 'Label grammatical roles with POS tagging and extract real-world entities (people, places, organizations) with NER.',
          keywords: ['pos tagging', 'named entity recognition', 'ner', 'spacy'],
          difficulty: 'intermediate',
          estimatedMinutes: 15,
          prerequisites: ['text-preprocessing'],
          contentFile: 'ai-nlp/pos-ner.md',
        },
        {
          slug: 'sentiment-analysis',
          title: 'Sentiment Analysis',
          description: 'Detect positive, negative, and neutral sentiment using VADER, TextBlob, and fine-tuned transformer models.',
          keywords: ['sentiment analysis', 'opinion mining', 'vader', 'textblob', 'bert sentiment'],
          difficulty: 'intermediate',
          estimatedMinutes: 17,
          prerequisites: ['text-preprocessing'],
          contentFile: 'ai-nlp/sentiment-analysis.md',
        },
        {
          slug: 'vectorizing-text',
          title: 'Vectorizing Text — TF-IDF, Word2Vec & GloVe',
          description: 'Convert words and documents into numerical vectors that capture semantic meaning.',
          keywords: ['tf-idf', 'word2vec', 'glove', 'embeddings', 'vectorization'],
          difficulty: 'intermediate',
          estimatedMinutes: 20,
          prerequisites: ['text-preprocessing'],
          contentFile: 'ai-nlp/vectorizing-text.md',
        },
        {
          slug: 'topic-modelling',
          title: 'Topic Modelling with LDA',
          description: 'Discover hidden themes in document collections using Latent Dirichlet Allocation and evaluate topic coherence.',
          keywords: ['topic modelling', 'lda', 'latent dirichlet allocation', 'gensim', 'coherence'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          prerequisites: ['vectorizing-text'],
          contentFile: 'ai-nlp/topic-modelling.md',
        },
        {
          slug: 'text-classifier',
          title: 'Building a Text Classifier',
          description: 'Train a complete text classification pipeline with TF-IDF + Naive Bayes and LinearSVC, with evaluation and cross-validation.',
          keywords: ['text classification', 'naive bayes', 'svm', 'sklearn', 'pipeline'],
          difficulty: 'intermediate',
          estimatedMinutes: 20,
          prerequisites: ['vectorizing-text'],
          contentFile: 'ai-nlp/text-classifier.md',
        },
        {
          slug: 'fake-news-detection',
          title: 'Case Study — Detecting Fake News',
          description: 'End-to-end fake news detection: data loading, feature engineering, model training, and ethical considerations.',
          keywords: ['fake news', 'misinformation', 'text classification', 'case study'],
          difficulty: 'intermediate',
          estimatedMinutes: 22,
          prerequisites: ['text-classifier'],
          contentFile: 'ai-nlp/fake-news-detection.md',
        },
        {
          slug: 'future-of-nlp',
          title: 'The Future of NLP',
          description: 'Where NLP is heading — multimodal models, real-time translation, AI writing, and the challenges ahead.',
          keywords: ['future nlp', 'multimodal', 'llm', 'real-time translation'],
          difficulty: 'beginner',
          estimatedMinutes: 10,
          contentFile: 'ai-nlp/future-of-nlp.md',
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
          contentFile: 'ai-nlp/intro-llms.md',
        },
        {
          slug: 'transformer-deep-dive',
          title: 'Transformer Architecture — Deep Dive',
          description: 'Multi-head self-attention, positional encodings, feed-forward sublayers, layer normalization, and the full encoder-decoder architecture.',
          keywords: ['transformer', 'attention', 'multi-head attention', 'positional encoding', 'layer norm'],
          difficulty: 'advanced',
          estimatedMinutes: 25,
          contentFile: 'ai-nlp/transformer-deep-dive.md',
        },
        {
          slug: 'gpt-models',
          title: 'GPT Models — From GPT-1 to GPT-4',
          description: 'How the GPT series evolved from language modelling to instruction-following assistants via RLHF.',
          keywords: ['gpt', 'gpt-3', 'gpt-4', 'rlhf', 'chatgpt'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          contentFile: 'ai-nlp/gpt-models.md',
        },
        {
          slug: 'huggingface-transformers',
          title: 'HuggingFace Transformers Library',
          description: 'Master the HuggingFace ecosystem — pipeline API, tokenizers, AutoModel classes, and fine-tuning with Trainer.',
          keywords: ['huggingface', 'transformers', 'pipeline', 'tokenizer', 'automodel', 'trainer'],
          difficulty: 'intermediate',
          estimatedMinutes: 22,
          contentFile: 'ai-nlp/huggingface-transformers.md',
        },
        {
          slug: 'qa-with-bert',
          title: 'Question Answering with BERT',
          description: 'Extractive QA using BERT\'s span-extraction approach on the SQuAD dataset.',
          keywords: ['bert', 'question answering', 'squad', 'span extraction'],
          difficulty: 'advanced',
          estimatedMinutes: 20,
          contentFile: 'ai-nlp/qa-with-bert.md',
        },
        {
          slug: 'xlnet-text-classification',
          title: 'Text Classification with XLNet',
          description: 'Understand XLNet\'s permutation language modelling objective and apply it to text classification.',
          keywords: ['xlnet', 'permutation language model', 'text classification'],
          difficulty: 'advanced',
          estimatedMinutes: 18,
          contentFile: 'ai-nlp/xlnet-text-classification.md',
        },
      ],
    },

  ],
};

export default category;
