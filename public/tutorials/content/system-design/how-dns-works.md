## What Is DNS?

The **Domain Name System** is the internet's phone book. It translates human-readable domain names like `api.tekivex.dev` into IP addresses like `104.21.5.10` that routers understand. Without DNS, you would need to remember an IP for every service you use.

## DNS Resolution Step by Step

**Flow:**

1. **Browser Cache** — Check local cache — if TTL not expired, return immediately
2. **OS Resolver** — Check OS /etc/hosts and local resolver cache
3. **Recursive Resolver** — ISP or 8.8.8.8 — queries on your behalf if not cached
4. **Root Name Server** — Returns NS records for the TLD (.dev, .com, etc.)
5. **TLD Name Server** — Returns NS records for the authoritative name server
6. **Authoritative NS** — Returns the actual A/AAAA record — final answer


## Common DNS Record Types

| Record | Purpose | Example |
| --- | --- | --- |
| A | Maps hostname → IPv4 address | api.example.com → 1.2.3.4 |
| AAAA | Maps hostname → IPv6 address | api.example.com → 2001:db8::1 |
| CNAME | Alias to another hostname | www → example.com (no bare domain!) |
| MX | Mail server for domain | example.com → mail.example.com (priority 10) |
| TXT | Arbitrary text (SPF, DKIM, verification) | "v=spf1 include:sendgrid.net ~all" |
| NS | Authoritative name servers for zone | example.com → ns1.cloudflare.com |
| SRV | Service location (host + port) | _grpc._tcp.api.example.com |
| PTR | Reverse lookup (IP → hostname) | 4.3.2.1.in-addr.arpa → api.example.com |

## TTL and Caching

**TTL** (Time To Live) is how long a resolver caches the answer (in seconds). Low TTL (60s) means faster propagation of changes but more DNS queries and latency. High TTL (86400s = 24h) reduces load but slows failovers.

> **TIP:** **Pre-lower TTL before migrations:** If you plan to move an IP, lower the TTL to 60s 24–48h before the change. After the change propagates, raise it back to 3600s or higher.

## DNS for System Design

- **Round-robin DNS** — return multiple A records; client picks one (crude load balancing)
- **Geo-routing** — Route53 / Cloudflare return different IPs based on client location
- **Health-check failover** — Route53 removes unhealthy endpoints automatically
- **Blue/green via DNS** — switch CNAME or A record to cut over traffic with TTL control
- **Service discovery** — Consul, CoreDNS power internal DNS for microservices

<!-- title: Useful DNS Debugging Commands -->
```bash
# Resolve with specific resolver
dig api.example.com @8.8.8.8

# Trace full resolution chain
dig +trace api.example.com

# Check TTL remaining
dig api.example.com | grep "ANSWER SECTION" -A5

# Reverse lookup
dig -x 1.2.3.4

# Check all record types
dig api.example.com ANY
```
