## Getting Started with Pinecone

<!-- title: pinecone_setup.py -->
```python
from pinecone import Pinecone, ServerlessSpec
from sentence_transformers import SentenceTransformer
import os

pc = Pinecone(api_key=os.environ["PINECONE_API_KEY"])
index_name = "knowledge-base"

if index_name not in pc.list_indexes().names():
    pc.create_index(
        name=index_name, dimension=384, metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1"),
    )

index = pc.Index(index_name)
model = SentenceTransformer("all-MiniLM-L6-v2")

documents = [
    {"id": "doc-1", "text": "Python is great for machine learning", "category": "programming"},
    {"id": "doc-2", "text": "Neural networks power modern AI", "category": "ai"},
    {"id": "doc-3", "text": "React is a JavaScript UI framework", "category": "web"},
    {"id": "doc-4", "text": "Transformers revolutionized NLP", "category": "ai"},
]

vectors = [{
    "id": doc["id"],
    "values": model.encode(doc["text"]).tolist(),
    "metadata": {"text": doc["text"], "category": doc["category"]},
} for doc in documents]

index.upsert(vectors=vectors)

# Query with metadata filter
query_emb = model.encode("How do I use deep learning?").tolist()
results = index.query(
    vector=query_emb, top_k=3, include_metadata=True,
    filter={"category": {"$eq": "ai"}},
)
for match in results["matches"]:
    print(f"Score: {match['score']:.4f} | {match['metadata']['text']}")
```
