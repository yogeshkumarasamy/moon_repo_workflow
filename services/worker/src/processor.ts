import type { TaskPayload, TaskResult } from '@repo/types';
import { Logger } from '@repo/utils';

const logger = new Logger('Worker-Processor');

export async function processTask(payload: TaskPayload): Promise<TaskResult> {
  const start = Date.now();
  logger.info(`Processing task ${payload.taskId} with action ${payload.action}`);

  try {
    let output: Record<string, unknown> = {};

    switch (payload.action) {
      case 'sync':
        output = { itemsSynced: 42, source: payload.data.source || 'default' };
        break;
      case 'cleanup':
        output = { deletedRecords: 15 };
        break;
      case 'index':
        output = { indexSizeMb: 120, status: 'indexed' };
        break;
      case 'notify':
        output = { delivered: true, recipient: payload.data.recipient };
        break;
      default:
        throw new Error(`Unsupported action: ${payload.action}`);
    }

    return {
      taskId: payload.taskId,
      status: 'completed',
      durationMs: Date.now() - start,
      output,
    };
  } catch (err: any) {
    logger.error(`Task ${payload.taskId} failed:`, err);
    return {
      taskId: payload.taskId,
      status: 'failed',
      durationMs: Date.now() - start,
      error: err.message,
    };
  }
}
