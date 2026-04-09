## Why Evaluation Matters

A model that gets 99% accuracy on training data might perform terribly in production. Proper evaluation tells you how the model will perform on <strong>unseen data</strong> — which is all that matters in the real world. Choosing the right metric depends on your problem and what errors cost you.

### Classification Metrics

| Metric | Formula | Range | When to Use |
| --- | --- | --- | --- |
| <strong>Accuracy</strong> | (TP+TN) / Total | 0-1 | Balanced classes only |
| <strong>Precision</strong> | TP / (TP+FP) | 0-1 | When FP are costly (spam → inbox) |
| <strong>Recall (Sensitivity)</strong> | TP / (TP+FN) | 0-1 | When FN are costly (missed cancer) |
| <strong>F1 Score</strong> | 2×P×R / (P+R) | 0-1 | Balance precision & recall |
| <strong>Specificity</strong> | TN / (TN+FP) | 0-1 | True negative rate |
| <strong>AUC-ROC</strong> | Area under ROC curve | 0-1 | Overall model quality, threshold-independent |

### The ROC Curve

The <strong>ROC (Receiver Operating Characteristic)</strong> curve plots True Positive Rate vs False Positive Rate at every classification threshold. <strong>AUC (Area Under Curve)</strong> summarizes this into a single number — 1.0 is perfect, 0.5 is random guessing.

- <strong>AUC = 1.0:</strong> Perfect model — separates classes completely
- <strong>AUC = 0.9:</strong> Excellent — strong discrimination
- <strong>AUC = 0.7-0.8:</strong> Fair — reasonable performance
- <strong>AUC = 0.5:</strong> No discrimination — random coin flip

<div class="callout callout-tip">

Use AUC-ROC when you need a threshold-independent measure of model quality. Use F1 when you care about a specific threshold and want to balance precision and recall.

</div>

### Regression Metrics

| Metric | Formula | Interpretation |
| --- | --- | --- |
| <strong>MSE</strong> | (1/n) Σ(ŷ-y)² | Average squared error — penalizes large errors |
| <strong>RMSE</strong> | √MSE | Same units as target — more interpretable |
| <strong>MAE</strong> | (1/n) Σ\|ŷ-y\| | Average absolute error — robust to outliers |
| <strong>R² Score</strong> | 1 - SS_res/SS_tot | Fraction of variance explained (1.0 = perfect) |

### Overfitting vs Underfitting

The goal is a model that generalizes well — performing similarly on training and test data.

<div class="comparison-card">
<div class="comparison-side">

**Underfitting**

- Model too simple to capture patterns
- High training error AND high test error
- Symptom: training loss plateaus high
- Fix: more capacity (layers, neurons), more features, train longer

</div>
<div class="comparison-side">

**Overfitting**

- Model memorizes training data instead of learning patterns
- Low training error BUT high test error
- Symptom: training loss drops, validation loss rises
- Fix: more data, dropout, regularization, early stopping

</div>
</div>

### Cross-Validation

<strong>K-fold cross-validation</strong> gives a more robust estimate of model performance. Instead of a single train/test split, it rotates through K different splits and averages the results.

<div class="flow-steps">

**Split Data** — Divide into K equal folds (e.g., K=5)

**Fold 1 as Test** — Train on folds 2-5, test on fold 1

**Fold 2 as Test** — Train on folds 1,3-5, test on fold 2

**... Repeat K times** — Each fold gets a turn as test set

**Average Scores** — Mean ± std of K evaluations

</div>

<div class="callout callout-note">

5-fold or 10-fold cross-validation is standard. Use <strong>stratified</strong> K-fold for classification to maintain class proportions in each fold. Leave-one-out (K=N) is for tiny datasets.

</div>

### Training vs Test Accuracy

| Scenario | Train Accuracy | Test Accuracy | Diagnosis | Action |
| --- | --- | --- | --- | --- |
| Good fit | 92% | 90% | Healthy generalization | Deploy! |
| Overfitting | 99% | 75% | Memorizing training data | Add regularization, get more data |
| Underfitting | 65% | 63% | Model too simple | More capacity, better features |
| Data leakage | 99% | 99% | Test data leaked into training | Check preprocessing pipeline! |

### Key Takeaways

1. Choose metrics based on your problem — accuracy is misleading with imbalanced data
2. AUC-ROC is threshold-independent; F1 balances precision and recall at a specific threshold
3. Overfitting: low train error, high test error — fix with regularization or more data
4. Cross-validation gives robust estimates by averaging over K different train/test splits
5. Always compare training vs test performance to diagnose model health

