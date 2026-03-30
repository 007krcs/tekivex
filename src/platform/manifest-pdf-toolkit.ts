import type { ProductManifest } from '../platform/types';

export const pdfToolkitManifest: ProductManifest = {
  id: 'pdf-toolkit',
  name: 'PDF Toolkit',
  tagline: 'WASM-Powered PDF Processing',
  githubUrl: 'https://github.com/007krcs/analytics-builder',
  description:
    'Rust-compiled WASM PDF renderer with GPU-accelerated canvas output. ' +
    '13 annotation types, smart form auto-fill, PII detection and masking, ' +
    'digital signatures, AES-256 encryption, and AI-powered intelligence.',
  version: '0.1.2',
  status: 'beta',
  tier: 'enterprise',
  color: '#ef4444',
  accentColor: 'rgba(239, 68, 68, 0.1)',
  iconName: 'file-pdf',
  homePath: '/product/pdf-toolkit',
  docsRoot: 'https://grid-data-analytics-explorer.vercel.app/#/docs/guides/pdf-toolkit',
  primaryDemoPath: 'https://grid-data-analytics-explorer.vercel.app/pdf-viewer/',
  stats: [
    { value: '13',    label: 'Annotation types' },
    { value: '6',     label: 'PDF plugins' },
    { value: 'WASM',  label: 'Rust renderer' },
    { value: 'AES-256', label: 'Encryption' },
  ],
  keyFeatures: [
    'Rust/WASM renderer — no JS PDF libs',
    'Smart form auto-fill with data binding',
    'PII detection and GDPR-compliant masking',
    'Digital signatures with certificate validation',
    'AI text extraction and semantic analysis',
    'AES-256 encryption / password protection',
  ],
  quickLinks: [
    { label: 'View Demo',        path: 'https://grid-data-analytics-explorer.vercel.app/pdf-viewer/', external: true },
    { label: 'PDF Toolkit Docs', path: 'https://grid-data-analytics-explorer.vercel.app/#/docs/guides/pdf-toolkit', external: true },
    { label: 'Form Fill Guide',  path: 'https://grid-data-analytics-explorer.vercel.app/#/docs/guides/pdf-toolkit', external: true },
  ],
  tags: ['WASM', 'Rust', 'Enterprise', 'PDF', 'PII', 'Encryption', 'Digital Signatures'],
  seo: {
    title: 'PDF Toolkit — WASM-Powered PDF Processing | Tekivex',
    description:
      'Rust/WASM PDF toolkit with 13 annotation types, smart form auto-fill, ' +
      'PII detection, digital signatures, and AES-256 encryption. Enterprise-grade.',
    keywords: [
      'WASM PDF viewer',
      'PDF annotation library',
      'JavaScript PDF toolkit',
      'PDF digital signatures',
      'PII detection PDF',
      'AES-256 PDF encryption',
      'browser PDF editor',
      'Rust WASM PDF renderer',
      'PDF Toolkit Tekivex',
    ],
    ogImage: '/og-pdf-toolkit.png',
    jsonLdType: 'SoftwareApplication',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
  },
};
