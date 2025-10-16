import '@conf/loadEnv.js'

import initializePsychicApp from '@conf/system/initializePsychicApp.js'
import { PsychicApp } from '@rvoh/psychic'
import { background } from '@rvoh/psychic-workers'

/**
 * Provides an exception class which can be thrown when
 * we do not want the error to trigger an exception log
 */
export class ExpectedBackgroundJobException extends Error {}

async function startBackgroundWorkers() {
  await initializePsychicApp()

  PsychicApp.log('STARTING WORKERS...')

  background.work()

  background.workers.forEach(worker => {
    worker.on('failed', (job, error) => {
      // This event is triggered when an error is thrown by your code.
      // This is more common than the 'error' or 'stalled' events.
      // Usually handle this by sending error to your error handling service.

      if (error instanceof ExpectedBackgroundJobException) return

      if (job) {
        PsychicApp.logWithLevel(
          'error',
          `Background job failed:
worker.name: ${worker.name}
worker.id: ${worker.id}
job.name: ${job.name}
job.id: ${job.id}`,
          error
        )
        //
      } else {
        PsychicApp.logWithLevel(
          'error',
          `Background job failed:
worker ${worker.name}
worker.id: ${worker.id}`,
          error
        )
      }
    })

    worker.on('error', error => {
      // According to https://docs.bullmq.io/guide/workers:
      //   If the error handler is missing, your worker may stop processing jobs when an error is emitted
      // Handle this by sending error to your error handling service.
      PsychicApp.logWithLevel('error', `worker ${worker.name} ${worker.id} error:`, error)
    })

    worker.on('stalled', error => {
      // Handle this by sending error to your error handling service.
      PsychicApp.logWithLevel('error', `worker ${worker.name} ${worker.id} stalled:`, error)
    })

    worker.on('ioredis:close', () => {
      PsychicApp.log(`worker ${worker.name} ${worker.id} ioredis:close`)
    })

    worker.on('drained', () => {
      PsychicApp.log(`worker ${worker.name} ${worker.id} drained`)
    })

    worker.on('paused', () => {
      PsychicApp.log(`worker ${worker.name} ${worker.id} paused`)
    })

    worker.on('closed', () => {
      PsychicApp.log(`worker ${worker.name} ${worker.id} closed`)
    })

    worker.on('closing', () => {
      PsychicApp.log(`worker ${worker.name} ${worker.id} closing`)
    })
  })

  background.queues.forEach(queue => {
    queue.on('error', error => {
      // Handle this by sending error to your error handling service.
      PsychicApp.logWithLevel('error', `queue ${queue.name} error:`, error)
    })

    queue.on('ioredis:close', () => {
      PsychicApp.log(`queue ${queue.name} ioredis:close`)
    })

    queue.on('paused', () => {
      PsychicApp.log(`queue ${queue.name} paused`)
    })

    queue.on('cleaned', () => {
      PsychicApp.log(`queue ${queue.name} cleaned`)
    })
  })

  PsychicApp.log('FINISHED STARTING WORKERS')
}

void startBackgroundWorkers()
