// Analytics Studio has been promoted to Beta and moved to manifest-analytics-studio.ts

import type { ProductManifest } from '../platform/types';

const ANALYTICS_DEMO_URL = 'https://analytics-builder-demo.vercel.app';
const ANALYTICS_GITHUB   = 'https://github.com/007krcs/analytics-builder';

export const dataFlowManifest: ProductManifest = {
  id: 'dataflow',
  name: 'DataFlow',
  tagline: 'Real-Time Streaming Data Platform',
  description:
    'Connect live data feeds (WebSocket, SSE, Kafka) directly to GridStorm grids. ' +
    'Batched processing, cell change tracking, anomaly alerting, and backpressure control. ' +
    'The streaming plugin ships inside Analytics Studio — try it live in the demo.',
  version: '0.3.0',
  status: 'preview',
  tier: 'platform',
  color: '#22c55e',
  accentColor: 'rgba(34, 197, 94, 0.1)',
  iconName: 'trending-up',
  homePath: '/product/dataflow',
  docsRoot: `${ANALYTICS_GITHUB}#readme`,
  primaryDemoPath: `${ANALYTICS_DEMO_URL}`,
  githubUrl: ANALYTICS_GITHUB,
  stats: [
    { value: 'Preview',  label: 'Status' },
    { value: '5+',       label: 'Adapters' },
    { value: '<10ms',    label: 'Update latency' },
    { value: 'Kafka',    label: 'Ready' },
  ],
  keyFeatures: [
    'WebSocket / SSE / Kafka / HTTP polling adapters',
    'Batched cell updates at configurable fps — no UI jank',
    'Cell change direction tracking (↑↓) with colour flash',
    'Anomaly alerting with Z-score + IQR threshold rules',
    'Backpressure control — drops frames, never the UI thread',
    'Ships as plugin-streaming inside Analytics Studio',
  ],
  quickLinks: [
    { label: 'See Streaming Demo', path: ANALYTICS_DEMO_URL,  external: true, isNew: true },
    { label: 'GitHub (plugin-streaming)', path: `${ANALYTICS_GITHUB}/tree/main/packages/plugin-streaming`, external: true },
    { label: 'Analytics Studio',  path: '/product/analytics-studio' },
  ],
  tags: ['Preview', 'Streaming', 'Real-time', 'WebSocket', 'Kafka', 'GridStorm'],
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
