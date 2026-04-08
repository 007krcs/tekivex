import type { TutorialCategory } from '../types';

const category: TutorialCategory = {
  id: 'ai-ml',
  title: 'AI & Machine Learning',
  icon: 'cpu',
  color: '#f59e0b',
  description: 'Neural networks, transformers, LLMs, fine-tuning, AI agents, MCP, LangChain, and swarm intelligence.',
  sections: [
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 1 — Foundations: What is AI?
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      title: 'Foundations — What is AI?',
      topics: [
        // ──────────────────────────────────────────────────────────
        // 1. Intro to AI/ML
        // ──────────────────────────────────────────────────────────
        {
          slug: 'intro-to-ai-ml',
          title: 'Introduction to AI & Machine Learning',
          description: 'What is AI/ML? Types of learning, real-world examples, and core intuition behind how machines learn.',
          keywords: ['ai', 'machine learning', 'supervised learning', 'unsupervised learning', 'reinforcement learning'],
          difficulty: 'beginner',
          estimatedMinutes: 14,
          content: [
            { type: 'heading', level: 2, text: 'What is Artificial Intelligence?', id: 'what-is-ai' },
            { type: 'paragraph', html: 'Artificial Intelligence (AI) is the science of building machines that can perform tasks that normally require human intelligence — things like recognizing images, understanding language, making decisions, and playing games.' },
            { type: 'paragraph', html: '<strong>Machine Learning (ML)</strong> is a subset of AI. Instead of programming explicit rules, we feed data to an algorithm and let it <em>learn patterns</em> on its own. The more data it sees, the better it gets — much like how a child learns by example.' },
            { type: 'callout', variant: 'tip', html: '<strong>Analogy:</strong> Imagine teaching a child to recognize cats. You don\'t write a rulebook saying "cats have pointed ears, whiskers, and tails." Instead, you show hundreds of cat photos, and the child figures out the pattern. That\'s machine learning.' },

            { type: 'heading', level: 3, text: 'The Three Types of Machine Learning', id: 'types-of-ml' },
            { type: 'paragraph', html: 'Machine learning comes in three main flavors, each suited to different kinds of problems:' },
            { type: 'table', headers: ['Type', 'Input', 'Goal', 'Example'], rows: [
              ['<strong>Supervised</strong>', 'Labeled data (input + correct answer)', 'Learn mapping from input → output', 'Spam detection, image classification'],
              ['<strong>Unsupervised</strong>', 'Unlabeled data (input only)', 'Discover hidden patterns/clusters', 'Customer segmentation, anomaly detection'],
              ['<strong>Reinforcement</strong>', 'Environment + rewards/penalties', 'Learn optimal actions via trial & error', 'Game-playing AI, robotics, self-driving'],
            ]},

            { type: 'heading', level: 3, text: 'The ML Pipeline at a Glance', id: 'ml-pipeline-overview' },
            { type: 'paragraph', html: 'Every ML project follows a similar high-level flow. Data goes in, a model is trained, and predictions come out — with a feedback loop to improve over time:' },
            { type: 'flow', steps: [
              { label: 'Data', desc: 'Collect and clean raw data', color: '#6366f1' },
              { label: 'Model', desc: 'Choose algorithm & architecture', color: '#8b5cf6' },
              { label: 'Training', desc: 'Feed data, learn patterns', color: '#a855f7' },
              { label: 'Prediction', desc: 'Make decisions on new data', color: '#f59e0b' },
              { label: 'Feedback Loop', desc: 'Evaluate & improve', color: '#22c55e' },
            ]},

            { type: 'heading', level: 3, text: 'Real-World AI Examples', id: 'real-world-examples' },
            { type: 'list', ordered: false, items: [
              '<strong>Email Spam Filters</strong> — Supervised learning classifies incoming emails as spam or not',
              '<strong>Netflix Recommendations</strong> — Unsupervised + collaborative filtering suggests what to watch',
              '<strong>Self-Driving Cars</strong> — Reinforcement learning + computer vision navigates roads',
              '<strong>Voice Assistants</strong> — Natural language processing understands and responds to speech',
              '<strong>Medical Diagnosis</strong> — Image classification detects diseases from X-rays and MRIs',
            ]},

            { type: 'heading', level: 3, text: 'AI vs ML vs Deep Learning', id: 'ai-vs-ml-vs-dl' },
            { type: 'paragraph', html: 'These terms are often used interchangeably, but they are nested concepts:' },
            { type: 'comparison', left: { title: 'Traditional Programming', color: '#6366f1', items: [
              'Developer writes explicit rules',
              'Rules + Data → Output',
              'Hard to handle edge cases',
              'Brittle — breaks with new patterns',
            ]}, right: { title: 'Machine Learning', color: '#f59e0b', items: [
              'Algorithm learns rules from data',
              'Data + Output → Rules (learned)',
              'Generalizes to unseen cases',
              'Improves with more data',
            ]}},

            { type: 'callout', variant: 'note', html: '<strong>Deep Learning</strong> is a subset of ML that uses neural networks with many layers. It\'s especially powerful for images, audio, and text — but requires more data and compute than simpler ML methods.' },

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'intro-takeaways' },
            { type: 'list', ordered: true, items: [
              'AI is the broad field; ML is a subset that learns from data',
              'Supervised learning needs labeled data; unsupervised discovers patterns; reinforcement learns via rewards',
              'The ML pipeline is: Data → Model → Train → Predict → Improve',
              'Deep Learning uses multi-layer neural networks and powers modern AI breakthroughs',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 2. Math Behind ML
        // ──────────────────────────────────────────────────────────
        {
          slug: 'math-behind-ml',
          title: 'The Math Behind Machine Learning',
          description: 'Linear algebra, calculus, and probability fundamentals for ML — with visual explanations and gradient descent from scratch.',
          keywords: ['linear algebra', 'calculus', 'gradient descent', 'probability', 'bayes theorem', 'vectors', 'matrices'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          prerequisites: ['intro-to-ai-ml'],
          content: [
            { type: 'heading', level: 2, text: 'Why Math Matters for ML', id: 'why-math' },
            { type: 'paragraph', html: 'Machine learning is built on three pillars of mathematics: <strong>linear algebra</strong> (how data is represented), <strong>calculus</strong> (how models learn), and <strong>probability</strong> (how uncertainty is handled). You don\'t need a PhD — just an intuitive understanding of the key concepts.' },

            { type: 'heading', level: 3, text: 'Linear Algebra Basics', id: 'linear-algebra' },
            { type: 'paragraph', html: 'Data in ML is represented as <strong>vectors</strong> (1D arrays) and <strong>matrices</strong> (2D arrays). Every image, sentence, or data point becomes a vector of numbers that the model can process.' },
            { type: 'table', headers: ['Concept', 'What It Is', 'ML Use Case'], rows: [
              ['Vector', 'A list of numbers [3, 1, 4]', 'A single data point (features)'],
              ['Matrix', 'A 2D grid of numbers', 'Dataset (rows = samples, cols = features)'],
              ['Dot Product', 'Multiply corresponding elements and sum', 'Neuron computation: w·x + b'],
              ['Transpose', 'Flip rows and columns', 'Shape alignment in matrix multiplication'],
            ]},
            { type: 'code', language: 'python', title: 'vectors.py', code: `import numpy as np

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
print(f"Batch predictions: {predictions}")` },

            { type: 'heading', level: 3, text: 'Calculus — How Models Learn', id: 'calculus-basics' },
            { type: 'paragraph', html: 'Calculus gives us <strong>gradients</strong> — the direction and magnitude of change. During training, we compute how much each weight contributes to the error, then adjust weights to reduce that error. This is the heart of learning.' },
            { type: 'callout', variant: 'tip', html: '<strong>Analogy:</strong> Imagine you\'re blindfolded on a hilly landscape and want to reach the lowest valley. You feel the slope under your feet (gradient) and take a step downhill. Repeat until you reach the bottom. That\'s gradient descent.' },
            { type: 'list', ordered: false, items: [
              '<strong>Derivative</strong> — Rate of change of a function (slope of the curve)',
              '<strong>Partial Derivative</strong> — Derivative with respect to one variable, holding others constant',
              '<strong>Gradient</strong> — Vector of all partial derivatives (points "uphill")',
              '<strong>Chain Rule</strong> — Compose derivatives of nested functions (critical for backpropagation)',
            ]},

            { type: 'heading', level: 3, text: 'Gradient Descent Visualized', id: 'gradient-descent' },
            { type: 'flow', steps: [
              { label: 'Initialize', desc: 'Start with random weights', color: '#6366f1' },
              { label: 'Forward Pass', desc: 'Compute prediction with current weights', color: '#8b5cf6' },
              { label: 'Compute Loss', desc: 'Measure error (predicted vs actual)', color: '#ef4444' },
              { label: 'Compute Gradient', desc: 'Find direction of steepest ascent', color: '#f59e0b' },
              { label: 'Update Weights', desc: 'Step opposite to gradient', color: '#22c55e' },
              { label: 'Repeat', desc: 'Loop until loss is small enough', color: '#06b6d4' },
            ]},

            { type: 'code', language: 'python', title: 'gradient_descent.py', code: `import numpy as np

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

print(f"\\nLearned: y = {w:.2f}x + {b:.2f}  (true: y = 3x + 2)")` },

            { type: 'heading', level: 3, text: 'Probability & Bayes Theorem', id: 'probability' },
            { type: 'paragraph', html: 'Probability tells us how to reason under uncertainty. <strong>Bayes\' Theorem</strong> lets us update our beliefs when we get new evidence — this is the foundation of spam filters, medical diagnosis, and many ML models.' },
            { type: 'code', language: 'python', title: 'bayes.py', code: `# Bayes' Theorem: P(A|B) = P(B|A) * P(A) / P(B)
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
# Output: ~16.1% — surprisingly low despite 95% test accuracy!` },
            { type: 'callout', variant: 'caution', html: 'A 95%-accurate test doesn\'t mean a positive result is 95% likely to be correct! When the base rate is low (1% prevalence), most positives are false positives. This is the <strong>base rate fallacy</strong>, and Bayes\' Theorem reveals the true probability.' },

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'math-takeaways' },
            { type: 'list', ordered: true, items: [
              'Vectors and matrices are how data is stored and processed in ML',
              'The dot product is the fundamental operation inside every neuron',
              'Gradients tell us which direction to adjust weights to reduce error',
              'Gradient descent iteratively updates weights to minimize loss',
              'Bayes\' Theorem updates beliefs with new evidence — foundational for probabilistic ML',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 3. Neural Network Basics
        // ──────────────────────────────────────────────────────────
        {
          slug: 'neural-network-basics',
          title: 'Neural Network Basics',
          description: 'How neurons, layers, weights, biases, and activation functions work together — with a perceptron from scratch.',
          keywords: ['neural network', 'perceptron', 'activation function', 'sigmoid', 'relu', 'weights', 'biases'],
          difficulty: 'beginner',
          estimatedMinutes: 16,
          prerequisites: ['intro-to-ai-ml'],
          content: [
            { type: 'heading', level: 2, text: 'What is a Neural Network?', id: 'what-is-nn' },
            { type: 'paragraph', html: 'A neural network is a computing system inspired by the brain. It\'s made of layers of <strong>neurons</strong> (also called nodes) connected by <strong>weights</strong>. Each neuron takes inputs, multiplies them by weights, adds a bias, and passes the result through an <strong>activation function</strong>.' },
            { type: 'callout', variant: 'tip', html: '<strong>Analogy:</strong> Think of a neuron like a judge in a talent show. It receives scores from multiple sources (inputs × weights), adds its own bias, and then makes a decision (activation) — "yes, this is good enough to pass through" or "no, not relevant."' },

            { type: 'heading', level: 3, text: 'Anatomy of a Neuron', id: 'neuron-anatomy' },
            { type: 'paragraph', html: 'A single artificial neuron performs one operation: <code>output = activation(w₁x₁ + w₂x₂ + ... + wₙxₙ + bias)</code>. The weights control how much each input matters. The bias shifts the decision boundary. The activation function adds non-linearity.' },
            { type: 'table', headers: ['Component', 'Symbol', 'Role'], rows: [
              ['Input', 'x', 'The data flowing in (features)'],
              ['Weight', 'w', 'How important each input is (learned)'],
              ['Bias', 'b', 'Shifts the activation threshold (learned)'],
              ['Weighted Sum', 'z = w·x + b', 'Linear combination of inputs'],
              ['Activation', 'a = f(z)', 'Adds non-linearity to the output'],
            ]},

            { type: 'heading', level: 3, text: 'Network Architecture', id: 'network-architecture' },
            { type: 'paragraph', html: 'Neurons are organized into <strong>layers</strong>. The input layer receives raw data, hidden layers extract increasingly abstract features, and the output layer produces the final prediction.' },
            { type: 'flow', steps: [
              { label: 'Input Layer', desc: 'Raw features (pixels, numbers, text)', color: '#6366f1' },
              { label: 'Hidden Layer 1', desc: 'Detect simple patterns (edges, shapes)', color: '#8b5cf6' },
              { label: 'Hidden Layer 2', desc: 'Combine into complex features', color: '#a855f7' },
              { label: 'Output Layer', desc: 'Final prediction (class, number)', color: '#f59e0b' },
            ]},

            { type: 'heading', level: 3, text: 'Activation Functions', id: 'activation-functions' },
            { type: 'paragraph', html: 'Without activation functions, a neural network is just a linear equation — no matter how many layers you stack. Activations introduce <strong>non-linearity</strong>, allowing networks to learn complex patterns.' },
            { type: 'table', headers: ['Function', 'Formula', 'Range', 'Use Case'], rows: [
              ['<strong>Sigmoid</strong>', 'σ(x) = 1 / (1 + e⁻ˣ)', '(0, 1)', 'Binary classification output'],
              ['<strong>ReLU</strong>', 'f(x) = max(0, x)', '[0, ∞)', 'Hidden layers (fast, avoids vanishing gradient)'],
              ['<strong>Tanh</strong>', 'f(x) = (eˣ - e⁻ˣ)/(eˣ + e⁻ˣ)', '(-1, 1)', 'Hidden layers (zero-centered)'],
              ['<strong>Softmax</strong>', 'eˣⁱ / Σeˣʲ', '(0, 1), sums to 1', 'Multi-class classification output'],
            ]},
            { type: 'callout', variant: 'note', html: '<strong>ReLU</strong> (Rectified Linear Unit) is the most popular activation for hidden layers. It\'s simple, fast, and avoids the vanishing gradient problem that plagues sigmoid in deep networks.' },

            { type: 'heading', level: 3, text: 'Building a Perceptron from Scratch', id: 'perceptron-code' },
            { type: 'paragraph', html: 'A <strong>perceptron</strong> is the simplest neural network — just one neuron. Let\'s build one that learns to classify points as above or below a line:' },
            { type: 'code', language: 'python', title: 'perceptron.py', code: `import numpy as np

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
    print(f"{xi} → {p.predict(xi):.3f}  (rounded: {round(p.predict(xi))})")` },

            { type: 'heading', level: 3, text: 'From One Neuron to Deep Networks', id: 'deep-networks-intro' },
            { type: 'paragraph', html: 'A single perceptron can only learn linear boundaries (like AND). By stacking many neurons into multiple layers, we get a <strong>deep neural network</strong> that can learn arbitrarily complex patterns — from recognizing faces to generating text.' },
            { type: 'comparison', left: { title: 'Single Perceptron', color: '#6366f1', items: [
              'One neuron, one decision boundary',
              'Can only learn linear separations',
              'Cannot solve XOR problem',
              'Fast to train',
            ]}, right: { title: 'Deep Neural Network', color: '#f59e0b', items: [
              'Many neurons across multiple layers',
              'Learns non-linear, complex patterns',
              'Can approximate any function',
              'Requires more data and compute',
            ]}},

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'nn-takeaways' },
            { type: 'list', ordered: true, items: [
              'A neuron computes: output = activation(weights · inputs + bias)',
              'ReLU is the default activation for hidden layers; softmax for multi-class output',
              'Stacking layers lets networks learn increasingly abstract features',
              'A perceptron is the simplest network — one neuron, one linear boundary',
            ]},
          ],
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 2 — Building Models
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      title: 'Building Models',
      topics: [
        // ──────────────────────────────────────────────────────────
        // 4. First ML Model
        // ──────────────────────────────────────────────────────────
        {
          slug: 'first-ml-model',
          title: 'Your First ML Model',
          description: 'Build a complete ML pipeline from scratch — data collection through deployment with linear regression in Python.',
          keywords: ['linear regression', 'ml pipeline', 'training loop', 'data preprocessing', 'model evaluation'],
          difficulty: 'beginner',
          estimatedMinutes: 18,
          prerequisites: ['intro-to-ai-ml', 'math-behind-ml'],
          content: [
            { type: 'heading', level: 2, text: 'The End-to-End ML Pipeline', id: 'ml-pipeline' },
            { type: 'paragraph', html: 'Building an ML model isn\'t just about the algorithm — it\'s a full pipeline from raw data to a deployed, monitored system. Let\'s walk through every step and build a linear regression model from scratch.' },
            { type: 'flow', steps: [
              { label: 'Collect Data', desc: 'Gather raw data from sources', color: '#6366f1' },
              { label: 'Clean & Prep', desc: 'Handle missing values, normalize', color: '#8b5cf6' },
              { label: 'Split', desc: 'Train / validation / test sets', color: '#a855f7' },
              { label: 'Train', desc: 'Fit model to training data', color: '#f59e0b' },
              { label: 'Evaluate', desc: 'Measure performance on test set', color: '#22c55e' },
              { label: 'Deploy', desc: 'Serve predictions in production', color: '#06b6d4' },
            ]},

            { type: 'heading', level: 3, text: 'Step 1 — Data Collection & Cleaning', id: 'data-prep' },
            { type: 'paragraph', html: 'Good data is everything in ML. The model can only be as good as the data it trains on. Common data quality issues include missing values, outliers, inconsistent formats, and duplicate records.' },
            { type: 'list', ordered: false, items: [
              '<strong>Missing values</strong> — Drop rows, fill with mean/median, or use interpolation',
              '<strong>Outliers</strong> — Cap at percentiles or remove statistically extreme values',
              '<strong>Feature scaling</strong> — Normalize (0-1) or standardize (mean=0, std=1) numeric features',
              '<strong>Encoding</strong> — Convert categorical text to numbers (one-hot, label encoding)',
            ]},

            { type: 'heading', level: 3, text: 'Step 2 — Train/Test Split', id: 'train-test-split' },
            { type: 'paragraph', html: 'We always split data into at least two sets: <strong>training</strong> (what the model learns from) and <strong>test</strong> (what we evaluate on). The test set must be completely unseen during training — this simulates real-world performance.' },
            { type: 'table', headers: ['Set', 'Typical Size', 'Purpose'], rows: [
              ['Training', '70-80%', 'Model learns patterns from this data'],
              ['Validation', '10-15%', 'Tune hyperparameters, prevent overfitting'],
              ['Test', '10-15%', 'Final unbiased performance evaluation'],
            ]},
            { type: 'callout', variant: 'caution', html: 'Never tune your model based on test set performance! That causes <strong>data leakage</strong> — the model indirectly "sees" the test data. Use a separate validation set for hyperparameter tuning.' },

            { type: 'heading', level: 3, text: 'Step 3 — Linear Regression from Scratch', id: 'linear-regression-code' },
            { type: 'paragraph', html: 'Linear regression finds the best line <code>y = wx + b</code> that fits the data. "Best" means minimizing the Mean Squared Error (MSE) between predictions and actual values.' },
            { type: 'code', language: 'python', title: 'linear_regression.py', code: `import numpy as np

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
print(f"\\nTest MSE: {test_mse:.2f}")
print(f"Learned weights: size={model.w[0]:.0f}, bedrooms={model.w[1]:.0f}")` },

            { type: 'heading', level: 3, text: 'Understanding the Training Loop', id: 'training-loop' },
            { type: 'paragraph', html: 'The training loop is the engine of ML. Each iteration does three things: predict, measure error, and adjust. After enough iterations, the model converges to a good solution.' },
            { type: 'flow', steps: [
              { label: 'Predict', desc: 'y_pred = X @ w + b', color: '#6366f1' },
              { label: 'Loss', desc: 'MSE = mean((y_pred - y)²)', color: '#ef4444' },
              { label: 'Gradients', desc: 'dw, db = ∂Loss/∂w, ∂Loss/∂b', color: '#f59e0b' },
              { label: 'Update', desc: 'w -= lr × dw; b -= lr × db', color: '#22c55e' },
            ]},

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'first-model-takeaways' },
            { type: 'list', ordered: true, items: [
              'The ML pipeline has 6 stages: collect, clean, split, train, evaluate, deploy',
              'Always split data into train/validation/test — never evaluate on training data',
              'Feature scaling (normalization) is critical for gradient descent to work well',
              'The training loop: predict → compute loss → compute gradients → update weights',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 5. Classification & Regression
        // ──────────────────────────────────────────────────────────
        {
          slug: 'classification-regression',
          title: 'Classification vs Regression',
          description: 'Understand the two core ML tasks, decision boundaries, evaluation metrics, and logistic regression implementation.',
          keywords: ['classification', 'regression', 'logistic regression', 'confusion matrix', 'precision', 'recall', 'f1 score'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          prerequisites: ['first-ml-model'],
          content: [
            { type: 'heading', level: 2, text: 'Two Fundamental ML Tasks', id: 'two-tasks' },
            { type: 'paragraph', html: 'Every supervised ML problem is either <strong>classification</strong> (predicting a category) or <strong>regression</strong> (predicting a continuous number). The choice determines your model architecture, loss function, and evaluation metrics.' },
            { type: 'comparison', left: { title: 'Classification', color: '#6366f1', items: [
              'Predicts discrete categories (cat/dog, spam/not-spam)',
              'Output: probabilities + class label',
              'Loss: cross-entropy',
              'Metrics: accuracy, precision, recall, F1',
              'Examples: email spam, disease diagnosis, image recognition',
            ]}, right: { title: 'Regression', color: '#22c55e', items: [
              'Predicts continuous numbers (price, temperature)',
              'Output: single numeric value',
              'Loss: mean squared error (MSE)',
              'Metrics: MSE, RMSE, MAE, R²',
              'Examples: house prices, stock forecasting, weather prediction',
            ]}},

            { type: 'heading', level: 3, text: 'Decision Boundaries', id: 'decision-boundaries' },
            { type: 'paragraph', html: 'In classification, the model learns a <strong>decision boundary</strong> — an invisible line (or surface) that separates different classes. A linear model draws a straight line; neural networks can learn curved, complex boundaries.' },
            { type: 'callout', variant: 'tip', html: '<strong>Analogy:</strong> A decision boundary is like a fence between two properties. A simple fence is a straight line. A complex fence might curve around trees and gardens. More complex models build more flexible fences.' },

            { type: 'heading', level: 3, text: 'The Confusion Matrix', id: 'confusion-matrix' },
            { type: 'paragraph', html: 'For classification, the confusion matrix tells you exactly where the model succeeds and fails:' },
            { type: 'table', headers: ['', 'Predicted Positive', 'Predicted Negative'], rows: [
              ['<strong>Actually Positive</strong>', 'True Positive (TP) ✓', 'False Negative (FN) — missed it'],
              ['<strong>Actually Negative</strong>', 'False Positive (FP) — false alarm', 'True Negative (TN) ✓'],
            ]},

            { type: 'heading', level: 3, text: 'Evaluation Metrics', id: 'eval-metrics' },
            { type: 'table', headers: ['Metric', 'Formula', 'When to Use'], rows: [
              ['<strong>Accuracy</strong>', '(TP + TN) / Total', 'Balanced classes only'],
              ['<strong>Precision</strong>', 'TP / (TP + FP)', 'When false positives are costly (spam filter)'],
              ['<strong>Recall</strong>', 'TP / (TP + FN)', 'When false negatives are costly (cancer detection)'],
              ['<strong>F1 Score</strong>', '2 × (P × R) / (P + R)', 'Balance between precision and recall'],
            ]},
            { type: 'callout', variant: 'caution', html: 'Accuracy is misleading with imbalanced data. If 99% of emails are not spam, a model that always predicts "not spam" has 99% accuracy but catches zero spam. Use precision, recall, and F1 instead.' },

            { type: 'heading', level: 3, text: 'Logistic Regression Implementation', id: 'logistic-regression-code' },
            { type: 'paragraph', html: 'Logistic regression is linear regression wrapped with a sigmoid function, turning a continuous output into a probability between 0 and 1:' },
            { type: 'code', language: 'python', title: 'logistic_regression.py', code: `import numpy as np

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
print(f"\\nFinal accuracy: {accuracy:.2%}")` },

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'class-reg-takeaways' },
            { type: 'list', ordered: true, items: [
              'Classification predicts categories; regression predicts numbers',
              'The confusion matrix shows TP, FP, TN, FN — the basis for all classification metrics',
              'Use precision when false positives are costly, recall when false negatives are costly',
              'Logistic regression = linear model + sigmoid → outputs probability for binary classification',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 6. Training Deep Networks
        // ──────────────────────────────────────────────────────────
        {
          slug: 'training-deep-networks',
          title: 'Training Deep Neural Networks',
          description: 'Forward pass, backpropagation, loss functions, optimizers, and the full training process explained visually.',
          keywords: ['backpropagation', 'forward pass', 'loss function', 'optimizer', 'sgd', 'adam', 'cross-entropy', 'mse'],
          difficulty: 'intermediate',
          estimatedMinutes: 20,
          prerequisites: ['neural-network-basics', 'math-behind-ml'],
          content: [
            { type: 'heading', level: 2, text: 'How Deep Networks Learn', id: 'how-dnns-learn' },
            { type: 'paragraph', html: 'Training a deep network is a four-step dance repeated thousands of times: push data forward through the network, measure the error, flow the error backward to compute gradients, and update the weights. This process — <strong>forward pass → loss → backward pass → update</strong> — is the foundation of all deep learning.' },
            { type: 'flow', steps: [
              { label: 'Input', desc: 'Feed batch of training data', color: '#6366f1' },
              { label: 'Forward Pass', desc: 'Compute predictions layer by layer', color: '#8b5cf6' },
              { label: 'Loss Function', desc: 'Measure prediction error', color: '#ef4444' },
              { label: 'Backward Pass', desc: 'Compute gradients via chain rule', color: '#f59e0b' },
              { label: 'Update Weights', desc: 'Optimizer adjusts parameters', color: '#22c55e' },
            ]},

            { type: 'heading', level: 3, text: 'The Forward Pass', id: 'forward-pass' },
            { type: 'paragraph', html: 'Data flows from input to output, layer by layer. Each layer applies: <code>output = activation(weights × input + bias)</code>. The final layer produces the prediction.' },
            { type: 'callout', variant: 'note', html: 'During the forward pass, we save intermediate values (activations) at each layer. These saved values are needed during backpropagation to compute gradients efficiently.' },

            { type: 'heading', level: 3, text: 'Loss Functions', id: 'loss-functions' },
            { type: 'paragraph', html: 'The loss function measures how wrong the predictions are. Different tasks use different loss functions:' },
            { type: 'table', headers: ['Loss Function', 'Formula', 'Task', 'Behavior'], rows: [
              ['<strong>MSE</strong>', '(1/n) Σ(ŷ - y)²', 'Regression', 'Penalizes large errors quadratically'],
              ['<strong>MAE</strong>', '(1/n) Σ|ŷ - y|', 'Regression', 'Linear penalty, robust to outliers'],
              ['<strong>Binary Cross-Entropy</strong>', '-[y·log(ŷ) + (1-y)·log(1-ŷ)]', 'Binary classification', 'Heavy penalty for confident wrong predictions'],
              ['<strong>Categorical Cross-Entropy</strong>', '-Σ yᵢ·log(ŷᵢ)', 'Multi-class classification', 'Works with softmax output layer'],
            ]},

            { type: 'heading', level: 3, text: 'Backpropagation', id: 'backpropagation' },
            { type: 'paragraph', html: '<strong>Backpropagation</strong> is how the network figures out which weights to blame for the error. It applies the <strong>chain rule</strong> of calculus to flow gradients backward from the loss through each layer, computing how much each weight contributed to the error.' },
            { type: 'callout', variant: 'tip', html: '<strong>Analogy:</strong> Imagine a factory assembly line where the final product has a defect. Backpropagation traces the defect backward through each station to figure out which workers (weights) made mistakes and how much to correct them.' },
            { type: 'code', language: 'python', title: 'backprop_demo.py', code: `import numpy as np

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

print(f"\\nPredictions: {a2.flatten().round(2)}")
print(f"Expected:    {y.flatten()}")` },

            { type: 'heading', level: 3, text: 'Optimizers', id: 'optimizers' },
            { type: 'paragraph', html: 'Optimizers decide <em>how</em> to update weights using gradients. Vanilla SGD takes fixed-size steps; modern optimizers adapt the step size per parameter.' },
            { type: 'table', headers: ['Optimizer', 'Key Idea', 'Pros', 'Cons'], rows: [
              ['<strong>SGD</strong>', 'Fixed learning rate for all params', 'Simple, well-understood', 'Slow convergence, sensitive to lr'],
              ['<strong>SGD + Momentum</strong>', 'Accumulates past gradients', 'Faster, smoother convergence', 'Extra hyperparameter (momentum)'],
              ['<strong>RMSProp</strong>', 'Adapts lr per parameter', 'Good for non-stationary problems', 'Can diverge in some cases'],
              ['<strong>Adam</strong>', 'Momentum + RMSProp combined', 'Fast, works well out-of-the-box', 'May generalize worse than SGD'],
            ]},
            { type: 'callout', variant: 'tip', html: '<strong>Rule of thumb:</strong> Start with <strong>Adam</strong> (lr=0.001). If you need the best possible performance and have time to tune, switch to <strong>SGD with momentum</strong> and a learning rate schedule.' },

            { type: 'heading', level: 3, text: 'Epochs, Batches, and Iterations', id: 'epochs-batches' },
            { type: 'table', headers: ['Term', 'Definition', 'Example (1000 samples, batch=100)'], rows: [
              ['<strong>Epoch</strong>', 'One full pass through the training data', '1 epoch = seeing all 1000 samples'],
              ['<strong>Batch</strong>', 'A subset of data processed at once', '100 samples per batch'],
              ['<strong>Iteration</strong>', 'One forward + backward pass on one batch', '10 iterations per epoch'],
            ]},

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'training-takeaways' },
            { type: 'list', ordered: true, items: [
              'Training = forward pass → loss → backward pass → update, repeated many times',
              'Backpropagation uses the chain rule to compute gradients layer by layer',
              'MSE for regression, cross-entropy for classification',
              'Adam optimizer is a great default; SGD+momentum for maximum performance',
              'One epoch = one full pass through the dataset; batch size controls memory vs noise',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 7. CNNs
        // ──────────────────────────────────────────────────────────
        {
          slug: 'cnn',
          title: 'Convolutional Neural Networks (CNNs)',
          description: 'How convolution works, pooling, feature maps, and a complete CNN architecture for image classification.',
          keywords: ['cnn', 'convolution', 'pooling', 'feature maps', 'image classification', 'computer vision'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          prerequisites: ['training-deep-networks'],
          content: [
            { type: 'heading', level: 2, text: 'Why CNNs for Images?', id: 'why-cnns' },
            { type: 'paragraph', html: 'A 256×256 color image has 196,608 pixels. If we flatten it and feed it to a fully connected network, the first layer alone would need millions of weights — impossibly expensive and prone to overfitting. <strong>CNNs</strong> solve this by using small, shared filters that slide across the image, detecting local patterns like edges, textures, and shapes.' },
            { type: 'callout', variant: 'tip', html: '<strong>Analogy:</strong> Imagine examining a painting with a magnifying glass. You slide the glass across the canvas, looking at small patches one at a time. Each position reveals local details — edges, colors, textures. A CNN does exactly this, but with learnable "magnifying glasses" (filters).' },

            { type: 'heading', level: 3, text: 'How Convolution Works', id: 'convolution-explained' },
            { type: 'paragraph', html: 'A <strong>convolution</strong> operation slides a small matrix (called a <strong>filter</strong> or <strong>kernel</strong>, typically 3×3) across the input image. At each position, it computes an element-wise multiplication and sums the result — producing one number in the output <strong>feature map</strong>.' },
            { type: 'list', ordered: true, items: [
              'Place the filter at the top-left corner of the input',
              'Multiply each filter value by the corresponding input value',
              'Sum all products to produce one output pixel',
              'Slide the filter one position right (stride) and repeat',
              'After completing a row, move down and repeat',
            ]},
            { type: 'table', headers: ['Term', 'Description', 'Typical Value'], rows: [
              ['<strong>Filter/Kernel</strong>', 'Small weight matrix that detects a pattern', '3×3, 5×5'],
              ['<strong>Stride</strong>', 'How many pixels the filter moves each step', '1 or 2'],
              ['<strong>Padding</strong>', 'Zeros added around input to control output size', '"same" or "valid"'],
              ['<strong>Feature Map</strong>', 'Output of applying one filter to the input', 'One per filter'],
            ]},

            { type: 'heading', level: 3, text: 'Pooling Layers', id: 'pooling' },
            { type: 'paragraph', html: '<strong>Pooling</strong> reduces the spatial size of feature maps, making the network more efficient and somewhat invariant to small translations. The two most common types:' },
            { type: 'comparison', left: { title: 'Max Pooling', color: '#6366f1', items: [
              'Takes the maximum value in each window',
              'Preserves the strongest activations',
              'Most commonly used (2×2, stride 2)',
              'Reduces dimensions by 4× (halves H and W)',
            ]}, right: { title: 'Average Pooling', color: '#22c55e', items: [
              'Takes the average value in each window',
              'Smooths the feature map',
              'Often used in final layer (global avg pool)',
              'Reduces dimensions by 4× (halves H and W)',
            ]}},

            { type: 'heading', level: 3, text: 'CNN Architecture', id: 'cnn-architecture' },
            { type: 'paragraph', html: 'A typical CNN stacks convolution + pooling layers to extract features, then flattens the result and feeds it through fully connected layers for classification.' },
            { type: 'flow', steps: [
              { label: 'Image Input', desc: '224×224×3 RGB image', color: '#6366f1' },
              { label: 'Conv + ReLU', desc: '32 filters, 3×3 → 224×224×32', color: '#8b5cf6' },
              { label: 'Max Pool', desc: '2×2 → 112×112×32', color: '#a855f7' },
              { label: 'Conv + ReLU', desc: '64 filters, 3×3 → 112×112×64', color: '#ec4899' },
              { label: 'Max Pool', desc: '2×2 → 56×56×64', color: '#ef4444' },
              { label: 'Flatten', desc: '56×56×64 = 200,704 neurons', color: '#f59e0b' },
              { label: 'Dense + ReLU', desc: '128 neurons', color: '#22c55e' },
              { label: 'Output', desc: '10 classes (softmax)', color: '#06b6d4' },
            ]},

            { type: 'heading', level: 3, text: 'CNN in Pseudocode', id: 'cnn-pseudocode' },
            { type: 'code', language: 'python', title: 'cnn_architecture.py', code: `# CNN Architecture for Image Classification (pseudocode / PyTorch-style)

class ImageClassifier:
    """
    Simple CNN: Conv → Pool → Conv → Pool → Flatten → Dense → Output
    """
    def __init__(self, num_classes=10):
        # Feature extractor (convolutional layers)
        self.conv1 = Conv2d(in_channels=3,  out_channels=32, kernel=3, padding=1)
        self.conv2 = Conv2d(in_channels=32, out_channels=64, kernel=3, padding=1)
        self.pool  = MaxPool2d(kernel=2, stride=2)

        # Classifier (fully connected layers)
        self.flatten = Flatten()
        self.fc1 = Linear(64 * 56 * 56, 128)
        self.fc2 = Linear(128, num_classes)

    def forward(self, x):
        # x shape: (batch, 3, 224, 224)

        # Block 1: Conv → ReLU → Pool
        x = relu(self.conv1(x))    # → (batch, 32, 224, 224)
        x = self.pool(x)            # → (batch, 32, 112, 112)

        # Block 2: Conv → ReLU → Pool
        x = relu(self.conv2(x))    # → (batch, 64, 112, 112)
        x = self.pool(x)            # → (batch, 64, 56, 56)

        # Classifier
        x = self.flatten(x)         # → (batch, 200704)
        x = relu(self.fc1(x))       # → (batch, 128)
        x = softmax(self.fc2(x))    # → (batch, 10)
        return x

# Training loop
model = ImageClassifier(num_classes=10)
optimizer = Adam(model.parameters(), lr=0.001)

for epoch in range(20):
    for images, labels in train_loader:
        predictions = model.forward(images)
        loss = cross_entropy(predictions, labels)
        gradients = backward(loss)
        optimizer.step(gradients)` },

            { type: 'heading', level: 3, text: 'What Does Each Layer Learn?', id: 'layer-features' },
            { type: 'paragraph', html: 'Early layers detect simple features; deeper layers combine them into complex patterns:' },
            { type: 'list', ordered: false, items: [
              '<strong>Layer 1:</strong> Edges, gradients, colors (simple patterns)',
              '<strong>Layer 2:</strong> Corners, textures, simple shapes (combinations of edges)',
              '<strong>Layer 3:</strong> Parts of objects (eyes, wheels, leaves)',
              '<strong>Deeper layers:</strong> Full objects, scenes, complex structures',
            ]},

            { type: 'callout', variant: 'note', html: 'This hierarchical feature learning is why CNNs are so powerful. They automatically discover useful features without manual feature engineering — something that took computer vision researchers decades to do by hand.' },

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'cnn-takeaways' },
            { type: 'list', ordered: true, items: [
              'CNNs use shared filters that slide across images to detect local patterns',
              'Convolution + ReLU detects features; pooling reduces spatial size',
              'Deeper layers learn increasingly complex, abstract features',
              'The typical architecture: Conv → Pool → Conv → Pool → Flatten → Dense → Output',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 8. RNNs & Sequence Models
        // ──────────────────────────────────────────────────────────
        {
          slug: 'rnn-sequence-models',
          title: 'RNNs & Sequence Models',
          description: 'Recurrent neural networks, vanishing gradients, LSTM cells, and comparison of sequence model architectures.',
          keywords: ['rnn', 'lstm', 'gru', 'sequence model', 'vanishing gradient', 'time series', 'recurrent'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          prerequisites: ['training-deep-networks'],
          content: [
            { type: 'heading', level: 2, text: 'Why Sequences Need Special Networks', id: 'why-rnns' },
            { type: 'paragraph', html: 'Standard neural networks process each input independently — they have no memory. But many real-world problems involve <strong>sequences</strong> where order matters: text (word order), time series (temporal patterns), audio (sound over time), and video (frames over time). <strong>Recurrent Neural Networks (RNNs)</strong> solve this by maintaining a hidden state that acts as memory.' },
            { type: 'callout', variant: 'tip', html: '<strong>Analogy:</strong> Reading a sentence word by word. When you reach the word "bank," you need context from earlier words to know if it means a river bank or a financial bank. RNNs keep a running summary of everything they\'ve seen so far.' },

            { type: 'heading', level: 3, text: 'How RNNs Work', id: 'rnn-mechanics' },
            { type: 'paragraph', html: 'At each time step, the RNN takes two inputs: the current data point <code>x(t)</code> and the previous hidden state <code>h(t-1)</code>. It produces a new hidden state <code>h(t)</code> and optionally an output. The hidden state carries information forward through the sequence.' },
            { type: 'flow', steps: [
              { label: 'x(t)', desc: 'Current input (e.g., word embedding)', color: '#6366f1' },
              { label: 'h(t-1)', desc: 'Previous hidden state (memory)', color: '#8b5cf6' },
              { label: 'RNN Cell', desc: 'h(t) = tanh(W_h · h(t-1) + W_x · x(t) + b)', color: '#f59e0b' },
              { label: 'h(t)', desc: 'New hidden state → next step', color: '#22c55e' },
              { label: 'Output', desc: 'Optional: y(t) = W_y · h(t)', color: '#06b6d4' },
            ]},

            { type: 'heading', level: 3, text: 'The Vanishing Gradient Problem', id: 'vanishing-gradient' },
            { type: 'paragraph', html: 'When sequences are long, gradients must flow backward through many time steps during backpropagation. With each step, gradients get multiplied by the same weight matrix — if values are small, gradients <strong>vanish</strong> (approach zero), and the network can\'t learn long-range dependencies.' },
            { type: 'callout', variant: 'caution', html: 'A vanilla RNN struggles to connect information more than ~10-20 time steps apart. If a sentence starts with "The cat, which ate the fish that was caught by the fisherman who lived near the..." — by the time the verb arrives, the RNN has forgotten the subject.' },

            { type: 'heading', level: 3, text: 'LSTM — Long Short-Term Memory', id: 'lstm-explained' },
            { type: 'paragraph', html: 'LSTMs solve the vanishing gradient problem with a clever architecture: they add a <strong>cell state</strong> (long-term memory highway) and three <strong>gates</strong> that control what to remember, what to forget, and what to output.' },
            { type: 'list', ordered: false, items: [
              '<strong>Forget Gate:</strong> Decides what to remove from cell state ("forget this old info")',
              '<strong>Input Gate:</strong> Decides what new info to store ("remember this")',
              '<strong>Output Gate:</strong> Decides what part of cell state to output ("share this")',
              '<strong>Cell State:</strong> Highway that carries info across many time steps with minimal modification',
            ]},

            { type: 'heading', level: 3, text: 'RNN vs LSTM vs GRU', id: 'sequence-comparison' },
            { type: 'table', headers: ['Feature', 'Vanilla RNN', 'LSTM', 'GRU'], rows: [
              ['Memory mechanism', 'Single hidden state', 'Cell state + hidden state', 'Combined hidden state'],
              ['Gates', 'None', '3 (forget, input, output)', '2 (reset, update)'],
              ['Long-range dependencies', 'Poor (vanishing gradient)', 'Good (cell state highway)', 'Good (simpler than LSTM)'],
              ['Parameters', 'Fewest', 'Most (3 gates × weights)', 'Fewer than LSTM'],
              ['Training speed', 'Fast but unstable', 'Slower but stable', 'Middle ground'],
              ['Use when', 'Short sequences only', 'Default choice, long sequences', 'Want LSTM-like perf, fewer params'],
            ]},

            { type: 'comparison', left: { title: 'RNN / LSTM / GRU', color: '#6366f1', items: [
              'Process sequences one step at a time',
              'Inherently sequential — hard to parallelize',
              'Good for short-to-medium sequences',
              'Established, well-understood',
              'Largely replaced by Transformers for NLP',
            ]}, right: { title: 'Transformers', color: '#f59e0b', items: [
              'Process entire sequence at once (parallel)',
              'Highly parallelizable — faster training',
              'Handle very long sequences with attention',
              'State of the art for NLP, vision, audio',
              'Require more data and compute',
            ]}},

            { type: 'heading', level: 3, text: 'When to Use Sequence Models', id: 'when-to-use-rnns' },
            { type: 'list', ordered: false, items: [
              '<strong>Time series forecasting</strong> — Stock prices, weather, sensor data',
              '<strong>Text generation</strong> — Character or word-level language models',
              '<strong>Speech recognition</strong> — Converting audio waveforms to text',
              '<strong>Machine translation</strong> — Sequence-to-sequence (now mostly Transformers)',
              '<strong>Music generation</strong> — Creating melodies note by note',
            ]},

            { type: 'callout', variant: 'note', html: 'While Transformers have largely replaced RNNs for NLP tasks, LSTMs and GRUs remain useful for time-series data, on-device ML (smaller models), and situations where you need to process data one step at a time.' },

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'rnn-takeaways' },
            { type: 'list', ordered: true, items: [
              'RNNs process sequences by maintaining a hidden state (memory) across time steps',
              'Vanilla RNNs suffer from vanishing gradients — they forget long-range context',
              'LSTMs add cell state + gates to carry information across long sequences',
              'GRUs are a simpler, often equally effective alternative to LSTMs',
              'Transformers have largely replaced RNNs for most modern NLP tasks',
            ]},
          ],
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 3 — Modern AI: Transformers & LLMs
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      title: 'Modern AI — Transformers & LLMs',
      topics: [
        // ──────────────────────────────────────────────────────────
        // 9. Attention Mechanism
        // ──────────────────────────────────────────────────────────
        {
          slug: 'attention-mechanism',
          title: 'The Attention Mechanism',
          description: 'Self-attention explained simply — Query, Key, Value, attention scores, and a code implementation.',
          keywords: ['attention', 'self-attention', 'query key value', 'scaled dot-product', 'transformer'],
          difficulty: 'advanced',
          estimatedMinutes: 18,
          prerequisites: ['rnn-sequence-models'],
          content: [
            { type: 'heading', level: 2, text: 'What is Attention?', id: 'what-is-attention' },
            { type: 'paragraph', html: 'Attention is a mechanism that lets a model focus on the <strong>most relevant parts</strong> of its input when making predictions. Instead of compressing an entire sequence into one fixed-size hidden state (like RNNs), attention allows the model to look back at all input positions and weigh their importance dynamically.' },
            { type: 'callout', variant: 'tip', html: '<strong>Analogy:</strong> Imagine you\'re in a library looking for information about climate change. Instead of reading every book from cover to cover (RNN), you scan the index, find the relevant chapters, and focus your attention there. That\'s what attention does — it lets the model "look up" the most relevant pieces of information.' },

            { type: 'heading', level: 3, text: 'Query, Key, Value — The Core Concept', id: 'qkv-concept' },
            { type: 'paragraph', html: 'Attention works like a search engine. Each element in the sequence is transformed into three vectors:' },
            { type: 'list', ordered: false, items: [
              '<strong>Query (Q):</strong> "What am I looking for?" — the current word\'s question',
              '<strong>Key (K):</strong> "What do I contain?" — each word\'s label/descriptor',
              '<strong>Value (V):</strong> "What information do I hold?" — the actual content to retrieve',
            ]},
            { type: 'paragraph', html: 'The attention score between two words is the dot product of the query and key. High score = high relevance. These scores are used to create a weighted sum of the values.' },

            { type: 'heading', level: 3, text: 'Scaled Dot-Product Attention', id: 'scaled-dot-product' },
            { type: 'flow', steps: [
              { label: 'Input Embeddings', desc: 'Each token has an embedding vector', color: '#6366f1' },
              { label: 'Compute Q, K, V', desc: 'Multiply by learned weight matrices', color: '#8b5cf6' },
              { label: 'Attention Scores', desc: 'Q × K^T / √d_k (dot product)', color: '#f59e0b' },
              { label: 'Softmax', desc: 'Normalize scores to probabilities', color: '#ef4444' },
              { label: 'Weighted Sum', desc: 'Multiply attention weights × V', color: '#22c55e' },
              { label: 'Output', desc: 'Context-aware representation', color: '#06b6d4' },
            ]},
            { type: 'callout', variant: 'note', html: 'We divide by <code>√d_k</code> (square root of key dimension) to prevent dot products from growing too large, which would push softmax into regions with tiny gradients. This is the "scaled" in "scaled dot-product attention."' },

            { type: 'heading', level: 3, text: 'Self-Attention Example', id: 'self-attention-example' },
            { type: 'paragraph', html: 'Consider the sentence: "The cat sat on the mat because <strong>it</strong> was soft." When processing the word "it," self-attention computes how much each other word relates to "it." The word "mat" gets a high attention score because "it" refers to the mat.' },
            { type: 'table', headers: ['Word', 'Attention Score for "it"', 'Interpretation'], rows: [
              ['The', '0.02', 'Not very relevant'],
              ['cat', '0.08', 'Could be the referent'],
              ['sat', '0.03', 'Action, not a referent'],
              ['on', '0.01', 'Preposition, irrelevant'],
              ['the', '0.01', 'Article, irrelevant'],
              ['<strong>mat</strong>', '<strong>0.72</strong>', 'Most likely referent — "it" = mat'],
              ['because', '0.03', 'Conjunction'],
              ['it', '0.05', 'Self-reference'],
              ['was', '0.03', 'Verb'],
              ['soft', '0.02', 'Adjective describing mat'],
            ]},

            { type: 'heading', level: 3, text: 'Attention Implementation', id: 'attention-code' },
            { type: 'code', language: 'python', title: 'attention.py', code: `import numpy as np

def softmax(x: np.ndarray) -> np.ndarray:
    """Numerically stable softmax."""
    exp_x = np.exp(x - np.max(x, axis=-1, keepdims=True))
    return exp_x / np.sum(exp_x, axis=-1, keepdims=True)

def scaled_dot_product_attention(
    Q: np.ndarray,  # (seq_len, d_k) — queries
    K: np.ndarray,  # (seq_len, d_k) — keys
    V: np.ndarray,  # (seq_len, d_v) — values
) -> tuple[np.ndarray, np.ndarray]:
    """
    Compute scaled dot-product attention.
    Returns: (output, attention_weights)
    """
    d_k = Q.shape[-1]

    # Step 1: Compute attention scores
    scores = Q @ K.T / np.sqrt(d_k)  # (seq_len, seq_len)

    # Step 2: Normalize with softmax
    weights = softmax(scores)  # (seq_len, seq_len)

    # Step 3: Weighted sum of values
    output = weights @ V  # (seq_len, d_v)

    return output, weights

# --- Demo ---
np.random.seed(42)
seq_len, d_model = 4, 8  # 4 tokens, 8-dim embeddings

# Simulated token embeddings (e.g., "the cat sat down")
embeddings = np.random.randn(seq_len, d_model)

# Learned projection matrices
W_q = np.random.randn(d_model, d_model) * 0.1
W_k = np.random.randn(d_model, d_model) * 0.1
W_v = np.random.randn(d_model, d_model) * 0.1

# Project to Q, K, V
Q = embeddings @ W_q
K = embeddings @ W_k
V = embeddings @ W_v

output, attn_weights = scaled_dot_product_attention(Q, K, V)

print("Attention weights (each row shows what each token attends to):")
print(np.round(attn_weights, 3))
print(f"\\nOutput shape: {output.shape}")  # (4, 8) — context-aware embeddings` },

            { type: 'heading', level: 3, text: 'Why Attention Changed Everything', id: 'why-attention-matters' },
            { type: 'comparison', left: { title: 'Without Attention (RNN)', color: '#6366f1', items: [
              'Processes tokens sequentially',
              'Information bottleneck — fixed-size hidden state',
              'Struggles with long-range dependencies',
              'Cannot parallelize across time steps',
            ]}, right: { title: 'With Attention (Transformer)', color: '#f59e0b', items: [
              'Processes all tokens simultaneously',
              'No bottleneck — attends directly to any position',
              'Handles long-range dependencies naturally',
              'Fully parallelizable — much faster training',
            ]}},

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'attention-takeaways' },
            { type: 'list', ordered: true, items: [
              'Attention lets models focus on relevant parts of the input dynamically',
              'Q (query), K (key), V (value) are projections of input embeddings',
              'Attention score = dot product of Q and K, normalized by √d_k, softmaxed',
              'Self-attention allows every token to "look at" every other token in the sequence',
              'This parallel, direct-access mechanism is why Transformers outperform RNNs',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 10. Transformer Architecture
        // ──────────────────────────────────────────────────────────
        {
          slug: 'transformer-architecture',
          title: 'The Transformer Architecture',
          description: 'Complete Transformer breakdown — encoder, decoder, positional encoding, multi-head attention, and feed-forward networks.',
          keywords: ['transformer', 'encoder', 'decoder', 'positional encoding', 'multi-head attention', 'feed-forward'],
          difficulty: 'advanced',
          estimatedMinutes: 20,
          prerequisites: ['attention-mechanism'],
          content: [
            { type: 'heading', level: 2, text: 'The Architecture That Changed AI', id: 'transformer-intro' },
            { type: 'paragraph', html: 'The Transformer, introduced in the landmark 2017 paper, replaced recurrence entirely with <strong>attention</strong>. It processes entire sequences in parallel, enabling massive speedups and paving the way for GPT, BERT, Claude, and every modern LLM. The key insight: you don\'t need recurrence or convolution — attention is all you need.' },

            { type: 'heading', level: 3, text: 'High-Level Architecture', id: 'high-level-arch' },
            { type: 'paragraph', html: 'The original Transformer has two halves: an <strong>Encoder</strong> (understands input) and a <strong>Decoder</strong> (generates output). Modern models often use only one: BERT uses the encoder; GPT/Claude use the decoder.' },
            { type: 'flow', steps: [
              { label: 'Input Tokens', desc: 'Tokenized text sequence', color: '#6366f1' },
              { label: 'Embedding + Position', desc: 'Token embedding + positional encoding', color: '#8b5cf6' },
              { label: 'Multi-Head Attention', desc: 'Multiple parallel attention heads', color: '#a855f7' },
              { label: 'Add & Norm', desc: 'Residual connection + layer norm', color: '#ec4899' },
              { label: 'Feed-Forward', desc: 'Two linear layers with ReLU', color: '#f59e0b' },
              { label: 'Add & Norm', desc: 'Residual connection + layer norm', color: '#ef4444' },
              { label: 'Output', desc: 'Contextualized representations', color: '#22c55e' },
            ]},

            { type: 'heading', level: 3, text: 'Positional Encoding', id: 'positional-encoding' },
            { type: 'paragraph', html: 'Since Transformers process all tokens simultaneously (no sequential order), they need a way to know <em>where</em> each token is in the sequence. <strong>Positional encodings</strong> are vectors added to token embeddings that encode position information using sine and cosine waves of different frequencies.' },
            { type: 'callout', variant: 'tip', html: '<strong>Analogy:</strong> Positional encoding is like adding a "seat number" to each guest at a dinner table. Without it, the model would see a bag of words with no order — "dog bites man" and "man bites dog" would look identical.' },
            { type: 'code', language: 'python', title: 'positional_encoding.py', code: `import numpy as np

def positional_encoding(seq_len: int, d_model: int) -> np.ndarray:
    """Generate sinusoidal positional encodings."""
    pos = np.arange(seq_len)[:, np.newaxis]       # (seq_len, 1)
    dim = np.arange(d_model)[np.newaxis, :]        # (1, d_model)

    # Frequency decreases with dimension
    angle = pos / (10000 ** (2 * (dim // 2) / d_model))

    # Even indices: sine, Odd indices: cosine
    pe = np.zeros((seq_len, d_model))
    pe[:, 0::2] = np.sin(angle[:, 0::2])
    pe[:, 1::2] = np.cos(angle[:, 1::2])
    return pe

# Example: 10 positions, 8 dimensions
pe = positional_encoding(10, 8)
print("Shape:", pe.shape)  # (10, 8)
print("Position 0:", np.round(pe[0], 3))
print("Position 5:", np.round(pe[5], 3))` },

            { type: 'heading', level: 3, text: 'Multi-Head Attention', id: 'multi-head-attention' },
            { type: 'paragraph', html: 'Instead of performing one attention operation, the Transformer runs <strong>multiple attention heads in parallel</strong>. Each head learns to focus on different relationships — one might attend to syntax, another to semantics, another to coreference. Their outputs are concatenated and projected.' },
            { type: 'list', ordered: true, items: [
              'Split Q, K, V into <code>h</code> heads (e.g., 8 or 12)',
              'Each head performs scaled dot-product attention independently',
              'Concatenate all head outputs',
              'Project through a final linear layer to get the output',
            ]},
            { type: 'callout', variant: 'note', html: 'With 8 heads and d_model=512, each head operates on d_k=64 dimensions. This is more expressive than a single head with 512 dimensions because different heads can capture different types of relationships.' },

            { type: 'heading', level: 3, text: 'Feed-Forward Network', id: 'ffn' },
            { type: 'paragraph', html: 'After attention, each position passes through a <strong>feed-forward network</strong> (FFN) — two linear layers with a ReLU activation. This processes each position independently and adds non-linearity. The inner dimension is typically 4× the model dimension (e.g., 2048 for d_model=512).' },

            { type: 'heading', level: 3, text: 'Residual Connections & Layer Normalization', id: 'residual-layernorm' },
            { type: 'paragraph', html: 'Two critical techniques make deep Transformers trainable:' },
            { type: 'list', ordered: false, items: [
              '<strong>Residual Connections:</strong> output = layer(x) + x — lets gradients flow directly through the network, preventing vanishing gradients',
              '<strong>Layer Normalization:</strong> Normalizes activations to have zero mean and unit variance, stabilizing training',
            ]},

            { type: 'heading', level: 3, text: 'Encoder vs Decoder', id: 'encoder-vs-decoder' },
            { type: 'comparison', left: { title: 'Encoder (BERT-style)', color: '#6366f1', items: [
              'Bidirectional — sees full input',
              'Self-attention attends to all positions',
              'Used for understanding (classification, NER)',
              'Examples: BERT, RoBERTa, DeBERTa',
            ]}, right: { title: 'Decoder (GPT-style)', color: '#f59e0b', items: [
              'Autoregressive — sees only past tokens',
              'Causal mask prevents looking ahead',
              'Used for generation (text, code)',
              'Examples: GPT-4, Claude, LLaMA',
            ]}},

            { type: 'heading', level: 3, text: 'Transformer vs RNN', id: 'transformer-vs-rnn' },
            { type: 'table', headers: ['Aspect', 'Transformer', 'RNN/LSTM'], rows: [
              ['Parallelism', 'Fully parallel (all tokens at once)', 'Sequential (one token at a time)'],
              ['Long-range deps', 'Direct attention to any position', 'Decays with distance'],
              ['Training speed', 'Much faster (GPU-friendly)', 'Slower (sequential bottleneck)'],
              ['Memory', 'O(n²) for sequence length n', 'O(n) — more memory-efficient'],
              ['Inductive bias', 'None — must learn everything from data', 'Sequential bias built in'],
            ]},

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'transformer-takeaways' },
            { type: 'list', ordered: true, items: [
              'Transformers replace recurrence with self-attention — processing all tokens in parallel',
              'Positional encodings inject sequence order information into the model',
              'Multi-head attention lets the model focus on different relationship types simultaneously',
              'Residual connections + layer norm make deep stacking possible',
              'Encoder = bidirectional understanding; Decoder = autoregressive generation',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 11. Large Language Models
        // ──────────────────────────────────────────────────────────
        {
          slug: 'large-language-models',
          title: 'Large Language Models (LLMs)',
          description: 'How GPT and Claude work — tokenization, embeddings, transformer blocks, next-token prediction, and sampling strategies.',
          keywords: ['llm', 'gpt', 'claude', 'tokenization', 'next-token prediction', 'temperature', 'top-k', 'top-p'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          prerequisites: ['transformer-architecture'],
          content: [
            { type: 'heading', level: 2, text: 'What Are Large Language Models?', id: 'what-are-llms' },
            { type: 'paragraph', html: 'Large Language Models (LLMs) like GPT-4 and Claude are <strong>decoder-only Transformers</strong> trained on massive text corpora. Their fundamental capability is surprisingly simple: <strong>predict the next token</strong>. Yet from this simple objective, they develop reasoning, coding, translation, and creative abilities.' },
            { type: 'callout', variant: 'note', html: 'An LLM doesn\'t "understand" language the way humans do. It has learned statistical patterns from trillions of words. But these patterns are so rich and deep that the model can generate coherent text, answer questions, write code, and even reason about novel problems.' },

            { type: 'heading', level: 3, text: 'The LLM Pipeline', id: 'llm-pipeline' },
            { type: 'flow', steps: [
              { label: 'Input Text', desc: '"The capital of France is"', color: '#6366f1' },
              { label: 'Tokenizer', desc: 'Split into tokens: ["The", " capital", " of", " France", " is"]', color: '#8b5cf6' },
              { label: 'Embeddings', desc: 'Convert tokens to dense vectors', color: '#a855f7' },
              { label: 'N Transformer Blocks', desc: 'Self-attention + FFN × 96 layers', color: '#f59e0b' },
              { label: 'Logits', desc: 'Score for every token in vocabulary', color: '#ef4444' },
              { label: 'Sampling', desc: 'Select next token ("Paris")', color: '#22c55e' },
            ]},

            { type: 'heading', level: 3, text: 'Tokenization', id: 'tokenization' },
            { type: 'paragraph', html: 'LLMs don\'t work with raw characters or whole words. They use <strong>subword tokenization</strong> (like BPE — Byte Pair Encoding) that splits text into meaningful chunks. Common words are single tokens; rare words are broken into subwords.' },
            { type: 'table', headers: ['Text', 'Tokens', 'Token Count'], rows: [
              ['"Hello world"', '["Hello", " world"]', '2'],
              ['"unbelievable"', '["un", "believ", "able"]', '3'],
              ['"GPT-4 is great!"', '["G", "PT", "-", "4", " is", " great", "!"]', '7'],
              ['"こんにちは"', '["こん", "にち", "は"]', '3'],
            ]},
            { type: 'callout', variant: 'tip', html: 'Typical LLM vocabulary sizes: GPT-4 has ~100,000 tokens. Each token is roughly 3-4 characters in English. This balance lets the model handle any text while keeping sequence lengths manageable.' },

            { type: 'heading', level: 3, text: 'Next-Token Prediction', id: 'next-token' },
            { type: 'paragraph', html: 'The training objective is deceptively simple: given all previous tokens, predict the next one. The model outputs a probability distribution over its entire vocabulary, and the loss function (cross-entropy) pushes the model to assign high probability to the correct next token.' },
            { type: 'paragraph', html: 'During inference, the model generates text one token at a time in an <strong>autoregressive</strong> loop: predict token → append to input → predict next token → repeat.' },

            { type: 'heading', level: 3, text: 'Sampling Strategies', id: 'sampling-strategies' },
            { type: 'paragraph', html: 'When the model outputs logits (scores for each token), we need to choose which token to actually generate. Different sampling strategies control the creativity and randomness of the output:' },
            { type: 'table', headers: ['Strategy', 'How It Works', 'Effect'], rows: [
              ['<strong>Greedy</strong>', 'Always pick the highest probability token', 'Deterministic, repetitive, boring'],
              ['<strong>Temperature</strong>', 'Divide logits by T before softmax', 'T < 1: sharper (more focused); T > 1: flatter (more random)'],
              ['<strong>Top-k</strong>', 'Only consider the top k tokens', 'k=10: choose from 10 best candidates'],
              ['<strong>Top-p (Nucleus)</strong>', 'Consider tokens until cumulative prob ≥ p', 'p=0.9: dynamic number of candidates, covers 90% probability mass'],
            ]},
            { type: 'callout', variant: 'tip', html: '<strong>Rule of thumb:</strong> Temperature 0.0-0.3 for factual/code tasks (focused). Temperature 0.7-1.0 for creative writing (varied). Top-p of 0.9-0.95 is a good default for most use cases.' },

            { type: 'heading', level: 3, text: 'Scale and Emergent Abilities', id: 'scale-emergence' },
            { type: 'paragraph', html: 'LLMs exhibit <strong>emergent abilities</strong> — capabilities that appear suddenly at certain scales. A model with 1B parameters can\'t do arithmetic, but at 100B+ parameters, it suddenly can. These emergent behaviors include:' },
            { type: 'list', ordered: false, items: [
              '<strong>In-context learning:</strong> Learning from examples in the prompt without weight updates',
              '<strong>Chain-of-thought reasoning:</strong> Step-by-step logical reasoning',
              '<strong>Code generation:</strong> Writing and debugging functional code',
              '<strong>Translation:</strong> Translating between languages not explicitly paired in training',
              '<strong>Instruction following:</strong> Understanding and executing complex natural language instructions',
            ]},

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'llm-takeaways' },
            { type: 'list', ordered: true, items: [
              'LLMs are decoder-only Transformers trained on next-token prediction',
              'Tokenization converts text to subword tokens (BPE) — roughly 3-4 chars each',
              'Generation is autoregressive: predict one token, append, repeat',
              'Temperature, top-k, and top-p control the randomness of generated text',
              'Emergent abilities appear at large scales — in-context learning, reasoning, coding',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 12. Fine-Tuning & Transfer Learning
        // ──────────────────────────────────────────────────────────
        {
          slug: 'fine-tuning-transfer',
          title: 'Fine-Tuning & Transfer Learning',
          description: 'Pre-training vs fine-tuning, LoRA, QLoRA, PEFT methods, and when to fine-tune vs prompt engineer.',
          keywords: ['fine-tuning', 'transfer learning', 'lora', 'qlora', 'peft', 'pre-training', 'prompt engineering'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          prerequisites: ['large-language-models'],
          content: [
            { type: 'heading', level: 2, text: 'Transfer Learning — Standing on Giants\' Shoulders', id: 'transfer-learning-intro' },
            { type: 'paragraph', html: 'Training an LLM from scratch costs millions of dollars and months of GPU time. <strong>Transfer learning</strong> lets you take a pre-trained model that already understands language and adapt it to your specific task — often with a small dataset and a fraction of the cost.' },
            { type: 'callout', variant: 'tip', html: '<strong>Analogy:</strong> It\'s like hiring a multilingual expert and teaching them your company\'s jargon. You don\'t need to teach them the entire language — just the specialized vocabulary and patterns for your domain.' },

            { type: 'heading', level: 3, text: 'Pre-Training vs Fine-Tuning', id: 'pretrain-vs-finetune' },
            { type: 'flow', steps: [
              { label: 'Massive Dataset', desc: 'Trillions of tokens from the internet', color: '#6366f1' },
              { label: 'Pre-Train', desc: 'Learn general language understanding', color: '#8b5cf6' },
              { label: 'Base Model', desc: 'Large, general-purpose foundation', color: '#a855f7' },
              { label: 'Task Dataset', desc: 'Small, domain-specific examples', color: '#f59e0b' },
              { label: 'Fine-Tune', desc: 'Adapt to specific task/domain', color: '#22c55e' },
              { label: 'Specialized Model', desc: 'Optimized for your use case', color: '#06b6d4' },
            ]},
            { type: 'table', headers: ['Aspect', 'Pre-Training', 'Fine-Tuning'], rows: [
              ['Data', 'Trillions of tokens (generic)', 'Thousands to millions (task-specific)'],
              ['Cost', '$1M - $100M+', '$10 - $10,000'],
              ['Time', 'Weeks to months', 'Hours to days'],
              ['Hardware', '1000s of GPUs/TPUs', '1-8 GPUs'],
              ['Goal', 'Learn general language patterns', 'Adapt to specific task or domain'],
            ]},

            { type: 'heading', level: 3, text: 'Types of Fine-Tuning', id: 'fine-tuning-types' },
            { type: 'list', ordered: false, items: [
              '<strong>Full Fine-Tuning:</strong> Update all model parameters — most expressive but expensive and risks catastrophic forgetting',
              '<strong>Feature Extraction:</strong> Freeze all layers, only train a new head — cheapest but least adaptable',
              '<strong>PEFT (Parameter-Efficient Fine-Tuning):</strong> Update only a small subset of parameters — best balance of cost and performance',
            ]},

            { type: 'heading', level: 3, text: 'LoRA — Low-Rank Adaptation', id: 'lora-explained' },
            { type: 'paragraph', html: '<strong>LoRA</strong> is the most popular PEFT method. Instead of updating the full weight matrix W (millions of params), it adds two small matrices A and B such that the update is ΔW = A × B. This reduces trainable parameters by 100-1000×.' },
            { type: 'code', language: 'python', title: 'lora_concept.py', code: `# Conceptual LoRA implementation
import numpy as np

class LoRALayer:
    """
    LoRA: Instead of updating full W (d_in × d_out),
    learn two small matrices A (d_in × r) and B (r × d_out)
    where r << d_in, d_out (rank, typically 4-64).
    """
    def __init__(self, d_in: int, d_out: int, rank: int = 8):
        # Original frozen weights
        self.W_frozen = np.random.randn(d_in, d_out) * 0.01

        # LoRA trainable parameters (much smaller!)
        self.A = np.random.randn(d_in, rank) * 0.01   # down-project
        self.B = np.zeros((rank, d_out))                # up-project

        # Stats
        frozen_params = d_in * d_out
        lora_params = d_in * rank + rank * d_out
        print(f"Frozen: {frozen_params:,} params")
        print(f"LoRA:   {lora_params:,} params ({lora_params/frozen_params:.1%})")

    def forward(self, x: np.ndarray) -> np.ndarray:
        # Original output + low-rank adaptation
        return x @ self.W_frozen + x @ self.A @ self.B

# Example: adapting a 4096 × 4096 layer with rank 8
layer = LoRALayer(4096, 4096, rank=8)
# Frozen: 16,777,216 params
# LoRA:   65,536 params (0.4% of original!)` },

            { type: 'heading', level: 3, text: 'QLoRA — Quantized LoRA', id: 'qlora' },
            { type: 'paragraph', html: '<strong>QLoRA</strong> goes further: it quantizes the frozen model to 4-bit precision (reducing memory by 4×) while keeping LoRA adapters in full precision. This lets you fine-tune a 65B parameter model on a single 48GB GPU.' },
            { type: 'callout', variant: 'note', html: 'QLoRA makes fine-tuning accessible to everyone. A model that would normally need 8× A100 GPUs ($200K+ hardware) can be fine-tuned on a single consumer GPU with QLoRA.' },

            { type: 'heading', level: 3, text: 'Fine-Tuning vs Prompt Engineering', id: 'finetune-vs-prompt' },
            { type: 'paragraph', html: 'Not every problem needs fine-tuning. Often, clever prompting can achieve similar results at zero cost:' },
            { type: 'comparison', left: { title: 'When to Fine-Tune', color: '#6366f1', items: [
              'Domain-specific knowledge (medical, legal)',
              'Consistent output format/style needed',
              'Large volume of similar tasks',
              'Latency-sensitive — smaller fine-tuned model',
              'Task requires specialized behavior',
            ]}, right: { title: 'When to Prompt Engineer', color: '#22c55e', items: [
              'General-purpose tasks',
              'Few examples needed (few-shot learning)',
              'Rapid prototyping and iteration',
              'No training infrastructure available',
              'Task can be well-specified in instructions',
            ]}},

            { type: 'heading', level: 3, text: 'PEFT Methods Comparison', id: 'peft-comparison' },
            { type: 'table', headers: ['Method', 'Trainable Params', 'Memory', 'Performance', 'Complexity'], rows: [
              ['Full Fine-Tuning', '100%', 'Very High', 'Best (with enough data)', 'Medium'],
              ['LoRA', '0.1-1%', 'Low', 'Near full fine-tuning', 'Low'],
              ['QLoRA', '0.1-1%', 'Very Low', 'Near LoRA', 'Medium'],
              ['Prefix Tuning', '<0.1%', 'Very Low', 'Good for generation', 'Low'],
              ['Adapters', '1-5%', 'Low', 'Good across tasks', 'Medium'],
            ]},

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'finetune-takeaways' },
            { type: 'list', ordered: true, items: [
              'Transfer learning adapts pre-trained models to specific tasks — saving time and money',
              'LoRA adds small trainable matrices instead of updating all weights (0.1-1% of params)',
              'QLoRA quantizes frozen weights to 4-bit, enabling fine-tuning on consumer GPUs',
              'Fine-tune for domain expertise and consistent behavior; prompt engineer for general tasks',
              'PEFT methods give near-full fine-tuning performance at a fraction of the cost',
            ]},
          ],
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 4 — Training & Optimization
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      title: 'Training & Optimization',
      topics: [
        // ──────────────────────────────────────────────────────────
        // 13. Model Training Pipeline
        // ──────────────────────────────────────────────────────────
        {
          slug: 'model-training-pipeline',
          title: 'The Model Training Pipeline',
          description: 'Full production ML pipeline from data collection through deployment and monitoring — every step explained.',
          keywords: ['ml pipeline', 'data engineering', 'feature engineering', 'model deployment', 'monitoring', 'data versioning'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          prerequisites: ['first-ml-model'],
          content: [
            { type: 'heading', level: 2, text: 'The Full ML Pipeline', id: 'full-pipeline' },
            { type: 'paragraph', html: 'Building a production ML system is much more than training a model. Data collection, cleaning, feature engineering, validation, deployment, and monitoring each require careful attention. In production, the model code is often <em>less than 5%</em> of the total system.' },
            { type: 'flow', steps: [
              { label: 'Data Collection', desc: 'Gather raw data from APIs, DBs, logs', color: '#6366f1' },
              { label: 'Data Cleaning', desc: 'Fix missing values, remove duplicates', color: '#8b5cf6' },
              { label: 'Augmentation', desc: 'Expand dataset with synthetic variations', color: '#a855f7' },
              { label: 'Feature Engineering', desc: 'Create informative input features', color: '#ec4899' },
              { label: 'Train', desc: 'Fit model on training set', color: '#f59e0b' },
              { label: 'Validate', desc: 'Tune hyperparameters on val set', color: '#ef4444' },
              { label: 'Test', desc: 'Final evaluation on held-out data', color: '#22c55e' },
              { label: 'Deploy', desc: 'Serve model in production', color: '#06b6d4' },
              { label: 'Monitor', desc: 'Track drift, errors, performance', color: '#64748b' },
            ]},

            { type: 'heading', level: 3, text: 'Data Collection', id: 'data-collection' },
            { type: 'paragraph', html: 'The quality of your data determines the ceiling of your model\'s performance. No amount of training can fix bad data.' },
            { type: 'list', ordered: false, items: [
              '<strong>APIs & Databases:</strong> Structured data from internal systems',
              '<strong>Web Scraping:</strong> Collecting public data (respecting robots.txt)',
              '<strong>User-Generated:</strong> Labels from annotations, feedback, interactions',
              '<strong>Synthetic Data:</strong> Generated data to fill gaps or handle rare cases',
              '<strong>Third-Party Datasets:</strong> Pre-existing datasets (Kaggle, HuggingFace, etc.)',
            ]},

            { type: 'heading', level: 3, text: 'Data Cleaning & Preprocessing', id: 'data-cleaning' },
            { type: 'table', headers: ['Problem', 'Solution', 'Tool/Method'], rows: [
              ['Missing values', 'Impute with mean/median/mode or drop', 'pandas fillna(), SimpleImputer'],
              ['Duplicates', 'Identify and remove duplicate records', 'pandas drop_duplicates()'],
              ['Outliers', 'Cap at percentiles or remove', 'IQR method, Z-score filtering'],
              ['Inconsistent formats', 'Standardize dates, categories, units', 'Custom parsing, regex'],
              ['Class imbalance', 'Oversample minority, undersample majority', 'SMOTE, random oversampling'],
            ]},

            { type: 'heading', level: 3, text: 'Feature Engineering', id: 'feature-engineering' },
            { type: 'paragraph', html: 'Feature engineering transforms raw data into informative inputs that help the model learn. Good features can make a simple model outperform a complex one with raw features.' },
            { type: 'code', language: 'python', title: 'feature_engineering.py', code: `import numpy as np

# Example: feature engineering for house price prediction
def engineer_features(data: dict) -> dict:
    """Transform raw data into ML-ready features."""
    features = {}

    # Numeric: normalize to [0, 1]
    features['sqft_norm'] = data['sqft'] / 5000.0
    features['bedrooms_norm'] = data['bedrooms'] / 10.0

    # Derived: create new informative features
    features['price_per_sqft'] = data['price'] / max(data['sqft'], 1)
    features['room_ratio'] = data['bedrooms'] / max(data['bathrooms'], 1)
    features['age'] = 2026 - data['year_built']

    # Binning: convert continuous to categorical
    features['age_bucket'] = (
        'new' if features['age'] < 10
        else 'mid' if features['age'] < 30
        else 'old'
    )

    # Interaction: combine features
    features['size_x_bedrooms'] = features['sqft_norm'] * features['bedrooms_norm']

    return features

# Raw data
house = {'sqft': 2000, 'bedrooms': 3, 'bathrooms': 2,
         'price': 450000, 'year_built': 2005}

features = engineer_features(house)
for k, v in features.items():
    print(f"  {k}: {v}")` },

            { type: 'heading', level: 3, text: 'Data Versioning', id: 'data-versioning' },
            { type: 'paragraph', html: 'Just like code has Git, ML datasets need versioning. When you retrain a model and get different results, you need to know whether the data changed. Tools like <strong>DVC</strong> (Data Version Control) track dataset versions alongside code.' },
            { type: 'callout', variant: 'caution', html: '<strong>Reproducibility crisis:</strong> Without data versioning, you can\'t reproduce results. If training data changes silently (new records, removed outliers), the same code will produce a different model. Always version your data.' },

            { type: 'heading', level: 3, text: 'Deployment & Monitoring', id: 'deployment-monitoring' },
            { type: 'paragraph', html: 'Deploying a model is just the beginning. Models degrade over time as real-world data drifts from training data.' },
            { type: 'list', ordered: false, items: [
              '<strong>Model Serving:</strong> REST API, batch prediction, or edge deployment',
              '<strong>Data Drift:</strong> Monitor if input distribution changes (new user behavior)',
              '<strong>Concept Drift:</strong> Monitor if the relationship between inputs and outputs changes',
              '<strong>Performance Metrics:</strong> Track accuracy, latency, throughput in production',
              '<strong>Retraining Triggers:</strong> Automatic retraining when performance drops below threshold',
            ]},

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'pipeline-takeaways' },
            { type: 'list', ordered: true, items: [
              'Production ML is 95% data engineering and infrastructure, 5% model code',
              'Feature engineering can be more impactful than choosing a fancier model',
              'Always version your data alongside your code — reproducibility is critical',
              'Models degrade over time — monitor for data drift and concept drift',
              'The pipeline is a cycle: deploy → monitor → retrain → redeploy',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 14. Hyperparameter Tuning
        // ──────────────────────────────────────────────────────────
        {
          slug: 'hyperparameter-tuning',
          title: 'Hyperparameter Tuning',
          description: 'Learning rate, batch size, and architecture choices — grid search, random search, and Bayesian optimization.',
          keywords: ['hyperparameter', 'learning rate', 'batch size', 'grid search', 'random search', 'bayesian optimization'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          prerequisites: ['training-deep-networks'],
          content: [
            { type: 'heading', level: 2, text: 'What Are Hyperparameters?', id: 'what-are-hyperparams' },
            { type: 'paragraph', html: '<strong>Hyperparameters</strong> are settings you choose <em>before</em> training — they control how the model learns, not what it learns. Unlike model parameters (weights), hyperparameters aren\'t learned from data; they\'re set by the engineer.' },
            { type: 'table', headers: ['Hyperparameter', 'What It Controls', 'Typical Range', 'Impact'], rows: [
              ['<strong>Learning Rate</strong>', 'Step size for weight updates', '1e-5 to 1e-1', 'Most important — too high: diverge, too low: stuck'],
              ['<strong>Batch Size</strong>', 'Samples per gradient update', '16 to 512', 'Large: stable but may generalize worse'],
              ['<strong>Epochs</strong>', 'Passes through entire dataset', '10 to 1000', 'Too few: underfit, too many: overfit'],
              ['<strong>Hidden Layers</strong>', 'Network depth', '1 to 100+', 'Deeper = more capacity, harder to train'],
              ['<strong>Neurons per Layer</strong>', 'Layer width', '32 to 4096', 'Wider = more capacity, more memory'],
              ['<strong>Dropout Rate</strong>', 'Fraction of neurons to randomly disable', '0.1 to 0.5', 'Regularization — prevents overfitting'],
            ]},

            { type: 'heading', level: 3, text: 'The Learning Rate — Most Critical Hyperparameter', id: 'learning-rate' },
            { type: 'paragraph', html: 'The learning rate controls how much weights change each step. Getting it right is the single most important tuning decision.' },
            { type: 'callout', variant: 'tip', html: '<strong>Analogy:</strong> Learning rate is like the stride length when walking down a hill. Too big — you overshoot the valley and bounce around. Too small — you take forever to reach the bottom. Just right — smooth, efficient descent.' },
            { type: 'list', ordered: false, items: [
              '<strong>Too high (0.1+):</strong> Loss oscillates wildly or explodes to NaN',
              '<strong>Too low (1e-6):</strong> Training takes forever, may get stuck in local minima',
              '<strong>Sweet spot (1e-4 to 1e-3):</strong> Smooth convergence for most problems',
              '<strong>Learning rate schedule:</strong> Start high, reduce over time (warmup + decay)',
            ]},

            { type: 'heading', level: 3, text: 'Search Strategies', id: 'search-strategies' },
            { type: 'comparison', left: { title: 'Grid Search', color: '#6366f1', items: [
              'Try every combination of preset values',
              'Exhaustive but exponentially expensive',
              'Good for 2-3 hyperparameters',
              'Wastes time on unimportant dimensions',
            ]}, right: { title: 'Random Search', color: '#f59e0b', items: [
              'Sample random combinations',
              'More efficient — explores diverse values',
              'Better for high-dimensional spaces',
              'Finds good solutions faster than grid',
            ]}},
            { type: 'paragraph', html: '<strong>Bayesian Optimization</strong> is the smartest approach: it builds a model of the objective function and strategically picks the next hyperparameters to try. It learns from previous trials, converging on optimal values much faster.' },

            { type: 'heading', level: 3, text: 'Hyperparameter Search Implementation', id: 'search-code' },
            { type: 'code', language: 'python', title: 'hyperparam_search.py', code: `import numpy as np
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
print("\\n=== Random Search ===")
best_score, best_params = 0, {}
for i in range(27):  # same budget as grid
    lr  = 10 ** np.random.uniform(-4, -1)
    bs  = int(2 ** np.random.uniform(4, 8))     # 16 to 256
    hid = int(2 ** np.random.uniform(5, 9))      # 32 to 512
    score = train_and_evaluate(lr, bs, hid)
    if score > best_score:
        best_score = score
        best_params = {'lr': f'{lr:.5f}', 'batch': bs, 'hidden': hid}

print(f"Random: 27 trials, best={best_score:.2f}%, params={best_params}")` },

            { type: 'heading', level: 3, text: 'Practical Tuning Tips', id: 'tuning-tips' },
            { type: 'list', ordered: true, items: [
              'Start with published defaults (Adam lr=1e-3, batch=32, dropout=0.1)',
              'Tune learning rate first — it has the biggest impact',
              'Use random search over grid search — more efficient for 3+ hyperparameters',
              'Use a learning rate finder: increase lr exponentially, plot loss, pick the steepest descent',
              'Monitor validation loss for early stopping — stop training when it starts rising',
              'Use cross-validation for robust estimates, especially with small datasets',
            ]},

            { type: 'callout', variant: 'note', html: 'For production systems, consider automated tools like <strong>Optuna</strong> (Bayesian optimization), <strong>Ray Tune</strong> (distributed tuning), or <strong>W&B Sweeps</strong> (experiment tracking + tuning combined).' },

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'tuning-takeaways' },
            { type: 'list', ordered: true, items: [
              'Hyperparameters control how the model learns — learning rate is the most critical',
              'Grid search is exhaustive but scales poorly; random search is more efficient',
              'Bayesian optimization learns from past trials to find optimal values faster',
              'Start with established defaults, then tune the most impactful hyperparameters first',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 15. Model Evaluation
        // ──────────────────────────────────────────────────────────
        {
          slug: 'model-evaluation',
          title: 'Model Evaluation & Metrics',
          description: 'ROC curves, AUC, cross-validation, overfitting vs underfitting, and choosing the right evaluation metrics.',
          keywords: ['roc curve', 'auc', 'cross-validation', 'overfitting', 'underfitting', 'evaluation metrics'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          prerequisites: ['classification-regression'],
          content: [
            { type: 'heading', level: 2, text: 'Why Evaluation Matters', id: 'why-evaluation' },
            { type: 'paragraph', html: 'A model that gets 99% accuracy on training data might perform terribly in production. Proper evaluation tells you how the model will perform on <strong>unseen data</strong> — which is all that matters in the real world. Choosing the right metric depends on your problem and what errors cost you.' },

            { type: 'heading', level: 3, text: 'Classification Metrics', id: 'classification-metrics' },
            { type: 'table', headers: ['Metric', 'Formula', 'Range', 'When to Use'], rows: [
              ['<strong>Accuracy</strong>', '(TP+TN) / Total', '0-1', 'Balanced classes only'],
              ['<strong>Precision</strong>', 'TP / (TP+FP)', '0-1', 'When FP are costly (spam → inbox)'],
              ['<strong>Recall (Sensitivity)</strong>', 'TP / (TP+FN)', '0-1', 'When FN are costly (missed cancer)'],
              ['<strong>F1 Score</strong>', '2×P×R / (P+R)', '0-1', 'Balance precision & recall'],
              ['<strong>Specificity</strong>', 'TN / (TN+FP)', '0-1', 'True negative rate'],
              ['<strong>AUC-ROC</strong>', 'Area under ROC curve', '0-1', 'Overall model quality, threshold-independent'],
            ]},

            { type: 'heading', level: 3, text: 'The ROC Curve', id: 'roc-curve' },
            { type: 'paragraph', html: 'The <strong>ROC (Receiver Operating Characteristic)</strong> curve plots True Positive Rate vs False Positive Rate at every classification threshold. <strong>AUC (Area Under Curve)</strong> summarizes this into a single number — 1.0 is perfect, 0.5 is random guessing.' },
            { type: 'list', ordered: false, items: [
              '<strong>AUC = 1.0:</strong> Perfect model — separates classes completely',
              '<strong>AUC = 0.9:</strong> Excellent — strong discrimination',
              '<strong>AUC = 0.7-0.8:</strong> Fair — reasonable performance',
              '<strong>AUC = 0.5:</strong> No discrimination — random coin flip',
            ]},
            { type: 'callout', variant: 'tip', html: 'Use AUC-ROC when you need a threshold-independent measure of model quality. Use F1 when you care about a specific threshold and want to balance precision and recall.' },

            { type: 'heading', level: 3, text: 'Regression Metrics', id: 'regression-metrics' },
            { type: 'table', headers: ['Metric', 'Formula', 'Interpretation'], rows: [
              ['<strong>MSE</strong>', '(1/n) Σ(ŷ-y)²', 'Average squared error — penalizes large errors'],
              ['<strong>RMSE</strong>', '√MSE', 'Same units as target — more interpretable'],
              ['<strong>MAE</strong>', '(1/n) Σ|ŷ-y|', 'Average absolute error — robust to outliers'],
              ['<strong>R² Score</strong>', '1 - SS_res/SS_tot', 'Fraction of variance explained (1.0 = perfect)'],
            ]},

            { type: 'heading', level: 3, text: 'Overfitting vs Underfitting', id: 'overfit-underfit' },
            { type: 'paragraph', html: 'The goal is a model that generalizes well — performing similarly on training and test data.' },
            { type: 'comparison', left: { title: 'Underfitting', color: '#6366f1', items: [
              'Model too simple to capture patterns',
              'High training error AND high test error',
              'Symptom: training loss plateaus high',
              'Fix: more capacity (layers, neurons), more features, train longer',
            ]}, right: { title: 'Overfitting', color: '#ef4444', items: [
              'Model memorizes training data instead of learning patterns',
              'Low training error BUT high test error',
              'Symptom: training loss drops, validation loss rises',
              'Fix: more data, dropout, regularization, early stopping',
            ]}},

            { type: 'heading', level: 3, text: 'Cross-Validation', id: 'cross-validation' },
            { type: 'paragraph', html: '<strong>K-fold cross-validation</strong> gives a more robust estimate of model performance. Instead of a single train/test split, it rotates through K different splits and averages the results.' },
            { type: 'flow', steps: [
              { label: 'Split Data', desc: 'Divide into K equal folds (e.g., K=5)', color: '#6366f1' },
              { label: 'Fold 1 as Test', desc: 'Train on folds 2-5, test on fold 1', color: '#8b5cf6' },
              { label: 'Fold 2 as Test', desc: 'Train on folds 1,3-5, test on fold 2', color: '#a855f7' },
              { label: '... Repeat K times', desc: 'Each fold gets a turn as test set', color: '#f59e0b' },
              { label: 'Average Scores', desc: 'Mean ± std of K evaluations', color: '#22c55e' },
            ]},
            { type: 'callout', variant: 'note', html: '5-fold or 10-fold cross-validation is standard. Use <strong>stratified</strong> K-fold for classification to maintain class proportions in each fold. Leave-one-out (K=N) is for tiny datasets.' },

            { type: 'heading', level: 3, text: 'Training vs Test Accuracy', id: 'train-vs-test' },
            { type: 'table', headers: ['Scenario', 'Train Accuracy', 'Test Accuracy', 'Diagnosis', 'Action'], rows: [
              ['Good fit', '92%', '90%', 'Healthy generalization', 'Deploy!'],
              ['Overfitting', '99%', '75%', 'Memorizing training data', 'Add regularization, get more data'],
              ['Underfitting', '65%', '63%', 'Model too simple', 'More capacity, better features'],
              ['Data leakage', '99%', '99%', 'Test data leaked into training', 'Check preprocessing pipeline!'],
            ]},

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'eval-takeaways' },
            { type: 'list', ordered: true, items: [
              'Choose metrics based on your problem — accuracy is misleading with imbalanced data',
              'AUC-ROC is threshold-independent; F1 balances precision and recall at a specific threshold',
              'Overfitting: low train error, high test error — fix with regularization or more data',
              'Cross-validation gives robust estimates by averaging over K different train/test splits',
              'Always compare training vs test performance to diagnose model health',
            ]},
          ],
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // SECTION 5 — AI Agents & Multi-Agent Systems
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      title: 'AI Agents & Multi-Agent Systems',
      topics: [
        // ──────────────────────────────────────────────────────────
        // 16. What is an AI Agent?
        // ──────────────────────────────────────────────────────────
        {
          slug: 'what-is-ai-agent',
          title: 'What is an AI Agent?',
          description: 'The Observe-Think-Act loop, ReAct pattern, tool use, and how modern AI agents work.',
          keywords: ['ai agent', 'react pattern', 'tool use', 'reasoning', 'autonomous', 'observe think act'],
          difficulty: 'beginner',
          estimatedMinutes: 14,
          content: [
            { type: 'heading', level: 2, text: 'From Chatbots to Agents', id: 'chatbots-to-agents' },
            { type: 'paragraph', html: 'A regular chatbot generates text responses. An <strong>AI Agent</strong> goes further — it can <em>observe</em> its environment, <em>reason</em> about what to do, <em>take actions</em> (call tools, write code, browse the web), and <em>learn from the results</em>. It\'s an LLM with hands and eyes.' },
            { type: 'callout', variant: 'tip', html: '<strong>Analogy:</strong> Think of an AI agent like a smart assistant with a toolbox. You say "book me a flight to Tokyo." The assistant thinks about what\'s needed (reasoning), checks flight APIs (tool use), compares options (observation), and books the best one (action). A chatbot would just tell you how to book a flight.' },

            { type: 'heading', level: 3, text: 'The Agent Loop', id: 'agent-loop' },
            { type: 'paragraph', html: 'Every agent follows a perception-reasoning-action cycle:' },
            { type: 'flow', steps: [
              { label: 'Observe', desc: 'Perceive environment, read inputs', color: '#6366f1' },
              { label: 'Think', desc: 'Reason about what to do next', color: '#8b5cf6' },
              { label: 'Act', desc: 'Execute an action or call a tool', color: '#f59e0b' },
              { label: 'Observe Result', desc: 'See the outcome of the action', color: '#22c55e' },
            ]},
            { type: 'paragraph', html: 'This loop repeats until the agent has accomplished the goal or decides it cannot proceed.' },

            { type: 'heading', level: 3, text: 'The ReAct Pattern', id: 'react-pattern' },
            { type: 'paragraph', html: '<strong>ReAct</strong> (Reasoning + Acting) is the dominant pattern for LLM agents. The model alternates between <em>thinking</em> (chain-of-thought reasoning) and <em>acting</em> (calling tools), using observations from tool results to inform the next step.' },
            { type: 'code', language: 'python', title: 'react_loop.py', code: `# Simplified ReAct agent loop
def react_agent(user_query: str, tools: dict, llm) -> str:
    """
    ReAct loop: Thought → Action → Observation → Thought → ...
    """
    messages = [{"role": "user", "content": user_query}]
    max_steps = 10

    for step in range(max_steps):
        # LLM generates thought + action (or final answer)
        response = llm.generate(messages, tools=tools)

        if response.has_tool_call:
            # Agent decided to use a tool
            tool_name = response.tool_call.name
            tool_args = response.tool_call.arguments
            print(f"  Step {step}: Calling {tool_name}({tool_args})")

            # Execute the tool
            result = tools[tool_name].execute(**tool_args)

            # Feed result back as observation
            messages.append({"role": "tool", "content": str(result)})
        else:
            # Agent generated final answer
            return response.text

    return "Agent exceeded max steps."

# Example tools an agent might use
tools = {
    "search_web":   SearchTool(),
    "run_code":     CodeExecutor(),
    "read_file":    FileReader(),
    "write_file":   FileWriter(),
}` },

            { type: 'heading', level: 3, text: 'Tool Use Flow', id: 'tool-use-flow' },
            { type: 'paragraph', html: 'When an agent needs to take action in the world, it uses <strong>tools</strong> — functions it can call to interact with external systems:' },
            { type: 'flow', steps: [
              { label: 'User Request', desc: '"What\'s the weather in Tokyo?"', color: '#6366f1' },
              { label: 'Agent Thinks', desc: '"I need to check a weather API"', color: '#8b5cf6' },
              { label: 'Tool Call', desc: 'get_weather(city="Tokyo")', color: '#f59e0b' },
              { label: 'Tool Response', desc: '{"temp": 22, "condition": "sunny"}', color: '#22c55e' },
              { label: 'Agent Thinks', desc: '"Now I can answer the user"', color: '#a855f7' },
              { label: 'Final Answer', desc: '"It\'s 22°C and sunny in Tokyo"', color: '#06b6d4' },
            ]},

            { type: 'heading', level: 3, text: 'Agent vs Chatbot', id: 'agent-vs-chatbot' },
            { type: 'comparison', left: { title: 'Chatbot (LLM)', color: '#6366f1', items: [
              'Generates text responses only',
              'No access to external systems',
              'Single turn — no persistent state',
              'Knowledge limited to training data',
              'Cannot take real-world actions',
            ]}, right: { title: 'AI Agent', color: '#f59e0b', items: [
              'Reasons, plans, and takes actions',
              'Uses tools (APIs, code, files, web)',
              'Multi-step — maintains context across steps',
              'Can access live data via tools',
              'Executes real-world tasks autonomously',
            ]}},

            { type: 'heading', level: 3, text: 'Real-World Agent Examples', id: 'agent-examples' },
            { type: 'list', ordered: false, items: [
              '<strong>Claude Code:</strong> Reads files, writes code, runs tests, makes git commits',
              '<strong>Devin:</strong> Autonomous software engineer — plans, codes, debugs, deploys',
              '<strong>AutoGPT:</strong> General-purpose agent that breaks goals into sub-tasks',
              '<strong>Customer Support Agents:</strong> Look up orders, process refunds, escalate issues',
              '<strong>Research Agents:</strong> Search papers, summarize findings, generate reports',
            ]},

            { type: 'callout', variant: 'caution', html: 'Agents are powerful but need guardrails. An agent with unrestricted tool access could make irreversible mistakes. Always implement <strong>human-in-the-loop</strong> confirmation for high-stakes actions (sending emails, making purchases, deleting data).' },

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'agent-takeaways' },
            { type: 'list', ordered: true, items: [
              'An AI agent is an LLM that can observe, reason, and take actions — not just generate text',
              'The ReAct pattern alternates between reasoning (thoughts) and acting (tool calls)',
              'Tools give agents hands — search, code execution, file operations, API calls',
              'The agent loop repeats until the goal is achieved or max steps are reached',
              'Always add guardrails for high-stakes agent actions',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 17. Agent Architectures
        // ──────────────────────────────────────────────────────────
        {
          slug: 'agent-architectures',
          title: 'Agent Architectures',
          description: 'Single agent, multi-agent, hierarchical orchestration, memory systems, and orchestrator/worker patterns.',
          keywords: ['multi-agent', 'orchestrator', 'worker agent', 'memory', 'vector db', 'hierarchical agents'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          prerequisites: ['what-is-ai-agent'],
          content: [
            { type: 'heading', level: 2, text: 'From Single to Multi-Agent Systems', id: 'single-to-multi' },
            { type: 'paragraph', html: 'A single agent works well for simple tasks, but complex problems benefit from <strong>multiple specialized agents</strong> working together — just like how a company has different departments (engineering, design, marketing) rather than one person doing everything.' },

            { type: 'heading', level: 3, text: 'Architecture Patterns', id: 'arch-patterns' },
            { type: 'table', headers: ['Pattern', 'Description', 'Best For'], rows: [
              ['<strong>Single Agent</strong>', 'One LLM with tools, handles everything', 'Simple, well-defined tasks'],
              ['<strong>Multi-Agent (Flat)</strong>', 'Multiple peers collaborate as equals', 'Brainstorming, debate, diverse perspectives'],
              ['<strong>Hierarchical</strong>', 'Manager delegates to specialized workers', 'Complex projects with distinct sub-tasks'],
              ['<strong>Pipeline</strong>', 'Agents in sequence, each refining output', 'Content creation, code review pipelines'],
            ]},

            { type: 'heading', level: 3, text: 'The Orchestrator/Worker Pattern', id: 'orchestrator-worker' },
            { type: 'paragraph', html: 'The most common multi-agent architecture. An <strong>orchestrator</strong> agent receives the user\'s request, breaks it into sub-tasks, delegates to <strong>worker agents</strong>, and aggregates their results.' },
            { type: 'flow', steps: [
              { label: 'User Request', desc: '"Build me a landing page"', color: '#6366f1' },
              { label: 'Orchestrator', desc: 'Plans tasks, assigns to workers', color: '#8b5cf6' },
              { label: 'Design Agent', desc: 'Creates layout and color scheme', color: '#f59e0b' },
              { label: 'Code Agent', desc: 'Writes HTML/CSS/JS', color: '#22c55e' },
              { label: 'Copy Agent', desc: 'Writes compelling text content', color: '#06b6d4' },
              { label: 'Orchestrator', desc: 'Combines results, ensures quality', color: '#8b5cf6' },
              { label: 'Final Response', desc: 'Complete landing page delivered', color: '#a855f7' },
            ]},

            { type: 'code', language: 'typescript', title: 'orchestrator.ts', code: `// Orchestrator/Worker agent pattern
interface AgentResult {
  agent: string;
  output: string;
  status: 'success' | 'error';
}

interface WorkerAgent {
  name: string;
  description: string;
  execute(task: string, context: Record<string, string>): Promise<AgentResult>;
}

class Orchestrator {
  private workers: Map<string, WorkerAgent> = new Map();

  registerWorker(agent: WorkerAgent): void {
    this.workers.set(agent.name, agent);
  }

  async handleRequest(userRequest: string): Promise<string> {
    // Step 1: Plan — break request into sub-tasks
    const plan = await this.planTasks(userRequest);
    console.log("Plan:", plan.map(t => t.task));

    // Step 2: Execute — delegate to workers
    const results: AgentResult[] = [];
    const context: Record<string, string> = {};

    for (const step of plan) {
      const worker = this.workers.get(step.agent);
      if (!worker) throw new Error(\`No worker: \${step.agent}\`);

      const result = await worker.execute(step.task, context);
      results.push(result);

      // Share results with subsequent agents
      context[step.agent] = result.output;
    }

    // Step 3: Aggregate — combine worker outputs
    return this.aggregate(userRequest, results);
  }

  private async planTasks(request: string) {
    // LLM decomposes request into steps
    return [
      { agent: 'researcher', task: 'Research the topic' },
      { agent: 'writer',     task: 'Write the content' },
      { agent: 'reviewer',   task: 'Review and refine' },
    ];
  }

  private async aggregate(request: string, results: AgentResult[]) {
    return results.map(r => r.output).join('\\n\\n');
  }
}` },

            { type: 'heading', level: 3, text: 'Agent Memory Systems', id: 'agent-memory' },
            { type: 'paragraph', html: 'Agents need memory to be effective. There are three types:' },
            { type: 'table', headers: ['Memory Type', 'Duration', 'Implementation', 'Use Case'], rows: [
              ['<strong>Short-Term</strong>', 'Current conversation', 'Context window / chat history', 'Tracking current task state'],
              ['<strong>Working Memory</strong>', 'Current session', 'Scratchpad / variables', 'Intermediate results, plans'],
              ['<strong>Long-Term</strong>', 'Across sessions', 'Vector database / knowledge base', 'User preferences, learned facts'],
            ]},

            { type: 'heading', level: 3, text: 'Vector Database for Long-Term Memory', id: 'vector-db-memory' },
            { type: 'paragraph', html: 'Long-term memory typically uses a <strong>vector database</strong>. Text is converted to embeddings (dense vectors), stored, and retrieved by semantic similarity — so the agent can recall relevant information even if the exact wording differs.' },
            { type: 'flow', steps: [
              { label: 'New Information', desc: 'Agent learns something worth remembering', color: '#6366f1' },
              { label: 'Embed', desc: 'Convert text to vector embedding', color: '#8b5cf6' },
              { label: 'Store', desc: 'Save in vector database with metadata', color: '#f59e0b' },
              { label: 'Later: Query', desc: 'Search for relevant memories by similarity', color: '#22c55e' },
              { label: 'Recall', desc: 'Retrieved memories added to agent context', color: '#06b6d4' },
            ]},

            { type: 'heading', level: 3, text: 'Architecture Decision Guide', id: 'arch-decision' },
            { type: 'comparison', left: { title: 'Use Single Agent', color: '#6366f1', items: [
              'Task is well-defined and bounded',
              'Can be done with 3-5 tool calls',
              'Low latency requirement',
              'Simple workflow, no sub-tasks',
            ]}, right: { title: 'Use Multi-Agent', color: '#f59e0b', items: [
              'Task requires diverse expertise',
              'Multiple independent sub-tasks',
              'Quality benefits from specialization',
              'Complex workflows with dependencies',
            ]}},

            { type: 'callout', variant: 'caution', html: 'Multi-agent systems add complexity. Each agent call has latency and cost. Start with a single agent and only add more when you\'ve identified clear sub-tasks that benefit from specialization.' },

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'arch-takeaways' },
            { type: 'list', ordered: true, items: [
              'Single agent for simple tasks; multi-agent for complex ones requiring diverse expertise',
              'The orchestrator/worker pattern delegates sub-tasks to specialized agents',
              'Agent memory: short-term (context), working (scratchpad), long-term (vector DB)',
              'Vector databases enable semantic memory retrieval across sessions',
              'Start simple — add agents only when complexity demands it',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 18. Swarm Intelligence
        // ──────────────────────────────────────────────────────────
        {
          slug: 'swarm-intelligence',
          title: 'Swarm Intelligence',
          description: 'How agents communicate — message passing, shared state, blackboard architecture, and network topologies.',
          keywords: ['swarm intelligence', 'message passing', 'blackboard architecture', 'multi-agent communication', 'topology'],
          difficulty: 'advanced',
          estimatedMinutes: 16,
          prerequisites: ['agent-architectures'],
          content: [
            { type: 'heading', level: 2, text: 'What is Swarm Intelligence?', id: 'what-is-swarm' },
            { type: 'paragraph', html: '<strong>Swarm intelligence</strong> is how many simple agents, following simple rules, produce complex collective behavior. No single ant builds a colony; no single bee finds the best flowers. But together, through local interactions and shared signals, they solve problems that no individual could.' },
            { type: 'callout', variant: 'tip', html: '<strong>Analogy:</strong> Ant colonies find the shortest path to food without any central planner. Each ant follows simple rules: follow pheromone trails, leave your own pheromone, and wander randomly if no trail exists. The colony as a whole converges on optimal paths. AI swarms work the same way.' },

            { type: 'heading', level: 3, text: 'Communication Patterns', id: 'communication-patterns' },
            { type: 'table', headers: ['Pattern', 'How It Works', 'Pros', 'Cons'], rows: [
              ['<strong>Message Passing</strong>', 'Agents send direct messages to each other', 'Precise, targeted communication', 'Must know who to talk to'],
              ['<strong>Shared State</strong>', 'Agents read/write to a shared memory', 'Simple, decoupled agents', 'Concurrency issues, bottleneck'],
              ['<strong>Blackboard</strong>', 'Shared workspace; agents react to changes', 'Flexible, event-driven', 'Complex coordination logic'],
              ['<strong>Stigmergy</strong>', 'Agents modify environment; others react', 'Fully decoupled, scalable', 'Indirect, slower convergence'],
            ]},

            { type: 'heading', level: 3, text: 'Message Bus Architecture', id: 'message-bus' },
            { type: 'flow', steps: [
              { label: 'Agent A', desc: 'Publishes: "Found relevant data"', color: '#6366f1' },
              { label: 'Message Bus', desc: 'Routes messages to subscribers', color: '#f59e0b' },
              { label: 'Agent B', desc: 'Receives and analyzes data', color: '#22c55e' },
              { label: 'Agent C', desc: 'Receives and generates report', color: '#06b6d4' },
              { label: 'Agent D', desc: 'Receives and updates dashboard', color: '#8b5cf6' },
            ]},

            { type: 'heading', level: 3, text: 'Network Topologies', id: 'topologies' },
            { type: 'paragraph', html: 'The topology defines how agents connect and communicate. Different topologies suit different problem structures:' },
            { type: 'table', headers: ['Topology', 'Structure', 'Communication', 'Best For'], rows: [
              ['<strong>Mesh</strong>', 'Every agent connects to every other', 'O(n²) connections', 'Small groups needing full collaboration'],
              ['<strong>Star</strong>', 'All agents connect through a central hub', 'Hub routes all messages', 'Centralized coordination, orchestrator pattern'],
              ['<strong>Hierarchical</strong>', 'Tree structure — managers and workers', 'Top-down delegation, bottom-up reporting', 'Large organizations, clear task decomposition'],
              ['<strong>Ring</strong>', 'Each agent connects to two neighbors', 'Messages pass around the ring', 'Sequential processing, consensus algorithms'],
            ]},

            { type: 'heading', level: 3, text: 'Blackboard Architecture', id: 'blackboard' },
            { type: 'paragraph', html: 'The <strong>blackboard pattern</strong> uses a shared workspace where agents post findings and react to changes. A controller decides which agent to activate based on the current state of the blackboard.' },
            { type: 'code', language: 'typescript', title: 'blackboard.ts', code: `// Blackboard architecture for agent communication
interface BlackboardEntry {
  agent: string;
  type: 'hypothesis' | 'evidence' | 'conclusion';
  content: string;
  confidence: number;
  timestamp: number;
}

class Blackboard {
  private entries: BlackboardEntry[] = [];
  private subscribers: Map<string, (entry: BlackboardEntry) => void> = new Map();

  // Agents post findings to the shared workspace
  post(entry: BlackboardEntry): void {
    this.entries.push(entry);
    console.log(\`[\${entry.agent}] posted \${entry.type}: "\${entry.content}" (conf: \${entry.confidence})\`);

    // Notify all subscribers
    for (const [name, handler] of this.subscribers) {
      if (name !== entry.agent) handler(entry);
    }
  }

  // Agents subscribe to react to new entries
  subscribe(agentName: string, handler: (entry: BlackboardEntry) => void): void {
    this.subscribers.set(agentName, handler);
  }

  // Query the blackboard for relevant information
  query(type?: string, minConfidence?: number): BlackboardEntry[] {
    return this.entries.filter(e =>
      (!type || e.type === type) &&
      (!minConfidence || e.confidence >= minConfidence)
    );
  }
}

// Usage: research swarm
const board = new Blackboard();

board.subscribe('analyst', (entry) => {
  if (entry.type === 'evidence' && entry.confidence > 0.7) {
    // Analyst reacts to high-confidence evidence
    board.post({
      agent: 'analyst',
      type: 'hypothesis',
      content: \`Based on "\${entry.content}", I hypothesize...\`,
      confidence: 0.6,
      timestamp: Date.now(),
    });
  }
});` },

            { type: 'heading', level: 3, text: 'Nature-Inspired AI Swarms', id: 'nature-inspired' },
            { type: 'paragraph', html: 'Many AI swarm algorithms are directly inspired by nature:' },
            { type: 'list', ordered: false, items: [
              '<strong>Ant Colony Optimization (ACO):</strong> Digital pheromone trails for path finding and routing problems',
              '<strong>Particle Swarm Optimization (PSO):</strong> Agents explore solution space, sharing best-found positions',
              '<strong>Bee Algorithm:</strong> Scout bees explore, recruit others to promising areas — used for load balancing',
              '<strong>Firefly Algorithm:</strong> Agents attracted to brighter (better) solutions — used for optimization',
            ]},

            { type: 'heading', level: 3, text: 'Modern AI Swarms', id: 'modern-swarms' },
            { type: 'comparison', left: { title: 'Nature Swarms', color: '#22c55e', items: [
              'Simple agents, simple rules',
              'No central controller',
              'Emergent collective behavior',
              'Robust to individual failures',
              'Examples: ants, bees, flocking birds',
            ]}, right: { title: 'AI Swarms', color: '#f59e0b', items: [
              'LLM-powered agents with reasoning',
              'Optional orchestrator for efficiency',
              'Explicit communication protocols',
              'Can handle complex, diverse tasks',
              'Examples: CrewAI, AutoGen, Swarm',
            ]}},

            { type: 'callout', variant: 'note', html: 'OpenAI\'s Swarm framework and Microsoft\'s AutoGen are practical implementations of multi-agent swarms. They provide tools for agent coordination, message passing, and shared state management.' },

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'swarm-takeaways' },
            { type: 'list', ordered: true, items: [
              'Swarm intelligence produces complex behavior from simple agents following simple rules',
              'Communication patterns: message passing, shared state, blackboard, stigmergy',
              'Network topology (mesh, star, hierarchical) affects coordination efficiency',
              'The blackboard pattern is a flexible shared workspace for multi-agent collaboration',
              'Nature-inspired algorithms (ACO, PSO) solve optimization via collective exploration',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 19. MCP Protocol
        // ──────────────────────────────────────────────────────────
        {
          slug: 'mcp-protocol',
          title: 'Model Context Protocol (MCP)',
          description: 'How MCP connects AI models to tools — client/server architecture, tool registration, and practical implementation.',
          keywords: ['mcp', 'model context protocol', 'tool use', 'claude code', 'ai tools', 'server', 'client'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          prerequisites: ['what-is-ai-agent'],
          content: [
            { type: 'heading', level: 2, text: 'What is MCP?', id: 'what-is-mcp' },
            { type: 'paragraph', html: 'The <strong>Model Context Protocol (MCP)</strong> is an open standard for connecting AI models to external tools and data sources. Think of it as a <strong>USB-C for AI</strong> — a universal interface that lets any AI model talk to any tool through a standardized protocol.' },
            { type: 'callout', variant: 'tip', html: '<strong>Analogy:</strong> Before USB, every device had its own connector. MCP does for AI tools what USB did for peripherals — one standard protocol that lets any AI model use any tool, regardless of who built either one.' },

            { type: 'heading', level: 3, text: 'The MCP Architecture', id: 'mcp-architecture' },
            { type: 'flow', steps: [
              { label: 'AI Model', desc: 'LLM that needs to use tools', color: '#6366f1' },
              { label: 'MCP Client', desc: 'Translates model requests to MCP protocol', color: '#8b5cf6' },
              { label: 'MCP Server', desc: 'Hosts tools and handles requests', color: '#f59e0b' },
              { label: 'Tool Execution', desc: 'Runs the actual function/API call', color: '#22c55e' },
              { label: 'Result', desc: 'Structured response back to model', color: '#06b6d4' },
            ]},
            { type: 'paragraph', html: 'The architecture has three key components:' },
            { type: 'list', ordered: false, items: [
              '<strong>MCP Client:</strong> Lives alongside the AI model. Discovers available servers, sends tool requests, receives results. Examples: Claude Desktop, Claude Code, IDE extensions.',
              '<strong>MCP Server:</strong> Exposes tools and data to clients. Can be local (filesystem, git) or remote (APIs, databases). Lightweight — typically a single-purpose process.',
              '<strong>Transport:</strong> Communication layer between client and server. Supports stdio (local) and HTTP/SSE (remote).',
            ]},

            { type: 'heading', level: 3, text: 'How Claude Code Uses MCP', id: 'claude-code-mcp' },
            { type: 'paragraph', html: 'Claude Code connects to MCP servers to extend its capabilities. Each server provides specialized tools:' },
            { type: 'table', headers: ['MCP Server', 'Tools Provided', 'Example Use'], rows: [
              ['Filesystem', 'read_file, write_file, list_dir', 'Reading and editing code files'],
              ['Git', 'git_status, git_diff, git_commit', 'Version control operations'],
              ['Browser', 'navigate, screenshot, click', 'Web automation and testing'],
              ['Database', 'query, insert, update', 'Database operations'],
              ['Search', 'web_search, semantic_search', 'Finding information'],
            ]},

            { type: 'heading', level: 3, text: 'Building an MCP Server', id: 'mcp-server-code' },
            { type: 'paragraph', html: 'An MCP server is surprisingly simple to build. It registers tools with their schemas and handles incoming requests:' },
            { type: 'code', language: 'typescript', title: 'mcp-server.ts', code: `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create MCP server
const server = new McpServer({
  name: "weather-server",
  version: "1.0.0",
});

// Register a tool with typed parameters
server.tool(
  "get_weather",
  "Get current weather for a city",
  {
    city: z.string().describe("City name (e.g., 'Tokyo')"),
    units: z.enum(["celsius", "fahrenheit"]).default("celsius"),
  },
  async ({ city, units }) => {
    // In production, call a real weather API
    const temp = units === "celsius" ? 22 : 72;
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          city,
          temperature: temp,
          units,
          condition: "sunny",
          humidity: 65,
        }),
      }],
    };
  }
);

// Register another tool
server.tool(
  "get_forecast",
  "Get 5-day weather forecast",
  {
    city: z.string().describe("City name"),
    days: z.number().min(1).max(7).default(5),
  },
  async ({ city, days }) => {
    const forecast = Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      high: 20 + Math.floor(Math.random() * 10),
      low: 10 + Math.floor(Math.random() * 8),
      condition: ["sunny", "cloudy", "rainy"][i % 3],
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(forecast) }],
    };
  }
);

// Start server with stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Weather MCP server running on stdio");` },

            { type: 'heading', level: 3, text: 'Tool Registration Flow', id: 'tool-registration' },
            { type: 'flow', steps: [
              { label: 'Define Tool', desc: 'Name, description, parameter schema', color: '#6366f1' },
              { label: 'Register', desc: 'Server adds tool to its registry', color: '#8b5cf6' },
              { label: 'Discovery', desc: 'Client asks server for available tools', color: '#a855f7' },
              { label: 'Tool List', desc: 'Server returns tool names + schemas', color: '#f59e0b' },
              { label: 'AI Sees Tools', desc: 'Tools appear in model\'s system prompt', color: '#22c55e' },
              { label: 'Model Calls Tool', desc: 'AI decides to invoke a tool with args', color: '#06b6d4' },
            ]},

            { type: 'heading', level: 3, text: 'MCP vs Direct API Integration', id: 'mcp-vs-direct' },
            { type: 'comparison', left: { title: 'Direct API Integration', color: '#6366f1', items: [
              'Custom code for each tool/API',
              'Tightly coupled to specific AI provider',
              'Must handle auth, retries, errors manually',
              'Hard to reuse across different AI models',
            ]}, right: { title: 'MCP Protocol', color: '#22c55e', items: [
              'Standardized interface for all tools',
              'Works with any MCP-compatible AI client',
              'Protocol handles communication details',
              'Build once, use with any AI model',
            ]}},

            { type: 'callout', variant: 'note', html: 'MCP is actively developed by Anthropic and is used by Claude Desktop, Claude Code, and third-party tools. The ecosystem includes servers for filesystems, databases, GitHub, Slack, Google Drive, and hundreds more.' },

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'mcp-takeaways' },
            { type: 'list', ordered: true, items: [
              'MCP is a universal protocol connecting AI models to tools — like USB-C for AI',
              'Architecture: AI Model → MCP Client → MCP Server → Tool Execution → Result',
              'MCP servers are lightweight, single-purpose processes that expose tools',
              'Tools are registered with name, description, and typed parameter schema',
              'Build an MCP server once, and any MCP-compatible AI client can use it',
            ]},
          ],
        },

        // ──────────────────────────────────────────────────────────
        // 20. LangChain & LangGraph
        // ──────────────────────────────────────────────────────────
        {
          slug: 'langchain-langgraph',
          title: 'LangChain & LangGraph',
          description: 'LangChain chains, LangGraph state machines, RAG pipelines, and building practical AI agent workflows.',
          keywords: ['langchain', 'langgraph', 'rag', 'retrieval augmented generation', 'chain', 'state machine', 'vector db'],
          difficulty: 'intermediate',
          estimatedMinutes: 20,
          prerequisites: ['what-is-ai-agent', 'agent-architectures'],
          content: [
            { type: 'heading', level: 2, text: 'Building AI Applications with LangChain', id: 'langchain-intro' },
            { type: 'paragraph', html: '<strong>LangChain</strong> is a framework for building applications powered by LLMs. Its core concept is the <strong>chain</strong> — a sequence of steps where each step\'s output feeds into the next. Think of it as a pipeline: Prompt → LLM → Parser → Action.' },

            { type: 'heading', level: 3, text: 'The Chain Concept', id: 'chain-concept' },
            { type: 'flow', steps: [
              { label: 'Prompt Template', desc: 'Fill in variables to create a prompt', color: '#6366f1' },
              { label: 'LLM', desc: 'Send prompt to language model', color: '#8b5cf6' },
              { label: 'Output Parser', desc: 'Extract structured data from response', color: '#f59e0b' },
              { label: 'Action', desc: 'Use parsed output (API call, DB write, etc.)', color: '#22c55e' },
            ]},

            { type: 'code', language: 'python', title: 'langchain_chain.py', code: `# Simple LangChain chain example
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_anthropic import ChatAnthropic

# Step 1: Create a prompt template
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful coding assistant. Be concise."),
    ("user", "Explain {concept} in {language} with a code example."),
])

# Step 2: Initialize the LLM
llm = ChatAnthropic(model="claude-sonnet-4-20250514")

# Step 3: Create the chain (prompt → llm → parser)
chain = prompt | llm | StrOutputParser()

# Step 4: Run the chain
result = chain.invoke({
    "concept": "list comprehensions",
    "language": "Python"
})
print(result)

# --- Chaining multiple steps ---
from langchain_core.runnables import RunnablePassthrough

# Chain: generate code → review code → improve code
generate = ChatPromptTemplate.from_template(
    "Write a Python function that {task}"
) | llm | StrOutputParser()

review = ChatPromptTemplate.from_template(
    "Review this code for bugs and improvements:\\n{code}"
) | llm | StrOutputParser()

# Compose: generate → review
full_chain = generate | (lambda code: {"code": code}) | review
result = full_chain.invoke({"task": "sorts a list using quicksort"})` },

            { type: 'heading', level: 3, text: 'RAG — Retrieval Augmented Generation', id: 'rag-pipeline' },
            { type: 'paragraph', html: '<strong>RAG</strong> lets LLMs answer questions using your private data. Instead of relying solely on training knowledge, the model retrieves relevant documents from a <strong>vector database</strong> and uses them as context to generate accurate, grounded answers.' },
            { type: 'flow', steps: [
              { label: 'User Query', desc: '"How do I configure the API?"', color: '#6366f1' },
              { label: 'Embed Query', desc: 'Convert question to vector', color: '#8b5cf6' },
              { label: 'Vector Search', desc: 'Find similar docs in vector DB', color: '#a855f7' },
              { label: 'Retrieve Docs', desc: 'Top-k most relevant documents', color: '#f59e0b' },
              { label: 'Augment Prompt', desc: 'Insert docs into LLM context', color: '#ef4444' },
              { label: 'Generate', desc: 'LLM answers using retrieved context', color: '#22c55e' },
            ]},
            { type: 'code', language: 'python', title: 'rag_pipeline.py', code: `# RAG pipeline with LangChain
from langchain_community.vectorstores import FAISS
from langchain_anthropic import ChatAnthropic
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

# Step 1: Create vector store from documents
documents = [
    "To configure the API, set the API_KEY environment variable.",
    "The rate limit is 100 requests per minute per API key.",
    "Authentication uses Bearer tokens in the Authorization header.",
    "Errors return JSON with 'error' and 'message' fields.",
]

# Embed and store documents
vectorstore = FAISS.from_texts(documents, embedding=embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

# Step 2: Create RAG prompt
rag_prompt = ChatPromptTemplate.from_template("""
Answer the question based only on the following context:

Context: {context}

Question: {question}

If the context doesn't contain the answer, say "I don't have that information."
""")

# Step 3: Build RAG chain
def format_docs(docs):
    return "\\n".join(doc.page_content for doc in docs)

rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | rag_prompt
    | ChatAnthropic(model="claude-sonnet-4-20250514")
    | StrOutputParser()
)

# Step 4: Query
answer = rag_chain.invoke("How do I authenticate with the API?")
print(answer)  # Uses retrieved docs about Bearer tokens` },

            { type: 'heading', level: 3, text: 'LangGraph — State Machines for Agents', id: 'langgraph-intro' },
            { type: 'paragraph', html: '<strong>LangGraph</strong> extends LangChain with <strong>graph-based state machines</strong>. While LangChain chains are linear (A → B → C), LangGraph allows loops, conditional branching, and persistent state — essential for building agents that iterate until a task is complete.' },
            { type: 'comparison', left: { title: 'LangChain Chains', color: '#6366f1', items: [
              'Linear pipeline: A → B → C',
              'Each step runs once',
              'No loops or conditional branching',
              'Good for simple, sequential workflows',
              'Prompt → LLM → Parser → Output',
            ]}, right: { title: 'LangGraph', color: '#f59e0b', items: [
              'Graph: nodes + edges with conditions',
              'Can loop back (agent cycles)',
              'Conditional routing based on state',
              'Built for agents with iterative behavior',
              'State persists across steps',
            ]}},

            { type: 'heading', level: 3, text: 'LangGraph Agent Example', id: 'langgraph-example' },
            { type: 'code', language: 'python', title: 'langgraph_agent.py', code: `# LangGraph agent with tool use
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
import operator

# Define the state that flows through the graph
class AgentState(TypedDict):
    messages: Annotated[list, operator.add]  # append-only message list
    next_action: str

# Node: call the LLM
def call_model(state: AgentState) -> AgentState:
    """LLM decides what to do next."""
    response = llm.invoke(state["messages"])
    return {
        "messages": [response],
        "next_action": "tool" if response.tool_calls else "end"
    }

# Node: execute tools
def call_tools(state: AgentState) -> AgentState:
    """Execute the tool the LLM requested."""
    last_message = state["messages"][-1]
    results = []
    for tool_call in last_message.tool_calls:
        result = tool_executor.invoke(tool_call)
        results.append(result)
    return {"messages": results, "next_action": "continue"}

# Routing function: decide next step
def should_continue(state: AgentState) -> str:
    if state["next_action"] == "tool":
        return "tools"     # → call_tools node
    return END             # → finish

# Build the graph
graph = StateGraph(AgentState)

# Add nodes
graph.add_node("agent", call_model)
graph.add_node("tools", call_tools)

# Add edges
graph.set_entry_point("agent")
graph.add_conditional_edges("agent", should_continue, {
    "tools": "tools",
    END: END,
})
graph.add_edge("tools", "agent")  # after tools → back to agent (loop!)

# Compile and run
app = graph.compile()
result = app.invoke({
    "messages": [{"role": "user", "content": "Search for recent AI news"}],
    "next_action": ""
})` },

            { type: 'heading', level: 3, text: 'When to Use Each Framework', id: 'when-to-use' },
            { type: 'table', headers: ['Use Case', 'Best Tool', 'Why'], rows: [
              ['Simple prompt → response', 'LangChain Chain', 'Linear, no loops needed'],
              ['RAG (Q&A over documents)', 'LangChain + Vector DB', 'Well-supported retrieval pattern'],
              ['Agent with tool use', 'LangGraph', 'Needs loops (tool → observe → decide)'],
              ['Multi-agent orchestration', 'LangGraph', 'Complex state + conditional routing'],
              ['Production agent deployment', 'LangGraph + LangSmith', 'Monitoring, tracing, evaluation'],
            ]},

            { type: 'callout', variant: 'tip', html: '<strong>Starting recommendation:</strong> Use LangChain for RAG pipelines and simple chains. Use LangGraph when your application needs loops (agent cycles) or complex branching logic. Both integrate with LangSmith for observability and debugging.' },

            { type: 'heading', level: 3, text: 'Key Takeaways', id: 'langchain-takeaways' },
            { type: 'list', ordered: true, items: [
              'LangChain chains compose steps linearly: Prompt → LLM → Parser → Action',
              'RAG retrieves relevant documents from a vector DB to augment LLM context',
              'LangGraph adds graph-based state machines — loops, branches, persistent state',
              'Use LangChain for simple chains and RAG; LangGraph for agents with iterative behavior',
              'The RAG pattern: embed query → search vector DB → retrieve docs → augment prompt → generate',
            ]},
          ],
        },
      ],
    },
  ],
};

export default category;
