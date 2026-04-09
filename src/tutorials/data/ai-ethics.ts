import type { TutorialCategory } from '../types';

const category: TutorialCategory = {
  id: 'ai-ethics',
  title: 'AI Ethics & Regulation',
  icon: 'shield',
  color: '#ef4444',
  description: 'AI ethics, bias, fairness, explainability (XAI), and global AI regulation including the EU AI Act.',
  sections: [
    // â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”
    // SECTION 13 â€” AI Ethics
    // â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”
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
          content: [
            { type: 'heading', level: 2, text: 'Why AI Ethics Matters', id: 'why-ai-ethics' },
            { type: 'paragraph', html: 'AI systems make consequential decisions: loan approvals, resume screening, fraud detection, medical diagnosis. Unlike traditional software, AI decisions are often <em>opaque</em>, <em>hard to contest</em>, and <em>systematically biased</em>.' },
            { type: 'table', headers: ['Case', 'System', 'Harm', 'Root Cause'], rows: [
              ['COMPAS Recidivism', 'US court risk scoring', 'Falsely flagged Black defendants as high-risk', 'Training data reflected historical racial bias'],
              ['Amazon Hiring Tool', 'Resume screening AI', 'Discriminated against women', 'Trained on 10 years of male-dominated hires'],
              ['Facial Recognition', 'Police surveillance', 'False arrest of innocent people', 'Model 35% less accurate on dark skin'],
              ['GPT in Legal Filings', 'ChatGPT court citations', 'Fabricated case citations submitted to court', 'LLM hallucination not disclosed to judge'],
            ]},
            { type: 'callout', variant: 'caution', html: '<strong>Key insight:</strong> AI systems don\'t create new biases — they <em>amplify and automate</em> existing biases at scale. A biased algorithm makes biased decisions for millions of cases per day.' },
          ],
        },
        {
          slug: 'core-principles-ethical-ai',
          title: 'Core Principles of Ethical AI',
          description: 'Fairness, accountability, transparency, privacy, safety â€” the five pillars with concrete definitions and engineering implications.',
          keywords: ['fairness', 'accountability', 'transparency', 'privacy', 'safety'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          content: [
            { type: 'heading', level: 2, text: 'The Five Pillars of Ethical AI', id: 'five-pillars' },
            { type: 'table', headers: ['Principle', 'Definition', 'Engineering Implication'], rows: [
              ['Fairness', 'Equal treatment across demographic groups', 'Test model performance by subgroup; fairness metrics'],
              ['Accountability', 'Clear responsibility for AI decisions', 'Audit trails, model cards, AI oversight roles'],
              ['Transparency', 'Understandable how decisions are made', 'SHAP, LIME, decision logs, system cards'],
              ['Privacy', 'Data used only as authorized', 'Data minimization, consent, differential privacy'],
              ['Safety', 'Prevent harm during deployment', 'Red-teaming, adversarial testing, kill switches'],
            ]},
            { type: 'code', language: 'python', title: 'fairness_audit.py', code: `import pandas as pd
import numpy as np
from sklearn.metrics import confusion_matrix

def fairness_audit(y_true, y_pred, sensitive_attribute, group_names=None):
    df = pd.DataFrame({"y_true": y_true, "y_pred": y_pred, "group": sensitive_attribute})
    results = []
    for g in df["group"].unique():
        mask = df["group"] == g
        yt, yp = df.loc[mask, "y_true"], df.loc[mask, "y_pred"]
        tn, fp, fn, tp = confusion_matrix(yt, yp, labels=[0, 1]).ravel()
        n = len(yt)
        results.append({
            "group": group_names[g] if group_names else g,
            "n": n,
            "positive_rate": (tp + fp) / n,
            "tpr": tp / (tp + fn) if (tp+fn) > 0 else 0,
            "fpr": fp / (fp + tn) if (fp+tn) > 0 else 0,
            "accuracy": (tp + tn) / n,
        })
    audit_df = pd.DataFrame(results)
    print(audit_df.to_string(index=False, float_format="{:.3f}".format))
    for metric in ["positive_rate", "tpr", "fpr"]:
        gap = audit_df[metric].max() - audit_df[metric].min()
        print(f"{metric} disparity: {gap:.3f} {'âš ï¸' if gap > 0.1 else 'âœ…'}")
    return audit_df

np.random.seed(42)
n = 1000
y_true = np.random.randint(0, 2, n)
y_pred = y_true.copy()
group  = np.random.randint(0, 2, n)
bias_mask = (group == 1) & (y_pred == 1)
y_pred[bias_mask & (np.random.rand(n) < 0.3)] = 0
fairness_audit(y_true, y_pred, group, {0: "Group A", 1: "Group B"})` },
          ],
        },
        {
          slug: 'ethical-data-collection',
          title: 'Ethical Data Collection',
          description: 'Informed consent, data provenance, privacy-preserving techniques, and respecting user rights in AI data pipelines.',
          keywords: ['consent', 'data provenance', 'differential privacy', 'data minimization'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          content: [
            { type: 'heading', level: 2, text: 'Ethical Data Principles', id: 'ethical-data' },
            { type: 'list', ordered: true, items: [
              '<strong>Informed Consent:</strong> Users must understand their data will train AI models',
              '<strong>Data Minimization:</strong> Collect only what you need for the stated purpose',
              '<strong>Data Provenance:</strong> Track every training data source; respect copyright and licenses',
              '<strong>Representation:</strong> Training data must represent the full diversity of your user population',
              '<strong>Right to Erasure:</strong> Be able to remove user data and retrain (machine unlearning)',
            ]},
            { type: 'code', language: 'python', title: 'pii_scrubber.py', code: `import re
import spacy

nlp = spacy.load("en_core_web_sm")

def scrub_pii(text: str) -> str:
    """Remove PII before using text as training data."""
    text = re.sub(r'\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b', '[EMAIL]', text)
    text = re.sub(r'(\\+?\\d{1,3}[-.\\s]?)?(\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4})', '[PHONE]', text)
    text = re.sub(r'\\b\\d{3}-\\d{2}-\\d{4}\\b', '[SSN]', text)
    doc = nlp(text)
    for ent in reversed(doc.ents):
        if ent.label_ == "PERSON":
            text = text[:ent.start_char] + "[PERSON]" + text[ent.end_char:]
    return text

sample = "Hi, I'm John Smith. Call me at 555-123-4567 or email john@example.com"
print(scrub_pii(sample))
# Hi, I'm [PERSON]. Call me at [PHONE] or email [EMAIL]` },
          ],
        },
        {
          slug: 'ethical-ai-development',
          title: 'Ethical AI Development',
          description: 'Build fairness and safety into the development process: bias testing, model cards, red teaming, and responsible disclosure.',
          keywords: ['model card', 'red teaming', 'bias testing', 'responsible disclosure'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          content: [
            { type: 'heading', level: 2, text: 'Ethics Built Into Development', id: 'ethics-in-dev' },
            { type: 'flow', steps: [
              { label: 'Data Audit', desc: 'Check for bias in training data', color: '#6366f1' },
              { label: 'Bias Testing', desc: 'Fairness metrics by subgroup', color: '#8b5cf6' },
              { label: 'Red Teaming', desc: 'Adversarial testing before launch', color: '#ef4444' },
              { label: 'Model Card', desc: 'Document limitations', color: '#f59e0b' },
              { label: 'Monitor', desc: 'Track fairness metrics in prod', color: '#22c55e' },
            ]},
            { type: 'code', language: 'markdown', title: 'model_card.md', code: `# Model Card: Customer Support Classifier v1.2

## Model Details
- Type: Text classification (BERT fine-tuned)
- Task: Classify tickets into 5 categories
- Training data: 50,000 internal tickets (Jan 2022â€“Dec 2023)

## Intended Use
- Primary: Internal routing of customer support tickets
- Out-of-scope: Medical/legal advice, HR decisions

## Performance
| Group        | Accuracy | F1   |
|--------------|----------|------|
| Overall      | 94.2%    | 0.93 |
| English text | 95.1%    | 0.94 |
| Non-English  | 71.3%    | 0.68 |

## Known Limitations
- Significantly underperforms on non-English tickets (use translation first)
- Human review required for HIGH priority classifications

## Ethical Considerations
- Training data excludes tickets from users who requested data deletion
- No PII stored during inference` },
          ],
        },
        {
          slug: 'ethical-ai-deployment',
          title: 'Ethical AI Deployment',
          description: 'Human-in-the-loop, explainability, contestability, monitoring for drift, and incident response.',
          keywords: ['human in the loop', 'explainability', 'ai contestability', 'model drift'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          content: [
            { type: 'heading', level: 2, text: 'Responsible Deployment Practices', id: 'responsible-deployment' },
            { type: 'table', headers: ['Practice', 'Description', 'Implementation'], rows: [
              ['Human-in-the-loop', 'High-stakes decisions reviewed by humans', 'Flag low-confidence predictions'],
              ['Explainability', 'Users understand why a decision was made', 'SHAP values, natural language explanations'],
              ['Contestability', 'Users can appeal AI decisions', 'Appeals process, human review panel'],
              ['Monitoring', 'Detect when model performance degrades', 'Track accuracy/fairness KPIs, data drift alerts'],
              ['Incident Response', 'Plan for when AI causes harm', 'Rollback procedure, escalation path'],
            ]},
            { type: 'code', language: 'python', title: 'fairness_monitor.py', code: `class FairnessMonitor:
    def __init__(self, baseline: dict):
        self.baseline = baseline  # {"group_A": 0.42, "group_B": 0.41}

    def check(self, current: dict, window: str = "weekly") -> list[str]:
        alerts = []
        for group, rate in current.items():
            drift = abs(rate - self.baseline.get(group, 0))
            if drift > 0.05:
                alerts.append(f"âš ï¸ [{window}] {group} drifted {drift:.1%}")
        parity_gap = max(current.values()) - min(current.values())
        if parity_gap > 0.10:
            alerts.append(f"âš ï¸ Demographic parity violation: gap={parity_gap:.1%}")
        for a in alerts:
            print(a)
        return alerts

monitor = FairnessMonitor({"group_A": 0.42, "group_B": 0.41})
monitor.check({"group_A": 0.44, "group_B": 0.29})` },
          ],
        },
        {
          slug: 'ai-for-business',
          title: 'AI for Businesses',
          description: 'AI governance frameworks, risk assessment, supplier due diligence, and building internal AI policy.',
          keywords: ['ai governance', 'ai policy', 'risk assessment', 'responsible ai business'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          content: [
            { type: 'heading', level: 2, text: 'Business AI Governance', id: 'business-governance' },
            { type: 'table', headers: ['Risk Level', 'EU AI Act Category', 'Requirements', 'Examples'], rows: [
              ['Unacceptable', 'Prohibited', 'Banned entirely', 'Social scoring, biometric surveillance'],
              ['High', 'High-risk', 'Registration, conformity assessment, human oversight', 'Medical diagnosis, credit scoring, hiring tools'],
              ['Limited', 'Transparency obligations', 'Disclose AI to users', 'Chatbots, deepfakes'],
              ['Minimal', 'No requirements', 'Voluntary code of conduct', 'Spam filters'],
            ]},
            { type: 'list', ordered: false, items: [
              '<strong>AI Inventory:</strong> Register all AI systems with risk level and responsible owner',
              '<strong>Vendor Due Diligence:</strong> Before using third-party AI APIs, assess data handling and bias testing',
              '<strong>AI Use Policy:</strong> Define what employees can/cannot use AI for (e.g., no client PII in ChatGPT)',
              '<strong>Training:</strong> All employees using AI need awareness training on risks and acceptable use',
              '<strong>Incident Response:</strong> Pre-define escalation path when an AI system causes harm',
            ]},
          ],
        },
        {
          slug: 'ai-for-individuals',
          title: 'AI Ethics for Individuals',
          description: 'Your AI rights, how to protect your data from AI training, and understanding algorithmic decisions that affect you.',
          keywords: ['ai rights', 'opt out ai training', 'algorithmic rights', 'gdpr ai'],
          difficulty: 'beginner',
          estimatedMinutes: 12,
          content: [
            { type: 'heading', level: 2, text: 'Your Rights in an AI World', id: 'individual-rights' },
            { type: 'table', headers: ['Right', 'What It Means', 'How to Exercise It'], rows: [
              ['Right to Explanation', 'Know why an automated decision was made about you', 'Request under GDPR Article 22'],
              ['Right to Opt Out', 'Opt out of having your data used for AI training', 'Privacy settings, GDPR deletion requests'],
              ['Right to Contest', 'Challenge an automated decision', 'Company appeals process, ombudsman'],
              ['Right to Human Review', 'Request human review of automated decisions', 'Especially for credit, hiring, criminal justice'],
              ['Right to Transparency', 'Know when interacting with AI (not human)', 'EU AI Act transparency requirements'],
            ]},
            { type: 'callout', variant: 'tip', html: '<strong>Practical steps:</strong> Opt out of AI training in settings (LinkedIn, Meta, X, Adobe all have this). For job rejections: you have the right to request the criteria used in automated screening under GDPR.' },
          ],
        },
        {
          slug: 'chatgpt-ethics',
          title: 'ChatGPT Ethics & Responsible Use',
          description: 'Academic integrity, misinformation risks, dependency, environmental cost, and best practices for responsible GenAI use.',
          keywords: ['chatgpt ethics', 'academic integrity', 'ai misinformation', 'responsible use'],
          difficulty: 'beginner',
          estimatedMinutes: 12,
          content: [
            { type: 'heading', level: 2, text: 'Responsible Use of GenAI', id: 'responsible-genai' },
            { type: 'table', headers: ['Concern', 'Risk', 'Responsible Practice'], rows: [
              ['Academic Integrity', 'Submitting AI-written work as your own', 'Disclose AI use; use it to learn, not bypass learning'],
              ['Misinformation', 'Sharing hallucinated AI content as fact', 'Always verify AI claims with primary sources'],
              ['Overreliance', 'Degraded critical thinking skills', 'Use AI as thinking partner, not a replacement'],
              ['Privacy', 'Sharing confidential info with AI', 'Never input PII, business secrets, or client data'],
              ['Environmental Cost', 'Large models have high energy footprint', 'Use smallest model for the task'],
            ]},
            { type: 'callout', variant: 'note', html: '<strong>Environmental impact:</strong> A single ChatGPT query uses ~10Ã— more energy than a Google search. Choosing gpt-4o-mini over gpt-4o when appropriate reduces this footprint significantly.' },
          ],
        },
        {
          slug: 'regulatory-frameworks',
          title: 'Regulatory Frameworks â€” GDPR & EU AI Act',
          description: 'Key AI regulations: GDPR\'s impact on AI, EU AI Act risk classification, and building compliance into your AI systems.',
          keywords: ['gdpr', 'eu ai act', 'ai regulation', 'compliance', 'data protection'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          content: [
            { type: 'heading', level: 2, text: 'AI Regulatory Landscape', id: 'ai-regulation' },
            { type: 'table', headers: ['GDPR Article', 'Relevance to AI', 'Practical Implication'], rows: [
              ['Art. 5 â€” Data minimization', 'Only process data needed for the AI task', 'Don\'t collect 50 features when 5 will do'],
              ['Art. 17 â€” Right to erasure', 'Delete user data + retrain/update model', 'Machine unlearning is now a compliance requirement'],
              ['Art. 22 â€” Automated decisions', 'Right to human review of automated decisions', 'Credit, hiring, medical AI must have human oversight'],
              ['Art. 35 â€” DPIA', 'High-risk AI requires Data Protection Impact Assessment', 'Mandatory for systematic profiling'],
            ]},
            { type: 'heading', level: 3, text: 'EU AI Act Summary', id: 'eu-ai-act' },
            { type: 'list', ordered: false, items: [
              '<strong>Prohibited AI (immediate ban):</strong> Social credit scoring, real-time biometric surveillance in public, subliminal manipulation',
              '<strong>High-risk AI (strictest requirements):</strong> Medical devices, employment decisions, credit scoring, law enforcement',
              '<strong>GPAI (GPT-4, Claude, etc.):</strong> Transparency requirements, copyright compliance, systemic risk assessment',
              '<strong>Penalties:</strong> Up to â‚¬35M or 7% of global annual revenue for prohibited AI violations',
            ]},
            { type: 'heading', level: 3, text: 'Compliance Checklist', id: 'compliance-checklist' },
            { type: 'list', ordered: true, items: [
              'Classify your AI system\'s risk level under the EU AI Act',
              'Document training data sources, licenses, and PII handling',
              'Implement and document human oversight mechanisms',
              'Write a Data Protection Impact Assessment (DPIA) if high-risk',
              'Create model cards with performance metrics by demographic group',
              'Build an audit trail for every automated decision affecting individuals',
              'Establish a process for users to contest automated decisions',
              'Test for bias and document results before deployment',
              'Assign a responsible AI officer / Data Protection Officer',
            ]},
            { type: 'callout', variant: 'caution', html: '<strong>For developers:</strong> If you deploy AI in the EU (even as a non-EU company serving EU users), the EU AI Act applies. The grace periods for high-risk AI end in 2026.' },
          ],
        },
      ],
    },
  ],
};

export default category;
