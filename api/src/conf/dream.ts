import { DreamApplication } from '@rvoh/dream'
import { productionEnv } from '../app/helpers/environment.js'
import importAll from '../app/helpers/importAll.js'
import importDefault from '../app/helpers/importDefault.js'
import srcPath from '../app/helpers/srcPath.js'
import inflections from './inflections.js'

export default async function (app: DreamApplication) {
  app.set('primaryKeyType', 'bigserial')
  app.set('inflections', inflections)

  await app.load('models', srcPath('app', 'models'), path => importDefault(path))
  await app.load('services', srcPath('app', 'services'), path => importDefault(path))
  await app.load('serializers', srcPath('app', 'serializers'), path => importAll(path))

  // provides a list of path overrides for your app. This is optional, and will default
  // to the paths expected for a typical psychic application.
  app.set('paths', {})

  app.set('parallelTests', Number(process.env.DREAM_PARALLEL_TESTS || '1'))

  app.set('db', {
    primary: {
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      host: process.env.DB_HOST!,
      name: process.env.DB_NAME!,
      port: parseInt(process.env.DB_PORT!),
      useSsl: process.env.DB_USE_SSL === '1',
    },
    replica: productionEnv()
      ? {
          user: process.env.DB_USER!,
          password: process.env.DB_PASSWORD!,
          host: process.env.READER_DB_HOST!,
          name: process.env.DB_NAME!,
          port: parseInt(process.env.READER_DB_PORT!),
          useSsl: process.env.DB_USE_SSL === '1',
        }
      : undefined,
  })

  app.on('db:log', event => {
    if (process.env.SQL_LOGGING !== '1') return

    if (event.level === 'error') {
      console.error('the following db query encountered an unexpected error: ', {
        durationMs: event.queryDurationMillis,
        error: event.error,
        sql: event.query.sql,
        params: event.query.parameters.map(maskPII),
      })
    } else {
      console.log('db query completed:', {
        durationMs: event.queryDurationMillis,
        sql: event.query.sql,
        params: event.query.parameters.map(maskPII),
      })
    }
 })
}

function maskPII(data: unknown) {
  return data
}
