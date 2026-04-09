import type { TutorialCategory } from '../types';

const category: TutorialCategory = {
  id: 'ai-ml-transformers',
  title: 'Transformers & Large Language Models',
  icon: 'zap',
  color: '#f59e0b',
  description: 'The Attention Mechanism, Transformer architecture, BERT, GPT, and Large Language Models explained from first principles.',
  sections: [
    {
      title: 'Modern AI — Transformers & LLMs',
      topics: [
        {
          slug: 'attention-mechanism',
          title: 'The Attention Mechanism',
          description: 'Self-attention explained simply — Query, Key, Value, attention scores, and a code implementation.',
          keywords: ['attention', 'self-attention', 'query key value', 'scaled dot-product', 'transformer'],
          difficulty: 'advanced',
          estimatedMinutes: 18,
          prerequisites: ['rnn-sequence-models'],
          contentFile: 'ai-ml-transformers/attention-mechanism.md',
        },
        {
          slug: 'transformer-architecture',
          title: 'The Transformer Architecture',
          description: 'Complete Transformer breakdown — encoder, decoder, positional encoding, multi-head attention, and feed-forward networks.',
          keywords: ['transformer', 'encoder', 'decoder', 'positional encoding', 'multi-head attention', 'feed-forward'],
          difficulty: 'advanced',
          estimatedMinutes: 20,
          prerequisites: ['attention-mechanism'],
          contentFile: 'ai-ml-transformers/transformer-architecture.md',
        },
        {
          slug: 'large-language-models',
          title: 'Large Language Models (LLMs)',
          description: 'How GPT and Claude work — tokenization, embeddings, transformer blocks, next-token prediction, and sampling strategies.',
          keywords: ['llm', 'gpt', 'claude', 'tokenization', 'next-token prediction', 'temperature', 'top-k', 'top-p'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          prerequisites: ['transformer-architecture'],
          contentFile: 'ai-ml-transformers/large-language-models.md',
        },
        {
          slug: 'fine-tuning-transfer',
          title: 'Fine-Tuning & Transfer Learning',
          description: 'Pre-training vs fine-tuning, LoRA, QLoRA, PEFT methods, and when to fine-tune vs prompt engineer.',
          keywords: ['fine-tuning', 'transfer learning', 'lora', 'qlora', 'peft', 'pre-training', 'prompt engineering'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          prerequisites: ['large-language-models'],
          contentFile: 'ai-ml-transformers/fine-tuning-transfer.md',
        },
      ],
    },
  ],
};

export default category;
