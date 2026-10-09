import { describe, it, expect } from 'vitest';
import { Button, Card, Badge, Header } from '../src/index.js';

describe('@repo/ui components', () => {
  it('exports component functions', () => {
    expect(typeof Button).toBe('function');
    expect(typeof Card).toBe('function');
    expect(typeof Badge).toBe('function');
    expect(typeof Header).toBe('function');
  });
});
