## Similarity Metrics

| Metric | Formula | Best For | Range |
| --- | --- | --- | --- |
| Cosine Similarity | cos(θ) = A·B / (|A||B|) | Text embeddings (direction matters) | -1 to 1 |
| Dot Product | A·B = Σ(aᵢ × bᵢ) | Normalized vectors | Unbounded |
| Euclidean (L2) | √Σ(aᵢ - bᵢ)² | Images, spatial data | 0 to ∞ |

<!-- title: similarity.py -->
```python
import numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')  # 384-dim embeddings

documents = [
    "Machine learning is a type of artificial intelligence",
    "Deep learning uses neural networks with many layers",
    "The Eiffel Tower is located in Paris, France",
    "Neural networks are inspired by the human brain",
]

embeddings = model.encode(documents, normalize_embeddings=True)

query = "What is deep learning?"
query_emb = model.encode([query], normalize_embeddings=True)[0]

scores = [(doc, np.dot(query_emb, emb)) for doc, emb in zip(documents, embeddings)]
scores.sort(key=lambda x: x[1], reverse=True)

for doc, score in scores:
    print(f"  {score:.4f} | {doc}")
```

| Algorithm | Index Type | Speed | Notes |
| --- | --- | --- | --- |
| HNSW | Hierarchical graph | Very fast | Best recall/speed tradeoff; used by Pinecone |
| IVF-Flat | Inverted file | Fast | Partitions space into Voronoi cells |
| IVF-PQ | IVF + Product Quantization | Fastest | Compresses vectors 4–32× |
