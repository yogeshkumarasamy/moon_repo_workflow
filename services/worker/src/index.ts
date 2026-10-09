import { processTask } from './processor.js';
import type { TaskPayload } from '@repo/types';

async function main() {
  console.log('Worker service started. Listening for tasks...');
  const sampleTask: TaskPayload = {
    taskId: 'tsk_sample_1',
    action: 'sync',
    data: { source: 'crm-sync' },
    enqueuedAt: new Date().toISOString(),
  };

  const result = await processTask(sampleTask);
  console.log('Processed sample task result:', result);
}

main().catch(console.error);
