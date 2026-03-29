// ─── SEO Config — per-route metadata map ─────────────────────────────────
import { type SeoConfig, seoFromManifest } from './useSeo';
import { getProduct } from './registry';

const BASE_URL = 'https://nexaforge.dev';

const HOME_SEO: SeoConfig = {
  title: 'NexaForge — Enterprise Software, Engineered to Scale',
  description:
    'NexaForge builds enterprise-grade developer tools: GridStorm (open-source data grid), ' +
    'PDF Toolkit (WASM PDF processing), NexaRecruit (ATS), and NexaCare (healthcare platform).',
  keywords: [
    'enterprise software platform',
    'developer tools',
    'data grid',
    'PDF toolkit',
    'ATS software',
    'NexaForge',
    'open source enterprise',
  ],
  canonical: BASE_URL,
  ogTitle: 'NexaForge — Enterprise Software, Engineered to Scale',
  ogDescription:
    'Open-source and enterprise developer tools built to production quality. ' +
    'GridStorm, PDF Toolkit, NexaRecruit, NexaCare, and more.',
  ogImage: `${BASE_URL}/og-nexaforge.png`,
  ogType: 'website',
  twitterTitle: 'NexaForge — Enterprise Software, Engineered to Scale',
  twitterDescription:
    'GridStorm data grid, WASM PDF Toolkit, ATS, and healthcare platform — one engineering team.',
  twitterImage: `${BASE_URL}/og-nexaforge.png`,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NexaForge',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    description:
      'NexaForge builds enterprise-grade developer tools including GridStorm, PDF Toolkit, NexaRecruit, and NexaCare.',
    sameAs: ['https://github.com/007krcs/grid-data'],
    foundingDate: '2024',
    knowsAbout: ['Data Grids', 'PDF Processing', 'Healthcare Software', 'Applicant Tracking Systems'],
  },
};

const PRODUCTS_SEO: SeoConfig = {
  title: 'All Products — NexaForge Platform',
  description:
    'Explore all NexaForge products: GridStorm enterprise data grid, WASM PDF Toolkit, ' +
    'NexaRecruit ATS, NexaCare healthcare platform, Analytics Studio, and DataFlow.',
  keywords: [
    'NexaForge products', 'enterprise software suite', 'GridStorm',
    'PDF Toolkit', 'NexaRecruit', 'NexaCare', 'product catalog',
  ],
  canonical: `${BASE_URL}/products`,
  ogTitle: 'All Products — NexaForge Platform',
  ogDescription:
    'Enterprise software suite: data grids, PDF processing, ATS, healthcare, analytics, and streaming.',
  ogImage: `${BASE_URL}/og-nexaforge.png`,
  ogType: 'website',
  twitterTitle: 'NexaForge Product Suite',
  twitterDescription:
    'GridStorm, PDF Toolkit, NexaRecruit, NexaCare — enterprise tools for every team.',
  twitterImage: `${BASE_URL}/og-nexaforge.png`,
  jsonLd: null,
};

export function getSeoForRoute(route: string): SeoConfig {
  if (route === '/' || route === '' || route === '/products') {
    return route === '/products' ? PRODUCTS_SEO : HOME_SEO;
  }

  if (route.startsWith('/product/')) {
    const id = route.slice('/product/'.length).split('/')[0];
    const product = id ? getProduct(id) : undefined;
    if (product?.seo) return seoFromManifest(product.seo, BASE_URL, route);
    if (product) {
      return {
        title: `${product.name} — NexaForge`,
        description: product.description,
        keywords: product.tags,
        canonical: `${BASE_URL}${route}`,
        ogTitle: `${product.name} — NexaForge`,
        ogDescription: product.description,
        ogImage: `${BASE_URL}/og-nexaforge.png`,
        ogType: 'website',
        jsonLd: null,
      };
    }
  }

  return HOME_SEO;
}
