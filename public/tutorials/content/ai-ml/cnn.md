## Why CNNs for Images?

A 256×256 color image has 196,608 pixels. If we flatten it and feed it to a fully connected network, the first layer alone would need millions of weights — impossibly expensive and prone to overfitting. **CNNs** solve this by using small, shared filters that slide across the image, detecting local patterns like edges, textures, and shapes.

> **TIP:** **Analogy:** Imagine examining a painting with a magnifying glass. You slide the glass across the canvas, looking at small patches one at a time. Each position reveals local details — edges, colors, textures. A CNN does exactly this, but with learnable "magnifying glasses" (filters).

### How Convolution Works

A **convolution** operation slides a small matrix (called a **filter** or **kernel**, typically 3×3) across the input image. At each position, it computes an element-wise multiplication and sums the result — producing one number in the output **feature map**.

1. Place the filter at the top-left corner of the input
2. Multiply each filter value by the corresponding input value
3. Sum all products to produce one output pixel
4. Slide the filter one position right (stride) and repeat
5. After completing a row, move down and repeat

| Term | Description | Typical Value |
| --- | --- | --- |
| **Filter/Kernel** | Small weight matrix that detects a pattern | 3×3, 5×5 |
| **Stride** | How many pixels the filter moves each step | 1 or 2 |
| **Padding** | Zeros added around input to control output size | "same" or "valid" |
| **Feature Map** | Output of applying one filter to the input | One per filter |

### Pooling Layers

**Pooling** reduces the spatial size of feature maps, making the network more efficient and somewhat invariant to small translations. The two most common types:

| Max Pooling | Average Pooling |
| --- | --- |
| Takes the maximum value in each window | Takes the average value in each window |
| Preserves the strongest activations | Smooths the feature map |
| Most commonly used (2×2, stride 2) | Often used in final layer (global avg pool) |
| Reduces dimensions by 4× (halves H and W) | Reduces dimensions by 4× (halves H and W) |

### CNN Architecture

A typical CNN stacks convolution + pooling layers to extract features, then flattens the result and feeds it through fully connected layers for classification.

**Flow:**

1. **Image Input** — 224×224×3 RGB image
2. **Conv + ReLU** — 32 filters, 3×3 → 224×224×32
3. **Max Pool** — 2×2 → 112×112×32
4. **Conv + ReLU** — 64 filters, 3×3 → 112×112×64
5. **Max Pool** — 2×2 → 56×56×64
6. **Flatten** — 56×56×64 = 200,704 neurons
7. **Dense + ReLU** — 128 neurons
8. **Output** — 10 classes (softmax)


### CNN in Pseudocode

<!-- title: cnn_architecture.py -->
```python
# CNN Architecture for Image Classification (pseudocode / PyTorch-style)

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
        optimizer.step(gradients)
```

### What Does Each Layer Learn?

Early layers detect simple features; deeper layers combine them into complex patterns:

- **Layer 1:** Edges, gradients, colors (simple patterns)
- **Layer 2:** Corners, textures, simple shapes (combinations of edges)
- **Layer 3:** Parts of objects (eyes, wheels, leaves)
- **Deeper layers:** Full objects, scenes, complex structures

> **NOTE:** This hierarchical feature learning is why CNNs are so powerful. They automatically discover useful features without manual feature engineering — something that took computer vision researchers decades to do by hand.

### Key Takeaways

1. CNNs use shared filters that slide across images to detect local patterns
2. Convolution + ReLU detects features; pooling reduces spatial size
3. Deeper layers learn increasingly complex, abstract features
4. The typical architecture: Conv → Pool → Conv → Pool → Flatten → Dense → Output
