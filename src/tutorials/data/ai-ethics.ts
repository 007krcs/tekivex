import type { TutorialCategory } from '../types';

const category: TutorialCategory = {
  id: 'ai-ethics',
  title: 'AI Ethics & Regulation',
  icon: 'shield',
  color: '#ef4444',
  description: 'AI ethics, bias, fairness, explainability (XAI), and global AI regulation including the EU AI Act.',
  sections: [
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 13 — AI Ethics
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      title: 'AI Ethics',
      topics: [
        {
          slug: 'ai-ethics-intro',
          title: 'Introduction to AI Ethics',
          description: 'Why AI ethics matters now, high-profile AI failures, and the responsibility of AI engineers to build fair, transparent, safe systems.',
          keywords: ['ai ethics', 'responsible ai', 'ai failures', 'bias'],
          difficulty: 'beginner',
          estimatedMinutes: 12,
          contentFile: 'ai-ethics/ai-ethics-intro.md',
        },
        {
          slug: 'core-principles-ethical-ai',
          title: 'Core Principles of Ethical AI',
          description: 'Fairness, accountability, transparency, privacy, safety — the five pillars with concrete definitions and engineering implications.',
          keywords: ['fairness', 'accountability', 'transparency', 'privacy', 'safety'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          contentFile: 'ai-ethics/core-principles-ethical-ai.md',
        },
        {
          slug: 'ethical-data-collection',
          title: 'Ethical Data Collection',
          description: 'Informed consent, data provenance, privacy-preserving techniques, and respecting user rights in AI data pipelines.',
          keywords: ['consent', 'data provenance', 'differential privacy', 'data minimization'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          contentFile: 'ai-ethics/ethical-data-collection.md',
        },
        {
          slug: 'ethical-ai-development',
          title: 'Ethical AI Development',
          description: 'Build fairness and safety into the development process: bias testing, model cards, red teaming, and responsible disclosure.',
          keywords: ['model card', 'red teaming', 'bias testing', 'responsible disclosure'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          contentFile: 'ai-ethics/ethical-ai-development.md',
        },
        {
          slug: 'ethical-ai-deployment',
          title: 'Ethical AI Deployment',
          description: 'Human-in-the-loop, explainability, contestability, monitoring for drift, and incident response.',
          keywords: ['human in the loop', 'explainability', 'ai contestability', 'model drift'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          contentFile: 'ai-ethics/ethical-ai-deployment.md',
        },
        {
          slug: 'ai-for-business',
          title: 'AI for Businesses',
          description: 'AI governance frameworks, risk assessment, supplier due diligence, and building internal AI policy.',
          keywords: ['ai governance', 'ai policy', 'risk assessment', 'responsible ai business'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          contentFile: 'ai-ethics/ai-for-business.md',
        },
        {
          slug: 'ai-for-individuals',
          title: 'AI Ethics for Individuals',
          description: 'Your AI rights, how to protect your data from AI training, and understanding algorithmic decisions that affect you.',
          keywords: ['ai rights', 'opt out ai training', 'algorithmic rights', 'gdpr ai'],
          difficulty: 'beginner',
          estimatedMinutes: 12,
          contentFile: 'ai-ethics/ai-for-individuals.md',
        },
        {
          slug: 'chatgpt-ethics',
          title: 'ChatGPT Ethics & Responsible Use',
          description: 'Academic integrity, misinformation risks, dependency, environmental cost, and best practices for responsible GenAI use.',
          keywords: ['chatgpt ethics', 'academic integrity', 'ai misinformation', 'responsible use'],
          difficulty: 'beginner',
          estimatedMinutes: 12,
          contentFile: 'ai-ethics/chatgpt-ethics.md',
        },
        {
          slug: 'regulatory-frameworks',
          title: 'Regulatory Frameworks — GDPR & EU AI Act',
          description: 'Key AI regulations: GDPR\'s impact on AI, EU AI Act risk classification, and building compliance into your AI systems.',
          keywords: ['gdpr', 'eu ai act', 'ai regulation', 'compliance', 'data protection'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          contentFile: 'ai-ethics/regulatory-frameworks.md',
        },
      ],
    },
  ],
};

export default category;
