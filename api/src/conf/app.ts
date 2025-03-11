import { PsychicApplication } from '@rvoh/psychic'
import { background } from '@rvoh/psychic-workers'
import expressWinston from 'express-winston'
import winston from 'winston'
import AppEnv from '../app/helpers/AppEnv'
import importDefault from '../app/helpers/importDefault'
import srcPath from '../app/helpers/srcPath'
import inflections from './inflections'
import routesCb from './routes'

export default async (psy: PsychicApplication) => {
  await psy.load('controllers', srcPath('app', 'controllers'), path => importDefault(path))

  psy.set('appName', 'bearbnb')
  psy.set('apiOnly', false)
  psy.set('apiRoot', srcPath('..'))
  psy.set('clientRoot', srcPath('..', '..', 'client'))
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
    origin: [AppEnv.string('CLIENT_HOST', { optional: true }) || 'http://localhost:3000'],
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
    defaults: {
      components: {
        schemas: {},
      },
    },
  })

  psy.set('openapi', 'mobile', {
    outputFilename: 'mobile.openapi.json',
    suppressResponseEnums: true,
    defaults: {
      components: {
        schemas: {},
      },
    },
  })

  psy.set('openapi', 'admin', {
    outputFilename: 'admin.openapi.json',
    defaults: {
      components: {
        schemas: {},
      },
    },
  })

  // run a callback when the express server starts. the express app will be passed to each callback as the first argument
  psy.on('server:init', psychicServer => {
    const app = psychicServer.expressApp

    if (!AppEnv.isTest || AppEnv.boolean('REQUEST_LOGGING')) {
      const SENSITIVE_FIELDS = ['password', 'token', 'authentication', 'authorization', 'secret']

      app.use(
        expressWinston.logger({
          transports: [new winston.transports.Console()],
          format: winston.format.combine(winston.format.colorize(), winston.format.json()),
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

  psy.on('server:shutdown', () => {
    // run custom code when server is shutdown
  })

  // run a callback after routes are done processing
  psy.on('server:init:after-routes', () => {})

  // run a callback after the config is loaded
  psy.on('load', () => {
    background.connect()
  })

  // run a callback after the config is loaded, but only if NODE_ENV=development
  psy.on('load:dev', () => {})

  // run a callback after the config is loaded, but only if NODE_ENV=test
  psy.on('load:test', () => {})

  // run a callback after the config is loaded, but only if NODE_ENV=production
  psy.on('load:prod', () => {})

  // this function will be run any time a server error is encountered
  // that psychic isn't sure how to respond to (i.e. 500 internal server errors)
  psy.on('server:error', (err, _, res) => {
    if (!res.headersSent) res.sendStatus(500)
    else if (AppEnv.isDevelopmentOrTest) throw err
  })
}
