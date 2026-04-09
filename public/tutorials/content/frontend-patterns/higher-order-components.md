## What is a Higher-Order Component?

A **Higher-Order Component (HOC)** is a function that takes a component and returns a new, enhanced component. It is a pattern derived from functional composition &mdash; not a React API. HOCs let you inject props, intercept rendering, and add cross-cutting concerns without modifying the original component.

**Flow:**

1. **Base Component** — A simple component that renders UI
2. **HOC Function** — Wraps component, injects props/logic
3. **Enhanced Component** — New component with added behavior


### The HOC Signature

<!-- title: hoc-signature.ts -->
```typescript
// Generic HOC type signature
type HOC<InjectedProps> = <P extends InjectedProps>(
  WrappedComponent: React.ComponentType<P>
) => React.FC<Omit<P, keyof InjectedProps>>;
```

## Real-World Example: withAuth

One of the most common use cases for HOCs is protecting routes behind authentication. The `withAuth` HOC checks if the user is authenticated and either renders the wrapped component or redirects to the login page.

<!-- title: withAuth.tsx -->
```typescript
import React from 'react';
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

  WithAuthComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return WithAuthComponent;
}

export default withAuth;
```

<!-- title: Dashboard.tsx -->
```typescript
import withAuth from './withAuth';

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
export default withAuth(Dashboard);
```

## Before & After: Adding Logging

### Before (duplicated in every component)

<!-- title: BeforeHOC.tsx -->
```typescript
const ProductList: React.FC = () => {
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
};
```

### After (extracted into HOC)

<!-- title: withTracking.tsx -->
```typescript
function withTracking<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
): React.FC<P> {
  const Tracked: React.FC<P> = (props) => {
    useEffect(() => {
      analytics.track(`${componentName} mounted`);
      return () => analytics.track(`${componentName} unmounted`);
    }, []);
    return <WrappedComponent {...props} />;
  };
  Tracked.displayName = `withTracking(${componentName})`;
  return Tracked;
}

const ProductList = withTracking(() => <div>...</div>, 'ProductList');
const UserProfile = withTracking(() => <div>...</div>, 'UserProfile');
```

## HOC vs Hooks: When to Use Which

| HOC | Custom Hooks |
| --- | --- |
| Works with class and function components | Function components only |
| Can intercept rendering entirely (e.g., redirect) | Cannot prevent rendering (must return JSX) |
| Good for cross-cutting decorators (auth, logging) | Great for sharing stateful logic |
| Composes via function chaining: withA(withB(C)) | Composes naturally inside the component body |
| Can cause "wrapper hell" in DevTools | No extra DOM nesting or DevTools noise |
| Prop collisions possible between HOCs | No prop collisions; return values are explicit |

> **TIP:** **Rule of thumb:** Prefer custom hooks for new code. Use HOCs when you need to intercept rendering entirely (redirects, permission gates) or when working with legacy class components.

> **CAUTION:** Never call a HOC inside a render function &mdash; it creates a new component on every render and destroys all state. Always apply HOCs at the module level.
