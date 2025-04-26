import { DateTime } from '@rvoh/dream'
import { DefaultPsychicOpenapiOptions } from '@rvoh/psychic'
import AppEnv from '../AppEnv.js'

// see https://www.npmjs.com/package/express-openapi-validator for more info

export default function openapiRequestValidation(): NonNullable<DefaultPsychicOpenapiOptions['validation']> {
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

  const validationOpts: DefaultPsychicOpenapiOptions['validation'] = {
    apiSpec: './openapi.json',
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

  return validationOpts
}
