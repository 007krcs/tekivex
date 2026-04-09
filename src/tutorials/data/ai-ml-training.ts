import type { TutorialCategory } from '../types';

const category: TutorialCategory = {
  id: 'ai-ml-training',
  title: 'Training, Optimization & Deployment',
  icon: 'settings',
  color: '#f59e0b',
  description: 'Model training pipelines, hyperparameter tuning, regularization, fine-tuning with LoRA/QLoRA, and production deployment.',
  sections: [
    {
      title: 'Training & Optimization',
      topics: [
        {
          slug: 'model-training-pipeline',
          title: 'The Model Training Pipeline',
          description: 'Full production ML pipeline from data collection through deployment and monitoring — every step explained.',
          keywords: ['ml pipeline', 'data engineering', 'feature engineering', 'model deployment', 'monitoring', 'data versioning'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          prerequisites: ['first-ml-model'],
          contentFile: 'ai-ml-training/model-training-pipeline.md',
        },
        {
          slug: 'hyperparameter-tuning',
          title: 'Hyperparameter Tuning',
          description: 'Learning rate, batch size, and architecture choices — grid search, random search, and Bayesian optimization.',
          keywords: ['hyperparameter', 'learning rate', 'batch size', 'grid search', 'random search', 'bayesian optimization'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          prerequisites: ['training-deep-networks'],
          contentFile: 'ai-ml-training/hyperparameter-tuning.md',
        },
        {
          slug: 'model-evaluation',
          title: 'Model Evaluation & Metrics',
          description: 'ROC curves, AUC, cross-validation, overfitting vs underfitting, and choosing the right evaluation metrics.',
          keywords: ['roc curve', 'auc', 'cross-validation', 'overfitting', 'underfitting', 'evaluation metrics'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          prerequisites: ['classification-regression'],
          contentFile: 'ai-ml-training/model-evaluation.md',
        },
      ],
    },
  ],
};

export default category;
