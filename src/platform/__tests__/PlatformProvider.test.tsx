// ─── PlatformProvider Tests ───────────────────────────────────────────────────
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { PlatformProvider, usePlatform } from '../PlatformProvider';
import { getAllProducts } from '../registry';

// ── Test consumer component ────────────────────────────────────────────────────

function PlatformConsumer() {
  const ctx = usePlatform();
  return (
    <div>
      <span data-testid="platform-name">{ctx.config.name}</span>
      <span data-testid="product-count">{ctx.products.length}</span>
      <span data-testid="active-product">{ctx.activeProductId ?? 'null'}</span>
      <span data-testid="has-navigate">{typeof ctx.navigate === 'function' ? 'yes' : 'no'}</span>
      <span data-testid="has-getProduct">{typeof ctx.getProduct === 'function' ? 'yes' : 'no'}</span>
    </div>
  );
}

describe('PlatformProvider', () => {
  // ── Context values ─────────────────────────────────────────────────────────

  it('provides config.name as "Tekivex"', () => {
    render(
      <PlatformProvider activeProductId={null}>
        <PlatformConsumer />
      </PlatformProvider>
    );
    expect(screen.getByTestId('platform-name').textContent).toBe('Tekivex');
  });

  it('provides all products from registry', () => {
    render(
      <PlatformProvider activeProductId={null}>
        <PlatformConsumer />
      </PlatformProvider>
    );
    const count = parseInt(screen.getByTestId('product-count').textContent!);
    expect(count).toBe(getAllProducts().length);
  });

  it('exposes activeProductId=null when null passed', () => {
    render(
      <PlatformProvider activeProductId={null}>
        <PlatformConsumer />
      </PlatformProvider>
    );
    expect(screen.getByTestId('active-product').textContent).toBe('null');
  });

  it('exposes activeProductId when provided', () => {
    render(
      <PlatformProvider activeProductId="gridstorm">
        <PlatformConsumer />
      </PlatformProvider>
    );
    expect(screen.getByTestId('active-product').textContent).toBe('gridstorm');
  });

  it('exposes navigate as a function', () => {
    render(
      <PlatformProvider activeProductId={null}>
        <PlatformConsumer />
      </PlatformProvider>
    );
    expect(screen.getByTestId('has-navigate').textContent).toBe('yes');
  });

  it('exposes getProduct as a function', () => {
    render(
      <PlatformProvider activeProductId={null}>
        <PlatformConsumer />
      </PlatformProvider>
    );
    expect(screen.getByTestId('has-getProduct').textContent).toBe('yes');
  });

  it('getProduct resolves known products', () => {
    let resolvedName = '';
    function Spy() {
      const ctx = usePlatform();
      resolvedName = ctx.getProduct('gridstorm')?.name ?? '';
      return null;
    }
    render(
      <PlatformProvider activeProductId={null}>
        <Spy />
      </PlatformProvider>
    );
    expect(resolvedName).toBe('GridStorm');
  });

  it('getProduct returns undefined for unknown id', () => {
    let result: unknown = 'not-tested';
    function Spy() {
      const ctx = usePlatform();
      result = ctx.getProduct('nonexistent-xyz');
      return null;
    }
    render(
      <PlatformProvider activeProductId={null}>
        <Spy />
      </PlatformProvider>
    );
    expect(result).toBeUndefined();
  });

  // ── Children rendering ─────────────────────────────────────────────────────

  it('renders children', () => {
    render(
      <PlatformProvider activeProductId={null}>
        <span>hello world</span>
      </PlatformProvider>
    );
    expect(screen.getByText('hello world')).toBeInTheDocument();
  });

  // ── usePlatform outside provider ──────────────────────────────────────────

  it('usePlatform throws when used outside provider', () => {
    const originalError = console.error;
    console.error = () => {}; // suppress React error boundary noise
    expect(() => render(<PlatformConsumer />)).toThrow(
      'usePlatform must be used inside <PlatformProvider>'
    );
    console.error = originalError;
  });

  // ── Memoization — same reference on same activeProductId ──────────────────

  it('re-renders when activeProductId changes', () => {
    const { rerender } = render(
      <PlatformProvider activeProductId={null}>
        <PlatformConsumer />
      </PlatformProvider>
    );
    expect(screen.getByTestId('active-product').textContent).toBe('null');

    rerender(
      <PlatformProvider activeProductId="gridstorm">
        <PlatformConsumer />
      </PlatformProvider>
    );
    expect(screen.getByTestId('active-product').textContent).toBe('gridstorm');
  });
});
