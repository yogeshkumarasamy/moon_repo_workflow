import { describe, it, expect } from 'vitest';
import { formatDate, formatCurrency, computeAverage, validateUser, createApiResponse, slugify } from '../src/index.js';

describe('@repo/utils', () => {
  it('formats dates properly', () => {
    const formatted = formatDate(new Date('2026-10-09T00:00:00Z'));
    expect(formatted).toBe('2026-10-09');
  });

  it('slugifies string properly', () => {
    expect(slugify('Hello World & Friends!')).toBe('hello-world-friends');
  });

  it('formats currency properly', () => {
    const formatted = formatCurrency(1234.56, 'USD');
    expect(formatted).toContain('1,234.56');
  });

  it('computes average correctly', () => {
    expect(computeAverage([10, 20, 30])).toBe(20);
    expect(computeAverage([])).toBe(0);
  });

  it('validates user input', () => {
    const valid = validateUser({ name: 'Alice', email: 'alice@example.com' });
    expect(valid.isValid).toBe(true);

    const invalid = validateUser({ name: 'A', email: 'invalid' });
    expect(invalid.isValid).toBe(false);
    expect(invalid.errors.length).toBe(2);
  });

  it('creates API response wrapper', () => {
    const res = createApiResponse({ test: true }, 'ok');
    expect(res.success).toBe(true);
    expect(res.data).toEqual({ test: true });
    expect(res.message).toBe('ok');
    expect(res.timestamp).toBeDefined();
  });
});
