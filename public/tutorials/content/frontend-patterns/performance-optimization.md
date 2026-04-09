## The React Rendering Pipeline

Understanding how React renders is key to optimizing performance. Every state change triggers a render, which calls your component function, produces a virtual DOM tree, diffs it against the previous tree (reconciliation), and commits the minimal set of real DOM updates.

**Flow:**

1. **State Change** — setState or context update
2. **Render Phase** — Call component functions, build vDOM
3. **Reconciliation** — Diff new vDOM vs previous vDOM
4. **Commit Phase** — Apply minimal DOM mutations


## React.memo: Prevent Unnecessary Re-renders

`React.memo` is a higher-order component that skips re-rendering when props have not changed (shallow comparison).

### Before: Re-renders on every parent update

<!-- title: BeforeMemo.tsx -->
```typescript
// This re-renders every time the parent renders,
// even if "items" hasn't changed
const ExpensiveList: React.FC<{ items: string[] }> = ({ items }) => {
  console.log('ExpensiveList rendered');
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
};
```

### After: Skips re-render when props unchanged

<!-- title: AfterMemo.tsx -->
```typescript
const ExpensiveList = React.memo<{ items: string[] }>(({ items }) => {
  console.log('ExpensiveList rendered');
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
});
```

## useMemo & useCallback

<!-- title: MemoizedValues.tsx -->
```typescript
const Dashboard: React.FC<{ data: SalesRecord[] }> = ({ data }) => {
  // useMemo: cache an expensive computation
  const summary = useMemo(() => {
    return {
      total: data.reduce((sum, r) => sum + r.amount, 0),
      average: data.reduce((sum, r) => sum + r.amount, 0) / data.length,
      topSeller: data.sort((a, b) => b.amount - a.amount)[0]?.name ?? 'N/A',
    };
  }, [data]);

  // useCallback: stabilize a function reference for child components
  const handleRowClick = useCallback((id: string) => {
    navigate(`/sales/${id}`);
  }, [navigate]);

  return (
    <div>
      <SummaryCard total={summary.total} average={summary.average} />
      <SalesTable data={data} onRowClick={handleRowClick} />
    </div>
  );
};
```

> **CAUTION:** **Do not memoize everything.** Memoization has a cost (memory + comparison). Only memoize when: (1) the computation is expensive, or (2) a stable reference is needed to prevent child re-renders via `React.memo`.

## Virtualization for Long Lists

Rendering thousands of DOM nodes causes jank. Virtualization renders only the visible items in the viewport plus a small overscan buffer.

<!-- title: VirtualList.tsx -->
```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

const VirtualList: React.FC<{ items: string[] }> = ({ items }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40, // estimated row height in px
    overscan: 5,
  });

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: 0,
              transform: `translateY(${virtualRow.start}px)`,
              height: `${virtualRow.size}px`,
              width: '100%',
            }}
          >
            {items[virtualRow.index]}
          </div>
        ))}
      </div>
    </div>
  );
};
```

## Code Splitting with React.lazy

<!-- title: LazyRoutes.tsx -->
```typescript
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Each route is a separate chunk
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

const App: React.FC = () => (
  <Suspense fallback={<PageSkeleton />}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </Suspense>
);
```

## Image Optimization

- Use `loading="lazy"` on images below the fold for native lazy loading.
- Serve modern formats (WebP, AVIF) with `<picture>` fallbacks.
- Use `srcset` and `sizes` to serve responsive images based on viewport.
- Set explicit `width` and `height` to prevent layout shift (CLS).
- Use a CDN with automatic image optimization (Cloudflare, Imgix, Next.js Image).

| Technique | What It Prevents | Effort |
| --- | --- | --- |
| React.memo | Unnecessary re-renders | Low |
| useMemo / useCallback | Expensive recomputation / ref instability | Low |
| Virtualization | DOM overload on long lists | Medium |
| Code splitting | Large initial bundle | Low |
| Image optimization | Slow LCP, high bandwidth | Low-Medium |

> **TIP:** **Measure first.** Use React DevTools Profiler and Chrome DevTools Performance panel to identify actual bottlenecks before optimizing. Premature optimization wastes time and can make code harder to maintain.
