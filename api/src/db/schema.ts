import { CalendarDate } from '@rvohealth/dream'
import { DateTime } from 'luxon'
import {
  IdType
} from './sync'

export const schema = {
  users: {
    primaryKey: 'id',
    createdAtField: 'createdAt',
    updatedAtField: 'updatedAt',
    deletedAtField: 'deletedAt',
    serializerKeys: [],
    scopes: {
      default: [],
      named: [],
    },
    columns: {
      createdAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
      email: {
        coercedType: {} as string,
        enumType: null,
        enumValues: null,
        dbType: 'citext',
        allowNull: false,
        isArray: false,
      },
      firstName: {
        coercedType: {} as string | null,
        enumType: null,
        enumValues: null,
        dbType: 'character varying',
        allowNull: true,
        isArray: false,
      },
      id: {
        coercedType: {} as IdType,
        enumType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      lastName: {
        coercedType: {} as string | null,
        enumType: null,
        enumValues: null,
        dbType: 'character varying',
        allowNull: true,
        isArray: false,
      },
      updatedAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
    },
    virtualColumns: [],
    associations: {
      
    },
  },
} as const

export const globalSchema = {
  passthroughColumns: [],
  allDefaultScopeNames: [],
  globalNames: {
    models: {
      'User': 'users'
    },
    serializers: [],
  },
} as const
