## How Deep Networks Learn

Training a deep network is a four-step dance repeated thousands of times: push data forward through the network, measure the error, flow the error backward to compute gradients, and update the weights. This process — **forward pass → loss → backward pass → update** — is the foundation of all deep learning.

**Flow:**

1. **Input** — Feed batch of training data
2. **Forward Pass** — Compute predictions layer by layer
3. **Loss Function** — Measure prediction error
4. **Backward Pass** — Compute gradients via chain rule
5. **Update Weights** — Optimizer adjusts parameters


### The Forward Pass

Data flows from input to output, layer by layer. Each layer applies: `output = activation(weights × input + bias)`. The final layer produces the prediction.

> **NOTE:** During the forward pass, we save intermediate values (activations) at each layer. These saved values are needed during backpropagation to compute gradients efficiently.

### Loss Functions

The loss function measures how wrong the predictions are. Different tasks use different loss functions:

| Loss Function | Formula | Task | Behavior |
| --- | --- | --- | --- |
| **MSE** | (1/n) Σ(ŷ - y)² | Regression | Penalizes large errors quadratically |
| **MAE** | (1/n) Σ|ŷ - y| | Regression | Linear penalty, robust to outliers |
| **Binary Cross-Entropy** | -[y·log(ŷ) + (1-y)·log(1-ŷ)] | Binary classification | Heavy penalty for confident wrong predictions |
| **Categorical Cross-Entropy** | -Σ yᵢ·log(ŷᵢ) | Multi-class classification | Works with softmax output layer |

### Backpropagation

**Backpropagation** is how the network figures out which weights to blame for the error. It applies the **chain rule** of calculus to flow gradients backward from the loss through each layer, computing how much each weight contributed to the error.

> **TIP:** **Analogy:** Imagine a factory assembly line where the final product has a defect. Backpropagation traces the defect backward through each station to figure out which workers (weights) made mistakes and how much to correct them.

<!-- title: backprop_demo.py -->
```python
import numpy as np

# Simple 2-layer network demonstrating backprop
np.random.seed(42)

# Network: 2 inputs → 3 hidden → 1 output
W1 = np.random.randn(2, 3) * 0.5   # input → hidden
b1 = np.zeros(3)
W2 = np.random.randn(3, 1) * 0.5   # hidden → output
b2 = np.zeros(1)

def relu(z):       return np.maximum(0, z)
def relu_grad(z):  return (z > 0).astype(float)
def sigmoid(z):    return 1 / (1 + np.exp(-z))

# Training data (XOR problem)
X = np.array([[0,0], [0,1], [1,0], [1,1]], dtype=float)
y = np.array([[0], [1], [1], [0]], dtype=float)

lr = 0.5
for epoch in range(1000):
    # === FORWARD PASS ===
    z1 = X @ W1 + b1            # hidden pre-activation
    a1 = relu(z1)               # hidden activation
    z2 = a1 @ W2 + b2           # output pre-activation
    a2 = sigmoid(z2)            # output (prediction)

    # === LOSS ===
    loss = np.mean((a2 - y) ** 2)

    # === BACKWARD PASS (chain rule) ===
    dL_da2 = 2 * (a2 - y) / len(X)          # dLoss/dOutput
    da2_dz2 = a2 * (1 - a2)                  # sigmoid derivative
    dz2 = dL_da2 * da2_dz2                    # gradient at output

    dW2 = a1.T @ dz2                          # gradient for W2
    db2 = np.sum(dz2, axis=0)                 # gradient for b2

    da1 = dz2 @ W2.T                          # propagate to hidden
    dz1 = da1 * relu_grad(z1)                 # gradient at hidden

    dW1 = X.T @ dz1                           # gradient for W1
    db1 = np.sum(dz1, axis=0)                 # gradient for b1

    # === UPDATE WEIGHTS ===
    W2 -= lr * dW2;  b2 -= lr * db2
    W1 -= lr * dW1;  b1 -= lr * db1

    if epoch % 200 == 0:
        print(f"Epoch {epoch}: loss = {loss:.4f}")

print(f"\nPredictions: {a2.flatten().round(2)}")
print(f"Expected:    {y.flatten()}")
```

### Optimizers

Optimizers decide *how* to update weights using gradients. Vanilla SGD takes fixed-size steps; modern optimizers adapt the step size per parameter.

| Optimizer | Key Idea | Pros | Cons |
| --- | --- | --- | --- |
| **SGD** | Fixed learning rate for all params | Simple, well-understood | Slow convergence, sensitive to lr |
| **SGD + Momentum** | Accumulates past gradients | Faster, smoother convergence | Extra hyperparameter (momentum) |
| **RMSProp** | Adapts lr per parameter | Good for non-stationary problems | Can diverge in some cases |
| **Adam** | Momentum + RMSProp combined | Fast, works well out-of-the-box | May generalize worse than SGD |

> **TIP:** **Rule of thumb:** Start with **Adam** (lr=0.001). If you need the best possible performance and have time to tune, switch to **SGD with momentum** and a learning rate schedule.

### Epochs, Batches, and Iterations

| Term | Definition | Example (1000 samples, batch=100) |
| --- | --- | --- |
| **Epoch** | One full pass through the training data | 1 epoch = seeing all 1000 samples |
| **Batch** | A subset of data processed at once | 100 samples per batch |
| **Iteration** | One forward + backward pass on one batch | 10 iterations per epoch |

### Key Takeaways

1. Training = forward pass → loss → backward pass → update, repeated many times
2. Backpropagation uses the chain rule to compute gradients layer by layer
3. MSE for regression, cross-entropy for classification
4. Adam optimizer is a great default; SGD+momentum for maximum performance
5. One epoch = one full pass through the dataset; batch size controls memory vs noise
