## What Is Object Storage?

Object storage treats data as **immutable blobs** identified by a key (like a filename). Unlike block or file storage, there is no directory tree — just flat namespaces called **buckets**. Access is via HTTP REST (GET/PUT/DELETE).

## Key Features

| Feature | Description |
| --- | --- |
| Infinite scale | Petabytes stored without pre-provisioning capacity |
| Durability | 11 nines (99.999999999%) — data replicated across ≥3 AZs |
| Eventual consistency | Strong read-after-write for new objects; eventually consistent for overwrite/delete |
| Versioning | Keep all versions; never accidentally delete production data |
| Lifecycle policies | Auto-transition to cheaper tiers (S3 → S3-IA → Glacier) after N days |
| Presigned URLs | Time-limited signed URLs for secure direct browser upload/download |
| Multipart upload | Upload large files in parallel chunks; resume on failure |

<!-- title: Presigned Upload URL (AWS SDK v3) -->
```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({ region: 'us-east-1' });

// Generate a presigned URL valid for 5 minutes
// Client uploads directly to S3 — your server never touches the bytes
export async function getUploadUrl(key: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.MEDIA_BUCKET!,
    Key: key,
    ContentType: contentType,
    // Enforce max file size via Content-Length condition
  });

  return getSignedUrl(s3, command, { expiresIn: 300 }); // 5 min
}

// After upload, client calls your API to confirm
// You then serve the object via CloudFront (CDN), not S3 directly
```

> **TIP:** **Never serve objects directly from S3.** Put CloudFront (or any CDN) in front of S3. This gives you edge caching, HTTPS, custom domains, and shields S3 from direct traffic — cutting egress costs by 60–90%.
