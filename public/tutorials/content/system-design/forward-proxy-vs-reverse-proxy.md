## What Is a Proxy?

A **proxy** sits between two parties and forwards traffic on their behalf. The key question is: whose side is the proxy on? This determines whether it's a forward proxy or a reverse proxy.

## Forward Proxy

A **forward proxy** sits in front of *clients* and forwards their requests to the internet. The server sees the proxy's IP, not the client's. The client is aware of the proxy.

- **Privacy / anonymity** — hide client IP from destination server (VPNs, Tor)
- **Content filtering** — corporate proxies block social media or malicious sites
- **Geo-bypass** — access content restricted to a different region
- **Caching** — cache responses so repeated requests don't hit the internet

## Reverse Proxy

A **reverse proxy** sits in front of *servers* and forwards client requests to the appropriate backend. Clients are unaware — they think they're talking directly to the server.

- **Load balancing** — distribute traffic across multiple backend instances
- **TLS termination** — decrypt HTTPS at the edge; plain HTTP to backends (simpler certs)
- **Caching** — serve cached responses without hitting upstream servers
- **Compression** — gzip/brotli at the edge; save bandwidth
- **Security** — WAF, DDoS protection, rate limiting before traffic reaches your app
- **Canary deployments** — route 5% of traffic to new version

| Forward Proxy | Reverse Proxy |
| --- | --- |
| Client-side proxy | Server-side proxy |
| Client knows about proxy | Client unaware of proxy |
| Server sees proxy IP | Client sees proxy IP |
| VPN, Squid, corporate filter | Nginx, HAProxy, Cloudflare |
| Protects / controls clients | Protects / scales servers |

<!-- title: Nginx as a Reverse Proxy -->
```nginx
server {
    listen 443 ssl;
    server_name api.example.com;

    # TLS termination here
    ssl_certificate     /etc/nginx/certs/cert.pem;
    ssl_certificate_key /etc/nginx/certs/key.pem;

    location / {
        # Forward to backend pool (plain HTTP internally)
        proxy_pass         http://backend_pool;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}

upstream backend_pool {
    least_conn;
    server 10.0.1.10:3000;
    server 10.0.1.11:3000;
    server 10.0.1.12:3000;
}
```

> **NOTE:** Always pass `X-Forwarded-For` so your application can see the real client IP for logging, rate limiting, and geolocation — not the proxy's IP.
