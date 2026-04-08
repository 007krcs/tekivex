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
          content: [
            {
              type: 'heading',
              level: 2,
              text: 'What Is System Design?',
              id: 'what-is-system-design',
            },
            {
              type: 'paragraph',
              html: 'System design is the process of defining the <strong>architecture, components, data flow, and interfaces</strong> of a system to satisfy a set of requirements. Think of it like creating a blueprint before constructing a building — you need to decide where the load-bearing walls go before you start pouring concrete.',
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'System design is not just for interviews! Every time you sketch a service on a whiteboard, choose a database, or decide how two microservices communicate, you are doing system design.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Why System Design Matters',
              id: 'why-it-matters',
            },
            {
              type: 'paragraph',
              html: 'Good design prevents costly rewrites. A poor database choice or a missing cache layer can take months to fix once the system is live. The earlier you make the right trade-offs, the cheaper the system is to build and maintain.',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Scalability</strong> — can the system handle 10x traffic without a rewrite?',
                '<strong>Reliability</strong> — does it keep working when a server crashes?',
                '<strong>Maintainability</strong> — can a new engineer understand the codebase in a week?',
                '<strong>Cost</strong> — are we using the right amount of infrastructure?',
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'The Design Process',
              id: 'design-process',
            },
            {
              type: 'paragraph',
              html: 'Every system design follows a similar lifecycle. Understanding each phase helps you ask the right questions at the right time.',
            },
            {
              type: 'flow',
              steps: [
                {
                  label: 'Requirements',
                  desc: 'Clarify functional & non-functional needs',
                  color: '#6366f1',
                },
                {
                  label: 'High-Level Design',
                  desc: 'Sketch major components & data flow',
                  color: '#8b5cf6',
                },
                {
                  label: 'Detailed Design',
                  desc: 'APIs, schemas, algorithms',
                  color: '#a78bfa',
                },
                {
                  label: 'Implementation',
                  desc: 'Write code, integrate services',
                  color: '#c4b5fd',
                },
                {
                  label: 'Testing',
                  desc: 'Load testing, chaos engineering',
                  color: '#10b981',
                },
                {
                  label: 'Deployment',
                  desc: 'Rollout, monitoring, alerting',
                  color: '#059669',
                },
              ],
            },
            {
              type: 'heading',
              level: 3,
              text: 'Functional vs Non-Functional Requirements',
              id: 'functional-vs-nonfunctional',
            },
            {
              type: 'comparison',
              left: {
                title: 'Functional Requirements',
                color: '#6366f1',
                items: [
                  'What the system should do',
                  'User-facing features',
                  'Example: users can upload images',
                  'Example: search returns results in <1s',
                  'Defined by product managers',
                ],
              },
              right: {
                title: 'Non-Functional Requirements',
                color: '#f59e0b',
                items: [
                  'How the system should behave',
                  'Quality attributes',
                  'Example: 99.99% uptime',
                  'Example: handle 10K RPS',
                  'Defined by engineers & SREs',
                ],
              },
            },
            {
              type: 'heading',
              level: 3,
              text: 'Back-of-the-Envelope Estimation',
              id: 'estimation',
            },
            {
              type: 'paragraph',
              html: 'Before diving into design, engineers perform quick calculations to understand scale. These "napkin math" estimates help you decide whether you need one server or a hundred.',
            },
            {
              type: 'table',
              headers: ['Metric', 'Rough Value'],
              rows: [
                ['QPS (queries per second) for a small app', '100–1,000'],
                ['QPS for a large social network', '100K–1M+'],
                ['Storage for 1 million user profiles (1 KB each)', '~1 GB'],
                ['Network bandwidth for 10K image uploads/day (2 MB each)', '~20 GB/day'],
                ['Read:write ratio (typical social media)', '100:1'],
              ],
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'Always state your assumptions explicitly. An estimate of "1 TB of storage per year" is useless without knowing you assumed 10 million users uploading one 100 KB file per year.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Key Takeaways',
              id: 'key-takeaways',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'System design is about <strong>trade-offs</strong>, not perfect solutions.',
                'Always start with <strong>requirements</strong> before jumping to architecture.',
                'Use back-of-the-envelope math to <strong>size your system</strong> early.',
                'Good design is iterative — plan to revisit and refine.',
              ],
            },
          ],
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
          content: [
            {
              type: 'heading',
              level: 2,
              text: 'What Is Scalability?',
              id: 'what-is-scalability',
            },
            {
              type: 'paragraph',
              html: "Scalability is a system's ability to handle increased load by adding resources. Imagine a restaurant: when it gets busy you can either <strong>get a bigger kitchen</strong> (vertical scaling) or <strong>open more locations</strong> (horizontal scaling).",
            },
            {
              type: 'heading',
              level: 2,
              text: 'Vertical Scaling (Scale Up)',
              id: 'vertical-scaling',
            },
            {
              type: 'paragraph',
              html: 'Add more CPU, RAM, or storage to a single machine. This is the simplest approach — no code changes required — but it has a hard ceiling: you can only buy so big a server.',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Pros:</strong> simple, no distributed systems complexity',
                '<strong>Cons:</strong> single point of failure, hardware limits, expensive at scale',
                '<strong>When to use:</strong> databases with strong ACID requirements, early-stage startups',
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Horizontal Scaling (Scale Out)',
              id: 'horizontal-scaling',
            },
            {
              type: 'paragraph',
              html: 'Add more machines to distribute the load. This requires a <strong>load balancer</strong> to route traffic and usually a <strong>shared data layer</strong> (database, cache) that all instances can access.',
            },
            {
              type: 'flow',
              steps: [
                {
                  label: 'Single Server',
                  desc: 'Handles all traffic alone',
                  color: '#ef4444',
                },
                {
                  label: 'Load Balancer',
                  desc: 'Distributes incoming requests',
                  color: '#f59e0b',
                },
                {
                  label: 'Server 1',
                  desc: 'Handles portion of traffic',
                  color: '#10b981',
                },
                {
                  label: 'Server 2',
                  desc: 'Handles portion of traffic',
                  color: '#10b981',
                },
                {
                  label: 'Server N',
                  desc: 'Scales as demand grows',
                  color: '#10b981',
                },
              ],
            },
            {
              type: 'heading',
              level: 3,
              text: 'Comparison: Vertical vs Horizontal',
              id: 'comparison',
            },
            {
              type: 'comparison',
              left: {
                title: 'Vertical Scaling',
                color: '#6366f1',
                items: [
                  'Upgrade hardware (CPU, RAM, SSD)',
                  'No code changes needed',
                  'Single point of failure',
                  'Hard hardware ceiling',
                  'Higher cost per unit at scale',
                  'Good for databases (PostgreSQL)',
                ],
              },
              right: {
                title: 'Horizontal Scaling',
                color: '#10b981',
                items: [
                  'Add more machines',
                  'Requires load balancer & shared state',
                  'Redundancy built-in',
                  'Theoretically unlimited',
                  'Commodity hardware, lower per-unit cost',
                  'Good for stateless services',
                ],
              },
            },
            {
              type: 'heading',
              level: 2,
              text: 'Node.js Cluster Example',
              id: 'nodejs-cluster',
            },
            {
              type: 'paragraph',
              html: 'Node.js runs on a single thread by default. The built-in <code>cluster</code> module lets you fork worker processes to use all available CPU cores — a simple form of horizontal scaling within one machine.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'cluster-server.ts',
              code: `import cluster from 'node:cluster';
import { cpus } from 'node:os';
import http from 'node:http';

const NUM_WORKERS = cpus().length;

if (cluster.isPrimary) {
  console.log(\`Primary \${process.pid} forking \${NUM_WORKERS} workers\`);

  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code) => {
    console.log(\`Worker \${worker.process.pid} exited (code \${code}). Restarting...\`);
    cluster.fork(); // auto-restart crashed workers
  });
} else {
  http
    .createServer((_req, res) => {
      res.writeHead(200);
      res.end(\`Handled by worker \${process.pid}\\n\`);
    })
    .listen(3000);

  console.log(\`Worker \${process.pid} listening on :3000\`);
}`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'In production, consider <code>pm2</code> or container orchestrators like Kubernetes instead of the raw <code>cluster</code> module. They provide health checks, rolling restarts, and auto-scaling.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Stateless vs Stateful Services',
              id: 'stateless-stateful',
            },
            {
              type: 'paragraph',
              html: 'Horizontal scaling works best with <strong>stateless</strong> services — each request carries all the data the server needs. If the server stores session data in memory, a load balancer might send the next request to a different server that has no idea who the user is.',
            },
            {
              type: 'table',
              headers: ['Approach', 'State Location', 'Scaling Ease'],
              rows: [
                ['Sticky sessions', 'Server memory', 'Hard — uneven load'],
                ['Centralized session store (Redis)', 'External cache', 'Easy — any server works'],
                ['JWT tokens', 'Client (cookie/header)', 'Easiest — fully stateless'],
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Key Takeaways',
              id: 'key-takeaways',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Start vertical, go horizontal when you hit limits.',
                'Stateless services are easier to scale horizontally.',
                'Always externalize session state (Redis, JWT).',
                'Auto-scaling policies should react to CPU, memory, <em>and</em> request latency.',
              ],
            },
          ],
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
          content: [
            {
              type: 'heading',
              level: 2,
              text: 'Defining Availability',
              id: 'defining-availability',
            },
            {
              type: 'paragraph',
              html: 'Availability measures the <strong>percentage of time</strong> a system is operational and accessible. It is expressed as "nines" — 99.9% (three nines) means roughly 8.7 hours of downtime per year.',
            },
            {
              type: 'table',
              headers: ['Nines', 'Availability', 'Downtime / Year', 'Downtime / Month'],
              rows: [
                ['Two nines', '99%', '3.65 days', '7.3 hours'],
                ['Three nines', '99.9%', '8.76 hours', '43.8 minutes'],
                ['Four nines', '99.99%', '52.6 minutes', '4.38 minutes'],
                ['Five nines', '99.999%', '5.26 minutes', '26.3 seconds'],
              ],
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'Each additional nine is <strong>exponentially harder</strong> (and more expensive) to achieve. Going from 99.9% to 99.99% often requires completely re-architecting your system.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'SLA, SLO, and SLI',
              id: 'sla-slo-sli',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>SLI (Service Level Indicator)</strong> — a measured metric, e.g. request latency p99',
                '<strong>SLO (Service Level Objective)</strong> — the target value for an SLI, e.g. p99 latency < 200ms',
                '<strong>SLA (Service Level Agreement)</strong> — a contract with consequences if SLOs are missed',
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Redundancy & Failover',
              id: 'redundancy-failover',
            },
            {
              type: 'paragraph',
              html: 'Redundancy means having <strong>backup components</strong> ready to take over when a primary fails. Failover is the process of switching to the backup. Think of a hospital generator: when the main power grid goes down, the generator kicks in automatically.',
            },
            {
              type: 'flow',
              steps: [
                {
                  label: 'Primary Server',
                  desc: 'Handles all production traffic',
                  color: '#10b981',
                },
                {
                  label: 'Heartbeat Check',
                  desc: 'Monitors primary health every few seconds',
                  color: '#6366f1',
                },
                {
                  label: 'Failure Detected',
                  desc: 'Primary stops responding',
                  color: '#ef4444',
                },
                {
                  label: 'Standby Promoted',
                  desc: 'Hot standby becomes new primary',
                  color: '#f59e0b',
                },
                {
                  label: 'Traffic Rerouted',
                  desc: 'DNS/LB points to new primary',
                  color: '#10b981',
                },
              ],
            },
            {
              type: 'heading',
              level: 3,
              text: 'Active-Passive vs Active-Active',
              id: 'active-passive-active-active',
            },
            {
              type: 'comparison',
              left: {
                title: 'Active-Passive (Hot Standby)',
                color: '#6366f1',
                items: [
                  'One server handles traffic',
                  'Standby idles until failover',
                  'Simpler to implement',
                  'Some downtime during switch',
                  'Standby cost with no throughput benefit',
                ],
              },
              right: {
                title: 'Active-Active',
                color: '#10b981',
                items: [
                  'All servers handle traffic',
                  'No idle resources',
                  'More complex (data sync)',
                  'Near-zero downtime failover',
                  'Better resource utilization',
                ],
              },
            },
            {
              type: 'heading',
              level: 2,
              text: 'High Availability vs Disaster Recovery',
              id: 'ha-vs-dr',
            },
            {
              type: 'comparison',
              left: {
                title: 'High Availability (HA)',
                color: '#06b6d4',
                items: [
                  'Prevents downtime within a region',
                  'Automatic failover in seconds',
                  'Redundant components in same data center',
                  'Goal: minimize unplanned downtime',
                  'Example: database replicas with auto-failover',
                ],
              },
              right: {
                title: 'Disaster Recovery (DR)',
                color: '#f59e0b',
                items: [
                  'Recovers from region-wide failures',
                  'Can take minutes to hours',
                  'Backups in different geographic region',
                  'Goal: recover from catastrophic events',
                  'Example: cross-region S3 replication',
                ],
              },
            },
            {
              type: 'heading',
              level: 2,
              text: 'Measuring Reliability',
              id: 'measuring-reliability',
            },
            {
              type: 'paragraph',
              html: 'Reliability is about the system producing <strong>correct results consistently</strong>. A system can be available (it responds) but unreliable (it returns wrong data). Key metrics include:',
            },
            {
              type: 'table',
              headers: ['Metric', 'What It Measures'],
              rows: [
                ['MTBF (Mean Time Between Failures)', 'Average time the system runs without failing'],
                ['MTTR (Mean Time To Repair)', 'Average time to fix a failure'],
                ['Error rate', 'Percentage of requests that return errors'],
                ['Data durability', 'Probability that stored data is not lost (e.g., 99.999999999%)'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Availability = MTBF / (MTBF + MTTR)</strong>. To improve availability you can either increase MTBF (better hardware, fewer bugs) or decrease MTTR (faster detection, automated recovery).',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Key Takeaways',
              id: 'key-takeaways',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Define your SLOs <em>before</em> designing the system.',
                'Redundancy removes single points of failure.',
                'Active-active gives better utilization but adds complexity.',
                'HA protects within a region; DR protects across regions.',
              ],
            },
          ],
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
          content: [
            {
              type: 'heading',
              level: 2,
              text: 'The CAP Theorem Explained',
              id: 'cap-explained',
            },
            {
              type: 'paragraph',
              html: 'The CAP theorem (Brewer\'s theorem) states that a distributed data store can guarantee <strong>at most two</strong> of the following three properties simultaneously:',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Consistency (C)</strong> — every read receives the most recent write or an error',
                '<strong>Availability (A)</strong> — every request receives a non-error response (though it may not be the latest data)',
                '<strong>Partition Tolerance (P)</strong> — the system continues to operate despite network partitions between nodes',
              ],
            },
            {
              type: 'callout',
              variant: 'caution',
              html: 'In practice, network partitions <em>will</em> happen. So the real choice is between <strong>CP</strong> (consistency during partition, sacrificing availability) and <strong>AP</strong> (availability during partition, sacrificing consistency).',
            },
            {
              type: 'heading',
              level: 2,
              text: 'CAP Triangle',
              id: 'cap-triangle',
            },
            {
              type: 'diagram',
              caption: 'The CAP triangle — pick two guarantees; the third is sacrificed during partitions.',
              svg: `<svg viewBox="0 0 400 360" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, sans-serif">
  <polygon points="200,30 50,320 350,320" fill="none" stroke="#6366f1" stroke-width="2"/>
  <circle cx="200" cy="30" r="28" fill="#6366f1"/>
  <text x="200" y="36" text-anchor="middle" fill="white" font-weight="bold" font-size="14">C</text>
  <circle cx="50" cy="320" r="28" fill="#10b981"/>
  <text x="50" y="326" text-anchor="middle" fill="white" font-weight="bold" font-size="14">A</text>
  <circle cx="350" cy="320" r="28" fill="#f59e0b"/>
  <text x="350" y="326" text-anchor="middle" fill="white" font-weight="bold" font-size="14">P</text>
  <text x="200" y="10" text-anchor="middle" fill="#6366f1" font-size="11">Consistency</text>
  <text x="50" y="356" text-anchor="middle" fill="#10b981" font-size="11">Availability</text>
  <text x="350" y="356" text-anchor="middle" fill="#f59e0b" font-size="11">Partition Tolerance</text>
  <text x="115" y="170" text-anchor="middle" fill="#64748b" font-size="12" font-weight="bold">CA</text>
  <text x="115" y="186" text-anchor="middle" fill="#64748b" font-size="10">Single-node RDBMS</text>
  <text x="275" y="170" text-anchor="middle" fill="#64748b" font-size="12" font-weight="bold">CP</text>
  <text x="275" y="186" text-anchor="middle" fill="#64748b" font-size="10">HBase, MongoDB</text>
  <text x="200" y="290" text-anchor="middle" fill="#64748b" font-size="12" font-weight="bold">AP</text>
  <text x="200" y="306" text-anchor="middle" fill="#64748b" font-size="10">Cassandra, DynamoDB</text>
</svg>`,
            },
            {
              type: 'heading',
              level: 2,
              text: 'Database Classification',
              id: 'database-classification',
            },
            {
              type: 'table',
              headers: ['Database', 'Type', 'CAP Choice', 'Trade-off'],
              rows: [
                ['PostgreSQL (single node)', 'Relational', 'CA', 'No partition tolerance — single server'],
                ['MongoDB (replica set)', 'Document', 'CP', 'Rejects writes during partition until new primary elected'],
                ['HBase', 'Wide-column', 'CP', 'Consistent reads; unavailable during region server failure'],
                ['Cassandra', 'Wide-column', 'AP', 'Always writable; eventual consistency between replicas'],
                ['DynamoDB', 'Key-value', 'AP', 'Eventually consistent reads by default; optional strong reads'],
                ['CockroachDB', 'Relational', 'CP', 'Serializable SQL; unavailable minority partitions'],
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Consistency Models',
              id: 'consistency-models',
            },
            {
              type: 'paragraph',
              html: 'CAP\'s "C" is specifically <strong>linearizability</strong> (the strongest model). In practice, systems offer a spectrum of consistency:',
            },
            {
              type: 'table',
              headers: ['Model', 'Guarantee', 'Example'],
              rows: [
                ['Strong (linearizable)', 'Reads always see the latest write', 'Google Spanner'],
                ['Sequential', 'All nodes see operations in the same order', 'ZooKeeper'],
                ['Causal', 'Causally related operations are ordered', 'MongoDB causal sessions'],
                ['Eventual', 'Replicas converge eventually', 'Cassandra, DynamoDB default'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'Many modern databases let you <em>tune</em> consistency per query. DynamoDB supports both eventually consistent and strongly consistent reads. Choose based on the use case — user profiles can be eventual, but bank balances need strong consistency.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'PACELC Extension',
              id: 'pacelc',
            },
            {
              type: 'paragraph',
              html: 'PACELC extends CAP: during a <strong>Partition</strong>, choose <strong>A</strong> or <strong>C</strong>; <strong>Else</strong> (no partition), choose <strong>Latency</strong> or <strong>Consistency</strong>. This captures the real-world trade-off that exists even when the network is healthy.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Key Takeaways',
              id: 'key-takeaways',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Network partitions are inevitable — the real choice is CP vs AP.',
                'Most applications need different consistency levels for different data.',
                'CAP is a simplification; PACELC is more nuanced.',
                'Choose your database based on your <strong>consistency requirements</strong>, not popularity.',
              ],
            },
          ],
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
          content: [
            {
              type: 'heading',
              level: 2,
              text: 'Latency vs Throughput',
              id: 'latency-vs-throughput',
            },
            {
              type: 'paragraph',
              html: 'Think of a highway. <strong>Latency</strong> is how long it takes one car to travel from point A to point B. <strong>Throughput</strong> is how many cars pass a point per hour. A 10-lane highway has high throughput even if each car takes the same time (latency) as on a 1-lane road.',
            },
            {
              type: 'comparison',
              left: {
                title: 'Latency',
                color: '#6366f1',
                items: [
                  'Time for a single operation',
                  'Measured in ms or seconds',
                  'Lower is better',
                  'Affected by distance, processing, queuing',
                  'Key metric: p50, p95, p99',
                ],
              },
              right: {
                title: 'Throughput',
                color: '#10b981',
                items: [
                  'Operations per unit of time',
                  'Measured in RPS, MB/s, TPS',
                  'Higher is better',
                  'Affected by concurrency, bandwidth',
                  'Key metric: sustained RPS under load',
                ],
              },
            },
            {
              type: 'heading',
              level: 2,
              text: 'The Journey of a Request',
              id: 'request-journey',
            },
            {
              type: 'flow',
              steps: [
                {
                  label: 'Client',
                  desc: 'User clicks a button',
                  color: '#6366f1',
                },
                {
                  label: 'DNS Lookup',
                  desc: '~10ms to resolve domain',
                  color: '#8b5cf6',
                },
                {
                  label: 'TCP + TLS',
                  desc: '~50ms handshake',
                  color: '#a78bfa',
                },
                {
                  label: 'Load Balancer',
                  desc: '~1ms routing',
                  color: '#f59e0b',
                },
                {
                  label: 'App Server',
                  desc: '~20ms processing',
                  color: '#10b981',
                },
                {
                  label: 'Database',
                  desc: '~5ms query',
                  color: '#06b6d4',
                },
                {
                  label: 'Response',
                  desc: 'Total: ~86ms',
                  color: '#6366f1',
                },
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Latency Numbers Every Engineer Should Know',
              id: 'latency-numbers',
            },
            {
              type: 'table',
              headers: ['Operation', 'Latency', 'Notes'],
              rows: [
                ['L1 cache reference', '~1 ns', 'Fastest memory access'],
                ['L2 cache reference', '~4 ns', '4x L1'],
                ['Main memory (RAM)', '~100 ns', '100x L1'],
                ['SSD random read', '~16 \u00b5s', '16,000 ns'],
                ['HDD seek', '~2 ms', '2,000,000 ns'],
                ['Round trip same datacenter', '~0.5 ms', 'Network within rack'],
                ['Round trip cross-continent', '~150 ms', 'Speed of light limit'],
                ['Read 1 MB from memory', '~3 \u00b5s', 'Very fast'],
                ['Read 1 MB from SSD', '~50 \u00b5s', '16x slower than RAM'],
                ['Read 1 MB from network (1 Gbps)', '~10 ms', 'Network is the bottleneck'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'Memory is roughly <strong>1,000x faster than SSD</strong> and <strong>100,000x faster than HDD</strong>. This is why caching in RAM (Redis, Memcached) has such a massive impact on performance.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Percentile Latencies',
              id: 'percentiles',
            },
            {
              type: 'paragraph',
              html: 'Averages hide outliers. If your average latency is 50ms but p99 is 2 seconds, 1% of users are having a terrible experience. Always measure <strong>p50</strong> (median), <strong>p95</strong>, and <strong>p99</strong>.',
            },
            {
              type: 'table',
              headers: ['Percentile', 'Meaning', 'Use Case'],
              rows: [
                ['p50 (median)', '50% of requests are faster', 'Typical user experience'],
                ['p95', '95% of requests are faster', 'SLO target for most services'],
                ['p99', '99% of requests are faster', 'Tail latency — catches edge cases'],
                ['p99.9', '99.9% of requests are faster', 'Used by large-scale services'],
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Optimizing Latency & Throughput',
              id: 'optimizing',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Caching</strong> — serve from RAM instead of disk or network',
                '<strong>CDN</strong> — move content closer to users geographically',
                '<strong>Connection pooling</strong> — reuse TCP connections to databases',
                '<strong>Async processing</strong> — offload heavy work to background queues',
                '<strong>Batching</strong> — combine multiple small operations into one',
                '<strong>Compression</strong> — reduce bytes transferred over the network',
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Key Takeaways',
              id: 'key-takeaways',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Latency and throughput are independent — optimizing one does not always improve the other.',
                'Measure percentiles (p95, p99), not averages.',
                'Memory is 1000x faster than disk — cache aggressively.',
                'Network latency is often the dominant bottleneck.',
              ],
            },
          ],
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
          content: [
            {
              type: 'heading',
              level: 2,
              text: 'What Is a Load Balancer?',
              id: 'what-is-lb',
            },
            {
              type: 'paragraph',
              html: 'A load balancer distributes incoming network traffic across multiple servers to ensure no single server bears too much load. Think of it as a traffic cop at a busy intersection, directing cars to the least congested lane.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Architecture Overview',
              id: 'architecture',
            },
            {
              type: 'diagram',
              caption: 'Load balancer distributing requests across four backend servers.',
              svg: `<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, sans-serif">
  <rect x="10" y="120" width="100" height="50" rx="8" fill="#6366f1"/>
  <text x="60" y="150" text-anchor="middle" fill="white" font-size="13" font-weight="bold">Clients</text>
  <rect x="180" y="120" width="120" height="50" rx="8" fill="#f59e0b"/>
  <text x="240" y="150" text-anchor="middle" fill="white" font-size="13" font-weight="bold">Load Balancer</text>
  <line x1="110" y1="145" x2="180" y2="145" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)"/>
  <rect x="370" y="20" width="110" height="40" rx="6" fill="#10b981"/>
  <text x="425" y="45" text-anchor="middle" fill="white" font-size="11">Server 1</text>
  <rect x="370" y="80" width="110" height="40" rx="6" fill="#10b981"/>
  <text x="425" y="105" text-anchor="middle" fill="white" font-size="11">Server 2</text>
  <rect x="370" y="140" width="110" height="40" rx="6" fill="#10b981"/>
  <text x="425" y="165" text-anchor="middle" fill="white" font-size="11">Server 3</text>
  <rect x="370" y="200" width="110" height="40" rx="6" fill="#10b981"/>
  <text x="425" y="225" text-anchor="middle" fill="white" font-size="11">Server 4</text>
  <line x1="300" y1="140" x2="370" y2="40" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="300" y1="142" x2="370" y2="100" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="300" y1="148" x2="370" y2="160" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="300" y1="150" x2="370" y2="220" stroke="#94a3b8" stroke-width="1.5"/>
  <defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8"/></marker></defs>
</svg>`,
            },
            {
              type: 'heading',
              level: 2,
              text: 'Load Balancing Algorithms',
              id: 'algorithms',
            },
            {
              type: 'table',
              headers: ['Algorithm', 'How It Works', 'Best For'],
              rows: [
                ['Round Robin', 'Requests go to servers in order: 1, 2, 3, 1, 2, 3...', 'Equal-capacity servers, stateless services'],
                ['Weighted Round Robin', 'Higher-weight servers get more requests', 'Mixed-capacity server fleet'],
                ['Least Connections', 'Route to the server with fewest active connections', 'Long-lived connections (WebSockets)'],
                ['IP Hash', 'Hash client IP to determine target server', 'Session stickiness without cookies'],
                ['Consistent Hashing', 'Hash ring minimizes redistribution when servers added/removed', 'Cache layers, distributed stores'],
                ['Random', 'Pick a random server', 'Simple, surprisingly effective at scale'],
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Layer 4 vs Layer 7',
              id: 'layer4-vs-layer7',
            },
            {
              type: 'comparison',
              left: {
                title: 'Layer 4 (Transport)',
                color: '#6366f1',
                items: [
                  'Routes based on IP and TCP/UDP port',
                  'Cannot inspect HTTP headers or body',
                  'Faster — less processing per packet',
                  'Example: AWS NLB, HAProxy TCP mode',
                  'Good for: non-HTTP protocols, raw TCP',
                ],
              },
              right: {
                title: 'Layer 7 (Application)',
                color: '#10b981',
                items: [
                  'Routes based on HTTP headers, URL, cookies',
                  'Can do path-based routing (/api vs /static)',
                  'Slightly more overhead per request',
                  'Example: AWS ALB, nginx, Envoy',
                  'Good for: microservices, A/B testing, SSL termination',
                ],
              },
            },
            {
              type: 'heading',
              level: 2,
              text: 'Nginx Load Balancer Configuration',
              id: 'nginx-config',
            },
            {
              type: 'code',
              language: 'nginx',
              title: 'nginx.conf',
              code: `upstream backend_servers {
    # Least-connections algorithm
    least_conn;

    server 10.0.1.1:3000 weight=3;  # powerful machine gets 3x traffic
    server 10.0.1.2:3000 weight=1;
    server 10.0.1.3:3000 weight=1;
    server 10.0.1.4:3000 backup;     # only used when others are down

    # Health checks
    keepalive 32;
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://backend_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # Timeouts
        proxy_connect_timeout 5s;
        proxy_read_timeout 30s;
    }

    location /health {
        return 200 'OK';
    }
}`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'Use the <code>backup</code> directive for a standby server that only receives traffic when all primary servers are down. This is a simple way to add fault tolerance.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Health Checks',
              id: 'health-checks',
            },
            {
              type: 'paragraph',
              html: 'A load balancer must know which servers are healthy. It periodically sends <strong>health check</strong> requests to each backend. If a server fails several checks in a row, it is removed from the pool until it recovers.',
            },
            {
              type: 'flow',
              steps: [
                {
                  label: 'LB Sends Probe',
                  desc: 'GET /health every 10s',
                  color: '#6366f1',
                },
                {
                  label: 'Server Responds',
                  desc: '200 OK = healthy',
                  color: '#10b981',
                },
                {
                  label: 'No Response?',
                  desc: 'Mark unhealthy after 3 failures',
                  color: '#ef4444',
                },
                {
                  label: 'Remove from Pool',
                  desc: 'Stop routing traffic',
                  color: '#f59e0b',
                },
                {
                  label: 'Recovery',
                  desc: 'Re-add after consecutive successes',
                  color: '#10b981',
                },
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Key Takeaways',
              id: 'key-takeaways',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Use Layer 7 LBs for HTTP services; Layer 4 for raw TCP/UDP.',
                'Least connections is often better than round robin for variable-latency backends.',
                'Always configure health checks to avoid sending traffic to dead servers.',
                'Consistent hashing minimizes cache misses when scaling up/down.',
              ],
            },
          ],
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
          content: [
            {
              type: 'heading',
              level: 2,
              text: 'Why Caching?',
              id: 'why-caching',
            },
            {
              type: 'paragraph',
              html: 'Caching stores copies of frequently accessed data in a <strong>faster storage layer</strong> (usually RAM) so future requests can be served without hitting the slower primary data store. A single Redis lookup takes ~0.5ms vs ~5ms for a PostgreSQL query — a 10x improvement.',
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'There are only two hard things in computer science: cache invalidation and naming things. Caching is powerful but introduces consistency challenges.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Cache-Aside (Lazy Loading)',
              id: 'cache-aside',
            },
            {
              type: 'paragraph',
              html: 'The application checks the cache first. On a <strong>cache miss</strong>, it fetches from the database, stores the result in the cache, then returns it. The cache is only populated on demand.',
            },
            {
              type: 'flow',
              steps: [
                { label: 'Request', desc: 'App receives read request', color: '#6366f1' },
                { label: 'Check Cache', desc: 'Lookup key in Redis', color: '#f59e0b' },
                { label: 'Cache Hit?', desc: 'Return cached data if found', color: '#10b981' },
                { label: 'Cache Miss', desc: 'Query the database', color: '#ef4444' },
                { label: 'Populate Cache', desc: 'Store result with TTL', color: '#8b5cf6' },
                { label: 'Return Data', desc: 'Send response to client', color: '#10b981' },
              ],
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'cache-aside.ts',
              code: `import Redis from 'ioredis';
import { Pool } from 'pg';

const redis = new Redis();
const db = new Pool({ connectionString: process.env.DATABASE_URL });

interface User {
  id: string;
  name: string;
  email: string;
}

async function getUser(userId: string): Promise<User | null> {
  const cacheKey = \`user:\${userId}\`;

  // 1. Check cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // 2. Cache miss — query database
  const { rows } = await db.query(
    'SELECT id, name, email FROM users WHERE id = $1',
    [userId]
  );

  if (rows.length === 0) return null;

  // 3. Populate cache with 5-minute TTL
  const user = rows[0] as User;
  await redis.set(cacheKey, JSON.stringify(user), 'EX', 300);

  return user;
}

async function updateUser(userId: string, data: Partial<User>): Promise<void> {
  // Update database
  await db.query(
    'UPDATE users SET name = COALESCE($2, name), email = COALESCE($3, email) WHERE id = $1',
    [userId, data.name, data.email]
  );

  // Invalidate cache
  await redis.del(\`user:\${userId}\`);
}`,
            },
            {
              type: 'heading',
              level: 2,
              text: 'Write-Through',
              id: 'write-through',
            },
            {
              type: 'paragraph',
              html: 'Data is written to the cache <strong>and</strong> the database simultaneously. Every write updates both layers, so the cache is always consistent. The downside is higher write latency.',
            },
            {
              type: 'flow',
              steps: [
                { label: 'Write Request', desc: 'App receives data to store', color: '#6366f1' },
                { label: 'Write to Cache', desc: 'Update Redis', color: '#f59e0b' },
                { label: 'Write to DB', desc: 'Update PostgreSQL', color: '#8b5cf6' },
                { label: 'Confirm', desc: 'Both writes succeed', color: '#10b981' },
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Write-Behind (Write-Back)',
              id: 'write-behind',
            },
            {
              type: 'paragraph',
              html: 'Data is written to the cache first and acknowledged immediately. The cache then <strong>asynchronously flushes</strong> to the database in batches. This gives the lowest write latency but risks data loss if the cache crashes before flushing.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Read-Through',
              id: 'read-through',
            },
            {
              type: 'paragraph',
              html: 'Similar to cache-aside, but the <strong>cache itself</strong> handles loading from the database on a miss. The application only talks to the cache, never directly to the database. This simplifies application code but requires cache infrastructure that supports data loaders.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Strategy Comparison',
              id: 'strategy-comparison',
            },
            {
              type: 'table',
              headers: ['Strategy', 'Read Latency', 'Write Latency', 'Consistency', 'Complexity'],
              rows: [
                ['Cache-Aside', 'Low (on hit)', 'Normal', 'Eventual (TTL)', 'Low'],
                ['Write-Through', 'Low', 'Higher (dual write)', 'Strong', 'Medium'],
                ['Write-Behind', 'Low', 'Lowest', 'Eventual (async)', 'High'],
                ['Read-Through', 'Low (on hit)', 'Normal', 'Eventual (TTL)', 'Medium'],
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Cache Invalidation Strategies',
              id: 'invalidation',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>TTL (Time-To-Live)</strong> — automatically expire after N seconds. Simple, but stale data until TTL expires.',
                '<strong>Event-driven invalidation</strong> — delete cache on write. Requires coordination between services.',
                '<strong>Versioned keys</strong> — include a version number in the cache key, increment on write.',
                '<strong>Pub/Sub invalidation</strong> — broadcast invalidation events to all app servers.',
              ],
            },
            {
              type: 'callout',
              variant: 'caution',
              html: 'Never cache without a TTL in production. A missing TTL means stale data lives forever. Even a generous TTL of 24 hours is better than none.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Key Takeaways',
              id: 'key-takeaways',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Cache-aside is the most common and easiest to implement.',
                'Write-through ensures consistency; write-behind optimizes write speed.',
                'Always set a TTL to prevent stale data buildup.',
                'Cache invalidation is the hard part — choose a strategy based on your consistency needs.',
              ],
            },
          ],
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
          content: [
            {
              type: 'heading',
              level: 2,
              text: 'What Is a CDN?',
              id: 'what-is-cdn',
            },
            {
              type: 'paragraph',
              html: 'A Content Delivery Network is a globally distributed network of <strong>edge servers</strong> that cache and serve content from locations close to end users. Instead of every request traveling to your origin server in Virginia, a user in Tokyo gets served from a nearby edge node.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'How CDN Requests Work',
              id: 'how-cdn-works',
            },
            {
              type: 'flow',
              steps: [
                { label: 'User Request', desc: 'Browser requests an image', color: '#6366f1' },
                { label: 'DNS Resolution', desc: 'Resolves to nearest PoP', color: '#8b5cf6' },
                { label: 'Edge Cache Check', desc: 'Is the asset cached?', color: '#f59e0b' },
                { label: 'Cache HIT', desc: 'Return from edge (fast!)', color: '#10b981' },
                { label: 'Cache MISS', desc: 'Fetch from origin server', color: '#ef4444' },
                { label: 'Cache & Serve', desc: 'Store at edge, return to user', color: '#10b981' },
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'With CDN vs Without CDN',
              id: 'with-vs-without',
            },
            {
              type: 'comparison',
              left: {
                title: 'Without CDN',
                color: '#ef4444',
                items: [
                  'All requests hit origin server',
                  'High latency for distant users',
                  'Origin bears full bandwidth cost',
                  'Single point of failure',
                  'No edge caching',
                ],
              },
              right: {
                title: 'With CDN',
                color: '#10b981',
                items: [
                  '90%+ requests served from edge',
                  'Low latency worldwide',
                  'Origin bandwidth reduced dramatically',
                  'DDoS protection at the edge',
                  'Automatic failover to other PoPs',
                ],
              },
            },
            {
              type: 'heading',
              level: 2,
              text: 'What to Cache on a CDN',
              id: 'what-to-cache',
            },
            {
              type: 'table',
              headers: ['Content Type', 'Cacheable?', 'TTL Recommendation'],
              rows: [
                ['Static images, CSS, JS', 'Yes', 'Long (1 year with cache-busting hash)'],
                ['HTML pages', 'Sometimes', 'Short (60s) or stale-while-revalidate'],
                ['API responses (public)', 'Sometimes', 'Short (10-60s) with Vary headers'],
                ['API responses (personalized)', 'No', 'Do not cache — user-specific data'],
                ['Video/audio streaming', 'Yes', 'Long, chunked delivery'],
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Cache-Control Headers',
              id: 'cache-control',
            },
            {
              type: 'code',
              language: 'text',
              title: 'HTTP headers',
              code: `# Cache for 1 year (immutable content with hash in filename)
Cache-Control: public, max-age=31536000, immutable

# Cache for 60 seconds, serve stale while revalidating
Cache-Control: public, max-age=60, stale-while-revalidate=30

# Never cache (personalized API responses)
Cache-Control: private, no-store

# Cache at CDN but not browser
Cache-Control: public, s-maxage=300, max-age=0`,
            },
            {
              type: 'heading',
              level: 2,
              text: 'Edge Computing',
              id: 'edge-computing',
            },
            {
              type: 'paragraph',
              html: 'Edge computing takes CDNs further by running <strong>application logic</strong> at edge nodes, not just serving cached assets. Cloudflare Workers, AWS Lambda@Edge, and Vercel Edge Functions let you execute code in 200+ locations worldwide.',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>A/B testing</strong> — route users to different variants at the edge',
                '<strong>Authentication</strong> — validate JWTs before hitting origin',
                '<strong>Geo-routing</strong> — redirect users to region-specific content',
                '<strong>Image optimization</strong> — resize and convert formats on the fly',
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'A good CDN cache hit ratio target is <strong>95%+</strong>. If your ratio is below 80%, review your <code>Cache-Control</code> headers and URL structure — query parameters often cause unnecessary cache misses.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Key Takeaways',
              id: 'key-takeaways',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'CDNs reduce latency by serving content from geographically closer nodes.',
                'Use long TTLs with cache-busting hashes for static assets.',
                'Never cache personalized or authenticated responses at the CDN.',
                'Edge computing enables running logic at the edge, not just caching.',
              ],
            },
          ],
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
          content: [
            {
              type: 'heading',
              level: 2,
              text: 'Why Rate Limiting?',
              id: 'why-rate-limiting',
            },
            {
              type: 'paragraph',
              html: 'Rate limiting controls how many requests a client can make in a given time window. Without it, a single misbehaving client (or attacker) can overwhelm your servers. Think of it as a bouncer at a club — only letting in a certain number of people per hour.',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                'Prevent <strong>DDoS attacks</strong> and abuse',
                'Protect backend services from <strong>overload</strong>',
                'Enforce <strong>fair usage</strong> across API consumers',
                'Manage <strong>cost</strong> for metered third-party APIs',
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Request Flow',
              id: 'request-flow',
            },
            {
              type: 'flow',
              steps: [
                { label: 'Incoming Request', desc: 'Client sends API request', color: '#6366f1' },
                { label: 'Identify Client', desc: 'By API key, IP, or user ID', color: '#8b5cf6' },
                { label: 'Check Rate', desc: 'Look up counter in Redis', color: '#f59e0b' },
                { label: 'Under Limit?', desc: 'Increment counter and allow', color: '#10b981' },
                { label: 'Over Limit?', desc: 'Return 429 Too Many Requests', color: '#ef4444' },
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Algorithms',
              id: 'algorithms',
            },
            {
              type: 'heading',
              level: 3,
              text: 'Token Bucket',
              id: 'token-bucket',
            },
            {
              type: 'paragraph',
              html: 'A bucket holds tokens (capacity N). Tokens are added at a fixed rate. Each request consumes one token. If the bucket is empty, the request is rejected. This allows <strong>bursts</strong> up to the bucket size while maintaining an average rate.',
            },
            {
              type: 'heading',
              level: 3,
              text: 'Leaky Bucket',
              id: 'leaky-bucket',
            },
            {
              type: 'paragraph',
              html: 'Requests enter a queue (bucket) and are processed at a <strong>fixed rate</strong>, like water dripping from a bucket. If the queue is full, new requests are dropped. This smooths out bursts into a constant outflow.',
            },
            {
              type: 'heading',
              level: 3,
              text: 'Sliding Window',
              id: 'sliding-window',
            },
            {
              type: 'paragraph',
              html: 'Track the timestamp of each request. Count requests in the last N seconds. More accurate than fixed windows (which can allow 2x burst at window boundaries) but requires more memory.',
            },
            {
              type: 'table',
              headers: ['Algorithm', 'Burst Handling', 'Memory', 'Accuracy', 'Complexity'],
              rows: [
                ['Token Bucket', 'Allows bursts', 'Low (counter + timestamp)', 'Good', 'Low'],
                ['Leaky Bucket', 'Smooths bursts', 'Medium (queue)', 'Good', 'Medium'],
                ['Fixed Window', 'Edge burst issue', 'Low (counter per window)', 'Moderate', 'Low'],
                ['Sliding Window Log', 'No edge burst', 'High (all timestamps)', 'Excellent', 'High'],
                ['Sliding Window Counter', 'Minimal edge burst', 'Low (2 counters)', 'Very Good', 'Low'],
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Express Rate Limiter Middleware',
              id: 'express-middleware',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'rate-limiter.ts',
              code: `import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

const redis = new Redis();

interface RateLimitOptions {
  windowMs: number;    // Time window in milliseconds
  maxRequests: number; // Max requests per window
  keyPrefix?: string;  // Redis key prefix
}

export function rateLimit(options: RateLimitOptions) {
  const { windowMs, maxRequests, keyPrefix = 'rl' } = options;
  const windowSec = Math.ceil(windowMs / 1000);

  return async (req: Request, res: Response, next: NextFunction) => {
    const clientId = req.ip || 'unknown';
    const key = \`\${keyPrefix}:\${clientId}\`;

    // Atomic increment + expire using Lua script
    const current = await redis.eval(
      \`
      local count = redis.call('INCR', KEYS[1])
      if count == 1 then
        redis.call('EXPIRE', KEYS[1], ARGV[1])
      end
      return count
      \`,
      1, key, windowSec
    ) as number;

    // Set rate limit headers
    res.set('X-RateLimit-Limit', String(maxRequests));
    res.set('X-RateLimit-Remaining', String(Math.max(0, maxRequests - current)));

    if (current > maxRequests) {
      const ttl = await redis.ttl(key);
      res.set('Retry-After', String(ttl));
      return res.status(429).json({
        error: 'Too Many Requests',
        retryAfter: ttl,
      });
    }

    next();
  };
}

// Usage:
// app.use('/api/', rateLimit({ windowMs: 60_000, maxRequests: 100 }));`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'Always return <code>Retry-After</code> and <code>X-RateLimit-Remaining</code> headers so clients can implement intelligent backoff instead of blindly retrying.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Rate Limiting at Different Layers',
              id: 'layers',
            },
            {
              type: 'table',
              headers: ['Layer', 'Tool', 'Use Case'],
              rows: [
                ['CDN / Edge', 'Cloudflare, AWS WAF', 'Block DDoS, bot traffic'],
                ['API Gateway', 'Kong, AWS API Gateway', 'Per-API-key quotas'],
                ['Application', 'Express middleware, custom', 'Per-user, per-endpoint limits'],
                ['Database', 'Connection pool limits', 'Prevent DB overload'],
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Key Takeaways',
              id: 'key-takeaways',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Token bucket is the most popular algorithm — allows bursts while capping average rate.',
                'Use Redis for distributed rate limiting across multiple app servers.',
                'Apply rate limits at multiple layers for defense in depth.',
                'Always include rate limit headers in your API responses.',
              ],
            },
          ],
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
          content: [
            {
              type: 'heading',
              level: 2,
              text: 'SQL vs NoSQL Overview',
              id: 'sql-vs-nosql',
            },
            {
              type: 'paragraph',
              html: 'Choosing a database is one of the most impactful decisions in system design. <strong>SQL databases</strong> (relational) enforce a structured schema and support complex joins. <strong>NoSQL databases</strong> offer flexible schemas and horizontal scalability at the cost of some consistency guarantees.',
            },
            {
              type: 'comparison',
              left: {
                title: 'SQL (PostgreSQL)',
                color: '#6366f1',
                items: [
                  'Fixed schema with migrations',
                  'ACID transactions',
                  'Complex JOINs and aggregations',
                  'Vertical scaling (read replicas help)',
                  'Best for: structured data, relationships',
                  'Examples: PostgreSQL, MySQL, SQLite',
                ],
              },
              right: {
                title: 'NoSQL (MongoDB)',
                color: '#10b981',
                items: [
                  'Flexible/dynamic schema',
                  'Eventual consistency (tunable)',
                  'Denormalized, embedded documents',
                  'Horizontal scaling (sharding)',
                  'Best for: unstructured, high-write loads',
                  'Examples: MongoDB, Cassandra, DynamoDB',
                ],
              },
            },
            {
              type: 'heading',
              level: 2,
              text: 'Normalization',
              id: 'normalization',
            },
            {
              type: 'paragraph',
              html: 'Normalization organizes data to <strong>reduce redundancy</strong>. Each fact is stored in exactly one place. This makes updates consistent but can require expensive JOINs for reads.',
            },
            {
              type: 'table',
              headers: ['Normal Form', 'Rule', 'Example'],
              rows: [
                ['1NF', 'No repeating groups; atomic columns', 'Separate phone numbers into rows, not comma-separated'],
                ['2NF', 'No partial dependencies on composite keys', 'Move product name to products table'],
                ['3NF', 'No transitive dependencies', 'Move city/state to a separate addresses table'],
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'SQL Schema Example',
              id: 'sql-schema',
            },
            {
              type: 'code',
              language: 'sql',
              title: 'schema.sql',
              code: `-- Users table
CREATE TABLE users (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email       VARCHAR(255) UNIQUE NOT NULL,
    name        VARCHAR(100) NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Posts table (normalized — references users)
CREATE TABLE posts (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    body        TEXT NOT NULL,
    published   BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Tags (many-to-many via junction table)
CREATE TABLE tags (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE post_tags (
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    tag_id  INT  REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Indexes for common queries
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_published ON posts(published) WHERE published = TRUE;`,
            },
            {
              type: 'heading',
              level: 2,
              text: 'NoSQL Schema Example',
              id: 'nosql-schema',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'mongo-schema.ts',
              code: `// MongoDB — denormalized document model
// Embed related data to avoid joins

interface PostDocument {
  _id: ObjectId;
  title: string;
  body: string;
  published: boolean;

  // Embedded author (denormalized)
  author: {
    _id: ObjectId;
    name: string;
    email: string;
  };

  // Embedded tags (no junction table needed)
  tags: string[];

  createdAt: Date;
}

// Example document:
// {
//   _id: ObjectId("..."),
//   title: "System Design 101",
//   body: "...",
//   published: true,
//   author: { _id: ObjectId("..."), name: "Alice", email: "alice@example.com" },
//   tags: ["system-design", "tutorial"],
//   createdAt: ISODate("2025-01-15")
// }

// Indexes
db.posts.createIndex({ "author._id": 1 });
db.posts.createIndex({ tags: 1 });
db.posts.createIndex({ published: 1, createdAt: -1 });`,
            },
            {
              type: 'heading',
              level: 2,
              text: 'Indexing Strategies',
              id: 'indexing',
            },
            {
              type: 'table',
              headers: ['Index Type', 'When to Use', 'Example'],
              rows: [
                ['B-tree (default)', 'Equality and range queries', 'WHERE age > 25'],
                ['Hash', 'Exact equality only', 'WHERE email = \'...\''],
                ['GIN (inverted)', 'Full-text search, array/JSON fields', 'WHERE tags @> ARRAY[\'js\']'],
                ['Partial', 'Index only matching rows', 'WHERE published = TRUE'],
                ['Composite', 'Multi-column queries', 'WHERE author_id = ? AND published = TRUE'],
              ],
            },
            {
              type: 'callout',
              variant: 'caution',
              html: 'Every index speeds up reads but <strong>slows down writes</strong> because the index must be updated on every INSERT/UPDATE. Only index columns you actually query on. Use <code>EXPLAIN ANALYZE</code> to verify indexes are being used.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'When to Choose What',
              id: 'when-to-choose',
            },
            {
              type: 'table',
              headers: ['Scenario', 'Recommended', 'Reason'],
              rows: [
                ['E-commerce with transactions', 'SQL (PostgreSQL)', 'ACID for orders and payments'],
                ['Social media feed', 'NoSQL (Cassandra)', 'High write throughput, time-series data'],
                ['User profiles with varied fields', 'NoSQL (MongoDB)', 'Flexible schema per user'],
                ['Analytics and reporting', 'SQL (PostgreSQL) or columnar (ClickHouse)', 'Complex aggregations and JOINs'],
                ['Real-time chat messages', 'NoSQL (Cassandra/ScyllaDB)', 'Massive write volume, partition by chat room'],
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Key Takeaways',
              id: 'key-takeaways',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Start with SQL unless you have a specific reason for NoSQL.',
                'Normalize in SQL; denormalize (embed) in NoSQL.',
                'Index columns you query, but not every column.',
                'Consider access patterns first — schema follows queries.',
              ],
            },
          ],
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
          content: [
            {
              type: 'heading',
              level: 2,
              text: 'Why Shard?',
              id: 'why-shard',
            },
            {
              type: 'paragraph',
              html: 'When a single database server cannot handle the data volume or query load, you split the data across multiple servers — this is <strong>sharding</strong> (horizontal partitioning). Each shard holds a subset of the data.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Sharding Strategies',
              id: 'sharding-strategies',
            },
            {
              type: 'table',
              headers: ['Strategy', 'How It Works', 'Pros', 'Cons'],
              rows: [
                ['Range-based', 'Shard by value range (A-M, N-Z)', 'Simple, range queries easy', 'Hot spots if data is skewed'],
                ['Hash-based', 'Hash the shard key, mod by shard count', 'Even distribution', 'Range queries need scatter-gather'],
                ['Directory-based', 'Lookup table maps keys to shards', 'Flexible, custom placement', 'Lookup service is a SPOF'],
                ['Geo-based', 'Shard by geographic region', 'Data locality', 'Cross-region queries are expensive'],
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Sharded Cluster Architecture',
              id: 'shard-architecture',
            },
            {
              type: 'diagram',
              caption: 'Sharded cluster with 3 shards, each having a primary and replica.',
              svg: `<svg viewBox="0 0 520 320" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, sans-serif">
  <rect x="180" y="10" width="160" height="40" rx="8" fill="#6366f1"/>
  <text x="260" y="35" text-anchor="middle" fill="white" font-size="13" font-weight="bold">Query Router</text>
  <rect x="20" y="100" width="140" height="40" rx="6" fill="#f59e0b"/>
  <text x="90" y="125" text-anchor="middle" fill="white" font-size="12">Shard 1 (A-H)</text>
  <rect x="190" y="100" width="140" height="40" rx="6" fill="#f59e0b"/>
  <text x="260" y="125" text-anchor="middle" fill="white" font-size="12">Shard 2 (I-P)</text>
  <rect x="360" y="100" width="140" height="40" rx="6" fill="#f59e0b"/>
  <text x="430" y="125" text-anchor="middle" fill="white" font-size="12">Shard 3 (Q-Z)</text>
  <rect x="20" y="170" width="65" height="35" rx="4" fill="#10b981"/>
  <text x="52" y="192" text-anchor="middle" fill="white" font-size="10">Primary</text>
  <rect x="95" y="170" width="65" height="35" rx="4" fill="#94a3b8"/>
  <text x="127" y="192" text-anchor="middle" fill="white" font-size="10">Replica</text>
  <rect x="190" y="170" width="65" height="35" rx="4" fill="#10b981"/>
  <text x="222" y="192" text-anchor="middle" fill="white" font-size="10">Primary</text>
  <rect x="265" y="170" width="65" height="35" rx="4" fill="#94a3b8"/>
  <text x="297" y="192" text-anchor="middle" fill="white" font-size="10">Replica</text>
  <rect x="360" y="170" width="65" height="35" rx="4" fill="#10b981"/>
  <text x="392" y="192" text-anchor="middle" fill="white" font-size="10">Primary</text>
  <rect x="435" y="170" width="65" height="35" rx="4" fill="#94a3b8"/>
  <text x="467" y="192" text-anchor="middle" fill="white" font-size="10">Replica</text>
  <line x1="260" y1="50" x2="90" y2="100" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="260" y1="50" x2="260" y2="100" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="260" y1="50" x2="430" y2="100" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="90" y1="140" x2="52" y2="170" stroke="#94a3b8" stroke-width="1"/>
  <line x1="90" y1="140" x2="127" y2="170" stroke="#94a3b8" stroke-width="1"/>
  <line x1="260" y1="140" x2="222" y2="170" stroke="#94a3b8" stroke-width="1"/>
  <line x1="260" y1="140" x2="297" y2="170" stroke="#94a3b8" stroke-width="1"/>
  <line x1="430" y1="140" x2="392" y2="170" stroke="#94a3b8" stroke-width="1"/>
  <line x1="430" y1="140" x2="467" y2="170" stroke="#94a3b8" stroke-width="1"/>
  <rect x="180" y="250" width="160" height="40" rx="8" fill="#8b5cf6"/>
  <text x="260" y="275" text-anchor="middle" fill="white" font-size="12">Config Server</text>
  <line x1="260" y1="250" x2="260" y2="210" stroke="#8b5cf6" stroke-width="1" stroke-dasharray="4"/>
</svg>`,
            },
            {
              type: 'heading',
              level: 2,
              text: 'Sharding vs Replication',
              id: 'sharding-vs-replication',
            },
            {
              type: 'comparison',
              left: {
                title: 'Sharding (Partition)',
                color: '#f59e0b',
                items: [
                  'Splits data across nodes',
                  'Each shard has unique data',
                  'Scales write throughput',
                  'Increases total storage capacity',
                  'Complex: cross-shard queries, rebalancing',
                ],
              },
              right: {
                title: 'Replication (Copy)',
                color: '#10b981',
                items: [
                  'Copies data to multiple nodes',
                  'Each replica has the same data',
                  'Scales read throughput',
                  'Provides redundancy / fault tolerance',
                  'Simpler: replication lag is the main concern',
                ],
              },
            },
            {
              type: 'heading',
              level: 2,
              text: 'Replication Topologies',
              id: 'replication-topologies',
            },
            {
              type: 'table',
              headers: ['Topology', 'How It Works', 'Consistency', 'Use Case'],
              rows: [
                ['Single-leader', 'One primary accepts writes; replicas for reads', 'Strong (sync) or Eventual (async)', 'Most OLTP workloads'],
                ['Multi-leader', 'Multiple primaries accept writes', 'Conflict resolution needed', 'Multi-region deployments'],
                ['Leaderless', 'Any node accepts reads and writes', 'Quorum-based (R + W > N)', 'Cassandra, DynamoDB'],
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Choosing a Shard Key',
              id: 'shard-key',
            },
            {
              type: 'paragraph',
              html: 'The shard key determines which shard stores each record. A bad shard key creates <strong>hot spots</strong> (one shard gets most of the traffic). Good shard keys have high cardinality and even distribution.',
            },
            {
              type: 'callout',
              variant: 'caution',
              html: 'Avoid using timestamps as shard keys! All recent writes would go to the same shard. Instead, use a hash of the user ID or a compound key like <code>user_id + timestamp</code>.',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Good shard keys:</strong> user_id, order_id, tenant_id',
                '<strong>Bad shard keys:</strong> timestamp, country (low cardinality), auto-increment ID',
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Rebalancing Shards',
              id: 'rebalancing',
            },
            {
              type: 'paragraph',
              html: 'When you add or remove shards, data must be redistributed. <strong>Consistent hashing</strong> minimizes data movement by only moving keys that map to the changed portion of the hash ring. Virtual nodes improve balance further.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Key Takeaways',
              id: 'key-takeaways',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Use replication for read scaling and HA; use sharding for write scaling and storage.',
                'Choose shard keys with high cardinality and even distribution.',
                'Consistent hashing minimizes data movement during rebalancing.',
                'Combine sharding + replication for both scale and fault tolerance.',
              ],
            },
          ],
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
          content: [
            {
              type: 'heading',
              level: 2,
              text: 'Why Message Queues?',
              id: 'why-queues',
            },
            {
              type: 'paragraph',
              html: 'A message queue <strong>decouples</strong> the producer (sender) from the consumer (receiver). The producer puts a message on the queue and continues immediately, without waiting for the consumer to process it. Think of it as a mailbox — you drop off a letter and walk away.',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Decoupling</strong> — services evolve independently',
                '<strong>Buffering</strong> — absorb traffic spikes without dropping requests',
                '<strong>Async processing</strong> — offload heavy work (email, image resize, ML inference)',
                '<strong>Retry & dead-letter</strong> — failed messages can be retried or inspected',
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Point-to-Point vs Pub/Sub',
              id: 'p2p-vs-pubsub',
            },
            {
              type: 'comparison',
              left: {
                title: 'Point-to-Point',
                color: '#6366f1',
                items: [
                  'One producer, one consumer',
                  'Each message consumed by exactly one consumer',
                  'Work queue pattern',
                  'Example: SQS, RabbitMQ work queue',
                  'Good for: task distribution, job processing',
                ],
              },
              right: {
                title: 'Pub/Sub (Fan-out)',
                color: '#10b981',
                items: [
                  'One producer, many consumers',
                  'Each message delivered to all subscribers',
                  'Event broadcast pattern',
                  'Example: Kafka topics, SNS, Redis Pub/Sub',
                  'Good for: notifications, event-driven architecture',
                ],
              },
            },
            {
              type: 'heading',
              level: 2,
              text: 'Message Flow',
              id: 'message-flow',
            },
            {
              type: 'flow',
              steps: [
                { label: 'Producer', desc: 'Creates and sends message', color: '#6366f1' },
                { label: 'Queue / Topic', desc: 'Stores message durably', color: '#f59e0b' },
                { label: 'Consumer', desc: 'Pulls and processes message', color: '#10b981' },
                { label: 'Acknowledge', desc: 'Confirms successful processing', color: '#8b5cf6' },
                { label: 'Delete / Commit', desc: 'Message removed from queue', color: '#06b6d4' },
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Simple Queue Implementation',
              id: 'queue-implementation',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'simple-queue.ts',
              code: `import Redis from 'ioredis';

const redis = new Redis();

interface Message<T = unknown> {
  id: string;
  payload: T;
  createdAt: number;
  retries: number;
}

class SimpleQueue<T> {
  constructor(private name: string) {}

  /** Enqueue a message */
  async enqueue(payload: T): Promise<string> {
    const msg: Message<T> = {
      id: crypto.randomUUID(),
      payload,
      createdAt: Date.now(),
      retries: 0,
    };
    await redis.lpush(\`queue:\${this.name}\`, JSON.stringify(msg));
    return msg.id;
  }

  /** Dequeue with blocking wait (up to timeoutSec) */
  async dequeue(timeoutSec = 5): Promise<Message<T> | null> {
    const result = await redis.brpop(\`queue:\${this.name}\`, timeoutSec);
    if (!result) return null;
    return JSON.parse(result[1]) as Message<T>;
  }

  /** Get queue length */
  async length(): Promise<number> {
    return redis.llen(\`queue:\${this.name}\`);
  }
}

// --- Usage ---
interface EmailJob {
  to: string;
  subject: string;
  body: string;
}

const emailQueue = new SimpleQueue<EmailJob>('emails');

// Producer
await emailQueue.enqueue({
  to: 'user@example.com',
  subject: 'Welcome!',
  body: 'Thanks for signing up.',
});

// Consumer (worker process)
async function worker() {
  while (true) {
    const msg = await emailQueue.dequeue();
    if (msg) {
      console.log(\`Sending email to \${msg.payload.to}\`);
      // await sendEmail(msg.payload);
    }
  }
}`,
            },
            {
              type: 'heading',
              level: 2,
              text: 'Queue Comparison',
              id: 'queue-comparison',
            },
            {
              type: 'table',
              headers: ['Feature', 'RabbitMQ', 'Apache Kafka', 'AWS SQS'],
              rows: [
                ['Model', 'Message broker', 'Event streaming log', 'Managed queue'],
                ['Ordering', 'Per-queue FIFO', 'Per-partition ordered', 'Best-effort (FIFO option)'],
                ['Delivery', 'At-most-once or at-least-once', 'At-least-once', 'At-least-once'],
                ['Retention', 'Until consumed', 'Configurable (days/forever)', 'Up to 14 days'],
                ['Throughput', 'Moderate (~50K msg/s)', 'Very high (~1M msg/s)', 'High (managed)'],
                ['Best for', 'Task queues, RPC', 'Event sourcing, stream processing', 'Serverless, simple async'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'Always design consumers to be <strong>idempotent</strong> — processing the same message twice should produce the same result. Messages can be delivered more than once in almost every queue system.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Dead Letter Queues',
              id: 'dlq',
            },
            {
              type: 'paragraph',
              html: 'A dead letter queue (DLQ) captures messages that fail processing after multiple retries. Instead of losing them, you can inspect and reprocess them later. Always configure a DLQ in production.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Key Takeaways',
              id: 'key-takeaways',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Use queues to decouple producers from consumers and absorb traffic spikes.',
                'Point-to-point for work distribution; pub/sub for event broadcast.',
                'Make consumers idempotent — duplicate messages will happen.',
                'Always configure dead letter queues for failed messages.',
              ],
            },
          ],
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
          content: [
            {
              type: 'heading',
              level: 2,
              text: 'Monolithic Architecture',
              id: 'monolith',
            },
            {
              type: 'paragraph',
              html: 'A monolith is a single deployable unit containing all features. All code runs in one process, shares one database, and is deployed together. Think of it as a single large building that houses every department of a company.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Microservices Architecture',
              id: 'microservices',
            },
            {
              type: 'paragraph',
              html: 'Microservices break the application into small, independent services, each owning its own data and deployable separately. Each service is like an independent shop in a mall — they can open, close, and renovate without affecting others.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Detailed Comparison',
              id: 'comparison',
            },
            {
              type: 'comparison',
              left: {
                title: 'Monolith',
                color: '#6366f1',
                items: [
                  'Single codebase and deployment',
                  'Shared database',
                  'Simple local function calls',
                  'Easier to develop and debug initially',
                  'One team can own the entire app',
                  'Harder to scale individual features',
                  'One bug can crash everything',
                ],
              },
              right: {
                title: 'Microservices',
                color: '#10b981',
                items: [
                  'Multiple codebases and deployments',
                  'Each service owns its data',
                  'Network calls (REST, gRPC, events)',
                  'More complex infrastructure',
                  'Independent team ownership',
                  'Scale each service independently',
                  'Fault isolation — one service failure is contained',
                ],
              },
            },
            {
              type: 'heading',
              level: 2,
              text: 'Deployment Models',
              id: 'deployment-models',
            },
            {
              type: 'flow',
              steps: [
                { label: 'Monolith Deploy', desc: 'Build → Test → Deploy entire app', color: '#6366f1' },
                { label: 'Single artifact', desc: 'One binary or container', color: '#8b5cf6' },
                { label: 'All-or-nothing', desc: 'Rollback = redeploy everything', color: '#a78bfa' },
              ],
            },
            { type: 'divider' },
            {
              type: 'flow',
              steps: [
                { label: 'Microservice Deploy', desc: 'Build → Test → Deploy one service', color: '#10b981' },
                { label: 'Independent artifacts', desc: 'Each service is its own container', color: '#059669' },
                { label: 'Targeted rollback', desc: 'Roll back just the failing service', color: '#047857' },
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Communication Patterns',
              id: 'communication',
            },
            {
              type: 'table',
              headers: ['Pattern', 'Type', 'When to Use', 'Example'],
              rows: [
                ['REST / HTTP', 'Synchronous', 'Simple request-response, CRUD', 'User service calls Auth service'],
                ['gRPC', 'Synchronous', 'High-performance, internal services', 'Order service calls Inventory service'],
                ['Message Queue', 'Asynchronous', 'Fire-and-forget, background jobs', 'Order placed → send confirmation email'],
                ['Event Bus', 'Asynchronous', 'Event-driven, pub/sub fan-out', 'Payment received → notify shipping, inventory, analytics'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'The <strong>Strangler Fig pattern</strong> lets you gradually migrate from a monolith to microservices. Route specific endpoints to new services while the monolith handles the rest. Over time, the monolith shrinks until it can be retired.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'When to Use Which',
              id: 'when-to-use',
            },
            {
              type: 'table',
              headers: ['Scenario', 'Recommendation', 'Reasoning'],
              rows: [
                ['Startup / MVP', 'Monolith', 'Ship fast, iterate, find product-market fit'],
                ['Small team (< 10 engineers)', 'Monolith', 'Microservices overhead not justified'],
                ['Large team with domain boundaries', 'Microservices', 'Independent teams, independent deploys'],
                ['Different scaling needs per feature', 'Microservices', 'Scale search independently from payments'],
                ['Strict compliance per module', 'Microservices', 'Isolate PCI-compliant payment service'],
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'API Gateway Pattern',
              id: 'api-gateway',
            },
            {
              type: 'paragraph',
              html: 'An API gateway sits in front of your microservices and handles cross-cutting concerns: <strong>routing</strong>, <strong>authentication</strong>, <strong>rate limiting</strong>, <strong>request aggregation</strong>, and <strong>protocol translation</strong>. Clients talk to one endpoint; the gateway fans out to the right services.',
            },
            {
              type: 'flow',
              steps: [
                { label: 'Client', desc: 'Mobile or web app', color: '#6366f1' },
                { label: 'API Gateway', desc: 'Auth, rate limit, route', color: '#f59e0b' },
                { label: 'User Service', desc: '/users/*', color: '#10b981' },
                { label: 'Order Service', desc: '/orders/*', color: '#10b981' },
                { label: 'Product Service', desc: '/products/*', color: '#10b981' },
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Key Takeaways',
              id: 'key-takeaways',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Start with a monolith; extract services only when complexity demands it.',
                'Prefer async communication (events) over sync (REST) between services.',
                'Use an API gateway for cross-cutting concerns.',
                'Each microservice should own its own data — no shared databases.',
              ],
            },
          ],
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
          content: [
            {
              type: 'heading',
              level: 2,
              text: 'API Styles Comparison',
              id: 'api-styles',
            },
            {
              type: 'table',
              headers: ['Feature', 'REST', 'GraphQL', 'gRPC'],
              rows: [
                ['Protocol', 'HTTP/1.1 or HTTP/2', 'HTTP/1.1 or HTTP/2', 'HTTP/2'],
                ['Data format', 'JSON (typically)', 'JSON', 'Protocol Buffers (binary)'],
                ['Schema', 'OpenAPI (optional)', 'SDL (required)', '.proto files (required)'],
                ['Endpoint pattern', 'Multiple endpoints (/users, /posts)', 'Single endpoint (/graphql)', 'Service methods'],
                ['Over-fetching', 'Common (fixed response shape)', 'Client specifies exact fields', 'Fixed per RPC method'],
                ['Streaming', 'Limited (SSE, WebSockets separate)', 'Subscriptions', 'Bidirectional streaming built-in'],
                ['Best for', 'Public APIs, CRUD', 'Flexible frontends, mobile', 'Internal services, low latency'],
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'RESTful API Design',
              id: 'rest-design',
            },
            {
              type: 'paragraph',
              html: 'REST (Representational State Transfer) uses standard HTTP methods to operate on <strong>resources</strong> identified by URLs. A well-designed REST API is intuitive, consistent, and follows established conventions.',
            },
            {
              type: 'table',
              headers: ['Method', 'Path', 'Action', 'Idempotent?'],
              rows: [
                ['GET', '/api/v1/users', 'List all users', 'Yes'],
                ['GET', '/api/v1/users/:id', 'Get one user', 'Yes'],
                ['POST', '/api/v1/users', 'Create a user', 'No'],
                ['PUT', '/api/v1/users/:id', 'Replace a user', 'Yes'],
                ['PATCH', '/api/v1/users/:id', 'Partial update', 'Yes'],
                ['DELETE', '/api/v1/users/:id', 'Delete a user', 'Yes'],
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'REST Example',
              id: 'rest-example',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'rest-api.ts',
              code: `import express from 'express';

const app = express();
app.use(express.json());

interface User {
  id: string;
  name: string;
  email: string;
}

const users = new Map<string, User>();

// GET /api/v1/users — list all
app.get('/api/v1/users', (_req, res) => {
  res.json({
    data: Array.from(users.values()),
    total: users.size,
  });
});

// GET /api/v1/users/:id — get one
app.get('/api/v1/users/:id', (req, res) => {
  const user = users.get(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ data: user });
});

// POST /api/v1/users — create
app.post('/api/v1/users', (req, res) => {
  const { name, email } = req.body;
  const id = crypto.randomUUID();
  const user: User = { id, name, email };
  users.set(id, user);
  res.status(201).json({ data: user });
});

// PATCH /api/v1/users/:id — partial update
app.patch('/api/v1/users/:id', (req, res) => {
  const user = users.get(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  Object.assign(user, req.body);
  res.json({ data: user });
});

// DELETE /api/v1/users/:id — delete
app.delete('/api/v1/users/:id', (req, res) => {
  if (!users.delete(req.params.id)) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(204).end();
});`,
            },
            {
              type: 'heading',
              level: 2,
              text: 'GraphQL Example',
              id: 'graphql-example',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'graphql-schema.ts',
              code: `import { buildSchema } from 'graphql';

const schema = buildSchema(\`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    author: User!
  }

  type Query {
    user(id: ID!): User
    users(limit: Int = 10, offset: Int = 0): [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    updateUser(id: ID!, name: String, email: String): User!
  }
\`);

// Client can request exactly the fields they need:
// query {
//   user(id: "123") {
//     name
//     posts { title }
//   }
// }`,
            },
            {
              type: 'heading',
              level: 2,
              text: 'gRPC Example',
              id: 'grpc-example',
            },
            {
              type: 'code',
              language: 'protobuf',
              title: 'user.proto',
              code: `syntax = "proto3";

package users;

service UserService {
  rpc GetUser (GetUserRequest) returns (User);
  rpc ListUsers (ListUsersRequest) returns (ListUsersResponse);
  rpc CreateUser (CreateUserRequest) returns (User);
  rpc StreamUpdates (StreamRequest) returns (stream UserEvent);
}

message User {
  string id = 1;
  string name = 2;
  string email = 3;
}

message GetUserRequest {
  string id = 1;
}

message ListUsersRequest {
  int32 limit = 1;
  int32 offset = 2;
}

message ListUsersResponse {
  repeated User users = 1;
  int32 total = 2;
}

message CreateUserRequest {
  string name = 1;
  string email = 2;
}

message StreamRequest {}

message UserEvent {
  string type = 1;
  User user = 2;
}`,
            },
            {
              type: 'heading',
              level: 2,
              text: 'API Versioning Strategies',
              id: 'versioning',
            },
            {
              type: 'table',
              headers: ['Strategy', 'Example', 'Pros', 'Cons'],
              rows: [
                ['URL path', '/api/v1/users', 'Explicit, easy routing', 'URL changes on version bump'],
                ['Query param', '/api/users?version=1', 'Single URL', 'Easy to forget, harder to route'],
                ['Header', 'Accept: application/vnd.api.v1+json', 'Clean URLs', 'Less discoverable'],
                ['No versioning', 'Additive-only changes', 'Simplest', 'Breaking changes are impossible'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'URL path versioning (<code>/api/v1/</code>) is the most widely adopted strategy. It is explicit, easy to understand, and works well with API documentation tools like Swagger/OpenAPI.',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Best Practices',
              id: 'best-practices',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                'Use <strong>nouns</strong> for resources (<code>/users</code>), not verbs (<code>/getUsers</code>)',
                'Return proper <strong>HTTP status codes</strong> (201 Created, 404 Not Found, 429 Rate Limited)',
                'Support <strong>pagination</strong> for list endpoints (offset/limit or cursor-based)',
                'Use <strong>consistent error format</strong>: <code>{ error: string, code: string, details?: any }</code>',
                'Add <strong>rate limiting headers</strong> to every response',
                'Document with <strong>OpenAPI/Swagger</strong> for REST, SDL for GraphQL',
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Key Takeaways',
              id: 'key-takeaways',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'REST for public APIs, GraphQL for flexible frontends, gRPC for internal services.',
                'Use URL-based versioning for REST APIs.',
                'Design for the consumer — model resources around business entities.',
                'Always paginate list endpoints and include total counts.',
              ],
            },
          ],
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
          content: [
            {
              type: 'heading',
              level: 2,
              text: 'Step 1: Requirements',
              id: 'requirements',
            },
            {
              type: 'heading',
              level: 3,
              text: 'Functional Requirements',
              id: 'functional-requirements',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Given a long URL, generate a short unique URL',
                'Redirect short URL to the original long URL',
                'Users can optionally set a custom alias',
                'Links expire after a configurable duration (default: 5 years)',
                'Analytics: track click count, referrer, geo',
              ],
            },
            {
              type: 'heading',
              level: 3,
              text: 'Non-Functional Requirements',
              id: 'non-functional-requirements',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Highly available</strong> — redirects must always work (read-heavy)',
                '<strong>Low latency</strong> — redirect in under 50ms',
                '<strong>Short URLs should not be guessable</strong> (no sequential IDs)',
                '<strong>Scale</strong> — 100M new URLs/month, 10B redirects/month',
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Step 2: Back-of-the-Envelope Estimation',
              id: 'estimation',
            },
            {
              type: 'table',
              headers: ['Metric', 'Calculation', 'Result'],
              rows: [
                ['New URLs / second', '100M / (30 * 24 * 3600)', '~40 writes/sec'],
                ['Redirects / second', '10B / (30 * 24 * 3600)', '~4,000 reads/sec'],
                ['Read:write ratio', '10B / 100M', '100:1'],
                ['Storage per URL (avg)', '500 bytes (URL + metadata)', '~500 bytes'],
                ['Storage / year', '100M * 12 * 500 bytes', '~600 GB/year'],
                ['URLs in 5 years', '100M * 12 * 5', '6 billion'],
                ['Key space (7-char base62)', '62^7', '~3.5 trillion (enough!)'],
              ],
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'With a 100:1 read:write ratio and 4K reads/sec, this is a <strong>read-heavy</strong> system. Caching will be critical — most short URLs are accessed repeatedly (viral links, social media posts).',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Step 3: System Architecture',
              id: 'architecture',
            },
            {
              type: 'diagram',
              caption: 'High-level architecture of a URL shortener service.',
              svg: `<svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, sans-serif">
  <rect x="10" y="160" width="80" height="50" rx="8" fill="#6366f1"/>
  <text x="50" y="190" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Client</text>
  <rect x="140" y="160" width="110" height="50" rx="8" fill="#f59e0b"/>
  <text x="195" y="182" text-anchor="middle" fill="white" font-size="11" font-weight="bold">API Gateway</text>
  <text x="195" y="198" text-anchor="middle" fill="white" font-size="9">Auth + Rate Limit</text>
  <rect x="300" y="80" width="120" height="50" rx="8" fill="#10b981"/>
  <text x="360" y="102" text-anchor="middle" fill="white" font-size="11" font-weight="bold">URL Service</text>
  <text x="360" y="118" text-anchor="middle" fill="white" font-size="9">Create + Redirect</text>
  <rect x="300" y="230" width="120" height="50" rx="8" fill="#06b6d4"/>
  <text x="360" y="252" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Analytics</text>
  <text x="360" y="268" text-anchor="middle" fill="white" font-size="9">Async via Queue</text>
  <rect x="480" y="30" width="100" height="45" rx="6" fill="#8b5cf6"/>
  <text x="530" y="52" text-anchor="middle" fill="white" font-size="11">Cache</text>
  <text x="530" y="66" text-anchor="middle" fill="white" font-size="9">(Redis)</text>
  <rect x="480" y="100" width="100" height="45" rx="6" fill="#ec4899"/>
  <text x="530" y="122" text-anchor="middle" fill="white" font-size="11">Database</text>
  <text x="530" y="136" text-anchor="middle" fill="white" font-size="9">(PostgreSQL)</text>
  <rect x="480" y="230" width="100" height="45" rx="6" fill="#64748b"/>
  <text x="530" y="252" text-anchor="middle" fill="white" font-size="11">Analytics DB</text>
  <text x="530" y="266" text-anchor="middle" fill="white" font-size="9">(ClickHouse)</text>
  <rect x="300" y="310" width="120" height="40" rx="6" fill="#f59e0b"/>
  <text x="360" y="335" text-anchor="middle" fill="white" font-size="11">Message Queue</text>
  <line x1="90" y1="185" x2="140" y2="185" stroke="#94a3b8" stroke-width="2"/>
  <line x1="250" y1="175" x2="300" y2="105" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="250" y1="195" x2="300" y2="255" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="420" y1="95" x2="480" y2="52" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="420" y1="110" x2="480" y2="122" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="420" y1="255" x2="480" y2="252" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="360" y1="130" x2="360" y2="230" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4"/>
  <line x1="360" y1="280" x2="360" y2="310" stroke="#94a3b8" stroke-width="1"/>
</svg>`,
            },
            {
              type: 'heading',
              level: 2,
              text: 'Step 4: Short Key Generation',
              id: 'key-generation',
            },
            {
              type: 'paragraph',
              html: 'We need to generate a unique 7-character string for each URL. There are several approaches:',
            },
            {
              type: 'table',
              headers: ['Approach', 'How', 'Pros', 'Cons'],
              rows: [
                ['Hash + truncate', 'MD5/SHA → take first 7 chars (base62)', 'Simple, deterministic', 'Collisions possible, need check'],
                ['Counter + base62', 'Auto-increment ID → base62 encode', 'No collisions', 'Sequential = guessable, single counter bottleneck'],
                ['Pre-generated keys', 'Generate keys offline, store in DB', 'Fast, no collision at runtime', 'Need key generation service'],
                ['Snowflake ID', 'Distributed ID generator → base62', 'No coordination needed', 'Longer IDs (more bits)'],
              ],
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'key-generator.ts',
              code: `const BASE62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const KEY_LENGTH = 7;

/** Convert a numeric ID to a base62 string */
function toBase62(num: bigint): string {
  if (num === 0n) return BASE62[0];
  let result = '';
  while (num > 0n) {
    result = BASE62[Number(num % 62n)] + result;
    num = num / 62n;
  }
  return result.padStart(KEY_LENGTH, '0');
}

/** Generate a short key from a counter value */
function generateShortKey(counter: bigint): string {
  return toBase62(counter);
}

// Examples:
// generateShortKey(1n)         → "0000001"
// generateShortKey(1000000n)   → "0004C92"
// generateShortKey(3500000000000n) → uses full 7 chars

/** Hash-based approach (for deduplication) */
async function hashUrl(url: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(url);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // Convert first 7 bytes to base62
  let num = 0n;
  for (let i = 0; i < 7; i++) {
    num = num * 256n + BigInt(hashArray[i]);
  }
  return toBase62(num % (62n ** BigInt(KEY_LENGTH)));
}`,
            },
            {
              type: 'heading',
              level: 2,
              text: 'Step 5: Database Schema',
              id: 'database-schema',
            },
            {
              type: 'code',
              language: 'sql',
              title: 'schema.sql',
              code: `CREATE TABLE urls (
    short_key   VARCHAR(7) PRIMARY KEY,
    long_url    TEXT NOT NULL,
    user_id     UUID,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    expires_at  TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '5 years'),
    click_count BIGINT DEFAULT 0
);

-- Index for expiration cleanup job
CREATE INDEX idx_urls_expires ON urls(expires_at) WHERE expires_at IS NOT NULL;

-- Index for user's URLs
CREATE INDEX idx_urls_user ON urls(user_id) WHERE user_id IS NOT NULL;

-- Analytics table (append-only, partitioned by date)
CREATE TABLE clicks (
    id          BIGSERIAL,
    short_key   VARCHAR(7) NOT NULL,
    clicked_at  TIMESTAMPTZ DEFAULT NOW(),
    referrer    TEXT,
    user_agent  TEXT,
    ip_address  INET,
    country     VARCHAR(2)
) PARTITION BY RANGE (clicked_at);

-- Create monthly partitions
CREATE TABLE clicks_2025_01 PARTITION OF clicks
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');`,
            },
            {
              type: 'heading',
              level: 2,
              text: 'Step 6: Redirect Flow',
              id: 'redirect-flow',
            },
            {
              type: 'flow',
              steps: [
                { label: 'GET /abc1234', desc: 'Browser requests short URL', color: '#6366f1' },
                { label: 'Check Cache', desc: 'Lookup in Redis', color: '#8b5cf6' },
                { label: 'Cache Hit', desc: 'Return 301 redirect', color: '#10b981' },
                { label: 'Cache Miss', desc: 'Query PostgreSQL', color: '#f59e0b' },
                { label: 'Populate Cache', desc: 'Store with 24h TTL', color: '#8b5cf6' },
                { label: '301 Redirect', desc: 'Browser follows to long URL', color: '#10b981' },
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'Use <strong>301 (Permanent Redirect)</strong> if you want browsers to cache the redirect and reduce load. Use <strong>302 (Temporary Redirect)</strong> if you need to track every click for analytics (the browser will always come back to your server).',
            },
            {
              type: 'heading',
              level: 2,
              text: 'Step 7: Scaling Considerations',
              id: 'scaling',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Read replicas</strong> — distribute redirect queries across replicas',
                '<strong>Redis cluster</strong> — partition the cache for high throughput',
                '<strong>CDN</strong> — cache 301 redirects at the edge for ultra-low latency',
                '<strong>Async analytics</strong> — write clicks to a queue, process in batch',
                '<strong>Database sharding</strong> — shard URLs by short_key hash when data exceeds single-node capacity',
                '<strong>Rate limiting</strong> — prevent abuse of URL creation endpoint',
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Step 8: Additional Features',
              id: 'additional-features',
            },
            {
              type: 'table',
              headers: ['Feature', 'Implementation'],
              rows: [
                ['Custom aliases', 'Check uniqueness in DB before inserting; reserve common words'],
                ['Link expiration', 'expires_at column; background cleanup job; return 410 Gone'],
                ['Analytics dashboard', 'ClickHouse for aggregation; pre-compute daily/hourly rollups'],
                ['Spam prevention', 'Check URL against Google Safe Browsing API before shortening'],
                ['QR code generation', 'Generate server-side on creation; cache as SVG/PNG'],
              ],
            },
            {
              type: 'heading',
              level: 2,
              text: 'Key Takeaways',
              id: 'key-takeaways',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                'Start with requirements and estimation before designing.',
                'A 7-character base62 key gives 3.5 trillion unique URLs — more than enough.',
                'Cache aggressively — most redirects hit popular URLs repeatedly.',
                'Separate the analytics path (async) from the redirect path (sync, low-latency).',
                'Choose 301 vs 302 based on whether you need to track every click.',
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default category;
