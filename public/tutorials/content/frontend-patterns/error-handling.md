## Why Error Handling Matters

In production, errors are inevitable: API failures, network timeouts, invalid data, or bugs in third-party code. Without proper error handling, a single thrown error can crash the entire React tree. **Error boundaries** let you catch these errors gracefully and show fallback UI instead of a blank screen.

**Flow:**

1. **Error Thrown** — Runtime error in component render
2. **Error Boundary** — Catches error via getDerivedStateFromError
3. **Fallback UI** — Show error message + retry option
4. **Recovery** — User retries or navigates away


## Building an Error Boundary

Error boundaries must be class components (as of React 18). They catch errors during rendering, in lifecycle methods, and in constructors of child components. They do **not** catch errors in event handlers, async code, or server-side rendering.

<!-- title: ErrorBoundary.tsx -->
```typescript
import React, { Component, ErrorInfo } from 'react';

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

export default ErrorBoundary;
```

### Using the Error Boundary

<!-- title: App.tsx -->
```typescript
import ErrorBoundary from './ErrorBoundary';

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
);
```

> **TIP:** **Nest error boundaries strategically.** Place them around independent sections (sidebar, main content, widgets) so a failure in one section does not take down the entire page.

## Fallback UI Patterns

- **Inline error:** Show error message in place of the component with a retry button.
- **Toast notification:** Non-blocking error message at the corner of the screen.
- **Full-page error:** For critical failures that prevent the app from functioning.
- **Degraded mode:** Show partial data or cached content when fresh data fails to load.

## Retry Pattern with Exponential Backoff

<!-- title: useRetry.ts -->
```typescript
import { useState, useCallback } from 'react';

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

export default useRetry;
```

## Global Error Handling

Error boundaries only catch render-time errors. For async errors, event handler errors, and unhandled promise rejections, you need global handlers.

<!-- title: globalErrorHandler.ts -->
```typescript
// Catch unhandled errors
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
}
```

## Error Handling Checklist

| Error Type | Solution | Catches |
| --- | --- | --- |
| Render errors | Error Boundary | Errors thrown during component rendering |
| Async errors | try/catch + state | Failed API calls, timeouts |
| Event handler errors | try/catch wrapper | onClick, onSubmit exceptions |
| Unhandled rejections | window.onunhandledrejection | Uncaught promise rejections |
| Global JS errors | window.onerror | Script errors, eval errors |
| Network failures | Retry + fallback | Offline, 5xx, DNS failures |

> **CAUTION:** Error boundaries do **not** catch errors in: event handlers, async callbacks (`setTimeout`, Promises), server-side rendering, or errors thrown in the error boundary itself. Handle those with `try/catch` and global handlers.

> **NOTE:** Consider using `react-error-boundary` from npm &mdash; it provides a functional API (`useErrorBoundary` hook) and built-in retry support, avoiding the need to write class components manually.
