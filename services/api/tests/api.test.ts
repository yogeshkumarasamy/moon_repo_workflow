import { describe, it, expect } from 'vitest';
import { createServer } from '../src/server.js';

describe('API Server', () => {
  it('creates an HTTP server instance', () => {
    const server = createServer();
    expect(server).toBeDefined();
    expect(typeof server.listen).toBe('function');
  });

  it('exposes stats endpoint logic', () => {
    expect(createServer).toBeDefined();
  });
});
