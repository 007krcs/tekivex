## The State Management Landscape

React offers several built-in primitives for managing state, and the ecosystem provides many external solutions. Choosing the right tool depends on the **scope** (local vs global), **complexity** (simple vs structured transitions), and **performance requirements** of your application.

**Flow:**

1. **Local State** — useState for simple component state
2. **Complex Local** — useReducer for structured transitions
3. **Shared State** — Context API for cross-component data
4. **Global Store** — Zustand / Redux for app-wide state


## useState: Simple Local State

<!-- title: Counter.tsx -->
```typescript
const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
    </div>
  );
};
```

## useReducer: Structured Transitions

When state updates follow complex rules or depend on the previous state, `useReducer` makes transitions explicit and testable.

<!-- title: TodoReducer.tsx -->
```typescript
interface Todo {
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
};
```

## Context API: Shared State

<!-- title: ThemeContext.tsx -->
```typescript
interface ThemeContextValue {
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
}
```

> **CAUTION:** **Context re-render trap:** Every consumer re-renders when the Provider value changes. Split contexts by update frequency (e.g., `ThemeContext` vs `UserContext`) and use `useMemo` on the value object.

## Zustand: Lightweight External Store

<!-- title: useStore.ts -->
```typescript
import { create } from 'zustand';

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
};
```

## Redux Toolkit: Full-Featured Store

**Flow:**

1. **UI Event** — User clicks a button
2. **dispatch(action)** — Action sent to the store
3. **Reducer** — Pure function computes new state
4. **Store Update** — State is immutably replaced
5. **Re-render** — Subscribed components update


<!-- title: counterSlice.ts -->
```typescript
import { createSlice, configureStore } from '@reduxjs/toolkit';

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

export type RootState = ReturnType<typeof store.getState>;
```

## Comparison Table

| Approach | Scope | Boilerplate | DevTools | Performance | Best For |
| --- | --- | --- | --- | --- | --- |
| useState | Component | Minimal | React DevTools | Excellent | Simple toggles, forms |
| useReducer | Component | Low | React DevTools | Excellent | Complex local logic |
| Context API | Subtree | Low-Medium | React DevTools | Good (split ctx) | Theme, auth, locale |
| Zustand | Global | Minimal | Zustand DevTools | Excellent (slices) | Most apps, any size |
| Redux Toolkit | Global | Medium | Redux DevTools | Good (selectors) | Large teams, complex async |

> **TIP:** **Decision guide:** Start with `useState`. If state transitions get complex, switch to `useReducer`. If multiple components need the same state, try Context first. If Context re-renders become a problem, reach for Zustand or Redux Toolkit.
