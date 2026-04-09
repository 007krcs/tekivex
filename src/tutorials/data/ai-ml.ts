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

  ],
};

export default category;
