## The Five Pillars of Ethical AI

| Principle | Definition | Engineering Implication |
| --- | --- | --- |
| Fairness | Equal treatment across demographic groups | Test model performance by subgroup; fairness metrics |
| Accountability | Clear responsibility for AI decisions | Audit trails, model cards, AI oversight roles |
| Transparency | Understandable how decisions are made | SHAP, LIME, decision logs, system cards |
| Privacy | Data used only as authorized | Data minimization, consent, differential privacy |
| Safety | Prevent harm during deployment | Red-teaming, adversarial testing, kill switches |

<!-- title: fairness_audit.py -->
```python
import pandas as pd
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
        print(f"{metric} disparity: {gap:.3f} {'⚠️' if gap > 0.1 else '✅'}")
    return audit_df

np.random.seed(42)
n = 1000
y_true = np.random.randint(0, 2, n)
y_pred = y_true.copy()
group  = np.random.randint(0, 2, n)
bias_mask = (group == 1) & (y_pred == 1)
y_pred[bias_mask & (np.random.rand(n) < 0.3)] = 0
fairness_audit(y_true, y_pred, group, {0: "Group A", 1: "Group B"})
```
