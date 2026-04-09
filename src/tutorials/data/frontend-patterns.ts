import type { TutorialCategory } from '../types';

const category: TutorialCategory = {
  id: 'frontend-patterns',
  title: 'Frontend Patterns',
  icon: 'layout',
  color: '#06b6d4',
  description: 'Component patterns, state management, performance optimization, and testing strategies.',
  sections: [
    // ────────────────────────────────────────────
    // Section: Component Patterns
    // ────────────────────────────────────────────
    {
      title: 'Component Patterns',
      topics: [
        // ── 1. Higher-Order Components ──
        {
          slug: 'higher-order-components',
          title: 'Higher-Order Components',
          description: 'HOC pattern: wrapping components to add cross-cutting behavior like auth, logging, and theming.',
          keywords: ['hoc', 'higher-order component', 'wrapper', 'reuse', 'composition', 'react'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          prerequisites: ['custom-hooks'],
          contentFile: 'frontend-patterns/higher-order-components.md',
        },

        // ── 2. Render Props ──
        {
          slug: 'render-props',
          title: 'Render Props',
          description: 'Sharing component logic via render functions for maximum flexibility.',
          keywords: ['render props', 'function as child', 'facc', 'inversion of control', 'react'],
          difficulty: 'intermediate',
          estimatedMinutes: 12,
          prerequisites: ['higher-order-components'],
          contentFile: 'frontend-patterns/render-props.md',
        },

        // ── 3. Custom Hooks ──
        {
          slug: 'custom-hooks',
          title: 'Custom Hooks',
          description: 'Extracting and sharing reusable stateful logic across components with custom hooks.',
          keywords: ['hooks', 'custom hooks', 'useLocalStorage', 'useDebounce', 'useFetch', 'react'],
          difficulty: 'beginner',
          estimatedMinutes: 16,
          contentFile: 'frontend-patterns/custom-hooks.md',
        },

        // ── 4. Compound Components ──
        {
          slug: 'compound-components',
          title: 'Compound Components',
          description: 'Implicit state sharing between parent and child components for expressive, flexible APIs.',
          keywords: ['compound components', 'implicit state', 'context', 'select', 'tabs', 'accordion', 'react'],
          difficulty: 'advanced',
          estimatedMinutes: 14,
          prerequisites: ['custom-hooks'],
          contentFile: 'frontend-patterns/compound-components.md',
        },
      ],
    },

    // ────────────────────────────────────────────
    // Section: State & Data
    // ────────────────────────────────────────────
    {
      title: 'State & Data',
      topics: [
        // ── 5. State Management ──
        {
          slug: 'state-management',
          title: 'State Management',
          description: 'Choosing the right state management approach: local state, Context, reducers, and external stores.',
          keywords: ['state', 'useState', 'useReducer', 'context', 'zustand', 'redux', 'react'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          contentFile: 'frontend-patterns/state-management.md',
        },

        // ── 6. Data Fetching ──
        {
          slug: 'data-fetching',
          title: 'Data Fetching Patterns',
          description: 'Fetching data with useEffect, SWR, React Query, and Suspense patterns.',
          keywords: ['fetch', 'swr', 'react query', 'tanstack query', 'suspense', 'data fetching', 'cache'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          prerequisites: ['state-management'],
          contentFile: 'frontend-patterns/data-fetching.md',
        },
      ],
    },

    // ────────────────────────────────────────────
    // Section: Performance
    // ────────────────────────────────────────────
    {
      title: 'Performance',
      topics: [
        // ── 7. Performance Optimization ──
        {
          slug: 'performance-optimization',
          title: 'Performance Optimization',
          description: 'React.memo, useMemo, useCallback, virtualization, code splitting, and image optimization.',
          keywords: ['performance', 'memo', 'useMemo', 'useCallback', 'virtualization', 'lazy', 'code splitting'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          contentFile: 'frontend-patterns/performance-optimization.md',
        },

        // ── 8. Rendering Patterns ──
        {
          slug: 'rendering-patterns',
          title: 'Rendering Patterns',
          description: 'CSR, SSR, SSG, and ISR: how each rendering strategy works and when to use them.',
          keywords: ['csr', 'ssr', 'ssg', 'isr', 'rendering', 'next.js', 'server-side', 'static'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          contentFile: 'frontend-patterns/rendering-patterns.md',
        },
      ],
    },

    // ────────────────────────────────────────────
    // Section: Quality
    // ────────────────────────────────────────────
    {
      title: 'Quality',
      topics: [
        // ── 9. Testing Strategies ──
        {
          slug: 'testing-strategies',
          title: 'Testing Strategies',
          description: 'Unit, integration, and end-to-end testing for React applications with practical examples.',
          keywords: ['testing', 'unit test', 'integration test', 'e2e', 'vitest', 'jest', 'react testing library', 'playwright'],
          difficulty: 'intermediate',
          estimatedMinutes: 18,
          contentFile: 'frontend-patterns/testing-strategies.md',
        },

        // ── 10. Error Handling ──
        {
          slug: 'error-handling',
          title: 'Error Handling',
          description: 'Error boundaries, fallback UIs, retry patterns, and global error handling in React.',
          keywords: ['error boundary', 'fallback ui', 'retry', 'error handling', 'react', 'global error'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          contentFile: 'frontend-patterns/error-handling.md',
        },
      ],
    },
  ],
};

export default category;
