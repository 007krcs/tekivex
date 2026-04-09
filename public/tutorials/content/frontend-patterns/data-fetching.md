## Data Fetching in React

Data fetching is one of the most common operations in web apps, yet it involves many concerns: **loading states**, **error handling**, **caching**, **deduplication**, **refetching**, and **optimistic updates**. Different approaches handle these at different levels of abstraction.

**Flow:**

1. **Component Mounts** — Trigger data fetch
2. **Loading State** — Show spinner/skeleton
3. **Fetch Resolves** — Receive data or error
4. **Render Data** — Display content or error UI


## Pattern 1: useEffect + fetch

The simplest approach, but you must manually handle loading, errors, cleanup (abort), and race conditions.

<!-- title: UseEffectFetch.tsx -->
```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`/api/users/${userId}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<User>;
      })
      .then((data) => { setUser(data); setLoading(false); })
      .catch((err: Error) => {
        if (err.name !== 'AbortError') {
          setError(err);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [userId]);

  if (loading) return <Skeleton />;
  if (error) return <ErrorBanner message={error.message} />;
  return <div>{user!.name} &mdash; {user!.email}</div>;
};
```

## Pattern 2: TanStack Query (React Query)

TanStack Query handles caching, background refetching, stale-while-revalidate, pagination, and optimistic updates out of the box.

<!-- title: ReactQueryExample.tsx -->
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch
const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: async (): Promise<User> => {
      const res = await fetch(`/api/users/${userId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorBanner message={(error as Error).message} />;
  return <div>{user!.name}</div>;
};

// Mutation with cache invalidation
const UpdateUser: React.FC<{ userId: number }> = ({ userId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updates: Partial<User>) =>
      fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      }).then((r) => r.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
    },
  });

  return (
    <button onClick={() => mutation.mutate({ name: 'Updated' })}>
      {mutation.isPending ? 'Saving...' : 'Update Name'}
    </button>
  );
};
```

## Stale-While-Revalidate Pattern

**Flow:**

1. **1. Cache Hit** — Return stale data instantly
2. **2. Revalidate** — Fetch fresh data in background
3. **3. Update** — Replace stale data when fresh arrives


This pattern delivers **instant perceived performance** by showing cached data while transparently updating in the background. Both SWR and TanStack Query implement this.

## Pattern 3: SWR

<!-- title: SWRExample.tsx -->
```typescript
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
  const { data, error, isLoading } = useSWR<User>(
    `/api/users/${userId}`,
    fetcher,
    { revalidateOnFocus: true, dedupingInterval: 2000 }
  );

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorBanner message="Failed to load user" />;
  return <div>{data!.name}</div>;
};
```

## Server State vs Client State

| Server State | Client State |
| --- | --- |
| Data owned by the server (DB rows, API responses) | Data owned by the browser (UI state) |
| Can become stale or out-of-date | Always in sync with the UI |
| Needs caching, refetching, invalidation | No server round-trip needed |
| Best managed by TanStack Query / SWR | Best managed by useState / Zustand |
| Examples: user profiles, product lists, comments | Examples: modal open/close, form input, theme |

## Comparison Table

| Feature | useEffect + fetch | TanStack Query | SWR |
| --- | --- | --- | --- |
| Cache | Manual | Built-in (configurable) | Built-in |
| Deduplication | None | Automatic | Automatic |
| Background refetch | Manual | Built-in | Built-in |
| Optimistic updates | Manual | Built-in | Built-in |
| Pagination | Manual | useInfiniteQuery | useSWRInfinite |
| DevTools | None | TanStack DevTools | SWR DevTools |
| Bundle size | 0 KB | ~13 KB | ~4 KB |

> **TIP:** **Recommendation:** For any app making more than a handful of API calls, adopt TanStack Query or SWR. The amount of boilerplate, edge-case handling, and caching logic they eliminate is substantial.

> **NOTE:** With React Server Components (RSC), data fetching moves to the server. The patterns above apply to client-side fetching. RSC data fetching uses `async/await` directly in the component body.
