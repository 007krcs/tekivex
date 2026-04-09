## Defence in Depth with VPC

A **VPC** (Virtual Private Cloud) is an isolated network in the cloud. Layer your infrastructure: public subnets for load balancers, private subnets for application servers, isolated subnets for databases. Traffic flows in only one direction through NAT gateways.

| Layer | Component | Traffic Allowed |
| --- | --- | --- |
| Internet | Route 53, CloudFront | Anywhere → CDN edge |
| Public subnet | Load Balancer, NAT GW | Internet → LB:443; LB → private |
| Private subnet | App servers, ECS tasks | LB → app:3000; app → DB subnet |
| Isolated subnet | RDS, ElastiCache, Kafka | Only from app subnet on specific port |

## Security Groups vs NACLs

| Security Groups | Network ACLs |
| --- | --- |
| Instance-level firewall (ENI) | Subnet-level firewall |
| Stateful — return traffic auto-allowed | Stateless — must allow both directions |
| Allow rules only (no deny) | Both allow AND deny rules |
| Changes take effect immediately | Rule number order matters (evaluated top-down) |
| First line of defence per resource | Good for subnet-wide blocks (e.g. block a CIDR) |

## WAF and DDoS Protection

- **WAF (Web Application Firewall)** — inspect HTTP requests; block SQLi, XSS, bad user agents, malicious IPs. Deploy at CDN edge (Cloudflare WAF, AWS WAF).
- **DDoS Protection** — absorb volumetric attacks at the network edge before they reach your servers. AWS Shield Standard (free, L3/L4), Shield Advanced (paid, L7 with WAF).
- **Rate limiting** — limit requests per IP/key at the WAF or reverse proxy before they reach your application.
- **Geo-blocking** — block entire countries if you have no legitimate traffic from them.
- **Bot management** — fingerprint and challenge suspicious clients (CAPTCHAs, JavaScript challenges).

> **TIP:** Never expose database ports (5432, 3306, 6379) to the public internet. **Always use a bastion host or AWS Session Manager** for admin DB access. Security groups should only allow DB connections from your app subnet's CIDR.
