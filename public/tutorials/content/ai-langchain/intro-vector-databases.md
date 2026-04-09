## Why Vector Databases?

| Traditional DB (SQL) | Vector Database |
| --- | --- |
| Exact and range queries | Similarity search (nearest neighbor) |
| Rows and columns (structured) | Dense vectors (384–1536 dims) |
| Cannot understand meaning | Captures meaning via embeddings |
| Example: "WHERE tag = 'AI'" | Example: "Find text similar to query" |

| Database | Type | Best For | Scale |
| --- | --- | --- | --- |
| Pinecone | Managed cloud | Production, RAG, no ops burden | Billions of vectors |
| Chroma | Open-source local | Prototyping, local dev | Millions of vectors |
| FAISS (Meta) | Library (not a DB) | GPU-accelerated research | Billions on GPU |
| Weaviate | Open-source | Hybrid search, multi-modal | Billions |
| pgvector | PostgreSQL extension | Existing Postgres users | Millions |
