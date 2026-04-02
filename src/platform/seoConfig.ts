// ─── SEO Config — per-route metadata map ─────────────────────────────────
import { type SeoConfig, seoFromManifest } from './useSeo';
import { getProduct } from './registry';

const BASE_URL = 'https://tekivex.com';

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
    'GridStorm data grid, Analytics Studio, WASM PDF Toolkit, DataFlow streaming — one engineering team.',
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
    foundingDate: '2025',
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
    'GridStorm, Analytics Studio, PDF Toolkit, DataFlow — enterprise tools for every team.',
  twitterImage: `${BASE_URL}/og-tekivex.png`,
  jsonLd: null,
};

const ABOUT_SEO: SeoConfig = {
  title: 'About Us — Tekivex',
  description:
    'Tekivex is an independent developer tools company building open-source enterprise software — ' +
    'GridStorm data grid, Analytics Studio, PDF Toolkit, and DataFlow streaming engine. All MIT-licensed.',
  keywords: [
    'about Tekivex', 'Tekivex company', 'open-source developer tools', 'GridStorm team',
    'enterprise software company', 'MIT licensed tools', 'TypeScript developer tools',
  ],
  canonical: `${BASE_URL}/about`,
  ogTitle: 'About Tekivex — Enterprise Software, Crafted with Skill',
  ogDescription:
    'We build open-source enterprise developer tools. 4 products, 57 packages, 1,899+ tests, MIT license.',
  ogImage: `${BASE_URL}/og-tekivex.png`,
  ogType: 'website',
  twitterTitle: 'About Tekivex',
  twitterDescription:
    'The team behind GridStorm, Analytics Studio, PDF Toolkit, and DataFlow — all MIT-licensed.',
  twitterImage: `${BASE_URL}/og-tekivex.png`,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tekivex',
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.svg`,
    description:
      'Tekivex builds enterprise-grade developer tools: GridStorm data grid, Analytics Studio, PDF Toolkit, and DataFlow.',
    foundingDate: '2025',
    sameAs: [
      'https://github.com/007krcs/tekivex',
      'https://github.com/007krcs/grid-data',
      'https://github.com/007krcs/analytics-builder',
      'https://github.com/007krcs/dataflow',
    ],
    knowsAbout: ['Data Grids', 'PDF Processing', 'Business Intelligence', 'Real-time Streaming', 'TypeScript'],
  },
};

export function getSeoForRoute(route: string): SeoConfig {
  if (route === '/' || route === '' || route === '/products') {
    return route === '/products' ? PRODUCTS_SEO : HOME_SEO;
  }

  if (route === '/about') {
    return ABOUT_SEO;
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
