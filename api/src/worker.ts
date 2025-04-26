import './conf/global.js'

import { PsychicApp } from '@rvoh/psychic'
import { background } from '@rvoh/psychic-workers'
import increaseNodeStackTraceLimits from './conf/system/increaseNodeStackTraceLimits.js'
import initializePsychicApp from './conf/system/initializePsychicApp.js'

increaseNodeStackTraceLimits()

async function startBackgroundWorkers() {
  await initializePsychicApp()

  PsychicApp.log('STARTING WORKERS...')

  background.work()

  background.workers.forEach(worker => {
    worker.on('failed', (job, error) => {
      // This event is triggered when an error is thrown by your code.
      // This is more common than the 'error' or 'stalled' events.
      // Usually handle this by sending error to your error handling service.

      if (job) {
        PsychicApp.logWithLevel(
          'error',
          `Background job failed:
job.name: ${job.name}
job.id: ${job.id || 'unknown'}
${error.message}`,
        )
      } else {
        PsychicApp.logWithLevel('error', error)
      }
    })

    worker.on('error', error => {
      // According to https://docs.bullmq.io/guide/workers:
      //   If the error handler is missing, your worker may stop processing jobs when an error is emitted
      // Handle this by sending error to your error handling service.
      PsychicApp.logWithLevel(
        'error',
        `Worker error:
${error.message}`,
      )
    })

    worker.on('stalled', error => {
      // Handle this by sending error to your error handling service.
      PsychicApp.logWithLevel(
        'error',
        `Worker stalled:
${error}`,
      )
    })
  })

  PsychicApp.log('FINISHED STARTING WORKERS')
}

void startBackgroundWorkers()
