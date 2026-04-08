import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'tx-tutorial-progress';

export function useProgress() {
  const [visited, setVisited] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored) as string[]) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const markVisited = useCallback((categoryId: string, slug: string) => {
    const key = `${categoryId}/${slug}`;
    setVisited(prev => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...visited]));
    } catch { /* quota exceeded — ignore */ }
  }, [visited]);

  return { visited, markVisited };
}
