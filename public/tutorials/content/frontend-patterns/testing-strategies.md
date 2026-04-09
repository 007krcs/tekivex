## The Testing Pyramid

The testing pyramid guides how many tests to write at each level. **Many fast unit tests** at the base, **some integration tests** in the middle, and **few slow E2E tests** at the top. This balances confidence with feedback speed.

*Testing Pyramid: Unit (base) → Integration (middle) → E2E (top)*

## Unit Tests

Unit tests verify individual functions, hooks, or components in isolation. They are fast, deterministic, and cheap to run.

<!-- title: utils.test.ts -->
```typescript
import { describe, it, expect } from 'vitest';
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
});
```

## Integration Tests: React Testing Library

Integration tests verify that multiple units work together. React Testing Library encourages testing from the **user's perspective** &mdash; interacting with rendered output rather than internal implementation.

<!-- title: LoginForm.test.tsx -->
```typescript
import { render, screen, waitFor } from '@testing-library/react';
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
});
```

## What to Test vs What Not to Test

| Test These | Skip These |
| --- | --- |
| User interactions (click, type, submit) | Implementation details (internal state values) |
| Conditional rendering (loading, error, empty states) | CSS styles and visual appearance (use visual tests) |
| Form validation and error messages | Third-party library internals |
| Business logic functions | Static content that rarely changes |
| Accessibility (roles, labels, focus management) | Framework behavior (React itself) |
| Edge cases and boundary values | Snapshot tests of large component trees |

## E2E Tests with Playwright

<!-- title: checkout.spec.ts -->
```typescript
import { test, expect } from '@playwright/test';

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
});
```

## Testing Tools Comparison

| Tool | Type | Speed | Best For |
| --- | --- | --- | --- |
| Vitest | Unit / Integration | Very fast | Vite projects, modern setup |
| Jest | Unit / Integration | Fast | Established projects, broad ecosystem |
| React Testing Library | Integration | Fast | User-centric component testing |
| Playwright | E2E | Slow | Cross-browser, full flow testing |
| Cypress | E2E | Slow | Developer-friendly E2E, component tests |
| MSW (Mock Service Worker) | API Mocking | Fast | Intercepting network requests in tests |

> **TIP:** **Follow the AAA pattern:** *Arrange* (set up test data and render), *Act* (simulate user actions), *Assert* (verify expected outcomes). This makes tests readable and consistent.

> **NOTE:** Run unit and integration tests on every commit (CI). Run E2E tests on pull requests or nightly builds. This keeps the feedback loop fast while still catching regressions.
