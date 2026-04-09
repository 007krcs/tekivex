## What are Render Props?

A **render prop** is a technique where a component receives a function as a prop (or as `children`) and calls it to determine what to render. Instead of the component dictating the UI, the *consumer* controls rendering while the component manages the logic.

**Flow:**

1. **Logic Component** — Manages state and side effects
2. **Calls render(state)** — Passes current state to the function
3. **Consumer JSX** — Consumer decides what to render


## Example: Mouse Tracker

A classic example is a component that tracks the mouse position and lets the consumer decide how to display it.

<!-- title: MouseTracker.tsx -->
```typescript
import React, { useState, useEffect, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface MouseTrackerProps {
  render: (position: MousePosition) => React.ReactNode;
}

const MouseTracker: React.FC<MouseTrackerProps> = ({ render }) => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return <>{render(position)}</>;
};

export default MouseTracker;
```

### Using the MouseTracker

<!-- title: App.tsx -->
```typescript
// As a render prop
<MouseTracker
  render={({ x, y }) => (
    <div className="tooltip" style={{ left: x + 10, top: y + 10 }}>
      Cursor: {x}, {y}
    </div>
  )}
/>

// As children (function-as-child)
<MouseTracker>
  {({ x, y }) => (
    <svg width={800} height={600}>
      <circle cx={x} cy={y} r={20} fill="cyan" />
    </svg>
  )}
</MouseTracker>
```

## Render Props vs HOC

| Render Props | HOC |
| --- | --- |
| Dynamic: logic can change per render | Static: applied once at module level |
| Explicit data flow through function args | Implicit prop injection |
| No naming collisions on props | Possible naming collisions between HOCs |
| Can nest deeply (callback hell risk) | Stacks via function chaining |
| Runtime composition | Compile-time composition |

## Practical Use Case: Data Fetcher

<!-- title: DataFetcher.tsx -->
```typescript
interface DataFetcherProps<T> {
  url: string;
  children: (state: {
    data: T | null;
    loading: boolean;
    error: Error | null;
  }) => React.ReactNode;
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: T) => { setData(json); setLoading(false); })
      .catch((err: Error) => { setError(err); setLoading(false); });
  }, [url]);

  return <>{children({ data, loading, error })}</>;
}

// Usage
<DataFetcher<User[]> url="/api/users">
  {({ data, loading, error }) => {
    if (loading) return <Spinner />;
    if (error) return <Alert message={error.message} />;
    return <UserList users={data!} />;
  }}
</DataFetcher>
```

> **TIP:** Render props are still useful for headless UI libraries (like Downshift or React Aria) where the component owns the logic but gives full rendering control to the consumer.

> **NOTE:** In modern React, most render prop use cases can be replaced by custom hooks. Consider hooks first; use render props when you need to share **rendering context** (e.g., compound components, headless UI).

| Pattern | Composition Style | Best For |
| --- | --- | --- |
| HOC | Static (module-level wrapping) | Auth gates, analytics decorators |
| Render Props | Dynamic (per-render function) | Headless UI, data providers |
| Custom Hooks | Inline (call inside component) | Reusable stateful logic |
