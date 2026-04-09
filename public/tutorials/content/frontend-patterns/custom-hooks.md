## Why Custom Hooks?

Custom hooks let you extract component logic into reusable functions. Any function whose name starts with `use` and calls other hooks is a custom hook. They share **stateful logic**, not state itself &mdash; each component using the hook gets its own independent state.

**Flow:**

1. **Component A** — Calls useCustomHook()
2. **Custom Hook** — Encapsulates shared logic + state
3. **Component B** — Calls same useCustomHook()


## Example: useLocalStorage

Persists state to `localStorage` and keeps it synchronized across component re-renders.

<!-- title: useLocalStorage.ts -->
```typescript
import { useState, useCallback } from 'react';

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value;
        window.localStorage.setItem(key, JSON.stringify(nextValue));
        return nextValue;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}

export default useLocalStorage;

// Usage
const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
```

## Example: useDebounce

<!-- title: useDebounce.ts -->
```typescript
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}

export default useDebounce;

// Usage: debounce a search input
const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) fetchResults(debouncedQuery);
  }, [debouncedQuery]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
};
```

## Example: useFetch

<!-- title: useFetch.ts -->
```typescript
import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: Error) => {
        if (err.name !== 'AbortError') {
          setState({ data: null, loading: false, error: err });
        }
      });

    return () => controller.abort();
  }, [url]);

  return state;
}

export default useFetch;
```

## Rules of Hooks

> **CAUTION:** **Rules of Hooks (enforced by eslint-plugin-react-hooks):**
> 1. Only call hooks at the **top level** &mdash; never inside loops, conditions, or nested functions.
> 2. Only call hooks from **React function components** or other **custom hooks**.
> 3. Name custom hooks starting with `use` so React can verify rule compliance.

| Allowed | Not Allowed |
| --- | --- |
| const val = useMyHook() | if (cond) { useMyHook() } |
| function useMyHook() { useState() } | for (item of list) { useState() } |
| Called at component top level | Called inside a callback / event handler |

## Composing Hooks Together

Custom hooks can call other custom hooks. This is their greatest strength &mdash; you can build complex behavior from small, testable pieces.

<!-- title: useDebouncedFetch.ts -->
```typescript
function useDebouncedFetch<T>(url: string, delayMs = 300): FetchState<T> {
  const debouncedUrl = useDebounce(url, delayMs);
  return useFetch<T>(debouncedUrl);
}

// Composed from useDebounce + useFetch
const SearchResults: React.FC<{ query: string }> = ({ query }) => {
  const { data, loading, error } = useDebouncedFetch<Result[]>(
    `/api/search?q=${query}`
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorBanner error={error} />;
  return <ResultList items={data ?? []} />;
};
```

> **TIP:** **Testing custom hooks:** Use `renderHook` from `@testing-library/react` to test hooks in isolation without a UI wrapper component.
