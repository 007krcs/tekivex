## Hybrid Search + Reranking

**Flow:**

1. **Query** — User search query
2. **Embed + BM25** — Dense + sparse vectors
3. **Pinecone** — Hybrid ANN search, top-100
4. **Reranker** — Cross-encoder rescoring, top-5
5. **Results** — Ranked, relevant answers


<!-- title: semantic_search.py -->
```python
from pinecone import Pinecone
from pinecone_text.sparse import BM25Encoder
from sentence_transformers import SentenceTransformer, CrossEncoder
import os

pc = Pinecone(api_key=os.environ["PINECONE_API_KEY"])
dense_model = SentenceTransformer("all-MiniLM-L6-v2")
reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")
index = pc.Index("hybrid-search")

corpus = [
    "Python decorators add behavior to functions without modifying source",
    "NumPy arrays support vectorized mathematical operations efficiently",
    "LangChain chains LLM calls with prompt templates and parsers",
]

bm25 = BM25Encoder()
bm25.fit(corpus)

def hybrid_search(query: str, alpha: float = 0.5) -> list[dict]:
    dense_q  = dense_model.encode(query, normalize_embeddings=True).tolist()
    sparse_q = bm25.encode_queries(query)
    results = index.query(
        vector=[v * alpha for v in dense_q],
        sparse_vector={"indices": sparse_q["indices"], "values": [v * (1-alpha) for v in sparse_q["values"]]},
        top_k=10, include_metadata=True,
    )
    return results["matches"]

def rerank(query: str, candidates: list[dict], top_k: int = 3) -> list[dict]:
    pairs = [(query, c["metadata"]["text"]) for c in candidates]
    scores = reranker.predict(pairs)
    return [c for c, _ in sorted(zip(candidates, scores), key=lambda x: x[1], reverse=True)[:top_k]]

query = "How do Python decorators work?"
results = rerank(query, hybrid_search(query))
for r in results:
    print(f"→ {r['metadata']['text']}")
```
