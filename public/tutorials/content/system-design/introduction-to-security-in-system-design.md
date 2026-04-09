## Security First, Not Last

Security added as an afterthought costs 10–100x more than security built in from the start. The **Shift Left** principle: integrate security into every stage — design, code review, CI/CD, and monitoring.

## Core Security Principles

- **Least Privilege** — every component gets only the permissions it needs; nothing more
- **Defence in Depth** — multiple independent security layers; no single point of failure
- **Zero Trust** — never trust, always verify; authenticate every request even from internal services
- **Fail Secure** — when something breaks, default to denying access, not granting it
- **Security by Obscurity alone is not security** — hiding endpoints is no substitute for proper auth

## OWASP Top 10 (2021)

| Rank | Vulnerability | Example | Prevention |
| --- | --- | --- | --- |
| A01 | Broken Access Control | User accesses /admin without admin role | Enforce authz server-side on every endpoint |
| A02 | Cryptographic Failures | Passwords stored as MD5 | bcrypt/Argon2 for passwords; AES-256 for data at rest |
| A03 | Injection (SQLi, XSS) | SELECT * FROM users WHERE name = '$input' | Parameterised queries; output encoding |
| A04 | Insecure Design | No rate limiting on login endpoint | Threat model; build controls into design phase |
| A05 | Security Misconfiguration | Default credentials, open S3 bucket | IaC scanning; secrets management |
| A06 | Vulnerable Components | Log4Shell in a dependency | SCA scanning in CI (Snyk, Dependabot) |
| A07 | Auth & Session Failures | Session tokens in URL | HttpOnly cookies; short-lived JWTs + refresh |
| A08 | Software Integrity Failures | Unverified npm package | Dependency pinning; supply chain signing |
| A09 | Logging Failures | No audit log of admin actions | Log all auth events; tamper-proof audit logs |
| A10 | SSRF | User-supplied URL fetched by server | Allowlist IPs; block private ranges (169.254.x.x) |

## Threat Modelling (STRIDE)

| Letter | Threat | Example | Control |
| --- | --- | --- | --- |
| S | Spoofing | Attacker impersonates another user | Strong authentication |
| T | Tampering | Modify data in transit | TLS, HMAC signatures, integrity checks |
| R | Repudiation | User denies performing an action | Tamper-proof audit logs |
| I | Information Disclosure | API leaks PII in error messages | Generic errors; structured logging |
| D | Denial of Service | Flood endpoint to exhaust resources | Rate limiting, WAF, auto-scaling |
| E | Elevation of Privilege | Regular user gains admin access | RBAC; test privilege boundaries |
