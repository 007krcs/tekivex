## What Are Hyperparameters?

<strong>Hyperparameters</strong> are settings you choose <em>before</em> training — they control how the model learns, not what it learns. Unlike model parameters (weights), hyperparameters aren't learned from data; they're set by the engineer.

| Hyperparameter | What It Controls | Typical Range | Impact |
| --- | --- | --- | --- |
| <strong>Learning Rate</strong> | Step size for weight updates | 1e-5 to 1e-1 | Most important — too high: diverge, too low: stuck |
| <strong>Batch Size</strong> | Samples per gradient update | 16 to 512 | Large: stable but may generalize worse |
| <strong>Epochs</strong> | Passes through entire dataset | 10 to 1000 | Too few: underfit, too many: overfit |
| <strong>Hidden Layers</strong> | Network depth | 1 to 100+ | Deeper = more capacity, harder to train |
| <strong>Neurons per Layer</strong> | Layer width | 32 to 4096 | Wider = more capacity, more memory |
| <strong>Dropout Rate</strong> | Fraction of neurons to randomly disable | 0.1 to 0.5 | Regularization — prevents overfitting |

### The Learning Rate — Most Critical Hyperparameter

The learning rate controls how much weights change each step. Getting it right is the single most important tuning decision.

<div class="callout callout-tip">

<strong>Analogy:</strong> Learning rate is like the stride length when walking down a hill. Too big — you overshoot the valley and bounce around. Too small — you take forever to reach the bottom. Just right — smooth, efficient descent.

</div>

- <strong>Too high (0.1+):</strong> Loss oscillates wildly or explodes to NaN
- <strong>Too low (1e-6):</strong> Training takes forever, may get stuck in local minima
- <strong>Sweet spot (1e-4 to 1e-3):</strong> Smooth convergence for most problems
- <strong>Learning rate schedule:</strong> Start high, reduce over time (warmup + decay)

### Search Strategies

<div class="comparison-card">
<div class="comparison-side">

**Grid Search**

- Try every combination of preset values
- Exhaustive but exponentially expensive
- Good for 2-3 hyperparameters
- Wastes time on unimportant dimensions

</div>
<div class="comparison-side">

**Random Search**

- Sample random combinations
- More efficient — explores diverse values
- Better for high-dimensional spaces
- Finds good solutions faster than grid

</div>
</div>

<strong>Bayesian Optimization</strong> is the smartest approach: it builds a model of the objective function and strategically picks the next hyperparameters to try. It learns from previous trials, converging on optimal values much faster.

### Hyperparameter Search Implementation

```python title="hyperparam_search.py"
import numpy as np
from itertools import product

def train_and_evaluate(lr: float, batch_size: int, hidden: int) -> float:
    """Simulate training — returns validation accuracy."""
    # In real code, this trains a model and returns val accuracy
    # Here we simulate with a function that has an optimum
    score = (
        -10 * (np.log10(lr) + 3.0) ** 2    # optimum lr ~= 1e-3
        - 0.001 * (batch_size - 64) ** 2     # optimum batch ~= 64
        - 0.0001 * (hidden - 128) ** 2       # optimum hidden ~= 128
        + 95.0                                # max accuracy
        + np.random.randn() * 0.5            # noise
    )
    return max(0, min(100, score))

# --- Grid Search ---
print("=== Grid Search ===")
best_score, best_params = 0, {}
lr_options = [1e-4, 1e-3, 1e-2]
batch_options = [32, 64, 128]
hidden_options = [64, 128, 256]

trials = 0
for lr, bs, hid in product(lr_options, batch_options, hidden_options):
    score = train_and_evaluate(lr, bs, hid)
    trials += 1
    if score > best_score:
        best_score = score
        best_params = {'lr': lr, 'batch': bs, 'hidden': hid}

print(f"Grid: {trials} trials, best={best_score:.2f}%, params={best_params}")

# --- Random Search ---
print("\n=== Random Search ===")
best_score, best_params = 0, {}
for i in range(27):  # same budget as grid
    lr  = 10 ** np.random.uniform(-4, -1)
    bs  = int(2 ** np.random.uniform(4, 8))     # 16 to 256
    hid = int(2 ** np.random.uniform(5, 9))      # 32 to 512
    score = train_and_evaluate(lr, bs, hid)
    if score > best_score:
        best_score = score
        best_params = {'lr': f'{lr:.5f}', 'batch': bs, 'hidden': hid}

print(f"Random: 27 trials, best={best_score:.2f}%, params={best_params}")
```

### Practical Tuning Tips

1. Start with published defaults (Adam lr=1e-3, batch=32, dropout=0.1)
2. Tune learning rate first — it has the biggest impact
3. Use random search over grid search — more efficient for 3+ hyperparameters
4. Use a learning rate finder: increase lr exponentially, plot loss, pick the steepest descent
5. Monitor validation loss for early stopping — stop training when it starts rising
6. Use cross-validation for robust estimates, especially with small datasets

<div class="callout callout-note">

For production systems, consider automated tools like <strong>Optuna</strong> (Bayesian optimization), <strong>Ray Tune</strong> (distributed tuning), or <strong>W&B Sweeps</strong> (experiment tracking + tuning combined).

</div>

### Key Takeaways

1. Hyperparameters control how the model learns — learning rate is the most critical
2. Grid search is exhaustive but scales poorly; random search is more efficient
3. Bayesian optimization learns from past trials to find optimal values faster
4. Start with established defaults, then tune the most impactful hyperparameters first

