// Analytics Studio has been promoted to Beta and moved to manifest-analytics-studio.ts

import type { ProductManifest } from '../platform/types';

export const dataFlowManifest: ProductManifest = {
  id: 'dataflow',
  name: 'DataFlow',
  tagline: 'Real-Time Streaming Data Platform',
  description:
    'Connect live data feeds (WebSocket, SSE, Kafka) directly to GridStorm grids. ' +
    'Batched processing, cell change tracking, anomaly alerting, and backpressure control.',
  version: '0.3.0',
  status: 'coming-soon',
  tier: 'platform',
  color: '#22c55e',
  accentColor: 'rgba(34, 197, 94, 0.1)',
  iconName: 'trending-up',
  homePath: '/product/dataflow',
  docsRoot: null,
  primaryDemoPath: null,
  stats: [
    { value: 'Q4 2026', label: 'Target GA' },
    { value: '5+',      label: 'Adapters' },
    { value: '<10ms',   label: 'Update latency' },
    { value: 'Kafka',   label: 'Ready' },
  ],
  keyFeatures: [
    'WebSocket / SSE / Kafka / HTTP polling adapters',
    'Batched cell updates at configurable fps',
    'Cell change direction tracking (↑↓)',
    'Anomaly alerting with threshold rules',
    'Backpressure control — no UI jank',
  ],
  quickLinks: [],
  tags: ['Coming Soon', 'Streaming', 'Real-time', 'WebSocket', 'Kafka'],
  seo: {
    title: 'DataFlow — Real-Time Streaming Data Platform | Tekivex',
    description:
      'Connect live data feeds via WebSocket, SSE, and Kafka directly to GridStorm grids. ' +
      'Sub-10ms update latency, anomaly alerting, and backpressure control.',
    keywords: [
      'real-time data streaming',
      'WebSocket data grid',
      'Kafka dashboard',
      'live data visualization',
      'SSE streaming platform',
      'real-time analytics grid',
      'streaming data software',
      'DataFlow Tekivex',
    ],
    ogImage: '/og-dataflow.png',
    jsonLdType: 'SoftwareApplication',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
  },
};
