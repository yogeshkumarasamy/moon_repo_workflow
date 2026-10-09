import { describe, it, expect } from 'vitest';
import { processTask } from '../src/processor.js';

describe('Worker Processor', () => {
  it('processes sync task successfully', async () => {
    const res = await processTask({
      taskId: 'tsk_1',
      action: 'sync',
      data: { source: 'db-replica' },
      enqueuedAt: new Date().toISOString(),
    });

    expect(res.status).toBe('completed');
    expect(res.taskId).toBe('tsk_1');
    expect(res.output?.itemsSynced).toBe(42);
  });

  it('processes cleanup task successfully', async () => {
    const res = await processTask({
      taskId: 'tsk_2',
      action: 'cleanup',
      data: {},
      enqueuedAt: new Date().toISOString(),
    });

    expect(res.status).toBe('completed');
    expect(res.output?.deletedRecords).toBe(15);
  });

  it('fails on unsupported task', async () => {
    const res = await processTask({
      taskId: 'tsk_3',
      action: 'invalid' as any,
      data: {},
      enqueuedAt: new Date().toISOString(),
    });

    expect(res.status).toBe('failed');
    expect(res.error).toContain('Unsupported action');
  });
});
