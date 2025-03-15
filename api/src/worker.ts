import './conf/global.js'

import { closeAllDbConnections } from '@rvoh/dream'
import { background, stopBackgroundWorkers } from '@rvoh/psychic-workers'
import increaseNodeStackTraceLimits from './app/helpers/increaseNodeStackTraceLimits.js'
import initializePsychicApplication from './conf/initializePsychicApplication.js'

increaseNodeStackTraceLimits()

async function startBackgroundWorkers() {
  await initializePsychicApplication()

  background.work()

  background.workers.forEach(worker => {
    worker.on('failed', (job, error) => {
      handleBullJobFailed(job!.id!, error.message)
        .then(() => {})
        .catch(() => {})
    })
  })

  process.on('SIGINT', () => {
    stopBackgroundWorkers()
      .then(() => {
        closeAllDbConnections()
          .then(() => {
            process.exit()
          })
          .catch(() => {
            process.exit()
          })
      })
      .catch(() => {
        process.exit()
      })
  })
}

async function handleBullJobFailed(jobId: string, failedReason: string) {
  // handle your job error here
  // const job = (await background.queue!.getJob(jobId)) || 'Job not found'
}

void startBackgroundWorkers()
