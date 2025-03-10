import { PsychicApplicationWorkers } from '@rvohealth/psychic-workers'
import { Queue, Worker } from 'bullmq'
import Redis from 'ioredis'

export default (workersApp: PsychicApplicationWorkers) => {
  workersApp.set('background', {
    providers: {
      Queue,
      Worker,
    },

    defaultBullMQQueueOptions: {
      defaultJobOptions: {
        removeOnComplete: 1000,
        removeOnFail: 20000,
        // 524,288,000 ms (~6.1 days) using algorithm:
        // "2 ^ (attempts - 1) * delay"
        attempts: 20,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    },

    // Psychic background API
    defaultWorkstream: {
      // https://docs.bullmq.io/guide/parallelism-and-concurrency
      workerCount: parseInt(process.env.WORKER_COUNT || '0'),
      concurrency: 100,
    },

    namedWorkstreams: [{ workerCount: 1, name: 'snazzy', rateLimit: { max: 1, duration: 1 } }],
    // end: Psychic background API

    // // native BullMQ background API
    // nativeBullMQ: {
    //   // defaultQueueOptions: {connection: }
    //   namedQueueOptions: {
    //     snazzy: {},
    //   },
    //   namedQueueWorkers: { snazzy: {} },
    // },
    // // end: native BullMQ background API

    // transitionalWorkstreams: {
    //   defaultQueueConnection: new Redis({
    //     username: process.env.REDIS_USER,
    //     password: process.env.REDIS_PASSWORD,
    //     host: process.env.REDIS_HOST,
    //     port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : undefined,
    //     tls: process.env.REDIS_USE_SSL === '1' ? {} : undefined,
    //     enableOfflineQueue: false,
    //   }),
    //   defaultWorkerConnection: new Redis({
    //     username: process.env.REDIS_USER,
    //     password: process.env.REDIS_PASSWORD,
    //     host: process.env.REDIS_HOST,
    //     port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : undefined,
    //     tls: process.env.REDIS_USE_SSL === '1' ? {} : undefined,
    //     maxRetriesPerRequest: null,
    //   }),

    //   namedWorkstreams: [
    //     {
    //       workerCount: 1,
    //       name: 'snazzy',
    //       rateLimit: { max: 1, duration: 1 },
    //     },
    //   ],
    // },

    defaultQueueConnection: new Redis({
      username: process.env.REDIS_USER,
      password: process.env.REDIS_PASSWORD,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : undefined,
      tls: process.env.REDIS_USE_SSL === '1' ? {} : undefined,
      enableOfflineQueue: false,
    }),

    defaultWorkerConnection: new Redis({
      username: process.env.REDIS_USER,
      password: process.env.REDIS_PASSWORD,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : undefined,
      tls: process.env.REDIS_USE_SSL === '1' ? {} : undefined,
      maxRetriesPerRequest: null,
    }),

    // To set up a simple cluster on a dev machine for testing:
    //   https://medium.com/@bertrandoubida/setting-up-redis-cluster-on-macos-cf35a21465a
    // defaultQueueConnection: new Cluster(
    //   [6380, 6384, 6385, 6381, 6383, 6382].map(port => ({ host: '127.0.0.1', port })),
    //   {
    //     redisOptions: {
    //       username: process.env.REDIS_USER,
    //       password: process.env.REDIS_PASSWORD,
    //       tls: process.env.REDIS_USE_SSL === '1' ? {} : undefined,
    //     },
    //     enableOfflineQueue: false
    //   },
    // ),
    // defaultWorkerConnection: new Cluster(
    //   [6380, 6384, 6385, 6381, 6383, 6382].map(port => ({ host: '127.0.0.1', port })),
    //   {
    //     redisOptions: {
    //       username: process.env.REDIS_USER,
    //       password: process.env.REDIS_PASSWORD,
    //       tls: process.env.REDIS_USE_SSL === '1' ? {} : undefined,
    //       maxRetriesPerRequest: null,
    //     },
    //   },
    // ),
  })

  // ******
  // HOOKS:
  // ******

  workersApp.on('workers:shutdown', () => {
    // do something before your workers finish shutting down
  })
}
