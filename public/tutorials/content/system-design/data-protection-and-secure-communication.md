## Encryption at Rest

Data at rest is encrypted so physical theft of a disk reveals nothing. Modern cloud storage (S3, EBS, RDS) encrypts by default using AES-256. Use a **KMS** (Key Management Service) to manage encryption keys — never store keys alongside the data they protect.

| Layer | Technology | Who Manages Key |
| --- | --- | --- |
| Database | RDS TDE, PostgreSQL pgcrypto | AWS KMS / Cloud KMS |
| Object Storage | S3 SSE-S3, SSE-KMS, SSE-C | AWS-managed or customer-managed |
| Block Storage | EBS encryption, dm-crypt/LUKS | AWS KMS / self-managed |
| Application-level | AES-256-GCM in code | HSM / secrets manager |

## TLS and mTLS

**TLS** (Transport Layer Security) encrypts data in transit and authenticates the *server* to the client. **mTLS** (mutual TLS) requires both server and client to present certificates — used for service-to-service authentication in zero-trust architectures.

> **NOTE:** Service meshes like **Istio** and **Linkerd** automatically provision mTLS certificates for every pod in Kubernetes, removing the burden of certificate management from application code.

## Secrets Management

<!-- title: Fetch Secrets from AWS Secrets Manager (Never Hardcode) -->
```typescript
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

const client = new SecretsManagerClient({ region: 'us-east-1' });

// Fetch at startup; cache in memory; never log
async function getDbCredentials() {
  const res = await client.send(new GetSecretValueCommand({
    SecretId: 'prod/api/database',
  }));
  return JSON.parse(res.SecretString!) as {
    host: string; port: number; username: string; password: string;
  };
}

// Rotate secrets without redeploying:
// 1. Secrets Manager rotates the DB password
// 2. Lambda updates the DB user
// 3. App fetches fresh credentials on next call
```
