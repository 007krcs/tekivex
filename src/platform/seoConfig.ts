// ─── SEO Config — per-route metadata map ─────────────────────────────────
import { type SeoConfig, seoFromManifest } from './useSeo';
import { getProduct } from './registry';

const BASE_URL = 'https://tekivex.dev';

const HOME_SEO: SeoConfig = {
  title: 'Tekivex — Enterprise Software, Crafted with Skill',
  description:
    'Tekivex builds enterprise-grade developer tools: GridStorm (open-source data grid), ' +
    'PDF Toolkit (WASM PDF processing), NexaRecruit (ATS), and NexaCare (healthcare platform).',
  keywords: [
    'enterprise software platform',
    'developer tools',
    'data grid',
    'PDF toolkit',
    'ATS software',
    'Tekivex',
    'open source enterprise',
    'GridStorm',
  ],
  canonical: BASE_URL,
  ogTitle: 'Tekivex — Enterprise Software, Crafted with Skill',
  ogDescription:
    'Open-source and enterprise developer tools built to production quality. ' +
    'GridStorm, PDF Toolkit, NexaRecruit, NexaCare, and more.',
  ogImage: `${BASE_URL}/og-tekivex.png`,
  ogType: 'website',
  twitterTitle: 'Tekivex — Enterprise Software, Crafted with Skill',
  twitterDescription:
    'GridStorm data grid, WASM PDF Toolkit, ATS, and healthcare platform — one engineering team.',
  twitterImage: `${BASE_URL}/og-tekivex.png`,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tekivex',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    description:
      'Tekivex builds enterprise-grade developer tools including GridStorm, PDF Toolkit, NexaRecruit, and NexaCare.',
    sameAs: ['https://github.com/007krcs/tekivex'],
    foundingDate: '2024',
    knowsAbout: ['Data Grids', 'PDF Processing', 'Healthcare Software', 'Applicant Tracking Systems'],
  },
};

const PRODUCTS_SEO: SeoConfig = {
  title: 'All Products — Tekivex Platform',
  description:
    'Explore all Tekivex products: GridStorm enterprise data grid, WASM PDF Toolkit, ' +
    'NexaRecruit ATS, NexaCare healthcare platform, Analytics Studio, and DataFlow.',
  keywords: [
    'Tekivex products', 'enterprise software suite', 'GridStorm',
    'PDF Toolkit', 'NexaRecruit', 'NexaCare', 'product catalog',
  ],
  canonical: `${BASE_URL}/products`,
  ogTitle: 'All Products — Tekivex Platform',
  ogDescription:
    'Enterprise software suite: data grids, PDF processing, ATS, healthcare, analytics, and streaming.',
  ogImage: `${BASE_URL}/og-tekivex.png`,
  ogType: 'website',
  twitterTitle: 'Tekivex Product Suite',
  twitterDescription:
    'GridStorm, PDF Toolkit, NexaRecruit, NexaCare — enterprise tools for every team.',
  twitterImage: `${BASE_URL}/og-tekivex.png`,
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
        title: `${product.name} — Tekivex`,
        description: product.description,
        keywords: product.tags,
        canonical: `${BASE_URL}${route}`,
        ogTitle: `${product.name} — Tekivex`,
        ogDescription: product.description,
        ogImage: `${BASE_URL}/og-tekivex.png`,
        ogType: 'website',
        jsonLd: null,
      };
    }
  }

  return HOME_SEO;
}
