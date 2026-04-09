## Why Math Matters for ML

Machine learning is built on three pillars of mathematics: **linear algebra** (how data is represented), **calculus** (how models learn), and **probability** (how uncertainty is handled). You don't need a PhD — just an intuitive understanding of the key concepts.

### Linear Algebra Basics

Data in ML is represented as **vectors** (1D arrays) and **matrices** (2D arrays). Every image, sentence, or data point becomes a vector of numbers that the model can process.

| Concept | What It Is | ML Use Case |
| --- | --- | --- |
| Vector | A list of numbers [3, 1, 4] | A single data point (features) |
| Matrix | A 2D grid of numbers | Dataset (rows = samples, cols = features) |
| Dot Product | Multiply corresponding elements and sum | Neuron computation: w·x + b |
| Transpose | Flip rows and columns | Shape alignment in matrix multiplication |

<!-- title: vectors.py -->
```python
import numpy as np

# Vectors — represent a single data point
features = np.array([1.0, 2.0, 3.0])   # e.g., [height, weight, age]
weights  = np.array([0.5, 0.3, 0.2])   # model weights

# Dot product — core of every neuron
output = np.dot(features, weights)  # 1*0.5 + 2*0.3 + 3*0.2 = 1.7
print(f"Neuron output: {output}")

# Matrix — an entire dataset
dataset = np.array([
    [1.0, 2.0, 3.0],   # sample 1
    [4.0, 5.0, 6.0],   # sample 2
    [7.0, 8.0, 9.0],   # sample 3
])
# Matrix multiply: all samples through weights at once
predictions = dataset @ weights  # shape: (3,)
print(f"Batch predictions: {predictions}")
```

### Calculus — How Models Learn

Calculus gives us **gradients** — the direction and magnitude of change. During training, we compute how much each weight contributes to the error, then adjust weights to reduce that error. This is the heart of learning.

> **TIP:** **Analogy:** Imagine you're blindfolded on a hilly landscape and want to reach the lowest valley. You feel the slope under your feet (gradient) and take a step downhill. Repeat until you reach the bottom. That's gradient descent.

- **Derivative** — Rate of change of a function (slope of the curve)
- **Partial Derivative** — Derivative with respect to one variable, holding others constant
- **Gradient** — Vector of all partial derivatives (points "uphill")
- **Chain Rule** — Compose derivatives of nested functions (critical for backpropagation)

### Gradient Descent Visualized

**Flow:**

1. **Initialize** — Start with random weights
2. **Forward Pass** — Compute prediction with current weights
3. **Compute Loss** — Measure error (predicted vs actual)
4. **Compute Gradient** — Find direction of steepest ascent
5. **Update Weights** — Step opposite to gradient
6. **Repeat** — Loop until loss is small enough


<!-- title: gradient_descent.py -->
```python
import numpy as np

# Simple gradient descent for y = wx + b (linear regression)
np.random.seed(42)

# Generate toy data: y = 3x + 2 + noise
X = np.random.randn(100)
y = 3 * X + 2 + np.random.randn(100) * 0.5

# Initialize parameters randomly
w = 0.0   # weight
b = 0.0   # bias
lr = 0.1  # learning rate

# Training loop
for epoch in range(50):
    # Forward pass: predictions
    y_pred = w * X + b

    # Loss: Mean Squared Error
    loss = np.mean((y_pred - y) ** 2)

    # Gradients (partial derivatives of loss w.r.t. w and b)
    dw = np.mean(2 * (y_pred - y) * X)   # dL/dw
    db = np.mean(2 * (y_pred - y))        # dL/db

    # Update weights (step opposite to gradient)
    w -= lr * dw
    b -= lr * db

    if epoch % 10 == 0:
        print(f"Epoch {epoch}: loss={loss:.4f}, w={w:.4f}, b={b:.4f}")

print(f"\nLearned: y = {w:.2f}x + {b:.2f}  (true: y = 3x + 2)")
```

### Probability & Bayes Theorem

Probability tells us how to reason under uncertainty. **Bayes' Theorem** lets us update our beliefs when we get new evidence — this is the foundation of spam filters, medical diagnosis, and many ML models.

<!-- title: bayes.py -->
```python
# Bayes' Theorem: P(A|B) = P(B|A) * P(A) / P(B)
#
# Example: Medical test
# - Disease prevalence: 1% (P(Disease) = 0.01)
# - Test sensitivity: 95% (P(Positive|Disease) = 0.95)
# - False positive rate: 5% (P(Positive|No Disease) = 0.05)

p_disease = 0.01
p_positive_given_disease = 0.95
p_positive_given_no_disease = 0.05

# P(Positive) = P(Pos|D)*P(D) + P(Pos|~D)*P(~D)
p_positive = (p_positive_given_disease * p_disease +
              p_positive_given_no_disease * (1 - p_disease))

# P(Disease|Positive) — what we actually want to know
p_disease_given_positive = (p_positive_given_disease * p_disease) / p_positive

print(f"P(Disease | Positive test) = {p_disease_given_positive:.2%}")
# Output: ~16.1% — surprisingly low despite 95% test accuracy!
```

> **CAUTION:** A 95%-accurate test doesn't mean a positive result is 95% likely to be correct! When the base rate is low (1% prevalence), most positives are false positives. This is the **base rate fallacy**, and Bayes' Theorem reveals the true probability.

### Key Takeaways

1. Vectors and matrices are how data is stored and processed in ML
2. The dot product is the fundamental operation inside every neuron
3. Gradients tell us which direction to adjust weights to reduce error
4. Gradient descent iteratively updates weights to minimize loss
5. Bayes' Theorem updates beliefs with new evidence — foundational for probabilistic ML
