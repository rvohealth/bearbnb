import { DateTime } from '@rvoh/dream'
import { PsychicApp } from '@rvoh/psychic'
import { Express, Request, Response } from 'express'
import * as OpenApiValidator from 'express-openapi-validator'
import { debuglog } from 'node:util'
import AppEnv from '../AppEnv.js'

// see https://www.npmjs.com/package/express-openapi-validator for more info

function openapiRequestValidation(app: Express) {
  const ignorePaths: string[] = [
    /*
     * add paths here that you wish to be ignored by openapi validation. i.e.
     * i.e.
     *  'webhooks'
     * */
  ]

  const datetimeValidator = {
    type: 'string',
    validate: (value: DateTime | string) => {
      return value instanceof DateTime ? value?.isValid : DateTime.fromISO(value).isValid
    },
  } as const

  const validationOpts: Parameters<(typeof OpenApiValidator)['middleware']>[0] = {
    apiSpec: './src/openapi/validation.openapi.json',
    validateRequests: true,
    validateResponses: AppEnv.isTest,
    ignoreUndocumented: true,
    formats: {
      datetime: datetimeValidator,
      'date-time': datetimeValidator,
      decimal: {
        type: 'string',
        validate: (value: string) => /^-?(\d+\.?\d*|\d*\.?\d+)$/.test(value),
      },
    },
    // serialize/deserialize
    serDes: [
      {
        format: 'datetime',
        deserialize: s => DateTime.fromISO(s),
        serialize: (o: unknown) => (o instanceof DateTime ? o.toISO() : o)! as string,
      },
      {
        format: 'date-time',
        deserialize: s => DateTime.fromISO(s),
        serialize: (o: unknown) => (o instanceof DateTime ? o.toISO() : o)! as string,
      },
    ],
  }

  if (ignorePaths.length) {
    validationOpts.ignorePaths = new RegExp(ignorePaths.join('|'))
  }

  app.use(OpenApiValidator.middleware(validationOpts))
}

export default (psy: PsychicApp) => {
  psy.on('server:init:after-middleware', psychicServer => {
    const app = psychicServer.expressApp
    openapiRequestValidation(app)
  })

  psy.on('server:init:after-routes', psychicServer => {
    psychicServer.expressApp.use((err: OpenApiError, _: Request, res: Response, next: () => void) => {
      const debugEnabled = debuglog('psychic').enabled

      if (isOpenapiError(err)) {
        if (debugEnabled) {
          console.log(JSON.stringify(err, null, 2))
          console.trace()
        }

        res.status(err.status).json({
          message: err.message,
          errors: err.errors,
        })
      } else {
        if (debugEnabled) console.error(err)
        next()
      }
    })
  })
}

interface OpenApiError {
  message: string
  name: string
  status: number
  path: string
  errors: string[]
}

function isOpenapiError(error: OpenApiError) {
  return error?.name && error?.status && error?.path && error?.errors?.length
}
