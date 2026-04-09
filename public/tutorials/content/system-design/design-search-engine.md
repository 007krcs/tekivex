## System Components

| Component | Role |
| --- | --- |
| Web Crawler | Discover and download web pages (BFS from seed URLs) |
| Link Extractor | Parse HTML; extract URLs; add to frontier queue |
| Content Store | Store raw HTML pages (distributed file store) |
| Indexer | Parse content; build inverted index; compute TF-IDF scores |
| PageRank | Batch job: compute authority scores from link graph |
| Query Processor | Parse query; lookup index; merge + rank results; return top K |
| Cache | Cache results for popular queries (LFU eviction) |

## Inverted Index

An **inverted index** maps each word to a list of documents containing it (called a *posting list*). This is the core data structure that allows Google to search billions of pages in milliseconds.

<!-- title: Simplified Inverted Index Structure -->
```typescript
// inverted_index["system"] → [
//   { docId: "url1", tf: 0.05, positions: [12, 45] },
//   { docId: "url2", tf: 0.03, positions: [7]      },
// ]

// TF-IDF scoring:
// TF  = (term frequency in doc) / (total terms in doc)
// IDF = log(total docs / docs containing term)
// Score = TF * IDF — rare terms in relevant docs rank higher

function score(term: string, docId: string): number {
  const tf = termFrequency(term, docId);
  const idf = Math.log(totalDocs / docsContaining(term));
  const pageRank = getPageRank(docId);
  return tf * idf * Math.log(1 + pageRank); // Combine relevance + authority
}
```

## Web Crawler Design

- **Frontier queue** — priority queue of URLs to crawl (prioritise fresh/high-PageRank pages)
- **Politeness** — respect robots.txt; rate limit per domain (max 1 req/sec)
- **DNS caching** — cache DNS lookups to avoid per-URL resolution overhead
- **Deduplication** — URL fingerprint (simhash) to skip near-duplicate pages
- **Distributed** — consistent hash assigns URL ranges to crawler workers
