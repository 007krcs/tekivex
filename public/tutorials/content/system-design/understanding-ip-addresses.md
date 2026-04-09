## What Is an IP Address?

An **IP address** (Internet Protocol address) is a unique numerical label assigned to every device on a network. Think of it as a postal address for your server — without it, packets have no idea where to go.

> **TIP:** Every request your users make travels through a chain of IP addresses: their device → ISP router → your load balancer → your server. Understanding this path is essential for diagnosing latency and security issues.

## IPv4 vs IPv6

| IPv4 | IPv6 |
| --- | --- |
| 32-bit address (e.g. 192.168.1.1) | 128-bit address (e.g. 2001:db8::1) |
| ~4.3 billion unique addresses | 340 undecillion unique addresses |
| Exhausted — NAT required | No NAT needed — direct routing |
| Widely supported everywhere | Growing adoption (40%+ traffic) |
| Simpler header (20 bytes) | Built-in IPSec, auto-configuration |

## Public vs Private IPs

**Private IP ranges** (RFC 1918) are non-routable on the public internet. They are used inside data centers and VPCs. **NAT** (Network Address Translation) maps private IPs to a single public IP for outbound traffic.

| Range | CIDR | Addresses | Use |
| --- | --- | --- | --- |
| 10.0.0.0 – 10.255.255.255 | 10.0.0.0/8 | 16.7M | Large enterprise / cloud VPC |
| 172.16.0.0 – 172.31.255.255 | 172.16.0.0/12 | 1M | Docker default bridge |
| 192.168.0.0 – 192.168.255.255 | 192.168.0.0/16 | 65K | Home / office networks |

## CIDR and Subnetting

**CIDR** (Classless Inter-Domain Routing) notation like `10.0.1.0/24` specifies a network by its base address and prefix length. The prefix length (24) tells you how many bits are the network portion — the remaining bits (8) are for hosts, giving 256 addresses (254 usable).

<!-- title: CIDR Quick Reference -->
```text
/32  →   1 address   (single host)
/31  →   2 addresses  (point-to-point link)
/30  →   4 addresses  (2 usable — small link)
/28  →  16 addresses  (14 usable)
/24  → 256 addresses  (254 usable — typical subnet)
/16  → 65,536 addresses (AWS VPC default)
/8   → 16.7M addresses (large private block)
```

## IP Addresses in System Design

- **Anycast** — same IP announced from multiple PoPs; BGP routes to the nearest (used by Cloudflare, DNS resolvers)
- **Elastic IP / Static IP** — reserve a fixed public IP for your load balancer or NAT gateway
- **VPC CIDR planning** — choose non-overlapping ranges if you'll ever peer VPCs or connect to on-premise
- **Security groups / ACLs** — IP-based firewall rules are the first line of defense
- **IP allowlisting** — restrict admin APIs to office/VPN CIDR ranges

> **CAUTION:** Never hard-code IP addresses in application code. IPs change during scaling events. Use DNS names or service discovery instead.
