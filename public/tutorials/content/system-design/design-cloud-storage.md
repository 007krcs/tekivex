## Requirements

- **Functional:** Upload/download files; sync across devices; share files/folders; version history
- **Non-functional:** 1B users; 10M daily active; max file size 50 GB; 99.99% availability; strong consistency for metadata

## File Chunking

Split files into **4 MB chunks**. Each chunk is hashed (SHA-256). Benefits: (1) resume interrupted uploads, (2) only upload changed chunks on edits, (3) deduplicate identical chunks across all users.

| Component | Technology | Role |
| --- | --- | --- |
| Metadata DB | PostgreSQL | Files, folders, chunks, versions, sharing permissions |
| Chunk Storage | S3 + CDN | Store chunk bytes keyed by SHA-256 hash |
| Block Service | Custom service | Chunk, hash, upload, deduplicate |
| Sync Service | Long poll / WebSocket | Notify devices of remote changes |
| Cache | Redis | Hot chunk metadata; delta calculation |

## Deduplication

Before uploading a chunk, check if a chunk with that hash already exists in storage. If yes, just record the reference — don't upload the bytes. This is **content-addressable storage**. Dropbox reports 40–70% storage savings from cross-user deduplication.

## Conflict Resolution

When two devices edit the same file offline, a conflict occurs. Strategy: **last-writer-wins with conflict copy** — accept both edits; create a "Conflicted copy" file so no data is lost; surface the conflict to the user.
