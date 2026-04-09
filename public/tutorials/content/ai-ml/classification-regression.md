## Two Fundamental ML Tasks

Every supervised ML problem is either **classification** (predicting a category) or **regression** (predicting a continuous number). The choice determines your model architecture, loss function, and evaluation metrics.

| Classification | Regression |
| --- | --- |
| Predicts discrete categories (cat/dog, spam/not-spam) | Predicts continuous numbers (price, temperature) |
| Output: probabilities + class label | Output: single numeric value |
| Loss: cross-entropy | Loss: mean squared error (MSE) |
| Metrics: accuracy, precision, recall, F1 | Metrics: MSE, RMSE, MAE, R² |
| Examples: email spam, disease diagnosis, image recognition | Examples: house prices, stock forecasting, weather prediction |

### Decision Boundaries

In classification, the model learns a **decision boundary** — an invisible line (or surface) that separates different classes. A linear model draws a straight line; neural networks can learn curved, complex boundaries.

> **TIP:** **Analogy:** A decision boundary is like a fence between two properties. A simple fence is a straight line. A complex fence might curve around trees and gardens. More complex models build more flexible fences.

### The Confusion Matrix

For classification, the confusion matrix tells you exactly where the model succeeds and fails:

|  | Predicted Positive | Predicted Negative |
| --- | --- | --- |
| **Actually Positive** | True Positive (TP) ✓ | False Negative (FN) — missed it |
| **Actually Negative** | False Positive (FP) — false alarm | True Negative (TN) ✓ |

### Evaluation Metrics

| Metric | Formula | When to Use |
| --- | --- | --- |
| **Accuracy** | (TP + TN) / Total | Balanced classes only |
| **Precision** | TP / (TP + FP) | When false positives are costly (spam filter) |
| **Recall** | TP / (TP + FN) | When false negatives are costly (cancer detection) |
| **F1 Score** | 2 × (P × R) / (P + R) | Balance between precision and recall |

> **CAUTION:** Accuracy is misleading with imbalanced data. If 99% of emails are not spam, a model that always predicts "not spam" has 99% accuracy but catches zero spam. Use precision, recall, and F1 instead.

### Logistic Regression Implementation

Logistic regression is linear regression wrapped with a sigmoid function, turning a continuous output into a probability between 0 and 1:

<!-- title: logistic_regression.py -->
```python
import numpy as np

class LogisticRegression:
    """Binary classifier using sigmoid activation."""

    def __init__(self, lr: float = 0.1):
        self.lr = lr
        self.w = None
        self.b = None

    def sigmoid(self, z: np.ndarray) -> np.ndarray:
        return 1 / (1 + np.exp(-np.clip(z, -250, 250)))

    def fit(self, X: np.ndarray, y: np.ndarray, epochs: int = 200):
        n, d = X.shape
        self.w = np.zeros(d)
        self.b = 0.0

        for epoch in range(epochs):
            # Forward pass
            z = X @ self.w + self.b
            probs = self.sigmoid(z)

            # Binary cross-entropy loss
            loss = -np.mean(y * np.log(probs + 1e-8) +
                            (1 - y) * np.log(1 - probs + 1e-8))

            # Gradients
            error = probs - y
            dw = (1 / n) * (X.T @ error)
            db = (1 / n) * np.sum(error)

            # Update
            self.w -= self.lr * dw
            self.b -= self.lr * db

            if epoch % 50 == 0:
                acc = np.mean((probs >= 0.5) == y)
                print(f"Epoch {epoch}: loss={loss:.4f}, acc={acc:.2%}")

    def predict(self, X: np.ndarray) -> np.ndarray:
        probs = self.sigmoid(X @ self.w + self.b)
        return (probs >= 0.5).astype(int)

# --- Demo: classify pass/fail based on hours studied + sleep ---
np.random.seed(42)
X = np.random.rand(200, 2) * [10, 8]  # hours studied, hours slept
y = ((X[:, 0] * 0.6 + X[:, 1] * 0.4) > 4.5).astype(float)

model = LogisticRegression(lr=0.5)
model.fit(X, y, epochs=300)

preds = model.predict(X)
accuracy = np.mean(preds == y)
print(f"\nFinal accuracy: {accuracy:.2%}")
```

### Key Takeaways

1. Classification predicts categories; regression predicts numbers
2. The confusion matrix shows TP, FP, TN, FN — the basis for all classification metrics
3. Use precision when false positives are costly, recall when false negatives are costly
4. Logistic regression = linear model + sigmoid → outputs probability for binary classification
