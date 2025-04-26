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
      handleBullJobFailed(job?.id, error.message)
        .then(() => {})
        .catch(() => {})
    })
  })

  PsychicApp.log('FINISHED STARTING WORKERS')
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handleBullJobFailed(jobId: string | undefined, failedReason: string) {
  // handle your job error here
  // const job = (await background.queue!.getJob(jobId)) || 'Job not found'
}

void startBackgroundWorkers()
