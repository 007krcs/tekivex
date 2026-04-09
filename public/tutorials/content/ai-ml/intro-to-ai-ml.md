## What is Artificial Intelligence?

Artificial Intelligence (AI) is the science of building machines that can perform tasks that normally require human intelligence — things like recognizing images, understanding language, making decisions, and playing games.

**Machine Learning (ML)** is a subset of AI. Instead of programming explicit rules, we feed data to an algorithm and let it *learn patterns* on its own. The more data it sees, the better it gets — much like how a child learns by example.

> **TIP:** **Analogy:** Imagine teaching a child to recognize cats. You don't write a rulebook saying "cats have pointed ears, whiskers, and tails." Instead, you show hundreds of cat photos, and the child figures out the pattern. That's machine learning.

### The Three Types of Machine Learning

Machine learning comes in three main flavors, each suited to different kinds of problems:

| Type | Input | Goal | Example |
| --- | --- | --- | --- |
| **Supervised** | Labeled data (input + correct answer) | Learn mapping from input → output | Spam detection, image classification |
| **Unsupervised** | Unlabeled data (input only) | Discover hidden patterns/clusters | Customer segmentation, anomaly detection |
| **Reinforcement** | Environment + rewards/penalties | Learn optimal actions via trial & error | Game-playing AI, robotics, self-driving |

### The ML Pipeline at a Glance

Every ML project follows a similar high-level flow. Data goes in, a model is trained, and predictions come out — with a feedback loop to improve over time:

**Flow:**

1. **Data** — Collect and clean raw data
2. **Model** — Choose algorithm & architecture
3. **Training** — Feed data, learn patterns
4. **Prediction** — Make decisions on new data
5. **Feedback Loop** — Evaluate & improve


### Real-World AI Examples

- **Email Spam Filters** — Supervised learning classifies incoming emails as spam or not
- **Netflix Recommendations** — Unsupervised + collaborative filtering suggests what to watch
- **Self-Driving Cars** — Reinforcement learning + computer vision navigates roads
- **Voice Assistants** — Natural language processing understands and responds to speech
- **Medical Diagnosis** — Image classification detects diseases from X-rays and MRIs

### AI vs ML vs Deep Learning

These terms are often used interchangeably, but they are nested concepts:

| Traditional Programming | Machine Learning |
| --- | --- |
| Developer writes explicit rules | Algorithm learns rules from data |
| Rules + Data → Output | Data + Output → Rules (learned) |
| Hard to handle edge cases | Generalizes to unseen cases |
| Brittle — breaks with new patterns | Improves with more data |

> **NOTE:** **Deep Learning** is a subset of ML that uses neural networks with many layers. It's especially powerful for images, audio, and text — but requires more data and compute than simpler ML methods.

### Key Takeaways

1. AI is the broad field; ML is a subset that learns from data
2. Supervised learning needs labeled data; unsupervised discovers patterns; reinforcement learns via rewards
3. The ML pipeline is: Data → Model → Train → Predict → Improve
4. Deep Learning uses multi-layer neural networks and powers modern AI breakthroughs
