## The End-to-End ML Pipeline

Building an ML model isn't just about the algorithm — it's a full pipeline from raw data to a deployed, monitored system. Let's walk through every step and build a linear regression model from scratch.

**Flow:**

1. **Collect Data** — Gather raw data from sources
2. **Clean & Prep** — Handle missing values, normalize
3. **Split** — Train / validation / test sets
4. **Train** — Fit model to training data
5. **Evaluate** — Measure performance on test set
6. **Deploy** — Serve predictions in production


### Step 1 — Data Collection & Cleaning

Good data is everything in ML. The model can only be as good as the data it trains on. Common data quality issues include missing values, outliers, inconsistent formats, and duplicate records.

- **Missing values** — Drop rows, fill with mean/median, or use interpolation
- **Outliers** — Cap at percentiles or remove statistically extreme values
- **Feature scaling** — Normalize (0-1) or standardize (mean=0, std=1) numeric features
- **Encoding** — Convert categorical text to numbers (one-hot, label encoding)

### Step 2 — Train/Test Split

We always split data into at least two sets: **training** (what the model learns from) and **test** (what we evaluate on). The test set must be completely unseen during training — this simulates real-world performance.

| Set | Typical Size | Purpose |
| --- | --- | --- |
| Training | 70-80% | Model learns patterns from this data |
| Validation | 10-15% | Tune hyperparameters, prevent overfitting |
| Test | 10-15% | Final unbiased performance evaluation |

> **CAUTION:** Never tune your model based on test set performance! That causes **data leakage** — the model indirectly "sees" the test data. Use a separate validation set for hyperparameter tuning.

### Step 3 — Linear Regression from Scratch

Linear regression finds the best line `y = wx + b` that fits the data. "Best" means minimizing the Mean Squared Error (MSE) between predictions and actual values.

<!-- title: linear_regression.py -->
```python
import numpy as np

class LinearRegression:
    """Linear regression trained with gradient descent."""

    def __init__(self, lr: float = 0.01):
        self.lr = lr
        self.w = None
        self.b = None
        self.losses = []

    def fit(self, X: np.ndarray, y: np.ndarray, epochs: int = 100):
        """Train the model on data."""
        n_samples, n_features = X.shape
        self.w = np.zeros(n_features)
        self.b = 0.0

        for epoch in range(epochs):
            # Forward pass
            y_pred = X @ self.w + self.b

            # Compute loss (MSE)
            loss = np.mean((y_pred - y) ** 2)
            self.losses.append(loss)

            # Compute gradients
            dw = (2 / n_samples) * (X.T @ (y_pred - y))
            db = (2 / n_samples) * np.sum(y_pred - y)

            # Update parameters
            self.w -= self.lr * dw
            self.b -= self.lr * db

            if epoch % 25 == 0:
                print(f"Epoch {epoch:3d}: MSE = {loss:.4f}")

    def predict(self, X: np.ndarray) -> np.ndarray:
        return X @ self.w + self.b

# --- Demo: predict house prices ---
np.random.seed(42)
# Features: [size_sqft, num_bedrooms]
X_train = np.random.rand(80, 2) * [2000, 5]
y_train = X_train[:, 0] * 150 + X_train[:, 1] * 10000 + np.random.randn(80) * 5000

X_test = np.random.rand(20, 2) * [2000, 5]
y_test = X_test[:, 0] * 150 + X_test[:, 1] * 10000 + np.random.randn(20) * 5000

# Normalize features (important!)
mean, std = X_train.mean(axis=0), X_train.std(axis=0)
X_train_norm = (X_train - mean) / std
X_test_norm  = (X_test - mean) / std

# Train
model = LinearRegression(lr=0.1)
model.fit(X_train_norm, y_train, epochs=200)

# Evaluate
y_pred = model.predict(X_test_norm)
test_mse = np.mean((y_pred - y_test) ** 2)
print(f"\nTest MSE: {test_mse:.2f}")
print(f"Learned weights: size={model.w[0]:.0f}, bedrooms={model.w[1]:.0f}")
```

### Understanding the Training Loop

The training loop is the engine of ML. Each iteration does three things: predict, measure error, and adjust. After enough iterations, the model converges to a good solution.

**Flow:**

1. **Predict** — y_pred = X @ w + b
2. **Loss** — MSE = mean((y_pred - y)²)
3. **Gradients** — dw, db = ∂Loss/∂w, ∂Loss/∂b
4. **Update** — w -= lr × dw; b -= lr × db


### Key Takeaways

1. The ML pipeline has 6 stages: collect, clean, split, train, evaluate, deploy
2. Always split data into train/validation/test — never evaluate on training data
3. Feature scaling (normalization) is critical for gradient descent to work well
4. The training loop: predict → compute loss → compute gradients → update weights
