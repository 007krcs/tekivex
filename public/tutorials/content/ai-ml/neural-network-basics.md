## What is a Neural Network?

A neural network is a computing system inspired by the brain. It's made of layers of **neurons** (also called nodes) connected by **weights**. Each neuron takes inputs, multiplies them by weights, adds a bias, and passes the result through an **activation function**.

> **TIP:** **Analogy:** Think of a neuron like a judge in a talent show. It receives scores from multiple sources (inputs × weights), adds its own bias, and then makes a decision (activation) — "yes, this is good enough to pass through" or "no, not relevant."

### Anatomy of a Neuron

A single artificial neuron performs one operation: `output = activation(w₁x₁ + w₂x₂ + ... + wₙxₙ + bias)`. The weights control how much each input matters. The bias shifts the decision boundary. The activation function adds non-linearity.

| Component | Symbol | Role |
| --- | --- | --- |
| Input | x | The data flowing in (features) |
| Weight | w | How important each input is (learned) |
| Bias | b | Shifts the activation threshold (learned) |
| Weighted Sum | z = w·x + b | Linear combination of inputs |
| Activation | a = f(z) | Adds non-linearity to the output |

### Network Architecture

Neurons are organized into **layers**. The input layer receives raw data, hidden layers extract increasingly abstract features, and the output layer produces the final prediction.

**Flow:**

1. **Input Layer** — Raw features (pixels, numbers, text)
2. **Hidden Layer 1** — Detect simple patterns (edges, shapes)
3. **Hidden Layer 2** — Combine into complex features
4. **Output Layer** — Final prediction (class, number)


### Activation Functions

Without activation functions, a neural network is just a linear equation — no matter how many layers you stack. Activations introduce **non-linearity**, allowing networks to learn complex patterns.

| Function | Formula | Range | Use Case |
| --- | --- | --- | --- |
| **Sigmoid** | σ(x) = 1 / (1 + e⁻ˣ) | (0, 1) | Binary classification output |
| **ReLU** | f(x) = max(0, x) | [0, ∞) | Hidden layers (fast, avoids vanishing gradient) |
| **Tanh** | f(x) = (eˣ - e⁻ˣ)/(eˣ + e⁻ˣ) | (-1, 1) | Hidden layers (zero-centered) |
| **Softmax** | eˣⁱ / Σeˣʲ | (0, 1), sums to 1 | Multi-class classification output |

> **NOTE:** **ReLU** (Rectified Linear Unit) is the most popular activation for hidden layers. It's simple, fast, and avoids the vanishing gradient problem that plagues sigmoid in deep networks.

### Building a Perceptron from Scratch

A **perceptron** is the simplest neural network — just one neuron. Let's build one that learns to classify points as above or below a line:

<!-- title: perceptron.py -->
```python
import numpy as np

class Perceptron:
    """A single neuron that learns a linear decision boundary."""

    def __init__(self, n_inputs: int, lr: float = 0.1):
        self.weights = np.random.randn(n_inputs) * 0.01
        self.bias = 0.0
        self.lr = lr

    def sigmoid(self, z: float) -> float:
        """Activation: squash output to (0, 1)."""
        return 1.0 / (1.0 + np.exp(-z))

    def predict(self, x: np.ndarray) -> float:
        """Forward pass: weighted sum → activation."""
        z = np.dot(self.weights, x) + self.bias
        return self.sigmoid(z)

    def train(self, X: np.ndarray, y: np.ndarray, epochs: int = 100):
        """Learn weights using gradient descent."""
        for epoch in range(epochs):
            total_loss = 0.0
            for xi, yi in zip(X, y):
                # Forward pass
                pred = self.predict(xi)

                # Error
                error = pred - yi
                total_loss += error ** 2

                # Update weights and bias
                self.weights -= self.lr * error * pred * (1 - pred) * xi
                self.bias    -= self.lr * error * pred * (1 - pred)

            if epoch % 20 == 0:
                print(f"Epoch {epoch}: loss = {total_loss / len(X):.4f}")

# --- Demo: learn AND gate ---
X = np.array([[0,0], [0,1], [1,0], [1,1]])
y = np.array([0, 0, 0, 1])  # AND truth table

p = Perceptron(n_inputs=2)
p.train(X, y, epochs=200)

for xi in X:
    print(f"{xi} → {p.predict(xi):.3f}  (rounded: {round(p.predict(xi))})")
```

### From One Neuron to Deep Networks

A single perceptron can only learn linear boundaries (like AND). By stacking many neurons into multiple layers, we get a **deep neural network** that can learn arbitrarily complex patterns — from recognizing faces to generating text.

| Single Perceptron | Deep Neural Network |
| --- | --- |
| One neuron, one decision boundary | Many neurons across multiple layers |
| Can only learn linear separations | Learns non-linear, complex patterns |
| Cannot solve XOR problem | Can approximate any function |
| Fast to train | Requires more data and compute |

### Key Takeaways

1. A neuron computes: output = activation(weights · inputs + bias)
2. ReLU is the default activation for hidden layers; softmax for multi-class output
3. Stacking layers lets networks learn increasingly abstract features
4. A perceptron is the simplest network — one neuron, one linear boundary
