## Four Rendering Strategies

Modern web frameworks offer multiple rendering strategies. Each trades off between **performance**, **SEO**, **data freshness**, and **infrastructure cost**. Understanding these trade-offs is essential for choosing the right approach per page.

## CSR: Client-Side Rendering

**Flow:**

1. **Browser Request** — GET /dashboard
2. **Empty HTML** — Server sends shell with <div id="root">
3. **JS Download** — Browser downloads JS bundle
4. **Client Render** — React hydrates and renders UI
5. **Data Fetch** — API calls after mount


CSR is the default for Vite and Create React App. The server sends minimal HTML; all rendering happens in the browser after JavaScript loads.

## SSR: Server-Side Rendering

**Flow:**

1. **Browser Request** — GET /products
2. **Server Renders** — Fetch data + render HTML on server
3. **Full HTML** — Send complete HTML to browser
4. **Hydration** — React attaches event handlers


<!-- title: page.tsx (Next.js App Router - SSR) -->
```typescript
// Server Component - runs on every request
export default async function ProductsPage() {
  // Data is fetched on the server
  const products = await db.products.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return (
    <main>
      <h1>Products</h1>
      <ProductGrid products={products} />
    </main>
  );
}
```

## SSG: Static Site Generation

**Flow:**

1. **Build Time** — Fetch data + render HTML at build
2. **Static Files** — HTML, CSS, JS deployed to CDN
3. **Browser Request** — CDN serves pre-built HTML instantly


<!-- title: page.tsx (Next.js App Router - SSG) -->
```typescript
// This page is statically generated at build time
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}

// Generate static pages for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

## ISR: Incremental Static Regeneration

**Flow:**

1. **Build Time** — Generate initial static pages
2. **Request (cache hit)** — Serve cached page instantly
3. **Revalidation** — Regenerate page in background after TTL
4. **Next Request** — Serve updated page


<!-- title: page.tsx (Next.js App Router - ISR) -->
```typescript
// Revalidate every 60 seconds
export const revalidate = 60;

export default async function PricingPage() {
  const plans = await fetchPricingPlans();
  return (
    <main>
      <h1>Pricing</h1>
      <PricingGrid plans={plans} />
    </main>
  );
}
```

## Comparison Table

| Aspect | CSR | SSR | SSG | ISR |
| --- | --- | --- | --- | --- |
| Initial Load | Slow (blank → JS → render) | Fast (full HTML) | Fastest (CDN-cached) | Fastest (CDN-cached) |
| SEO | Poor (empty HTML) | Excellent | Excellent | Excellent |
| Data Freshness | Real-time (client fetches) | Per-request | Build-time (stale) | TTL-based |
| Server Cost | None (static host) | High (per-request compute) | None (CDN only) | Low (background regen) |
| TTFB | Fast (small HTML) | Slower (server compute) | Fastest | Fastest |
| Time to Interactive | Slow (large JS bundle) | Medium (hydration) | Fast | Fast |

## When to Use Which

- **CSR:** Dashboards, admin panels, apps behind login (no SEO needed).
- **SSR:** E-commerce product pages, social feeds (SEO + fresh data per request).
- **SSG:** Blogs, docs, marketing pages (content changes infrequently).
- **ISR:** Product catalogs, news sites (SEO + periodic freshness without full rebuild).

> **TIP:** Modern frameworks like Next.js let you mix strategies **per page**. Use SSG for your landing page, SSR for product pages, CSR for the admin dashboard, and ISR for the blog — all in one app.

> **NOTE:** **React Server Components (RSC)** add a fifth dimension: components that run exclusively on the server, sending serialized output (not HTML) to the client. RSC reduces client JS by keeping data-fetching and heavy logic server-side while remaining interactive through client components.
