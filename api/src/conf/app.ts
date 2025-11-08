import { DreamCLI } from '@rvoh/dream/system'
import { PsychicApp } from '@rvoh/psychic'
import { PsychicDevtools } from '@rvoh/psychic/system'

import AppEnv from '@conf/AppEnv.js'
import inflections from '@conf/inflections.js'
import routesCb from '@conf/routes.js'
import importDefault from '@conf/system/importDefault.js'
import srcPath from '@conf/system/srcPath.js'
import * as path from 'node:path'

import winstonLogger from '@conf/winstonLogger.js'
import expressWinston from 'express-winston'
import winston from 'winston'

export default async (psy: PsychicApp) => {
  Error.stackTraceLimit = 50

  const apiRoot = srcPath('..')
  psy.set('logger', winstonLogger(apiRoot))

  await psy.load('controllers', srcPath('app', 'controllers'), path => importDefault(path))
  await psy.load('services', srcPath('app', 'services'), path => importDefault(path))
  await psy.load('initializers', srcPath('conf', 'initializers'), path => importDefault(path))

  psy.set('appName', 'bearbnb')
  psy.set('packageManager', 'yarn')
  psy.set('apiOnly', false)
  psy.set('apiRoot', apiRoot)

  psy.set('encryption', {
    cookies: {
      current: {
        algorithm: 'aes-256-gcm',
        key: AppEnv.string('APP_ENCRYPTION_KEY'),
      },
    },
  })

  psy.set('inflections', inflections)
  psy.set('routes', routesCb)

  /**
   * Configure default headers (e.g.: overriding the default cache-control of 'max-age=0, private, must-revalidate')
   */
  // psy.set('defaultResponseHeaders', { 'cache-control': 'no-cache, no-store' })

  /**
   * Uncomment to automatically replace `<`, `>`, `&`, `/`, `\`, `'`, and `"` with \u00xx unicode
   * representations of those characters when rendering json. Note that parsing the resulting json
   * will restore the original content and is not safe to inject directly into an html document.
   * In the context of modern tooling, enabling sanitization should not be necessary, but security
   * reviews may require it. If that is the case, this config makes it easy to satisfy the requirement.
   */
  // psy.set('sanitizeResponseJson', true)

  psy.set('json', {
    limit: '20kb',
  })

  // Encryption between the load balancer and your Psychic webservers
  // is an important part of encryption-in-transit. This SSL
  // certificate will be a self-signed certificate. It is separate
  // from the SSL certificate that you'll install on your load balancer.
  if (AppEnv.isProduction) {
    psy.set('ssl', {
      key: AppEnv.string('SSL_KEY_PATH'),
      cert: AppEnv.string('SSL_CERT_PATH'),
    })
  }

  psy.set('cors', {
    credentials: true,
    origin: JSON.parse(AppEnv.string('CORS_HOSTS', { optional: true }) || '[]') as string[],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })

  psy.set('cookie', {
    maxAge: {
      days: 14,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    },
  })

  psy.set('openapi', {
    outputFilepath: path.join('src', 'openapi', 'openapi.json'),
    defaults: {
      components: {
        schemas: {},
      },
    },
    validate: {
      requestBody: true,
      headers: true,
      query: true,
      responseBody: AppEnv.isTest,
    }
  })

  psy.set('openapi', 'mobile', {
    outputFilepath: path.join('src', 'openapi', 'mobile.openapi.json'),
    suppressResponseEnums: true,
    defaults: {
      components: {
        schemas: {},
      },
    },
  })

  psy.set('openapi', 'admin', {
    outputFilepath: path.join('src', 'openapi', 'admin.openapi.json'),
    defaults: {
      components: {
        schemas: {},
      },
    },
    validate: {
      requestBody: true,
      headers: true,
      query: true,
      responseBody: AppEnv.isTest,
    }
  })

  psy.set('openapi', 'validation', {
    outputFilepath: path.join('src', 'openapi', 'spec.openapi.json'),
    syncTypes: true,
    defaults: {
      components: {
        schemas: {},
      },
    },
  })

  // run a callback when the express server starts. the express app will be passed to each callback as the first argument
  psy.on('server:init:after-middleware', psychicServer => {
    const app = psychicServer.expressApp

    // Support application/x-www-form-urlencoded request body. This is not usually needed, since JSON is the usual standard,
    // but some webhooks (e.g. Twilio) post application/x-www-form-urlencoded data. If this is needed, uncomment the
    // next line and add `import { urlencoded } from 'express'` to the imports at the top of this file.
    // app.use(urlencoded({ extended: true }))

    if (!AppEnv.isTest || AppEnv.boolean('REQUEST_LOGGING')) {
      const SENSITIVE_FIELDS = ['password', 'token', 'authentication', 'authorization', 'secret']

      app.use(
        expressWinston.logger({
          transports: [new winston.transports.Console()],
          format: winston.format.combine(winston.format.json()),
          meta: true, // optional: control whether you want to log the meta data about the request (default to true)
          msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
          expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
          colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
          headerBlacklist: [
            'authorization',
            'content-length',
            'connection',
            'cookie',
            'sec-ch-ua',
            'sec-ch-ua-mobile',
            'sec-ch-ua-platform',
            'sec-fetch-dest',
            'sec-fetch-mode',
            'sec-fetch-site',
            'user-agent',
          ],
          ignoredRoutes: ['/health_check'],
          bodyBlacklist: SENSITIVE_FIELDS,
        }),
      )
    }
  })

  psy.on('server:start', async () => {
    if (AppEnv.isDevelopment && AppEnv.boolean('CLIENT')) {
      DreamCLI.logger.logStartProgress('starting dev servers...')
      await PsychicDevtools.launchDevServer('clientApp', { port: 3000, cmd: 'yarn client' })
      await PsychicDevtools.launchDevServer('adminApp', { port: 3001, cmd: 'yarn admin' })
      DreamCLI.logger.logEndProgress()
    }
  })

  psy.on('server:shutdown', () => {
    if (AppEnv.isDevelopment && AppEnv.boolean('CLIENT')) {
      DreamCLI.logger.logStartProgress('stopping dev servers...')
      PsychicDevtools.stopDevServer('clientApp')
      PsychicDevtools.stopDevServer('adminApp')
      DreamCLI.logger.logEndProgress()
    }
  })

  // run a callback after routes are done processing
  psy.on('server:init:after-routes', () => {})

  // this function will be run any time a server error is encountered
  // that psychic isn't sure how to respond to (i.e. 500 internal server errors)
  psy.on('server:error', (err, _, res) => {
    if (!res.headersSent) res.sendStatus(500)
    else if (AppEnv.isDevelopmentOrTest) throw err
  })
}
