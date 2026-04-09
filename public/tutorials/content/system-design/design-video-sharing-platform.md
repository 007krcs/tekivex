## Upload & Processing Pipeline

**Flow:**

1. **Upload** — Raw video uploaded directly to S3 via presigned URL (bypass origin)
2. **Message Queue** — S3 event → SQS → transcoding workers
3. **Transcoding** — FFmpeg generates multiple renditions: 360p, 720p, 1080p, 4K + thumbnail
4. **Packaging** — Segment into HLS (.m3u8 + .ts chunks) and DASH manifests
5. **CDN Distribution** — Segments pushed to CloudFront edge PoPs worldwide


## Adaptive Bitrate Streaming

**HLS** (HTTP Live Streaming) divides video into 2–10 second segments at multiple quality levels. The player automatically switches quality based on available bandwidth — buffering smooth 360p is better than stalling on 1080p.

## View Count at Scale

YouTube processes **500 hours of video every minute**. View count accuracy at this scale requires careful design:

- **Redis counter** — increment in Redis on each view event (fast, in-memory)
- **Batch flush** — periodically flush Redis counts to the database (e.g. every 60 seconds)
- **Exactly-once deduplication** — deduplicate repeat views from same user within 24h
- **Lambda Architecture** — real-time count (approx) + batch recount for accuracy
