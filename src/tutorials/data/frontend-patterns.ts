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
          content: [
            { type: 'heading', level: 2, text: 'What is a Higher-Order Component?', id: 'what-is-hoc' },
            {
              type: 'paragraph',
              html: 'A <strong>Higher-Order Component (HOC)</strong> is a function that takes a component and returns a new, enhanced component. It is a pattern derived from functional composition &mdash; not a React API. HOCs let you inject props, intercept rendering, and add cross-cutting concerns without modifying the original component.',
            },
            {
              type: 'flow',
              steps: [
                { label: 'Base Component', desc: 'A simple component that renders UI', color: '#06b6d4' },
                { label: 'HOC Function', desc: 'Wraps component, injects props/logic', color: '#8b5cf6' },
                { label: 'Enhanced Component', desc: 'New component with added behavior', color: '#10b981' },
              ],
            },
            { type: 'heading', level: 3, text: 'The HOC Signature', id: 'hoc-signature' },
            {
              type: 'code',
              language: 'typescript',
              title: 'hoc-signature.ts',
              code: `// Generic HOC type signature
type HOC<InjectedProps> = <P extends InjectedProps>(
  WrappedComponent: React.ComponentType<P>
) => React.FC<Omit<P, keyof InjectedProps>>;`,
            },
            { type: 'heading', level: 2, text: 'Real-World Example: withAuth', id: 'with-auth' },
            {
              type: 'paragraph',
              html: 'One of the most common use cases for HOCs is protecting routes behind authentication. The <code>withAuth</code> HOC checks if the user is authenticated and either renders the wrapped component or redirects to the login page.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'withAuth.tsx',
              code: `import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface AuthProps {
  user: { id: string; name: string; role: string };
}

function withAuth<P extends AuthProps>(
  WrappedComponent: React.ComponentType<P>
): React.FC<Omit<P, keyof AuthProps>> {
  const WithAuthComponent: React.FC<Omit<P, keyof AuthProps>> = (props) => {
    const { user, isLoading } = useAuth();

    if (isLoading) return <div className="spinner" />;
    if (!user) return <Navigate to="/login" replace />;

    return <WrappedComponent {...(props as P)} user={user} />;
  };

  WithAuthComponent.displayName = \`withAuth(\${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })\`;

  return WithAuthComponent;
}

export default withAuth;`,
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'Dashboard.tsx',
              code: `import withAuth from './withAuth';

interface DashboardProps {
  user: { id: string; name: string; role: string };
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => (
  <div>
    <h1>Welcome, {user.name}</h1>
    <p>Role: {user.role}</p>
  </div>
);

// Export the protected version
export default withAuth(Dashboard);`,
            },
            { type: 'heading', level: 2, text: 'Before & After: Adding Logging', id: 'before-after' },
            {
              type: 'heading',
              level: 3,
              text: 'Before (duplicated in every component)',
              id: 'before-logging',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'BeforeHOC.tsx',
              code: `const ProductList: React.FC = () => {
  useEffect(() => {
    analytics.track('ProductList mounted');
    return () => analytics.track('ProductList unmounted');
  }, []);
  return <div>...</div>;
};

const UserProfile: React.FC = () => {
  useEffect(() => {
    analytics.track('UserProfile mounted');
    return () => analytics.track('UserProfile unmounted');
  }, []);
  return <div>...</div>;
};`,
            },
            {
              type: 'heading',
              level: 3,
              text: 'After (extracted into HOC)',
              id: 'after-logging',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'withTracking.tsx',
              code: `function withTracking<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
): React.FC<P> {
  const Tracked: React.FC<P> = (props) => {
    useEffect(() => {
      analytics.track(\`\${componentName} mounted\`);
      return () => analytics.track(\`\${componentName} unmounted\`);
    }, []);
    return <WrappedComponent {...props} />;
  };
  Tracked.displayName = \`withTracking(\${componentName})\`;
  return Tracked;
}

const ProductList = withTracking(() => <div>...</div>, 'ProductList');
const UserProfile = withTracking(() => <div>...</div>, 'UserProfile');`,
            },
            { type: 'heading', level: 2, text: 'HOC vs Hooks: When to Use Which', id: 'hoc-vs-hooks' },
            {
              type: 'comparison',
              left: {
                title: 'HOC',
                color: '#8b5cf6',
                items: [
                  'Works with class and function components',
                  'Can intercept rendering entirely (e.g., redirect)',
                  'Good for cross-cutting decorators (auth, logging)',
                  'Composes via function chaining: withA(withB(C))',
                  'Can cause "wrapper hell" in DevTools',
                  'Prop collisions possible between HOCs',
                ],
              },
              right: {
                title: 'Custom Hooks',
                color: '#06b6d4',
                items: [
                  'Function components only',
                  'Cannot prevent rendering (must return JSX)',
                  'Great for sharing stateful logic',
                  'Composes naturally inside the component body',
                  'No extra DOM nesting or DevTools noise',
                  'No prop collisions; return values are explicit',
                ],
              },
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Rule of thumb:</strong> Prefer custom hooks for new code. Use HOCs when you need to intercept rendering entirely (redirects, permission gates) or when working with legacy class components.',
            },
            {
              type: 'callout',
              variant: 'caution',
              html: 'Never call a HOC inside a render function &mdash; it creates a new component on every render and destroys all state. Always apply HOCs at the module level.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'What are Render Props?', id: 'what-are-render-props' },
            {
              type: 'paragraph',
              html: 'A <strong>render prop</strong> is a technique where a component receives a function as a prop (or as <code>children</code>) and calls it to determine what to render. Instead of the component dictating the UI, the <em>consumer</em> controls rendering while the component manages the logic.',
            },
            {
              type: 'flow',
              steps: [
                { label: 'Logic Component', desc: 'Manages state and side effects', color: '#06b6d4' },
                { label: 'Calls render(state)', desc: 'Passes current state to the function', color: '#8b5cf6' },
                { label: 'Consumer JSX', desc: 'Consumer decides what to render', color: '#10b981' },
              ],
            },
            { type: 'heading', level: 2, text: 'Example: Mouse Tracker', id: 'mouse-tracker' },
            {
              type: 'paragraph',
              html: 'A classic example is a component that tracks the mouse position and lets the consumer decide how to display it.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'MouseTracker.tsx',
              code: `import React, { useState, useEffect, useCallback } from 'react';

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

export default MouseTracker;`,
            },
            { type: 'heading', level: 3, text: 'Using the MouseTracker', id: 'using-mouse-tracker' },
            {
              type: 'code',
              language: 'typescript',
              title: 'App.tsx',
              code: `// As a render prop
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
</MouseTracker>`,
            },
            { type: 'heading', level: 2, text: 'Render Props vs HOC', id: 'render-props-vs-hoc' },
            {
              type: 'comparison',
              left: {
                title: 'Render Props',
                color: '#06b6d4',
                items: [
                  'Dynamic: logic can change per render',
                  'Explicit data flow through function args',
                  'No naming collisions on props',
                  'Can nest deeply (callback hell risk)',
                  'Runtime composition',
                ],
              },
              right: {
                title: 'HOC',
                color: '#8b5cf6',
                items: [
                  'Static: applied once at module level',
                  'Implicit prop injection',
                  'Possible naming collisions between HOCs',
                  'Stacks via function chaining',
                  'Compile-time composition',
                ],
              },
            },
            { type: 'heading', level: 2, text: 'Practical Use Case: Data Fetcher', id: 'data-fetcher' },
            {
              type: 'code',
              language: 'typescript',
              title: 'DataFetcher.tsx',
              code: `interface DataFetcherProps<T> {
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
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
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
</DataFetcher>`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'Render props are still useful for headless UI libraries (like Downshift or React Aria) where the component owns the logic but gives full rendering control to the consumer.',
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'In modern React, most render prop use cases can be replaced by custom hooks. Consider hooks first; use render props when you need to share <strong>rendering context</strong> (e.g., compound components, headless UI).',
            },
            {
              type: 'table',
              headers: ['Pattern', 'Composition Style', 'Best For'],
              rows: [
                ['HOC', 'Static (module-level wrapping)', 'Auth gates, analytics decorators'],
                ['Render Props', 'Dynamic (per-render function)', 'Headless UI, data providers'],
                ['Custom Hooks', 'Inline (call inside component)', 'Reusable stateful logic'],
              ],
            },
          ],
        },

        // ── 3. Custom Hooks ──
        {
          slug: 'custom-hooks',
          title: 'Custom Hooks',
          description: 'Extracting and sharing reusable stateful logic across components with custom hooks.',
          keywords: ['hooks', 'custom hooks', 'useLocalStorage', 'useDebounce', 'useFetch', 'react'],
          difficulty: 'beginner',
          estimatedMinutes: 16,
          content: [
            { type: 'heading', level: 2, text: 'Why Custom Hooks?', id: 'why-custom-hooks' },
            {
              type: 'paragraph',
              html: 'Custom hooks let you extract component logic into reusable functions. Any function whose name starts with <code>use</code> and calls other hooks is a custom hook. They share <strong>stateful logic</strong>, not state itself &mdash; each component using the hook gets its own independent state.',
            },
            {
              type: 'flow',
              steps: [
                { label: 'Component A', desc: 'Calls useCustomHook()', color: '#06b6d4' },
                { label: 'Custom Hook', desc: 'Encapsulates shared logic + state', color: '#8b5cf6' },
                { label: 'Component B', desc: 'Calls same useCustomHook()', color: '#10b981' },
              ],
            },
            { type: 'heading', level: 2, text: 'Example: useLocalStorage', id: 'use-local-storage' },
            {
              type: 'paragraph',
              html: 'Persists state to <code>localStorage</code> and keeps it synchronized across component re-renders.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'useLocalStorage.ts',
              code: `import { useState, useCallback } from 'react';

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
const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');`,
            },
            { type: 'heading', level: 2, text: 'Example: useDebounce', id: 'use-debounce' },
            {
              type: 'code',
              language: 'typescript',
              title: 'useDebounce.ts',
              code: `import { useState, useEffect } from 'react';

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
};`,
            },
            { type: 'heading', level: 2, text: 'Example: useFetch', id: 'use-fetch' },
            {
              type: 'code',
              language: 'typescript',
              title: 'useFetch.ts',
              code: `import { useState, useEffect } from 'react';

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
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
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

export default useFetch;`,
            },
            { type: 'heading', level: 2, text: 'Rules of Hooks', id: 'rules-of-hooks' },
            {
              type: 'callout',
              variant: 'caution',
              html: '<strong>Rules of Hooks (enforced by eslint-plugin-react-hooks):</strong><br/>1. Only call hooks at the <strong>top level</strong> &mdash; never inside loops, conditions, or nested functions.<br/>2. Only call hooks from <strong>React function components</strong> or other <strong>custom hooks</strong>.<br/>3. Name custom hooks starting with <code>use</code> so React can verify rule compliance.',
            },
            {
              type: 'table',
              headers: ['Allowed', 'Not Allowed'],
              rows: [
                ['const val = useMyHook()', 'if (cond) { useMyHook() }'],
                ['function useMyHook() { useState() }', 'for (item of list) { useState() }'],
                ['Called at component top level', 'Called inside a callback / event handler'],
              ],
            },
            { type: 'heading', level: 2, text: 'Composing Hooks Together', id: 'composing-hooks' },
            {
              type: 'paragraph',
              html: 'Custom hooks can call other custom hooks. This is their greatest strength &mdash; you can build complex behavior from small, testable pieces.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'useDebouncedFetch.ts',
              code: `function useDebouncedFetch<T>(url: string, delayMs = 300): FetchState<T> {
  const debouncedUrl = useDebounce(url, delayMs);
  return useFetch<T>(debouncedUrl);
}

// Composed from useDebounce + useFetch
const SearchResults: React.FC<{ query: string }> = ({ query }) => {
  const { data, loading, error } = useDebouncedFetch<Result[]>(
    \`/api/search?q=\${query}\`
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorBanner error={error} />;
  return <ResultList items={data ?? []} />;
};`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Testing custom hooks:</strong> Use <code>renderHook</code> from <code>@testing-library/react</code> to test hooks in isolation without a UI wrapper component.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'What are Compound Components?', id: 'what-compound' },
            {
              type: 'paragraph',
              html: 'Compound components are a set of components that work together to form a complete UI element. They share implicit state through React Context, allowing the parent to manage state while children render independently. Think of native HTML elements like <code>&lt;select&gt;</code> and <code>&lt;option&gt;</code> &mdash; they share selection state implicitly.',
            },
            {
              type: 'flow',
              steps: [
                { label: 'Parent (Tabs)', desc: 'Owns state: activeIndex, onChange', color: '#06b6d4' },
                { label: 'Context Provider', desc: 'Shares state without prop drilling', color: '#8b5cf6' },
                { label: 'Children (Tab, Panel)', desc: 'Consume context to render conditionally', color: '#10b981' },
              ],
            },
            { type: 'heading', level: 2, text: 'Example: Tabs Component', id: 'tabs-example' },
            {
              type: 'code',
              language: 'typescript',
              title: 'Tabs.tsx',
              code: `import React, { createContext, useContext, useState, useMemo } from 'react';

// ── Context ──
interface TabsContextValue {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tab components must be used within <Tabs>');
  return ctx;
}

// ── Tabs (Parent) ──
interface TabsProps {
  defaultIndex?: number;
  children: React.ReactNode;
}

const Tabs: React.FC<TabsProps> & {
  List: typeof TabList;
  Tab: typeof Tab;
  Panels: typeof TabPanels;
  Panel: typeof TabPanel;
} = ({ defaultIndex = 0, children }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const value = useMemo(() => ({ activeIndex, setActiveIndex }), [activeIndex]);
  return (
    <TabsContext.Provider value={value}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

// ── TabList ──
const TabList: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div role="tablist" className="tab-list">{children}</div>
);

// ── Tab ──
interface TabProps { index: number; children: React.ReactNode }

const Tab: React.FC<TabProps> = ({ index, children }) => {
  const { activeIndex, setActiveIndex } = useTabsContext();
  return (
    <button
      role="tab"
      aria-selected={activeIndex === index}
      className={\`tab \${activeIndex === index ? 'tab--active' : ''}\`}
      onClick={() => setActiveIndex(index)}
    >
      {children}
    </button>
  );
};

// ── TabPanels ──
const TabPanels: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="tab-panels">{children}</div>
);

// ── TabPanel ──
interface TabPanelProps { index: number; children: React.ReactNode }

const TabPanel: React.FC<TabPanelProps> = ({ index, children }) => {
  const { activeIndex } = useTabsContext();
  if (activeIndex !== index) return null;
  return <div role="tabpanel" className="tab-panel">{children}</div>;
};

// Attach sub-components
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

export default Tabs;`,
            },
            { type: 'heading', level: 3, text: 'Using the Tabs Component', id: 'using-tabs' },
            {
              type: 'code',
              language: 'typescript',
              title: 'App.tsx',
              code: `import Tabs from './Tabs';

const App: React.FC = () => (
  <Tabs defaultIndex={0}>
    <Tabs.List>
      <Tabs.Tab index={0}>Profile</Tabs.Tab>
      <Tabs.Tab index={1}>Settings</Tabs.Tab>
      <Tabs.Tab index={2}>Billing</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panels>
      <Tabs.Panel index={0}><ProfilePage /></Tabs.Panel>
      <Tabs.Panel index={1}><SettingsPage /></Tabs.Panel>
      <Tabs.Panel index={2}><BillingPage /></Tabs.Panel>
    </Tabs.Panels>
  </Tabs>
);`,
            },
            { type: 'heading', level: 2, text: 'How It Works Under the Hood', id: 'how-it-works' },
            {
              type: 'list',
              ordered: true,
              items: [
                '<strong>Parent creates Context:</strong> <code>Tabs</code> manages <code>activeIndex</code> state and provides it via <code>TabsContext.Provider</code>.',
                '<strong>Children consume Context:</strong> <code>Tab</code> reads <code>activeIndex</code> to apply active styling and calls <code>setActiveIndex</code> on click.',
                '<strong>Conditional rendering:</strong> <code>TabPanel</code> only renders when its <code>index</code> matches <code>activeIndex</code>.',
                '<strong>Error boundaries:</strong> The <code>useTabsContext</code> hook throws if used outside <code>Tabs</code>, catching misuse early.',
              ],
            },
            { type: 'heading', level: 2, text: 'Alternative: React.Children API', id: 'react-children-api' },
            {
              type: 'paragraph',
              html: 'Before Context, compound components used <code>React.Children.map</code> and <code>React.cloneElement</code> to inject props into children. This approach is fragile &mdash; it breaks if you wrap children in other elements.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'CloneElementApproach.tsx',
              code: `// Fragile: only works with direct children
const Tabs: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, {
          isActive: index === activeIndex,
          onClick: () => setActiveIndex(index),
        });
      })}
    </div>
  );
};`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Prefer the Context-based approach</strong> &mdash; it works regardless of component nesting depth and does not break when children are wrapped in layout components.',
            },
            {
              type: 'table',
              headers: ['Approach', 'Flexibility', 'Depth Support', 'Complexity'],
              rows: [
                ['React.Children + cloneElement', 'Low (direct children only)', 'Shallow', 'Low'],
                ['Context-based', 'High (any depth)', 'Deep', 'Medium'],
                ['Custom Hook-based', 'High (headless)', 'Any', 'Low-Medium'],
              ],
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'Popular libraries using this pattern: Radix UI, Headless UI, Reach UI, Chakra UI. They all use Context-based compound components internally.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'The State Management Landscape', id: 'landscape' },
            {
              type: 'paragraph',
              html: 'React offers several built-in primitives for managing state, and the ecosystem provides many external solutions. Choosing the right tool depends on the <strong>scope</strong> (local vs global), <strong>complexity</strong> (simple vs structured transitions), and <strong>performance requirements</strong> of your application.',
            },
            {
              type: 'flow',
              steps: [
                { label: 'Local State', desc: 'useState for simple component state', color: '#06b6d4' },
                { label: 'Complex Local', desc: 'useReducer for structured transitions', color: '#8b5cf6' },
                { label: 'Shared State', desc: 'Context API for cross-component data', color: '#f59e0b' },
                { label: 'Global Store', desc: 'Zustand / Redux for app-wide state', color: '#ef4444' },
              ],
            },
            { type: 'heading', level: 2, text: 'useState: Simple Local State', id: 'use-state' },
            {
              type: 'code',
              language: 'typescript',
              title: 'Counter.tsx',
              code: `const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
    </div>
  );
};`,
            },
            { type: 'heading', level: 2, text: 'useReducer: Structured Transitions', id: 'use-reducer' },
            {
              type: 'paragraph',
              html: 'When state updates follow complex rules or depend on the previous state, <code>useReducer</code> makes transitions explicit and testable.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'TodoReducer.tsx',
              code: `interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type TodoAction =
  | { type: 'ADD'; text: string }
  | { type: 'TOGGLE'; id: string }
  | { type: 'DELETE'; id: string };

function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: crypto.randomUUID(), text: action.text, completed: false }];
    case 'TOGGLE':
      return state.map((t) =>
        t.id === action.id ? { ...t, completed: !t.completed } : t
      );
    case 'DELETE':
      return state.filter((t) => t.id !== action.id);
  }
}

const TodoApp: React.FC = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <div>
      <button onClick={() => dispatch({ type: 'ADD', text: 'New task' })}>
        Add
      </button>
      {todos.map((t) => (
        <div key={t.id} onClick={() => dispatch({ type: 'TOGGLE', id: t.id })}>
          {t.completed ? '✓' : '○'} {t.text}
        </div>
      ))}
    </div>
  );
};`,
            },
            { type: 'heading', level: 2, text: 'Context API: Shared State', id: 'context-api' },
            {
              type: 'code',
              language: 'typescript',
              title: 'ThemeContext.tsx',
              code: `interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggleTheme = useCallback(
    () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
    []
  );
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}`,
            },
            {
              type: 'callout',
              variant: 'caution',
              html: '<strong>Context re-render trap:</strong> Every consumer re-renders when the Provider value changes. Split contexts by update frequency (e.g., <code>ThemeContext</code> vs <code>UserContext</code>) and use <code>useMemo</code> on the value object.',
            },
            { type: 'heading', level: 2, text: 'Zustand: Lightweight External Store', id: 'zustand' },
            {
              type: 'code',
              language: 'typescript',
              title: 'useStore.ts',
              code: `import { create } from 'zustand';

interface AppState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useStore = create<AppState>((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// Components subscribe to specific slices
const Count: React.FC = () => {
  const count = useStore((s) => s.count);       // only re-renders on count change
  return <span>{count}</span>;
};

const Controls: React.FC = () => {
  const increment = useStore((s) => s.increment); // never re-renders
  return <button onClick={increment}>+</button>;
};`,
            },
            { type: 'heading', level: 2, text: 'Redux Toolkit: Full-Featured Store', id: 'redux' },
            {
              type: 'flow',
              steps: [
                { label: 'UI Event', desc: 'User clicks a button', color: '#06b6d4' },
                { label: 'dispatch(action)', desc: 'Action sent to the store', color: '#8b5cf6' },
                { label: 'Reducer', desc: 'Pure function computes new state', color: '#f59e0b' },
                { label: 'Store Update', desc: 'State is immutably replaced', color: '#10b981' },
                { label: 'Re-render', desc: 'Subscribed components update', color: '#ef4444' },
              ],
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'counterSlice.ts',
              code: `import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },  // Immer allows "mutation"
    decrement: (state) => { state.value -= 1; },
    incrementByAmount: (state, action: { payload: number }) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;`,
            },
            { type: 'heading', level: 2, text: 'Comparison Table', id: 'comparison-table' },
            {
              type: 'table',
              headers: ['Approach', 'Scope', 'Boilerplate', 'DevTools', 'Performance', 'Best For'],
              rows: [
                ['useState', 'Component', 'Minimal', 'React DevTools', 'Excellent', 'Simple toggles, forms'],
                ['useReducer', 'Component', 'Low', 'React DevTools', 'Excellent', 'Complex local logic'],
                ['Context API', 'Subtree', 'Low-Medium', 'React DevTools', 'Good (split ctx)', 'Theme, auth, locale'],
                ['Zustand', 'Global', 'Minimal', 'Zustand DevTools', 'Excellent (slices)', 'Most apps, any size'],
                ['Redux Toolkit', 'Global', 'Medium', 'Redux DevTools', 'Good (selectors)', 'Large teams, complex async'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Decision guide:</strong> Start with <code>useState</code>. If state transitions get complex, switch to <code>useReducer</code>. If multiple components need the same state, try Context first. If Context re-renders become a problem, reach for Zustand or Redux Toolkit.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'Data Fetching in React', id: 'overview' },
            {
              type: 'paragraph',
              html: 'Data fetching is one of the most common operations in web apps, yet it involves many concerns: <strong>loading states</strong>, <strong>error handling</strong>, <strong>caching</strong>, <strong>deduplication</strong>, <strong>refetching</strong>, and <strong>optimistic updates</strong>. Different approaches handle these at different levels of abstraction.',
            },
            {
              type: 'flow',
              steps: [
                { label: 'Component Mounts', desc: 'Trigger data fetch', color: '#06b6d4' },
                { label: 'Loading State', desc: 'Show spinner/skeleton', color: '#8b5cf6' },
                { label: 'Fetch Resolves', desc: 'Receive data or error', color: '#f59e0b' },
                { label: 'Render Data', desc: 'Display content or error UI', color: '#10b981' },
              ],
            },
            { type: 'heading', level: 2, text: 'Pattern 1: useEffect + fetch', id: 'useeffect-fetch' },
            {
              type: 'paragraph',
              html: 'The simplest approach, but you must manually handle loading, errors, cleanup (abort), and race conditions.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'UseEffectFetch.tsx',
              code: `interface User {
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

    fetch(\`/api/users/\${userId}\`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
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
};`,
            },
            { type: 'heading', level: 2, text: 'Pattern 2: TanStack Query (React Query)', id: 'react-query' },
            {
              type: 'paragraph',
              html: 'TanStack Query handles caching, background refetching, stale-while-revalidate, pagination, and optimistic updates out of the box.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'ReactQueryExample.tsx',
              code: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch
const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: async (): Promise<User> => {
      const res = await fetch(\`/api/users/\${userId}\`);
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
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
      fetch(\`/api/users/\${userId}\`, {
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
};`,
            },
            { type: 'heading', level: 2, text: 'Stale-While-Revalidate Pattern', id: 'swr-pattern' },
            {
              type: 'flow',
              steps: [
                { label: '1. Cache Hit', desc: 'Return stale data instantly', color: '#10b981' },
                { label: '2. Revalidate', desc: 'Fetch fresh data in background', color: '#8b5cf6' },
                { label: '3. Update', desc: 'Replace stale data when fresh arrives', color: '#06b6d4' },
              ],
            },
            {
              type: 'paragraph',
              html: 'This pattern delivers <strong>instant perceived performance</strong> by showing cached data while transparently updating in the background. Both SWR and TanStack Query implement this.',
            },
            { type: 'heading', level: 2, text: 'Pattern 3: SWR', id: 'swr' },
            {
              type: 'code',
              language: 'typescript',
              title: 'SWRExample.tsx',
              code: `import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
  const { data, error, isLoading } = useSWR<User>(
    \`/api/users/\${userId}\`,
    fetcher,
    { revalidateOnFocus: true, dedupingInterval: 2000 }
  );

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorBanner message="Failed to load user" />;
  return <div>{data!.name}</div>;
};`,
            },
            { type: 'heading', level: 2, text: 'Server State vs Client State', id: 'server-vs-client' },
            {
              type: 'comparison',
              left: {
                title: 'Server State',
                color: '#06b6d4',
                items: [
                  'Data owned by the server (DB rows, API responses)',
                  'Can become stale or out-of-date',
                  'Needs caching, refetching, invalidation',
                  'Best managed by TanStack Query / SWR',
                  'Examples: user profiles, product lists, comments',
                ],
              },
              right: {
                title: 'Client State',
                color: '#8b5cf6',
                items: [
                  'Data owned by the browser (UI state)',
                  'Always in sync with the UI',
                  'No server round-trip needed',
                  'Best managed by useState / Zustand',
                  'Examples: modal open/close, form input, theme',
                ],
              },
            },
            { type: 'heading', level: 2, text: 'Comparison Table', id: 'fetching-comparison' },
            {
              type: 'table',
              headers: ['Feature', 'useEffect + fetch', 'TanStack Query', 'SWR'],
              rows: [
                ['Cache', 'Manual', 'Built-in (configurable)', 'Built-in'],
                ['Deduplication', 'None', 'Automatic', 'Automatic'],
                ['Background refetch', 'Manual', 'Built-in', 'Built-in'],
                ['Optimistic updates', 'Manual', 'Built-in', 'Built-in'],
                ['Pagination', 'Manual', 'useInfiniteQuery', 'useSWRInfinite'],
                ['DevTools', 'None', 'TanStack DevTools', 'SWR DevTools'],
                ['Bundle size', '0 KB', '~13 KB', '~4 KB'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Recommendation:</strong> For any app making more than a handful of API calls, adopt TanStack Query or SWR. The amount of boilerplate, edge-case handling, and caching logic they eliminate is substantial.',
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'With React Server Components (RSC), data fetching moves to the server. The patterns above apply to client-side fetching. RSC data fetching uses <code>async/await</code> directly in the component body.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'The React Rendering Pipeline', id: 'rendering-pipeline' },
            {
              type: 'paragraph',
              html: 'Understanding how React renders is key to optimizing performance. Every state change triggers a render, which calls your component function, produces a virtual DOM tree, diffs it against the previous tree (reconciliation), and commits the minimal set of real DOM updates.',
            },
            {
              type: 'flow',
              steps: [
                { label: 'State Change', desc: 'setState or context update', color: '#ef4444' },
                { label: 'Render Phase', desc: 'Call component functions, build vDOM', color: '#f59e0b' },
                { label: 'Reconciliation', desc: 'Diff new vDOM vs previous vDOM', color: '#8b5cf6' },
                { label: 'Commit Phase', desc: 'Apply minimal DOM mutations', color: '#10b981' },
              ],
            },
            { type: 'heading', level: 2, text: 'React.memo: Prevent Unnecessary Re-renders', id: 'react-memo' },
            {
              type: 'paragraph',
              html: '<code>React.memo</code> is a higher-order component that skips re-rendering when props have not changed (shallow comparison).',
            },
            {
              type: 'heading',
              level: 3,
              text: 'Before: Re-renders on every parent update',
              id: 'before-memo',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'BeforeMemo.tsx',
              code: `// This re-renders every time the parent renders,
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
};`,
            },
            {
              type: 'heading',
              level: 3,
              text: 'After: Skips re-render when props unchanged',
              id: 'after-memo',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'AfterMemo.tsx',
              code: `const ExpensiveList = React.memo<{ items: string[] }>(({ items }) => {
  console.log('ExpensiveList rendered');
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
});`,
            },
            { type: 'heading', level: 2, text: 'useMemo & useCallback', id: 'usememo-usecallback' },
            {
              type: 'code',
              language: 'typescript',
              title: 'MemoizedValues.tsx',
              code: `const Dashboard: React.FC<{ data: SalesRecord[] }> = ({ data }) => {
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
    navigate(\`/sales/\${id}\`);
  }, [navigate]);

  return (
    <div>
      <SummaryCard total={summary.total} average={summary.average} />
      <SalesTable data={data} onRowClick={handleRowClick} />
    </div>
  );
};`,
            },
            {
              type: 'callout',
              variant: 'caution',
              html: '<strong>Do not memoize everything.</strong> Memoization has a cost (memory + comparison). Only memoize when: (1) the computation is expensive, or (2) a stable reference is needed to prevent child re-renders via <code>React.memo</code>.',
            },
            { type: 'heading', level: 2, text: 'Virtualization for Long Lists', id: 'virtualization' },
            {
              type: 'paragraph',
              html: 'Rendering thousands of DOM nodes causes jank. Virtualization renders only the visible items in the viewport plus a small overscan buffer.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'VirtualList.tsx',
              code: `import { useVirtualizer } from '@tanstack/react-virtual';

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
      <div style={{ height: \`\${virtualizer.getTotalSize()}px\`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: 0,
              transform: \`translateY(\${virtualRow.start}px)\`,
              height: \`\${virtualRow.size}px\`,
              width: '100%',
            }}
          >
            {items[virtualRow.index]}
          </div>
        ))}
      </div>
    </div>
  );
};`,
            },
            { type: 'heading', level: 2, text: 'Code Splitting with React.lazy', id: 'code-splitting' },
            {
              type: 'code',
              language: 'typescript',
              title: 'LazyRoutes.tsx',
              code: `import React, { Suspense, lazy } from 'react';
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
);`,
            },
            { type: 'heading', level: 2, text: 'Image Optimization', id: 'image-optimization' },
            {
              type: 'list',
              ordered: false,
              items: [
                'Use <code>loading="lazy"</code> on images below the fold for native lazy loading.',
                'Serve modern formats (WebP, AVIF) with <code>&lt;picture&gt;</code> fallbacks.',
                'Use <code>srcset</code> and <code>sizes</code> to serve responsive images based on viewport.',
                'Set explicit <code>width</code> and <code>height</code> to prevent layout shift (CLS).',
                'Use a CDN with automatic image optimization (Cloudflare, Imgix, Next.js Image).',
              ],
            },
            {
              type: 'table',
              headers: ['Technique', 'What It Prevents', 'Effort'],
              rows: [
                ['React.memo', 'Unnecessary re-renders', 'Low'],
                ['useMemo / useCallback', 'Expensive recomputation / ref instability', 'Low'],
                ['Virtualization', 'DOM overload on long lists', 'Medium'],
                ['Code splitting', 'Large initial bundle', 'Low'],
                ['Image optimization', 'Slow LCP, high bandwidth', 'Low-Medium'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Measure first.</strong> Use React DevTools Profiler and Chrome DevTools Performance panel to identify actual bottlenecks before optimizing. Premature optimization wastes time and can make code harder to maintain.',
            },
          ],
        },

        // ── 8. Rendering Patterns ──
        {
          slug: 'rendering-patterns',
          title: 'Rendering Patterns',
          description: 'CSR, SSR, SSG, and ISR: how each rendering strategy works and when to use them.',
          keywords: ['csr', 'ssr', 'ssg', 'isr', 'rendering', 'next.js', 'server-side', 'static'],
          difficulty: 'intermediate',
          estimatedMinutes: 16,
          content: [
            { type: 'heading', level: 2, text: 'Four Rendering Strategies', id: 'four-strategies' },
            {
              type: 'paragraph',
              html: 'Modern web frameworks offer multiple rendering strategies. Each trades off between <strong>performance</strong>, <strong>SEO</strong>, <strong>data freshness</strong>, and <strong>infrastructure cost</strong>. Understanding these trade-offs is essential for choosing the right approach per page.',
            },
            { type: 'heading', level: 2, text: 'CSR: Client-Side Rendering', id: 'csr' },
            {
              type: 'flow',
              steps: [
                { label: 'Browser Request', desc: 'GET /dashboard', color: '#06b6d4' },
                { label: 'Empty HTML', desc: 'Server sends shell with <div id="root">', color: '#8b5cf6' },
                { label: 'JS Download', desc: 'Browser downloads JS bundle', color: '#f59e0b' },
                { label: 'Client Render', desc: 'React hydrates and renders UI', color: '#10b981' },
                { label: 'Data Fetch', desc: 'API calls after mount', color: '#ef4444' },
              ],
            },
            {
              type: 'paragraph',
              html: 'CSR is the default for Vite and Create React App. The server sends minimal HTML; all rendering happens in the browser after JavaScript loads.',
            },
            { type: 'heading', level: 2, text: 'SSR: Server-Side Rendering', id: 'ssr' },
            {
              type: 'flow',
              steps: [
                { label: 'Browser Request', desc: 'GET /products', color: '#06b6d4' },
                { label: 'Server Renders', desc: 'Fetch data + render HTML on server', color: '#8b5cf6' },
                { label: 'Full HTML', desc: 'Send complete HTML to browser', color: '#f59e0b' },
                { label: 'Hydration', desc: 'React attaches event handlers', color: '#10b981' },
              ],
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'page.tsx (Next.js App Router - SSR)',
              code: `// Server Component - runs on every request
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
}`,
            },
            { type: 'heading', level: 2, text: 'SSG: Static Site Generation', id: 'ssg' },
            {
              type: 'flow',
              steps: [
                { label: 'Build Time', desc: 'Fetch data + render HTML at build', color: '#8b5cf6' },
                { label: 'Static Files', desc: 'HTML, CSS, JS deployed to CDN', color: '#10b981' },
                { label: 'Browser Request', desc: 'CDN serves pre-built HTML instantly', color: '#06b6d4' },
              ],
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'page.tsx (Next.js App Router - SSG)',
              code: `// This page is statically generated at build time
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
}`,
            },
            { type: 'heading', level: 2, text: 'ISR: Incremental Static Regeneration', id: 'isr' },
            {
              type: 'flow',
              steps: [
                { label: 'Build Time', desc: 'Generate initial static pages', color: '#8b5cf6' },
                { label: 'Request (cache hit)', desc: 'Serve cached page instantly', color: '#10b981' },
                { label: 'Revalidation', desc: 'Regenerate page in background after TTL', color: '#f59e0b' },
                { label: 'Next Request', desc: 'Serve updated page', color: '#06b6d4' },
              ],
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'page.tsx (Next.js App Router - ISR)',
              code: `// Revalidate every 60 seconds
export const revalidate = 60;

export default async function PricingPage() {
  const plans = await fetchPricingPlans();
  return (
    <main>
      <h1>Pricing</h1>
      <PricingGrid plans={plans} />
    </main>
  );
}`,
            },
            { type: 'heading', level: 2, text: 'Comparison Table', id: 'rendering-comparison' },
            {
              type: 'table',
              headers: ['Aspect', 'CSR', 'SSR', 'SSG', 'ISR'],
              rows: [
                ['Initial Load', 'Slow (blank → JS → render)', 'Fast (full HTML)', 'Fastest (CDN-cached)', 'Fastest (CDN-cached)'],
                ['SEO', 'Poor (empty HTML)', 'Excellent', 'Excellent', 'Excellent'],
                ['Data Freshness', 'Real-time (client fetches)', 'Per-request', 'Build-time (stale)', 'TTL-based'],
                ['Server Cost', 'None (static host)', 'High (per-request compute)', 'None (CDN only)', 'Low (background regen)'],
                ['TTFB', 'Fast (small HTML)', 'Slower (server compute)', 'Fastest', 'Fastest'],
                ['Time to Interactive', 'Slow (large JS bundle)', 'Medium (hydration)', 'Fast', 'Fast'],
              ],
            },
            { type: 'heading', level: 2, text: 'When to Use Which', id: 'when-to-use' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>CSR:</strong> Dashboards, admin panels, apps behind login (no SEO needed).',
                '<strong>SSR:</strong> E-commerce product pages, social feeds (SEO + fresh data per request).',
                '<strong>SSG:</strong> Blogs, docs, marketing pages (content changes infrequently).',
                '<strong>ISR:</strong> Product catalogs, news sites (SEO + periodic freshness without full rebuild).',
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: 'Modern frameworks like Next.js let you mix strategies <strong>per page</strong>. Use SSG for your landing page, SSR for product pages, CSR for the admin dashboard, and ISR for the blog — all in one app.',
            },
            {
              type: 'callout',
              variant: 'note',
              html: '<strong>React Server Components (RSC)</strong> add a fifth dimension: components that run exclusively on the server, sending serialized output (not HTML) to the client. RSC reduces client JS by keeping data-fetching and heavy logic server-side while remaining interactive through client components.',
            },
          ],
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
          content: [
            { type: 'heading', level: 2, text: 'The Testing Pyramid', id: 'testing-pyramid' },
            {
              type: 'paragraph',
              html: 'The testing pyramid guides how many tests to write at each level. <strong>Many fast unit tests</strong> at the base, <strong>some integration tests</strong> in the middle, and <strong>few slow E2E tests</strong> at the top. This balances confidence with feedback speed.',
            },
            {
              type: 'diagram',
              caption: 'Testing Pyramid: Unit (base) → Integration (middle) → E2E (top)',
              svg: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="unitGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <linearGradient id="intGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="e2eGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="100%" stop-color="#dc2626"/>
    </linearGradient>
  </defs>
  <polygon points="200,30 340,270 60,270" fill="url(#unitGrad)" opacity="0.3" stroke="#10b981" stroke-width="2"/>
  <polygon points="200,30 300,190 100,190" fill="url(#intGrad)" opacity="0.4" stroke="#f59e0b" stroke-width="2"/>
  <polygon points="200,30 250,120 150,120" fill="url(#e2eGrad)" opacity="0.5" stroke="#ef4444" stroke-width="2"/>
  <text x="200" y="85" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">E2E</text>
  <text x="200" y="160" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">Integration</text>
  <text x="200" y="245" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">Unit</text>
  <text x="370" y="80" text-anchor="end" fill="#a1a1aa" font-size="11">Slow, expensive</text>
  <text x="370" y="100" text-anchor="end" fill="#a1a1aa" font-size="11">High confidence</text>
  <text x="370" y="240" text-anchor="end" fill="#a1a1aa" font-size="11">Fast, cheap</text>
  <text x="370" y="260" text-anchor="end" fill="#a1a1aa" font-size="11">Low confidence</text>
</svg>`,
            },
            { type: 'heading', level: 2, text: 'Unit Tests', id: 'unit-tests' },
            {
              type: 'paragraph',
              html: 'Unit tests verify individual functions, hooks, or components in isolation. They are fast, deterministic, and cheap to run.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'utils.test.ts',
              code: `import { describe, it, expect } from 'vitest';
import { formatCurrency, clamp } from './utils';

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1234.5, 'USD')).toBe('$1,234.50');
  });

  it('handles zero', () => {
    expect(formatCurrency(0, 'USD')).toBe('$0.00');
  });

  it('handles negative amounts', () => {
    expect(formatCurrency(-42.1, 'USD')).toBe('-$42.10');
  });
});

describe('clamp', () => {
  it('clamps below minimum', () => {
    expect(clamp(-5, 0, 100)).toBe(0);
  });

  it('clamps above maximum', () => {
    expect(clamp(150, 0, 100)).toBe(100);
  });

  it('returns value when in range', () => {
    expect(clamp(50, 0, 100)).toBe(50);
  });
});`,
            },
            { type: 'heading', level: 2, text: 'Integration Tests: React Testing Library', id: 'integration-tests' },
            {
              type: 'paragraph',
              html: 'Integration tests verify that multiple units work together. React Testing Library encourages testing from the <strong>user\'s perspective</strong> &mdash; interacting with rendered output rather than internal implementation.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'LoginForm.test.tsx',
              code: `import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('submits with valid credentials', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'securePass123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'securePass123',
      });
    });
  });

  it('shows validation errors for empty fields', async () => {
    render(<LoginForm onSubmit={vi.fn()} />);

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it('disables submit button while loading', async () => {
    render(<LoginForm onSubmit={() => new Promise(() => {})} />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/email/i), 'a@b.com');
    await user.type(screen.getByLabelText(/password/i), 'pass');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled();
  });
});`,
            },
            { type: 'heading', level: 2, text: 'What to Test vs What Not to Test', id: 'what-to-test' },
            {
              type: 'comparison',
              left: {
                title: 'Test These',
                color: '#10b981',
                items: [
                  'User interactions (click, type, submit)',
                  'Conditional rendering (loading, error, empty states)',
                  'Form validation and error messages',
                  'Business logic functions',
                  'Accessibility (roles, labels, focus management)',
                  'Edge cases and boundary values',
                ],
              },
              right: {
                title: 'Skip These',
                color: '#ef4444',
                items: [
                  'Implementation details (internal state values)',
                  'CSS styles and visual appearance (use visual tests)',
                  'Third-party library internals',
                  'Static content that rarely changes',
                  'Framework behavior (React itself)',
                  'Snapshot tests of large component trees',
                ],
              },
            },
            { type: 'heading', level: 2, text: 'E2E Tests with Playwright', id: 'e2e-tests' },
            {
              type: 'code',
              language: 'typescript',
              title: 'checkout.spec.ts',
              code: `import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test('completes purchase successfully', async ({ page }) => {
    await page.goto('/products');

    // Add item to cart
    await page.getByRole('button', { name: 'Add to Cart' }).first().click();
    await expect(page.getByTestId('cart-count')).toHaveText('1');

    // Go to checkout
    await page.getByRole('link', { name: 'Cart' }).click();
    await page.getByRole('button', { name: 'Checkout' }).click();

    // Fill shipping form
    await page.getByLabel('Full Name').fill('Jane Doe');
    await page.getByLabel('Address').fill('123 Main St');
    await page.getByLabel('City').fill('Springfield');

    // Submit order
    await page.getByRole('button', { name: 'Place Order' }).click();

    // Verify confirmation
    await expect(page.getByText('Order Confirmed')).toBeVisible();
    await expect(page.getByTestId('order-number')).toBeVisible();
  });
});`,
            },
            { type: 'heading', level: 2, text: 'Testing Tools Comparison', id: 'testing-tools' },
            {
              type: 'table',
              headers: ['Tool', 'Type', 'Speed', 'Best For'],
              rows: [
                ['Vitest', 'Unit / Integration', 'Very fast', 'Vite projects, modern setup'],
                ['Jest', 'Unit / Integration', 'Fast', 'Established projects, broad ecosystem'],
                ['React Testing Library', 'Integration', 'Fast', 'User-centric component testing'],
                ['Playwright', 'E2E', 'Slow', 'Cross-browser, full flow testing'],
                ['Cypress', 'E2E', 'Slow', 'Developer-friendly E2E, component tests'],
                ['MSW (Mock Service Worker)', 'API Mocking', 'Fast', 'Intercepting network requests in tests'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Follow the AAA pattern:</strong> <em>Arrange</em> (set up test data and render), <em>Act</em> (simulate user actions), <em>Assert</em> (verify expected outcomes). This makes tests readable and consistent.',
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'Run unit and integration tests on every commit (CI). Run E2E tests on pull requests or nightly builds. This keeps the feedback loop fast while still catching regressions.',
            },
          ],
        },

        // ── 10. Error Handling ──
        {
          slug: 'error-handling',
          title: 'Error Handling',
          description: 'Error boundaries, fallback UIs, retry patterns, and global error handling in React.',
          keywords: ['error boundary', 'fallback ui', 'retry', 'error handling', 'react', 'global error'],
          difficulty: 'intermediate',
          estimatedMinutes: 14,
          content: [
            { type: 'heading', level: 2, text: 'Why Error Handling Matters', id: 'why-errors' },
            {
              type: 'paragraph',
              html: 'In production, errors are inevitable: API failures, network timeouts, invalid data, or bugs in third-party code. Without proper error handling, a single thrown error can crash the entire React tree. <strong>Error boundaries</strong> let you catch these errors gracefully and show fallback UI instead of a blank screen.',
            },
            {
              type: 'flow',
              steps: [
                { label: 'Error Thrown', desc: 'Runtime error in component render', color: '#ef4444' },
                { label: 'Error Boundary', desc: 'Catches error via getDerivedStateFromError', color: '#f59e0b' },
                { label: 'Fallback UI', desc: 'Show error message + retry option', color: '#8b5cf6' },
                { label: 'Recovery', desc: 'User retries or navigates away', color: '#10b981' },
              ],
            },
            { type: 'heading', level: 2, text: 'Building an Error Boundary', id: 'error-boundary' },
            {
              type: 'paragraph',
              html: 'Error boundaries must be class components (as of React 18). They catch errors during rendering, in lifecycle methods, and in constructors of child components. They do <strong>not</strong> catch errors in event handlers, async code, or server-side rendering.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'ErrorBoundary.tsx',
              code: `import React, { Component, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log to error tracking service
    console.error('ErrorBoundary caught:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div role="alert" className="error-boundary-fallback">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={this.handleRetry}>Try Again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;`,
            },
            { type: 'heading', level: 3, text: 'Using the Error Boundary', id: 'using-error-boundary' },
            {
              type: 'code',
              language: 'typescript',
              title: 'App.tsx',
              code: `import ErrorBoundary from './ErrorBoundary';

const App: React.FC = () => (
  <ErrorBoundary
    onError={(error) => errorTracker.report(error)}
    fallback={<FullPageError />}
  >
    <Header />
    <ErrorBoundary fallback={<SidebarError />}>
      <Sidebar />
    </ErrorBoundary>
    <ErrorBoundary fallback={<ContentError />}>
      <MainContent />
    </ErrorBoundary>
  </ErrorBoundary>
);`,
            },
            {
              type: 'callout',
              variant: 'tip',
              html: '<strong>Nest error boundaries strategically.</strong> Place them around independent sections (sidebar, main content, widgets) so a failure in one section does not take down the entire page.',
            },
            { type: 'heading', level: 2, text: 'Fallback UI Patterns', id: 'fallback-ui' },
            {
              type: 'list',
              ordered: false,
              items: [
                '<strong>Inline error:</strong> Show error message in place of the component with a retry button.',
                '<strong>Toast notification:</strong> Non-blocking error message at the corner of the screen.',
                '<strong>Full-page error:</strong> For critical failures that prevent the app from functioning.',
                '<strong>Degraded mode:</strong> Show partial data or cached content when fresh data fails to load.',
              ],
            },
            { type: 'heading', level: 2, text: 'Retry Pattern with Exponential Backoff', id: 'retry-pattern' },
            {
              type: 'code',
              language: 'typescript',
              title: 'useRetry.ts',
              code: `import { useState, useCallback } from 'react';

interface RetryOptions {
  maxRetries: number;
  baseDelayMs: number;
  maxDelayMs: number;
}

function useRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = { maxRetries: 3, baseDelayMs: 1000, maxDelayMs: 10000 }
) {
  const [state, setState] = useState<{
    data: T | null;
    error: Error | null;
    loading: boolean;
    retryCount: number;
  }>({ data: null, error: null, loading: false, retryCount: 0 });

  const execute = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
      try {
        const data = await fn();
        setState({ data, error: null, loading: false, retryCount: attempt });
        return data;
      } catch (err) {
        lastError = err as Error;
        if (attempt < options.maxRetries) {
          const delay = Math.min(
            options.baseDelayMs * Math.pow(2, attempt),
            options.maxDelayMs
          );
          await new Promise((r) => setTimeout(r, delay));
        }
      }
    }

    setState({ data: null, error: lastError, loading: false, retryCount: options.maxRetries });
    return null;
  }, [fn, options.maxRetries, options.baseDelayMs, options.maxDelayMs]);

  return { ...state, execute };
}

export default useRetry;`,
            },
            { type: 'heading', level: 2, text: 'Global Error Handling', id: 'global-errors' },
            {
              type: 'paragraph',
              html: 'Error boundaries only catch render-time errors. For async errors, event handler errors, and unhandled promise rejections, you need global handlers.',
            },
            {
              type: 'code',
              language: 'typescript',
              title: 'globalErrorHandler.ts',
              code: `// Catch unhandled errors
window.addEventListener('error', (event: ErrorEvent) => {
  errorTracker.report({
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error,
  });
});

// Catch unhandled promise rejections
window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
  errorTracker.report({
    message: 'Unhandled Promise Rejection',
    reason: event.reason,
  });
});

// Wrap event handlers to catch errors
function withErrorHandling<T extends (...args: unknown[]) => void>(
  handler: T,
  context: string
): T {
  return ((...args: unknown[]) => {
    try {
      const result = handler(...args);
      if (result instanceof Promise) {
        result.catch((err: Error) => {
          errorTracker.report({ message: err.message, context });
        });
      }
    } catch (err) {
      errorTracker.report({ message: (err as Error).message, context });
    }
  }) as T;
}`,
            },
            { type: 'heading', level: 2, text: 'Error Handling Checklist', id: 'checklist' },
            {
              type: 'table',
              headers: ['Error Type', 'Solution', 'Catches'],
              rows: [
                ['Render errors', 'Error Boundary', 'Errors thrown during component rendering'],
                ['Async errors', 'try/catch + state', 'Failed API calls, timeouts'],
                ['Event handler errors', 'try/catch wrapper', 'onClick, onSubmit exceptions'],
                ['Unhandled rejections', 'window.onunhandledrejection', 'Uncaught promise rejections'],
                ['Global JS errors', 'window.onerror', 'Script errors, eval errors'],
                ['Network failures', 'Retry + fallback', 'Offline, 5xx, DNS failures'],
              ],
            },
            {
              type: 'callout',
              variant: 'caution',
              html: 'Error boundaries do <strong>not</strong> catch errors in: event handlers, async callbacks (<code>setTimeout</code>, Promises), server-side rendering, or errors thrown in the error boundary itself. Handle those with <code>try/catch</code> and global handlers.',
            },
            {
              type: 'callout',
              variant: 'note',
              html: 'Consider using <code>react-error-boundary</code> from npm &mdash; it provides a functional API (<code>useErrorBoundary</code> hook) and built-in retry support, avoiding the need to write class components manually.',
            },
          ],
        },
      ],
    },
  ],
};

export default category;
