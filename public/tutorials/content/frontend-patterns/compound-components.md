## What are Compound Components?

Compound components are a set of components that work together to form a complete UI element. They share implicit state through React Context, allowing the parent to manage state while children render independently. Think of native HTML elements like `<select>` and `<option>` &mdash; they share selection state implicitly.

**Flow:**

1. **Parent (Tabs)** — Owns state: activeIndex, onChange
2. **Context Provider** — Shares state without prop drilling
3. **Children (Tab, Panel)** — Consume context to render conditionally


## Example: Tabs Component

<!-- title: Tabs.tsx -->
```typescript
import React, { createContext, useContext, useState, useMemo } from 'react';

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
      className={`tab ${activeIndex === index ? 'tab--active' : ''}`}
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

export default Tabs;
```

### Using the Tabs Component

<!-- title: App.tsx -->
```typescript
import Tabs from './Tabs';

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
);
```

## How It Works Under the Hood

1. **Parent creates Context:** `Tabs` manages `activeIndex` state and provides it via `TabsContext.Provider`.
2. **Children consume Context:** `Tab` reads `activeIndex` to apply active styling and calls `setActiveIndex` on click.
3. **Conditional rendering:** `TabPanel` only renders when its `index` matches `activeIndex`.
4. **Error boundaries:** The `useTabsContext` hook throws if used outside `Tabs`, catching misuse early.

## Alternative: React.Children API

Before Context, compound components used `React.Children.map` and `React.cloneElement` to inject props into children. This approach is fragile &mdash; it breaks if you wrap children in other elements.

<!-- title: CloneElementApproach.tsx -->
```typescript
// Fragile: only works with direct children
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
};
```

> **TIP:** **Prefer the Context-based approach** &mdash; it works regardless of component nesting depth and does not break when children are wrapped in layout components.

| Approach | Flexibility | Depth Support | Complexity |
| --- | --- | --- | --- |
| React.Children + cloneElement | Low (direct children only) | Shallow | Low |
| Context-based | High (any depth) | Deep | Medium |
| Custom Hook-based | High (headless) | Any | Low-Medium |

> **NOTE:** Popular libraries using this pattern: Radix UI, Headless UI, Reach UI, Chakra UI. They all use Context-based compound components internally.
