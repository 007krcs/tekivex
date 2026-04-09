## Ethics Built Into Development

**Flow:**

1. **Data Audit** — Check for bias in training data
2. **Bias Testing** — Fairness metrics by subgroup
3. **Red Teaming** — Adversarial testing before launch
4. **Model Card** — Document limitations
5. **Monitor** — Track fairness metrics in prod


<!-- title: model_card.md -->
```markdown
# Model Card: Customer Support Classifier v1.2

## Model Details
- Type: Text classification (BERT fine-tuned)
- Task: Classify tickets into 5 categories
- Training data: 50,000 internal tickets (Jan 2022–Dec 2023)

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
- No PII stored during inference
```
