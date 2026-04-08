// ─── Platform Registry Tests ──────────────────────────────────────────────────
import { describe, it, expect } from 'vitest';
import {
  getAllProducts,
  getProduct,
  getLaunchedProducts,
  getComingSoonProducts,
  getActiveProductId,
} from '../registry';

describe('getAllProducts', () => {
  it('returns a non-empty array', () => {
    expect(getAllProducts().length).toBeGreaterThan(0);
  });

  it('every product has required fields', () => {
    for (const p of getAllProducts()) {
      expect(typeof p.id).toBe('string');
      expect(p.id.length).toBeGreaterThan(0);
      expect(typeof p.name).toBe('string');
      expect(typeof p.tagline).toBe('string');
      expect(typeof p.description).toBe('string');
      expect(typeof p.version).toBe('string');
      expect(typeof p.color).toBe('string');
      expect(typeof p.homePath).toBe('string');
      expect(Array.isArray(p.stats)).toBe(true);
      expect(Array.isArray(p.keyFeatures)).toBe(true);
      expect(Array.isArray(p.quickLinks)).toBe(true);
      expect(Array.isArray(p.tags)).toBe(true);
    }
  });

  it('every product id is unique', () => {
    const ids = getAllProducts().map(p => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('every product has a valid status', () => {
    const validStatuses = ['ga', 'beta', 'preview', 'coming-soon'];
    for (const p of getAllProducts()) {
      expect(validStatuses).toContain(p.status);
    }
  });

  it('every product has a valid tier', () => {
    const validTiers = ['open-source', 'enterprise', 'platform'];
    for (const p of getAllProducts()) {
      expect(validTiers).toContain(p.tier);
    }
  });

  it('gridstorm product is registered', () => {
    const ids = getAllProducts().map(p => p.id);
    expect(ids).toContain('gridstorm');
  });
});

describe('getProduct', () => {
  it('returns the product for a known id', () => {
    const p = getProduct('gridstorm');
    expect(p).toBeDefined();
    expect(p!.id).toBe('gridstorm');
  });

  it('returns undefined for unknown id', () => {
    expect(getProduct('nonexistent-xyz')).toBeUndefined();
  });

  it('returns undefined for empty string', () => {
    expect(getProduct('')).toBeUndefined();
  });

  it('returns the correct product name', () => {
    const p = getProduct('gridstorm');
    expect(p!.name).toBe('GridStorm');
  });

  it('all product ids resolve to themselves via getProduct', () => {
    for (const p of getAllProducts()) {
      expect(getProduct(p.id)?.id).toBe(p.id);
    }
  });
});

describe('getLaunchedProducts', () => {
  it('returns only non-coming-soon products', () => {
    const launched = getLaunchedProducts();
    for (const p of launched) {
      expect(p.status).not.toBe('coming-soon');
    }
  });

  it('returns at least one launched product', () => {
    expect(getLaunchedProducts().length).toBeGreaterThan(0);
  });

  it('launched + coming-soon = all products', () => {
    const all = getAllProducts().length;
    const launched = getLaunchedProducts().length;
    const soon = getComingSoonProducts().length;
    expect(launched + soon).toBe(all);
  });
});

describe('getComingSoonProducts', () => {
  it('returns only coming-soon products', () => {
    for (const p of getComingSoonProducts()) {
      expect(p.status).toBe('coming-soon');
    }
  });
});

describe('getActiveProductId', () => {
  it('returns null for "/"', () => {
    expect(getActiveProductId('/')).toBeNull();
  });

  it('returns null for "/products"', () => {
    expect(getActiveProductId('/products')).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(getActiveProductId('')).toBeNull();
  });

  it('extracts id from "/product/gridstorm"', () => {
    expect(getActiveProductId('/product/gridstorm')).toBe('gridstorm');
  });

  it('extracts id from "/product/gridstorm/docs"', () => {
    expect(getActiveProductId('/product/gridstorm/docs')).toBe('gridstorm');
  });

  it('extracts id from "/product/pdf-toolkit"', () => {
    expect(getActiveProductId('/product/pdf-toolkit')).toBe('pdf-toolkit');
  });

  it('returns empty string when route is "/product/" (no id)', () => {
    // slice gives '' → the id is empty, returned as null
    expect(getActiveProductId('/product/')).toBeNull();
  });

  it('does not match non-product routes as product pages', () => {
    expect(getActiveProductId('/about')).toBeNull();
    expect(getActiveProductId('/blog/gridstorm')).toBeNull();
  });
});
