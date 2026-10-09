import { describe, it, expect } from 'vitest';
import { App } from '../src/App.js';

describe('Admin App component', () => {
  it('App is defined and is a React component', () => {
    expect(typeof App).toBe('function');
  });
});
