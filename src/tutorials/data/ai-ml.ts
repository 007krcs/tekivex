import type { TutorialCategory } from '../types';

const category: TutorialCategory = {
  id: 'ai-ml',
  title: 'AI & Machine Learning',
  icon: 'cpu',
  color: '#f59e0b',
  description: 'Neural networks, transformers, LLMs, fine-tuning, AI agents, MCP, LangChain, and swarm intelligence.',
  sections: [
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 1 — Foundations: What is AI?
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      title: 'Foundations — What is AI?',
      topics: [
        // ──────────────────────────────────────────────────────────
        // 1. Intro to AI/ML
        // ──────────────────────────────────────────────────────────
        {
          slug: 'intro-to-ai-ml',
          title: 'Introduction to AI & Machine Learning',
          description: 'What is AI/ML? Types of learning, real-world examples, and core intuition behind how machines learn.',
          keywords: ['ai', 'machine learning', 'supervised learning', 'unsupervised learning', 'reinforcement learning'],
          difficulty: 'beginner',
          estimatedMinutes: 14,
          contentFile: 'ai-ml/intro-to-ai-ml.md',
        },

        // ──────────────────────────────────────────────────────────
        // 2. Math Behind ML
        // ──────────────────────────────────────────────────────────
        {
          slug: 'math-behind-ml',
          title: 'The Math Behind Machine Learning',
          description: 'Linear algebra, calculus, and probability fundamentals for ML — with visual explanations and gradient descent from scratch.',
          keywords: ['linear algebra', 'calculus', 'gradient descent', 'probability', 'bayes theorem', 'vectors', 'matrices'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          prerequisites: ['intro-to-ai-ml'],
          contentFile: 'ai-ml/math-behind-ml.md',
        },

        // ──────────────────────────────────────────────────────────
        // 3. Neural Network Basics
        // ──────────────────────────────────────────────────────────
        {
          slug: 'neural-network-basics',
          title: 'Neural Network Basics',
          description: 'How neurons, layers, weights, biases, and activation functions work together — with a perceptron from scratch.',
          keywords: ['neural network', 'perceptron', 'activation function', 'sigmoid', 'relu', 'weights', 'biases'],
          difficulty: 'beginner',
          estimatedMinutes: 16,
          prerequisites: ['intro-to-ai-ml'],
          contentFile: 'ai-ml/neural-network-basics.md',
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 2 — Building Models
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      title: 'Building Models',
      topics: [
        // ──────────────────────────────────────────────────────────
        // 4. First ML Model
        // ──────────────────────────────────────────────────────────
        {
          slug: 'first-ml-model',
          title: 'Your First ML Model',
          description: 'Build a complete ML pipeline from scratch — data collection through deployment with linear regression in Python.',
          keywords: ['linear regression', 'ml pipeline', 'training loop', 'data preprocessing', 'model evaluation'],
          difficulty: 'beginner',
          estimatedMinutes: 18,
          prerequisites: ['intro-to-ai-ml', 'math-behind-ml'],
          contentFile: 'ai-ml/first-ml-model.md',
        },

        // ──────────────────────────────────────────────────────────
        // 5. Classification & Regression
        // ──────────────────────────────────────────────────────────
        {
          slug: 'classification-regression',
          title: 'Classification vs Regression',
          description: 'Understand the two core ML tasks, decision boundaries, evaluation metrics, and logistic regression implementation.',
          keywords: ['classification', 'regression', 'logistic regression', 'confusion matrix', 'precision', 'recall', 'f1 score'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          prerequisites: ['first-ml-model'],
          contentFile: 'ai-ml/classification-regression.md',
        },

        // ──────────────────────────────────────────────────────────
        // 6. Training Deep Networks
        // ──────────────────────────────────────────────────────────
        {
          slug: 'training-deep-networks',
          title: 'Training Deep Neural Networks',
          description: 'Forward pass, backpropagation, loss functions, optimizers, and the full training process explained visually.',
          keywords: ['backpropagation', 'forward pass', 'loss function', 'optimizer', 'sgd', 'adam', 'cross-entropy', 'mse'],
          difficulty: 'intermediate',
          estimatedMinutes: 20,
          prerequisites: ['neural-network-basics', 'math-behind-ml'],
          contentFile: 'ai-ml/training-deep-networks.md',
        },

        // ──────────────────────────────────────────────────────────
        // 7. CNNs
        // ──────────────────────────────────────────────────────────
        {
          slug: 'cnn',
          title: 'Convolutional Neural Networks (CNNs)',
          description: 'How convolution works, pooling, feature maps, and a complete CNN architecture for image classification.',
          keywords: ['cnn', 'convolution', 'pooling', 'feature maps', 'image classification', 'computer vision'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          prerequisites: ['training-deep-networks'],
          contentFile: 'ai-ml/cnn.md',
        },

        // ──────────────────────────────────────────────────────────
        // 8. RNNs & Sequence Models
        // ──────────────────────────────────────────────────────────
        {
          slug: 'rnn-sequence-models',
          title: 'RNNs & Sequence Models',
          description: 'Recurrent neural networks, vanishing gradients, LSTM cells, and comparison of sequence model architectures.',
          keywords: ['rnn', 'lstm', 'gru', 'sequence model', 'vanishing gradient', 'time series', 'recurrent'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          prerequisites: ['training-deep-networks'],
          contentFile: 'ai-ml/rnn-sequence-models.md',
        },
      ],
    },

  ],
};

export default category;
