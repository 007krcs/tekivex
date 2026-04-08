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
          content: [
            { type: 'heading', level: 2, text: 'What Is an IP Address?', id: 'what-is-ip' },
            {
              type: 'paragraph',
              html: 'An <strong>IP address</strong> (Internet Protocol address) is a unique numerical label assigned to every device on a network. Think of it as a postal address for your server — without it, packets have no idea where to go.',
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'Every request your users make travels through a chain of IP addresses: their device → ISP router → your load balancer → your server. Understanding this path is essential for diagnosing latency and security issues.',
            },
            { type: 'heading', level: 2, text: 'IPv4 vs IPv6', id: 'ipv4-vs-ipv6' },
            {
              type: 'comparison',
              left: {
                title: 'IPv4',
                color: '#6366f1',
                items: [
                  '32-bit address (e.g. 192.168.1.1)',
                  '~4.3 billion unique addresses',
                  'Exhausted — NAT required',
                  'Widely supported everywhere',
                  'Simpler header (20 bytes)',
                ],
              },
              right: {
                title: 'IPv6',
                color: '#22c55e',
                items: [
                  '128-bit address (e.g. 2001:db8::1)',
                  '340 undecillion unique addresses',
                  'No NAT needed — direct routing',
                  'Growing adoption (40%+ traffic)',
                  'Built-in IPSec, auto-configuration',
                ],
              },
            },
            { type: 'heading', level: 2, text: 'Public vs Private IPs', id: 'public-private' },
            {
              type: 'paragraph',
              html: '<strong>Private IP ranges</strong> (RFC 1918) are non-routable on the public internet. They are used inside data centers and VPCs. <strong>NAT</strong> (Network Address Translation) maps private IPs to a single public IP for outbound traffic.',
            },
            {
              type: 'table',
              headers: ['Range', 'CIDR', 'Addresses', 'Use'],
              rows: [
                ['10.0.0.0 – 10.255.255.255', '10.0.0.0/8', '16.7M', 'Large enterprise / cloud VPC'],
                ['172.16.0.0 – 172.31.255.255', '172.16.0.0/12', '1M', 'Docker default bridge'],
                ['192.168.0.0 – 192.168.255.255', '192.168.0.0/16', '65K', 'Home / office networks'],
              ],
            },
            { type: 'heading', level: 2, text: 'CIDR and Subnetting', id: 'cidr' },
            {
              type: 'paragraph',
              html: '<strong>CIDR</strong> (Classless Inter-Domain Routing) notation like <code>10.0.1.0/24</code> specifies a network by its base address and prefix length. The prefix length (24) tells you how many bits are the network portion — the remaining bits (8) are for hosts, giving 256 addresses (254 usable).',
            },
            {
              type: 'code',
              language: 'text',
              title: 'CIDR Quick Reference',
              code: `/32  →   1 address   (single host)
/31  →   2 addresses  (point-to-point link)
/30  →   4 addresses  (2 usable — small link)
/28  →  16 addresses  (14 usable)
/24  → 256 addresses  (254 usable — typical subnet)
/16  → 65,536 addresses (AWS VPC default)
/8   → 16.7M addresses (large private block)`,
            },
            { type: 'heading', level: 2, text: 'IP Addresses in System Design', id: 'ip-in-system-design' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Anycast</strong> — same IP announced from multiple PoPs; BGP routes to the nearest (used by Cloudflare, DNS resolvers)',
                '<strong>Elastic IP / Static IP</strong> — reserve a fixed public IP for your load balancer or NAT gateway',
                '<strong>VPC CIDR planning</strong> — choose non-overlapping ranges if you\'ll ever peer VPCs or connect to on-premise',
                '<strong>Security groups / ACLs</strong> — IP-based firewall rules are the first line of defense',
                '<strong>IP allowlisting</strong> — restrict admin APIs to office/VPN CIDR ranges',
              ],
            },
            {
              type: 'callout',
              variant: 'caution',
              html: 'Never hard-code IP addresses in application code. IPs change during scaling events. Use DNS names or service discovery instead.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'What Is DNS?', id: 'what-is-dns' },
            {
              type: 'paragraph',
              html: 'The <strong>Domain Name System</strong> is the internet\'s phone book. It translates human-readable domain names like <code>api.tekivex.dev</code> into IP addresses like <code>104.21.5.10</code> that routers understand. Without DNS, you would need to remember an IP for every service you use.',
            },
            { type: 'heading', level: 2, text: 'DNS Resolution Step by Step', id: 'dns-resolution' },
            {
              type: 'flow',
              steps: [
                { label: 'Browser Cache', desc: 'Check local cache — if TTL not expired, return immediately', color: '#6366f1' },
                { label: 'OS Resolver', desc: 'Check OS /etc/hosts and local resolver cache', color: '#8b5cf6' },
                { label: 'Recursive Resolver', desc: 'ISP or 8.8.8.8 — queries on your behalf if not cached', color: '#a855f7' },
                { label: 'Root Name Server', desc: 'Returns NS records for the TLD (.dev, .com, etc.)', color: '#ec4899' },
                { label: 'TLD Name Server', desc: 'Returns NS records for the authoritative name server', color: '#f59e0b' },
                { label: 'Authoritative NS', desc: 'Returns the actual A/AAAA record — final answer', color: '#22c55e' },
              ],
            },
            { type: 'heading', level: 2, text: 'Common DNS Record Types', id: 'record-types' },
            {
              type: 'table',
              headers: ['Record', 'Purpose', 'Example'],
              rows: [
                ['A', 'Maps hostname → IPv4 address', 'api.example.com → 1.2.3.4'],
                ['AAAA', 'Maps hostname → IPv6 address', 'api.example.com → 2001:db8::1'],
                ['CNAME', 'Alias to another hostname', 'www → example.com (no bare domain!)'],
                ['MX', 'Mail server for domain', 'example.com → mail.example.com (priority 10)'],
                ['TXT', 'Arbitrary text (SPF, DKIM, verification)', '"v=spf1 include:sendgrid.net ~all"'],
                ['NS', 'Authoritative name servers for zone', 'example.com → ns1.cloudflare.com'],
                ['SRV', 'Service location (host + port)', '_grpc._tcp.api.example.com'],
                ['PTR', 'Reverse lookup (IP → hostname)', '4.3.2.1.in-addr.arpa → api.example.com'],
              ],
            },
            { type: 'heading', level: 2, text: 'TTL and Caching', id: 'ttl' },
            {
              type: 'paragraph',
              html: '<strong>TTL</strong> (Time To Live) is how long a resolver caches the answer (in seconds). Low TTL (60s) means faster propagation of changes but more DNS queries and latency. High TTL (86400s = 24h) reduces load but slows failovers.',
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Pre-lower TTL before migrations:</strong> If you plan to move an IP, lower the TTL to 60s 24–48h before the change. After the change propagates, raise it back to 3600s or higher.',
            },
            { type: 'heading', level: 2, text: 'DNS for System Design', id: 'dns-system-design' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Round-robin DNS</strong> — return multiple A records; client picks one (crude load balancing)',
                '<strong>Geo-routing</strong> — Route53 / Cloudflare return different IPs based on client location',
                '<strong>Health-check failover</strong> — Route53 removes unhealthy endpoints automatically',
                '<strong>Blue/green via DNS</strong> — switch CNAME or A record to cut over traffic with TTL control',
                '<strong>Service discovery</strong> — Consul, CoreDNS power internal DNS for microservices',
              ],
            },
            {
              type: 'code',
              language: 'bash',
              title: 'Useful DNS Debugging Commands',
              code: `# Resolve with specific resolver
dig api.example.com @8.8.8.8

# Trace full resolution chain
dig +trace api.example.com

# Check TTL remaining
dig api.example.com | grep "ANSWER SECTION" -A5

# Reverse lookup
dig -x 1.2.3.4

# Check all record types
dig api.example.com ANY`,
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'The Client-Server Model', id: 'client-server' },
            {
              type: 'paragraph',
              html: 'In the <strong>client-server model</strong>, clients initiate requests and servers respond with data or actions. The client knows the server\'s address; the server does not need to know the client\'s address in advance. This asymmetry is the foundation of web architecture.',
            },
            { type: 'heading', level: 2, text: 'The Request-Response Cycle', id: 'request-response' },
            {
              type: 'flow',
              steps: [
                { label: 'DNS Lookup', desc: 'Resolve hostname to IP address', color: '#6366f1' },
                { label: 'TCP Handshake', desc: 'SYN → SYN-ACK → ACK (3-way handshake)', color: '#8b5cf6' },
                { label: 'TLS Handshake', desc: 'Certificate exchange, cipher negotiation (HTTPS)', color: '#a855f7' },
                { label: 'HTTP Request', desc: 'Client sends GET/POST with headers and body', color: '#ec4899' },
                { label: 'Server Processing', desc: 'Auth, business logic, DB query, response assembly', color: '#f59e0b' },
                { label: 'HTTP Response', desc: 'Status code, headers, body returned to client', color: '#22c55e' },
              ],
            },
            { type: 'heading', level: 2, text: 'Stateless vs Stateful Servers', id: 'stateless-stateful' },
            {
              type: 'comparison',
              left: {
                title: 'Stateless Server',
                color: '#22c55e',
                items: [
                  'No session data stored locally',
                  'Any server can handle any request',
                  'Horizontal scaling is trivial',
                  'State lives in DB / Redis / JWT',
                  'REST APIs, microservices',
                ],
              },
              right: {
                title: 'Stateful Server',
                color: '#f59e0b',
                items: [
                  'Session data held in memory',
                  'Sticky sessions required',
                  'Harder to scale horizontally',
                  'Faster for in-memory ops',
                  'WebSocket servers, game servers',
                ],
              },
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Design stateless by default.</strong> Move session state to a shared store (Redis) so any server replica can serve any request. This is the single biggest enabler of horizontal scaling.',
            },
            { type: 'heading', level: 2, text: 'Thin vs Thick Clients', id: 'thin-thick' },
            {
              type: 'table',
              headers: ['Model', 'Logic Location', 'Examples', 'Tradeoffs'],
              rows: [
                ['Thin client', 'Server-side rendering, minimal JS', 'Traditional web, server-side React', 'Simple client; server under load; less offline capability'],
                ['Thick client', 'Heavy client-side processing', 'SPAs, mobile apps, Electron', 'Rich UX, offline-capable; harder to update, security exposure'],
                ['Hybrid', 'Split by concern', 'React + REST API, Flutter + gRPC', 'Best of both; most common modern architecture'],
              ],
            },
            { type: 'heading', level: 2, text: 'Connection Types', id: 'connection-types' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Short-lived (HTTP/1.1)</strong> — new TCP connection per request (or pooled with keep-alive)',
                '<strong>Persistent (HTTP/2)</strong> — single TCP connection multiplexes many requests simultaneously',
                '<strong>Long-polling</strong> — client holds request open; server responds when data is ready',
                '<strong>WebSocket</strong> — full-duplex; either side can push at any time after upgrade handshake',
                '<strong>Server-Sent Events (SSE)</strong> — one-way push from server to client over HTTP',
              ],
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Simple HTTP Client-Server (Node.js)',
              code: `// server.ts
import http from 'http';

const server = http.createServer((req, res) => {
  // Stateless — no memory of previous requests
  const url = new URL(req.url!, 'http://localhost');
  const name = url.searchParams.get('name') ?? 'World';

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: \`Hello, \${name}!\` }));
});

server.listen(3000, () => console.log('Server on :3000'));

// client.ts
const res = await fetch('http://localhost:3000?name=Tekivex');
const data = await res.json();
console.log(data.message); // "Hello, Tekivex!"`,
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'What Is a Proxy?', id: 'what-is-proxy' },
            {
              type: 'paragraph',
              html: 'A <strong>proxy</strong> sits between two parties and forwards traffic on their behalf. The key question is: whose side is the proxy on? This determines whether it\'s a forward proxy or a reverse proxy.',
            },
            { type: 'heading', level: 2, text: 'Forward Proxy', id: 'forward-proxy' },
            {
              type: 'paragraph',
              html: 'A <strong>forward proxy</strong> sits in front of <em>clients</em> and forwards their requests to the internet. The server sees the proxy\'s IP, not the client\'s. The client is aware of the proxy.',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Privacy / anonymity</strong> — hide client IP from destination server (VPNs, Tor)',
                '<strong>Content filtering</strong> — corporate proxies block social media or malicious sites',
                '<strong>Geo-bypass</strong> — access content restricted to a different region',
                '<strong>Caching</strong> — cache responses so repeated requests don\'t hit the internet',
              ],
            },
            { type: 'heading', level: 2, text: 'Reverse Proxy', id: 'reverse-proxy' },
            {
              type: 'paragraph',
              html: 'A <strong>reverse proxy</strong> sits in front of <em>servers</em> and forwards client requests to the appropriate backend. Clients are unaware — they think they\'re talking directly to the server.',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Load balancing</strong> — distribute traffic across multiple backend instances',
                '<strong>TLS termination</strong> — decrypt HTTPS at the edge; plain HTTP to backends (simpler certs)',
                '<strong>Caching</strong> — serve cached responses without hitting upstream servers',
                '<strong>Compression</strong> — gzip/brotli at the edge; save bandwidth',
                '<strong>Security</strong> — WAF, DDoS protection, rate limiting before traffic reaches your app',
                '<strong>Canary deployments</strong> — route 5% of traffic to new version',
              ],
            },
            {
              type: 'comparison',
              left: {
                title: 'Forward Proxy',
                color: '#6366f1',
                items: [
                  'Client-side proxy',
                  'Client knows about proxy',
                  'Server sees proxy IP',
                  'VPN, Squid, corporate filter',
                  'Protects / controls clients',
                ],
              },
              right: {
                title: 'Reverse Proxy',
                color: '#22c55e',
                items: [
                  'Server-side proxy',
                  'Client unaware of proxy',
                  'Client sees proxy IP',
                  'Nginx, HAProxy, Cloudflare',
                  'Protects / scales servers',
                ],
              },
            },
            {
              type: 'code',
              language: 'nginx',
              title: 'Nginx as a Reverse Proxy',
              code: `server {
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
}`,
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'Always pass <code>X-Forwarded-For</code> so your application can see the real client IP for logging, rate limiting, and geolocation — not the proxy\'s IP.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'What Is an API Gateway?', id: 'what-is-api-gateway' },
            {
              type: 'paragraph',
              html: 'An <strong>API Gateway</strong> is a server that acts as the single entry point for all client requests in a microservices architecture. Rather than clients knowing about dozens of internal services, they talk to one gateway that routes, transforms, and enforces policies.',
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'Think of an API Gateway as a <strong>reverse proxy on steroids</strong> — it not only routes traffic but also handles auth, rate limiting, logging, circuit breaking, and protocol translation.',
            },
            { type: 'heading', level: 2, text: 'Core Responsibilities', id: 'responsibilities' },
            {
              type: 'table',
              headers: ['Responsibility', 'Description', 'Example'],
              rows: [
                ['Request routing', 'Map path/method to backend service', 'GET /users/* → user-service:3001'],
                ['Authentication', 'Validate JWT, API key, or OAuth token', 'Reject requests without valid Bearer token'],
                ['Rate limiting', 'Enforce per-client or global quotas', '1000 req/min per API key'],
                ['SSL/TLS termination', 'Decrypt HTTPS; plain HTTP to backends', 'Centralize cert management'],
                ['Protocol translation', 'REST ↔ gRPC, HTTP/1.1 ↔ HTTP/2', 'Mobile REST client → gRPC backend'],
                ['Request/response transform', 'Add headers, reshape payloads', 'Inject correlation IDs, filter sensitive fields'],
                ['Observability', 'Centralized logging, metrics, tracing', 'All requests logged with latency/status'],
                ['Circuit breaking', 'Stop forwarding to unhealthy services', 'Open circuit after 50% error rate'],
              ],
            },
            { type: 'heading', level: 2, text: 'API Gateway vs Load Balancer vs Reverse Proxy', id: 'comparison' },
            {
              type: 'table',
              headers: ['Concern', 'Reverse Proxy', 'Load Balancer', 'API Gateway'],
              rows: [
                ['Traffic distribution', '✓ basic', '✓ advanced algorithms', '✓ service routing'],
                ['Auth / authz', '✗', '✗', '✓ native'],
                ['Rate limiting', '✗ (plugin)', '✗', '✓ native'],
                ['Protocol transform', '✗', '✗', '✓'],
                ['Request rewriting', 'Limited', '✗', '✓'],
                ['Observability', 'Logs only', 'Health checks', '✓ full tracing'],
                ['Operates at', 'L7', 'L4/L7', 'L7 application'],
              ],
            },
            { type: 'heading', level: 2, text: 'Popular API Gateways', id: 'popular-gateways' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>AWS API Gateway</strong> — fully managed; tight integration with Lambda, Cognito, WAF',
                '<strong>Kong</strong> — open-source, plugin ecosystem, Kubernetes-native (Kong Ingress Controller)',
                '<strong>Nginx</strong> — lightweight; handles gateway patterns via Lua/NJS scripting',
                '<strong>Traefik</strong> — auto-discovers services from Docker/K8s labels; great for self-hosted',
                '<strong>Envoy</strong> — high-performance proxy; base of Istio service mesh',
                '<strong>Apigee</strong> — Google\'s enterprise API management with full lifecycle tools',
              ],
            },
            {
              type: 'code',
              language: 'yaml',
              title: 'Kong Declarative Config (kong.yml)',
              code: `_format_version: "3.0"

services:
  - name: user-service
    url: http://user-service:3001
    routes:
      - name: users-route
        paths: [/api/users]
        methods: [GET, POST]
    plugins:
      - name: jwt           # Validate JWT on every request
      - name: rate-limiting
        config:
          minute: 1000
          policy: redis

  - name: order-service
    url: http://order-service:3002
    routes:
      - name: orders-route
        paths: [/api/orders]
    plugins:
      - name: jwt
      - name: request-transformer
        config:
          add:
            headers: ["X-Correlation-ID:$(uuid)"]`,
            },
            {
              type: 'callout',
              variant: 'caution',
              html: '<strong>The gateway is a potential SPOF and bottleneck.</strong> Run multiple instances behind a load balancer, use async plugins where possible, and keep the gateway stateless so it scales horizontally.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'The Transport Layer', id: 'transport-layer' },
            {
              type: 'paragraph',
              html: 'TCP and UDP are <strong>Layer 4 protocols</strong> in the OSI model — they sit above IP (which provides addressing) and below application protocols like HTTP. Your choice between them is one of the most consequential decisions in system design.',
            },
            { type: 'heading', level: 2, text: 'TCP: Reliability First', id: 'tcp' },
            {
              type: 'paragraph',
              html: '<strong>TCP</strong> (Transmission Control Protocol) guarantees delivery, ordering, and error checking. Before any data flows, TCP performs a <strong>three-way handshake</strong> to establish a connection.',
            },
            {
              type: 'flow',
              steps: [
                { label: 'SYN', desc: 'Client sends SYN (synchronize) with initial sequence number', color: '#6366f1' },
                { label: 'SYN-ACK', desc: 'Server acknowledges and sends its own SYN', color: '#8b5cf6' },
                { label: 'ACK', desc: 'Client acknowledges — connection established, data can flow', color: '#22c55e' },
              ],
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Guaranteed delivery</strong> — lost packets are retransmitted automatically',
                '<strong>Ordered delivery</strong> — packets arrive in the order sent',
                '<strong>Flow control</strong> — receiver advertises window size; sender won\'t overwhelm it',
                '<strong>Congestion control</strong> — TCP backs off when the network is congested (AIMD)',
                '<strong>Error detection</strong> — checksum on every segment',
              ],
            },
            { type: 'heading', level: 2, text: 'UDP: Speed First', id: 'udp' },
            {
              type: 'paragraph',
              html: '<strong>UDP</strong> (User Datagram Protocol) is connectionless and fire-and-forget. There is no handshake, no retransmission, no ordering guarantee — just fast delivery. This makes it ideal when <strong>low latency matters more than perfect reliability</strong>.',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>No connection overhead</strong> — send immediately, no handshake',
                '<strong>No retransmission</strong> — lost packets are gone (application handles it if needed)',
                '<strong>No ordering</strong> — packets may arrive out of sequence',
                '<strong>Lower latency</strong> — no congestion control delays',
                '<strong>Broadcast/multicast</strong> — one packet to many receivers',
              ],
            },
            {
              type: 'comparison',
              left: {
                title: 'Use TCP when…',
                color: '#6366f1',
                items: [
                  'Data integrity is critical',
                  'File transfers (HTTP, FTP)',
                  'Database connections',
                  'Email (SMTP, IMAP)',
                  'Order matters (e.g. messages)',
                ],
              },
              right: {
                title: 'Use UDP when…',
                color: '#f59e0b',
                items: [
                  'Latency beats reliability',
                  'Live video / audio streaming',
                  'Online gaming (position updates)',
                  'DNS queries (quick, retried by app)',
                  'IoT sensor data (stale = useless)',
                ],
              },
            },
            {
              type: 'callout',
              variant: 'note',
              html: '<strong>QUIC</strong> (used by HTTP/3) is built on UDP but implements its own reliability and multiplexing in user space. It gets UDP\'s speed benefits while supporting ordered, reliable streams — eliminating TCP\'s head-of-line blocking.',
            },
            {
              type: 'table',
              headers: ['Property', 'TCP', 'UDP'],
              rows: [
                ['Connection', 'Connection-oriented (3-way handshake)', 'Connectionless'],
                ['Reliability', 'Guaranteed delivery + retransmit', 'Best-effort, no retransmit'],
                ['Ordering', 'In-order delivery guaranteed', 'No ordering guarantee'],
                ['Speed', 'Slower (overhead)', 'Faster (no overhead)'],
                ['Header size', '20–60 bytes', '8 bytes'],
                ['Flow control', 'Yes (window size)', 'No'],
                ['Congestion control', 'Yes (AIMD)', 'No (application responsibility)'],
                ['Use cases', 'HTTP, SSH, DB, SMTP', 'DNS, Video, Gaming, QUIC'],
              ],
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'HTTP Fundamentals', id: 'http-fundamentals' },
            {
              type: 'paragraph',
              html: '<strong>HTTP</strong> (HyperText Transfer Protocol) is a stateless, application-layer protocol that defines how clients and servers exchange messages. Every web request you\'ve ever made — loading a page, calling an API, uploading a file — runs over HTTP.',
            },
            { type: 'heading', level: 2, text: 'HTTP Request Structure', id: 'request-structure' },
            {
              type: 'code',
              language: 'http',
              title: 'HTTP Request',
              code: `POST /api/users HTTP/1.1
Host: api.tekivex.dev
Content-Type: application/json
Authorization: Bearer eyJhbGci...
Content-Length: 47
Accept: application/json

{"name": "Alice", "email": "alice@example.com"}`,
            },
            { type: 'heading', level: 2, text: 'HTTP Response Structure', id: 'response-structure' },
            {
              type: 'code',
              language: 'http',
              title: 'HTTP Response',
              code: `HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/users/42
X-Request-ID: a1b2c3d4
Cache-Control: no-store

{"id": 42, "name": "Alice", "email": "alice@example.com"}`,
            },
            { type: 'heading', level: 2, text: 'HTTP Methods', id: 'methods' },
            {
              type: 'table',
              headers: ['Method', 'Purpose', 'Idempotent?', 'Body?'],
              rows: [
                ['GET', 'Retrieve resource', 'Yes', 'No'],
                ['POST', 'Create resource / trigger action', 'No', 'Yes'],
                ['PUT', 'Replace resource entirely', 'Yes', 'Yes'],
                ['PATCH', 'Partial update', 'No', 'Yes'],
                ['DELETE', 'Remove resource', 'Yes', 'No'],
                ['HEAD', 'Like GET but no body (check existence/metadata)', 'Yes', 'No'],
                ['OPTIONS', 'CORS preflight / discover allowed methods', 'Yes', 'No'],
              ],
            },
            { type: 'heading', level: 2, text: 'Status Codes', id: 'status-codes' },
            {
              type: 'table',
              headers: ['Range', 'Category', 'Common Codes'],
              rows: [
                ['2xx', 'Success', '200 OK, 201 Created, 204 No Content'],
                ['3xx', 'Redirection', '301 Moved Permanently, 302 Found, 304 Not Modified'],
                ['4xx', 'Client Error', '400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests'],
                ['5xx', 'Server Error', '500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout'],
              ],
            },
            { type: 'heading', level: 2, text: 'HTTP/1.1 vs HTTP/2 vs HTTP/3', id: 'versions' },
            {
              type: 'table',
              headers: ['Feature', 'HTTP/1.1', 'HTTP/2', 'HTTP/3'],
              rows: [
                ['Transport', 'TCP', 'TCP', 'QUIC (UDP)'],
                ['Multiplexing', 'No (one req/conn)', 'Yes (streams)', 'Yes (no HoL blocking)'],
                ['Header compression', 'No', 'HPACK', 'QPACK'],
                ['Server push', 'No', 'Yes', 'Limited'],
                ['TLS', 'Optional', 'Required (de facto)', 'Required (built-in)'],
                ['Head-of-line blocking', 'Yes (connection level)', 'Yes (TCP level)', 'No'],
                ['Adoption (2024)', 'Legacy', '~65% traffic', '~30% and growing'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'Most CDNs and reverse proxies (Cloudflare, Nginx, Caddy) transparently upgrade connections to HTTP/2 or HTTP/3. You rarely need to configure this manually — just enable TLS and the proxy handles it.',
            },
            { type: 'heading', level: 2, text: 'Key Headers for System Design', id: 'headers' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<code>Cache-Control: max-age=3600</code> — tell clients and CDNs how long to cache',
                '<code>ETag</code> / <code>If-None-Match</code> — conditional requests to avoid downloading unchanged content',
                '<code>Authorization: Bearer &lt;token&gt;</code> — carry auth credentials',
                '<code>X-Request-ID</code> — propagate trace IDs for distributed tracing',
                '<code>Retry-After</code> — tell rate-limited clients when to retry',
                '<code>Content-Encoding: gzip</code> — compressed response body',
                '<code>Strict-Transport-Security</code> — force HTTPS for future requests (HSTS)',
              ],
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'Why Real-Time Matters', id: 'why-real-time' },
            {
              type: 'paragraph',
              html: 'Standard HTTP is <strong>pull-based</strong> — clients ask, servers answer. Real-time systems need <strong>push-based</strong> communication where the server initiates data delivery. There are four major approaches, each with different trade-offs.',
            },
            { type: 'heading', level: 2, text: 'Long Polling', id: 'long-polling' },
            {
              type: 'paragraph',
              html: 'The client sends a request; the server <strong>holds it open</strong> until it has data (or times out). The client immediately sends another request on response. This emulates push using standard HTTP.',
            },
            {
              type: 'comparison',
              left: {
                title: 'Pros',
                color: '#22c55e',
                items: [
                  'Works everywhere (plain HTTP)',
                  'Firewall/proxy friendly',
                  'Simple to implement',
                  'No special server support',
                ],
              },
              right: {
                title: 'Cons',
                color: '#ef4444',
                items: [
                  'High latency per message',
                  'Many open connections on server',
                  'Overhead of repeated HTTP handshakes',
                  'Hard to scale beyond 10K connections',
                ],
              },
            },
            { type: 'heading', level: 2, text: 'Server-Sent Events (SSE)', id: 'sse' },
            {
              type: 'paragraph',
              html: '<strong>SSE</strong> is a one-way push channel over a persistent HTTP connection. The server streams <code>text/event-stream</code> data; the client uses the native <code>EventSource</code> API. Reconnection is automatic.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'SSE Server (Node.js)',
              code: `// server
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const send = (data: object) =>
    res.write(\`data: \${JSON.stringify(data)}\\n\\n\`);

  const interval = setInterval(() => send({ ts: Date.now() }), 1000);
  req.on('close', () => clearInterval(interval));
});

// client
const es = new EventSource('/events');
es.onmessage = (e) => console.log(JSON.parse(e.data));`,
            },
            { type: 'heading', level: 2, text: 'WebSockets', id: 'websockets' },
            {
              type: 'paragraph',
              html: '<strong>WebSocket</strong> provides a <strong>full-duplex</strong> channel over a single TCP connection. After an HTTP upgrade handshake, either side can send frames at any time with very low overhead (~2 bytes per frame vs ~800 bytes for HTTP headers).',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'WebSocket Server (ws library)',
              code: `import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    // Echo to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });
});`,
            },
            { type: 'heading', level: 2, text: 'WebRTC', id: 'webrtc' },
            {
              type: 'paragraph',
              html: '<strong>WebRTC</strong> enables <strong>peer-to-peer</strong> audio, video, and data directly between browsers — no server relay once the connection is established. A <strong>signaling server</strong> (any protocol) is still needed for connection negotiation.',
            },
            { type: 'heading', level: 2, text: 'Choosing the Right Protocol', id: 'choosing' },
            {
              type: 'table',
              headers: ['Protocol', 'Direction', 'Best For', 'Scale Challenge'],
              rows: [
                ['Long Polling', 'Bi-directional', 'Legacy browsers, simple notifications', 'Server threads per connection'],
                ['SSE', 'Server → Client only', 'Live feeds, dashboards, progress', 'One connection per client, HTTP/2 mitigates'],
                ['WebSocket', 'Full-duplex', 'Chat, gaming, collaborative editing', 'Sticky sessions required, horizontal scaling via pub/sub (Redis)'],
                ['WebRTC', 'Peer-to-peer', 'Video calls, file sharing, low-latency gaming', 'Signaling server + STUN/TURN infrastructure'],
              ],
            },
            {
              type: 'callout',
              variant: 'caution',
              html: 'WebSocket connections are <strong>stateful and sticky</strong>. For horizontal scaling, use a pub/sub broker (Redis Pub/Sub, NATS) so any server can receive and broadcast messages to clients connected to other servers.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'REST\'s Limitations', id: 'rest-limits' },
            {
              type: 'paragraph',
              html: 'REST is simple and ubiquitous, but it shows cracks at scale: <strong>over-fetching</strong> (getting fields you don\'t need), <strong>under-fetching</strong> (needing multiple requests), <strong>no type safety</strong> across language boundaries, and <strong>no contract</strong> that clients and servers must agree on.',
            },
            { type: 'heading', level: 2, text: 'GraphQL', id: 'graphql' },
            {
              type: 'paragraph',
              html: '<strong>GraphQL</strong> lets clients specify exactly what data they need in a single request. The server exposes a typed schema; clients query it like a SQL SELECT. No more over/under-fetching.',
            },
            {
              type: 'code',
              language: 'graphql',
              title: 'GraphQL Query — Request Only What You Need',
              code: `# Fetch user with only the fields needed for a profile card
query GetUserCard($id: ID!) {
  user(id: $id) {
    name
    avatarUrl
    followersCount
    recentPosts(limit: 3) {
      title
      publishedAt
    }
  }
}`,
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Single endpoint</strong> — all queries/mutations go to <code>POST /graphql</code>',
                '<strong>Introspection</strong> — clients can query the schema itself; auto-generates docs',
                '<strong>Subscriptions</strong> — real-time updates via WebSocket',
                '<strong>N+1 problem</strong> — use DataLoader to batch DB queries',
                '<strong>Best for</strong> — mobile clients (limited bandwidth), public APIs, complex joins',
              ],
            },
            { type: 'heading', level: 2, text: 'gRPC', id: 'grpc' },
            {
              type: 'paragraph',
              html: '<strong>gRPC</strong> uses <strong>Protocol Buffers</strong> (binary schema + serialization) over HTTP/2. It generates type-safe client/server code from <code>.proto</code> files in 10+ languages. Used internally at Google, Netflix, and most large microservice architectures.',
            },
            {
              type: 'code',
              language: 'protobuf',
              title: 'user.proto',
              code: `syntax = "proto3";

service UserService {
  rpc GetUser (GetUserRequest) returns (User);
  rpc ListUsers (ListUsersRequest) returns (stream User); // server streaming
  rpc CreateUser (User) returns (User);
}

message GetUserRequest { string id = 1; }
message ListUsersRequest { int32 limit = 1; }

message User {
  string id = 1;
  string name = 2;
  string email = 3;
  int64 created_at = 4;
}`,
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>~7x faster</strong> than JSON/REST for binary payloads',
                '<strong>Streaming</strong> — unary, server-streaming, client-streaming, bidirectional',
                '<strong>Strict contract</strong> — proto schema is the source of truth; breaking changes detected at compile time',
                '<strong>Best for</strong> — internal microservice comms, mobile → server (bandwidth-sensitive), polyglot teams',
              ],
            },
            { type: 'heading', level: 2, text: 'tRPC', id: 'trpc' },
            {
              type: 'paragraph',
              html: '<strong>tRPC</strong> gives you end-to-end type safety between a TypeScript server and client without schemas or code generation. The client\'s TypeScript types are <em>derived directly</em> from the server\'s router definition.',
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'tRPC is ideal for <strong>full-stack TypeScript monorepos</strong> (Next.js, T3 Stack). For polyglot or public APIs, use gRPC or GraphQL instead.',
            },
            { type: 'heading', level: 2, text: 'Protocol Comparison', id: 'comparison' },
            {
              type: 'table',
              headers: ['Protocol', 'Format', 'Type Safety', 'Streaming', 'Best For'],
              rows: [
                ['REST', 'JSON', 'Manual/OpenAPI', 'No (SSE workaround)', 'Public APIs, simplicity'],
                ['GraphQL', 'JSON', 'Schema-based', 'Subscriptions (WS)', 'Flexible queries, mobile, public'],
                ['gRPC', 'Protobuf (binary)', 'Proto schema', 'Native (4 modes)', 'Internal microservices, performance'],
                ['tRPC', 'JSON', 'TypeScript native', 'Via subscriptions', 'Full-stack TS, monorepos'],
                ['AsyncAPI', 'JSON/YAML', 'Schema + events', 'Event-driven native', 'Documenting async/event APIs'],
              ],
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'The Statefulness Problem', id: 'statefulness-problem' },
            {
              type: 'paragraph',
              html: 'HTTP is <strong>stateless</strong> — each request is independent. Yet users expect continuity: stay logged in, maintain a shopping cart, remember preferences. <strong>Sessions</strong> are the mechanism that grafts statefulness onto stateless HTTP.',
            },
            { type: 'heading', level: 2, text: 'Session Storage Approaches', id: 'session-approaches' },
            {
              type: 'table',
              headers: ['Approach', 'Where State Lives', 'Pros', 'Cons'],
              rows: [
                ['Server-side session + cookie', 'DB or Redis; cookie holds session ID only', 'Revoke instantly, small cookie', 'DB lookup every request, sticky sessions or shared store'],
                ['JWT (stateless token)', 'Encoded in the token itself (client-side)', 'No DB lookup, scales horizontally', 'Cannot revoke before expiry, larger payload'],
                ['Cookie-only (encrypted)', 'Encrypted in the cookie (e.g. Rails cookie store)', 'Zero DB, simple', 'Cannot revoke, size limit (4KB)'],
                ['localStorage/sessionStorage', 'Browser JavaScript storage', 'Easy to use in SPAs', 'XSS vulnerable — never store sensitive tokens here'],
              ],
            },
            { type: 'heading', level: 2, text: 'Cookie Attributes', id: 'cookie-attributes' },
            {
              type: 'code',
              language: 'http',
              title: 'Secure Cookie Response Header',
              code: `Set-Cookie: session_id=abc123;
  HttpOnly;          // JS cannot read — prevents XSS theft
  Secure;            // HTTPS only
  SameSite=Strict;   // No cross-site sending — prevents CSRF
  Path=/;
  Max-Age=86400;     // Expires in 24h`,
            },
            { type: 'heading', level: 2, text: 'JWT (JSON Web Token)', id: 'jwt' },
            {
              type: 'paragraph',
              html: 'A JWT has three base64url-encoded parts: <code>header.payload.signature</code>. The server signs the payload with a secret (HMAC) or private key (RSA/ECDSA). Any server with the public key or secret can verify it — no DB needed.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'JWT Issue and Verify',
              code: `import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;

// Issue — on login
export function issueToken(userId: string): string {
  return jwt.sign(
    { sub: userId, role: 'user' },
    SECRET,
    { expiresIn: '1h', algorithm: 'HS256' }
  );
}

// Verify — on every protected request
export function verifyToken(token: string): jwt.JwtPayload {
  return jwt.verify(token, SECRET) as jwt.JwtPayload;
  // throws JsonWebTokenError if tampered or expired
}`,
            },
            {
              type: 'callout',
              variant: 'caution',
              html: '<strong>JWT revocation is hard.</strong> Once issued, a JWT is valid until expiry. For logout/revoke: use short expiry (15 min) + refresh tokens, or maintain a token blocklist in Redis (defeats the stateless benefit, but adds revocation).',
            },
            { type: 'heading', level: 2, text: 'Distributed Session Store', id: 'distributed-sessions' },
            {
              type: 'paragraph',
              html: 'When you run multiple server instances, session data stored in process memory isn\'t shared. Use a <strong>shared session store</strong> (Redis, Memcached) so any instance can serve any user\'s request.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Express + Redis Session Store',
              code: `import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

app.use(session({
  store: new RedisStore({ client: redis }),
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 24h
  },
}));`,
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'What Is Serialization?', id: 'what-is-serialization' },
            {
              type: 'paragraph',
              html: '<strong>Serialization</strong> converts in-memory data structures into a format that can be transmitted over a network or persisted to storage. <strong>Deserialization</strong> is the reverse. Your choice of format affects payload size, parsing speed, schema evolution, and human readability.',
            },
            { type: 'heading', level: 2, text: 'Text Formats', id: 'text-formats' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>JSON</strong> — universal, human-readable, no schema required. Verbose. No dates, no bytes, no integers > 2^53. Default choice for REST APIs.',
                '<strong>XML</strong> — verbose, namespace support, XSLT transforms. Legacy enterprise, SOAP, SVG.',
                '<strong>YAML</strong> — superset of JSON, human-friendly config. Never use for data interchange (insecure parser, slow).',
                '<strong>CSV</strong> — flat tabular data, Excel-compatible. No types, no nesting, no schema.',
                '<strong>TOML</strong> — config files. Better than YAML for simple hierarchies.',
              ],
            },
            { type: 'heading', level: 2, text: 'Binary Formats', id: 'binary-formats' },
            {
              type: 'table',
              headers: ['Format', 'Schema?', 'Size vs JSON', 'Speed vs JSON', 'Best For'],
              rows: [
                ['MessagePack', 'No (schema-less)', '~40% smaller', '~2x faster', 'Drop-in JSON replacement, WebSockets'],
                ['Protocol Buffers', 'Yes (.proto)', '~70% smaller', '~5–10x faster', 'gRPC, internal microservices'],
                ['Apache Avro', 'Yes (JSON schema)', '~60% smaller', '~4x faster', 'Kafka messages, data pipelines'],
                ['Apache Parquet', 'Yes', '~90% smaller*', 'Fast for columns', 'Analytics, data lake storage (columnar)'],
                ['FlatBuffers', 'Yes (.fbs)', '~70% smaller', 'Zero-copy', 'Games, embedded, mobile'],
              ],
            },
            {
              type: 'callout',
              variant: 'note',
              html: '<strong>Parquet</strong> is columnar — it stores all values of a column together. This makes it very fast for analytical queries (read only the columns you need) but slow for row-level inserts. Use it for batch analytics, not OLTP.',
            },
            { type: 'heading', level: 2, text: 'Schema Evolution', id: 'schema-evolution' },
            {
              type: 'paragraph',
              html: 'Real systems evolve over time. Fields get added, renamed, or removed. Schema evolution rules determine whether old and new versions of code can still communicate.',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Backward compatible</strong> — new reader can read old data (add optional fields only)',
                '<strong>Forward compatible</strong> — old reader can read new data (ignore unknown fields)',
                '<strong>Full compatible</strong> — both directions work simultaneously',
                '<strong>JSON</strong> — no built-in enforcement; discipline required',
                '<strong>Protobuf</strong> — field numbers are the contract; never reuse a number',
                '<strong>Avro</strong> — schema registry enforces compatibility rules (Confluent)',
              ],
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'JSON Size vs MessagePack Comparison',
              code: `import msgpack from 'msgpackr';

const data = {
  id: 12345,
  name: 'Alice',
  scores: [98.5, 87.2, 92.1],
  active: true,
  meta: { region: 'us-east-1', tier: 2 },
};

const json = JSON.stringify(data);
const packed = msgpack.pack(data);

console.log('JSON bytes:', Buffer.byteLength(json));     // ~105 bytes
console.log('MsgPack bytes:', packed.byteLength);        // ~65 bytes (~38% smaller)`,
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'The Same-Origin Policy', id: 'same-origin-policy' },
            {
              type: 'paragraph',
              html: 'The <strong>Same-Origin Policy</strong> (SOP) is a browser security rule: JavaScript on <code>https://app.com</code> cannot make requests to <code>https://api.other.com</code> and read the response. Two URLs have the same origin only if <strong>protocol + host + port</strong> are all identical.',
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'SOP protects <em>users</em> from malicious sites silently reading their banking data or emails via cross-origin requests. <strong>CORS is the controlled exception</strong> — a way for servers to opt-in to cross-origin access.',
            },
            { type: 'heading', level: 2, text: 'How CORS Works', id: 'how-cors-works' },
            {
              type: 'paragraph',
              html: 'When a browser detects a cross-origin request, it checks whether the server allows it by looking for <code>Access-Control-Allow-Origin</code> in the response. If the header is missing or doesn\'t match, the browser blocks the response (the request still hits the server — only the response is blocked).',
            },
            { type: 'heading', level: 2, text: 'Simple vs Preflighted Requests', id: 'preflight' },
            {
              type: 'comparison',
              left: {
                title: 'Simple Request (no preflight)',
                color: '#22c55e',
                items: [
                  'Method: GET, POST, HEAD only',
                  'Content-Type: text/plain, multipart/form-data, application/x-www-form-urlencoded',
                  'No custom headers',
                  'Browser sends request directly',
                  'Checks CORS headers in response',
                ],
              },
              right: {
                title: 'Preflighted Request',
                color: '#f59e0b',
                items: [
                  'Method: PUT, DELETE, PATCH',
                  'Content-Type: application/json',
                  'Any custom header (Authorization, X-*)',
                  'Browser sends OPTIONS first',
                  'Checks if server allows it before sending real request',
                ],
              },
            },
            {
              type: 'code',
              language: 'http',
              title: 'CORS Preflight Exchange',
              code: `// 1. Browser sends OPTIONS preflight
OPTIONS /api/users HTTP/1.1
Origin: https://app.tekivex.dev
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization

// 2. Server responds (must include these headers)
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.tekivex.dev
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400   // Cache preflight for 24h

// 3. Browser sends the actual request
POST /api/users HTTP/1.1
Origin: https://app.tekivex.dev
Content-Type: application/json
Authorization: Bearer ...`,
            },
            { type: 'heading', level: 2, text: 'Configuring CORS Correctly', id: 'config' },
            {
              type: 'code',
              language: 'typescript',
              title: 'Express CORS Middleware',
              code: `import cors from 'cors';

const ALLOWED_ORIGINS = new Set([
  'https://app.tekivex.dev',
  'https://admin.tekivex.dev',
  // Never add '*' for authenticated APIs
]);

app.use(cors({
  origin: (origin, callback) => {
    // Allow same-origin requests (Postman, server-to-server)
    if (!origin || ALLOWED_ORIGINS.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error(\`CORS blocked for origin: \${origin}\`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  credentials: true,      // Allow cookies / auth headers
  maxAge: 86400,          // Cache preflight 24h
}));`,
            },
            {
              type: 'callout',
              variant: 'caution',
              html: '<strong>Never use <code>Access-Control-Allow-Origin: *</code> with <code>Access-Control-Allow-Credentials: true</code></strong> — browsers block it. And never whitelist <code>*</code> on authenticated endpoints — any website could silently act on behalf of your logged-in users.',
            },
            { type: 'heading', level: 2, text: 'Common CORS Mistakes', id: 'mistakes' },
            {
              type: 'table',
              headers: ['Mistake', 'Risk', 'Fix'],
              rows: [
                ['Allow-Origin: *', 'Unauthenticated APIs leak publicly', 'Fine for public read-only assets only'],
                ['Reflect request Origin blindly', 'Any site can act as allowed origin', 'Validate against allowlist'],
                ['Skip HTTPS check', 'Allow http:// origins → downgrade attack', 'Enforce https:// in allowlist'],
                ['Forget credentials: true on client', 'Cookies not sent cross-origin', 'Set credentials: \'include\' on fetch()'],
                ['Long Max-Age with rotating origins', 'Stale preflight cache blocks new origins', 'Keep Max-Age ≤ 3600 during rollouts'],
              ],
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'The Storage Landscape', id: 'storage-landscape' },
            {
              type: 'table',
              headers: ['Type', 'Abstraction', 'Access', 'Examples', 'Best For'],
              rows: [
                ['Block Storage', 'Raw blocks (like a disk)', 'Low-level, OS mounts as filesystem', 'AWS EBS, GCP Persistent Disk', 'Database volumes, VMs, high IOPS'],
                ['File Storage', 'Files in a directory tree', 'NFS/SMB protocol', 'AWS EFS, Azure Files, NFS', 'Shared files, home dirs, legacy apps'],
                ['Object Storage', 'Flat key-value blobs', 'HTTP REST API', 'S3, GCS, Azure Blob', 'Images, videos, backups, data lakes'],
                ['In-Memory', 'Key-value in RAM', 'Sub-millisecond access', 'Redis, Memcached', 'Caching, session store, leaderboards'],
              ],
            },
            { type: 'heading', level: 2, text: 'CAP Theorem', id: 'cap-theorem' },
            {
              type: 'paragraph',
              html: '<strong>CAP Theorem</strong> (Brewer, 2000) states that a distributed system can guarantee at most <strong>two of three</strong> properties simultaneously: <strong>C</strong>onsistency, <strong>A</strong>vailability, and <strong>P</strong>artition Tolerance.',
            },
            {
              type: 'table',
              headers: ['Property', 'Meaning'],
              rows: [
                ['Consistency (C)', 'Every read receives the most recent write or an error — no stale reads'],
                ['Availability (A)', 'Every request gets a (non-error) response — even if data may be stale'],
                ['Partition Tolerance (P)', 'System continues operating even when network partitions drop messages between nodes'],
              ],
            },
            {
              type: 'callout',
              variant: 'note',
              html: '<strong>P is not optional in real distributed systems</strong> — network partitions happen. So the practical choice is <strong>CP</strong> (sacrifice availability during a partition) or <strong>AP</strong> (sacrifice consistency during a partition).',
            },
            {
              type: 'comparison',
              left: {
                title: 'CP Systems',
                color: '#6366f1',
                items: [
                  'Reject requests during partition',
                  'Never return stale data',
                  'HBase, Zookeeper, MongoDB (w/ majority writes)',
                  'Banks, inventory, distributed locks',
                  'Prioritise correctness over uptime',
                ],
              },
              right: {
                title: 'AP Systems',
                color: '#22c55e',
                items: [
                  'Return best available (possibly stale) data',
                  'Stay available during partition',
                  'Cassandra, DynamoDB, CouchDB',
                  'Shopping carts, DNS, social feeds',
                  'Prioritise uptime over perfect accuracy',
                ],
              },
            },
            { type: 'heading', level: 2, text: 'PACELC — Beyond CAP', id: 'pacelc' },
            {
              type: 'paragraph',
              html: '<strong>PACELC</strong> extends CAP: even when there is <strong>no partition</strong>, you still must choose between <strong>latency</strong> and <strong>consistency</strong>. DynamoDB defaults to eventual consistency (low latency) but offers strong consistency reads at higher cost. Most real design decisions are on this P → latency/consistency axis.',
            },
          ],
        },

        {
          slug: 'database-models-sql-vs-nosql',
          title: 'Understanding Database Models: SQL vs. NoSQL',
          description:
            'Relational vs document, columnar, key-value, and graph databases — data models, query patterns, scaling characteristics, and how to choose the right one.',
          keywords: ['sql', 'nosql', 'postgresql', 'mongodb', 'cassandra', 'redis', 'database selection'],
          difficulty: 'intermediate',
          estimatedMinutes: 17,
          content: [
            { type: 'heading', level: 2, text: 'Relational Databases (SQL)', id: 'sql' },
            {
              type: 'paragraph',
              html: 'Relational databases store data in <strong>tables with rows and columns</strong>, enforce a schema, and use SQL for queries. They provide <strong>ACID</strong> transactions: Atomicity, Consistency, Isolation, Durability.',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Strengths:</strong> complex joins, strong consistency, mature tooling, flexible queries',
                '<strong>Weaknesses:</strong> schema changes are painful; vertical scaling hits limits; not great for hierarchical or unstructured data',
                '<strong>Examples:</strong> PostgreSQL (OLTP + OLAP), MySQL, SQLite, CockroachDB (distributed SQL)',
              ],
            },
            { type: 'heading', level: 2, text: 'NoSQL Database Types', id: 'nosql-types' },
            {
              type: 'table',
              headers: ['Type', 'Data Model', 'Strengths', 'Examples'],
              rows: [
                ['Document', 'JSON/BSON documents', 'Flexible schema, rich queries, nested data', 'MongoDB, Firestore, CouchDB'],
                ['Key-Value', 'key → opaque value', 'Sub-ms reads/writes, simple, infinitely scalable', 'Redis, DynamoDB, Riak'],
                ['Wide-Column', 'Rows with dynamic columns', 'Write-heavy workloads, time-series, IoT', 'Cassandra, HBase, ScyllaDB'],
                ['Graph', 'Nodes and edges', 'Relationship traversal, fraud detection, recommendations', 'Neo4j, Amazon Neptune, TigerGraph'],
                ['Time-Series', 'Timestamped data points', 'Metrics, monitoring, fast range queries', 'InfluxDB, TimescaleDB, Prometheus'],
                ['Search', 'Inverted index', 'Full-text search, facets, ranking', 'Elasticsearch, OpenSearch, Typesense'],
              ],
            },
            { type: 'heading', level: 2, text: 'Choosing a Database', id: 'choosing' },
            {
              type: 'table',
              headers: ['Question', 'SQL', 'NoSQL'],
              rows: [
                ['Need ACID transactions?', '✓ Native', 'Varies (DynamoDB: single-item; MongoDB: multi-doc)'],
                ['Schema known upfront?', '✓ Required', '✓ Optional — evolve freely'],
                ['Complex joins / reporting?', '✓ Efficient', '✗ Expensive or impossible'],
                ['Horizontal scale needed?', 'Hard (Citus, Vitess)', '✓ Built-in partitioning'],
                ['Write throughput > 100K/s?', 'Difficult', '✓ Cassandra, DynamoDB'],
                ['Graph relationships?', '✗ Many joins', '✓ Graph DB (Neo4j)'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Most production systems use both.</strong> PostgreSQL for orders and users (ACID), Redis for caching and sessions, Elasticsearch for search, S3 for files. Use the right tool for each access pattern.',
            },
          ],
        },

        {
          slug: 'sharding-replication-polyglot',
          title: 'Advanced Database Topics: Sharding, Replication & Polyglot Persistence',
          description:
            'Horizontal partitioning strategies, replication topologies, and multi-database architectures for high-scale production systems.',
          keywords: ['sharding', 'replication', 'polyglot persistence', 'consistent hashing', 'read replica', 'leader follower'],
          difficulty: 'advanced',
          estimatedMinutes: 16,
          content: [
            { type: 'heading', level: 2, text: 'Database Replication', id: 'replication' },
            {
              type: 'paragraph',
              html: '<strong>Replication</strong> copies data to multiple nodes for availability and read scaling. The primary node accepts writes; replicas (followers) receive the write log.',
            },
            {
              type: 'table',
              headers: ['Topology', 'Writes', 'Reads', 'Consistency', 'Use Case'],
              rows: [
                ['Single Primary', 'Primary only', 'Primary + replicas', 'Strong on primary, eventual on replicas', 'Most OLTP systems'],
                ['Multi-Primary', 'Any node', 'Any node', 'Eventual (conflict resolution needed)', 'Multi-region writes, CRDTs'],
                ['Synchronous replication', 'Primary waits for replica ACK', 'Replica reads = consistent', 'Strong', 'Financial systems, <2 nodes'],
                ['Asynchronous replication', 'Primary doesn\'t wait', 'Replica reads may be stale', 'Eventual', 'Most common — better performance'],
              ],
            },
            { type: 'heading', level: 2, text: 'Sharding (Horizontal Partitioning)', id: 'sharding' },
            {
              type: 'paragraph',
              html: '<strong>Sharding</strong> splits data across multiple database nodes. Each shard holds a subset. The application (or a proxy) routes each query to the correct shard.',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Range sharding</strong> — shard by ID range (0–1M on shard 1, 1M–2M on shard 2). Simple; hot spots when new data concentrates on one shard.',
                '<strong>Hash sharding</strong> — <code>shard = hash(key) % N</code>. Even distribution; resharding when N changes is expensive.',
                '<strong>Consistent hashing</strong> — place nodes on a ring; keys route to next node clockwise. Only K/N keys reroute when a node is added/removed. Used by Cassandra, DynamoDB.',
                '<strong>Directory-based</strong> — lookup table maps key → shard. Flexible; the lookup table becomes a bottleneck.',
              ],
            },
            { type: 'heading', level: 2, text: 'Polyglot Persistence', id: 'polyglot' },
            {
              type: 'paragraph',
              html: '<strong>Polyglot persistence</strong> uses multiple database technologies in one system — each chosen for the specific access pattern it serves best.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Polyglot Architecture — E-Commerce Example',
              code: `// Users & orders → PostgreSQL (ACID, complex queries)
const user = await pg.query('SELECT * FROM users WHERE id = $1', [userId]);

// Product catalog → MongoDB (flexible schema, nested attributes)
const product = await mongo.collection('products').findOne({ _id: productId });

// Sessions & cart → Redis (TTL, fast reads/writes)
await redis.setex(\`cart:\${userId}\`, 3600, JSON.stringify(cart));

// Search → Elasticsearch (full-text, facets)
const results = await es.search({ index: 'products', query: { match: { name: q } } });

// Images/videos → S3 (object storage, CDN-friendly)
const url = s3.getSignedUrl('getObject', { Bucket: 'media', Key: imageKey });

// Analytics → ClickHouse (columnar, fast aggregation)
await ch.query(\`INSERT INTO events VALUES (\${userId}, '\${event}', now())\`);`,
            },
          ],
        },

        {
          slug: 'object-storage-modern-systems',
          title: 'Object Storage in Modern Systems',
          description:
            'How S3-compatible object storage works, consistency models, lifecycle policies, pre-signed URLs, and multi-region replication for media-heavy applications.',
          keywords: ['s3', 'object storage', 'blob storage', 'presigned url', 'bucket', 'lifecycle policy'],
          difficulty: 'intermediate',
          estimatedMinutes: 13,
          content: [
            { type: 'heading', level: 2, text: 'What Is Object Storage?', id: 'object-storage' },
            {
              type: 'paragraph',
              html: 'Object storage treats data as <strong>immutable blobs</strong> identified by a key (like a filename). Unlike block or file storage, there is no directory tree — just flat namespaces called <strong>buckets</strong>. Access is via HTTP REST (GET/PUT/DELETE).',
            },
            { type: 'heading', level: 2, text: 'Key Features', id: 'key-features' },
            {
              type: 'table',
              headers: ['Feature', 'Description'],
              rows: [
                ['Infinite scale', 'Petabytes stored without pre-provisioning capacity'],
                ['Durability', '11 nines (99.999999999%) — data replicated across ≥3 AZs'],
                ['Eventual consistency', 'Strong read-after-write for new objects; eventually consistent for overwrite/delete'],
                ['Versioning', 'Keep all versions; never accidentally delete production data'],
                ['Lifecycle policies', 'Auto-transition to cheaper tiers (S3 → S3-IA → Glacier) after N days'],
                ['Presigned URLs', 'Time-limited signed URLs for secure direct browser upload/download'],
                ['Multipart upload', 'Upload large files in parallel chunks; resume on failure'],
              ],
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Presigned Upload URL (AWS SDK v3)',
              code: `import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
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
// You then serve the object via CloudFront (CDN), not S3 directly`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Never serve objects directly from S3.</strong> Put CloudFront (or any CDN) in front of S3. This gives you edge caching, HTTPS, custom domains, and shields S3 from direct traffic — cutting egress costs by 60–90%.',
            },
          ],
        },

        {
          slug: 'file-systems-and-distributed-storage',
          title: 'File Systems and Distributed Storage',
          description:
            'Local filesystems, NFS/NAS, distributed filesystems (HDFS, GlusterFS, Ceph), and how storage is architected in large-scale data platforms.',
          keywords: ['hdfs', 'distributed filesystem', 'nfs', 'ceph', 'glusterfs', 'storage nodes'],
          difficulty: 'advanced',
          estimatedMinutes: 11,
          content: [
            { type: 'heading', level: 2, text: 'Storage Hierarchy', id: 'storage-hierarchy' },
            {
              type: 'table',
              headers: ['Layer', 'Latency', 'Size', 'Examples'],
              rows: [
                ['CPU registers', '<1 ns', 'Bytes', 'In-chip'],
                ['L1/L2/L3 Cache', '1–30 ns', 'KB–MB', 'In-chip SRAM'],
                ['RAM', '100 ns', 'GB', 'DDR5'],
                ['NVMe SSD', '100 µs', 'TB', 'Local SSD, AWS GP3'],
                ['SATA SSD / HDD', '1–10 ms', 'TB–PB', 'Object storage backends'],
                ['Distributed storage', '1–100 ms', 'Exabytes', 'HDFS, Ceph, S3'],
                ['Tape / Archive', 'Hours', 'Unlimited', 'Glacier, LTO tape'],
              ],
            },
            { type: 'heading', level: 2, text: 'HDFS (Hadoop Distributed File System)', id: 'hdfs' },
            {
              type: 'paragraph',
              html: 'HDFS stores very large files across many commodity machines by splitting them into 128 MB blocks. A <strong>NameNode</strong> (metadata) tracks where each block lives. Multiple <strong>DataNodes</strong> store the actual blocks with a 3x replication factor.',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                'Designed for <strong>write-once, read-many</strong> access patterns',
                '<strong>Data locality</strong> — MapReduce/Spark moves computation to the data node, not vice versa',
                '<strong>Rack awareness</strong> — replicas placed across racks for fault tolerance',
                'NameNode is a SPOF — use High-Availability NameNode with Zookeeper in production',
              ],
            },
            { type: 'heading', level: 2, text: 'Ceph', id: 'ceph' },
            {
              type: 'paragraph',
              html: '<strong>Ceph</strong> is an open-source, unified distributed storage system that provides <strong>object storage</strong> (compatible with S3), <strong>block storage</strong> (RBD for VMs), and <strong>file storage</strong> (CephFS). Used by OpenStack, Kubernetes, and many cloud providers.',
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'Ceph\'s CRUSH algorithm maps data to storage devices deterministically without a central lookup table — removing the single-point-of-failure bottleneck that plagues other distributed filesystems.',
            },
          ],
        },

        {
          slug: 'big-data-fundamentals',
          title: 'Big Data Fundamentals',
          description:
            'The 5 Vs, batch vs stream processing, Lambda and Kappa architectures, and the modern data lakehouse — how hyperscalers process petabytes.',
          keywords: ['big data', 'lambda architecture', 'kappa architecture', 'data lakehouse', 'spark', 'kafka', 'flink'],
          difficulty: 'advanced',
          estimatedMinutes: 12,
          content: [
            { type: 'heading', level: 2, text: 'The 5 Vs of Big Data', id: '5-vs' },
            {
              type: 'table',
              headers: ['V', 'Meaning', 'Example Challenge'],
              rows: [
                ['Volume', 'Terabytes to petabytes', 'Can\'t fit in a single machine\'s RAM or disk'],
                ['Velocity', 'High rate of data arrival', 'Millions of events/second from IoT sensors'],
                ['Variety', 'Structured, semi-structured, unstructured', 'JSON logs + CSV exports + video files'],
                ['Veracity', 'Data quality and accuracy', 'Missing values, duplicate events, schema drift'],
                ['Value', 'Business insight from data', 'Actionable analytics that justify storage costs'],
              ],
            },
            { type: 'heading', level: 2, text: 'Batch vs Stream Processing', id: 'batch-vs-stream' },
            {
              type: 'comparison',
              left: {
                title: 'Batch Processing',
                color: '#6366f1',
                items: [
                  'Process a finite dataset all at once',
                  'High throughput, high latency (hours)',
                  'Apache Spark, Hadoop MapReduce',
                  'ETL jobs, ML training, monthly reports',
                  'Cheaper to run, simpler to debug',
                ],
              },
              right: {
                title: 'Stream Processing',
                color: '#22c55e',
                items: [
                  'Process events as they arrive',
                  'Low latency (ms to seconds)',
                  'Apache Kafka + Flink, Spark Streaming',
                  'Real-time dashboards, fraud detection',
                  'More complex, more infrastructure',
                ],
              },
            },
            { type: 'heading', level: 2, text: 'Lambda Architecture', id: 'lambda' },
            {
              type: 'paragraph',
              html: 'Lambda architecture runs <strong>two processing paths</strong>: a <strong>batch layer</strong> (accurate, slow) and a <strong>speed layer</strong> (approximate, fast). A <strong>serving layer</strong> merges results. The downside: you maintain two codebases.',
            },
            { type: 'heading', level: 2, text: 'Modern Data Lakehouse', id: 'lakehouse' },
            {
              type: 'paragraph',
              html: 'The <strong>Data Lakehouse</strong> (Databricks Delta Lake, Apache Iceberg, Apache Hudi) unifies the cheap storage of a data lake (S3/GCS) with the ACID transactions and schema enforcement of a data warehouse. One system, one codebase, one truth.',
            },
            {
              type: 'table',
              headers: ['Layer', 'Technology', 'Role'],
              rows: [
                ['Ingestion', 'Kafka, Kinesis, Firehose', 'Stream events from services'],
                ['Storage', 'S3 + Iceberg/Delta', 'Cheap, durable, queryable'],
                ['Processing', 'Spark, Flink, dbt', 'Transform raw → curated → aggregated'],
                ['Query', 'Trino, Athena, BigQuery', 'Ad-hoc SQL on PB-scale data'],
                ['BI / ML', 'Tableau, Looker, SageMaker', 'Consume insights'],
              ],
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'The Performance Triangle', id: 'performance-triangle' },
            {
              type: 'paragraph',
              html: 'System performance is measured by three interrelated properties: <strong>Latency</strong> (how fast?), <strong>Throughput</strong> (how many?), and <strong>Resource Utilization</strong> (at what cost?). Optimising one usually affects the others.',
            },
            { type: 'heading', level: 2, text: 'Latency Targets', id: 'latency-targets' },
            {
              type: 'table',
              headers: ['Operation', 'Typical Latency', 'Order of Magnitude'],
              rows: [
                ['L1 Cache read', '1 ns', '1'],
                ['L3 Cache read', '10 ns', '10×'],
                ['RAM read', '100 ns', '100×'],
                ['SSD random read', '100 µs', '100,000×'],
                ['Same DC network round-trip', '500 µs', '500,000×'],
                ['Redis GET (same region)', '1 ms', '1,000,000×'],
                ['DB query (indexed)', '5–50 ms', '5–50M×'],
                ['Cross-continent HTTP', '150–250 ms', '150–250M×'],
              ],
            },
            { type: 'heading', level: 2, text: 'Percentiles Over Averages', id: 'percentiles' },
            {
              type: 'paragraph',
              html: '<strong>Never use average latency alone.</strong> A 10ms average can hide a 2-second p99. Use percentiles: <strong>p50</strong> (median), <strong>p95</strong>, <strong>p99</strong>, <strong>p999</strong>. High-value users often experience the worst latency — they make the most requests.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Measuring p99 Latency',
              code: `// Using Prometheus histogram (preferred in production)
import { Histogram, register } from 'prom-client';

const httpLatency = new Histogram({
  name: 'http_request_duration_ms',
  help: 'HTTP request latency in milliseconds',
  labelNames: ['method', 'route', 'status'],
  // Buckets optimised for web APIs
  buckets: [1, 5, 10, 25, 50, 100, 250, 500, 1000, 2500],
});

app.use((req, res, next) => {
  const end = httpLatency.startTimer();
  res.on('finish', () =>
    end({ method: req.method, route: req.route?.path, status: res.statusCode })
  );
  next();
});

// Query p99 in PromQL:
// histogram_quantile(0.99, rate(http_request_duration_ms_bucket[5m]))`,
            },
            { type: 'heading', level: 2, text: 'Finding Bottlenecks (USE Method)', id: 'use-method' },
            {
              type: 'paragraph',
              html: 'Brendan Gregg\'s <strong>USE Method</strong>: for every resource (CPU, memory, network, disk, DB pool), check <strong>Utilization</strong> (% busy), <strong>Saturation</strong> (queue depth), and <strong>Errors</strong>. The first saturated resource is your bottleneck.',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>CPU</strong> — high user% suggests compute-bound; high sys% suggests syscall overhead',
                '<strong>Memory</strong> — high swap usage = out of RAM; GC pauses in JVM apps',
                '<strong>Network</strong> — check bandwidth, packet loss, retransmits',
                '<strong>DB connection pool</strong> — pool exhausted = requests queue behind DB calls',
                '<strong>External APIs</strong> — downstream latency directly affects your p99',
              ],
            },
          ],
        },

        {
          slug: 'caching-for-speed-optimization',
          title: 'Caching for Speed Optimization',
          description:
            'Cache placement strategies, eviction policies, cache stampede prevention, and when caching hurts more than it helps.',
          keywords: ['caching', 'redis', 'cache-aside', 'write-through', 'eviction', 'cache stampede', 'ttl'],
          difficulty: 'intermediate',
          estimatedMinutes: 15,
          content: [
            { type: 'heading', level: 2, text: 'Cache Placement', id: 'cache-placement' },
            {
              type: 'table',
              headers: ['Location', 'Latency', 'Examples', 'Tradeoff'],
              rows: [
                ['Client-side (browser)', '0 ms (cache hit)', 'HTTP Cache-Control, Service Worker', 'No control after delivery; stale data risk'],
                ['CDN / Edge', '1–10 ms', 'Cloudflare, CloudFront', 'Great for static/public content; complexity for personalised'],
                ['Reverse proxy', '1–5 ms', 'Nginx proxy_cache, Varnish', 'Shared across all clients; good for read-heavy APIs'],
                ['Application-level', '< 1 ms (in-process)', 'In-memory Map, LRU cache', 'Not shared across instances; per-process memory'],
                ['Distributed cache', '1–3 ms', 'Redis, Memcached', 'Shared across all servers; network overhead'],
              ],
            },
            { type: 'heading', level: 2, text: 'Cache Strategies', id: 'cache-strategies' },
            {
              type: 'comparison',
              left: {
                title: 'Cache-Aside (Lazy Loading)',
                color: '#6366f1',
                items: [
                  'Read: check cache → miss → fetch DB → populate cache',
                  'Write: update DB, invalidate cache',
                  'Cache only what is requested',
                  'Risk: cache stampede on miss',
                  'Best for: read-heavy, irregular access',
                ],
              },
              right: {
                title: 'Write-Through',
                color: '#22c55e',
                items: [
                  'Write: update cache AND DB together',
                  'Read: always from cache (always warm)',
                  'No stale reads',
                  'Risk: cache bloat (write-only data cached)',
                  'Best for: write + read workloads',
                ],
              },
            },
            { type: 'heading', level: 2, text: 'Cache Stampede Prevention', id: 'stampede' },
            {
              type: 'paragraph',
              html: 'A <strong>cache stampede</strong> occurs when a popular cached item expires and hundreds of concurrent requests all miss simultaneously, all hitting the database at once. Solutions:',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Prevent Cache Stampede with Mutex Lock',
              code: `async function getCachedProduct(id: string) {
  const cached = await redis.get(\`product:\${id}\`);
  if (cached) return JSON.parse(cached);

  // Acquire a lock — only one request fetches from DB
  const lock = await redis.set(\`lock:product:\${id}\`, 1, 'NX', 'PX', 5000);

  if (!lock) {
    // Another request is fetching — wait and retry
    await sleep(100);
    return getCachedProduct(id); // Retry
  }

  try {
    const product = await db.products.findOne(id);
    // Add 5–10% jitter to prevent synchronized expiry across keys
    const ttl = 300 + Math.floor(Math.random() * 30);
    await redis.setex(\`product:\${id}\`, ttl, JSON.stringify(product));
    return product;
  } finally {
    await redis.del(\`lock:product:\${id}\`);
  }
}`,
            },
            { type: 'heading', level: 2, text: 'Eviction Policies', id: 'eviction' },
            {
              type: 'table',
              headers: ['Policy', 'Evicts', 'Best For'],
              rows: [
                ['LRU (Least Recently Used)', 'Longest-unused item', 'General-purpose; temporal locality'],
                ['LFU (Least Frequently Used)', 'Least-accessed item', 'Frequency-based access (product catalog)'],
                ['FIFO', 'Oldest entry', 'Simple queue-like patterns'],
                ['TTL-based', 'Expired entries', 'Session tokens, rate limit counters'],
                ['Random', 'Random item', 'When access pattern is unknown'],
              ],
            },
          ],
        },

        {
          slug: 'messaging-queues-for-decoupling',
          title: 'Messaging & Queues for Decoupling',
          description:
            'Message queues vs pub/sub, Kafka vs RabbitMQ vs SQS, delivery guarantees, dead-letter queues, and how async messaging unlocks horizontal scaling.',
          keywords: ['message queue', 'kafka', 'rabbitmq', 'sqs', 'pub/sub', 'dead letter queue', 'at-least-once'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          content: [
            { type: 'heading', level: 2, text: 'Why Messaging?', id: 'why-messaging' },
            {
              type: 'paragraph',
              html: 'Synchronous service-to-service calls create <strong>tight coupling</strong> — if the downstream service is slow or down, the caller suffers. <strong>Message queues</strong> decouple producers from consumers: the producer writes to a queue and returns immediately; consumers process at their own pace.',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Temporal decoupling</strong> — producer and consumer don\'t need to be online simultaneously',
                '<strong>Load leveling</strong> — queue absorbs traffic spikes; consumers process at a steady rate',
                '<strong>Retry & resilience</strong> — failed messages stay in queue and retry automatically',
                '<strong>Fan-out</strong> — one event processed by multiple independent consumers',
              ],
            },
            { type: 'heading', level: 2, text: 'Message Queue vs Pub/Sub', id: 'queue-vs-pubsub' },
            {
              type: 'comparison',
              left: {
                title: 'Point-to-Point Queue',
                color: '#6366f1',
                items: [
                  'One message consumed by one consumer',
                  'Message deleted after ACK',
                  'Load balancing across consumers natural',
                  'RabbitMQ, SQS, ActiveMQ',
                  'Order fulfillment, job processing',
                ],
              },
              right: {
                title: 'Pub/Sub (Topic)',
                color: '#22c55e',
                items: [
                  'One message delivered to ALL subscribers',
                  'Message retained for all subscriber groups',
                  'Fan-out: email + analytics + audit all get it',
                  'Kafka, SNS, Google Pub/Sub',
                  'Events: order placed, user signed up',
                ],
              },
            },
            {
              type: 'table',
              headers: ['Feature', 'Kafka', 'RabbitMQ', 'AWS SQS'],
              rows: [
                ['Model', 'Log-based pub/sub', 'AMQP queue/exchange', 'Managed point-to-point'],
                ['Throughput', 'Millions/sec', '50K–100K/sec', 'Thousands/sec'],
                ['Retention', 'Configurable (days/forever)', 'Until ACK', 'Up to 14 days'],
                ['Replay', 'Yes — rewind offset', 'No', 'No'],
                ['Ordering', 'Per partition', 'FIFO queue option', 'FIFO queue option'],
                ['Best For', 'Event streaming, audit log, CDC', 'Complex routing, RPC, priority queues', 'Serverless, simple async jobs'],
              ],
            },
            {
              type: 'callout',
              variant: 'caution',
              html: '<strong>Design for at-least-once delivery.</strong> All major queues guarantee at-least-once (not exactly-once). Make your consumers <strong>idempotent</strong> — processing the same message twice should be safe. Use a deduplication key or check for prior processing.',
            },
          ],
        },

        {
          slug: 'concurrency-and-parallelism',
          title: 'Concurrency & Parallelism',
          description:
            'Threads vs async/await vs processes, the event loop, race conditions, locks, optimistic concurrency, and designing systems that safely handle concurrent requests.',
          keywords: ['concurrency', 'parallelism', 'race condition', 'mutex', 'optimistic locking', 'event loop', 'async'],
          difficulty: 'advanced',
          estimatedMinutes: 17,
          content: [
            { type: 'heading', level: 2, text: 'Concurrency vs Parallelism', id: 'concurrency-vs-parallelism' },
            {
              type: 'comparison',
              left: {
                title: 'Concurrency',
                color: '#6366f1',
                items: [
                  'Multiple tasks making progress (interleaved)',
                  'Single CPU, time-sliced',
                  'Node.js event loop, goroutines',
                  'I/O-bound work benefits most',
                  '"Dealing with many things at once"',
                ],
              },
              right: {
                title: 'Parallelism',
                color: '#22c55e',
                items: [
                  'Multiple tasks executing simultaneously',
                  'Multiple CPU cores',
                  'Worker threads, multi-process, SIMD',
                  'CPU-bound work benefits most',
                  '"Doing many things at once"',
                ],
              },
            },
            { type: 'heading', level: 2, text: 'Race Conditions', id: 'race-conditions' },
            {
              type: 'paragraph',
              html: 'A <strong>race condition</strong> occurs when the correctness of a result depends on the relative timing of concurrent operations. The classic example is two requests both reading a balance, both seeing $100, both debiting $60, and both succeeding — leaving a negative balance.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Fixing a Race Condition with DB-Level Locking',
              code: `// ❌ Race condition: two requests both read balance = 100
async function withdrawUnsafe(userId: string, amount: number) {
  const { balance } = await db.query('SELECT balance FROM accounts WHERE id = $1', [userId]);
  if (balance < amount) throw new Error('Insufficient funds');
  await db.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [amount, userId]);
}

// ✅ Option 1: Atomic update with constraint check
async function withdrawAtomic(userId: string, amount: number) {
  const result = await db.query(
    'UPDATE accounts SET balance = balance - $1 WHERE id = $2 AND balance >= $1 RETURNING balance',
    [amount, userId]
  );
  if (result.rowCount === 0) throw new Error('Insufficient funds');
}

// ✅ Option 2: Optimistic locking with version field
async function withdrawOptimistic(userId: string, amount: number) {
  const { balance, version } = await db.query('SELECT balance, version FROM accounts WHERE id = $1', [userId]);
  if (balance < amount) throw new Error('Insufficient funds');
  const result = await db.query(
    'UPDATE accounts SET balance = $1, version = version + 1 WHERE id = $2 AND version = $3',
    [balance - amount, userId, version]
  );
  if (result.rowCount === 0) throw new Error('Concurrent update detected — retry');
}`,
            },
            { type: 'heading', level: 2, text: 'Distributed Locks', id: 'distributed-locks' },
            {
              type: 'paragraph',
              html: 'In distributed systems, a mutex inside one process doesn\'t prevent another server from running the same code. Use <strong>Redis SETNX</strong> (or Redlock) for distributed locking.',
            },
            {
              type: 'callout',
              variant: 'caution',
              html: '<strong>Distributed locks are not a silver bullet.</strong> Clock drift, network partitions, and GC pauses can all cause lock expiry before work completes. Prefer <strong>idempotent operations + optimistic concurrency</strong> over distributed locks when possible.',
            },
          ],
        },

        {
          slug: 'database-performance-optimization',
          title: 'Database Performance Optimization Techniques',
          description:
            'Indexing strategies, query planning, N+1 prevention, connection pooling, read replicas, and EXPLAIN ANALYZE — practical techniques for production databases.',
          keywords: ['database performance', 'indexing', 'query optimization', 'connection pooling', 'n+1', 'explain analyze'],
          difficulty: 'advanced',
          estimatedMinutes: 25,
          content: [
            { type: 'heading', level: 2, text: 'Indexing Strategy', id: 'indexing' },
            {
              type: 'paragraph',
              html: 'An <strong>index</strong> is a data structure (usually B-tree) that speeds up reads at the cost of write overhead and storage. The wrong index strategy is the #1 cause of slow production queries.',
            },
            {
              type: 'table',
              headers: ['Index Type', 'Use Case', 'Example'],
              rows: [
                ['B-tree (default)', 'Equality and range queries', 'WHERE created_at > \'2024-01-01\''],
                ['Hash', 'Equality-only (faster than B-tree)', 'WHERE user_id = $1 (exact match)'],
                ['Composite', 'Multi-column filters (order matters)', '(tenant_id, created_at) — filter by tenant first'],
                ['Partial', 'Index a subset of rows', 'WHERE status = \'active\' — don\'t index archived rows'],
                ['GIN/GiST', 'Full-text, JSON, arrays, geospatial', 'WHERE tags @> ARRAY[\'react\']'],
                ['Covering', 'All SELECT columns in index (index-only scan)', 'CREATE INDEX ON orders (user_id) INCLUDE (total)'],
              ],
            },
            { type: 'heading', level: 2, text: 'Reading EXPLAIN ANALYZE', id: 'explain' },
            {
              type: 'code',
              language: 'sql',
              title: 'EXPLAIN ANALYZE — Find Sequential Scans',
              code: `EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT o.id, o.total, u.email
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.status = 'pending'
  AND o.created_at > NOW() - INTERVAL '7 days'
ORDER BY o.created_at DESC
LIMIT 100;

-- 🔴 Warning signs to fix:
--   Seq Scan on orders   → missing index on (status, created_at)
--   Hash Join (rows=500K) → consider (user_id) index on orders
--   Buffers: read=50000  → 50K blocks read from disk (slow)

-- ✅ Add composite index:
CREATE INDEX CONCURRENTLY idx_orders_status_created
  ON orders (status, created_at DESC)
  WHERE status = 'pending'; -- partial index`,
            },
            { type: 'heading', level: 2, text: 'Connection Pooling', id: 'connection-pooling' },
            {
              type: 'paragraph',
              html: 'Every database connection has overhead (memory, auth, TCP). Opening a new connection per request at high load kills performance. Use a <strong>connection pool</strong> to reuse a fixed number of persistent connections.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'PgBouncer + node-postgres Pool Config',
              code: `import { Pool } from 'pg';

// Application-level pool (connects to PgBouncer in production)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,            // Max connections per app instance
  idleTimeoutMillis: 10_000,
  connectionTimeoutMillis: 3_000,
});

// Rule of thumb: max_connections = (2 * CPU cores) + disk spindles
// PgBouncer sits between app (many connections) and Postgres (few connections)
// Transaction-mode pooling: connections released after each transaction`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'The <strong>N+1 query problem</strong>: loading 100 users then querying orders for each one = 101 queries. Fix with a JOIN or DataLoader (batch + deduplicate). This single issue is responsible for more production slowdowns than any other.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'SLI, SLO, and SLA', id: 'sli-slo-sla' },
            {
              type: 'table',
              headers: ['Term', 'Meaning', 'Example'],
              rows: [
                ['SLI (Service Level Indicator)', 'A measured metric of service behaviour', 'Request success rate = successful_requests / total_requests'],
                ['SLO (Service Level Objective)', 'Internal target for an SLI', 'Success rate ≥ 99.9% over 30 days'],
                ['SLA (Service Level Agreement)', 'External contract with penalties for breach', 'If uptime < 99.9%, customer gets 25% credit'],
              ],
            },
            { type: 'heading', level: 2, text: 'The Nines', id: 'nines' },
            {
              type: 'table',
              headers: ['Availability', 'Monthly Downtime', 'Yearly Downtime', 'Achievable With'],
              rows: [
                ['99% (2 nines)', '7.3 hours', '3.65 days', 'Single server, manual deploys'],
                ['99.9% (3 nines)', '43.8 min', '8.76 hours', 'Basic HA with load balancer'],
                ['99.95%', '21.9 min', '4.38 hours', 'Multi-AZ, auto-failover'],
                ['99.99% (4 nines)', '4.4 min', '52.6 min', 'Active-active multi-region'],
                ['99.999% (5 nines)', '26 sec', '5.26 min', 'Extremely complex — Google-scale'],
              ],
            },
            { type: 'heading', level: 2, text: 'Error Budgets', id: 'error-budget' },
            {
              type: 'paragraph',
              html: 'An <strong>error budget</strong> is the amount of unreliability you are allowed before breaching your SLO. If your SLO is 99.9%, you have a 0.1% error budget (43.8 min/month). Teams can spend error budget on risky releases; when it runs out, feature deployments pause until reliability improves.',
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'Error budgets align engineering and product: reliability isn\'t just "ops\' problem" — if product ships too fast and burns the budget, new features pause. This <strong>incentivises reliability at the team level</strong>.',
            },
            { type: 'heading', level: 2, text: 'Common SLIs to Measure', id: 'common-slis' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Availability</strong> — % of time the service returns non-5xx responses',
                '<strong>Latency</strong> — % of requests served in &lt; N ms (e.g. 95% under 200ms)',
                '<strong>Error rate</strong> — % of requests returning 5xx',
                '<strong>Saturation</strong> — % CPU / memory / queue depth utilised',
                '<strong>Freshness</strong> — for data pipelines, how old is the latest processed record?',
              ],
            },
          ],
        },

        {
          slug: 'high-availability-fault-tolerance-failover',
          title: 'High Availability, Fault Tolerance & Failover',
          description:
            'Redundancy patterns, active-passive vs active-active, health checks, circuit breakers, and designing systems that survive single and multi-node failures.',
          keywords: ['high availability', 'fault tolerance', 'failover', 'circuit breaker', 'redundancy', 'active-active'],
          difficulty: 'advanced',
          estimatedMinutes: 16,
          content: [
            { type: 'heading', level: 2, text: 'HA Design Principles', id: 'ha-principles' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Eliminate single points of failure (SPOF)</strong> — every critical component has at least one standby',
                '<strong>Design for failure</strong> — assume any component will fail; the system must degrade gracefully',
                '<strong>Fast detection</strong> — health checks catch failures in seconds, not minutes',
                '<strong>Fast recovery</strong> — automated failover restores service without human intervention',
                '<strong>Test failures in production</strong> — Chaos Engineering (Netflix Chaos Monkey)',
              ],
            },
            { type: 'heading', level: 2, text: 'Active-Passive vs Active-Active', id: 'active-passive-active' },
            {
              type: 'comparison',
              left: {
                title: 'Active-Passive',
                color: '#6366f1',
                items: [
                  'One primary handles all traffic',
                  'Standby ready to take over',
                  'Failover time: 15–60 seconds',
                  'Simpler to implement and reason about',
                  'Primary DB + read replicas',
                ],
              },
              right: {
                title: 'Active-Active',
                color: '#22c55e',
                items: [
                  'All nodes handle live traffic',
                  'Instant failover (just stop routing)',
                  'Failover time: < 1 second',
                  'Complex conflict resolution needed',
                  'Multi-region load balanced APIs',
                ],
              },
            },
            { type: 'heading', level: 2, text: 'Circuit Breaker Pattern', id: 'circuit-breaker' },
            {
              type: 'paragraph',
              html: 'A <strong>circuit breaker</strong> wraps calls to an external service. After N consecutive failures, it <strong>opens</strong> and immediately returns an error without calling the service — protecting it from cascading failures and giving it time to recover.',
            },
            {
              type: 'flow',
              steps: [
                { label: 'Closed', desc: 'Normal operation. Calls pass through. Failures counted.', color: '#22c55e' },
                { label: 'Open', desc: 'Failure threshold exceeded. All calls fail-fast immediately.', color: '#ef4444' },
                { label: 'Half-Open', desc: 'After timeout, allow one probe request. Success → Close. Fail → Open.', color: '#f59e0b' },
              ],
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Simple Circuit Breaker Implementation',
              code: `class CircuitBreaker {
  private failures = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  private nextRetry = 0;

  constructor(
    private threshold = 5,
    private timeout = 30_000
  ) {}

  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() < this.nextRetry) throw new Error('Circuit open');
      this.state = 'half-open';
    }
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFailure();
      throw err;
    }
  }

  private onSuccess() { this.failures = 0; this.state = 'closed'; }
  private onFailure() {
    this.failures++;
    if (this.failures >= this.threshold) {
      this.state = 'open';
      this.nextRetry = Date.now() + this.timeout;
    }
  }
}`,
            },
          ],
        },

        {
          slug: 'backup-and-recovery-strategies',
          title: 'Backup & Recovery Strategies',
          description:
            'RPO vs RTO, full/incremental/differential backups, point-in-time recovery, backup validation, and the 3-2-1 rule for production data.',
          keywords: ['backup', 'recovery', 'rpo', 'rto', 'point-in-time recovery', 'pitr', '3-2-1 rule'],
          difficulty: 'intermediate',
          estimatedMinutes: 11,
          content: [
            { type: 'heading', level: 2, text: 'RPO and RTO', id: 'rpo-rto' },
            {
              type: 'comparison',
              left: {
                title: 'RPO — Recovery Point Objective',
                color: '#6366f1',
                items: [
                  'How much data can we afford to lose?',
                  'Measured in time: "max 1 hour of data loss"',
                  'Determines backup frequency',
                  'Lower RPO = more frequent backups = higher cost',
                  'Banking: RPO = 0 (no data loss)',
                ],
              },
              right: {
                title: 'RTO — Recovery Time Objective',
                color: '#22c55e',
                items: [
                  'How long can the system be down?',
                  'Measured in time: "restore within 4 hours"',
                  'Determines recovery infrastructure',
                  'Lower RTO = warm standby = higher cost',
                  'E-commerce: RTO = 15 min',
                ],
              },
            },
            { type: 'heading', level: 2, text: 'Backup Types', id: 'backup-types' },
            {
              type: 'table',
              headers: ['Type', 'What It Copies', 'Speed', 'Restore Speed', 'Storage'],
              rows: [
                ['Full', 'Everything', 'Slow', 'Fast (single set)', 'Large'],
                ['Incremental', 'Changes since last backup (any type)', 'Fast', 'Slow (chain required)', 'Smallest'],
                ['Differential', 'Changes since last FULL backup', 'Medium', 'Medium (full + diff)', 'Medium'],
                ['Continuous (PITR)', 'WAL stream / transaction log', 'Continuous', 'Exact point in time', 'Moderate'],
              ],
            },
            { type: 'heading', level: 2, text: 'The 3-2-1 Rule', id: '3-2-1' },
            {
              type: 'list',
              ordered: true,
              items: [
                '<strong>3 copies</strong> of your data (1 primary + 2 backups)',
                '<strong>2 different storage media</strong> (e.g. local SSD + cloud object storage)',
                '<strong>1 offsite copy</strong> (different geographic region — survives fire, flood, datacenter failure)',
              ],
            },
            {
              type: 'callout',
              variant: 'caution',
              html: '<strong>A backup you\'ve never tested is not a backup.</strong> Run restore drills quarterly. The worst time to discover your backup is corrupt or your restore procedure is broken is during an actual incident at 3 AM.',
            },
          ],
        },

        {
          slug: 'disaster-recovery-in-practice',
          title: 'Disaster Recovery in Practice',
          description:
            'DR strategies from cold standby to active-active, runbooks, failover drills, chaos engineering, and real-world DR decision frameworks.',
          keywords: ['disaster recovery', 'dr', 'failover', 'chaos engineering', 'runbook', 'multi-region'],
          difficulty: 'advanced',
          estimatedMinutes: 9,
          content: [
            { type: 'heading', level: 2, text: 'DR Tiers by Cost vs Recovery Speed', id: 'dr-tiers' },
            {
              type: 'table',
              headers: ['Strategy', 'RTO', 'RPO', 'Cost', 'How'],
              rows: [
                ['Cold Standby', 'Hours', 'Hours', '$', 'Restore from backup into freshly provisioned infra'],
                ['Warm Standby', '15–30 min', 'Minutes', '$$$', 'Scaled-down replica running; scale up on failover'],
                ['Hot Standby (Active-Passive)', '< 5 min', 'Seconds', '$$$$', 'Full-size replica; automated DNS failover'],
                ['Active-Active', 'Seconds', '~0', '$$$$$', 'Both regions serve live traffic; instant failover'],
              ],
            },
            { type: 'heading', level: 2, text: 'DR Runbook Essentials', id: 'runbook' },
            {
              type: 'list',
              ordered: true,
              items: [
                '<strong>Declare incident</strong> — who declares, how to communicate',
                '<strong>Assess blast radius</strong> — which services are affected?',
                '<strong>Failover database</strong> — promote read replica; update connection strings',
                '<strong>Redirect DNS</strong> — update Route53/Cloudflare to point to DR region',
                '<strong>Verify health checks</strong> — confirm all services are green in DR region',
                '<strong>Notify stakeholders</strong> — status page, customer comms',
                '<strong>Root cause analysis</strong> — write blameless postmortem within 48h',
              ],
            },
            { type: 'heading', level: 2, text: 'Chaos Engineering', id: 'chaos' },
            {
              type: 'paragraph',
              html: '<strong>Chaos Engineering</strong> (pioneered by Netflix) proactively injects failures into production to verify resilience before real incidents expose gaps.',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Netflix Chaos Monkey</strong> — randomly terminates EC2 instances in production',
                '<strong>AWS Fault Injection Simulator (FIS)</strong> — inject CPU/memory pressure, network latency, AZ outages',
                '<strong>Gremlin</strong> — managed chaos platform with resource, network, state attacks',
                'Start small: kill one instance in staging, then non-peak production, then on-call hours',
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Game Days</strong>: schedule a 4-hour window where a team intentionally causes failures and practices the runbook. This builds muscle memory before a real 3 AM incident.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'Security First, Not Last', id: 'security-first' },
            {
              type: 'paragraph',
              html: 'Security added as an afterthought costs 10–100x more than security built in from the start. The <strong>Shift Left</strong> principle: integrate security into every stage — design, code review, CI/CD, and monitoring.',
            },
            { type: 'heading', level: 2, text: 'Core Security Principles', id: 'principles' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Least Privilege</strong> — every component gets only the permissions it needs; nothing more',
                '<strong>Defence in Depth</strong> — multiple independent security layers; no single point of failure',
                '<strong>Zero Trust</strong> — never trust, always verify; authenticate every request even from internal services',
                '<strong>Fail Secure</strong> — when something breaks, default to denying access, not granting it',
                '<strong>Security by Obscurity alone is not security</strong> — hiding endpoints is no substitute for proper auth',
              ],
            },
            { type: 'heading', level: 2, text: 'OWASP Top 10 (2021)', id: 'owasp' },
            {
              type: 'table',
              headers: ['Rank', 'Vulnerability', 'Example', 'Prevention'],
              rows: [
                ['A01', 'Broken Access Control', 'User accesses /admin without admin role', 'Enforce authz server-side on every endpoint'],
                ['A02', 'Cryptographic Failures', 'Passwords stored as MD5', 'bcrypt/Argon2 for passwords; AES-256 for data at rest'],
                ['A03', 'Injection (SQLi, XSS)', 'SELECT * FROM users WHERE name = \'$input\'', 'Parameterised queries; output encoding'],
                ['A04', 'Insecure Design', 'No rate limiting on login endpoint', 'Threat model; build controls into design phase'],
                ['A05', 'Security Misconfiguration', 'Default credentials, open S3 bucket', 'IaC scanning; secrets management'],
                ['A06', 'Vulnerable Components', 'Log4Shell in a dependency', 'SCA scanning in CI (Snyk, Dependabot)'],
                ['A07', 'Auth & Session Failures', 'Session tokens in URL', 'HttpOnly cookies; short-lived JWTs + refresh'],
                ['A08', 'Software Integrity Failures', 'Unverified npm package', 'Dependency pinning; supply chain signing'],
                ['A09', 'Logging Failures', 'No audit log of admin actions', 'Log all auth events; tamper-proof audit logs'],
                ['A10', 'SSRF', 'User-supplied URL fetched by server', 'Allowlist IPs; block private ranges (169.254.x.x)'],
              ],
            },
            { type: 'heading', level: 2, text: 'Threat Modelling (STRIDE)', id: 'stride' },
            {
              type: 'table',
              headers: ['Letter', 'Threat', 'Example', 'Control'],
              rows: [
                ['S', 'Spoofing', 'Attacker impersonates another user', 'Strong authentication'],
                ['T', 'Tampering', 'Modify data in transit', 'TLS, HMAC signatures, integrity checks'],
                ['R', 'Repudiation', 'User denies performing an action', 'Tamper-proof audit logs'],
                ['I', 'Information Disclosure', 'API leaks PII in error messages', 'Generic errors; structured logging'],
                ['D', 'Denial of Service', 'Flood endpoint to exhaust resources', 'Rate limiting, WAF, auto-scaling'],
                ['E', 'Elevation of Privilege', 'Regular user gains admin access', 'RBAC; test privilege boundaries'],
              ],
            },
          ],
        },

        {
          slug: 'authentication-and-authorization',
          title: 'Authentication & Authorization',
          description:
            'Authentication (who are you?) vs authorization (what can you do?), OAuth 2.0/OIDC flows, RBAC/ABAC, API keys, and MFA patterns.',
          keywords: ['authentication', 'authorization', 'oauth2', 'oidc', 'jwt', 'rbac', 'mfa', 'api key'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          content: [
            { type: 'heading', level: 2, text: 'Authentication vs Authorization', id: 'authn-vs-authz' },
            {
              type: 'comparison',
              left: {
                title: 'Authentication (AuthN)',
                color: '#6366f1',
                items: [
                  '"Who are you?"',
                  'Verify identity',
                  'Username/password, OAuth, MFA',
                  'Result: identity token (JWT)',
                  'Happens first',
                ],
              },
              right: {
                title: 'Authorization (AuthZ)',
                color: '#22c55e',
                items: [
                  '"What can you do?"',
                  'Check permissions',
                  'RBAC, ABAC, ACLs',
                  'Result: allow or deny',
                  'Happens after authentication',
                ],
              },
            },
            { type: 'heading', level: 2, text: 'OAuth 2.0 + OIDC', id: 'oauth-oidc' },
            {
              type: 'paragraph',
              html: '<strong>OAuth 2.0</strong> is an <em>authorization</em> framework — it grants third-party apps limited access to a user\'s resources. <strong>OIDC</strong> (OpenID Connect) layers <em>identity</em> on top: the token also identifies who the user is.',
            },
            {
              type: 'flow',
              steps: [
                { label: 'User clicks "Sign in with Google"', desc: 'App redirects to Google with client_id, scope, redirect_uri', color: '#6366f1' },
                { label: 'User authenticates at Google', desc: 'Google shows consent screen; user approves', color: '#8b5cf6' },
                { label: 'Redirect with auth code', desc: 'Google redirects to your app with a one-time code', color: '#a855f7' },
                { label: 'Exchange code for tokens', desc: 'Server-to-server: code + client_secret → access_token + id_token', color: '#ec4899' },
                { label: 'Use tokens', desc: 'id_token identifies user; access_token used for API calls', color: '#22c55e' },
              ],
            },
            { type: 'heading', level: 2, text: 'RBAC vs ABAC', id: 'rbac-abac' },
            {
              type: 'table',
              headers: ['Model', 'How', 'Pros', 'Cons', 'Examples'],
              rows: [
                ['RBAC (Role-Based)', 'User has Role; Role has Permissions', 'Simple, easy to reason about', 'Role explosion at scale', 'admin, editor, viewer'],
                ['ABAC (Attribute-Based)', 'Policy checks user, resource, and context attributes', 'Fine-grained, dynamic', 'Complex policies, harder to debug', 'User.dept == Resource.dept AND time < 17:00'],
              ],
            },
          ],
        },

        {
          slug: 'data-protection-and-secure-communication',
          title: 'Data Protection & Secure Communication',
          description:
            'Encryption at rest and in transit, TLS/mTLS, key management, secrets management, and data classification frameworks for compliant systems.',
          keywords: ['encryption', 'tls', 'mtls', 'kms', 'secrets management', 'data at rest', 'data in transit'],
          difficulty: 'intermediate',
          estimatedMinutes: 17,
          content: [
            { type: 'heading', level: 2, text: 'Encryption at Rest', id: 'encryption-at-rest' },
            {
              type: 'paragraph',
              html: 'Data at rest is encrypted so physical theft of a disk reveals nothing. Modern cloud storage (S3, EBS, RDS) encrypts by default using AES-256. Use a <strong>KMS</strong> (Key Management Service) to manage encryption keys — never store keys alongside the data they protect.',
            },
            {
              type: 'table',
              headers: ['Layer', 'Technology', 'Who Manages Key'],
              rows: [
                ['Database', 'RDS TDE, PostgreSQL pgcrypto', 'AWS KMS / Cloud KMS'],
                ['Object Storage', 'S3 SSE-S3, SSE-KMS, SSE-C', 'AWS-managed or customer-managed'],
                ['Block Storage', 'EBS encryption, dm-crypt/LUKS', 'AWS KMS / self-managed'],
                ['Application-level', 'AES-256-GCM in code', 'HSM / secrets manager'],
              ],
            },
            { type: 'heading', level: 2, text: 'TLS and mTLS', id: 'tls-mtls' },
            {
              type: 'paragraph',
              html: '<strong>TLS</strong> (Transport Layer Security) encrypts data in transit and authenticates the <em>server</em> to the client. <strong>mTLS</strong> (mutual TLS) requires both server and client to present certificates — used for service-to-service authentication in zero-trust architectures.',
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'Service meshes like <strong>Istio</strong> and <strong>Linkerd</strong> automatically provision mTLS certificates for every pod in Kubernetes, removing the burden of certificate management from application code.',
            },
            { type: 'heading', level: 2, text: 'Secrets Management', id: 'secrets' },
            {
              type: 'code',
              language: 'typescript',
              title: 'Fetch Secrets from AWS Secrets Manager (Never Hardcode)',
              code: `import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

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
// 3. App fetches fresh credentials on next call`,
            },
          ],
        },

        {
          slug: 'network-and-infrastructure-security',
          title: 'Network & Infrastructure Security',
          description:
            'VPCs, security groups, WAF, DDoS protection, bastion hosts, VPN/private link, and hardening cloud infrastructure against real-world attack vectors.',
          keywords: ['vpc', 'security group', 'waf', 'ddos', 'bastion host', 'private subnet', 'network acl'],
          difficulty: 'advanced',
          estimatedMinutes: 23,
          content: [
            { type: 'heading', level: 2, text: 'Defence in Depth with VPC', id: 'vpc' },
            {
              type: 'paragraph',
              html: 'A <strong>VPC</strong> (Virtual Private Cloud) is an isolated network in the cloud. Layer your infrastructure: public subnets for load balancers, private subnets for application servers, isolated subnets for databases. Traffic flows in only one direction through NAT gateways.',
            },
            {
              type: 'table',
              headers: ['Layer', 'Component', 'Traffic Allowed'],
              rows: [
                ['Internet', 'Route 53, CloudFront', 'Anywhere → CDN edge'],
                ['Public subnet', 'Load Balancer, NAT GW', 'Internet → LB:443; LB → private'],
                ['Private subnet', 'App servers, ECS tasks', 'LB → app:3000; app → DB subnet'],
                ['Isolated subnet', 'RDS, ElastiCache, Kafka', 'Only from app subnet on specific port'],
              ],
            },
            { type: 'heading', level: 2, text: 'Security Groups vs NACLs', id: 'sg-vs-nacl' },
            {
              type: 'comparison',
              left: {
                title: 'Security Groups',
                color: '#6366f1',
                items: [
                  'Instance-level firewall (ENI)',
                  'Stateful — return traffic auto-allowed',
                  'Allow rules only (no deny)',
                  'Changes take effect immediately',
                  'First line of defence per resource',
                ],
              },
              right: {
                title: 'Network ACLs',
                color: '#22c55e',
                items: [
                  'Subnet-level firewall',
                  'Stateless — must allow both directions',
                  'Both allow AND deny rules',
                  'Rule number order matters (evaluated top-down)',
                  'Good for subnet-wide blocks (e.g. block a CIDR)',
                ],
              },
            },
            { type: 'heading', level: 2, text: 'WAF and DDoS Protection', id: 'waf-ddos' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>WAF (Web Application Firewall)</strong> — inspect HTTP requests; block SQLi, XSS, bad user agents, malicious IPs. Deploy at CDN edge (Cloudflare WAF, AWS WAF).',
                '<strong>DDoS Protection</strong> — absorb volumetric attacks at the network edge before they reach your servers. AWS Shield Standard (free, L3/L4), Shield Advanced (paid, L7 with WAF).',
                '<strong>Rate limiting</strong> — limit requests per IP/key at the WAF or reverse proxy before they reach your application.',
                '<strong>Geo-blocking</strong> — block entire countries if you have no legitimate traffic from them.',
                '<strong>Bot management</strong> — fingerprint and challenge suspicious clients (CAPTCHAs, JavaScript challenges).',
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'Never expose database ports (5432, 3306, 6379) to the public internet. <strong>Always use a bastion host or AWS Session Manager</strong> for admin DB access. Security groups should only allow DB connections from your app subnet\'s CIDR.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'The Framework', id: 'framework' },
            {
              type: 'paragraph',
              html: 'Whether in an interview or a real greenfield design, a structured approach prevents you from jumping straight to solutions before you understand the problem. The <strong>4-step framework</strong> ensures you cover requirements, scale, design, and trade-offs systematically.',
            },
            {
              type: 'flow',
              steps: [
                { label: 'Step 1: Clarify Requirements', desc: 'Functional + non-functional requirements; out-of-scope boundaries', color: '#6366f1' },
                { label: 'Step 2: Estimate Scale', desc: 'DAU, QPS, storage, bandwidth — back-of-envelope calculations', color: '#8b5cf6' },
                { label: 'Step 3: High-Level Design', desc: 'Core components, data flow, APIs, database schema', color: '#ec4899' },
                { label: 'Step 4: Deep Dive', desc: 'Zoom in on hard/critical components; discuss trade-offs', color: '#22c55e' },
              ],
            },
            { type: 'heading', level: 2, text: 'Step 1 — Clarify Requirements', id: 'step-1' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Functional:</strong> What must the system do? (user stories, core features)',
                '<strong>Non-functional:</strong> Scale, availability (SLO?), latency (p99?), consistency, security, compliance',
                '<strong>Constraints:</strong> Must use existing systems? Specific cloud provider? Budget?',
                '<strong>Out of scope:</strong> Explicitly state what you are NOT designing',
              ],
            },
            { type: 'heading', level: 2, text: 'Step 2 — Estimate Scale', id: 'step-2' },
            {
              type: 'code',
              language: 'text',
              title: 'Back-of-Envelope Estimation Template',
              code: `// Example: Design Twitter (1B users, 300M DAU)

// Reads vs Writes (read-heavy: 100:1)
Write QPS:  300M DAU * 1 tweet/day / 86,400s ≈ 3,500 QPS
Read QPS:   3,500 * 100                       ≈ 350,000 QPS

// Storage (tweets retained forever)
Tweet size: 280 chars * 2 bytes + metadata    ≈ 1 KB
Daily writes: 3,500 QPS * 86,400s            = 300M tweets/day
Daily storage: 300M * 1 KB                   = 300 GB/day
5-year storage: 300 GB * 365 * 5             ≈ 550 TB

// Bandwidth
Read bandwidth: 350,000 QPS * 1 KB           = 350 MB/s  ← need CDN
Write bandwidth: 3,500 QPS * 1 KB            = 3.5 MB/s  ← manageable`,
            },
            { type: 'heading', level: 2, text: 'Step 3 — High-Level Design', id: 'step-3' },
            {
              type: 'list',
              ordered: false,
              items: [
                'Draw the main components: clients, load balancers, services, caches, databases, queues',
                'Define the primary APIs (endpoint, method, request/response)',
                'Choose database(s) and justify: SQL vs NoSQL, what schema',
                'Identify the core data flow for the most critical use case (e.g. post tweet, see feed)',
              ],
            },
            { type: 'heading', level: 2, text: 'Step 4 — Deep Dive', id: 'step-4' },
            {
              type: 'list',
              ordered: false,
              items: [
                'Pick the <strong>hardest 2–3 sub-problems</strong> and solve them in depth',
                'Common deep-dives: feed generation, search, notifications, chat, storage, consistency',
                'Discuss trade-offs explicitly: "I chose X over Y because… the downside is…"',
                'Address bottlenecks identified in estimation: if 350K QPS read, explain how cache + CDN handles it',
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>In interviews:</strong> spend 5 min on Step 1, 5 min on Step 2, 15 min on Step 3, and 15 min on Step 4. Interviewers want to see your thought process and trade-off reasoning more than a perfect answer.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'Requirements', id: 'requirements' },
            {
              type: 'table',
              headers: ['Type', 'Requirement'],
              rows: [
                ['Functional', 'Browse events and venues; select seats on an interactive map; reserve and purchase tickets'],
                ['Functional', 'Each seat can only be booked by one user at a time (no double-booking)'],
                ['Non-functional', '10M DAU; 100K concurrent users during peak (popular event launch)'],
                ['Non-functional', 'Seat reservation must be consistent — eventual consistency is not acceptable'],
                ['Non-functional', 'Reserve-to-payment window: 10 minutes (after which the seat is released)'],
              ],
            },
            { type: 'heading', level: 2, text: 'The Core Challenge: Seat Reservation', id: 'core-challenge' },
            {
              type: 'paragraph',
              html: 'Ticketing is a classic <strong>high-contention write problem</strong>. At event launch, thousands of users simultaneously try to reserve the same limited seats. Standard optimistic locking at the DB layer will cause massive retry storms.',
            },
            {
              type: 'flow',
              steps: [
                { label: 'User selects seat', desc: 'Frontend shows real-time seat availability via WebSocket/SSE', color: '#6366f1' },
                { label: 'Reserve (10-min hold)', desc: 'Acquire Redis lock on seat ID; write reservation to DB with expiry', color: '#8b5cf6' },
                { label: 'Payment', desc: 'User completes payment within 10 min; redirect to payment gateway', color: '#ec4899' },
                { label: 'Confirm or Release', desc: 'Payment webhook: confirm reservation. Timeout: release seat.', color: '#22c55e' },
              ],
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Atomic Seat Reservation with Redis + DB',
              code: `async function reserveSeat(seatId: string, userId: string): Promise<boolean> {
  // Atomic: SET if Not eXists + 10-min expiry
  const lockKey = \`seat:lock:\${seatId}\`;
  const reserved = await redis.set(lockKey, userId, 'NX', 'EX', 600);

  if (!reserved) return false; // Seat already held by someone else

  // Write pending reservation to DB
  await db.reservations.create({
    seatId, userId, status: 'pending',
    expiresAt: new Date(Date.now() + 600_000),
  });

  // Schedule expiry cleanup (via job queue)
  await queue.add('release-seat', { seatId }, { delay: 600_000 });

  return true;
}`,
            },
            { type: 'heading', level: 2, text: 'Handling Flash Sales', id: 'flash-sales' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Queue-based admission</strong> — a virtual waiting room queues users; only N are let into the reservation flow at once',
                '<strong>Pre-shard seats</strong> — partition seats into buckets; each bucket handled by a separate DB instance to reduce contention',
                '<strong>Read replicas for browsing</strong> — seat availability reads from replicas (with 1–2s staleness acceptable for display)',
                '<strong>CDN for static content</strong> — venue maps, images served from edge to protect origin',
              ],
            },
          ],
        },

        {
          slug: 'design-news-feed',
          title: 'Design a News Feed (Twitter/Instagram)',
          description:
            'Push vs pull feed generation, fan-out on write vs read, celebrity problem, ranking algorithms, and caching strategies for a social media feed at scale.',
          keywords: ['news feed', 'twitter', 'instagram', 'fan-out', 'feed generation', 'ranking', 'timeline'],
          difficulty: 'advanced',
          estimatedMinutes: 43,
          content: [
            { type: 'heading', level: 2, text: 'Requirements', id: 'requirements' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Functional:</strong> Post tweets/photos; follow/unfollow users; view personalised home feed with posts from followees',
                '<strong>Non-functional:</strong> 300M DAU; post QPS ~5K; read QPS ~500K; feed must load in < 500ms (p99)',
                '<strong>Scale:</strong> Average user follows 300 people; celebrities have 100M+ followers',
              ],
            },
            { type: 'heading', level: 2, text: 'The Core Trade-off: Fan-out on Write vs Read', id: 'fan-out' },
            {
              type: 'comparison',
              left: {
                title: 'Fan-out on Write (Push)',
                color: '#6366f1',
                items: [
                  'On post: write to every follower\'s feed cache',
                  'Fast read — feed pre-computed in Redis',
                  'Slow write — 100M writes for celebrity post',
                  'Celebrity problem: impractical for >1M followers',
                  'Good for users with < 10K followers',
                ],
              },
              right: {
                title: 'Fan-out on Read (Pull)',
                color: '#22c55e',
                items: [
                  'On read: query recent posts from all followees',
                  'Slow read — N+1 queries at read time',
                  'Fast write — just one post write',
                  'Works for celebrities (avoid 100M writes)',
                  'Heavy read load; need aggressive caching',
                ],
              },
            },
            { type: 'heading', level: 2, text: 'Hybrid Approach (Twitter\'s Solution)', id: 'hybrid' },
            {
              type: 'paragraph',
              html: 'Twitter uses a <strong>hybrid</strong>: fan-out on write for regular users (≤ 1M followers); fan-out on read for celebrities. When a regular user loads their feed, their pre-computed cache is merged with recent posts from any celebrity they follow.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Feed Service — Hybrid Fan-out',
              code: `async function getFeed(userId: string, limit = 20): Promise<Post[]> {
  // 1. Get pre-built feed from Redis (regular users, fan-out-on-write)
  const cached = await redis.lrange(\`feed:\${userId}\`, 0, limit - 1);
  const feedPosts = cached.map(id => postCache.get(id)).filter(Boolean);

  // 2. Merge in recent celebrity posts (fan-out-on-read for celebs)
  const celebrities = await getCelebFollowees(userId); // followers > 1M
  const celebPosts = await Promise.all(
    celebrities.map(c => getRecentPosts(c.id, limit))
  );

  // 3. Rank and merge (recency + engagement score)
  const allPosts = [...feedPosts, ...celebPosts.flat()];
  return rankPosts(allPosts).slice(0, limit);
}`,
            },
          ],
        },

        {
          slug: 'design-notification-system',
          title: 'Design a Notification System',
          description:
            'Multi-channel notification delivery (push, email, SMS, in-app), retry logic, rate limiting, user preferences, and handling millions of notifications per second.',
          keywords: ['notification system', 'push notification', 'email', 'sms', 'apns', 'fcm', 'retry', 'rate limit'],
          difficulty: 'advanced',
          estimatedMinutes: 36,
          content: [
            { type: 'heading', level: 2, text: 'System Overview', id: 'overview' },
            {
              type: 'flow',
              steps: [
                { label: 'Event Source', desc: 'Services emit events (order placed, mention, follow)', color: '#6366f1' },
                { label: 'Notification Service', desc: 'Applies user preferences; deduplication; rate limiting', color: '#8b5cf6' },
                { label: 'Message Queue', desc: 'Kafka topics per channel (push/email/sms)', color: '#a855f7' },
                { label: 'Channel Workers', desc: 'Per-channel consumers call 3rd party APIs (FCM, SES, Twilio)', color: '#ec4899' },
                { label: 'Delivery Tracking', desc: 'Track sent/delivered/clicked; retry failed deliveries', color: '#22c55e' },
              ],
            },
            { type: 'heading', level: 2, text: 'Channels and Providers', id: 'channels' },
            {
              type: 'table',
              headers: ['Channel', 'Provider', 'Latency', 'Cost', 'Use Case'],
              rows: [
                ['Push (iOS)', 'APNs (Apple Push)', '< 1 sec', 'Free', 'Mobile app alerts'],
                ['Push (Android)', 'FCM (Firebase)', '< 1 sec', 'Free', 'Mobile app alerts'],
                ['Email', 'SES, SendGrid, Postmark', '1–60 sec', 'Low', 'Transactional, marketing'],
                ['SMS', 'Twilio, AWS SNS', '1–10 sec', 'High ($0.01/msg)', 'Auth codes, urgent alerts'],
                ['In-app', 'WebSocket / SSE', 'ms', 'Free', 'Real-time while app open'],
                ['Webhook', 'HTTP POST to customer URL', 'ms–sec', 'Low', 'B2B integrations'],
              ],
            },
            { type: 'heading', level: 2, text: 'Key Design Decisions', id: 'design-decisions' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>User preferences</strong> — store per-user channel + type preferences in a fast-read store (Redis or DynamoDB)',
                '<strong>Idempotency keys</strong> — deduplicate notifications; same event processed twice must not send twice',
                '<strong>Exponential backoff</strong> — retry failed deliveries: 1m → 5m → 15m → 1h → dead-letter',
                '<strong>Rate limiting</strong> — max N notifications per user per day per channel; prevents spam',
                '<strong>Priority queues</strong> — auth/security notifications bypass rate limits; marketing doesn\'t',
                '<strong>Template engine</strong> — personalise content with user name, order ID, etc.',
              ],
            },
          ],
        },

        {
          slug: 'design-chat-application',
          title: 'Design a Chat Application (WhatsApp)',
          description:
            'Real-time messaging architecture, message ordering, delivery receipts, offline message queuing, group chat fan-out, and end-to-end encryption design.',
          keywords: ['chat application', 'whatsapp', 'websocket', 'message ordering', 'delivery receipt', 'e2e encryption', 'group chat'],
          difficulty: 'advanced',
          estimatedMinutes: 42,
          content: [
            { type: 'heading', level: 2, text: 'Requirements', id: 'requirements' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Functional:</strong> 1:1 and group messaging (max 512 members); online presence; delivery/read receipts; media messages (images, video)',
                '<strong>Non-functional:</strong> 2B users; 100B messages/day; messages delivered in < 100ms; messages must never be lost',
              ],
            },
            { type: 'heading', level: 2, text: 'Core Architecture', id: 'architecture' },
            {
              type: 'flow',
              steps: [
                { label: 'Sender (WebSocket)', desc: 'Client sends message to chat server over persistent WebSocket', color: '#6366f1' },
                { label: 'Chat Server', desc: 'Assigns message ID (Snowflake); persists to DB; publishes to queue', color: '#8b5cf6' },
                { label: 'Message Queue', desc: 'Kafka fan-out to recipient\'s chat server(s); handles offline queuing', color: '#a855f7' },
                { label: 'Recipient Chat Server', desc: 'Push over WebSocket if online; else store in offline queue', color: '#ec4899' },
                { label: 'Receipt Propagation', desc: 'Delivered/read events flow back to sender the same way', color: '#22c55e' },
              ],
            },
            { type: 'heading', level: 2, text: 'Message Ordering', id: 'ordering' },
            {
              type: 'paragraph',
              html: 'Use a <strong>Snowflake ID</strong> (Twitter-style) for message IDs: 64-bit integer = 41-bit timestamp + 10-bit machine ID + 12-bit sequence. IDs are time-ordered, unique across servers, and reveal no sensitive information.',
            },
            { type: 'heading', level: 2, text: 'Group Chat Fan-out', id: 'group-chat' },
            {
              type: 'paragraph',
              html: 'For a group of 512 members, a single sent message becomes 511 delivery operations. Use a <strong>fan-out service</strong> that reads group membership and enqueues one delivery task per member. For large groups, batch deliveries and use async processing.',
            },
            {
              type: 'callout',
              variant: 'note',
              html: '<strong>End-to-End Encryption (E2EE):</strong> WhatsApp uses the Signal Protocol. Each device has a key pair; messages are encrypted with the recipient\'s public key on the sender\'s device. The server only ever sees ciphertext — it cannot read messages.',
            },
          ],
        },

        {
          slug: 'design-cloud-storage',
          title: 'Design a Cloud Storage Solution (Google Drive / Dropbox)',
          description:
            'File chunking, deduplication, versioning, sync protocol, conflict resolution, and sharing — designing a scalable cloud file storage system.',
          keywords: ['cloud storage', 'google drive', 'dropbox', 'file chunking', 'deduplication', 'sync', 'versioning'],
          difficulty: 'advanced',
          estimatedMinutes: 46,
          content: [
            { type: 'heading', level: 2, text: 'Requirements', id: 'requirements' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Functional:</strong> Upload/download files; sync across devices; share files/folders; version history',
                '<strong>Non-functional:</strong> 1B users; 10M daily active; max file size 50 GB; 99.99% availability; strong consistency for metadata',
              ],
            },
            { type: 'heading', level: 2, text: 'File Chunking', id: 'chunking' },
            {
              type: 'paragraph',
              html: 'Split files into <strong>4 MB chunks</strong>. Each chunk is hashed (SHA-256). Benefits: (1) resume interrupted uploads, (2) only upload changed chunks on edits, (3) deduplicate identical chunks across all users.',
            },
            {
              type: 'table',
              headers: ['Component', 'Technology', 'Role'],
              rows: [
                ['Metadata DB', 'PostgreSQL', 'Files, folders, chunks, versions, sharing permissions'],
                ['Chunk Storage', 'S3 + CDN', 'Store chunk bytes keyed by SHA-256 hash'],
                ['Block Service', 'Custom service', 'Chunk, hash, upload, deduplicate'],
                ['Sync Service', 'Long poll / WebSocket', 'Notify devices of remote changes'],
                ['Cache', 'Redis', 'Hot chunk metadata; delta calculation'],
              ],
            },
            { type: 'heading', level: 2, text: 'Deduplication', id: 'deduplication' },
            {
              type: 'paragraph',
              html: 'Before uploading a chunk, check if a chunk with that hash already exists in storage. If yes, just record the reference — don\'t upload the bytes. This is <strong>content-addressable storage</strong>. Dropbox reports 40–70% storage savings from cross-user deduplication.',
            },
            { type: 'heading', level: 2, text: 'Conflict Resolution', id: 'conflicts' },
            {
              type: 'paragraph',
              html: 'When two devices edit the same file offline, a conflict occurs. Strategy: <strong>last-writer-wins with conflict copy</strong> — accept both edits; create a "Conflicted copy" file so no data is lost; surface the conflict to the user.',
            },
          ],
        },

        {
          slug: 'design-video-sharing-platform',
          title: 'Design a Video Sharing Platform (YouTube)',
          description:
            'Video upload pipeline, transcoding, adaptive bitrate streaming, CDN architecture, recommendation system, and view count accuracy at billion-user scale.',
          keywords: ['youtube', 'video platform', 'transcoding', 'hls', 'cdn', 'adaptive bitrate', 'view count'],
          difficulty: 'advanced',
          estimatedMinutes: 51,
          content: [
            { type: 'heading', level: 2, text: 'Upload & Processing Pipeline', id: 'pipeline' },
            {
              type: 'flow',
              steps: [
                { label: 'Upload', desc: 'Raw video uploaded directly to S3 via presigned URL (bypass origin)', color: '#6366f1' },
                { label: 'Message Queue', desc: 'S3 event → SQS → transcoding workers', color: '#8b5cf6' },
                { label: 'Transcoding', desc: 'FFmpeg generates multiple renditions: 360p, 720p, 1080p, 4K + thumbnail', color: '#a855f7' },
                { label: 'Packaging', desc: 'Segment into HLS (.m3u8 + .ts chunks) and DASH manifests', color: '#ec4899' },
                { label: 'CDN Distribution', desc: 'Segments pushed to CloudFront edge PoPs worldwide', color: '#22c55e' },
              ],
            },
            { type: 'heading', level: 2, text: 'Adaptive Bitrate Streaming', id: 'hls' },
            {
              type: 'paragraph',
              html: '<strong>HLS</strong> (HTTP Live Streaming) divides video into 2–10 second segments at multiple quality levels. The player automatically switches quality based on available bandwidth — buffering smooth 360p is better than stalling on 1080p.',
            },
            { type: 'heading', level: 2, text: 'View Count at Scale', id: 'view-count' },
            {
              type: 'paragraph',
              html: 'YouTube processes <strong>500 hours of video every minute</strong>. View count accuracy at this scale requires careful design:',
            },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Redis counter</strong> — increment in Redis on each view event (fast, in-memory)',
                '<strong>Batch flush</strong> — periodically flush Redis counts to the database (e.g. every 60 seconds)',
                '<strong>Exactly-once deduplication</strong> — deduplicate repeat views from same user within 24h',
                '<strong>Lambda Architecture</strong> — real-time count (approx) + batch recount for accuracy',
              ],
            },
          ],
        },

        {
          slug: 'design-search-engine',
          title: 'Design a Search Engine (Google)',
          description:
            'Web crawling, inverted index construction, ranking with TF-IDF and PageRank, query processing pipeline, and building a distributed search at web scale.',
          keywords: ['search engine', 'google', 'inverted index', 'pagerank', 'tf-idf', 'web crawler', 'indexing'],
          difficulty: 'advanced',
          estimatedMinutes: 68,
          content: [
            { type: 'heading', level: 2, text: 'System Components', id: 'components' },
            {
              type: 'table',
              headers: ['Component', 'Role'],
              rows: [
                ['Web Crawler', 'Discover and download web pages (BFS from seed URLs)'],
                ['Link Extractor', 'Parse HTML; extract URLs; add to frontier queue'],
                ['Content Store', 'Store raw HTML pages (distributed file store)'],
                ['Indexer', 'Parse content; build inverted index; compute TF-IDF scores'],
                ['PageRank', 'Batch job: compute authority scores from link graph'],
                ['Query Processor', 'Parse query; lookup index; merge + rank results; return top K'],
                ['Cache', 'Cache results for popular queries (LFU eviction)'],
              ],
            },
            { type: 'heading', level: 2, text: 'Inverted Index', id: 'inverted-index' },
            {
              type: 'paragraph',
              html: 'An <strong>inverted index</strong> maps each word to a list of documents containing it (called a <em>posting list</em>). This is the core data structure that allows Google to search billions of pages in milliseconds.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Simplified Inverted Index Structure',
              code: `// inverted_index["system"] → [
//   { docId: "url1", tf: 0.05, positions: [12, 45] },
//   { docId: "url2", tf: 0.03, positions: [7]      },
// ]

// TF-IDF scoring:
// TF  = (term frequency in doc) / (total terms in doc)
// IDF = log(total docs / docs containing term)
// Score = TF * IDF — rare terms in relevant docs rank higher

function score(term: string, docId: string): number {
  const tf = termFrequency(term, docId);
  const idf = Math.log(totalDocs / docsContaining(term));
  const pageRank = getPageRank(docId);
  return tf * idf * Math.log(1 + pageRank); // Combine relevance + authority
}`,
            },
            { type: 'heading', level: 2, text: 'Web Crawler Design', id: 'crawler' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Frontier queue</strong> — priority queue of URLs to crawl (prioritise fresh/high-PageRank pages)',
                '<strong>Politeness</strong> — respect robots.txt; rate limit per domain (max 1 req/sec)',
                '<strong>DNS caching</strong> — cache DNS lookups to avoid per-URL resolution overhead',
                '<strong>Deduplication</strong> — URL fingerprint (simhash) to skip near-duplicate pages',
                '<strong>Distributed</strong> — consistent hash assigns URL ranges to crawler workers',
              ],
            },
          ],
        },

        {
          slug: 'design-ecommerce-platform',
          title: 'Design an E-Commerce Platform (Amazon)',
          description:
            'Product catalog, inventory management, order processing, payment integration, shopping cart, and flash-sale handling for a large e-commerce system.',
          keywords: ['ecommerce', 'amazon', 'inventory', 'order processing', 'shopping cart', 'product catalog'],
          difficulty: 'advanced',
          estimatedMinutes: 57,
          content: [
            { type: 'heading', level: 2, text: 'Core Services', id: 'services' },
            {
              type: 'table',
              headers: ['Service', 'Responsibility', 'Database'],
              rows: [
                ['Product Catalog', 'Browse, search, product details', 'Elasticsearch (search) + PostgreSQL (master data)'],
                ['Inventory', 'Stock levels, reservations, warehouse routing', 'PostgreSQL with row-level locking'],
                ['Cart', 'Add/remove items, apply coupons', 'Redis (fast, TTL-based cart expiry)'],
                ['Order', 'Order lifecycle (placed → paid → fulfilled → delivered)', 'PostgreSQL (ACID transactions)'],
                ['Payment', 'Charge, refund, fraud detection', 'PostgreSQL + Stripe/Adyen'],
                ['Notification', 'Order confirmation, shipping updates', 'Kafka + email/SMS workers'],
              ],
            },
            { type: 'heading', level: 2, text: 'Order Processing Flow', id: 'order-flow' },
            {
              type: 'flow',
              steps: [
                { label: 'Place Order', desc: 'Validate cart, reserve inventory (decrement stock with check)', color: '#6366f1' },
                { label: 'Process Payment', desc: 'Call payment gateway; handle 3DS; wait for webhook confirmation', color: '#8b5cf6' },
                { label: 'Confirm Order', desc: 'Payment webhook: transition order to CONFIRMED; release reserved stock', color: '#a855f7' },
                { label: 'Fulfillment', desc: 'Route to nearest warehouse; pick/pack/ship; generate tracking', color: '#ec4899' },
                { label: 'Delivery', desc: 'Carrier updates status via webhook; notify customer', color: '#22c55e' },
              ],
            },
            { type: 'heading', level: 2, text: 'Inventory Consistency', id: 'inventory' },
            {
              type: 'code',
              language: 'sql',
              title: 'Atomic Inventory Reservation',
              code: `-- Reserve stock atomically — prevents overselling
-- Only succeeds if stock >= requested quantity
UPDATE inventory
SET reserved = reserved + :qty,
    available = available - :qty
WHERE product_id = :productId
  AND available >= :qty  -- Constraint: don't go negative
RETURNING available;

-- available = 0 rows updated → out of stock, abort order
-- available > 0 → reservation successful`,
            },
          ],
        },

        {
          slug: 'design-ride-hailing-app',
          title: 'Design a Taxi Hailing App (Uber)',
          description:
            'Real-time driver location tracking, geospatial matching, ETA estimation, surge pricing, trip lifecycle, and handling millions of concurrent location updates.',
          keywords: ['uber', 'ride hailing', 'geospatial', 'location tracking', 'matching', 'surge pricing', 'eta'],
          difficulty: 'advanced',
          estimatedMinutes: 54,
          content: [
            { type: 'heading', level: 2, text: 'Core Challenges', id: 'challenges' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Location updates</strong> — drivers send GPS every 4 seconds; 1M drivers = 250K location updates/sec',
                '<strong>Geospatial queries</strong> — find all drivers within 5km of a rider in < 100ms',
                '<strong>Matching</strong> — optimally match rider to nearest available driver',
                '<strong>Real-time ETA</strong> — live traffic-aware routing; update ETA as driver moves',
              ],
            },
            { type: 'heading', level: 2, text: 'Location Tracking Architecture', id: 'location' },
            {
              type: 'code',
              language: 'typescript',
              title: 'Driver Location Update — Redis Geo Index',
              code: `// Driver app sends location every 4 seconds
app.post('/driver/location', async (req, res) => {
  const { driverId, lat, lng } = req.body;

  // Redis GEO commands provide geospatial indexing
  // Uses a sorted set with geohash as score
  await redis.geoadd('drivers:active', lng, lat, driverId);

  // Expire driver from index if no update in 30 seconds
  await redis.expire(\`driver:heartbeat:\${driverId}\`, 30);

  res.sendStatus(200);
});

// Rider requests a ride — find nearby drivers
async function findNearbyDrivers(riderLat: number, riderLng: number) {
  // GEORADIUS: find all drivers within 5km
  return redis.georadius(
    'drivers:active', riderLng, riderLat,
    5, 'km', 'WITHCOORD', 'WITHDIST', 'ASC', 'COUNT', 10
  );
}`,
            },
            { type: 'heading', level: 2, text: 'Matching Algorithm', id: 'matching' },
            {
              type: 'paragraph',
              html: 'Uber uses a matching engine that considers: <strong>proximity</strong>, <strong>driver rating</strong>, <strong>ETA to rider</strong>, and <strong>driver heading</strong> (a driver already moving towards you is preferred). The matching service batches requests every 500ms to find globally optimal assignments.',
            },
            { type: 'heading', level: 2, text: 'Surge Pricing', id: 'surge' },
            {
              type: 'paragraph',
              html: 'H3 hexagonal grid divides cities into cells. When the ratio of rider requests to available drivers in a cell exceeds a threshold, surge multiplier is applied. Surge data is precomputed every 30 seconds and cached in Redis — it\'s read-heavy and eventual consistency is acceptable.',
            },
          ],
        },

        {
          slug: 'design-collaborative-document-editor',
          title: 'Design a Collaborative Document Editor (Google Docs)',
          description:
            'Operational Transformation vs CRDTs, real-time conflict resolution, cursor synchronisation, offline editing, and building concurrent editing at Google Docs scale.',
          keywords: ['collaborative editing', 'google docs', 'operational transformation', 'crdt', 'conflict resolution', 'real-time sync'],
          difficulty: 'advanced',
          estimatedMinutes: 50,
          content: [
            { type: 'heading', level: 2, text: 'The Core Problem: Concurrent Edits', id: 'concurrent-edits' },
            {
              type: 'paragraph',
              html: 'When two users edit the same document simultaneously, their operations must be merged without data loss. If User A inserts "Hello" at position 0, and User B inserts "World" at position 0 at the same time, how should these be reconciled?',
            },
            { type: 'heading', level: 2, text: 'Operational Transformation (OT)', id: 'ot' },
            {
              type: 'paragraph',
              html: '<strong>OT</strong> (used by Google Docs) transforms each incoming operation based on operations that were applied first. If A inserted at position 0 first, B\'s position-0 insert is transformed to position 5 to account for A\'s characters.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Simplified OT Transform',
              code: `type Op = { type: 'insert' | 'delete'; pos: number; text?: string };

// Transform op2 assuming op1 was already applied
function transform(op1: Op, op2: Op): Op {
  if (op1.type === 'insert' && op2.type === 'insert') {
    // op1 inserted before op2's position — shift op2 right
    if (op1.pos <= op2.pos) {
      return { ...op2, pos: op2.pos + (op1.text?.length ?? 0) };
    }
  }
  if (op1.type === 'delete' && op2.type === 'insert') {
    // op1 deleted before op2's position — shift op2 left
    if (op1.pos < op2.pos) {
      return { ...op2, pos: op2.pos - 1 };
    }
  }
  return op2; // No transformation needed
}`,
            },
            { type: 'heading', level: 2, text: 'CRDTs — The Alternative', id: 'crdts' },
            {
              type: 'paragraph',
              html: '<strong>CRDTs</strong> (Conflict-free Replicated Data Types) are data structures that automatically merge concurrent operations without coordination. Used by Figma, Linear, and Notion. They work offline natively and don\'t require a central server to sequence operations.',
            },
            { type: 'heading', level: 2, text: 'System Architecture', id: 'architecture' },
            {
              type: 'table',
              headers: ['Component', 'Role'],
              rows: [
                ['WebSocket Server', 'Real-time bidirectional channel per document session'],
                ['OT/CRDT Engine', 'Transform and merge concurrent operations'],
                ['Document Store', 'PostgreSQL: full document snapshots every N ops'],
                ['Op Log', 'Append-only log of all operations (Redis Streams or Kafka)'],
                ['Presence Service', 'Track cursors and active users per document (Redis pub/sub)'],
                ['Revision History', 'Time-travel to any past version using op replay'],
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default category;
