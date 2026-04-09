import type { TutorialCategory } from '../types';

const category: TutorialCategory = {
  id: 'system-design',
  title: 'System Design',
  icon: 'server',
  color: '#6366f1',
  description:
    'Scalability, availability, caching, load balancing, databases, and real-world case studies.',
  sections: [
    // ================================================================
    // SECTION: Fundamentals
    // ================================================================
    {
      title: 'Fundamentals',
      topics: [
        // ────────────────────────────────────────────────────────────
        // 1. Intro to System Design
        // ────────────────────────────────────────────────────────────
        {
          slug: 'intro-to-system-design',
          title: 'Introduction to System Design',
          description:
            'What is system design, why it matters for engineers, and a high-level overview of the design process from requirements to deployment.',
          keywords: [
            'system design',
            'software engineering',
            'design process',
            'requirements',
            'architecture overview',
          ],
          difficulty: 'beginner',
          estimatedMinutes: 12,
          contentFile: 'system-design/intro-to-system-design.md',
        },

        // ────────────────────────────────────────────────────────────
        // 2. Scalability
        // ────────────────────────────────────────────────────────────
        {
          slug: 'scalability',
          title: 'Scalability: Horizontal vs Vertical',
          description:
            'Learn the difference between horizontal and vertical scaling, when to use each, and how to implement basic horizontal scaling with Node.js clustering.',
          keywords: [
            'scalability',
            'horizontal scaling',
            'vertical scaling',
            'scale out',
            'scale up',
            'clustering',
          ],
          difficulty: 'beginner',
          estimatedMinutes: 15,
          prerequisites: ['intro-to-system-design'],
          contentFile: 'system-design/scalability.md',
        },

        // ────────────────────────────────────────────────────────────
        // 3. Availability & Reliability
        // ────────────────────────────────────────────────────────────
        {
          slug: 'availability-reliability',
          title: 'Availability & Reliability',
          description:
            'Understand SLAs, SLOs, and SLIs, the difference between high availability and disaster recovery, and how redundancy and failover keep systems running.',
          keywords: [
            'availability',
            'reliability',
            'SLA',
            'SLO',
            'SLI',
            'failover',
            'redundancy',
            'disaster recovery',
          ],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          prerequisites: ['intro-to-system-design'],
          contentFile: 'system-design/availability-reliability.md',
        },

        // ────────────────────────────────────────────────────────────
        // 4. CAP Theorem
        // ────────────────────────────────────────────────────────────
        {
          slug: 'cap-theorem',
          title: 'CAP Theorem',
          description:
            'Understand the CAP theorem — Consistency, Availability, and Partition Tolerance — and learn which distributed databases prioritize which guarantees.',
          keywords: [
            'CAP theorem',
            'consistency',
            'availability',
            'partition tolerance',
            'distributed systems',
            'CP',
            'AP',
          ],
          difficulty: 'intermediate',
          estimatedMinutes: 12,
          prerequisites: ['availability-reliability'],
          contentFile: 'system-design/cap-theorem.md',
        },

        // ────────────────────────────────────────────────────────────
        // 5. Latency & Throughput
        // ────────────────────────────────────────────────────────────
        {
          slug: 'latency-throughput',
          title: 'Latency & Throughput',
          description:
            'Understand the difference between latency and throughput, learn common latency numbers every engineer should know, and how to optimize both.',
          keywords: [
            'latency',
            'throughput',
            'performance',
            'response time',
            'bandwidth',
            'p99',
          ],
          difficulty: 'beginner',
          estimatedMinutes: 10,
          prerequisites: ['intro-to-system-design'],
          contentFile: 'system-design/latency-throughput.md',
        },
      ],
    },

    // ================================================================
    // SECTION: Infrastructure
    // ================================================================
    {
      title: 'Infrastructure',
      topics: [
        // ────────────────────────────────────────────────────────────
        // 6. Load Balancing
        // ────────────────────────────────────────────────────────────
        {
          slug: 'load-balancing',
          title: 'Load Balancing',
          description:
            'Learn load balancing algorithms (round-robin, least connections, consistent hashing), Layer 4 vs Layer 7, and see a practical nginx configuration example.',
          keywords: [
            'load balancer',
            'round robin',
            'least connections',
            'consistent hashing',
            'nginx',
            'HAProxy',
            'Layer 4',
            'Layer 7',
          ],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          prerequisites: ['scalability'],
          contentFile: 'system-design/load-balancing.md',
        },

        // ────────────────────────────────────────────────────────────
        // 7. Caching Strategies
        // ────────────────────────────────────────────────────────────
        {
          slug: 'caching-strategies',
          title: 'Caching Strategies',
          description:
            'Master cache-aside, write-through, write-behind, and read-through caching patterns with practical Redis examples and trade-off analysis.',
          keywords: [
            'caching',
            'cache-aside',
            'write-through',
            'write-behind',
            'read-through',
            'Redis',
            'Memcached',
            'cache invalidation',
          ],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          prerequisites: ['latency-throughput'],
          contentFile: 'system-design/caching-strategies.md',
        },

        // ────────────────────────────────────────────────────────────
        // 8. CDN & Edge Computing
        // ────────────────────────────────────────────────────────────
        {
          slug: 'cdn-edge',
          title: 'CDN & Edge Computing',
          description:
            'How Content Delivery Networks work, the concept of Points of Presence, cache hit ratios, and the difference between CDN-served and origin-served requests.',
          keywords: [
            'CDN',
            'content delivery network',
            'edge computing',
            'PoP',
            'CloudFront',
            'Cloudflare',
            'cache hit ratio',
          ],
          difficulty: 'intermediate',
          estimatedMinutes: 12,
          prerequisites: ['caching-strategies'],
          contentFile: 'system-design/cdn-edge.md',
        },

        // ────────────────────────────────────────────────────────────
        // 9. Rate Limiting
        // ────────────────────────────────────────────────────────────
        {
          slug: 'rate-limiting',
          title: 'Rate Limiting',
          description:
            'Protect your API with rate limiting using token bucket, leaky bucket, and sliding window algorithms, with a practical Express middleware implementation.',
          keywords: [
            'rate limiting',
            'token bucket',
            'leaky bucket',
            'sliding window',
            'API protection',
            'throttling',
            'DDoS',
          ],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          prerequisites: ['load-balancing'],
          contentFile: 'system-design/rate-limiting.md',
        },
      ],
    },

    // ================================================================
    // SECTION: Data Layer
    // ================================================================
    {
      title: 'Data Layer',
      topics: [
        // ────────────────────────────────────────────────────────────
        // 10. Database Design
        // ────────────────────────────────────────────────────────────
        {
          slug: 'database-design',
          title: 'Database Design: SQL vs NoSQL',
          description:
            'Compare SQL and NoSQL databases, understand normalization, indexing strategies, and see practical schema design examples for both PostgreSQL and MongoDB.',
          keywords: [
            'database design',
            'SQL',
            'NoSQL',
            'PostgreSQL',
            'MongoDB',
            'normalization',
            'indexing',
            'schema design',
          ],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          prerequisites: ['intro-to-system-design'],
          contentFile: 'system-design/database-design.md',
        },

        // ────────────────────────────────────────────────────────────
        // 11. Sharding & Replication
        // ────────────────────────────────────────────────────────────
        {
          slug: 'sharding-replication',
          title: 'Sharding & Replication',
          description:
            'Understand database sharding strategies (horizontal, vertical, directory-based) and replication topologies (master-replica, multi-master) for scaling data systems.',
          keywords: [
            'sharding',
            'database partitioning',
            'replication',
            'master replica',
            'horizontal sharding',
            'consistent hashing',
          ],
          difficulty: 'advanced',
          estimatedMinutes: 16,
          prerequisites: ['database-design'],
          contentFile: 'system-design/sharding-replication.md',
        },

        // ────────────────────────────────────────────────────────────
        // 12. Message Queues
        // ────────────────────────────────────────────────────────────
        {
          slug: 'message-queues',
          title: 'Message Queues',
          description:
            'Understand message queue patterns (point-to-point, pub/sub), when to use them, and implement a simple queue with practical code examples.',
          keywords: [
            'message queue',
            'pub/sub',
            'RabbitMQ',
            'Kafka',
            'SQS',
            'async processing',
            'event-driven',
            'decoupling',
          ],
          difficulty: 'intermediate',
          estimatedMinutes: 15,
          prerequisites: ['intro-to-system-design'],
          contentFile: 'system-design/message-queues.md',
        },
      ],
    },

    // ================================================================
    // SECTION: Architecture
    // ================================================================
    {
      title: 'Architecture',
      topics: [
        // ────────────────────────────────────────────────────────────
        // 13. Microservices vs Monolith
        // ────────────────────────────────────────────────────────────
        {
          slug: 'microservices-vs-monolith',
          title: 'Microservices vs Monolith',
          description:
            'Compare monolithic and microservice architectures, understand when to use each, and learn about communication patterns between services.',
          keywords: [
            'microservices',
            'monolith',
            'service-oriented architecture',
            'SOA',
            'decomposition',
            'API gateway',
            'event-driven',
          ],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          prerequisites: ['intro-to-system-design'],
          contentFile: 'system-design/microservices-vs-monolith.md',
        },

        // ────────────────────────────────────────────────────────────
        // 14. API Design
        // ────────────────────────────────────────────────────────────
        {
          slug: 'api-design',
          title: 'API Design: REST, GraphQL & gRPC',
          description:
            'Compare REST, GraphQL, and gRPC API styles, learn RESTful design best practices, versioning strategies, and see practical code examples for each.',
          keywords: [
            'API design',
            'REST',
            'GraphQL',
            'gRPC',
            'API versioning',
            'OpenAPI',
            'protobuf',
            'RESTful',
          ],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          prerequisites: ['intro-to-system-design'],
          contentFile: 'system-design/api-design.md',
        },
      ],
    },

    // ================================================================
    // SECTION: Case Studies
    // ================================================================
    {
      title: 'Case Studies',
      topics: [
        // ────────────────────────────────────────────────────────────
        // 15. Design a URL Shortener
        // ────────────────────────────────────────────────────────────
        {
          slug: 'design-url-shortener',
          title: 'Case Study: Design a URL Shortener',
          description:
            'A complete system design walkthrough for building a URL shortener like bit.ly, covering requirements, estimation, architecture, database schema, and scaling.',
          keywords: [
            'URL shortener',
            'system design interview',
            'case study',
            'bit.ly',
            'tinyurl',
            'base62',
            'key generation',
          ],
          difficulty: 'advanced',
          estimatedMinutes: 20,
          prerequisites: [
            'intro-to-system-design',
            'database-design',
            'caching-strategies',
            'load-balancing',
          ],
          contentFile: 'system-design/design-url-shortener.md',
        },
      ],
    },

    // ================================================================
    // SECTION: Networking
    // ================================================================
    {
      title: 'Networking',
      topics: [
        // ────────────────────────────────────────────────────────────
        // Understanding IP Addresses
        // ────────────────────────────────────────────────────────────
        {
          slug: 'understanding-ip-addresses',
          title: 'Understanding IP Addresses',
          description:
            'IPv4 vs IPv6, public vs private addresses, subnetting basics, and how IP addresses are used in distributed system design.',
          keywords: ['ip address', 'ipv4', 'ipv6', 'subnetting', 'networking', 'cidr'],
          difficulty: 'beginner',
          estimatedMinutes: 19,
          contentFile: 'system-design/understanding-ip-addresses.md',
        },

        // ────────────────────────────────────────────────────────────
        // How DNS Works
        // ────────────────────────────────────────────────────────────
        {
          slug: 'how-dns-works',
          title: 'How DNS Works',
          description:
            'DNS resolution from browser to root servers, record types, TTL, caching, and using DNS for traffic routing and failover.',
          keywords: ['dns', 'domain name system', 'a record', 'cname', 'ttl', 'dns failover'],
          difficulty: 'beginner',
          estimatedMinutes: 18,
          contentFile: 'system-design/how-dns-works.md',
        },

        // ────────────────────────────────────────────────────────────
        // Client-Server Model
        // ────────────────────────────────────────────────────────────
        {
          slug: 'client-server-model',
          title: 'Client-Server Model Explained',
          description:
            'How clients and servers communicate, the request-response cycle, stateless vs stateful servers, and practical implications for distributed system design.',
          keywords: ['client server', 'request response', 'stateless', 'stateful', 'http', 'tcp'],
          difficulty: 'beginner',
          estimatedMinutes: 22,
          contentFile: 'system-design/client-server-model.md',
        },

        // ────────────────────────────────────────────────────────────
        // Forward Proxy vs Reverse Proxy
        // ────────────────────────────────────────────────────────────
        {
          slug: 'forward-proxy-vs-reverse-proxy',
          title: 'Forward Proxy vs. Reverse Proxy',
          description:
            'The critical difference between forward and reverse proxies, when to use each, and how reverse proxies power load balancing, TLS termination, and caching.',
          keywords: ['proxy', 'reverse proxy', 'forward proxy', 'nginx', 'load balancer', 'tls termination'],
          difficulty: 'beginner',
          estimatedMinutes: 10,
          contentFile: 'system-design/forward-proxy-vs-reverse-proxy.md',
        },

        // ────────────────────────────────────────────────────────────
        // API Gateway
        // ────────────────────────────────────────────────────────────
        {
          slug: 'api-gateway',
          title: 'What Is an API Gateway?',
          description:
            'API gateways as a single entry point for microservices: routing, auth, rate limiting, protocol translation, and observability — with design trade-offs.',
          keywords: ['api gateway', 'kong', 'aws api gateway', 'rate limiting', 'auth', 'microservices'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          contentFile: 'system-design/api-gateway.md',
        },
      ],
    },

    // ================================================================
    // SECTION: Protocols
    // ================================================================
    {
      title: 'Protocols',
      topics: [
        // ────────────────────────────────────────────────────────────
        // TCP & UDP
        // ────────────────────────────────────────────────────────────
        {
          slug: 'tcp-and-udp',
          title: 'TCP & UDP',
          description:
            'How TCP and UDP differ, when to choose each transport protocol, and the implications for reliability, ordering, and latency in distributed systems.',
          keywords: ['tcp', 'udp', 'transport layer', 'reliability', 'latency', 'three-way handshake'],
          difficulty: 'beginner',
          estimatedMinutes: 14,
          contentFile: 'system-design/tcp-and-udp.md',
        },

        // ────────────────────────────────────────────────────────────
        // HTTP - The Backbone of the Web
        // ────────────────────────────────────────────────────────────
        {
          slug: 'http-backbone-of-the-web',
          title: 'HTTP — The Backbone of the Web',
          description:
            'HTTP request/response structure, status codes, HTTP/1.1 vs HTTP/2 vs HTTP/3, headers, methods, and HTTPS — the protocol every system designer must know cold.',
          keywords: ['http', 'https', 'http2', 'http3', 'status codes', 'request response', 'headers'],
          difficulty: 'beginner',
          estimatedMinutes: 19,
          contentFile: 'system-design/http-backbone-of-the-web.md',
        },

        // ────────────────────────────────────────────────────────────
        // Real-Time Communication Protocols
        // ────────────────────────────────────────────────────────────
        {
          slug: 'real-time-communication-protocols',
          title: 'Real-Time Communication Protocols',
          description:
            'WebSockets, Server-Sent Events, long polling, and WebRTC — how each works, when to choose them, and their scalability implications.',
          keywords: ['websocket', 'sse', 'server-sent events', 'long polling', 'webrtc', 'real-time'],
          difficulty: 'intermediate',
          estimatedMinutes: 17,
          contentFile: 'system-design/real-time-communication-protocols.md',
        },

        // ────────────────────────────────────────────────────────────
        // Modern API Protocols Beyond REST
        // ────────────────────────────────────────────────────────────
        {
          slug: 'modern-api-protocols',
          title: 'Modern API Protocols — Beyond REST',
          description:
            'GraphQL, gRPC, tRPC, and AsyncAPI: when REST isn\'t enough and how these protocols solve over-fetching, contract enforcement, and real-time APIs.',
          keywords: ['graphql', 'grpc', 'trpc', 'asyncapi', 'protobuf', 'rest alternatives'],
          difficulty: 'intermediate',
          estimatedMinutes: 12,
          contentFile: 'system-design/modern-api-protocols.md',
        },
      ],
    },

    // ================================================================
    // SECTION: Web Concepts
    // ================================================================
    {
      title: 'Web Concepts',
      topics: [
        // ────────────────────────────────────────────────────────────
        // Web Sessions
        // ────────────────────────────────────────────────────────────
        {
          slug: 'web-sessions-managing-state',
          title: 'Web Sessions: Managing State in Web Applications',
          description:
            'Cookies, session tokens, JWTs, and distributed session stores — how to maintain user state across stateless HTTP requests at scale.',
          keywords: ['session', 'cookie', 'jwt', 'redis session', 'stateless auth', 'token'],
          difficulty: 'intermediate',
          estimatedMinutes: 15,
          contentFile: 'system-design/web-sessions-managing-state.md',
        },

        // ────────────────────────────────────────────────────────────
        // Serialization
        // ────────────────────────────────────────────────────────────
        {
          slug: 'serialization-data-exchange-formats',
          title: 'Serialization: Data Exchange & Storage Formats',
          description:
            'JSON, MessagePack, Protobuf, Avro, and Parquet — when to choose binary vs text formats, schema evolution, and performance implications.',
          keywords: ['serialization', 'json', 'protobuf', 'messagepack', 'avro', 'parquet', 'schema'],
          difficulty: 'intermediate',
          estimatedMinutes: 13,
          contentFile: 'system-design/serialization-data-exchange-formats.md',
        },

        // ────────────────────────────────────────────────────────────
        // CORS
        // ────────────────────────────────────────────────────────────
        {
          slug: 'cors-cross-origin-resource-sharing',
          title: 'CORS: Cross-Origin Resource Sharing & Web Security',
          description:
            'How the Same-Origin Policy protects users, why CORS exists, preflight requests, and configuring CORS correctly without opening security holes.',
          keywords: ['cors', 'same-origin policy', 'preflight', 'access-control', 'web security', 'options request'],
          difficulty: 'intermediate',
          estimatedMinutes: 13,
          contentFile: 'system-design/cors-cross-origin-resource-sharing.md',
        },
      ],
    },

    // ================================================================
    // SECTION: Storage & Databases
    // ================================================================
    {
      title: 'Storage & Databases',
      topics: [
        {
          slug: 'storage-in-system-design-cap-theorem',
          title: 'Introduction to Storage in System Design + CAP Theorem',
          description:
            'The storage landscape: block, file, and object storage. CAP theorem and why you can never have consistency, availability, and partition tolerance all at once.',
          keywords: ['storage', 'cap theorem', 'consistency', 'availability', 'partition tolerance', 'block storage', 'object storage'],
          difficulty: 'intermediate',
          estimatedMinutes: 19,
          contentFile: 'system-design/storage-in-system-design-cap-theorem.md',
        },

        {
          slug: 'database-models-sql-vs-nosql',
          title: 'Understanding Database Models: SQL vs. NoSQL',
          description:
            'Relational vs document, columnar, key-value, and graph databases — data models, query patterns, scaling characteristics, and how to choose the right one.',
          keywords: ['sql', 'nosql', 'postgresql', 'mongodb', 'cassandra', 'redis', 'database selection'],
          difficulty: 'intermediate',
          estimatedMinutes: 17,
          contentFile: 'system-design/database-models-sql-vs-nosql.md',
        },

        {
          slug: 'sharding-replication-polyglot',
          title: 'Advanced Database Topics: Sharding, Replication & Polyglot Persistence',
          description:
            'Horizontal partitioning strategies, replication topologies, and multi-database architectures for high-scale production systems.',
          keywords: ['sharding', 'replication', 'polyglot persistence', 'consistent hashing', 'read replica', 'leader follower'],
          difficulty: 'advanced',
          estimatedMinutes: 16,
          contentFile: 'system-design/sharding-replication-polyglot.md',
        },

        {
          slug: 'object-storage-modern-systems',
          title: 'Object Storage in Modern Systems',
          description:
            'How S3-compatible object storage works, consistency models, lifecycle policies, pre-signed URLs, and multi-region replication for media-heavy applications.',
          keywords: ['s3', 'object storage', 'blob storage', 'presigned url', 'bucket', 'lifecycle policy'],
          difficulty: 'intermediate',
          estimatedMinutes: 13,
          contentFile: 'system-design/object-storage-modern-systems.md',
        },

        {
          slug: 'file-systems-and-distributed-storage',
          title: 'File Systems and Distributed Storage',
          description:
            'Local filesystems, NFS/NAS, distributed filesystems (HDFS, GlusterFS, Ceph), and how storage is architected in large-scale data platforms.',
          keywords: ['hdfs', 'distributed filesystem', 'nfs', 'ceph', 'glusterfs', 'storage nodes'],
          difficulty: 'advanced',
          estimatedMinutes: 11,
          contentFile: 'system-design/file-systems-and-distributed-storage.md',
        },

        {
          slug: 'big-data-fundamentals',
          title: 'Big Data Fundamentals',
          description:
            'The 5 Vs, batch vs stream processing, Lambda and Kappa architectures, and the modern data lakehouse — how hyperscalers process petabytes.',
          keywords: ['big data', 'lambda architecture', 'kappa architecture', 'data lakehouse', 'spark', 'kafka', 'flink'],
          difficulty: 'advanced',
          estimatedMinutes: 12,
          contentFile: 'system-design/big-data-fundamentals.md',
        },
      ],
    },

    // ================================================================
    // SECTION: Performance
    // ================================================================
    {
      title: 'Performance',
      topics: [
        {
          slug: 'introduction-to-system-performance',
          title: 'Introduction to System Performance',
          description:
            'Latency, throughput, and percentiles — how to measure and reason about performance, identify bottlenecks, and use profiling tools effectively.',
          keywords: ['performance', 'latency', 'throughput', 'p99', 'bottleneck', 'profiling', 'apdex'],
          difficulty: 'intermediate',
          estimatedMinutes: 19,
          contentFile: 'system-design/introduction-to-system-performance.md',
        },

        {
          slug: 'caching-for-speed-optimization',
          title: 'Caching for Speed Optimization',
          description:
            'Cache placement strategies, eviction policies, cache stampede prevention, and when caching hurts more than it helps.',
          keywords: ['caching', 'redis', 'cache-aside', 'write-through', 'eviction', 'cache stampede', 'ttl'],
          difficulty: 'intermediate',
          estimatedMinutes: 15,
          contentFile: 'system-design/caching-for-speed-optimization.md',
        },

        {
          slug: 'messaging-queues-for-decoupling',
          title: 'Messaging & Queues for Decoupling',
          description:
            'Message queues vs pub/sub, Kafka vs RabbitMQ vs SQS, delivery guarantees, dead-letter queues, and how async messaging unlocks horizontal scaling.',
          keywords: ['message queue', 'kafka', 'rabbitmq', 'sqs', 'pub/sub', 'dead letter queue', 'at-least-once'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          contentFile: 'system-design/messaging-queues-for-decoupling.md',
        },

        {
          slug: 'concurrency-and-parallelism',
          title: 'Concurrency & Parallelism',
          description:
            'Threads vs async/await vs processes, the event loop, race conditions, locks, optimistic concurrency, and designing systems that safely handle concurrent requests.',
          keywords: ['concurrency', 'parallelism', 'race condition', 'mutex', 'optimistic locking', 'event loop', 'async'],
          difficulty: 'advanced',
          estimatedMinutes: 17,
          contentFile: 'system-design/concurrency-and-parallelism.md',
        },

        {
          slug: 'database-performance-optimization',
          title: 'Database Performance Optimization Techniques',
          description:
            'Indexing strategies, query planning, N+1 prevention, connection pooling, read replicas, and EXPLAIN ANALYZE — practical techniques for production databases.',
          keywords: ['database performance', 'indexing', 'query optimization', 'connection pooling', 'n+1', 'explain analyze'],
          difficulty: 'advanced',
          estimatedMinutes: 25,
          contentFile: 'system-design/database-performance-optimization.md',
        },
      ],
    },

    // ================================================================
    // SECTION: Reliability, Availability & Disaster Recovery
    // ================================================================
    {
      title: 'Reliability, Availability & Disaster Recovery',
      topics: [
        {
          slug: 'introduction-to-system-reliability',
          title: 'Introduction to System Reliability',
          description:
            'SLAs, SLOs, SLIs, error budgets, and the Site Reliability Engineering (SRE) philosophy — how to define and measure reliability for production systems.',
          keywords: ['sla', 'slo', 'sli', 'error budget', 'reliability', 'sre', 'uptime', 'nines'],
          difficulty: 'intermediate',
          estimatedMinutes: 17,
          contentFile: 'system-design/introduction-to-system-reliability.md',
        },

        {
          slug: 'high-availability-fault-tolerance-failover',
          title: 'High Availability, Fault Tolerance & Failover',
          description:
            'Redundancy patterns, active-passive vs active-active, health checks, circuit breakers, and designing systems that survive single and multi-node failures.',
          keywords: ['high availability', 'fault tolerance', 'failover', 'circuit breaker', 'redundancy', 'active-active'],
          difficulty: 'advanced',
          estimatedMinutes: 16,
          contentFile: 'system-design/high-availability-fault-tolerance-failover.md',
        },

        {
          slug: 'backup-and-recovery-strategies',
          title: 'Backup & Recovery Strategies',
          description:
            'RPO vs RTO, full/incremental/differential backups, point-in-time recovery, backup validation, and the 3-2-1 rule for production data.',
          keywords: ['backup', 'recovery', 'rpo', 'rto', 'point-in-time recovery', 'pitr', '3-2-1 rule'],
          difficulty: 'intermediate',
          estimatedMinutes: 11,
          contentFile: 'system-design/backup-and-recovery-strategies.md',
        },

        {
          slug: 'disaster-recovery-in-practice',
          title: 'Disaster Recovery in Practice',
          description:
            'DR strategies from cold standby to active-active, runbooks, failover drills, chaos engineering, and real-world DR decision frameworks.',
          keywords: ['disaster recovery', 'dr', 'failover', 'chaos engineering', 'runbook', 'multi-region'],
          difficulty: 'advanced',
          estimatedMinutes: 9,
          contentFile: 'system-design/disaster-recovery-in-practice.md',
        },
      ],
    },

    // ================================================================
    // SECTION: Security in System Design
    // ================================================================
    {
      title: 'Security in System Design',
      topics: [
        {
          slug: 'introduction-to-security-in-system-design',
          title: 'Introduction to Security in System Design',
          description:
            'Threat modelling, the OWASP Top 10, defence-in-depth, and the security principles every system designer must bake in from day one.',
          keywords: ['security', 'threat modelling', 'owasp', 'defence in depth', 'zero trust', 'least privilege'],
          difficulty: 'intermediate',
          estimatedMinutes: 22,
          contentFile: 'system-design/introduction-to-security-in-system-design.md',
        },

        {
          slug: 'authentication-and-authorization',
          title: 'Authentication & Authorization',
          description:
            'Authentication (who are you?) vs authorization (what can you do?), OAuth 2.0/OIDC flows, RBAC/ABAC, API keys, and MFA patterns.',
          keywords: ['authentication', 'authorization', 'oauth2', 'oidc', 'jwt', 'rbac', 'mfa', 'api key'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          contentFile: 'system-design/authentication-and-authorization.md',
        },

        {
          slug: 'data-protection-and-secure-communication',
          title: 'Data Protection & Secure Communication',
          description:
            'Encryption at rest and in transit, TLS/mTLS, key management, secrets management, and data classification frameworks for compliant systems.',
          keywords: ['encryption', 'tls', 'mtls', 'kms', 'secrets management', 'data at rest', 'data in transit'],
          difficulty: 'intermediate',
          estimatedMinutes: 17,
          contentFile: 'system-design/data-protection-and-secure-communication.md',
        },

        {
          slug: 'network-and-infrastructure-security',
          title: 'Network & Infrastructure Security',
          description:
            'VPCs, security groups, WAF, DDoS protection, bastion hosts, VPN/private link, and hardening cloud infrastructure against real-world attack vectors.',
          keywords: ['vpc', 'security group', 'waf', 'ddos', 'bastion host', 'private subnet', 'network acl'],
          difficulty: 'advanced',
          estimatedMinutes: 23,
          contentFile: 'system-design/network-and-infrastructure-security.md',
        },
      ],
    },

    // ================================================================
    // SECTION: System Design Approach
    // ================================================================
    {
      title: 'System Design Approach',
      topics: [
        {
          slug: 'four-step-system-design-approach',
          title: 'The 4-Step System Design Approach: From Problem to Solution',
          description:
            'A repeatable framework for tackling any system design problem: clarify requirements, estimate scale, design the architecture, and deep-dive critical components.',
          keywords: ['system design approach', 'design interview', 'requirements', 'estimation', 'architecture framework'],
          difficulty: 'intermediate',
          estimatedMinutes: 15,
          contentFile: 'system-design/four-step-system-design-approach.md',
        },
      ],
    },

    // ================================================================
    // SECTION: Real-World Case Studies
    // ================================================================
    {
      title: 'Real-World Case Studies',
      topics: [
        {
          slug: 'design-ticketing-system',
          title: 'Design a Ticketing System (BookMyShow)',
          description:
            'High-concurrency seat reservation, preventing double-booking, flash sale handling, and payment integration for a real-time event ticketing platform.',
          keywords: ['ticketing system', 'seat reservation', 'concurrency', 'flash sale', 'booking', 'distributed lock'],
          difficulty: 'advanced',
          estimatedMinutes: 26,
          contentFile: 'system-design/design-ticketing-system.md',
        },

        {
          slug: 'design-news-feed',
          title: 'Design a News Feed (Twitter/Instagram)',
          description:
            'Push vs pull feed generation, fan-out on write vs read, celebrity problem, ranking algorithms, and caching strategies for a social media feed at scale.',
          keywords: ['news feed', 'twitter', 'instagram', 'fan-out', 'feed generation', 'ranking', 'timeline'],
          difficulty: 'advanced',
          estimatedMinutes: 43,
          contentFile: 'system-design/design-news-feed.md',
        },

        {
          slug: 'design-notification-system',
          title: 'Design a Notification System',
          description:
            'Multi-channel notification delivery (push, email, SMS, in-app), retry logic, rate limiting, user preferences, and handling millions of notifications per second.',
          keywords: ['notification system', 'push notification', 'email', 'sms', 'apns', 'fcm', 'retry', 'rate limit'],
          difficulty: 'advanced',
          estimatedMinutes: 36,
          contentFile: 'system-design/design-notification-system.md',
        },

        {
          slug: 'design-chat-application',
          title: 'Design a Chat Application (WhatsApp)',
          description:
            'Real-time messaging architecture, message ordering, delivery receipts, offline message queuing, group chat fan-out, and end-to-end encryption design.',
          keywords: ['chat application', 'whatsapp', 'websocket', 'message ordering', 'delivery receipt', 'e2e encryption', 'group chat'],
          difficulty: 'advanced',
          estimatedMinutes: 42,
          contentFile: 'system-design/design-chat-application.md',
        },

        {
          slug: 'design-cloud-storage',
          title: 'Design a Cloud Storage Solution (Google Drive / Dropbox)',
          description:
            'File chunking, deduplication, versioning, sync protocol, conflict resolution, and sharing — designing a scalable cloud file storage system.',
          keywords: ['cloud storage', 'google drive', 'dropbox', 'file chunking', 'deduplication', 'sync', 'versioning'],
          difficulty: 'advanced',
          estimatedMinutes: 46,
          contentFile: 'system-design/design-cloud-storage.md',
        },

        {
          slug: 'design-video-sharing-platform',
          title: 'Design a Video Sharing Platform (YouTube)',
          description:
            'Video upload pipeline, transcoding, adaptive bitrate streaming, CDN architecture, recommendation system, and view count accuracy at billion-user scale.',
          keywords: ['youtube', 'video platform', 'transcoding', 'hls', 'cdn', 'adaptive bitrate', 'view count'],
          difficulty: 'advanced',
          estimatedMinutes: 51,
          contentFile: 'system-design/design-video-sharing-platform.md',
        },

        {
          slug: 'design-search-engine',
          title: 'Design a Search Engine (Google)',
          description:
            'Web crawling, inverted index construction, ranking with TF-IDF and PageRank, query processing pipeline, and building a distributed search at web scale.',
          keywords: ['search engine', 'google', 'inverted index', 'pagerank', 'tf-idf', 'web crawler', 'indexing'],
          difficulty: 'advanced',
          estimatedMinutes: 68,
          contentFile: 'system-design/design-search-engine.md',
        },

        {
          slug: 'design-ecommerce-platform',
          title: 'Design an E-Commerce Platform (Amazon)',
          description:
            'Product catalog, inventory management, order processing, payment integration, shopping cart, and flash-sale handling for a large e-commerce system.',
          keywords: ['ecommerce', 'amazon', 'inventory', 'order processing', 'shopping cart', 'product catalog'],
          difficulty: 'advanced',
          estimatedMinutes: 57,
          contentFile: 'system-design/design-ecommerce-platform.md',
        },

        {
          slug: 'design-ride-hailing-app',
          title: 'Design a Taxi Hailing App (Uber)',
          description:
            'Real-time driver location tracking, geospatial matching, ETA estimation, surge pricing, trip lifecycle, and handling millions of concurrent location updates.',
          keywords: ['uber', 'ride hailing', 'geospatial', 'location tracking', 'matching', 'surge pricing', 'eta'],
          difficulty: 'advanced',
          estimatedMinutes: 54,
          contentFile: 'system-design/design-ride-hailing-app.md',
        },

        {
          slug: 'design-collaborative-document-editor',
          title: 'Design a Collaborative Document Editor (Google Docs)',
          description:
            'Operational Transformation vs CRDTs, real-time conflict resolution, cursor synchronisation, offline editing, and building concurrent editing at Google Docs scale.',
          keywords: ['collaborative editing', 'google docs', 'operational transformation', 'crdt', 'conflict resolution', 'real-time sync'],
          difficulty: 'advanced',
          estimatedMinutes: 50,
          contentFile: 'system-design/design-collaborative-document-editor.md',
        },
      ],
    },
  ],
};

export default category;
